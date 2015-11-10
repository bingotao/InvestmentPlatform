using System;
using System.Collections.Generic;
using System.Data;

namespace Auroratech.DataClient
{
  public class OracleContext : IDbGUIDOperator, IDisposable
  {
    private string _connectionString;
    private IBaseOperator _baseHelper;
    private IOracleDbSqlFactory factory;
    private IDbProvider _transactionProvider;

    public IBaseOperator BaseHelper
    {
      get
      {
        if (this._baseHelper == null)
          this._baseHelper = (IBaseOperator) new OracleBaseHelper();
        return this._baseHelper;
      }
      set
      {
        this._baseHelper = value;
      }
    }

    public IOracleDbSqlFactory SqlFactory
    {
      get
      {
        if (this.factory == null)
          this.factory = (IOracleDbSqlFactory) new OracleSqlFactory();
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

    public OracleContext(string connectionString)
    {
      this._connectionString = connectionString;
    }

    public void BeginTransaction()
    {
      this._transactionProvider = (IDbProvider) new OracleProvider(this._connectionString);
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
      if (this._transactionProvider != null)
        return this.BaseHelper.ExecuteQuery(this._transactionProvider, sqlString);
      IDbProvider provider = (IDbProvider) new OracleProvider(this._connectionString);
      DataSet dataSet = this.BaseHelper.ExecuteQuery(provider, sqlString);
      provider.Close();
      return dataSet;
    }

    public int ExecuteNonQuery(string sqlString)
    {
      IDbProvider dbProvider1 = (IDbProvider) null;
      IDbProvider dbProvider2 = this._transactionProvider != null ? this._transactionProvider : (IDbProvider) new OracleProvider(this._connectionString);
      dbProvider2.Open();
      dbProvider2.Command.CommandText = sqlString;
      dbProvider2.Command.CommandType = CommandType.Text;
      int num = dbProvider2.Command.ExecuteNonQuery();
      if (this._transactionProvider == null)
      {
        dbProvider2.Close();
        dbProvider1 = (IDbProvider) null;
      }
      return num;
    }

    public IDataReader ExecuteDataReader(string sqlString)
    {
      IDbProvider dbProvider = (IDbProvider) null;
      IDataReader dataReader;
      if (this._transactionProvider == null)
      {
        IDbProvider provider = (IDbProvider) new OracleProvider(this._connectionString);
        dataReader = (this.BaseHelper as OracleBaseHelper).ExecuteDataReader(provider, sqlString);
        provider.Close();
        dbProvider = (IDbProvider) null;
      }
      else
        dataReader = (this.BaseHelper as OracleBaseHelper).ExecuteDataReader(this._transactionProvider, sqlString);
      return dataReader;
    }

    public DataSet ExecuteStoredProcedure(IDbProvider provider, string storedProcedureName, params IDataParameter[] param)
    {
      return this.BaseHelper.ExecuteStoredProcedure(provider, storedProcedureName, param);
    }

    public DataSet ExecuteStoredProcedure(string storedProcedureName, params IDataParameter[] param)
    {
      DataSet dataSet = (DataSet) null;
      if (this._transactionProvider != null)
        return this.BaseHelper.ExecuteStoredProcedure(this._transactionProvider, storedProcedureName, param);
      using (IDbProvider provider = (IDbProvider) new OracleProvider(this._connectionString))
      {
        dataSet = this.BaseHelper.ExecuteStoredProcedure(provider, storedProcedureName, param);
        provider.Close();
      }
      return dataSet;
    }

    public int Add(IEntity entity)
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string insertSql = this.SqlFactory.CreateInsertSql(entity, out dataParameterArray);
      if (this._transactionProvider != null)
        return this.BaseHelper.ExecuteNonQuery(this._transactionProvider, insertSql, dataParameterArray);
      using (IDbProvider provider = (IDbProvider) new OracleProvider(this._connectionString))
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
      if (this._transactionProvider != null)
        return this.BaseHelper.ExecuteNonQuery(this._transactionProvider, insertSql, dataParameterArray);
      IDbProvider provider = (IDbProvider) new OracleProvider(this._connectionString);
      int num = this.BaseHelper.ExecuteNonQuery(provider, insertSql, dataParameterArray);
      provider.Close();
      return num;
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
      if (this._transactionProvider != null)
        return this.BaseHelper.ExecuteNonQuery(this._transactionProvider, insertSql, dataParameterArray);
      using (IDbProvider provider = (IDbProvider) new OracleProvider(this._connectionString))
      {
        int num = this.BaseHelper.ExecuteNonQuery(provider, insertSql, dataParameterArray);
        provider.Close();
        return num;
      }
    }

    public int Update(IEntity entity)
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string updateSql = this.SqlFactory.CreateUpdateSql(entity, out dataParameterArray);
      if (this._transactionProvider != null)
        return this.BaseHelper.ExecuteNonQuery(this._transactionProvider, updateSql, dataParameterArray);
      using (IDbProvider provider = (IDbProvider) new OracleProvider(this._connectionString))
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
      if (this._transactionProvider != null)
        return this.BaseHelper.ExecuteNonQuery(this._transactionProvider, updateSql, dataParameterArray);
      using (IDbProvider provider = (IDbProvider) new OracleProvider(this._connectionString))
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
      if (this._transactionProvider != null)
        return this.BaseHelper.ExecuteNonQuery(this._transactionProvider, updateSql, dataParameterArray);
      IDbProvider provider = (IDbProvider) new OracleProvider(this._connectionString);
      int num = this.BaseHelper.ExecuteNonQuery(provider, updateSql, dataParameterArray);
      provider.Close();
      return num;
    }

