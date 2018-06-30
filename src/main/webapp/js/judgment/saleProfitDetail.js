$(function () {
    function e(a) {
        a && (e.h = a);
        var n = t(), r = $(window).height() - $(".grid-wrap").offset().top - 65 - 150, l = i(), o = $("#grid"), d = $(".ui-jqgrid-htable").height();
        r > l && (r = l), n < o.width() && (r += 17), $("#grid-wrap").height(function () {
            return document.body.clientHeight - this.offsetTop - 36 - 5
        }), o.jqGrid("setGridHeight", r), o.jqGrid("setGridWidth", n);
        var s = r > 0 ? parseInt(r, 10) : 0;
        $(".frozen-sdiv").attr("style", "position:absolute;left:0;top:" + (parseInt(d, 10) + s + 1) + "px")
    }

    function t() {
        return $(window).width() - $("#grid-wrap").offset().left - 36 - 20
    }

    function i() {
        return $(window).height() - $("#grid").offset().top - 36 - 46
    }

    function a(t) {
        if ($(".no-query").remove(), $(".ui-print").show(), void 0 !== t) {
            c = !!t;
            var i = ["invCategory", "invNo", "invName", "invSpec", "invUnit", "price", "unitCost"], a = ["BatchNo", "proDate"], o = ["taxPrice"];
            r.ISWARRANTY && (i = i.concat(a)), r.taxRequiredCheck && (i = i.concat(o)), $("#grid").jqGrid(t ? "showCol" : "hideCol", i), e()
        }
        $.each(n, function (e, a) {
            -1 !== $.inArray(a.name, i) && (a.hideDefault = !t, a.hidden = !t)
        }), h.gridReg("grid", n), $("#grid").clearGridData(!0), $("#grid").jqGrid("setGridParam", {
            datatype: "json",
            postData: l,
            url: s
        }).trigger("reloadGrid")
    }

    var n, r = parent.SYSTEM, l = $.extend({
        beginDate: "",
        endDate: "",
        accountNo: ""
    }, Public.urlParam()), o = Public.urlParam(), d = "/report/salesProfit.do?action=exporter", s = "/report/salesProfit.do?action=detail", h = Public.mod_PageConfig.init("saleAndReceipt"), c = !1;
    !function () {
        Business.getSearchList(), Business.filterCustomer(), Business.filterSaler(), $("#matchCon").placeholder(), $("#date,#filter,#customer,#billNum,#sales,#status-wrap,#chk-blank").show(), $("#btn-print").hide(), $("#billNum label").text("销售单号"), $("#filter label").text("客户类别"), $("#status-wrap label").hide(), $("#status-wrap .chk:eq(0) i").text("销货"), $("#status-wrap .chk:eq(1) i").text("退货"), $("#status-wrap .chk:eq(2)").hide(), $("#chk-blank i").text("是否显示商品明细"), $("#status-wrap").cssCheckbox();
        var e = $("#filter").clone();
        $("#filter").remove(), $("#customer").before(e), $("#conditions-trigger").trigger("click"), $("#filter-fromDate").val(l.beginDate || ""), $("#filter-toDate").val(l.endDate || ""), $("#filter-customer input").val(l.customerNo || ""), l.beginDate && l.endDate && $("div.grid-subtitle").text("日期: " + l.beginDate + " 至 " + l.endDate), $("#filter-fromDate, #filter-toDate").datepicker(), Public.dateCheck(), Business.moreFilterEvent(), chkblank = $("#chk-blank").cssCheckbox();
        var t = Public.categoryTree($("#catorage"), {
            typeNumber: "customertype",
            inputWidth: 198,
            height: 200,
            width: 188
        });
        $("#filter-submit").on("click", function (e) {
            e.preventDefault();
            var i = 0 == t.getValue() ? -1 : t.getValue(), n = $("#filter-fromDate").val(), r = $("#filter-toDate").val();
            n && r && new Date(n).getTime() > new Date(r).getTime() ? parent.Public.tips({
                    type: 1,
                    content: "开始日期不能大于结束日期"
                }) : (l = {
                    beginDate: n,
                    endDate: r,
                    accountNo: $("#customerAuto").val() || "",
                    categoryId: i,
                    sallGoods: $("#status-wrap .chk:eq(0) input").is(":checked") ? 1 : 0,
                    returnGoods: $("#status-wrap .chk:eq(1) input").is(":checked") ? 1 : 0,
                    showDetail: $("#chk-blank").find("input").is(":checked") ? 1 : 0,
                    billNo: "请输入单号查询" == $("#matchCon").val() ? "" : $.trim($("#matchCon").val()),
                    saleman: $("#salerAuto").val()
                }, $("div.grid-subtitle").text("日期: " + n + " 至 " + r), a(l.showDetail))
        })
    }(), $("#btn-export").click(function (e) {
        if (e.preventDefault(), Business.verifyRight("SALESPROFIT_EXPORT") && Business.noDataExportTips()) {
            var t = {}, i = [];
            for (var a in l)l[a] && (t[a] = l[a]);
            $.each(n, function (e, t) {
                var a = t.name, l = new RegExp("BatchNo|proDate"), o = new RegExp("taxPrice"), d = new RegExp("invCategory|invNo|invName|invSpec|invUnit|price|taxPrice|BatchNo|proDate|unitCost"), s = r.ISWARRANTY && l.test(a), h = r.taxRequiredCheck && o.test(a);
                if (!t.hidden && (c && (s || h) || c || !d.test(a))) {
                    var g = {title: n[e].label, property: n[e].name};
                    i.push(g)
                }
            }), t.userdata = JSON.stringify(i), Business.getFile(d, t)
        }
    }), o.fromType && $("#filter-submit").trigger("click"), $("#config").show().click(function (e) {
        h.config()
    }), function (t) {
        var i = !1, a = !1;
        r.taxRequiredCheck || (i = !0), r.ISWARRANTY || (a = !0);
        r.serviceType;
        n = [{name: "date", label: "单据日期", width: 150, align: "center", frozen: !0}, {
            name: "custName",
            label: "客户",
            width: 150,
            align: "left",
            frozen: !0
        }, {name: "empName", label: "销售人员", width: 100, align: "center", frozen: !0}, {
            name: "billNo",
            label: "单据编号",
            width: 110,
            align: "center",
            frozen: !0
        }, {name: "transTypeName", label: "业务类别", width: 80, align: "center", frozen: !0}, {
            name: "invCategory",
            label: "商品类别",
            width: 120,
            align: "center",
            hideDefault: !0,
            hidden: !0
        }, {name: "invNo", label: "商品编号", width: 100, hideDefault: !0, hidden: !0}, {
            name: "invName",
            label: "商品名称",
            width: 100,
            align: "center",
            hideDefault: !0,
            hidden: !0
        }, {name: "invSpec", label: "规格型号", width: 70, align: "center", hideDefault: !0, hidden: !0}, {
            name: "invUnit",
            label: "单位",
            width: 70,
            align: "center",
            hideDefault: !0,
            hidden: !0
        }, {name: "qty", label: "数量", width: 70, align: "right"}, {
            name: "price",
            label: "单价",
            width: 70,
            align: "right",
            hideDefault: !0,
            hidden: !0
        }, {name: "taxPrice", label: "含税单价", hidden: i, width: 70, align: "right"}, {
            name: "BatchNo",
            label: "批次",
            hidden: a,
            width: 70,
            align: "center"
        }, {name: "proDate", label: "生产日期", hidden: a, width: 70, align: "center"}, {
            name: "totalDisAmount",
            label: "折扣额",
            width: 70,
            align: "right"
        }, {name: "totalAmount", label: "销售收入", width: 70, align: "right"}, {
            name: "totalTax",
            label: "税额",
            hidden: i,
            width: 70,
            align: "right"
        }, {name: "totalTaxAmount", label: "价税合计", hidden: i, width: 70, align: "right"}, {
            name: "unitCost",
            label: "单位成本",
            width: 70,
            align: "right",
            hideDefault: !0,
            hidden: !0
        }, {name: "totalCost", label: "销售成本", width: 70, align: "right"}, {
            name: "mlAmount",
            label: "销售毛利<br/>(销售收入-销售成本)",
            width: 0,
            align: "right"
        }, {name: "disAmount", label: "优惠金额", width: 70, align: "right"}, {
            name: "saleAmount",
            label: "销售费用",
            width: 70,
            align: "right"
        }, {name: "disMlAmount", label: "销售净利润<br/>(销售毛利-优惠金额-销售费用)", width: 180, align: "right"}, {
            name: "amount",
            label: "优惠后金额",
            width: 70,
            align: "right"
        }, {name: "postfee", label: "客户承担费用", width: 70, align: "right"}, {
            name: "ysAmount",
            label: "应收金额",
            width: 70,
            align: "right"
        }, {name: "yskAmount", label: "已收款金额", width: 70, align: "right"}, {
            name: "desc",
            label: "整单备注",
            width: 0,
            align: "center"
        }, {name: "billId", label: "billId", width: 0, align: "center", hidden: !0}];
        var o = "local", d = "#";
        l.autoSearch && (o = "json", d = s), h.gridReg("grid", n), n = h.conf.grids.grid.colModel, $("#grid").jqGrid({
            url: d,
            postData: l,
            datatype: o,
            autowidth: !0,
            gridview: !0,
            colModel: n,
            cmTemplate: {sortable: !1, title: !1},
            page: 1,
            pager: "#page",
            rowNum: 100,
            rowList: [100, 200, 500],
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
                var t = $("#grid").getRowData(e), i = t.billId;
                if ("销售退回" === t.transTypeName) {
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
                        text: "销售单",
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
                e(i);
                var n = $(".ui-paging-info").html();
                "无数据显示" == n ? $(".ui-paging-info").html(n) : $(".ui-paging-info").html("共" + n.split("共")[1])
            },
            gridComplete: function () {
                $("#grid").footerData("set", {date: "合计:"}), $("table.ui-jqgrid-ftable").find('td[aria-describedby="grid_transTypeName"]').prevUntil().css("border-right-color", "#fff"), $(".frozen-div,.frozen-div #grid_date").css("height", "36px"), $(".frozen-bdiv").css("top", "37px")
            },
            resizeStop: function (e, t) {
                h.setGridWidthByIndex(e, t + 1, "grid")
            }
        }).jqGrid("setFrozenColumns"), l.autoSearch ? ($(".no-query").remove(), $(".ui-print").show()) : $(".ui-print").hide()
    }(), function (e) {
        "profitDetail" === e.fromType && $("#filter-submit").trigger("click")
    }(o);
    var g;
    $(window).on("resize", function (t) {
        g || (g = setTimeout(function () {
            e(), g = null
        }, 50))
    })
});