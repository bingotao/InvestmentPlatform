using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.OracleClient;

namespace Auroratech.DataClient
{
  public class OracleBaseHelper : IBaseOperator, IDisposable
  {
    private IOracleDbSqlFactory factory;

    public IOracleDbSqlFactory Factory
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

    public void Dispose()
    {
      throw new NotImplementedException();
    }

    public DataSet ExecuteQuery(IDbProvider provider, string sqlString)
    {
      provider.Open();
      provider.Command.CommandText = sqlString;
      provider.Command.CommandType = CommandType.Text;
      provider.Command.Parameters.Clear();
      OracleDataAdapter oracleDataAdapter = new OracleDataAdapter(provider.Command as OracleCommand);
      DataSet dataSet = new DataSet();
      try
      {
        oracleDataAdapter.Fill(dataSet);
        OracleParameter oracleParameter = new OracleParameter("myreturn", OracleType.Int32);
        oracleParameter.Direction = ParameterDirection.ReturnValue;
        provider.Command.Parameters.Add((object) oracleParameter);
        object obj = ((DbParameter) provider.Command.Parameters["myreturn"]).Value;
        if (dataSet.Tables.Count > 0 || obj == null)
          return dataSet;
        int num = Convert.ToInt32(obj.ToString());
        DataTable dataTable = new DataTable("returntable");
        DataColumn column = new DataColumn("returnvalue", typeof (string));
        dataTable.Columns.Add(column);
        dataTable.NewRow()[0] = (object) num;
      }
      catch (Exception ex)
      {
        throw ex;
      }
      return dataSet;
    }

    public DataSet ExecuteStoredProcedure(IDbProvider provider, string storedProcedureName, params IDataParameter[] param)
    {
      provider.Open();
      provider.Command.CommandText = storedProcedureName;
      provider.Command.CommandType = CommandType.StoredProcedure;
      provider.Command.Parameters.Clear();
      if (param != null && param.Length > 0)
        DataExtension.AddRange(provider.Command.Parameters, param);
      OracleDataAdapter oracleDataAdapter = new OracleDataAdapter(provider.Command as OracleCommand);
      DataSet dataSet = new DataSet();
      oracleDataAdapter.Fill(dataSet);
      OracleParameter oracleParameter = new OracleParameter("myreturn", OracleType.Int32);
      oracleParameter.Direction = ParameterDirection.ReturnValue;
      provider.Command.Parameters.Add((object) oracleParameter);
      object obj = ((DbParameter) provider.Command.Parameters["myreturn"]).Value;
      if (dataSet.Tables.Count > 0 || obj == null)
        return dataSet;
      int num = Convert.ToInt32(obj.ToString());
      DataTable dataTable = new DataTable("returntable");
      DataColumn column = new DataColumn("returnvalue", typeof (string));
      dataTable.Columns.Add(column);
      dataTable.NewRow()[0] = (object) num;
      return dataSet;
    }

    public int ExecuteNonQuery(IDbProvider provider, string sqlString)
    {
      return this.ExecuteNonQuery(provider, sqlString, false, (IDataParameter[]) null);
    }

    public int ExecuteNonQuery(IDbProvider provider, string sqlString, bool isProcedure)
    {
      return this.ExecuteNonQuery(provider, sqlString, isProcedure, (IDataParameter[]) null);
    }

    public int ExecuteNonQuery(IDbProvider provider, string sqlString, params IDataParameter[] param)
    {
      return this.ExecuteNonQuery(provider, sqlString, false, param);
    }

    public int ExecuteNonQuery(IDbProvider provider, string sqlString, bool isProcedure, params IDataParameter[] param)
    {
      provider.Open();
      provider.Command.CommandText = sqlString;
      provider.Command.CommandType = !isProcedure ? CommandType.Text : CommandType.StoredProcedure;
      provider.Command.Parameters.Clear();
      if (param != null && param.Length > 0)
        DataExtension.AddRange(provider.Command.Parameters, param);
      return provider.Command.ExecuteNonQuery();
    }

    public object ExecuteScalar(IDbProvider provider, string sqlString)
    {
      return this.ExecuteScalar(provider, sqlString, false, (IDataParameter[]) null);
    }

    public object ExecuteScalar(IDbProvider provider, string sqlString, bool isProcedure)
    {
      return this.ExecuteScalar(provider, sqlString, isProcedure, (IDataParameter[]) null);
    }

    public object ExecuteScalar(IDbProvider provider, string sqlString, params IDataParameter[] param)
    {
      return this.ExecuteScalar(provider, sqlString, false, param);
    }

    public object ExecuteScalar(IDbProvider provider, string sqlString, bool isProcedure, params IDataParameter[] param)
    {
      provider.Open();
      provider.Command.CommandText = sqlString;
      provider.Command.CommandType = !isProcedure ? CommandType.Text : CommandType.StoredProcedure;
      provider.Command.Parameters.Clear();
      if (param != null && param.Length > 0)
        DataExtension.AddRange(provider.Command.Parameters, param);
      return provider.Command.ExecuteScalar();
    }

