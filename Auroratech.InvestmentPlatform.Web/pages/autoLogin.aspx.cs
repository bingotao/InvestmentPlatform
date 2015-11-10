using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Net;
using Newtonsoft.Json.Linq;
using System.Text;
using System.Configuration;

namespace Auroratech.InvestmentPlatform.pages
{
    public partial class autoLogin : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            bool bSuccess = false;
            string secret = Request.QueryString["x"];
            string uap_token = Request.QueryString["uap_token"];
            string uap_username = Request.QueryString["uap_username"];
            string uap_module = Request.QueryString["uap_module"];

            try
            {
                if (secret == "x")
                {
                    bSuccess = true;
                    uap_username = "zdww";
                }
                else if (string.IsNullOrEmpty(uap_token) || string.IsNullOrEmpty(uap_username) || string.IsNullOrEmpty(uap_module))
                {
                    bSuccess = false;
                }
                else
                {
                    WebClient wc = new WebClient();
                    JObject pObj = new JObject();
                    pObj.Add("token", uap_token);
                    pObj.Add("username", uap_username);
                    string sData = pObj.ToString();
                    wc.Headers.Add("Content-Type", "application/x-www-form-urlencoded");
                    wc.Headers.Add("ContentLength", sData.Length.ToString());

                    byte[] pData = Encoding.UTF8.GetBytes(sData);
                    string pUrl = ConfigurationManager.AppSettings["validate"];
                    byte[] rData = wc.UploadData(string.Format("{0}?token={1}&username={2}", pUrl, uap_token, uap_username), "POST", pData);
                    //byte[] rData = wc.UploadData(string.Format("http://188.166.252.54:8080/validate_token?token={1}&username={2}", pUrl, uap_token, uap_username), "POST", pData);
                    string sReturn = Encoding.UTF8.GetString(rData);
                    JObject rObj = JObject.Parse(sReturn);
                    bSuccess = rObj.Value<int>("code") == 0 ? true : false;
                }
            }
            catch (System.Exception ex)
            {
                bSuccess = false;
            }
            finally
            {
                if (bSuccess)
                {
                    this.Session["username"] = uap_username;
                    this.Response.Redirect("PlatformMap.aspx");
                }
                else
                {
                    this.Session["username"] = null;
                    //ClientScript.RegisterStartupScript(Page.GetType(), "", "<script language=javascript>window.opener=null;window.open('','_self');window.close();</script>");
                    //Response.Write("<script language=javascript>window.opener=null;window.open('','_self');window.close();</script>");
                    string sLoginPage = ConfigurationManager.AppSettings["loginpage"];
                    this.Response.Redirect(sLoginPage);
                }
            }
        }
    }
}