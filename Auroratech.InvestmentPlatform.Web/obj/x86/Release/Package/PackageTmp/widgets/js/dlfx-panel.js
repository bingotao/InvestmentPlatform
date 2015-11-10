(function () {
    var $dlfxPanel = $('.dlfx-panel');
    var config = $dlfxPanel.data('config');
    config.deactivate = function () {
        bShOn = false;
        giscom.tools.drawTools.deactivate();
    }
    var dropDown = $dlfxPanel.find('.dropdown');
    var $unitsDropDown = $('.dlfx-panel .dropdown .units-dropdown');

    var $zmj = $dlfxPanel.find('.zmj');
    var $jsyd = $dlfxPanel.find('.jsyd');
    var $nyd = $dlfxPanel.find('.nyd');
    var $gd = $dlfxPanel.find('.gd');
    var $wlyd = $dlfxPanel.find('.wlyd');

    function setValues(zmj, jsyd, nyd, gd, wlyd, dw) {
        $zmj.html('总面积：' + zmj + ' ' + dw.name);
        $jsyd.html('建设用地：' + jsyd + ' ' + dw.name);
        $nyd.html('农 用 地：' + jsyd + ' ' + dw.name);
        $gd.html('耕地：' + gd + ' ' + dw.name);
        $wlyd.html('未利用地：' + jsyd + ' ' + dw.name);
    }
    function clearResults() {
        giscom.clearGraphicsLayer();
        $dlfxPanel.find('.dlfx-result').css('display', 'none');
        currentGeometry = null;
    }

    function getCurrentUnit() {
        return $dlfxPanel.find('.units-text').data('config');
    }

    var aDropDown = $unitsDropDown.first();
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

    dropDown.find('li').first().click();
    var currentGeometry = null;
    function drawGraphic(evt) {
        giscom.clearGraphicsLayer();
        var g = evt.geometry;
        currentGeometry = g;
        var graphic = new esri.Graphic(g, giscom.symbols.fillSymbol);
        giscom.graphics.add(graphic);
        giscom.tools.drawTools.deactivate();
        bShOn = false;
    }
    var bShOn = false;
    $dlfxPanel.find('.sh').click(function () {
        bShOn = !bShOn;
        if (bShOn)
            giscom.tools.drawTools.initDrawPolygon(drawGraphic);
        else {
            giscom.tools.drawTools.deactivate();
        }
    });

    $dlfxPanel.find('.fileform')[0].onchange = function (evt) {
        com.bottomTip.show('上传成功！');
        var gJson = {
            'rings': [[
                [40540051.70869512, 3491226.746970289],
                [40540101.81434135, 3491381.835875298],
                [40540483.57164599, 3491245.834835521],
                [40540431.080016606, 3491088.359947358],
                [40540051.70869512, 3491226.746970289]
            ]],
            'spatialReference': { 'wkid': 2364 }
        };
        var g = new esri.geometry.Polygon(gJson);
        currentGeometry = g;
        var graphic = new esri.Graphic(g, giscom.symbols.fillSymbol);
        giscom.graphics.flashGraphic(graphic, true, false, true);
    };
    $dlfxPanel.find('.btn-detials').click(function () {
        window.open('../test/dlfx-result.html');
    });
    $dlfxPanel.find('.dr').click(function () {

    });
    $dlfxPanel.find('.qc').click(function () {
        clearResults();
    });
    $dlfxPanel.find('.fx').click(function () {
        if (currentGeometry) {
            var dw = getCurrentUnit();
            setValues(1241, 821, 208, 123, 112, dw);
            $dlfxPanel.find('.dlfx-result').css('display', 'block');
        } else {
            com.bottomTip.showInfo('请绘制或导入图形，然后进行分析！');
        }
    });
    dropDown.click(function () {
        var $this = $(this);
        $this.find('.units-dropdown').slideToggle(200);
    });
})();