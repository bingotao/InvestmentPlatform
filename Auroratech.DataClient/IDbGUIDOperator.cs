using System;
using System.Collections.Generic;
using System.Data;

namespace Auroratech.DataClient
{
  public interface IDbGUIDOperator : IDisposable
  {
    IDbProvider TransactionProvider { get; }

    DataSet ExecuteQuery(string sqlString);

    DataSet ExecuteQuery(IDbProvider provider, string sqlString);

    int ExecuteNonQuery(string sqlString);

    IDataReader ExecuteDataReader(string sqlString);

    DataSet ExecuteStoredProcedure(string storedProcedureName, params IDataParameter[] param);

    DataSet ExecuteStoredProcedure(IDbProvider provider, string storedProcedureName, params IDataParameter[] param);

    void BeginTransaction();

    void RollBack();

    void Commit();

    int Add(IEntity entity);

    int Add(IEntity entity, IDbProvider provider);

    int Add<T>(T t) where T : IEntity;

    int Add<T>(T t, IDbProvider provider) where T : IEntity;

    int Add(Type type, object value);

    int Add(Type type, object value, IDbProvider provider);

    int Update(IEntity entity);

    int Update(IEntity entity, IDbProvider provider);

    int Update(IEntity entity, string propertyName);

    int Update(IEntity entity, string propertyName, IDbProvider provider);

    int Update(IEntity entity, string[] propertyNames);

    int Update(IEntity entity, string[] propertyNames, IDbProvider provider);

    int Update<T>(T t) where T : IEntity;

    int Update<T>(T t, IDbProvider provider) where T : IEntity;

    int Update<T>(T t, string propertyName) where T : IEntity;

    int Update<T>(T t, string propertyName, IDbProvider provider) where T : IEntity;

    int Update<T>(T t, string[] propertyNames) where T : IEntity;

    int Update<T>(T t, string[] propertyNames, IDbProvider provider) where T : IEntity;

    int UpdateEx<T>(T t, string[] propertyNames) where T : IEntity;

    int UpdateEx<T>(T t, string[] propertyNames, IDbProvider provider) where T : IEntity;

    int Update(Type type, object value);

    int Update(Type type, object value, IDbProvider provider);

    int Update(Type type, object value, string propertyName);

    int Update(Type type, object value, string propertyName, IDbProvider provider);

    int Update(Type type, object value, string[] propertyNames);

    int Update(Type type, object value, string[] propertyNames, IDbProvider provider);

    int DeleteAll<T>() where T : class;

    int DeleteAll<T>(IDbProvider provider) where T : class;

    int Delete(IEntity entity);

    int Delete(IEntity entity, IDbProvider provider);

    int Delete(IEntity entity, string propertyName);

    int Delete(IEntity entity, string propertyName, IDbProvider provider);

    int Delete(IEntity entity, string[] propertyNames);

    int Delete(IEntity entity, string[] propertyNames, IDbProvider provider);

    int Delete<T>(T t) where T : class;

    int Delete<T>(T t, IDbProvider provider) where T : class;

    int Delete<T>(T t, string propertyName) where T : class;

    int Delete<T>(T t, string propertyName, IDbProvider provider) where T : class;

    int Delete<T>(T t, string[] propertyNames) where T : class;

    int Delete<T>(T t, string[] propertyNames, IDbProvider provider) where T : class;

    int Delete<T>(IDictionary<string, object> dic, ConditionComponent component) where T : class;

    int Delete<T>(IDictionary<string, object> dic, ConditionComponent component, IDbProvider provider) where T : class;

    int Delete(Type type, object value);

    int Delete(Type type, object value, IDbProvider provider);

    int Delete(Type type, object value, string propertyName);

    int Delete(Type type, object value, string propertyName, IDbProvider provider);

    int Delete(Type type, object value, string[] propertyNames);

    int Delete(Type type, object value, string[] propertyNames, IDbProvider provider);

    int Delete<T>(string whereclause) where T : class;

    int Delete<T>(string whereclause, IDbProvider provider) where T : class;

    T GetEntity<T>(object pkPropertyValue) where T : class;

    T GetEntityExcludeField<T>(object pkPropertyValue, string fieldName) where T : class;

    object GetEntity(Type type, object pkPropertyValue);

    T GetEntity<T>(string propertyName, object propertyValue) where T : class;

    T GetEntityEx<T>(string propertyName, object propertyValue, string[] propertyNames) where T : class;

    object GetEntity(Type type, string propertyName, object propertyValue);

    T GetEntity<T>(IEntity entity, string[] propertyNames) where T : class;

    object GetEntity(Type type, IEntity entity, string[] propertyNames);

    T GetEntity<T>(IDataReader dr) where T : class;

    int GetCount(Type type);

    int GetCount<T>() where T : class;

    int GetCount<T>(string whereclause) where T : class;

    int GetCount(Type type, IDictionary<string, object> dic, ConditionComponent component);

    IList<T> GetList<T>() where T : class;

    IList<T> GetList<T>(string whereclause) where T : class;

    IList<T> GetList<T>(string whereclause, int pageIndex, int perPageCount, string OrderFieldNameAndSortType) where T : class;

    IList<T> GetList<T>(string propertyName, object value) where T : class;

    IList<T> GetList<T>(IDictionary<string, object> dic) where T : class;

    IList<T> GetList<T>(IDictionary<string, object> dic, ConditionComponent component) where T : class;
  }
}
