using System;

namespace Auroratech.DataClient
{
  public sealed class TableSchema : Attribute
  {
    private string primaryKey = "";
    private string description = "";
    private string tablename;
    private string databaseName;

    public string TableName
    {
      get
      {
        return this.tablename;
      }
      set
      {
        this.tablename = value;
      }
    }

    public string DatabaseName
    {
      get
      {
        return this.databaseName;
      }
      set
      {
        this.databaseName = value;
      }
    }

    public string PrimaryKey
    {
      get
      {
        return this.primaryKey;
      }
      set
      {
        this.primaryKey = value;
      }
    }

    public string Description
    {
      get
      {
        return this.description;
      }
      set
      {
        this.description = value;
      }
    }

    public TableSchema()
    {
    }

    public TableSchema(string name, string dBName, string primaryKeyName, bool isInternal)
    {
      this.tablename = name;
      this.databaseName = dBName;
      this.primaryKey = primaryKeyName;
    }

    public TableSchema(string name, string dBName, string primaryKeyName, string information, bool isInternal, string version)
    {
      this.tablename = name;
      this.databaseName = dBName;
      this.primaryKey = primaryKeyName;
      this.description = information;
    }
  }
}
