using System;
using System.Collections.Generic;
using System.Data;

namespace Auroratech.DataClient
{
  public interface IBaseOperator : IDisposable
  {
    DataSet ExecuteStoredProcedure(IDbProvider provider, string storedProcedureName, params IDataParameter[] param);

    DataSet ExecuteQuery(IDbProvider provider, string sqlString);

    int ExecuteNonQuery(IDbProvider provider, string sqlString);

    int ExecuteNonQuery(IDbProvider provider, string sqlString, bool isProcedure);

    int ExecuteNonQuery(IDbProvider provider, string sqlString, params IDataParameter[] param);

    int ExecuteNonQuery(IDbProvider provider, string sqlString, bool isProcedure, params IDataParameter[] param);

    object ExecuteScalar(IDbProvider provider, string sqlString);

    object ExecuteScalar(IDbProvider provider, string sqlString, bool isProcedure);

    object ExecuteScalar(IDbProvider provider, string sqlString, params IDataParameter[] param);

    object ExecuteScalar(IDbProvider provider, string sqlString, bool isProcedure, params IDataParameter[] param);

    IDataReader ExecuteDataReader(IDbProvider provider, string sqlString);

    IDataReader ExecuteDataReader(IDbProvider provider, string sqlString, bool isProcedure);

    IDataReader ExecuteDataReader(IDbProvider provider, string sqlString, params IDataParameter[] param);

    IDataReader ExecuteDataReader(IDbProvider provider, string sqlString, bool isProcedure, params IDataParameter[] param);

    DataTable ExecuteTable(IDbProvider provider, string sqlString);

    DataTable ExecuteTable(IDbProvider provider, string sqlString, bool isProcedure);

    DataTable ExecuteTable(IDbProvider provider, string sqlString, params IDataParameter[] param);

    DataTable ExecuteTable(IDbProvider provider, string sqlString, bool isProcedure, params IDataParameter[] param);

    T ConvertToEntity<T>(IDataReader reader) where T : class;

    object ConvertToEntity(Type type, IDataReader reader);

    IList<T> ConvertToList<T>(IDataReader reader) where T : class;
  }
}
