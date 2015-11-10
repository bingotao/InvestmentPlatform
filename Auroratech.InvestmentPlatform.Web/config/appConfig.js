var appConfig = [
    {
        name: '属性识别',
        apps: [
            {
                category: '常用',
                name: '属性识别',
                alias: '属性识别',
                id: 'identify-panel',
                activate: null,
                deactivate: null,
                iconPath: null,
                bActive: false
            }
        ]
    },
    {
        name: '快捷查询',
        apps: [
            {
                category: '快捷查询',
                name: '快捷查询',
                alias: '快捷查询',
                id: 'kscx',
                activate: null,
                deactivate: null,
                iconPath: null,
                bActive: false
            }]
    },
    {
        name: '快捷查询',
        apps: [
            {
                category: '常用',
                name: '图形清空',
                alias: '图形清空',
                id: 'mapclear',
                activate: null,
                deactivate: null,
                iconPath: null,
                bActive: false,
                type: 'command',
                execute: function () {
                    giscom.clearGraphicsLayer();
                }
            }]
    },
   {
       name: '招商专题',
       apps: [
           {
               category: '未供',
               name: '规划地块查询',
               alias: '规划地块',
               id: 'zsdk',
               activate: null,
               deactivate: null,
               iconPath: null,
               bActive: false
           }, {
               category: '未供',
               name: '批而未供查询',
               alias: '批而未供',
               id: 'pewg',
               activate: null,
               deactivate: null,
               iconPath: null,
               bActive: false
           }]
   }, {
       name: '闲置专题',
       apps: [
           {
               category: '已供',
               name: '供而未用查询',
               alias: '供而未用',
               id: 'gewy',
               activate: null,
               deactivate: null,
               iconPath: null,
               bActive: false
           },
           {
               category: '已供',
               name: '用而不足查询',
               alias: '用而不足',
               id: 'yebz',
               activate: null,
               deactivate: null,
               iconPath: null,
               bActive: false
           },
           {
               category: '已供',
               name: '标准厂房',
               alias: '标准厂房',
               id: 'xzcf',
               activate: null,
               deactivate: null,
               iconPath: null,
               bActive: false
           },
           {
               category: '已供',
               name: '科技载体',
               alias: '科技载体',
               id: 'kjzt',
               activate: null,
               deactivate: null,
               iconPath: null,
               bActive: false
           }
       ]
   },
   {
       name: '其他工具',
       apps: [
           //{
           //    category: '工业企业',
           //    name: '工业企业查询',
           //    alias: '工业企业',
           //    id: 'gyqy',
           //    activate: null,
           //    deactivate: null,
           //    iconPath: null,
           //    bActive: false
           //},

           {
               category: '常用',
               name: '面积量算',
               alias: '面积量算',
               id: 'measure-panel',
               activate: null,
               deactivate: null,
               iconPath: null,
               bActive: false
           },
           {
               category: '常用',
               name: '地图输出',
               alias: '地图输出',
               id: 'mapexport',
               activate: null,
               deactivate: null,
               iconPath: null,
               bActive: false,
               type: 'command',
               execute: function () {
                   giscom.exportMap();
               }
           }
       ]
   }
];

appConfig.deactiveActiveApp = function () {
    var activeApp = appConfig.getActiveApp();
    if (activeApp && activeApp.deactivate) {
        activeApp.deactivate();
    }
}

appConfig.getActiveApp = function () {
    for (var i = 0; i < appConfig.length ; i++) {
        var category = appConfig[i];
        for (var j = 0; j < category.apps.length; j++) {
            var app = category.apps[j];
            if (app.bActive) {
                return app;
            }
        }
    }
}

appConfig.getAppById = function (id) {
    for (var i = 0; i < appConfig.length ; i++) {
        var category = appConfig[i];
        for (var j = 0; j < category.apps.length; j++) {
            var app = category.apps[j];
            if (app.id == id) {
                return app;
            }
        }
    }
}