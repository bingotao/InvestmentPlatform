using System;
using System.Collections.Generic;
using System.Data;
using System.Data.OleDb;
using System.Linq;
using System.Text;

namespace Auroratech.DataClient
{
    public class OLEDBSqlFactory : IOLEDBSqlFactory, IDisposable
    {
        public string CreateDeleteSql<T>(T t, string whereclause)
        {
            return this.CreateDeleteSql(typeof(T), whereclause);
        }

        public string CreateDeleteSql(Type type, string whereclause)
        {
            StringBuilder stringBuilder = new StringBuilder();
            TableInfoDictionary.InsertTableInfo(type, TableInfoHelper.GetTableInfo(type));
            stringBuilder.AppendFormat("delete from {0} " + whereclause, (object)TableInfoDictionary.GetTableInfo(type).Table.TableName);
            return stringBuilder.ToString();
        }

        public string CreateInsertSql(IEntity entity, out IDataParameter[] param)
        {
            return this.CreateInsertSql(entity.GetType(), (object)entity, out param);
        }

        public string CreateInsertSql(Type type, object value, out IDataParameter[] param)
        {
            if (value == null)
                throw new NullReferenceException("保存的实体为空");
            StringBuilder stringBuilder1 = new StringBuilder("");
            StringBuilder stringBuilder2 = new StringBuilder("");
            TableInfoDictionary.InsertTableInfo(type, TableInfoHelper.GetTableInfo(type));
            IDictionary<string, ColumnAttribute> dicColumns = TableInfoDictionary.GetTableInfo(type).DicColumns;
            if (dicColumns.Keys.Count > 0)
            {
                stringBuilder1.AppendFormat("insert into {0} (", (object)TableInfoDictionary.GetTableInfo(type).Table.TableName);
                stringBuilder2.AppendFormat(" values (");
                IList<IDataParameter> list = (IList<IDataParameter>)new List<IDataParameter>();
                foreach (string name in (IEnumerable<string>)dicColumns.Keys)
                {
                    if (!dicColumns[name].AutoIncrement)
                    {
                        stringBuilder1.AppendFormat("{0},", (object)dicColumns[name].FieldName);
                        stringBuilder2.AppendFormat("{0},", (object)"?");
                    }
                    if (EntityFactory.GetPropertyValue(value, name) == null)
                        list.Add(this.CreateParameter("@" + name, (object)DBNull.Value));
                    else
                        list.Add(this.CreateParameter("@" + name, dicColumns[name].FieldType, EntityFactory.GetPropertyValue(value, name)));
                }
                stringBuilder1.Replace(",", ")", stringBuilder1.Length - 1, 1);
                stringBuilder2.Replace(",", ")", stringBuilder2.Length - 1, 1);
                param = Enumerable.ToArray<IDataParameter>((IEnumerable<IDataParameter>)list);
                return stringBuilder1.ToString() + stringBuilder2.ToString();
            }
            param = (IDataParameter[])null;
            return (string)null;
        }

        public string CreateInsertSql<T>(T t, out IDataParameter[] param) where T : IEntity
        {
            return this.CreateInsertSql(typeof(T), (object)t, out param);
        }

        public string CreateUpdateSql(IEntity entity, out IDataParameter[] param)
        {
            return this.CreateUpdateSql(entity.GetType(), (object)entity, out param);
        }

        public string CreateUpdateSql(Type type, object value, out IDataParameter[] param)
        {
            if (value == null)
                throw new NullReferenceException("更新实体为空");
            StringBuilder stringBuilder1 = new StringBuilder("");
            StringBuilder stringBuilder2 = new StringBuilder("");
            TableInfoDictionary.InsertTableInfo(type, TableInfoHelper.GetTableInfo(type));
            IDictionary<string, ColumnAttribute> dicColumns = TableInfoDictionary.GetTableInfo(type).DicColumns;
            if (dicColumns.Keys.Count > 0)
            {
                stringBuilder1.AppendFormat("update {0} set ", (object)TableInfoDictionary.GetTableInfo(type).Table.TableName);
                stringBuilder2.AppendFormat(" where ");
                IList<IDataParameter> list = (IList<IDataParameter>)new List<IDataParameter>();
                string name1 = "";
                ColumnAttribute columnAttribute = (ColumnAttribute)null;
                foreach (string name2 in (IEnumerable<string>)dicColumns.Keys)
                {
                    if (dicColumns[name2].IsPrimaryKey)
                    {
                        name1 = name2;
                        columnAttribute = dicColumns[name2];
                    }
                    else if (!dicColumns[name2].IsPrimaryKey && !dicColumns[name2].IsUnique && !dicColumns[name2].AutoIncrement)
                    {
                        stringBuilder1.AppendFormat("{0}=@{1},", (object)dicColumns[name2].FieldName, (object)dicColumns[name2].FieldName);
                        list.Add(this.CreateParameter("@" + dicColumns[name2].FieldName, dicColumns[name2].FieldType, EntityFactory.GetPropertyValue(value, name2) == null ? (object)DBNull.Value : EntityFactory.GetPropertyValue(value, name2)));
                    }
                }
                if (!string.IsNullOrEmpty(name1))
                {
                    stringBuilder2.AppendFormat("{0}=@{1}", (object)columnAttribute.FieldName, (object)columnAttribute.FieldName);
                    list.Add(this.CreateParameter("@" + columnAttribute.FieldName, columnAttribute.FieldType, EntityFactory.GetPropertyValue(value, name1) == null ? (object)DBNull.Value : EntityFactory.GetPropertyValue(value, name1)));
                }
                stringBuilder1.Remove(stringBuilder1.Length - 1, 1);
                param = Enumerable.ToArray<IDataParameter>((IEnumerable<IDataParameter>)list);
                return stringBuilder1.ToString() + stringBuilder2.ToString();
            }
            param = (IDataParameter[])null;
            return (string)null;
        }

