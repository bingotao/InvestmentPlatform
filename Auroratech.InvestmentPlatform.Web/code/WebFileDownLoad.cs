using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;

namespace Auroratech.InvestmentPlatform.code
{
    public static class WebFileDownLoad
    {
        private static WebClient webClient = new WebClient();

        public static void DownloadFile(string sUrl, string sFileName)
        {
            try
            {
                WebClient webClient = WebFileDownLoad.webClient;
                webClient.DownloadFileAsync(new Uri(sUrl), sFileName);
            }
            catch (System.Exception ex)
            {

            }
        }
    }
}