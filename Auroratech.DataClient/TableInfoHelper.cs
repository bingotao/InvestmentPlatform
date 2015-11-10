using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace Auroratech.DataClient
{
  public class TableInfoHelper
  {
    private const int LENGTH = 1;

    public static TableInfo GetTableInfo(Type type)
    {
      TableInfo tableInfo = TableInfoDictionary.GetTableInfo(type);
      if (tableInfo == null)
      {
        tableInfo = new TableInfo();
        TableSchema[] tableSchemaArray = type.GetCustomAttributes(typeof (TableSchema), false) as TableSchema[];
        foreach (PropertyInfo propertyInfo in type.GetProperties())
        {
          tableInfo.DicProperties.Add(propertyInfo.Name, propertyInfo);
          if (propertyInfo.GetCustomAttributes(typeof (ColumnAttribute), false).Length == 1)
            tableInfo.DicColumns.Add(propertyInfo.Name, propertyInfo.GetCustomAttributes(typeof (ColumnAttribute), false)[0] as ColumnAttribute);
          if (propertyInfo.GetCustomAttributes(typeof (RelationAttribute), false).Length == 1)
            tableInfo.DicLinkTable.Add(propertyInfo.Name, propertyInfo.GetCustomAttributes(typeof (RelationAttribute), false)[0] as RelationAttribute);
          if (propertyInfo.GetCustomAttributes(typeof (RelationsAttribute), false).Length == 1)
            tableInfo.DicLinkTables.Add(propertyInfo.Name, propertyInfo.GetCustomAttributes(typeof (RelationsAttribute), false)[0] as RelationsAttribute);
        }
        foreach (FieldInfo fieldInfo in type.GetFields())
          tableInfo.DicFields.Add(fieldInfo.Name, fieldInfo);
        if (tableSchemaArray.Length != 1)
          throw new Exception("一个实体类上不能有相同的特性");
        tableInfo.Table = tableSchemaArray[0];
        tableInfo.Columns = Enumerable.ToArray<ColumnAttribute>((IEnumerable<ColumnAttribute>) tableInfo.DicColumns.Values);
        tableInfo.Fields = Enumerable.ToArray<FieldInfo>((IEnumerable<FieldInfo>) tableInfo.DicFields.Values);
        tableInfo.LinkTable = Enumerable.ToArray<RelationAttribute>((IEnumerable<RelationAttribute>) tableInfo.DicLinkTable.Values);
        tableInfo.LinkTables = Enumerable.ToArray<RelationsAttribute>((IEnumerable<RelationsAttribute>) tableInfo.DicLinkTables.Values);
        tableInfo.Properties = Enumerable.ToArray<PropertyInfo>((IEnumerable<PropertyInfo>) tableInfo.DicProperties.Values);
        TableInfoDictionary.InsertTableInfo(type, tableInfo);
      }
      return tableInfo;
    }

    public static PropertyInfo[] GetPropertyInfo(Type type)
    {
      return TableInfoHelper.GetTableInfo(type).Properties;
    }

    public static PropertyInfo[] GetPropertyInfo(IEntity entity)
    {
      return TableInfoHelper.GetTableInfo(entity).Properties;
    }

    public static PropertyInfo[] GetPropertyInfo<T>()
    {
      return TableInfoHelper.GetTableInfo<T>().Properties;
    }

    public static FieldInfo[] GetFieldInfo<T>()
    {
      return TableInfoHelper.GetTableInfo<T>().Fields;
    }

    public static RelationAttribute[] GetLinkTableAttribute(Type type)
    {
      return TableInfoHelper.GetTableInfo(type).LinkTable;
    }

    public static RelationAttribute[] GetLinkTableAttribute(IEntity entity)
    {
      return TableInfoHelper.GetTableInfo(entity).LinkTable;
    }

    public static RelationAttribute[] GetLinkTableAttribute<T>()
    {
      return TableInfoHelper.GetTableInfo<T>().LinkTable;
    }

    public static RelationsAttribute[] GetLinkTablesAttribute(Type type)
    {
      return TableInfoHelper.GetTableInfo(type).LinkTables;
    }

    public static RelationsAttribute[] GetLinkTablesAttribute(IEntity entity)
    {
      return TableInfoHelper.GetTableInfo(entity).LinkTables;
    }

    public static RelationsAttribute[] GetLinkTablesAttribute<T>()
    {
      return TableInfoHelper.GetTableInfo<T>().LinkTables;
    }

    public static TableInfo GetTableInfo(IEntity entity)
    {
      return TableInfoHelper.GetTableInfo(entity.GetType());
    }

    public static TableInfo GetTableInfo<T>()
    {
      return TableInfoHelper.GetTableInfo(typeof (T));
    }

    public static ColumnAttribute[] GetColumnAttribute(Type type)
    {
      return TableInfoHelper.GetTableInfo(type).Columns;
    }

    public static ColumnAttribute[] GetColumnAttribute(IEntity entity)
    {
      return TableInfoHelper.GetTableInfo(entity).Columns;
    }

    public static ColumnAttribute[] GetColumnAttribute<T>()
    {
      return TableInfoHelper.GetTableInfo<T>().Columns;
    }

    public static FieldInfo[] GetFieldInfo(Type type)
    {
      return TableInfoHelper.GetTableInfo(type).Fields;
    }

    public static FieldInfo[] GetFieldInfo(IEntity entity)
    {
      return TableInfoHelper.GetTableInfo(entity).Fields;
    }
  }
}
