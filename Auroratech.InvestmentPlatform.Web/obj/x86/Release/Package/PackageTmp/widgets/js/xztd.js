(function () {
    var pqs = [{
        dm: '-1',
        mc: '全部'
    }].concat(qyConfig.pq);

    var sfgh = [{
        dm: '',
        mc: '全部'
    }, {
        dm: '是',
        mc: '是'
    }, {
        dm: '否',
        mc: '否'
    }];

    var $app = $('.xztd');
    var config = $app.data('config');

    var $pqDropDownSFGH = $app.find('.dropdown.sfgh');
    var $pqDownSFGH = $pqDropDownSFGH.find('ul');
    for (var i = 0; i < sfgh.length ; i++) {
        var bflx = sfgh[i];
        var $li = $('<li>' + bflx.mc + '</li>');
        $li.data('sfgh', bflx);
        $li.appendTo($pqDownSFGH);
    }
    $pqDropDownSFGH.find('li').click(function () {
        var $this = $(this);
        var bflx = $this.data('sfgh');
        var txt = bflx.mc;
        $this.parent().parent().find('.pq-text').html(txt).data('sfgh', bflx).val(bflx.dm);
    });
    $pqDropDownSFGH.find('li').first().click();
    $pqDropDownSFGH.click(function () {
        var $this = $(this);
        $this.find('.pq-dropdown').slideToggle(200);
    });


    var $pqDropDown = $app.find('.dropdown.pqs');
    //var resultsBtns = $app.find('.query-results-btn');
    //resultsBtns.click(function () {
    //    $app.find('>div').toggleClass('z1');
    //});




    var $pqDown = $pqDropDown.find('ul');
    for (var i = 0; i < pqs.length ; i++) {
        var region = pqs[i];
        var $li = $('<li>' + region.mc + '</li>');
        $li.data('region', region);
        $li.appendTo($pqDown);
    }
    $pqDropDown.find('li').click(function () {
        var $this = $(this);
        var region = $this.data('region');
        var txt = region.mc;
        $this.parent().parent().find('.pq-text').html(txt).data('region', region).val(region.dm);
    });
    $pqDropDown.find('li').first().click();
    $pqDropDown.click(function () {
        var $this = $(this);
        $this.find('.pq-dropdown').slideToggle(200);
    });


    com.toolTip.init($app);


    var cfg = landQueryConfigs.xztd;
    var queryFields = cfg.queryFields;
    var displayFields = cfg.displayFields;
    var displayField = cfg.displayField;
    var tableName = cfg.tableName;
    var sheetName = cfg.sheetName;


    var postUrl = 'handle/CommonHandle.ashx';
    var layerInfo = getTreeNodeData($.fn.zTree.getZTreeObj('layerTree').getNodeByParam('id', 'xztd')).data;
    var url = layerInfo.layerUrl + '/0';

    var sCondition = null;
    var data = null;
    function getCurrentCondtion() {
        var $Fields = $app.find('.field');
        var condition = ' 1=1 and ';
        for (var i = 0; i < $Fields.length; i++) {
            var $field = $($Fields[i]);
            var val = $.trim($field.val());
            if (val != '') {
                var field = $field.data('field');
                var split = field.split('-');
                if (split.length == 2) {
                    val = parseFloat(val) * 666.6667;
                    if (isNaN(val)) {
                        return false;
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

    var sFields = (function () {
        var s = '';
        for (var name in queryFields) {
            s += name + ' ' + queryFields[name] + ',';
        }
        return s.substr(0, s.length - 1);
    })();

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
        toolbar: [{
            text: '地块分布',
            iconCls: 'icon-dkfb',
            handler: function () {
                getDKFB();
            }
        },
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
            var sWhere = "OBJECTID='" + row['ID'] + "'";
            giscom.clearGraphicsLayer();
            giscom.queryLayerByWhere(url, sWhere, function (r) {
                if (r.features.length) {
                    var g = r.features[0];
                    g.setSymbol(giscom.symbols.selectedSymbol2);
                    giscom.graphics.flashGraphic(g, true, false, true);
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

    function getDKFB() {
        giscom.queryLayerByWhere(url, sCondition, function (r) {
            var fts = r.features;
            giscom.clearGraphicsLayer();
            if (fts.length) {
                for (var i = 0; i < fts.length; i++) {
                    var ft = fts[i];
                    ft.setSymbol(giscom.symbols.selectedSymbol2);

                    /*
                    var centerPoint = ft.geometry.getExtent().getCenter();
                    var font = new esri.symbol.Font('14px', esri.symbol.Font.STYLE_ITALIC, esri.symbol.Font.VARIANT_NORMAL, esri.symbol.Font.WEIGHT_BOLD, 'Microsoft YaHei');
                    var tSymbol = new esri.symbol.TextSymbol((i + 1) + '', font, new esri.Color([238, 20, 20, 1]));
                    var gText = new esri.Graphic(centerPoint, tSymbol);
                    giscom.graphics.add(gText);
                    */
                    giscom.graphics.add(ft);
                }
                var extent = esri.graphicsExtent(fts).expand(1.2);
                giscom.mapObj.map.setExtent(extent);
            }
        }, true, ['OBJECTID'], ['TDMJ DESC']);
    }

    function getResults() {
        sCondition = getCurrentCondtion();
        //if (!sCondition) {
        //    com.bottomTip.showWarn('请检查查询条件是否设置或设置是否正确！');
        //    return;
        //}
        sCondition += $app.find('input:checked').data('where');
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
    var h = $app.find('.query-result').height();
    $app.find('.query-results').height(h - 100);
    $app.find('.query-results').slimScroll({
        height: h - 130,
        alwaysVisible: true
    });

    var bDCXOn = false;
    var bMCXOn = false;
    var dcxOnCls = 'pointtool-s';
    var mcxOnCls = 'polygontool-s';

    var $results = $app.find('.query-results');
    var $pointQuery = $app.find('.query-tools-point');
    var $polygonQuery = $app.find('.query-tools-polygon');
    var $count = $app.find('.query-results-count');
    var rOnCls = 'map-tools-on';
    var layerInfo = getTreeNodeData($.fn.zTree.getZTreeObj('layerTree').getNodeByParam('id', 'zsdk')).data;
    var url = layerInfo.layerUrl + '/0';
    var dFields = layerInfo.queryLayers[0].dFields;

    $app.find('.query').click(function () {
        var condition = getCurrentCondtion();
        if (!condition) {
            com.bottomTip.showWarn('请检查查询条件是否设置或设置是否正确！');
            return;
        }
        condition += $app.find('input:checked').data('where');
        giscom.queryLayerByWhere(url, condition, setResults);
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
                if (split.length == 2) {
                    val = parseFloat(val) * 666.6667;
                    if (isNaN(val)) {
                        return false;
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
        var alias = $this.data('alias');
        var fieldFormatter = com.fieldFormatter(alias, ft.attributes);
        var html = com.getTable(fieldFormatter);
        giscom.clearGraphicsLayer();
        giscom.graphics.flashGraphic(ft, true, false, true);
        var resultPanel = $('.feature-detail');
        var rTitle = resultPanel.find('.feature-detail-title');
        var rContainer = resultPanel.find('.feature-details');
        rContainer.data('data', fieldFormatter);
        rTitle.html(ft.attributes[dFields[0]]);
        rContainer.html(html);
        resultPanel.addClass(rOnCls);
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
            for (var i = 0; i < fts.length; i++) {
                var ft = fts[i];
                ft.setSymbol(giscom.symbols.selectedSymbol2);
                var ftDom = $('<div class="results-item"><div class="result-item-title">' + ft.attributes[dFields[0]] + '</div><div class="result-item-slider"></div><div class="result-item-content">地块面积：' + ft.attributes[dFields[1]].toFixed(0) + '平方米<br />土地坐落：' + ft.attributes[dFields[2]] + '</div></div>');
                ftDom.data('feature', ft);
                ftDom.data('alias', results.fieldAliases);
                ftDom.dblclick(showResults);
                ftDom.appendTo($results);
                if (i == 0)
                    ftDom.dblclick();
            }
            if ($('.zsdk>div').first().hasClass('z1'))
                resultsBtns.first().click();
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
        giscom.tools.drawTools.multiPoint.activate();
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