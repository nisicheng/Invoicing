$(function () {
    function e(a) {
        a && (e.h = a);
        var r = t(), o = $(window).height() - $(".grid-wrap").offset().top - 65 - 150, n = i(), l = $("#grid"), s = $(".ui-jqgrid-htable").height();
        o > n && (o = n), r < l.width() && (o += 17), $("#grid-wrap").height(function () {
            return document.body.clientHeight - this.offsetTop - 36 - 5
        }), l.jqGrid("setGridHeight", o), l.jqGrid("setGridWidth", r);
        var d = o > 0 ? parseInt(o, 10) : 0;
        $(".frozen-sdiv").attr("style", "position:absolute;left:0;top:" + (parseInt(s, 10) + d + 1) + "px")
    }

    function t() {
        return $(window).width() - $("#grid-wrap").offset().left - 36 - 20
    }

    function i() {
        return $(window).height() - $("#grid").offset().top - 36 - 46
    }

    function a(t) {
        $(".no-query").remove(), $(".ui-print").show(), "number" == typeof t && ($("#grid").jqGrid(t ? "showCol" : "hideCol", ["unitCost", "cost", "saleProfit", "salepPofitRate"]), e()), $("#grid").clearGridData(!0), $("#grid").jqGrid("setGridParam", {
            datatype: "json",
            postData: o,
            url: n
        }).trigger("reloadGrid")
    }

    var r = parent.SYSTEM, o = $.extend({
        beginDate: "",
        endDate: "",
        customerNo: "",
        goodsNo: "",
        storageNo: "",
        profit: 0,
        showSku: 0,
        colModel: ""
    }, Public.urlParam()), n = "/report/salesDetail.do?action=inv", l = "/report/salesDetail.do?action=invExporter", s = Public.mod_PageConfig.init("salesSummary");
    !function () {
        Business.getSearchList(), Business.filterCustomer(), Business.filterGoods(), Business.filterStorage(), $("#date,#customer,#goods,#storage,#goodsfilter,#chk-wrap").show(), $("#goods").insertBefore($("#customer")), $("#filter label").text("客户类别:"), $("#conditions-trigger").trigger("click"), $("#filter-fromDate").val(o.beginDate || ""), $("#filter-toDate").val(o.endDate || ""), $("#filter-customer input").val(o.customerNo || ""), $("#filter-goods input").val(o.goodsNo || ""), $("#filter-storage input").val(o.storageNo || ""), o.beginDate && o.endDate && ($("#selected-period").text(o.beginDate + "至" + o.endDate), $("div.grid-subtitle").text("日期: " + o.beginDate + " 至 " + o.endDate)), $("#filter-fromDate, #filter-toDate").datepicker(), Public.dateCheck(), "1" === o.profit && $('#chk-wrap input[name="profit"]').attr("checked", !0), "1" === o.showSku && $('#chk-wrap input[name="showSku"]').attr("checked", !0), parent.SYSTEM.enableAssistingProp || $('#chk-wrap input[name="showSku"]').parent().hide();
        var e = parent.SYSTEM;
        e.rights.SAREPORTINV_COST || e.isAdmin ? $('#chk-wrap input[name="profit"]').parent().show() : $('#chk-wrap input[name="profit"]').parent().hide();
        var t = $("#chk-wrap").show().cssCheckbox(), i = Public.categoryTree($("#filterCat"), {
            rootTxt: "",
            width: 200
        });
        Business.moreFilterEvent(), $("#filterCat").placeholder(), setTimeout(function () {
            $("span[id$=_1_span]").html("全部")
        }, 1e3), $("#filter-submit").on("click", function (e) {
            e.preventDefault();
            var r = $("#filter-fromDate").val(), n = $("#filter-toDate").val();
            if (r && n && new Date(r).getTime() > new Date(n).getTime()) parent.Public.tips({
                type: 1,
                content: "开始日期不能大于结束日期"
            }); else {
                o = {
                    beginDate: r,
                    endDate: n,
                    customerNo: $("#filter-customer input").val() || "",
                    goodsNo: $("#filter-goods input").val() || "",
                    storageNo: $("#filter-storage input").val() || "",
                    profit: 0,
                    showSku: 0,
                    catId: i.getValue(),
                    catName: i.getText()
                }, chkVals = t.chkVal();
                for (var l = 0, s = chkVals.length; l < s; l++)o[chkVals[l]] = 1;
                $("#selected-period").text(r + "至" + n), $("div.grid-subtitle").text("日期: " + r + " 至 " + n), a(+o.profit), $("#filter-menu").removeClass("ui-btn-menu-cur")
            }
        }), $("#filter-reset").on("click", function (e) {
            e.preventDefault(), $("#filter-fromDate").val(o.beginDate), $("#filter-toDate").val(o.endDate), $("#filter-customer input").val(""), $("#filter-goods input").val(""), $("#filter-storage input").val(""), t.chkNot()
        })
    }(), $("#refresh").on("click", function (e) {
        e.preventDefault(), $("#filter-submit").trigger("click")
    }), $("#btn-print").click(function (e) {
        e.preventDefault(), Business.verifyRight("SAREPORTINV_PRINT") && $("div.ui-print").printTable()
    }), $("#btn-export").click(function (e) {
        e.preventDefault(), Business.verifyRight("SAREPORTINV_EXPORT") && Business.noDataExportTips() && (o.colMoldel = JSON.stringify($("#grid").jqGrid("getGridParam", "colModel")), Business.getFile(l, o))
    }), $("#config").show().click(function (e) {
        s.config()
    }), function (t) {
        var i = !1, a = !1, l = !1, d = "基本单位", c = "基本数量";
        1 === r.siType && (l = !0, d = "单位", c = "数量"), !1 !== r.isAdmin || r.rights.AMOUNT_OUTAMOUNT || (i = !0, a = !0), 0 === r.taxRequiredCheck && (a = !0);
        var u = [{name: "assistName", label: "商品类别", width: 80, align: "center"}, {
            name: "buNo",
            label: "客户编码",
            width: 0,
            hidden: !0
        }, {name: "invNo", label: "商品编号", width: 100}, {
            name: "locationNo",
            label: "仓库编码",
            width: 0,
            hidden: !0
        }, {name: "invName", label: "商品名称", width: 200, classes: "ui-ellipsis", title: !0}, {
            name: "spec",
            label: "规格型号",
            width: 100
        }, {name: "location", label: "仓库", width: 100, classes: "ui-ellipsis", title: !0}, {
            name: "secondUnit",
            label: "副单位",
            width: 100,
            hidden: l,
            title: !0
        }, {name: "secondQty", label: "副单位数", width: 100, hidden: l, title: !0}, {
            name: "unit",
            label: d,
            width: 80,
            fixed: !0,
            align: "center"
        }, {name: "qty", label: c, width: 100, align: "right", sortable: !0}, {
            name: "unitPrice",
            label: "单价",
            width: 100,
            hidden: i,
            align: "right"
        }, {name: "amount", label: "销售收入", width: 100, hidden: i, align: "right", sortable: !0}, {
            name: "tax",
            label: "税额",
            width: 100,
            align: "right",
            hidden: a
        }, {name: "taxAmount", label: "价税合计", width: 100, align: "right", hidden: a}, {
            name: "unitCost",
            label: "单位成本",
            width: 80,
            hidden: !0,
            align: "right"
        }, {name: "cost", label: "销售成本", width: 80, hidden: !0, align: "right"}, {
            name: "saleProfit",
            label: "销售毛利",
            width: 80,
            hidden: !0,
            align: "right",
            sortable: !0
        }, {name: "salepPofitRate", label: "毛利率", width: 80, hidden: !0, align: "right"}], g = "local", h = "#";
        o.autoSearch && (g = "json", h = n), s.gridReg("grid", u), u = s.conf.grids.grid.colModel, $("#grid").jqGrid({
            url: h,
            postData: o,
            datatype: g,
            autowidth: !0,
            gridview: !0,
            colModel: u,
            cmTemplate: {sortable: !1, title: !1},
            page: 1,
            sortname: "date",
            sortorder: "desc",
            rowNum: 1e6,
            loadonce: !1,
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
            onCellSelect: function (e) {
                if (Business.verifyRight("SAREPORTDETAIL_QUERY")) {
                    var t = $("#grid").getRowData(e), i = t.buNo, a = t.invNo, r = t.locationNo;
                    a && parent.tab.addTabItem({
                        tabid: "report-salesDetail",
                        text: "销售明细表",
                        url: "/report/sales-detail.jsp?autoSearch=true&beginDate=" + o.beginDate + "&endDate=" + o.endDate + "&customerNo=" + i + "&goodsNo=" + a + "&storageNo=" + r + "&profit=" + o.profit + "&showSku=" + o.showSku
                    })
                }
            },
            loadComplete: function (t) {
                var i, a = $("#grid").getGridParam("sortname"), r = $("#grid").getGridParam("sortorder");
                if (o.sidx = a, o.sord = r, t && t.data) {
                    var n = t.data.rows.length;
                    i = n ? 41 * n : 1
                }
                e(i), Public.addDefUpArrow(this, u, !0)
            },
            gridComplete: function () {
                $("#grid").footerData("set", {assistName: "合计:"}), $("table.ui-jqgrid-ftable").find('td[aria-describedby="grid_unit"]').prevUntil().css("border-right-color", "#fff"), $("#grid").find('td[aria-describedby="grid_invNo"]').each(function (e) {
                    var t = $(this);
                    "&nbsp;" === t.html() && t.parent().addClass("fb")
                })
            },
            resizeStop: function (e, t) {
                s.setGridWidthByIndex(e, t + 1, "grid")
            }
        }), o.autoSearch ? ($(".no-query").remove(), $(".ui-print").show()) : $(".ui-print").hide(), "profitDetail" === o.fromType && $("#filter-submit").trigger("click")
    }(), "saleRankReport" === o.dataFrom && a(), o.search && a();
    var d;
    $(window).on("resize", function (t) {
        d || (d = setTimeout(function () {
            e(), d = null
        }, 50))
    })
});