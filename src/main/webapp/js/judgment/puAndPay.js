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
            url: o
        }).trigger("reloadGrid")
    }

    var i = parent.SYSTEM, n = $.extend({
        beginDate: "",
        endDate: "",
        accountNo: "",
        colModel: ""
    }, Public.urlParam()), s = "/report/purAndPay.do?action=exporter", o = "/report/purAndPay.do?action=detail", l = Public.mod_PageConfig.init("purAndPay");
    !function () {
        Business.getSearchList(), Business.filterSupplier(), Business.filterSaler(), $("#matchCon").placeholder(), $("#date,#filter,#supplier,#billNum,#chk-blank").show(), $("#billNum label").text("采购单号"), $("#filter label").text("供应商类别"), $("#chk-blank i").text("付款率100%不显示");
        var e = $("#filter").clone();
        $("#filter").remove(), $("#customer").before(e), $("#conditions-trigger").trigger("click"), $("#filter-fromDate").val(n.beginDate || ""), $("#filter-toDate").val(n.endDate || ""), $("#filter-supplier input").val(n.customerNo || ""), $("#filter-customer input").val(n.customerNo || ""), n.beginDate && n.endDate && $("div.grid-subtitle").text("日期: " + n.beginDate + " 至 " + n.endDate), $("#filter-fromDate, #filter-toDate").datepicker(), Business.moreFilterEvent(), Public.dateCheck(), chkblank = $("#chk-blank").cssCheckbox();
        var t = Public.categoryTree($("#catorage"), {
            typeNumber: "supplytype",
            inputWidth: 122,
            height: 200,
            width: 112
        });
        $("#filter-submit").on("click", function (e) {
            e.preventDefault();
            var a = $("#filter-fromDate").val(), i = $("#filter-toDate").val(), s = 0 == t.getValue() ? -1 : t.getValue();
            a && i && new Date(a).getTime() > new Date(i).getTime() ? parent.Public.tips({
                    type: 1,
                    content: "开始日期不能大于结束日期"
                }) : (n = {
                    beginDate: a,
                    endDate: i,
                    accountNo: $("#supplierAuto").val() || "",
                    categoryId: s,
                    showFull: $("#chk-blank").find("input").is(":checked") ? abc = 1 : abc = 0,
                    billNo: "请输入单号查询" == $("#matchCon").val() ? "" : $.trim($("#matchCon").val())
                }, $("div.grid-subtitle").text("日期: " + a + " 至 " + i), r())
        })
    }(), $("#btn-print").click(function (e) {
        e.preventDefault(), Business.verifyRight("PURANDPAYDETAIL_PRINT") && $("div.ui-print").printTable()
    }), $("#btn-export").click(function (e) {
        e.preventDefault(), Business.verifyRight("PURANDPAYDETAIL_EXPORT") && Business.noDataExportTips() && (n.colModel = JSON.stringify($("#grid").jqGrid("getGridParam", "colModel")), Business.getFile(s, n))
    }), $("#config").show().click(function (e) {
        l.config()
    }), function (t) {
        !1 !== i.isAdmin || i.rights.AMOUNT_COSTAMOUNT, !1 !== i.isAdmin || i.rights.AMOUNT_OUTAMOUNT, !1 !== i.isAdmin || i.rights.AMOUNT_INAMOUNT;
        i.serviceType;
        var a = [{name: "FCUSTTYPE", label: "供应商类别", width: 150, align: "center"}, {
            name: "FCUSTNAME",
            label: "供应商",
            width: 150,
            align: "center"
        }, {name: "FTRANSTYPE", label: "业务类别Id", width: 0, hidden: !0}, {
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
            label: "采购金额",
            width: 100,
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
            name: "FRPAMOUNT",
            label: "本次付款",
            width: 100,
            align: "center",
            formatter: "currency",
            formatoptions: {thousandsSeparator: ",", decimalPlaces: Number(i.amountPlaces)}
        }, {
            name: "YSAMOUNT",
            label: "应付款余额",
            width: 100,
            align: "center",
            formatter: "currency",
            formatoptions: {thousandsSeparator: ",", decimalPlaces: Number(i.amountPlaces)}
        }, {name: "BACKRATE", label: "付款率", width: 100, align: "center"}, {
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
        }], r = "local", s = "#";
        n.autoSearch && (r = "json", s = o), l.gridReg("grid", a), a = l.conf.grids.grid.colModel, $("#grid").jqGrid({
            url: s,
            postData: n,
            datatype: r,
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
            jsonReader: {root: "data.list", userdata: "data.total", repeatitems: !1, id: "0"},
            onCellSelect: function (e) {
                var t = $("#grid").getRowData(e), a = t.FBILLID, r = t.FBILLTYPE.toUpperCase(), i = t.FTRANSTYPE;
                switch (r) {
                    case"PUR":
                        if ("150502" == i) {
                            if (n = "150502", !Business.verifyRight("PUBACK_QUERY"))return;
                            parent.tab.addTabItem({
                                tabid: "purchase-purchaseBack",
                                text: "购货退货单",
                                url: "/purchase/purchase.jsp?id=" + a + "&transType=" + n
                            })
                        } else {
                            if (n = "150501", !Business.verifyRight("PU_QUERY"))return;
                            parent.tab.addTabItem({
                                tabid: "purchase-purchase",
                                text: "购货单",
                                url: "/purchase/purchase.jsp?id=" + a + "&transType=" + n
                            })
                        }
                        break;
                    case"SALE":
                        if ("150602" == i) {
                            if (n = "150602", !Business.verifyRight("SABACK_QUERY"))return
                        } else {
                            var n = "150601";
                            if (!Business.verifyRight("SA_QUERY"))return
                        }
                        parent.tab.addTabItem({
                            tabid: "sales-sales",
                            text: "销售单",
                            url: "/sales/sales.jsp?id=" + a + "&transType=" + n
                        });
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
                    a = r ? 41 * r : 1
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
                l.setGridWidthByIndex(e, t + 1, "grid")
            }
        }), n.autoSearch ? ($(".no-query").remove(), $(".ui-print").show()) : $(".ui-print").hide(), "profitDetail" === t.fromType && $("#filter-submit").trigger("click")
    }(n);
    var d;
    $(window).on("resize", function (t) {
        d || (d = setTimeout(function () {
            e(), d = null
        }, 50))
    })
});