        public string CreateUpdateSql(IEntity entity, out IDataParameter[] param, string propertyName)
        {
            if (entity == null)
                throw new NullReferenceException("更新实体为空");
            if (string.IsNullOrEmpty(propertyName))
                throw new NullReferenceException("属性必须不为空");
            if (!TableInfoDictionary.GetTableInfo(entity).DicColumns.Keys.Contains(propertyName))
                throw new Exception("实体不包含属性: " + propertyName);
            return this.CreateUpdateSql(entity, out param, new string[1]
      {
        propertyName
      });
        }

        public string CreateUpdateSql(Type type, object value, out IDataParameter[] param, string propertyName)
        {
            if (value == null)
                throw new NullReferenceException("更新实体为空");
            if (string.IsNullOrEmpty(propertyName))
                throw new NullReferenceException("属性必须不为空");
            TableInfoDictionary.InsertTableInfo(type, TableInfoHelper.GetTableInfo(type));
            if (!TableInfoDictionary.GetTableInfo(type).DicColumns.Keys.Contains(propertyName))
                throw new Exception("实体不包含属性: " + propertyName);
            return this.CreateUpdateSql(type, value, out param, new string[1]
      {
        propertyName
      });
        }

        public string CreateUpdateSql(IEntity entity, out IDataParameter[] param, string[] propertyNames)
        {
            return this.CreateUpdateSql(entity.GetType(), (object)entity, out param, propertyNames);
        }

        public string CreateUpdateSql(Type type, object value, out IDataParameter[] param, string[] propertyNames)
        {
            if (value == null)
                throw new NullReferenceException("更新实体为空");
            if (propertyNames == null)
                throw new NullReferenceException("属性数组为空");
            TableInfoDictionary.InsertTableInfo(type, TableInfoHelper.GetTableInfo(type));
            IDictionary<string, ColumnAttribute> dicColumns = TableInfoDictionary.GetTableInfo(type).DicColumns;
            StringBuilder stringBuilder1 = new StringBuilder("");
            StringBuilder stringBuilder2 = new StringBuilder("");
            if (dicColumns.Keys.Count > 0)
            {
                stringBuilder1.AppendFormat("update {0} set ", (object)TableInfoDictionary.GetTableInfo(type).Table.TableName);
                stringBuilder2.AppendFormat(" where 1=1 ");
                IList<IDataParameter> list = (IList<IDataParameter>)new List<IDataParameter>();
                foreach (string name in (IEnumerable<string>)dicColumns.Keys)
                {
                    if (!Enumerable.Contains<string>((IEnumerable<string>)propertyNames, name) && !dicColumns[name].IsPrimaryKey && (!dicColumns[name].IsUnique && !dicColumns[name].AutoIncrement))
                    {
                        stringBuilder1.AppendFormat("{0}={1},", (object)dicColumns[name].FieldName, (object)"?");
                        list.Add(this.CreateParameter("@" + dicColumns[name].FieldName, dicColumns[name].FieldType, EntityFactory.GetPropertyValue(value, name) == null ? (object)DBNull.Value : EntityFactory.GetPropertyValue(value, name)));
                    }
                }
                foreach (string name in (IEnumerable<string>)dicColumns.Keys)
                {
                    if (Enumerable.Contains<string>((IEnumerable<string>)propertyNames, name))
                    {
                        stringBuilder2.AppendFormat("and {0}={1} ", (object)dicColumns[name].FieldName, (object)"?");
                        list.Add(this.CreateParameter("@" + dicColumns[name].FieldName, dicColumns[name].FieldType, EntityFactory.GetPropertyValue(value, name) == null ? (object)DBNull.Value : EntityFactory.GetPropertyValue(value, name)));
                    }
                    else if (!dicColumns[name].IsPrimaryKey && !dicColumns[name].IsUnique)
                    {
                        int num = dicColumns[name].AutoIncrement ? 1 : 0;
                    }
                }
                stringBuilder1.Remove(stringBuilder1.Length - 1, 1);
                param = Enumerable.ToArray<IDataParameter>((IEnumerable<IDataParameter>)list);
                return stringBuilder1.ToString() + stringBuilder2.ToString();
            }
            param = (IDataParameter[])null;
            return (string)null;
        }

