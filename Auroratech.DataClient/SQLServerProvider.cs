﻿using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace Auroratech.DataClient
{
  public class SQLServerProvider : IDbProvider, IDisposable
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
          this.connectionString = ConfigurationManager.ConnectionStrings["SQLServerConnectionString"].ConnectionString;
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
          this.connection = (IDbConnection) new SqlConnection(this.ConnectionString);
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
          this.command = (IDbCommand) new SqlCommand();
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
          this.adapter = (IDbDataAdapter) new SqlDataAdapter(this.command as SqlCommand);
        return this.adapter;
      }
      set
      {
        this.adapter = value;
      }
    }

    public SQLServerProvider()
    {
    }

    public SQLServerProvider(string connectionstr)
      : this()
    {
      this.connectionString = connectionstr;
    }

    public void Open()
    {
      if (this.Connection == null || this.Connection.State == ConnectionState.Open)
        return;
      this.connection.Open();
    }

    public void Close()
    {
      if (this.Connection == null || this.Connection.State == ConnectionState.Closed)
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
      return (IDbProvider) new SQLServerProvider();
    }

    public void Dispose()
    {
      this.Close();
      GC.SuppressFinalize((object) this);
    }
  }
}
