$(function () {
    function e(r) {
        r && (e.h = r);
        var i = t(), n = $(window).height() - $(".grid-wrap").offset().top - 65 - 150, s = a(), o = $("#grid"), l = $(".ui-jqgrid-htable").height();
        n > s && (n = s), i < o.width() && (n += 17), $("#grid-wrap").height(function () {
            return document.body.clientHeight - this.offsetTop - 36 - 5
        }), o.jqGrid("setGridHeight", n), o.jqGrid("setGridWidth", i);
        var d = n > 0 ? parseInt(n, 10) : 0;
        $(".frozen-sdiv").attr("style", "position:absolute;left:0;top:" + (parseInt(l, 10) + d + 1) + "px")
    }

    function t() {
        return $(window).width() - $("#grid-wrap").offset().left - 36 - 20
    }

    function a() {
        return $(window).height() - $("#grid").offset().top - 36 - 46
    }

    function r() {
        $(".no-query").remove(), $(".ui-print").show(), $("#grid").clearGridData(!0), $("#grid").jqGrid("setGridParam", {
            datatype: "json",
            postData: n,
            url: l
        }).trigger("reloadGrid")
    }

    var i = parent.SYSTEM, n = $.extend({
        beginDate: "",
        endDate: "",
        accountNo: "",
        colModel: ""
    }, Public.urlParam()), s = Public.urlParam(), o = "/report/saleAndReceipt.do?action=exporter", l = "/report/saleAndReceipt.do?action=detail", d = Public.mod_PageConfig.init("saleAndReceipt");
    !function () {
        Business.getSearchList(), Business.filterCustomer(), Business.filterSaler(), $("#matchCon").placeholder(), $("#date,#filter,#customer,#billNum,#sales,#status-wrap,#chk-blank").show(), $("#billNum label").text("销售单号"), $("#billNum input").css("width", "115px"), $("#filter label").text("客户类别"), $("#status-wrap label").hide(), $("#status-wrap .chk:eq(0) i").text("销货"), $("#status-wrap .chk:eq(1) i").text("退货"), $("#status-wrap .chk:eq(2)").hide(), $("#chk-blank i").text("回款率100%不显示"), $("#status-wrap").cssCheckbox();
        var e = $("#filter").clone();
        $("#filter").remove(), $("#customer").before(e), $("#conditions-trigger").trigger("click"), $("#filter-fromDate").val(n.beginDate || ""), $("#filter-toDate").val(n.endDate || ""), $("#filter-customer input").val(n.customerNo || ""), n.beginDate && n.endDate && $("div.grid-subtitle").text("日期: " + n.beginDate + " 至 " + n.endDate), $("#filter-fromDate, #filter-toDate").datepicker(), Business.moreFilterEvent(), Public.dateCheck(), chkblank = $("#chk-blank").cssCheckbox();
        var t = Public.categoryTree($("#catorage"), {
            typeNumber: "customertype",
            inputWidth: 198,
            height: 200,
            width: 188
        });
        $("#filter-submit").on("click", function (e) {
            e.preventDefault();
            var a = 0 == t.getValue() ? -1 : t.getValue(), i = $("#filter-fromDate").val(), s = $("#filter-toDate").val();
            i && s && new Date(i).getTime() > new Date(s).getTime() ? parent.Public.tips({
                    type: 1,
                    content: "开始日期不能大于结束日期"
                }) : (n = {
                    beginDate: i,
                    endDate: s,
                    accountNo: $("#customerAuto").val() || "",
                    categoryId: a,
                    sallGoods: $("#status-wrap .chk:eq(0) input").is(":checked") ? 1 : 0,
                    returnGoods: $("#status-wrap .chk:eq(1) input").is(":checked") ? 1 : 0,
                    showFull: $("#chk-blank").find("input").is(":checked") ? abc = 1 : abc = 0,
                    billNo: "请输入单号查询" == $("#matchCon").val() ? "" : $.trim($("#matchCon").val()),
                    saleman: $("#salerAuto").val()
                }, $("div.grid-subtitle").text("日期: " + i + " 至 " + s), r())
        })
    }(), $("#btn-print").click(function (e) {
        e.preventDefault(), Business.verifyRight("SALERECEIPTDETAIL_PRINT") && $("div.ui-print").printTable()
    }), $("#btn-export").click(function (e) {
        e.preventDefault(), Business.verifyRight("SALERECEIPTDETAIL_EXPORT") && Business.noDataExportTips() && (n.colModel = JSON.stringify($("#grid").jqGrid("getGridParam", "colModel")), Business.getFile(o, n))
    }), s.fromType && $("#filter-submit").trigger("click"), $("#config").show().click(function (e) {
        d.config()
    }), function (t) {
        var a = !1;
        !1 !== i.isAdmin || i.rights.AMOUNT_COSTAMOUNT, !1 !== i.isAdmin || i.rights.AMOUNT_OUTAMOUNT || (a = !0), !1 !== i.isAdmin || i.rights.AMOUNT_INAMOUNT;
        i.serviceType;
        var r = [{name: "FCUSTTYPE", label: "客户类别", width: 150, align: "center"}, {
            name: "FCUSTNAME",
            label: "客户",
            width: 150,
            align: "center"
        }, {name: "FEMPNAME", label: "销售员", width: 100, align: "center"}, {
            name: "FTRANSTYPENAME",
            label: "业务类别",
            width: 110,
            align: "center"
        }, {name: "FDATE", label: "单据日期", width: 110, align: "center"}, {
            name: "FBILLNO",
            label: "单据编号",
            width: 120,
            align: "center"
        }, {
            name: "FTOTALAMOUNT",
            label: "销售金额",
            width: 100,
            hidden: a,
            align: "center",
            formatter: "currency",
            formatoptions: {thousandsSeparator: ",", decimalPlaces: Number(i.amountPlaces)}
        }, {
            name: "FDISAMOUNT",
            label: "优惠金额",
            width: 100,
            align: "center",
            formatter: "currency",
            formatoptions: {thousandsSeparator: ",", decimalPlaces: Number(i.amountPlaces)}
        }, {
            name: "FAMOUNT",
            label: "优惠后金额",
            width: 100,
            align: "center",
            formatter: "currency",
            formatoptions: {thousandsSeparator: ",", decimalPlaces: Number(i.amountPlaces)}
        }, {
            name: "FPOSTFEE",
            label: "客户承担费用",
            width: 100,
            align: "center",
            formatter: "currency",
            formatoptions: {thousandsSeparator: ",", decimalPlaces: Number(i.amountPlaces)}
        }, {
            name: "FRPAMOUNT",
            label: "本次收款",
            width: 100,
            align: "center",
            formatter: "currency",
            formatoptions: {thousandsSeparator: ",", decimalPlaces: Number(i.amountPlaces)}
        }, {
            name: "YSAMOUNT",
            label: "应收款余额",
            width: 100,
            align: "center",
            formatter: "currency",
            formatoptions: {thousandsSeparator: ",", decimalPlaces: Number(i.amountPlaces)}
        }, {name: "BACKRATE", label: "回款率", width: 100, align: "center"}, {
            name: "FDESC",
            label: "备注",
            width: 200,
            align: "center"
        }, {name: "FBILLID", label: "", width: 0, align: "center", hidden: !0}, {
            name: "FBILLTYPE",
            label: "",
            width: 0,
            align: "center",
            hidden: !0
        }], s = "local", o = "#";
        n.autoSearch && (s = "json", o = l), d.gridReg("grid", r), r = d.conf.grids.grid.colModel, $("#grid").jqGrid({
            url: o,
            postData: n,
            datatype: s,
            autowidth: !0,
            gridview: !0,
            colModel: r,
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
            userData: {location: " "},
            jsonReader: {root: "data.list", userdata: "data.total", repeatitems: !1, id: "0"},
            onCellSelect: function (e) {
                var t = $("#grid").getRowData(e), a = t.FBILLID, r = t.FBILLTYPE.toUpperCase(), i = t.FTRANSTYPENAME;
                switch (r) {
                    case"PUR":
                        if (!Business.verifyRight("PU_QUERY"))return;
                        parent.tab.addTabItem({
                            tabid: "purchase-purchase",
                            text: "购货单",
                            url: "/purchase/purchase.jsp?id=" + a
                        });
                        break;
                    case"SALE":
                        if ("销售退回" == i) {
                            if (n = "150602", !Business.verifyRight("SABACK_QUERY"))return;
                            parent.tab.addTabItem({
                                tabid: "sales-salesBack",
                                text: "销货退货单",
                                url: "/sales/sales.jsp?id=" + a + "&transType=" + n
                            })
                        } else {
                            var n = "150601";
                            if (!Business.verifyRight("SA_QUERY"))return;
                            parent.tab.addTabItem({
                                tabid: "sales-sales",
                                text: "销货单",
                                url: "/sales/sales.jsp?id=" + a + "&transType=" + n
                            })
                        }
                        break;
                    case"TRANSFER":
                        if (!Business.verifyRight("TF_QUERY"))return;
                        parent.tab.addTabItem({
                            tabid: "storage-transfers",
                            text: "调拨单",
                            url: "/storage/transfers.jsp?id=" + a
                        });
                        break;
                    case"OI":
                        if (!Business.verifyRight("IO_QUERY"))return;
                        parent.tab.addTabItem({
                            tabid: "storage-otherWarehouse",
                            text: "其他入库",
                            url: "/storage/other-warehouse.jsp?id=" + a
                        });
                        break;
                    case"OO":
                        if (!Business.verifyRight("OO_QUERY"))return;
                        parent.tab.addTabItem({
                            tabid: "storage-otherOutbound",
                            text: "其他出库",
                            url: "/storage/other-outbound.jsp?id=" + a
                        });
                        break;
                    case"CADJ":
                        if (!Business.verifyRight("CADJ_QUERY"))return;
                        parent.tab.addTabItem({
                            tabid: "storage-adjustment",
                            text: "成本调整单",
                            url: "/storage/adjustment.jsp?id=" + a
                        });
                        break;
                    case"PAYMENT":
                        if (!Business.verifyRight("PAYMENT_QUERY"))return;
                        parent.tab.addTabItem({tabid: "money-payment", text: "付款单", url: "/money/payment.jsp?id=" + a});
                        break;
                    case"VERIFICA":
                        if (!Business.verifyRight("VERIFICA_QUERY"))return;
                        parent.tab.addTabItem({
                            tabid: "money-verifica",
                            text: "核销单",
                            url: "/money/verification.jsp?id=" + a
                        });
                        break;
                    case"RECEIPT":
                        if (!Business.verifyRight("RECEIPT_QUERY"))return;
                        parent.tab.addTabItem({tabid: "money-receipt", text: "收款单", url: "/money/receipt.jsp?id=" + a});
                        break;
                    case"QTSR":
                        if (!Business.verifyRight("QTSR_QUERY"))return;
                        parent.tab.addTabItem({
                            tabid: "money-otherIncome",
                            text: "其它收入单",
                            url: "/money/other-income.jsp?id=" + a
                        });
                        break;
                    case"QTZC":
                        if (!Business.verifyRight("QTZC_QUERY"))return;
                        parent.tab.addTabItem({
                            tabid: "money-otherExpense",
                            text: "其它支出单",
                            url: "/money/other-expense.jsp?id=" + a
                        })
                }
            },
            loadComplete: function (t) {
                var a;
                if (t && t.data) {
                    var r = t.data.list.length;
                    a = r ? 31 * r : 1
                }
                e(a)
            },
            gridComplete: function () {
                $("#grid").footerData("set", {
                    FCUSTTYPE: "合计:",
                    FBILLNO: ""
                }), $("table.ui-jqgrid-ftable").find('td[aria-describedby="grid_FBILLNO"]').prevUntil().css("border-right-color", "#fff");
                for (var e = $("#grid").jqGrid("getRowData"), t = 0; t < e.length; t++)"小计" == e[t].FBILLNO && $("tr[id=" + (t + 1) + "]").find("td").css("font-weight", "bold")
            },
            resizeStop: function (e, t) {
                d.setGridWidthByIndex(e, t + 1, "grid")
            }
        }), n.autoSearch ? ($(".no-query").remove(), $(".ui-print").show()) : $(".ui-print").hide()
    }(), function (e) {
        "profitDetail" === e.fromType && $("#filter-submit").trigger("click")
    }(s);
    var c;
    $(window).on("resize", function (t) {
        c || (c = setTimeout(function () {
            e(), c = null
        }, 50))
    })
});