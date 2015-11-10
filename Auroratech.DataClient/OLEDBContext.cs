using System;
using System.Collections.Generic;
using System.Data;

namespace Auroratech.DataClient
{
  public class OLEDBContext : IDbGUIDOperator, IDisposable
  {
    private string _connectionString;
    private IBaseOperator baseHelper;
    private IOLEDBSqlFactory factory;
    private IDbProvider _transactionProvider;

    public IBaseOperator BaseHelper
    {
      get
      {
        if (this.baseHelper == null)
          this.baseHelper = (IBaseOperator) new OLEDBBaseHelper();
        return this.baseHelper;
      }
      set
      {
        this.baseHelper = value;
      }
    }

    public IOLEDBSqlFactory SqlFactory
    {
      get
      {
        if (this.factory == null)
          this.factory = (IOLEDBSqlFactory) new OLEDBSqlFactory();
        return this.factory;
      }
      set
      {
        this.factory = value;
      }
    }

    public IDbProvider TransactionProvider
    {
      get
      {
        return this._transactionProvider;
      }
    }

    public OLEDBContext(string connectionString)
    {
      this._connectionString = connectionString;
    }

    public void BeginTransaction()
    {
      this._transactionProvider = (IDbProvider) new OLEDBProvider(this._connectionString);
      this._transactionProvider.BeginTransaction();
    }

    public void RollBack()
    {
      if (this._transactionProvider == null)
        return;
      this._transactionProvider.RollBack();
      this._transactionProvider.Close();
      this._transactionProvider.Dispose();
      this._transactionProvider = (IDbProvider) null;
    }

    public void Commit()
    {
      if (this._transactionProvider == null)
        return;
      this._transactionProvider.Commit();
      this._transactionProvider.Close();
      this._transactionProvider.Dispose();
      this._transactionProvider = (IDbProvider) null;
    }

    public DataSet ExecuteQuery(IDbProvider provider, string sqlString)
    {
      return this.BaseHelper.ExecuteQuery(provider, sqlString);
    }

    public DataSet ExecuteQuery(string sqlString)
    {
      IDbProvider provider = (IDbProvider) new OLEDBProvider(this._connectionString);
      DataSet dataSet = this.BaseHelper.ExecuteQuery(provider, sqlString);
      provider.Close();
      return dataSet;
    }

    public int ExecuteNonQuery(string sqlString)
    {
      IDbProvider dbProvider = (IDbProvider) new OLEDBProvider(this._connectionString);
      dbProvider.Open();
      dbProvider.Command.CommandText = sqlString;
      dbProvider.Command.CommandType = CommandType.Text;
      int num = dbProvider.Command.ExecuteNonQuery();
      dbProvider.Close();
      return num;
    }

    public IDataReader ExecuteDataReader(string sqlString)
    {
      return (this.BaseHelper as OLEDBBaseHelper).ExecuteDataReader((IDbProvider) new OLEDBProvider(this._connectionString), sqlString);
    }

    public DataSet ExecuteStoredProcedure(IDbProvider provider, string storedProcedureName, params IDataParameter[] param)
    {
      return this.BaseHelper.ExecuteStoredProcedure(provider, storedProcedureName, param);
    }

    public DataSet ExecuteStoredProcedure(string storedProcedureName, params IDataParameter[] param)
    {
      DataSet dataSet = (DataSet) null;
      using (IDbProvider provider = (IDbProvider) new OLEDBProvider(this._connectionString))
      {
        dataSet = this.BaseHelper.ExecuteStoredProcedure(provider, storedProcedureName, param);
        provider.Close();
      }
      return dataSet;
    }

    public int Add<T>(T t, IDbProvider provider) where T : IEntity
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string insertSql = this.SqlFactory.CreateInsertSql<T>(t, out dataParameterArray);
      return this.BaseHelper.ExecuteNonQuery(provider, insertSql, dataParameterArray);
    }

