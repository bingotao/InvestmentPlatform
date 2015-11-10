using System;

namespace Auroratech.DataClient
{
  public class SQLConverter
  {
    private static SQLConverter mInstance = (SQLConverter) null;
    private static readonly object lockAssistant = new object();
    private bool mISOracleConnectType;

    public static SQLConverter Instance
    {
      get
      {
        if (SQLConverter.mInstance == null)
        {
          lock (SQLConverter.lockAssistant)
          {
            if (SQLConverter.mInstance == null)
              SQLConverter.mInstance = new SQLConverter();
          }
        }
        return SQLConverter.mInstance;
      }
    }

    public bool ISOracleConnectType
    {
      get
      {
        return this.mISOracleConnectType;
      }
      set
      {
        this.mISOracleConnectType = value;
      }
    }

    public string ToSystemSQL(string where)
    {
      if (!this.ISOracleConnectType)
      {
        where = where.Replace("left join", "LEFT JOIN");
        where = where.Replace("Left Join", "LEFT JOIN");
        where = where.Replace("join", "INNER JOIN");
        where = where.Replace("Join", "INNER JOIN");
      }
      return where;
    }

    public string GetDate(DateTime dtExecTimeFirst)
    {
      if (this.ISOracleConnectType)
        return "to_date('" + (object) dtExecTimeFirst + "','yyyy-mm-dd hh24:mi:ss') ";
      return "#" + (object) dtExecTimeFirst + "#";
    }

    public string GetDate(string strExecTimeFirst)
    {
      if (this.ISOracleConnectType)
        return "to_date('" + strExecTimeFirst + "','yyyy-mm-dd hh24:mi:ss') ";
      return "#" + strExecTimeFirst + "#";
    }
  }
}
