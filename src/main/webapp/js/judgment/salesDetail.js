$(function () {
    function e(a) {
        a && (e.h = a);
        var r = t(), l = $(window).height() - $(".grid-wrap").offset().top - 65 - 150, o = i(), n = $("#grid"), s = $(".ui-jqgrid-htable").height();
        l > o && (l = o), r < n.width() && (l += 17), $("#grid-wrap").height(function () {
            return document.body.clientHeight - this.offsetTop - 36 - 5
        }), n.jqGrid("setGridHeight", l), n.jqGrid("setGridWidth", r);
        var d = l > 0 ? parseInt(l, 10) : 0;
        $(".frozen-sdiv").attr("style", "position:absolute;left:0;top:" + (parseInt(s, 10) + d + 1) + "px")
    }

    function t() {
        return $(window).width() - $("#grid-wrap").offset().left - 36 - 20
    }

    function i() {
        return $(window).height() - $("#grid").offset().top - 36 - 46
    }

    function a(t) {
        $(".no-query").remove(), $(".ui-print").show(), "number" == typeof t && ($("#grid").jqGrid(t ? "showCol" : "hideCol", ["unitCost", "cost", "saleProfit", "salepPofitRate"]), e(), $("#grid").clearGridData(!0)), $("#grid").jqGrid("setGridParam", {
            datatype: "json",
            postData: l,
            url: "/report/salesDetail.do?action=salesDetailList"
        }).trigger("reloadGrid")
    }

    var r = parent.SYSTEM, l = $.extend({
        beginDate: "",
        endDate: "",
        customerNo: "",
        goodsNo: "",
        storageNo: "",
        profit: "0",
        salesId: "",
        colModel: ""
    }, Public.urlParam()), o = Public.mod_PageConfig.init("salesDetail");
    !function () {
        Business.getSearchList(), Business.filterCustomer(), Business.filterGoods(), Business.filterStorage(), Business.filterSaler(), $("#date,#customer,#goods,#sales,#billNum,#filter,#goodsfilter,#storage,#chk-wrap").show(), $("#billNum label").text("单据编号:"), $("#filter label").text("客户类别"), $("#goodsfilter label").text("商品类别"), $("#chk-wrap .chk:eq(1)").hide(), $("#conditions-trigger").trigger("click"), $("#filter-fromDate").val(l.beginDate || ""), $("#filter-toDate").val(l.endDate || ""), $("#filter-customer input").val(l.customerNo || ""), $("#filter-goods input").val(l.goodsNo || ""), $("#filter-storage input").val(l.storageNo || ""), $("#filter-saler input").val(l.salesId || ""), l.beginDate && l.endDate && ($("#selected-period").text(l.beginDate + "至" + l.endDate), $("div.grid-subtitle").text("日期: " + l.beginDate + " 至 " + l.endDate)), $("#filter-fromDate, #filter-toDate").datepicker(), Business.moreFilterEvent(), Public.dateCheck();
        var e = parent.SYSTEM;
        e.rights.SAREPORTDETAIL_COST || e.isAdmin ? ($("#chk-wrap").show(), "1" === l.profit && $("#chk-wrap input").attr("checked", !0)) : $("#chk-wrap").hide();
        var t = $("#chk-wrap").cssCheckbox(), i = ($("#status-wrap").cssCheckbox(), $("#matchCon"));
        i.placeholder();
        var r = Public.categoryTree($("#catorage"), {
            typeNumber: "customertype",
            inputWidth: 198,
            height: 200,
            width: 188
        }), o = Public.categoryTree($("#filterCat"), {rootTxt: "", width: 200});
        $("#filter-submit").on("click", function (e) {
            e.preventDefault();
            var n = $("#filter-fromDate").val(), s = $("#filter-toDate").val(), d = 0 == r.getValue() ? -1 : r.getValue(), c = "请输入单号查询" === i.val() ? "" : $.trim(i.val());
            n && s && new Date(n).getTime() > new Date(s).getTime() ? parent.Public.tips({
                    type: 1,
                    content: "开始日期不能大于结束日期"
                }) : (l = {
                    beginDate: n,
                    endDate: s,
                    customerNo: $("#filter-customer input").val() || "",
                    goodsNo: $("#filter-goods input").val() || "",
                    storageNo: $("#filter-storage input").val() || "",
                    salesId: $("#filter-saler input").val() || "",
                    profit: t.chkVal().length > 0 ? "1" : "0",
                    billNo: c,
                    categoryId: d,
                    catId: o.getValue(),
                    catName: o.getText()
                }, $("#selected-period").text(n + "至" + s), $("div.grid-subtitle").text("日期: " + n + " 至 " + s), a(+l.profit))
        }), $("#filter-reset").on("click", function (e) {
            e.preventDefault(), $("#filter-fromDate").val(l.beginDate), $("#filter-toDate").val(l.endDate), $("#filter-customer input").val(""), $("#filter-goods input").val(""), $("#filter-storage input").val(""), $("#filter-saler input").val(""), t.chkNot()
        })
    }(), function () {
        var e = l.customer ? l.customer.split(",") : "", t = l.goods ? l.goods.split(",") : "", i = "";
        e && t ? i = "「您已选择了<b>" + e.length + "</b>个客户，<b>" + t.length + "</b>个商品进行查询」" : e ? i = "「您已选择了<b>" + e.length + "</b>个客户进行查询」" : t && (i = "「您已选择了<b>" + t.length + "</b>个商品进行查询」"), $("#cur-search-tip").html(i)
    }(), $("#refresh").on("click", function (e) {
        e.preventDefault(), a()
    }), $("#btn-print").click(function (e) {
        e.preventDefault(), Business.verifyRight("SAREPORTDETAIL_PRINT") && $("div.ui-print").printTable()
    }), $("#btn-export").click(function (e) {
        e.preventDefault(), Business.verifyRight("SAREPORTDETAIL_EXPORT") && Business.noDataExportTips() && (l.colModel = JSON.stringify($("#grid").jqGrid("getGridParam", "colModel")), Business.getFile("/report/salesDetail.do?action=detailExporter", l))
    }), $("#config").show().click(function (e) {
        o.config()
    }), function () {
        var t = !1, i = !0, a = !1;
        !1 !== r.isAdmin || r.rights.AMOUNT_OUTAMOUNT || (t = !0, a = !0), "1" === l.profit && (i = !1), 0 === r.taxRequiredCheck && (a = !0);
        var n = [{name: "date", label: "销售日期", width: 80, fixed: !0, align: "center"}, {
            name: "billId",
            label: "销售ID",
            width: 0,
            hidden: !0
        }, {name: "billNo", label: "销售单据号", width: 110, fixed: !0, align: "center"}, {
            name: "transType",
            label: "业务类别",
            width: 60,
            fixed: !0,
            align: "center"
        }, {name: "salesName", label: "销售人员", width: 80}, {
            name: "buName",
            label: "客户",
            width: 150,
            classes: "ui-ellipsis",
            title: !0
        }, {name: "assistName", label: "商品类别", width: 80, align: "center"}, {
            name: "invNo",
            label: "商品编号",
            width: 100
        }, {name: "invName", label: "商品名称", width: 200, classes: "ui-ellipsis", title: !0}, {
            name: "spec",
            label: "规格型号",
            width: 60
        }, {name: "unit", label: "单位", width: 50, fixed: !0, align: "center"}, {
            name: "location",
            label: "仓库",
            width: 60,
            classes: "ui-ellipsis",
            title: !0
        }, {name: "qty", label: "数量", width: 100, fixed: !0, align: "right"}, {
            name: "unitPrice",
            label: "单价",
            width: 100,
            fixed: !0,
            hidden: t,
            align: "right"
        }, {name: "amount", label: "销售收入", width: 100, fixed: !0, hidden: t, align: "right"}, {
            name: "tax",
            label: "税额",
            width: 100,
            align: "right",
            hidden: a
        }, {name: "taxAmount", label: "价税合计", width: 100, align: "right", hidden: a}, {
            name: "unitCost",
            label: "单位成本",
            width: 80,
            fixed: !0,
            hidden: i,
            align: "right"
        }, {name: "cost", label: "销售成本", width: 80, fixed: !0, hidden: i, align: "right"}, {
            name: "saleProfit",
            label: "销售毛利",
            width: 80,
            fixed: !0,
            hidden: i,
            align: "right"
        }, {
            name: "salepPofitRate",
            label: "毛利率",
            width: 80,
            fixed: !0,
            hidden: i,
            align: "right"
        }, {name: "description", label: "备注", width: 150, align: "left"}], s = "local", d = "#";
        l.autoSearch && (s = "json", d = "/report/salesDetail.do?action=salesDetailList"), o.gridReg("grid", n), n = o.conf.grids.grid.colModel, $("#grid").jqGrid({
            url: d,
            postData: l,
            datatype: s,
            autowidth: !0,
            gridview: !0,
            colModel: n,
            cmTemplate: {sortable: !1, title: !1},
            page: 1,
            sortname: "date",
            sortorder: "desc",
            pager: "#page",
            rowNum: 500,
            rowList: [500, 1e3, 2e3],
            viewrecords: !0,
            shrinkToFit: !1,
            forceFit: !0,
            footerrow: !0,
            userDataOnFooter: !0,
            cellLayout: 0,
            jsonReader: {
                root: "data.rows",
                records: "data.records",
                total: "data.total",
                userdata: "data.userdata",
                repeatitems: !1,
                id: "0"
            },
            ondblClickRow: function (e) {
                var t = $("#grid").getRowData(e), i = t.billId;
                if ("退货" == t.transType) {
                    if (a = "150602", !Business.verifyRight("SABACK_QUERY"))return;
                    parent.tab.addTabItem({
                        tabid: "sales-salesBack",
                        text: "销货退货单",
                        url: "/sales/sales.jsp?id=" + i + "&transType=" + a
                    })
                } else {
                    var a = "150601";
                    if (!Business.verifyRight("SA_QUERY"))return;
                    parent.tab.addTabItem({
                        tabid: "sales-sales",
                        text: "销货单",
                        url: "/sales/sales.jsp?id=" + i + "&transType=" + a
                    })
                }
            },
            loadComplete: function (t) {
                var i;
                if (t && t.data) {
                    var a = t.data.rows.length;
                    i = a ? 41 * a : 1
                }
                e(i)
            },
            gridComplete: function () {
                $("#grid").footerData("set", {date: "合计:"}), $("table.ui-jqgrid-ftable").find('td[aria-describedby="grid_location"]').prevUntil().css("border-right-color", "#fff")
            },
            resizeStop: function (e, t) {
                o.setGridWidthByIndex(e, t + 1, "grid")
            }
        }), l.autoSearch ? ($(".no-query").remove(), $(".ui-print").show()) : $(".ui-print").hide()
    }();
    var n;
    $(window).on("resize", function (t) {
        n || (n = setTimeout(function () {
            e(), n = null
        }, 50))
    })
});