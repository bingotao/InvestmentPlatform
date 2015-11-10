var map = null;
var postUrl = 'handle/CommonHandle.ashx';

$(function () {
    var slideSpeed = 300;
    var mapToolsOnCls = 'map-tools-on ';
    com.toolTip.init();
    com.bottomTip.init();
    btnInit();
    com.detailPanel.init();
    function btnInit() {
        var $regions = $('.region-panel span');
        var $currentRegion = $('.current-region');
        var first = true;
        $regions.click(function () {
            var $this = $(this);
            var region = $this.data('region');
            $currentRegion.html(region.mc).data('region', region);
            $currentRegion.parent().find('.btn-slideclose').click();
            if (!first)
                giscom.centerRegion(region);
            first = false;
        });
        $regions.first().click();
        $currentRegion.click(function () {
            $('.region-panel').slideToggle(slideSpeed);
        });
        var bottomClose = $('.bottom-results .bottom-close');

        bottomClose.click(function () {
            var $this = $(this);
            $this.parent().toggleClass('bottom-results-on');
        });
        $('.map-tools-btn').click(function () {
            $('.map-tools').addClass(mapToolsOnCls);
        });
        $('.map-tools-close').click(function () {
            $('.map-tools').removeClass(mapToolsOnCls);
        });
        $('.btn-slideclose').click(function () {
            var $this = $(this);
            $this.parent().slideUp(slideSpeed);
        });
        var slideLeftCloseCls = 'slider-close';
        var slideBtnChangeCls = 'sliderbtn-rotate';
        $('.sliderbtn').click(function () {
            var $this = $(this);
            var $slideLeft = $this.parent();
            if ($this.hasClass(slideBtnChangeCls)) {
                $this.removeClass(slideBtnChangeCls);
                $slideLeft.removeClass(slideLeftCloseCls);
            } else {
                $this.addClass(slideBtnChangeCls);
                $slideLeft.addClass(slideLeftCloseCls);
                appConfig.deactiveActiveApp();
            }
            setTimeout(function () { resize(); }, slideSpeed);
        });

        var $sliderNavLi = $('.slider-nav li');
        $sliderNavLi.click(function () {
            var sNavCls = 'slide-nav-selected ';
            var sNavPanelCls = 'opacity1';
            var $this = $(this);
            if (!$this.hasClass(sNavCls)) {
                var target = $this.data('target');
                $this.parent().find('li').removeClass(sNavCls);
                $this.addClass(sNavCls);
                var $target = $('.' + target);
                $('.slider-panel>div').removeClass(sNavPanelCls);
                $target.addClass(sNavPanelCls);
                var index = $sliderNavLi.index($this);
                //切换时激活或停止当前app
                if (index == 0) {
                    appConfig.deactiveActiveApp();
                } else {
                    var activeApp = appConfig.getActiveApp();
                    if (activeApp && activeApp.activate)
                        activeApp.activate();
                }
            }
        });
        $sliderNavLi.first().click();
        $('.bottom-results-up ').click(function () {
            com.bottomResults.show();
        });
    }

    function resize() {
        var $body = $('.body');
        var $head = $('.head');
        var $slider = $('.lslider');
        var $sliderNav = $('.slider-nav');
        $body.height(document.documentElement.clientHeight - $head.height());
        var $mapContainer = $('.map-container');
        $mapContainer.width(document.documentElement.clientWidth - $slider.innerWidth() - 1);
        $('.slider-panel').height(document.documentElement.clientHeight - $head.height() - $sliderNav.height());

        if (map) {
            map.resize();
        }
    }
    $(window).resize(resize);
    resize();

    com.initAppCenter(appConfig);
    initMap();
});

