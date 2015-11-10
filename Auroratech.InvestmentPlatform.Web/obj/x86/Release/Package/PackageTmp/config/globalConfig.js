globalIP = '127.0.0.1';
djConfig = {
    parseOnLoad: true,
    isDebug: false,
    locale: 'zh-cn',
    serverIP: globalIP + '/3.13compact'
};
document.write('<link href="http://' + djConfig.serverIP + '/esri/css/esri.css" rel="stylesheet" />');
document.write('<script type="text/javascript" src="http://' + djConfig.serverIP + '/init.js"></sc' + 'ript>');
document.close();

var qyConfig =
    {
        xzq: [{
            type: 'XZQ',
            dm: '320292001',
            mc: '旺庄街道'
        }, {
            type: 'XZQ',
            dm: '320292002',
            mc: '硕放街道'
        }, {
            type: 'XZQ',
            dm: '320292003',
            mc: '江溪街道'
        }, {
            type: 'XZQ',
            dm: '320292004',
            mc: '新安街道'
        }, {
            type: 'XZQ',
            dm: '320292005',
            mc: '梅村街道'
        }, {
            type: 'XZQ',
            dm: '320292006',
            mc: '鸿山街道'
        }
        ],
        pq: [{
            type: 'PQ',
            dm: 'PQ01',
            mc: '板块1'
        }, {
            type: 'PQ',
            dm: 'PQ02',
            mc: '板块2'
        }, {
            type: 'PQ',
            dm: 'PQ03',
            mc: '板块3'
        }, {
            type: 'PQ',
            dm: 'PQ04',
            mc: '板块4'
        }, {
            type: 'PQ',
            dm: 'PQ05',
            mc: '板块5'
        }, {
            type: 'PQ',
            dm: 'PQ06',
            mc: '板块6'
        }]
    };

var lengthUnits = [
       {
           id: 'esriMeters',
           name: '米',
           multiply: 1
       },
       {
           id: 'esriKilometers',
           name: '千米',
           multiply: 0.001
       }
];
var areaUnits = [
    {
        id: 'esriSquareMeters',
        name: '平方米',
        multiply: 1
    }, {
        id: 'esriSquareKilometers',
        name: '平方千米',
        multiply: 0.000001
    }, {
        id: 'esriSquareKilometers',
        multiply: 0.0015,
        name: '亩'
    }, {
        id: 'esriSquareKilometers',
        name: '公顷',
        multiply: 0.0001
    }];

var allServices = {
    xzq: {
        url: 'http://' + globalIP + ':6080/arcgis/rest/services/XQ_XZQH/MapServer/0'
    },
    xzjd: {
        url: 'http://' + globalIP + ':6080/arcgis/rest/services/XQ_XZQH/MapServer/1'
    },
    gyyq: {
        url: 'http://' + globalIP + ':6080/arcgis/rest/services/XQ/XQ_YQFW/MapServer/0'
    }
};


