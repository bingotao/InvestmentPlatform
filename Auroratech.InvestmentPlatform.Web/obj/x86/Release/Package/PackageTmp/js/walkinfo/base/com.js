var com = {
    /* 自定义tooltip */
    toolTip: {
        toolTipCls: 'mytip',
        tipVisibleCls: 'o1',
        tipDataField: 'tip',
        tipObj: null,
        /*  初始化toolTip
            参数：jQuery对象，初始化该jQuery对象下的所有toolTip */
        init: function ($region) {
            var $body = $('body');
            $region = $region ? $region : $body;
            var $tip = this.tipObj;
            if (!this.tipObj) {
                $tip = $('<div class="mytooltip"></div>');
                this.tipObj = $tip;
                $tip.appendTo($body);
                $(document).mousemove(function (evt) {

                    var position = {
                        top: evt.pageY > (document.documentElement.clientHeight - 50) ? (evt.pageY - 20) : (evt.pageY + 20),
                        //处理鼠标靠最右边的情况
                        left: evt.pageX > (document.documentElement.clientWidth - 80) ? (evt.pageX - 80) : (evt.pageX + 20)
                    }
                    $tip.css(position);
                });
            }
            $region.find('.' + this.toolTipCls).hover(function () {
                var s = $(this).data(com.toolTip.tipDataField);
                if (s) {
                    $tip.html(s);
                    $tip.addClass(com.toolTip.tipVisibleCls);
                }
            }, function () {
                $tip.removeClass(com.toolTip.tipVisibleCls);
            });
            if ($region.hasClass(this.toolTipCls))
                $region.hover(function () {
                    var s = $(this).data(com.toolTip.tipDataField);
                    if (s) {
                        $tip.html(s);
                        $tip.addClass(com.toolTip.tipVisibleCls);
                    }
                }, function () {
                    $tip.removeClass(com.toolTip.tipVisibleCls);
                });
        }
    },
    /* 自定义底部提示栏 */
    bottomTip: {
        slideSpeed: 500,
        delayValue: 5000,
        bHover: false,
        tipObj: null,
        tipContentObj: null,
        tipCls: 'mybottomtip',
        tipConatinerCls: 'tip-container',
        tipContentCls: 'tip-content',
        tipDataField: 'tip',
        tipCloseCls: 'btn-bottomtip-close',
        warnCls: 'tip-warn',
        infoCls: 'tip-info',
        show: function (content) {
            if (content)
                this.tipContentObj.html(content);
            this.tipObj.slideDown(com.bottomTip.slideSpeed);
        },
        showWarn: function (content) {
            this.tipObj.addClass(this.warnCls);
            this.show(content);
        },
        showInfo: function (content) {
            this.tipObj.addClass(this.infoCls);
            this.show(content);
        },
        init: function ($region) {
            if (!this.tipObj) {
                this.tipObj = $('.' + this.tipConatinerCls);
                this.tipContentObj = $('.' + this.tipContentCls);
                $('.' + this.tipCloseCls).click(function () {
                    com.bottomTip.tipObj.slideUp(com.bottomTip.slideSpeed);
                });
                setInterval(function () {
                    if (!com.bottomTip.bHover) {
                        com.bottomTip.tipObj.slideUp(com.bottomTip.slideSpeed, function () {
                            com.bottomTip.tipObj.removeClass(com.bottomTip.warnCls + ' ' + com.bottomTip.infoCls);
                        });
                    }
                }, com.bottomTip.delayValue);
            }
            $region = $region ? $region : $('body');
            $region.find('.' + this.tipCls).hover(function () {
                var tip = $(this).data(com.bottomTip.tipDataField);
                com.bottomTip.show(tip);
                com.bottomTip.bHover = true;
            }, function () {
                com.bottomTip.bHover = false;
            });
        }
    },
    detailPanel:
       {
           onCls: 'map-tools-on',
           panel: null,
           title: null,
           details: null,
           init: function () {
               var panel = $('.feature-detail')
               this.panel = panel;
               this.title = panel.find('.feature-detail-title');
               var details = panel.find('.feature-details')
               this.details = details;
               this.details.slimScroll(
                {
                    height: 300,
                    alwaysVisible: true
                });
               var rClose = panel.find('.feature-detail-close');
               rClose.click(function () {
                   com.detailPanel.panel.removeClass(com.detailPanel.onCls);
               });
               panel.find('.featur-detail-copy').zclip({
                   path: '../js/extend/zClip/ZeroClipboard.swf',
                   copy: function () {
                       var d = details.data('data');
                       var s = '';
                       if (d) {
                           for (var name in d) {
                               s += name + '：' + d[name] + '\r\n';
                           }
                       }
                       return s;
                   },
                   afterCopy: function () {
                       com.bottomTip.show('复制成功！');
                   }
               });
           },
           setValue: function (data) {
               this.details.data('data', data);
               var s = com.getTable(data);
               this.details.html(s);
           },
           setTitle: function (title) {
               if (title) {
                   var l = title.length;
                   title = title.substr(0, 15) + (l > 15 ? '...' : '');
                   this.title.html(title);
               }
           },
           show: function () {
               this.panel.addClass(this.onCls);
           }
       },
    loadMould: function (config) {
        var cls = config.id;
        var htmlPath = '../widgets/mould/' + cls + '.html'
        $.ajax({
            async: true,
            url: htmlPath,
            success: function (result) {
                var $appContainer = $('.app-container');
                var app = $('<div class="app-item"></div>');
                app.data('config', config);
                app.appendTo($appContainer);
                $('.apps-current-app').html(config.name);
                $appContainer.find('.app-item').removeClass('z1');
                app.addClass(cls).addClass('z1');
                app.html(result);
                app.css('height', $appContainer.height());

                var oHead = document.getElementsByTagName('HEAD').item(0);
                var oScript = document.createElement("script");
                oScript.onload = function () {
                    var $bottomNav = $('<div class="mytip"></div>');
                    $bottomNav.data('tip', config.name);
                    $bottomNav.click(function () {
                        var index = $('.app-nav-small>div').index($(this));
                        com.appSwitch(index);
                    });

                    var activeApp = appConfig.getActiveApp();
                    if (activeApp) {
                        activeApp.bActive = false;
                        if (activeApp.deactivate)
                            activeApp.deactivate();
                    }
                    config.bActive = true;
                    if (config.activate)
                        config.activate();
                    $bottomNav.appendTo($('.app-nav-small'));
                    $bottomNav.parent().find('div').removeClass('app-nav-selected');
                    $bottomNav.addClass('app-nav-selected');
                    com.toolTip.init($bottomNav);
                };
                oScript.type = "text/javascript";
                oScript.src = '../widgets/js/' + cls + '.js';
                oHead.appendChild(oScript);

                //document.write('<script src="../widgets/js/' + cls + '.js"><\/script>');


            }, error: function () {
                com.bottomTip.showWarn('应用加载失败！');
            }
        });
    },
    initAppCenter: function (appConfig) {
        //var appCenter = $('.map-tools-container');
        //for (var i = 0; i < appConfig.length; i++) {
        //    var categoryItem = appConfig[i];
        //    var html = '<div class="map-tools-category"><div class="map-tools-category-title">' + categoryItem.name + '</div><div class="map-tools-category-tools"></div></div>';
        //    var category = $(html);
        //    var appBtnContainer = category.find('.map-tools-category-tools');
        //    for (var j = 0; j < categoryItem.apps.length; j++) {
        //        var app = categoryItem.apps[j];
        //        if (app.iconPath) {
        //            var appObj = $('<div class="app-btn" style="background:url(' + app.iconPath + ')"></div>');
        //        } else
        //            var appObj = $('<div class="app-btn">' + app.alias + '</div>');
        //        appObj.data('config', app);
        //        appObj.addClass(com.toolTip.toolTipCls);
        //        appObj.data('tip', app.name);
        //        appObj.appendTo(appBtnContainer);
        //    }
        //    category.appendTo(appCenter);
        //}
        /*
        var appCenter = $('.head-tools');

        for (var i = 0 ; i < appConfig.length ; i++) {
            var categoryItem = appConfig[i];
            if (i != 0) {
                var slider = $('<div class="head-tools-slider">|</div>');
                slider.appendTo(appCenter);
            }
            for (var j = 0; j < categoryItem.apps.length  ; j++) {
                var app = categoryItem.apps[j];
                var appObj = $('<div class="head-tool-item">' + app.alias + '</div>');
                appObj.data('config', app);
                appObj.addClass(com.toolTip.toolTipCls);
                appObj.data('tip', app.name);
                appObj.appendTo(appCenter);
            }
        }

        com.toolTip.init(appCenter);
        appCenter.find('.head-tool-item').click(function () {
            var $this = $(this);
            var config = $this.data('config');

            if (config.type == 'command') {
                config.execute();
            }
            else {
                if ($('.lslider').hasClass('slider-close')) {
                    $('.sliderbtn').click();
                }
                $('.slider-nav li').last().click();
                com.loadApp(config);
            }
        });*/
        var appCenter = $('.my-toolbar');
        for (var i = 0 ; i < appConfig.length ; i++) {
            var categoryItem = appConfig[i];

            if (categoryItem.apps.length == 1) {
                var app = categoryItem.apps[0];
                var appObj = $("<div class='my-tool'>" + app.alias + "</div>");
                appObj.data('config', app);
                appObj.appendTo(appCenter);
            } else {
                var $category = $('<div>' + categoryItem.name + '<div></div><ul></ul></div>');
                var $ul = $category.find('ul');
                for (var j = 0; j < categoryItem.apps.length  ; j++) {
                    var app = categoryItem.apps[j];
                    var appObj = $('<li class="my-tool">' + app.alias + '</li>');
                    appObj.data('config', app);
                    appObj.appendTo($ul);
                }
                $category.appendTo(appCenter);
            }
        }

        appCenter.find('.my-tool').click(function () {
            var $this = $(this);
            var config = $this.data('config');

            if (config.type == 'command') {
                config.execute();
            }
            else {
                if ($('.lslider').hasClass('slider-close')) {
                    $('.sliderbtn').click();
                }
                $('.slider-nav li').last().click();
                com.loadApp(config);
            }
        });

        //初始化 app导航切换
        var $appPre = $('.apps-switch-pre');
        var $appNext = $('.apps-switch-next');

        $appPre.click(function () {
            appSwitch(true);
        });
        $appNext.click(function () {
            appSwitch(false);
        });
        function appSwitch(bForth) {
            var $appContainer = $('.app-container');
            var $apps = $appContainer.find('.app-item');
            var $nowApp = $appContainer.find('.app-item.z1');
            var index = $apps.index($nowApp);
            if (bForth && index > 0) {
                var i = index - 1;
                com.appSwitch(i);
            } else if (!bForth && index < $apps.length - 1) {
                var i = index + 1;
                com.appSwitch(i);
            }
        }
    },
    appSwitch: function (index) {
        var $apps = $('.app-item');
        $apps.removeClass('z1');
        var $app = $($apps[index]);
        $app.addClass('z1');
        var config = $app.data('config');
        var activeApp = appConfig.getActiveApp();
        if (activeApp) {
            activeApp.bActive = false;
            if (activeApp.deactivate)
                activeApp.deactivate();
        }
        config.bActive = true;
        if (config.activate) {
            config.activate();
        }
        $('.apps-current-app').html(config.name);
        var $appBottomBtns = $('.app-nav-small>div');
        $appBottomBtns.removeClass('app-nav-selected');
        $($appBottomBtns[index]).addClass('app-nav-selected');
    },
    loadApp: function (config) {
        var $appContainer = $('.app-container');
        var $apps = $appContainer.find('.app-item');
        var $app = $appContainer.find('.' + config.id);
        var bAdded = $app.length > 0;
        if (bAdded) {
            //模块已经加载
            var index = $apps.index($app);
            com.appSwitch(index);
        } else {
            //模块尚未加载
            com.loadMould(config);
        }
    },
    bottomResults: {
        cls: 'bottom-results-on',
        obj: function () { return $('.bottom-results'); },
        show: function () {
            var obj = this.obj();
            if (obj)
                obj.addClass(this.cls);
        },
        hide: function () {
            var obj = this.obj();
            if (obj)
                obj.remove(this.cls);
        },
        setTitle: function (title) {
            this.obj().find('.bottom-results-title').html(title);
        }
    },
    fieldFormatter: function (fieldAliases, attributes) {
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
    },
    getTable: function (fieldFormatted) {
        var html = '<table >';
        for (var name in fieldFormatted) {
            var v = fieldFormatted[name];
            v = (v == 0 || v) ? v : '';
            html += '<tr><th style="width:40%;">' + name + '</th><td style="width:60%;">' + v + '</td></tr>';
        }
        html += '</talbe>';
        return html;
    }
};