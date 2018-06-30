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
        $(".no-query").remove(), $(".ui-print").show(), "number" == typeof t && ($("#grid").jqGrid(t ? "showCol" : "hideCol", ["unitCost", "cost", "saleProfit", "salepPofitRate"]), e(), $("#grid").clearGridData(!0)), $("#grid").jqGrid("setGridParam", {
            datatype: "json",
            postData: n,
            url: s
        }).trigger("reloadGrid")
    }

    var r, o = parent.SYSTEM, n = $.extend({
        beginDate: "",
        endDate: "",
        salesNo: "",
        goodsNo: "",
        storageNo: "",
        profit: "",
        colModel: ""
    }, Public.urlParam()), l = "/report/salesDetail.do?action=salerExporter", s = "/report/salesDetail.do?action=saler", d = Public.mod_PageConfig.init("salesSummaryCustomer");
    !function () {
        Business.getSearchList(), Business.filterStorage(), Business.filterGoods(), Business.filterSaler(), $("#date,#sales,#goodsfilter,#goods,#storage,#chk-wrap").show(), $("#sales").insertBefore($("#goods")), $("#chk-wrap .chk:eq(1)").hide(), $("#conditions-trigger").trigger("click"), $("#filter-fromDate").val(n.beginDate || ""), $("#filter-toDate").val(n.endDate || ""), $("#filter-saler input").val(n.salesNo || ""), $("#filter-storage input").val(n.storageNo || ""), $("#filter-goods input").val(n.goodsNo || ""), n.beginDate && n.endDate && ($("#selected-period").text(n.beginDate + "至" + n.endDate), $("div.grid-subtitle").text("日期: " + n.beginDate + " 至 " + n.endDate)), $("#filter-fromDate, #filter-toDate").datepicker(), o.rights.SAREPORSALER_COST || o.isAdmin ? ($("#chk-wrap").show(), "1" === n.profit && $("#chk-wrap input").attr("checked", !0)) : $("#chk-wrap").hide(), r = $("#chk-wrap").cssCheckbox();
        var e = Public.categoryTree($("#filterCat"), {rootTxt: "", width: 200});
        Business.moreFilterEvent(), $("#filterCat").placeholder(), setTimeout(function () {
            $("span[id$=_1_span]").html("全部")
        }, 1e3), $("#filter-submit").on("click", function (t) {
            if (t.preventDefault(), Business.verifyRight("SAREPORSALER_QUERY")) {
                var i = $("#filter-fromDate").val(), o = $("#filter-toDate").val();
                i && o && new Date(i).getTime() > new Date(o).getTime() ? parent.Public.tips({
                        type: 1,
                        content: "开始日期不能大于结束日期"
                    }) : (n = {
                        beginDate: i,
                        endDate: o,
                        salesNo: $("#filter-saler input").val() || "",
                        goodsNo: $("#filter-goods input").val() || "",
                        storageNo: $("#filter-storage input").val() || "",
                        profit: r.chkVal().length > 0 ? "1" : "0",
                        catId: e.getValue(),
                        catName: e.getText()
                    }, $("#selected-period").text(i + "至" + o), $("div.grid-subtitle").text("日期: " + i + " 至 " + o), a(+n.profit), $("#filter-menu").removeClass("ui-btn-menu-cur"))
            }
        }), $("#filter-reset").on("click", function (e) {
            e.preventDefault(), $("#filter-fromDate").val(n.beginDate), $("#filter-toDate").val(n.endDate), $("#filter-saler input").val(""), $("#filter-goods input").val(""), $("#filter-storage input").val(""), r.chkNot()
        })
    }(), $("#refresh").on("click", function (e) {
        e.preventDefault(), $("#filter-submit").click()
    }), $("#btn-print").click(function (e) {
        e.preventDefault(), Business.verifyRight("SAREPORSALER_PRINT") && $("div.ui-print").printTable()
    }), $("#btn-export").click(function (e) {
        e.preventDefault(), Business.verifyRight("SAREPORSALER_EXPORT") && Business.noDataExportTips() && (n.colMoldel = JSON.stringify($("#grid").jqGrid("getGridParam", "colModel")), Business.getFile(l, n))
    }), $("#config").show().click(function (e) {
        d.config()
    }), function () {
        var t = $(window).height() - $(".grid-wrap").offset().top - 65 - 70, i = !0, a = !1, r = !1, l = !1, c = !1, g = "基本单位", f = "基本数量";
        1 === o.siType && (c = !0, g = "单位", f = "数量"), "1" === n.profit && (i = !1), !1 !== o.isAdmin || o.rights.AMOUNT_OUTAMOUNT || (a = !0, r = !0, l = !0), 0 === o.taxRequiredCheck && (a = !0);
        var u = [{name: "buNo", label: "销售人员", width: 80, hidden: !0}, {
            name: "salesName",
            label: "销售人员",
            width: 80,
            sortable: !0
        }, {name: "invNo", label: "商品编号", width: 80, sortable: !0}, {
            name: "invName",
            label: "商品名称",
            width: 200,
            classes: "ui-ellipsis",
            title: !0
        }, {name: "spec", label: "规格型号", width: 60}, {
            name: "location",
            label: "仓库",
            width: 150,
            sortable: !0
        }, {name: "secondUnit", label: "副单位", width: 80, hidden: c, align: "center"}, {
            name: "secondQty",
            label: "副单位数",
            width: 80,
            hidden: c,
            align: "center"
        }, {name: "unit", label: g, width: 50, align: "center"}, {
            name: "qty",
            label: f,
            width: 80,
            align: "right"
        }, {name: "unitPrice", label: "单价", width: 100, align: "right", hidden: r}, {
            name: "amount",
            label: "销售收入",
            width: 80,
            align: "right",
            hidden: l
        }, {name: "tax", label: "税额", width: 100, align: "right", hidden: a}, {
            name: "taxAmount",
            label: "价税合计",
            width: 100,
            align: "right",
            hidden: a
        }, {name: "unitCost", label: "单位成本", width: 80, align: "center", hidden: i, sortable: !0}, {
            name: "cost",
            label: "销售成本",
            width: 80,
            hidden: i,
            align: "center"
        }, {name: "saleProfit", label: "销售毛利", width: 80, hidden: i, align: "center"}, {
            name: "salepPofitRate",
            label: "毛利率",
            width: 80,
            hidden: i,
            align: "center"
        }], h = "local", p = "#";
        n.autoSearch && (h = "json", p = s), d.gridReg("grid", u), u = d.conf.grids.grid.colModel, $("#grid").jqGrid({
            url: p,
            postData: n,
            datatype: h,
            autowidth: !0,
            height: t,
            gridview: !0,
            colModel: u,
            cmTemplate: {title: !1, sortable: !1},
            page: 1,
            sortname: "invNo",
            sortorder: "desc",
            rowNum: 3e3,
            loadonce: !0,
            viewrecords: !0,
            shrinkToFit: !1,
            forceFit: !0,
            footerrow: !0,
            userDataOnFooter: !0,
            jsonReader: {root: "data.rows", userdata: "data.userdata", repeatitems: !1, id: "0"},
            onCellSelect: function (e) {
                if (Business.verifyRight("SAREPORTDETAIL_QUERY")) {
                    var t = $("#grid").getRowData(e), i = t.buNo, a = t.invNo, r = t.locationNo;
                    i || "小计" !== t.location || (i = $("#grid").getRowData(e - 1).buNo), parent.tab.addTabItem({
                        tabid: "report-salesDetail",
                        text: "销售明细表",
                        url: "/report/sales-detail.jsp?autoSearch=true&beginDate=" + n.beginDate + "&endDate=" + n.endDate + "&salesId=" + i + "&goodsNo=" + a + "&storageNo=" + r + "&profit=" + n.profit
                    })
                }
            },
            loadComplete: function (t) {
                var i;
                if (t && t.data) {
                    var a = t.data.rows.length;
                    i = a ? 41 * a : 1
                }
                e(i), t.data, Public.addDefUpArrow(this, u, !0)
            },
            gridComplete: function () {
                $("#grid").footerData("set", {salesName: "合计:"}), $("table.ui-jqgrid-ftable").find('td[aria-describedby="grid_location"]').prevUntil().css("border-right-color", "#fff"), $("#grid").find('td[aria-describedby="grid_invNo"]').each(function (e) {
                    var t = $(this);
                    "&nbsp;" === t.html() && t.parent().addClass("fb")
                })
            },
            resizeStop: function (e, t) {
                d.setGridWidthByIndex(e, t + 1, "grid")
            }
        }), n.autoSearch ? ($(".no-query").remove(), $(".ui-print").show()) : $(".ui-print").hide()
    }();
    var c;
    $(window).on("resize", function (t) {
        c || (c = setTimeout(function () {
            e(), c = null
        }, 50))
    })
});