var landQueryConfigs =
    {
        xztd: {
            queryFields: { "OBJECTID": "ID", "TDZL": "土地坐落", "SFGH": "是否已规划", "JDMC": "街道名称", "TDZH": "土地证号", "TBMJ": "图斑面积", "TDMJ": "土地面积_平方米", "TDMJ_M": "土地面积_亩", "NF": "年份", "BZ": "备注" },
            displayFields: { "TDZL": "土地坐落", "SFGH": "是否已规划", "JDMC": "街道名称", "TDZH": "土地证号", "TBMJ": "图斑面积", "TDMJ": "土地面积_平方米", "TDMJ_M": "土地面积_亩", "NF": "年份", "BZ": "备注" },
            displayField: '土地坐落',
            tableName: 'xztd',
            sheetName: '闲置土地'
        },
        xzcf: {
            queryFields: { "OBJECTID": "ID", "SSYQMC": "所属园区名称", "SSYQDM": "所属园区代码", "YDDW": "用地单位", "TDZL": "土地坐落", "TDMJ": "土地面积_平方米", "TDMJ_M": "土地面积_亩", "JZMJ": "建筑面积", "JZJDMJ": "建筑基底面积", "SFBZCF": "是否标准厂房", "CFCS": "厂房平均层数", "HTBH": "合同编号", "TDZH": "土地证号", "BFLX": "标房类型", "BFZT": "标房状态", "SSJD": "所属街道", "FCZH": "房产证号" },
            displayFields: { "YDDW": "用地单位", "BFLX": "标房类型", "BFZT": "标房状态", "SSJD": "所属街道", "FCZH": "房产证号", "SSYQMC": "所属园区名称", "SSYQDM": "所属园区代码", "TDZL": "土地坐落", "TDMJ": "土地面积_平方米", "TDMJ_M": "土地面积_亩", "JZMJ": "建筑面积", "JZJDMJ": "建筑基底面积", "SFBZCF": "是否标准厂房", "CFCS": "厂房平均层数", "HTBH": "合同编号", "TDZH": "土地证号" },
            displayField: '用地单位',
            tableName: 'xzcf',
            sheetName: '闲置厂房'
        },
        zsdk: {
            queryFields: { "OBJECTID": "ID", "DKBH": "地块编号", "TDYT": "土地用途", "TDMJ": "土地面积_平方米", "TDMJ_M": "土地面积_亩" },
            displayFields: { "DKBH": "地块编号", "TDYT": "土地用途", "TDMJ": "土地面积_平方米", "TDMJ_M": "土地面积_亩" },
            displayField: '地块编号',
            tableName: 'ghdk',
            sheetName: '规划地块'
        },
        pewg: {
            queryFields: { "OBJECTID": "ID", "DKH": "地块号", "XMMC": "项目名称", "YDDW": "用地单位", "TDZL": "土地坐落", "TDYT": "土地用途", "PZWH": "批准文号", "SSXZQMC": "行政区划", "PZSJ": "批准时间", "TDMJ": "土地面积_平方米", "TDMJ_M": "土地面积_亩", "BZ": "备注" },
            displayFields: { "DKH": "地块号", "XMMC": "项目名称", "YDDW": "用地单位", "TDZL": "土地坐落", "TDYT": "土地用途", "PZWH": "批准文号", "SSXZQMC": "行政区划", "PZSJ": "批准时间", "TDMJ": "土地面积_平方米", "TDMJ_M": "土地面积_亩", "BZ": "备注" },
            displayField: '用地单位',
            tableName: 'pewg',
            sheetName: '批而未供'
        },
        gewy: {
            queryFields: { "OBJECTID": "ID", "DKH": "地块号", "XMMC": "项目名称", "YDDW": "用地单位", "YDKGSJ": "约定开工时间", "TDMJ": "土地面积_平方米", "TDMJ_M": "土地面积_亩", "TDZL": "土地坐落", "SSXZ": "所属乡镇", "YDPZSJ": "用地批准时间", "GDSJ": "供地时间", "GDFS": "供地方式", "TDYT": "土地用途", "GHRJL": "规划容积率", "SDRJL": "设定容积率", "JSYDPZSBH": "建设用地批准书编号", "TDSYNX": "土地使用年限", "HTBH": "合同编号", "HTZJE": "合同总金额", "HBYDPWH": "划拨用地批文号", "LSYDPWH": "临时用地批文号", "SFZDXM": "是否重点项目", "CQQK": "拆迁情况", "KLYZC": "可利用资产", "GHYT": "规划用途", "GHTJ": "规划统计用途", "BZ": "备注" },
            displayFields: { "DKH": "地块号", "XMMC": "项目名称", "YDDW": "用地单位", "YDKGSJ": "约定开工时间", "TDMJ": "土地面积_平方米", "TDMJ_M": "土地面积_亩", "TDZL": "土地坐落", "SSXZ": "所属乡镇", "YDPZSJ": "用地批准时间", "GDSJ": "供地时间", "GDFS": "供地方式", "TDYT": "土地用途", "GHRJL": "规划容积率", "SDRJL": "设定容积率", "JSYDPZSBH": "建设用地批准书编号", "TDSYNX": "土地使用年限", "HTBH": "合同编号", "HTZJE": "合同总金额", "HBYDPWH": "划拨用地批文号", "LSYDPWH": "临时用地批文号", "SFZDXM": "是否重点项目", "CQQK": "拆迁情况", "KLYZC": "可利用资产", "GHYT": "规划用途", "GHTJ": "规划统计用途", "BZ": "备注" },
            displayField: '用地单位',
            tableName: 'gewy',
            sheetName: '供而未用'
        },
        yebz: {
            queryFields: { "OBJECTID": "ID", "QLRMC": "权利人名称", "YDDW": "用地单位", "XZMJ": "空置面积", "TDMJ": "土地面积_平方米", "TDMJ_M": "土地面积_亩", "TDYT": "土地用途", "TDZL": "土地坐落", "SSYQ": "所属园区", "SSXZ": "所属乡镇" },
            displayFields: { "QLRMC": "权利人名称", "YDDW": "用地单位", "XZMJ": "空置面积", "TDMJ": "土地面积_平方米", "TDMJ_M": "土地面积_亩", "TDYT": "土地用途", "TDZL": "土地坐落", "SSYQ": "所属园区", "SSXZ": "所属乡镇" },
            displayField: '用地单位',
            tableName: 'yebz',
            sheetName: '用而不足'
        }, gyqy: {
            queryFields: { 'OBJECTID': 'ID', 'DKSYH': '地块索引号', 'DWMC': '单位名称', 'TDZH': '土地证号', 'ZZJGDM': '组织结构代码', 'GSDJZH': '工商登记证号', 'SWDJZH': '税务登记证号', 'CYLB': '产业类别', 'HYLB': '行业类别', 'SFGSQY': '是否规上企业', 'JZMJ': '建筑面积', 'TDMJ': '土地面积_平方米', "TDMJ_M": "土地面积_亩", 'WCTZ': '完成投资', 'YYSR': '营业收入', 'ZCZ': '总产值', 'ZJZ': '增加值', 'LYZE': '利润总额', 'SJSJ': '上缴税金', 'SJGS': '上缴国税', 'SJDS': '上缴地税', 'CYRY': '从业人员', 'BZ': '备注' },
            displayFields: { 'DWMC': '单位名称', 'TDZH': '土地证号', 'ZZJGDM': '组织结构代码', 'GSDJZH': '工商登记证号', 'SWDJZH': '税务登记证号', 'CYLB': '产业类别', 'HYLB': '行业类别', 'SFGSQY': '是否规上企业', 'JZMJ': '建筑面积', 'TDMJ': '土地面积_平方米', "TDMJ_M": "土地面积_亩", 'WCTZ': '完成投资', 'YYSR': '营业收入', 'ZCZ': '总产值', 'ZJZ': '增加值', 'LYZE': '利润总额', 'SJSJ': '上缴税金', 'SJGS': '上缴国税', 'SJDS': '上缴地税', 'CYRY': '从业人员', 'BZ': '备注' },
            displayField: '单位名称',
            tableName: 'yddw',
            sheetName: '工业企业'
        }
    }