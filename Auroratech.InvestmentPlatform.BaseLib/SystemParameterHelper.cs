using Auroratech.DataClient;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.OracleClient;
using System.Linq;
using System.Text;

namespace Auroratech.InvestmentPlatform.BaseLib
{
    /// <summary>
    /// InvestmentPlatform系统参数帮助类
    /// </summary>
    public class SystemParameterHelper
    {
        private static SystemParameterHelper mInstance = null;

        //线程锁定辅助对象
        private static readonly object lockAssistant = new object();
        /// <summary>
        /// 单例
        /// </summary>
        public static SystemParameterHelper Instance
        {
            get
            {
                if (mInstance == null)
                {
                    lock (lockAssistant)
                    {
                        if (mInstance == null)
                            mInstance = new SystemParameterHelper();
                    }
                }
                return mInstance;
            }
        }

        /// <summary>
        /// ZHGT业务数据库操作上下文
        /// </summary>
        public IDbGUIDOperator BusinessDBContext
        {
            get
            {
                string m_SQLConnn = ConfigurationManager.AppSettings["InvestmentPlatform_bussiness"];
                return new OracleContext(m_SQLConnn);
            }
        }
    }
}