function initLayerTree() {

    function showIconForTree(treeId, treeNode) {
        return treeNode.layerUrl;
    };

    var setting = {
        view: {
            showLine: false,
            showIcon: showIconForTree,
            selectedMulti: false,
            dblClickExpand: true,
            addHoverDom: addHoverDom,
            removeHoverDom: removeHoverDom
        },
        callback: {
            onExpand: scrollInit,
            onCollapse: scrollInit,
            onCheck: onCheck,
            beforeCheck: bCheck
        },
        check: {
            enable: true
        }
    };
    var header = 'diyBtn_';
    function addHoverDom(treeId, treeNode) {
        if (!treeNode.children && treeNode.checked && (treeNode.opacityable != false)) {
            var $aObj = $("#" + treeNode.tId + '_a');
            if ($aObj.find('#' + header + treeNode.id).length > 0)
                return;
            var $opacityBtn = $('<div title="图层透明度" id="' + header + treeNode.id + '" class="opacity-btn"></div>');
            $opacityBtn.appendTo($aObj);
            $opacityBtn.data('id', treeNode.id);
            $opacityBtn.click(function () {
                var $this = $(this);
                var id = $this.data('id');
                var p = $this.offset();
                var opacityTip = $('<div class="opacity-tip"><div></div></div>');
                opacityTip.css('top', p.top);
                opacityTip.css('left', p.left);
                opacityTip.appendTo($('body'));

                var map = giscom.mapObj.map;
                var layer = map.getLayer(id);
                var opacity = layer.opacity;
                opacityTip.find('>div').slider({
                    height: 50,
                    width: 240,
                    value: (opacity * 100).toFixed(0),
                    min: 0,
                    max: 100,
                    step: 1,
                    showTip: true,
                    onChange: function (newValue, oldValue) {
                        layer.setOpacity(newValue / 100);
                    }
                });
                opacityTip.hover(null, function () {
                    var $this = $(this);
                    $this.css('display', 'none');
                    setTimeout(function () { $this.remove(); }, 5000);
                });
                return false;
            });
        }
    }

    function removeHoverDom(treeId, treeNode) {
        //if (!treeNode.children && treeNode.checked && (treeNode.opacityable != false)) {
        $('#' + header + treeNode.id).unbind().remove();
        //}
    }

    function bCheck(treeId, treeNode) {
        if (treeNode.children) {
            return false;
        }
    }

    function onCheck(e, treeId, treeNode) {
        var o = getTreeNodeData(treeNode);
        if (treeNode.checked) {
            giscom.addLayer(treeNode.layerUrl, treeNode.type, o.data, o.options, o.options.index);
        }
        else {
            removeHoverDom(treeId, treeNode);
            giscom.removeLayer(treeNode.id);
        }
    }

    function scrollInit() {
        tocContainer.slimScroll({
            height: $(".toc-container").height(),
            alwaysVisible: true
        });
    }

    var treeObj = $("#layerTree");
    var tree = $.fn.zTree.init(treeObj, setting, mapLayers);
    var tocContainer = $(".toc-container");
    var layers = $('.layers');
    tocContainer.css('height', layers.height() - 32);
    scrollInit();
    var checkedNodes = tree.getCheckedNodes(true);
    var nodes = checkedNodes.sort(function (a, b) {
        return a.index > b.index
    });
    for (var i = 0; i < checkedNodes.length; i++) {
        var node = checkedNodes[i];
        var o = getTreeNodeData(node);
        giscom.addLayer(node.layerUrl, node.type, o.data, o.options, o.options.index);
    }
}

function initMap() {
    giscom.initMap('mapMain', function (myMap) {
        map = myMap;

        giscom.baseMap.initBaseMap('baseMap');
        giscom.initOverView2('mapMain', false);
        giscom.symbols.initSymbols();
        giscom.tools.drawTools.initDrawTool();
        giscom.initScalebar();
        initLayerTree();

        centerPoint = {
            x: 40540919.80535369,
            y: 3488667.516110277
        };
        //centerPoint = {
        //    x: 541643.1553003327,
        //    y: 3488473.565320829
        //};
        mapControl.mapNav({
            map: map,
            dom: $('#divMapNav')[0],
            oCenterAndLevel: {
                point: centerPoint,
                level: 1
            },
            silderSetting: {
                showSlider: true
            }
        });
    });
}

function getTreeNodeData(treeNode) {
    var n = treeNode;
    var o = {};
    if (n) {
        o.data = {
            name: treeNode.name,
            id: treeNode.id,
            layerUrl: treeNode.layerUrl,
            type: treeNode.type,
            index: treeNode.index,
            queryable: treeNode.queryable,
            opacityable: treeNode.opacityable,
            queryLayers: treeNode.queryLayers
        };
        o.options = {
            id: treeNode.id,
            index: treeNode.index,
            opacity: treeNode.opacity,
        };
    }
    return o;
}

function ExportMap(mapType) {
    var layerUrl = 'http://192.0.4.195:6080/arcgis/rest/services/XQ_' + mapType + '/MapServer/0';
    require(['esri/tasks/query', 'esri/tasks/QueryTask', 'esri/tasks/PrintTemplate', 'esri/tasks/PrintParameters', 'esri/tasks/PrintTask'], function (Query, QueryTask, PrintTemplate, PrintParameters, PrintTask) {

        var printUrl = 'http://192.0.4.195:6080/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task';
        var query = new Query();
        query.returnGeometry = true;
        query.outFields = ['OBJECTID', 'BSM'];
        query.outSpatialReference = giscom.mapObj.map.spatialReference;
        query.where = '1<>2';
        var queryTask = new QueryTask(layerUrl);
        var $map = $('.map');
        var height = $map.height();
        var width = $map.width();
        queryTask.execute(query, function (ftSet) {
            function printMap(callback) {
                if (i != fts.length) {
                    map.graphics.clear();
                    var ft = fts[i];
                    ft.setSymbol(giscom.symbols.selectedSymbol2);
                    map.graphics.add(ft);
                    var handle = map.on('extent-change', function () {
                        handle.remove();
                        var oId = ft.attributes['BSM'];
                        var pTask = new PrintTask(printUrl);
                        var template = new PrintTemplate();
                        template.exportOptions = {
                            width: width,
                            height: height,
                            dpi: 96
                        };
                        template.format = "png8";
                        template.layout = "MAP_ONLY";
                        template.preserveScale = false;

                        var params = new PrintParameters();
                        params.map = giscom.mapObj.map;
                        params.template = template;

                        pTask.execute(params, function (r) {
                            $.post(postUrl + '?action=ExportMap', {
                                url: r.url,
                                oid: oId,
                                type: mapType
                            }, function (o) {

                            }, 'text');
                            i++;
                            callback(printMap);
                        }, function (e) {
                            i++;
                            callback(printMap);
                        });
                    });
                    map.setExtent(ft.geometry.getExtent().expand(2));
                }
            }
            var fts = ftSet.features;
            var i = 0;
            printMap(printMap);
        });
    });
}