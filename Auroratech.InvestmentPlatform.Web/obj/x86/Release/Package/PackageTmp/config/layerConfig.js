var licon = "css/img/layer.png";
var licon1 = 'css/img/layer1.png';

var mapLayers = [
    {
        name: '基础底图',
        id: 'G_0',
        open: true,
        nocheck: true,
        children: [

            {

                name: '2013年影像图',
                icon: licon,
                id: 'image2013',
                layerUrl: 'http://' + globalIP + ':6080/arcgis/rest/services/XQ_IMAGE2013/MapServer',
                type: 'ArcGISTiledMapServiceLayer',
                checked: false,
                queryable: false,
                index: 1
            },
            {

                name: '2014年影像图',
                icon: licon,
                id: 'image2014',
                layerUrl: 'http://' + globalIP + ':6080/arcgis/rest/services/XQ_IMAGE2014/MapServer',
                type: 'ArcGISTiledMapServiceLayer',
                checked: false,
                queryable: false,
                chkDisabled: true
            },
            {
                name: '基础地形图',
                icon: licon,
                id: 'jcdxt',
                layerUrl: 'http://' + globalIP + ':6080/arcgis/rest/services/XQ_TDTDT/MapServer',
                type: 'ArcGISTiledMapServiceLayer',
                checked: false,
                queryable: false,
                chkDisabled: true
            },
            {
                name: '基础地形图注记',
                icon: licon,
                id: 'jcdxt_zj',
                layerUrl: 'http://' + globalIP + ':6080/arcgis/rest/services/XQ_TDTDTZJ/MapServer',
                type: 'ArcGISTiledMapServiceLayer',
                checked: true,
                index: 3,
                queryable: false
            },
            {
                name: '行政区划',
                icon: licon,
                id: 'xzqh',
                layerUrl: 'http://' + globalIP + ':6080/arcgis/rest/services/XQ_XZQH/MapServer',
                type: 'ArcGISTiledMapServiceLayer',
                checked: true,
                queryable: false,
                index: 2
            },
            {
                name: '工业园区',
                icon: licon,
                id: 'gyyq',
                layerUrl: 'http://' + globalIP + ':6080/arcgis/rest/services/XQ/XQ_YQFW/MapServer',
                type: 'ArcGISDynamicMapServiceLayer',
                queryable: true
            },
            {
                name: '土地利用现状',
                icon: licon,
                id: 'tdlyxz',
                layerUrl: 'http://' + globalIP + ':6080/arcgis/rest/services/XQ_TDLYXZ2013/MapServer',
                type: 'ArcGISTiledMapServiceLayer',
                checked: false
            },
            {
                name: '规划建设用地管制区',
                icon: licon,
                id: 'jsydgzq',
                layerUrl: 'http://' + globalIP + ':6080/arcgis/rest/services/XQ_JSYDGZQ/MapServer',
                type: 'ArcGISTiledMapServiceLayer',
                checked: false
            },
            {
                name: '规划土地用途区',
                icon: licon,
                id: 'tdytq',
                layerUrl: 'http://' + globalIP + ':6080/arcgis/rest/services/XQ_TDYTQ/MapServer',
                type: 'ArcGISTiledMapServiceLayer',
                checked: false
            }
//, {
//    name: '地价',
//    id: 'G_2',
//    nocheck: true,
//    open: true,
//    children: [
//        {
//            name: '工业地价',
//            icon: licon,
//            id: 'gydj',
//            layerUrl: 'http://localhost:6080/arcgis/rest/services/XQ_GYDJ/MapServer',
//            type: 'ArcGISDynamicMapServiceLayer',
//            checked: false
//        },
//        {
//            name: '商业地价',
//            icon: licon,
//            id: 'sydj',
//            layerUrl: 'http://localhost:6080/arcgis/rest/services/XQ_SYDJ/MapServer',
//            type: 'ArcGISDynamicMapServiceLayer',
//            checked: false
//        },
//        {
//            name: '住宅地价',
//            icon: licon,
//            id: 'zzdj',
//            layerUrl: 'http://localhost:6080/arcgis/rest/services/XQ_ZZDJ/MapServer',
//            type: 'ArcGISDynamicMapServiceLayer',
//            checked: false
//        }
//    ]
//}
        ]
    },
    {
        name: '专题图',
        id: 'G_0',
        open: true,
        nocheck: true,
        children: [
            {
                name: '规划红线',
                icon: licon,
                id: 'ghhx',
                layerUrl: 'http://' + globalIP + ':6080/arcgis/rest/services/XQ/XQ_GHHX/MapServer',
                type: 'ArcGISDynamicMapServiceLayer',
                checked: false,
                queryable: false
            },
            {
                name: '规划地块',
                icon: licon,
                id: 'zsdk',
                layerUrl: 'http://' + globalIP + ':6080/arcgis/rest/services/XQ/XQ_ZSDK2/MapServer',
                type: 'ArcGISDynamicMapServiceLayer',
                checked: false,
                queryLayers: [{
                    index: 0,
                    qFields: ['*'],
                    dFields: ['DKBH', 'TDMJ']
                }]
            },
            {
                name: '批而未供',
                icon: licon,
                id: 'pewg',
                layerUrl: 'http://' + globalIP + ':6080/arcgis/rest/services/XQ/XQ_PEWG/MapServer',
                type: 'ArcGISDynamicMapServiceLayer',
                checked: false,
                queryLayers: [{
                    index: 0,
                    qFields: ['*'],
                    dFields: ['YDDW', 'DKMJ', 'TDZL']
                }]
            },
            {
                name: '供而未用',
                icon: licon,
                id: 'gewy',
                layerUrl: 'http://' + globalIP + ':6080/arcgis/rest/services/XQ/XQ_GEWY/MapServer',
                type: 'ArcGISDynamicMapServiceLayer',
                checked: false,
                queryLayers: [{
                    index: 0,
                    qFields: ['*'],
                    dFields: ['YDDW', 'DKMJ', 'TDZL']
                }]
            },
            {
                name: '用而不足',
                icon: licon,
                id: 'yebz',
                layerUrl: 'http://' + globalIP + ':6080/arcgis/rest/services/XQ/XQ_YEBZ/MapServer',
                type: 'ArcGISDynamicMapServiceLayer',
                checked: false,
                queryLayers: [{
                    index: 0,
                    qFields: ['*'],
                    dFields: ['YDDW', 'SHAPE_Area', 'TDZL']
                }]
            },
            {
                name: '工业厂房',
                icon: licon,
                id: 'xzcf',
                layerUrl: 'http://' + globalIP + ':6080/arcgis/rest/services/XQ/XQ_XZCF/MapServer',
                type: 'ArcGISDynamicMapServiceLayer',
                checked: false,
                queryLayers: [{
                    index: 0,
                    qFields: ['*'],
                    dFields: ['YDDW', 'TDMJ', 'TDZL']
                }]
            }/*, {
            name: '空闲地块',
            icon: licon,
            id: 'xztd',
            layerUrl: 'http://' + globalIP + ':6080/arcgis/rest/services/XQ/XQ_XZTD/MapServer',
            type: 'ArcGISDynamicMapServiceLayer',
            checked: false,
            queryLayers: [{
                index: 0,
                qFields: ['*'],
                dFields: ['TDZL', 'TDMJ']
            }]
        }*/,
            {
                name: '工业用地',
                icon: licon,
                id: 'gyyd',
                layerUrl: 'http://' + globalIP + ':6080/arcgis/rest/services/XQ/XQ_GYYD/MapServer',
                type: 'ArcGISDynamicMapServiceLayer',
                checked: false,
                queryLayers: [{
                    index: 0,
                    qFields: ['*'],
                    dFields: ['QLRMC', 'TDMJ', 'TDZL']
                }]
            }
            //,
            //{
            //    name: '建设用地报批成果库',
            //    icon: licon,
            //    id: 'jsyd_bp',
            //    layerUrl: 'http://' + globalIP + ':6080/arcgis/rest/services/XQ_BPCGK/MapServer',
            //    type: 'ArcGISDynamicMapServiceLayer',
            //    checked: false
            //},
            //{
            //    name: '建设用地供地成果库',
            //    icon: licon,
            //    id: 'jsyd_gd',
            //    layerUrl: 'http://' + globalIP + ':6080/arcgis/rest/services/XQ_GDCGK/MapServer',
            //    type: 'ArcGISDynamicMapServiceLayer',
            //    checked: false
            //}
            //,
            //{
            //    name: '城镇地籍登记成果库',
            //    icon: licon,
            //    id: 'czdjdj',
            //    layerUrl: 'http://localhost:6080/arcgis/rest/services/XQ_CZDJZD/MapServer',
            //    type: 'ArcGISDynamicMapServiceLayer',
            //    checked: false
            //}
        ]
    }
//,
//{
//    name: '地价',
//    id: 'G_2',
//    nocheck: true,
//    open: true,
//    children: [
//        {
//            name: '工业地价',
//            icon: licon,
//            id: 'gydj',
//            layerUrl: 'http://localhost:6080/arcgis/rest/services/XQ_GYDJ/MapServer',
//            type: 'ArcGISDynamicMapServiceLayer',
//            checked: false
//        },
//        {
//            name: '商业地价',
//            icon: licon,
//            id: 'sydj',
//            layerUrl: 'http://localhost:6080/arcgis/rest/services/XQ_SYDJ/MapServer',
//            type: 'ArcGISDynamicMapServiceLayer',
//            checked: false
//        },
//        {
//            name: '住宅地价',
//            icon: licon,
//            id: 'zzdj',
//            layerUrl: 'http://localhost:6080/arcgis/rest/services/XQ_ZZDJ/MapServer',
//            type: 'ArcGISDynamicMapServiceLayer',
//            checked: false
//        }
//    ]
//}
];