using System;
using System.Collections.Generic;
using System.Reflection;

namespace Auroratech.DataClient
{
  [Serializable]
  public class TableInfo : IEntity, IDisposable
  {
    private IDictionary<string, ColumnAttribute> dicColumns = (IDictionary<string, ColumnAttribute>) new Dictionary<string, ColumnAttribute>();
    private IDictionary<string, FieldInfo> dicFields = (IDictionary<string, FieldInfo>) new Dictionary<string, FieldInfo>();
    private IDictionary<string, PropertyInfo> dicProperties = (IDictionary<string, PropertyInfo>) new Dictionary<string, PropertyInfo>();
    private IDictionary<string, RelationAttribute> dicLinkTable = (IDictionary<string, RelationAttribute>) new Dictionary<string, RelationAttribute>();
    private IDictionary<string, RelationsAttribute> dicLinkTables = (IDictionary<string, RelationsAttribute>) new Dictionary<string, RelationsAttribute>();
    private TableSchema table;
    private ColumnAttribute[] columns;
    private FieldInfo[] fields;
    private PropertyInfo[] properties;
    private RelationAttribute[] linkTable;
    private RelationsAttribute[] linkTables;

    public TableSchema Table
    {
      get
      {
        return this.table;
      }
      set
      {
        this.table = value;
      }
    }

    public ColumnAttribute[] Columns
    {
      get
      {
        return this.columns;
      }
      set
      {
        this.columns = value;
      }
    }

    public FieldInfo[] Fields
    {
      get
      {
        return this.fields;
      }
      set
      {
        this.fields = value;
      }
    }

    public PropertyInfo[] Properties
    {
      get
      {
        return this.properties;
      }
      set
      {
        this.properties = value;
      }
    }

    public RelationAttribute[] LinkTable
    {
      get
      {
        return this.linkTable;
      }
      set
      {
        this.linkTable = value;
      }
    }

    public RelationsAttribute[] LinkTables
    {
      get
      {
        return this.linkTables;
      }
      set
      {
        this.linkTables = value;
      }
    }

    public IDictionary<string, ColumnAttribute> DicColumns
    {
      get
      {
        return this.dicColumns;
      }
      set
      {
        this.dicColumns = value;
      }
    }

    public IDictionary<string, FieldInfo> DicFields
    {
      get
      {
        return this.dicFields;
      }
      set
      {
        this.dicFields = value;
      }
    }

    public IDictionary<string, PropertyInfo> DicProperties
    {
      get
      {
        return this.dicProperties;
      }
      set
      {
        this.dicProperties = value;
      }
    }

    public IDictionary<string, RelationAttribute> DicLinkTable
    {
      get
      {
        return this.dicLinkTable;
      }
      set
      {
        this.dicLinkTable = value;
      }
    }

    public IDictionary<string, RelationsAttribute> DicLinkTables
    {
      get
      {
        return this.dicLinkTables;
      }
      set
      {
        this.dicLinkTables = value;
      }
    }

    public TableInfo()
    {
    }

    public TableInfo(TableSchema table, ColumnAttribute[] columns, FieldInfo[] fields, PropertyInfo[] properties, RelationAttribute[] linkTable, RelationsAttribute[] linkTables)
    {
      this.table = table;
      this.columns = columns;
      this.fields = fields;
      this.properties = properties;
      this.linkTable = linkTable;
      this.linkTables = linkTables;
    }

    public void Dispose()
    {
      GC.SuppressFinalize((object) this);
    }
  }
}
