var fop = "img/folderOpen1.png";
var fcls = "img/folderClose1.png";
var licon = "img/layer.png";
var licon1 = 'img/layer1.png';
var lficon = 'img/feature.png';
var mapLayers = [
    {
        name: '基础地理',

        id: 'G_0',
        iconOpen: fop,
        iconClose: fcls,
        icon: fcls,
        open: true,
        children: [
            {
                name: '行政境界',

                id: 'G_0_0',
                iconOpen: fop,
                iconClose: fcls,
                icon: fcls,
                open: true,
                children: [
                    {
                        name: '行政区划',
                        icon: licon,
                        id: 'XZQHShow',
                        layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/XZQHShow/MapServer',
                        type: "tiled",
                        checked: true,
                        index: 1,
                        queryable: false
                    }
                ]
            },
            {
                name: '基础地形数据',

                id: 'G_0_1',
                iconOpen: fop,
                iconClose: fcls,
                icon: fcls,
                open: true,
                children: [
                    {
                        name: '基础地形',
                        icon: licon,
                        id: 'TDTDT',
                        layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/TDTDT/MapServer',
                        type: "tiled",
                        checked: false,
                        queryable: false
                    },
                    {
                        name: '基础地形注记',
                        icon: licon,
                        id: 'TDTDTZJ',
                        layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/TDTDTZJ/MapServer',
                        type: "tiled",
                        checked: true,
                        index: 0,
                        queryable: false
                    }
                ]
            },
            {
                name: '历年影像数据',

                id: 'G_0_1',
                iconOpen: fop,
                iconClose: fcls,
                icon: fcls,
                children: [
                    {
                        name: '2014年影像',
                        icon: licon,
                        id: '2014image',
                        layerUrl: 'http://192.168.10.34/arcgis/rest/services/2014image/MapServer',
                        type: "tiled",
                        checked: false,
                        queryable: false
                    },
                    {
                        name: '2013年影像',
                        icon: licon,
                        id: 'Image_2013',
                        layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/Image_2013/MapServer',
                        type: "tiled",
                        checked: false,
                        queryable: false
                    },
                    {
                        name: '2012年影像',
                        icon: licon,
                        id: '2012image',
                        layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/2012image/MapServer',
                        type: "tiled",
                        checked: false,
                        queryable: false
                    },
                    {
                        name: '2011年影像',
                        icon: licon,
                        id: '2011yx',
                        layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/2011yx/MapServer',
                        type: "tiled",
                        checked: false,
                        queryable: false
                    },
                    {
                        name: '2010年影像',
                        icon: licon,
                        id: '2010image',
                        layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/2010image/MapServer',
                        type: "tiled",
                        checked: false,
                        queryable: false
                    },
                    {
                        name: '2009年影像',
                        icon: licon,
                        id: '2009yx',
                        layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/2009yx/MapServer',
                        type: "tiled",
                        checked: false,
                        queryable: false
                    }
                ]
            }
        ]
    },
{
    name: '土地利用现状',

    id: 'G_1',
    iconOpen: fop,
    iconClose: fcls,
    icon: fcls,
    children: [

                {
                    name: '2013年现状',
                    icon: licon,
                    id: 'TDLYXZ_2013',
                    layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/TDLYXZ_2013/MapServer',
                    type: "tiled",
                    checked: false
                },
                {
                    name: '2012年现状',
                    icon: licon,
                    id: 'TDLXYZ_2012',
                    layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/TDLXYZ_2012/MapServer',
                    type: "tiled",
                    checked: false
                },
                {
                    name: '2011年现状',
                    icon: licon,
                    id: 'TDLYXZ_2011',
                    layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/TDLYXZ_2011/MapServer',
                    type: "tiled",
                    checked: false
                },
                {
                    name: '2010年现状',
                    icon: licon,
                    id: 'TDLYXZ_2010',
                    layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/TDLYXZ_2010/MapServer',
                    type: "tiled",
                    checked: false
                },
                {
                    name: '2009年现状',
                    icon: licon,
                    id: 'TDLYXZ_2009',
                    layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/TDLYXZ_2009/MapServer',
                    type: "tiled",
                    checked: false
                }


    ]
},
{
    name: '土地利用规划',

    id: 'G_2',
    iconOpen: fop,
    iconClose: fcls,
    icon: fcls,
    children: [
        {
            name: '土地利用总体规划',

            id: 'G_2_0',
            iconOpen: fop,
            iconClose: fcls,
            icon: fcls,
            children: [
                {
                    name: '建设用地管制区',
                    icon: licon,
                    id: 'TDLYZTGH_JSYDGZQ',
                    layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/TDLYZTGH_JSYDGZQ/MapServer',
                    type: "tiled",
                    checked: false
                },
                {
                    name: '土地用途区',
                    icon: licon,
                    id: 'TDLYZTGH_TDYTQ',
                    layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/TDLYZTGH_TDYTQ/MapServer',
                    type: "tiled",
                    checked: false
                }
            ]
        },
        {
            name: '基本农田',
            icon: licon,
            id: 'JBNT_NEW',
            layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/JBNT_NEW/MapServer',
            type: "tiled",
            checked: false
        }
    ]
},
{
    name: '耕地保护',

    id: 'G_3',
    iconOpen: fop,
    iconClose: fcls,
    icon: fcls,
    children: [
        {
            name: '用地预审',
            icon: licon,
            id: 'YDYSGL',
            layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/YSGL/MapServer',
            type: "tiled",
            checked: false
        },
        {
            name: '用地报批',

            id: 'G_3_1',
            iconOpen: fop,
            iconClose: fcls,
            icon: fcls,
            children: [
                {
                    name: '全部',
                    icon: licon,
                    id: 'PDGL',
                    layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/PDGL/MapServer',
                    type: "tiled",
                    checked: false
                },
                 {
                     name: '用地报批2014',
                     icon: licon,
                     id: 'PDGL_2014',
                     layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/PDGL_2014/MapServer',
                     type: "dynamic",
                     checked: false
                 },
                 {
                     name: '用地报批2013',
                     icon: licon,
                     id: 'PDGL_2013',
                     layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/PDGL_2013/MapServer',
                     type: "dynamic",
                     checked: false
                 },
                 {
                     name: '用地报批2012',
                     icon: licon,
                     id: 'PDGL_2012',
                     layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/PDGL_2012/MapServer',
                     type: "dynamic",
                     checked: false
                 },
                 {
                     name: '用地报批2011',
                     icon: licon,
                     id: 'PDGL_2011',
                     layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/PDGL_2011/MapServer',
                     type: "dynamic",
                     checked: false
                 },
                 {
                     name: '用地报批2010',
                     icon: licon,
                     id: 'PDGL_2010',
                     layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/PDGL_2010/MapServer',
                     type: "dynamic",
                     checked: false
                 },
                 {
                     name: '用地报批2009',
                     icon: licon,
                     id: 'PDGL_2009',
                     layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/PDGL_2009/MapServer',
                     type: "dynamic",
                     checked: false
                 },
                 {
                     name: '用地报批2008',
                     icon: licon,
                     id: 'PDGL_2008',
                     layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/PDGL_2008/MapServer',
                     type: "dynamic",
                     checked: false
                 },
                 {
                     name: '用地报批2007',
                     icon: licon,
                     id: 'PDGL_2007',
                     layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/PDGL_2007/MapServer',
                     type: "dynamic",
                     checked: false
                 },
                 {
                     name: '用地报批2006',
                     icon: licon,
                     id: 'PDGL_2006',
                     layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/PDGL_2006/MapServer',
                     type: "dynamic",
                     checked: false
                 },
                 {
                     name: '用地报批2005',
                     icon: licon,
                     id: 'PDGL_2005',
                     layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/PDGL_2005/MapServer',
                     type: "dynamic",
                     checked: false
                 },
                 {
                     name: '用地报批2004',
                     icon: licon,
                     id: 'PDGL_2004',
                     layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/PDGL_2004/MapServer',
                     type: "dynamic",
                     checked: false
                 },
                 {
                     name: '用地报批2003',
                     icon: licon,
                     id: 'PDGL_2003',
                     layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/PDGL_2003/MapServer',
                     type: "dynamic",
                     checked: false
                 },
                 {
                     name: '用地报批2002',
                     icon: licon,
                     id: 'PDGL_2002',
                     layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/PDGL_2002/MapServer',
                     type: "dynamic",
                     checked: false
                 },
                 {
                     name: '用地报批2001',
                     icon: licon,
                     id: 'PDGL_2001',
                     layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/PDGL_2001/MapServer',
                     type: "dynamic",
                     checked: false
                 },
                 {
                     name: '用地报批2000',
                     icon: licon,
                     id: 'PDGL_2000',
                     layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/PDGL_2000/MapServer',
                     type: "dynamic",
                     checked: false
                 },
                 {
                     name: '用地报批1999',
                     icon: licon,
                     id: 'PDGL_1999',
                     layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/PDGL_1999/MapServer',
                     type: "dynamic",
                     checked: false
                 }
            ]
        },
        {
            name: '土地整治',

            id: 'G_3_2',
            iconOpen: fop,
            iconClose: fcls,
            icon: fcls,
            children: [
				 {
				     name: '挂钩核查结果',
				     icon: licon,
				     id: 'TDZZ_GGHCJG',
				     layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/TDZZ_GGHCJG/MapServer',
				     type: "dynamic",
				     checked: false
				 },
                 {
                     name: '土地置换拆迁复垦',
                     icon: licon,
                     id: 'TDZZ_TDZHCJFK',
                     layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/TDZZ_TDZHCJFK/MapServer',
                     type: "dynamic",
                     checked: false
                 },
                 {
                     name: '土地置换建新',
                     icon: licon,
                     id: 'TDZZ_TDZHJX',
                     layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/TDZZ_TDZHJX/MapServer',
                     type: "dynamic",
                     checked: false
                 },
                 {
                     name: '占补核查结果',
                     icon: licon,
                     id: 'TDZZ_ZBHCJG',
                     layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/TDZZ_ZBHCJG/MapServer',
                     type: "dynamic",
                     checked: false
                 }
            ]
        }
    ]
},
{
    name: '土地利用',

    id: 'G_4',
    iconOpen: fop,
    iconClose: fcls,
    icon: fcls,
    children: [
        {
            name: '土地储备',
            icon: licon,
            id: 'TDCB',
            layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/TDCB/MapServer',
            type: "dynamic",
            checked: false
        },
        {
            name: '土地供应',

            id: 'G_4_1',
            iconOpen: fop,
            iconClose: fcls,
            icon: fcls,
            children: [
                 {
                     name: '全部',
                     icon: licon,
                     id: 'GDGL',
                     layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/GDGL_DT/MapServer',
                     type: "dynamic",
                     checked: false
                 },
                 {
                     name: '土地供应2015',
                     icon: licon,
                     id: 'GDGL_2015',
                     layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/GDGL_2015/MapServer',
                     type: "dynamic",
                     checked: false
                 },
                 {
                     name: '土地供应2014',
                     icon: licon,
                     id: 'GDGL_2014',
                     layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/GDGL_2014/MapServer',
                     type: "dynamic",
                     checked: false
                 },
                 {
                     name: '土地供应2013',
                     icon: licon,
                     id: 'GDGL_2013',
                     layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/GDGL_2013/MapServer',
                     type: "dynamic",
                     checked: false
                 },
                 {
                     name: '土地供应2012',
                     icon: licon,
                     id: 'GDGL_2012',
                     layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/GDGL_2012/MapServer',
                     type: "dynamic",
                     checked: false
                 },
                 {
                     name: '土地供应2011',
                     icon: licon,
                     id: 'GDGL_2011',
                     layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/GDGL_2011/MapServer',
                     type: "dynamic",
                     checked: false
                 },
                 {
                     name: '土地供应2010',
                     icon: licon,
                     id: 'GDGL_2010',
                     layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/GDGL_2010/MapServer',
                     type: "dynamic",
                     checked: false
                 },
                 {
                     name: '土地供应2009',
                     icon: licon,
                     id: 'GDGL_2009',
                     layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/GDGL_2009/MapServer',
                     type: "dynamic",
                     checked: false
                 },
                 {
                     name: '土地供应2008',
                     icon: licon,
                     id: 'GDGL_2008',
                     layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/GDGL_2008/MapServer',
                     type: "dynamic",
                     checked: false
                 },
                 {
                     name: '土地供应2007',
                     icon: licon,
                     id: 'GDGL_2007',
                     layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/GDGL_2007/MapServer',
                     type: "dynamic",
                     checked: false
                 },
                 {
                     name: '土地供应2006',
                     icon: licon,
                     id: 'GDGL_2006',
                     layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/GDGL_2006/MapServer',
                     type: "dynamic",
                     checked: false
                 },
                 {
                     name: '土地供应2005',
                     icon: licon,
                     id: 'GDGL_2005',
                     layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/GDGL_2006/MapServer',
                     type: "dynamic",
                     checked: false
                 },
                 {
                     name: '土地供应2004',
                     icon: licon,
                     id: 'GDGL_2004',
                     layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/GDGL_2004/MapServer',
                     type: "dynamic",
                     checked: false
                 },
                 {
                     name: '土地供应2003',
                     icon: licon,
                     id: 'GDGL_2003',
                     layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/GDGL_2003/MapServer',
                     type: "dynamic",
                     checked: false
                 },
                 {
                     name: '土地供应2002',
                     icon: licon,
                     id: 'GDGL_2002',
                     layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/GDGL_2002/MapServer',
                     type: "dynamic",
                     checked: false
                 },
                 {
                     name: '土地供应2001',
                     icon: licon,
                     id: 'GDGL_2001',
                     layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/GDGL_2002/MapServer',
                     type: "dynamic",
                     checked: false
                 },
                 {
                     name: '土地供应2000及以前',
                     icon: licon,
                     id: 'GDGL_2000',
                     layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/GDGL_2000及之前/MapServer',
                     type: "dynamic",
                     checked: false
                 }
            ]
        },
        {
            name: '可利用资源',

            id: 'G_4_2',
            iconOpen: fop,
            iconClose: fcls,
            icon: fcls,
            children: [
                {
                    name: '批而未供',
                    icon: licon,
                    id: 'KLYZY_PEWG',
                    layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/KLYZY_PEWG/MapServer',
                    type: "dynamic",
                    checked: false
                },
                {
                    name: '供而未用',
                    icon: licon,
                    id: 'KLYZY_GEWY',
                    layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/KLYZY_GEWY/MapServer',
                    type: "dynamic",
                    checked: false
                },
                 {
                     name: '前期开发',
                     icon: licon,
                     id: 'KLYZY_QQKF',
                     layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/KLYZY_QQKF/MapServer',
                     type: "dynamic",
                     checked: false
                 }
            ]
        },
        {
            name: '土地地价',

            id: 'G_4_3',
            iconOpen: fop,
            iconClose: fcls,
            icon: fcls,
            children: [
                {
                    name: '工业地价',
                    icon: licon,
                    id: 'JZDJ_GYDJ',
                    layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/JZDJ_GYDJ/MapServer',
                    type: "dynamic",
                    checked: false
                }, {
                    name: '商业地价',
                    icon: licon,
                    id: 'JZDJ_SYDJ',
                    layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/JZDJ_SYDJ/MapServer',
                    type: "dynamic",
                    checked: false
                }, {
                    name: '住宅地价',
                    icon: licon,
                    id: 'JZDJ_ZZDJ',
                    layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/JZDJ_ZZDJ/MapServer',
                    type: "dynamic",
                    checked: false
                }
            ]
        },
        {
            name: '土地集约',

            id: 'G_4_4',
            iconOpen: fop,
            iconClose: fcls,
            icon: fcls,
            children: [
		       {
		           name: '江苏江阴临港经济开发区',
		           icon: licon,
		           id: 'TDJY_JSJYLGJJKFQ',
		           layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/TDJY_JSJYLGJJKFQ/MapServer',
		           type: "dynamic",
		           checked: false
		       }, {
		           name: '江苏无锡惠山经济开发区',
		           icon: licon,
		           id: 'TDJY_JSWXHSJJKFQ',
		           layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/TDJY_JSWXHSJJKFQ/MapServer',
		           type: "dynamic",
		           checked: false
		       }, {
		           name: '江苏无锡经济开发区',
		           icon: licon,
		           id: 'JYTD_JSWXJJKFQ',
		           layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/JYTD_JSWXJJKFQ/MapServer',
		           type: "dynamic",
		           checked: false
		       }, {
		           name: '江苏无锡蠡园高新技术产业园区',
		           icon: licon,
		           id: 'JYTD_JSWXLYGXJSCYYQ',
		           layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/JYTD_JSWXLYGXJSCYYQ/MapServer',
		           type: "dynamic",
		           checked: false
		       }, {
		           name: '江苏无锡山水城',
		           icon: licon,
		           id: 'TDJY_JSWXSSC',
		           layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/TDJY_JSWXSSC/MapServer',
		           type: "dynamic",
		           checked: false
		       }, {
		           name: '江苏宜兴经济开发区',
		           icon: licon,
		           id: 'TDJY_JSYXJJKFQ',
		           layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/TDJY_JSYXJJKFQ/MapServer',
		           type: "dynamic",
		           checked: false
		       }, {
		           name: '江苏宜兴陶瓷产业园区',
		           icon: licon,
		           id: 'TDJY_JSYXTCCYYQ',
		           layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/TDJY_JSYXTCCYYQ/MapServer',
		           type: "dynamic",
		           checked: false
		       }, {
		           name: '江阴高新技术产业开发区',
		           icon: licon,
		           id: 'TDJY_JYGXJSCYKFQ',
		           layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/TDJY_JYGXJSCYKFQ/MapServer',
		           type: "dynamic",
		           checked: false
		       }, {
		           name: '无锡出口加工区',
		           icon: licon,
		           id: 'TDJY_WXCKJGQ',
		           layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/TDJY_WXCKJGQ/MapServer',
		           type: "dynamic",
		           checked: false
		       }, {
		           name: '无锡高新技术产业开发区',
		           icon: licon,
		           id: 'TDJY_WXGXJSCYKFQ',
		           layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/TDJY_WXGXJSCYKFQ/MapServer',
		           type: "dynamic",
		           checked: false
		       }, {
		           name: '无锡硕放工业园区',
		           icon: licon,
		           id: 'TDJY_WXSFGYYQ',
		           layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/TDJY_WXSFGYYQ/MapServer',
		           type: "dynamic",
		           checked: false
		       }, {
		           name: '锡山经济技术开发区',
		           icon: licon,
		           id: 'TDJY_XSJJJSKFQ',
		           layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/TDJY_XSJJJSKFQ/MapServer',
		           type: "dynamic",
		           checked: false
		       }, {
		           name: '宜兴环保科技工业园',
		           icon: licon,
		           id: 'TDJY_YXHBKJGYY',
		           layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/TDJY_YXHBKJGYY/MapServer',
		           type: "dynamic",
		           checked: false
		       }
            ]
        },
        {
            name: '工业用地调查',

            id: 'G_4_5',
            iconOpen: fop,
            iconClose: fcls,
            icon: fcls,
            children: [
		{
		    name: '工业用地',
		    icon: licon,
		    id: 'JZDJ_ZZDJ',
		    layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/GYYD_JSYD/MapServer',
		    type: "dynamic",
		    checked: false
		}, {
		    name: '规划范围',
		    icon: licon,
		    id: 'JZDJ_ZZDJ',
		    layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/GYYD_GHFW/MapServer',
		    type: "dynamic",
		    checked: false
		}, {
		    name: '开发范围',
		    icon: licon,
		    id: 'JZDJ_ZZDJ',
		    layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/GYYD_KFFW/MapServer',
		    type: "dynamic",
		    checked: false
		}, {
		    name: '建成范围',
		    icon: licon,
		    id: 'JZDJ_ZZDJ',
		    layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/GYYD_JCFW/MapServer',
		    type: "dynamic",
		    checked: false
		}, {
		    name: '其他土地',
		    icon: licon,
		    id: 'JZDJ_ZZDJ',
		    layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/GYYD_QTYD/MapServer',
		    type: "dynamic",
		    checked: false
		}
            ]
        }
    ]
},
{
    name: '地籍管理',

    id: 'G_5',
    iconOpen: fop,
    iconClose: fcls,
    icon: fcls,
    children: [
        {
            name: '城镇地籍',

            id: 'G_5_0',
            iconOpen: fop,
            iconClose: fcls,
            icon: fcls,
            children: [
                 {
                     name: '城镇地籍宗地',
                     icon: licon,
                     id: 'CZDJ',
                     layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/CZDJ/MapServer',
                     type: "tiled",
                     checked: false
                 }
            ]
        },
        {
            name: '农村集体土地',

            id: 'G_5_1',
            iconOpen: fop,
            iconClose: fcls,
            icon: fcls,
            children: [
                 {
                     name: '集体所有权宗地',
                     icon: licon,
                     id: 'DJGL_JTSYQZD',
                     layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/DJGL_JTSYQZD/MapServer',
                     type: "tiled",
                     checked: false
                 }
            ]
        }
    ]
},
{
    name: '执法监察',

    id: 'G_6',
    iconOpen: fop,
    iconClose: fcls,
    icon: fcls,
    children: [
        {
            name: '遥感监测图斑',

            id: 'G_6_0',
            iconOpen: fop,
            iconClose: fcls,
            icon: fcls,
            children: [
                {
                    name: '遥感监测图斑2014',
                    icon: licon,
                    id: 'JCTB_2014',
                    layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/JCTB_2014/MapServer',
                    type: "dynamic",
                    checked: false
                },
                {
                    name: '遥感监测图斑2013',
                    icon: licon,
                    id: 'JCTB_2013',
                    layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/JCTB_2013/MapServer',
                    type: "dynamic",
                    checked: false
                },
                {
                    name: '遥感监测图斑2012',
                    icon: licon,
                    id: 'JCTB_2012',
                    layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/JCTB_2012/MapServer',
                    type: "dynamic",
                    checked: false
                },
                {
                    name: '遥感监测图斑2011',
                    icon: licon,
                    id: 'JCTB_2011',
                    layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/JCTB_2011/MapServer',
                    type: "dynamic",
                    checked: false
                },
                {
                    name: '遥感监测图斑2010',
                    icon: licon,
                    id: 'JCTB_2010',
                    layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/JCTB_2010/MapServer',
                    type: "dynamic",
                    checked: false
                },
                {
                    name: '遥感监测图斑2009',
                    icon: licon,
                    id: 'JCTB_2009',
                    layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/JCTB_2009/MapServer',
                    type: "dynamic",
                    checked: false
                }
            ]
        },
        {
            name: '违法用地',

            id: 'G_6_1',
            iconOpen: fop,
            iconClose: fcls,
            icon: fcls,
            children: []
        }
    ]
},
{
    name: '地质矿产',

    id: 'G_7',
    iconOpen: fop,
    iconClose: fcls,
    icon: fcls,
    children: [
        {
            name: '矿产资源规划',

            id: 'G_7_0',
            iconOpen: fop,
            iconClose: fcls,
            icon: fcls,
            children: [
                 {
                     name: '矿产资源分布图',
                     icon: licon,
                     id: 'KCZYGH_KCZYFB',
                     layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/KCZYGH_KCZYFB/MapServer',
                     type: "tiled",
                     checked: false
                 },
                 {
                     name: '矿产资源开发利用与保护规划图',
                     icon: licon,
                     id: 'KCZYGH_KFLY_BHGH',
                     layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/KCZYGH_KFLY_BHGH/MapServer',
                     type: "tiled",
                     checked: false
                 },
                 {
                     name: '矿产资源开发利用现状图',
                     icon: licon,
                     id: 'KCZYGH_KFLYXZT',
                     layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/KCZYGH_KFLYXZT/MapServer',
                     type: "tiled",
                     checked: false
                 }
            ]
        },
        {
            name: '地质灾害防治规划',

            id: 'G_7_1',
            iconOpen: fop,
            iconClose: fcls,
            icon: fcls,
            children: [
                 {
                     name: '地面沉降地裂缝监测网图',
                     icon: licon,
                     id: 'DZZH_DMCJDLFXJCW',
                     layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/DZZH_DMCJDLFXJCW/MapServer',
                     type: "tiled",
                     checked: false
                 },
                 {
                     name: '地面沉降地裂缝易发区分布图',
                     icon: licon,
                     id: 'DZZH_DMCJDLFYFFBT',
                     layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/DZZH_DMCJDLFYFFBT/MapServer',
                     type: "tiled",
                     checked: false
                 },
                 {
                     name: '地面沉降地裂缝灾害分布图',
                     icon: licon,
                     id: 'DZZH_DMCJDLFZHFBT',
                     layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/DZZH_DMCJDLFZHFBT/MapServer',
                     type: "tiled",
                     checked: false
                 },
                  {
                      name: '地面塌陷易发区分布图',
                      icon: licon,
                      id: 'DZZH_DMTXYFQFBT',
                      layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/DZZH_DMTXYFQFBT/MapServer',
                      type: "tiled",
                      checked: false
                  },
                 {
                     name: '地下水动态监测网分布图',
                     icon: licon,
                     id: 'DZZH_DXSDTJCWFBT',
                     layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/DZZH_DXSDTJCWFBT/MapServer',
                     type: "tiled",
                     checked: false
                 },
                 {
                     name: '地质灾害防治区划近远期治理图',
                     icon: licon,
                     id: 'DZZH_DZZHFZQHJYQZZLT',
                     layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/DZZH_DZZHFZQHJYQZZLT/MapServer',
                     type: "tiled",
                     checked: false
                 },
                  {
                      name: '地质灾害群测群防点',
                      icon: licon,
                      id: 'DZZH_DZZHQCQFD',
                      layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/DZZH_DZZHQCQFD/MapServer',
                      type: "tiled",
                      checked: false
                  },
                 {
                     name: '滑坡崩塌地面塌陷灾害分布图',
                     icon: licon,
                     id: 'DZZH_HPBTDMTXZHFBT',
                     layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/DZZH_HPBTDMTXZHFBT/MapServer',
                     type: "tiled",
                     checked: false
                 },
                 {
                     name: '滑坡崩塌易发区分布图',
                     icon: licon,
                     id: 'DZZH_HPBTYFQFBT',
                     layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/DZZH_HPBTYFQFBT/MapServer',
                     type: "tiled",
                     checked: false
                 }
            ]
        },
        {
            name: '重要地质灾害隐患点',
            icon: licon,
            id: 'DZKC_ZYDZZHYHD',
            layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/DZKC_ZYDZZHYHD/MapServer',
            type: "dynamic",
            checked: false
        }
    ]
},
{
    name: '测绘管理',

    id: 'G_8',
    iconOpen: fop,
    iconClose: fcls,
    icon: fcls,
    children: [
        {
            name: '测量控制点',
            icon: licon,
            id: 'CLKZD',
            layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/CLKZD/MapServer',
            type: "tiled",
            checked: false
        },
        {
            name: '国情普查',
            icon: licon,
            id: 'CHGL_GQPC',
            layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/CHGL_GQPC1/MapServer',
            type: "dynamic",
            checked: false
        }
    ]
}
];