        public string CreateUpdateSql(IEntity entity, out IDataParameter[] param, ConditionComponent component)
        {
            StringBuilder stringBuilder1 = new StringBuilder("");
            StringBuilder stringBuilder2 = new StringBuilder("");
            IList<IDataParameter> list = (IList<IDataParameter>)new List<IDataParameter>();
            stringBuilder1.AppendFormat("update {0} set ", (object)TableInfoDictionary.GetTableInfo(entity).Table.TableName);
            stringBuilder2.Append(" where 1=1 ");
            foreach (string name in (IEnumerable<string>)TableInfoDictionary.GetTableInfo(entity).DicProperties.Keys)
            {
                if (component.DicComponent.Keys.Contains(name))
                {
                    switch (component.DicComponent[name].SearchMode)
                    {
                        case SM.Equals:
                            stringBuilder2.AppendFormat("and {0}{1}@{2} ", (object)TableInfoDictionary.GetTableInfo(entity).DicColumns[name].FieldName, (object)"=", (object)TableInfoDictionary.GetTableInfo(entity).DicColumns[name].FieldName);
                            break;
                        case SM.UnEquals:
                            stringBuilder2.AppendFormat("and {0}{1}@{2} ", (object)TableInfoDictionary.GetTableInfo(entity).DicColumns[name].FieldName, (object)"!=", (object)TableInfoDictionary.GetTableInfo(entity).DicColumns[name].FieldName);
                            break;
                        case SM.Greater:
                            stringBuilder2.AppendFormat("and {0}{1}@{2} ", (object)TableInfoDictionary.GetTableInfo(entity).DicColumns[name].FieldName, (object)">", (object)TableInfoDictionary.GetTableInfo(entity).DicColumns[name].FieldName);
                            break;
                        case SM.GreaterOrEquals:
                            stringBuilder2.AppendFormat("and {0}{1}@{2} ", (object)TableInfoDictionary.GetTableInfo(entity).DicColumns[name].FieldName, (object)">=", (object)TableInfoDictionary.GetTableInfo(entity).DicColumns[name].FieldName);
                            break;
                        case SM.Less:
                            stringBuilder2.AppendFormat("and {0}{1}@{2} ", (object)TableInfoDictionary.GetTableInfo(entity).DicColumns[name].FieldName, (object)"<", (object)TableInfoDictionary.GetTableInfo(entity).DicColumns[name].FieldName);
                            break;
                        case SM.LessOrEquals:
                            stringBuilder2.AppendFormat("and {0}{1}@{2} ", (object)TableInfoDictionary.GetTableInfo(entity).DicColumns[name].FieldName, (object)"<=", (object)TableInfoDictionary.GetTableInfo(entity).DicColumns[name].FieldName);
                            break;
                    }
                    list.Add(this.CreateParameter("@" + TableInfoDictionary.GetTableInfo(entity).DicColumns[name].FieldName, TableInfoDictionary.GetTableInfo(entity).DicColumns[name].FieldType, EntityFactory.GetPropertyValue(entity, name) == null ? (object)DBNull.Value : EntityFactory.GetPropertyValue(entity, name)));
                }
                else if (!TableInfoDictionary.GetTableInfo(entity).DicColumns[name].IsPrimaryKey && !TableInfoDictionary.GetTableInfo(entity).DicColumns[name].IsUnique && !TableInfoDictionary.GetTableInfo(entity).DicColumns[name].AutoIncrement)
                {
                    stringBuilder1.AppendFormat("{0}=@{1},", (object)TableInfoDictionary.GetTableInfo(entity).DicColumns[name].FieldName, (object)TableInfoDictionary.GetTableInfo(entity).DicColumns[name].FieldName);
                    list.Add(this.CreateParameter("@" + TableInfoDictionary.GetTableInfo(entity).DicColumns[name].FieldName, TableInfoDictionary.GetTableInfo(entity).DicColumns[name].FieldType, EntityFactory.GetPropertyValue(entity, name) == null ? (object)DBNull.Value : EntityFactory.GetPropertyValue(entity, name)));
                }
            }
            stringBuilder1.Remove(stringBuilder1.Length - 1, 1);
            param = Enumerable.ToArray<IDataParameter>((IEnumerable<IDataParameter>)list);
            return stringBuilder1.ToString() + stringBuilder2.ToString();
        }

        public string CreateDeleteAllSql<T>() where T : class
        {
            Type type = typeof(T);
            StringBuilder stringBuilder = new StringBuilder("");
            TableInfoDictionary.InsertTableInfo(type, TableInfoHelper.GetTableInfo(type));
            stringBuilder.AppendFormat("delete from {0}", (object)TableInfoDictionary.GetTableInfo(type).Table.TableName);
            return stringBuilder.ToString();
        }

        public string CreateDeleteSql(IEntity entity, out IDataParameter[] param)
        {
            return this.CreateDeleteSql(entity.GetType(), (object)entity, out param);
        }

        public string CreateDeleteSql(Type type, object value, out IDataParameter[] param)
        {
            if (value == null)
                throw new NullReferenceException("删除实体为空");
            TableInfoDictionary.InsertTableInfo(type, TableInfoHelper.GetTableInfo(type));
            IDictionary<string, ColumnAttribute> dicColumns = TableInfoDictionary.GetTableInfo(type).DicColumns;
            StringBuilder stringBuilder1 = new StringBuilder("");
            StringBuilder stringBuilder2 = new StringBuilder("");
            if (dicColumns.Keys.Count > 0)
            {
                stringBuilder1.AppendFormat("delete from {0} ", (object)TableInfoDictionary.GetTableInfo(type).Table.TableName);
                IList<IDataParameter> list = (IList<IDataParameter>)new List<IDataParameter>();
                foreach (string name in (IEnumerable<string>)dicColumns.Keys)
                {
                    if (dicColumns[name].IsPrimaryKey)
                    {
                        stringBuilder2.AppendFormat("where {0}=?", (object)dicColumns[name].FieldName);
                        list.Add(this.CreateParameter("@" + dicColumns[name].FieldName, dicColumns[name].FieldType, EntityFactory.GetPropertyValue(value, name) == null ? (object)DBNull.Value : EntityFactory.GetPropertyValue(value, name)));
                        break;
                    }
                }
                param = Enumerable.ToArray<IDataParameter>((IEnumerable<IDataParameter>)list);
                return stringBuilder1.ToString() + stringBuilder2.ToString();
            }
            param = (IDataParameter[])null;
            return (string)null;
        }

        public string CreateDeleteSql(IEntity entity, out IDataParameter[] param, string propertyName)
        {
            if (entity == null)
                throw new NullReferenceException("删除实体为空");
            if (string.IsNullOrEmpty(propertyName))
                throw new NullReferenceException("属性必须不为空");
            return this.CreateDeleteSql(entity, out param, new string[1]
      {
        propertyName
      });
        }

        public string CreateDeleteSql(Type type, object value, out IDataParameter[] param, string propertyName)
        {
            return this.CreateDeleteSql(type, value, out param, new string[1]
      {
        propertyName
      });
        }

