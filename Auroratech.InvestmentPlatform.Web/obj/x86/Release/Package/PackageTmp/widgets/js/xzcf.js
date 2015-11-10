﻿(function () {

    var pqs = [{
        dm: '',
        mc: '全部'
    }].concat(qyConfig.pq);

    var bflxs = [{
        dm: '',
        mc: '全部'
    }, {
        dm: '混合',
        mc: '混合'
    }, {
        dm: '单层',
        mc: '单层'
    }, {
        dm: '多层',
        mc: '多层'
    }];

    var bfzts = [{
        dm: '',
        mc: '全部'
    }, {
        dm: '精装',
        mc: '精装'
    }, {
        dm: '完好',
        mc: '完好'
    }, {
        dm: '毛坯',
        mc: '毛坯'
    }];

    var $app = $('.xzcf');
    var config = $app.data('config');
    var $pqDropDownBFLX = $app.find('.dropdown.bflx');
    var $pqDownBFLX = $pqDropDownBFLX.find('ul');
    for (var i = 0; i < bflxs.length ; i++) {
        var bflx = bflxs[i];
        var $li = $('<li>' + bflx.mc + '</li>');
        $li.data('bflx', bflx);
        $li.appendTo($pqDownBFLX);
    }
    $pqDropDownBFLX.find('li').click(function () {
        var $this = $(this);
        var bflx = $this.data('bflx');
        var txt = bflx.mc;
        $this.parent().parent().find('.pq-text').html(txt).data('bflx', bflx).val(bflx.dm);
    });
    $pqDropDownBFLX.find('li').first().click();
    $pqDropDownBFLX.click(function () {
        var $this = $(this);
        $this.find('.pq-dropdown').slideToggle(200);
    });

    var $pqDropDownBFZT = $app.find('.dropdown.bfzt');
    var $pqDownBFZT = $pqDropDownBFZT.find('ul');
    for (var i = 0; i < bfzts.length ; i++) {
        var bfzt = bfzts[i];
        var $li = $('<li>' + bfzt.mc + '</li>');
        $li.data('bflx', bfzt);
        $li.appendTo($pqDownBFZT);
    }
    $pqDropDownBFZT.find('li').click(function () {
        var $this = $(this);
        var bfzt = $this.data('bflx');
        var txt = bfzt.mc;
        $this.parent().parent().find('.pq-text').html(txt).data('bflx', bfzt).val(bfzt.dm);
    });
    $pqDropDownBFZT.find('li').first().click();
    $pqDropDownBFZT.click(function () {
        var $this = $(this);
        $this.find('.pq-dropdown').slideToggle(200);
    });


    var $pqDropDown = $app.find('.dropdown.pqs');

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

    var postUrl = 'handle/CommonHandle.ashx';

    var cfg = landQueryConfigs.xzcf;
    var queryFields = cfg.queryFields;
    var displayFields = cfg.displayFields;
    var displayField = cfg.displayField;
    var tableName = cfg.tableName;
    var sheetName = cfg.sheetName;

    var layerInfo = getTreeNodeData($.fn.zTree.getZTreeObj('layerTree').getNodeByParam('id', 'xzcf')).data;
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
                else if (split.length == 3) {
                    val = parseFloat(val);
                    if (isNaN(val)) {
                        return false;
                    }
                    condition += (split[0] == 'max' ? (split[1] + '<' + val) : (split[1] + '>' + val)) + ' and ';
                } else {
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
            text: '厂房分布',
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
})();