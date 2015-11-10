var giscom = {
    fieldFilter: 'OBJECTID|SHAPE_AREA|SHAPE_LENGTH|FID|SHAPE.AREA|SHAPE.LEN',
    layerTypes: {
        T: 'ArcGISTiledMapServiceLayer',
        D: 'ArcGISDynamicMapServiceLayer'
    },
    settings: {
        map: {
            logo: false,
            slider: false
        },
        scalebar: {
            attachTo: 'bottom-left',
            scalebarStyle: 'line',
            scalebarUnit: 'dual'
        },
        overView: {
            attachTo: 'bottom-right',
            color: '#0092DA',
            opacity: 0.3,
            visible: false
        },
        overView2: {
            //    xmax: 40552899.3495732
            //    xmin: 40528940.261134185
            //ymax: 3495298.6404918213
            //ymin: 3482036.3917287323
            extent: {
                'xmin': 40528324.17028861, 'ymin': 3479973.789733833, 'xmax': 40552283.258727625, 'ymax': 3496402.8789491593,
                "spatialReference": { "wkid": 2364 }
            },
            'path': 'css/img/yy-local.png',
            url: 'http://' + globalIP + ':6080/arcgis/rest/services/XQ_XZQ/MapServer'
        }
    },
    mapObj: {},
    tools: {
        drawTools: {
            initDrawPolygon: function (drawEndFun) {
                this.polygon.activate();
                this.multiPoint.activate({ showTooltips: false });
                if (drawEndFun)
                    this.polygon.drawEndEvt = drawEndFun;
            },
            resetTips: function () {
                var drawTips = esri.bundle.toolbars.draw;
                var oTips = giscom.tools.drawTools.tips;
                for (var name in oTips) {
                    drawTips[name] = oTips[name];
                }
            },
            tips: {},
            deactivate: function () {
                this.resetTips();
                for (var name in this) {
                    var obj = this[name];
                    if (obj.tool) {
                        obj.tool.deactivate();
                        obj.drawEndEvt = null;
                    }
                }
            },
            identifyTool: {
                tool: null,
                drawEndEvt: null,
                drawEndEvtHandle: null,
                activate: function (options) {
                    esri.bundle.toolbars.draw.addPoint = '点击查询';
                    this.tool.activate(esri.toolbars.Draw.POINT, options);
                }
            },
            point: {
                tool: null,
                drawEndEvt: null,
                drawEndEvtHandle: null,
                activate: function (options) {
                    this.tool.setMarkerSymbol(giscom.symbols.markerSymbol);
                    this.tool.activate(esri.toolbars.Draw.POINT, options);
                }
            },
            multiPoint: {
                tool: null,
                drawEndEvt: null,
                drawEndEvtHandle: null,
                activate: function (options) {
                    this.tool.activate(esri.toolbars.Draw.MULTI_POINT, options);
                    this.tool.setMarkerSymbol(giscom.symbols.markerSymbol);
                }
            },
            polyline: {
                tool: null,
                drawEndEvt: null,
                drawEndEvtHandle: null,
                activate: function (options) {
                    this.tool.setLineSymbol(giscom.symbols.lineSymbol);
                    this.tool.activate(esri.toolbars.Draw.POLYLINE, options);
                }
            },
            polygon: {
                tool: null,
                drawEndEvt: null,
                drawEndEvtHandle: null,
                activate: function (options) {
                    this.tool.activate(esri.toolbars.Draw.POLYGON, options);
                    this.tool.setFillSymbol(giscom.symbols.fillSymbol);
                }
            },
            initDrawTool: function () {
                require(['esri/toolbars/draw', 'esri/geometry/geometryEngine'], function (Draw, geometryEngine) {
                    giscom.geometryEngine = geometryEngine;
                    var drawTools = giscom.tools.drawTools;
                    drawTools.identifyTool.tool = new Draw(giscom.mapObj.map);
                    drawTools.identifyTool.drawEndEvtHandle = drawTools.identifyTool.tool.on('draw-end', function (evt) {
                        if (drawTools.identifyTool.drawEndEvt)
                            drawTools.identifyTool.drawEndEvt(evt);
                    });
                    drawTools.point.tool = new Draw(giscom.mapObj.map);
                    drawTools.point.drawEndEvtHandle = drawTools.point.tool.on('draw-end', function (evt) {
                        if (drawTools.point.drawEndEvt)
                            drawTools.point.drawEndEvt(evt);
                    });
                    drawTools.multiPoint.tool = new Draw(giscom.mapObj.map);
                    drawTools.multiPoint.drawEndEvtHandle = drawTools.multiPoint.tool.on('draw-end', function (evt) {
                        if (drawTools.multiPoint.drawEndEvt)
                            drawTools.multiPoint.drawEndEvt(evt);
                    });
                    drawTools.polyline.tool = new Draw(giscom.mapObj.map);
                    drawTools.polyline.drawEndEvtHandle = drawTools.polyline.tool.on('draw-end', function (evt) {
                        if (drawTools.polyline.drawEndEvt)
                            drawTools.polyline.drawEndEvt(evt);
                    });
                    drawTools.polygon.tool = new Draw(giscom.mapObj.map);
                    drawTools.polygon.drawEndEvtHandle = drawTools.polygon.tool.on('draw-end', function (evt) {
                        if (drawTools.polygon.drawEndEvt)
                            drawTools.polygon.drawEndEvt(evt);
                    });

                    for (var name in esri.bundle.toolbars.draw) {
                        var s = esri.bundle.toolbars.draw[name];
                        if (typeof (s) === 'string') {
                            giscom.tools.drawTools.tips[name] = s;
                        }
                    }
                });
            }
        }
    },
    graphicsLayers: [
        {
            id: 'drawLayer'
        }
    ],
    symbols: {
        textSymbol: null,
        markerSymbol: null,
        lineSymbol: null,
        fillSymbol: null,
        selectedSymbol: null,
        selectedSymbol2: null,
        initSymbols: function () {
            require(["esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleMarkerSymbol", 'esri/symbols/TextSymbol', 'esri/symbols/Font'],
                function (SimpleFillSymbol, SimpleLineSymbol, SimpleMarkerSymbol, TextSymbol, Font) {
                    giscom.symbols.markerSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 6, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new dojo.Color([238, 59, 59]), 2), new dojo.Color([255, 255, 255]));
                    giscom.symbols.lineSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new dojo.Color([238, 59, 59]), 2);
                    giscom.symbols.fillSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new dojo.Color([238, 59, 59]), 2), new dojo.Color([255, 255, 0, 0.3]));
                    giscom.symbols.selectedSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new dojo.Color([238, 59, 59]), 8), new dojo.Color([238, 59, 59, 0.2]));
                    giscom.symbols.selectedSymbol2 = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new dojo.Color([0, 255, 255]), 4), new dojo.Color([0, 255, 255, 0.1]));
                    var font = new Font('16px', Font.STYLE_ITALIC, Font.VARIANT_NORMAL, Font.WEIGHT_BOLD, 'Microsoft YaHei');
                    giscom.symbols.textSymbol = new TextSymbol(' ', font, new esri.Color([238, 20, 20, 1]));
                });
        }
    },
    geometryEngine: null,
    initMap: function (mapId, callback) {
        require(['esri/map'], function (Map) {
            var map = new Map(mapId, giscom.settings.map);


            giscom.mapObj.map = map;
            if (callback) {
                callback(map);
            }
        });
    },
    initScalebar: function (callback) {
        require(['esri/dijit/Scalebar'], function (Scalebar) {
            giscom.settings.scalebar.map = giscom.mapObj.map;
            var scalebar = new Scalebar(giscom.settings.scalebar);
            giscom.mapObj.scalebar = scalebar;
            if (callback) {
                callback(scalebar);
            }
        });
    },
    initOverView: function (layer, callback) {
        //不能使用外网天地图，获取不到layerInfo，会报错
        require(['esri/dijit/OverviewMap'], function (OverviewMap) {
            giscom.settings.overView.map = giscom.mapObj.map;
            if (layer)
                giscom.settings.overView.baseLayer = layer;
            var overView = new OverviewMap(giscom.settings.overView);
            overView.startup();
            giscom.mapObj.overView = overView;
            if (callback) {
                callback(overView);
            }
        });
    },
    initOverView2: function (mapDom, bOpen) {
        var mapOverviewCls = 'ct-map-overview';
        var mapOverviewCloseCls = 'ct-map-overview-close';
        var $dom = $('#' + mapDom);
        var s = giscom.settings.overView2;
        var overViewMap = null;
        function init() {
            var $mapOverView = $('<div id="ctMapOverView" class="ct-map-overview"><div class="ct-map-overview-btn"></div></div>');
            $mapOverView.find('.ct-map-overview-btn').click(function () {
                $mapOverView.toggleClass(mapOverviewCloseCls);
            });
            if (bOpen == false) {
                $mapOverView.find('.ct-map-overview-btn').click();
            }
            $mapOverView.appendTo($dom);
            require(['esri/map', 'esri/geometry/Point', 'esri/geometry/Extent', 'esri/symbols/PictureMarkerSymbol', 'esri/layers/ArcGISDynamicMapServiceLayer', 'esri/layers/ArcGISTiledMapServiceLayer'], function (Map, Point, Extent, PictureMarkerSymbol, ArcGISDynamicMapServiceLayer, ArcGISTiledMapServiceLayer) {
                overViewMap = new Map('ctMapOverView', giscom.settings.map);
                var extent = new Extent(s.extent);
                //extent = extent.expand(0.6);
                var layer = new ArcGISDynamicMapServiceLayer(s.url);
                overViewMap.addLayer(layer);
                if (overViewMap.loaded) {
                    overViewMap.setExtent(extent);
                    $('<div style="position: absolute;top:0;left:0;height:100%;width:100%;z-index:8;"></div>').appendTo($mapOverView);
                }
                else {
                    overViewMap.on('load', function () {
                        overViewMap.setExtent(extent);
                        $('<div style="position: absolute;top:0;left:0;height:100%;width:100%;z-index:8;"></div>').appendTo($mapOverView);
                    });
                }

                var symbol = new PictureMarkerSymbol(s.path, 32, 32);
                symbol.setOffset(0, 16);
                map.on('extent-change', function () {
                    overViewMap.graphics.clear();
                    var centerPnt = map.extent.getCenter();
                    var graphic = new esri.Graphic(centerPnt, symbol);
                    overViewMap.graphics.add(graphic);
                });
            });
        }
        var map = giscom.mapObj.map;
        if (map.loaded) {
            init();
        } else {
            var handle = map.on('load', function () {
                handle.remove();
                init();
            });
        }
    },
    addLayer: function (url, type, data, options, index, evts, callback) {
        require(['esri/layers/ArcGISDynamicMapServiceLayer', 'esri/layers/ArcGISTiledMapServiceLayer'],
            function (ArcGISDynamicMapServiceLayer, ArcGISTiledMapServiceLayer) {
                var layerConstruct = null;
                switch (type) {
                    case giscom.layerTypes.D:
                        layerConstruct = ArcGISDynamicMapServiceLayer;
                        break;
                    case giscom.layerTypes.T:
                        layerConstruct = ArcGISTiledMapServiceLayer;
                        break;
                    default:
                        return false;

                }
                var layer = new layerConstruct(url, options);
                if (data) {
                    layer.data = data;
                }
                giscom.mapObj.map.addLayer(layer, index);
                if (evts) {
                    for (var name in evts) {
                        layer.on(name, evts[name]);
                    }
                }
                if (callback) {
                    callback(layer);
                }
            });
    },
    removeLayer: function (id) {
        var map = giscom.mapObj.map;
        var layer = map.getLayer(id);
        if (layer) {
            map.removeLayer(layer);
        }
    },
    baseMap: {
        baseLayers: [
            {
                id: 'BASELAYER0',
                //layerUrl: 'http://32.63.213.35:6080/arcgis/rest/services/vector80PM/MapServer',
                layerUrl: 'http://' + globalIP + ':6080/arcgis/rest/services/XQ_TDTDT2/MapServer',
                //layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/XQ_XZQH/MapServer',
                type: function () { return giscom.layerTypes.T },
                name: '影像',
                imgUrl: '../../../zspt/images/basemap-yx.png',
                opacityable: false,
                queryable: false
            },
            {
                id: 'BASELAYER1',
                //layerUrl: 'http://32.63.213.35:6080/ArcGIS/rest/services/raster80PM/MapServer',
                //layerUrl: 'http://192.168.10.151:6080/arcgis/rest/services/XQ_IMAGE2013/MapServer',
                //layerUrl: 'http://' + globalIP + ':6080/arcgis/rest/services/XQ_IMAGE2013/MapServer',
                layerUrl: 'http://' + globalIP + ':6080/arcgis/rest/services/XQ_IMAGE2014/MapServer',
                type: function () { return giscom.layerTypes.T },
                name: '矢量',
                imgUrl: '../../zspt/images/basemap-sl.png',
                opacityable: false,
                queryable: false
            }],
        initBaseMap: function (domId) {
            function baseMapToggle() {
                var i = iIndex % 2;
                var layerInfo = giscom.baseMap.baseLayers[i];
                var currentBaseLayer = giscom.mapObj.map.getLayer(giscom.baseMap.baseLayers[(iIndex + 1) % 2].id);
                if (currentBaseLayer)
                    giscom.mapObj.map.removeLayer(currentBaseLayer);
                giscom.addLayer(layerInfo.layerUrl, layerInfo.type(), layerInfo, {
                    id: layerInfo.id
                }, 0);
                root.find('.basemap-name').html(layerInfo.name);
                root.find('.basemap-img').css('background', 'url(' + layerInfo.imgUrl + ')');
                iIndex++;
            }
            var root = $('#' + domId);
            var iIndex = 0;
            var html = '<div class="basemap-img"></div><div class="basemap-name"></div>';
            root.html(html);
            root.addClass('basemap-toggle');
            root.click(baseMapToggle);
            root.click();
        }
    },
    graphics: {
        add: function (graphic) {
            giscom.mapObj.map.graphics.add(graphic);
        },
        flashGraphic: function (graphic, bHold, bCenter, bCenterAndZoom, callback) {
            var map = giscom.mapObj.map;

            function flash(graphic) {
                giscom.mapObj.map.graphics.add(graphic);
                var node = graphic.getNode();

                if (bHold)
                    $(node).animate({ opacity: 0 }, 1000).animate({ opacity: 1 }, 800, function () {
                        if (callback)
                            callback(graphic);
                    });
                else
                    $(node).animate({ opacity: 0 }, 800).animate({ opacity: 1 }, 800).animate({ opacity: 0 }, 600, function () {
                        if (callback)
                            callback(graphic);
                    });
            }
            if (bCenter) {
                var centerPoint = graphic.geometry.getCentroid();
                var handle = map.on('extent-change', function () {
                    handle.remove();
                    flash(graphic);
                });
                map.centerAt(centerPoint);
            } else if (bCenterAndZoom) {
                var extent = graphic.geometry.getExtent().expand(1.5);
                var handle = map.on('extent-change', function () {
                    handle.remove();
                    flash(graphic);
                });
                map.setExtent(extent);
            } else {
                flash(graphic);
            }
        },
        flashGraphics: function (graphics, bHold, bCenter, bCenterAndZoom, callback) {
            var map = giscom.mapObj.map;

            function flash(graphics) {
                var nodes = [];
                for (var i = 0; i < graphics.length; i++) {
                    var graphic = graphics[i];
                    giscom.mapObj.map.graphics.add(graphic);
                    var node = graphic.getNode();
                    nodes.push(node);
                }

                if (bHold)
                    $(nodes).animate({ opacity: 0 }, 1000).animate({ opacity: 1 }, 800, function () {
                        if (callback)
                            callback(graphics);
                    });
                else
                    $(nodes).animate({ opacity: 0 }, 800).animate({ opacity: 1 }, 800).animate({ opacity: 0 }, 600, function () {
                        if (callback)
                            callback(graphics);
                    });
            }
            var extent = esri.graphicsExtent(graphics);
            if (bCenter) {
                var centerPoint = extent.getCentroid();
                var handle = map.on('extent-change', function () {
                    handle.remove();
                    flash(graphics);
                });
                map.centerAt(centerPoint);
            } else if (bCenterAndZoom) {
                var handle = map.on('extent-change', function () {
                    handle.remove();
                    flash(graphics);
                });
                map.setExtent(extent.expand(1.5));
            } else {
                flash(graphics);
            }
        }
    },
    initLayerControl: function ($container) {
        var map = giscom.mapObj.map;
        managerRefresh();
        map.on('layer-add', function () {
            managerRefresh();
        });

        map.on('layer-remove', function () {
            managerRefresh();
        });

        function managerRefresh() {
            $container.html('');
            var layerIds = map.layerIds;
            for (var i = 0; i < layerIds.length; i++) {
                var layerId = layerIds[i];
                var layer = map.getLayer(layerId);
                var data = layer.data;
                if (data.opacityable != false) {
                    $('<div class="layer-title">' + data.name + '：</div>').appendTo($container);
                    var slider = $('<div></div>');
                    slider.data('layer', data).appendTo($container);
                    (function (slider, layer) {
                        var opacity = layer.opacity;
                        slider.slider({
                            height: 50,
                            width: 240,
                            value: opacity * 100,
                            min: 0,
                            max: 100,
                            step: 1,
                            showTip: true,
                            onChange: function (newValue, oldValue) {
                                layer.setOpacity(newValue / 100);
                            }
                        });
                    })(slider, layer);
                }
            }
        }
    },
    clearGraphicsLayer: function () {
        this.mapObj.map.graphics.clear();
    },
    centerRegion: function (region) {
        /*
        region data format:
        {
            "type": "XZQ",
            "dm": "320292001",
            "mc": "旺庄街道"
        }
        region type:'XZQ'、'XZQJD'、'PQ'
        */

        switch (region.type) {
            case 'XZQ':
                var url = allServices.xzq.url;
                var qField = 'XZQDM';
                break;
            case 'XZJD':
                var url = allServices.xzjd.url;
                var qField = 'XZZDM';
                break;
            case 'GYYQ':
                var url = allServices.gyyq.url;
                var qField = 'YQDM';
                break;
            default:
                return;
        }
        giscom.queryLayerByWhere(url, qField + "='" + region.dm + "'", function (results) {
            var features = results.features;
            if (features.length) {
                for (var i = 0; i < features.length; i++) {
                    var feature = features[i];
                    feature.setSymbol(giscom.symbols.selectedSymbol);
                }

                giscom.graphics.flashGraphics(features, false, false, true, function () {
                    giscom.clearGraphicsLayer();
                });
            }
        });
    },
    queryLayerByWhere: function (url, where, callback, returnGeometry, outFields, orderByFields) {
        require(['esri/tasks/query', 'esri/tasks/QueryTask'], function (Query, QueryTask) {
            var query = new Query();
            if (returnGeometry == false) {
                query.returnGeometry = false;
            } else {
                query.returnGeometry = true;
            }
            if (outFields)
                query.outFields = outFields;
            else {
                query.outFields = ['*'];
            }
            query.outSpatialReference = giscom.mapObj.map.spatialReference;
            query.where = where;
            if (orderByFields)
                query.orderByFields = orderByFields;
            var queryTask = new QueryTask(url);
            queryTask.execute(query, callback, function (error) {
                com.bottomTip.showWarn('未能正确执行查询！');
            });
        });
    },
    queryLayerByGeometry: function (url, geometry, callback) {
        require(['esri/tasks/query', 'esri/tasks/QueryTask'], function (Query, QueryTask) {
            var q = new Query();
            var qt = new QueryTask(url);
            q.returnGeometry = true;
            q.geometry = geometry;
            q.outSpatialReference = map.spatialReference;
            q.outFields = ['*'];
            qt.execute(q, callback);
        });
    },
    queryLayerInMap: function (geometry, callback) {
        var map = giscom.mapObj.map;
        var queryLayerInfos = giscom.getQueryableLayers();
        if (queryLayerInfos.length == 0) {
            com.bottomTip.showInfo('没有找到可以查询的地图，请先打开地图！');
            return;
        }
        var queryResults = [];
        var errorCount = 0;
        for (var i = 0; i < queryLayerInfos.length; i++) {
            (function (layerInfo) {
                require(['esri/tasks/query', 'esri/tasks/QueryTask'], function (Query, QueryTask) {
                    var q = new Query();
                    var qt = new QueryTask(layerInfo.url + '/' + layerInfo.index);
                    q.returnGeometry = true;
                    q.geometry = geometry;
                    q.outSpatialReference = map.spatialReference;
                    //if (layerInfo.outFields)
                    q.outFields = layerInfo.outFields ? layerInfo.outFields : ['*'];
                    qt.execute(q, function (r) {
                        if (r.features.length) {
                            layerInfo.results = r;
                            queryResults.push(layerInfo);
                        } else {
                            errorCount++;
                        }
                        if ((errorCount + queryResults.length) === queryLayerInfos.length) {
                            callback(queryResults);
                        }
                    }, function () {
                        errorCount++;
                    });
                });
            })(queryLayerInfos[i]);
        }
    },
    getQueryableLayers: function () {
        var map = giscom.mapObj.map;
        var layerIds = map.layerIds;
        var queryLayerInfos = [];
        for (var i = 0; i < layerIds.length; i++) {
            var layerId = layerIds[i];
            var layer = map.getLayer(layerId);
            var data = layer.data;
            //图层可查询
            if (data && data.queryable != false) {
                if (data.queryLayers && data.queryLayers.length) {
                    for (var j = 0; j < data.queryLayers.length; j++) {
                        var l = data.queryLayers[j];
                        var o = {
                            name: data.name,
                            id: data.id,
                            index: l.index,
                            url: layer.url,
                            subLayerId: layer.layerInfos[l.index].id,
                            subLayerName: layer.layerInfos[l.index].name
                        };

                        if (l.qFields) {
                            o.outFields = l.qFields;
                        } else {
                            o.outFields = ['*'];
                        }

                        if (l.dFields) {
                            o.displayFields = l.dFields;
                        }
                        queryLayerInfos.push(o);
                    }
                } else {
                    for (var j = 0; j < layer.layerInfos.length; j++) {
                        var l = layer.layerInfos[j];
                        if (l.subLayerIds == null) {
                            var o = {
                                name: data.name,
                                id: data.id,
                                index: j,
                                url: layer.url,
                                subLayerId: l.id,
                                subLayerName: l.name
                            };
                            queryLayerInfos.push(o);
                        }
                    }
                }
            }
        }
        return queryLayerInfos;
    },
    exportMap: function () {
        require(['esri/tasks/PrintTemplate', 'esri/tasks/PrintParameters', 'esri/tasks/PrintTask'], function (PrintTemplate, PrintParameters, PrintTask) {
            var pUrl = 'http://' + globalIP + ':6080/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task';
            var pTask = new PrintTask(pUrl);

            var template = new PrintTemplate();
            var $map = $('.map');
            template.exportOptions = {
                width: $map.width(),
                height: $map.height(),
                dpi: 96
            };
            template.format = "png8";
            template.layout = "MAP_ONLY";
            template.preserveScale = false;

            var params = new PrintParameters();
            params.map = giscom.mapObj.map;
            params.template = template;

            pTask.execute(params, function (r) {
                window.open(r.url);
            }, function (e) {
                com.bottomTip.showWarn('地图输出错误！');
            });
        });
    }
}