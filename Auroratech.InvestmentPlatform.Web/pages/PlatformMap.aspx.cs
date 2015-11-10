using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Auroratech.InvestmentPlatform.pages
{
    public partial class PlatformMap : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            object o = this.Session["username"];
            if (o == null)
            {
                bool b = true;
//#if DEBUG
//                b = false;
//#endif
                if (b)
                {
                    string sLoginPage = ConfigurationManager.AppSettings["loginpage"];
                    this.Response.Redirect(sLoginPage);
                }
            }
        }
    }
}