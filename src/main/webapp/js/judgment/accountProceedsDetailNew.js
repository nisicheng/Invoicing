$(function () {
    function e(r) {
        r && (e.h = r);
        var i = t(), n = $(window).height() - $(".grid-wrap").offset().top - 65 - 150, s = a(), o = $("#grid"), d = $(".ui-jqgrid-htable").height();
        n > s && (n = s), i < o.width() && (n += 17), $("#grid-wrap").height(function () {
            return document.body.clientHeight - this.offsetTop - 36 - 5
        }), o.jqGrid("setGridHeight", n), o.jqGrid("setGridWidth", i);
        var l = n > 0 ? parseInt(n, 10) : 0;
        $(".frozen-sdiv").attr("style", "position:absolute;left:0;top:" + (parseInt(d, 10) + l + 1) + "px")
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
        accountNo: ""
    }, Public.urlParam()), s = "/report/fundBalance.do?action=exporter", o = "/report/fundBalance.do?action=detail", d = Public.mod_PageConfig.init("accountProceeDetailNew");
    Business.getSearchList(), Business.filterCustomer(), $("#date,#filter,#customer,#chk-blank").show(), $("#filter label").text("客户类别"), $("#chk-blank i").text("不显示无欠款客户"), $("#conditions-trigger").trigger("click"), $("#filter-fromDate").val(n.beginDate || ""), $("#filter-toDate").val(n.endDate || ""), $("#filter-customer input").val(n.customerNo || ""), n.beginDate && n.endDate && $("div.grid-subtitle").text("日期: " + n.beginDate + " 至 " + n.endDate), $("#filter-fromDate, #filter-toDate").datepicker(), Business.moreFilterEvent(), Public.dateCheck(), chkblank = $("#chk-blank").cssCheckbox(), categoryTree = Public.categoryTree($("#catorage"), {
        typeNumber: "customertype",
        inputWidth: 174,
        height: 147,
        width: 164
    }), $("#filter-submit").on("click", function (e) {
        e.preventDefault();
        var t = $("#filter-fromDate").val(), a = $("#filter-toDate").val(), i = 0 == categoryTree.getValue() ? -1 : categoryTree.getValue();
        t && a && new Date(t).getTime() > new Date(a).getTime() ? parent.Public.tips({
                type: 1,
                content: "开始日期不能大于结束日期"
            }) : (n = {
                beginDate: t,
                endDate: a,
                accountNo: $("#customerAuto").val() || "",
                categoryId: i,
                showBlank: chkblank.chkVal().length > 0 ? "1" : "0"
            }, $("div.grid-subtitle").text("日期: " + t + " 至 " + a), r())
    }), $("#btn-print").click(function (e) {
        e.preventDefault(), Business.verifyRight("RECEIPTDETAIL_PRINT") && $("div.ui-print").printTable()
    }), $("#btn-export").click(function (e) {
        if (e.preventDefault(), Business.verifyRight("RECEIPTDETAIL_EXPORT") && Business.noDataExportTips()) {
            var t = {};
            for (var a in n)n[a] && (t[a] = n[a]);
            Business.getFile(s, t)
        }
    }), $("#config").show().click(function (e) {
        d.config()
    }), function () {
        !1 !== i.isAdmin || i.rights.AMOUNT_COSTAMOUNT, !1 !== i.isAdmin || i.rights.AMOUNT_OUTAMOUNT, !1 !== i.isAdmin || i.rights.AMOUNT_INAMOUNT;
        i.serviceType;
        var t = [{name: "buName", label: "客户", width: 150, align: "center"}, {
            name: "date",
            label: "单据日期",
            width: 100,
            align: "center"
        }, {name: "billNo", label: "单据编号", width: 110, align: "center"}, {
            name: "transType",
            label: "业务类型",
            width: 110,
            align: "center"
        }, {
            name: "income",
            label: "增加应收款",
            width: 120,
            align: "right",
            formatter: "currency",
            formatoptions: {thousandsSeparator: ",", decimalPlaces: Number(i.amountPlaces)}
        }, {
            name: "expenditure",
            label: "增加预收款",
            width: 120,
            align: "right",
            formatter: "currency",
            formatoptions: {thousandsSeparator: ",", decimalPlaces: Number(i.amountPlaces)}
        }, {
            name: "balance",
            label: "应收款余额",
            width: 120,
            align: "right",
            formatter: "currency",
            formatoptions: {thousandsSeparator: ",", decimalPlaces: Number(i.amountPlaces)}
        }, {name: "description", label: "备注", width: 210, align: "center"}, {
            name: "billId",
            label: "",
            width: 0,
            align: "center",
            hidden: !0
        }, {name: "billTypeNo", label: "", width: 0, align: "center", hidden: !0}], a = "local", r = "#";
        n.autoSearch && (a = "json", r = o), d.gridReg("grid", t), t = d.conf.grids.grid.colModel, $("#grid").jqGrid({
            url: r,
            postData: n,
            datatype: a,
            autowidth: !0,
            gridview: !0,
            colModel: t,
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
                var t = $("#grid").getRowData(e), a = t.billId, r = t.billTypeNo.toUpperCase(), i = t.transType;
                switch (r) {
                    case"PUR":
                        if ("采购退回" == i) {
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
                        if ("销售退回" == t.transType) {
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
                    a = r ? 41 * r : 1
                }
                e(a)
            },
            gridComplete: function () {
                $("#grid").footerData("set", {buName: "合计:"}), $("table.ui-jqgrid-ftable").find('td[aria-describedby="grid_transType"]').prevUntil().css("border-right-color", "#fff")
            },
            resizeStop: function (e, t) {
                d.setGridWidthByIndex(e, t + 1, "grid")
            }
        }), n.autoSearch ? ($(".no-query").remove(), $(".ui-print").show()) : $(".ui-print").hide()
    }();
    var l;
    $(window).on("resize", function (t) {
        l || (l = setTimeout(function () {
            e(), l = null
        }, 50))
    })
});