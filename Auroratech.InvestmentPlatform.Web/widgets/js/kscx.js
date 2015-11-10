(function () {
    var $app = $('.kscx');
    var $regionCheckboxs = $app.find('.region-container2 input');
    $regionCheckboxs.change(function () {
        var $this = $(this);
        $regionCheckboxs.prop('checked', false);
        $this.prop('checked', true);
        $app.find('.region-place2').html($this.data('mc'));
    });
    $regionCheckboxs.first().change();
    var $landTypeCheckboxes = $app.find('.landtype-container input');
    $landTypeCheckboxes.change(function () {
        var $this = $(this);
        $landTypeCheckboxes.prop('checked', false);
        $this.prop('checked', true);
        $app.find('.landtype-place').html($this.data('mc'));
    });
    $landTypeCheckboxes.first().change();
    $app.find('.region-title').click(function () {
        $app.find('.region-container2').toggleClass('close');
        $(this).toggleClass('close');
    });

    $app.find('.landtype-title').click(function () {
        $app.find('.landtype-container').toggleClass('close');
        $(this).toggleClass('close');
    });
    var slider = $app.find('.area-slider-obj');

    slider.slider({
        height: 50,
        width: 260,
        range: true,
        value: [100, 200],
        min: 0,
        max: 500,
        step: 10,
        showTip: true,
        rule: [0, '|', 100, '|', 200, '|', 300, '|', 400, '|', 500],
        onChange: function (newValue, oldValue) {
            setRangeRules();
        }
    });

    function setRangeRules() {
        var values = slider.slider('getValues');
        var range = values[1] - values[0];
        $inrule.css('width', 260 * range / 500 - 1).css('margin-left', 260 * values[0] / 500);
    }

    var inRuleCls = 'inrule';
    var $inrule = $('<div class="inrule" ></div>');
    setRangeRules();
    $inrule.appendTo($app.find('.area-slider .slider-inner'));
    $app.find('.area-slider .slider-rulelabel span').click(function () {
        var $this = $(this);
        var html = $this.html();
        var values = slider.slider('getValues');
        var nowValue = parseInt(html);
        var v1 = Math.abs(values[0] - nowValue);
        var v2 = Math.abs(values[1] - nowValue);
        var valuesNew = v1 < v2 ? [nowValue, values[1]] : [values[0], nowValue];
        slider.slider('setValues', valuesNew);
    });

    var postUrl = 'handle/CommonHandle.ashx';
    var queryFields = null;
    var displayFields = null;
    var displayField = null;
    var tableName = null;
    var sheetName = null;
    var url = null;
    var sCondition = null;
    var data = null;
    var sFields = null;
    var columns = null;
    var module = null;
    var type = null;

    function getCurrentCondtion() {
        var values = slider.slider('getValues');
        if (values[1] == 500) {
            var sWhere = ' tdmj*0.0015> ' + values[0];
        } else {
            var sWhere = ' tdmj*0.0015> ' + values[0] + ' and tdmj*0.0015<' + values[1];
        }
        var $type = $app.find('.landtype-container input:checked');
        type = $type.data('type');

        var cfg = landQueryConfigs[type];


        if (type == 'all') {
            displayFields = 'YDDW';
            sheetName = '地块信息';
            sFields = 'OBJECTID ID,TDMJ 土地面积_平方米,TDMJ_M 土地面积_亩';
            columns = [
            {
                field: 'btndetail', title: '操作', halign: 'center', formatter: function () {
                    return '<span style="color:blue;cursor:pointer;">详情</span>';
                }
            },
            {
                field: '类型', title: '类型', halign: 'center', width: 100, align: 'center'
            }, {
                field: '用地单位', title: '用地单位', halign: 'center', width: 200
            }, {
                field: '土地坐落', title: '土地坐落', halign: 'center', width: 300
            }, {
                field: '土地面积_平方米', title: '土地面积（平方米）', halign: 'center', width: 120
            }, {
                field: '土地面积_亩', title: '土地面积（亩）', halign: 'center', width: 100
            }];


            module = {
                view: scrollview,
                pageSize: 10,
                rownumbers: true,
                remoteSort: false,
                singleSelect: true,
                toolbar: [{
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
                    var dklx = row['类型'];
                    var url = getUrl(dklx);
                    giscom.clearGraphicsLayer();
                    if (url) {
                        giscom.queryLayerByWhere(url, sWhere, function (r) {
                            if (r.features.length) {
                                var g = r.features[0];
                                g.setSymbol(giscom.symbols.selectedSymbol2);
                                giscom.graphics.flashGraphic(g, true, false, true);
                            }
                        }, true);
                    }
                },
                onClickCell: function (index, field, value) {
                    if (field == 'btndetail') {
                        var row = data[index];
                        var sWhere = "OBJECTID=" + row["ID"];
                        var url = getUrl(row["类型"]);
                        var outFields = getOutFields(row["类型"]);
                        giscom.queryLayerByWhere(url, sWhere, function (r) {
                            if (r.features.length) {
                                var g = r.features[0];
                                var title = g.attributes[displayFields];
                                var obj = fieldFormatter(r.fieldAliases, g.attributes);
                                com.detailPanel.setValue(obj);
                                com.detailPanel.setTitle(title);
                                com.detailPanel.show();
                            }
                        }, false, outFields);
                    }
                }
            };
        }
        else {
            queryFields = cfg.queryFields;
            displayFields = cfg.displayFields;
            displayField = cfg.displayField;
            tableName = cfg.tableName;
            sheetName = cfg.sheetName;
            var layerInfo = getTreeNodeData($.fn.zTree.getZTreeObj('layerTree').getNodeByParam('id', type)).data;
            url = layerInfo.layerUrl + '/0';
            sFields = (function () {
                var s = '';
                for (var name in queryFields) {
                    s += name + ' ' + queryFields[name] + ',';
                }
                return s.substr(0, s.length - 1);
            })();

            columns = (function () {
                var columns = [{
                    field: 'btndetail', title: '操作', halign: 'center', formatter: function () {
                        return '<span style="color:blue;cursor:pointer;">详情</span>';
                    }
                }];
                for (var name in displayFields) {
                    var n = displayFields[name];
                    columns.push({ field: n, title: n, halign: 'center', width: 200 });
                }
                return columns;
            })();

            module = {
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
        }
        return sWhere;
    }
    function getOutFields(dklx) {
        var qFields = null;
        switch (dklx) {
            case '规划地块':
                qFields = landQueryConfigs.zsdk.queryFields;
                break;
            case '批而未供':
                qFields = landQueryConfigs.pewg.queryFields;
                break;
            case '供而未用':
                qFields = landQueryConfigs.gewy.queryFields;
                break;
            case '用而不足':
                qFields = landQueryConfigs.yebz.queryFields;
                break;
            case '标准厂房':
                qFields = landQueryConfigs.xzcf.queryFields;
                break;
            default:
                qFields = ['*'];
                break;
        }
        var q = [];
        for (var name in qFields) {
            q.push(name);
        }
        return q;
    }
    function fieldFormatter(fieldAliases, attributes) {
        var o = {};
        var regex = new RegExp(giscom.fieldFilter, 'g');
        for (var field in fieldAliases) {
            if (!field.toLocaleUpperCase().match(regex)) {
                var v = attributes[field];
                v = v ? v : '无';
                v = typeof (v) === 'number' ? v.toFixed(2) : v;
                o[fieldAliases[field]] = v;
            }
        }
        return o;
    }

    function getTable(fieldFormatted) {
        var html = '<table>';
        for (var name in fieldFormatted) {
            html += '<tr><th style="width:40%;">' + name + '</th><td style="width:60%;">' + fieldFormatted[name] + '</td></tr>';
        }
        html += '</talbe>';
        return html;
    }

    function getUrl(dklx) {
        switch (dklx) {
            case '规划地块':
                return 'http://' + globalIP + ':6080/arcgis/rest/services/XQ/XQ_ZSDK2/MapServer/0';
            case '批而未供':
                return 'http://' + globalIP + ':6080/arcgis/rest/services/XQ/XQ_PEWG/MapServer/0';
            case '供而未用':
                return 'http://' + globalIP + ':6080/arcgis/rest/services/XQ/XQ_GEWY/MapServer/0';
            case '用而不足':
                return 'http://' + globalIP + ':6080/arcgis/rest/services/XQ/XQ_YEBZ/MapServer/0';
            default:
                return null;
        }
    }

    function excelExport() {
        $.post(postUrl + '?action=ExportExcel',
        {
            where: sCondition,
            fields: sFields,
            tableName: tableName,
            sheetName: sheetName,
            type: type
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

                    var centerPoint = ft.geometry.getExtent().getCenter();
                    var font = new esri.symbol.Font('14px', esri.symbol.Font.STYLE_ITALIC, esri.symbol.Font.VARIANT_NORMAL, esri.symbol.Font.WEIGHT_BOLD, 'Microsoft YaHei');
                    var tSymbol = new esri.symbol.TextSymbol((i + 1) + '', font, new esri.Color([238, 20, 20, 1]));
                    var gText = new esri.Graphic(centerPoint, tSymbol);

                    giscom.graphics.add(ft);
                    giscom.graphics.add(gText);
                }
                var extent = esri.graphicsExtent(fts).expand(1.2);
                giscom.mapObj.map.setExtent(extent);
            }
        }, true, ['OBJECTID']);
    }

    function getResults() {
        sCondition = getCurrentCondtion();
        if (!sCondition) {
            com.bottomTip.showWarn('请检查查询条件是否设置或设置是否正确！');
            return;
        }
        var action = type == 'all' ? 'GetAllDK' : 'GetDK';
        $.post(postUrl + '?action=' + action,
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