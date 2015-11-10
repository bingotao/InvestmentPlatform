using System;
using System.Collections.Generic;

namespace Auroratech.DataClient
{
  public static class TableInfoDictionary
  {
    private static IDictionary<Type, TableInfo> cache = (IDictionary<Type, TableInfo>) new Dictionary<Type, TableInfo>();

    public static void InsertTableInfo(Type type, TableInfo tableInfo)
    {
      if (TableInfoDictionary.cache.ContainsKey(type))
        return;
      TableInfoDictionary.cache.Add(type, tableInfo);
    }

    public static void InsertTableInfo(IEntity entity, TableInfo tableInfo)
    {
      TableInfoDictionary.InsertTableInfo(entity.GetType(), tableInfo);
    }

    public static TableInfo GetTableInfo(Type type)
    {
      if (TableInfoDictionary.cache.ContainsKey(type))
        return TableInfoDictionary.cache[type];
      return (TableInfo) null;
    }

    public static TableInfo GetTableInfo(IEntity entity)
    {
      return TableInfoDictionary.GetTableInfo(entity.GetType());
    }

    public static TableInfo GetTableInfo<T>() where T : IEntity
    {
      return TableInfoDictionary.GetTableInfo(typeof (T));
    }
  }
}
