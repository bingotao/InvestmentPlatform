using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using System.Configuration;

namespace Auroratech.InvestmentPlatform
{
    // 注意: 使用“重构”菜单上的“重命名”命令，可以同时更改代码、svc 和配置文件中的类名“modules”。
    // 注意: 为了启动 WCF 测试客户端以测试此服务，请在解决方案资源管理器中选择 modules.svc 或 modules.svc.cs，然后开始调试。
    public class modules : Imodules
    {
        public Message GetModules1()
        {
            return new Message();
        }

        public Message GetModules2()
        {
            return new Message();
        }
    }

    public class Module
    {
        public string id = "1";
        public string name = "工业可用地块管理";
        public string description = "提供工业可用地块的数据查询及管理";
        public string logo = ConfigurationManager.AppSettings["logo"];
        public object task = new object();
    }

    public class Message
    {
        public int code;
        public Module[] data = null;
        public Message()
        {
            this.code = 0;
            this.data = new Module[] { new Module() };
        }
    }
}
