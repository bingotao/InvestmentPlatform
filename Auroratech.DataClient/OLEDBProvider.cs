using System;
using System.Configuration;
using System.Data;
using System.Data.OleDb;

namespace Auroratech.DataClient
{
  public class OLEDBProvider : IDbProvider, IDisposable
  {
    private string connectionString;
    private IDbConnection connection;
    private IDbCommand command;
    private IDbDataAdapter adapter;
    private IDbTransaction transaction;

    public string ConnectionString
    {
      get
      {
        if (this.connectionString == null)
          this.connectionString = ConfigurationManager.ConnectionStrings["OleDbConnectionStrings"].ConnectionString;
        return this.connectionString;
      }
      set
      {
        this.connectionString = value;
      }
    }

    public IDbConnection Connection
    {
      get
      {
        if (this.connection == null)
          this.connection = (IDbConnection) new OleDbConnection(this.ConnectionString);
        return this.connection;
      }
      set
      {
        this.connection = value;
      }
    }

    public IDbCommand Command
    {
      get
      {
        if (this.command == null)
        {
          this.command = (IDbCommand) new OleDbCommand();
          this.command.Connection = this.connection;
        }
        return this.command;
      }
      set
      {
        this.command = value;
      }
    }

    public IDbDataAdapter Adapter
    {
      get
      {
        if (this.adapter == null)
          this.adapter = (IDbDataAdapter) new OleDbDataAdapter(this.command as OleDbCommand);
        return this.adapter;
      }
      set
      {
        this.adapter = value;
      }
    }

    public OLEDBProvider()
    {
    }

    public OLEDBProvider(string connectionstr)
      : this()
    {
      this.connectionString = connectionstr;
    }

    public void Open()
    {
      if (this.connection == null)
        return;
      this.connection.Open();
    }

    public void Close()
    {
      if (this.connection == null)
        return;
      this.connection.Close();
    }

    public void BeginTransaction()
    {
      if (this.Connection.State == ConnectionState.Closed)
        this.Connection.Open();
      this.transaction = this.Connection.BeginTransaction();
      this.Command.Transaction = this.transaction;
    }

    public void RollBack()
    {
      if (this.transaction == null)
        return;
      this.transaction.Rollback();
      this.command.Transaction = (IDbTransaction) null;
      this.transaction.Dispose();
    }

    public void Commit()
    {
      if (this.transaction == null)
        return;
      this.transaction.Commit();
      this.command.Transaction = (IDbTransaction) null;
      this.transaction.Dispose();
    }

    public IDbProvider CreateInstance()
    {
      return (IDbProvider) new OLEDBProvider();
    }

    public void Dispose()
    {
      this.Close();
      GC.SuppressFinalize((object) this);
    }
  }
}
