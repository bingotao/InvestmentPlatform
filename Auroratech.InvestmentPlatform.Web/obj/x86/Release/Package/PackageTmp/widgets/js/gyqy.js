(function () {
    var postUrl = 'handle/CommonHandle.ashx';
    var $app = $('.gyqy');
    var config = $app.data('config');
    //$app.find('.query-results-btn').click(function () {
    //    $app.find('>div').toggleClass('z1');
    //});

    //var h = $app.find('.query-result').height();
    //$app.find('.query-results').height(h - 100);
    //$app.find('.query-results').slimScroll({
    //    height: h - 130,
    //    alwaysVisible: true
    //});
    com.toolTip.init($app);

    var cfg = landQueryConfigs.gyqy;
    var queryFields = cfg.queryFields;
    var displayFields = cfg.displayFields;
    var displayField = cfg.displayField;
    var tableName = cfg.tableName;
    var sheetName = cfg.sheetName;

    var layerInfo = getTreeNodeData($.fn.zTree.getZTreeObj('layerTree').getNodeByParam('id', 'gyyd')).data;
    var url = layerInfo.layerUrl + '/0';


    var sCondition = null;
    var data = null;

    var columns = (function () {
        var columns = [{
            field: 'btndetail', title: '操作', halign: 'center', formatter: function () {
                return '<span style="color:blue;cursor:pointer;">详情</span>';
            }
        }];
        columns.push();
        for (var name in displayFields) {
            var n = displayFields[name];
            columns.push({ field: n, title: n, halign: 'center', width: 200 });
        }
        return columns;
    })();

    var module = {
        view: scrollview,
        pageSize: 10,
        rownumbers: true,
        remoteSort: false,
        singleSelect: true,
        toolbar: [
        {
            text: '导出Excel',
            iconCls: 'icon-excel-export',
            handler: function () {
                excelExport();
            }
        }],
        columns: [
            columns
        ],
        onDblClickRow: function (index, row) {
            var dksyh = row['地块索引号'];
            var syh = dksyh.split('、');
            var inCondtion = '';
            for (var i = 0; i < syh.length; i++) {
                inCondtion += "'" + syh[i] + "',";
            }
            inCondtion = inCondtion.substr(0, inCondtion.length - 1);
            var sWhere = "DKSYH in (" + inCondtion + ")";

            giscom.clearGraphicsLayer();
            giscom.queryLayerByWhere(url, sWhere, function (r) {
                var fts = r.features;
                if (fts.length) {
                    for (var i = 0; i < fts.length; i++) {
                        var g = fts[i];
                        g.setSymbol(giscom.symbols.selectedSymbol2);
                        giscom.graphics.add(g);
                    }
                    var extent = esri.graphicsExtent(fts).expand(2);
                    giscom.mapObj.map.setExtent(extent);
                }
            }, true);
        },
        onClickCell: function (index, field, value) {
            if (field == 'btndetail') {
                var row = data[index];
                com.detailPanel.setValue(row);
                var title = row[displayField];
                com.detailPanel.setTitle(title);
                com.detailPanel.show();
            }
        }
    };

    function excelExport() {
        $.post(postUrl + '?action=ExportExcel',
        {
            where: sCondition,
            fields: sFields,
            tableName: tableName,
            sheetName: sheetName
        },
        function (r) {
            window.open(r);
        }, 'text');
    }


    var sFields = (function () {
        var s = '';
        for (var name in queryFields) {
            s += name + ' ' + queryFields[name] + ',';
        }
        return s.substr(0, s.length - 1);
    })();



    function getCurrentCondtion() {
        var $Fields = $app.find('.field');
        var condition = '';
        for (var i = 0; i < $Fields.length; i++) {
            var $field = $($Fields[i]);
            var val = $.trim($field.val());
            if (val != '') {
                var field = $field.data('field');
                var split = field.split('-');
                if (split.length != 1) {
                    if (split[2] == 'mj') {
                        val = parseFloat(val) * 666.6667;
                        if (isNaN(val)) {
                            return false;
                        }
                    }
                    condition += (split[0] == 'max' ? (split[1] + '<' + val) : (split[1] + '>' + val)) + ' and ';
                }
                else {
                    condition += field + " like '%" + val + "%' and ";
                }
            }
        }
        if (condition)
            condition = condition.substr(0, condition.length - 4);
        return condition;
    }

    function getResults() {
        sCondition = getCurrentCondtion();
        if (!sCondition) {
            com.bottomTip.showWarn('请检查查询条件是否设置或设置是否正确！');
            return;
        }
        $.post(postUrl + '?action=GetDK',
        {
            where: sCondition,
            fields: sFields,
            tableName: tableName
        },
        function (r) {
            setResults(r);
        }, 'json');
    }
    var $bottomResults = $('.bottom-results');
    var $resultsContainer = $bottomResults.find('.results-container');

    function setResults(r) {
        data = r.rows;
        $resultsContainer.html('<table style="height:100%;width:100%;"></table>');
        module.data = r.rows;
        $resultsContainer.find('table').datagrid(module);
        com.bottomResults.setTitle(r.total);
        com.bottomResults.show();
    }

    $app.find('.query').click(getResults);



    /*
    var bDCXOn = false;
    var bMCXOn = false;
    var dcxOnCls = 'pointtool-s';
    var mcxOnCls = 'polygontool-s';

    var $results = $app.find('.query-results');
    var $pointQuery = $app.find('.query-tools-point');
    var $polygonQuery = $app.find('.query-tools-polygon');
    var $count = $app.find('.query-results-count');
    var rOnCls = 'map-tools-on';
    var layerInfo = getTreeNodeData($.fn.zTree.getZTreeObj('layerTree').getNodeByParam('id', 'gyyd')).data;
    var url = layerInfo.layerUrl + '/0';
    var dFields = ['DWMC', 'SZDKMJ', 'DWDZ'];

    var alias = {
        'DKSYH': '地块索引号',
        'DWMC': '单位名称',
        'TDZH': '土地证号',
        'ZZJGDM': '组织机构代码',
        'GSDJZH': '工商登记证号',
        'SWDJZH': '税务登记证号',
        'CYLB': '产业类别',
        'HYMC': '行业名称',
        'SFGSQY': '是否规上企业',
        'JZMJ': '建筑面积',
        'WCTZ': '完成投资',
        'YYSR': '营业收入',
        'ZCZ': '总产值',
        'ZJZ': '增加值',
        'LYZE': '利润总额',
        'SJSJ': '上缴税金',
        'SJGS': '上缴国税',
        'SJDS': '上缴地税',
        'CYRY': '从业人员',
        'SZDKMJ': '所在地块面积'
    }

    function resultFormt(r) {
        if (r && r.length) {
            $results.html('');
            $count.html(r.length);
            for (var i = 0; i < r.length; i++) {
                var f = r[i];
                var dom = $('<div class="results-item"><div class="result-item-title">' + f[dFields[0]] + '</div><div class="result-item-slider"></div><div class="result-item-content">地块面积：' + f[dFields[1]].toFixed(0) + '平方米<br />土地坐落：' + f[dFields[2]] + '</div></div>');
                dom.appendTo($results);
                dom.data('feature', f);
                dom.click(showResults);
                if (i == 0)
                    dom.click();
            }
            if ($app.find('>div').first().hasClass('z1'))
                $app.find('>div').toggleClass('z1');
        }
        else {
            com.bottomTip.showInfo('未查找到相应企业！');
        }
    }

    $app.find('.query').click(function () {
        var condition = getCurrentCondtion();
        if (!condition) {
            com.bottomTip.showWarn('请检查查询条件是否设置或设置是否正确！');
            return;
        }
        $.post(postUrl + '?action=getQYByWhere&where=' + condition, function (r) {
            resultFormt(r);
        }, 'json');
    });


    function getCurrentCondtion() {
        var $Fields = $app.find('.field');
        var condition = '';
        for (var i = 0; i < $Fields.length; i++) {
            var $field = $($Fields[i]);
            var val = $.trim($field.val());
            if (val != '') {
                var field = $field.data('field');
                var split = field.split('-');
                if (split.length != 1) {
                    if (split[2] == 'mj') {
                        val = parseFloat(val) * 666.6667;
                        if (isNaN(val)) {
                            return false;
                        }
                    }
                    condition += (split[0] == 'max' ? (split[1] + '<' + val) : (split[1] + '>' + val)) + ' and ';
                }
                else {
                    condition += field + " like '%" + val + "%' and ";
                }
            }
        }
        if (condition)
            condition = condition.substr(0, condition.length - 4);
        return condition;
    }

    function showResults() {
        var $this = $(this);
        var ft = $this.data('feature');
        var dksyh = ft['DKSYH'].split('、')[0];
        var fieldFormatter = com.fieldFormatter(alias, ft);
        var html = com.getTable(fieldFormatter);
        giscom.queryLayerByWhere(url, "dksyh='" + dksyh + "'", function (evt) {
            giscom.clearGraphicsLayer();
            if (evt.features.length) {
                var f = evt.features[0];
                f.setSymbol(giscom.symbols.selectedSymbol2);
                giscom.graphics.flashGraphic(f, true, false, true);
                var resultPanel = $('.feature-detail');
                var rTitle = resultPanel.find('.feature-detail-title');
                var rContainer = resultPanel.find('.feature-details');
                rContainer.data('data', giscom.fieldFormatter);
                rTitle.html(ft[dFields[0]]);
                rContainer.html(html);
                resultPanel.addClass(rOnCls);
            }
        });
    }

    function pointQueryOn() {
        giscom.tools.drawTools.deactivate();
        $pointQuery.addClass(dcxOnCls);
        $polygonQuery.removeClass(mcxOnCls);
        bMCXOn = false;
        giscom.tools.drawTools.identifyTool.activate();
        giscom.tools.drawTools.identifyTool.drawEndEvt = function (evt) {
            giscom.queryLayerByGeometry(url, evt.geometry, setResults);
        };
    }
    function setResults(results) {
        var fts = results.features;
        if (fts.length == 0) {
            com.bottomTip.showInfo('未查找到地块！');
        } else {
            $count.html(fts.length);
            $results.html('');
            var inCondition = '';
            for (var i = 0; i < fts.length; i++) {
                var ft = fts[i];
                inCondition += "'" + ft.attributes['DKSYH'] + "',";
            }
            inCondition = 'dksyh in(' + inCondition.substr(inCondition, inCondition.length - 1) + ')';
            $.post(postUrl + '?action=getQYByWhere&where=' + inCondition, function (r) {
                resultFormt(r);
            }, 'json');
        }
    }
    function pointQueryOff() {
        giscom.tools.drawTools.deactivate();
        $pointQuery.removeClass(dcxOnCls);
    }

    function polygonQueryOn() {
        giscom.tools.drawTools.deactivate();
        $pointQuery.removeClass(dcxOnCls);
        $polygonQuery.addClass(mcxOnCls);
        bDCXOn = false;
        giscom.tools.drawTools.polygon.activate();
        giscom.tools.drawTools.polygon.drawEndEvt = function (evt) {
            var g = evt.geometry;
            var graphic = new esri.Graphic(g, giscom.symbols.fillSymbol);
            giscom.queryLayerByGeometry(url, evt.geometry, setResults);
        };
    }

    function polygonQueryOff() {
        giscom.tools.drawTools.deactivate();
        $polygonQuery.removeClass(mcxOnCls);
        giscom.clearGraphicsLayer();
    }

    $pointQuery.click(function () {
        bDCXOn = !bDCXOn;
        if (bDCXOn) {
            pointQueryOn();
        }
        else {
            pointQueryOff();
        }
    });
    //多边形查询
    $polygonQuery.click(function () {
        bMCXOn = !bMCXOn;
        if (bMCXOn) {
            polygonQueryOn();
        }
        else {
            polygonQueryOff();
        }
    });

    //清除结果集
    $app.find('.query-tools-drop').click(function () {
        $results.html('');
        $count.html('');
        giscom.clearGraphicsLayer();
    });

    config.deactivate = function () {
        bDCXOn = false;
        bMCXOn = false;
        $pointQuery.removeClass(dcxOnCls);
        $polygonQuery.removeClass(mcxOnCls)
        giscom.tools.drawTools.deactivate();
        giscom.clearGraphicsLayer();
    }*/
})();