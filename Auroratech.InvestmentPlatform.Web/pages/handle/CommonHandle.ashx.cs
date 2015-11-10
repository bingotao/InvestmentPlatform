using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using Auroratech.DataClient;
using Auroratech.InvestmentPlatform.BaseLib;
using Auroratech.InvestmentPlatform.Web.code;
using Auroratech.InvestmentPlatform.code;

namespace Auroratech.InvestmentPlatform.pages.handle
{
    /// <summary>
    /// CommonHandle 的摘要说明
    /// </summary>
    public class CommonHandle : IHttpHandler
    {

        private IDbGUIDOperator dbContext = SystemParameterHelper.Instance.BusinessDBContext;
        private string m_sTmpFile = ConfigurationManager.AppSettings["tempFilePath"];
        public void ProcessRequest(HttpContext context)
        {
            string action = context.Request.QueryString["action"];
            switch (action)
            {
                case "getQYByWhere":
                    this.getQYByWhere(context);
                    break;
                case "GetDK":
                    this.GetDK(context);
                    break;
                case "ExportExcel":
                    this.ExportExcel(context);
                    break;
                case "ExportMap":
                    this.ExportMap(context);
                    break;
                case "GetAllDK":
                    this.GetAllDK(context);
                    break;
                default:
                    break;
            }
        }