        public string CreateDeleteSql(IEntity entity, out IDataParameter[] param, string[] propertyNames)
        {
            return this.CreateDeleteSql(entity.GetType(), (object)entity, out param, propertyNames);
        }

        public string CreateDeleteSql(Type type, object value, out IDataParameter[] param, string[] propertyNames)
        {
            if (value == null)
                throw new NullReferenceException("删除实体为空");
            if (propertyNames == null)
                throw new NullReferenceException("属性数组为空");
            TableInfoDictionary.InsertTableInfo(type, TableInfoHelper.GetTableInfo(type));
            IDictionary<string, ColumnAttribute> dicColumns = TableInfoDictionary.GetTableInfo(type).DicColumns;
            StringBuilder stringBuilder1 = new StringBuilder("");
            StringBuilder stringBuilder2 = new StringBuilder("");
            if (dicColumns.Keys.Count > 0)
            {
                stringBuilder1.AppendFormat("delete from {0} ", (object)TableInfoDictionary.GetTableInfo(type).Table.TableName);
                stringBuilder2.AppendFormat(" where 1=1 ");
                IList<IDataParameter> list = (IList<IDataParameter>)new List<IDataParameter>();
                foreach (string name in (IEnumerable<string>)dicColumns.Keys)
                {
                    if (Enumerable.Contains<string>((IEnumerable<string>)propertyNames, name))
                    {
                        stringBuilder2.AppendFormat("and {0}=? ", (object)dicColumns[name].FieldName, (object)dicColumns[name].FieldName);
                        if (EntityFactory.GetPropertyValue(value, name) == null)
                            throw new NullReferenceException("列 " + dicColumns[name].FieldName + " 值为空");
                        list.Add(this.CreateParameter("@" + dicColumns[name].FieldName, dicColumns[name].FieldType, EntityFactory.GetPropertyValue(value, name) == null ? (object)DBNull.Value : EntityFactory.GetPropertyValue(value, name)));
                    }
                }
                param = Enumerable.ToArray<IDataParameter>((IEnumerable<IDataParameter>)list);
                return stringBuilder1.ToString() + stringBuilder2.ToString();
            }
            param = (IDataParameter[])null;
            return (string)null;
        }

        public string CreateDeleteByPropertySql(Type type, IDictionary<string, object> dic, out IDataParameter[] param, ConditionComponent component)
        {
            IList<IDataParameter> list = (IList<IDataParameter>)new List<IDataParameter>();
            StringBuilder stringBuilder1 = new StringBuilder("");
            StringBuilder stringBuilder2 = new StringBuilder("");
            TableInfoDictionary.InsertTableInfo(type, TableInfoHelper.GetTableInfo(type));
            stringBuilder1.AppendFormat("delete from {0} where 1=1 ", (object)TableInfoDictionary.GetTableInfo(type).Table.TableName);
            foreach (string index in (IEnumerable<string>)dic.Keys)
            {
                switch (component.DicComponent[index].SearchMode)
                {
                    case SM.Equals:
                        stringBuilder2.AppendFormat("and {0}{1} ? ", (object)TableInfoDictionary.GetTableInfo(type).DicColumns[index].FieldName, (object)"=");
                        break;
                    case SM.UnEquals:
                        stringBuilder2.AppendFormat("and {0}{1} ? ", (object)TableInfoDictionary.GetTableInfo(type).DicColumns[index].FieldName, (object)"<>");
                        break;
                    case SM.Greater:
                        stringBuilder2.AppendFormat("and {0}{1} ? ", (object)TableInfoDictionary.GetTableInfo(type).DicColumns[index].FieldName, (object)">");
                        break;
                    case SM.GreaterOrEquals:
                        stringBuilder2.AppendFormat("and {0}{1} ? ", (object)TableInfoDictionary.GetTableInfo(type).DicColumns[index].FieldName, (object)">=");
                        break;
                    case SM.Less:
                        stringBuilder2.AppendFormat("and {0}{1} ? ", (object)TableInfoDictionary.GetTableInfo(type).DicColumns[index].FieldName, (object)"<");
                        break;
                    case SM.LessOrEquals:
                        stringBuilder2.AppendFormat("and {0}{1} ? ", (object)TableInfoDictionary.GetTableInfo(type).DicColumns[index].FieldName, (object)"<=");
                        break;
                }
                list.Add(this.CreateParameter("@" + TableInfoDictionary.GetTableInfo(type).DicColumns[index].FieldName, TableInfoDictionary.GetTableInfo(type).DicColumns[index].FieldType, dic[index]));
            }
            param = Enumerable.ToArray<IDataParameter>((IEnumerable<IDataParameter>)list);
            return stringBuilder1.ToString() + stringBuilder2.ToString();
        }