    public int Add(Type type, object value)
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string insertSql = this.SqlFactory.CreateInsertSql(type, value, out dataParameterArray);
      using (IDbProvider provider = (IDbProvider) new OLEDBProvider(this._connectionString))
      {
        int num = this.BaseHelper.ExecuteNonQuery(provider, insertSql, dataParameterArray);
        provider.Close();
        return num;
      }
    }

    public int Add(IEntity entity)
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string insertSql = this.SqlFactory.CreateInsertSql(entity, out dataParameterArray);
      using (IDbProvider provider = (IDbProvider) new OLEDBProvider(this._connectionString))
      {
        int num = this.BaseHelper.ExecuteNonQuery(provider, insertSql, dataParameterArray);
        provider.Close();
        return num;
      }
    }

    public int Add<T>(T t) where T : IEntity
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string insertSql = this.SqlFactory.CreateInsertSql<T>(t, out dataParameterArray);
      IDbProvider provider = (IDbProvider) new OLEDBProvider(this._connectionString);
      int num = this.BaseHelper.ExecuteNonQuery(provider, insertSql, dataParameterArray);
      provider.Close();
      return num;
    }

    public int Update(IEntity entity)
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string updateSql = this.SqlFactory.CreateUpdateSql(entity, out dataParameterArray);
      using (IDbProvider provider = (IDbProvider) new OLEDBProvider(this._connectionString))
      {
        int num = this.BaseHelper.ExecuteNonQuery(provider, updateSql, dataParameterArray);
        provider.Close();
        return num;
      }
    }

    public int Update(IEntity entity, string propertyName)
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string updateSql = this.SqlFactory.CreateUpdateSql(entity, out dataParameterArray, propertyName);
      using (IDbProvider provider = (IDbProvider) new OLEDBProvider(this._connectionString))
      {
        int num = this.BaseHelper.ExecuteNonQuery(provider, updateSql, dataParameterArray);
        provider.Close();
        return num;
      }
    }

    public int Update(IEntity entity, string[] propertyNames)
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string updateSql = this.SqlFactory.CreateUpdateSql(entity, out dataParameterArray, propertyNames);
      IDbProvider provider = (IDbProvider) new OLEDBProvider(this._connectionString);
      int num = this.BaseHelper.ExecuteNonQuery(provider, updateSql, dataParameterArray);
      provider.Close();
      return num;
    }

    public int Update<T>(T t) where T : IEntity
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string updateSql = this.SqlFactory.CreateUpdateSql(typeof (T), (object) t, out dataParameterArray);
      IDbProvider provider = (IDbProvider) new OLEDBProvider(this._connectionString);
      int num = this.BaseHelper.ExecuteNonQuery(provider, updateSql, dataParameterArray);
      provider.Close();
      return num;
    }

    public int Update<T>(T t, string propertyName) where T : IEntity
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string updateSql = this.SqlFactory.CreateUpdateSql(typeof (T), (object) t, out dataParameterArray, propertyName);
      IDbProvider provider = (IDbProvider) new OLEDBProvider(this._connectionString);
      int num = this.BaseHelper.ExecuteNonQuery(provider, updateSql, dataParameterArray);
      provider.Close();
      return num;
    }

    public int Update(Type type, object value, string propertyName)
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string updateSql = this.SqlFactory.CreateUpdateSql(type, value, out dataParameterArray, propertyName);
      IDbProvider provider = (IDbProvider) new OLEDBProvider(this._connectionString);
      int num = this.BaseHelper.ExecuteNonQuery(provider, updateSql, dataParameterArray);
      provider.Close();
      return num;
    }

    public int Update(Type type, object value, string[] propertyNames)
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string updateSql = this.SqlFactory.CreateUpdateSql(type, value, out dataParameterArray, propertyNames);
      IDbProvider provider = (IDbProvider) new OLEDBProvider(this._connectionString);
      int num = this.BaseHelper.ExecuteNonQuery(provider, updateSql, dataParameterArray);
      provider.Close();
      return num;
    }

    public int Update<T>(T t, string[] propertyNames) where T : IEntity
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string updateSql = this.SqlFactory.CreateUpdateSql(typeof (T), (object) t, out dataParameterArray, propertyNames);
      IDbProvider provider = (IDbProvider) new OLEDBProvider(this._connectionString);
      int num = this.BaseHelper.ExecuteNonQuery(provider, updateSql, dataParameterArray);
      provider.Close();
      return num;
    }

    public int Update(Type type, object value)
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string updateSql = this.SqlFactory.CreateUpdateSql(type, value, out dataParameterArray);
      IDbProvider provider = (IDbProvider) new OLEDBProvider(this._connectionString);
      int num = this.BaseHelper.ExecuteNonQuery(provider, updateSql, dataParameterArray);
      provider.Close();
      return num;
    }

    public int Delete(IEntity entity)
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string deleteSql = this.SqlFactory.CreateDeleteSql(entity, out dataParameterArray);
      IDbProvider provider = (IDbProvider) new OLEDBProvider(this._connectionString);
      int num = this.BaseHelper.ExecuteNonQuery(provider, deleteSql, dataParameterArray);
      provider.Close();
      return num;
    }

    public int Delete(IEntity entity, string propertyName)
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string deleteSql = this.SqlFactory.CreateDeleteSql(entity, out dataParameterArray, propertyName);
      IDbProvider provider = (IDbProvider) new OLEDBProvider(this._connectionString);
      int num = this.BaseHelper.ExecuteNonQuery(provider, deleteSql, dataParameterArray);
      provider.Close();
      return num;
    }

    public int Delete(IEntity entity, string[] propertyNames)
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string deleteSql = this.SqlFactory.CreateDeleteSql(entity, out dataParameterArray, propertyNames);
      IDbProvider provider = (IDbProvider) new OLEDBProvider(this._connectionString);
      int num = this.BaseHelper.ExecuteNonQuery(provider, deleteSql, dataParameterArray);
      provider.Close();
      return num;
    }

    public int DeleteAll<T>() where T : class
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string deleteAllSql = this.SqlFactory.CreateDeleteAllSql<T>();
      using (IDbProvider provider = (IDbProvider) new OLEDBProvider(this._connectionString))
      {
        int num = this.BaseHelper.ExecuteNonQuery(provider, deleteAllSql, dataParameterArray);
        provider.Close();
        return num;
      }
    }

    public int DeleteAll<T>(IDbProvider provider) where T : class
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string deleteAllSql = this.SqlFactory.CreateDeleteAllSql<T>();
      return this.BaseHelper.ExecuteNonQuery(provider, deleteAllSql, dataParameterArray);
    }

    public int Delete<T>(T t) where T : class
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string deleteSql = this.SqlFactory.CreateDeleteSql(typeof (T), (object) t, out dataParameterArray);
      using (IDbProvider provider = (IDbProvider) new OLEDBProvider(this._connectionString))
      {
        int num = this.BaseHelper.ExecuteNonQuery(provider, deleteSql, dataParameterArray);
        provider.Close();
        return num;
      }
    }

    public int Delete<T>(T t, string propertyName) where T : class
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string deleteSql = this.SqlFactory.CreateDeleteSql(typeof (T), (object) t, out dataParameterArray, propertyName);
      using (IDbProvider provider = (IDbProvider) new OLEDBProvider(this._connectionString))
      {
        int num = this.BaseHelper.ExecuteNonQuery(provider, deleteSql, dataParameterArray);
        provider.Close();
        return num;
      }
    }

    public int Delete<T>(T t, string[] propertyNames) where T : class
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string deleteSql = this.SqlFactory.CreateDeleteSql(typeof (T), (object) t, out dataParameterArray, propertyNames);
      using (IDbProvider provider = (IDbProvider) new OLEDBProvider(this._connectionString))
      {
        int num = this.BaseHelper.ExecuteNonQuery(provider, deleteSql, dataParameterArray);
        provider.Close();
        return num;
      }
    }

    public int Delete(Type type, object value)
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string deleteSql = this.SqlFactory.CreateDeleteSql(type, value, out dataParameterArray);
      using (IDbProvider provider = (IDbProvider) new OLEDBProvider(this._connectionString))
      {
        int num = this.BaseHelper.ExecuteNonQuery(provider, deleteSql, dataParameterArray);
        provider.Close();
        return num;
      }
    }

    public int Delete(Type type, object value, string propertyName)
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string deleteSql = this.SqlFactory.CreateDeleteSql(type, value, out dataParameterArray, propertyName);
      using (IDbProvider provider = (IDbProvider) new OLEDBProvider(this._connectionString))
      {
        int num = this.BaseHelper.ExecuteNonQuery(provider, deleteSql, dataParameterArray);
        provider.Close();
        return num;
      }
    }

    public int Delete(Type type, object value, string[] propertyNames)
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string deleteSql = this.SqlFactory.CreateDeleteSql(type, value, out dataParameterArray, propertyNames);
      using (IDbProvider provider = (IDbProvider) new OLEDBProvider(this._connectionString))
      {
        int num = this.BaseHelper.ExecuteNonQuery(provider, deleteSql, dataParameterArray);
        provider.Close();
        return num;
      }
    }

    public T GetEntity<T>(object pkPropertyValue) where T : class
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string singleSql = this.SqlFactory.CreateSingleSql(typeof (T), pkPropertyValue, out dataParameterArray);
      IDbProvider provider = (IDbProvider) new OLEDBProvider(this._connectionString);
      T obj = this.BaseHelper.ConvertToEntity<T>(this.BaseHelper.ExecuteDataReader(provider, singleSql, dataParameterArray));
      provider.Close();
      return obj;
    }

    public T GetEntityExcludeField<T>(object pkPropertyValue, string fieldName) where T : class
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string singleSqlExcludeField = this.SqlFactory.CreateSingleSqlExcludeField(typeof (T), pkPropertyValue, fieldName, out dataParameterArray);
      IDbProvider provider = (IDbProvider) new OLEDBProvider(this._connectionString);
      T obj = this.BaseHelper.ConvertToEntity<T>(this.BaseHelper.ExecuteDataReader(provider, singleSqlExcludeField, dataParameterArray));
      provider.Close();
      return obj;
    }

    public object GetEntity(Type type, object pkPropertyValue)
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string singleSql = this.SqlFactory.CreateSingleSql(type, pkPropertyValue, out dataParameterArray);
      IDbProvider provider = (IDbProvider) new OLEDBProvider(this._connectionString);
      object obj = this.BaseHelper.ConvertToEntity(type, this.BaseHelper.ExecuteDataReader(provider, singleSql, dataParameterArray));
      provider.Close();
      return obj;
    }

    public T GetEntity<T>(string propertyName, object propertyValue) where T : class
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string queryByPropertySql = this.SqlFactory.CreateQueryByPropertySql(typeof (T), propertyName, propertyValue, out dataParameterArray);
      IDbProvider provider = (IDbProvider) new OLEDBProvider(this._connectionString);
      T obj = this.BaseHelper.ConvertToEntity<T>(this.BaseHelper.ExecuteDataReader(provider, queryByPropertySql, dataParameterArray));
      provider.Close();
      return obj;
    }

    public object GetEntity(Type type, string propertyName, object propertyValue)
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string queryByPropertySql = this.SqlFactory.CreateQueryByPropertySql(type, propertyName, propertyValue, out dataParameterArray);
      IDbProvider provider = (IDbProvider) new OLEDBProvider(this._connectionString);
      object obj = this.BaseHelper.ConvertToEntity(type, this.BaseHelper.ExecuteDataReader(provider, queryByPropertySql, dataParameterArray));
      provider.Close();
      return obj;
    }

    public T GetEntity<T>(IEntity entity, string[] propertyNames) where T : class
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string singleSql = this.SqlFactory.CreateSingleSql(entity, out dataParameterArray, propertyNames);
      IDbProvider provider = (IDbProvider) new OLEDBProvider(this._connectionString);
      T obj = this.BaseHelper.ConvertToEntity<T>(this.BaseHelper.ExecuteDataReader(provider, singleSql, dataParameterArray));
      provider.Close();
      return obj;
    }

    public T GetEntity<T>(IDataReader dr) where T : class
    {
      return this.BaseHelper.ConvertToEntity<T>(dr);
    }

    public object GetEntity(Type type, IEntity entity, string[] propertyNames)
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string singleSql = this.SqlFactory.CreateSingleSql(type, (object) entity, out dataParameterArray, propertyNames);
      using (IDbProvider provider = (IDbProvider) new OLEDBProvider(this._connectionString))
        return this.BaseHelper.ConvertToEntity(type, this.BaseHelper.ExecuteDataReader(provider, singleSql, dataParameterArray));
    }

    public int GetCount(Type type)
    {
      string converageSql = this.SqlFactory.CreateConverageSql(type, Converage.Count);
      IDbProvider provider = (IDbProvider) new OLEDBProvider(this._connectionString);
      int num = Convert.ToInt32(this.BaseHelper.ExecuteScalar(provider, converageSql));
      provider.Close();
      return num;
    }

    public int GetCount<T>() where T : class
    {
      string converageSql = this.SqlFactory.CreateConverageSql(typeof (T), Converage.CountNotNll);
      IDbProvider provider = (IDbProvider) new OLEDBProvider(this._connectionString);
      int num = Convert.ToInt32(this.BaseHelper.ExecuteScalar(provider, converageSql));
      provider.Close();
      return num;
    }

    public int GetCount(Type type, IDictionary<string, object> dic, ConditionComponent component)
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string converageSql = this.SqlFactory.CreateConverageSql(type, Converage.Count, "", dic, out dataParameterArray, component);
      IDbProvider provider = (IDbProvider) new OLEDBProvider(this._connectionString);
      int num = (int) this.BaseHelper.ExecuteScalar(provider, converageSql, dataParameterArray);
      provider.Close();
      return num;
    }

    public int GetCount<T>(string whereclause) where T : class
    {
      string converageSql = this.SqlFactory.CreateConverageSql(typeof (T), whereclause);
      IDbProvider provider = (IDbProvider) new OLEDBProvider(this._connectionString);
      int num = Convert.ToInt32(this.BaseHelper.ExecuteScalar(provider, converageSql));
      provider.Close();
      return num;
    }

    public IList<T> GetList<T>() where T : class
    {
      string querySql = this.SqlFactory.CreateQuerySql(typeof (T));
      IDbProvider provider = (IDbProvider) new OLEDBProvider(this._connectionString);
      IList<T> list = this.BaseHelper.ConvertToList<T>(this.BaseHelper.ExecuteDataReader(provider, querySql));
      provider.Close();
      return list;
    }

    public IList<T> GetList<T>(string whereclause) where T : class
    {
      string querySql = this.SqlFactory.CreateQuerySql(typeof (T), whereclause);
      IDbProvider provider = (IDbProvider) new OLEDBProvider(this._connectionString);
      IList<T> list = this.BaseHelper.ConvertToList<T>(this.BaseHelper.ExecuteDataReader(provider, querySql));
      provider.Close();
      return list;
    }

    public IList<T> GetList<T>(string propertyName, object value) where T : class
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string queryByPropertySql = this.SqlFactory.CreateQueryByPropertySql(typeof (T), propertyName, value, out dataParameterArray);
      IDbProvider provider = (IDbProvider) new OLEDBProvider(this._connectionString);
      IList<T> list = this.BaseHelper.ConvertToList<T>(this.BaseHelper.ExecuteDataReader(provider, queryByPropertySql, dataParameterArray));
      provider.Close();
      return list;
    }

    public IList<T> GetList<T>(IDictionary<string, object> dic) where T : class
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string queryByPropertySql = this.SqlFactory.CreateQueryByPropertySql(typeof (T), dic, out dataParameterArray);
      IDbProvider provider = (IDbProvider) new OLEDBProvider(this._connectionString);
      IList<T> list = this.BaseHelper.ConvertToList<T>(this.BaseHelper.ExecuteDataReader(provider, queryByPropertySql, dataParameterArray));
      provider.Close();
      return list;
    }

    public IList<T> GetList<T>(IDictionary<string, object> dic, ConditionComponent component) where T : class
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string queryByPropertySql = this.SqlFactory.CreateQueryByPropertySql(typeof (T), dic, out dataParameterArray, component);
      IDbProvider provider = (IDbProvider) new OLEDBProvider(this._connectionString);
      IList<T> list = this.BaseHelper.ConvertToList<T>(this.BaseHelper.ExecuteDataReader(provider, queryByPropertySql, dataParameterArray));
      provider.Close();
      return list;
    }

    public void Dispose()
    {
      GC.SuppressFinalize((object) this);
    }

    public int Add(IEntity entity, IDbProvider provider)
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string insertSql = this.SqlFactory.CreateInsertSql(entity, out dataParameterArray);
      return this.BaseHelper.ExecuteNonQuery(provider, insertSql, dataParameterArray);
    }

    public int Add(Type type, object value, IDbProvider provider)
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string insertSql = this.SqlFactory.CreateInsertSql(type, value, out dataParameterArray);
      return this.BaseHelper.ExecuteNonQuery(provider, insertSql, dataParameterArray);
    }

    public int Update(IEntity entity, IDbProvider provider)
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string updateSql = this.SqlFactory.CreateUpdateSql(entity, out dataParameterArray);
      return this.BaseHelper.ExecuteNonQuery(provider, updateSql, dataParameterArray);
    }

    public int Update(IEntity entity, string propertyName, IDbProvider provider)
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string updateSql = this.SqlFactory.CreateUpdateSql(entity, out dataParameterArray, propertyName);
      return this.BaseHelper.ExecuteNonQuery(provider, updateSql, dataParameterArray);
    }

    public int Update(IEntity entity, string[] propertyNames, IDbProvider provider)
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string updateSql = this.SqlFactory.CreateUpdateSql(entity, out dataParameterArray, propertyNames);
      return this.BaseHelper.ExecuteNonQuery(provider, updateSql, dataParameterArray);
    }

    public int Update<T>(T t, IDbProvider provider) where T : IEntity
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string updateSql = this.SqlFactory.CreateUpdateSql(typeof (T), (object) t, out dataParameterArray);
      return this.BaseHelper.ExecuteNonQuery(provider, updateSql, dataParameterArray);
    }

    public int Update<T>(T t, string propertyName, IDbProvider provider) where T : IEntity
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string updateSql = this.SqlFactory.CreateUpdateSql(typeof (T), (object) t, out dataParameterArray, propertyName);
      return this.BaseHelper.ExecuteNonQuery(provider, updateSql, dataParameterArray);
    }

    public int Update<T>(T t, string[] propertyNames, IDbProvider provider) where T : IEntity
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string updateSql = this.SqlFactory.CreateUpdateSql(typeof (T), (object) t, out dataParameterArray, propertyNames);
      return this.BaseHelper.ExecuteNonQuery(provider, updateSql, dataParameterArray);
    }

    public int Update(Type type, object value, IDbProvider provider)
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string updateSql = this.SqlFactory.CreateUpdateSql(type, value, out dataParameterArray);
      return this.BaseHelper.ExecuteNonQuery(provider, updateSql, dataParameterArray);
    }

    public int Update(Type type, object value, string propertyName, IDbProvider provider)
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string updateSql = this.SqlFactory.CreateUpdateSql(type, value, out dataParameterArray, propertyName);
      return this.BaseHelper.ExecuteNonQuery(provider, updateSql, dataParameterArray);
    }

    public int Update(Type type, object value, string[] propertyNames, IDbProvider provider)
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string updateSql = this.SqlFactory.CreateUpdateSql(type, value, out dataParameterArray, propertyNames);
      return this.BaseHelper.ExecuteNonQuery(provider, updateSql, dataParameterArray);
    }

    public int Delete(IEntity entity, IDbProvider provider)
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string deleteSql = this.SqlFactory.CreateDeleteSql(entity, out dataParameterArray);
      return this.BaseHelper.ExecuteNonQuery(provider, deleteSql, dataParameterArray);
    }

    public int Delete(IEntity entity, string propertyName, IDbProvider provider)
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string deleteSql = this.SqlFactory.CreateDeleteSql(entity, out dataParameterArray, propertyName);
      return this.BaseHelper.ExecuteNonQuery(provider, deleteSql, dataParameterArray);
    }

    public int Delete(IEntity entity, string[] propertyNames, IDbProvider provider)
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string deleteSql = this.SqlFactory.CreateDeleteSql(entity, out dataParameterArray, propertyNames);
      return this.BaseHelper.ExecuteNonQuery(provider, deleteSql, dataParameterArray);
    }

    public int Delete<T>(T t, IDbProvider provider) where T : class
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string deleteSql = this.SqlFactory.CreateDeleteSql(typeof (T), (object) t, out dataParameterArray);
      return this.BaseHelper.ExecuteNonQuery(provider, deleteSql, dataParameterArray);
    }

    public int Delete<T>(T t, string propertyName, IDbProvider provider) where T : class
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string deleteSql = this.SqlFactory.CreateDeleteSql(typeof (T), (object) t, out dataParameterArray, propertyName);
      return this.BaseHelper.ExecuteNonQuery(provider, deleteSql, dataParameterArray);
    }

    public int Delete<T>(T t, string[] propertyNames, IDbProvider provider) where T : class
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string deleteSql = this.SqlFactory.CreateDeleteSql(typeof (T), (object) t, out dataParameterArray, propertyNames);
      return this.BaseHelper.ExecuteNonQuery(provider, deleteSql, dataParameterArray);
    }

    public int Delete<T>(IDictionary<string, object> dic, ConditionComponent component) where T : class
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string deleteByPropertySql = this.SqlFactory.CreateDeleteByPropertySql(typeof (T), dic, out dataParameterArray, component);
      using (IDbProvider provider = (IDbProvider) new OLEDBProvider())
        return this.BaseHelper.ExecuteNonQuery(provider, deleteByPropertySql, dataParameterArray);
    }

    public int Delete<T>(IDictionary<string, object> dic, ConditionComponent component, IDbProvider provider) where T : class
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string deleteByPropertySql = this.SqlFactory.CreateDeleteByPropertySql(typeof (T), dic, out dataParameterArray, component);
      return this.BaseHelper.ExecuteNonQuery(provider, deleteByPropertySql, dataParameterArray);
    }

    public int Delete<T>(string whereclause) where T : class
    {
      string deleteSql = this.SqlFactory.CreateDeleteSql(typeof (T), whereclause);
      using (IDbProvider provider = (IDbProvider) new OLEDBProvider(this._connectionString))
        return this.BaseHelper.ExecuteNonQuery(provider, deleteSql);
    }

    public int Delete<T>(string whereclause, IDbProvider provider) where T : class
    {
      string deleteSql = this.SqlFactory.CreateDeleteSql(typeof (T), whereclause);
      return this.BaseHelper.ExecuteNonQuery(provider, deleteSql);
    }

    public int Delete(Type type, object value, IDbProvider provider)
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string deleteSql = this.SqlFactory.CreateDeleteSql(type, value, out dataParameterArray);
      return this.BaseHelper.ExecuteNonQuery(provider, deleteSql, dataParameterArray);
    }

    public int Delete(Type type, object value, string propertyName, IDbProvider provider)
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string deleteSql = this.SqlFactory.CreateDeleteSql(type, value, out dataParameterArray, propertyName);
      return this.BaseHelper.ExecuteNonQuery(provider, deleteSql, dataParameterArray);
    }

    public int Delete(Type type, object value, string[] propertyNames, IDbProvider provider)
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string deleteSql = this.SqlFactory.CreateDeleteSql(type, value, out dataParameterArray, propertyNames);
      return this.BaseHelper.ExecuteNonQuery(provider, deleteSql, dataParameterArray);
    }

    public int UpdateEx<T>(T t, string[] propertyNames) where T : IEntity
    {
      throw new NotImplementedException();
    }

    public int UpdateEx<T>(T t, string[] propertyNames, IDbProvider provider) where T : IEntity
    {
      throw new NotImplementedException();
    }

    public T GetEntityEx<T>(string propertyName, object propertyValue, string[] propertyNames) where T : class
    {
      throw new NotImplementedException();
    }

    public IList<T> GetList<T>(string whereclause, int pageIndex, int perPageCount, string OrderFieldNameAndSortType) where T : class
    {
      throw new NotImplementedException();
    }
  }
}
