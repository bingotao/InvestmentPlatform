(function () {




    var $app = $('.identify-panel');
    var config = $app.data('config');
    var bOn = false;
    var $btnSwitch = $app.find('.btn-switch');
    var resultPanel = $('.feature-detail');
    var rTitle = resultPanel.find('.feature-detail-title');
    var rContainer = resultPanel.find('.feature-details');

    var rOnCls = 'map-tools-on';
    var rClose = resultPanel.find('.feature-detail-close');

    $btnSwitch.click(function () {
        var $this = $(this);
        $this.toggleClass('btn-switch-off');
        bOn = !bOn;
        if (bOn) {
            toolOn();
        } else {
            toolOff();
        }
    });
    var h = $app.height();
    var $queryResults = $app.find('.query-results');
    $queryResults.height(h - 100);
    $app.find('.query-results').slimScroll({
        height: h - 100,
        alwaysVisible: true
    });

    var tool = giscom.tools.drawTools.identifyTool;

    function toolOn() {

        tool.activate();
        tool.drawEndEvt = function (evt) {
            com.bottomTip.show('正在查询，请稍后...');
            var g = evt.geometry;
            giscom.queryLayerInMap(g, function (queryResults) {
                giscom.clearGraphicsLayer();
                foundResultsTree(queryResults);
            });
        };
    }

    function foundResultsTree(queryResults) {
        var r = [];
        for (var i = 0; i < queryResults.length; i++) {
            var l = queryResults[i];
            var b = false;
            var displayField = l.results.displayFieldName;
            if (l.displayFields && l.displayFields.length) {
                displayField = l.displayFields[0];
            }
            for (var m = 0; m < r.length ; m++) {
                if (r[m].id === l.id) {
                    b = true;
                    break;
                }
            }
            var features = l.results.features;
            var features_r = [];
            for (var n = 0; n < features.length ; n++) {
                features_r.push({
                    name: features[n].attributes[displayField],
                    id: l.id + '____' + l.subLayerId + '____' + n
                });
            }

            if (b) {
                r[m].children.push({
                    id: l.id + '____' + l.subLayerId,
                    name: l.subLayerName,
                    open: true,
                    children: features_r,
                    results: l.results
                });
            } else {
                r.push({
                    id: l.id,
                    name: l.name,
                    open: true,
                    children: [
                        {
                            id: l.id + '____' + l.subLayerId,
                            name: l.subLayerName,
                            open: true,
                            children: features_r,
                            results: l.results
                        }
                    ]
                });
            }
        }
        buildResultsTree(r);
    }
    function buildResultsTree(results) {
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

        var s = {
            callback: {
                onDblClick: ondblclick
            },
            data: {
                simpleData: {
                    enabled: true
                }
            },
            view: {
                showIcon: false
            }
        }
        function ondblclick(evt, nodeid, node) {
            var ids = node.id.split('____');
            if (ids.length === 3) {
                rContainer.html('');
                var fId = parseInt(ids[2]);
                var pNode = node.getParentNode();
                var results = pNode.results;
                var feature = results.features[fId];
                var fieldFormatted = fieldFormatter(results.fieldAliases, feature.attributes);
                var title = node.name;
                var tableHtml = getTable(fieldFormatted);
                giscom.clearGraphicsLayer();
                feature.setSymbol(giscom.symbols.selectedSymbol2);
                giscom.graphics.flashGraphic(feature, true, false, false, function (feature) {
                    var s = feature;
                });
                var tb = $(tableHtml);
                rContainer.data('data', fieldFormatted);
                tb.appendTo(rContainer);
                com.detailPanel.setTitle(title);
                //rContainer.html(tableHtml);
                if (!resultPanel.hasClass(rOnCls)) {
                    resultPanel.addClass(rOnCls);
                }
            }
        }
        $.fn.zTree.init($('#r-tree'), s, results);
        $('#r-tree_3_a').dblclick();
    }

    function toolOff() {
        giscom.tools.drawTools.deactivate();
    }

    function activate() {
        if (!bOn) {
            $btnSwitch.click();

        }
    }
    function deactivate() {
        if (bOn) {
            $btnSwitch.click();
        }
        rClose.click();
        giscom.clearGraphicsLayer();
    }
    config.activate = activate;
    config.deactivate = deactivate;
})();