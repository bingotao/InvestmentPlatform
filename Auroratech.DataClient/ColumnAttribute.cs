using System;

namespace Auroratech.DataClient
{
  public sealed class ColumnAttribute : Attribute
  {
    private string fieldname;
    private string tableName;
    private string fieldType;
    private int length;
    private bool nullable;
    private object defaultValue;
    private bool isPrimaryKey;
    private bool autoIncrement;
    private bool isUnique;
    private string regularExpress;
    private bool isForeignKey;
    private string foreignTabName;
    private string description;

    public string FieldName
    {
      get
      {
        return this.fieldname;
      }
      set
      {
        this.fieldname = value;
      }
    }

    public string TableName
    {
      get
      {
        return this.tableName;
      }
      set
      {
        this.tableName = value;
      }
    }

    public string FieldType
    {
      get
      {
        return this.fieldType;
      }
      set
      {
        this.fieldType = value;
      }
    }

    public int Length
    {
      get
      {
        return this.length;
      }
      set
      {
        this.length = value;
      }
    }

    public bool Nullable
    {
      get
      {
        return this.nullable;
      }
      set
      {
        this.nullable = value;
      }
    }

    public object DefaultValue
    {
      get
      {
        return this.defaultValue;
      }
      set
      {
        this.defaultValue = value;
      }
    }

    public bool IsPrimaryKey
    {
      get
      {
        return this.isPrimaryKey;
      }
      set
      {
        this.isPrimaryKey = value;
      }
    }

    public bool AutoIncrement
    {
      get
      {
        return this.autoIncrement;
      }
      set
      {
        this.autoIncrement = value;
      }
    }

    public string RegularExpress
    {
      get
      {
        return this.regularExpress;
      }
      set
      {
        this.regularExpress = value;
      }
    }

    public bool IsForeignKey
    {
      get
      {
        return this.isForeignKey;
      }
      set
      {
        this.isForeignKey = value;
      }
    }

    public string ForeignTableName
    {
      get
      {
        return this.foreignTabName;
      }
      set
      {
        this.foreignTabName = value;
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

    public bool IsUnique
    {
      get
      {
        return this.isUnique;
      }
      set
      {
        this.isUnique = value;
      }
    }

    public ColumnAttribute()
    {
    }

    public ColumnAttribute(string name, string dataType, bool isPrimaryKey, bool autoIncrement, bool isUnique, bool isForeignKey, string foreignTabName)
    {
      this.fieldname = name;
      this.fieldType = dataType;
      this.isPrimaryKey = isPrimaryKey;
      this.autoIncrement = autoIncrement;
      this.isUnique = isUnique;
      this.isForeignKey = isForeignKey;
      this.foreignTabName = foreignTabName;
    }

    public ColumnAttribute(string name, string tableName, string dataType, int length, bool canNull, object defaultValue, bool isPrimaryKey, bool autoIncrement, bool isUnique, string regularExpress, bool isForeignKey, string foreignTabName, string information)
    {
      this.fieldname = name;
      this.tableName = tableName;
      this.fieldType = dataType;
      this.length = length;
      this.nullable = canNull;
      this.defaultValue = defaultValue;
      this.isPrimaryKey = isPrimaryKey;
      this.autoIncrement = autoIncrement;
      this.regularExpress = regularExpress;
      this.isForeignKey = isForeignKey;
      this.ForeignTableName = foreignTabName;
      this.description = information;
      this.isUnique = isUnique;
    }

    public override string ToString()
    {
      return this.Description;
    }
  }
}
