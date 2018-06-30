var $category = $("#filterCat"), urlParam = Public.urlParam();
$(function () {
    function e(a) {
        a && (e.h = a);
        var r = t(), s = $(window).height() - $(".grid-wrap").offset().top - 65 - 150, n = i(), l = $("#grid"), o = $(".ui-jqgrid-htable").height();
        s > n && (s = n), r < l.width() && (s += 17), $("#grid-wrap").height(function () {
            return document.body.clientHeight - this.offsetTop - 36 - 5
        }), l.jqGrid("setGridHeight", s), l.jqGrid("setGridWidth", r);
        var d = s > 0 ? parseInt(s, 10) : 0;
        $(".frozen-sdiv").attr("style", "position:absolute;left:0;top:" + (parseInt(o, 10) + d + 1) + "px")
    }

    function t() {
        return $(window).width() - $("#grid-wrap").offset().left - 36 - 20
    }

    function i() {
        return $(window).height() - $("#grid").offset().top - 36 - 46
    }

    function a(e) {
        $(".no-query").remove(), $(".ui-print").show(), $("#grid").clearGridData(), e.ajaxPost("/report/deliverDetail.do?action=detail", s, function (e) {
            200 === e.status ? $("#grid").jqGrid("setGridParam", {
                    data: e.data.rows,
                    userData: e.data.userdata
                }).trigger("reloadGrid") : Public.tips({type: 1, content: e.msg})
        })
    }

    var r = parent.SYSTEM, s = $.extend({
        beginDate: "",
        endDate: "",
        goodsNo: "",
        storageNo: ""
    }, Public.urlParam()), n = Public.mod_PageConfig.init("goodsFlowDetail");
    !function () {
        Business.getSearchList(), Business.filterGoods(), Business.filterStorage(), $("#date,#storage,#goodsfilter,#goods,#chk-ischecked").show(), $("li#transType").appendTo("ul#filterItems").show(), $("#storage").insertBefore($("#goods")), $("#btn-print").hide(), $("#conditions-trigger").trigger("click"), s.beginDate && s.endDate && $("div.grid-subtitle").text("日期: " + s.beginDate + "至" + s.endDate), $("#filter-fromDate").val(s.beginDate), $("#filter-toDate").val(s.endDate), $("#filter-goods input").val(s.goodsNo), $("#filter-storage input").val(s.storageNo), Business.moreFilterEvent(), Public.dateCheck();
        var e = new Pikaday({field: $("#filter-fromDate")[0]}), t = new Pikaday({field: $("#filter-toDate")[0]}), i = Public.categoryTree($("#filterCat"), {
            rootTxt: "",
            width: 200
        });
        $("#filterCat").placeholder(), setTimeout(function () {
            $("span[id$=_1_span]").html("全部")
        }, 1e3), chkboxes = $("#chk-wrap").cssCheckbox(), $("#chk-ischecked").cssCheckbox(), chkischecked_val = 0, $(document).on("click", "#chk-ischecked", function () {
            $(this).find("input").is(":checked") ? chkischecked_val = 1 : chkischecked_val = 0
        }), $("#filter-submit").on("click", function (r) {
            r.preventDefault();
            var n = $("#filter-fromDate").val(), l = $("#filter-toDate").val(), o = e.getDate(), d = t.getDate();
            if (o.getTime() > d.getTime()) parent.Public.tips({type: 1, content: "开始日期不能大于结束日期"}); else {
                var u = [];
                $("li#transType input:checked").each(function (e, t) {
                    for (var i = t.id.split(","), a = 0; a < i.length; a++)u.push(i[a])
                }), s = {
                    beginDate: n,
                    endDate: l,
                    goodsNo: $("#filter-goods input").val() || "",
                    storageNo: $("#filter-storage input").val() || "",
                    catId: i.getValue(),
                    catName: i.getText(),
                    ischecked: chkischecked_val,
                    transTypeIds: u.toString()
                }, $("#selected-period").text(n + "至" + l), $("div.grid-subtitle").text("日期: " + n + " 至 " + l), chkVals = chkboxes.chkVal();
                for (var c = 0, g = chkVals.length; c < g; c++)s[chkVals[c]] = 1;
                a($(this))
            }
        }), $("#filter-reset").on("click", function (e) {
            e.preventDefault(), $("#filter-fromDate").val(""), $("#filter-toDate").val(""), $("#filter-goods input").val(""), $("#filter-storage input").val("")
        })
    }(), function () {
        var e = s.storage ? s.storage.split(",") : "", t = s.goods ? s.goods.split(",") : "", i = "";
        e && t ? i = "「您已选择了<b>" + e.length + "</b>个仓库，<b>" + t.length + "</b>个商品进行查询」" : e ? i = "「您已选择了<b>" + customer.length + "</b>个仓库进行查询」" : t && (i = "「您已选择了<b>" + t.length + "</b>个商品进行查询」"), $("#cur-search-tip").html(i)
    }(), $("#refresh").on("click", function (e) {
        e.preventDefault(), a()
    }), $("#btn-print").click(function (e) {
        e.preventDefault(), Business.verifyRight("DeliverDetailReport_PRINT") && $("div.ui-print").printTable()
    }), $("#btn-export").click(function (e) {
        if (e.preventDefault(), Business.verifyRight("DeliverDetailReport_EXPORT") && Business.noDataExportTips()) {
            var t = {};
            for (var i in s)s[i] && (t[i] = s[i]);
            Business.getFile("/report/deliverDetail.do?action=exporter", t)
        }
    }), $("#config").show().click(function (e) {
        n.config()
    }), function () {
        var t = !1, i = !1, a = "基本单位数量";
        1 === r.siType && (i = !0, a = "数量"), !1 !== r.isAdmin || r.rights.AMOUNT_COSTAMOUNT || (t = !0), !1 !== r.isAdmin || r.rights.AMOUNT_OUTAMOUNT, !1 !== r.isAdmin || r.rights.AMOUNT_INAMOUNT;
        var l = [{name: "assistName", label: "商品类别", width: 80, align: "center"}, {
            name: "invNo",
            label: "商品编号",
            frozen: !0,
            width: 80
        }, {name: "invName", label: "商品名称", frozen: !0, width: 200, classes: "ui-ellipsis", title: !0}, {
            name: "spec",
            label: "规格型号",
            frozen: !0,
            width: 60,
            align: "center"
        }, {name: "date", label: "日期", frozen: !0, width: 80, fixed: !0, align: "center"}, {
            name: "billNo",
            label: "单据号",
            frozen: !0,
            width: 120,
            fixed: !0,
            align: "center"
        }, {name: "billId", label: "销售ID", width: 0, hidden: !0}, {
            name: "billType",
            label: "销售类型",
            width: 0,
            hidden: !0
        }, {name: "transTypeId", label: "业务类别Id", width: 0, hidden: !0}, {
            name: "transType",
            label: "业务类别",
            width: 60,
            fixed: !0,
            align: "center"
        }, {name: "buName", label: "往来单位", width: 100, classes: "ui-ellipsis", title: !0}, {
            name: "location",
            label: "仓库",
            width: 60,
            classes: "ui-ellipsis",
            title: !0
        }, {name: "unit", label: "单位", frozen: !0, width: 50, fixed: !0, align: "center"}, {
            name: "desc",
            label: "备注",
            frozen: !0,
            width: 50,
            fixed: !0,
            align: "left"
        }, {name: "inqty", label: "入库数量", width: 80, fixed: !0, hidden: i, align: "right"}, {
            name: "baseInQty",
            label: a,
            width: 80,
            fixed: !0,
            align: "right"
        }, {name: "inunitCost", label: "单位成本", width: 80, fixed: !0, hidden: t, align: "right"}, {
            name: "incost",
            label: "成本",
            width: 80,
            fixed: !0,
            hidden: t,
            align: "right"
        }, {name: "outqty", label: "出库数量", width: 80, fixed: !0, hidden: i, align: "right"}, {
            name: "baseOutQty",
            label: a,
            width: 80,
            fixed: !0,
            align: "right"
        }, {name: "outunitCost", label: "单位成本", width: 80, fixed: !0, hidden: t, align: "right"}, {
            name: "outcost",
            label: "成本",
            width: 80,
            fixed: !0,
            hidden: t,
            align: "right"
        }, {name: "totalqty", label: a, width: 80, fixed: !0, align: "right"}, {
            name: "totalunitCost",
            label: "单位成本",
            width: 80,
            fixed: !0,
            hidden: t,
            align: "right"
        }, {name: "totalcost", label: "成本", width: 80, fixed: !0, hidden: t, align: "right"}];
        s.autoSearch, n.gridReg("grid", l), l = n.conf.grids.grid.colModel, $("#grid").jqGrid({
            url: "#",
            datatype: "local",
            autowidth: !0,
            gridview: !0,
            colModel: l,
            cmTemplate: {sortable: !1, title: !1},
            page: 1,
            pager: "#page",
            rowNum: 500,
            rowList: [500, 1e3, 2e3],
            viewrecords: !0,
            shrinkToFit: !1,
            forceFit: !0,
            footerrow: !0,
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
                var t = $("#grid").getRowData(e), i = t.billId, a = t.billType, r = t.transTypeId;
                switch (a) {
                    case"PUR":
                        if ("150502" == r) {
                            if (s = "150502", !Business.verifyRight("PUBACK_QUERY"))return;
                            parent.tab.addTabItem({
                                tabid: "purchase-purchaseBack",
                                text: "购货退货单",
                                url: "/purchase/purchase.jsp?id=" + i + "&transType=" + s
                            })
                        } else {
                            if (s = "150501", !Business.verifyRight("PU_QUERY"))return;
                            parent.tab.addTabItem({
                                tabid: "purchase-purchase",
                                text: "购货单",
                                url: "/purchase/purchase.jsp?id=" + i + "&transType=" + s
                            })
                        }
                        break;
                    case"SALE":
                        if ("150602" == r) {
                            if (s = "150602", !Business.verifyRight("SABACK_QUERY"))return;
                            parent.tab.addTabItem({
                                tabid: "sales-salesBack",
                                text: "销货退货单",
                                url: "/sales/sales.jsp?id=" + i + "&transType=" + s
                            })
                        } else {
                            var s = "150601";
                            if (!Business.verifyRight("SA_QUERY"))return;
                            parent.tab.addTabItem({
                                tabid: "sales-sales",
                                text: "销售单",
                                url: "/sales/sales.jsp?id=" + i + "&transType=" + s
                            })
                        }
                        break;
                    case"TRANSFER":
                        if (!Business.verifyRight("TF_QUERY"))return;
                        parent.tab.addTabItem({
                            tabid: "storage-transfers",
                            text: "调拨单",
                            url: "/storage/transfers.jsp?id=" + i
                        });
                        break;
                    case"OI":
                        if (!Business.verifyRight("IO_QUERY"))return;
                        parent.tab.addTabItem({
                            tabid: "storage-otherWarehouse",
                            text: "其他入库",
                            url: "/storage/other-warehouse.jsp?id=" + i
                        });
                        break;
                    case"OO":
                        if (!Business.verifyRight("OO_QUERY"))return;
                        parent.tab.addTabItem({
                            tabid: "storage-otherOutbound",
                            text: "其他出库",
                            url: "/storage/other-outbound.jsp?id=" + i
                        });
                        break;
                    case"CADJ":
                        if (!Business.verifyRight("CADJ_QUERY"))return;
                        parent.tab.addTabItem({
                            tabid: "storage-adjustment",
                            text: "成本调整单",
                            url: "/storage/adjustment.jsp?id=" + i
                        });
                        break;
                    case"ZZD":
                        if (!Business.verifyRight("ZZD_QUERY"))return;
                        parent.tab.addTabItem({
                            tabid: "storage-assemble",
                            text: "组装单",
                            url: "/storage/assemble.jsp?id=" + i
                        });
                        break;
                    case"CXD":
                        if (!Business.verifyRight("CXD_QUERY"))return;
                        parent.tab.addTabItem({
                            tabid: "storage-disassemble",
                            text: "拆卸单",
                            url: "/storage/disassemble.jsp?id=" + i
                        })
                }
            },
            loadComplete: function (t) {
                t && t.page > t.total && $("#grid").footerData("set", {
                    inqty: "",
                    baseInQty: "",
                    inunitCost: "",
                    outcost: "",
                    totalqty: "",
                    totalunitCost: "",
                    totalcost: ""
                });
                var i;
                if (t && t.data) {
                    var a = t.data.rows.length;
                    i = a ? 41 * a : 1
                }
                e(i)
            },
            gridComplete: function () {
                $("#grid").footerData("set", {
                    assistName: "合计:",
                    inqty: "",
                    outqty: ""
                }), $("table.ui-jqgrid-ftable").find('td[aria-describedby="grid_desc"]').prevUntil().css("border-right-color", "#fff")
            },
            resizeStop: function (e, t) {
                n.setGridWidthByIndex(e, t + 1, "grid")
            }
        }).jqGrid("setGroupHeaders", {
            useColSpanStyle: !0,
            groupHeaders: [{startColumnName: "inqty", numberOfColumns: 4, titleText: "入库"}, {
                startColumnName: "outqty",
                numberOfColumns: 4,
                titleText: "出库"
            }, {startColumnName: "totalqty", numberOfColumns: 3, titleText: "结存"}]
        }).jqGrid("setFrozenColumns"), "1" == urlParam.isJump && $("#filter-submit").trigger("click")
    }();
    var l;
    $(window).on("resize", function (t) {
        l || (l = setTimeout(function () {
            e(), l = null
        }, 50))
    })
});