    public int Update<T>(T t) where T : IEntity
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string updateSql = this.SqlFactory.CreateUpdateSql(typeof (T), (object) t, out dataParameterArray);
      if (this._transactionProvider != null)
        return this.BaseHelper.ExecuteNonQuery(this._transactionProvider, updateSql, dataParameterArray);
      IDbProvider provider = (IDbProvider) new OracleProvider(this._connectionString);
      int num = this.BaseHelper.ExecuteNonQuery(provider, updateSql, dataParameterArray);
      provider.Close();
      return num;
    }

    public int Update<T>(T t, string propertyName) where T : IEntity
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string updateSql = this.SqlFactory.CreateUpdateSql(typeof (T), (object) t, out dataParameterArray, propertyName);
      if (this._transactionProvider != null)
        return this.BaseHelper.ExecuteNonQuery(this._transactionProvider, updateSql, dataParameterArray);
      IDbProvider provider = (IDbProvider) new OracleProvider(this._connectionString);
      int num = this.BaseHelper.ExecuteNonQuery(provider, updateSql, dataParameterArray);
      provider.Close();
      return num;
    }

    public int Update<T>(T t, string[] propertyNames) where T : IEntity
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string updateSql = this.SqlFactory.CreateUpdateSql(typeof (T), (object) t, out dataParameterArray, propertyNames);
      if (this._transactionProvider != null)
        return this.BaseHelper.ExecuteNonQuery(this._transactionProvider, updateSql, dataParameterArray);
      IDbProvider provider = (IDbProvider) new OracleProvider(this._connectionString);
      int num = this.BaseHelper.ExecuteNonQuery(provider, updateSql, dataParameterArray);
      provider.Close();
      return num;
    }

    public int Update(Type type, object value)
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string updateSql = this.SqlFactory.CreateUpdateSql(type, value, out dataParameterArray);
      if (this._transactionProvider != null)
        return this.BaseHelper.ExecuteNonQuery(this._transactionProvider, updateSql, dataParameterArray);
      IDbProvider provider = (IDbProvider) new OracleProvider(this._connectionString);
      int num = this.BaseHelper.ExecuteNonQuery(provider, updateSql, dataParameterArray);
      provider.Close();
      return num;
    }

    public int Update(Type type, object value, string propertyName)
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string updateSql = this.SqlFactory.CreateUpdateSql(type, value, out dataParameterArray, propertyName);
      if (this._transactionProvider != null)
        return this.BaseHelper.ExecuteNonQuery(this._transactionProvider, updateSql, dataParameterArray);
      IDbProvider provider = (IDbProvider) new OracleProvider(this._connectionString);
      int num = this.BaseHelper.ExecuteNonQuery(provider, updateSql, dataParameterArray);
      provider.Close();
      return num;
    }

    public int Update(Type type, object value, string[] propertyNames)
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string updateSql = this.SqlFactory.CreateUpdateSql(type, value, out dataParameterArray, propertyNames);
      if (this._transactionProvider != null)
        return this.BaseHelper.ExecuteNonQuery(this._transactionProvider, updateSql, dataParameterArray);
      IDbProvider provider = (IDbProvider) new OracleProvider(this._connectionString);
      int num = this.BaseHelper.ExecuteNonQuery(provider, updateSql, dataParameterArray);
      provider.Close();
      return num;
    }

    public int Delete(IEntity entity)
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string deleteSql = this.SqlFactory.CreateDeleteSql(entity, out dataParameterArray);
      if (this._transactionProvider != null)
        return this.BaseHelper.ExecuteNonQuery(this._transactionProvider, deleteSql, dataParameterArray);
      IDbProvider provider = (IDbProvider) new OracleProvider(this._connectionString);
      int num = this.BaseHelper.ExecuteNonQuery(provider, deleteSql, dataParameterArray);
      provider.Close();
      return num;
    }

    public int Delete(IEntity entity, string propertyName)
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string deleteSql = this.SqlFactory.CreateDeleteSql(entity, out dataParameterArray, propertyName);
      if (this._transactionProvider != null)
        return this.BaseHelper.ExecuteNonQuery(this._transactionProvider, deleteSql, dataParameterArray);
      IDbProvider provider = (IDbProvider) new OracleProvider(this._connectionString);
      int num = this.BaseHelper.ExecuteNonQuery(provider, deleteSql, dataParameterArray);
      provider.Close();
      return num;
    }

    public int Delete(IEntity entity, string[] propertyNames)
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string deleteSql = this.SqlFactory.CreateDeleteSql(entity, out dataParameterArray, propertyNames);
      if (this._transactionProvider != null)
        return this.BaseHelper.ExecuteNonQuery(this._transactionProvider, deleteSql, dataParameterArray);
      IDbProvider provider = (IDbProvider) new OracleProvider(this._connectionString);
      int num = this.BaseHelper.ExecuteNonQuery(provider, deleteSql, dataParameterArray);
      provider.Close();
      return num;
    }

    public int Delete<T>(T t) where T : class
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string deleteSql = this.SqlFactory.CreateDeleteSql(typeof (T), (object) t, out dataParameterArray);
      if (this._transactionProvider != null)
        return this.BaseHelper.ExecuteNonQuery(this._transactionProvider, deleteSql, dataParameterArray);
      IDbProvider provider = (IDbProvider) new OracleProvider(this._connectionString);
      int num = this.BaseHelper.ExecuteNonQuery(provider, deleteSql, dataParameterArray);
      provider.Close();
      return num;
    }

    public int Delete<T>(IDictionary<string, object> dic, ConditionComponent component) where T : class
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string deleteByPropertySql = this.SqlFactory.CreateDeleteByPropertySql(typeof (T), dic, out dataParameterArray, component);
      if (this._transactionProvider != null)
        return this.BaseHelper.ExecuteNonQuery(this._transactionProvider, deleteByPropertySql, dataParameterArray);
      IDbProvider provider = (IDbProvider) new OracleProvider(this._connectionString);
      int num = this.BaseHelper.ExecuteNonQuery(provider, deleteByPropertySql, dataParameterArray);
      provider.Close();
      return num;
    }

    public int Delete<T>(IDictionary<string, object> dic, ConditionComponent component, IDbProvider provider) where T : class
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string deleteByPropertySql = this.SqlFactory.CreateDeleteByPropertySql(typeof (T), dic, out dataParameterArray, component);
      return this.BaseHelper.ExecuteNonQuery(provider, deleteByPropertySql, dataParameterArray);
    }

    public int DeleteAll<T>() where T : class
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string deleteAllSql = this.SqlFactory.CreateDeleteAllSql<T>();
      if (this._transactionProvider != null)
        return this.BaseHelper.ExecuteNonQuery(this._transactionProvider, deleteAllSql, dataParameterArray);
      using (IDbProvider provider = (IDbProvider) new OracleProvider(this._connectionString))
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

    public int Delete<T>(T t, string propertyName) where T : class
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string deleteSql = this.SqlFactory.CreateDeleteSql(typeof (T), (object) t, out dataParameterArray, propertyName);
      if (this._transactionProvider != null)
        return this.BaseHelper.ExecuteNonQuery(this._transactionProvider, deleteSql, dataParameterArray);
      using (IDbProvider provider = (IDbProvider) new OracleProvider(this._connectionString))
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
      if (this._transactionProvider != null)
        return this.BaseHelper.ExecuteNonQuery(this._transactionProvider, deleteSql, dataParameterArray);
      using (IDbProvider provider = (IDbProvider) new OracleProvider(this._connectionString))
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
      if (this._transactionProvider != null)
        return this.BaseHelper.ExecuteNonQuery(this._transactionProvider, deleteSql, dataParameterArray);
      using (IDbProvider provider = (IDbProvider) new OracleProvider(this._connectionString))
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
      if (this._transactionProvider != null)
        return this.BaseHelper.ExecuteNonQuery(this._transactionProvider, deleteSql, dataParameterArray);
      using (IDbProvider provider = (IDbProvider) new OracleProvider(this._connectionString))
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
      if (this._transactionProvider != null)
        return this.BaseHelper.ExecuteNonQuery(this._transactionProvider, deleteSql, dataParameterArray);
      using (IDbProvider provider = (IDbProvider) new OracleProvider(this._connectionString))
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
      IDbProvider provider = (IDbProvider) new OracleProvider(this._connectionString);
      T obj = this.BaseHelper.ConvertToEntity<T>(this.BaseHelper.ExecuteDataReader(provider, singleSql, dataParameterArray));
      provider.Close();
      return obj;
    }

    public T GetEntityExcludeField<T>(object pkPropertyValue, string fieldName) where T : class
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string singleSqlExcludeField = this.SqlFactory.CreateSingleSqlExcludeField(typeof (T), pkPropertyValue, fieldName, out dataParameterArray);
      IDbProvider provider = (IDbProvider) new OracleProvider(this._connectionString);
      T obj = this.BaseHelper.ConvertToEntity<T>(this.BaseHelper.ExecuteDataReader(provider, singleSqlExcludeField, dataParameterArray));
      provider.Close();
      return obj;
    }

    public object GetEntity(Type type, object pkPropertyValue)
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string singleSql = this.SqlFactory.CreateSingleSql(type, pkPropertyValue, out dataParameterArray);
      IDbProvider provider = (IDbProvider) new OracleProvider(this._connectionString);
      object obj = this._baseHelper.ConvertToEntity(type, this.BaseHelper.ExecuteDataReader(provider, singleSql, dataParameterArray));
      provider.Close();
      return obj;
    }

    public T GetEntity<T>(string propertyName, object propertyValue) where T : class
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string queryByPropertySql = this.SqlFactory.CreateQueryByPropertySql(typeof (T), propertyName, propertyValue, out dataParameterArray);
      IDbProvider provider = (IDbProvider) new OracleProvider(this._connectionString);
      T obj = this.BaseHelper.ConvertToEntity<T>(this.BaseHelper.ExecuteDataReader(provider, queryByPropertySql, dataParameterArray));
      provider.Close();
      return obj;
    }

    public object GetEntity(Type type, string propertyName, object propertyValue)
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string queryByPropertySql = this.SqlFactory.CreateQueryByPropertySql(type, propertyName, propertyValue, out dataParameterArray);
      IDbProvider provider = (IDbProvider) new OracleProvider(this._connectionString);
      object obj = this.BaseHelper.ConvertToEntity(type, this.BaseHelper.ExecuteDataReader(provider, queryByPropertySql, dataParameterArray));
      provider.Close();
      return obj;
    }

    public T GetEntity<T>(IEntity entity, string[] propertyNames) where T : class
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string singleSql = this.SqlFactory.CreateSingleSql(entity, out dataParameterArray, propertyNames);
      IDbProvider provider = (IDbProvider) new OracleProvider(this._connectionString);
      T obj = this.BaseHelper.ConvertToEntity<T>(this.BaseHelper.ExecuteDataReader(provider, singleSql, dataParameterArray));
      provider.Close();
      return obj;
    }

    public object GetEntity(Type type, IEntity entity, string[] propertyNames)
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string singleSql = this.SqlFactory.CreateSingleSql(type, (object) entity, out dataParameterArray, propertyNames);
      IDbProvider provider = (IDbProvider) new OracleProvider(this._connectionString);
      object obj = this.BaseHelper.ConvertToEntity(type, this.BaseHelper.ExecuteDataReader(provider, singleSql, dataParameterArray));
      provider.Close();
      return obj;
    }

    public T GetEntity<T>(IDataReader dr) where T : class
    {
      object instance = EntityFactory.CreateInstance(typeof (T));
      foreach (string key in (IEnumerable<string>) TableInfoDictionary.GetTableInfo(typeof (T)).DicColumns.Keys)
        (this.BaseHelper as OracleBaseHelper).SetValue(instance, typeof (T), key, dr);
      T obj = default (T);
      return (T) instance;
    }

    public int GetCount(Type type)
    {
      string converageSql = this.SqlFactory.CreateConverageSql(type, Converage.Count);
      IDbProvider provider = (IDbProvider) new OracleProvider(this._connectionString);
      int num = Convert.ToInt32(this.BaseHelper.ExecuteScalar(provider, converageSql));
      provider.Close();
      return num;
    }

    public int GetCount<T>() where T : class
    {
      string converageSql = this.SqlFactory.CreateConverageSql(typeof (T), Converage.CountNotNll);
      IDbProvider provider = (IDbProvider) new OracleProvider(this._connectionString);
      int num = Convert.ToInt32(this.BaseHelper.ExecuteScalar(provider, converageSql));
      provider.Close();
      return num;
    }

    public int GetCount<T>(string whereclause) where T : class
    {
      string converageSql = this.SqlFactory.CreateConverageSql(typeof (T), whereclause);
      IDbProvider provider = (IDbProvider) new OracleProvider(this._connectionString);
      int num = Convert.ToInt32(this.BaseHelper.ExecuteScalar(provider, converageSql));
      provider.Close();
      return num;
    }

    public int GetCount(Type type, IDictionary<string, object> dic, ConditionComponent component)
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string converageSql = this.SqlFactory.CreateConverageSql(type, Converage.Count, "", dic, out dataParameterArray, component);
      IDbProvider provider = (IDbProvider) new OracleProvider(this._connectionString);
      int num = (int) this.BaseHelper.ExecuteScalar(provider, converageSql, dataParameterArray);
      provider.Close();
      return num;
    }

    public IList<T> GetList<T>() where T : class
    {
      string querySql = this.SqlFactory.CreateQuerySql(typeof (T));
      IDbProvider provider = (IDbProvider) new OracleProvider(this._connectionString);
      IList<T> list = this.BaseHelper.ConvertToList<T>(this.BaseHelper.ExecuteDataReader(provider, querySql));
      provider.Close();
      return list;
    }

    public IList<T> GetList<T>(string whereclause) where T : class
    {
      string querySql = this.SqlFactory.CreateQuerySql(typeof (T), whereclause);
      IDbProvider provider = (IDbProvider) new OracleProvider(this._connectionString);
      IList<T> list = this.BaseHelper.ConvertToList<T>(this.BaseHelper.ExecuteDataReader(provider, querySql));
      provider.Close();
      return list;
    }

    public IList<T> GetList<T>(string whereclause, int pageIndex, int perPageCount, string OrderFieldNameAndSortType) where T : class
    {
      string querySql = this.SqlFactory.CreateQuerySql(typeof (T), whereclause, pageIndex, perPageCount, OrderFieldNameAndSortType);
      IDbProvider provider = (IDbProvider) new OracleProvider(this._connectionString);
      IList<T> list = this.BaseHelper.ConvertToList<T>(this.BaseHelper.ExecuteDataReader(provider, querySql));
      provider.Close();
      return list;
    }

    public IList<T> GetList<T>(string propertyName, object value) where T : class
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string queryByPropertySql = this.SqlFactory.CreateQueryByPropertySql(typeof (T), propertyName, value, out dataParameterArray);
      IDbProvider provider = (IDbProvider) new OracleProvider(this._connectionString);
      IList<T> list = this.BaseHelper.ConvertToList<T>(this.BaseHelper.ExecuteDataReader(provider, queryByPropertySql, dataParameterArray));
      provider.Close();
      return list;
    }

    public IList<T> GetList<T>(IDictionary<string, object> dic) where T : class
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string queryByPropertySql = this.SqlFactory.CreateQueryByPropertySql(typeof (T), dic, out dataParameterArray);
      IDbProvider provider = (IDbProvider) new OracleProvider(this._connectionString);
      IList<T> list = this.BaseHelper.ConvertToList<T>(this.BaseHelper.ExecuteDataReader(provider, queryByPropertySql, dataParameterArray));
      provider.Close();
      return list;
    }

    public IList<T> GetList<T>(IDictionary<string, object> dic, ConditionComponent component) where T : class
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string queryByPropertySql = this.SqlFactory.CreateQueryByPropertySql(typeof (T), dic, out dataParameterArray, component);
      IDbProvider provider = (IDbProvider) new OracleProvider(this._connectionString);
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

    public int Delete<T>(string whereclause) where T : class
    {
      string deleteSql = this.SqlFactory.CreateDeleteSql(typeof (T), whereclause);
      int num = -1;
      if (this._transactionProvider == null)
      {
        using (IDbProvider provider = (IDbProvider) new OracleProvider(this._connectionString))
        {
          num = this.BaseHelper.ExecuteNonQuery(provider, deleteSql);
          provider.Close();
        }
      }
      else
        num = this.BaseHelper.ExecuteNonQuery(this._transactionProvider, deleteSql);
      return num;
    }

    public int Delete<T>(string whereclause, IDbProvider provider) where T : class
    {
      string deleteSql = this.SqlFactory.CreateDeleteSql(typeof (T), whereclause);
      return this.BaseHelper.ExecuteNonQuery(provider, deleteSql);
    }

    public int Delete(Type type, object value, string[] propertyNames, IDbProvider provider)
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string deleteSql = this.SqlFactory.CreateDeleteSql(type, value, out dataParameterArray, propertyNames);
      return this.BaseHelper.ExecuteNonQuery(provider, deleteSql, dataParameterArray);
    }

    public int UpdateEx<T>(T t, string[] propertyNames) where T : IEntity
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string updateSqlEx = this.SqlFactory.CreateUpdateSqlEx(typeof (T), (object) t, out dataParameterArray, propertyNames);
      if (this._transactionProvider != null)
        return this.BaseHelper.ExecuteNonQuery(this._transactionProvider, updateSqlEx, dataParameterArray);
      IDbProvider provider = (IDbProvider) new OracleProvider(this._connectionString);
      int num = this.BaseHelper.ExecuteNonQuery(provider, updateSqlEx, dataParameterArray);
      provider.Close();
      return num;
    }

    public int UpdateEx<T>(T t, string[] propertyNames, IDbProvider provider) where T : IEntity
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string updateSqlEx = this.SqlFactory.CreateUpdateSqlEx(typeof (T), (object) t, out dataParameterArray, propertyNames);
      return this.BaseHelper.ExecuteNonQuery(provider, updateSqlEx, dataParameterArray);
    }

    public T GetEntityEx<T>(string propertyName, object propertyValue, string[] propertyNames) where T : class
    {
      IDataParameter[] dataParameterArray = (IDataParameter[]) null;
      string querySql = this.SqlFactory.CreateQuerySql(typeof (T), propertyNames, propertyName, propertyValue, out dataParameterArray);
      IDbProvider provider = (IDbProvider) new OracleProvider(this._connectionString);
      T obj = this.BaseHelper.ConvertToEntity<T>(this.BaseHelper.ExecuteDataReader(provider, querySql, dataParameterArray));
      provider.Close();
      return obj;
    }
  }
}
