using System;
using System.Data;

namespace Auroratech.DataClient
{
  public interface IDbProvider : IDisposable
  {
    string ConnectionString { get; set; }

    IDbConnection Connection { get; set; }

    IDbCommand Command { get; set; }

    IDbDataAdapter Adapter { get; set; }

    void Open();

    void Close();

    void BeginTransaction();

    void RollBack();

    void Commit();
  }
}
