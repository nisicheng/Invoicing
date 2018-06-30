var $category = $("#filterCat");
$(function () {
    function e(e) {
        var r = !1;
        1 === o.siType && (r = !0), $("#grid").jqGrid("GridUnload");
        var i = [{name: "invNo", label: "商品编号", width: 80}, {
            name: "invName",
            label: "商品名称",
            width: 200,
            classes: "ui-ellipsis",
            title: !0
        }, {name: "spec", label: "规格型号", width: 60, align: "center"}, {
            name: "unit",
            label: "单位",
            width: 40,
            align: "center"
        }, {name: "secondUnit", label: "副单位", width: 80, hidden: r, align: "center"}];
        s.search;
        var n = 1, l = chkRealQty.chkVal().length > 0 ? "1" : "0";
        switch (1 === o.siType ? n = 1 : ("1" === l || o.invCalculateMethod || (n = 2), "1" !== l && o.invCalculateMethod && (n = 3), "1" !== l || o.invCalculateMethod || (n = 4), "1" === l && o.invCalculateMethod && (n = 5)), n) {
            case 1:
                for (var c = e.colIndex, g = e.colNames, h = e.stoNames, f = [], p = 4, b = c.length; p < b; p++)new RegExp("second").test(c[p]) && c.splice(p, 1), new RegExp("辅助").test(g[p]) && g.splice(p, 1);
                for (var p = 4, b = c.length; p < b; p++) {
                    var m = null;
                    m = {name: c[p], label: g[p], width: 80, align: "right"}, i.push(m), f.push({
                        startColumnName: c[4],
                        numberOfColumns: 3,
                        titleText: h[0]
                    });
                    for (var v = 1; v < h.length; v++)f.push({
                        startColumnName: c[6 + v],
                        numberOfColumns: 1,
                        titleText: h[v]
                    })
                }
                break;
            case 2:
                var w = 2, k = 4, D = 1, N = 2;
                returnArr = t(i, e, w, k, D, N);
                break;
            case 3:
                var w = 2, k = 4, D = 1;
                returnArr = t(i, e, w, k, D);
                break;
            case 4:
                var w = Number(2 + Number(l)), k = 5, D = 2, N = 3;
                returnArr = t(i, e, w, k, D, N);
                break;
            case 5:
                var w = Number(2 + Number(l)), k = 5, D = 2;
                returnArr = t(i, e, w, k, D)
        }
        1 !== o.siType && (i = returnArr[0], f = returnArr[1]), u.gridReg("grid", i), i = u.conf.grids.grid.colModel, $("#grid").jqGrid({
            ajaxGridOptions: {
                complete: function (e, t) {
                }
            },
            data: e.rows,
            datatype: "local",
            autowidth: !0,
            gridview: !0,
            colModel: i,
            cmTemplate: {sortable: !1, title: !1},
            page: 1,
            sortname: "date",
            sortorder: "desc",
            rowNum: 3e3,
            loadonce: !0,
            viewrecords: !0,
            shrinkToFit: !1,
            forceFit: !0,
            footerrow: !0,
            userData: e.userdata,
            userDataOnFooter: !0,
            jsonReader: {
                root: "data.rows",
                records: "data.records",
                total: "data.total",
                userdata: "data.userdata",
                repeatitems: !1,
                id: "0"
            },
            ondblClickRow: function (e) {
                if (Business.verifyRight("DeliverDetailReport_QUERY", !1, "您没有商品收发明细表的相关权限哦！")) {
                    var t = $("#grid").getRowData(e).invNo, a = new Date, r = a.getDate(), i = a.getMonth() + 1, o = a.getFullYear(), n = o + "-" + i + "-1", s = o + "-" + i + "-" + r;
                    parent.tab.addTabItem({
                        tabid: "report-goodsFlowDetail",
                        text: "商品收发明细表",
                        url: "/report/goods-flow-detail.jsp?goodsNo=" + t + "&beginDate=" + n + "&endDate=" + s + "&isJump=1"
                    })
                }
            },
            loadComplete: function (e) {
                var t;
                d = e.records;
                if (e && e.data) {
                    var r = e.data.rows.length;
                    t = r ? 41 * r : 1
                }
                a(t)
            },
            gridComplete: function () {
                $("#grid").footerData("set", {
                    invNo: "合计:",
                    unit: ""
                }), $("table.ui-jqgrid-ftable").find('td[aria-describedby="grid_secondUnit"]').prevUntil().css("border-right-color", "#fff")
            },
            resizeStop: function (e, t) {
                u.setGridWidthByIndex(e, t + 1, "grid")
            }
        }).jqGrid("setGroupHeaders", {useColSpanStyle: !0, groupHeaders: f}).jqGrid("setFrozenColumns")
    }

    function t(e, t, a, r, i, o) {
        for (var n = [], s = (chkRealQty.chkVal().length, t.colIndex), l = t.colNames, d = t.stoNames, c = [], u = "", g = 0, h = a, f = 5, p = s.length; f < p; f++) {
            var b = null;
            if (b = {
                    name: s[f],
                    label: l[f],
                    width: 80,
                    align: "right"
                }, e.push(b), "inunitCost" === s[Number(r) + 3]) h = r;
            s[f].split("_")[1] === u && "1" === u && (c.pop(), c.push({
                startColumnName: s[5],
                numberOfColumns: h,
                titleText: d[0]
            })), "1" != u && s[f].split("_")[1] === u && (c.push({
                startColumnName: s[f - i],
                numberOfColumns: o || h,
                titleText: d[g + 1]
            }), g++), u = s[f].split("_")[1]
        }
        return n[0] = e, n[1] = c, n
    }

    function a(e) {
        e && (a.h = e);
        var t = r(), o = $(window).height() - $(".grid-wrap").offset().top - 65 - 150, n = i(), s = $("#grid"), l = $(".ui-jqgrid-htable").height();
        o > n && (o = n), t < s.width() && (o += 17), $("#grid-wrap").height(function () {
            return document.body.clientHeight - this.offsetTop - 36 - 5
        }), s.jqGrid("setGridHeight", o), s.jqGrid("setGridWidth", t);
        var d = o > 0 ? parseInt(o, 10) : 0;
        $(".frozen-sdiv").attr("style", "position:absolute;left:0;top:" + (parseInt(l, 10) + d + 1) + "px")
    }

    function r() {
        return $(window).width() - $("#grid-wrap").offset().left - 36 - 20
    }

    function i() {
        return $(window).height() - $("#grid").offset().top - 36 - 46
    }

    var o = parent.SYSTEM, n = o, s = $.extend({
        beginDate: "",
        endDate: "",
        goodsNo: "",
        storageNo: "",
        showSku: "0"
    }, Public.urlParam()), l = null, d = 0, c = s.storageNo, u = Public.mod_PageConfig.init("goodsBalance");
    !function () {
        Business.getSearchList(), Business.filterGoods();
        var e = Business.filterStorage();
        c && e.selectByValue(Number(c)), 1 === o.siType ? $("#date,#storage,#goodsfilter,#goods,#chk-stock,#chk-wrap").show() : $("#date,#storage,#goodsfilter,#goods,#chk-stock,#chk-realQty,#chk-wrap").show(), $("#storage").insertBefore($("#goods")), $("#date label").text("库存日期:"), $("#filter-fromDate").addClass("dn").attr("readonly", !0).attr("disabled", !0), $("#date .todate").hide(), $("#filter-toDate").removeClass("ui-datepicker-input").addClass("ui-datepickerto-input"), $("#chk-wrap .chk:eq(0)").hide(), $("#btn-print").hide(), $("#filter-fromDate").attr("disabled", "disabled"), $("#filter-toDate").datepicker();
        var t = Public.urlParam();
        chkboxes = $("#chk-wrap").cssCheckbox(), chkRealQty = $("#chk-realQty").cssCheckbox(), chkstock = $("#chk-stock").cssCheckbox(), o.enableAssistingProp || $("#chk-wrap").hide(), "1" === (t = {
            beginDate: n.startDate || t.beginDate,
            endDate: t.endDate,
            goods: t.goods || "",
            goodsNo: t.goodsNo || "",
            storage: t.storage || "",
            storageNo: t.storageNo || ""
        }).showSku && $('#chk-wrap input[name="showSku"]').attr("checked", !0), $("#filter-fromDate").val(t.beginDate || ""), $("#filter-toDate").val(t.endDate || ""), l = Public.categoryTree($("#filterCat"), {
            rootTxt: "全部",
            width: 200
        }), $("#filterCat").placeholder(), Business.moreFilterEvent()
    }(), $("#filter-submit").click(function (t) {
        t.preventDefault();
        var r = $("#filter-fromDate").val(), i = $("#filter-toDate").val();
        if (r && i && new Date(r).getTime() > new Date(i).getTime())return parent.Public.tips({
            type: 1,
            content: "查询日期不能小于启用日期！"
        }), !1;
        s = {
            beginDate: r,
            endDate: i,
            goods: $("#filter-goods input").data("ids") || "",
            goodsNo: $("#filter-goods input").val() || "",
            storage: $("#filter-storage input").data("ids") || "",
            storageNo: $("#filter-storage input").val() || "",
            catId: l.getValue(),
            catName: l.getText(),
            showZero: chkstock.chkVal().length > 0 ? "1" : "0",
            realQty: chkRealQty.chkVal().length > 0 ? "1" : "0"
        }, chkVals = chkboxes.chkVal();
        for (var o = 0, n = chkVals.length; o < n; o++)s[chkVals[o]] = 1;
        var d = $.dialog.tips("正在查询，请稍候...", 1e3, "loading.gif", !0);
        Public.ajaxPost("/report/invBalance.do?action=detail", s, function (t) {
            200 === t.status ? ($(".no-query").remove(), $(".ui-print").show(), e(t.data), a(), d.close(), $(".grid-subtitle").text("日期:" + s.beginDate + " 至 " + i)) : (d.close(), parent.Public.tips({
                    type: 1,
                    content: t.msg
                }))
        })
    }), s.search && $("#filter-submit").trigger("click"), $("#btn-print").click(function (e) {
        e.preventDefault(), Business.verifyRight("InvBalanceReport_PRINT") && window.print()
    }), $("#btn-export").click(function (e) {
        if (e.preventDefault(), Business.verifyRight("InvBalanceReport_EXPORT") && Business.noDataExportTips()) {
            var t = {};
            for (var a in s)s[a] && (t[a] = s[a]);
            Business.getFile("/report/invBalance.do?action=exporter", t)
        }
    }), $("#config").show().click(function (e) {
        u.config()
    });
    var g;
    $(window).on("resize", function (e) {
        g || (g = setTimeout(function () {
            a(), g = null
        }, 50))
    })
});