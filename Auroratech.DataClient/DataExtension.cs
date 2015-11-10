using System.Data;

namespace Auroratech.DataClient
{
  public static class DataExtension
  {
    public static void AddRange(this IDataParameterCollection paramenters, params IDataParameter[] param)
    {
      if (param == null)
        return;
      foreach (IDbDataParameter dbDataParameter in param)
        paramenters.Add((object) dbDataParameter);
    }
  }
}
