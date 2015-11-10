using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Auroratech.InvestmentPlatform.masterpage
{
    public partial class MasterBase : System.Web.UI.MasterPage
    {
        public string navId = string.Empty;
        protected void Page_Load(object sender, EventArgs e)
        {
            navId = Request.QueryString["navId"];
            navId = string.IsNullOrEmpty(navId) ? string.Empty : navId;
            /* 登录验证
             * 
            if (Session["LoginUserID"] == null)
            {
                Response.Redirect("../Login.aspx");
            }
             * */
        }
    }
}