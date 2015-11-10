(function () {
    var postUrl = 'handle/CommonHandle.ashx';
    var $app = $('.gyqy');
    var config = $app.data('config');
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

})();