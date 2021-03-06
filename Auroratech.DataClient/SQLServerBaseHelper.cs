﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;

namespace Auroratech.DataClient
{
  public class SQLServerBaseHelper : IBaseOperator, IDisposable
  {
    private ISQLServerDbSqlFactory factory;

    public ISQLServerDbSqlFactory Factory
    {
      get
      {
        if (this.factory == null)
          this.factory = (ISQLServerDbSqlFactory) new SQLServerSqlFactory();
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
      if (provider.Connection.State == ConnectionState.Closed)
        provider.Connection.Open();
      provider.Command.CommandText = sqlString;
      provider.Command.CommandType = CommandType.Text;
      SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(provider.Command as SqlCommand);
      DataSet dataSet = new DataSet();
      sqlDataAdapter.Fill(dataSet);
      SqlParameter sqlParameter = new SqlParameter("myreturn", SqlDbType.Int);
      sqlParameter.Direction = ParameterDirection.ReturnValue;
      provider.Command.Parameters.Add((object) sqlParameter);
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

    public DataSet ExecuteStoredProcedure(IDbProvider provider, string storedProcedureName, params IDataParameter[] param)
    {
      if (provider.Connection.State == ConnectionState.Closed)
        provider.Connection.Open();
      provider.Command.CommandText = storedProcedureName;
      provider.Command.CommandType = CommandType.StoredProcedure;
      provider.Command.Parameters.Clear();
      DataExtension.AddRange(provider.Command.Parameters, param);
      SqlParameter sqlParameter = new SqlParameter("myreturn", SqlDbType.Int);
      sqlParameter.Direction = ParameterDirection.ReturnValue;
      provider.Command.Parameters.Add((object) sqlParameter);
      SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(provider.Command as SqlCommand);
      DataSet dataSet = new DataSet();
      object obj = ((DbParameter) provider.Command.Parameters["myreturn"]).Value;
      sqlDataAdapter.Fill(dataSet);
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
      if (provider.Connection.State == ConnectionState.Closed)
        provider.Connection.Open();
      provider.Command.CommandText = sqlString;
      provider.Command.CommandType = !isProcedure ? CommandType.Text : CommandType.StoredProcedure;
      provider.Command.Parameters.Clear();
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
      if (provider.Connection.State == ConnectionState.Closed)
        provider.Connection.Open();
      provider.Command.CommandText = sqlString;
      provider.Command.CommandType = !isProcedure ? CommandType.Text : CommandType.StoredProcedure;
      provider.Command.Parameters.Clear();
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
      if (provider.Connection.State == ConnectionState.Closed)
        provider.Connection.Open();
      provider.Command.CommandText = sqlString;
      provider.Command.CommandType = !isProcedure ? CommandType.Text : CommandType.StoredProcedure;
      provider.Command.Parameters.Clear();
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
      if (provider.Connection.State == ConnectionState.Closed)
        provider.Connection.Open();
      provider.Command.CommandText = sqlString;
      provider.Command.CommandType = !isProcedure ? CommandType.Text : CommandType.StoredProcedure;
      provider.Command.Parameters.Clear();
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
      return obj1;
    }

    public object ConvertToEntity(Type type, IDataReader reader)
    {
      TableInfoDictionary.InsertTableInfo(type, TableInfoHelper.GetTableInfo(type));
      object instance1 = EntityFactory.CreateInstance(type);
      foreach (string key in (IEnumerable<string>) TableInfoDictionary.GetTableInfo(type).DicColumns.Keys)
        this.SetValue(instance1, type, key, reader);
      if (TableInfoDictionary.GetTableInfo(type).DicLinkTable.Keys.Count > 0)
      {
        foreach (string index1 in (IEnumerable<string>) TableInfoDictionary.GetTableInfo(type).DicLinkTable.Keys)
        {
          Type dataType = TableInfoDictionary.GetTableInfo(type).DicLinkTable[index1].DataType;
          string singleSql = this.Factory.CreateSingleSql(dataType);
          IDataParameter[] dataParameterArray = new IDataParameter[1]
          {
            (IDataParameter) new SqlParameter()
          };
          dataParameterArray[0].ParameterName = "@" + TableInfoDictionary.GetTableInfo(TableInfoDictionary.GetTableInfo(type).DicLinkTable[index1].DataType).Table.PrimaryKey;
          dataParameterArray[0].Value = EntityFactory.GetPropertyValue(instance1, TableInfoDictionary.GetTableInfo(type).DicLinkTable[index1].KeyName);
          using (IDbProvider provider = (IDbProvider) new SQLServerProvider())
          {
            IDataReader dataReader = this.ExecuteDataReader(provider, singleSql, dataParameterArray);
            object instance2 = EntityFactory.CreateInstance(dataType, false);
            if (dataReader.Read())
            {
              foreach (string index2 in (IEnumerable<string>) TableInfoDictionary.GetTableInfo(dataType).DicProperties.Keys)
                TableInfoDictionary.GetTableInfo(dataType).DicProperties[index2].SetValue(instance2, dataReader[TableInfoDictionary.GetTableInfo(dataType).DicColumns[index2].FieldName], (object[]) null);
            }
            TableInfoDictionary.GetTableInfo(type).DicProperties[index1].SetValue(instance1, instance2, (object[]) null);
          }
        }
      }
      return instance1;
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
              (IDataParameter) new SqlParameter()
            };
            dataParameterArray[0].ParameterName = "@" + TableInfoDictionary.GetTableInfo(TableInfoDictionary.GetTableInfo(typeof (T)).DicLinkTable[index1].DataType).Table.PrimaryKey;
            dataParameterArray[0].Value = EntityFactory.GetPropertyValue((object) instance1, TableInfoDictionary.GetTableInfo(typeof (T)).DicLinkTable[index1].KeyName);
            using (IDbProvider provider = (IDbProvider) new SQLServerProvider())
            {
              IDataReader dataReader = this.ExecuteDataReader(provider, singleSql, dataParameterArray);
              object instance2 = EntityFactory.CreateInstance(dataType, false);
              if (dataReader.Read())
              {
                foreach (string index2 in (IEnumerable<string>) TableInfoDictionary.GetTableInfo(dataType).DicProperties.Keys)
                  TableInfoDictionary.GetTableInfo(dataType).DicProperties[index2].SetValue(instance2, dataReader[TableInfoDictionary.GetTableInfo(dataType).DicColumns[index2].FieldName], (object[]) null);
              }
              TableInfoDictionary.GetTableInfo(typeof (T)).DicProperties[index1].SetValue((object) instance1, instance2, (object[]) null);
            }
          }
        }
        list.Add(instance1);
      }
      return list;
    }
  }
}
