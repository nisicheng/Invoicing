!function (t) {
    function e(n) {
        if (i[n]) return i[n].exports;
        var a = i[n] = {exports: {}, id: n, loaded: !1};
        return t[n].call(a.exports, a, a.exports, e), a.loaded = !0, a.exports
    }

    var i = {};
    return e.m = t, e.c = i, e.p = "/new/dist/", e(0)
}([function (t, e, i) {
    "use strict";
    i(47), i(46), i(36), i(65), i(66), i(67);
    var n = i(1), a = i(4), o = i(3), s = i(62);
    window.SYSTEM || (window.SYSTEM = {}), window.tab || window.tab, window.listMenus || window.listMenus, window.CONFIG || (window.CONFIG = {
        DEFAULT_PAGE: !0,
        SERVICE_URL: "http://online.youshang.com/onlinegd/"
    }), window.cacheView || (window.cacheView = {});
    var r = window.location.href, l = a.getRequest(r);
    window.SYSTEM.isMixed = l.isMixed || !1;
    var c = function () {
        a.ajax({url: "/basedata/user.do?action=getSystemParams", async: !1}).done(function (t) {
            n.extend(!0, window.SYSTEM, t), window.SYSTEM.servicePro = 2 === window.SYSTEM.siType ? "forbscm3" : "forscm3"
        })
    };
    window.getCacheData = c;
    var d = function () {
        n("#container").html(""), o.startView = new s.Views.Main, n("#container").html(o.startView.render().$el)
    };
    c(), i(61), d()
}, function (t, e, i) {
    t.exports = i(13)(52)
}, function (t, e) {
    !function () {
        function e(t, e) {
            return (/string|function/.test(typeof e) ? l : r)(t, e)
        }

        function i(t, e) {
            return "string" != typeof t && (e = typeof t, "number" === e ? t += "" : t = "function" === e ? i(t.call(t)) : ""), t
        }

        function n(t) {
            return h[t]
        }

        function a(t) {
            return i(t).replace(/&(?![\w#]+;)|[<>"']/g, n)
        }

        function o(t, e) {
            if (f(t)) for (var i = 0, n = t.length; n > i; i++) e.call(t, t[i], i, t); else for (i in t) e.call(t, t[i], i)
        }

        function s(t, e) {
            var i = /(\/)[^\/]+\1\.\.\1/, n = ("./" + t).replace(/[^\/]+$/, ""), a = n + e;
            for (a = a.replace(/\/\.\//g, "/"); a.match(i);) a = a.replace(i, "/");
            return a
        }

        function r(t, i) {
            var n = e.get(t) || c({filename: t, name: "Render Error", message: "Template not found"});
            return i ? n(i) : n
        }

        function l(t, e) {
            if ("string" == typeof e) {
                var i = e;
                e = function () {
                    return new u(i)
                }
            }
            var n = d[t] = function (i) {
                try {
                    return new e(i, t) + ""
                } catch (t) {
                    return c(t)()
                }
            };
            return n.prototype = e.prototype = p, n.toString = function () {
                return e + ""
            }, n
        }

        function c(t) {
            var e = "{Template Error}", i = t.stack || "";
            if (i) i = i.split("\n").slice(0, 2).join("\n"); else for (var n in t) i += "<" + n + ">\n" + t[n] + "\n\n";
            return function () {
                return "object" == typeof console && console.error(e + "\n\n" + i), e
            }
        }

        var d = e.cache = {}, u = this.String,
            h = {"<": "&#60;", ">": "&#62;", '"': "&#34;", "'": "&#39;", "&": "&#38;"},
            f = Array.isArray || function (t) {
                return "[object Array]" === {}.toString.call(t)
            }, p = e.utils = {
                $helpers: {}, $include: function (t, e, i) {
                    return t = s(i, t), r(t, e)
                }, $string: i, $escape: a, $each: o
            }, m = e.helpers = p.$helpers;
        e.get = function (t) {
            return d[t.replace(/^\.\//, "")]
        }, e.helper = function (t, e) {
            m[t] = e
        }, t.exports = e
    }()
}, function (t, e, i) {
    (function (e, n, a, o) {
        "use strict";

        function s(t) {
            return t && t.__esModule ? t : {default: t}
        }

        var r = i(35), l = s(r);
        i(110);
        var c = i(4), d = i(68), u = {};
        e.configure({
            manage: !0, fetchTemplate: function (t) {
                var e = this.async();
                e(d[t])
            }, renderTemplate: function (t, e) {
                var i = this.async();
                i(t(e))
            }
        }), a.sync = function (t, e, i) {
            var a = {create: "add", update: "update", patch: "update", delete: "delete", read: "list"}, o = a[t];
            "read" === t && (o = e.id ? "query" : o);
            var s = {};
            if (null != i.data || !e || "create" !== t && "update" !== t && "patch" !== t || (s.data = i.attrs || e.toJSON(i)), !i.url && (s.url = n.result(e, "url"), "update" === t || "delete" === t || "query" === o || "patch" === t)) {
                var r = s.url.split("/");
                s.data = s.data || {}, s.data.id = r[r.length - 1], s.url = s.url.replace("/" + s.data.id, "")
            }
            i.emulateJSON && (s.contentType = "application/x-www-form-urlencoded", s.data = s.data ? {model: s.data} : {});
            var l = n.extend(s, i);
            l.url.indexOf("?action=") === -1 && (l.url += "?action=" + o);
            var d = i.xhr = c.ajax(l);
            return e.trigger("request", e, d, i), d
        }, n.extend(u, {
            module: function (t) {
                return n.extend({
                    Views: {}, initialize: function () {
                        this.setModel(this.ModelConfig), this.setCollection(this.CollectionConfig)
                    }, setModel: function (t) {
                        var e = o.extend(!0, {urlRoot: this.url}, t);
                        return this.Model = u.Model.extend(e), this
                    }, setCollection: function (t) {
                        var e = o.extend(!0, {
                            url: this.url, model: this.Model, parse: function (t, e) {
                                return t.items
                            }
                        }, t);
                        return this.Collection = u.Collection.extend(e), this
                    }
                }, t)
            }, Collection: a.Collection.extend(), Model: a.Model.extend({
                reset: function (t, e) {
                    this.attributes = {}, this.set(t)
                }, save: function (t, e, i) {
                    var o;
                    null == t || "object" === ("undefined" == typeof t ? "undefined" : (0, l.default)(t)) ? (o = t, i = e) : (o = {})[t] = e, i = n.extend({
                        validate: !0,
                        parse: !0
                    }, i);
                    var s = this.isNew() ? "create" : i.patch ? "patch" : "update";
                    return "patch" !== s || i.attrs || (i.attrs = this.changedAttributes(o)), a.Model.__super__.save.apply(this, [o, i])
                }, changedAttributes: function (t) {
                    if (!t) return !!this.hasChanged() && n.clone(this.changed);
                    var e, i = this._changing ? this._previousAttributes : this.attributes, a = {};
                    for (var o in t) {
                        var s = t[o];
                        n.isEqual(i[o], s) || void 0 === i[o] && "" === s || (a[o] = s, e = !0)
                    }
                    return !!e && a
                }
            }), View: e.extend({
                initialize: function () {
                    u.View.__super__.initialize.apply(this, arguments)
                }
            }), setMainViews: function (t) {
                return u.layout.getViews(".main").each(function (t) {
                    t.remove()
                }), u.layout.setViews({".main": t}).renderViews(".main")
            }, useLayout: function (t) {
                var e = o("body").html("");
                return this.layout && this.layout.options.template === t ? this.layout : (this.layout && this.layout.remove(), t instanceof a.View ? (this.layout = t, this.layout.render().$el.appendTo(e)) : (this.layout = new a.Layout({
                    template: "layouts/" + t,
                    className: "layoutCls",
                    id: "layoutId",
                    serialize: function () {
                        return {isPersonal: window.PERSONALINFO.isPersonal}
                    }
                }), this.layout.render().$el.appendTo(e), this))
            }
        }, a.Events), t.exports = u
    }).call(e, i(151), i(152), i(149), i(1))
}, function (t, e, i) {
    "use strict";
    var n = {};
    i(64), i(63), i(125), i(109), i(108), i(107);
    var a = i(1);
    n.isIE6 = !window.XMLHttpRequest, n.tooltips = function (t) {
        var e = a.extend(!0, {$el: a("<div></div>"), data: [], width: 100, textAlign: "center", callback: {}}, t), i = {
            $el: e.$el || a("div"),
            $wrap: a('<div class="drop-down-wrap"></div>'),
            $dropDown: a('<div class="drop-down"></div>'),
            $triggerBorder: a('<span class="triangle-border"></span>'),
            $triggerBg: a('<span class="triangle-bg"></span>'),
            $ul: a("<ul></ul>"),
            op: e,
            init: function () {
                this.render(), this._initEvent()
            },
            render: function (t) {
                this.$el;
                t = t || this.op.data;
                for (var e = this.op.width, i = e / 2 - Math.round(this.$el.outerWidth() / 2) - 2, n = this, o = 0; o < t.length; o++) {
                    var s = t[o].class ? t[o].class : "",
                        r = a('<li class="' + s + '" style="text-align: ' + this.op.textAlign + '"><a href="' + (t[o].href || "#") + '" target="' + (t[o].target || "") + '">' + t[o].name + "</a></li>");
                    r.data("val", t[o]), n.$ul.append(r)
                }
                this.$el.append(this.$wrap), this.$wrap.append(this.$dropDown), this.$dropDown.append(this.$triggerBorder), this.$dropDown.append(this.$triggerBg), this.$dropDown.append(this.$ul), this.$el.css({position: "relative"}), this.$wrap.css({
                    width: e,
                    left: -1 * i
                })
            },
            _initEvent: function () {
                var t = this.op.callback;
                this.$el.hover(function (t) {
                    a(this).find(".drop-down-wrap").stop(!0, !0).fadeIn(250)
                }, function (t) {
                    a(this).find(".drop-down-wrap").stop(!0, !0).hide()
                }), this.$ul.on("click", "li", function (e) {
                    "function" == typeof t.clickNode && t.clickNode(a(this))
                })
            }
        };
        return i.init()
    }, n.ajax = function (t) {
        function e(t) {
            400 !== t.status && n.tips({
                type: 1,
                content: '<span title="' + t.msg + '" class="">' + t.msg + "</span>"
            }), l.reject(t), r && r(t)
        }

        function i(t) {
            l.resolve(t), s && s(t)
        }

        var o = a.extend(!0, {}, t);
        delete o.contentType;
        var s = o.success, r = o.error;
        delete o.success, delete o.error;
        o = a.extend(!0, {type: "POST", dataType: "json"}, o);
        var l = a.Deferred();
        return a.ajax(o).then(function (t) {
            return 200 !== t.status && 250 !== t.status ? e(t) : i(t.data)
        }, function (t) {
        }), l.promise()
    }, n.ajaxGet = function (t, e) {
        return n.ajax({url: t, type: "GET", dataType: "json", data: e})
    }, n.ajaxPost = function (t, e) {
        return n.ajax({url: t, type: "POST", dataType: "json", data: e})
    }, n.tips = function (t) {
        return new n.Tips(t)
    }, n.Tips = function (t) {
        var e = {
            renderTo: "body",
            type: 0,
            autoClose: !0,
            removeOthers: !0,
            time: void 0,
            top: 10,
            onClose: null,
            onShow: null
        };
        this.options = a.extend({}, e, t), this._init(), n.Tips._collection ? n.Tips._collection.push(this) : n.Tips._collection = [this]
    }, n.Tips.removeAll = function () {
        try {
            for (var t = n.Tips._collection.length - 1; t >= 0; t--) n.Tips._collection[t].remove()
        } catch (t) {
        }
    }, n.Tips.prototype = {
        _init: function () {
            var t = this, e = this.options, i = void 0;
            e.removeOthers && n.Tips.removeAll(), this._create(), e.autoClose && (i = e.time || 1 === e.type ? 5e3 : 3e3, window.setTimeout(function () {
                t.remove()
            }, i))
        }, _create: function () {
            var t = this.options, e = this;
            switch (t.autoClose ? this.obj = a('<div class="ui-tips"><i></i></div>').append(t.content) : (this.obj = a('<div class="ui-tips"><i></i><span class="close"></span></div>').append(t.content), this.closeBtn = this.obj.find(".close"), this.closeBtn.bind("click", function () {
                e.remove()
            })), t.type) {
                case 0:
                    this.obj.addClass("ui-tips-success");
                    break;
                case 1:
                    this.obj.addClass("ui-tips-error");
                    break;
                case 2:
                    this.obj.addClass("ui-tips-warning");
                    break;
                default:
                    this.obj.addClass("ui-tips-success")
            }
            this.obj.appendTo("body").hide(), this._setPos(), t.onShow && t.onShow()
        }, _setPos: function () {
            var t = this, e = this.options;
            e.width && this.obj.css("width", e.width);
            var i = (this.obj.outerHeight(), a(window).height(), a(window).scrollTop());
            parseInt(e.top) + i;
            this.obj.css({
                position: n.isIE6 ? "absolute" : "fixed",
                left: "50%",
                top: "40%",
                zIndex: "9999",
                marginLeft: -t.obj.outerWidth() / 2
            }), window.setTimeout(function () {
                t.obj.show().css({marginLeft: -t.obj.outerWidth() / 2})
            }, 150), n.isIE6 && a(window).bind("resize scroll", function () {
                var i = a(window).scrollTop() + parseInt(e.top);
                t.obj.css("top", i)
            })
        }, remove: function () {
            var t = this.options;
            this.obj.fadeOut(200, function () {
                a(this).remove(), t.onClose && t.onClose()
            })
        }
    }, n.currency = function (t) {
        if (t = parseFloat(t), 0 === t || isNaN(t)) return "&nbsp;";
        if (t = t.toFixed(2), 0 === t) return "&nbsp;";
        var e = /(\d{1,3})(?=(\d{3})+(?:$|\D))/g;
        return t.replace(e, "$1,")
    }, n.moneyToFloat = function (t) {
        return t = String(t), "" === a.trim(t) ? "" : (t = t.replace(/,/g, ""), t = parseFloat(t), isNaN(t) ? 0 : t)
    }, n.dialog = function (t) {
        var e = a("<div>loading...</div>"),
            i = a.extend(!0, {content: e, title: "消息", max: !1, min: !1, cache: !1, lock: !0}, t);
        a.dialog(i)
    }, n.alertDialog = function (t) {
        var e = a.extend(!0, {title: "系统提示", icon: "alert.gif"}, t);
        n.dialog(e)
    }, n.getDefaultPage = function () {
        var t = window.self, e = 20;
        try {
            do {
                if (/default-new.jsp/.test(t.location.href)) return t;
                t = t.parent, e--
            } while (e > 0)
        } catch (e) {
            return t
        }
        return t
    }, n.verifyRight = function (t, e) {
        var i = n.getDefaultPage().SYSTEM, a = i.isAdmin, o = i.siExpired, s = i.rights;
        if (a && !o) return !0;
        if (s[t]) return !0;
        var r = ['<div class="ui-dialog-tips">', '<h4 class="tit">您没有该功能的使用权限哦！</h4>', "<p>请联系管理员为您授权！</p>", "</div>"].join(""),
            l = 280;
        if (o) {
            var c = window.location.search.indexOf("isHangxin") !== -1 ? 1 : 0;
            return !e && n.experDialog(1, c), !1
        }
        var d = {width: l, ok: !0, content: r};
        return !e && n.alertDialog(d), !1
    }, n.experDialog = function (t, e) {
        var i = n.getDefaultPage().SYSTEM, o = "", s = "", r = "http://www.jdy.com/buy/invoicing/";
        1 === i.siVersion ? r = "http://www.jdy.com/buy/invoicing/" : 3 === i.siVersion && (r = "http://www.jdy.com/upgrade_renew/?action=renew&accid=" + i.DBID + "&lan=zh-CHS&sourceFrom=assistant_btn "), e && (s = "display:none"), 3 === t && (o = '<div class="ui-loading-customer"><div class="dialog-box"><div class="dialog-content"><h3>您可以选择的服务</h3><h4>1、演示账套</h4><p>已有演示数据，仅供用户体验</p><h4>2、立即开通试用</h4><p>可录入真实数据，免费试用一个月</p></div><div class="btn-box"><a class="btn font-blue" id="cancel" href>演示账套</a><a class="btn btn-blue" id="dredge">立即试用</a></div></div><div>'), 2 === t && (o = '<div class="ui-loading-customer"><div class="dialog-box"><div class="dialog-content"><p class="mt30">您的服务即将到期，为了不影响您的使用，请尽快购买</p></div><div class="btn-box"><a class="btn font-blue" id="cancel" href>取消</a><a class="btn btn-blue" href="' + r + '" target="_blank" style="' + s + '">立即购买</a></div></div><div>'), 1 === t && (o = '<div class="ui-loading-customer"><div class="dialog-box"><div class="dialog-content"><p class="mt30">谢谢您使用本产品，您的当前服务已经到期，到期3个月后数据将被自动清除，如需继续使用请购买/续费！</p></div><div class="btn-box"><a class="btn font-blue" id="cancel" href>取消</a><a class="btn btn-blue" href="' + r + '" target="_blank" style="' + s + '">立即购买</a></div></div><div>');
        var l = a(o),
            c = '<div id="ldg_lockmask" style="position: fixed; left: 0px; top: 0px; width: 100%; height: 100%; overflow: hidden; z-index: 1977;"></div>',
            d = a(c);
        d.appendTo("body"), l.appendTo("body"), a("#cancel").on("click", function (t) {
            t.preventDefault(), l.remove(), d.remove()
        }), a("#dredge").on("click", function () {
            d.remove();
            var t = "http://service.youshang.com/myservice/selectIDC.jsp?isJdy=true&serviceId=0&areaName=&productId=101918&accountHolderType=1";
            window.location.href = t
        })
    }, n.formatGoodsName = function (t) {
        var e = t.number, i = t.name, n = t.spec ? "_" + t.spec : "";
        return e + " " + i + n
    }, n.goodsCombo = function (t, e) {
        var i = n.getDefaultPage();
        if (0 !== t.length) {
            e = a.extend(!0, {
                data: function () {
                    return i.SYSTEM.goodsInfo ? i.SYSTEM.goodsInfo : "/basedata/inventory.do?action=listCache"
                },
                ajaxOptions: {
                    formatData: function (t) {
                        return i.SYSTEM.goodsInfo = t.data.rows, t.data.rows
                    }
                },
                formatText: function (t) {
                    return n.formatGoodsName(t)
                },
                value: "id",
                defaultSelected: -1,
                editable: !0,
                extraListHtml: '<a href="javascript:void(0);" class="quick-add-link quickAddGoods"><i class="ui-icon-add"></i>新增商品</a>',
                maxListWidth: 500,
                cache: !1,
                trigger: !1,
                listHeight: 182,
                listWrapCls: "ui-droplist-wrap",
                customMatch: function (t, e) {
                    var i = new RegExp(e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), "i"),
                        n = t.text + (t.rawData.pinYin || "");
                    if (n.search(i) === -1) {
                        var o = t.rawData.invSkus;
                        if (o) {
                            if (!(o.length > 0)) return !1;
                            for (var s = [], r = 0; r < o.length; r++) {
                                var l = (o[r].skuNumber || "") + (o[r].skuBarCode || "");
                                l.search(i) === -1 ? s.push("F") : s.push("T")
                            }
                            if (a.inArray("T", s) === -1) return !1
                        }
                    }
                    return !0
                },
                callback: {
                    onChange: function (t) {
                        var e = this;
                        e.addQuery = !0;
                        var i = this.input.parents("tr"), n = i.data("goodsInfo") || {};
                        t ? t.id !== n.id && (i.data("goodsInfo", t), i.data("storageInfo", {
                            id: t.locationId,
                            name: t.locationName
                        }), i.data("unitInfo", {
                            unitId: t.unitId,
                            name: t.unitName
                        })) : (i.data("goodsInfo", null), i.data("storageInfo", null), i.data("unitInfo", null))
                    }, incrementalSearch: function (e, o) {
                        var s = this, r = t.val();
                        n.ajax({
                            url: "/basedata/inventory.do?action=list",
                            data: {rows: 20, skey: r}
                        }).done(function (t) {
                            s.rawData = s.addData = t.rows, t.rows.length < s.opts.maxFilter ? s.addQuery = !1 : s.addQuery = !0, o.call(s);
                            var n = [];
                            a.each(t.rows, function (t, e) {
                                n.push(e.id)
                            }), a.each(e, function (t, e) {
                                a.inArray(e.value, n) !== -1 && (0 === t ? i.SYSTEM.goodsInfo.splice(t, 1) : i.SYSTEM.goodsInfo.splice(t - 1, 1))
                            }), a.merge(i.SYSTEM.goodsInfo, t.data.rows);
                            var r = i.SYSTEM.goodsInfo;
                            r.length > 100 && r.splice(0, r.length - 100)
                        })
                    }, onEnter: function () {
                        setTimeout(function () {
                            o.isExpanded && o.collapse()
                        }, 50)
                    }
                },
                forceSelection: !1,
                queryDelay: 0,
                inputCls: "edit_subject",
                wrapCls: "edit_subject_wrap",
                focusCls: "",
                disabledCls: "",
                activeCls: ""
            }, e);
            var o = t.combo(e).getCombo();
            return a(".quickAddGoods").unbind("click").on("click", function (e) {
                if (e.preventDefault(), n.verifyRight("INVENTORY_ADD")) {
                    var a = 1260, s = i.SYSTEM.enableStorage ? 790 : 690;
                    s = i.SYSTEM.enableAssistingProp ? s : s - 100, s = i.SYSTEM.ISSERNUM ? s + 40 : s, n.dialog({
                        title: "新增商品",
                        content: "url:/settings/goods-manage.jsp",
                        data: {
                            oper: "add", callback: function (e, n, a) {
                                var s = e.id;
                                i.SYSTEM.goodsInfo.push(e), e.unitId = e.unitId || e.baseUnitId, a && a.api.close(), o.loadData(i.SYSTEM.goodsInfo, "-1", !1), setTimeout(function () {
                                    o.selectByValue(s, !0), t.focus()
                                }, 10)
                            }
                        },
                        width: a,
                        height: s
                    })
                }
            }), o
        }
    }, n.forSearch = function (t, e) {
        t ? n.dialog({
            width: 470,
            height: 410,
            title: "商品库存查询",
            content: "url:/inventory.jsp",
            data: {id: t, text: e},
            cancelVal: "关闭"
        }) : parent.lib.tips({type: 2, content: "请先选择一个商品！"})
    }, n.openHyperlink = function (t, e) {
        if (!t) return !1;
        var i = window.listMenus[t], o = i.tabid, s = i.href, r = i.name;
        e && a.each(e, function (t, e) {
            s = s.indexOf("?") === -1 ? s + "?" + t + "=" + e : s + "&" + t + "=" + e
        }), n.addTabItem({tabid: o, text: r, url: s})
    }, n.setCacheView = function (t) {
        t && a.extend(!0, window.cacheView, t)
    }, n.getCacheView = function (t) {
        if (t) return window.cacheView[t]
    }, n.addTabItem = function (t, e) {
        function i(i) {
            i && (i.render(), t.content = i.$el), e ? parent.tab.addTabItem(t) : window.tab.addTabItem(t)
        }

        if (t.model) if (n.getCacheView(t.tabid)) {
            var a = n.getCacheView(t.tabid);
            i(a)
        } else t.model(function (e) {
            var a = {};
            a[t.tabid] = e, n.setCacheView(a), i(e)
        }); else i()
    }, n.getRequest = function (t) {
        t || (t = location.search);
        var e, i = {};
        if (t.indexOf("?") !== -1) for (var n = t.substr(1), a = n.split("&"), o = 0, s = a.length; o < s; o++) e = a[o].split("="), i[e[0]] = decodeURIComponent(e[1]);
        return i
    }, t.exports = n
}, function (t, e) {
    var i = t.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
    "number" == typeof __g && (__g = i)
}, function (t, e, i) {
    t.exports = !i(15)(function () {
        return 7 != Object.defineProperty({}, "a", {
            get: function () {
                return 7
            }
        }).a
    })
}, function (t, e) {
    var i = {}.hasOwnProperty;
    t.exports = function (t, e) {
        return i.call(t, e)
    }
}, function (t, e, i) {
    var n = i(14), a = i(39), o = i(30), s = Object.defineProperty;
    e.f = i(6) ? Object.defineProperty : function (t, e, i) {
        if (n(t), e = o(e, !0), n(i), a) try {
            return s(t, e, i)
        } catch (t) {
        }
        if ("get" in i || "set" in i) throw TypeError("Accessors not supported!");
        return "value" in i && (t[e] = i.value), t
    }
}, function (t, e, i) {
    var n = i(8), a = i(17);
    t.exports = i(6) ? function (t, e, i) {
        return n.f(t, e, a(1, i))
    } : function (t, e, i) {
        return t[e] = i, t
    }
}, function (t, e, i) {
    var n = i(84), a = i(19);
    t.exports = function (t) {
        return n(a(t))
    }
}, function (t, e, i) {
    var n = i(28)("wks"), a = i(18), o = i(5).Symbol, s = "function" == typeof o, r = t.exports = function (t) {
        return n[t] || (n[t] = s && o[t] || (s ? o : a)("Symbol." + t))
    };
    r.store = n
}, function (t, e) {
    var i = t.exports = {version: "2.5.1"};
    "number" == typeof __e && (__e = i)
}, function (t, e) {
    t.exports = vendor_0a7be9fa1f9867917d75
}, function (t, e, i) {
    var n = i(16);
    t.exports = function (t) {
        if (!n(t)) throw TypeError(t + " is not an object!");
        return t
    }
}, function (t, e) {
    t.exports = function (t) {
        try {
            return !!t()
        } catch (t) {
            return !0
        }
    }
}, function (t, e) {
    t.exports = function (t) {
        return "object" == typeof t ? null !== t : "function" == typeof t
    }
}, function (t, e) {
    t.exports = function (t, e) {
        return {enumerable: !(1 & t), configurable: !(2 & t), writable: !(4 & t), value: e}
    }
}, function (t, e) {
    var i = 0, n = Math.random();
    t.exports = function (t) {
        return "Symbol(".concat(void 0 === t ? "" : t, ")_", (++i + n).toString(36))
    }
}, function (t, e) {
    t.exports = function (t) {
        if (void 0 == t) throw TypeError("Can't call method on  " + t);
        return t
    }
}, function (t, e) {
    t.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")
}, function (t, e, i) {
    var n = i(5), a = i(12), o = i(81), s = i(9), r = "prototype", l = function (t, e, i) {
        var c, d, u, h = t & l.F, f = t & l.G, p = t & l.S, m = t & l.P, g = t & l.B, v = t & l.W,
            b = f ? a : a[e] || (a[e] = {}), w = b[r], y = f ? n : p ? n[e] : (n[e] || {})[r];
        f && (i = e);
        for (c in i) d = !h && y && void 0 !== y[c], d && c in b || (u = d ? y[c] : i[c], b[c] = f && "function" != typeof y[c] ? i[c] : g && d ? o(u, n) : v && y[c] == u ? function (t) {
            var e = function (e, i, n) {
                if (this instanceof t) {
                    switch (arguments.length) {
                        case 0:
                            return new t;
                        case 1:
                            return new t(e);
                        case 2:
                            return new t(e, i)
                    }
                    return new t(e, i, n)
                }
                return t.apply(this, arguments)
            };
            return e[r] = t[r], e
        }(u) : m && "function" == typeof u ? o(Function.call, u) : u, m && ((b.virtual || (b.virtual = {}))[c] = u, t & l.R && w && !w[c] && s(w, c, u)))
    };
    l.F = 1, l.G = 2, l.S = 4, l.P = 8, l.B = 16, l.W = 32, l.U = 64, l.R = 128, t.exports = l
}, function (t, e) {
    t.exports = {}
}, function (t, e) {
    t.exports = !0
}, function (t, e, i) {
    var n = i(44), a = i(20);
    t.exports = Object.keys || function (t) {
        return n(t, a)
    }
}, function (t, e) {
    e.f = {}.propertyIsEnumerable
}, function (t, e, i) {
    var n = i(8).f, a = i(7), o = i(11)("toStringTag");
    t.exports = function (t, e, i) {
        t && !a(t = i ? t : t.prototype, o) && n(t, o, {configurable: !0, value: e})
    }
}, function (t, e, i) {
    var n = i(28)("keys"), a = i(18);
    t.exports = function (t) {
        return n[t] || (n[t] = a(t))
    }
}, function (t, e, i) {
    var n = i(5), a = "__core-js_shared__", o = n[a] || (n[a] = {});
    t.exports = function (t) {
        return o[t] || (o[t] = {})
    }
}, function (t, e) {
    var i = Math.ceil, n = Math.floor;
    t.exports = function (t) {
        return isNaN(t = +t) ? 0 : (t > 0 ? n : i)(t)
    }
}, function (t, e, i) {
    var n = i(16);
    t.exports = function (t, e) {
        if (!n(t)) return t;
        var i, a;
        if (e && "function" == typeof(i = t.toString) && !n(a = i.call(t))) return a;
        if ("function" == typeof(i = t.valueOf) && !n(a = i.call(t))) return a;
        if (!e && "function" == typeof(i = t.toString) && !n(a = i.call(t))) return a;
        throw TypeError("Can't convert object to primitive value")
    }
}, function (t, e, i) {
    var n = i(5), a = i(12), o = i(23), s = i(32), r = i(8).f;
    t.exports = function (t) {
        var e = a.Symbol || (a.Symbol = o ? {} : n.Symbol || {});
        "_" == t.charAt(0) || t in e || r(e, t, {value: s.f(t)})
    }
}, function (t, e, i) {
    e.f = i(11)
}, function (t, e, i) {
    "use strict";
    i(111);
    var n = i(3), a = i(1), o = void 0;
    o = n.module({}), o.initialize(), o.Views.Mian = n.View.extend({
        template: "tab/list",
        keep: !0,
        className: "tab",
        events: {"click li": "clickTab"},
        serialize: function () {
            return this.model.attributes
        },
        initialize: function () {
            var t = this;
            t.model = t.model || new o.Model, this.listenTo(t.model, "clickTab", function (e) {
                t.$el.find("#" + e).trigger("click")
            })
        },
        beforeRender: function () {
        },
        afterRender: function () {
            var t = this.defaultSelectId;
            t && this.$el.find("#" + t).trigger("click")
        },
        clickTab: function (t) {
            var e = a(t.target);
            e.addClass("cur").siblings().removeClass("cur");
            var i = a(t.target).attr("id");
            this.model.trigger("changeTab", i)
        }
    }), t.exports = o
}, function (t, e, i) {
    t.exports = {default: i(74), __esModule: !0}
}, function (t, e, i) {
    "use strict";

    function n(t) {
        return t && t.__esModule ? t : {default: t}
    }

    e.__esModule = !0;
    var a = i(72), o = n(a), s = i(71), r = n(s),
        l = "function" == typeof r.default && "symbol" == typeof o.default ? function (t) {
            return typeof t
        } : function (t) {
            return t && "function" == typeof r.default && t.constructor === r.default && t !== r.default.prototype ? "symbol" : typeof t
        };
    e.default = "function" == typeof r.default && "symbol" === l(o.default) ? function (t) {
        return "undefined" == typeof t ? "undefined" : l(t)
    } : function (t) {
        return t && "function" == typeof r.default && t.constructor === r.default && t !== r.default.prototype ? "symbol" : "undefined" == typeof t ? "undefined" : l(t)
    }
}, function (t, e) {
    !function (t) {
        "use strict";
        t.console || (t.console = {});
        for (var e, i, n = t.console, a = function () {
        }, o = ["memory"], s = "assert,clear,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn".split(","); e = o.pop();) n[e] || (n[e] = {});
        for (; i = s.pop();) "function" != typeof n[i] && (n[i] = a)
    }("undefined" == typeof window ? this : window)
}, function (t, e) {
    var i = {}.toString;
    t.exports = function (t) {
        return i.call(t).slice(8, -1)
    }
}, function (t, e, i) {
    var n = i(16), a = i(5).document, o = n(a) && n(a.createElement);
    t.exports = function (t) {
        return o ? a.createElement(t) : {}
    }
}, function (t, e, i) {
    t.exports = !i(6) && !i(15)(function () {
        return 7 != Object.defineProperty(i(38)("div"), "a", {
            get: function () {
                return 7
            }
        }).a
    })
}, function (t, e, i) {
    "use strict";
    var n = i(23), a = i(21), o = i(45), s = i(9), r = i(7), l = i(22), c = i(86), d = i(26), u = i(92),
        h = i(11)("iterator"), f = !([].keys && "next" in [].keys()), p = "@@iterator", m = "keys", g = "values",
        v = function () {
            return this
        };
    t.exports = function (t, e, i, b, w, y, x) {
        c(i, e, b);
        var _, S, T, k = function (t) {
                if (!f && t in R) return R[t];
                switch (t) {
                    case m:
                        return function () {
                            return new i(this, t)
                        };
                    case g:
                        return function () {
                            return new i(this, t)
                        }
                }
                return function () {
                    return new i(this, t)
                }
            }, E = e + " Iterator", D = w == g, I = !1, R = t.prototype, C = R[h] || R[p] || w && R[w], M = C || k(w),
            O = w ? D ? k("entries") : M : void 0, N = "Array" == e ? R.entries || C : C;
        if (N && (T = u(N.call(new t)), T !== Object.prototype && T.next && (d(T, E, !0), n || r(T, h) || s(T, h, v))), D && C && C.name !== g && (I = !0, M = function () {
                return C.call(this)
            }), n && !x || !f && !I && R[h] || s(R, h, M), l[e] = M, l[E] = v, w) if (_ = {
                values: D ? M : k(g),
                keys: y ? M : k(m),
                entries: O
            }, x) for (S in _) S in R || o(R, S, _[S]); else a(a.P + a.F * (f || I), e, _);
        return _
    }
}, function (t, e, i) {
    var n = i(14), a = i(89), o = i(20), s = i(27)("IE_PROTO"), r = function () {
    }, l = "prototype", c = function () {
        var t, e = i(38)("iframe"), n = o.length, a = "<", s = ">";
        for (e.style.display = "none", i(83).appendChild(e), e.src = "javascript:", t = e.contentWindow.document, t.open(), t.write(a + "script" + s + "document.F=Object" + a + "/script" + s), t.close(), c = t.F; n--;) delete c[l][o[n]];
        return c()
    };
    t.exports = Object.create || function (t, e) {
        var i;
        return null !== t ? (r[l] = n(t), i = new r, r[l] = null, i[s] = t) : i = c(), void 0 === e ? i : a(i, e)
    }
}, function (t, e, i) {
    var n = i(44), a = i(20).concat("length", "prototype");
    e.f = Object.getOwnPropertyNames || function (t) {
        return n(t, a)
    }
}, function (t, e) {
    e.f = Object.getOwnPropertySymbols
}, function (t, e, i) {
    var n = i(7), a = i(10), o = i(80)(!1), s = i(27)("IE_PROTO");
    t.exports = function (t, e) {
        var i, r = a(t), l = 0, c = [];
        for (i in r) i != s && n(r, i) && c.push(i);
        for (; e.length > l;) n(r, i = e[l++]) && (~o(c, i) || c.push(i));
        return c
    }
}, function (t, e, i) {
    t.exports = i(9)
}, function (t, e, i) {
    var n, a;
    !function (o, s) {
        "use strict";
        n = s, a = "function" == typeof n ? n.call(e, i, e, t) : n, !(void 0 !== a && (t.exports = a))
    }(this, function () {
        var t, e, i, n, a = Function.call, o = Object.prototype, s = a.bind(o.hasOwnProperty),
            r = a.bind(o.propertyIsEnumerable), l = a.bind(o.toString), c = s(o, "__defineGetter__");
        c && (t = a.bind(o.__defineGetter__), e = a.bind(o.__defineSetter__), i = a.bind(o.__lookupGetter__), n = a.bind(o.__lookupSetter__));
        var d = function (t) {
            return null == t || "object" != typeof t && "function" != typeof t
        };
        Object.getPrototypeOf || (Object.getPrototypeOf = function (t) {
            var e = t.__proto__;
            return e || null === e ? e : "[object Function]" === l(t.constructor) ? t.constructor.prototype : t instanceof Object ? o : null
        });
        var u = function (t) {
            try {
                return t.sentinel = 0, 0 === Object.getOwnPropertyDescriptor(t, "sentinel").value
            } catch (t) {
                return !1
            }
        };
        if (Object.defineProperty) {
            var h = u({}), f = "undefined" == typeof document || u(document.createElement("div"));
            if (!f || !h) var p = Object.getOwnPropertyDescriptor
        }
        if (!Object.getOwnPropertyDescriptor || p) {
            var m = "Object.getOwnPropertyDescriptor called on a non-object: ";
            Object.getOwnPropertyDescriptor = function (t, e) {
                if (d(t)) throw new TypeError(m + t);
                if (p) try {
                    return p.call(Object, t, e)
                } catch (t) {
                }
                var a;
                if (!s(t, e)) return a;
                if (a = {enumerable: r(t, e), configurable: !0}, c) {
                    var l = t.__proto__, u = t !== o;
                    u && (t.__proto__ = o);
                    var h = i(t, e), f = n(t, e);
                    if (u && (t.__proto__ = l), h || f) return h && (a.get = h), f && (a.set = f), a
                }
                return a.value = t[e], a.writable = !0, a
            }
        }
        if (Object.getOwnPropertyNames || (Object.getOwnPropertyNames = function (t) {
                return Object.keys(t)
            }), !Object.create) {
            var g, v = !({__proto__: null} instanceof Object), b = function () {
                if (!document.domain) return !1;
                try {
                    return !!new ActiveXObject("htmlfile")
                } catch (t) {
                    return !1
                }
            }, w = function () {
                var t, e;
                e = new ActiveXObject("htmlfile");
                var i = "script";
                return e.write("<" + i + "></" + i + ">"), e.close(), t = e.parentWindow.Object.prototype, e = null, t
            }, y = function () {
                var t, e = document.createElement("iframe"), i = document.body || document.documentElement;
                return e.style.display = "none", i.appendChild(e), e.src = "javascript:", t = e.contentWindow.Object.prototype, i.removeChild(e), e = null, t
            };
            g = v || "undefined" == typeof document ? function () {
                return {__proto__: null}
            } : function () {
                var t = b() ? w() : y();
                delete t.constructor, delete t.hasOwnProperty, delete t.propertyIsEnumerable, delete t.isPrototypeOf, delete t.toLocaleString, delete t.toString, delete t.valueOf;
                var e = function () {
                };
                return e.prototype = t, g = function () {
                    return new e
                }, new e
            }, Object.create = function (t, e) {
                var i, n = function () {
                };
                if (null === t) i = g(); else {
                    if (null !== t && d(t)) throw new TypeError("Object prototype may only be an Object or null");
                    n.prototype = t, i = new n, i.__proto__ = t
                }
                return void 0 !== e && Object.defineProperties(i, e), i
            }
        }
        var x = function (t) {
            try {
                return Object.defineProperty(t, "sentinel", {}), "sentinel" in t
            } catch (t) {
                return !1
            }
        };
        if (Object.defineProperty) {
            var _ = x({}), S = "undefined" == typeof document || x(document.createElement("div"));
            if (!_ || !S) var T = Object.defineProperty, k = Object.defineProperties
        }
        if (!Object.defineProperty || T) {
            var E = "Property description must be an object: ", D = "Object.defineProperty called on non-object: ",
                I = "getters & setters can not be defined on this javascript engine";
            Object.defineProperty = function (a, s, r) {
                if (d(a)) throw new TypeError(D + a);
                if (d(r)) throw new TypeError(E + r);
                if (T) try {
                    return T.call(Object, a, s, r)
                } catch (t) {
                }
                if ("value" in r) if (c && (i(a, s) || n(a, s))) {
                    var l = a.__proto__;
                    a.__proto__ = o, delete a[s], a[s] = r.value, a.__proto__ = l
                } else a[s] = r.value; else {
                    var u = "get" in r, h = "set" in r;
                    if (!c && (u || h)) throw new TypeError(I);
                    u && t(a, s, r.get), h && e(a, s, r.set)
                }
                return a
            }
        }
        Object.defineProperties && !k || (Object.defineProperties = function (t, e) {
            if (k) try {
                return k.call(Object, t, e)
            } catch (t) {
            }
            return Object.keys(e).forEach(function (i) {
                "__proto__" !== i && Object.defineProperty(t, i, e[i])
            }), t
        }), Object.seal || (Object.seal = function (t) {
            if (Object(t) !== t) throw new TypeError("Object.seal can only be called on Objects.");
            return t
        }), Object.freeze || (Object.freeze = function (t) {
            if (Object(t) !== t) throw new TypeError("Object.freeze can only be called on Objects.");
            return t
        });
        try {
            Object.freeze(function () {
            })
        } catch (t) {
            Object.freeze = function (t) {
                return function (e) {
                    return "function" == typeof e ? e : t(e)
                }
            }(Object.freeze)
        }
        Object.preventExtensions || (Object.preventExtensions = function (t) {
            if (Object(t) !== t) throw new TypeError("Object.preventExtensions can only be called on Objects.");
            return t
        }), Object.isSealed || (Object.isSealed = function (t) {
            if (Object(t) !== t) throw new TypeError("Object.isSealed can only be called on Objects.");
            return !1
        }), Object.isFrozen || (Object.isFrozen = function (t) {
            if (Object(t) !== t) throw new TypeError("Object.isFrozen can only be called on Objects.");
            return !1
        }), Object.isExtensible || (Object.isExtensible = function (t) {
            if (Object(t) !== t) throw new TypeError("Object.isExtensible can only be called on Objects.");
            for (var e = ""; s(t, e);) e += "?";
            t[e] = !0;
            var i = s(t, e);
            return delete t[e], i
        })
    })
}, function (t, e, i) {
    var n, a;
    !function (o, s) {
        "use strict";
        n = s, a = "function" == typeof n ? n.call(e, i, e, t) : n, !(void 0 !== a && (t.exports = a))
    }(this, function () {
        var t, e, i = Array, n = i.prototype, a = Object, o = a.prototype, s = Function, r = s.prototype, l = String,
            c = l.prototype, d = Number, u = d.prototype, h = n.slice, f = n.splice, p = n.push, m = n.unshift,
            g = n.concat, v = n.join, b = r.call, w = r.apply, y = Math.max, x = Math.min, _ = o.toString,
            S = "function" == typeof Symbol && "symbol" == typeof Symbol.toStringTag, T = Function.prototype.toString,
            k = /^\s*class /, E = function (t) {
                try {
                    var e = T.call(t), i = e.replace(/\/\/.*\n/g, ""), n = i.replace(/\/\*[.\s\S]*\*\//g, ""),
                        a = n.replace(/\n/gm, " ").replace(/ {2}/g, " ");
                    return k.test(a)
                } catch (t) {
                    return !1
                }
            }, D = function (t) {
                try {
                    return !E(t) && (T.call(t), !0)
                } catch (t) {
                    return !1
                }
            }, I = "[object Function]", R = "[object GeneratorFunction]", t = function (t) {
                if (!t) return !1;
                if ("function" != typeof t && "object" != typeof t) return !1;
                if (S) return D(t);
                if (E(t)) return !1;
                var e = _.call(t);
                return e === I || e === R
            }, C = RegExp.prototype.exec, M = function (t) {
                try {
                    return C.call(t), !0
                } catch (t) {
                    return !1
                }
            }, O = "[object RegExp]";
        e = function (t) {
            return "object" == typeof t && (S ? M(t) : _.call(t) === O)
        };
        var N, j = String.prototype.valueOf, A = function (t) {
            try {
                return j.call(t), !0
            } catch (t) {
                return !1
            }
        }, Y = "[object String]";
        N = function (t) {
            return "string" == typeof t || "object" == typeof t && (S ? A(t) : _.call(t) === Y)
        };
        var L = a.defineProperty && function () {
            try {
                var t = {};
                a.defineProperty(t, "x", {enumerable: !1, value: t});
                for (var e in t) return !1;
                return t.x === t
            } catch (t) {
                return !1
            }
        }(), U = function (t) {
            var e;
            return e = L ? function (t, e, i, n) {
                !n && e in t || a.defineProperty(t, e, {configurable: !0, enumerable: !1, writable: !0, value: i})
            } : function (t, e, i, n) {
                !n && e in t || (t[e] = i)
            }, function (i, n, a) {
                for (var o in n) t.call(n, o) && e(i, o, n[o], a)
            }
        }(o.hasOwnProperty), P = function (t) {
            var e = typeof t;
            return null === t || "object" !== e && "function" !== e
        }, z = d.isNaN || function (t) {
            return t !== t
        }, $ = {
            ToInteger: function (t) {
                var e = +t;
                return z(e) ? e = 0 : 0 !== e && e !== 1 / 0 && e !== -(1 / 0) && (e = (e > 0 || -1) * Math.floor(Math.abs(e))), e
            }, ToPrimitive: function (e) {
                var i, n, a;
                if (P(e)) return e;
                if (n = e.valueOf, t(n) && (i = n.call(e), P(i))) return i;
                if (a = e.toString, t(a) && (i = a.call(e), P(i))) return i;
                throw new TypeError
            }, ToObject: function (t) {
                if (null == t) throw new TypeError("can't convert " + t + " to object");
                return a(t)
            }, ToUint32: function (t) {
                return t >>> 0
            }
        }, B = function () {
        };
        U(r, {
            bind: function (e) {
                var i = this;
                if (!t(i)) throw new TypeError("Function.prototype.bind called on incompatible " + i);
                for (var n, o = h.call(arguments, 1), r = function () {
                    if (this instanceof n) {
                        var t = w.call(i, this, g.call(o, h.call(arguments)));
                        return a(t) === t ? t : this
                    }
                    return w.call(i, e, g.call(o, h.call(arguments)))
                }, l = y(0, i.length - o.length), c = [], d = 0; d < l; d++) p.call(c, "$" + d);
                return n = s("binder", "return function (" + v.call(c, ",") + "){ return binder.apply(this, arguments); }")(r), i.prototype && (B.prototype = i.prototype, n.prototype = new B, B.prototype = null), n
            }
        });
        var Q = b.bind(o.hasOwnProperty), V = b.bind(o.toString), F = b.bind(h), W = w.bind(h), H = b.bind(c.slice),
            G = b.bind(c.split), J = b.bind(c.indexOf), Z = b.bind(p), q = b.bind(o.propertyIsEnumerable),
            X = b.bind(n.sort), K = i.isArray || function (t) {
                return "[object Array]" === V(t)
            }, tt = 1 !== [].unshift(0);
        U(n, {
            unshift: function () {
                return m.apply(this, arguments), this.length
            }
        }, tt), U(i, {isArray: K});
        var et = a("a"), it = "a" !== et[0] || !(0 in et), nt = function (t) {
            var e = !0, i = !0, n = !1;
            if (t) try {
                t.call("foo", function (t, i, n) {
                    "object" != typeof n && (e = !1)
                }), t.call([1], function () {
                    "use strict";
                    i = "string" == typeof this
                }, "x")
            } catch (t) {
                n = !0
            }
            return !!t && !n && e && i
        };
        U(n, {
            forEach: function (e) {
                var i, n = $.ToObject(this), a = it && N(this) ? G(this, "") : n, o = -1, s = $.ToUint32(a.length);
                if (arguments.length > 1 && (i = arguments[1]), !t(e)) throw new TypeError("Array.prototype.forEach callback must be a function");
                for (; ++o < s;) o in a && ("undefined" == typeof i ? e(a[o], o, n) : e.call(i, a[o], o, n))
            }
        }, !nt(n.forEach)),
            U(n, {
                map: function (e) {
                    var n, a = $.ToObject(this), o = it && N(this) ? G(this, "") : a, s = $.ToUint32(o.length),
                        r = i(s);
                    if (arguments.length > 1 && (n = arguments[1]), !t(e)) throw new TypeError("Array.prototype.map callback must be a function");
                    for (var l = 0; l < s; l++) l in o && ("undefined" == typeof n ? r[l] = e(o[l], l, a) : r[l] = e.call(n, o[l], l, a));
                    return r
                }
            }, !nt(n.map)), U(n, {
            filter: function (e) {
                var i, n, a = $.ToObject(this), o = it && N(this) ? G(this, "") : a, s = $.ToUint32(o.length), r = [];
                if (arguments.length > 1 && (n = arguments[1]), !t(e)) throw new TypeError("Array.prototype.filter callback must be a function");
                for (var l = 0; l < s; l++) l in o && (i = o[l], ("undefined" == typeof n ? e(i, l, a) : e.call(n, i, l, a)) && Z(r, i));
                return r
            }
        }, !nt(n.filter)), U(n, {
            every: function (e) {
                var i, n = $.ToObject(this), a = it && N(this) ? G(this, "") : n, o = $.ToUint32(a.length);
                if (arguments.length > 1 && (i = arguments[1]), !t(e)) throw new TypeError("Array.prototype.every callback must be a function");
                for (var s = 0; s < o; s++) if (s in a && !("undefined" == typeof i ? e(a[s], s, n) : e.call(i, a[s], s, n))) return !1;
                return !0
            }
        }, !nt(n.every)), U(n, {
            some: function (e) {
                var i, n = $.ToObject(this), a = it && N(this) ? G(this, "") : n, o = $.ToUint32(a.length);
                if (arguments.length > 1 && (i = arguments[1]), !t(e)) throw new TypeError("Array.prototype.some callback must be a function");
                for (var s = 0; s < o; s++) if (s in a && ("undefined" == typeof i ? e(a[s], s, n) : e.call(i, a[s], s, n))) return !0;
                return !1
            }
        }, !nt(n.some));
        var at = !1;
        n.reduce && (at = "object" == typeof n.reduce.call("es5", function (t, e, i, n) {
            return n
        })), U(n, {
            reduce: function (e) {
                var i = $.ToObject(this), n = it && N(this) ? G(this, "") : i, a = $.ToUint32(n.length);
                if (!t(e)) throw new TypeError("Array.prototype.reduce callback must be a function");
                if (0 === a && 1 === arguments.length) throw new TypeError("reduce of empty array with no initial value");
                var o, s = 0;
                if (arguments.length >= 2) o = arguments[1]; else for (; ;) {
                    if (s in n) {
                        o = n[s++];
                        break
                    }
                    if (++s >= a) throw new TypeError("reduce of empty array with no initial value")
                }
                for (; s < a; s++) s in n && (o = e(o, n[s], s, i));
                return o
            }
        }, !at);
        var ot = !1;
        n.reduceRight && (ot = "object" == typeof n.reduceRight.call("es5", function (t, e, i, n) {
            return n
        })), U(n, {
            reduceRight: function (e) {
                var i = $.ToObject(this), n = it && N(this) ? G(this, "") : i, a = $.ToUint32(n.length);
                if (!t(e)) throw new TypeError("Array.prototype.reduceRight callback must be a function");
                if (0 === a && 1 === arguments.length) throw new TypeError("reduceRight of empty array with no initial value");
                var o, s = a - 1;
                if (arguments.length >= 2) o = arguments[1]; else for (; ;) {
                    if (s in n) {
                        o = n[s--];
                        break
                    }
                    if (--s < 0) throw new TypeError("reduceRight of empty array with no initial value")
                }
                if (s < 0) return o;
                do s in n && (o = e(o, n[s], s, i)); while (s--);
                return o
            }
        }, !ot);
        var st = n.indexOf && [0, 1].indexOf(1, 2) !== -1;
        U(n, {
            indexOf: function (t) {
                var e = it && N(this) ? G(this, "") : $.ToObject(this), i = $.ToUint32(e.length);
                if (0 === i) return -1;
                var n = 0;
                for (arguments.length > 1 && (n = $.ToInteger(arguments[1])), n = n >= 0 ? n : y(0, i + n); n < i; n++) if (n in e && e[n] === t) return n;
                return -1
            }
        }, st);
        var rt = n.lastIndexOf && [0, 1].lastIndexOf(0, -3) !== -1;
        U(n, {
            lastIndexOf: function (t) {
                var e = it && N(this) ? G(this, "") : $.ToObject(this), i = $.ToUint32(e.length);
                if (0 === i) return -1;
                var n = i - 1;
                for (arguments.length > 1 && (n = x(n, $.ToInteger(arguments[1]))), n = n >= 0 ? n : i - Math.abs(n); n >= 0; n--) if (n in e && t === e[n]) return n;
                return -1
            }
        }, rt);
        var lt = function () {
            var t = [1, 2], e = t.splice();
            return 2 === t.length && K(e) && 0 === e.length
        }();
        U(n, {
            splice: function (t, e) {
                return 0 === arguments.length ? [] : f.apply(this, arguments)
            }
        }, !lt);
        var ct = function () {
            var t = {};
            return n.splice.call(t, 0, 0, 1), 1 === t.length
        }();
        U(n, {
            splice: function (t, e) {
                if (0 === arguments.length) return [];
                var i = arguments;
                return this.length = y($.ToInteger(this.length), 0), arguments.length > 0 && "number" != typeof e && (i = F(arguments), i.length < 2 ? Z(i, this.length - t) : i[1] = $.ToInteger(e)), f.apply(this, i)
            }
        }, !ct);
        var dt = function () {
            var t = new i(1e5);
            return t[8] = "x", t.splice(1, 1), 7 === t.indexOf("x")
        }(), ut = function () {
            var t = 256, e = [];
            return e[t] = "a", e.splice(t + 1, 0, "b"), "a" === e[t]
        }();
        U(n, {
            splice: function (t, e) {
                for (var i, n = $.ToObject(this), a = [], o = $.ToUint32(n.length), s = $.ToInteger(t), r = s < 0 ? y(o + s, 0) : x(s, o), c = x(y($.ToInteger(e), 0), o - r), d = 0; d < c;) i = l(r + d), Q(n, i) && (a[d] = n[i]), d += 1;
                var u, h = F(arguments, 2), f = h.length;
                if (f < c) {
                    d = r;
                    for (var p = o - c; d < p;) i = l(d + c), u = l(d + f), Q(n, i) ? n[u] = n[i] : delete n[u], d += 1;
                    d = o;
                    for (var m = o - c + f; d > m;) delete n[d - 1], d -= 1
                } else if (f > c) for (d = o - c; d > r;) i = l(d + c - 1), u = l(d + f - 1), Q(n, i) ? n[u] = n[i] : delete n[u], d -= 1;
                d = r;
                for (var g = 0; g < h.length; ++g) n[d] = h[g], d += 1;
                return n.length = o - c + f, a
            }
        }, !dt || !ut);
        var ht, ft = n.join;
        try {
            ht = "1,2,3" !== Array.prototype.join.call("123", ",")
        } catch (t) {
            ht = !0
        }
        ht && U(n, {
            join: function (t) {
                var e = "undefined" == typeof t ? "," : t;
                return ft.call(N(this) ? G(this, "") : this, e)
            }
        }, ht);
        var pt = "1,2" !== [1, 2].join(void 0);
        pt && U(n, {
            join: function (t) {
                var e = "undefined" == typeof t ? "," : t;
                return ft.call(this, e)
            }
        }, pt);
        var mt = function (t) {
            for (var e = $.ToObject(this), i = $.ToUint32(e.length), n = 0; n < arguments.length;) e[i + n] = arguments[n], n += 1;
            return e.length = i + n, i + n
        }, gt = function () {
            var t = {}, e = Array.prototype.push.call(t, void 0);
            return 1 !== e || 1 !== t.length || "undefined" != typeof t[0] || !Q(t, 0)
        }();
        U(n, {
            push: function (t) {
                return K(this) ? p.apply(this, arguments) : mt.apply(this, arguments)
            }
        }, gt);
        var vt = function () {
            var t = [], e = t.push(void 0);
            return 1 !== e || 1 !== t.length || "undefined" != typeof t[0] || !Q(t, 0)
        }();
        U(n, {push: mt}, vt), U(n, {
            slice: function (t, e) {
                var i = N(this) ? G(this, "") : this;
                return W(i, arguments)
            }
        }, it);
        var bt = function () {
            try {
                return [1, 2].sort(null), [1, 2].sort({}), !0
            } catch (t) {
            }
            return !1
        }(), wt = function () {
            try {
                return [1, 2].sort(/a/), !1
            } catch (t) {
            }
            return !0
        }(), yt = function () {
            try {
                return [1, 2].sort(void 0), !0
            } catch (t) {
            }
            return !1
        }();
        U(n, {
            sort: function (e) {
                if ("undefined" == typeof e) return X(this);
                if (!t(e)) throw new TypeError("Array.prototype.sort callback must be a function");
                return X(this, e)
            }
        }, bt || !yt || !wt);
        var xt = !q({toString: null}, "toString"), _t = q(function () {
            }, "prototype"), St = !Q("x", "0"), Tt = function (t) {
                var e = t.constructor;
                return e && e.prototype === t
            }, kt = {
                $window: !0,
                $console: !0,
                $parent: !0,
                $self: !0,
                $frame: !0,
                $frames: !0,
                $frameElement: !0,
                $webkitIndexedDB: !0,
                $webkitStorageInfo: !0,
                $external: !0
            }, Et = function () {
                if ("undefined" == typeof window) return !1;
                for (var t in window) try {
                    !kt["$" + t] && Q(window, t) && null !== window[t] && "object" == typeof window[t] && Tt(window[t])
                } catch (t) {
                    return !0
                }
                return !1
            }(), Dt = function (t) {
                if ("undefined" == typeof window || !Et) return Tt(t);
                try {
                    return Tt(t)
                } catch (t) {
                    return !1
                }
            },
            It = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
            Rt = It.length, Ct = function (t) {
                return "[object Arguments]" === V(t)
            }, Mt = function (e) {
                return null !== e && "object" == typeof e && "number" == typeof e.length && e.length >= 0 && !K(e) && t(e.callee)
            }, Ot = Ct(arguments) ? Ct : Mt;
        U(a, {
            keys: function (e) {
                var i = t(e), n = Ot(e), a = null !== e && "object" == typeof e, o = a && N(e);
                if (!a && !i && !n) throw new TypeError("Object.keys called on a non-object");
                var s = [], r = _t && i;
                if (o && St || n) for (var c = 0; c < e.length; ++c) Z(s, l(c));
                if (!n) for (var d in e) r && "prototype" === d || !Q(e, d) || Z(s, l(d));
                if (xt) for (var u = Dt(e), h = 0; h < Rt; h++) {
                    var f = It[h];
                    u && "constructor" === f || !Q(e, f) || Z(s, f)
                }
                return s
            }
        });
        var Nt = a.keys && function () {
            return 2 === a.keys(arguments).length
        }(1, 2), jt = a.keys && function () {
            var t = a.keys(arguments);
            return 1 !== arguments.length || 1 !== t.length || 1 !== t[0]
        }(1), At = a.keys;
        U(a, {
            keys: function (t) {
                return At(Ot(t) ? F(t) : t)
            }
        }, !Nt || jt);
        var Yt, Lt, Ut = 0 !== new Date(-0xc782b5b342b24).getUTCMonth(), Pt = new Date(-0x55d318d56a724),
            zt = new Date(14496624e5), $t = "Mon, 01 Jan -45875 11:59:59 GMT" !== Pt.toUTCString(),
            Bt = Pt.getTimezoneOffset();
        Bt < -720 ? (Yt = "Tue Jan 02 -45875" !== Pt.toDateString(), Lt = !/^Thu Dec 10 2015 \d\d:\d\d:\d\d GMT[-\+]\d\d\d\d(?: |$)/.test(zt.toString())) : (Yt = "Mon Jan 01 -45875" !== Pt.toDateString(), Lt = !/^Wed Dec 09 2015 \d\d:\d\d:\d\d GMT[-\+]\d\d\d\d(?: |$)/.test(zt.toString()));
        var Qt = b.bind(Date.prototype.getFullYear), Vt = b.bind(Date.prototype.getMonth),
            Ft = b.bind(Date.prototype.getDate), Wt = b.bind(Date.prototype.getUTCFullYear),
            Ht = b.bind(Date.prototype.getUTCMonth), Gt = b.bind(Date.prototype.getUTCDate),
            Jt = b.bind(Date.prototype.getUTCDay), Zt = b.bind(Date.prototype.getUTCHours),
            qt = b.bind(Date.prototype.getUTCMinutes), Xt = b.bind(Date.prototype.getUTCSeconds),
            Kt = b.bind(Date.prototype.getUTCMilliseconds), te = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            ee = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            ie = function (t, e) {
                return Ft(new Date(e, t, 0))
            };
        U(Date.prototype, {
            getFullYear: function () {
                if (!(this && this instanceof Date)) throw new TypeError("this is not a Date object.");
                var t = Qt(this);
                return t < 0 && Vt(this) > 11 ? t + 1 : t
            }, getMonth: function () {
                if (!(this && this instanceof Date)) throw new TypeError("this is not a Date object.");
                var t = Qt(this), e = Vt(this);
                return t < 0 && e > 11 ? 0 : e
            }, getDate: function () {
                if (!(this && this instanceof Date)) throw new TypeError("this is not a Date object.");
                var t = Qt(this), e = Vt(this), i = Ft(this);
                if (t < 0 && e > 11) {
                    if (12 === e) return i;
                    var n = ie(0, t + 1);
                    return n - i + 1
                }
                return i
            }, getUTCFullYear: function () {
                if (!(this && this instanceof Date)) throw new TypeError("this is not a Date object.");
                var t = Wt(this);
                return t < 0 && Ht(this) > 11 ? t + 1 : t
            }, getUTCMonth: function () {
                if (!(this && this instanceof Date)) throw new TypeError("this is not a Date object.");
                var t = Wt(this), e = Ht(this);
                return t < 0 && e > 11 ? 0 : e
            }, getUTCDate: function () {
                if (!(this && this instanceof Date)) throw new TypeError("this is not a Date object.");
                var t = Wt(this), e = Ht(this), i = Gt(this);
                if (t < 0 && e > 11) {
                    if (12 === e) return i;
                    var n = ie(0, t + 1);
                    return n - i + 1
                }
                return i
            }
        }, Ut), U(Date.prototype, {
            toUTCString: function () {
                if (!(this && this instanceof Date)) throw new TypeError("this is not a Date object.");
                var t = Jt(this), e = Gt(this), i = Ht(this), n = Wt(this), a = Zt(this), o = qt(this), s = Xt(this);
                return te[t] + ", " + (e < 10 ? "0" + e : e) + " " + ee[i] + " " + n + " " + (a < 10 ? "0" + a : a) + ":" + (o < 10 ? "0" + o : o) + ":" + (s < 10 ? "0" + s : s) + " GMT"
            }
        }, Ut || $t), U(Date.prototype, {
            toDateString: function () {
                if (!(this && this instanceof Date)) throw new TypeError("this is not a Date object.");
                var t = this.getDay(), e = this.getDate(), i = this.getMonth(), n = this.getFullYear();
                return te[t] + " " + ee[i] + " " + (e < 10 ? "0" + e : e) + " " + n
            }
        }, Ut || Yt), (Ut || Lt) && (Date.prototype.toString = function () {
            if (!(this && this instanceof Date)) throw new TypeError("this is not a Date object.");
            var t = this.getDay(), e = this.getDate(), i = this.getMonth(), n = this.getFullYear(), a = this.getHours(),
                o = this.getMinutes(), s = this.getSeconds(), r = this.getTimezoneOffset(),
                l = Math.floor(Math.abs(r) / 60), c = Math.floor(Math.abs(r) % 60);
            return te[t] + " " + ee[i] + " " + (e < 10 ? "0" + e : e) + " " + n + " " + (a < 10 ? "0" + a : a) + ":" + (o < 10 ? "0" + o : o) + ":" + (s < 10 ? "0" + s : s) + " GMT" + (r > 0 ? "-" : "+") + (l < 10 ? "0" + l : l) + (c < 10 ? "0" + c : c)
        }, L && a.defineProperty(Date.prototype, "toString", {configurable: !0, enumerable: !1, writable: !0}));
        var ne = -621987552e5, ae = "-000001",
            oe = Date.prototype.toISOString && new Date(ne).toISOString().indexOf(ae) === -1,
            se = Date.prototype.toISOString && "1969-12-31T23:59:59.999Z" !== new Date(-1).toISOString(),
            re = b.bind(Date.prototype.getTime);
        U(Date.prototype, {
            toISOString: function () {
                if (!isFinite(this) || !isFinite(re(this))) throw new RangeError("Date.prototype.toISOString called on non-finite value.");
                var t = Wt(this), e = Ht(this);
                t += Math.floor(e / 12), e = (e % 12 + 12) % 12;
                var i = [e + 1, Gt(this), Zt(this), qt(this), Xt(this)];
                t = (t < 0 ? "-" : t > 9999 ? "+" : "") + H("00000" + Math.abs(t), 0 <= t && t <= 9999 ? -4 : -6);
                for (var n = 0; n < i.length; ++n) i[n] = H("00" + i[n], -2);
                return t + "-" + F(i, 0, 2).join("-") + "T" + F(i, 2).join(":") + "." + H("000" + Kt(this), -3) + "Z"
            }
        }, oe || se);
        var le = function () {
            try {
                return Date.prototype.toJSON && null === new Date(NaN).toJSON() && new Date(ne).toJSON().indexOf(ae) !== -1 && Date.prototype.toJSON.call({
                    toISOString: function () {
                        return !0
                    }
                })
            } catch (t) {
                return !1
            }
        }();
        le || (Date.prototype.toJSON = function (e) {
            var i = a(this), n = $.ToPrimitive(i);
            if ("number" == typeof n && !isFinite(n)) return null;
            var o = i.toISOString;
            if (!t(o)) throw new TypeError("toISOString property is not callable");
            return o.call(i)
        });
        var ce = 1e15 === Date.parse("+033658-09-27T01:46:40.000Z"),
            de = !isNaN(Date.parse("2012-04-04T24:00:00.500Z")) || !isNaN(Date.parse("2012-11-31T23:59:59.000Z")) || !isNaN(Date.parse("2012-12-31T23:59:60.000Z")),
            ue = isNaN(Date.parse("2000-01-01T00:00:00.000Z"));
        if (ue || de || !ce) {
            var he = Math.pow(2, 31) - 1, fe = z(new Date(1970, 0, 1, 0, 0, 0, he + 1).getTime());
            Date = function (t) {
                var e = function (i, n, a, o, s, r, c) {
                        var d, u = arguments.length;
                        if (this instanceof t) {
                            var h = r, f = c;
                            if (fe && u >= 7 && c > he) {
                                var p = Math.floor(c / he) * he, m = Math.floor(p / 1e3);
                                h += m, f -= 1e3 * m
                            }
                            d = 1 === u && l(i) === i ? new t(e.parse(i)) : u >= 7 ? new t(i, n, a, o, s, h, f) : u >= 6 ? new t(i, n, a, o, s, h) : u >= 5 ? new t(i, n, a, o, s) : u >= 4 ? new t(i, n, a, o) : u >= 3 ? new t(i, n, a) : u >= 2 ? new t(i, n) : u >= 1 ? new t(i instanceof t ? +i : i) : new t
                        } else d = t.apply(this, arguments);
                        return P(d) || U(d, {constructor: e}, !0), d
                    },
                    i = new RegExp("^(\\d{4}|[+-]\\d{6})(?:-(\\d{2})(?:-(\\d{2})(?:T(\\d{2}):(\\d{2})(?::(\\d{2})(?:(\\.\\d{1,}))?)?(Z|(?:([-+])(\\d{2}):(\\d{2})))?)?)?)?$"),
                    n = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365], a = function (t, e) {
                        var i = e > 1 ? 1 : 0;
                        return n[e] + Math.floor((t - 1969 + i) / 4) - Math.floor((t - 1901 + i) / 100) + Math.floor((t - 1601 + i) / 400) + 365 * (t - 1970)
                    }, o = function (e) {
                        var i = 0, n = e;
                        if (fe && n > he) {
                            var a = Math.floor(n / he) * he, o = Math.floor(a / 1e3);
                            i += o, n -= 1e3 * o
                        }
                        return d(new t(1970, 0, 1, 0, 0, i, n))
                    };
                for (var s in t) Q(t, s) && (e[s] = t[s]);
                U(e, {now: t.now, UTC: t.UTC}, !0), e.prototype = t.prototype, U(e.prototype, {constructor: e}, !0);
                var r = function (e) {
                    var n = i.exec(e);
                    if (n) {
                        var s, r = d(n[1]), l = d(n[2] || 1) - 1, c = d(n[3] || 1) - 1, u = d(n[4] || 0),
                            h = d(n[5] || 0), f = d(n[6] || 0), p = Math.floor(1e3 * d(n[7] || 0)),
                            m = Boolean(n[4] && !n[8]), g = "-" === n[9] ? 1 : -1, v = d(n[10] || 0), b = d(n[11] || 0),
                            w = h > 0 || f > 0 || p > 0;
                        return u < (w ? 24 : 25) && h < 60 && f < 60 && p < 1e3 && l > -1 && l < 12 && v < 24 && b < 60 && c > -1 && c < a(r, l + 1) - a(r, l) && (s = 60 * (24 * (a(r, l) + c) + u + v * g), s = 1e3 * (60 * (s + h + b * g) + f) + p, m && (s = o(s)), -864e13 <= s && s <= 864e13) ? s : NaN
                    }
                    return t.parse.apply(this, arguments)
                };
                return U(e, {parse: r}), e
            }(Date)
        }
        Date.now || (Date.now = function () {
            return (new Date).getTime()
        });
        var pe = u.toFixed && ("0.000" !== 8e-5.toFixed(3) || "1" !== .9.toFixed(0) || "1.25" !== 1.255.toFixed(2) || "1000000000000000128" !== (0xde0b6b3a7640080).toFixed(0)),
            me = {
                base: 1e7, size: 6, data: [0, 0, 0, 0, 0, 0], multiply: function (t, e) {
                    for (var i = -1, n = e; ++i < me.size;) n += t * me.data[i], me.data[i] = n % me.base, n = Math.floor(n / me.base)
                }, divide: function (t) {
                    for (var e = me.size, i = 0; --e >= 0;) i += me.data[e], me.data[e] = Math.floor(i / t), i = i % t * me.base
                }, numToString: function () {
                    for (var t = me.size, e = ""; --t >= 0;) if ("" !== e || 0 === t || 0 !== me.data[t]) {
                        var i = l(me.data[t]);
                        "" === e ? e = i : e += H("0000000", 0, 7 - i.length) + i
                    }
                    return e
                }, pow: function t(e, i, n) {
                    return 0 === i ? n : i % 2 === 1 ? t(e, i - 1, n * e) : t(e * e, i / 2, n)
                }, log: function (t) {
                    for (var e = 0, i = t; i >= 4096;) e += 12, i /= 4096;
                    for (; i >= 2;) e += 1, i /= 2;
                    return e
                }
            }, ge = function (t) {
                var e, i, n, a, o, s, r, c;
                if (e = d(t), e = z(e) ? 0 : Math.floor(e), e < 0 || e > 20) throw new RangeError("Number.toFixed called with invalid number of decimals");
                if (i = d(this), z(i)) return "NaN";
                if (i <= -1e21 || i >= 1e21) return l(i);
                if (n = "", i < 0 && (n = "-", i = -i), a = "0", i > 1e-21) if (o = me.log(i * me.pow(2, 69, 1)) - 69, s = o < 0 ? i * me.pow(2, -o, 1) : i / me.pow(2, o, 1), s *= 4503599627370496, o = 52 - o, o > 0) {
                    for (me.multiply(0, s), r = e; r >= 7;) me.multiply(1e7, 0), r -= 7;
                    for (me.multiply(me.pow(10, r, 1), 0), r = o - 1; r >= 23;) me.divide(1 << 23), r -= 23;
                    me.divide(1 << r), me.multiply(1, 1), me.divide(2), a = me.numToString()
                } else me.multiply(0, s), me.multiply(1 << -o, 0), a = me.numToString() + H("0.00000000000000000000", 2, 2 + e);
                return e > 0 ? (c = a.length, a = c <= e ? n + H("0.0000000000000000000", 0, e - c + 2) + a : n + H(a, 0, c - e) + "." + H(a, c - e)) : a = n + a, a
            };
        U(u, {toFixed: ge}, pe);
        var ve = function () {
            try {
                return "1" === 1..toPrecision(void 0)
            } catch (t) {
                return !0
            }
        }(), be = u.toPrecision;
        U(u, {
            toPrecision: function (t) {
                return "undefined" == typeof t ? be.call(this) : be.call(this, t)
            }
        }, ve), 2 !== "ab".split(/(?:ab)*/).length || 4 !== ".".split(/(.?)(.?)/).length || "t" === "tesst".split(/(s)*/)[1] || 4 !== "test".split(/(?:)/, -1).length || "".split(/.?/).length || ".".split(/()()/).length > 1 ? !function () {
            var t = "undefined" == typeof/()??/.exec("")[1], i = Math.pow(2, 32) - 1;
            c.split = function (n, a) {
                var o = String(this);
                if ("undefined" == typeof n && 0 === a) return [];
                if (!e(n)) return G(this, n, a);
                var s, r, l, c, d = [],
                    u = (n.ignoreCase ? "i" : "") + (n.multiline ? "m" : "") + (n.unicode ? "u" : "") + (n.sticky ? "y" : ""),
                    h = 0, f = new RegExp(n.source, u + "g");
                t || (s = new RegExp("^" + f.source + "$(?!\\s)", u));
                var m = "undefined" == typeof a ? i : $.ToUint32(a);
                for (r = f.exec(o); r && (l = r.index + r[0].length, !(l > h && (Z(d, H(o, h, r.index)), !t && r.length > 1 && r[0].replace(s, function () {
                    for (var t = 1; t < arguments.length - 2; t++) "undefined" == typeof arguments[t] && (r[t] = void 0)
                }), r.length > 1 && r.index < o.length && p.apply(d, F(r, 1)), c = r[0].length, h = l, d.length >= m)));) f.lastIndex === r.index && f.lastIndex++, r = f.exec(o);
                return h === o.length ? !c && f.test("") || Z(d, "") : Z(d, H(o, h)), d.length > m ? F(d, 0, m) : d
            }
        }() : "0".split(void 0, 0).length && (c.split = function (t, e) {
            return "undefined" == typeof t && 0 === e ? [] : G(this, t, e)
        });
        var we = c.replace, ye = function () {
            var t = [];
            return "x".replace(/x(.)?/g, function (e, i) {
                Z(t, i)
            }), 1 === t.length && "undefined" == typeof t[0]
        }();
        ye || (c.replace = function (i, n) {
            var a = t(n), o = e(i) && /\)[*?]/.test(i.source);
            if (a && o) {
                var s = function (t) {
                    var e = arguments.length, a = i.lastIndex;
                    i.lastIndex = 0;
                    var o = i.exec(t) || [];
                    return i.lastIndex = a, Z(o, arguments[e - 2], arguments[e - 1]), n.apply(this, o)
                };
                return we.call(this, i, s)
            }
            return we.call(this, i, n)
        });
        var xe = c.substr, _e = "".substr && "b" !== "0b".substr(-1);
        U(c, {
            substr: function (t, e) {
                var i = t;
                return t < 0 && (i = y(this.length + t, 0)), xe.call(this, i, e)
            }
        }, _e);
        var Se = "\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff", Te = "​", ke = "[" + Se + "]",
            Ee = new RegExp("^" + ke + ke + "*"), De = new RegExp(ke + ke + "*$"),
            Ie = c.trim && (Se.trim() || !Te.trim());
        U(c, {
            trim: function () {
                if ("undefined" == typeof this || null === this) throw new TypeError("can't convert " + this + " to object");
                return l(this).replace(Ee, "").replace(De, "")
            }
        }, Ie);
        var Re = b.bind(String.prototype.trim), Ce = c.lastIndexOf && "abcあい".lastIndexOf("あい", 2) !== -1;
        U(c, {
            lastIndexOf: function (t) {
                if ("undefined" == typeof this || null === this) throw new TypeError("can't convert " + this + " to object");
                for (var e = l(this), i = l(t), n = arguments.length > 1 ? d(arguments[1]) : NaN, a = z(n) ? 1 / 0 : $.ToInteger(n), o = x(y(a, 0), e.length), s = i.length, r = o + s; r > 0;) {
                    r = y(0, r - s);
                    var c = J(H(e, r, o + s), i);
                    if (c !== -1) return r + c
                }
                return -1
            }
        }, Ce);
        var Me = c.lastIndexOf;
        if (U(c, {
                lastIndexOf: function (t) {
                    return Me.apply(this, arguments)
                }
            }, 1 !== c.lastIndexOf.length), 8 === parseInt(Se + "08") && 22 === parseInt(Se + "0x16") || (parseInt = function (t) {
                var e = /^[\-+]?0[xX]/;
                return function (i, n) {
                    var a = Re(String(i)), o = d(n) || (e.test(a) ? 16 : 10);
                    return t(a, o)
                }
            }(parseInt)), 1 / parseFloat("-0") !== -(1 / 0) && (parseFloat = function (t) {
                return function (e) {
                    var i = Re(String(e)), n = t(i);
                    return 0 === n && "-" === H(i, 0, 1) ? -0 : n
                }
            }(parseFloat)), "RangeError: test" !== String(new RangeError("test"))) {
            var Oe = function () {
                if ("undefined" == typeof this || null === this) throw new TypeError("can't convert " + this + " to object");
                var t = this.name;
                "undefined" == typeof t ? t = "Error" : "string" != typeof t && (t = l(t));
                var e = this.message;
                return "undefined" == typeof e ? e = "" : "string" != typeof e && (e = l(e)), t ? e ? t + ": " + e : t : e
            };
            Error.prototype.toString = Oe
        }
        if (L) {
            var Ne = function (t, e) {
                if (q(t, e)) {
                    var i = Object.getOwnPropertyDescriptor(t, e);
                    i.configurable && (i.enumerable = !1, Object.defineProperty(t, e, i))
                }
            };
            Ne(Error.prototype, "message"), "" !== Error.prototype.message && (Error.prototype.message = ""), Ne(Error.prototype, "name")
        }
        if ("/a/gim" !== String(/a/gim)) {
            var je = function () {
                var t = "/" + this.source + "/";
                return this.global && (t += "g"), this.ignoreCase && (t += "i"), this.multiline && (t += "m"), t
            };
            RegExp.prototype.toString = je
        }
    })
}, function (t, e, i) {
    "use strict";
    i(112);
    var n = i(3), a = i(1), o = i(4), s = void 0;
    s = n.module({}), s.initialize(), s.Views.Mian = n.View.extend({
        template: "default/headerBar",
        el: !1,
        keep: !0,
        events: {"click .icon-zoom": "search", "click .icon-notification": "link2News"},
        serialize: function () {
            var t = document.domain.split(".com")[0].split(".");
            return {
                companyName: window.SYSTEM.companyName,
                userName: window.SYSTEM.realName,
                siVersion: window.SYSTEM.siVersion,
                isHangxin: window.location.search.indexOf("isHangxin") !== -1 ? 1 : 0,
                domain: t[t.length - 1]
            }
        },
        afterRender: function () {
            var t = this;
            o.tooltips({
                $el: this.$el.find(".default-userName"),
                data: [{name: window.SYSTEM.companyName, class: "newdisabled"}, {
                    name: window.SYSTEM.realName,
                    class: "newdisabled"
                }, {name: "操作日志"}],
                width: 200,
                textAlign: "left",
                callback: {
                    clickNode: function (t) {
                        var e = t.data("val");
                        "操作日志" === e.name && o.verifyRight("OPERATE_QUERY") && o.openHyperlink("setting/operationLog")
                    }
                }
            }), o.tooltips({
                $el: this.$el.find(".icon-help").closest("li"),
                data: [{name: "新手导航"}, {
                    name: "在线帮助",
                    href: "http://www.youshang.com/zxjxchelp/jxcv3/czjq/",
                    target: "_blank"
                }, {name: "辅助属性向导", class: 2 === window.SYSTEM.siType ? "" : "hide"}, {name: "旧版"}],
                callback: {
                    clickNode: function (t) {
                        var e = t.data("val");
                        if ("新手导航" === e.name && o.openHyperlink("information/initAccount"), "辅助属性向导" === e.name && o.openHyperlink("setting/assistingPropGuide"), "旧版" === e.name) {
                            var i = 150,
                                n = ['<div class="ui-dialog-tips">', '<h4 class="tit">旧版 即将停用...</h4>', "</div>"].join(""),
                                a = {
                                    width: i, ok: function () {
                                        0 !== location.href.length && location.href.indexOf("default-new.jsp") !== -1 && (window.location.href = location.href.replace("default-new.jsp", "default.jsp"))
                                    }, content: n, okVal: "我知道了"
                                };
                            o.alertDialog(a)
                        }
                    }
                }
            }), o.tooltips({
                $el: this.$el.find(".icon-serve").closest("li"),
                width: 200,
                data: [{name: '<div class="headerBar-robot"><div class="headerBar-label">QQ咨询</div><div>4008300755</div></div>'}, {name: '<div class="headerBar-question"><div class="headerBar-label">在线提问</div><div>每一个提问均有回复</div></div>'}, {name: '<div class="headerBar-label">电话</div><div>400-830-0780</div>'}, {name: '<div class="headerBar-label">服务时间</div><div>周一至周五</div><div>8:30-12:00、13:00-20:00</div><div>周六</div><div>9:00-12:00、13:30-17:30</div><div>周日及其他法定假日除外</div>'}, {name: '<div class="headerBar-label">客服邮箱</div><div>cs@youshang.com</div>'}],
                textAlign: "left",
                callback: {
                    clickNode: function (e) {
                        e.find(".headerBar-question").length > 0 && t.openService(3), e.find(".headerBar-robot").length > 0 && t.openRobot()
                    }
                }
            }), this.goodsCombo = o.goodsCombo(this.$el.find("#headerBar-goods"), {extraListHtml: ""}), window.BizQQWPA && window.BizQQWPA.addCustom([{
                nameAccount: "4008300755",
                aty: "0",
                selector: "qq"
            }]);
            var e = void 0;
            switch (window.SYSTEM.siVersion) {
                case 3:
                    e = "1";
                    break;
                case 4:
                    e = "3";
                    break;
                default:
                    e = "2"
            }
            a.getJSON(window.CONFIG.SERVICE_URL + "asy/Services.ashx?callback=?", {
                coid: window.SYSTEM.DBID,
                loginuserno: window.SYSTEM.userName,
                version: e,
                type: "getallunreadcount" + window.SYSTEM.servicePro
            }, function (e) {
                if (0 !== e.count) {
                    var i = t.$el.find(".headerBar-news");
                    i.html(e.count).show(), 0 === e.syscount && t.$el.find(".icon-notification").data("tab", 2)
                }
            });
            var i = this.getQueryString("dbid");
            null != i && i.toString().length > 1 && "88886666" === this.getQueryString("dbid") && a(".newexit,.returnservice").hide()
        },
        search: function (t) {
            t.preventDefault();
            var e = this.goodsCombo.getValue(), i = this.$el.find("#headerBar-goods").val();
            return e ? (o.forSearch(e, i), void this.$el.find("#headerBar-goods").val("")) : (o.tips({
                type: 2,
                content: "请先选择一个商品！"
            }), !1)
        },
        link2News: function (t) {
            var e = this.$el.find(".icon-notification").data("tab");
            this.openService(e)
        },
        openService: function (t) {
            window.tab.addTabItem({
                tabid: "myService",
                text: "服务支持",
                url: "/service/service.jsp",
                callback: function () {
                    document.getElementById("myService").contentWindow.openTab(t)
                }
            })
        },
        openRobot: function () {
            var t = document.domain.split(".com")[0].split(".")[0],
                e = "jdy" === t ? "http://hi.jdy.com/" : "http://hi.youshang.com/";
            window.open(e)
        },
        getQueryString: function (t) {
            var e = new RegExp("(^|&)" + t + "=([^&]*)(&|$)"), i = window.location.search.substr(1).match(e);
            return null != i ? unescape(i[2]) : null
        }
    }), t.exports = s
}, function (t, e, i) {
    "use strict";
    i(113);
    var n = i(3), a = i(1), o = i(48), s = i(4), r = void 0;
    r = n.module({}), r.initialize(), r.Views.Mian = n.View.extend({
        template: "default/main",
        keep: !0,
        events: {"click .l-tab-links": "hideTabMenu"},
        serialize: function () {
            return {isMixed: window.SYSTEM.isMixed}
        },
        initialize: function () {
            this.model = this.model || new r.Model, this.dialog()
        },
        beforeRender: function () {
            var t = new o.Views.Mian;
            this.setViews({".main-hd": t})
        },
        afterRender: function () {
            this.$el.find(".page-tab").ligerTab({
                height: "100%",
                changeHeightOnResize: !0,
                onBeforeAddTabItem: function (t) {
                },
                onAfterAddTabItem: function (t) {
                },
                onAfterSelectTabItem: function (t) {
                    switch (t) {
                        case"setting-initAccount":
                            window.tab.reload(t);
                            break;
                        case"index":
                            a(window).trigger("resize")
                    }
                },
                onBeforeRemoveTabItem: function (t) {
                    var e = a("#" + t).contents();
                    if ("undefined" == typeof e) return !0;
                    var i = document.getElementById(t).contentWindow.THISPAGE;
                    if ("undefined" == typeof i) return !0;
                    var n = e.find("#number").text();
                    if (0 === n.length) return !0;
                    if (void 0 === i.checkGridIsChange || i.checkGridIsChange() === !1) return !0;
                    if (window.SYSTEM.isConfirmRemove === !0) return window.SYSTEM.isConfirmRemove = !1, !0;
                    var o = this,
                        s = '<div style="max-height: 200px;overflow-y: auto;">是否保存对&nbsp&nbsp“' + n + "”&nbsp&nbsp单据的更改？</div>";
                    return a.dialog({
                        id: "moreCon",
                        lock: !0,
                        fixed: !0,
                        icon: "alert.gif",
                        width: 250,
                        min: !1,
                        max: !1,
                        title: "信息提示",
                        button: [{
                            name: "不保存", defClass: "fl", callback: function () {
                                return window.SYSTEM.isConfirmRemove = !0, o.removeTabItem(t), window.SYSTEM.isConfirmRemove = !1, !0
                            }
                        }, {
                            name: "保存", defClass: "ui_state_highlight", callback: function () {
                                return i.triggerSaveBeforeClose(), !0
                            }
                        }, {
                            name: "取消", callback: function () {
                                return !0
                            }
                        }],
                        resize: !1,
                        content: s
                    }), !1
                },
                onAfterRemoveTabItem: function (t) {
                    a(window).trigger("resize")
                },
                onAfterLeaveTabItem: function (t) {
                    switch (t) {
                        case"information-vendorList":
                            window.getSupplier();
                            break;
                        case"information-customerList":
                            window.getCustomer();
                            break;
                        case"information-storageList":
                            window.getStorage();
                            break;
                        case"information-goodsList":
                            window.getGoods(), window.getUnit(), window.getAssistingPropGroup();
                            break;
                        case"setting-goodsList":
                            window.getGoods(), window.getUnit(), window.getAssistingPropGroup();
                            break;
                        case"setting-goodsManage":
                            window.getGoods(), window.getUnit();
                            break;
                        case"information-settlementaccount":
                            window.getAccounts();
                            break;
                        case"setting-settlementCL":
                            break;
                        case"onlineStore-onlineStoreList":
                            break;
                        case"onlineStore-logisticsList":
                            break;
                        case"information-staffList":
                            window.getStaff();
                            break;
                        case"information-brand":
                            window.getBrandInfo();
                            break;
                        case"information-unitList":
                            window.getUnitGroup(), window.getUnit();
                            break;
                        case"information-customerInvNumber":
                            window.getGoods()
                    }
                },
                onReload: function (t) {
                    s.getCacheView(t.tabid) && s.getCacheView(t.tabid).render()
                }
            }), window.tab = this.$el.find(".page-tab").ligerGetTabManager();
            var t = function (t) {
                var e = i(51), n = new e.Views.Mian;
                t(n)
            };
            s.addTabItem({
                tabid: "index",
                text: "首页",
                model: t,
                showClose: !1
            }), this.$el.find(".l-tab-links li[tabid=index] a").css("padding", "0 10px"), 0 === window.SYSTEM.XsdhPage && s.addTabItem({
                tabid: "information-initAccount",
                text: "新手导航",
                url: "/settings/initAccount.jsp"
            });
            var e = this.getRequest();
            this.gotoDetailItem({transferType: e.billType, id: e.id})
        },
        hideTabMenu: function () {
            a(".l-tab-menu").hide()
        },
        getRequest: function () {
            var t, e = location.search, i = {};
            if (e.indexOf("?") !== -1) for (var n = e.substr(1), a = n.split("&"), o = 0, s = a.length; o < s; o++) t = a[o].split("="), i[t[0]] = decodeURIComponent(t[1]);
            return i
        },
        gotoDetailItem: function (t) {
            if (t && t.transferType && t.id) {
                var e = {
                    150601: {tabid: "sales-sales", text: "销货单", right: "SA_QUERY", url: "/sales/sales.jsp?id="},
                    150602: {
                        tabid: "sales-salesBack",
                        text: "销货退货单",
                        right: "SA_QUERY",
                        url: "/sales/sales.jsp?transType=150602&id="
                    },
                    150501: {
                        tabid: "purchase-purchase",
                        text: "购货单",
                        right: "PU_QUERY",
                        url: "/purchase/purchase.jsp?id="
                    },
                    150502: {
                        tabid: "purchase-purchaseBack",
                        text: "购货退货单",
                        right: "PU_QUERY",
                        url: "/purchase/purchase.jsp?transType=150502&id="
                    },
                    103091: {
                        tabid: "storage-transfers",
                        text: "调拨单",
                        right: "TF_QUERY",
                        url: "/storage/transfers.jsp?id="
                    },
                    150806: {
                        tabid: "storage-otherOutbound",
                        text: "其它出库单",
                        right: "OO_QUERY",
                        url: "/storage/other-outbound.jsp?id="
                    },
                    150706: {
                        tabid: "storage-otherWarehouse",
                        text: "其它入库单",
                        right: "IO_QUERY",
                        url: "/storage/other-warehouse.jsp?id="
                    },
                    150801: {
                        tabid: "storage-otherOutbound",
                        text: "盘亏",
                        right: "OO_QUERY",
                        url: "/storage/other-outbound.jsp?id="
                    },
                    150701: {
                        tabid: "storage-otherWarehouse",
                        text: "盘盈",
                        right: "IO_QUERY",
                        url: "/storage/other-warehouse.jsp?id="
                    },
                    150807: {
                        tabid: "storage-adjustment",
                        text: "成本调整",
                        right: "CADJ_QUERY",
                        url: "/storage/adjustment.jsp?id="
                    },
                    153101: {
                        tabid: "money-payment",
                        text: "付款单",
                        right: "PAYMENT_QUERY",
                        url: "/money/payment.jsp?id="
                    },
                    153001: {
                        tabid: "money-receipt",
                        text: "收款单",
                        right: "RECEIPT_QUERY",
                        url: "/money/receipt.jsp?id="
                    },
                    153301: {
                        tabid: "storage-assemble",
                        text: "组装单",
                        right: "ZZD_QUERY",
                        url: "/storage/assemble.jsp?id="
                    },
                    153302: {
                        tabid: "storage-disassemble",
                        text: "拆卸单",
                        right: "CXD_QUERY",
                        url: "/storage/disassemble.jsp?id="
                    },
                    153402: {
                        tabid: "money-otherExpense",
                        text: "其他支出单",
                        right: "QTZC_ADD",
                        url: "/money/other-expense.jsp?id="
                    },
                    153401: {
                        tabid: "money-otherIncome",
                        text: "其他收入单",
                        right: "QTSR_ADD",
                        url: "/money/other-income.jsp?id="
                    },
                    150901: {
                        tabid: "money-accountTransfer",
                        text: "资金转账单",
                        right: "ZJZZ_ADD",
                        url: "/money/accountTransfer.jsp?id="
                    },
                    153201: {
                        tabid: "money-verification",
                        text: "核销单",
                        right: "VERIFICA_ADD",
                        url: "/money/verification.jsp?id="
                    },
                    153202: {
                        tabid: "money-verification",
                        text: "核销单",
                        right: "VERIFICA_ADD",
                        url: "/money/verification.jsp?id="
                    },
                    153203: {
                        tabid: "money-verification",
                        text: "核销单",
                        right: "VERIFICA_ADD",
                        url: "/money/verification.jsp?id="
                    },
                    153204: {
                        tabid: "money-verification",
                        text: "核销单",
                        right: "VERIFICA_ADD",
                        url: "/money/verification.jsp?id="
                    },
                    153205: {
                        tabid: "money-verification",
                        text: "核销单",
                        right: "VERIFICA_ADD",
                        url: "/money/verification.jsp?id="
                    }
                }, i = e[t.transferType + ""];
                i && (i.right && !s.verifyRight(i.right) || (s.addTabItem({
                    tabid: i.tabid,
                    text: i.text,
                    url: i.url + t.id
                }), "function" == typeof t.callback && t.callback()))
            }
        },
        dialog: function () {
            var t = window.location.search.indexOf("isHangxin") !== -1 ? 1 : 0;
            if (window.SYSTEM.siExpired) return void s.experDialog(1, t);
            if (window.SYSTEM.expireDate) {
                var e = window.SYSTEM.expireDate, i = new Date, n = i.getMonth() + 1, a = i.getDate();
                n >= 0 && n <= 9 && (n = "0" + n), a >= 0 && a <= 9 && (a = "0" + a);
                var o = (i.getFullYear() + "-" + n + "-" + a).split("-"), r = e.split("-"),
                    l = new Date((o[0] + "-" + o[1] + "-" + o[2]).replace(/\s/, "T")),
                    c = new Date((r[0] + "-" + r[1] + "-" + r[2]).replace(/\s/, "T")),
                    d = parseInt(Math.abs(l - c) / 1e3 / 60 / 60 / 24);
                if (d < 8 && l - c < 0) return void s.experDialog(2, t)
            }
            return 4 !== window.SYSTEM.siVersion || t ? void 0 : void s.experDialog(3)
        }
    }), t.exports = r
}, function (t, e, i) {
    "use strict";
    i(114);
    var n = i(3), a = i(1), o = i(4), s = void 0;
    s = n.module({}), s.initialize(), s.Views.Mian = n.View.extend({
        template: "default/menu",
        keep: !0,
        events: {
            "mouseover .menu-item": "openMenu",
            "mouseleave .menu-item": "closeMenu",
            "click .fold-mark": "fold",
            "click a[rel=pageTab]": "openTabItem"
        },
        serialize: function () {
            return {
                menu: this.model.attributes,
                list: this.listMenus,
                newGif: this.newGif,
                isHangxin: window.location.search.indexOf("isHangxin") !== -1 ? 1 : 0
            }
        },
        initialize: function () {
            function t() {
                var t = window.SYSTEM, e = t.siType, n = t.isAdmin, o = t.siVersion;
                switch (i._hide(["setting/authority", "setting/recalculation", "setting/reInitial", "storage/inventorySN", "setting/backup", "setting/initAccount", "setting/assistingPropGuide", "vip/onlineStoreMap", "vip/onlineStoreList", "vip/onlineStoreRelation", "vip/logisticsList", "vip/printSettings", "vip/systemParameter", "vip/orderHandle1", "vip/orderHandle2", "vip/orderHandle3", "vip/refundList", "vip/refundMoney", "orderList", "vip/onlineSalesList", "vip/goodsComboList", "vip/JDStorageList", "vip/JDStorageGoodsList", "vip/JDStoragePurchaseOrderList", "vip/JDStorageSaleOrderList", "vip/JDStorageInvManage", "information/assistingProp", "storage/serNumStatus", "storage/serNumTracer", "storage/batchList", "storage/batchTracer", "information/assistingPropGuide", "information/linkToyun"]), e) {
                    case 1:
                        i._hide(["purchase/purchaseOrder", "purchase/purchaseOrderList", "purchase/purchaseView", "sales/salesOrder", "sales/salesOrderList", "money/verification", "money/verificationList", "information/shippingAddress", "purchase/puOrderTracking", "sales/salesOrderTracking", "storage/assemble", "storage/disassemble", "storage/serNumStatus", "storage/serNumTracer", "storage/batchList", "purchase/autoRemedy", "storage/batchTracer"]);
                        break;
                    case 2:
                }
                switch (o) {
                    case 1:
                        break;
                    case 2:
                        break;
                    case 3:
                        break;
                    case 4:
                        i._hide(["setting/backup"])
                }
                n && (3 === o && i._show(["setting/reInitial"]), 1 === o && i._show(["setting/reInitial"]), i._show(["setting/authority"]), i._show(["setting/backup"])), 2 === e && (1 === t.hasOnlineStore && 4 !== t.siVersion && i._show(["vip/onlineStoreList", "vip/printSettings", "vip/systemParameter", "vip/onlineStoreRelation", "vip/logisticsList", "vip/orderHandle1", "vip/orderHandle2", "vip/orderHandle3", "vip/onlineStoreMap", "vip/refundList", "vip/refundMoney", "orderList", "vip/onlineSalesList", "vip/goodsComboList"]), 1 === t.enableStorage && 4 !== t.siVersion && i._show(["vip/JDStorageList", "vip/JDStorageGoodsList", "vip/JDStoragePurchaseOrderList", "vip/JDStorageSaleOrderList", "vip/JDStorageInvManage"]), 1 === t.enableAssistingProp && i._show(["information/assistingProp"])), 1 === t.ISSERNUM && i._show(["storage/inventorySN", "storage/serNumStatus", "storage/serNumTracer"]),
                t.ISWARRANTY && i._show(["storage/batchList", "storage/batchTracer"]), (n || window.SYSTEM.rights.RECOSTCACL_RECOSTCACL) && i._show(["setting/recalculation"]), 1 !== t.hasOnlineStore ? delete a.vip : 1 !== t.enableStorage && delete a.vip.submenu.JDStorage
            }

            function e(t) {
                function e(t, e) {
                    function n(t, e) {
                        for (var n in e) if ("function" != typeof n) {
                            var a = e[n];
                            if (a.showBySystemParams && !window.SYSTEM[a.showBySystemParams]) {
                                a.disable = 1;
                                continue
                            }
                            var o = t.split("/")[0] + "/" + n, s = t.split("/")[0] + "-" + n;
                            if (a.tabid = s, i.listMenus[o] = a, a.list) {
                                var r = t.split("/")[0] + "/" + n + "List", l = t.split("/")[0] + "-" + n + "List",
                                    c = a.dataRight.split("_")[0] + "_QUERY",
                                    d = {tabid: l, name: a.name + "记录", href: a.list, dataRight: c};
                                i.listMenus[r] = d
                            }
                        }
                    }

                    for (var a in e) if ("function" != typeof a) {
                        var o = e[a], s = t + "/" + a;
                        o.list && n(s, o.list)
                    }
                }

                for (var n in t) if ("function" != typeof n) {
                    var a = t[n];
                    i.listMenus[n] = a, a.submenu && e(n, a.submenu)
                }
            }

            var i = this, n = void 0;
            if (1 === window.SYSTEM.siType) switch (window.SYSTEM.siVersion) {
                case 1:
                    n = "基础版试用版";
                    break;
                case 2:
                    n = "免费版（百度版）";
                    break;
                case 3:
                    n = "云进销存基础版";
                    break;
                case 4:
                    n = "基础版体验版"
            } else switch (window.SYSTEM.siVersion) {
                case 1:
                    n = "标准版试用版";
                    break;
                case 3:
                    n = "云进销存标准版";
                    break;
                case 4:
                    n = "标准版体验版"
            }
            this.model = new s.Model({
                versionType: n,
                menus: {
                    vip: {
                        name: "电商",
                        submenu: {
                            onlineStoreSetting: {
                                title: "网店基础资料",
                                list: {
                                    onlineStoreMap: {
                                        name: "新手导航",
                                        href: window.SYSTEM.wdUrl + "/online-store/map.jsp?language=zh-CHS&site=SITE_MAIN&siId=" + window.SYSTEM.DBID + "&scheme=blue&logonName=" + window.SYSTEM.userName,
                                        dataRight: ""
                                    },
                                    onlineStoreList: {
                                        name: "我的网店",
                                        href: window.SYSTEM.wdUrl + "/online-store/onlineStoreList.jsp?language=zh-CHS&site=SITE_MAIN&siId=" + window.SYSTEM.DBID + "&scheme=blue&logonName=" + window.SYSTEM.userName,
                                        dataRight: "CLOUDSTORE_QUERY"
                                    },
                                    logisticsList: {
                                        name: "物流公司",
                                        href: window.SYSTEM.wdUrl + "/online-store/logisticsList.jsp?language=zh-CHS&site=SITE_MAIN&siId=" + window.SYSTEM.DBID + "&scheme=blue&logonName=" + window.SYSTEM.userName,
                                        dataRight: "EXPRESS_QUERY"
                                    },
                                    onlineStoreRelation: {
                                        name: "商品对应关系",
                                        href: window.SYSTEM.wdUrl + "/online-store/onlineStoreRelation.jsp?language=zh-CHS&site=SITE_MAIN&siId=" + window.SYSTEM.DBID + "&scheme=blue&logonName=" + window.SYSTEM.userName,
                                        dataRight: "INVENTORYCLOUD_QUERY"
                                    },
                                    goodsComboList: {
                                        name: "商品套餐",
                                        href: window.SYSTEM.wdUrl + "/online-store/goodsComboList.jsp?language=zh-CHS&site=SITE_MAIN&siId=" + window.SYSTEM.DBID + "&scheme=blue&logonName=" + window.SYSTEM.userName,
                                        dataRight: ""
                                    },
                                    printSettings: {
                                        name: "打印设置",
                                        href: window.SYSTEM.wdUrl + "/online-store/printSettings.jsp?language=zh-CHS&site=SITE_MAIN&siId=" + window.SYSTEM.DBID + "&scheme=blue&logonName=" + window.SYSTEM.userName,
                                        dataRight: ""
                                    },
                                    systemParameter: {
                                        name: "网店参数",
                                        href: window.SYSTEM.wdUrl + "/online-store/system-parameter.jsp?language=zh-CHS&site=SITE_MAIN&siId=" + window.SYSTEM.DBID + "&scheme=blue&logonName=" + window.SYSTEM.userName,
                                        dataRight: ""
                                    }
                                }
                            },
                            onlineStoreOrder: {
                                title: "网店订单",
                                list: {
                                    orderHandle1: {
                                        name: "订单处理",
                                        href: window.SYSTEM.wdUrl + "/online-store/onlineOrderList.jsp?handle=1&language=zh-CHS&site=SITE_MAIN&siId=" + window.SYSTEM.DBID + "&scheme=blue&logonName=" + window.SYSTEM.userName,
                                        dataRight: "ORDERCLOUD_QUERY"
                                    },
                                    orderHandle2: {
                                        name: "打单发货",
                                        href: window.SYSTEM.wdUrl + "/online-store/onlineOrderList.jsp?handle=2&language=zh-CHS&site=SITE_MAIN&siId=" + window.SYSTEM.DBID + "&scheme=blue&logonName=" + window.SYSTEM.userName,
                                        dataRight: "ORDERCLOUD_QUERY"
                                    },
                                    scanShipment: {
                                        name: "扫描发货",
                                        href: window.SYSTEM.wdUrl + "/online-store/scanShipment.jsp?language=zh-CHS&site=SITE_MAIN&siId=" + window.SYSTEM.DBID + "&scheme=blue&logonName=" + window.SYSTEM.userName,
                                        dataRight: "ORDERCLOUD_QUERY"
                                    },
                                    refundList: {
                                        name: "售后处理",
                                        href: window.SYSTEM.wdUrl + "/online-store/onlineRefundListNew.jsp?language=zh-CHS&site=SITE_MAIN&siId=" + window.SYSTEM.DBID + "&scheme=blue&logonName=" + window.SYSTEM.userName,
                                        dataRight: "ORDERCLOUD_QUERY"
                                    },
                                    refundMoney: {
                                        name: "退款单记录",
                                        href: "/money/refundMoneyList.jsp?language=zh-CHS&site=SITE_MAIN&siId=" + window.SYSTEM.DBID + "&scheme=blue&logonName=" + window.SYSTEM.userName,
                                        dataRight: "ORDERCLOUD_QUERY"
                                    },
                                    incomeReport: {
                                        name: "网店收益报表",
                                        href: window.SYSTEM.wdUrl + "/online-store/onlinestore-income.jsp?language=zh-CHS&site=SITE_MAIN&siId=" + window.SYSTEM.DBID + "&scheme=blue&logonName=" + window.SYSTEM.userName,
                                        dataRight: "ORDERCLOUD_QUERY"
                                    },
                                    onlineSalesList: {
                                        name: "销货记录",
                                        href: "/scm/invSa.do?action=initSaleList",
                                        dataRight: "SA_QUERY"
                                    }
                                }
                            },
                            JDStorage: {
                                title: "京东仓储",
                                list: {
                                    JDStorageList: {
                                        name: "授权管理",
                                        href: "/JDStorage/JDStorageList.jsp",
                                        dataRight: "ORDERCLOUD_QUERY"
                                    },
                                    JDStorageGoodsList: {
                                        name: "商品上传管理",
                                        href: "/JDStorage/JDStorageGoodsList.jsp",
                                        dataRight: "ORDERCLOUD_QUERY"
                                    },
                                    JDStoragePurchaseOrderList: {
                                        name: "购货订单上传",
                                        href: "/JDStorage/JDStoragePurchaseOrderList.jsp",
                                        dataRight: "ORDERCLOUD_QUERY"
                                    },
                                    JDStorageSaleOrderList: {
                                        name: "销货订单上传",
                                        href: "/JDStorage/JDStorageSaleOrderList.jsp",
                                        dataRight: "ORDERCLOUD_QUERY"
                                    },
                                    JDStorageInvManage: {
                                        name: "京东库存",
                                        href: "/JDStorage/JDStorageInvManage.jsp",
                                        dataRight: "SA_QUERY"
                                    }
                                }
                            }
                        }
                    },
                    purchase: {
                        name: "购货",
                        submenu: {
                            purchase: {
                                title: "采购单据",
                                list: {
                                    purchaseOrder: {
                                        name: "购货订单",
                                        href: "/scm/invPo.do?action=initPo",
                                        list: "/scm/invPo.do?action=initPoList",
                                        dataRight: "PO_ADD"
                                    },
                                    purchase: {
                                        name: "购货单",
                                        href: "/scm/invPu.do?action=initPur",
                                        list: "/scm/invPu.do?action=initPurList",
                                        dataRight: "PU_ADD"
                                    },
                                    purchaseBack: {
                                        name: "购货退货单",
                                        href: "/scm/invPu.do?action=initPur&transType=150502",
                                        list: "/scm/invPu.do?action=initPurList&transType=150502",
                                        dataRight: "PUBACK_ADD"
                                    },
                                    purchaseView: {
                                        name: "以销定购看板",
                                        href: "/purchase/purchaseView.jsp",
                                        dataRight: "PO_QUERY"
                                    },
                                    autoRemedy: {
                                        name: "智能补货",
                                        href: "/purchase/auto-remedy.jsp",
                                        dataRight: "INVSUPPLY_QUERY"
                                    }
                                }
                            },
                            purchasereport: {
                                title: "采购报表",
                                list: {
                                    puOrderTracking: {
                                        name: "采购订单跟踪表",
                                        href: "/report/pu-order-tracking.jsp",
                                        dataRight: "PURCHASEORDER_QUERY"
                                    },
                                    puDetail: {
                                        name: "采购明细表",
                                        href: "/report/pu-detail-new.jsp",
                                        dataRight: "PUREOORTDETAIL_QUERY"
                                    },
                                    puSummary: {
                                        name: "采购汇总表（按商品）",
                                        href: "/report/pu-summary-new.jsp",
                                        dataRight: "PUREPORTINV_QUERY"
                                    },
                                    puSummarySupply: {
                                        name: "采购汇总表（按供应商）",
                                        href: "/report/pu-summary-supply-new.jsp",
                                        dataRight: "PUREPORTPUR_QUERY"
                                    },
                                    puAndPayDetail: {
                                        name: "采购付款一览表",
                                        href: "/report/pu-pay-detail.jsp",
                                        dataRight: "PURANDPAYDETAIL_QUERY"
                                    }
                                }
                            }
                        }
                    },
                    sales: {
                        name: "销货",
                        submenu: {
                            sales: {
                                title: "销售单据",
                                list: {
                                    salesOrder: {
                                        name: "销货订单",
                                        href: "/scm/invSo.do?action=initSo",
                                        list: "/scm/invSo.do?action=initSoList",
                                        dataRight: "SO_ADD"
                                    },
                                    sales: {
                                        name: "销货单",
                                        href: "/scm/invSa.do?action=initSale",
                                        list: "/scm/invSa.do?action=initSaleList",
                                        dataRight: "SA_ADD"
                                    },
                                    salesBack: {
                                        name: "销货退货单",
                                        href: "/scm/invSa.do?action=initSale&transType=150602",
                                        list: "/scm/invSa.do?action=initSaleList&transType=150602",
                                        dataRight: "SABACK_ADD"
                                    },
                                    salesOriginal: {
                                        name: "原始单据",
                                        href: "/sales/originalSales-list.jsp",
                                        dataRight: "SA_QUERY"
                                    },
                                    salesBill: {
                                        name: "销售开票",
                                        href: "/sales/salesBilling.jsp",
                                        dataRight: "SABILLING_ADD",
                                        list: "/sales/salesBilling-list.jsp"
                                    }
                                }
                            },
                            salesreport: {
                                title: "销售报表",
                                list: {
                                    salesOrderTracking: {
                                        name: "销售订单跟踪表",
                                        href: "/report/sales-order-tracking.jsp",
                                        dataRight: "SALESORDER_QUERY"
                                    },
                                    salesDetail: {
                                        name: "销售明细表",
                                        href: "/report/sales-detail.jsp",
                                        dataRight: "SAREPORTDETAIL_QUERY"
                                    },
                                    salesSummary: {
                                        name: "销售汇总表（按商品）",
                                        href: "/report/sales-summary.jsp",
                                        dataRight: "SAREPORTINV_QUERY"
                                    },
                                    salesSummaryCustomer: {
                                        name: "销售汇总表（按客户）",
                                        href: "/report/sales-summary-customer-new.jsp",
                                        dataRight: "SAREPORTBU_QUERY"
                                    },
                                    salesSummarySales: {
                                        name: "销售汇总表（按销售人员）",
                                        href: "/report/sales-summary-sales.jsp",
                                        dataRight: "SAREPORSALER_QUERY"
                                    },
                                    saleAndReceiptDetail: {
                                        name: "销售收款一览表",
                                        href: "/report/sale-receipt-detail.jsp",
                                        dataRight: "SALERECEIPTDETAIL_QUERY"
                                    },
                                    contactDebt: {
                                        name: "往来单位欠款表",
                                        href: "/report/contact-debt-new.jsp",
                                        dataRight: "ContactDebtReport_QUERY"
                                    },
                                    salePrifitDetail: {
                                        name: "销售利润表",
                                        href: "/report/sale-profit-detail.jsp",
                                        dataRight: "SALESPROFIT_QUERY"
                                    },
                                    saleRankDetail: {
                                        name: "销售排行表",
                                        href: "/report/sale-rank-detail.jsp",
                                        dataRight: "APPREPORTSALE_QUERY"
                                    }
                                }
                            }
                        }
                    },
                    storage: {
                        name: "仓库",
                        submenu: {
                            storage: {
                                title: "仓库单据",
                                list: {
                                    transfers: {
                                        name: "调拨单",
                                        href: "/scm/invTf.do?action=initTf",
                                        list: "/scm/invTf.do?action=initTfList",
                                        dataRight: "TF_ADD"
                                    },
                                    inventory: {name: "盘点", href: "/storage/inventory.jsp", dataRight: "PD_GENPD"},
                                    inventoryList: {name: "盘点记录", href: "/storage/inventory-list.jsp", dataRight: ""},
                                    inventorySN: {
                                        name: "序列号盘点",
                                        href: "/storage/inventorySN.jsp",
                                        dataRight: "PD_GENPD"
                                    },
                                    otherWarehouse: {
                                        name: "其他入库单",
                                        href: "/scm/invOi.do?action=initOi&type=in",
                                        list: "/scm/invOi.do?action=initOiList&type=in",
                                        dataRight: "IO_ADD"
                                    },
                                    otherOutbound: {
                                        name: "其他出库单",
                                        href: "/scm/invOi.do?action=initOi&type=out",
                                        list: "/scm/invOi.do?action=initOiList&type=out",
                                        dataRight: "OO_ADD"
                                    },
                                    adjustment: {
                                        name: "成本调整单",
                                        href: "/scm/invOi.do?action=initOi&type=cbtz",
                                        list: "/scm/invOi.do?action=initOiList&type=cbtz",
                                        dataRight: "CADJ_ADD"
                                    },
                                    assemble: {
                                        name: "组装单",
                                        href: "/scm/invOi.do?action=initOi&type=zz",
                                        list: "/scm/invOi.do?action=initOiList&type=zz",
                                        dataRight: "ZZD_ADD"
                                    },
                                    disassemble: {
                                        name: "拆卸单",
                                        href: "/scm/invOi.do?action=initOi&type=cx",
                                        list: "/scm/invOi.do?action=initOiList&type=cx",
                                        dataRight: "CXD_ADD"
                                    }
                                }
                            },
                            storagereport: {
                                title: "仓库报表",
                                list: {
                                    initialBalance: {
                                        name: "商品库存余额表",
                                        href: "/report/goods-balance.jsp",
                                        dataRight: "InvBalanceReport_QUERY"
                                    },
                                    goodsFlowDetail: {
                                        name: "商品收发明细表",
                                        href: "/report/goods-flow-detail.jsp",
                                        dataRight: "DeliverDetailReport_QUERY"
                                    },
                                    goodsFlowSummary: {
                                        name: "商品收发汇总表",
                                        href: "/report/goods-flow-summary.jsp",
                                        dataRight: "DeliverSummaryReport_QUERY"
                                    },
                                    serNumTracer: {
                                        name: "序列号跟踪表",
                                        href: "/report/serNum-tracer.jsp",
                                        dataRight: "INVSERNUMDETAIL_QUERY"
                                    },
                                    serNumStatus: {
                                        name: "序列号状态表",
                                        href: "/report/serNum-status.jsp",
                                        dataRight: "INVSERNUM_QUERY"
                                    },
                                    batchList: {
                                        name: "批次保质期清单",
                                        href: "/report/batch-list.jsp",
                                        dataRight: "WARRANTY_QUERY"
                                    },
                                    batchTracer: {
                                        name: "批次跟踪表",
                                        href: "/report/batch-tracer.jsp",
                                        dataRight: "BATCHTRACER_QUERY"
                                    }
                                }
                            }
                        }
                    },
                    money: {
                        name: "资金",
                        submenu: {
                            money: {
                                title: "资金单据",
                                list: {
                                    receipt: {
                                        name: "收款单",
                                        href: "/scm/receipt.do?action=initReceipt",
                                        list: "/scm/receipt.do?action=initReceiptList",
                                        dataRight: "RECEIPT_ADD"
                                    },
                                    payment: {
                                        name: "付款单",
                                        href: "/scm/payment.do?action=initPay",
                                        list: "/scm/payment.do?action=initPayList",
                                        dataRight: "PAYMENT_ADD"
                                    },
                                    verification: {
                                        name: "核销单",
                                        href: "/scm/verifica.do?action=initVerifica",
                                        list: "/money/verification-list.jsp",
                                        dataRight: "VERIFICA_ADD"
                                    },
                                    otherIncome: {
                                        name: "其他收入单",
                                        href: "/scm/ori.do?action=initInc",
                                        list: "/scm/ori.do?action=initIncList",
                                        dataRight: "QTSR_ADD"
                                    },
                                    otherExpense: {
                                        name: "其他支出单",
                                        href: "/scm/ori.do?action=initExp",
                                        list: "/scm/ori.do?action=initExpList",
                                        dataRight: "QTZC_ADD"
                                    },
                                    expenseList: {
                                        name: "采购销售费用清单",
                                        href: "/money/expense-list.jsp",
                                        dataRight: "FEEBILL_QUERY"
                                    },
                                    accountTransfer: {
                                        name: "资金转账单",
                                        href: "/scm/fundTf.do?action=initFundTf",
                                        list: "/scm/fundTf.do?action=initFundTfList",
                                        dataRight: "ZJZZ_ADD"
                                    }
                                }
                            },
                            moneyreport: {
                                title: "资金报表",
                                list: {
                                    cashBankJournal: {
                                        name: "现金银行报表",
                                        href: "/report/cash-bank-journal-new.jsp",
                                        dataRight: "SettAcctReport_QUERY"
                                    },
                                    accountPayDetail: {
                                        name: "应付账款明细表",
                                        href: "/report/account-pay-detail-new.jsp",
                                        dataRight: "PAYMENTDETAIL_QUERY"
                                    },
                                    accountProceedsDetail: {
                                        name: "应收账款明细表",
                                        href: "/report/account-proceeds-detail-new.jsp",
                                        dataRight: "RECEIPTDETAIL_QUERY"
                                    },
                                    customersReconciliation: {
                                        name: "客户对账单",
                                        href: "/report/customers-reconciliation-new.jsp",
                                        dataRight: "CUSTOMERBALANCE_QUERY"
                                    },
                                    suppliersReconciliation: {
                                        name: "供应商对账单",
                                        href: "/report/suppliers-reconciliation-new.jsp",
                                        dataRight: "SUPPLIERBALANCE_QUERY"
                                    },
                                    otherIncomeExpenseDetail: {
                                        name: "其他收支明细表",
                                        href: "/report/other-income-expense-detail.jsp",
                                        dataRight: "ORIDETAIL_QUERY"
                                    },
                                    profit: {name: "利润表", href: "/report/profit-detail.jsp", dataRight: ""}
                                }
                            }
                        }
                    },
                    information: {
                        name: "资料",
                        submenu: {
                            base: {
                                title: "基础资料",
                                list: {
                                    customerList: {
                                        name: "客户管理",
                                        href: "/settings/customer-list.jsp",
                                        dataRight: "BU_QUERY"
                                    },
                                    vendorList: {
                                        name: "供应商管理",
                                        href: "/settings/vendor-list.jsp",
                                        dataRight: "PUR_QUERY"
                                    },
                                    goodsList: {
                                        name: "商品管理",
                                        href: "/settings/goods-list.jsp",
                                        dataRight: "INVENTORY_QUERY"
                                    },
                                    storageList: {
                                        name: "仓库管理",
                                        href: "/settings/storage-list.jsp",
                                        dataRight: "INVLOCTION_QUERY"
                                    },
                                    staffList: {name: "职员管理", href: "/settings/staff-list.jsp", dataRight: ""},
                                    settlementaccount: {
                                        name: "账户管理",
                                        href: "/settings/settlement-account.jsp",
                                        dataRight: "SettAcct_QUERY"
                                    },
                                    brand: {
                                        name: "商品品牌",
                                        href: "/settings/commodity-brand.jsp",
                                        dataRight: "BRAND_QUERY"
                                    },
                                    storeList: {
                                        name: "门店管理",
                                        href: "/settings/store-list.jsp",
                                        showBySystemParams: "enablesale",
                                        dataRight: "STORE_QUERY"
                                    },
                                    shippingAddress: {
                                        name: "发货地址管理",
                                        href: "/settings/shippingAddress.jsp",
                                        dataRight: "DELIVERYADDR_QUERY"
                                    },
                                    initAccount: {name: "新手导航", href: "/settings/initAccount.jsp", dataRight: ""}
                                }
                            },
                            auxiliary: {
                                title: "辅助资料",
                                list: {
                                    customerCategoryList: {
                                        name: "客户类别",
                                        href: "/settings/category-list.jsp?typeNumber=customertype",
                                        dataRight: "BUTYPE_QUERY"
                                    },
                                    vendorCategoryList: {
                                        name: "供应商类别",
                                        href: "/settings/category-list.jsp?typeNumber=supplytype",
                                        dataRight: "SUPPLYTYPE_QUERY"
                                    },
                                    goodsCategoryList: {
                                        name: "商品类别",
                                        href: "/settings/category-list.jsp?typeNumber=trade",
                                        dataRight: "TRADETYPE_QUERY"
                                    },
                                    payCategoryList: {
                                        name: "支出类别",
                                        href: "/settings/category-list.jsp?typeNumber=paccttype",
                                        dataRight: "PACCTTYPE_QUERY"
                                    },
                                    recCategoryList: {
                                        name: "收入类别",
                                        href: "/settings/category-list.jsp?typeNumber=raccttype",
                                        dataRight: "RACCTTYPE_QUERY"
                                    },
                                    unitList: {
                                        name: "计量单位",
                                        href: "/settings/unit-list-new.jsp",
                                        dataRight: "UNIT_QUERY"
                                    },
                                    settlementCL: {
                                        name: "结算方式",
                                        href: "/settings/settlement-category-list.jsp",
                                        dataRight: "Assist_QUERY"
                                    },
                                    assistingProp: {
                                        name: "辅助属性",
                                        href: "/settings/assistingProp.jsp",
                                        dataRight: "FZSX_QUERY"
                                    },
                                    assistingPropGuide: {
                                        name: "辅助属性向导",
                                        href: "/settings/assistingPropGuide.jsp",
                                        dataRight: ""
                                    },
                                    customerInvNumber: {
                                        name: "客户物料编码",
                                        href: "/settings/customerInvNumber.jsp",
                                        dataRight: "CUSTOMERINVNUMBER_QUERY"
                                    },
                                    coderuleList: {
                                        name: "单据编码规则",
                                        href: "/settings/coderule-list.jsp",
                                        dataRight: "DOCNO_QUERY"
                                    }
                                }
                            }
                        }
                    },
                    cloudPos: {
                        name: "云POS",
                        submenu: {
                            posSetting: {
                                title: "",
                                list: {
                                    retail: {name: "零售设置", href: "/cloud-pos/sale-setting.jsp", dataRight: ""},
                                    cashier: {
                                        name: "POS权限设置",
                                        href: "/cloud-pos/permission-setting.jsp",
                                        dataRight: ""
                                    },
                                    account: {name: "账户管理", href: "/cloud-pos/account-manage.jsp", dataRight: ""},
                                    vip: {name: "会员管理", href: "/cloud-pos/vip-manage.jsp", dataRight: ""}
                                }
                            }
                        }
                    },
                    setting: {
                        name: "设置",
                        submenu: {
                            advancedSetting: {
                                title: "",
                                list: {
                                    parameter: {name: "系统参数", href: "/settings/system-parameter.jsp", dataRight: ""},
                                    authority: {name: "权限设置", href: "/settings/authority.jsp", dataRight: ""},
                                    operationLog: {
                                        name: "操作日志",
                                        href: "/settings/operation-log-new.jsp",
                                        dataRight: "OPERATE_QUERY"
                                    },
                                    printTemplates: {
                                        name: "套打模板",
                                        href: "/settings/print-templates.jsp",
                                        dataRight: ""
                                    },
                                    backup: {name: "备份与恢复", href: "/settings/backup.jsp", dataRight: ""},
                                    accounts: {
                                        name: "结账/反结账",
                                        href: "/settings/accounts-unaccounts.jsp",
                                        dataRight: ""
                                    },
                                    recalculation: {name: "重算成本", href: "", dataRight: ""},
                                    reInitial: {name: "重新初始化", href: "", dataRight: ""},
                                    addedServiceList: {
                                        name: "增值服务",
                                        href: "/settings/addedServiceList.jsp",
                                        dataRight: ""
                                    },
                                    assistingPropGuide: {
                                        name: "辅助属性向导",
                                        href: "/settings/assistingPropGuide.jsp",
                                        dataRight: ""
                                    }
                                }
                            }
                        }
                    }
                }
            }), i.listMenus = {};
            var a = this.model.attributes.menus;
            e(a), window.listMenus = i.listMenus, t(), i.newGif = ["销售开票", "销售利润表", "新手导航", "销售排行表", "智能补货", "权限设置", "单据编码规则"]
        },
        beforeRender: function () {
            var t = this;
            t.$el.height(a(window).height()), a(window).resize(function () {
                t.$el.height(a("#container").height())
            })
        },
        afterRender: function () {
            this.foldStyle(), a(window).trigger("resize"), this.initCloudPos()
        },
        initCloudPos: function () {
            function t(t) {
                t || (a('[data-subid="cloudPos"]').on("mouseover", function (t) {
                    return t.preventDefault(), !1
                }), a('[data-subid="cloudPos"]').on("click", function (t) {
                    return o.tips({type: 2, content: "请确认是否购买激活云POS并启用零售参数！"}), t.preventDefault(), !1
                }))
            }

            this.model.attributes.menus;
            if (window.SYSTEM.enablesale) {
                var e = a.dialog.tips("正在检查是否已购买云POS服务...", 1e3, "loading.gif", !0).show();
                a.ajax({
                    type: "GET",
                    url: "/right.do?action=hasPosService",
                    cache: !1,
                    async: !0,
                    dataType: "json",
                    success: function (i, n) {
                        e.close(), 200 === i.status && (i = i.data || {}, t(23 === +i.siType))
                    },
                    error: function () {
                        e.close(), t(!1), o.tips({type: 1, content: "无法获云POS服务取购买信息，请稍后再试！"})
                    }
                })
            } else t(!1)
        },
        openMenu: function (t) {
            var e = a(t.target).hasClass("menu-item") ? a(t.target) : a(t.target).closest(".menu-item");
            if (!e.hasClass("on")) {
                e.addClass("on").siblings().removeClass("on");
                var i = e.find(".sub-nav-wrap"), n = e.find(".arrow"), o = 0, s = e.offset(),
                    r = a(window).height() - (e.offset().top - -a(document).scrollTop() + e.outerHeight()),
                    l = s.top + o, c = l + e.outerHeight() / 2;
                e.offset().top > i.height() / 2 && (r < i.outerHeight() ? l = l - i.outerHeight() + e.outerHeight() : l -= i.outerHeight() / 2 - e.outerHeight() / 2 + o), i.stop(!0, !0).fadeIn(250).css({
                    top: l,
                    left: s.left + e.outerWidth()
                }), n.css({top: c, left: s.left + e.outerWidth() - 8}).show()
            }
        },
        closeMenu: function (t) {
            var e = a(t.target).hasClass("menu-item") ? a(t.target) : a(t.target).closest(".menu-item");
            e.removeClass("on");
            var i = e.find(".sub-nav-wrap"), n = e.find(".arrow");
            i.stop(!0, !0).hide(), n.hide()
        },
        fold: function (t) {
            a(t.target).hasClass("menu-open") ? (this.$el.find(".text").hide(), this.$el.find(".top-open").show(), this.$el.find(".top-close").hide(), a(t.target).removeClass("menu-open").addClass("menu-close"), this.$el.find(".menu-item").css({padding: "22px 16px"})) : (this.$el.find(".text").show(), this.$el.find(".top-open").hide(), this.$el.find(".top-close").show(), a(t.target).removeClass("menu-close").addClass("menu-open"), this.$el.find(".menu-item").css({padding: "22px 19px"})), this.foldStyle(), a(window).trigger("resize"), window.tab.trigger("sysWidthChange")
        },
        foldStyle: function () {
            a(".fold-mark").css({left: a(".fold-mark").parent().outerWidth() - 18}), this.modelMain.trigger("changeWidth", a(".fold-mark").parent().outerWidth())
        },
        openTabItem: function (t) {
            var e = "pageTab" === a(t.target).attr("rel") ? a(t.target) : a(t.target).parent(),
                i = "beginDate=" + window.SYSTEM.beginDate + "&endDate=" + window.SYSTEM.endDate,
                n = "beginDate=" + window.SYSTEM.startDate + "&endDate=" + window.SYSTEM.endDate, s = e.data("right"),
                r = e.attr("tabid"), l = e.attr("href"), c = e.attr("showClose"), d = e.attr("tabTxt");
            e.attr("parentOpen");
            if ("setting-recalculation" === r) return this.recalculation(), !1;
            if ("setting-reInitial" === r) return this.reInitial(), !1;
            if (t.preventDefault(), s && !o.verifyRight(s)) return !1;
            for (var u = ["purchase", "sales", "storage", "money"], h = 0; h < u.length; h++) if (0 === r.indexOf(u[h] + "-")) {
                l += l.lastIndexOf("?") === -1 ? "?" : "&", l += "商品库存余额表" === d ? n : i;
                break
            }
            var f = r.replace("-", "/"), p = this.listMenus[f].model || "";
            return o.addTabItem({tabid: r, text: d, url: l, model: p, showClose: c}), !1
        },
        recalculation: function () {
            var t = (window.SYSTEM, this);
            a.dialog({
                lock: !0,
                width: 500,
                height: 250,
                title: "系统提示",
                content: '<div class="re-initialize"><h3>成本重算后商品的出库成本可能会发生变化，请确认！</h3><span class="chk_blue unchecked"><input type="checkbox" id="understand" /><label for="understand">我已清楚了解将产生的后果</label></p><p class="check-confirm">（请先确认并勾选“我已清楚了解将产生的后果”）</span></div>',
                icon: "alert_confused.png",
                okVal: "重算成本",
                init: function () {
                    t.blueCheckbox()
                },
                ok: function () {
                    function t() {
                        a.ajax({
                            type: "GET",
                            url: "/basedata/systemProfile.do?action=genProgressBar",
                            cache: !1,
                            async: !0,
                            dataType: "json",
                            success: function (t, e) {
                                if (t.data && t.data.end === !1) {
                                    if (t.data.progress > .2) {
                                        var s = 100 * t.data.progress + "%";
                                        a("#countProgress").find(".bar").css("width", s)
                                    }
                                } else t.data && t.data.end === !0 && (t.data.hasError ? (a("#countProgress").css("border-left-color", "#4EE78C"), a("#countProgress").find(".label").html("重算成本失败"), a("#countProgress").find(".file-bar").addClass("progress-fail"), a("#countProgress").find(".bar").css("width", "100%"), o.tips({
                                    type: 1,
                                    content: t.data.info
                                })) : (a("#countProgress").css("border-left-color", "#4EE78C"), a("#countProgress").find(".label").html("重算成本已完成"), a("#countProgress").find(".tick-box").removeClass("dn"), a("#countProgress").find(".file-bar").addClass("progress-success"), a("#countProgress").find(".bar").css("width", "100%"), o.tips({
                                    type: 3,
                                    content: "重算成本完成！"
                                })), clearInterval(n), setTimeout(function () {
                                    i.close()
                                }, 2e3))
                            },
                            error: function () {
                                i.close(), o.tips({type: 1, content: "获取重算成本信息失败，请稍后再试！"})
                            }
                        })
                    }

                    if (a("#understand").is(":checked")) {
                        this.close();
                        var e = '<div id="countProgress"><div class="content"><p class="title"><label class="label">正在重算成本</label><span class="tick-box dn"><span class="tick-gif"></span></span></p><div class="progressList"><div class="file-bar"><div class="bar"></div></div></div></div></div>',
                            i = a.dialog.progress(e, 1e3, "loading.gif", !1).show();
                        a("#countProgress").find(".bar").stop().animate({width: "20%"}, 1e3);
                        var n = setInterval(function () {
                            t()
                        }, 2e3);
                        a.dialog({
                            lock: !0,
                            width: 300,
                            height: 100,
                            title: "系统提示",
                            content: "您已提交重算成本请求，重算完成后您可查看对应报表！",
                            cancelVal: "确定",
                            cancel: !0
                        });
                        a.ajax({
                            type: "GET",
                            url: "/basedata/systemProfile.do?action=reCostCacl",
                            cache: !1,
                            async: !0,
                            dataType: "json",
                            success: function (t, e) {
                                200 !== t.status && o.tips({type: 1, content: t.msg})
                            },
                            error: function (t) {
                                o.tips({type: 1, content: "操作失败了哦！" + t})
                            }
                        })
                    } else a(".check-confirm").css("visibility", "visible");
                    return !1
                },
                cancelVal: "放弃",
                cancel: !0
            })
        },
        reInitial: function () {
            var t = window.SYSTEM, e = this;
            a.dialog({
                lock: !0,
                width: 450,
                height: 250,
                title: "系统提示",
                content: '<div class="re-initialize"><h3>重新初始化系统将会清空你录入的所有数据，请慎重！</h3><ul><li>系统将删除您新增的所有商品、供应商、客户</li><li>系统将删除您录入的所有单据</li><li>系统将删除您录入的所有初始化数据</li></ul><span class="chk_blue unchecked"><input type="checkbox" id="understand" /><label for="understand">我已清楚了解将产生的后果</label></p><p class="check-confirm">（请先确认并勾选“我已清楚了解将产生的后果”）</span></div>',
                icon: "alert_confused.png",
                okVal: "重新初始化",
                init: function () {
                    e.blueCheckbox()
                },
                ok: function () {
                    if (a("#understand").is(":checked")) {
                        this.close();
                        var e = a.dialog.tips("正在重新初始化，请稍候...", 1e3, "loading.gif", !0).show();
                        a.ajax({
                            type: "GET",
                            url: "/user/recover?siId=" + t.DBID + "&userName=" + t.userName,
                            cache: !1,
                            async: !0,
                            dataType: "json",
                            success: function (i, n) {
                                200 === i.status && (a("#container").html(""), e.close(), window.location.href = "start.jsp?re-initial=true&from=default-new&serviceType=" + t.serviceType)
                            },
                            error: function (t) {
                                o.tips({type: 1, content: "操作失败了哦！" + t})
                            }
                        })
                    } else a(".check-confirm").css("visibility", "visible");
                    return !1
                },
                cancelVal: "放弃",
                cancel: !0
            })
        },
        _display: function (t, e) {
            for (var i = t.length - 1; i >= 0; i--) this.listMenus[t[i]] && (this.listMenus[t[i]].disable = !e);
            return this
        },
        _show: function (t) {
            return this._display(t, !0)
        },
        _hide: function (t) {
            return this._display(t, !1)
        },
        blueCheckbox: function () {
            a("#understand").click(function (t) {
                var e = a(t.target).closest(".chk_blue");
                e.length > 0 && (e.hasClass("unchecked") && a(t.target).is(":checked") ? e.removeClass("unchecked").addClass("checked") : e.removeClass("checked").addClass("unchecked"))
            })
        }
    }), t.exports = s
}, function (t, e, i) {
    "use strict";
    i(47), i(46), i(36), i(118);
    var n = (i(1), i(3)), a = i(52), o = i(56), s = void 0;
    s = n.module({}), s.initialize(), s.Views.Mian = n.View.extend({
        template: "home/index",
        keep: !0,
        el: !1,
        events: {},
        serialize: function () {
        },
        initialize: function () {
            this.modelMain = new o.Model, this.modelAuxiliary = new a.Model
        },
        beforeRender: function () {
            var t = new a.Views.Mian({model: this.modelAuxiliary}), e = new o.Views.Mian({model: this.modelMain});
            this.setViews({".home-auxiliary-item": t, ".home-main-item": e})
        }
    }), t.exports = s
}, function (t, e, i) {
    "use strict";

    function n(t) {
        return t && t.__esModule ? t : {default: t}
    }

    var a = i(34), o = n(a);
    i(115);
    var s = i(3), r = i(1), l = i(33), c = i(60), d = i(58), u = i(55), h = i(57), f = i(4), p = void 0;
    p = s.module({}), p.initialize(), p.Views.Mian = s.View.extend({
        template: "home/auxiliary",
        keep: !0,
        el: !1,
        events: {"click .home-common-set": "moreset", "click .notification": "openService"},
        initialize: function () {
            var t = this;
            t.modelTab = new l.Model({
                tab: [{name: "常用功能", id: 0}, {
                    name: "关键数据",
                    id: 1
                }]
            }), t.model = t.model || new p.Model, t.collectionQuickLinks = new c.Collection, this.listenTo(t.modelTab, "changeTab", function (e) {
                var i = ["home-quick-links", "home-key-data"];
                t.$el.find("." + i[e]).show().siblings().hide()
            })
        },
        beforeRender: function () {
            var t = this, e = new l.Views.Mian({model: t.modelTab}),
                i = new c.Views.Mian({collection: t.collectionQuickLinks}), n = new d.Model({notice: ""}),
                a = new d.Views.Mian({model: n}), o = new u.Views.Mian({
                    noRight: function () {
                        t.$el.find(".tab #1").hide()
                    }
                });
            this.setViews({".home-title": e, ".home-quick-links": i, ".home-notice": a, ".home-key-data": o})
        },
        afterRender: function () {
            this.modelTab.trigger("clickTab", 0)
        },
        moreset: function () {
            var t = this, e = new h.Views.Mian;
            e.render(), f.dialog({
                content: e.$el,
                title: "选择常用功能(最多可选择8个)",
                max: !1,
                min: !1,
                cache: !1,
                lock: !0,
                width: 730,
                height: 420,
                ok: function () {
                    var i = e.model.attributes, n = [];
                    for (var a in i) 1 === i[a].selected && n.push(a);
                    var s = {paras: n};
                    f.ajax({
                        url: "/basedata/userSetting.do?action=updateMenuList",
                        data: {paraData: (0, o.default)(s)}
                    }).done(function () {
                        t.render()
                    })
                },
                cancel: !0
            }), r(window).trigger("resize")
        },
        openService: function (t) {
            window.tab.addTabItem({
                tabid: "myService",
                text: "服务支持",
                url: "/service/service.jsp",
                callback: function () {
                    document.getElementById("myService").contentWindow.openTab(t)
                }
            })
        }
    }), t.exports = p
}, function (t, e, i) {
    "use strict";
    i(116);
    var n = i(150), a = i(59), o = i(3), s = i(1), r = i(33), l = i(4), c = void 0;
    c = o.module({}), c.initialize(), c.Views.Mian = o.View.extend({
        template: "home/charts",
        keep: !0,
        el: !1,
        events: {},
        serialize: function () {
        },
        initialize: function () {
            var t = this;
            t.modelTab = new r.Model({
                tab: [{name: "销货", id: 0}, {name: "购货", id: 1}, {
                    name: "仓库",
                    id: 2
                }]
            }), this.type = 0, this.listenTo(t.modelTab, "changeTab", function (e) {
                t.currentTab = e, e = Number(e), this.type = e;
                var i = ["home-sales", "home-purchase", "home-stock"];
                t.$el.find("." + i[e]).show().siblings().hide();
                var a, o;
                if (t.$el.find(".search-time").show(), 0 === e) {
                    if (0 === t.salesStartDate.length) return t.$el.find(".home-sales").hide(), t.$el.find(".home-nothing").show(), !1;
                    t.salesBar || (t.salesBar = n.init(s(".home-sales")[0])), a = [t.salesBar], o = [t.salesOption]
                } else {
                    if (1 === e) return void((t.collectionPurchase && 0 === t.collectionPurchase.length || !l.verifyRight("INDEXPURREPORT_QUERY", 1)) && t.viewPurchase.hideSelf());
                    if (0 === t.locationIds.length) return t.$el.find(".home-stock").hide(), t.$el.find(".home-nothing").show(), !1;
                    t.$el.find(".search-time").hide(), t.stockBar || (t.stockBar = n.init(s(".home-stock")[0])), a = [t.stockBar], o = [t.stockOption]
                }
                for (var r = 0; r < a.length; r++) a[r].showLoading(), a[r].setOption(o[r]), a[r].hideLoading();
                t.addClickEvent()
            }), t.model = t.model || new c.Model
        },
        beforeRender: function () {
            var t = this, e = new r.Views.Mian({model: t.modelTab});
            this.collectionPurchase = new a.Collection, this.viewPurchase = new a.Views.Mian({
                collection: this.collectionPurchase,
                type: 1,
                hideSelf: function () {
                    t.$el.find(".home-nothing").show(), t.$el.find(".home-purchase").hide()
                },
                showSelf: function () {
                    t.$el.find(".home-nothing").hide(), t.$el.find(".home-purchase").show()
                }
            }), this.setViews({".title": e, ".home-purchase": this.viewPurchase})
        },
        afterRender: function () {
            var t = this;
            l.tooltips({
                $el: this.$el.find(".search-time"),
                data: [{name: "近七天", href: "#", id: 1}, {name: "近七周", href: "#", id: 2}, {
                    name: "近七月",
                    href: "#",
                    id: 3
                }],
                callback: {
                    clickNode: function (e) {
                        var i = e.data("val");
                        t.$el.find("#time").html(i.name), t.queryCondition.type = Number(i.id), t.initSalesBar(), t.collectionPurchase.trigger("reload", Number(i.id)), t.modelTab.trigger("clickTab", t.currentTab)
                    }
                }
            }), s(window).resize(function () {
                var e = s(".home-charts").height(), i = e - t.$el.find(".header").outerHeight() - 20;
                s(".home-myCharts").css({height: i}), 0 === t.type && t.salesBar && t.salesBar.resize(), 2 === t.type && t.stockBar && t.stockBar.resize()
            }), this.queryCondition = {type: 1}, this.initSalesBar(), this.initStockBar(), this.currentTab = 0, s(window).trigger("resize"), t.modelTab.trigger("clickTab", this.currentTab)
        },
        initSalesBar: function () {
            var t = this, e = [], i = [], n = [];
            t.salesStartDate = [], t.salesEndDate = [], l.ajax({
                url: "/report/index.do?action=getIndexSaleDataDetail",
                data: this.queryCondition,
                async: !1
            }).done(function (a) {
                if (!l.verifyRight("INDEXSALEREPORT_QUERY", 1)) return a = [], !1;
                for (var o = a.items, s = 0; s < o.length; s++) {
                    var r = o[s].startDate.split("-")[1], c = o[s].startDate.split("-")[2],
                        d = o[s].endDate.split("-")[1], u = o[s].endDate.split("-")[2], h = void 0;
                    h = 1 === t.queryCondition.type ? Number(r) + "-" + c : 2 === t.queryCondition.type ? Number(r) + "-" + c + " ~ " + Number(d) + "-" + u : Number(r) + "月", e.push(h), i.push(Number(o[s].total || 0)), n.push(Number(o[s].count || 0)), t.salesStartDate.push(o[s].startDate), t.salesEndDate.push(o[s].endDate)
                }
            });
            var a = Math.round(1.3 * Math.max.apply(Math, i) * 100) / 100;
            a = Number(a.toFixed(2)), 0 === a && (a = 1e3);
            for (var o = [], s = 0; s < i.length; s++) i[s] < 0 ? o.push(a) : o.push(a - i[s]);
            this.salesOption = {
                title: {
                    text: "销售对比分析",
                    x: "center",
                    y: "5%",
                    textStyle: {color: "#5d5d5d", fontSize: "13", fontFamily: "Microsoft YaHei"}
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {type: "shadow", shadowStyle: {color: "#7dd4ff", opacity: .3}},
                    formatter: function (t) {
                        var e = t[0].dataIndex, i = l.currency(t[0].value);
                        return "&nbsp;" === i && (i = 0), n[e] = n[e] || 0, "销售笔数 : " + n[e] + "<br />销售总额 : " + i
                    }
                },
                calculable: !0,
                grid: {top: "15%", left: 60, right: 60, bottom: "5%", containLabel: !0},
                xAxis: [{
                    type: "category",
                    splitLine: {show: !1},
                    axisLine: {lineStyle: {color: "#e9e9e9"}},
                    axisTick: {show: !1},
                    axisLabel: {textStyle: {color: "#b1b1b1"}},
                    data: e
                }],
                yAxis: [{
                    type: "value",
                    splitLine: {show: !1},
                    axisLine: {lineStyle: {color: "#e9e9e9"}},
                    axisTick: {show: !1},
                    axisLabel: {textStyle: {color: "#b1b1b1"}},
                    max: a
                }],
                series: [{
                    name: "销售总额",
                    stack: "销售总额",
                    type: "bar",
                    data: i,
                    barWidth: 65,
                    itemStyle: {normal: {color: "#7cd2fc"}}
                }, {
                    name: "销售总额",
                    stack: "销售总额",
                    type: "bar",
                    data: o,
                    barWidth: 65,
                    itemStyle: {normal: {color: "#eee"}},
                    label: {
                        normal: {
                            show: !0,
                            position: "insideBottom",
                            textStyle: {color: "#566575"},
                            formatter: function (t) {
                                var e = t.dataIndex, n = l.currency(i[e]);
                                return "&nbsp;" === n && (n = 0), n
                            }
                        },
                        emphasis: {
                            show: !0,
                            position: "insideBottom",
                            textStyle: {color: "#566575"},
                            formatter: function (t) {
                                var e = t.dataIndex, n = l.currency(i[e]);
                                return "&nbsp;" === n && (n = 0), n
                            }
                        }
                    }
                }]
            }
        },
        initStockBar: function () {
            var t = this, e = [], i = [];
            t.locationIds = [], l.ajax({
                url: "/report/index.do?action=indexLocationInfo",
                async: !1
            }).done(function (n) {
                if (!l.verifyRight("INDEXLOCREPORT_QUERY", 1)) return n = [], !1;
                t.storageData = n.items;
                for (var a = n.items, o = 0; o < a.length; o++) e.push(a[o].locationName), i.push({
                    name: a[o].locationName,
                    value: Number(a[o].totalQty)
                }), t.locationIds.push(a[o].locationId)
            }), this.stockOption = {
                grid: {top: "15%", left: "10%", right: "10%", bottom: "15%", containLabel: !0},
                title: {
                    text: "库存数量分布",
                    x: "center",
                    y: "5%",
                    textStyle: {color: "#5d5d5d", fontSize: "13", fontFamily: "Microsoft YaHei"}
                },
                tooltip: {trigger: "item", formatter: "{a} <br/>{b} : {c} ({d}%)"},
                legend: {orient: "vertical", top: 40, left: 35, data: e},
                color: ["#5b8dd5", "#83d67f", "#f7a382", "#fdda47", "#80d6fc", "#73b0fc", "#7dffe5", "#52be4c", "#e9674e", "#ea84ce"],
                series: [{
                    name: "仓库",
                    type: "pie",
                    radius: ["30%", "50%"],
                    label: {normal: {show: !0, formatter: "{b}: ({d}%)", textStyle: {color: "#464646"}}},
                    labelLine: {normal: {show: !0, lineStyle: {color: "#c1d1d1"}}},
                    data: i
                }]
            }
        },
        addClickEvent: function () {
            var t = this;
            this.salesBar && this.salesBar.on("click", function (e) {
                var i = e.dataIndex, n = {beginDate: t.salesStartDate[i], endDate: t.salesEndDate[i], autoSearch: 1};
                l.verifyRight("SAREPORTINV_QUERY") && l.openHyperlink("sales/salesSummary", n)
            }), this.stockBar && this.stockBar.on("click", function (e) {
                var i = e.dataIndex,
                    n = {search: 1, storageNo: t.locationIds[i], storage: t.storageData[i].locationName};
                l.verifyRight("InvBalanceReport_QUERY") && l.openHyperlink("storage/initialBalance", n)
            })
        }
    }), t.exports = c
}, function (t, e, i) {
    "use strict";
    i(117);
    var n = i(3), a = i(1), o = i(4), s = void 0;
    s = n.module({url: "/report/index.do?action=getIndexData"}), s.initialize(), s.Views.Mian = n.View.extend({
        template: "home/goodsMsg",
        keep: !0,
        el: !1,
        events: {"click .pre": "pre", "click .next": "next"},
        serialize: function () {
        },
        initialize: function () {
            this.collection = new s.Collection
        },
        beforeRender: function () {
            var t = this, e = a.Deferred();
            return this.collection.fetch({
                reset: !0, success: function (i) {
                    for (var n = [], a = t.collection.models, o = 0; o < a.length; o++) {
                        var r = a[o], l = new s.Views.Item({index: o, model: r});
                        n.push(l)
                    }
                    t.setViews({".goodsMsg-dtl": n}), e.resolve()
                }, error: function (t, i, n) {
                    e.resolve()
                }
            }), e.promise()
        },
        afterRender: function () {
            var t = this;
            a(window).resize(function () {
                t.changeLiWidth()
            }), this.changeLiWidth(), this.collection.models.length > 4 && t.$el.find(".next").show(), this.timer = 0, this.step(0)
        },
        changeLiWidth: function () {
            var t = Math.floor((this.$el.width() - 60) / 4);
            this.$el.find("ul").width(this.$el.width()), this.$el.find("li").css({width: t})
        },
        pre: function (t) {
            var e = this, i = void 0, n = this.$el.find("li:visible:eq(0)").prev().index();
            n < 4 && a(t.target).hide(), this.$el.find("li").hide(), this.$el.find(".number").text(0), i = n > 3 ? [n - 3, n + 1] : [0, 4];
            for (var o = i[0]; o < i[1]; o++) this.$el.find("li:eq(" + o + ")").show().css("margin-left", 20), o === i[0] && this.$el.find("li:eq(" + o + ")").css("margin-left", 0);
            e.$el.find(".next").show(), this.$el.find(".goodsMsg-dtl").width(0), this.timer = 0, this.step(0)
        },
        next: function (t) {
            var e = this, i = void 0, n = this.$el.find("li:visible:eq(3)").next().index(),
                o = this.$el.find("li").length;
            o - n < 5 && a(t.target).hide(), this.$el.find("li").hide(), this.$el.find(".number").text(0), i = o > n + 4 ? [n, n + 4] : [o - 4, o];
            for (var s = i[0]; s < i[1]; s++) this.$el.find("li:eq(" + s + ")").show().css("margin-left", 20), s === i[0] && this.$el.find("li:eq(" + s + ")").css("margin-left", 0);
            e.$el.find(".pre").show(), this.$el.find(".goodsMsg-dtl").width(0), this.timer = 0, this.step(0), a(".goodsMsg-dtl").show()
        },
        step: function (t) {
            var e = this, i = Math.round(e.$el.find(".goodsMsg-dtl li").width() / 2);
            t += i;
            var n = e.$el.width();
            t > n && (t = n), e.$el.find(".goodsMsg-dtl").width(t), t < n ? e.timer = setTimeout(function () {
                e.step(t)
            }, 30) : this.refreshNumber()
        },
        refreshNumber: function () {
            for (var t = this.collection.models, e = 0; e < t.length; e++) t[e].trigger("refreshNumber")
        }
    }), s.Views.Item = n.View.extend({
        template: "home/goodsMsgItem",
        keep: !0,
        el: !1,
        events: {mouseover: "changeColor", mouseleave: "restoreColor", click: "openLinks"},
        serialize: function () {
            var t = ["#f79b67", "#f9c650", "#62ca6c", "#779cdb"], e = ["#fc8556", "#f8bb39", "#47c056", "#5b8fd4"],
                i = ["#f47238", "#e9a910", "#2eb13c", "#4779c8"], n = {
                    "库存预警": {id: "", right: ""},
                    "未审核购货订单": {id: "purchase/purchaseOrderList", right: "PO_QUERY"},
                    "未审核购货单": {id: "purchase/purchaseList", right: "PU_QUERY"},
                    "未发货销货订单": {id: "sales/salesOrderList", right: "SO_QUERY"},
                    "未审核销货订单": {id: "sales/salesOrderList", right: "SO_QUERY"},
                    "未审核销货单": {id: "sales/salesList", right: "SA_QUERY"},
                    "未审核其他支出单": {id: "money/otherExpenseList", right: "QTZC_QUERY"},
                    "未审核其他收入单": {id: "money/otherIncomeList", right: "QTSR_QUERY"},
                    "未审核资金转账单": {id: "money/accountTransferList", right: "ZJZZ_QUERY"},
                    "未审核其他出库单": {id: "storage/otherOutboundList", right: "OO_QUERY"},
                    "未审核其他入库单": {id: "storage/otherWarehouseList", right: "IO_QUERY"},
                    "未审核调拨单": {id: "storage/transfersList", right: "TF_QUERY"},
                    "未审核收款单": {id: "money/receiptList", right: "RECEIPT_QUERY"},
                    "未审核付款单": {id: "money/paymentList", right: "PAYMENT_QUERY"},
                    "未审核组装单": {id: "storage/assembleList", right: "ZZD_QUERY"},
                    "未审核拆卸单": {id: "storage/disassembleList", right: "CXD_QUERY"},
                    "今日购货笔数": {id: "purchase/purchaseList", right: "PU_QUERY"},
                    "今日收款笔数": {id: "money/receiptList", right: "RECEIPT_QUERY"},
                    "今日销货笔数": {id: "sales/salesList", right: "SA_QUERY"}
                }, a = this.model.get("name");
            return this.model.set({
                colors: t[this.index % 4],
                colorsbg: e[this.index % 4],
                colorsbd: i[this.index % 4],
                hide: "hide",
                index: this.index,
                id: n[a].id || "",
                right: n[a].right
            }), this.model.attributes
        },
        initialize: function () {
            var t = this;
            this.listenTo(t.model, "refreshNumber", function () {
                var e = Number(t.$el.find(".number").data("number"));
                e > 0 && t.step(0)
            })
        },
        afterRender: function () {
            this.model.trigger("refreshNumber"), this.$el.show()
        },
        step: function (t) {
            var e = this, i = Number(e.$el.find(".number").data("number")), n = 30 / i;
            if (n < .3) {
                var a = Math.round(i / 100);
                t += a, t > i && (t = i), n = .3
            } else t++;
            e.$el.find(".number").text(t), t < i && (e.timer = setTimeout(function () {
                e.step(t)
            }, n))
        },
        changeColor: function (t) {
            var e = this.$el, i = e.find(".name").css("background-color");
            e.css("background-color", i)
        },
        restoreColor: function (t) {
            var e = this.$el, i = e.data("color");
            e.css("background-color", i)
        },
        openLinks: function (t) {
            var e = this.$el.data("id"), i = this.$el.find(".name").text(), n = this.$el.attr("right");
            if (e) {
                if (!o.verifyRight(n)) return;
                var a = {newType: 1};
                "今日购货笔数" === i || "今日销货笔数" === i || "今日收款笔数" === i ? a.newType = 2 : "未发货销货订单" === i && (a.newType = 3), o.openHyperlink(e, a)
            } else {
                if (!o.verifyRight("INVENTORY_WARNING")) return;
                o.dialog({
                    width: 950,
                    height: 410,
                    title: "商品库存预警",
                    content: "url:/inventory-warning.jsp",
                    cancel: !0,
                    cancelVal: "关闭"
                })
            }
        }
    }), t.exports = s
}, function (t, e, i) {
    "use strict";
    i(119);
    var n = i(3), a = i(1), o = i(4), s = void 0;
    s = n.module({url: "/report/index.do?action=getInvData"}), s.initialize(), s.Views.Mian = n.View.extend({
        template: "home/keyData",
        keep: !0,
        events: {},
        serialize: function () {
        },
        initialize: function () {
            this.collection = new s.Collection
        },
        beforeRender: function () {
            var t = this, e = a.Deferred();
            return this.queryParams = {
                finishDate: window.SYSTEM.endDate,
                beginDate: window.SYSTEM.beginDate,
                endDate: window.SYSTEM.endDate
            }, this.collection.fetch({
                reset: !0, data: this.queryParams, success: function (i) {
                    for (var n = [], a = t.collection.models, o = 0; o < a.length; o++) {
                        var r = a[o], l = new s.Views.Item({model: r});
                        n.push(l)
                    }
                    t.setViews({".home-keyData": n}), e.resolve()
                }, error: function (i, n, a) {
                    400 === n.status && (t.noRight(), e.resolve())
                }
            }), e.promise()
        },
        afterRender: function () {
        }
    }), s.Views.Item = n.View.extend({
        template: "home/keyDataItem",
        keep: !0,
        el: !1,
        events: {click: "openLink"},
        serialize: function () {
            var t = {
                inventory: {id: "storage/initialBalance", right: "InvBalanceReport_QUERY"},
                fund: {id: "money/cashBankJournal", right: "SettAcctReport_QUERY"},
                contact: {id: "sales/contactDebt", right: "ContactDebtReport_QUERY"},
                sales: {id: "sales/salesSummary", right: "SAREPORTINV_QUERY"},
                purchase: {id: "purchase/puSummary", right: "PUREPORTINV_QUERY"}
            }, e = t[this.model.get("mod")].id, i = t[this.model.get("mod")].right;
            return this.model.set("id", e), this.model.set("right", i), this.model.attributes
        },
        initialize: function () {
        },
        openLink: function (t) {
            var e = this.model.attributes.id, i = this.model.attributes.right, n = {
                finishDate: window.SYSTEM.endDate,
                beginDate: window.SYSTEM.beginDate,
                endDate: window.SYSTEM.endDate,
                search: 1
            };
            if (e) {
                if (!o.verifyRight(i)) return;
                o.openHyperlink(e, n)
            }
        }
    }), t.exports = s
}, function (t, e, i) {
    "use strict";
    i(120);
    var n = i(3), a = (i(1), i(54)), o = i(53), s = void 0;
    s = n.module({}), s.initialize(), s.Views.Mian = n.View.extend({
        template: "home/main",
        keep: !0,
        el: !1,
        events: {},
        serialize: function () {
        },
        initialize: function () {
            var t = this;
            t.model = t.model || new s.Model
        },
        beforeRender: function () {
            var t = new a.Views.Mian, e = new o.Views.Mian;
            this.setViews({".home-goodsMsg": t, ".home-charts": e})
        }
    }), t.exports = s
}, function (t, e, i) {
    "use strict";
    i(121);
    var n = i(3), a = i(1), o = i(4), s = void 0, r = void 0, l = 0;
    s = n.module({}), s.initialize(), s.Views.Mian = n.View.extend({
        template: "home/moresetting",
        keep: !0,
        el: !1,
        events: {"click #checkItems": "cancelcheck", "click .moresettingitem": "triggerCheck"},
        serialize: function () {
            return {model: this.model.attributes}
        },
        initialize: function () {
            r = 0;
            var t = this, e = window.SYSTEM, i = {
                "购货订单": {selected: 0, pName: "购货", title: "采购单据"},
                "购货单": {selected: 0, pName: "购货", title: "采购单据"},
                "以销定购": {selected: 0, pName: "购货", title: "采购单据"},
                "智能补货": {selected: 0, pName: "购货", title: "采购单据"},
                "购货订单记录": {selected: 0, pName: "购货", title: "购货单据"},
                "购货单记录": {selected: 0, pName: "购货", title: "购货单据"},
                "购货退货单记录": {selected: 0, pName: "购货", title: "购货单据"},
                "购货退货单": {selected: 0, pName: "购货", title: "购货单据"},
                "采购订单跟踪表": {selected: 0, pName: "购货", title: "采购报表"},
                "采购明细表": {selected: 0, pName: "购货", title: "采购报表"},
                "采购汇总表（按商品）": {selected: 0, pName: "购货", title: "采购报表"},
                "采购汇总表（按供应商）": {selected: 0, pName: "购货", title: "采购报表"},
                "采购付款一览表": {selected: 0, pName: "购货", title: "采购报表"},
                "销货订单": {selected: 0, pName: "销货", title: "销售单据"},
                "销货单": {selected: 0, pName: "销货", title: "销售单据"},
                "销货订单记录": {selected: 0, pName: "销货", title: "销售单据"},
                "销货单记录": {selected: 0, pName: "销货", title: "销售单据"},
                "销货退货单记录": {selected: 0, pName: "销货", title: "销售单据"},
                "销货退货单": {selected: 0, pName: "销货", title: "销售单据"},
                "原始单据": {selected: 0, pName: "销货", title: "销售单据"},
                "销售订单跟踪表": {selected: 0, pName: "销货", title: "销售报表"},
                "销售明细表": {selected: 0, pName: "销货", title: "销售报表"},
                "销售汇总表（按商品）": {selected: 0, pName: "销货", title: "销售报表"},
                "销售汇总表（按客户）": {selected: 0, pName: "销货", title: "销售报表"},
                "销售汇总表（按销售人员）": {selected: 0, pName: "销货", title: "销售报表"},
                "销售收款一览表": {selected: 0, pName: "销货", title: "销售报表"},
                "销售利润表": {selected: 0, pName: "销货", title: "销售报表"},
                "往来单位欠款表": {selected: 0, pName: "销货", title: "销售报表"},
                "调拨单": {selected: 0, pName: "仓库", title: "仓库单据"},
                "其他入库单": {selected: 0, pName: "仓库", title: "仓库单据"},
                "其他出库单": {selected: 0, pName: "仓库", title: "仓库单据"},
                "组装单": {selected: 0, pName: "仓库", title: "仓库单据"},
                "盘点": {selected: 0, pName: "仓库", title: "仓库单据"},
                "拆卸单": {selected: 0, pName: "仓库", title: "仓库单据"},
                "调拨单记录": {selected: 0, pName: "仓库", title: "仓库单据"},
                "其他入库单记录": {selected: 0, pName: "仓库", title: "仓库单据"},
                "其他出库单记录": {selected: 0, pName: "仓库", title: "仓库单据"},
                "组装单记录": {selected: 0, pName: "仓库", title: "仓库单据"},
                "拆卸单记录": {selected: 0, pName: "仓库", title: "仓库单据"},
                "成本调整单": {selected: 0, pName: "仓库", title: "仓库单据"},
                "成本调整单记录": {selected: 0, pName: "仓库", title: "仓库单据"},
                "商品库存余额表": {selected: 0, pName: "仓库", title: "仓库报表"},
                "商品收发明细表": {selected: 0, pName: "仓库", title: "仓库报表"},
                "商品收发汇总表": {selected: 0, pName: "仓库", title: "仓库报表"},
                "序列号跟踪表": {selected: 0, pName: "仓库", title: "仓库报表"},
                "序列号状态表": {selected: 0, pName: "仓库", title: "仓库报表"},
                "批次保质期清单": {selected: 0, pName: "仓库", title: "仓库报表"},
                "批次跟踪表": {selected: 0, pName: "仓库", title: "仓库报表"},
                "收款单": {selected: 0, pName: "资金", title: "资金单据"},
                "付款单": {selected: 0, pName: "资金", title: "资金单据"},
                "其他收入单": {selected: 0, pName: "资金", title: "资金单据"},
                "其他支出单": {selected: 0, pName: "资金", title: "资金单据"},
                "资金转账单": {selected: 0, pName: "资金", title: "资金单据"},
                "核销单": {selected: 0, pName: "资金", title: "资金单据"},
                "收款单记录": {selected: 0, pName: "资金", title: "资金单据"},
                "付款单记录": {selected: 0, pName: "资金", title: "资金单据"},
                "其他收入单记录": {selected: 0, pName: "资金", title: "资金单据"},
                "其他支出单记录": {selected: 0, pName: "资金", title: "资金单据"},
                "核销单记录": {selected: 0, pName: "资金", title: "资金单据"},
                "现金银行报表": {selected: 0, pName: "资金", title: "资金报表"},
                "应付账款明细表": {selected: 0, pName: "资金", title: "资金报表"},
                "应收账款明细表": {selected: 0, pName: "资金", title: "资金报表"},
                "客户对账单": {selected: 0, pName: "资金", title: "资金报表"},
                "供应商对账单": {selected: 0, pName: "资金", title: "资金报表"},
                "其他收支明细表": {selected: 0, pName: "资金", title: "资金报表"},
                "利润表": {selected: 0, pName: "资金", title: "资金报表"},
                "结账反结账": {selected: 0, pName: "其他", title: ""},
                "增值服务": {selected: 1, pName: "其他", title: ""}
            }, n = [];
            1 === e.siType && n.push("购货订单", "购货订单记录", "以销定购", "智能补货", "销货订单记录", "销货订单", "组装单", "组装单记录", "拆卸单", "拆卸单记录", "核销单记录", "核销单", "销售订单跟踪表", "采购订单跟踪表"), 1 !== e.ISSERNUM && n.push("序列号盘点", "序列号状态表", "序列号跟踪表"), e.ISWARRANTY || n.push("批次保质期清单", "批次跟踪表");
            for (var l = 0, c = 0; l < n.length; l++) for (var d in i) {
                if (n[l] === d) {
                    delete i[d], c--;
                    break
                }
                c++
            }
            a.Deferred();
            o.ajax({url: "/basedata/userSetting.do?action=menuList", async: !1}).done(function (t) {
                for (var e = t.items, n = 0; n < e.length; n++) i[e[n]] && (i[e[n]].selected = 1)
            }), t.model = new s.Model(i), this.views = {}, this.itemName = [];
            for (var u in this.model.attributes) 1 === this.model.attributes[u].selected && r++;
            this.listenTo(this.model, "change", this.render)
        },
        beforeRender: function () {
        },
        afterRender: function () {
        },
        cancelcheck: function (t) {
            if (1 !== l) {
                t.preventDefault();
                var e = a(t.target).closest("li"), i = e.text();
                if ("增值服务" !== i) {
                    var n = this.model.attributes[i], o = a("." + i).find("span");
                    r--, l = 1, this.changeClass(0, o, n, i, e), e.remove()
                }
            }
        },
        triggerCheck: function (t) {
            if (1 !== l) {
                t.preventDefault();
                var e = a(t.target).closest("li"), i = e.text();
                if ("增值服务" !== i) {
                    var n = this.model.attributes[i], s = 1 === n.selected ? 0 : 1, c = e.find("span");
                    if (0 === s && r--, r >= 8) return void o.tips({content: "选择8个最为合适"});
                    1 === s && r++, l = 1, this.changeClass(s, c, n, i, e, 1)
                }
            }
        },
        changeClass: function (t, e, i, n, o, s) {
            var r = '<li style="display:none" id=' + n + " data=" + i.pName + '><span class="selecteditem">' + n + '<span class="icon icon-close"></span></span></li>',
                c = o.offset().left, d = o.offset().top;
            !t && s && (c = a("#" + n).offset().left, d = a("#" + n).offset().top);
            var u = a("<span>" + n + "</span>").appendTo("body");
            if (u.css({position: "absolute", left: c, top: d, zIndex: "2222"}), t) {
                e.removeClass("icon-checkbox-unchecked").addClass("icon-checkbox-checked"), a("#checkItem").before(r);
                var h = a("#checkItem").offset().left, f = a("#checkItem").offset().top;
                i.selected = 1, u.animate({top: f, left: h}, 300, "swing", function () {
                    a("#" + n).show(), l = 0, a(this).remove()
                })
            } else {
                var p = a("." + n).offset().left, m = a("." + n).offset().top;
                i.selected = 0, u.animate({top: m, left: p}, 300, "swing", function () {
                    e.removeClass("icon-checkbox-checked").addClass("icon-checkbox-unchecked"), l = 0, a(this).remove()
                }), a("#" + n).remove()
            }
        }
    }), t.exports = s
}, function (t, e, i) {
    "use strict";
    i(122);
    var n, a = i(3), o = i(4), s = i(1);
    n = a.module(), n.Model = a.Model.extend({
        defaults: {
            notice: [{
                msgtitle: "暂无公告",
                msglinkcolor: null,
                msgid: 0,
                msglink: null
            }]
        }
    }), n.Views.Mian = a.View.extend({
        template: "home/notice",
        keep: !0,
        events: {"click .home-noticeWrap": "checkNotice"},
        initialize: function () {
            this.model = new n.Model;
            var t = this.model;
            this.listenTo(t, "change", this.render, this), this.getNotice()
        },
        serialize: function () {
            return {
                notice: this.model.attributes.notice,
                userName: window.SYSTEM.realName,
                isHangxin: window.location.search.indexOf("isHangxin") !== -1 ? 1 : 0
            }
        },
        getNotice: function () {
            var t = void 0, e = this;
            switch (window.SYSTEM.siVersion) {
                case 3:
                    t = "1";
                    break;
                case 4:
                    t = "3";
                    break;
                default:
                    t = "2"
            }
            s.getJSON(window.CONFIG.SERVICE_URL + "asy/Services.ashx?callback=?", {
                coid: window.SYSTEM.DBID,
                loginuserno: window.SYSTEM.UserName,
                version: t,
                type: "getsystemmsg" + window.SYSTEM.servicePro
            }, function (t) {
                if (t = t.data, t && t.length) {
                    for (var i = [], n = 0; n < t.length && !(n > 2); n++) i.push(t[n]);
                    e.model.set("notice", i)
                }
            })
        },
        checkNotice: function (t) {
            var e = s(t.target);
            if (e.hasClass("islink")) {
                var i = e.data("link");
                o.addTabItem({tabid: "myService", text: "服务支持", url: i})
            }
        }
    }), t.exports = n
}, function (t, e, i) {
    "use strict";
    i(123);
    var n = i(3), a = i(1), o = i(4), s = void 0;
    s = n.module({url: "/report/index.do?action=indexPurchaseRank"}), s.initialize(), s.Views.Mian = n.View.extend({
        template: "home/purchaseBar",
        keep: !0,
        el: !1,
        events: {"click .item": "openLinks", "mouseover .itemWrap": "tips", "mouseout .itemWrap": "notips"},
        serialize: function () {
        },
        initialize: function () {
            var t = this;
            this.collection = this.collection || new s.Collection, this.conditions = {type: this.type || 1}, this.listenTo(t.collection, "reload", function (e) {
                a.extend(!0, t.conditions, {type: e || 1});
                var i = a.Deferred();
                return t.collection.fetch({
                    data: t.conditions, success: function (e) {
                        var n = [], a = [], r = t.collection.models;
                        for (0 !== r.length && o.verifyRight("INDEXPURREPORT_QUERY", 1) ? t.showSelf() : t.hideSelf(); r.length && r.length < 10;) r.push("");
                        for (var l = 0; l < r.length; l++) {
                            var c = r[l], d = new s.Views.Item({index: l, model: c}).render();
                            l < 5 ? n.push(d.$el) : a.push(d.$el)
                        }
                        t.$el.find(".purchaseBarLeft").empty().append(n), t.$el.find(".purchaseBarRight").empty().append(a), i.resolve()
                    }, error: function (t, e, n) {
                        i.resolve()
                    }
                }), i.promise()
            })
        },
        beforeRender: function () {
            var t = this;
            t.collection.trigger("reload")
        },
        afterRender: function () {
        },
        tips: function (t) {
            var e = a(t.currentTarget), i = e.find(".name").text(), n = e.find(".total").text();
            a(t.currentTarget).mousemove(function (t) {
                function e(e, i, n) {
                    function o() {
                        a("#purtips").css({left: l, top: r})
                    }

                    var s = a(e), r = s[0].clientHeight + s.offset().top, l = t.clientX + 30, c = "";
                    a.each(n, function (t, e) {
                        c += "<p>" + t + "：" + e + "</p>"
                    }), a("#purtips").length ? (a("#purtips").html(c), o()) : (a("body").append('<div id="purtips"></div>'), a("#purtips").append(c), o())
                }

                e(t.currentTarget, 1, {"商品名称": i, "购货金额": n})
            })
        },
        notips: function () {
            a("#purtips").remove()
        }
    }), s.Views.Item = n.View.extend({
        template: "home/purchaseBarItem",
        keep: !0,
        el: !1,
        events: {"click .item": "openLinks"},
        serialize: function () {
            this.model.get("name");
            return this.model.set({}), this.model.attributes
        },
        initialize: function () {
            this.model = this.model || new s.Model({invNumber: "", invname: "暂无商品信息", total: 0});
            var t = this.model.attributes, e = Number(this.model.attributes.total);
            this.model.set({
                index: this.index + 1,
                color: Number(e) < 0 ? "#FD0000" : "#48BFEA",
                total: 0 === e ? "暂无商品信息" === t.invname ? "" : "--" : "¥" + o.currency(e)
            })
        },
        afterRender: function () {
        },
        openLinks: function (t) {
            var e = {
                beginDate: this.model.attributes.startDate,
                endDate: this.model.attributes.endDate,
                goodsNo: this.model.attributes.invNumber,
                autoSearch: 1
            };
            this.model.attributes.invNumber && o.verifyRight("PUREPORTINV_QUERY", 1) && o.openHyperlink("purchase/puSummary", e)
        },
        changeColor: function () {
            this.$el.find(".total").css("color", "#fff")
        },
        restoreColor: function () {
            this.$el.find(".total").css("color", "#48BFEA")
        }
    }), t.exports = s
}, function (t, e, i) {
    "use strict";
    i(124);
    var n = i(3), a = i(1), o = i(4), s = void 0;
    s = n.module({url: "/basedata/userSetting.do?action=menuList"}), s.initialize(), s.Views.Mian = n.View.extend({
        template: "home/quickLinks",
        keep: !0,
        events: {},
        serialize: function () {
            return this.model.attributes
        },
        initialize: function () {
            this.model = this.model || new s.Model
        },
        beforeRender: function () {
            var t = {
                "购货订单": {id: "purchase/purchaseOrder", icon: "purchase", right: "PO_ADD"},
                "购货单": {id: "purchase/purchase", icon: "purchase", right: "PU_ADD"},
                "购货退货单": {id: "purchase/purchaseBack", icon: "purchase", right: "PUBACK_ADD"},
                "以销定购": {id: "purchase/purchaseView", icon: "purchase", right: "PO_QUERY"},
                "智能补货": {id: "purchase/autoRemedy", icon: "purchase", right: "INVSUPPLY_QUERY"},
                "购货订单记录": {id: "purchase/purchaseOrderList", icon: "purchase", right: "PO_QUERY"},
                "购货单记录": {id: "purchase/purchaseList", icon: "purchase", right: "PU_QUERY"},
                "购货退货单记录": {id: "purchase/purchaseBackList", icon: "purchase", right: "PUBACK_QUERY"},
                "采购订单跟踪表": {id: "purchase/puOrderTracking", icon: "purchaseView", right: "PURCHASEORDER_QUERY"},
                "采购明细表": {id: "purchase/puDetail", icon: "purchaseView", right: "PUREOORTDETAIL_QUERY"},
                "采购汇总表（按商品）": {id: "purchase/puSummary", icon: "purchaseView", right: "PUREPORTINV_QUERY"},
                "采购汇总表（按供应商）": {id: "purchase/puSummarySupply", icon: "purchaseView", right: "PUREPORTPUR_QUERY"},
                "采购付款一览表": {id: "purchase/puAndPayDetail", icon: "purchaseView", right: "PURANDPAYDETAIL_QUERY"},
                "销货订单": {id: "sales/salesOrder", icon: "sales", right: "SO_QUERY"},
                "销货单": {id: "sales/sales", icon: "sales", right: "SA_ADD"},
                "销货订单记录": {id: "sales/salesOrderList", icon: "sales", right: "SO_QUERY"},
                "原始单据": {id: "sales/salesOriginal", icon: "sales", right: "SA_QUERY"},
                "销货退货单记录": {id: "sales/salesBackList", icon: "sales", right: "SABACK_QUERY"},
                "销货退货单": {id: "sales/salesBack", icon: "sales", right: "SABACK_ADD"},
                "销货单记录": {id: "sales/salesList", icon: "sales", right: "SA_QUERY"},
                "销售订单跟踪表": {id: "sales/salesOrderTracking", icon: "salesreport", right: "SALESORDER_QUERY"},
                "销售明细表": {id: "sales/salesDetail", icon: "salesreport", right: "SAREPORTDETAIL_QUERY"},
                "销售汇总表（按商品）": {id: "sales/salesSummary", icon: "salesreport", right: "SAREPORTINV_QUERY"},
                "销售汇总表（按客户）": {id: "sales/salesSummaryCustomer", icon: "salesreport", right: "SAREPORTBU_QUERY"},
                "销售汇总表（按销售人员）": {id: "sales/salesSummarySales", icon: "salesreport", right: "SAREPORSALER_QUERY"},
                "销售收款一览表": {id: "sales/saleAndReceiptDetail", icon: "salesreport", right: "SALERECEIPTDETAIL_QUERY"},
                "销售利润表": {id: "sales/salePrifitDetail", icon: "salesreport", right: "SALESPROFIT_QUERY"},
                "往来单位欠款表": {id: "sales/contactDebt", icon: "salesreport", right: "ContactDebtReport_QUERY"},
                "调拨单": {id: "storage/transfers", icon: "transfers", right: "TF_ADD"},
                "其他入库单": {id: "storage/otherWarehouse", icon: "transfers", right: "IO_ADD"},
                "其他出库单": {id: "storage/otherOutbound", icon: "transfers", right: "OO_ADD"},
                "组装单": {id: "storage/assemble", icon: "transfers", right: "ZZD_ADD"},
                "盘点": {id: "storage/inventory", icon: "transfers", right: "PD_GENPD"},
                "拆卸单": {id: "storage/disassemble", icon: "transfers", right: "CXD_ADD"},
                "调拨单记录": {id: "storage/transfersList", icon: "transfers", right: "TF_QUERY"},
                "其他入库单记录": {id: "storage/otherWarehouseList", icon: "transfers", right: "IO_QUERY"},
                "其他出库单记录": {id: "storage/otherOutboundList", icon: "transfers", right: "OO_QUERY"},
                "组装单记录": {id: "storage/assembleList", icon: "transfers", right: "ZZD_QUERY"},
                "拆卸单记录": {id: "storage/disassembleList", icon: "transfers", right: "CXD_QUERY"},
                "成本调整单": {id: "storage/adjustment", icon: "transfers", right: "CADJ_ADD"},
                "成本调整单记录": {id: "storage/adjustmentList", icon: "transfers", right: "CADJ_QUERY"},
                "商品库存余额表": {id: "storage/initialBalance", icon: "storagereport", right: "InvBalanceReport_QUERY"},
                "商品收发明细表": {id: "storage/goodsFlowDetail", icon: "storagereport", right: "DeliverDetailReport_QUERY"},
                "商品收发汇总表": {id: "storage/goodsFlowSummary", icon: "storagereport", right: "DeliverSummaryReport_QUERY"},
                "序列号跟踪表": {id: "storage/serNumTracer", icon: "storagereport", right: "INVSERNUMDETAIL_QUERY"},
                "序列号状态表": {id: "storage/serNumStatus", icon: "storagereport", right: "INVSERNUM_QUERY"},
                "批次保质期清单": {id: "storage/batchList", icon: "storagereport", right: "WARRANTY_QUERY"},
                "批次跟踪表": {id: "storage/batchTracer", icon: "storagereport", right: "BATCHTRACER_QUERY"},
                "收款单": {id: "money/receipt", icon: "money", right: "RECEIPT_ADD"},
                "付款单": {id: "money/payment", icon: "money", right: "PAYMENT_ADD"},
                "其他收入单": {id: "money/otherIncome", icon: "money", right: "QTSR_ADD"},
                "其他支出单": {id: "money/otherExpense", icon: "money", right: "QTZC_ADD"},
                "资金转账单": {id: "money/accountTransfer", icon: "money", right: "ZJZZ_ADD"},
                "核销单": {id: "money/verification", icon: "money", right: "VERIFICA_ADD"},
                "收款单记录": {id: "money/receiptList", icon: "money", right: "RECEIPT_QUERY"},
                "付款单记录": {id: "money/paymentList", icon: "money", right: "PAYMENT_QUERY"},
                "其他收入单记录": {id: "money/otherIncomeList", icon: "money", right: "QTSR_QUERY"},
                "其他支出单记录": {id: "money/otherExpenseList", icon: "money", right: "QTZC_QUERY"},
                "资金转账单记录": {id: "money/accountTransferList", icon: "money", right: "ZJZZ_QUERY"},
                "核销单记录": {id: "money/verificationList", icon: "money", right: "VERIFICA_QUERY"},
                "采购销售费用清单": {id: "money/expenseList", icon: "money", right: "FEEBILL_QUERY"},
                "现金银行报表": {id: "money/cashBankJournal", icon: "moneyreport", right: "SettAcctReport_QUERY"},
                "应付账款明细表": {id: "money/accountPayDetail", icon: "moneyreport", right: "PAYMENTDETAIL_QUERY"},
                "应收账款明细表": {id: "money/accountProceedsDetail", icon: "moneyreport", right: "RECEIPTDETAIL_QUERY"},
                "客户对账单": {id: "money/customersReconciliation", icon: "moneyreport", right: "CUSTOMERBALANCE_QUERY"},
                "供应商对账单": {id: "money/suppliersReconciliation", icon: "moneyreport", right: "SUPPLIERBALANCE_QUERY"},
                "其他收支明细表": {id: "money/otherIncomeExpenseDetail", icon: "moneyreport", right: "ORIDETAIL_QUERY"},
                "利润表": {id: "money/profit", icon: "moneyreport", right: "SALESPROFIT_QUERY"},
                "结账反结账": {id: "setting/accounts", icon: "accounts", right: ""},
                "增值服务": {id: "setting/addedServiceList", icon: "addedServiceList", right: ""}
            }, e = this, i = a.Deferred();
            return this.model.fetch({
                success: function (n) {
                    for (var a = [], o = e.model.attributes.items, r = 0, l = 0; l < o.length; l++) {
                        var c = new s.Model({name: o[l]}), d = new s.Views.Item({
                            index: r,
                            model: c,
                            id: t[c.attributes.name].id,
                            right: t[c.attributes.name].right,
                            icon: t[c.attributes.name].icon
                        });
                        a.push(d), r++
                    }
                    e.setViews({".home-link-items": a}), i.resolve()
                }, error: function (t, e, n) {
                    i.resolve()
                }
            }), i.promise()
        }
    }), s.Views.Item = n.View.extend({
        template: "home/quickLinksItem",
        keep: !0,
        el: !1,
        events: {click: "openLink"},
        serialize: function () {
            var t = ["#98d637", "#ffbf25", "#fe854e", "#598ad7", "#98d637", "#fe854e", "#ffbf25", "#598ad7"];
            return this.model.set({
                color: t[this.index],
                icon: this.icon,
                id: this.id,
                right: this.right
            }), this.model.attributes
        },
        openLink: function (t) {
            var e = {beginDate: window.SYSTEM.beginDate, endDate: window.SYSTEM.endDate}, i = this.model.attributes.id,
                n = this.model.attributes.right;
            n && !o.verifyRight(n) || o.openHyperlink(i, e)
        }
    }), t.exports = s
}, function (t, e, i) {
    "use strict";
    var n = i(4), a = function () {
        var t = new Date, e = t.getFullYear(), i = ("0" + (t.getMonth() + 1)).slice(-2),
            n = ("0" + t.getDate()).slice(-2);
        window.SYSTEM.beginDate = e + "-" + i + "-01", window.SYSTEM.endDate = e + "-" + i + "-" + n
    }, o = function () {
        window.SYSTEM.pageConfigInfo = {}, n.ajax({url: "/basedata/userSetting.do?action=list"}).done(function (t) {
            for (var e = 0; e < t.rows.length; e++) {
                var i = t.rows[e];
                window.SYSTEM.pageConfigInfo["" + i.key] = i.value || {};
                for (var n in i.grids) {
                    var a = i.grids[n];
                    if ("function" != typeof a && a.isReg) {
                        for (var o = a.colModel, s = [], r = 0; r < o.length; r++) {
                            var l = o[r];
                            s.push({name: l.name, label: l.label, hidden: l.hidden, width: l.width})
                        }
                        a.colModel = s
                    }
                }
            }
        })
    }, s = function () {
        window.SYSTEM.goodsInfo = [], (window.SYSTEM.isAdmin || window.SYSTEM.rights.INVENTORY_QUERY) && n.ajax({
            url: "/basedata/inventory.do?action=listCache",
            data: {rows: 2e4, isDelete: 2}
        }).done(function (t) {
            window.SYSTEM.goodsInfo = t.rows
        })
    }, r = function () {
        window.SYSTEM.storageInfo = [], (window.SYSTEM.isAdmin || window.SYSTEM.rights.INVLOCTION_QUERY) && n.ajax({url: "/basedata/invlocation.do?action=list&isDelete=0"}).done(function (t) {
            window.SYSTEM.storageInfo = t.rows
        })
    }, l = function () {
        window.SYSTEM.customerInfo = [], (window.SYSTEM.isAdmin || window.SYSTEM.rights.BU_QUERY) && n.ajax({
            url: "/basedata/contact.do?action=list&simple=1&isDelete=2",
            data: {rows: 2e4}
        }).done(function (t) {
            window.SYSTEM.customerInfo = t.rows
        })
    }, c = function () {
        window.SYSTEM.supplierInfo = [], (window.SYSTEM.isAdmin || window.SYSTEM.rights.PUR_QUERY) && n.ajax({
            url: "/basedata/contact.do?action=list&simple=1&type=10&isDelete=2",
            data: {rows: 5e3}
        }).done(function (t) {
            window.SYSTEM.supplierInfo = t.rows
        })
    }, d = function () {
        window.SYSTEM.addrInfo = [], (window.SYSTEM.isAdmin || window.SYSTEM.rights.DELIVERYADDR_QUERY) && n.ajax({
            url: "/basedata/deliveryAddr.do?action=list&isDelete=2",
            data: {rows: 5e3}
        }).done(function (t) {
            window.SYSTEM.addrInfo = t.items
        })
    }, u = function () {
        window.SYSTEM.salesInfo = [], n.ajax({url: "/basedata/employee.do?action=list&isDelete=2"}).done(function (t) {
            window.SYSTEM.salesInfo = t.items
        })
    }, h = function () {
        window.SYSTEM.accountInfo = [], (window.SYSTEM.isAdmin || window.SYSTEM.rights.SettAcct_QUERY) && n.ajax({url: "/basedata/settAcct.do?action=list&isDelete=2"}).done(function (t) {
            window.SYSTEM.accountInfo = t.items
        })
    }, f = function () {
        window.SYSTEM.unitInfo = [], (window.SYSTEM.isAdmin || window.SYSTEM.rights.UNIT_QUERY) && n.ajax({url: "/basedata/unit.do?action=list&isDelete=2"}).done(function (t) {
            window.SYSTEM.unitInfo = t.items;
            var e = {}, i = {}, n = [];
            n.push({id: 0, name: "（空）"});
            for (var a = 0; a < window.SYSTEM.unitInfo.length; a++) {
                var o = window.SYSTEM.unitInfo[a], s = o.unitTypeId || a;
                o.unitTypeId || e[s] || (e[s] = [], e[s].push(o), i[o.id] = o)
            }
            for (var r in e) {
                var l = e[r];
                if (1 === l.length) n.push(l[0]); else for (var c = 0; c < l.length; c++) l[c].default && n.push(l[c])
            }
            window.SYSTEM.baseUnitInfo = n
        })
    }, p = function () {
        window.SYSTEM.unitGroupInfo = [], (window.SYSTEM.isAdmin || window.SYSTEM.rights.UNIT_QUERY) && n.ajax({url: "/basedata/unitType.do?action=list"}).done(function (t) {
            window.SYSTEM.unitGroupInfo = t.items
        })
    }, m = function () {
        window.SYSTEM.brandInfo = [], (window.SYSTEM.isAdmin || window.SYSTEM.rights.BRAND_QUERY) && n.ajax({url: "/basedata/brand.do?action=list&isDelete=0"}).done(function (t) {
            t.rows.unshift({name: "（空）", id: 0, isdelete: !0}), window.SYSTEM.brandInfo = t.rows
        })
    }, g = function () {
        window.SYSTEM.assistPropTypeInfo = [], (window.SYSTEM.isAdmin || window.SYSTEM.rights.FZSX_QUERY) && n.ajax({url: "/basedata/assistType.do?action=list"}).done(function (t) {
            window.SYSTEM.assistPropTypeInfo = t.items
        })
    }, v = function () {
        window.SYSTEM.assistPropInfo = [], (window.SYSTEM.isAdmin || window.SYSTEM.rights.FZSX_QUERY) && n.ajax({url: "/basedata/assist.do?action=list&isDelete=2"}).done(function (t) {
            window.SYSTEM.assistPropInfo = t.items
        })
    }, b = function () {
        window.SYSTEM.assistPropGroupInfo = window.SYSTEM.assistPropGroupInfo || [], (window.SYSTEM.isAdmin || window.SYSTEM.rights.FZSX_QUERY) && n.ajax({url: "/basedata/assistSku.do?action=list"}).done(function (t) {
            window.SYSTEM.assistPropGroupInfo = t.items
        })
    }, w = function () {
        window.SYSTEM.userInfo = [], n.ajax({url: "/right.do?action=queryAllUser"}).done(function (t) {
            window.SYSTEM.userInfo = t.items
        })
    }, y = function () {
        var t = window.location.href, e = !0;
        t.indexOf("isCreatStore=1") !== -1 && (e = !1)
    };
    a(), o(), s(), r(), l(), c(), d(), u(), h(), f(), p(), g(), v(), b(), y(), w(), window.initDate = a, window.getPageConfig = o, window.getGoods = s, window.getStorage = r, window.getCustomer = l, window.getSupplier = c, window.getUnit = f, window.getBrandInfo = m, window.getUnitGroup = p, window.getAssistingPropType = g, window.getAssistingProp = v, window.getAssistingPropGroup = b, window.getAccounts = h, window.getStaff = u, t.exports = window.SYSTEM
}, function (t, e, i) {
    "use strict";
    var n = i(3), a = (i(4), i(50)), o = i(49), s = void 0;
    s = n.module(), s.Model = n.Model.extend({}), s.Views.Main = n.View.extend({
        template: "start/index",
        className: "layoutCls",
        events: {},
        initialize: function () {
            var t = this;
            this.model = this.model || new s.Model, this.listenTo(this.model, "changeWidth", function (e) {
                t.$el.find(".default-main").css({left: e})
            })
        },
        serialize: function () {
            return {isMixed: window.SYSTEM.isMixed}
        },
        beforeRender: function () {
            var t = new a.Views.Mian({modelMain: this.model}), e = new o.Views.Mian;
            this.setViews({".left-menu": t, ".default-main": e})
        },
        afterRender: function () {
        }
    }), t.exports = s
}, function (t, e, i) {
    function n(t) {
        return t && t.__esModule ? t : {default: t}
    }

    var a, o = i(73), s = n(o);
    a = function (e, n, a) {
        var o, r = i(1);
        r.fn.combo = function (t) {
            if (0 == this.length) return this;
            var e, i = arguments;
            return this.each(function () {
                var n = r(this).data("_combo");
                if ("string" == typeof t) {
                    if (!n) return;
                    "function" == typeof n[t] && (i = Array.prototype.slice.call(i, 1), e = n[t].apply(n, i))
                } else n || (n = new r.Combo(r(this), t), r(this).data("_combo", n))
            }), void 0 === e ? this : e
        }, r.fn.getCombo = function () {
            return r.Combo.getCombo(this)
        }, r.Combo = function (t, e) {
            this.obj = t, this.opts = r.extend(!0, {}, r.Combo.defaults, e), this.dataOpt = this.opts.data, this._selectedIndex = -1, this.addQuery = !0, this._disabled = "undefined" != typeof this.opts.disabled ? !!this.opts.disabled : !!this.obj.attr("disabled"), r.extend(this, this.opts.callback), this._init()
        }, r.Combo.getCombo = function (t) {
            if (t = r(t), 0 != t.length) {
                if (1 == t.length) return t.data("_combo");
                if (t.length > 1) {
                    var e = [];
                    return t.each(function (t) {
                        e.push(r(this).data("_combo"))
                    }), e
                }
            }
        }, r.Combo.prototype = {
            constructor: r.Combo, _init: function () {
                var t = this.opts;
                "select" == this.obj[0].tagName.toLowerCase() && (this.originSelect = this.obj, this.dataOpt = this._getDataFromSelect()), this._createCombo(), this.loadData(this.dataOpt, t.defaultSelected, t.defaultFlag), this._handleDisabled(this._disabled), this._bindEvent()
            }, loadData: function (t, e, i) {
                this.xhr && this.xhr.abort(), this.empty(!1), this.dataOpt = t, this.mode = this._getRenderMode(), this.mode && ("local" == this.mode ? (this._formatData(), this._populateList(this.formattedData), this._setDefaultSelected(e, i)) : "remote" == this.mode && this._loadAjaxData(e, i))
            }, activate: function () {
                this.focus || this.input.focus(), this.wrap.addClass(this.opts.activeCls), this.active = !0
            }, _blur: function () {
                this.active && (this.collapse(), this.opts.editable && this.opts.forceSelection && (this.selectByText(this.input.val()), this._selectedIndex == -1 && this.input.val("")), this.wrap.removeClass(this.opts.activeCls), this.active = !1, "function" == typeof this.onBlur && this.onBlur())
            }, blur: function () {
                this.focus && this.input.blur(), this._blur()
            }, _bindEvent: function () {
                var t = this, e = this.opts, i = "." + e.listItemCls;
                t.list.on("click", i, function (i) {
                    r(this).hasClass(e.selectedCls) || t.selectByItem(r(this)), t.collapse(), t.input.focus(), "function" == typeof e.callback.onListClick && e.callback.onListClick.call(t)
                }).on("mouseover", i, function (t) {
                    r(this).addClass(e.hoverCls).siblings().removeClass(e.hoverCls)
                }).on("mouseleave", i, function (t) {
                    r(this).removeClass(e.hoverCls)
                }), t.input.on("focus", function (i) {
                    t.wrap.addClass(e.activeCls), t.focus = !0, t.active = !0, "function" == typeof t.onFocus && t.onFocus()
                }).on("blur", function (e) {
                    t.focus = !1
                }), e.editable ? t.input.on("click", function (t) {
                }) : t.input.on("click", function (e) {
                    t._onTriggerClick()
                }), t.trigger && t.trigger.on("click", function (e) {
                    t._onTriggerClick()
                }), r(document).on("click", function (e) {
                    var i = e.target || e.srcElement;
                    0 == r(i).closest(t.wrap).length && 0 == r(i).closest(t.listWrap).length && t.blur()
                }), this.listWrap.on("click", function (t) {
                    t.stopPropagation()
                }), r(window).on("resize", function () {
                    t._setListPosition()
                }), this._bindKeyEvent()
            }, _bindKeyEvent: function () {
                var t = this, e = this.opts, i = {
                    backSpace: 8,
                    esc: 27,
                    f7: 118,
                    up: 38,
                    down: 40,
                    tab: 9,
                    enter: 13,
                    home: 36,
                    end: 35,
                    pageUp: 33,
                    pageDown: 34,
                    space: 32
                };
                this.input.on("keydown", function (n) {
                    switch (n.keyCode) {
                        case i.tab:
                            t._blur();
                            break;
                        case i.down:
                        case i.up:
                            if (t.isExpanded) {
                                var a = n.keyCode == i.down ? "next" : "prev";
                                t._setItemFocus(a)
                            } else t._onTriggerClick();
                            n.preventDefault();
                            break;
                        case i.enter:
                            if (t.queryDelay && window.clearTimeout(t.queryDelay), t.isExpanded) {
                                var o = t.list.find("." + e.hoverCls);
                                o.length > 0 && (o.find("p").trigger("click"), t.selectByItem(o)), t.collapse()
                            } else {
                                var s = r.trim(t.input.val());
                                t.selectByText(s)
                            }
                            "function" == typeof e.callback.onEnter && e.callback.onEnter(n);
                            break;
                        case i.home:
                        case i.end:
                            if (t.isExpanded) {
                                var o = n.keyCode == i.home ? t.list.find("." + e.listItemCls).eq(0) : t.list.find("." + e.listItemCls).filter(":last");
                                t._scrollToItem(o), n.preventDefault()
                            }
                            break;
                        case i.pageUp:
                        case i.pageDown:
                            if (t.isExpanded) {
                                var a = n.keyCode == i.pageUp ? "up" : "down";
                                t._scrollPage(a), n.preventDefault()
                            }
                    }
                }).on("keyup", function (n) {
                    if (e.editable) {
                        var a = n.which,
                            o = 8 == a || 9 == a || 13 == a || 27 == a || a >= 16 && a <= 20 || a >= 33 && a <= 40 || a >= 44 && a <= 46 || a >= 112 && a <= 123 || 144 == a || 145 == a,
                            s = t.input.val();
                        o && a != i.backSpace || t.doDelayQuery(s)
                    }
                }), r(document).on("keydown", function (e) {
                    e.keyCode == i.esc && t.collapse()
                })
            }, distory: function () {
            }, enable: function () {
                this._handleDisabled(!1)
            }, disable: function (t) {
                t = "undefined" == typeof t || !!t, this._handleDisabled(t)
            }, _handleDisabled: function (t) {
                var e = this.opts;
                this._disabled = t, 1 == t ? this.wrap.addClass(e.disabledCls) : this.wrap.removeClass(e.disabledCls), this.input.attr("disabled", t)
            }, _createCombo: function () {
                var t, e, i, n = this.opts, a = parseInt(this.opts.width);
                this.originSelect && this.originSelect.hide(), "input" == this.obj[0].tagName.toLowerCase() ? this.input = this.obj : (e = this.obj.find("." + n.inputCls), this.input = e.length > 0 ? e : r('<input type="text" class="' + n.inputCls + '"/>')), this.input.attr({
                    autocomplete: "off",
                    readOnly: !n.editable
                }).css({cursor: n.editable ? "" : "default"}), i = r(this.obj).find("." + n.triggerCls), i.length > 0 ? this.trigger = i : n.trigger !== !1 && (this.trigger = r('<span class="' + n.triggerCls + '"></span>')), t = this.obj.hasClass(n.wrapCls) ? this.obj : this.obj.find("." + n.wrapCls), t.length > 0 ? this.wrap = t.append(this.input, this.trigger) : this.trigger && (this.wrap = r('<span class="' + n.wrapCls + '"></span>').append(this.input, this.trigger), this.originSelect && this.obj[0] == this.originSelect[0] || this.obj[0] == this.input[0] ? this.obj.next().length > 0 ? this.wrap.insertBefore(this.obj.next()) : this.wrap.appendTo(this.obj.parent()) : this.wrap.appendTo(this.obj)), this.wrap && n.id && this.wrap.attr("id", n.id), this.wrap || (this.wrap = this.input), this._setComboLayout(a), n.forGoodsCombo ? (this.list = r("<div />").addClass(n.listCls).css({
                    position: "relative",
                    height: "300px",
                    overflow: "auto",
                    width: "861px",
                    border: "1px solid #ccc"
                }), this.listWrap = r("<div />").addClass(n.listWrapCls).attr("id", n.listId).hide().append(this.list).css({
                    position: "absolute", top: 0, zIndex: n.zIndex, border: 0
                })) : (this.list = r("<div />").addClass(n.listCls).css({
                    position: "relative",
                    overflow: "auto"
                }), this.listWrap = r("<div />").addClass(n.listWrapCls).attr("id", n.listId).hide().append(this.list).css({
                    position: "absolute",
                    top: 0,
                    zIndex: n.zIndex
                })), n.extraListHtml && (n.forGoodsCombo ? r("<div />").addClass(n.extraListHtmlCls).append(n.extraListHtml).appendTo(this.listWrap).css({
                    width: "856px",
                    border: "#ccc 1px solid",
                    borderTop: "none"
                }) : r("<div />").addClass(n.extraListHtmlCls).append(n.extraListHtml).appendTo(this.listWrap)), n.listRenderToBody ? (r.Combo.allListWrap || (r.Combo.allListWrap = r('<div id="COMBO_WRAP"/>').appendTo("body")), this.listWrap.appendTo(r.Combo.allListWrap)) : this.wrap.after(this.listWrap)
            }, _setListLayout: function () {
                var t, e, i = this.opts, n = parseInt(i.listHeight), a = 0,
                    o = this.trigger ? this.trigger.outerWidth() : 0, s = parseInt(i.minListWidth),
                    r = parseInt(i.maxListWidth);
                if (this.listWrap.width("auto"), this.list.height("auto"), this.listWrap.show(), this.isExpanded = !0, e = this.list.height(), !isNaN(n) && n >= 0 && (n = Math.min(n, e), this.list.height(n)), "auto" == i.listWidth || "auto" == i.width ? (t = this.listWrap.outerWidth(), e < this.list.height() && (a = 20, t += a)) : (t = parseInt(i.listWidth), isNaN(t) ? t = this.wrap.outerWidth() : null), "auto" == i.width) {
                    var l = this.listWrap.outerWidth() + Math.max(o, a);
                    this._setComboLayout(l)
                }
                s = isNaN(s) ? this.wrap.outerWidth() : Math.max(s, this.wrap.outerWidth()), !isNaN(s) && t < s && (t = s), !isNaN(r) && t > r && (t = r), t -= this.listWrap.outerWidth() - this.listWrap.width(), this.listWrap.width(t), this.listWrap.hide(), this.isExpanded = !1
            }, _setComboLayout: function (t) {
                if (t) {
                    var e = this.opts, i = parseInt(e.maxWidth), n = parseInt(e.minWidth);
                    !isNaN(i) && t > i && (t = i), !isNaN(n) && t < n && (t = n);
                    var a;
                    t -= this.wrap.outerWidth() - this.wrap.width(), this.wrap.width(t), this.wrap[0] != this.input[0] && (a = t - (this.trigger ? this.trigger.outerWidth() : 0) - (this.input.outerWidth() - this.input.width()), this.input.width(a))
                }
            }, _setListPosition: function () {
                if (this.isExpanded) {
                    var t, e, i = (this.opts, r(window)), n = this.wrap.offset().top, a = this.wrap.offset().left,
                        o = i.height(), s = i.width(), l = i.scrollTop(), c = i.scrollLeft(),
                        d = this.wrap.outerHeight(), u = this.wrap.outerWidth(), h = this.listWrap.outerHeight(),
                        f = this.listWrap.outerWidth(), p = parseInt(this.listWrap.css("border-top-width"));
                    t = n - l + d + h > o && n > h ? n - h + p : n + d - p, e = a - c + f > s ? a + u - f : a, this.listWrap.css({
                        top: t,
                        left: e
                    }), this.opts.forGoodsCombo && this.list.css({height: "350px"})
                }
            }, _getRenderMode: function () {
                var t, e = this.dataOpt;
                return r.isFunction(e) && (e = e()), r.isArray(e) ? (this.rawData = e, t = "local") : "string" == typeof e && (this.url = e, t = "remote"), t
            }, _loadAjaxData: function (t, e, i) {
                var n = this, a = n.opts, o = a.ajaxOptions,
                    s = r("<div />").addClass(a.loadingCls).text(o.loadingText);
                n.list.append(s), n.list.find(a.listTipsCls).remove(), n._setListLayout(), n._setListPosition(), n.xhr = r.ajax({
                    url: n.url,
                    type: o.type,
                    dataType: o.dataType,
                    timeout: o.timeout,
                    success: function (a) {
                        s.remove(), r.isFunction(o.success) && o.success(a), r.isFunction(o.formatData) && (a = o.formatData(a)), a && (n.rawData = a, n._formatData(), n._populateList(n.formattedData), "" === t ? (n.lastQuery = i, n.filterData = n.formattedData, n.expand()) : n._setDefaultSelected(t, e), n.xhr = null, n.mode = n._getRenderMode())
                    },
                    error: function (t, e, i) {
                        s.remove(), r("<div />").addClass(a.tipsCls).text(o.errorText).appendTo(n.list), n.xhr = null
                    }
                })
            }, getDisabled: function () {
                return this._disabled
            }, getValue: function () {
                return this._selectedIndex > -1 ? this.formattedData[this._selectedIndex].value : this.opts.forceSelection ? "" : this.input.val()
            }, getText: function () {
                return this._selectedIndex > -1 ? this.formattedData[this._selectedIndex].text : this.opts.forceSelection ? "" : this.input.val()
            }, getSelectedIndex: function () {
                return this._selectedIndex
            }, getSelectedRow: function () {
                var t = this._selectedIndex, e = [], i = this.opts;
                if (i.emptyOptions && e.push({
                        name: "(空)",
                        id: 0
                    }), i.addOptions && (e.push(i.addOptions), e.push({
                        name: i.addOptions.text,
                        id: i.addOptions.value
                    })), e = e.concat(this.rawData), t > -1) return e[t]
            }, getDataRow: function () {
                return this.getSelectedRow()
            }, getAllData: function () {
                return this.formattedData
            }, getAllRawData: function () {
                return this.rawData
            }, _setDefaultSelected: function (t, e) {
                var i = this.opts;
                if ("function" == typeof t && (defaultSelected = defaultSelected.call(this, this.rawData)), isNaN(parseInt(t))) if (r.isArray(t)) this.selectByKey(t[0], t[1], e); else if (this.originSelect) {
                    var n = this.originSelect[0].selectedIndex;
                    this._setSelected(n, e)
                } else i.autoSelect && this._setSelected(0, e); else {
                    var n = parseInt(t);
                    this._setSelected(n, e)
                }
            }, selectByIndex: function (t, e) {
                this._setSelected(t, e)
            }, selectByText: function (t, e) {
                if (this.formattedData) {
                    for (var i = this.formattedData, n = -1, a = 0, o = i.length; a < o; a++) if (i[a].text === t) {
                        n = a;
                        break
                    }
                    this._setSelected(n, e)
                }
            }, selectByValue: function (t, e) {
                if (this.formattedData) {
                    for (var i = this.formattedData, n = -1, a = 0, o = i.length; a < o; a++) if (i[a].value === t) {
                        n = a;
                        break
                    }
                    this._setSelected(n, e)
                }
            }, selectByKey: function (t, e, i) {
                if (this.rawData) {
                    var n = this, a = n.opts, o = this.rawData, s = -1;
                    if (a.addOptions || a.emptyOptions) {
                        o = this.formattedData;
                        for (var r = 0, l = o.length; r < l; r++) if (o[r].value === e) {
                            s = r;
                            break
                        }
                    } else for (var r = 0, l = o.length; r < l; r++) if (o[r][t] === e) {
                        s = r;
                        break
                    }
                    this._setSelected(s, i)
                }
            }, selectByItem: function (t, e) {
                if (this.opts.forGoodsCombo) {
                    if (!t || t.parent()[0] != this.list[0]) return;
                    if ("" == t.find("span:eq(2)").text()) var i = t.find("a:eq(0)").text() + " " + t.find("a:eq(1)").text(); else var i = t.find("a:eq(0)").text() + " " + t.find("a:eq(1)").text() + "_" + t.find("span:eq(2)").text();
                    this.selectByText(i, e)
                } else {
                    if (!t || t.parent()[0] != this.list[0]) return;
                    var i = t.text();
                    this.selectByText(i, e)
                }
            }, _setSelected: function (t, e) {
                var i = this.opts, t = parseInt(t), e = "undefined" == typeof e || !!e;
                if (!isNaN(t)) {
                    if (!this.formattedData || 0 == this.formattedData.length) return void(this._selectedIndex = -1);
                    var n = this.formattedData.length;
                    if ((t < -1 || t >= n) && (t = -1), this._selectedIndex != t) {
                        var a = t == -1 ? null : this.formattedData[t], o = t == -1 ? null : a.rawData,
                            s = t == -1 ? "" : a.text;
                        this.list.find("." + i.listItemCls);
                        e && "function" == typeof this.beforeChange && !this.beforeChange(o) || (i.editable && t == -1 && this.focus || this.input.val(s), this._selectedIndex = t, e && "function" == typeof this.onChange && this.onChange(o), this.originSelect && (this.originSelect[0].selectedIndex = t))
                    }
                }
            }, removeSelected: function (t) {
                this.input.val(""), this._setSelected(-1, t)
            }, _triggerCallback: function (t, e) {
            }, _getDataFromSelect: function () {
                var t = this.opts, e = [];
                return r.each(this.originSelect.find("option"), function (i) {
                    var n = r(this), a = {};
                    a[t.text] = n.text(), a[t.value] = n.attr("value"), e.push(a)
                }), e
            }, _formatData: function () {
                if (r.isArray(this.rawData)) {
                    var t = this, e = t.opts;
                    t.formattedData = [], e.emptyOptions && t.formattedData.push({
                        text: "(空)",
                        value: 0
                    }), e.addOptions && t.formattedData.push(e.addOptions), r.each(this.rawData, function (i, n) {
                        var a = {};
                        a.text = r.isFunction(e.formatText) ? e.formatText(n) : n[e.text], a.value = r.isFunction(e.formatValue) ? e.formatValue(n) : n[e.value], a.rawData = n, t.formattedData.push(a)
                    }), t.formattedLen = t.formattedData.length
                }
            }, _filter: function (t) {
                function e() {
                    this._formatData(), this.filterData = this.formattedData, this.lastQuery = t, this.list.empty(), this._populateList(this.filterData), this.expand()
                }

                t = "undefined" == typeof t ? "" : t, this.input.val() != this.getText() && this.selectByText(this.input.val());
                var i = this.opts, n = this;
                i.maxFilter;
                if (this.opts.cache || ("local" == this.mode && r.isFunction(this.dataOpt) && (this.rawData = this.dataOpt()), this._formatData()), r.isArray(this.formattedData)) {
                    if ("" == t) i.editable ? this.filterData = this.formattedData.slice(0, i.maxFilter) : this.filterData = this.formattedData; else {
                        this.filterData = [];
                        var a = [];
                        r.each(n.formattedData, function (e, o) {
                            var s = o.text;
                            if (r.isFunction(i.customMatch)) {
                                if (!i.customMatch(o, t)) return
                            } else {
                                var l = i.caseSensitive ? "" : "i",
                                    c = new RegExp(t.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), l);
                                if (s.search(c) == -1) return
                            }
                            if (n.filterData.push(o), a.push({
                                    i: e,
                                    val: o.value
                                }), n.filterData.length == i.maxFilter) return !1
                        })
                    }
                    for (var o = {}, s = [], l = 0, c = this.filterData.length; l < c; l++) {
                        var d = this.filterData[l];
                        o[d.value] || (o[d.value] = !0, s.push(d))
                    }
                    this.filterData = s, s = [], o = {}, r.isFunction(this.incrementalSearch) && 100 === n.formattedLen && n.filterData.length < i.maxFilter ? n.addQuery === !0 && this.incrementalSearch(a, e) : (this.lastQuery = t, this.list.empty(), this._populateList(this.filterData), this.expand())
                }
            }, doDelayQuery: function (t) {
                var e = this, i = e.opts, n = parseInt(i.queryDelay);
                isNaN(n) && (n = 0), e.queryDelay && window.clearTimeout(e.queryDelay), e.queryDelay = window.setTimeout(function () {
                    e.doQuery(t)
                }, n)
            }, doQuery: function (t) {
                "local" == this.mode || "remote" == this.mode && this.opts.loadOnce ? this._filter(t) : this._loadAjaxData("", !1, t)
            }, _populateList: function (t) {
                if (t) {
                    var e = this, i = e.opts;
                    if (0 == t.length) i.forceSelection && (r("<div />").addClass(i.tipsCls).html(i.noDataText).appendTo(e.list), this._setListLayout()); else {
                        if (i.forGoodsCombo) if (Public.getDefaultPage().SYSTEM.enableAssistingProp) for (var n = -1, a = t.length; n < a; n++) {
                            var o = "";
                            if (n == -1) {
                                var s = '<span style="width: 150px;text-align:center">商品编号</span><span style="width: 290px;text-align:center">商品名称</span><span style="width: 200px;text-align:center">规格型号</span><span style="width: 100px;text-align:center">辅助属性</span><span style="width: 60px;text-align:center">基本单位</span>',
                                    l = r("<div />").attr({class: i.listItemCls + (n == this._selectedIndex ? " " + i.selectedCls : "")}).css({
                                        "border-bottom": "1px solid #ccc",
                                        "border-right": "1px solid #ccc",
                                        "border-left": "1px solid #ccc",
                                        padding: "0px",
                                        "line-height": "0px"
                                    });
                                i.disStrict ? l.html(s).appendTo(e.list) : l.html(s).appendTo(e.list)
                            } else {
                                var c = t[n].rawData, d = c.number || "", u = c.name || "", h = c.spec || "",
                                    f = c.unitName || "";
                                c.remark || "";
                                if (c.invSkus && c.invSkus.length > 0) for (var p = c.invSkus, m = 0; m < p.length; m++) {
                                    c.invSkus[m].skuName && (o = p[m].skuName);
                                    var s = "<p onclick=invorderFun(" + m + ')><span style="width: 150px"><a title="' + d + '">' + d + '</a></span><span style="width: 290px"><a title="' + u + '">' + u + '</a></span><span style="width: 200px">' + h + '</span><span style="width: 100px" invorder="' + m + '" class="skustring">' + (o || " ") + '</span><span style="width: 60px;border-right:0px">' + f + "</span></p>",
                                        g = c, v = g.text, b = g.value, l = r("<div />").attr({
                                            class: i.listItemCls + (n == this._selectedIndex ? " " + i.selectedCls : ""),
                                            "data-value": b
                                        }).css({
                                            "border-bottom": "1px solid #ccc",
                                            "border-right": "1px solid #ccc",
                                            "border-left": "1px solid #ccc",
                                            padding: "0px",
                                            "line-height": "0px"
                                        });
                                    i.disStrict ? l.html(s).appendTo(e.list) : l.html(s).appendTo(e.list), 0 == n && 0 == m && l.addClass("on")
                                } else {
                                    var s = '<p><span style="width: 150px"><a title="' + d + '">' + d + '</a></span><span style="width: 290px"><a title="' + u + '">' + u + '</a></span><span style="width: 200px">' + h + '</span><span style="width: 100px">' + (o || " ") + '</span><span style="width: 60px;border-right:0px">' + f + "</span></p>",
                                        g = c, v = g.text, b = g.value, l = r("<div />").attr({
                                            class: i.listItemCls + (n == this._selectedIndex ? " " + i.selectedCls : ""),
                                            "data-value": b
                                        }).css({
                                            "border-bottom": "1px solid #ccc",
                                            "border-right": "1px solid #ccc",
                                            "border-left": "1px solid #ccc",
                                            padding: "0px",
                                            "line-height": "0px"
                                        });
                                    i.disStrict ? l.html(s).appendTo(e.list) : l.html(s).appendTo(e.list), 0 == n && l.addClass("on")
                                }
                            }
                        } else for (var n = -1, a = t.length; n < a; n++) if (n == -1) {
                            var s = '<span style="width: 200px;text-align:center">商品编号</span><span style="width: 320px;text-align:center">商品名称</span><span style="width: 200px;text-align:center">规格型号</span><span style="width: 70px;text-align:center;border-right:0px">基本单位</span>',
                                l = r("<div />").attr({class: i.listItemCls + (n == this._selectedIndex ? " " + i.selectedCls : "")}).css({
                                    "border-bottom": "1px solid #ccc",
                                    "border-right": "1px solid #ccc",
                                    "border-left": "1px solid #ccc",
                                    padding: "0px",
                                    "line-height": "0px"
                                });
                            i.disStrict ? l.html(s).appendTo(e.list) : l.html(s).appendTo(e.list), 0 == n && l.addClass("on")
                        } else {
                            var c = t[n].rawData, d = c.number || "", u = c.name || "", h = c.spec || "",
                                f = c.unitName || "",
                                s = (c.remark || "", '<p><span style="width: 200px"><a title="' + d + '">' + d + '</a></span><span style="width: 320px"><a title="' + u + '">' + u + '</a></span><span style="width: 200px">' + h + '</span><span style="width: 70px;border-right:0px">' + f + "</span></p>"),
                                g = c, v = g.text, b = g.value, l = r("<div />").attr({
                                    class: i.listItemCls + (n == this._selectedIndex ? " " + i.selectedCls : ""),
                                    "data-value": b
                                }).css({
                                    "border-bottom": "1px solid #ccc",
                                    "border-right": "1px solid #ccc",
                                    "border-left": "1px solid #ccc",
                                    padding: "0px",
                                    "line-height": "0px"
                                });
                            i.disStrict ? l.html(s).appendTo(e.list) : l.html(s).appendTo(e.list), 0 == n && l.addClass("on")
                        } else for (var n = 0, a = t.length; n < a; n++) {
                            var g = t[n], v = g.text, b = g.value, l = r("<div />").attr({
                                class: i.listItemCls + (n == this._selectedIndex ? " " + i.selectedCls : ""),
                                "data-value": b
                            });
                            i.disStrict ? l.html(v).appendTo(e.list) : l.text(v).appendTo(e.list)
                        }
                        this._setListLayout()
                    }
                }
            }, expand: function () {
                var t = this.opts;
                if (!this.active || this.isExpanded || 0 == this.filterData.length && !t.noDataText && !t.extraListHtmlCls) return void this.listWrap.hide();
                this.isExpanded = !0, this.listWrap.show(), this._setListPosition(), r.isFunction(this.onExpand) && this.onExpand();
                var e = this.list.find("." + t.listItemCls);
                if (0 != e.length) {
                    var i = e.filter("." + t.selectedCls);
                    0 == i.length && (i = e.eq(0), t.autoSelectFirst && i.addClass(t.hoverCls)), this._scrollToItem(i)
                }
            }, collapse: function () {
                if (this.isExpanded) {
                    var t = this.opts;
                    this.listWrap.hide(), this.isExpanded = !1, this.listItems && this.listItems.removeClass(t.hoverCls), r.isFunction(this.onCollapse) && this.onCollapse()
                }
            }, _onTriggerClick: function () {
                this._disabled || (this.active = !0, this.input.focus(), this.isExpanded ? this.collapse() : this._filter())
            }, _scrollToItem: function (t) {
                if (t && 0 != t.length) {
                    var e = this.list.scrollTop(), i = e + t.position().top, n = e + this.list.height(),
                        a = i + t.outerHeight();
                    (i < e || a > n) && this.list.scrollTop(i)
                }
            }, _scrollPage: function (t) {
                var e, i = this.list.scrollTop(), n = this.list.height();
                "up" == t ? e = i - n : "down" == t && (e = i + n), this.list.scrollTop(e)
            }, _setItemFocus: function (t) {
                var e, i, n = this.opts, a = this.list.find("." + n.listItemCls);
                if (0 != a.length) {
                    var o = a.filter("." + n.hoverCls).eq(0);
                    0 == o.length && (o = a.filter("." + n.selectedCls).eq(0)), 0 == o.length ? e = 0 : (e = a.index(o), e = "next" == t ? e == a.length - 1 ? 0 : e + 1 : 0 == e ? a.length - 1 : e - 1), i = a.eq(e), a.removeClass(n.hoverCls), i.addClass(n.hoverCls), this._scrollToItem(i)
                }
            }, empty: function (t) {
                this._setSelected(-1, !1), this.input.val(""), this.list.empty(), this.rawData = null, this.formattedData = null
            }, setEdit: function () {
            }
        }, r.Combo.defaults = (o = {
            data: null,
            text: "text",
            value: "value",
            formatText: null,
            formatValue: null,
            defaultSelected: void 0,
            defaultFlag: !0,
            autoSelect: !0,
            disabled: void 0,
            editable: !1,
            caseSensitive: !1,
            forceSelection: !0,
            cache: !0,
            queryDelay: 100,
            maxFilter: 200,
            minChars: 0,
            customMatch: null,
            addQuery: "",
            noDataText: "没有匹配的选项",
            autoSelectFirst: !0,
            width: void 0,
            minWidth: void 0,
            maxWidth: void 0,
            listWidth: void 0,
            listHeight: 150,
            maxListWidth: void 0
        }, (0, s.default)(o, "maxListWidth", void 0), (0, s.default)(o, "zIndex", 1e3), (0, s.default)(o, "listRenderToBody", !0), (0, s.default)(o, "extraListHtml", void 0), (0, s.default)(o, "disStrict", !1), (0, s.default)(o, "ajaxOptions", {
            type: "post",
            dataType: "json",
            queryParam: "query",
            timeout: 1e4,
            formatData: null,
            loadingText: "Loading...",
            success: null,
            error: null,
            errorText: "数据加载失败"
        }), (0, s.default)(o, "loadOnce", !0), (0, s.default)(o, "id", void 0), (0, s.default)(o, "listId", void 0), (0, s.default)(o, "wrapCls", "ui-combo-wrap"), (0, s.default)(o, "focusCls", "ui-combo-focus"), (0, s.default)(o, "disabledCls", "ui-combo-disabled"), (0, s.default)(o, "activeCls", "ui-combo-active"), (0, s.default)(o, "inputCls", "input-txt"), (0, s.default)(o, "triggerCls", "trigger"), (0, s.default)(o, "listWrapCls", "ui-droplist-wrap"), (0, s.default)(o, "listCls", "droplist"), (0, s.default)(o, "listItemCls", "list-item"), (0, s.default)(o, "selectedCls", "selected"), (0, s.default)(o, "hoverCls", "on"), (0, s.default)(o, "loadingCls", "loading"), (0, s.default)(o, "tipsCls", "tips"), (0, s.default)(o, "extraListHtmlCls", "extra-list-ctn"), (0, s.default)(o, "callback", {
            onFocus: null,
            onBlur: null,
            beforeChange: null,
            onChange: null,
            onExpand: null,
            onCollapse: null,
            onEnter: null,
            onListClick: null
        }), o), t.exports = r
    }.call(e, i, e, t), !(void 0 !== a && (t.exports = a))
}, function (t, e, i) {
    "use strict";
    var n = i(1), a = function (t, e, i) {
        var n, a, o, s, r = e.ActiveXObject && !e.XMLHttpRequest, l = function () {
            }, c = 0, d = /^url:/, u = e.document, h = "JDG" + +new Date,
            f = '<table class="ui_border"><tbody><tr><td class="ui_lt"></td><td class="ui_t"></td><td class="ui_rt"></td></tr><tr><td class="ui_l"></td><td class="ui_c"><div class="ui_inner"><table class="ui_dialog"><tbody><tr><td colspan="2"><div class="ui_title_bar"><div class="ui_title" unselectable="on"></div><div class="ui_title_buttons"><a class="ui_min" href="javascript:void(0);" title="最小化"><b class="ui_min_b"></b></a><a class="ui_max" href="javascript:void(0);" title="最大化"><b class="ui_max_b"></b></a><a class="ui_res" href="javascript:void(0);" title="还原"><b class="ui_res_b"></b><b class="ui_res_t"></b></a><a class="ui_close" href="javascript:void(0);" title="关闭(esc键)">×</a></div></div></td></tr><tr><td class="ui_icon"></td><td class="ui_main"><div class="ui_content"></div></td></tr><tr><td colspan="2"><div class="ui_buttons"></div></td></tr></tbody></table></div></td><td class="ui_r"></td></tr><tr><td class="ui_lb"></td><td class="ui_b"></td><td class="ui_rb"></td></tr></tbody></table>',
            p = function (t, e, i) {
                for (var n = t.length; e < n && (i = u.querySelector ? t[e].src : t[e].getAttribute("src", 4), i.substr(i.lastIndexOf("/")).indexOf("jquery.dialog") === -1); e++) ;
                return i = i.split("?"), o = i[1], i[0].substr(0, i[0].lastIndexOf("/") + 1)
            }(u.getElementsByTagName("script"), 0), m = function (t) {
                if (o) for (var e, i = o.split("&"), n = 0, a = i.length; n < a; n++) if (e = i[n].split("="), t === e[0]) return e[1];
                return null
            }, g = (m("skin") || "default", function (t) {
                try {
                    s = t.top.document, s.getElementsByTagName
                } catch (e) {
                    return s = t.document, t
                }
                return "true" === m("self") || s.getElementsByTagName("frameset").length > 0 ? (s = t.document, t) : t.top
            }(e)), v = s.documentElement, b = "BackCompat" === s.compatMode, w = t(s), y = t(g),
            x = t(s.getElementsByTagName("html")[0]);
        try {
            s.execCommand("BackgroundImageCache", !1, !0)
        } catch (t) {
        }
        r && function (t) {
            "fixed" !== x.css(t) && x.css({zoom: 1, backgroundImage: "url(about:blank)", backgroundAttachment: "fixed"})
        }("backgroundAttachment");
        var _ = {}, S = function (t) {
            t = t || {};
            var e, a = _.setting;
            for (var o in a) t[o] === i && (t[o] = a[o]);
            return t.id = t.id || h + c, (e = _.list[t.id]) ? e.zindex().focus() : (t.button = t.button || [], t.ok && t.button.push({
                id: "ok",
                name: t.okVal,
                callback: t.ok,
                focus: t.focus
            }), t.cancel && t.button.push({
                id: "cancel",
                name: t.cancelVal,
                callback: t.cancel
            }), _.setting.zIndex = t.zIndex, c++, _.list[t.id] = n ? n._init(t) : new _.fn._init(t))
        };
        _.fn = _.prototype = {
            constructor: S, _init: function (t) {
                var i, a = this, o = t.content, s = d.test(o);
                return a.opener = e, a.config = t, a.DOM = i = a._getDOM(), a.closed = !1, a.data = t.data, t.icon && !s ? (t.min = !1, t.max = !1, i.icon[0].style.display = "", i.icon[0].innerHTML = '<img src="/css/base/dialog/icons/' + t.icon + '" class="ui_icon_bg"/>') : i.icon[0].style.display = "none", i.wrap.addClass(t.skin), i.rb[0].style.cursor = t.resize ? "se-resize" : "auto", i.title[0].style.cursor = t.drag ? "move" : "auto", i.max[0].style.display = t.max ? "inline-block" : "none", i.min[0].style.display = t.min ? "inline-block" : "none", i.close[0].style.display = t.cancel === !1 ? "none" : "inline-block", i.content[0].style.padding = t.padding, a.button.apply(a, t.button), a.title(t.title).content(o, !0, s).size(t.width, t.height).position(t.left, t.top).time(t.time)[t.show ? "show" : "hide"](!0).zindex(), t.focus && a.focus(), t.lock && a.lock(), a._ie6PngFix()._addEvent(), n = null, !s && t.init && t.init.call(a, e), a
            }, button: function e() {
                for (var i, n, a, o, e, r = this, l = r.DOM, c = l.buttons[0], d = "ui_state_highlight", u = r._listeners = r._listeners || {}, f = [].slice.call(arguments), p = 0; p < f.length; p++) if (i = f[p], n = i.name, a = i.id || n, o = !u[a], e = o ? s.createElement("input") : u[a].elem, e.type = "button", u[a] || (u[a] = {}), n && (e.value = n), i.callback && (u[a].callback = i.callback), i.focus && (r._focus && r._focus.removeClass(d), r._focus = t(e).addClass(d), r.focus()), i.defClass && t(e).addClass(i.defClass), e[h + "callback"] = a, e.disabled = !!i.disabled, o) if (u[a].elem = e, p + 1 < f.length) {
                    var m = f[p + 1], g = m.name, v = m.id || g, b = !u[v];
                    b ? c.appendChild(e) : t(u[v].elem).before(e)
                } else c.appendChild(e);
                return c.style.display = f.length ? "" : "none", r._ie6SelectFix(), r
            }, title: function t(e) {
                if (e === i) return this;
                var n = this.DOM, a = n.border, t = n.title[0];
                return e === !1 ? (t.style.display = "none", t.innerHTML = "", a.addClass("ui_state_tips")) : (t.style.display = "", t.innerHTML = e, a.removeClass("ui_state_tips")), this
            }, content: function (t, e, n) {
                if (t === i) return this;
                var a = this, o = a.DOM, s = o.wrap[0], r = s.offsetWidth, l = s.offsetHeight,
                    c = parseInt(s.style.left), d = parseInt(s.style.top), u = s.style.width, h = o.content,
                    f = _.setting.content;
                return n ? (h[0].innerHTML = f, a._iframe(t.split("url:")[1])) : h.html(t), e || (r = s.offsetWidth - r, l = s.offsetHeight - l, c -= r / 2, d -= l / 2, s.style.left = Math.max(c, 0) + "px", s.style.top = Math.max(d, 0) + "px", u && "auto" !== u && (s.style.width = s.offsetWidth + "px"), a._autoPositionType()), a._ie6SelectFix(), a
            }, size: function (t, e) {
                var i = this, n = i.DOM, a = n.wrap[0], o = n.main[0].style;
                return a.style.width = "auto", "number" == typeof t && (t += "px"), "number" == typeof e && (e += "px"), o.width = t, o.height = e, "auto" !== t && (a.style.width = a.offsetWidth + "px"), i._ie6SelectFix(), i
            }, position: function (t, e) {
                var n = this, a = n.config, o = n.DOM.wrap[0], s = o.style, l = !r && a.fixed, c = r && a.fixed,
                    d = y.scrollLeft(), u = y.scrollTop(), h = l ? 0 : d, f = l ? 0 : u, p = y.width(), m = y.height(),
                    g = o.offsetWidth, v = o.offsetHeight;
                return (t || 0 === t) && (n._left = t.toString().indexOf("%") !== -1 ? t : null, t = n._toNumber(t, p - g), "number" == typeof t && (t = c ? t += d : t + h, t = Math.max(t, h) + "px"), s.left = t), (e || 0 === e) && (n._top = e.toString().indexOf("%") !== -1 ? e : null, e = n._toNumber(e, m - v), "number" == typeof e && (e = c ? e += u : e + f, e = Math.max(e, f) + "px"), s.top = e), t !== i && e !== i && n._autoPositionType(), n
            }, time: function (t, e) {
                var i = this, n = i._timer;
                return n && clearTimeout(n), e && e.call(i), t && (i._timer = setTimeout(function () {
                    i._click("cancel")
                }, 1e3 * t)), i
            }, show: function (e) {
                return this.DOM.wrap[0].style.visibility = "visible", this.DOM.border.addClass("ui_state_visible"), !e && this._lock && (t("#ldg_lockmask", s)[0].style.display = ""), this
            }, hide: function (e) {
                return this.DOM.wrap[0].style.visibility = "hidden", this.DOM.border.removeClass("ui_state_visible"), !e && this._lock && (t("#ldg_lockmask", s)[0].style.display = "none"), this
            }, zindex: function () {
                var t = this, e = t.DOM, i = t._load, n = _.focus, a = _.setting.zIndex++;
                return e.wrap[0].style.zIndex = a, n && n.DOM.border.removeClass("ui_state_focus"), _.focus = t, e.border.addClass("ui_state_focus"), i && i.style.zIndex && (i.style.display = "none"), n && n !== t && n.iframe && (n._load.style.display = ""), t
            }, focus: function () {
                try {
                    elemFocus = this._focus && this._focus[0] || this.DOM.close[0], elemFocus && elemFocus.focus()
                } catch (t) {
                }
                return this
            }, lock: function () {
                var e, i = this, n = _.setting.zIndex - 1, a = (i.config, t("#ldg_lockmask", s)[0]),
                    o = a ? a.style : "", l = r ? "absolute" : "fixed";
                return a || (e = '<iframe src="javascript:\'\'" style="width:100%;height:100%;position:absolute;top:0;left:0;z-index:-1;filter:alpha(opacity=0)"></iframe>', a = s.createElement("div"), a.id = "ldg_lockmask", a.onselectstart = function () {
                    return !1
                }, a.style.cssText = "position:" + l + ";left:0;top:0;width:100%;height:100%;overflow:hidden;", o = a.style, r && (a.innerHTML = e), s.body.appendChild(a)), "absolute" === l && (o.width = y.width(), o.height = y.height(), o.top = y.scrollTop(), o.left = y.scrollLeft(), i._setFixed(a)), o.zIndex = n, o.display = "", i.zindex(), i.DOM.border.addClass("ui_state_lock"), i._lock = !0, i
            }, unlock: function () {
                var e = this, i = e.config, n = t("#ldg_lockmask", s)[0];
                if (n && e._lock) {
                    if (i.parent && i.parent._lock) {
                        var a = i.parent.DOM.wrap[0].style.zIndex;
                        n.style.zIndex = parseInt(a, 10) - 1
                    } else n.style.display = "none";
                    e.DOM.border.removeClass("ui_state_lock")
                }
                return e._lock = !1, e
            }, close: function () {
                var i = this, a = i.DOM, o = a.wrap, s = _.list, r = i.config.close;
                if (i.time(), i.iframe) {
                    if ("function" == typeof r && r.call(i, i.iframe.contentWindow, e) === !1) return i;
                    t(i.iframe).unbind("load", i._fmLoad).attr("src", "javascript:'';").remove(), a.content.removeClass("ui_state_full"), i._frmTimer && clearTimeout(i._frmTimer)
                } else if ("function" == typeof r && r.call(i, e) === !1) return i;
                if (i.unlock(), i._maxState && (x.removeClass("ui_lock_scroll"), a.res[0].style.display = "none"), _.focus === i && (_.focus = null), i._removeEvent(), delete s[i.config.id], n) o.remove(); else {
                    n = i, i._minState && (a.main[0].style.display = "", a.buttons[0].style.display = "", a.dialog[0].style.width = ""), a.wrap[0].style.cssText = "left:0;top:0;", a.wrap[0].className = "", a.border.removeClass("ui_state_focus"), a.title[0].innerHTML = "", a.content.html(""), a.icon[0].innerHTML = "", a.buttons[0].innerHTML = "", i.hide(!0)._setAbsolute();
                    for (var l in i) i.hasOwnProperty(l) && "DOM" !== l && delete i[l]
                }
                return i.closed = !0, i
            }, max: function () {
                var t, e = this, i = e.DOM, n = i.wrap[0].style, a = i.main[0].style, o = i.rb[0].style,
                    s = i.title[0].style, l = e.config, c = y.scrollTop(), d = y.scrollLeft();
                return e._maxState ? (x.removeClass("ui_lock_scroll"), n.top = e._or.t, n.left = e._or.l, e.size(e._or.w, e._or.h)._autoPositionType(), l.drag = e._or.d, l.resize = e._or.r, o.cursor = e._or.rc, s.cursor = e._or.tc, i.res[0].style.display = "none", i.max[0].style.display = "inline-block", delete e._or, e._maxState = !1) : (x.addClass("ui_lock_scroll"), e._minState && e.min(), e._or = {
                    t: n.top,
                    l: n.left,
                    w: a.width,
                    h: a.height,
                    d: l.drag,
                    r: l.resize,
                    rc: o.cursor,
                    tc: s.cursor
                }, n.top = c + "px", n.left = d + "px", t = e._maxSize(), e.size(t.w, t.h)._setAbsolute(), r && b && (n.width = y.width() + "px"), l.drag = !1, l.resize = !1, o.cursor = "auto", s.cursor = "auto", i.max[0].style.display = "none", i.res[0].style.display = "inline-block", e._maxState = !0), e
            }, min: function () {
                var t = this, e = t.DOM, i = e.main[0].style, n = e.buttons[0].style, a = e.dialog[0].style,
                    o = e.rb[0].style.cursor, s = t.config.resize;
                return t._minState ? (i.display = "", n.display = t._minRz.btn, a.width = "", s = t._minRz, o.cursor = t._minRz.rzs ? "se-resize" : "auto", delete t._minRz, t._minState = !1) : (t._maxState && t.max(), t._minRz = {
                    rzs: s,
                    btn: n.display
                }, i.display = "none", n.display = "none", a.width = i.width, o.cursor = "auto", s = !1, t._minState = !0), t._ie6SelectFix(), t
            }, get: function (t, e) {
                return _.list[t] ? 1 === e ? _.list[t] : _.list[t].content || null : null
            }, reload: function (i, n, a) {
                i = i || e;
                try {
                    i.location.href = n ? n : i.location.href
                } catch (e) {
                    n = this.iframe.src, t(this.iframe).attr("src", n)
                }
                return a && a.call(this), this
            }, _iframe: function (e) {
                var i, n, a, o, l, c, d, u = this, h = u.DOM.content, f = u.config,
                    p = u._load = t(".ui_loading", h[0])[0],
                    m = "position:absolute;left:-9999em;border:none 0;background:transparent",
                    v = "width:100%;height:100%;border:none 0;";
                if (f.cache === !1) {
                    var b = (new Date).getTime(), w = e.replace(/([?&])_=[^&]*/, "$1_=" + b);
                    e = w + (w === e ? (/\?/.test(e) ? "&" : "?") + "_=" + b : "")
                }
                i = u.iframe = s.createElement("iframe"), i.name = f.id, i.style.cssText = m, i.setAttribute("frameborder", 0, 0), n = t(i), h[0].appendChild(i), u._frmTimer = setTimeout(function () {
                    n.attr("src", e)
                }, 1);
                var y = u._fmLoad = function () {
                    h.addClass("ui_state_full");
                    var e = u.DOM, n = (e.lt[0].offsetHeight, e.main[0].style);
                    p.style.cssText = "display:none;position:absolute;background:#FFF;opacity:0;filter:alpha(opacity=0);z-index:1;width:" + n.width + ";height:" + n.height + ";";
                    try {
                        a = u.content = i.contentWindow, o = t(a.document), l = t(a.document.body)
                    } catch (t) {
                        return void(i.style.cssText = v)
                    }
                    setTimeout(function () {
                        i.style.cssText = v
                    }, 0), u._maxState || setTimeout(function () {
                        c = "auto" === f.width ? o.width() + (r ? 0 : parseInt(l.css("marginLeft"))) : f.width, d = "auto" === f.height ? o.height() : f.height, u.size(c + 10, d + 10).position(f.left, f.top)
                    }, 100), p.style.width = n.width, p.style.height = n.height, f.init && f.init.call(u, a, g)
                };
                u.iframe.api = u, n.bind("load", y)
            }, _getDOM: function () {
                var e = s.createElement("div"), i = s.body;
                e.style.cssText = "position:absolute;left:0;top:0;visibility:hidden;", e.innerHTML = f;
                for (var n, a = 0, o = {wrap: t(e)}, r = e.getElementsByTagName("*"), l = r.length; a < l; a++) n = r[a].className.split("ui_")[1], n && (o[n] = t(r[a]));
                return i.appendChild(e), o
            }, _toNumber: function (t, e) {
                return "number" == typeof t ? t : (t.indexOf("%") !== -1 && (t = parseInt(e * t.split("%")[0] / 100)), t)
            }, _maxSize: function () {
                var t, e, i = this, n = i.DOM, a = n.wrap[0], o = n.main[0];
                return t = y.width() - a.offsetWidth + o.offsetWidth, e = y.height() - a.offsetHeight + o.offsetHeight, {
                    w: t,
                    h: e
                }
            }, _ie6PngFix: function () {
                if (r) for (var t, e, i, n, a = 0, o = _.setting.path + "/skins/", s = this.DOM.wrap[0].getElementsByTagName("*"); a < s.length; a++) t = s[a], e = t.currentStyle.png, e && (i = o + e, n = t.runtimeStyle, n.backgroundImage = "none", n.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + i + "',sizingMethod='scale')");
                return this
            }, _ie6SelectFix: r ? function () {
                var t = this.DOM.wrap, e = t[0], i = i + "iframeMask", n = t[i], a = e.offsetWidth, o = e.offsetHeight;
                a += "px", o += "px", n ? (n.style.width = a, n.style.height = o) : (n = e.appendChild(s.createElement("iframe")), t[i] = n, n.src = "javascript:''", n.style.cssText = "position:absolute;z-index:-1;left:0;top:0;filter:alpha(opacity=0);width:" + a + ";height:" + o)
            } : l, _autoPositionType: function () {
                this[this.config.fixed ? "_setFixed" : "_setAbsolute"]()
            }, _setFixed: function (t) {
                var e = t ? t.style : this.DOM.wrap[0].style;
                if (r) {
                    var i = y.scrollLeft(), n = y.scrollTop(), a = parseInt(e.left) - i, o = parseInt(e.top) - n,
                        s = b ? "this.ownerDocument.body" : "this.ownerDocument.documentElement";
                    this._setAbsolute(), e.setExpression("left", s + ".scrollLeft +" + a), e.setExpression("top", s + ".scrollTop +" + o)
                } else e.position = "fixed"
            }, _setAbsolute: function () {
                var t = this.DOM.wrap[0].style;
                r && (t.removeExpression("left"), t.removeExpression("top")), t.position = "absolute"
            }, _click: function (t) {
                var i = this, n = i._listeners[t] && i._listeners[t].callback;
                return "function" != typeof n || n.call(i, e) !== !1 ? i.close() : i
            }, _reset: function () {
                var i, n = !!e.ActiveXObject, a = this, o = y.width(), l = y.height(), c = a._winSize || o * l,
                    d = a._lockDocW || o, u = a._left, h = a._top;
                if (!n || (a._lock && r && t("#ldg_lockmask", s).css({
                        width: o + "px",
                        height: l + 17 + "px"
                    }), newWidth = a._lockDocW = o, i = a._winSize = o * l, c !== i)) {
                    if (a._maxState) {
                        var f = a._maxSize();
                        a.size(f.w, f.h)
                    }
                    n && 17 === Math.abs(d - newWidth) || (u || h) && a.position(u, h)
                }
            }, _addEvent: function () {
                var t, e = this, i = e.config, n = e.DOM;
                e._winResize = function () {
                    t && clearTimeout(t), t = setTimeout(function () {
                        e._reset()
                    }, 140)
                }, y.bind("resize", e._winResize), n.wrap.bind("click", function (t) {
                    var i, a = t.target;
                    return !a.disabled && (a === n.close[0] ? (e._click("cancel"), !1) : a === n.max[0] || a === n.res[0] || a === n.max_b[0] || a === n.res_b[0] || a === n.res_t[0] ? (e.max(), !1) : a === n.min[0] || a === n.min_b[0] ? (e.min(), !1) : (t.stopPropagation(), i = a[h + "callback"], i && e._click(i), void 0))
                }).bind("mousedown", function (t) {
                    e.zindex();
                    var a = t.target;
                    if (i.drag !== !1 && a === n.title[0] || i.resize !== !1 && a === n.rb[0]) return T(t), !1
                }), i.max && n.title.bind("dblclick", function () {
                    return e.max(), !1
                })
            }, _removeEvent: function () {
                var t = this, e = t.DOM;
                e.wrap.unbind(), e.title.unbind(), y.unbind("resize", t._winResize)
            }
        }, _.fn._init.prototype = _.fn, _.focus = null, _.list = {}, a = function (t) {
            var e = (t.target, _.focus), i = t.keyCode;
            e && e.config.esc && e.config.cancel !== !1 && 27 === i && e._click(e.config.cancelVal)
        }, w.bind("keydown", a), g != e && t(e).bind("unload", function () {
            var e = _.list;
            for (var i in e) e[i] && e[i].close();
            n && n.DOM.wrap.remove(), w.unbind("keydown", a), t("#ldg_lockmask", s)[0] && t("#ldg_lockmask", s).remove(), t("#ldg_dragmask", s)[0] && t("#ldg_dragmask", s).remove()
        }), _.setting = {
            content: '<div class="ui_loading"><span>loading...</span></div>',
            title: "视窗 ",
            button: null,
            ok: null,
            cancel: null,
            init: null,
            close: null,
            okVal: "确定",
            cancelVal: "取消",
            skin: "",
            esc: !0,
            show: !0,
            width: "auto",
            height: "auto",
            icon: null,
            path: p,
            lock: !1,
            focus: !0,
            parent: null,
            padding: "10px",
            fixed: !1,
            left: "50%",
            top: "38.2%",
            max: !1,
            min: !1,
            zIndex: 1976,
            resize: !1,
            drag: !0,
            cache: !0,
            data: null,
            extendDrag: !1
        };
        var T, k = "setCapture" in v, E = "onlosecapture" in v;
        _.dragEvent = {
            onstart: l, start: function (t) {
                var e = _.dragEvent;
                return w.bind("mousemove", e.move).bind("mouseup", e.end), e._sClientX = t.clientX, e._sClientY = t.clientY, e.onstart(t.clientX, t.clientY), !1
            }, onmove: l, move: function (t) {
                var e = _.dragEvent;
                return e.onmove(t.clientX - e._sClientX, t.clientY - e._sClientY), !1
            }, onend: l, end: function (t) {
                var e = _.dragEvent;
                return w.unbind("mousemove", e.move).unbind("mouseup", e.end), e.onend(t.clientX, t.clientY), !1
            }
        }, T = function (e) {
            var i, n, a, o, l, c, d = _.focus, u = d.config, h = d.DOM, f = h.wrap[0], p = h.title, m = h.main[0],
                v = _.dragEvent, b = "getSelection" in g ? function () {
                    g.getSelection().removeAllRanges()
                } : function () {
                    try {
                        s.selection.empty()
                    } catch (t) {
                    }
                };
            v.onstart = function (t, e) {
                c ? (n = m.offsetWidth, a = m.offsetHeight) : (o = f.offsetLeft, l = f.offsetTop), w.bind("dblclick", v.end), !r && E ? p.bind("losecapture", v.end) : y.bind("blur", v.end), k && p[0].setCapture(), h.border.addClass("ui_state_drag"), d.focus()
            }, v.onmove = function (e, s) {
                if (c) {
                    var r = f.style, h = m.style, p = e + n, g = s + a;
                    r.width = "auto", u.width = h.width = Math.max(0, p) + "px", r.width = f.offsetWidth + "px", u.height = h.height = Math.max(0, g) + "px", d._load && t(d._load).css({
                        width: h.width, height: h.height
                    })
                } else {
                    var h = f.style, v = e + o, w = s + l;
                    u.left = Math.max(i.minX, Math.min(i.maxX, v)), u.top = Math.max(i.minY, Math.min(i.maxY, w)), h.left = u.left + "px", h.top = u.top + "px"
                }
                b()
            }, v.onend = function (t, e) {
                w.unbind("dblclick", v.end), !r && E ? p.unbind("losecapture", v.end) : y.unbind("blur", v.end), k && p[0].releaseCapture(), r && d._autoPositionType(), h.border.removeClass("ui_state_drag")
            }, c = e.target === h.rb[0], i = function (t) {
                var e = f.offsetWidth, i = p[0].offsetHeight || 20, n = y.width(), a = y.height(),
                    o = t ? 0 : y.scrollLeft(), s = t ? 0 : y.scrollTop();
                return maxX = n - e + o, maxY = a - i + s, {minX: o, minY: s, maxX: maxX, maxY: maxY}
            }("fixed" === f.style.position), v.start(e)
        }, t(function () {
            setTimeout(function () {
                c || S({left: "-9999em", time: 9, fixed: !1, lock: !1, focus: !1})
            }, 150), _.setting.extendDrag && function (t) {
                var e = s.createElement("div"), i = e.style, n = r ? "absolute" : "fixed";
                e.id = "ldg_dragmask", i.cssText = "display:none;position:" + n + ";left:0;top:0;width:100%;height:100%;cursor:move;filter:alpha(opacity=0);opacity:0;background:#FFF;pointer-events:none;", s.body.appendChild(e), t._start = t.start, t._end = t.end, t.start = function () {
                    var e = _.focus, a = e.DOM.main[0], o = e.iframe;
                    t._start.apply(this, arguments), i.display = "block", i.zIndex = _.setting.zIndex + 3, "absolute" === n && (i.width = y.width() + "px", i.height = y.height() + "px", i.left = w.scrollLeft() + "px", i.top = w.scrollTop() + "px"), o && a.offsetWidth * a.offsetHeight > 307200 && (a.style.visibility = "hidden")
                }, t.end = function () {
                    var e = _.focus;
                    t._end.apply(this, arguments), i.display = "none", e && (e.DOM.main[0].style.visibility = "visible")
                }
            }(_.dragEvent)
        }), t.fn.dialog = function () {
            var t = arguments;
            return this.bind("click", function () {
                return _.apply(this, t), !1
            }), this
        }, e.lhgdialog = t.dialog = S
    }, o = function (t, e, i) {
        var n = function () {
            return e.setting = e.setting || {}, e.setting.zIndex || ""
        };
        e.alert = function (t, i, a) {
            return e({
                title: "警告",
                id: "Alert",
                zIndex: n(),
                icon: "alert.gif",
                fixed: !0,
                lock: !0,
                content: t,
                ok: !0,
                resize: !1,
                close: i,
                parent: a || null
            })
        }, e.confirm = function (t, i, a, o) {
            return e({
                title: "系统提示",
                id: "confirm.gif",
                width: 210,
                zIndex: n(),
                icon: "confirm.gif",
                fixed: !0,
                lock: !0,
                content: t,
                resize: !1,
                parent: o || null,
                ok: function (t) {
                    return i.call(this, t)
                },
                cancel: function (t) {
                    return a && a.call(this, t)
                }
            })
        }, e.prompt = function (t, i, a, o) {
            a = a || "";
            var s;
            return e({
                title: "提问",
                id: "Prompt",
                zIndex: n(),
                icon: "prompt.gif",
                fixed: !0,
                lock: !0,
                parent: o || null,
                content: ['<div style="margin-bottom:5px;font-size:12px">', t, "</div>", "<div>", '<input value="', a, '" style="width:18em;padding:6px 4px" />', "</div>"].join(""),
                init: function () {
                    s = this.DOM.content[0].getElementsByTagName("input")[0], s.select(), s.focus()
                },
                ok: function (t) {
                    return i && i.call(this, s.value, t)
                },
                cancel: !0
            })
        }, e.tips = function (t, i, a, o, s) {
            return e({
                id: "Tips",
                zIndex: n(),
                title: !1,
                icon: a,
                content: t,
                cancel: !1,
                fixed: !0,
                lock: !!o,
                resize: !1
            }).time(i || 1.5, function () {
                s && (this.config.close = s)
            })
        }, e.loading = function (i, a, o, s, r) {
            return e({
                id: "loading",
                zIndex: n(),
                title: !1,
                content: '<div class="ui-loading"><img src="/css/base/dialog/icons/loading01.gif" class="ui_icon_bg"><div>',
                cancel: !1,
                padding: "0",
                fixed: !0,
                lock: !!s,
                resize: !1,
                init: function () {
                    t(this);
                    this.DOM.inner.find("table").removeClass("ui_dialog"), this.DOM.dialog.closest("tr").find("td").removeClass("ui_l"), this.DOM.dialog.closest("tr").find("td").removeClass("ui_r")
                }
            }).time(a || 1.5, function () {
                r && (this.config.close = r)
            })
        }, e.progress = function (i, n, a, o, s) {
            return e({
                id: "progress",
                zIndex: 2,
                title: !1,
                content: i || '<div class="ui-loading"><img src="/css/base/dialog/icons/loading01.gif" class="ui_icon_bg"><div>',
                cancel: !1,
                padding: "0",
                fixed: !0,
                lock: !!o,
                resize: !1,
                init: function () {
                    t(this);
                    this.DOM.inner.find("table").removeClass("ui_dialog"), this.DOM.dialog.closest("tr").find("td").removeClass("ui_l"), this.DOM.dialog.closest("tr").find("td").removeClass("ui_r")
                }
            }).time(n || 1.5, function () {
                s && (this.config.close = s)
            })
        }
    }, s = function () {
        return a(n, window), o(n, window.lhgdialog), window
    };
    t.exports = s()
}, function (module, exports, __webpack_require__) {
    function _interopRequireDefault(t) {
        return t && t.__esModule ? t : {default: t}
    }

    var __WEBPACK_AMD_DEFINE_RESULT__, _stringify = __webpack_require__(34),
        _stringify2 = _interopRequireDefault(_stringify), _typeof2 = __webpack_require__(35),
        _typeof3 = _interopRequireDefault(_typeof2);
    __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, moudles) {
        var $ = __webpack_require__(1);
        if (Function.prototype.ligerExtend = function (t, e) {
                if ("function" != typeof t) return this;
                this.base = t.prototype, this.base.constructor = t;
                var i = function () {
                };
                i.prototype = t.prototype, this.prototype = new i, this.prototype.constructor = this, e && $.extend(this.prototype, e)
            }, Function.prototype.ligerDefer = function (t, e, i) {
                var n = this;
                return setTimeout(function () {
                    n.apply(t, i || [])
                }, e)
            }, window.liger = $.ligerui = {
                version: "V1.3.2",
                managerCount: 0,
                managers: {},
                managerIdPrev: "ligerui",
                autoNewId: !0,
                error: {managerIsExist: "管理器id已经存在"},
                pluginPrev: "liger",
                attrPrev: "data",
                getId: function (t) {
                    t = t || this.managerIdPrev;
                    var e = t + (1e3 + this.managerCount);
                    return this.managerCount++, e
                },
                add: function (t) {
                    if (2 == arguments.length) {
                        var e = arguments[1];
                        return e.id = e.id || e.options.id || arguments[0].id, void this.addManager(e)
                    }
                    t.id || (t.id = this.getId(t.__idPrev())), this.managers[t.id] = t
                },
                remove: function (t) {
                    if ("string" == typeof t || "number" == typeof t) delete liger.managers[t]; else if ("object" == ("undefined" == typeof t ? "undefined" : (0, _typeof3.default)(t))) if (t instanceof liger.core.Component) delete liger.managers[t.id]; else {
                        if (!$(t).attr(this.idAttrName)) return !1;
                        delete liger.managers[$(t).attr(this.idAttrName)]
                    }
                },
                get: function (t, e) {
                    if (e = e || "ligeruiid", "string" == typeof t || "number" == typeof t) return liger.managers[t];
                    if ("object" == ("undefined" == typeof t ? "undefined" : (0, _typeof3.default)(t))) {
                        var i = t.length ? t[0] : t, n = i[e] || $(i).attr(e);
                        return n ? liger.managers[n] : null
                    }
                    return null
                },
                find: function (t) {
                    var e = [];
                    for (var i in this.managers) {
                        var n = this.managers[i];
                        t instanceof Function ? n instanceof t && e.push(n) : t instanceof Array ? $.inArray(n.__getType(), t) != -1 && e.push(n) : n.__getType() == t && e.push(n)
                    }
                    return e
                },
                run: function (t, e, i) {
                    if (t) {
                        if (i = $.extend({
                                defaultsNamespace: "ligerDefaults",
                                methodsNamespace: "ligerMethods",
                                controlNamespace: "controls",
                                idAttrName: "ligeruiid",
                                isStatic: !1,
                                hasElement: !0,
                                propertyToElemnt: null
                            }, i || {}), t = t.replace(/^ligerGet/, ""), t = t.replace(/^liger/, ""), null == this || this == window || i.isStatic) return liger.plugins[t] || (liger.plugins[t] = {
                            fn: $[liger.pluginPrev + t],
                            isStatic: !0
                        }), new $.ligerui[i.controlNamespace][t]($.extend({}, $[i.defaultsNamespace][t] || {}, $[i.defaultsNamespace][t + "String"] || {}, e.length > 0 ? e[0] : {}));
                        if (liger.plugins[t] || (liger.plugins[t] = {
                                fn: $.fn[liger.pluginPrev + t],
                                isStatic: !1
                            }), /Manager$/.test(t)) return liger.get(this, i.idAttrName);
                        if (this.each(function () {
                                if (this[i.idAttrName] || $(this).attr(i.idAttrName)) {
                                    var n = liger.get(this[i.idAttrName] || $(this).attr(i.idAttrName));
                                    return void(n && e.length > 0 && n.set(e[0]))
                                }
                                if (!(e.length >= 1 && "string" == typeof e[0])) {
                                    var a = e.length > 0 ? e[0] : null,
                                        o = $.extend({}, $[i.defaultsNamespace][t], $[i.defaultsNamespace][t + "String"], a);
                                    i.propertyToElemnt && (o[i.propertyToElemnt] = this), i.hasElement ? new $.ligerui[i.controlNamespace][t](this, o) : new $.ligerui[i.controlNamespace][t](o)
                                }
                            }), 0 == this.length) return null;
                        if (0 == e.length) return liger.get(this, i.idAttrName);
                        if ("object" == (0, _typeof3.default)(e[0])) return liger.get(this, i.idAttrName);
                        if ("string" == typeof e[0]) {
                            var n = liger.get(this, i.idAttrName);
                            if (null == n) return;
                            if ("option" != e[0]) {
                                var a = e[0];
                                if (!n[a]) return;
                                var o = Array.apply(null, e);
                                return o.shift(), n[a].apply(n, o)
                            }
                            if (2 == e.length) return n.get(e[1]);
                            if (e.length >= 3) return n.set(e[1], e[2])
                        }
                        return null
                    }
                },
                defaults: {},
                methods: {},
                core: {},
                controls: {},
                plugins: {}
            }, $.ligerDefaults = {}, $.ligerMethos = {}, liger.defaults = $.ligerDefaults, liger.methods = $.ligerMethos, $.fn.liger = function (t) {
                return t ? liger.run.call(this, t, arguments) : liger.get(this)
            }, liger.core.Component = function (t) {
                this.events = this.events || {}, this.options = t || {}, this.children = {}
            }, $.extend(liger.core.Component.prototype, {
                __getType: function () {
                    return "liger.core.Component"
                }, __idPrev: function () {
                    return "ligerui"
                }, set: function (t, e, i) {
                    if (t) if ("object" != ("undefined" == typeof t ? "undefined" : (0, _typeof3.default)(t))) {
                        var n = t;
                        if (0 == n.indexOf("on")) return void("function" == typeof e && this.bind(n.substr(2), e));
                        if (this.options || (this.options = {}), 0 != this.trigger("propertychange", [t, e])) {
                            this.options[n] = e;
                            var a = "_set" + n.substr(0, 1).toUpperCase() + n.substr(1);
                            this[a] && this[a].call(this, e, i), this.trigger("propertychanged", [t, e])
                        }
                    } else {
                        var o;
                        if (this.options != t ? ($.extend(this.options, t), o = t) : o = $.extend({}, t), void 0 == e || 1 == e) for (var s in o) 0 == s.indexOf("on") && this.set(s, o[s]);
                        if (void 0 == e || 0 == e) for (var s in o) 0 != s.indexOf("on") && this.set(s, o[s], i)
                    }
                }, get: function (t) {
                    var e = "_get" + t.substr(0, 1).toUpperCase() + t.substr(1);
                    return this[e] ? this[e].call(this, t) : this.options[t]
                }, hasBind: function (t) {
                    var e = t.toLowerCase(), i = this.events[e];
                    return !(!i || !i.length)
                }, trigger: function (t, e) {
                    if (t) {
                        var i = t.toLowerCase(), n = this.events[i];
                        if (n) {
                            e = e || [], e instanceof Array == 0 && (e = [e]);
                            for (var a = 0; a < n.length; a++) {
                                var o = n[a];
                                if (0 == o.handler.apply(o.context, e)) return !1
                            }
                        }
                    }
                }, bind: function (t, e, i) {
                    if ("object" != ("undefined" == typeof t ? "undefined" : (0, _typeof3.default)(t))) {
                        if ("function" != typeof e) return !1;
                        var n = t.toLowerCase(), a = this.events[n] || [];
                        i = i || this, a.push({handler: e, context: i}), this.events[n] = a
                    } else for (var o in t) this.bind(o, t[o])
                }, unbind: function (t, e) {
                    if (!t) return void(this.events = {});
                    var i = t.toLowerCase(), n = this.events[i];
                    if (n && n.length) if (e) {
                        for (var a = 0, o = n.length; a < o; a++) if (n[a].handler == e) {
                            n.splice(a, 1);
                            break
                        }
                    } else delete this.events[i]
                }, destroy: function () {
                    liger.remove(this)
                }
            }), liger.core.UIComponent = function (t, e) {
                liger.core.UIComponent.base.constructor.call(this, e);
                var i = this._extendMethods();
                i && $.extend(this, i), this.element = t, this._init(), this._preRender(), this.trigger("render"), this._render(), this.trigger("rendered"), this._rendered()
            }, liger.core.UIComponent.ligerExtend(liger.core.Component, {
                __getType: function () {
                    return "liger.core.UIComponent"
                }, _extendMethods: function () {
                }, _init: function _init() {
                    function loadDataOp(t, e) {
                        var i = {};
                        if (!t || t.indexOf(".") != -1) return i;
                        var n = liger.defaults[t];
                        if (!n) return i;
                        for (var a in n) if (e.attr(liger.attrPrev + "-" + a)) {
                            var o = e.attr(liger.attrPrev + "-" + a);
                            "boolean" == typeof n[a] ? i[a] = "true" == o || "1" == o : i[a] = o
                        }
                        return i
                    }

                    if (this.type = this.__getType(), this.element ? this.id = this.options.id || this.element.id || liger.getId(this.__idPrev()) : this.id = this.options.id || liger.getId(this.__idPrev()), liger.add(this), this.element) {
                        var attributes = this.attr();
                        if (attributes && attributes instanceof Array) for (var i = 0; i < attributes.length; i++) {
                            var name = attributes[i];
                            $(this.element).attr(name) && (this.options[name] = $(this.element).attr(name))
                        }
                        var p = this.options;
                        if ($(this.element).attr("ligerui")) try {
                            var attroptions = $(this.element).attr("ligerui");
                            0 != attroptions.indexOf("{") && (attroptions = "{" + attroptions + "}"), eval("attroptions = " + attroptions + ";"), attroptions && $.extend(p, attroptions)
                        } catch (t) {
                        }
                        $.extend(p, loadDataOp(this.__getType(), $(this.element)))
                    }
                }, _preRender: function () {
                }, _render: function () {
                }, _rendered: function () {
                    this.element && $(this.element).attr("ligeruiid", this.id)
                }, _setCls: function (t) {
                    this.element && t && $(this.element).addClass(t)
                }, attr: function () {
                    return []
                }, destroy: function () {
                    this.element && $(this.element).remove(), this.options = null, liger.remove(this)
                }
            }), liger.controls.Input = function (t, e) {
                liger.controls.Input.base.constructor.call(this, t, e)
            }, liger.controls.Input.ligerExtend(liger.core.UIComponent, {
                __getType: function () {
                    return "liger.controls.Input"
                }, attr: function () {
                    return ["nullText"]
                }, setValue: function (t) {
                    return this.set("value", t)
                }, getValue: function () {
                    return this.get("value")
                }, _setReadonly: function (t) {
                    var e = this.wrapper || this.text;
                    if (e && e.hasClass("l-text")) {
                        var i = this.inputText;
                        t ? (i && i.attr("readonly", "readonly"), e.addClass("l-text-readonly")) : (i && i.removeAttr("readonly"), e.removeClass("l-text-readonly"))
                    }
                }, setReadonly: function (t) {
                    return this.set("readonly", t)
                }, setEnabled: function () {
                    return this.set("disabled", !1)
                }, setDisabled: function () {
                    return this.set("disabled", !0)
                }, updateStyle: function () {
                }, resize: function (t, e) {
                    this.set({width: t, height: e + 2})
                }
            }), liger.win = {
                top: !1, mask: function (t) {
                    function e() {
                        if (liger.win.windowMask) {
                            var t = $(window).height() + $(window).scrollTop();
                            liger.win.windowMask.height(t)
                        }
                    }

                    this.windowMask || (this.windowMask = $("<div class='l-window-mask' style='display: block;'></div>").appendTo("body"), $(window).bind("resize.ligeruiwin", e), $(window).bind("scroll", e)), this.windowMask.show(), e(), this.masking = !0
                }, unmask: function (t) {
                    for (var e = $("body > .l-dialog:visible,body > .l-window:visible"), i = 0, n = e.length; i < n; i++) {
                        var a = e.eq(i).attr("ligeruiid");
                        if (!t || t.id != a) {
                            var o = liger.get(a);
                            if (o) {
                                var s = o.get("modal");
                                if (s) return
                            }
                        }
                    }
                    this.windowMask && this.windowMask.hide(), this.masking = !1
                }, createTaskbar: function () {
                    return this.taskbar || (this.taskbar = $('<div class="l-taskbar"><div class="l-taskbar-tasks"></div><div class="l-clear"></div></div>').appendTo("body"), this.top && this.taskbar.addClass("l-taskbar-top"), this.taskbar.tasks = $(".l-taskbar-tasks:first", this.taskbar), this.tasks = {}), this.taskbar.show(), this.taskbar.animate({bottom: 0}), this.taskbar
                }, removeTaskbar: function () {
                    var t = this;
                    t.taskbar.animate({bottom: -32}, function () {
                        t.taskbar.remove(), t.taskbar = null
                    })
                }, activeTask: function (t) {
                    for (var e in this.tasks) {
                        var i = this.tasks[e];
                        e == t.id ? i.addClass("l-taskbar-task-active") : i.removeClass("l-taskbar-task-active")
                    }
                }, getTask: function (t) {
                    var e = this;
                    if (e.taskbar) return e.tasks[t.id] ? e.tasks[t.id] : null
                }, addTask: function (t) {
                    var e = this;
                    if (e.taskbar || e.createTaskbar(), e.tasks[t.id]) return e.tasks[t.id];
                    var i = t.get("title"),
                        n = e.tasks[t.id] = $('<div class="l-taskbar-task"><div class="l-taskbar-task-icon"></div><div class="l-taskbar-task-content">' + i + "</div></div>");
                    return e.taskbar.tasks.append(n), e.activeTask(t), n.bind("click", function () {
                        e.activeTask(t), t.actived ? t.min() : t.active()
                    }).hover(function () {
                        $(this).addClass("l-taskbar-task-over")
                    }, function () {
                        $(this).removeClass("l-taskbar-task-over")
                    }), n
                }, hasTask: function () {
                    for (var t in this.tasks) if (this.tasks[t]) return !0;
                    return !1
                }, removeTask: function (t) {
                    var e = this;
                    e.taskbar && (e.tasks[t.id] && (e.tasks[t.id].unbind(), e.tasks[t.id].remove(), delete e.tasks[t.id]), e.hasTask() || e.removeTaskbar())
                }, setFront: function (t) {
                    var e = liger.find(liger.core.Win);
                    for (var i in e) {
                        var n = e[i];
                        n == t ? ($(n.element).css("z-index", "9200"), this.activeTask(n)) : $(n.element).css("z-index", "9100")
                    }
                }
            }, liger.core.Win = function (t, e) {
                liger.core.Win.base.constructor.call(this, t, e)
            }, liger.core.Win.ligerExtend(liger.core.UIComponent, {
                __getType: function () {
                    return "liger.controls.Win"
                }, mask: function () {
                    this.options.modal && liger.win.mask(this)
                }, unmask: function () {
                    this.options.modal && liger.win.unmask(this)
                }, min: function () {
                }, max: function () {
                }, active: function () {
                }
            }), liger.draggable = {dragging: !1}, liger.resizable = {reszing: !1}, liger.toJSON = "object" === ("undefined" == typeof JSON ? "undefined" : (0, _typeof3.default)(JSON)) && _stringify2.default ? _stringify2.default : function (t) {
                var e = function (t) {
                        return t < 10 ? "0" + t : t
                    },
                    i = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                    n = function (t) {
                        return i.lastIndex = 0, i.test(t) ? '"' + t.replace(i, function (t) {
                            var e = meta[t];
                            return "string" == typeof e ? e : "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4)
                        }) + '"' : '"' + t + '"'
                    };
                if (null === t) return "null";
                var a = "undefined" == typeof t ? "undefined" : (0, _typeof3.default)(t);
                if ("undefined" !== a) {
                    if ("string" === a) return n(t);
                    if ("number" === a || "boolean" === a) return "" + t;
                    if ("object" === a) {
                        if ("function" == typeof t.toJSON) return liger.toJSON(t.toJSON());
                        if (t.constructor === Date) return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + e(this.getUTCMonth() + 1) + "-" + e(this.getUTCDate()) + "T" + e(this.getUTCHours()) + ":" + e(this.getUTCMinutes()) + ":" + e(this.getUTCSeconds()) + "Z" : null;
                        var o = [];
                        if (t.constructor === Array) {
                            for (var s = 0, r = t.length; s < r; s++) o.push(liger.toJSON(t[s]) || "null");
                            return "[" + o.join(",") + "]"
                        }
                        var l, c;
                        for (var d in t) {
                            if (a = "undefined" == typeof d ? "undefined" : (0, _typeof3.default)(d), "number" === a) l = '"' + d + '"'; else {
                                if ("string" !== a) continue;
                                l = n(d)
                            }
                            a = (0, _typeof3.default)(t[d]), "function" !== a && "undefined" !== a && (c = liger.toJSON(t[d]), o.push(l + ":" + c))
                        }
                        return "{" + o.join(",") + "}"
                    }
                }
            }, liger.getEditor = function (t) {
                var e = t.type, i = t.control, n = t.master;
                if (!e) return null;
                var a = 0;
                i && (i = i.substr(0, 1).toUpperCase() + i.substr(1));
                var o = {
                    create: function (o, s, r) {
                        var l = s.field || s.column, c = r || {}, d = !!s.column, u = $.extend({}, t.options),
                            h = "text";
                        $.inArray(e, ["password", "file", "checkbox", "radio"]) != -1 && (h = e), t.password && (h = "password");
                        var f = $("<input type='" + h + "'/>");
                        if (t.body && (f = t.body.clone()), f.appendTo(o), s.field) {
                            var p = l.name, m = $.isFunction(c.prefixID) ? c.prefixID(n) : c.prefixID || "";
                            if (u.id = l.id || m + l.name, $.inArray(e, ["select", "combobox", "autocomplete", "popup"]) != -1 && (p = l.textField || l.comboboxName, l.comboboxName && !l.id && (u.id = (c.prefixID || "") + l.comboboxName)), $.inArray(e, ["select", "combobox", "autocomplete", "popup", "radiolist", "checkboxlist", "listbox"]) != -1 && (u.valueFieldID = m + l.name), !t.body) {
                                var g = m + p, v = (new Date).getTime() + "_" + ++a + "_" + l.name;
                                f.attr($.extend({
                                    id: v,
                                    name: g
                                }, l.attr)), l.cssClass && f.addClass(l.cssClass), l.validate && !n.options.unSetValidateAttr && f.attr("validate", liger.toJSON(l.validate))
                            }
                            $.extend(u, l.options)
                        }
                        if (l.dictionary && (l.editor = l.editor || {}, !l.editor.data)) {
                            var b = [], w = l.dictionary.split("|");
                            $(w).each(function (t, e) {
                                var i = e.split(","), n = i[0], a = i.length >= 2 ? i[1] : i[0];
                                b.push({id: n, value: n, text: a})
                            }), l.editor.data = b
                        }
                        if (l.editor) {
                            l.editor.options && ($.extend(u, l.editor.options), delete l.editor.options), l.editor.valueColumnName && (u.valueField = l.editor.valueColumnName, delete l.editor.valueColumnName), l.editor.displayColumnName && (u.textField = l.editor.displayColumnName, delete l.editor.displayColumnName);
                            var y = l.editor.p || l.editor.ext;
                            y && (y = "function" == typeof y ? y(s) : y, $.extend(u, y), delete l.editor.p, delete l.editor.ext), $.extend(u, l.editor)
                        }
                        d ? (u.host_grid = this, u.host_grid_row = s.record, u.host_grid_column = s.column) : (u.host_form = this, (l.readonly || u.host_form.get("readonly")) && (u.readonly = !0));
                        var x = f["liger" + i](u);
                        return d && setTimeout(function () {
                            f.focus()
                        }, 100), x
                    }, getValue: function (t, e) {
                        var i = e.field || e.column;
                        if (t.getValue) {
                            var n = t.getValue(), a = e.column ? e.column.editor.type : e.field.type;
                            if (i && i.editor && i.editor.isArrayValue && n && (n = n.split(";")), i && i.editor && i.editor.isRef && t.getText && (n = [n, t.getText()]), i && i.editor && i.editor.isRefMul && t.getText) {
                                var o = n.split(";"), s = t.getText().split(";");
                                n = [];
                                for (var r = 0; r < o.length; r++) n.push([o[r], s[r]])
                            }
                            return "int" == a || "digits" == a ? n = n ? parseInt(n, 10) : 0 : "float" != a && "number" != a || (n = n ? parseFloat(n) : 0), n
                        }
                    }, setValue: function (t, e, i) {
                        var n = i.field || i.column;
                        if (t.setValue) {
                            if (n && n.editor && n.editor.isArrayValue && e && (e = e.join(";")), n && n.editor && n.editor.isRef && $.isArray(e) && (e = e[0]), n && n.editor && n.editor.isRefMul && $.isArray(e)) {
                                for (var a = [], o = 0; o < e.length; o++) a.push(e[o].length > 1 ? e[o][1] : e[o][0]);
                                e = a.join(";")
                            }
                            t.setValue(e)
                        }
                    }, getText: function (t, e) {
                        e.field || e.column;
                        if (t.getText) {
                            var i = t.getText();
                            if (i) return i
                        }
                    }, setText: function (t, e, i) {
                        if (e && t.setText) t.setText(e); else {
                            var n = i.field || i.column;
                            if (e = t.setValue() || i.value || "", n && n.editor && n.editor.isRef && $.isArray(e) && e.length > 1 && (e = e[1]), n && n.editor && n.editor.isRefMul && $.isArray(e) && e.length > 1) {
                                for (var a = [], o = 0; o < e.length; o++) a.push(e[1]);
                                e = a.join(";")
                            }
                            t.setText && t.setText(e)
                        }
                    }, getSelected: function (t, e) {
                        if (t.getSelected) return t.getSelected()
                    }, resize: function (t, e, i, n) {
                        n.field && (e -= 2), t.resize && t.resize(e, i)
                    }, setEnabled: function (t, e) {
                        e ? t.setEnabled && t.setEnabled() : t.setDisabled && t.setDisabled()
                    }, destroy: function (t, e) {
                        t.destroy && t.destroy()
                    }
                };
                return $.extend({}, o, liger.editorCreatorDefaults || {}, t)
            }, liger.editors = {
                text: {control: "TextBox"},
                date: {
                    control: "DateEditor", setValue: function setValue(editor, value, editParm) {
                        "string" == typeof value && /^\/Date/.test(value) && (value = value.replace(/^\//, "new ").replace(/\/$/, ""), eval("value = " + value)), editor.setValue(value)
                    }
                },
                combobox: {control: "ComboBox"},
                spinner: {control: "Spinner"},
                checkbox: {control: "CheckBox"},
                checkboxlist: {
                    control: "CheckBoxList", body: $("<div></div>"), resize: function (t, e, i, n) {
                        t.set("width", e - 2)
                    }
                },
                radiolist: {
                    control: "RadioList", body: $("<div></div>"), resize: function (t, e, i, n) {
                        t.set("width", e - 2)
                    }
                },
                listbox: {
                    control: "ListBox", body: $("<div></div>"), resize: function (t, e, i, n) {
                        t.set("width", e - 2)
                    }
                },
                popup: {control: "PopupEdit"},
                number: {control: "TextBox", options: {number: !0}},
                currency: {control: "TextBox", options: {currency: !0}},
                digits: {control: "TextBox", options: {digits: !0}},
                password: {control: "TextBox", password: !0}
            }, liger.editors.string = liger.editors.text, liger.editors.select = liger.editors.combobox, liger.editors.int = liger.editors.digits, liger.editors.float = liger.editors.number, liger.editors.chk = liger.editors.checkbox, liger.editors.popupedit = liger.editors.popup, $.fn.live = $.fn.on ? $.fn.on : $.fn.live, !$.browser) {
            var userAgent = navigator.userAgent.toLowerCase();
            $.browser = {
                version: (userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [0, "0"])[1],
                safari: /webkit/.test(userAgent),
                opera: /opera/.test(userAgent),
                msie: /msie/.test(userAgent) && !/opera/.test(userAgent),
                mozilla: /mozilla/.test(userAgent) && !/(compatible|webkit)/.test(userAgent)
            }
        }
        module.exports = $
    }.call(exports, __webpack_require__, exports, module), !(void 0 !== __WEBPACK_AMD_DEFINE_RESULT__ && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
}, function (t, e, i) {
    var n;
    n = function (e, n, a) {
        var o = i(1);
        o.ligerMenu = function (t) {
            return o.ligerui.run.call(null, "ligerMenu", arguments)
        }, o.ligerDefaults.Menu = {
            width: 120,
            top: 0,
            left: 0,
            cls: null,
            items: null,
            shadow: !0
        }, o.ligerMethos.Menu = {}, o.ligerui.controls.Menu = function (t) {
            o.ligerui.controls.Menu.base.constructor.call(this, null, t)
        }, o.ligerui.controls.Menu.ligerExtend(o.ligerui.core.UIComponent, {
            __getType: function () {
                return "Menu"
            }, __idPrev: function () {
                return "Menu"
            }, _extendMethods: function () {
                return o.ligerMethos.Menu
            }, _render: function () {
                var t = this, e = this.options;
                t.menuItemCount = 0, t.menus = {}, t.menu = t.createMenu(), t.element = t.menu[0], t.menu.css({
                    top: e.top,
                    left: e.left,
                    width: e.width
                }), e.cls && t.menu.addClass(e.cls), e.items && o(e.items).each(function (e, i) {
                    t.addItem(i)
                }), o(document).bind("click.menu", function () {
                    for (var e in t.menus) {
                        var i = t.menus[e];
                        if (!i) return;
                        i.hide(), i.shadow && i.shadow.hide()
                    }
                }), t.set(e)
            }, show: function (t, e) {
                var i = this;
                this.options;
                void 0 == e && (e = i.menu), t && void 0 != t.left && e.css({left: t.left}), t && void 0 != t.top && e.css({top: t.top}), e.show(), i.updateShadow(e)
            }, updateShadow: function (t) {
                var e = this.options;
                e.shadow && (t.shadow.css({
                    left: t.css("left"),
                    top: t.css("top"),
                    width: t.outerWidth(),
                    height: t.outerHeight()
                }), t.is(":visible") ? t.shadow.show() : t.shadow.hide())
            }, hide: function (t) {
                var e = this;
                this.options;
                void 0 == t && (t = e.menu), e.hideAllSubMenu(t), t.hide(), e.updateShadow(t)
            }, toggle: function () {
                var t = this;
                this.options;
                t.menu.toggle(), t.updateShadow(t.menu)
            }, removeItem: function (t) {
                var e = this;
                this.options;
                o("> .l-menu-item[menuitemid=" + t + "]", e.menu.items).remove()
            }, setEnabled: function (t) {
                var e = this;
                this.options;
                o("> .l-menu-item[menuitemid=" + t + "]", e.menu.items).removeClass("l-menu-item-disable")
            }, setMenuText: function (t, e) {
                var i = this;
                this.options;
                o("> .l-menu-item[menuitemid=" + t + "] >.l-menu-item-text:first", i.menu.items).html(e)
            }, setDisabled: function (t) {
                var e = this;
                this.options;
                o("> .l-menu-item[menuitemid=" + t + "]", e.menu.items).addClass("l-menu-item-disable")
            }, isEnable: function (t) {
                var e = this;
                this.options;
                return !o("> .l-menu-item[menuitemid=" + t + "]", e.menu.items).hasClass("l-menu-item-disable")
            }, getItemCount: function () {
                var t = this;
                this.options;
                return o("> .l-menu-item", t.menu.items).length
            }, addItem: function (t, e) {
                var i = this, n = this.options;
                if (t) {
                    if (void 0 == e && (e = i.menu), t.line) return void e.items.append('<div class="l-menu-item-line"></div>');
                    var a = o('<div class="l-menu-item"><div class="l-menu-item-text"></div> </div>'),
                        s = o("> .l-menu-item", e.items).length;
                    if (e.items.append(a), a.attr("ligeruimenutemid", ++i.menuItemCount), t.id && a.attr("menuitemid", t.id), t.text && o(">.l-menu-item-text:first", a).html(t.text), t.icon && a.prepend('<div class="l-menu-item-icon l-icon-' + t.icon + '"></div>'), t.img && a.prepend('<div class="l-menu-item-icon"><img style="width:16px;height:16px;margin:2px;" src="' + t.img + '" /></div>'), (t.disable || t.disabled) && a.addClass("l-menu-item-disable"), t.children) {
                        a.append('<div class="l-menu-item-arrow"></div>');
                        var r = i.createMenu(a.attr("ligeruimenutemid"));
                        i.menus[a.attr("ligeruimenutemid")] = r, r.width(n.width), r.hover(null, function () {
                            r.showedSubMenu || i.hide(r)
                        }), o(t.children).each(function () {
                            i.addItem(this, r)
                        })
                    }
                    t.click && a.click(function () {
                        o(this).hasClass("l-menu-item-disable") || t.click(t, s)
                    }), t.dblclick && a.dblclick(function () {
                        o(this).hasClass("l-menu-item-disable") || t.dblclick(t, s)
                    });
                    var l = o("> .l-menu-over:first", e);
                    a.hover(function () {
                        if (!o(this).hasClass("l-menu-item-disable")) {
                            var n = o(this).offset().top, a = n - e.offset().top;
                            if (l.css({top: a}), i.hideAllSubMenu(e), t.children) {
                                var s = o(this).attr("ligeruimenutemid");
                                if (!s) return;
                                i.menus[s] && (i.show({
                                    top: n,
                                    left: o(this).offset().left + o(this).width() - 5
                                }, i.menus[s]), e.showedSubMenu = !0)
                            }
                        }
                    }, function () {
                        if (!o(this).hasClass("l-menu-item-disable")) {
                            var e = o(this).attr("ligeruimenutemid");
                            if (t.children) {
                                var e = o(this).attr("ligeruimenutemid");
                                if (!e) return
                            }
                        }
                    })
                }
            }, hideAllSubMenu: function (t) {
                var e = this;
                this.options;
                void 0 == t && (t = e.menu), o("> .l-menu-item", t.items).each(function () {
                    if (o("> .l-menu-item-arrow", this).length > 0) {
                        var t = o(this).attr("ligeruimenutemid");
                        if (!t) return;
                        e.menus[t] && e.hide(e.menus[t])
                    }
                }), t.showedSubMenu = !1
            }, createMenu: function (t) {
                var e = this, i = this.options,
                    n = o('<div class="l-menu" style="display:none"><div class="l-menu-yline"></div><div class="l-menu-over"><div class="l-menu-over-l"></div> <div class="l-menu-over-r"></div></div><div class="l-menu-inner"></div></div>');
                return t && n.attr("ligeruiparentmenuitemid", t), n.items = o("> .l-menu-inner:first", n), n.appendTo("body"), i.shadow && (n.shadow = o('<div class="l-menu-shadow"></div>').insertAfter(n), e.updateShadow(n)), n.hover(null, function () {
                    n.showedSubMenu || o("> .l-menu-over:first", n).css({top: -24})
                }), t ? e.menus[t] = n : e.menus[0] = n, n
            }
        }), o.ligerui.controls.Menu.prototype.setEnable = o.ligerui.controls.Menu.prototype.setEnabled, o.ligerui.controls.Menu.prototype.setDisable = o.ligerui.controls.Menu.prototype.setDisabled, t.exports = o
    }.call(e, i, e, t), !(void 0 !== n && (t.exports = n))
}, function (t, e, i) {
    var n;
    n = function (e, n, a) {
        var o = i(1);
        o.fn.ligerTab = function (t) {
            return o.ligerui.run.call(this, "ligerTab", arguments)
        }, o.fn.ligerGetTabManager = function () {
            return o.ligerui.run.call(this, "ligerGetTabManager", arguments)
        }, o.ligerDefaults.Tab = {
            height: null,
            heightDiff: 0,
            changeHeightOnResize: !1,
            contextmenu: !0,
            dblClickToClose: !1,
            dragToMove: !1,
            showSwitch: !1,
            showSwitchInTab: !1,
            data: null,
            onBeforeOverrideTabItem: null,
            onAfterOverrideTabItem: null,
            onBeforeRemoveTabItem: null,
            onAfterRemoveTabItem: null,
            onBeforeAddTabItem: null,
            onAfterAddTabItem: null,
            onBeforeSelectTabItem: null,
            onAfterSelectTabItem: null,
            onCloseOther: null,
            onCloseAll: null,
            onClose: null,
            onReload: null,
            onAfterLeaveTabItem: null,
            onSwitchRender: null
        }, o.ligerDefaults.TabString = {
            closeMessage: "关闭当前页",
            closeOtherMessage: "关闭其他",
            closeAllMessage: "关闭所有",
            reloadMessage: "刷新"
        }, o.ligerMethos.Tab = {}, o.ligerui.controls.Tab = function (t, e) {
            o.ligerui.controls.Tab.base.constructor.call(this, t, e)
        }, o.ligerui.controls.Tab.ligerExtend(o.ligerui.core.UIComponent, {
            __getType: function () {
                return "Tab"
            }, __idPrev: function () {
                return "Tab"
            }, _extendMethods: function () {
                return o.ligerMethos.Tab
            }, _render: function () {
                function t() {
                    var t = e.tab.width() - parseInt(e.tab.links.css("marginLeft"), 10) - parseInt(e.tab.links.css("marginRight"), 10);
                    e.tab.links.width(t)
                }

                var e = this, i = this.options;
                i.height && (e.makeFullHeight = !0), e.tab = o(this.element), e.tab.addClass("l-tab"), i.contextmenu && o.ligerMenu && (e.tab.menu = o.ligerMenu({
                    width: 100,
                    items: [{
                        text: i.closeMessage, id: "close", click: function () {
                            e._menuItemClick.apply(e, arguments)
                        }
                    }, {
                        text: i.closeOtherMessage, id: "closeother", click: function () {
                            e._menuItemClick.apply(e, arguments)
                        }
                    }, {
                        text: i.closeAllMessage, id: "closeall", click: function () {
                            e._menuItemClick.apply(e, arguments)
                        }
                    }, {
                        text: i.reloadMessage, id: "reload", click: function () {
                            e._menuItemClick.apply(e, arguments)
                        }
                    }]
                })), e.tab.content = o('<div class="l-tab-content"></div>'), o("> div", e.tab).appendTo(e.tab.content), e.tab.content.appendTo(e.tab), e.tab.links = o('<div class="l-tab-links"><ul style="left: 0px; "></ul><div class="l-tab-switch"></div></div>'), e.tab.links.prependTo(e.tab), e.tab.links.ul = o("ul", e.tab.links);
                var n = o("> div[lselected=true]", e.tab.content), a = n.length > 0;
                e.selectedTabId = n.attr("tabid"), o("> div", e.tab.content).each(function (t, i) {
                    var n = o('<li class=""><a></a><div class="l-tab-links-item-left"></div><div class="l-tab-links-item-right"></div></li>'),
                        s = o(this);
                    s.attr("title") && (o("> a", n).html(s.attr("title")), s.attr("title", ""));
                    var r = s.attr("tabid");
                    void 0 == r && (r = e.getNewTabid(), s.attr("tabid", r), s.attr("lselected") && (e.selectedTabId = r)), n.attr("tabid", r), a || 0 != t || (e.selectedTabId = r);
                    var l = s.attr("showClose");
                    if (l && n.append("<div class='l-tab-links-item-close'></div>"), o("> ul", e.tab.links).append(n), s.hasClass("l-tab-content-item") || s.addClass("l-tab-content-item"), s.find("iframe").length > 0) {
                        var c = o("iframe:first", s);
                        if ("complete" != c[0].readyState) {
                            0 == s.find(".l-tab-loading:first").length && s.prepend("<div class='l-tab-loading' style='display:block;'></div>");
                            var d = o(".l-tab-loading:first", s);
                            c.bind("load.tab", function () {
                                d.hide()
                            })
                        }
                    }
                }), e.selectTabItem(e.selectedTabId), i.height && ("string" == typeof i.height && i.height.indexOf("%") > 0 ? (e.onResize(), i.changeHeightOnResize && o(window).resize(function () {
                    e.onResize.call(e)
                })) : e.setHeight(i.height)), e.makeFullHeight && e.setContentHeight(), o("li", e.tab.links).each(function () {
                    e._addTabItemEvent(o(this))
                }), e.tab.bind("dblclick.tab", function (t) {
                    if (i.dblClickToClose) {
                        e.dblclicking = !0;
                        var n = t.target || t.srcElement, a = n.tagName.toLowerCase();
                        if ("a" == a) {
                            var s = o(n).parent().attr("tabid"),
                                r = !!o(n).parent().find("div.l-tab-links-item-close").length;
                            r && e.removeTabItem(s)
                        }
                        e.dblclicking = !1
                    }
                }), e.set(i), setTimeout(t, 100), o(window).resize(function () {
                    t.call(e)
                }), e.bind("sysWidthChange", function () {
                    t.call(e)
                })
            }, _setShowSwitch: function (t) {
                var e = this;
                this.options;
                t ? (o(".l-tab-switch", e.tab.links).length || o("<div class='l-tab-switch'></div>").appendTo(e.tab.links), o(e.tab).addClass("l-tab-switchable"), o(".l-tab-switch", e.tab).click(function () {
                    e.toggleSwitch(this)
                })) : (o(e.tab).removeClass("l-tab-switchable"), o("body > .l-tab-windowsswitch").remove())
            }, _setShowSwitchInTab: function (t) {
                var e = this, i = this.options;
                if (i.showSwitch && t) {
                    o(e.tab).removeClass("l-tab-switchable"), o(".l-tab-switch", e.tab).remove();
                    var n = o("<li class='l-tab-itemswitch'><a></a><div class='l-tab-links-item-left'></div><div class='l-tab-links-item-right'></div></li>");
                    n.appendTo(e.tab.links.ul), n.click(function () {
                        e.toggleSwitch(this)
                    })
                } else o(".l-tab-itemswitch", e.tab.ul).remove()
            }, toggleSwitch: function (t) {
                var e = this;
                this.options;
                if (o("body > .l-tab-windowsswitch").length) return void o("body > .l-tab-windowsswitch").remove();
                if (null != t) {
                    var i = o("<div class='l-tab-windowsswitch'></div>").appendTo("body"),
                        n = e.tab.links.ul.find(">li"), a = e.getSelectedTabItemID();
                    n.each(function (t, e) {
                        var n = o("<a href='javascript:void(0)'></a>");
                        n.text(o(e).find("a").text());
                        var s = o(e).attr("tabid");
                        null != s && (s == a && n.addClass("selected"), n.attr("tabid", s), i.append(n))
                    }), i.css({
                        top: o(t).offset().top + o(t).height(),
                        left: o(t).offset().left - i.width()
                    }), i.find("a").bind("click", function (t) {
                        var i = o(this).attr("tabid");
                        void 0 != i && (e.selectTabItem(i), e.moveToTabItem(i), o("body > .l-tab-windowsswitch").remove())
                    }), e.trigger("switchRender", [i])
                }
            }, _applyDrag: function (t) {
                var e = this;
                this.options;
                e.droptip = e.droptip || o("<div class='l-tab-drag-droptip' style='display:none'><div class='l-drop-move-up'></div><div class='l-drop-move-down'></div></div>").appendTo("body");
                var i = o(t).ligerDrag({
                    revert: !0, animate: !1, proxy: function () {
                        var t = o(this).find("a").html();
                        return e.dragproxy = o("<div class='l-tab-drag-proxy' style='display:none'><div class='l-drop-icon l-drop-no'></div></div>").appendTo("body"), e.dragproxy.append(t), e.dragproxy
                    }, onRendered: function () {
                        this.set("cursor", "pointer")
                    }, onStartDrag: function (e, i) {
                        if (!o(t).hasClass("l-selected")) return !1;
                        if (2 == i.button) return !1;
                        var n = i.srcElement || i.target;
                        return !o(n).hasClass("l-tab-links-item-close") && void 0;
                    }, onDrag: function (t, i) {
                        null == e.dropIn && (e.dropIn = -1);
                        var n = e.tab.links.ul.find(">li"), a = n.index(t.target);
                        n.each(function (t, n) {
                            if (a != t) {
                                var s = t > a;
                                if (e.dropIn == -1 || e.dropIn == t) {
                                    var r = o(this).offset(), l = {
                                        top: r.top,
                                        bottom: r.top + o(this).height(),
                                        left: r.left - 10,
                                        right: r.left + 10
                                    };
                                    s && (l.left += o(this).width(), l.right += o(this).width());
                                    var c = i.pageX || i.screenX, d = i.pageY || i.screenY;
                                    c > l.left && c < l.right && d > l.top && d < l.bottom ? (e.droptip.css({
                                        left: l.left + 5,
                                        top: l.top - 9
                                    }).show(), e.dropIn = t, e.dragproxy.find(".l-drop-icon").removeClass("l-drop-no").addClass("l-drop-yes")) : (e.dropIn = -1, e.droptip.hide(), e.dragproxy.find(".l-drop-icon").removeClass("l-drop-yes").addClass("l-drop-no"))
                                }
                            }
                        })
                    }, onStopDrag: function (t, i) {
                        if (e.dropIn > -1) {
                            var n = e.tab.links.ul.find(">li:eq(" + e.dropIn + ")").attr("tabid"),
                                a = o(t.target).attr("tabid");
                            setTimeout(function () {
                                e.moveTabItem(a, n)
                            }, 0), e.dropIn = -1, e.dragproxy.remove()
                        }
                        e.droptip.hide(), this.set("cursor", "default")
                    }
                });
                return i
            }, _setDragToMove: function (t) {
                if (o.fn.ligerDrag) {
                    var e = this;
                    this.options;
                    if (t) {
                        if (e.drags) return;
                        e.drags = e.drags || [], e.tab.links.ul.find(">li").each(function () {
                            e.drags.push(e._applyDrag(this))
                        })
                    }
                }
            }, setTabManageEven: function () {
                var t = this;
                this.options;
                o("#tabManage").click(function (e) {
                    e.stopPropagation();
                    o(this).offset();
                    if (0 === o(".l-tab-menu").length) {
                        var i = '<div class="l-tab-menu" style="background"><p id="tabCloseAll" class="l-menu-item" data-opt="closeall"><b></b>关闭全部</p><p id="tabCloseCur" class="l-menu-item" data-opt="closecur"><b></b>关闭当前页</p><p id="tabRefCur" class="l-menu-item" data-opt="reloadcur"><b></b>刷新当前页</p>';
                        o(".page-tab").append(i), o(".l-tab-menu").css({
                            top: "36px",
                            left: o("#tabManage").offset().left - 100 + "px",
                            position: "absolute"
                        }), o(".l-tab-menu p").each(function (e, i) {
                            o(this).click(function () {
                                t._menuItemClick({id: o(this).data("opt")}), o(".l-tab-menu").hide()
                            })
                        })
                    } else o(".l-tab-menu").css({
                        top: "36px",
                        left: o("#tabManage").offset().left - 100 + "px",
                        position: "absolute"
                    }).show()
                })
            }, moveTabItem: function (t, e) {
                var i = this, n = i.tab.links.ul.find(">li[tabid=" + t + "]"),
                    a = i.tab.links.ul.find(">li[tabid=" + e + "]"), o = i.tab.links.ul.find(">li").index(n),
                    s = i.tab.links.ul.find(">li").index(a);
                o < s ? a.after(n) : a.before(n)
            }, setTabButton: function () {
                var t = this, e = (this.options, 0);
                o("li", t.tab.links.ul).each(function () {
                    e += o(this).width() + 2
                });
                var i = t.tab.width();
                return e > i ? (t.tab.links.append('<div class="l-tab-links-left"><i><span class="icon-left"></span></i></div><div class="l-tab-links-right"><i><span class="icon-right"></span></i></div>'), t.setTabButtonEven(), !0) : (t.tab.links.ul.animate({left: 0}), o(".l-tab-links-left,.l-tab-links-right", t.tab.links).remove(), !1)
            }, setTabButtonEven: function () {
                var t = this;
                this.options;
                o(".l-tab-links-left", t.tab.links).hover(function () {
                    o(this).addClass("l-tab-links-left-over")
                }, function () {
                    o(this).removeClass("l-tab-links-left-over")
                }).click(function () {
                    t.moveToPrevTabItem()
                }), o(".l-tab-links-right", t.tab.links).hover(function () {
                    o(this).addClass("l-tab-links-right-over")
                }, function () {
                    o(this).removeClass("l-tab-links-right-over")
                }).click(function () {
                    t.moveToNextTabItem()
                })
            }, moveToPrevTabItem: function () {
                var t = this, e = (this.options, o(".l-tab-links-left", t.tab.links).width()), i = new Array;
                o("li", t.tab.links).each(function (t, n) {
                    var a = -1 * e;
                    t > 0 && (a = parseInt(i[t - 1]) + o(this).prev().width() + 2), i.push(a)
                });
                for (var n = -1 * parseInt(t.tab.links.ul.css("left")), a = 0; a < i.length - 1; a++) if (i[a] < n && i[a + 1] >= n) return void t.tab.links.ul.animate({left: -1 * parseInt(i[a])})
            }, moveToNextTabItem: function () {
                var t = this, e = (this.options, o(".l-tab-links-right", t.tab).width()), i = 0,
                    n = o("li", t.tab.links.ul);
                n.each(function () {
                    i += o(this).width() + 2
                });
                for (var a = t.tab.width(), s = new Array, r = n.length - 1; r >= 0; r--) {
                    var l = i - a + e + 2;
                    r != n.length - 1 && (l = parseInt(s[n.length - 2 - r]) - o(n[r + 1]).width() - 2), s.push(l)
                }
                for (var c = -1 * parseInt(t.tab.links.ul.css("left")), d = 1; d < s.length; d++) if (s[d] <= c && s[d - 1] > c) return void t.tab.links.ul.animate({left: -1 * parseInt(s[d - 1])})
            }, moveToTabItem: function (t) {
                var e = this;
                this.options;
                e.moveToPrevTabItem(t) || e.moveToNextTabItem(t)
            }, getTabItemCount: function () {
                var t = this;
                this.options;
                return o("li", t.tab.links.ul).length
            }, getSelectedTabItemID: function () {
                var t = this;
                this.options;
                return o("li.l-selected", t.tab.links.ul).attr("tabid")
            }, removeSelectedTabItem: function () {
                var t = this;
                this.options;
                t.removeTabItem(t.getSelectedTabItemID())
            }, overrideSelectedTabItem: function (t) {
                var e = this;
                this.options;
                e.overrideTabItem(e.getSelectedTabItemID(), t)
            }, overrideTabItem: function (t, e) {
                var i = this;
                this.options;
                if (0 == i.trigger("beforeOverrideTabItem", [t])) return !1;
                var n = e.tabid;
                void 0 == n && (n = i.getNewTabid());
                var a = e.url, s = e.content, r = (e.target, e.text), l = e.showClose, c = e.height,
                    d = o("li[tabid=" + t + "]", i.tab.links.ul),
                    u = o(".l-tab-content-item[tabid=" + t + "]", i.tab.content);
                d && u && (d.attr("tabid", n), u.attr("tabid", n), 0 == o("iframe", u).length && a ? u.html("<iframe frameborder='0'></iframe>") : s && u.html(s), o("iframe", u).attr("name", n), void 0 == l && (l = !0), 0 == l ? o(".l-tab-links-item-close", d).remove() : 0 == o(".l-tab-links-item-close", d).length && d.append("<div class='l-tab-links-item-close'></div>"), void 0 == r && (r = n), c && u.height(c), o("a", d).text(r), o("iframe", u).attr("src", a), i.trigger("afterOverrideTabItem", [t]))
            }, setHeader: function (t, e) {
                o("li[tabid=" + t + "] a", this.tab.links.ul).text(e)
            }, selectTabItem: function (t) {
                var e = this;
                this.options;
                return 0 != e.trigger("beforeSelectTabItem", [t]) && (e.trigger("afterLeaveTabItem", [e.selectedTabId]), e.selectedTabId = t, o("> .l-tab-content-item[tabid=" + t + "]", e.tab.content).show().siblings().hide(), o("li[tabid=" + t + "]", e.tab.links.ul).addClass("l-selected").siblings().removeClass("l-selected"), void e.trigger("afterSelectTabItem", [t]))
            }, moveToLastTabItem: function () {
                var t = this, e = (this.options, 0);
                o("li", t.tab.links.ul).each(function () {
                    e += o(this).width() + 2
                });
                var i = t.tab.width();
                if (e > i) {
                    var n = o(".l-tab-links-right", t.tab.links).width();
                    t.tab.links.ul.animate({left: -1 * (e - i + n + 2)})
                }
            }, getTabItemTitle: function (t) {
                var e = this;
                this.options;
                return o("li[tabid=" + t + "] a", e.tab.links.ul).text()
            }, setTabItemTitle: function (t, e) {
                var i = this;
                this.options;
                o("li[tabid=" + t + "] a", i.tab.links.ul).text(e)
            }, getTabItemSrc: function (t) {
                var e = this;
                this.options;
                return o(".l-tab-content-item[tabid=" + t + "] iframe", e.tab.content).attr("src")
            }, setTabItemSrc: function (t, e) {
                var i = this, n = (this.options, o(".l-tab-content-item[tabid=" + t + "]", i.tab.content)),
                    a = o(".l-tab-loading:first", n),
                    s = o(".l-tab-content-item[tabid=" + t + "] iframe", i.tab.content);
                a.show(), s.attr("src", e).unbind("load.tab").bind("load.tab", function () {
                    a.hide()
                })
            }, isTabItemExist: function (t) {
                var e = this;
                this.options;
                return o("li[tabid=" + t + "] a", e.tab.links.ul).length > 0
            }, addTabItem: function (t) {
                var e = this, i = this.options;
                if (0 == e.trigger("beforeAddTabItem", [t])) return !1;
                var n = t.tabid;
                void 0 == n && (n = e.getNewTabid());
                var a = t.url, s = t.content, r = t.text, l = t.showClose, c = t.height;
                if (e.isTabItemExist(n)) {
                    var d = o(".l-tab-content-item[tabid=" + n + "]").find("iframe").attr("src");
                    if (e.selectTabItem(n), d != a) return void e.overrideTabItem(n, t)
                } else {
                    var u = o("<li><a></a><div class='l-tab-links-item-left'></div><div class='l-tab-links-item-right'></div><div class='l-tab-links-item-close'></div></li>"),
                        h = o("<div class='l-tab-content-item'><div class='l-tab-loading' style='display:block;'></div><iframe frameborder='0'></iframe></div>"),
                        f = o("div:first", h), p = o("iframe:first", h);
                    if (e.makeFullHeight) {
                        var m = e.tab.height() - e.tab.links.height();
                        h.height(m)
                    }
                    u.attr("tabid", n), h.attr("tabid", n), a ? (p[0].tab = e, t.data && (p[0].openerData = t.data), p.attr("name", n).attr("id", n).attr("src", a).bind("load.tab", function () {
                        f.hide(), t.callback && t.callback()
                    })) : (p.remove(), f.remove()), s ? (h.html(s), t.callback && t.callback()) : t.target && (h.append(t.target), t.callback && t.callback()), void 0 == l && (l = !0), 0 == l && o(".l-tab-links-item-close", u).remove(), void 0 == r && (r = n), c && h.height(c), o("a", u).text(r), o(".l-tab-itemswitch", e.tab.links.ul).length ? u.insertBefore(o(".l-tab-itemswitch", e.tab.links.ul)) : e.tab.links.ul.append(u), e.tab.content.append(h), e.selectTabItem(n), e.setTabButton() && e.moveToTabItem(n), 0 === o("#tabManage").length ? (e.tab.links.ul.append(u), e.tab.links.ul.append('<li id="tabManage"></li>'), e.setTabManageEven()) : u.insertBefore("#tabManage"), e._addTabItemEvent(u), i.dragToMove && o.fn.ligerDrag && (e.drags = e.drags || [], u.each(function () {
                        e.drags.push(e._applyDrag(this))
                    })), e.toggleSwitch(), e.trigger("afterAddTabItem", [t])
                }
            }, _addTabItemEvent: function (t) {
                var e = this;
                this.options;
                t.click(function () {
                    var t = o(this).attr("tabid");
                    e.selectTabItem(t)
                }), e.tab.menu && e._addTabItemContextMenuEven(t), o(".l-tab-links-item-close", t).hover(function () {
                    o(this).addClass("l-tab-links-item-close-over")
                }, function () {
                    o(this).removeClass("l-tab-links-item-close-over")
                }).click(function () {
                    var t = o(this).parent().attr("tabid");
                    e.removeTabItem(t)
                })
            }, removeTabItem: function (t) {
                var e = this;
                this.options;
                if (0 == e.trigger("beforeRemoveTabItem", [t])) return !1;
                var i = o("li[tabid=" + t + "]", e.tab.links.ul).hasClass("l-selected");
                i && (o(".l-tab-content-item[tabid=" + t + "]", e.tab.content).prev().show(), o("li[tabid=" + t + "]", e.tab.links.ul).prev().addClass("l-selected").siblings().removeClass("l-selected"));
                var n = o(".l-tab-content-item[tabid=" + t + "]", e.tab.content), a = o("iframe", n);
                if (a.length) {
                    var s = a[0];
                    s.src = "about:blank";
                    try {
                        s.contentWindow.document.write("")
                    } catch (t) {
                    }
                    o.browser.msie && CollectGarbage(), a.remove()
                }
                n.remove(), o("li[tabid=" + t + "]", e.tab.links.ul).remove(), e.setTabButton(), e.trigger("afterRemoveTabItem", [t])
            }, hideTabItem: function (t) {
                var e = this, i = (this.options, o("li[tabid=" + t + "]", e.tab.links.ul).hasClass("l-selected"));
                i && (o(".l-tab-content-item[tabid=" + t + "]", e.tab.content).prev().show(), o("li[tabid=" + t + "]", e.tab.links.ul).prev().addClass("l-selected").siblings().removeClass("l-selected")), o("li[tabid=" + t + "]", e.tab.links.ul).hide(), o(".l-tab-content-item[tabid=" + t + "]", e.tab.content).hide()
            }, showTabItem: function (t) {
                var e = this;
                this.options;
                o("li[tabid=" + t + "]", e.tab.links.ul).show()
            }, addHeight: function (t) {
                var e = this, i = (this.options, e.tab.height() + t);
                e.setHeight(i)
            }, setHeight: function (t) {
                var e = this;
                this.options;
                e.tab.height(t), e.setContentHeight()
            }, setContentHeight: function () {
                var t = this, e = (this.options, t.tab.height() - t.tab.links.height());
                t.tab.content.height(e), o("> .l-tab-content-item", t.tab.content).height(e)
            }, getNewTabid: function () {
                var t = this;
                this.options;
                return t.getnewidcount = t.getnewidcount || 0, "tabitem" + ++t.getnewidcount
            }, getTabidList: function (t, e) {
                var i = this, n = (this.options, []);
                return o("> li", i.tab.links.ul).each(function () {
                    o(this).attr("tabid") && o(this).attr("tabid") != t && (!e || o(".l-tab-links-item-close", this).length > 0) && n.push(o(this).attr("tabid"))
                }), n
            }, removeOther: function (t, e) {
                var i = this, n = (this.options, i.getTabidList(t, !0));
                o(n).each(function () {
                    i.removeTabItem(this)
                })
            }, reload: function (t) {
                var e = (this.options, o(".l-tab-content-item[tabid=" + t + "]")), i = o(".l-tab-loading:first", e),
                    n = o("iframe:first", e), a = o(n).attr("src");
                i.show(), n.attr("src", a).unbind("load.tab").bind("load.tab", function () {
                    i.hide()
                })
            }, removeAll: function (t) {
                var e = this, i = (this.options, e.getTabidList(null, !0));
                o(i).each(function () {
                    e.removeTabItem(this)
                })
            }, onResize: function () {
                var t = this, e = this.options;
                if (!e.height || "string" != typeof e.height || e.height.indexOf("%") == -1) return !1;
                if ("body" == t.tab.parent()[0].tagName.toLowerCase()) {
                    var i = o(window).height();
                    i -= parseInt(t.tab.parent().css("paddingTop")), i -= parseInt(t.tab.parent().css("paddingBottom")), t.height = e.heightDiff + i * parseFloat(t.height) * .01
                } else t.height = e.heightDiff + t.tab.parent().height() * parseFloat(e.height) * .01;
                t.tab.height(t.height), t.setContentHeight()
            }, _menuItemClick: function (t) {
                var e = this;
                this.options;
                if (e.actionTabid = e.actionTabid || e.getSelectedTabItemID(), t.id && e.actionTabid) switch (t.id) {
                    case"close":
                        if (0 == e.trigger("close")) return;
                        e.removeTabItem(e.actionTabid), e.actionTabid = null;
                        break;
                    case"closecur":
                        if ("index" === e.getSelectedTabItemID()) break;
                        e.removeTabItem(e.getSelectedTabItemID());
                        break;
                    case"closeother":
                        if (0 == e.trigger("closeother")) return;
                        e.removeOther(e.actionTabid);
                        break;
                    case"reloadcur":
                        if ("index" === e.getSelectedTabItemID()) {
                            if (0 == e.trigger("reload", [{tabid: "index"}])) return;
                            return e.selectTabItem("index"), void e.reload("index")
                        }
                        e.reload(e.getSelectedTabItemID());
                        break;
                    case"closeall":
                        if (0 == e.trigger("closeall")) return;
                        e.removeAll(), e.actionTabid = null;
                        break;
                    case"reload":
                        if (0 == e.trigger("reload", [{tabid: e.actionTabid}])) return;
                        e.selectTabItem(e.actionTabid), e.reload(e.actionTabid)
                }
            }, _addTabItemContextMenuEven: function (t) {
                var e = this;
                this.options;
                t.bind("contextmenu", function (i) {
                    if (e.tab.menu) return e.actionTabid = t.attr("tabid"), e.tab.menu.show({
                        top: i.pageY,
                        left: i.pageX
                    }), 0 == o(".l-tab-links-item-close", this).length ? e.tab.menu.setDisabled("close") : e.tab.menu.setEnabled("close"), !1
                })
            }
        }), t.exports = o
    }.call(e, i, e, t), !(void 0 !== n && (t.exports = n))
}, function (t, e, i) {
    "use strict";
    var n = {}, a = i(148);
    a.keys().forEach(function (t) {
        var e = t.replace("./", "").replace(".tpl", "");
        n[e] = a(t)
    }), t.exports = n
}, function (t, e, i) {
    e = t.exports = i(105)(), e.push([t.id, "body{_margin:0}.ui_lock_scroll,.ui_lock_scroll body{overflow:hidden}.ui_buttons input,.ui_content,.ui_title{font:12px/1.333 tahoma,arial,\\5b8b\\4f53,sans-serif}table.ui_border,table.ui_dialog{width:auto;border-spacing:0;*border-collapse:collapse}.ui_border td,.ui_dialog td{padding:0}.ui_dialog{background:#fff}.ui_title{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:block;cursor:move;background:#ddd;-moz-user-select:none;-webkit-user-select:none;padding:0 100px 0 0}.ui_title_buttons{position:absolute;cursor:pointer;font-size:0;letter-spacing:-.5em}.chk_blue{position:relative;font-size:12px;background-position-y:center}.chk_blue input{display:inline-block;position:absolute;width:16px;height:16px;cursor:pointer;left:0;top:1px;opacity:0}.chk_blue label{margin-left:10px}.ui_main{min-width:6em;min-width:0\\9;text-align:center}.ui_content{display:inline-block;*display:inline;zoom:1;text-align:left;font-size:14px;line-height:2.3}.ui_content.ui_state_full{display:block;width:100%;height:100%;margin:0;padding:0!important}.ui_content.ui_state_full iframe{border-radius:0 0 2px 2px}.ui_loading{width:96px;height:32px;text-align:left;text-indent:-9999em;overflow:hidden;background:url(" + i(147) + ') no-repeat 50%}.ui_icon_bg{margin:20px 5px 20px 15px}.ui_icon{vertical-align:middle}.ui_icon img{width:auto;height:auto}.ui_close,.ui_max,.ui_min,.ui_res{position:relative;text-decoration:none;letter-spacing:normal;text-align:center;display:inline-block;*display:inline;zoom:1;vertical-align:top;font-family:tahoma,arial,\\5b8b\\4f53,sans-serif}.ui_max b,.ui_min b,.ui_res_b,.ui_res_t{display:block;position:absolute;overflow:hidden;cursor:pointer}.ui_close{font-weight:500;outline:0 none}.ui_close,.ui_close:hover{text-decoration:none}.ui_state_tips .ui_main{min-width:3em}.ui_state_tips .ui_content{margin-top:-2px;padding:8px 10px!important}.ui_state_tips .ui_icon_bg{margin:11px 0 6px 9px;width:28px;height:28px}.ui_res,.ui_state_tips .ui_title,.ui_state_tips .ui_title_buttons{display:none}#ldg_lockmask{background:#000;filter:alpha(opacity=30);opacity:.3}.ui_dialog{border:1px solid #aaa;border-radius:5px;box-shadow:0 1px 6px rgba(0,0,0,.3)}.ui_state_lock .ui_dialog{box-shadow:0 3px 18px rgba(0,0,0,.3)}.ui_state_drag .ui_dialog,.ui_state_lock.ui_state_drag .ui_dialog{box-shadow:none}.ui_state_focus .ui_title{color:#505050}.ui_lb,.ui_lt,.ui_rb,.ui_rt{width:0;height:0;*width:1px;*height:1px}.ui_rb{display:block;width:12px;height:12px;position:absolute;bottom:0;right:0;background:none}.ui_title_bar{position:relative;height:100%;border-bottom:1px solid #ddd}.ui_title{font-size:14px;font-weight:700;height:30px;line-height:30px;color:#666;background:#fafafa;background:linear-gradient(top,#fcfcfc,#f4f4f4);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr="#fcfcfc",endColorstr="#f4f4f4");border-top:1px solid #f5f5f5;border-bottom:1px solid #f5f5f5;border-radius:2px 2px 0 0;padding-left:10px}.ui_state_drag .ui_title{background:#fafafa;background:linear-gradient(top,#f4f4f4,#fcfcfc);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr="#f4f4f4",endColorstr="#fcfcfc")}.ui_title_buttons{top:7px;right:5px}.ui_close,.ui_max,.ui_min,.ui_res{color:#aaa;font-size:18px;width:20px;height:20px;line-height:18px}.ui_min_b{top:10px;left:5px;width:10px;height:2px;border-bottom:2px solid #aaa}.ui_max_b{top:5px;left:5px;width:10px;height:7px}.ui_res_b,.ui_res_t{top:8px;left:3px;width:10px;height:5px}.ui_res_b{top:4px;left:6px}.ui_max_b,.ui_res_b,.ui_res_t{border:1px solid #aaa;border-top-width:3px}.ui_res_t{background:#fafafa}.ui_close{vertical-align:baseline;_line-height:22px}.ui_close:focus,.ui_close:hover{color:#bf160b}.ui_max:hover b,.ui_min:hover b,.ui_res:hover b{border-color:#2492ff}.ui_buttons{padding:4px 8px;text-align:right;white-space:nowrap;border-top:1px solid #ececec;border-radius:0 0 2px 2px;background:#fcfcfc;background:linear-gradient(top,#fcfcfc,#f4f4f4);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr="#fcfcfc",endColorstr="#f4f4f4")}.ui_buttons input::-moz-focus-inner{border:0;padding:0;margin:0}.ui_buttons input{display:inline-block;zoom:1;margin-left:10px;padding:0 16px;height:24px;border-radius:2px;cursor:pointer;background:#fff;border:1px solid #cfcfcf;color:#707070;font-family:Microsoft YaHei}.ui_buttons input:hover{border:1px solid #51b4b4;box-shadow:0 1px 1px #97e6ff}.ui_buttons input:active{border:1px solid #c1c1c1;background:#f5f5f5}input.ui_state_highlight{background:#0bc8ff;border:1px solid #00addf;color:#fff}input.ui_state_highlight:hover{background:#00bcf3;color:#fff}input.ui_state_highlight:active{background:#00aadc;border:1px solid #00addf}.ui_state_tips,.ui_state_tips .ui_dialog,.ui_state_tips .ui_inner,.ui_state_tips .ui_title_bar{border:0 none;background:none;box-shadow:none;border-radius:0;filter:none}.ui_state_tips .ui_content{font-weight:700;font-size:14px;color:#323232;text-align:center}.ui_state_tips .ui_dialog,.ui_state_tips .ui_l,.ui_state_tips .ui_r{background-image:url(' + i(145) + ");_background-image:url(" + i(146) + ");background-repeat:no-repeat}.ui_state_tips .ui_l{background-position:-6px 0;width:5px}.ui_state_tips .ui_r{background-position:0 0;width:5px}.ui_state_tips .ui_dialog{background-position:0 -54px;background-repeat:repeat-x;height:54px;overflow:hidden}", ""])
}, function (t, e, i) {
    t.exports = {default: i(75), __esModule: !0}
}, function (t, e, i) {
    t.exports = {default: i(76), __esModule: !0}
}, function (t, e, i) {
    t.exports = {default: i(77), __esModule: !0}
}, function (t, e, i) {
    "use strict";

    function n(t) {
        return t && t.__esModule ? t : {default: t}
    }

    e.__esModule = !0;
    var a = i(70), o = n(a);
    e.default = function (t, e, i) {
        return e in t ? (0, o.default)(t, e, {value: i, enumerable: !0, configurable: !0, writable: !0}) : t[e] = i, t
    }
}, function (t, e, i) {
    var n = i(12), a = n.JSON || (n.JSON = {stringify: JSON.stringify});
    t.exports = function (t) {
        return a.stringify.apply(a, arguments)
    }
}, function (t, e, i) {
    i(98);
    var n = i(12).Object;
    t.exports = function (t, e, i) {
        return n.defineProperty(t, e, i)
    }
}, function (t, e, i) {
    i(101), i(99), i(102), i(103), t.exports = i(12).Symbol
}, function (t, e, i) {
    i(100), i(104), t.exports = i(32).f("iterator")
}, function (t, e) {
    t.exports = function (t) {
        if ("function" != typeof t) throw TypeError(t + " is not a function!");
        return t
    }
}, function (t, e) {
    t.exports = function () {
    }
}, function (t, e, i) {
    var n = i(10), a = i(95), o = i(94);
    t.exports = function (t) {
        return function (e, i, s) {
            var r, l = n(e), c = a(l.length), d = o(s, c);
            if (t && i != i) {
                for (; c > d;) if (r = l[d++], r != r) return !0
            } else for (; c > d; d++) if ((t || d in l) && l[d] === i) return t || d || 0;
            return !t && -1
        }
    }
}, function (t, e, i) {
    var n = i(78);
    t.exports = function (t, e, i) {
        if (n(t), void 0 === e) return t;
        switch (i) {
            case 1:
                return function (i) {
                    return t.call(e, i)
                };
            case 2:
                return function (i, n) {
                    return t.call(e, i, n)
                };
            case 3:
                return function (i, n, a) {
                    return t.call(e, i, n, a)
                }
        }
        return function () {
            return t.apply(e, arguments)
        }
    }
}, function (t, e, i) {
    var n = i(24), a = i(43), o = i(25);
    t.exports = function (t) {
        var e = n(t), i = a.f;
        if (i) for (var s, r = i(t), l = o.f, c = 0; r.length > c;) l.call(t, s = r[c++]) && e.push(s);
        return e
    }
}, function (t, e, i) {
    var n = i(5).document;
    t.exports = n && n.documentElement
}, function (t, e, i) {
    var n = i(37);
    t.exports = Object("z").propertyIsEnumerable(0) ? Object : function (t) {
        return "String" == n(t) ? t.split("") : Object(t)
    }
}, function (t, e, i) {
    var n = i(37);
    t.exports = Array.isArray || function (t) {
        return "Array" == n(t)
    }
}, function (t, e, i) {
    "use strict";
    var n = i(41), a = i(17), o = i(26), s = {};
    i(9)(s, i(11)("iterator"), function () {
        return this
    }), t.exports = function (t, e, i) {
        t.prototype = n(s, {next: a(1, i)}), o(t, e + " Iterator")
    }
}, function (t, e) {
    t.exports = function (t, e) {
        return {value: e, done: !!t}
    }
}, function (t, e, i) {
    var n = i(18)("meta"), a = i(16), o = i(7), s = i(8).f, r = 0, l = Object.isExtensible || function () {
        return !0
    }, c = !i(15)(function () {
        return l(Object.preventExtensions({}))
    }), d = function (t) {
        s(t, n, {value: {i: "O" + ++r, w: {}}})
    }, u = function (t, e) {
        if (!a(t)) return "symbol" == typeof t ? t : ("string" == typeof t ? "S" : "P") + t;
        if (!o(t, n)) {
            if (!l(t)) return "F";
            if (!e) return "E";
            d(t)
        }
        return t[n].i
    }, h = function (t, e) {
        if (!o(t, n)) {
            if (!l(t)) return !0;
            if (!e) return !1;
            d(t)
        }
        return t[n].w
    }, f = function (t) {
        return c && p.NEED && l(t) && !o(t, n) && d(t), t
    }, p = t.exports = {KEY: n, NEED: !1, fastKey: u, getWeak: h, onFreeze: f}
}, function (t, e, i) {
    var n = i(8), a = i(14), o = i(24);
    t.exports = i(6) ? Object.defineProperties : function (t, e) {
        a(t);
        for (var i, s = o(e), r = s.length, l = 0; r > l;) n.f(t, i = s[l++], e[i]);
        return t
    }
}, function (t, e, i) {
    var n = i(25), a = i(17), o = i(10), s = i(30), r = i(7), l = i(39), c = Object.getOwnPropertyDescriptor;
    e.f = i(6) ? c : function (t, e) {
        if (t = o(t), e = s(e, !0), l) try {
            return c(t, e)
        } catch (t) {
        }
        if (r(t, e)) return a(!n.f.call(t, e), t[e])
    }
}, function (t, e, i) {
    var n = i(10), a = i(42).f, o = {}.toString,
        s = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [],
        r = function (t) {
            try {
                return a(t)
            } catch (t) {
                return s.slice()
            }
        };
    t.exports.f = function (t) {
        return s && "[object Window]" == o.call(t) ? r(t) : a(n(t))
    }
}, function (t, e, i) {
    var n = i(7), a = i(96), o = i(27)("IE_PROTO"), s = Object.prototype;
    t.exports = Object.getPrototypeOf || function (t) {
        return t = a(t), n(t, o) ? t[o] : "function" == typeof t.constructor && t instanceof t.constructor ? t.constructor.prototype : t instanceof Object ? s : null
    }
}, function (t, e, i) {
    var n = i(29), a = i(19);
    t.exports = function (t) {
        return function (e, i) {
            var o, s, r = String(a(e)), l = n(i), c = r.length;
            return l < 0 || l >= c ? t ? "" : void 0 : (o = r.charCodeAt(l), o < 55296 || o > 56319 || l + 1 === c || (s = r.charCodeAt(l + 1)) < 56320 || s > 57343 ? t ? r.charAt(l) : o : t ? r.slice(l, l + 2) : (o - 55296 << 10) + (s - 56320) + 65536)
        }
    }
}, function (t, e, i) {
    var n = i(29), a = Math.max, o = Math.min;
    t.exports = function (t, e) {
        return t = n(t), t < 0 ? a(t + e, 0) : o(t, e)
    }
}, function (t, e, i) {
    var n = i(29), a = Math.min;
    t.exports = function (t) {
        return t > 0 ? a(n(t), 9007199254740991) : 0
    }
}, function (t, e, i) {
    var n = i(19);
    t.exports = function (t) {
        return Object(n(t))
    }
}, function (t, e, i) {
    "use strict";
    var n = i(79), a = i(87), o = i(22), s = i(10);
    t.exports = i(40)(Array, "Array", function (t, e) {
        this._t = s(t), this._i = 0, this._k = e
    }, function () {
        var t = this._t, e = this._k, i = this._i++;
        return !t || i >= t.length ? (this._t = void 0, a(1)) : "keys" == e ? a(0, i) : "values" == e ? a(0, t[i]) : a(0, [i, t[i]])
    }, "values"), o.Arguments = o.Array, n("keys"), n("values"), n("entries")
}, function (t, e, i) {
    var n = i(21);
    n(n.S + n.F * !i(6), "Object", {defineProperty: i(8).f})
}, function (t, e) {
}, function (t, e, i) {
    "use strict";
    var n = i(93)(!0);
    i(40)(String, "String", function (t) {
        this._t = String(t), this._i = 0
    }, function () {
        var t, e = this._t, i = this._i;
        return i >= e.length ? {value: void 0, done: !0} : (t = n(e, i), this._i += t.length, {value: t, done: !1})
    })
}, function (t, e, i) {
    "use strict";
    var n = i(5), a = i(7), o = i(6), s = i(21), r = i(45), l = i(88).KEY, c = i(15), d = i(28), u = i(26), h = i(18),
        f = i(11), p = i(32), m = i(31), g = i(82), v = i(85), b = i(14), w = i(10), y = i(30), x = i(17), _ = i(41),
        S = i(91), T = i(90), k = i(8), E = i(24), D = T.f, I = k.f, R = S.f, C = n.Symbol, M = n.JSON,
        O = M && M.stringify, N = "prototype", j = f("_hidden"), A = f("toPrimitive"), Y = {}.propertyIsEnumerable,
        L = d("symbol-registry"), U = d("symbols"), P = d("op-symbols"), z = Object[N], $ = "function" == typeof C,
        B = n.QObject, Q = !B || !B[N] || !B[N].findChild, V = o && c(function () {
            return 7 != _(I({}, "a", {
                get: function () {
                    return I(this, "a", {value: 7}).a
                }
            })).a
        }) ? function (t, e, i) {
            var n = D(z, e);
            n && delete z[e], I(t, e, i), n && t !== z && I(z, e, n)
        } : I, F = function (t) {
            var e = U[t] = _(C[N]);
            return e._k = t, e
        }, W = $ && "symbol" == typeof C.iterator ? function (t) {
            return "symbol" == typeof t
        } : function (t) {
            return t instanceof C
        }, H = function (t, e, i) {
            return t === z && H(P, e, i), b(t), e = y(e, !0), b(i), a(U, e) ? (i.enumerable ? (a(t, j) && t[j][e] && (t[j][e] = !1), i = _(i, {enumerable: x(0, !1)})) : (a(t, j) || I(t, j, x(1, {})), t[j][e] = !0), V(t, e, i)) : I(t, e, i)
        }, G = function (t, e) {
            b(t);
            for (var i, n = g(e = w(e)), a = 0, o = n.length; o > a;) H(t, i = n[a++], e[i]);
            return t
        }, J = function (t, e) {
            return void 0 === e ? _(t) : G(_(t), e)
        }, Z = function (t) {
            var e = Y.call(this, t = y(t, !0));
            return !(this === z && a(U, t) && !a(P, t)) && (!(e || !a(this, t) || !a(U, t) || a(this, j) && this[j][t]) || e)
        }, q = function (t, e) {
            if (t = w(t), e = y(e, !0), t !== z || !a(U, e) || a(P, e)) {
                var i = D(t, e);
                return !i || !a(U, e) || a(t, j) && t[j][e] || (i.enumerable = !0), i
            }
        }, X = function (t) {
            for (var e, i = R(w(t)), n = [], o = 0; i.length > o;) a(U, e = i[o++]) || e == j || e == l || n.push(e);
            return n
        }, K = function (t) {
            for (var e, i = t === z, n = R(i ? P : w(t)), o = [], s = 0; n.length > s;) !a(U, e = n[s++]) || i && !a(z, e) || o.push(U[e]);
            return o
        };
    $ || (C = function () {
        if (this instanceof C) throw TypeError("Symbol is not a constructor!");
        var t = h(arguments.length > 0 ? arguments[0] : void 0), e = function (i) {
            this === z && e.call(P, i), a(this, j) && a(this[j], t) && (this[j][t] = !1), V(this, t, x(1, i))
        };
        return o && Q && V(z, t, {configurable: !0, set: e}), F(t)
    }, r(C[N], "toString", function () {
        return this._k
    }), T.f = q, k.f = H, i(42).f = S.f = X, i(25).f = Z, i(43).f = K, o && !i(23) && r(z, "propertyIsEnumerable", Z, !0), p.f = function (t) {
        return F(f(t))
    }), s(s.G + s.W + s.F * !$, {Symbol: C});
    for (var tt = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), et = 0; tt.length > et;) f(tt[et++]);
    for (var it = E(f.store), nt = 0; it.length > nt;) m(it[nt++]);
    s(s.S + s.F * !$, "Symbol", {
        for: function (t) {
            return a(L, t += "") ? L[t] : L[t] = C(t)
        }, keyFor: function (t) {
            if (!W(t)) throw TypeError(t + " is not a symbol!");
            for (var e in L) if (L[e] === t) return e
        }, useSetter: function () {
            Q = !0
        }, useSimple: function () {
            Q = !1
        }
    }), s(s.S + s.F * !$, "Object", {
        create: J,
        defineProperty: H,
        defineProperties: G,
        getOwnPropertyDescriptor: q,
        getOwnPropertyNames: X,
        getOwnPropertySymbols: K
    }), M && s(s.S + s.F * (!$ || c(function () {
        var t = C();
        return "[null]" != O([t]) || "{}" != O({a: t}) || "{}" != O(Object(t))
    })), "JSON", {
        stringify: function (t) {
            if (void 0 !== t && !W(t)) {
                for (var e, i, n = [t], a = 1; arguments.length > a;) n.push(arguments[a++]);
                return e = n[1], "function" == typeof e && (i = e), !i && v(e) || (e = function (t, e) {
                    if (i && (e = i.call(this, t, e)), !W(e)) return e
                }), n[1] = e, O.apply(M, n)
            }
        }
    }), C[N][A] || i(9)(C[N], A, C[N].valueOf), u(C, "Symbol"), u(Math, "Math", !0), u(n.JSON, "JSON", !0)
}, function (t, e, i) {
    i(31)("asyncIterator")
}, function (t, e, i) {
    i(31)("observable")
}, function (t, e, i) {
    i(97);
    for (var n = i(5), a = i(9), o = i(22), s = i(11)("toStringTag"), r = "CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","), l = 0; l < r.length; l++) {
        var c = r[l], d = n[c], u = d && d.prototype;
        u && !u[s] && a(u, s, c), o[c] = o.Array
    }
}, function (t, e) {
    t.exports = function () {
        var t = [];
        return t.toString = function () {
            for (var t = [], e = 0; e < this.length; e++) {
                var i = this[e];
                i[2] ? t.push("@media " + i[2] + "{" + i[1] + "}") : t.push(i[1])
            }
            return t.join("")
        }, t.i = function (e, i) {
            "string" == typeof e && (e = [[null, e, ""]]);
            for (var n = {}, a = 0; a < this.length; a++) {
                var o = this[a][0];
                "number" == typeof o && (n[o] = !0)
            }
            for (a = 0; a < e.length; a++) {
                var s = e[a];
                "number" == typeof s[0] && n[s[0]] || (i && !s[2] ? s[2] = i : i && (s[2] = "(" + s[2] + ") and (" + i + ")"), t.push(s))
            }
        }, t
    }
}, function (t, e, i) {
    function n(t, e) {
        for (var i = 0; i < t.length; i++) {
            var n = t[i], a = f[n.id];
            if (a) {
                a.refs++;
                for (var o = 0; o < a.parts.length; o++) a.parts[o](n.parts[o]);
                for (; o < n.parts.length; o++) a.parts.push(c(n.parts[o], e))
            } else {
                for (var s = [], o = 0; o < n.parts.length; o++) s.push(c(n.parts[o], e));
                f[n.id] = {id: n.id, refs: 1, parts: s}
            }
        }
    }

    function a(t) {
        for (var e = [], i = {}, n = 0; n < t.length; n++) {
            var a = t[n], o = a[0], s = a[1], r = a[2], l = a[3], c = {css: s, media: r, sourceMap: l};
            i[o] ? i[o].parts.push(c) : e.push(i[o] = {id: o, parts: [c]})
        }
        return e
    }

    function o(t, e) {
        var i = g(), n = w[w.length - 1];
        if ("top" === t.insertAt) n ? n.nextSibling ? i.insertBefore(e, n.nextSibling) : i.appendChild(e) : i.insertBefore(e, i.firstChild), w.push(e); else {
            if ("bottom" !== t.insertAt) throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
            i.appendChild(e)
        }
    }

    function s(t) {
        t.parentNode.removeChild(t);
        var e = w.indexOf(t);
        e >= 0 && w.splice(e, 1)
    }

    function r(t) {
        var e = document.createElement("style");
        return e.type = "text/css", o(t, e), e
    }

    function l(t) {
        var e = document.createElement("link");
        return e.rel = "stylesheet", o(t, e), e
    }

    function c(t, e) {
        var i, n, a;
        if (e.singleton) {
            var o = b++;
            i = v || (v = r(e)), n = d.bind(null, i, o, !1), a = d.bind(null, i, o, !0)
        } else t.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ? (i = l(e), n = h.bind(null, i), a = function () {
            s(i), i.href && URL.revokeObjectURL(i.href)
        }) : (i = r(e), n = u.bind(null, i), a = function () {
            s(i)
        });
        return n(t), function (e) {
            if (e) {
                if (e.css === t.css && e.media === t.media && e.sourceMap === t.sourceMap) return;
                n(t = e)
            } else a()
        }
    }

    function d(t, e, i, n) {
        var a = i ? "" : n.css;
        if (t.styleSheet) t.styleSheet.cssText = y(e, a); else {
            var o = document.createTextNode(a), s = t.childNodes;
            s[e] && t.removeChild(s[e]), s.length ? t.insertBefore(o, s[e]) : t.appendChild(o)
        }
    }

    function u(t, e) {
        var i = e.css, n = e.media;
        if (n && t.setAttribute("media", n), t.styleSheet) t.styleSheet.cssText = i; else {
            for (; t.firstChild;) t.removeChild(t.firstChild);
            t.appendChild(document.createTextNode(i))
        }
    }

    function h(t, e) {
        var i = e.css, n = e.sourceMap;
        n && (i += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(n)))) + " */");
        var a = new Blob([i], {type: "text/css"}), o = t.href;
        t.href = URL.createObjectURL(a), o && URL.revokeObjectURL(o)
    }

    var f = {}, p = function (t) {
        var e;
        return function () {
            return "undefined" == typeof e && (e = t.apply(this, arguments)), e
        }
    }, m = p(function () {
        return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase())
    }), g = p(function () {
        return document.head || document.getElementsByTagName("head")[0]
    }), v = null, b = 0, w = [];
    t.exports = function (t, e) {
        e = e || {}, "undefined" == typeof e.singleton && (e.singleton = m()), "undefined" == typeof e.insertAt && (e.insertAt = "bottom");
        var i = a(t);
        return n(i, e), function (t) {
            for (var o = [], s = 0; s < i.length; s++) {
                var r = i[s], l = f[r.id];
                l.refs--, o.push(l)
            }
            if (t) {
                var c = a(t);
                n(c, e)
            }
            for (var s = 0; s < o.length; s++) {
                var l = o[s];
                if (0 === l.refs) {
                    for (var d = 0; d < l.parts.length; d++) l.parts[d]();
                    delete f[l.id]
                }
            }
        }
    };
    var y = function () {
        var t = [];
        return function (e, i) {
            return t[e] = i, t.filter(Boolean).join("\n")
        }
    }()
}, function (t, e) {
}, function (t, e) {
}, function (t, e) {
}, function (t, e) {
}, function (t, e) {
}, function (t, e) {
}, function (t, e) {
}, function (t, e) {
}, function (t, e) {
}, function (t, e) {
}, function (t, e) {
}, function (t, e) {
}, function (t, e) {
}, function (t, e) {
}, function (t, e) {
}, function (t, e) {
}, function (t, e) {
}, function (t, e) {
}, function (t, e, i) {
    var n = i(69);
    "string" == typeof n && (n = [[t.id, n, ""]]);
    i(106)(n, {});
    n.locals && (t.exports = n.locals)
}, function (t, e, i) {
    var n = i(2);
    t.exports = n("src/tpl/default/headerBar", function (t, e) {
        "use strict";
        var i = this, n = (i.$helpers, i.$escape), a = t.companyName, o = t.userName, s = t.isHangxin, r = t.siVersion,
            l = t.domain, c = "";
        return c += '<div class="companyName left"> ', c += n(a), c += ' </div> <div class="right"> <ul class="advanced-menu cf left"> <li> <div class="top-search-wrap cf special"> <div class="left"> <span class="left-line"></span> <input type="text" value="搜库存" class="search-type" disabled> <span class="triangle-bottom"></span> </div> <div class="left"> <input type="text" placeholder="请输入商品编码或名称" id="headerBar-goods" class="search-dtl"> <span class="right-line"></span> <span class="icon icon-zoom"></span> </div> </div> </li> <li class="default-userName cf"> <span class="user left"></span> <a href="#" class="special left">', c += n(o), c += '</a> <span class="triangle-bottom left"></span> </li> <li>|</li> </ul> <ul class="advanced-menu cf left ', c += n(s ? "hide" : ""), c += '"> <li> <a href="#" class="icon icon-serve"></a> </li> <li class="news-wrap"> <a href="#" class="icon icon-notification" data-tab="1"></a> <span class="headerBar-news">0</span> </li> <li> <a href="#" class="icon icon-help"></a> </li> <li class="',
            c += n(4 === r ? "hide" : ""), c += '"> <a href="', c += n("youshang" == l ? "http://service.youshang.com/myservice/list_service.do" : "http://service.jdy.com/myservice/index.jsp"), c += '" class="icon icon-back"></a> </li> <li class="', c += n(4 === r ? "hide" : ""), c += '"> <a href="/scm/logOut.do" class="icon icon-logout"></a> </li> </ul> </div>', new String(c)
    })
}, function (t, e, i) {
    var n = i(2);
    t.exports = n("src/tpl/default/main", function (t, e) {
        "use strict";
        var i = this, n = (i.$helpers, i.$escape), a = t.isMixed, o = "";
        return o += '<div class="main-hd cf ', o += n(a ? "hide" : ""), o += '"></div> <div class="main-bd" style="', o += n(a ? "top: 0;" : ""), o += '"> <div class="page-tab" style="height: 949px;"></div> </div>', new String(o)
    })
}, function (t, e, i) {
    var n = i(2);
    t.exports = n("src/tpl/default/menu", function (t, e) {
        "use strict";
        var i = this, n = (i.$helpers, i.$escape), a = t.menu, o = i.$each, s = (t.value, t.index, t.a),
            r = (t.svalue, t.sindex, t.slvalue, t.slindex, t.newGif), l = t.list, c = (t.lvalue, t.lindex, t.isHangxin),
            d = "";
        return d += '<div class="main-menu"> <div class="top top-close"> <span class="logo"></span> <span class="version-type">', d += n(a.versionType), d += '</span> </div> <div class="top top-open" style="display:none"> <span class="logo-open"></span> <span class="version-type">', d += n(a.versionType), d += '</span> </div> <ul class="bottom"> ', o(a.menus, function (t, e) {
            d += " ", d += n(s = !s), d += ' <li class="menu-item item-', d += n(e), d += " ", d += n(s ? "" : "odd"), d += '" data-subId="', d += n(e), d += '"> <a href="', d += n(t.href || "#"), d += '" rel="', d += n(t.href ? "pageTab" : ""), d += '" tabTxt="', d += n(t.name), d += '" tabid="', d += n(e), d += '" class="main-nav cf"> <span class="menu-pic ', d += n(e), d += ' left"></span> <span class="text">', d += n(t.name), d += "</span> </a> ", t.submenu && (d += ' <span class="arrow"></span> <div class="sub-nav-wrap group-nav cf"> ', o(t.submenu, function (t, i) {
                d += ' <div class="nav-item"> <h3>', d += n(t.title), d += '</h3> <ul class="sub-nav"> ', o(t.list, function (t, i) {
                    d += ' <li class="', d += n(t.disable ? "hide" : ""), d += '"> <a href="', d += n(t.href || "#"), d += '" rel="pageTab" tabTxt="', d += n(t.name), d += '" tabid="', d += n(e), d += "-", d += n(i), d += '" data-right="', d += n(t.dataRight), d += '"> ', t.list ? (d += ' <span class="hasList">', d += n(t.name), d += '<span class="', d += n(r.indexOf(t.name) > -1 ? "newMenuIcon" : "hide"), d += '"></span></span> ', o(l, function (a, o) {
                        d += " ", a.name === t.name + "记录" && (d += ' <i tabtxt="', d += n(t.name), d += '记录" tabid="', d += n(e), d += "-", d += n(i + "List"), d += '" rel="pageTab" href="', d += n(t.list), d += '" data-right="', d += n(a.dataRight), d += '">查询</i> '), d += " "
                    }), d += " ") : (d += " <span>", d += n(t.name), d += '<span class="', d += n(r.indexOf(t.name) > -1 ? "newMenuIcon" : "hide"), d += '"></span></span> '), d += " </a> </li> "
                }), d += " </ul> </div> "
            }), d += " </div> "), d += " </li> "
        }), d += ' </ul> <div class="fold-mark menu-open"></div> <div class="copy-right ', d += n(c ? "hide" : ""), d += '"></div> </div> ', new String(d)
    })
}, function (t, e, i) {
    var n = i(2);
    t.exports = n("src/tpl/home/auxiliary", '<div class="home-notice panel"></div> <div class="home-common panel"> <span class="home-common-set icon icon-set"></span> <div class="home-title"> </div> <div class="home-content"> <div class="home-quick-links"></div> <div class="home-key-data"></div> </div> </div>')
}, function (t, e, i) {
    var n = i(2);
    t.exports = n("src/tpl/home/charts", '<div class="header cf"> <div class="title left"></div> <div class="search-time left"> <span id="time">近七天</span> <span class="icon-bottom"></span> </div> </div> <div class="home-myCharts"> <div class="home-sales"> </div> <div class="home-purchase cf"> </div> <div class="home-stock"> </div> <div class="home-nothing"></div> </div>')
}, function (t, e, i) {
    var n = i(2);
    t.exports = n("src/tpl/home/goodsMsg", '<div class="home-goodsMsg-wrap"> <span class="icon-left pre"></span> <ul class="goodsMsg-dtl cf"> </ul> <span class="icon-right next"></span> </div>')
}, function (t, e, i) {
    var n = i(2);
    t.exports = n("src/tpl/home/goodsMsgItem", function (t, e) {
        "use strict";
        var i = this, n = (i.$helpers, i.$escape), a = t.index, o = t.colorsbg, s = t.colorsbd, r = t.hide, l = t.id,
            c = t.right, d = t.colors, u = t.name, h = t.count, f = "";
        return f += '<li style="margin-left: ', f += n(0 === a ? "0" : "20px"), f += "; background-color: ", f += n(o), f += "; border: 1px solid ", f += n(s), f += '" class="panel ', f += n(r), f += '" data-color="', f += n(o), f += '" data-id="', f += n(l), f += '" right="', f += n(c), f += '"> <span class="name" style="background-color: ', f += n(d), f += '">', f += n(u), f += '</span> <div class="number" data-number="', f += n(h), f += '">0</div> </li>', new String(f)
    })
}, function (t, e, i) {
    var n = i(2);
    t.exports = n("src/tpl/home/index", '<div class="home cf"> <div class="home-main-item left">  </div> <div class="home-auxiliary-item left">  </div> </div>')
}, function (t, e, i) {
    var n = i(2);
    t.exports = n("src/tpl/home/keyData", '<ul class="home-keyData"> </ul>')
}, function (t, e, i) {
    var n = i(2);
    t.exports = n("src/tpl/home/keyDataItem", function (t, e) {
        "use strict";
        var i = this, n = (i.$helpers, i.$escape), a = t.id, o = t.name1, s = t.total1, r = t.name2, l = t.total2,
            c = "";
        return c += '<li data-id="', c += n(a), c += '"> <div class="item cf"> <span class="left">', c += n(o), c += '：</span> <span class="right">', c += n(s), c += '</span> </div> <div class="item cf"> <span class="left">', c += n(r), c += '：</span> <span class="right">', c += n(l), c += "</span> </div> </li>", new String(c)
    })
}, function (t, e, i) {
    var n = i(2);
    t.exports = n("src/tpl/home/main", '<div class="home-main"> <div class="home-goodsMsg"></div> <div class="home-charts panel"></div> </div>')
}, function (t, e, i) {
    var n = i(2);
    t.exports = n("src/tpl/home/moresetting", function (t, e) {
        "use strict";
        var i = this, n = (i.$helpers, i.$each), a = t.model, o = (t.value, t.index), s = i.$escape, r = "";
        return r += '<div id="moresetting_wrap"> <div id="header"> <ul id="checkItems"> <li style=""><span id="addedServiceList">增值服务</span></li> ', n(a, function (t, e) {
            r += " ", t.selected && "增值服务" !== e && (r += ' <li data="', r += s(t.pName), r += '" id=', r += s(e), r += '><span class="selecteditem">', r += s(e), r += '<span class="icon icon-close"></span></span></li> '), r += " "
        }), r += ' <li id="checkItem" style="padding-bottom: 0"><span></span></li> </ul> </div> <div class="tabsetwrap cf"> <div class="tabsetitem"> <div class="tabsettitle">购货</div> <ul class="" id="', r += s(o), r += '"> ', n(a, function (t, e) {
            r += " ", "购货" == t.pName && (r += ' <li class="moresettingitem ', r += s(e), r += '"><span class="moresetting-icon ', r += s(t.selected ? "icon-checkbox-checked" : "icon-checkbox-unchecked"), r += '"></span>', r += s(e), r += "</li> "), r += " "
        }), r += ' </ul> </div> <div class="tabsetitem"> <div class="tabsettitle">销货</div> <ul class="" id="', r += s(o), r += '"> ', n(a, function (t, e) {
            r += " ", "销货" == t.pName && (r += ' <li class="moresettingitem ', r += s(e), r += '"><span class="moresetting-icon ', r += s(t.selected ? "icon-checkbox-checked" : "icon-checkbox-unchecked"), r += '"></span>', r += s(e), r += "</li> "), r += " "
        }), r += ' </ul> </div> <div class="tabsetitem"> <div class="tabsettitle">仓库</div> <ul class="" id="', r += s(o), r += '"> ', n(a, function (t, e) {
            r += " ", "仓库" == t.pName && (r += ' <li class="moresettingitem ', r += s(e), r += '"><span class="moresetting-icon ', r += s(t.selected ? "icon-checkbox-checked" : "icon-checkbox-unchecked"), r += '"></span>', r += s(e), r += "</li> "), r += " "
        }), r += ' </ul> </div> <div class="tabsetitem"> <div class="tabsettitle">资金</div> <ul class="" id="', r += s(o), r += '"> ', n(a, function (t, e) {
            r += " ", "资金" == t.pName && (r += ' <li class="moresettingitem ', r += s(e), r += '"><span class="moresetting-icon ', r += s(t.selected ? "icon-checkbox-checked" : "icon-checkbox-unchecked"), r += '"></span>', r += s(e), r += "</li> "), r += " "
        }), r += ' </ul> </div> <div class="tabsetitem"> <div class="tabsettitle">其他</div> <ul class="" id="', r += s(o), r += '"> ', n(a, function (t, e) {
            r += " ", "其他" == t.pName && (r += ' <li class="moresettingitem ', r += s(e), r += '"><span class="moresetting-icon ', r += s(t.selected ? "增值服务" == e ? "icon-stop2ccheckbox-dischecked" : "icon-checkbox-checked" : "icon-checkbox-unchecked"), r += '"></span>', r += s(e), r += "</li> "), r += " "
        }), r += " </ul> </div> </div> </div>", new String(r)
    })
}, function (t, e, i) {
    var n = i(2);
    t.exports = n("src/tpl/home/notice", function (t, e) {
        "use strict";
        var i = this, n = (i.$helpers, i.$escape), a = t.notice, o = i.$each, s = (t.value, t.index, t.isHangxin),
            r = t.userName, l = "";
        return l += '<!-- <div style="', l += n(!1), l += '" -->  <ul class="home-noticeWrap"> <!-- ', l += n(a.msgtitle), l += " --> ", o(a, function (t, e) {
            l += ' <li class="', l += n(t.msgid ? "islink" : ""), l += " ", l += n(s ? "hide" : ""), l += '" data-link="/service/service.jsp?newsId=', l += n(t.msgid), l += '">', l += n(e + 1), l += ". ", l += n(t.msgtitle), l += "</li> "
        }), l += ' <li class="', l += n(s ? "" : "hide"), l += '">', l += n(r), l += ',欢迎使用</li> </ul> <span class="home-sticky"></span> ', new String(l)
    })
}, function (t, e, i) {
    var n = i(2);
    t.exports = n("src/tpl/home/purchaseBar", '<div class="purchaseBarwrap"> <div style="text-align: center; font-weight: bold; margin: 35px 0 14px 0;">购货金额排名</div> <div class="purchaseBarLeft"></div> <div class="purchaseBarRight"></div> </div>')
}, function (t, e, i) {
    var n = i(2);
    t.exports = n("src/tpl/home/purchaseBarItem", function (t, e) {
        "use strict";
        var i = this, n = (i.$helpers, i.$escape), a = t.index, o = t.invNumber, s = t.invname, r = t.color,
            l = t.total, c = "";
        return c += '<div class="itemWrap"> <div class="page"></div> <div id="ceshi"> <span class="index index', c += n(a), c += '">', c += n(a > 3 ? a : ""), c += ' </span> <a> <div class="item"> <div class="name">', c += n(o + " " + s), c += '</div> <div class="total" style="color: ', c += n(r), c += '">', c += n(l), c += "</div> </div> </a> </div> </div>", new String(c)
    })
}, function (t, e, i) {
    var n = i(2);
    t.exports = n("src/tpl/home/quickLinks", '<ul class="home-link-items cf"> </ul> ')
}, function (t, e, i) {
    var n = i(2);
    t.exports = n("src/tpl/home/quickLinksItem", function (t, e) {
        "use strict";
        var i = this, n = (i.$helpers, i.$escape), a = t.id, o = t.name, s = t.icon, r = t.color, l = "";
        return l += '<li class="item" data-id="', l += n(a), l += '"> <a title=', l += n(o), l += '> <div class="icon icon-', l += n(s), l += '" style="color: ', l += n(r), l += ';"></div> <div class="text">', l += n(o), l += "</div> </a> </li>", new String(l)
    })
}, function (t, e, i) {
    var n = i(2);
    t.exports = n("src/tpl/start/index", function (t, e) {
        "use strict";
        var i = this, n = (i.$helpers, i.$escape), a = t.isMixed, o = "";
        return o += '<div class="left-menu left ', o += n(a ? "hide" : ""), o += '"></div> <div class="default-main"></div>', new String(o)
    })
}, function (t, e, i) {
    var n = i(2);
    t.exports = n("src/tpl/tab/list", function (t, e) {
        "use strict";
        var i = this, n = (i.$helpers, i.$each), a = t.tab, o = (t.value, t.index, i.$escape), s = "";
        return s += "<ul> ", n(a, function (t, e) {
            s += ' <li id="', s += o(t.id), s += '">', s += o(t.name), s += "</li> "
        }), s += " </ul>", new String(s)
    })
}, function (t, e) {
    t.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAABuCAYAAACKsSsDAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjA0QUUzRjhERjRGMjExRTBCMzAxQjRBNTM5MUJCOEI3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjA0QUUzRjhFRjRGMjExRTBCMzAxQjRBNTM5MUJCOEI3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDRBRTNGOEJGNEYyMTFFMEIzMDFCNEE1MzkxQkI4QjciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDRBRTNGOENGNEYyMTFFMEIzMDFCNEE1MzkxQkI4QjciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6zsf2gAAACO0lEQVR42uyaO07DQBCGZ71OIogMiCptagoqjkBuxg24AzXiClwBRRRRGppYKIoURXnYjpmJx2KxUJSCYtf8I432MVvszzc7MdIYIorZS9fZyBjDUzINjzi2I09NhJyzF+y5joWKkstb9diZeysmyvP8PU3Th9FodOlcmmoRsi9xOcdU5uSzZVlWFkVRzmazR15esfckzWSUtexLXM7tdrtDCvrqRi54QBRF8ziOb3i65MCK30yf5wkTedvv99e1+E6nY7xNs3pirZULdzXV6vfU1f0gLGqsO85epGsKVYxtiLEhiwnaWiUm1jJ81E45AzIQgzQDGZABGZABGZABmdaSgRi8GZABGRQApBnIIM2QZiADMkgzpBnIgAzSDGkGMn8lpm7HyrJsQVVH015jMhayL/G6P8VrMdZaSpKEptPpC1VtWq6YfDKZPEtcznlvm81mPh6Pn4bD4S0vB+x9JSCNQAPZl7icKyvzt6uJL3zHvmJfqq85sOXUkhatM/ZEXcRJ+9art9WMPWXfCiT1QmOFrsUyFRx7XZrZF/pW3LZGcsa1iln7Xv1i/YuXDScd6+omQo3vYuSCPUfAb/Ef3bO+k7lwynHQZspQvlVOIcO/8O35nGnVtxnEQAzE4N9mkIEYpBnIgAzIgAzIgAzIgAzE4M2ADMigACDNQAZikGYgAzIQgzQDGZBBmoEMyIDMPyXTqhYt6e67p6oHM3QdpXQCftB3c2nwYj6pLW2NdLzhNLgCgNLso30JMABOz3HrQx+UzwAAAABJRU5ErkJggg=="
}, function (t, e, i) {
    t.exports = i.p + "static/gb_tip_layer_ie6.a6043b3.png"
}, function (t, e, i) {
    t.exports = i.p + "static/loading.ed413f9.gif"
}, function (t, e, i) {
    function n(t) {
        return i(a(t))
    }

    function a(t) {
        return o[t] || function () {
            throw new Error("Cannot find module '" + t + "'.")
        }()
    }

    var o = {
        "./default/headerBar.tpl": 126,
        "./default/main.tpl": 127,
        "./default/menu.tpl": 128,
        "./home/auxiliary.tpl": 129,
        "./home/charts.tpl": 130,
        "./home/goodsMsg.tpl": 131,
        "./home/goodsMsgItem.tpl": 132,
        "./home/index.tpl": 133,
        "./home/keyData.tpl": 134,
        "./home/keyDataItem.tpl": 135,
        "./home/main.tpl": 136,
        "./home/moresetting.tpl": 137,
        "./home/notice.tpl": 138,
        "./home/purchaseBar.tpl": 139,
        "./home/purchaseBarItem.tpl": 140,
        "./home/quickLinks.tpl": 141,
        "./home/quickLinksItem.tpl": 142,
        "./start/index.tpl": 143,
        "./tab/list.tpl": 144
    };
    n.keys = function () {
        return Object.keys(o)
    }, n.resolve = a, t.exports = n, n.id = 148
}, function (t, e, i) {
    t.exports = i(13)(136)
}, function (t, e, i) {
    t.exports = i(13)(137)
}, function (t, e, i) {
    t.exports = i(13)(365)
}, function (t, e, i) {
    t.exports = i(13)(367)
}]);
//# sourceMappingURL=app.ea26dd00a5823b52da4f.js.map