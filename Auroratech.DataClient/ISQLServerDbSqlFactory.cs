using System;
using System.Collections.Generic;
using System.Data;

namespace Auroratech.DataClient
{
  public interface ISQLServerDbSqlFactory : IDisposable
  {
    string CreateInsertSql(IEntity entity, out IDataParameter[] param);

    string CreateInsertSql(Type type, object value, out IDataParameter[] param);

    string CreateInsertSql<T>(T t, out IDataParameter[] param) where T : IEntity;

    string CreateUpdateSql(IEntity entity, out IDataParameter[] param);

    string CreateUpdateSql(Type type, object value, out IDataParameter[] param);

    string CreateUpdateSql(IEntity entity, out IDataParameter[] param, string propertyName);

    string CreateUpdateSql(Type type, object value, out IDataParameter[] param, string propertyName);

    string CreateUpdateSql(IEntity entity, out IDataParameter[] param, string[] propertyNames);

    string CreateUpdateSql(Type type, object value, out IDataParameter[] param, string[] propertyNames);

    string CreateUpdateSqlEx(Type type, object value, out IDataParameter[] param, string[] propertyNames);

    string CreateUpdateSql(IEntity entity, out IDataParameter[] param, ConditionComponent component);

    string CreateDeleteAllSql<T>() where T : class;

    string CreateDeleteSql(IEntity entity, out IDataParameter[] param);

    string CreateDeleteSql(Type type, object value, out IDataParameter[] param);

    string CreateDeleteSql(IEntity entity, out IDataParameter[] param, string propertyName);

    string CreateDeleteSql(Type type, object value, out IDataParameter[] param, string propertyName);

    string CreateDeleteSql(IEntity entity, out IDataParameter[] param, string[] propertyNames);

    string CreateDeleteSql(Type type, object value, out IDataParameter[] param, string[] propertyNames);

    string CreateDeleteSql(IEntity entity, out IDataParameter[] param, ConditionComponent component);

    string CreateDeleteByPropertySql(Type type, IDictionary<string, object> dic, out IDataParameter[] param, ConditionComponent component);

    string CreateSingleSql(IEntity entity, out IDataParameter[] param);

    string CreateSingleSql(IEntity entity, out IDataParameter[] param, string[] propertyNames);

    string CreateSingleSql(Type type, object value, out IDataParameter[] param, string[] propertyNames);

    string CreateSingleSql(Type entityType);

    string CreateSingleSql(Type type, object pkPropertyValue, out IDataParameter[] param);

    string CreateSingleSqlExcludeField(Type type, object pkPropertyValue, string fieldName, out IDataParameter[] param);

    string CreateQuerySql(Type type);

    string CreateQuerySql(Type type, string whereclause);

    string CreateQueryByPropertySql(Type type, string propertyName, object value, out IDataParameter[] param);

    string CreateQueryByPropertySql(Type type, IDictionary<string, object> dic, out IDataParameter[] param);

    string CreateQueryByPropertySql(Type type, IDictionary<string, object> dic, out IDataParameter[] param, ConditionComponent component);

    string CreateConverageSql(Type type, Converage converage);

    string CreateConverageSql(Type type, string whereclause);

    string CreateConverageSql(Type type, Converage converage, string propertyName);

    string CreateConverageSql(Type type, Converage converage, string propertyName, IDictionary<string, object> dic, out IDataParameter[] param, ConditionComponent component);

    IDataParameter CreateParameter(string name);

    IDataParameter CreateParameter(string name, object value);

    IDataParameter CreateParameter(string name, SQLServerDataType type, object value);

    IDataParameter CreateParameter(string name, SQLServerDataType type, int size);

    IDataParameter CreateParameter(string name, SQLServerDataType type, int size, object value);

    IDataParameter CreateParameter(string name, SQLServerDataType type);

    string CreateQuerySql(Type type, string[] propertyNames, string ConditionPropertypeName, object ConditionValue, out IDataParameter[] param);
  }
}