        public string CreateDeleteSql(IEntity entity, out IDataParameter[] param, ConditionComponent component)
        {
            if (entity == null)
                throw new NullReferenceException("删除实体为空");
            IList<IDataParameter> list = (IList<IDataParameter>)new List<IDataParameter>();
            StringBuilder stringBuilder1 = new StringBuilder("");
            StringBuilder stringBuilder2 = new StringBuilder("");
            stringBuilder1.AppendFormat("delete from {0} where 1=1 ", (object)TableInfoDictionary.GetTableInfo(entity).Table.TableName);
            foreach (string name in (IEnumerable<string>)component.DicComponent.Keys)
            {
                switch (component.DicComponent[name].SearchMode)
                {
                    case SM.Equals:
                        stringBuilder2.AppendFormat("and {0}{1}@{2} ", (object)TableInfoDictionary.GetTableInfo(entity).DicColumns[name].FieldName, (object)"=", (object)TableInfoDictionary.GetTableInfo(entity).DicColumns[name].FieldName);
                        break;
                    case SM.UnEquals:
                        stringBuilder2.AppendFormat("and {0}{1}@{2} ", (object)TableInfoDictionary.GetTableInfo(entity).DicColumns[name].FieldName, (object)"!=", (object)TableInfoDictionary.GetTableInfo(entity).DicColumns[name].FieldName);
                        break;
                    case SM.Greater:
                        stringBuilder2.AppendFormat("and {0}{1}@{2} ", (object)TableInfoDictionary.GetTableInfo(entity).DicColumns[name].FieldName, (object)">", (object)TableInfoDictionary.GetTableInfo(entity).DicColumns[name].FieldName);
                        break;
                    case SM.GreaterOrEquals:
                        stringBuilder2.AppendFormat("and {0}{1}@{2} ", (object)TableInfoDictionary.GetTableInfo(entity).DicColumns[name].FieldName, (object)">=", (object)TableInfoDictionary.GetTableInfo(entity).DicColumns[name].FieldName);
                        break;
                    case SM.Less:
                        stringBuilder2.AppendFormat("and {0}{1}@{2} ", (object)TableInfoDictionary.GetTableInfo(entity).DicColumns[name].FieldName, (object)"<", (object)TableInfoDictionary.GetTableInfo(entity).DicColumns[name].FieldName);
                        break;
                    case SM.LessOrEquals:
                        stringBuilder2.AppendFormat("and {0}{1}@{2} ", (object)TableInfoDictionary.GetTableInfo(entity).DicColumns[name].FieldName, (object)"<=", (object)TableInfoDictionary.GetTableInfo(entity).DicColumns[name].FieldName);
                        break;
                }
                list.Add(this.CreateParameter("@" + TableInfoDictionary.GetTableInfo(entity).DicColumns[name].FieldName, TableInfoDictionary.GetTableInfo(entity).DicColumns[name].FieldType, EntityFactory.GetPropertyValue(entity, name) == null ? (object)DBNull.Value : EntityFactory.GetPropertyValue(entity, name)));
            }
            param = Enumerable.ToArray<IDataParameter>((IEnumerable<IDataParameter>)list);
            return stringBuilder1.ToString() + stringBuilder2.ToString();
        }

        public string CreateSingleSql(IEntity entity, out IDataParameter[] param)
        {
            if (entity == null)
                throw new NullReferenceException("实体为空");
            StringBuilder stringBuilder = new StringBuilder("");
            TableInfoDictionary.InsertTableInfo(entity.GetType(), TableInfoHelper.GetTableInfo(entity.GetType()));
            stringBuilder.AppendFormat("select * from {0} ", (object)TableInfoDictionary.GetTableInfo(entity).Table.TableName);
            IList<IDataParameter> list = (IList<IDataParameter>)new List<IDataParameter>();
            stringBuilder.AppendFormat("where {0}=@{1}", (object)TableInfoDictionary.GetTableInfo(entity).Table.PrimaryKey, (object)TableInfoDictionary.GetTableInfo(entity).Table.PrimaryKey);
            list.Add(this.CreateParameter("@" + TableInfoDictionary.GetTableInfo(entity).Table.PrimaryKey, EntityFactory.GetPropertyValue(entity, TableInfoDictionary.GetTableInfo(entity).Table.PrimaryKey) == null ? (object)DBNull.Value : EntityFactory.GetPropertyValue(entity, TableInfoDictionary.GetTableInfo(entity).Table.PrimaryKey)));
            param = Enumerable.ToArray<IDataParameter>((IEnumerable<IDataParameter>)list);
            return stringBuilder.ToString();
        }

        public string CreateSingleSql(IEntity entity, out IDataParameter[] param, string[] propertyNames)
        {
            return this.CreateSingleSql(entity.GetType(), (object)entity, out param, propertyNames);
        }

        public string CreateSingleSql(Type type, object value, out IDataParameter[] param, string[] propertyNames)
        {
            if (value == null)
                throw new NullReferenceException("实体为空");
            IList<IDataParameter> list = (IList<IDataParameter>)new List<IDataParameter>();
            StringBuilder stringBuilder = new StringBuilder("");
            TableInfoDictionary.InsertTableInfo(type, TableInfoHelper.GetTableInfo(type));
            stringBuilder.AppendFormat("select * from {0} ", (object)TableInfoDictionary.GetTableInfo(type).Table.TableName);
            stringBuilder.AppendFormat("where ");
            foreach (string name in propertyNames)
            {
                stringBuilder.AppendFormat("{0}=? and ", (object)TableInfoDictionary.GetTableInfo(type).DicProperties[name].Name);
                if (EntityFactory.GetPropertyValue(value, name) == null)
                    throw new NullReferenceException("列 " + TableInfoDictionary.GetTableInfo(type).DicProperties[name].Name + " 值为空");
                list.Add(this.CreateParameter("@" + TableInfoDictionary.GetTableInfo(type).DicProperties[name].Name, EntityFactory.GetPropertyValue(value, name) == null ? (object)DBNull.Value : EntityFactory.GetPropertyValue(value, name)));
            }
            stringBuilder.Remove(stringBuilder.Length - 4, 4);
            param = Enumerable.ToArray<IDataParameter>((IEnumerable<IDataParameter>)list);
            return stringBuilder.ToString();
        }

        public string CreateSingleSql(Type entityType)
        {
            StringBuilder stringBuilder = new StringBuilder();
            TableInfoDictionary.InsertTableInfo(entityType, TableInfoHelper.GetTableInfo(entityType));
            stringBuilder.AppendFormat("select * from {0} where {1}=@{2}", (object)TableInfoDictionary.GetTableInfo(entityType).Table.TableName, (object)TableInfoDictionary.GetTableInfo(entityType).Table.PrimaryKey, (object)TableInfoDictionary.GetTableInfo(entityType).Table.PrimaryKey);
            return stringBuilder.ToString();
        }

