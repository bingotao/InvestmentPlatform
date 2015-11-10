(function ($) {
    $.parser = {
        auto: true, onComplete: function (_1) {
        }, plugins: ["draggable", "droppable", "resizable", "pagination", "tooltip", "linkbutton", "menu", "menubutton", "splitbutton", "progressbar", "tree", "textbox", "filebox", "combo", "combobox", "combotree", "combogrid", "numberbox", "validatebox", "searchbox", "spinner", "numberspinner", "timespinner", "datetimespinner", "calendar", "datebox", "datetimebox", "slider", "layout", "panel", "datagrid", "propertygrid", "treegrid", "tabs", "accordion", "window", "dialog", "form"], parse: function (_2) {
            var aa = [];
            for (var i = 0; i < $.parser.plugins.length; i++) {
                var _3 = $.parser.plugins[i];
                var r = $(".easyui-" + _3, _2);
                if (r.length) {
                    if (r[_3]) {
                        r[_3]();
                    } else {
                        aa.push({ name: _3, jq: r });
                    }
                }
            }
            if (aa.length && window.easyloader) {
                var _4 = [];
                for (var i = 0; i < aa.length; i++) {
                    _4.push(aa[i].name);
                }
                easyloader.load(_4, function () {
                    for (var i = 0; i < aa.length; i++) {
                        var _5 = aa[i].name;
                        var jq = aa[i].jq;
                        jq[_5]();
                    }
                    $.parser.onComplete.call($.parser, _2);
                });
            } else {
                $.parser.onComplete.call($.parser, _2);
            }
        }, parseValue: function (_6, _7, _8, _9) {
            _9 = _9 || 0;
            var v = $.trim(String(_7 || ""));
            var _a = v.substr(v.length - 1, 1);
            if (_a == "%") {
                v = parseInt(v.substr(0, v.length - 1));
                if (_6.toLowerCase().indexOf("width") >= 0) {
                    v = Math.floor((_8.width() - _9) * v / 100);
                } else {
                    v = Math.floor((_8.height() - _9) * v / 100);
                }
            } else {
                v = parseInt(v) || undefined;
            }
            return v;
        }, parseOptions: function (_b, _c) {
            var t = $(_b);
            var _d = {};
            var s = $.trim(t.attr("data-options"));
            if (s) {
                if (s.substring(0, 1) != "{") {
                    s = "{" + s + "}";
                }
                _d = (new Function("return " + s))();
            }
            $.map(["width", "height", "left", "top", "minWidth", "maxWidth", "minHeight", "maxHeight"], function (p) {
                var pv = $.trim(_b.style[p] || "");
                if (pv) {
                    if (pv.indexOf("%") == -1) {
                        pv = parseInt(pv) || undefined;
                    }
                    _d[p] = pv;
                }
            });
            if (_c) {
                var _e = {};
                for (var i = 0; i < _c.length; i++) {
                    var pp = _c[i];
                    if (typeof pp == "string") {
                        _e[pp] = t.attr(pp);
                    } else {
                        for (var _f in pp) {
                            var _10 = pp[_f];
                            if (_10 == "boolean") {
                                _e[_f] = t.attr(_f) ? (t.attr(_f) == "true") : undefined;
                            } else {
                                if (_10 == "number") {
                                    _e[_f] = t.attr(_f) == "0" ? 0 : parseFloat(t.attr(_f)) || undefined;
                                }
                            }
                        }
                    }
                }
                $.extend(_d, _e);
            }
            return _d;
        }
    };
    $(function () {
        var d = $("<div style=\"position:absolute;top:-1000px;width:100px;height:100px;padding:5px\"></div>").appendTo("body");
        $._boxModel = d.outerWidth() != 100;
        d.remove();
        if (!window.easyloader && $.parser.auto) {
            $.parser.parse();
        }
    });
    $.fn._outerWidth = function (_11) {
        if (_11 == undefined) {
            if (this[0] == window) {
                return this.width() || document.body.clientWidth;
            }
            return this.outerWidth() || 0;
        }
        return this._size("width", _11);
    };
    $.fn._outerHeight = function (_12) {
        if (_12 == undefined) {
            if (this[0] == window) {
                return this.height() || document.body.clientHeight;
            }
            return this.outerHeight() || 0;
        }
        return this._size("height", _12);
    };
    $.fn._scrollLeft = function (_13) {
        if (_13 == undefined) {
            return this.scrollLeft();
        } else {
            return this.each(function () {
                $(this).scrollLeft(_13);
            });
        }
    };
    $.fn._propAttr = $.fn.prop || $.fn.attr;
    $.fn._size = function (_14, _15) {
        if (typeof _14 == "string") {
            if (_14 == "clear") {
                return this.each(function () {
                    $(this).css({ width: "", minWidth: "", maxWidth: "", height: "", minHeight: "", maxHeight: "" });
                });
            } else {
                if (_14 == "fit") {
                    return this.each(function () {
                        _16(this, this.tagName == "BODY" ? $("body") : $(this).parent(), true);
                    });
                } else {
                    if (_14 == "unfit") {
                        return this.each(function () {
                            _16(this, $(this).parent(), false);
                        });
                    } else {
                        if (_15 == undefined) {
                            return _17(this[0], _14);
                        } else {
                            return this.each(function () {
                                _17(this, _14, _15);
                            });
                        }
                    }
                }
            }
        } else {
            return this.each(function () {
                _15 = _15 || $(this).parent();
                $.extend(_14, _16(this, _15, _14.fit) || {});
                var r1 = _18(this, "width", _15, _14);
                var r2 = _18(this, "height", _15, _14);
                if (r1 || r2) {
                    $(this).addClass("easyui-fluid");
                } else {
                    $(this).removeClass("easyui-fluid");
                }
            });
        }
        function _16(_19, _1a, fit) {
            if (!_1a.length) {
                return false;
            }
            var t = $(_19)[0];
            var p = _1a[0];
            var _1b = p.fcount || 0;
            if (fit) {
                if (!t.fitted) {
                    t.fitted = true;
                    p.fcount = _1b + 1;
                    $(p).addClass("panel-noscroll");
                    if (p.tagName == "BODY") {
                        $("html").addClass("panel-fit");
                    }
                }
                return { width: ($(p).width() || 1), height: ($(p).height() || 1) };
            } else {
                if (t.fitted) {
                    t.fitted = false;
                    p.fcount = _1b - 1;
                    if (p.fcount == 0) {
                        $(p).removeClass("panel-noscroll");
                        if (p.tagName == "BODY") {
                            $("html").removeClass("panel-fit");
                        }
                    }
                }
                return false;
            }
        };
        function _18(_1c, _1d, _1e, _1f) {
            var t = $(_1c);
            var p = _1d;
            var p1 = p.substr(0, 1).toUpperCase() + p.substr(1);
            var min = $.parser.parseValue("min" + p1, _1f["min" + p1], _1e);
            var max = $.parser.parseValue("max" + p1, _1f["max" + p1], _1e);
            var val = $.parser.parseValue(p, _1f[p], _1e);
            var _20 = (String(_1f[p] || "").indexOf("%") >= 0 ? true : false);
            if (!isNaN(val)) {
                var v = Math.min(Math.max(val, min || 0), max || 99999);
                if (!_20) {
                    _1f[p] = v;
                }
                t._size("min" + p1, "");
                t._size("max" + p1, "");
                t._size(p, v);
            } else {
                t._size(p, "");
                t._size("min" + p1, min);
                t._size("max" + p1, max);
            }
            return _20 || _1f.fit;
        };
        function _17(_21, _22, _23) {
            var t = $(_21);
            if (_23 == undefined) {
                _23 = parseInt(_21.style[_22]);
                if (isNaN(_23)) {
                    return undefined;
                }
                if ($._boxModel) {
                    _23 += _24();
                }
                return _23;
            } else {
                if (_23 === "") {
                    t.css(_22, "");
                } else {
                    if ($._boxModel) {
                        _23 -= _24();
                        if (_23 < 0) {
                            _23 = 0;
                        }
                    }
                    t.css(_22, _23 + "px");
                }
            }
            function _24() {
                if (_22.toLowerCase().indexOf("width") >= 0) {
                    return t.outerWidth() - t.width();
                } else {
                    return t.outerHeight() - t.height();
                }
            };
        };
    };
})(jQuery);
(function ($) {
    function _1(e) {
        var _2 = $.data(e.data.target, "draggable");
        var _3 = _2.options;
        var _4 = _2.proxy;
        var _5 = e.data;
        var _6 = _5.startLeft + e.pageX - _5.startX;
        var _7 = _5.startTop + e.pageY - _5.startY;
        if (_4) {
            if (_4.parent()[0] == document.body) {
                if (_3.deltaX != null && _3.deltaX != undefined) {
                    _6 = e.pageX + _3.deltaX;
                } else {
                    _6 = e.pageX - e.data.offsetWidth;
                }
                if (_3.deltaY != null && _3.deltaY != undefined) {
                    _7 = e.pageY + _3.deltaY;
                } else {
                    _7 = e.pageY - e.data.offsetHeight;
                }
            } else {
                if (_3.deltaX != null && _3.deltaX != undefined) {
                    _6 += e.data.offsetWidth + _3.deltaX;
                }
                if (_3.deltaY != null && _3.deltaY != undefined) {
                    _7 += e.data.offsetHeight + _3.deltaY;
                }
            }
        }
        if (e.data.parent != document.body) {
            _6 += $(e.data.parent).scrollLeft();
            _7 += $(e.data.parent).scrollTop();
        }
        if (_3.axis == "h") {
            _5.left = _6;
        } else {
            if (_3.axis == "v") {
                _5.top = _7;
            } else {
                _5.left = _6;
                _5.top = _7;
            }
        }
    };
    function _8(e) {
        var _9 = $.data(e.data.target, "draggable");
        var _a = _9.options;
        var _b = _9.proxy;
        if (!_b) {
            _b = $(e.data.target);
        }
        _b.css({ left: e.data.left, top: e.data.top });
        $("body").css("cursor", _a.cursor);
    };
    function _c(e) {
        $.fn.draggable.isDragging = true;
        var _d = $.data(e.data.target, "draggable");
        var _e = _d.options;
        var _f = $(".droppable").filter(function () {
            return e.data.target != this;
        }).filter(function () {
            var _10 = $.data(this, "droppable").options.accept;
            if (_10) {
                return $(_10).filter(function () {
                    return this == e.data.target;
                }).length > 0;
            } else {
                return true;
            }
        });
        _d.droppables = _f;
        var _11 = _d.proxy;
        if (!_11) {
            if (_e.proxy) {
                if (_e.proxy == "clone") {
                    _11 = $(e.data.target).clone().insertAfter(e.data.target);
                } else {
                    _11 = _e.proxy.call(e.data.target, e.data.target);
                }
                _d.proxy = _11;
            } else {
                _11 = $(e.data.target);
            }
        }
        _11.css("position", "absolute");
        _1(e);
        _8(e);
        _e.onStartDrag.call(e.data.target, e);
        return false;
    };
    function _12(e) {
        var _13 = $.data(e.data.target, "draggable");
        _1(e);
        if (_13.options.onDrag.call(e.data.target, e) != false) {
            _8(e);
        }
        var _14 = e.data.target;
        _13.droppables.each(function () {
            var _15 = $(this);
            if (_15.droppable("options").disabled) {
                return;
            }
            var p2 = _15.offset();
            if (e.pageX > p2.left && e.pageX < p2.left + _15.outerWidth() && e.pageY > p2.top && e.pageY < p2.top + _15.outerHeight()) {
                if (!this.entered) {
                    $(this).trigger("_dragenter", [_14]);
                    this.entered = true;
                }
                $(this).trigger("_dragover", [_14]);
            } else {
                if (this.entered) {
                    $(this).trigger("_dragleave", [_14]);
                    this.entered = false;
                }
            }
        });
        return false;
    };
    function _16(e) {
        $.fn.draggable.isDragging = false;
        _12(e);
        var _17 = $.data(e.data.target, "draggable");
        var _18 = _17.proxy;
        var _19 = _17.options;
        if (_19.revert) {
            if (_1a() == true) {
                $(e.data.target).css({ position: e.data.startPosition, left: e.data.startLeft, top: e.data.startTop });
            } else {
                if (_18) {
                    var _1b, top;
                    if (_18.parent()[0] == document.body) {
                        _1b = e.data.startX - e.data.offsetWidth;
                        top = e.data.startY - e.data.offsetHeight;
                    } else {
                        _1b = e.data.startLeft;
                        top = e.data.startTop;
                    }
                    _18.animate({ left: _1b, top: top }, function () {
                        _1c();
                    });
                } else {
                    $(e.data.target).animate({ left: e.data.startLeft, top: e.data.startTop }, function () {
                        $(e.data.target).css("position", e.data.startPosition);
                    });
                }
            }
        } else {
            $(e.data.target).css({ position: "absolute", left: e.data.left, top: e.data.top });
            _1a();
        }
        _19.onStopDrag.call(e.data.target, e);
        $(document).unbind(".draggable");
        setTimeout(function () {
            $("body").css("cursor", "");
        }, 100);
        function _1c() {
            if (_18) {
                _18.remove();
            }
            _17.proxy = null;
        };
        function _1a() {
            var _1d = false;
            _17.droppables.each(function () {
                var _1e = $(this);
                if (_1e.droppable("options").disabled) {
                    return;
                }
                var p2 = _1e.offset();
                if (e.pageX > p2.left && e.pageX < p2.left + _1e.outerWidth() && e.pageY > p2.top && e.pageY < p2.top + _1e.outerHeight()) {
                    if (_19.revert) {
                        $(e.data.target).css({ position: e.data.startPosition, left: e.data.startLeft, top: e.data.startTop });
                    }
                    $(this).trigger("_drop", [e.data.target]);
                    _1c();
                    _1d = true;
                    this.entered = false;
                    return false;
                }
            });
            if (!_1d && !_19.revert) {
                _1c();
            }
            return _1d;
        };
        return false;
    };
    $.fn.draggable = function (_1f, _20) {
        if (typeof _1f == "string") {
            return $.fn.draggable.methods[_1f](this, _20);
        }
        return this.each(function () {
            var _21;
            var _22 = $.data(this, "draggable");
            if (_22) {
                _22.handle.unbind(".draggable");
                _21 = $.extend(_22.options, _1f);
            } else {
                _21 = $.extend({}, $.fn.draggable.defaults, $.fn.draggable.parseOptions(this), _1f || {});
            }
            var _23 = _21.handle ? (typeof _21.handle == "string" ? $(_21.handle, this) : _21.handle) : $(this);
            $.data(this, "draggable", { options: _21, handle: _23 });
            if (_21.disabled) {
                $(this).css("cursor", "");
                return;
            }
            _23.unbind(".draggable").bind("mousemove.draggable", { target: this }, function (e) {
                if ($.fn.draggable.isDragging) {
                    return;
                }
                var _24 = $.data(e.data.target, "draggable").options;
                if (_25(e)) {
                    $(this).css("cursor", _24.cursor);
                } else {
                    $(this).css("cursor", "");
                }
            }).bind("mouseleave.draggable", { target: this }, function (e) {
                $(this).css("cursor", "");
            }).bind("mousedown.draggable", { target: this }, function (e) {
                if (_25(e) == false) {
                    return;
                }
                $(this).css("cursor", "");
                var _26 = $(e.data.target).position();
                var _27 = $(e.data.target).offset();
                var _28 = { startPosition: $(e.data.target).css("position"), startLeft: _26.left, startTop: _26.top, left: _26.left, top: _26.top, startX: e.pageX, startY: e.pageY, offsetWidth: (e.pageX - _27.left), offsetHeight: (e.pageY - _27.top), target: e.data.target, parent: $(e.data.target).parent()[0] };
                $.extend(e.data, _28);
                var _29 = $.data(e.data.target, "draggable").options;
                if (_29.onBeforeDrag.call(e.data.target, e) == false) {
                    return;
                }
                $(document).bind("mousedown.draggable", e.data, _c);
                $(document).bind("mousemove.draggable", e.data, _12);
                $(document).bind("mouseup.draggable", e.data, _16);
            });
            function _25(e) {
                var _2a = $.data(e.data.target, "draggable");
                var _2b = _2a.handle;
                var _2c = $(_2b).offset();
                var _2d = $(_2b).outerWidth();
                var _2e = $(_2b).outerHeight();
                var t = e.pageY - _2c.top;
                var r = _2c.left + _2d - e.pageX;
                var b = _2c.top + _2e - e.pageY;
                var l = e.pageX - _2c.left;
                return Math.min(t, r, b, l) > _2a.options.edge;
            };
        });
    };
    $.fn.draggable.methods = {
        options: function (jq) {
            return $.data(jq[0], "draggable").options;
        }, proxy: function (jq) {
            return $.data(jq[0], "draggable").proxy;
        }, enable: function (jq) {
            return jq.each(function () {
                $(this).draggable({ disabled: false });
            });
        }, disable: function (jq) {
            return jq.each(function () {
                $(this).draggable({ disabled: true });
            });
        }
    };
    $.fn.draggable.parseOptions = function (_2f) {
        var t = $(_2f);
        return $.extend({}, $.parser.parseOptions(_2f, ["cursor", "handle", "axis", { "revert": "boolean", "deltaX": "number", "deltaY": "number", "edge": "number" }]), { disabled: (t.attr("disabled") ? true : undefined) });
    };
    $.fn.draggable.defaults = {
        proxy: null, revert: false, cursor: "move", deltaX: null, deltaY: null, handle: null, disabled: false, edge: 0, axis: null, onBeforeDrag: function (e) {
        }, onStartDrag: function (e) {
        }, onDrag: function (e) {
        }, onStopDrag: function (e) {
        }
    };
    $.fn.draggable.isDragging = false;
})(jQuery);

