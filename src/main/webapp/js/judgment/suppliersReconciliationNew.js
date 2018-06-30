$(function () {
    function e(e, t, a) {
        return a.skuName && (e = e + " " + a.skuName), e || "&#160;"
    }

    function t(e) {
        e && (t.h = e);
        var r = a(), n = $(window).height() - $(".grid-wrap").offset().top - 65 - 150, s = i(), o = $("#grid"), l = $(".ui-jqgrid-htable").height();
        n > s && (n = s), r < o.width() && (n += 17), $("#grid-wrap").height(function () {
            return document.body.clientHeight - this.offsetTop - 36 - 5
        }), o.jqGrid("setGridHeight", n), o.jqGrid("setGridWidth", r);
        var d = n > 0 ? parseInt(n, 10) : 0;
        $(".frozen-sdiv").attr("style", "position:absolute;left:0;top:" + (parseInt(l, 10) + d + 1) + "px")
    }

    function a() {
        return $(window).width() - $("#grid-wrap").offset().left - 36 - 20
    }

    function i() {
        return $(window).height() - $("#grid").offset().top - 36 - 46
    }

    function r(e) {
        if ($(".no-query").remove(), $(".ui-print").show(), void 0 !== e) {
            $("#grid").jqGrid(e ? "showCol" : "hideCol", ["assistName", "invNo", "invName", "spec", "unit", "qty", "price", "edisAmount", "eamount", "tax", "taxAmount", "edescription"]);
            for (var a = [], i = 0; i < h.length; i++)h[i].hidden && a.push(h[i].name);
            $("#grid").jqGrid("hideCol", a), t()
        }
        $("#grid").clearGridData(!0), $("#grid").jqGrid("setGridParam", {
            datatype: "json",
            postData: s,
            url: d
        }).trigger("reloadGrid")
    }

    var n = parent.SYSTEM, s = $.extend({
        beginDate: "",
        endDate: "",
        supplierId: "",
        supplierName: "",
        showDetail: ""
    }, Public.urlParam()), o = n.taxRequiredCheck;
    Business.getSearchList();
    var l = "/report/supplierBalance.do?action=exporter", d = "/report/supplierBalance.do?action=detail", c = $("#customerSale"), u = ($("#match"), $("#match").find("input"), u || {});
    u.$_customer = c, window.THISPAGE = u;
    var m = "（请选择购货单位）", p = Public.mod_PageConfig.init("suppliersReconciliation"), h = [];
    !function () {
        $("#companyName").html(n.companyName), $("#match").cssCheckbox(), $("#date,#saleCustomer,#match").show(), $("#saleCustomer label").text("购货单位"), $("#conditions-trigger").trigger("click"), "true" == s.showDetail && ($("#match").find("label").addClass("checked"), $("#match").find("input")[0].checked = !0), s.beginDate && s.endDate && $("div.grid-subtitle").text("日期: " + s.beginDate + "至" + s.endDate), $("#filter-fromDate").val(s.beginDate), $("#filter-toDate").val(s.endDate), $("#customerSale input").val(s.customerName), Business.supplierCombo($("#customerSale"), {
            defaultSelected: 0,
            addOptions: {text: m, value: 0}
        }), Business.moreFilterEvent(), Public.dateCheck();
        var e = new Pikaday({field: $("#filter-fromDate")[0]}), t = new Pikaday({field: $("#filter-toDate")[0]});
        $("#filter-submit").on("click", function (a) {
            a.preventDefault();
            var i = $("#customerSale input").val();
            if (i !== m && "" !== i) {
                var n = $("#filter-fromDate").val(), o = $("#filter-toDate").val(), l = e.getDate(), c = t.getDate(), u = window.THISPAGE.$_customer.data("contactInfo").id || "", p = window.THISPAGE.$_customer.data("contactInfo").name || "", h = $("#match").find("input")[0].checked ? "true" : "false", f = !!$("#match").find("input")[0].checked;
                l.getTime() > c.getTime() ? parent.Public.tips({type: 1, content: "开始日期不能大于结束日期"}) : (s = {
                        beginDate: n,
                        endDate: o,
                        supplierId: u,
                        supplierName: p,
                        showDetail: h
                    }, Public.ajaxPost(d, s, function (e) {
                        var t = e.data, a = t.name || "", i = t.telephone || "", r = t.mobile || "", s = t.province || "", l = t.city || "", d = t.county || "", c = t.deliveryAddress || "";
                        a = "<i>联系人：" + a, i = "</i><i>电话：" + i + r, address = "</i></p><p>地址：" + s + l + d + c, date = "<i class='fr'>日期: " + n + " 至 " + o + "</i></p>", $("div.grid-subtitle").html("<p>供应商：" + p + a + i + address + date)
                    }), r(f))
            } else parent.Public.tips({type: 1, content: m})
        }), $("#filter-reset").on("click", function (e) {
            e.preventDefault(), $("#filter-fromDate").val(""), $("#filter-toDate").val(""), $("#customerSale input").val("")
        })
    }(), $("#btn-print").click(function (e) {
        e.preventDefault(), Business.verifyRight("SUPPLIERBALANCE_PRINT") && $("div.ui-print").printTable()
    }), $("#btn-export").click(function (e) {
        if (e.preventDefault(), Business.verifyRight("SUPPLIERBALANCE_EXPORT") && Business.noDataExportTips()) {
            var t = {};
            for (var a in s)s[a] && (t[a] = s[a]);
            Business.getFile(l, t)
        }
    }), $("#customerSale").on("click", ".ui-icon-ellipsis", function (e) {
        if ($(this).data("hasInstance")) this.customerDialog.show().zindex(); else {
            var t = $("#customerSale").prev().text(), a = "选择" + t;
            if ("供应商" === t || "购货单位" === t) i = "url:/settings/select-customer.jsp?type=10&multiselect=false"; else var i = "url:/settings/select-customer.jsp?multiselect=false";
            this.customerDialog = $.dialog({
                width: 775,
                height: 510,
                title: a,
                content: i,
                data: {isDelete: 2},
                lock: !0,
                ok: function () {
                    return this.content.callback(), this.hide(), !1
                },
                cancel: function () {
                    return this.hide(), !1
                }
            }), $(this).data("hasInstance", !0)
        }
    }), $("#config").show().click(function (e) {
        p.config()
    }), function () {
        !1 !== n.isAdmin || n.rights.AMOUNT_COSTAMOUNT, !1 !== n.isAdmin || n.rights.AMOUNT_OUTAMOUNT, !1 !== n.isAdmin || n.rights.AMOUNT_INAMOUNT, h = [{
            name: "date",
            label: "单据日期",
            width: 80,
            align: "center"
        }, {name: "billNo", label: "单据编号", width: 200, align: "center"}, {
            name: "transType",
            label: "业务类别",
            width: 60,
            align: "center"
        }, {name: "itemTransType", label: "业务类别", width: 0, hidden: !0}, {
            name: "assistName",
            label: "商品类别",
            width: 50,
            align: "center"
        }, {name: "invNo", label: "商品编号", width: 50, align: "center"}, {
            name: "invName",
            label: "商品名称",
            formatter: e,
            width: 100,
            align: "center"
        }, {name: "spec", label: "规格型号", width: 120, align: "center"}, {
            name: "unit",
            label: "单位",
            width: 60,
            align: "center"
        }, {
            name: "qty",
            label: "数量",
            width: 80,
            align: "right",
            formatter: "currency",
            formatoptions: {thousandsSeparator: ",", decimalPlaces: Number(n.qtyPlaces)}
        }, {
            name: "price",
            label: "单价",
            width: 120,
            align: "right",
            formatter: "currency",
            formatoptions: {thousandsSeparator: ",", decimalPlaces: Number(n.pricePlaces)}
        }, {
            name: "edisAmount",
            label: "折扣额",
            width: 120,
            align: "right",
            formatter: "currency",
            formatoptions: {thousandsSeparator: ",", decimalPlaces: Number(n.pricePlaces)}
        }], o && h.push({
            name: "eamount",
            label: "不含税金额",
            width: 120,
            align: "right",
            formatter: "currency",
            formatoptions: {thousandsSeparator: ",", decimalPlaces: Number(n.pricePlaces)}
        }, {
            name: "tax",
            label: "税额",
            width: 70,
            fixed: !0,
            align: "right",
            formatter: "currency",
            decimalPlaces: Number(n.amountPlaces)
        }), h.push({
            name: "totalAmount",
            label: "采购金额",
            width: 120,
            align: "right",
            formatter: "currency",
            formatoptions: {thousandsSeparator: ",", decimalPlaces: Number(n.amountPlaces)}
        }, {
            name: "disAmount",
            label: "优惠金额",
            width: 80,
            align: "right",
            formatter: "currency",
            formatoptions: {thousandsSeparator: ",", decimalPlaces: Number(n.amountPlaces)}
        }, {
            name: "amount",
            label: "应付金额",
            width: 120,
            align: "right",
            formatter: "currency",
            formatoptions: {thousandsSeparator: ",", decimalPlaces: Number(n.amountPlaces)}
        }, {
            name: "rpAmount",
            label: "实际付款金额",
            width: 120,
            align: "right",
            formatter: "currency",
            formatoptions: {thousandsSeparator: ",", decimalPlaces: Number(n.amountPlaces)}
        }, {
            name: "inAmount",
            label: "应付款余额",
            width: 120,
            align: "right",
            formatter: "currency",
            formatoptions: {thousandsSeparator: ",", decimalPlaces: Number(n.amountPlaces)}
        }, {name: "billId", label: "", width: 0, hidden: !0}, {
            name: "billType",
            label: "",
            width: 0,
            hidden: !0
        }, {name: "description", label: "备注", width: 70, fixed: !0, align: "center"}, {
            name: "edescription",
            label: "分录备注",
            width: 70,
            fixed: !0,
            align: "center"
        });
        var a = "local", i = "#";
        s.autoSearch && (a = "json", i = d), p.gridReg("grid", h), h = p.conf.grids.grid.colModel, $("#grid").jqGrid({
            url: i,
            postData: s,
            datatype: a,
            autowidth: !0,
            height: "auto",
            gridview: !0,
            colModel: h,
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
            jsonReader: {root: "data.list", userdata: "data.total", repeatitems: !1, id: "0"},
            onCellSelect: function (e) {
                var t = $("#grid").getRowData(e), a = t.billId;
                switch (t.billType.toUpperCase()) {
                    case"PUR":
                        if ("采购退回" == t.transType || "采购退回" == t.itemTransType) {
                            if (!Business.verifyRight("PUBACK_QUERY"))return;
                            parent.tab.addTabItem({
                                tabid: "purchase-purchaseBack",
                                text: "购货退货单",
                                url: "/purchase/purchase.jsp?id=" + a
                            })
                        } else {
                            if (!Business.verifyRight("PU_QUERY"))return;
                            parent.tab.addTabItem({
                                tabid: "purchase-purchase",
                                text: "购货单",
                                url: "/purchase/purchase.jsp?id=" + a
                            })
                        }
                        break;
                    case"SALE":
                        if ("销售退回" == t.transType) {
                            if (!Business.verifyRight("SABACK_QUERY"))return;
                            parent.tab.addTabItem({
                                tabid: "sales-salesBack",
                                text: "销货退货单",
                                url: "/sales/sales.jsp?id=" + a
                            })
                        } else {
                            if (!Business.verifyRight("SA_QUERY"))return;
                            parent.tab.addTabItem({tabid: "sales-sales", text: "销货单", url: "/sales/sales.jsp?id=" + a})
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
                        if (!Business.verifyRight("SettAcct_QUERY", !1, "您没有账户管理相关权限哦！"))return;
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
                        if (!Business.verifyRight("SettAcct_QUERY", !1, "您没有账户管理相关权限哦！"))return;
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
            loadComplete: function (e) {
                var a;
                if (e && e.data) {
                    var i = e.data.list.length;
                    a = i ? 41 * i : 1
                }
                t(a)
            },
            gridComplete: function () {
                $("#grid").footerData("set", {date: "合计:"}), $("table.ui-jqgrid-ftable").find('td[aria-describedby="grid_transType"]').prevUntil().css("border-right-color", "#fff")
            },
            resizeStop: function (e, t) {
                p.setGridWidthByIndex(e, t + 1, "grid")
            }
        }), s.autoSearch ? ($(".no-query").remove(), $(".ui-print").show()) : $(".ui-print").hide()
    }();
    var f;
    $(window).on("resize", function (e) {
        f || (f = setTimeout(function () {
            t(), f = null
        }, 50))
    })
});