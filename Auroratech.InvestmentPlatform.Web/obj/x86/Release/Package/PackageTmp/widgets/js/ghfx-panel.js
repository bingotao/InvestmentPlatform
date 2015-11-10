(function () {
    function initTabs(myTabs, sIndex) {
        var tabsNavSCls = 'tabs-nav-selected';
        var tabsSCls = 'tabs-selected';
        var tabsNav = $('.tabs-nav', myTabs);
        var tabsNavs = $('li', tabsNav);
        var tabsContainer = $('.tabs-container', myTabs);
        var tabs = $('>div', tabsContainer);
        tabsContainer.height(myTabs.height() - tabsNav.height());
        tabsNavs.click(function () {
            var $this = $(this);
            tabsNavs.removeClass(tabsNavSCls);
            $this.addClass(tabsNavSCls);
            var idx = $this.index();
            tabs.removeClass(tabsSCls);
            $(tabs[idx]).addClass(tabsSCls);
        });
        $(tabsNavs[sIndex]).click();
    }

    var $app = $('.ghfx-panel');
    $app.find('.fileform')[0].onchange = function (evt) {
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
    var config = $app.data('config');
    config.deactivate = function () {
        bShOn = false;
        giscom.tools.drawTools.deactivate();
    }
    var dropDown = $app.find('.dropdown');
    var $resultsContainer = $('.results-container');
    $resultsContainer.html('<div class="tabs-nav"><ul><li>允许建设区</li><li>有条件建设区</li><li>限制建设区</li><li>禁止建设区</li></ul></div><div class="tabs-container"><div><table><tr><th>编号</th><th>行政区名称</th><th>管制区编码</th><th>管制区面积</th><th>相交面积</th></tr><tr><td>1</td><td>过家桥社区</td><td>01592</td><td>430平方米</td><td>212平方米</td></tr><tr><td>2</td><td>过家桥社区</td><td>01539</td><td>218平方米</td><td>18平方米</td></tr><tr><td>3</td><td>过家桥社区</td><td>01572</td><td>312平方米</td><td>6平方米</td></tr><tr><td>4</td><td>过家桥社区</td><td>01561</td><td>44平方米</td><td>44平方米</td></tr></table></div><div><table><tr><th>编号</th><th>行政区名称</th><th>管制区编码</th><th>管制区面积</th><th>相交面积</th></tr><tr><td>1</td><td>过家桥社区</td><td>12587</td><td>12平方米</td><td>12平方米</td></tr><tr><td>2</td><td>过家桥社区</td><td>13897</td><td>632平方米</td><td>98平方米</td></tr><tr><td>3</td><td>过家桥社区</td><td>14023</td><td>129平方米</td><td>18平方米</td></tr></table></div><div><table><tr><th>编号</th><th>行政区名称</th><th>管制区编码</th><th>管制区面积</th><th>相交面积</th></tr><tr><td>1</td><td>过家桥社区</td><td>23192</td><td>123平方米</td><td>123平方米</td></tr></table></div><div><table><tr><th>编号</th><th>行政区名称</th><th>管制区编码</th><th>管制区面积</th><th>相交面积</th></tr><tr><td>1</td><td>过家桥社区</td><td>123123</td><td>546平方米</td><td>112平方米</td></tr></table></div></div>');
    initTabs($resultsContainer, 0);
    $app.find('.btn-detials').click(function () {
        com.bottomResults.show();
    });
    var $unitsDropDown = $('.ghfx-panel .dropdown .units-dropdown');

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

    dropDown.click(function () {
        var $this = $(this);
        $this.find('.units-dropdown').slideToggle(200);
    });

    var $total = $app.find('.total');
    var $yxjsq = $app.find('.txt-yxjsq');
    var $ytjjsq = $app.find('.txt-ytjjsq');
    var $xzjsq = $app.find('.txt-xzjsq');
    var $jzjsq = $app.find('.txt-jzjsq');

    function setValues(total, yxjsq, ytjjsq, xzjsq, jzjsq, dw) {
        var s = total == jzjsq ? '符合规划！' : '不符合规划！';
        $total.html('总面积：' + total + ' ' + dw.name + ' ' + s);
        $yxjsq.html('允许建设区：' + yxjsq + ' ' + dw.name);
        $ytjjsq.html('有条件建设区：' + ytjjsq + ' ' + dw.name);
        $xzjsq.html('限制建设区：' + xzjsq + ' ' + dw.name);
        $jzjsq.html('禁止建设区：' + jzjsq + ' ' + dw.name);
    }
    function clearResults() {
        giscom.clearGraphicsLayer();
        $app.find('.ghfx-result').css('display', 'none');
        currentGeometry = null;
    }

    function getCurrentUnit() {
        return $app.find('.units-text').data('config');
    }

    var currentGeometry = null;
    function drawGraphic(evt) {
        bShOn = false;
        giscom.clearGraphicsLayer();
        var g = evt.geometry;
        currentGeometry = g;
        var graphic = new esri.Graphic(g, giscom.symbols.fillSymbol);
        giscom.graphics.add(graphic);
        giscom.tools.drawTools.deactivate();
    }
    var bShOn = false;
    $app.find('.sh').click(function () {
        bShOn = !bShOn;
        if (bShOn)
            giscom.tools.drawTools.initDrawPolygon(drawGraphic);
        else {
            giscom.tools.drawTools.deactivate();
        }
    });

    $app.find('.qc').click(function () {
        clearResults();
    });
    $app.find('.fx').click(function () {
        if (currentGeometry) {
            var dw = getCurrentUnit();
            setValues(1241, 821, 208, 123, 112, dw);
            $app.find('.ghfx-result').css('display', 'block');

        } else {
            com.bottomTip.showInfo('请绘制或导入图形，然后进行分析！');
        }
    });
})();