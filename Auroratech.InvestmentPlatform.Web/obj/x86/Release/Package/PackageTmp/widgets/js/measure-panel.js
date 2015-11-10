(function () {
    var $measurePanel = $('.measure-panel');
    var dropDown = $measurePanel.find('.dropdown');

    var $unitsDropDown = $measurePanel.find('.units-dropdown');
    var lDropDown = $unitsDropDown.first();
    for (var i = 0; i < lengthUnits.length; i++) {
        var config = lengthUnits[i];
        var $li = $('<li>' + config.name + '</li>');
        $li.data('config', config);
        $li.appendTo(lDropDown);
    }
    var aDropDown = $unitsDropDown.last();
    for (var i = 0; i < areaUnits.length; i++) {
        var config = areaUnits[i];
        var $li = $('<li>' + config.name + '</li>');
        $li.data('config', config);
        $li.appendTo(aDropDown);
    }
    dropDown.find('li').click(function () {
        var $this = $(this);
        var config = $this.data('config');
        var txt = $this.html();
        $this.parent().parent().find('.units-text').html(txt).data('config', config);
    });
    lDropDown.find('li').first().click();
    aDropDown.find('li').first().click();
    dropDown.click(function () {
        var $this = $(this);
        $this.find('.units-dropdown').slideToggle(200);
    });

    function getCurrentUnits() {
        var lConfig = $measurePanel.find('.length-setting .units-text').data('config');
        var aConfig = $measurePanel.find('.area-setting .units-text').data('config');
        return {
            lConfig: lConfig,
            aConfig: aConfig
        };
    }

    function clearResults() {
        $measurePanel.find('.measure-results').html('');
        giscom.clearGraphicsLayer();
    }
    var resultContainer = $measurePanel.find('.measure-results');
    var lOn = false;
    var aOn = false;


    //长度量算
    var lineTool = $measurePanel.find('.measure-tools-line');
    lineTool.click(function () {
        $(this).toggleClass('linetool-s');
        var tools = giscom.tools.drawTools;
        tools.deactivate();
        lOn = !lOn;
        if (lOn) {
            aOn = false;
            polygonTool.removeClass('polygontool-s');
            tools.polyline.activate();
            tools.polyline.drawEndEvt = function (evt) {
                var g = evt.geometry;
                var lUnits = getCurrentUnits().lConfig;
                var l = giscom.geometryEngine.planarLength(g);
                l = l * lUnits.multiply;
                var text = '长度：' + l.toFixed(2) + lUnits.name;
                resultContainer.html(text);
                var graphic = new esri.Graphic(g, giscom.symbols.lineSymbol);
                giscom.mapObj.map.graphics.add(graphic);

                var centerPoint = g.getExtent().getCenter();
                var font = new esri.symbol.Font('16px', esri.symbol.Font.STYLE_ITALIC, esri.symbol.Font.VARIANT_NORMAL, esri.symbol.Font.WEIGHT_BOLD, 'Microsoft YaHei');
                var symbolL = new esri.symbol.TextSymbol(text, font, new esri.Color([238, 20, 20, 1]));
                var graphicTxt = new esri.Graphic(centerPoint, symbolL);
                giscom.mapObj.map.graphics.add(graphicTxt);
            }
            tools.multiPoint.activate({ showTooltips: false });
        }
    });
    //面积量算
    var polygonTool = $measurePanel.find('.measure-tools-polygon');
    polygonTool.click(function () {
        polygonTool.toggleClass('polygontool-s');
        var tools = giscom.tools.drawTools;
        tools.deactivate();
        aOn = !aOn;
        if (aOn) {
            lineTool.removeClass('linetool-s');
            lOn = false;
            tools.polygon.activate();
            tools.polygon.drawEndEvt = function (evt) {
                var g = evt.geometry;
                var units = getCurrentUnits()
                var lUnits = units.lConfig;
                var aUnits = units.aConfig;
                var l = giscom.geometryEngine.planarLength(g);
                l = l * lUnits.multiply;
                var a = giscom.geometryEngine.planarArea(g);
                a = a * aUnits.multiply;
                var ltxt = '长度：' + l.toFixed(2) + lUnits.name;
                var atxt = '面积：' + a.toFixed(2) + aUnits.name;
                var text = ltxt + '<br/>' + atxt;
                resultContainer.html(text);
                var graphic = new esri.Graphic(g, giscom.symbols.fillSymbol);
                giscom.mapObj.map.graphics.add(graphic);

                var centerPoint = g.getExtent().getCenter();

                var font = new esri.symbol.Font('16px', esri.symbol.Font.STYLE_ITALIC, esri.symbol.Font.VARIANT_NORMAL, esri.symbol.Font.WEIGHT_BOLD, 'Microsoft YaHei');
                var symbolL = new esri.symbol.TextSymbol(ltxt, font, new esri.Color([238, 20, 20, 1]));
                var symbolA = new esri.symbol.TextSymbol(atxt, font, new esri.Color([238, 20, 20, 1]));
                symbolA.setOffset(0, -30);
                var graphicTxtL = new esri.Graphic(centerPoint, symbolL);
                giscom.mapObj.map.graphics.add(graphicTxtL);


                giscom.symbols.textSymbol.setOffset(0, 30);
                var graphicTxtA = new esri.Graphic(centerPoint, symbolA);
                giscom.mapObj.map.graphics.add(graphicTxtA);
            }
            tools.multiPoint.activate({ showTooltips: false });
        }
    });
    //结果舍弃
    $measurePanel.find('.measure-tools-drop').click(function () {
        clearResults();
    });
    com.toolTip.init($measurePanel);
    $measurePanel.data('config').deactivate = function () {
        giscom.tools.drawTools.deactivate();
        lineTool.removeClass('linetool-s');
        polygonTool.removeClass('polygontool-s');
        lOn = false;
        aOn = false;
        clearResults();
    }
})();