        public string CreateSingleSql(Type type, object pkPropertyValue, out IDataParameter[] param)
        {
            IList<IDataParameter> list = (IList<IDataParameter>)new List<IDataParameter>();
            StringBuilder stringBuilder = new StringBuilder();
            TableInfoDictionary.InsertTableInfo(type, TableInfoHelper.GetTableInfo(type));
            stringBuilder.AppendFormat("select * from {0} where {1}=?", (object)TableInfoDictionary.GetTableInfo(type).Table.TableName, (object)TableInfoDictionary.GetTableInfo(type).Table.PrimaryKey);
            list.Add(this.CreateParameter("@" + TableInfoDictionary.GetTableInfo(type).Table.PrimaryKey, pkPropertyValue));
            param = Enumerable.ToArray<IDataParameter>((IEnumerable<IDataParameter>)list);
            return stringBuilder.ToString();
        }

        public string CreateSingleSqlExcludeField(Type type, object pkPropertyValue, string fieldName, out IDataParameter[] param)
        {
            IList<IDataParameter> list = (IList<IDataParameter>)new List<IDataParameter>();
            StringBuilder stringBuilder = new StringBuilder();
            TableInfoDictionary.InsertTableInfo(type, TableInfoHelper.GetTableInfo(type));
            stringBuilder.AppendFormat("select * from {0} where {1}=:{2}", (object)TableInfoDictionary.GetTableInfo(type).Table.TableName, (object)TableInfoDictionary.GetTableInfo(type).Table.PrimaryKey, (object)TableInfoDictionary.GetTableInfo(type).Table.PrimaryKey);
            list.Add(this.CreateParameter(":" + TableInfoDictionary.GetTableInfo(type).Table.PrimaryKey, pkPropertyValue));
            param = Enumerable.ToArray<IDataParameter>((IEnumerable<IDataParameter>)list);
            return stringBuilder.ToString();
        }

        public string CreateQuerySql(Type type)
        {
            TableInfoDictionary.InsertTableInfo(type, TableInfoHelper.GetTableInfo(type));
            StringBuilder stringBuilder = new StringBuilder();
            stringBuilder.AppendFormat("select * from {0}", (object)TableInfoDictionary.GetTableInfo(type).Table.TableName);
            return stringBuilder.ToString();
        }

        public string CreateQuerySql(Type type, string whereclause)
        {
            TableInfoDictionary.InsertTableInfo(type, TableInfoHelper.GetTableInfo(type));
            StringBuilder stringBuilder = new StringBuilder();
            stringBuilder.AppendFormat("select * from {0} " + whereclause, (object)TableInfoDictionary.GetTableInfo(type).Table.TableName);
            return stringBuilder.ToString();
        }

        public string CreateQueryByPropertySql(Type type, string propertyName, object value, out IDataParameter[] param)
        {
            StringBuilder stringBuilder = new StringBuilder();
            IList<IDataParameter> list = (IList<IDataParameter>)new List<IDataParameter>();
            TableInfoDictionary.InsertTableInfo(type, TableInfoHelper.GetTableInfo(type));
            stringBuilder.AppendFormat("select * from {0} where {1}=?", (object)TableInfoDictionary.GetTableInfo(type).Table.TableName, (object)TableInfoDictionary.GetTableInfo(type).DicColumns[propertyName].FieldName);
            list.Add(this.CreateParameter("@" + TableInfoDictionary.GetTableInfo(type).DicColumns[propertyName].FieldName, value));
            param = Enumerable.ToArray<IDataParameter>((IEnumerable<IDataParameter>)list);
            return stringBuilder.ToString();
        }

        public string CreateQueryByPropertySql(Type type, IDictionary<string, object> dic, out IDataParameter[] param)
        {
            StringBuilder stringBuilder = new StringBuilder();
            IList<IDataParameter> list = (IList<IDataParameter>)new List<IDataParameter>();
            TableInfoDictionary.InsertTableInfo(type, TableInfoHelper.GetTableInfo(type));
            stringBuilder.AppendFormat("select * from {0} where 1=1", (object)TableInfoDictionary.GetTableInfo(type).Table.TableName);
            foreach (string index in (IEnumerable<string>)dic.Keys)
            {
                stringBuilder.AppendFormat(" and {0}=?", (object)TableInfoDictionary.GetTableInfo(type).DicColumns[index].FieldName);
                list.Add(this.CreateParameter("@" + TableInfoDictionary.GetTableInfo(type).DicColumns[index].FieldName, dic[index]));
            }
            param = Enumerable.ToArray<IDataParameter>((IEnumerable<IDataParameter>)list);
            return stringBuilder.ToString();
        }

