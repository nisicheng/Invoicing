var THISPAGE, curRow, curCol, SYSTEM = window.parent.SYSTEM, defaultPage = Public.getDefaultPage();
if (frameElement.api) {
    var api = frameElement.api, data = api.data || {}, url_id = data.id, opicIds = data.opicIds;
    $("#uploadAttachment").hide(), $("#create").hide(), isflag = 0
} else isflag = 1;
$(function () {
    function e(e) {
        if (e.length) {
            var a, t = e[0].id, e = [];
            if (THISPAGE.hasPic) 0 != $(".selected").length ? $(".selected").each(function (i, n) {
                    t == this.id && (a = i), e.push($(this).data("fileInfo"))
                }) : e.push($_this.data("fileInfo")); else {
                var i = THISPAGE.$grid.jqGrid("getDataIDs");
                $.each(i, function (i, n) {
                    var s = $("#" + n);
                    s.length && ("list_" + t == s[0].id && (a = i), e.push(s.data("fileInfo")))
                })
            }
            var n = $(window).width() - 50, s = $(window).height() - 35 - 50, c = 1.6 * s;
            n = (n = n > c ? c : n) < 960 ? 960 : n, $.dialog({
                content: "url:/sales/originalSales.jsp",
                title: "原始单据整理",
                data: {
                    items: e,
                    curIndex: a,
                    createVoucher: THISPAGE.createVoucher,
                    isflag: isflag,
                    callback: {
                        afterCleanUp: function (e) {
                            THISPAGE.reloadData()
                        }, afterCreate: function (e) {
                            THISPAGE.reloadData()
                        }
                    }
                },
                init: function () {
                },
                lock: !0,
                width: n,
                height: s
            })
        }
    }

    (THISPAGE = {
        hasPic: !0,
        $period: $("#period"),
        $grid: $("#grid"),
        $picGrid: $("#picGrid"),
        $dataWrap: $(".dataWrapper"),
        $downloadEleInvoice: $("#downloadEleInvoice"),
        $uploadAttachment: $("#uploadAttachment"),
        $concat: $("#concat"),
        $cleanUp: $("#cleanUp"),
        $create: $("#create"),
        $tree: $("#ztree"),
        $sortDate: $("#sortDate"),
        conditions: {page: 1, period: SYSTEM.CURPERIOD, sord: "desc", sidx: "date", isVoucher: 0, isClass: 0},
        init: function () {
            this.domInit(), this.eventInit(), $(document).trigger("resize"), this.picGridRender(), setTimeout(function () {
                opicIds && $.each(opicIds, function (e, a) {
                    $("#" + a).addClass("selected"), $("#" + a).find(".cboxWrap").addClass("checked")
                })
            }, 100)
        },
        domInit: function () {
            THISPAGE.chkboxes = $("#checkboxWrap").cssCheckbox()
        },
        getSelected: function () {
            var e = [];
            if (THISPAGE.hasPic) THISPAGE.$picGrid.find(".picItem.selected").each(function (a, t) {
                e.push($(this).closest(".picItem").data("fileInfo"))
            }); else for (var a = THISPAGE.$grid.jqGrid("getGridParam", "selarrrow"), t = 0; t < a.length; t++)e.push($("#" + a[t]).data("fileInfo"));
            return e
        },
        doSelect: function (e) {
            e instanceof Array || (e = [e]), THISPAGE.hasPic && THISPAGE.$picGrid.find("li").each(function (a, t) {
                var i = $(this);
                $.map(e, function (e) {
                    e == i[0].id && i.find(".cboxWrap").trigger("click")
                })
            })
        },
        eventInit: function () {
            $("#search").click(function (e) {
                THISPAGE.reloadData()
            }), $(".wrapper").on("click", ".modeBtn:not(.enable)", function (e) {
                $(this).addClass("enable").siblings().removeClass("enable"), THISPAGE.changeRenderMode()
            }), THISPAGE.$uploadAttachment.on("click", function (e) {
                Business.verifyRight("SA_UPLOADATTACH") && $.dialog({
                    content: "url:/settings/uploadAttachment.jsp",
                    title: "附件导入",
                    lock: !0,
                    data: {
                        callback: function (e) {
                            e.close(), THISPAGE.reloadData()
                        }
                    },
                    ok: function () {
                        return this.content.doUpload(), !1
                    },
                    okVal: "导入",
                    cancel: !0
                })
            }), THISPAGE.$cleanUp.on("click", function (a) {
                var t = THISPAGE.getSelected();
                t.length ? e(t) : parent.Public.tips({type: 2, content: "请选择需要整理的项！"})
            }), THISPAGE.$dataWrap.on("click", ".picItem", function (a) {
                a.currentTarget;
                var t = [];
                t.push($(this).closest("li").data("fileInfo")), $_this = $(this), e(t)
            }), THISPAGE.$picGrid.on("click", ".cleanUp", function (a) {
                a.preventDefault();
                var t = [];
                t.push($(this).closest("li").data("fileInfo")), e(t)
            }), THISPAGE.$grid.on("click", ".cleanUp", function (a) {
                a.preventDefault();
                var t = [];
                t.push($(this).closest("tr").data("fileInfo")), e(t)
            }), THISPAGE.$dataWrap.on("click", ".hasVoucher", function (e) {
                if (e.preventDefault(), Business.verifyRight("93")) {
                    var a = $(this).data("id");
                    THISPAGE.voucherLink(a)
                }
            }), THISPAGE.$create.on("click", function (e) {
                if (e.preventDefault(), Business.verifyRight("SA_ADD")) {
                    var a = THISPAGE.getSelected();
                    a.length ? THISPAGE.createVoucher(a, !0) : parent.Public.tips({type: 2, content: "请选择需要生成的项！"})
                }
            }), THISPAGE.$grid.on("click", ".create", function (e) {
                if (e.preventDefault(), Business.verifyRight("SA_ADD")) {
                    var a = [];
                    a.push($(this).closest("tr").data("fileInfo")), THISPAGE.createVoucher(a, !1)
                }
            }), THISPAGE.$dataWrap.on("click", ".del", function (e) {
                function a() {
                    Public.ajaxPost("/attachment.do?action=deleteByPicId", {id: t}, function (e) {
                        200 == e.status ? "success" == e.data.result ? (parent.Public.tips({content: e.data.msg}), THISPAGE.reloadData()) : parent.Public.tips({
                                    type: 2,
                                    content: "删除失败，" + e.data.msg || "未知错误!"
                                }) : parent.Public.tips({type: 2, content: "删除失败，该图片附件已关联销货单,不能删除"})
                    })
                }

                if (Business.verifyRight("SA_DELETEATTACH")) {
                    var t = $(this).data("id");
                    $.dialog.confirm("删除后无法恢复，是否继续？", function () {
                        a()
                    })
                }
            }), THISPAGE.$dataWrap.on("click", ".tools", function (e) {
                e.stopPropagation()
            }), THISPAGE.$dataWrap.on("click", ".cboxWrap", function (e) {
                function a(e, a) {
                    e.each(function (e, t) {
                        var n = $(this);
                        n.parent().hasClass(i) ? !a && n.trigger("click") : a && n.trigger("click")
                    })
                }

                e.preventDefault(), e.stopPropagation();
                var t = $(this), i = "checked", n = !t.hasClass(i), s = n ? "addClass" : "removeClass", c = t.hasClass("groupchk"), r = t.hasClass("chkAll");
                if (t[s](i), c) a(t.closest(".group").find(".list").find(".cbox"), n); else if (r) a(THISPAGE.$picGrid.find("h3").find(".cbox"), n); else {
                    if (!n) {
                        var o = t.closest(".group").find(".groupchk");
                        o.hasClass(i) && o.removeClass(i);
                        var d = THISPAGE.$dataWrap.find(".chkAll");
                        d.hasClass(i) && d.removeClass(i)
                    }
                    t.closest(".picItem")[s]("selected")
                }
            }), THISPAGE.$sortDate.click(function () {
                var e = $(this);
                e.hasClass("asc") ? e.addClass("desc").removeClass("asc") : e.addClass("asc").removeClass("desc"), THISPAGE.reloadData()
            }), THISPAGE.$dataWrap.on("click", ".btn", function (e) {
                e.stopPropagation()
            }), $(window).resize(function () {
                var e = THISPAGE.$picGrid, a = $(window).height() - e.offset().top - (e.outerHeight() - e.height()) - 25;
                e.height(a);
                var t = THISPAGE.$grid, i = $(window).width() - 240, n = $(window).height() - t.offset().top - 45;
                t.jqGrid("setGridHeight", n), t.jqGrid("setGridWidth", i)
            })
        },
        voucherLink: function (e) {
            var a = "/sales/sales.jsp?id=" + e;
            parent.tab.addTabItem({tabid: "voucherDetail", text: "销货单", url: a})
        },
        createVoucher: function (e, a, t) {
            if (!(e instanceof Array)) {
                var i = [];
                i.push(e), e = i
            }
            !function (e, a, t) {
                var i = $.map(e, function (e) {
                    return e.id
                }), n = $.map(e, function (e) {
                    return e.picPath
                }), s = "/scm/invSa.do?action=initSale&picIds=" + JSON.stringify(i) + "&picPaths=" + JSON.stringify(n);
                parent.tab.addTabItem({tabid: "sales-sales", text: "销售单", url: s})
            }(e)
        },
        changeRenderMode: function (e) {
            var a = Number(THISPAGE.hasPic || 0);
            a ? this.gridRender(e) : this.picGridRender(e), $(this.$dataWrap.hide()[a]).show()
        },
        reloadData: function (e) {
            $.extend(!0, THISPAGE.conditions, {sord: THISPAGE.$sortDate.attr("class"), isVoucher: 0});
            for (var a = THISPAGE.chkboxes.chkVal(), t = 0; t < a.length; t++) {
                var i = a[t];
                THISPAGE.conditions[i] = 1
            }
            THISPAGE.conditions.isVoucher = 1 === THISPAGE.conditions.isVoucher ? -1 : 0, THISPAGE.hasPic = !THISPAGE.hasPic, THISPAGE.changeRenderMode(e)
        },
        picGridRender: function (e) {
            THISPAGE.hasPic = !0, Public.ajaxPost("/evidences.do?action=list", THISPAGE.conditions, function (a) {
                if (200 === a.status) {
                    THISPAGE.$picGrid.html("");
                    for (var t = a.data.items, i = 0; i < t.length; i++) {
                        for (var n = t[i], s = $('<h3><span class="cboxWrap groupchk"><i class="cbox"></i>' + n.date + "</span></h3>"), c = $('<ul class="list cf"></ul>'), r = n.files.length - 1; r >= 0; r--) {
                            var o = n.files[r], d = n.files;
                            if (d.length) {
                                var l = "", p = d[r].fileName.split("."), h = p[p.length - 1], f = !0, u = ["bmp", "png", "gif", "jpeg", "jpg"];
                                -1 == $.inArray(h.toLowerCase(), u) && (f = !1);
                                var g = f ? "http://pics.youshang.com/" + d[r].picPath || d[r].filePath : "../css/img/pdf.jpg", I = f ? g.replace("." + h, "") + "_200x200." + h : "../css/img/pdf.jpg", v = (d[r].filePath, d[r].fileName, '<span class="tools top">'), P = '<div class="tools bottom">';
                                v += '<a href="#" class="del btn" data-id="' + o.id + '"></a></span>', P += o.fileName.split(".")[0] + "</div>", l = d.length > 1 ? '<img class="img"  src="' + I + '" href="' + g + '"/>' : '<img class="img" src="' + I + '" href="' + g + '"/>';
                                var G = $('<li class="picItem" id="' + o.id + '"><div class="itemInner"><span class="cboxWrap"><i class="cbox"></i></span>' + l + v + "</div>" + P + "</li>");
                                G.data("fileInfo", o), c.append(G)
                            }
                        }
                        THISPAGE.$picGrid.append($('<div class="group"></div>').append(s).append(c)), c.find(".img").load(function () {
                            var e = $(this);
                            e.wrap('<span class="imgWrap"></span>'), $wrap = $(this).parent().addClass(e.attr("rel")), $wrap.css({
                                width: e.width(),
                                height: e.height()
                            })
                        })
                    }
                    e && e(a), $(window).trigger("resize")
                } else Public.tips({type: 1, content: "获取数据失败"})
            })
        },
        gridRender: function (e) {
            THISPAGE.hasPic = !1, this.$grid.data("inited") ? this.$grid.jqGrid("setGridParam", {postData: THISPAGE.conditions}).trigger("reloadGrid") : (this.$grid.data("inited", !0), this.$grid.jqGrid({
                    url: "/evidences.do?action=list",
                    postData: THISPAGE.conditions,
                    ajaxGridOptions: {
                        dataFilter: function (e, a) {
                            e = $.parseJSON(e);
                            for (var t = [], i = 0; i < e.data.items.length; i++)for (var n = e.data.items[i], s = n.date, c = 0; c < n.files.length; c++) {
                                var r = n.all[c];
                                t.push($.extend(!0, r, {date: s}))
                            }
                            return e.data.items = t, e.data.totalsize = t.length, JSON.stringify(e)
                        }
                    },
                    datatype: "json",
                    idPrefix: "list_",
                    autoHeight: !0,
                    autowidth: !0,
                    altRows: !0,
                    multiselect: !0,
                    gridview: !0,
                    colModel: [{name: "date", label: "日期", sortable: !0}, {
                        name: "evidNo",
                        label: "编号"
                    }, {name: "evidId", label: "evidId", hidden: !0}, {
                        name: "evbusId",
                        label: "业务分类ID",
                        hidden: !0
                    }, {
                        name: "evbus", label: "业务分类", formatter: function (e, a, t) {
                            if (!e)for (var i = 0; i < THISPAGE.categoryInfo.length; i++) {
                                var n = THISPAGE.categoryInfo[i];
                                if (n.evbusId == t.evbusId) {
                                    e = n.name;
                                    break
                                }
                            }
                            return e || "&#160;"
                        }
                    }, {name: "explanation", label: "摘要"}, {
                        name: "amount",
                        label: "金额",
                        align: "right"
                    }, {
                        name: "voucherId", label: "凭证", align: "center", formatter: function (e, a, t) {
                            return t.voucherId ? e = '<a href="javascript:void(0);" class="hasVoucher" data-id="' + t.voucherId + '">' + t.voucherNo + "</a>" : t.evbusId && (e = '<a href="javascript:void(0);" class="create" data-id="' + t.evidId + '">点击生成凭证</a>'), e || "&#160;"
                        }
                    }, {
                        name: "operating", label: "操作", width: 70, fixed: !0, formatter: function (e, a, t) {
                            return '<p class="operate-wrap"><a class="cleanUp ui-icon-files" title="点击整理或查看附件信息">整理</a><a class="del ui-icon-del" data-id="' + t.evidId + '" title="点击删除">删除</a></p>'
                        }, align: "center"
                    }],
                    grouping: !0,
                    groupingView: {groupField: ["date"]},
                    cmTemplate: {sortable: !1},
                    pager: "#page",
                    rowNum: 1e3,
                    viewrecords: !0,
                    shrinkToFit: !1,
                    scroll: 1,
                    jsonReader: {root: "data.items", records: "data.totalsize", repeatitems: !1, id: "evidId"},
                    loadComplete: function (a) {
                        for (var t = a.data.items, i = 0; i < t.length; i++) {
                            var n = t[i];
                            $("#list_" + n.evidId).data("fileInfo", n).addClass("picItem")
                        }
                        e && e(t), $(window).trigger("resize")
                    }
                }))
        }
    }).init()
});