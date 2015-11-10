using System;

namespace Auroratech.DataClient
{
  public class RelationAttribute : Attribute
  {
    private string name;
    private string sqlPrefix;
    private Type dataType;
    private string keyName;
    private string className;
    private bool isLazy;

    public string Name
    {
      get
      {
        return this.name;
      }
      set
      {
        this.name = value;
      }
    }

    public string SqlPrefix
    {
      get
      {
        return this.sqlPrefix;
      }
      set
      {
        this.sqlPrefix = value;
      }
    }

    public Type DataType
    {
      get
      {
        return this.dataType;
      }
      set
      {
        this.dataType = value;
      }
    }

    public string KeyName
    {
      get
      {
        return this.keyName;
      }
      set
      {
        this.keyName = value;
      }
    }

    public string ClassName
    {
      get
      {
        return this.className;
      }
      set
      {
        this.className = value;
      }
    }

    public bool IsLazy
    {
      get
      {
        return this.isLazy;
      }
      set
      {
        this.isLazy = value;
      }
    }

    public RelationAttribute()
    {
    }

    public RelationAttribute(string name, Type dataType, string keyName, string className)
    {
      this.name = name;
      this.dataType = dataType;
      this.keyName = keyName;
      this.className = className;
    }

    public RelationAttribute(string name, string sqlPrefix, Type dataType, string keyName, string className)
    {
      this.name = name;
      this.sqlPrefix = sqlPrefix;
      this.dataType = dataType;
      this.keyName = keyName;
      this.className = className;
    }
  }
}