    public IDataReader ExecuteDataReader(IDbProvider provider, string sqlString)
    {
      return this.ExecuteDataReader(provider, sqlString, false, (IDataParameter[]) null);
    }

    public IDataReader ExecuteDataReader(IDbProvider provider, string sqlString, bool isProcedure)
    {
      return this.ExecuteDataReader(provider, sqlString, isProcedure, (IDataParameter[]) null);
    }

    public IDataReader ExecuteDataReader(IDbProvider provider, string sqlString, params IDataParameter[] param)
    {
      return this.ExecuteDataReader(provider, sqlString, false, param);
    }

    public IDataReader ExecuteDataReader(IDbProvider provider, string sqlString, bool isProcedure, params IDataParameter[] param)
    {
      provider.Open();
      provider.Command.CommandText = sqlString;
      provider.Command.CommandType = !isProcedure ? CommandType.Text : CommandType.StoredProcedure;
      provider.Command.Parameters.Clear();
      if (param != null && param.Length > 0)
        DataExtension.AddRange(provider.Command.Parameters, param);
      return provider.Command.ExecuteReader();
    }

    public DataTable ExecuteTable(IDbProvider provider, string sqlString)
    {
      return this.ExecuteTable(provider, sqlString, false, (IDataParameter[]) null);
    }

    public DataTable ExecuteTable(IDbProvider provider, string sqlString, bool isProcedure)
    {
      return this.ExecuteTable(provider, sqlString, isProcedure, (IDataParameter[]) null);
    }

    public DataTable ExecuteTable(IDbProvider provider, string sqlString, params IDataParameter[] param)
    {
      return this.ExecuteTable(provider, sqlString, false, param);
    }

    public DataTable ExecuteTable(IDbProvider provider, string sqlString, bool isProcedure, params IDataParameter[] param)
    {
      provider.Open();
      provider.Command.CommandText = sqlString;
      provider.Command.CommandType = !isProcedure ? CommandType.Text : CommandType.StoredProcedure;
      provider.Command.Parameters.Clear();
      if (param != null && param.Length > 0)
        DataExtension.AddRange(provider.Command.Parameters, param);
      DataSet dataSet = new DataSet();
      provider.Adapter.Fill(dataSet);
      return dataSet.Tables[0];
    }

    public T ConvertToEntity<T>(IDataReader reader) where T : class
    {
      T obj1 = default (T);
      object obj2 = this.ConvertToEntity(typeof (T), reader);
      if (obj2 != null)
        obj1 = (T) obj2;
      reader.Close();
      return obj1;
    }

    public object ConvertToEntity(Type type, IDataReader reader)
    {
      string str = string.Empty;
      object entity = (object) null;
      if (reader.Read())
      {
        entity = EntityFactory.CreateInstance(type);
        foreach (string key in (IEnumerable<string>) TableInfoDictionary.GetTableInfo(type).DicColumns.Keys)
          this.SetValue(entity, type, key, reader);
        if (TableInfoDictionary.GetTableInfo(type).DicLinkTable.Keys.Count > 0)
        {
          foreach (string index1 in (IEnumerable<string>) TableInfoDictionary.GetTableInfo(type).DicLinkTable.Keys)
          {
            Type dataType = TableInfoDictionary.GetTableInfo(type).DicLinkTable[index1].DataType;
            string singleSql = this.Factory.CreateSingleSql(dataType);
            IDataParameter[] dataParameterArray = new IDataParameter[1]
            {
              (IDataParameter) new OracleParameter()
            };
            dataParameterArray[0].ParameterName = "@" + TableInfoDictionary.GetTableInfo(TableInfoDictionary.GetTableInfo(type).DicLinkTable[index1].DataType).Table.PrimaryKey;
            dataParameterArray[0].Value = EntityFactory.GetPropertyValue(entity, TableInfoDictionary.GetTableInfo(type).DicLinkTable[index1].KeyName);
            IDataReader dataReader = this.ExecuteDataReader((IDbProvider) new OracleProvider(), singleSql, dataParameterArray);
            object instance = EntityFactory.CreateInstance(dataType, false);
            if (dataReader.Read())
            {
              foreach (string index2 in (IEnumerable<string>) TableInfoDictionary.GetTableInfo(dataType).DicProperties.Keys)
                TableInfoDictionary.GetTableInfo(dataType).DicProperties[index2].SetValue(instance, dataReader[TableInfoDictionary.GetTableInfo(dataType).DicColumns[index2].FieldName], (object[]) null);
            }
            TableInfoDictionary.GetTableInfo(type).DicProperties[index1].SetValue(entity, instance, (object[]) null);
            dataReader.Close();
          }
        }
      }
      return entity;
    }

