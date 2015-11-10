(function () {

    var pqs = [{
        dm: '',
        mc: '全部'
    }].concat(qyConfig.pq);
    var $app = $('.gewy');
    var config = $app.data('config');

    var ydkgsj = [
        { dm: '', mc: '全部' },
        { dm: ' sysdate-ydkgsj<365 ', mc: '一年以内' },
        { dm: ' （sysdate-ydkgsj>=365 and sysdate-ydkgsj<365*2） ', mc: '满一年' },
        { dm: ' sysdate-ydkgsj>=365*2', mc: '满两年及以上' }
    ];

    var $pqDropDown = $app.find('.dropdown.ydkgsj');
    var $pqDown = $pqDropDown.find('ul');
    for (var i = 0; i < ydkgsj.length ; i++) {
        var t = ydkgsj[i];
        var $li = $('<li>' + t.mc + '</li>');
        $li.data('ydkgsj', t);
        $li.appendTo($pqDown);
    }
    $pqDropDown.find('li').click(function () {
        var $this = $(this);
        var t = $this.data('ydkgsj');
        var txt = t.mc;
        $this.parent().parent().find('.pq-text').html(txt).data('ydkgsj', t).val(t.dm);
    });
    $pqDropDown.find('li').first().click();
    $pqDropDown.click(function () {
        var $this = $(this);
        $this.find('.pq-dropdown').slideToggle(200);
    });

    var dklx = [
       { dm: '', mc: '全部' },
       { dm: '0', mc: '工业用地' },
       { dm: '1', mc: '经营性用地' },
       { dm: '2', mc: '划拨用地' }
    ];

    var $pqDropDownDKLX = $app.find('.dropdown.dklx');
    var $pqDownDKLX = $pqDropDownDKLX.find('ul');
    for (var i = 0; i < dklx.length ; i++) {
        var t = dklx[i];
        var $li = $('<li>' + t.mc + '</li>');
        $li.data('dklx', t);
        $li.appendTo($pqDownDKLX);
    }
    $pqDropDownDKLX.find('li').click(function () {
        var $this = $(this);
        var t = $this.data('dklx');
        var txt = t.mc;
        $this.parent().parent().find('.pq-text').html(txt).data('dklx', t).val(t.dm);
    });
    $pqDropDownDKLX.find('li').first().click();
    $pqDropDownDKLX.click(function () {
        var $this = $(this);
        $this.find('.pq-dropdown').slideToggle(200);
    });

    com.toolTip.init($app);



    var postUrl = 'handle/CommonHandle.ashx';



    var cfg = landQueryConfigs.gewy;
    var queryFields = cfg.queryFields;
    var displayFields = cfg.displayFields;
    var displayField = cfg.displayField;
    var tableName = cfg.tableName;
    var sheetName = cfg.sheetName;

    var layerInfo = getTreeNodeData($.fn.zTree.getZTreeObj('layerTree').getNodeByParam('id', 'gewy')).data;
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

        var kgsjCondition = $pqDropDown.find('.pq-text').data('ydkgsj').dm;
        if (kgsjCondition) {
            condition = condition + kgsjCondition;
        } else if (!kgsjCondition) {
            condition = condition.substr(0, condition.length - 4);
        }
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
            var sWhere = "OBJECTID=" + row['ID'];
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

                    giscom.graphics.add(ft);

                }
                var extent = esri.graphicsExtent(fts).expand(1.2);
                giscom.mapObj.map.setExtent(extent);
            }
        }, true, ['OBJECTID']);
    }

    function getResults() {
        sCondition = getCurrentCondtion();

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