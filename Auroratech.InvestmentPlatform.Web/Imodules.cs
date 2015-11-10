using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;

namespace Auroratech.InvestmentPlatform
{
    // 注意: 使用“重构”菜单上的“重命名”命令，可以同时更改代码和配置文件中的接口名“Imodules”。
    [ServiceContract]
    public interface Imodules
    {
        [OperationContract]
        [WebInvoke(UriTemplate = "modules", BodyStyle = WebMessageBodyStyle.Bare, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, Method = "POST")]
        Message GetModules1();

        [OperationContract]
        [WebGet(UriTemplate = "modules", ResponseFormat = WebMessageFormat.Json)]
        Message GetModules2();
    }
}