(function ($) {
    function _1(_2) {
        var _3 = $("<div class=\"slider\">" + "<div class=\"slider-inner\">" + "<a href=\"javascript:void(0)\" class=\"slider-handle\"></a>" + "<span class=\"slider-tip\"></span>" + "</div>" + "<div class=\"slider-rule\"></div>" + "<div class=\"slider-rulelabel\"></div>" + "<div style=\"clear:both\"></div>" + "<input type=\"hidden\" class=\"slider-value\">" + "</div>").insertAfter(_2);
        var t = $(_2);
        t.addClass("slider-f").hide();
        var _4 = t.attr("name");
        if (_4) {
            _3.find("input.slider-value").attr("name", _4);
            t.removeAttr("name").attr("sliderName", _4);
        }
        _3.bind("_resize", function (e, _5) {
            if ($(this).hasClass("easyui-fluid") || _5) {
                _6(_2);
            }
            return false;
        });
        return _3;
    };
    function _6(_7, _8) {
        var _9 = $.data(_7, "slider");
        var _a = _9.options;
        var _b = _9.slider;
        if (_8) {
            if (_8.width) {
                _a.width = _8.width;
            }
            if (_8.height) {
                _a.height = _8.height;
            }
        }
        _b._size(_a);
        if (_a.mode == "h") {
            _b.css("height", "");
            _b.children("div").css("height", "");
        } else {
            _b.css("width", "");
            _b.children("div").css("width", "");
            _b.children("div.slider-rule,div.slider-rulelabel,div.slider-inner")._outerHeight(_b._outerHeight());
        }
        _c(_7);
    };
    function _d(_e) {
        var _f = $.data(_e, "slider");
        var _10 = _f.options;
        var _11 = _f.slider;
        var aa = _10.mode == "h" ? _10.rule : _10.rule.slice(0).reverse();
        if (_10.reversed) {
            aa = aa.slice(0).reverse();
        }
        _12(aa);
        function _12(aa) {
            var _13 = _11.find("div.slider-rule");
            var _14 = _11.find("div.slider-rulelabel");
            _13.empty();
            _14.empty();
            for (var i = 0; i < aa.length; i++) {
                var _15 = i * 100 / (aa.length - 1) + "%";
                var _16 = $("<span></span>").appendTo(_13);
                _16.css((_10.mode == "h" ? "left" : "top"), _15);
                if (aa[i] != "|") {
                    _16 = $("<span></span>").appendTo(_14);
                    _16.html(aa[i]);
                    if (_10.mode == "h") {
                        _16.css({ left: _15, marginLeft: -Math.round(_16.outerWidth() / 2) });
                    } else {
                        _16.css({ top: _15, marginTop: -Math.round(_16.outerHeight() / 2) });
                    }
                }
            }
        };
    };
    function _17(_18) {
        var _19 = $.data(_18, "slider");
        var _1a = _19.options;
        var _1b = _19.slider;
        _1b.removeClass("slider-h slider-v slider-disabled");
        _1b.addClass(_1a.mode == "h" ? "slider-h" : "slider-v");
        _1b.addClass(_1a.disabled ? "slider-disabled" : "");
        _1b.find("a.slider-handle").draggable({
            axis: _1a.mode, cursor: "pointer", disabled: _1a.disabled, onDrag: function (e) {
                var _1c = e.data.left;
                var _1d = _1b.width();
                if (_1a.mode != "h") {
                    _1c = e.data.top;
                    _1d = _1b.height();
                }
                if (_1c < 0 || _1c > _1d) {
                    return false;
                } else {
                    var _1e = _34(_18, _1c);
                    _1f(_1e);
                    return false;
                }
            }, onBeforeDrag: function () {
                _19.isDragging = true;
            }, onStartDrag: function () {
                _1a.onSlideStart.call(_18, _1a.value);
            }, onStopDrag: function (e) {
                var _20 = _34(_18, (_1a.mode == "h" ? e.data.left : e.data.top));
                _1f(_20);
                _1a.onSlideEnd.call(_18, _1a.value);
                _1a.onComplete.call(_18, _1a.value);
                _19.isDragging = false;
            }
        });
        _1b.find("div.slider-inner").unbind(".slider").bind("mousedown.slider", function (e) {
            if (_19.isDragging || _1a.disabled) {
                return;
            }
            var pos = $(this).offset();
            var _21 = _34(_18, (_1a.mode == "h" ? (e.pageX - pos.left) : (e.pageY - pos.top)));
            _1f(_21);
            _1a.onComplete.call(_18, _1a.value);
        });
        function _1f(_22) {
            var s = Math.abs(_22 % _1a.step);
            if (s < _1a.step / 2) {
                _22 -= s;
            } else {
                _22 = _22 - s + _1a.step;
            }
            _23(_18, _22);
        };
    };
    function _23(_24, _25) {
        var _26 = $.data(_24, "slider");
        var _27 = _26.options;
        var _28 = _26.slider;
        var _29 = _27.value;
        if (_25 < _27.min) {
            _25 = _27.min;
        }
        if (_25 > _27.max) {
            _25 = _27.max;
        }
        _27.value = _25;
        $(_24).val(_25);
        _28.find("input.slider-value").val(_25);
        var pos = _2a(_24, _25);
        var tip = _28.find(".slider-tip");
        if (_27.showTip) {
            tip.show();
            tip.html(_27.tipFormatter.call(_24, _27.value));
        } else {
            tip.hide();
        }
        if (_27.mode == "h") {
            var _2b = "left:" + pos + "px;";
            _28.find(".slider-handle").attr("style", _2b);
            tip.attr("style", _2b + "margin-left:" + (-Math.round(tip.outerWidth() / 2)) + "px");
        } else {
            var _2b = "top:" + pos + "px;";
            _28.find(".slider-handle").attr("style", _2b);
            tip.attr("style", _2b + "margin-left:" + (-Math.round(tip.outerWidth())) + "px");
        }
        if (_29 != _25) {
            _27.onChange.call(_24, _25, _29);
        }
    };
    function _c(_2c) {
        var _2d = $.data(_2c, "slider").options;
        var fn = _2d.onChange;
        _2d.onChange = function () {
        };
        _23(_2c, _2d.value);
        _2d.onChange = fn;
    };
    function _2a(_2e, _2f) {
        var _30 = $.data(_2e, "slider");
        var _31 = _30.options;
        var _32 = _30.slider;
        var _33 = _31.mode == "h" ? _32.width() : _32.height();
        var pos = _31.converter.toPosition.call(_2e, _2f, _33);
        if (_31.mode == "v") {
            pos = _32.height() - pos;
        }
        if (_31.reversed) {
            pos = _33 - pos;
        }
        return pos.toFixed(0);
    };
    function _34(_35, pos) {
        var _36 = $.data(_35, "slider");
        var _37 = _36.options;
        var _38 = _36.slider;
        var _39 = _37.mode == "h" ? _38.width() : _38.height();
        var _3a = _37.converter.toValue.call(_35, _37.mode == "h" ? (_37.reversed ? (_39 - pos) : pos) : (_39 - pos), _39);
        return _3a.toFixed(0);
    };
    $.fn.slider = function (_3b, _3c) {
        if (typeof _3b == "string") {
            return $.fn.slider.methods[_3b](this, _3c);
        }
        _3b = _3b || {};
        return this.each(function () {
            var _3d = $.data(this, "slider");
            if (_3d) {
                $.extend(_3d.options, _3b);
            } else {
                _3d = $.data(this, "slider", { options: $.extend({}, $.fn.slider.defaults, $.fn.slider.parseOptions(this), _3b), slider: _1(this) });
                $(this).removeAttr("disabled");
            }
            var _3e = _3d.options;
            _3e.min = parseFloat(_3e.min);
            _3e.max = parseFloat(_3e.max);
            _3e.value = parseFloat(_3e.value);
            _3e.step = parseFloat(_3e.step);
            _3e.originalValue = _3e.value;
            _17(this);
            _d(this);
            _6(this);
        });
    };
    $.fn.slider.methods = {
        options: function (jq) {
            return $.data(jq[0], "slider").options;
        }, destroy: function (jq) {
            return jq.each(function () {
                $.data(this, "slider").slider.remove();
                $(this).remove();
            });
        }, resize: function (jq, _3f) {
            return jq.each(function () {
                _6(this, _3f);
            });
        }, getValue: function (jq) {
            return jq.slider("options").value;
        }, setValue: function (jq, _40) {
            return jq.each(function () {
                _23(this, _40);
            });
        }, clear: function (jq) {
            return jq.each(function () {
                var _41 = $(this).slider("options");
                _23(this, _41.min);
            });
        }, reset: function (jq) {
            return jq.each(function () {
                var _42 = $(this).slider("options");
                _23(this, _42.originalValue);
            });
        }, enable: function (jq) {
            return jq.each(function () {
                $.data(this, "slider").options.disabled = false;
                _17(this);
            });
        }, disable: function (jq) {
            return jq.each(function () {
                $.data(this, "slider").options.disabled = true;
                _17(this);
            });
        }
    };
    $.fn.slider.parseOptions = function (_43) {
        var t = $(_43);
        return $.extend({}, $.parser.parseOptions(_43, ["width", "height", "mode", { reversed: "boolean", showTip: "boolean", min: "number", max: "number", step: "number" }]), { value: (t.val() || undefined), disabled: (t.attr("disabled") ? true : undefined), rule: (t.attr("rule") ? eval(t.attr("rule")) : undefined) });
    };
    $.fn.slider.defaults = {
        width: "auto", height: "auto", mode: "h", reversed: false, showTip: false, disabled: false, value: 0, min: 0, max: 100, step: 1, rule: [], tipFormatter: function (_44) {
            return _44;
        }, converter: {
            toPosition: function (_45, _46) {
                var _47 = $(this).slider("options");
                return (_45 - _47.min) / (_47.max - _47.min) * _46;
            }, toValue: function (pos, _48) {
                var _49 = $(this).slider("options");
                return _49.min + (_49.max - _49.min) * (pos / _48);
            }
        }, onChange: function (_4a, _4b) {
        }, onSlideStart: function (_4c) {
        }, onSlideEnd: function (_4d) {
        }, onComplete: function (_4e) {
        }
    };
})(jQuery);
(function (win) {
    var js = document.scripts;
    var path = js[js.length - 1].src.substring(0, js[js.length - 1].src.lastIndexOf("/") + 1);

    var mapControl = win.mapControl || {};
    win.mapControl = mapControl;
    mapControl.mapNav = function (s) {
        if (map.loaded) {
            mapNavInit();
        }
        else {
            map.on('load', mapNavInit);
        }

        function mapNavInit() {
            var map = s.map;
            var dom = s.dom;
            var oExtent = s.oExtent;
            var oCenterAndLevel = s.oCenterAndLevel;
            var silderSetting = s.silderSetting;
            var navHtml = '<div class="ct-map-nav"><div class="ct-map-nav-navpanel"><div class="ct-map-navpanel-up" title="上移"></div><div class="ct-map-navpanel-right" title="右移"></div><div class="ct-map-navpanel-down" title="下移"></div><div class="ct-map-navpanel-left" title="左移"></div><div class="ct-map-navpanel-center" title="全图"></div></div><div class="ct-map-nav-extent"><div class="ct-map-nav-extent-pre" title="前一视图"></div><div class="ct-map-nav-extent-next" title="后一视图"></div></div><div class="ct-map-nav-levelcontrol"><div class="ct-map-nav-levelcontrol-zoomin" title="放大"></div><div class="ct-map-nav-levcontrol-container"><input style="display:none;" class="ct-map-nav-levelcontrol-panel" /></div><div class="ct-map-nav-levelcontrol-zoomout" title="缩小"></div></div></div>';

            var $nav = $(dom).html(navHtml);
            require(["esri/toolbars/navigation", "esri/geometry/Point"], function (Navigation, Point) {
                var maxLevel = map.getMaxZoom();
                var minLevel = map.getMinZoom();
                var navTool = new Navigation(map);
                var zoomInFactor = s.zoomInFactor ? s.zoomInFactor : 0.8;
                var zoomOutFactor = s.zoomOutFactor ? s.zoomOutFactor : 1.2;
                $('.ct-map-navpanel-up').click(function () {
                    map.panUp();
                });
                $('.ct-map-navpanel-right').click(function () {
                    map.panRight();
                });
                $('.ct-map-navpanel-down').click(function () {
                    map.panDown();
                });
                $('.ct-map-navpanel-left').click(function () {
                    map.panLeft();
                });
                $('.ct-map-nav-extent-pre').click(function () {
                    if (!navTool.isFirstExtent()) {
                        navTool.zoomToPrevExtent();
                    }
                });

                $('.ct-map-nav-extent-next').click(function () {
                    if (!navTool.isLastExtent()) {
                        navTool.zoomToNextExtent();
                    }
                });

                $('.ct-map-navpanel-center').click(function () {
                    if (oExtent) {
                        map.setExtent(s.initExtent);
                    } else if (oCenterAndLevel) {
                        var point = oCenterAndLevel.point
                        var pnt = new Point(point.x, point.y, map.spatialReference);
                        map.centerAndZoom(oCenterAndLevel.point, oCenterAndLevel.level);
                    } else {
                        map.zoomToFullExtent();
                    }
                });

                function getCenterAndLevel() {
                    return {
                        point: map.extent.getCenter(),
                        level: map.getLevel()
                    };
                }
                var zoomInFunction = maxLevel > 0 ? function () {
                    var l = map.getLevel();
                    if (l < maxLevel)
                        map.setZoom(l + 1);
                } : function () {
                    var cl = getCenterAndLevel();
                    if (cl.level < maxLevel)
                        map.centerAndZoom(cl.point, zoomInFactor);
                };
                var zoomOutFunction = maxLevel > 0 ? function () {
                    var l = map.getLevel();
                    if (l < maxLevel)
                        map.setZoom(l - 1);
                } : function () {
                    var cl = getCenterAndLevel();
                    if (cl.level < maxLevel)
                        map.centerAndZoom(cl.point, zoomOutFactor);
                };

                $('.ct-map-nav-levelcontrol-zoomin').click(zoomInFunction);
                $('.ct-map-nav-levelcontrol-zoomout').click(zoomOutFunction);
                (maxLevel && (silderSetting.showSlider != false)) > 0 ? (function () {
                    var r = [];
                    for (var i = 0; i <= maxLevel; i++) {
                        r.push('|');
                    }

                    if (silderSetting && silderSetting.rules) {
                        var rules = silderSetting.rules;
                        for (var i = 0; i < rules.length ; i++) {
                            var rule = rules[i];
                            var index = rule.index;
                            var content = rule.content;
                            r[index] = content;
                        }
                    }

                    var $slider = $('.ct-map-nav-levelcontrol-panel');
                    $slider.slider({
                        mode: 'v',
                        height: 100,
                        min: minLevel,
                        max: maxLevel,
                        setp: 1,
                        rule: r,
                        value: map.getLevel(),
                        onChange: function (newValue, oldValue) {
                            if (newValue != oldValue)
                                map.setZoom(newValue);
                        }
                    });

                    map.on('extent-change', function (evt) {
                        if (evt.levelChange) {
                            $slider.slider('setValue', evt.lod.level);
                        }
                    });

                    if (silderSetting && silderSetting.callBacks) {
                        var $labels = $('.ct-map-nav-levcontrol-container .slider-rulelabel span');
                        var callL = silderSetting.callBacks.length;
                        for (var i = 0; i < callL; i++) {
                            $($labels[i]).click(silderSetting.callBacks[callL - i - 1]);
                        }
                    }
                })() : (function () {
                    $('.ct-map-nav-levcontrol-container').css('display', 'none');
                })();

                $('.ct-map-navpanel-center').click();
            });
        }
    }
})(window, undefined);