        public string CreateQueryByPropertySql(Type type, IDictionary<string, object> dic, out IDataParameter[] param, ConditionComponent component)
        {
            IList<IDataParameter> list = (IList<IDataParameter>)new List<IDataParameter>();
            StringBuilder stringBuilder1 = new StringBuilder("");
            StringBuilder stringBuilder2 = new StringBuilder("");
            stringBuilder1.AppendFormat("select * from {0} where 1=1 ", (object)TableInfoDictionary.GetTableInfo(type).Table.TableName);
            foreach (string index in (IEnumerable<string>)dic.Keys)
            {
                switch (component.DicComponent[index].SearchMode)
                {
                    case SM.Equals:
                        stringBuilder2.AppendFormat("and {0}{1} ? ", (object)TableInfoDictionary.GetTableInfo(type).DicColumns[index].FieldName, (object)"=");
                        break;
                    case SM.UnEquals:
                        stringBuilder2.AppendFormat("and {0}{1} ? ", (object)TableInfoDictionary.GetTableInfo(type).DicColumns[index].FieldName, (object)"<>");
                        break;
                    case SM.Greater:
                        stringBuilder2.AppendFormat("and {0}{1} ? ", (object)TableInfoDictionary.GetTableInfo(type).DicColumns[index].FieldName, (object)">");
                        break;
                    case SM.GreaterOrEquals:
                        stringBuilder2.AppendFormat("and {0}{1} ? ", (object)TableInfoDictionary.GetTableInfo(type).DicColumns[index].FieldName, (object)">=");
                        break;
                    case SM.Less:
                        stringBuilder2.AppendFormat("and {0}{1} ? ", (object)TableInfoDictionary.GetTableInfo(type).DicColumns[index].FieldName, (object)"<");
                        break;
                    case SM.LessOrEquals:
                        stringBuilder2.AppendFormat("and {0}{1} ? ", (object)TableInfoDictionary.GetTableInfo(type).DicColumns[index].FieldName, (object)"<=");
                        break;
                }
                list.Add(this.CreateParameter("@" + TableInfoDictionary.GetTableInfo(type).DicColumns[index].FieldName, dic[index]));
            }
            param = Enumerable.ToArray<IDataParameter>((IEnumerable<IDataParameter>)list);
            return stringBuilder1.ToString() + stringBuilder2.ToString();
        }

        public string CreateConverageSql(Type type, Converage converage)
        {
            StringBuilder stringBuilder = new StringBuilder();
            TableInfoDictionary.InsertTableInfo(type, TableInfoHelper.GetTableInfo(type));
            if (Converage.Count == converage)
                stringBuilder.AppendFormat("select count() from {0}", (object)TableInfoDictionary.GetTableInfo(type).Table.TableName);
            else if (Converage.CountNotNll == converage)
                stringBuilder.AppendFormat("select count(*) from {0}", (object)TableInfoDictionary.GetTableInfo(type).Table.TableName);
            return stringBuilder.ToString();
        }

        public string CreateConverageSql(Type type, string whereclause)
        {
            StringBuilder stringBuilder = new StringBuilder();
            TableInfoDictionary.InsertTableInfo(type, TableInfoHelper.GetTableInfo(type));
            stringBuilder.AppendFormat("select count(*) from {0} " + whereclause, (object)TableInfoDictionary.GetTableInfo(type).Table.TableName);
            return stringBuilder.ToString();
        }

        public string CreateConverageSql(Type type, Converage converage, string propertyName)
        {
            StringBuilder stringBuilder = new StringBuilder();
            if (string.IsNullOrEmpty(propertyName))
                converage = Converage.Count;
            if (Converage.Avg == converage)
                stringBuilder.AppendFormat("select avg({0}) from {1}", (object)TableInfoDictionary.GetTableInfo(type).DicColumns[propertyName].FieldName, (object)TableInfoDictionary.GetTableInfo(type).Table.TableName);
            else if (Converage.Max == converage)
                stringBuilder.AppendFormat("select max({0}) from {1}", (object)TableInfoDictionary.GetTableInfo(type).DicColumns[propertyName].FieldName, (object)TableInfoDictionary.GetTableInfo(type).Table.TableName);
            else if (converage == Converage.Min)
                stringBuilder.AppendFormat("select min({0}) from {1}", (object)TableInfoDictionary.GetTableInfo(type).DicColumns[propertyName].FieldName, (object)TableInfoDictionary.GetTableInfo(type).Table.TableName);
            else
                stringBuilder.AppendFormat("select count(*) from {1}", (object)TableInfoDictionary.GetTableInfo(type).DicColumns[propertyName].FieldName, (object)TableInfoDictionary.GetTableInfo(type).Table.TableName);
            return stringBuilder.ToString();
        }

        public string CreateConverageSql(Type type, Converage converage, string propertyName, IDictionary<string, object> dic, out IDataParameter[] param, ConditionComponent component)
        {
            StringBuilder stringBuilder = new StringBuilder();
            if (string.IsNullOrEmpty(propertyName))
                converage = Converage.Count;
            if (Converage.Avg == converage)
                stringBuilder.AppendFormat("select avg({0}) from {1} where 1=1 ", (object)TableInfoDictionary.GetTableInfo(type).DicColumns[propertyName].FieldName, (object)TableInfoDictionary.GetTableInfo(type).Table.TableName);
            else if (Converage.Max == converage)
                stringBuilder.AppendFormat("select max({0}) from {1} where 1=1 ", (object)TableInfoDictionary.GetTableInfo(type).DicColumns[propertyName].FieldName, (object)TableInfoDictionary.GetTableInfo(type).Table.TableName);
            else if (converage == Converage.Min)
                stringBuilder.AppendFormat("select min({0}) from {1} where 1=1 ", (object)TableInfoDictionary.GetTableInfo(type).DicColumns[propertyName].FieldName, (object)TableInfoDictionary.GetTableInfo(type).Table.TableName);
            else
                stringBuilder.AppendFormat("select count(*) from {0} where 1=1 ", (object)TableInfoDictionary.GetTableInfo(type).Table.TableName);
            IList<IDataParameter> list = (IList<IDataParameter>)new List<IDataParameter>();
            foreach (string index in (IEnumerable<string>)dic.Keys)
            {
                switch (component.DicComponent[index].SearchMode)
                {
                    case SM.Equals:
                        stringBuilder.AppendFormat("and {0}{1}@{2} ", (object)TableInfoDictionary.GetTableInfo(type).DicColumns[index].FieldName, (object)"=", (object)TableInfoDictionary.GetTableInfo(type).DicColumns[index].FieldName);
                        break;
                    case SM.UnEquals:
                        stringBuilder.AppendFormat("and {0}{1}@{2} ", (object)TableInfoDictionary.GetTableInfo(type).DicColumns[index].FieldName, (object)"!=", (object)TableInfoDictionary.GetTableInfo(type).DicColumns[index].FieldName);
                        break;
                    case SM.Greater:
                        stringBuilder.AppendFormat("and {0}{1}@{2} ", (object)TableInfoDictionary.GetTableInfo(type).DicColumns[index].FieldName, (object)">", (object)TableInfoDictionary.GetTableInfo(type).DicColumns[index].FieldName);
                        break;
                    case SM.GreaterOrEquals:
                        stringBuilder.AppendFormat("and {0}{1}@{2} ", (object)TableInfoDictionary.GetTableInfo(type).DicColumns[index].FieldName, (object)">=", (object)TableInfoDictionary.GetTableInfo(type).DicColumns[index].FieldName);
                        break;
                    case SM.Less:
                        stringBuilder.AppendFormat("and {0}{1}@{2} ", (object)TableInfoDictionary.GetTableInfo(type).DicColumns[index].FieldName, (object)"<", (object)TableInfoDictionary.GetTableInfo(type).DicColumns[index].FieldName);
                        break;
                    case SM.LessOrEquals:
                        stringBuilder.AppendFormat("and {0}{1}@{2} ", (object)TableInfoDictionary.GetTableInfo(type).DicColumns[index].FieldName, (object)"<=", (object)TableInfoDictionary.GetTableInfo(type).DicColumns[index].FieldName);
                        break;
                }
                list.Add(this.CreateParameter("@" + TableInfoDictionary.GetTableInfo(type).DicColumns[index].FieldName, dic[index]));
            }
            param = Enumerable.ToArray<IDataParameter>((IEnumerable<IDataParameter>)list);
            return stringBuilder.ToString();
        }