    public void SetValue(object entity, Type type, string key, IDataReader reader)
    {
      string str = string.Empty;
      string fullName = TableInfoDictionary.GetTableInfo(type).DicProperties[key].PropertyType.FullName;
      try
      {
        reader.GetOrdinal(key);
      }
      catch (IndexOutOfRangeException ex)
      {
        return;
      }
      object obj = reader[key];
      if (string.IsNullOrEmpty(obj.ToString()))
      {
        switch (fullName)
        {
          case "System.Int16":
          case "System.Int32":
          case "System.Int64":
            TableInfoDictionary.GetTableInfo(type).DicProperties[key].SetValue(entity, (object) 0, (object[]) null);
            break;
          case "System.Decimal":
            TableInfoDictionary.GetTableInfo(type).DicProperties[key].SetValue(entity, (object) new Decimal(0, 0, 0, false, (byte) 1), (object[]) null);
            break;
          case "System.DateTime":
            TableInfoDictionary.GetTableInfo(type).DicProperties[key].SetValue(entity, (object) DateTime.MinValue, (object[]) null);
            break;
          case "System.String":
            TableInfoDictionary.GetTableInfo(type).DicProperties[key].SetValue(entity, (object) "", (object[]) null);
            break;
          case "System.Byte[]":
            TableInfoDictionary.GetTableInfo(type).DicProperties[key].SetValue(entity, (object) null, (object[]) null);
            break;
          case "System.Double":
            TableInfoDictionary.GetTableInfo(type).DicProperties[key].SetValue(entity, (object) 0.0, (object[]) null);
            break;
          default:
            TableInfoDictionary.GetTableInfo(type).DicProperties[key].SetValue(entity, obj, (object[]) null);
            break;
        }
      }
      else
      {
        switch (fullName)
        {
          case "System.Int32":
            TableInfoDictionary.GetTableInfo(type).DicProperties[key].SetValue(entity, (object) Convert.ToInt32(obj.ToString()), (object[]) null);
            break;
          case "System.Int64":
            TableInfoDictionary.GetTableInfo(type).DicProperties[key].SetValue(entity, (object) Convert.ToInt64(obj.ToString()), (object[]) null);
            break;
          case "System.Double":
            TableInfoDictionary.GetTableInfo(type).DicProperties[key].SetValue(entity, (object) Convert.ToDouble(obj.ToString()), (object[]) null);
            break;
          case "System.Decimal":
            TableInfoDictionary.GetTableInfo(type).DicProperties[key].SetValue(entity, (object) Convert.ToDecimal(obj.ToString()), (object[]) null);
            break;
          case "System.DateTime":
            TableInfoDictionary.GetTableInfo(type).DicProperties[key].SetValue(entity, (object) Convert.ToDateTime(obj.ToString()), (object[]) null);
            break;
          case "System.String":
            TableInfoDictionary.GetTableInfo(type).DicProperties[key].SetValue(entity, (object) obj.ToString(), (object[]) null);
            break;
          default:
            TableInfoDictionary.GetTableInfo(type).DicProperties[key].SetValue(entity, obj, (object[]) null);
            break;
        }
      }
    }

    public IList<T> ConvertToList<T>(IDataReader reader) where T : class
    {
      string str = string.Empty;
      T obj = default (T);
      IList<T> list = (IList<T>) new List<T>();
      while (reader.Read())
      {
        T instance1 = EntityFactory.CreateInstance<T>();
        foreach (string key in (IEnumerable<string>) TableInfoDictionary.GetTableInfo(typeof (T)).DicColumns.Keys)
          this.SetValue((object) instance1, typeof (T), key, reader);
        if (TableInfoDictionary.GetTableInfo(typeof (T)).DicLinkTable.Keys.Count > 0)
        {
          foreach (string index1 in (IEnumerable<string>) TableInfoDictionary.GetTableInfo(typeof (T)).DicLinkTable.Keys)
          {
            Type dataType = TableInfoDictionary.GetTableInfo(typeof (T)).DicLinkTable[index1].DataType;
            string singleSql = this.Factory.CreateSingleSql(dataType);
            IDataParameter[] dataParameterArray = new IDataParameter[1]
            {
              (IDataParameter) new OracleParameter()
            };
            dataParameterArray[0].ParameterName = "@" + TableInfoDictionary.GetTableInfo(TableInfoDictionary.GetTableInfo(typeof (T)).DicLinkTable[index1].DataType).Table.PrimaryKey;
            dataParameterArray[0].Value = EntityFactory.GetPropertyValue((object) instance1, TableInfoDictionary.GetTableInfo(typeof (T)).DicLinkTable[index1].KeyName);
            IDataReader dataReader = this.ExecuteDataReader((IDbProvider) new OracleProvider(), singleSql, dataParameterArray);
            object instance2 = EntityFactory.CreateInstance(dataType, false);
            if (dataReader.Read())
            {
              foreach (string index2 in (IEnumerable<string>) TableInfoDictionary.GetTableInfo(dataType).DicProperties.Keys)
                TableInfoDictionary.GetTableInfo(dataType).DicProperties[index2].SetValue(instance2, dataReader[TableInfoDictionary.GetTableInfo(dataType).DicColumns[index2].FieldName], (object[]) null);
            }
            TableInfoDictionary.GetTableInfo(typeof (T)).DicProperties[index1].SetValue((object) instance1, instance2, (object[]) null);
            dataReader.Close();
          }
        }
        list.Add(instance1);
      }
      reader.Close();
      return list;
    }
  }
}
