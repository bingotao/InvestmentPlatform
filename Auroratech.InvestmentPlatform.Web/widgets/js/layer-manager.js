(function () {
    var $layerManager = $('.app-item .layer-manager-panel');
    var h = $layerManager.height();
    $layerManager.height(h - 100);
    $layerManager.slimScroll({
        height: h - 80,
        alwaysVisible: true
    });
    giscom.initLayerControl($layerManager);
})();