        private OleDbType ConvertType(OLEDBDataType type)
        {
            OleDbType oleDbType = OleDbType.Empty;
            switch (type)
            {
                case OLEDBDataType.Char:
                    oleDbType = OleDbType.Char;
                    break;
                case OLEDBDataType.Datetime:
                    oleDbType = OleDbType.Date;
                    break;
                case OLEDBDataType.Decimal:
                    oleDbType = OleDbType.Decimal;
                    break;
                case OLEDBDataType.Money:
                    oleDbType = OleDbType.Currency;
                    break;
                case OLEDBDataType.Ntext:
                    oleDbType = OleDbType.VarChar;
                    break;
                case OLEDBDataType.Numeric:
                    oleDbType = OleDbType.Numeric;
                    break;
                case OLEDBDataType.Int16:
                    oleDbType = OleDbType.SmallInt;
                    break;
                case OLEDBDataType.Int32:
                    oleDbType = OleDbType.Integer;
                    break;
                case OLEDBDataType.Int64:
                    oleDbType = OleDbType.BigInt;
                    break;
                case OLEDBDataType.Text:
                    oleDbType = OleDbType.VarChar;
                    break;
                case OLEDBDataType.Varbinary:
                    oleDbType = OleDbType.Binary;
                    break;
                case OLEDBDataType.Varchar:
                    oleDbType = OleDbType.VarChar;
                    break;
            }
            return oleDbType;
        }

        private OleDbType ConvertType(string defaultDataType)
        {
            OleDbType oleDbType = OleDbType.Empty;
            try
            {
                switch (defaultDataType.ToUpper())
                {
                    case "LONG":
                    case "CHAR":
                    case "NCHAR":
                    case "VARCHAR2":
                    case "NVARCHAR2":
                        oleDbType = OleDbType.VarChar;
                        break;
                    case "INTEGER":
                        oleDbType = OleDbType.Integer;
                        break;
                    case "DATE":
                        oleDbType = OleDbType.Date;
                        break;
                    case "NUMBER":
                        oleDbType = OleDbType.Numeric;
                        break;
                    case "RAW":
                    case "LONG RAW":
                    case "BLOB":
                    case "CLOB":
                    case "NCLOB":
                        oleDbType = OleDbType.Binary;
                        break;
                    default:
                        oleDbType = OleDbType.VarChar;
                        break;
                }
            }
            catch
            {
            }
            return oleDbType;
        }

        public IDataParameter CreateParameter(string name)
        {
            return this.CreateParameter(name, (object)null);
        }

        public IDataParameter CreateParameter(string name, object value)
        {
            return (IDataParameter)new OleDbParameter(name, value);
        }

        public IDataParameter CreateParameter(string name, OLEDBDataType type, object value)
        {
            OleDbParameter oleDbParameter = new OleDbParameter(name, this.ConvertType(type));
            oleDbParameter.Value = value;
            return (IDataParameter)oleDbParameter;
        }

        public IDataParameter CreateParameter(string name, OLEDBDataType type, int size)
        {
            OleDbParameter oleDbParameter = new OleDbParameter(name, this.ConvertType(type));
            if (size > 0)
                oleDbParameter.Size = size;
            return (IDataParameter)oleDbParameter;
        }

        public IDataParameter CreateParameter(string name, OLEDBDataType type, int size, object value)
        {
            OleDbParameter oleDbParameter = new OleDbParameter(name, this.ConvertType(type));
            if (size > 0)
                oleDbParameter.Size = size;
            oleDbParameter.Value = value;
            return (IDataParameter)oleDbParameter;
        }

        public IDataParameter CreateParameter(string name, OLEDBDataType type)
        {
            return (IDataParameter)new OleDbParameter(name, this.ConvertType(type));
        }

        public IDataParameter CreateParameter(string name, string type, object value)
        {
            OleDbParameter oleDbParameter = new OleDbParameter(name, this.ConvertType(type));
            oleDbParameter.Value = value;
            return (IDataParameter)oleDbParameter;
        }

        public void Dispose()
        {
            GC.SuppressFinalize((object)this);
        }
    }
}