        private void GetAllDK(HttpContext context)
        {
            string sWhere = context.Request.Form["where"];
            string sSQL_Count = string.Format(@"
select * from(
select '规划地块' 类型,count(*) 地块个数,sum(tdmj)*0.0015 面积,1 xh from ghdk where {0}
union
select '批而未供' 类型,count(*) 地块个数,sum(tdmj)*0.0015 面积,2 xh from pewg where {0}
union
select '供而未用' 类型,count(*) 地块个数,sum(tdmj)*0.0015 面积,3 xh from gewy where {0}
union
select '用而不足' 类型,count(*) 地块个数,sum(tdmj)*0.0015 面积,4 xh from yebz where {0}) order by xh", sWhere);
            DataTable dtCount = this.dbContext.ExecuteQuery(sSQL_Count).Tables[0];
            string sTotal = string.Empty;
            decimal dTotalCount = 0;
            decimal dTotalArea = 0;
            foreach (DataRow dr in dtCount.Rows)
            {
                decimal dCount = Math.Round(dr[1] == DBNull.Value ? 0 : (decimal)dr[1], 2);
                decimal dArea = Math.Round(dr[2] == DBNull.Value ? 0 : (decimal)dr[2], 2);
                sTotal += string.Format("{0}: {1} 宗，{2}亩，", dr[0].ToString(), dCount, dArea);
                dTotalCount += dCount;
                dTotalArea += dArea;
            }
            sTotal = string.Format("总计: {0} 宗，{1}亩，", dTotalCount, dTotalArea) + sTotal;
            sTotal = sTotal.Trim('，');
            string sSQL_List = string.Format(@"select * from (
select objectid id,'规划地块' 类型,N'' 用地单位,N'' 土地坐落,tdmj 土地面积_平方米,tdmj_m 土地面积_亩,1 xh from ghdk where {0}
union
select objectid id,'批而未供' 类型,yddw 用地单位,tdzl 土地坐落,tdmj 土地面积_平方米,tdmj_m 土地面积_亩,2 xh from pewg where {0}
union
select objectid id,'供而未用' 类型,yddw 用地单位,tdzl 土地坐落,tdmj 土地面积_平方米,tdmj_m 土地面积_亩,3 xh from gewy where {0}
union
select objectid id,'用而不足' 类型,yddw 用地单位,tdzl 土地坐落,tdmj 土地面积_平方米,tdmj_m 土地面积_亩,4 xh from yebz where {0})
order by xh asc,土地面积_亩 desc", sWhere);
            DataTable dtList = this.dbContext.ExecuteQuery(sSQL_List).Tables[0];
            Dictionary<string, object> dicReturn = new Dictionary<string, object>();
            dicReturn["total"] = sTotal;
            dicReturn["rows"] = dtList;
            string sReturn = Newtonsoft.Json.JsonConvert.SerializeObject(dicReturn, new JsonConverter[] { new CustomDecimalConverter(), new CustomDateTimeConverter() });
            this.ResponseResult(sReturn);
        }

        private void ExportMap(HttpContext context)
        {
            string sObjectID = context.Request.Form["oid"];
            string sUrl = context.Request.Form["url"];
            string sType = context.Request.Form["type"];
            WebFileDownLoad.DownloadFile(sUrl, string.Format(@"C:\tmp\{0}_{1}.png", sType, sObjectID));
        }

        private void ExportExcel(HttpContext context)
        {
            string sFields = context.Request.Form["fields"];
            string sWhere = context.Request.Form["where"];
            string sTableName = context.Request.Form["tableName"];
            string sSheetName = context.Request.Form["sheetName"];
            string sType = context.Request.Form["type"];
            string sDescField = context.Request.Form["descField"];
            if (string.IsNullOrEmpty(sDescField))
            {
                sDescField = "tdmj";
            }
            string sSQL_List = string.Empty;
            DataTable dtList = null;
            if (sType == "all")
            {
                sSQL_List = string.Format(@"select * from
(select bsm 标识码,'规划地块' 类型,N'' 用地单位,N'' 土地坐落,tdmj 土地面积_平方米,tdmj_m 土地面积_亩,1 xh from ghdk where {0}
union
select bsm 标识码,'批而未供' 类型,yddw 用地单位,tdzl 土地坐落,tdmj 土地面积_平方米,tdmj_m 土地面积_亩,2 xh from pewg where {0}
union
select bsm 标识码,'供而未用' 类型,yddw 用地单位,tdzl 土地坐落,tdmj 土地面积_平方米,tdmj_m 土地面积_亩,3 xh from gewy where {0}
union
select bsm 标识码,'用而不足' 类型,yddw 用地单位,tdzl 土地坐落,tdmj 土地面积_平方米,tdmj_m 土地面积_亩,4 xh from yebz where {0})
order by xh asc,土地面积_亩 desc", sWhere);
                dtList = this.dbContext.ExecuteQuery(sSQL_List).Tables[0];
            }
            else
            {
                sSQL_List = string.Format("select {0} from {1} where {2} order by {3} desc", sFields, sTableName, sWhere, sDescField);
                dtList = this.dbContext.ExecuteQuery(sSQL_List).Tables[0];
            }
            string sDir = context.Server.HtmlEncode(context.Request.PhysicalApplicationPath) + m_sTmpFile;
            string sFileFullPath = Path.Combine(sDir, string.Format("{0}({1}).xls", sSheetName, Guid.NewGuid().ToString()));
            ExcelExportHelper excelExport = new ExcelExportHelper();
            FileInfo fileInfo = excelExport.DataTableToExcel(dtList, sSheetName, sFileFullPath);
            string sFilePath = "../" + this.m_sTmpFile + "/" + (fileInfo.Name);
            this.ResponseResult(sFilePath);
        }

        private void GetDK(HttpContext context)
        {
            string sFields = context.Request.Form["fields"];
            string sWhere = context.Request.Form["where"];
            string sTableName = context.Request.Form["tableName"];
            string sDescField = context.Request.Form["descField"];
            if (string.IsNullOrEmpty(sDescField))
            {
                sDescField = "tdmj";
            }
            string sSQL_SUM = null;
            DataTable dtSUM = null;
            string sTotal = null;
            if (sTableName == "xzcf" || sTableName == "kjzt")
            {
                sSQL_SUM = string.Format("select count(*) gs,sum(jzmj) mj,sum(xzmj) xzmj from {0} where {1}", sTableName, sWhere);
                dtSUM = this.dbContext.ExecuteQuery(sSQL_SUM).Tables[0];
                sTotal = string.Format("总个数：{0}，建筑总面积：{1}平方米，闲置面积：{2}平方米", dtSUM.Rows[0][0] == DBNull.Value ? 0 : (decimal)dtSUM.Rows[0][0], dtSUM.Rows[0][1] == DBNull.Value ? 0 : Math.Round((decimal)dtSUM.Rows[0][1], 2), dtSUM.Rows[0][2] == DBNull.Value ? 0 : Math.Round((decimal)dtSUM.Rows[0][2], 2));
            }
            else
            {
                sSQL_SUM = string.Format("select count(*) gs,sum(tdmj)*0.0015 mj from {0} where {1}", sTableName, sWhere);
                dtSUM = this.dbContext.ExecuteQuery(sSQL_SUM).Tables[0];
                sTotal = string.Format("总个数：{0}，总面积：{1}亩", dtSUM.Rows[0][0] == DBNull.Value ? 0 : (decimal)dtSUM.Rows[0][0], dtSUM.Rows[0][1] == DBNull.Value ? 0 : Math.Round((decimal)dtSUM.Rows[0][1], 2));
            }


            string sSQL_List = string.Format("select {0} from {1} where {2} order by {3} desc", sFields, sTableName, sWhere, sDescField);
            DataTable dtList = this.dbContext.ExecuteQuery(sSQL_List).Tables[0];
            Dictionary<string, object> dicReturn = new Dictionary<string, object>();
            dicReturn["total"] = sTotal;
            dicReturn["rows"] = dtList;

            string sReturn = Newtonsoft.Json.JsonConvert.SerializeObject(dicReturn, new JsonConverter[] { new CustomDecimalConverter(), new CustomDateTimeConverter() });
            this.ResponseResult(sReturn);
        }

        private void getQYByWhere(HttpContext context)
        {
            string sWhere = context.Request.QueryString["where"];
            if (sWhere != string.Empty)
            {
                sWhere = "select * from yddw where " + sWhere;
            }
            DataSet ds = this.dbContext.ExecuteQuery(sWhere);
            DataTable dt = ds.Tables[0];
            string sReturn = Newtonsoft.Json.JsonConvert.SerializeObject(dt);
            this.ResponseResult(sReturn);
        }

        public void ResponseResult(string result)
        {
            HttpContext.Current.Response.Clear();
            HttpContext.Current.Response.Write(result);
            HttpContext.Current.Response.End();
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
    public class CustomDecimalConverter : CustomCreationConverter<decimal>
    {
        public override bool CanWrite
        {
            get
            {
                return true;
            }
        }

        public override decimal Create(Type objectType)
        {
            return 0.0M;
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            if (value == null)
            {
                writer.WriteNull();
            }
            else
            {
                var formatted = Math.Round((decimal)value, 2);
                writer.WriteValue(formatted);
            }
        }
    }

    public class CustomDateTimeConverter : CustomCreationConverter<DateTime>
    {
        public override bool CanWrite
        {
            get
            {
                return true;
            }
        }

        public override DateTime Create(Type objectType)
        {
            return DateTime.MinValue;
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            if (value == null)
            {
                writer.WriteNull();
            }
            else
            {
                var date = (DateTime)value;
                var formatted = string.Format("{0}年{1}月{2}日", date.Year, date.Month, date.Day);
                writer.WriteValue(formatted);
            }
        }
    }
}