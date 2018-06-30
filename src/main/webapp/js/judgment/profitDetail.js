$(function () {
    function e(e, t, a) {
        if (void 0 === e)return "";
        var i = e;
        switch (e.split("&nbsp;").pop()) {
            case"销售收入":
                i = "<a title='销货单的不含税金额-销货退货单的不含税金额'>" + e + "</a>";
                break;
            case"减: 销售优惠金额":
                i = "<a title='销货单的优惠金额-销货退货单的优惠金额'>" + e + "</a>";
                break;
            case"减: 收款折扣":
                i = "<a title='收款单整单折扣'>" + e + "</a>";
                break;
            case"销售成本":
                i = "<a title='本期销售商品的数量*单位成本'>" + e + "</a>";
                break;
            case"减: 购货优惠金额":
                i = "<a title='购货单的优惠金额-购货退货单的优惠金额'>" + e + "</a>";
                break;
            case"减: 付款折扣":
                i = "<a title='付款单整单折扣'>" + e + "</a>";
                break;
            case"盘盈盘亏":
                i = "<a title='盘盈单入库成本-盘亏单出库成本'>" + e + "</a>";
                break;
            case"其它业务利润":
                i = "<a title='其他收入-其他支出'>" + e + "</a>";
                break;
            case"净利润":
                i = "<a title='主营业务利润+其他业务利润'>" + e + "</a>";
                break;
            case"其它支出":
                i = "<a title='来源于其它支出单；若某笔其它支出单的费用已在购货单中分摊入商品成本，则在此处不重复计算'>" + e + "</a>";
                break;
            case"其它收入":
                i = "<a title='来源于其它收入单'>" + e + "</a>"
        }
        return i
    }

    function t(e) {
        e && (t.h = e);
        var r = a(), n = $(window).height() - $(".grid-wrap").offset().top - 65 - 150, o = i(), s = $("#grid"), d = $(".ui-jqgrid-htable").height();
        n > o && (n = o), r < s.width() && (n += 17), $("#grid-wrap").height(function () {
            return document.body.clientHeight - this.offsetTop - 36 - 5
        }), s.jqGrid("setGridHeight", n), s.jqGrid("setGridWidth", r);
        var l = n > 0 ? parseInt(n, 10) : 0;
        $(".frozen-sdiv").attr("style", "position:absolute;left:0;top:" + (parseInt(d, 10) + l + 1) + "px")
    }

    function a() {
        return $(window).width() - $("#grid-wrap").offset().left - 36 - 20
    }

    function i() {
        return $(window).height() - $("#grid").offset().top - 36 - 46
    }

    function r() {
        $(".no-query").remove(), $(".ui-print").show(), $("#grid").clearGridData(!0), $("#grid").jqGrid("setGridParam", {
            datatype: "json",
            postData: o,
            url: d
        }).trigger("reloadGrid")
    }

    function n(e) {
        var t = "";
        switch (e) {
            case"saleIncome":
            case"saleCost":
                t = "salesSummary";
                break;
            case"saleFavAmount":
                t = "saleAndReceiptDetail";
                break;
            case"receiptDiscount":
                t = "receiptList";
                break;
            case"purFavAmount":
                t = "puAndPayDetail";
                break;
            case"paymentDiscount":
                t = "paymentList";
                break;
            case"pdAmount":
                t = "goodsFlowSummary";
                break;
            case"osr":
            case"ozc":
                t = "otherIncomeExpenseDetail"
        }
        switch (t) {
            case"salesSummary":
                if (!Business.verifyRight("SAREPORTINV_QUERY"))return;
                parent.tab.addTabItem({
                    tabid: "report-salesSummary",
                    text: "销售汇总表（按商品）",
                    url: "/report/sales-summary.jsp?beginDate=" + o.beginDate + "&endDate=" + o.endDate + "&fromType=profitDetail"
                });
                break;
            case"saleAndReceiptDetail":
                if (!Business.verifyRight("SALERECEIPTDETAIL_QUERY"))return;
                parent.tab.addTabItem({
                    tabid: "report-saleAndReceiptDetail",
                    text: "销售收款一览表",
                    url: "/report/sale-receipt-detail.jsp?beginDate=" + o.beginDate + "&endDate=" + o.endDate + "&fromType=profitDetail"
                });
                break;
            case"receiptList":
                if (!Business.verifyRight("RECEIPT_QUERY"))return;
                parent.tab.addTabItem({
                    tabid: "money-receiptList",
                    text: "收款单记录",
                    url: "/scm/receipt.do?action=initReceiptList&beginDate=" + o.beginDate + "&endDate=" + o.endDate + "&fromType=profitDetail"
                });
                break;
            case"puAndPayDetail":
                if (!Business.verifyRight("PURANDPAYDETAIL_QUERY"))return;
                parent.tab.addTabItem({
                    tabid: "report-puAndPayDetail",
                    text: "采购付款一览表",
                    url: "/report/pu-pay-detail.jsp?beginDate=" + o.beginDate + "&endDate=" + o.endDate + "&fromType=profitDetail"
                });
                break;
            case"paymentList":
                if (!Business.verifyRight("PAYMENT_QUERY"))return;
                parent.tab.addTabItem({
                    tabid: "money-paymentList",
                    text: "付款单记录",
                    url: "/scm/payment.do?action=initPayList&beginDate=" + o.beginDate + "&endDate=" + o.endDate + "&fromType=profitDetail"
                });
                break;
            case"goodsFlowSummary":
                if (!Business.verifyRight("DeliverSummaryReport_QUERY"))return;
                parent.tab.addTabItem({
                    tabid: "report-goodsFlowSummary",
                    text: "商品收发汇总表",
                    url: "/report/goods-flow-summary.jsp?beginDate=" + o.beginDate + "&endDate=" + o.endDate + "&fromType=profitDetail"
                });
                break;
            case"otherIncomeExpenseDetail":
                if (!Business.verifyRight("ORIDETAIL_QUERY"))return;
                parent.tab.addTabItem({
                    tabid: "report-otherIncomeExpenseDetail",
                    text: "其他收支明细表",
                    url: "/report/other-income-expense-detail.jsp?beginDate=" + o.beginDate + "&endDate=" + o.endDate + "&fromType=profitDetail"
                })
        }
    }

    parent.SYSTEM;
    var o = $.extend({
        beginDate: "",
        endDate: ""
    }, Public.urlParam()), s = Number(parent.SYSTEM.amountPlaces), d = "/report/profitDetail.do?action=detail", l = "/report/profitDetail.do?action=export", c = Public.mod_PageConfig.init("profitDetail");
    Business.getSearchList(), $("#date").show(), $("#conditions-trigger").trigger("click"), $("#filter-fromDate").val(o.beginDate || ""), $("#filter-toDate").val(o.endDate || ""), o.beginDate && o.endDate && $("div.grid-subtitle").text("日期: " + o.beginDate + " 至 " + o.endDate), $("#filter-fromDate, #filter-toDate").datepicker(), Public.dateCheck(), Business.moreFilterEvent(), $("#filter-submit").on("click", function (e) {
        if (e.preventDefault(), Business.verifyRight("PROFITREPORTDETAIL_QUERY")) {
            var t = $("#filter-fromDate").val(), a = $("#filter-toDate").val();
            t && a && new Date(t).getTime() > new Date(a).getTime() ? parent.Public.tips({
                    type: 1,
                    content: "开始日期不能大于结束日期"
                }) : (o.beginDate = t, o.endDate = a, $("div.grid-subtitle").text("日期: " + t + " 至 " + a), r())
        }
    }), $("#btn-print").click(function (e) {
        e.preventDefault(), Business.verifyRight("PROFITREPORTDETAIL_PRINT") && $("div.ui-print").printTable()
    }), $("#btn-export").click(function (e) {
        if (e.preventDefault(), Business.verifyRight("PROFITREPORTDETAIL_EXPORT") && Business.noDataExportTips()) {
            var t = {};
            for (var a in o)o[a] && (t[a] = o[a]);
            Business.getFile(l, t)
        }
    }), $("#config").show().click(function (e) {
        c.config()
    }), function () {
        var a = [{name: "itemName", label: "项目", width: 300, formatter: e}, {
            name: "rowNo",
            label: "行次",
            width: 80,
            align: "center"
        }, {
            name: "amount",
            label: "金额",
            width: 100,
            align: "right",
            formatter: "currency",
            formatoptions: {showZero: !0, decimalPlaces: s}
        }, {name: "amountType", label: "类型", width: 0, hidden: !0}], i = "local", r = "#";
        o.autoSearch && (i = "json", r = d), c.gridReg("grid", a), a = c.conf.grids.grid.colModel, $("#grid").jqGrid({
            url: r,
            postData: o,
            datatype: i,
            autowidth: !0,
            gridview: !0,
            colModel: a,
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
            userDataOnFooter: !0,
            cellLayout: 0,
            jsonReader: {root: "data.rows", userdata: "data.userdata", repeatitems: !1, id: "0"},
            onCellSelect: function (e) {
            },
            loadComplete: function (e) {
                var a;
                if (e && e.data) {
                    var i = e.data.rows.length;
                    a = i ? 41 * i : 1
                }
                t(a), $('td[role="gridcell"] a').each(function (e, t) {
                    var a = $(t).closest("tr").attr("id"), i = $("#grid").getRowData(a).amountType;
                    void 0 !== i && 0 !== i.length && ($(t).addClass("item-name"), $(t).click(function (e) {
                        n(i)
                    }))
                })
            },
            resizeStop: function (e, t) {
                c.setGridWidthByIndex(e, t + 1, "grid")
            }
        }), o.autoSearch ? ($(".no-query").remove(), $(".ui-print").show()) : $(".ui-print").hide()
    }();
    var p;
    $(window).on("resize", function (e) {
        p || (p = setTimeout(function () {
            t(), p = null
        }, 50))
    })
});