using System;

namespace Auroratech.DataClient
{
  public sealed class RelationsAttribute : RelationAttribute
  {
    public RelationsAttribute()
    {
    }

    public RelationsAttribute(string name, Type dataType, string keyName, string className)
      : base(name, dataType, keyName, className)
    {
    }

    public RelationsAttribute(string name, string sqlPrefix, Type dataType, string keyName, string className)
      : base(name, sqlPrefix, dataType, keyName, className)
    {
    }
  }
}
