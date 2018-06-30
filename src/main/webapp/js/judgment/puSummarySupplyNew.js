$(function () {
    function e(r) {
        r && (e.h = r);
        var a = t(), n = $(window).height() - $(".grid-wrap").offset().top - 65 - 150, o = i(), l = $("#grid"), d = $(".ui-jqgrid-htable").height();
        n > o && (n = o), a < l.width() && (n += 17), $("#grid-wrap").height(function () {
            return document.body.clientHeight - this.offsetTop - 36 - 5
        }), l.jqGrid("setGridHeight", n), l.jqGrid("setGridWidth", a);
        var s = n > 0 ? parseInt(n, 10) : 0;
        $(".frozen-sdiv").attr("style", "position:absolute;left:0;top:" + (parseInt(d, 10) + s + 1) + "px")
    }

    function t() {
        return $(window).width() - $("#grid-wrap").offset().left - 36 - 20
    }

    function i() {
        return $(window).height() - $("#grid").offset().top - 36 - 46
    }

    function r() {
        $(".no-query").remove(), $(".ui-print").show(), $("#grid").clearGridData(!0), $("#grid").jqGrid("setGridParam", {
            datatype: "json",
            postData: n,
            url: l
        }).trigger("reloadGrid")
    }

    var a = parent.SYSTEM, n = $.extend({
        beginDate: "",
        endDate: "",
        customerNo: "",
        goodsNo: "",
        storageNo: "",
        colModel: ""
    }, Public.urlParam()), o = "/report/puDetail.do?action=supplyExporter", l = "/report/puDetail.do?action=supply", d = Public.mod_PageConfig.init("puSummarySupplyNew");
    Business.getSearchList(), Business.filterSupplier(), Business.filterGoods(), Business.filterStorage(), $("#date,#supplier,#goods,#storage,#filter").show(), $("#filter label").text("供应商类别"), $("#filter-fromDate").val(n.beginDate || ""), $("#filter-toDate").val(n.endDate || ""), $("#filter-supplier input").val(n.customerNo || ""), $("#filter-goods input").val(n.goodsNo || ""), $("#filter-storage input").val(n.storageNo || ""), n.beginDate && n.endDate && ($("#selected-period").text(n.beginDate + "至" + n.endDate), $("div.grid-subtitle").text("日期: " + n.beginDate + " 至 " + n.endDate)), $("#filter-fromDate, #filter-toDate").datepicker(), Business.moreFilterEvent(), chkboxes = $("#chk-wrap").cssCheckbox(), categoryTree = Public.categoryTree($("#catorage"), {
        typeNumber: "supplytype",
        inputWidth: 112,
        height: 147,
        width: 102
    }), $("#filter-submit").on("click", function (e) {
        e.preventDefault();
        var t = $("#filter-fromDate").val(), i = $("#filter-toDate").val(), a = 0 == categoryTree.getValue() ? -1 : categoryTree.getValue();
        t && i && new Date(t).getTime() > new Date(i).getTime() ? parent.Public.tips({
                type: 1,
                content: "开始日期不能大于结束日期"
            }) : (n = {
                beginDate: t,
                endDate: i,
                customerNo: $("#filter-supplier input").val() || "",
                goodsNo: $("#filter-goods input").val() || "",
                storageNo: $("#filter-storage input").val() || "",
                categoryId: a
            }, $("#selected-period").text(t + "至" + i), $("div.grid-subtitle").text("日期: " + t + " 至 " + i), r(), $("#filter-menu").removeClass("ui-btn-menu-cur"))
    }), $("#filter-reset").on("click", function (e) {
        e.preventDefault(), $("#filter-fromDate").val(n.beginDate), $("#filter-toDate").val(n.endDate), $("#filter-supplier input").val(""), $("#filter-goods input").val(""), $("#filter-storage input").val(""), n.customerNo = "", n.goodsNo = "", n.storageNo = ""
    }), $("#refresh").on("click", function (e) {
        e.preventDefault(), $("#filter-submit").click()
    }), $("#btn-print").click(function (e) {
        e.preventDefault(), Business.verifyRight("PUREPORTPUR_PRINT") && $("div.ui-print").printTable()
    }), $("#btn-export").click(function (e) {
        e.preventDefault(), Business.verifyRight("PUREPORTPUR_EXPORT") && Business.noDataExportTips() && (n.colModel = JSON.stringify($("#grid").jqGrid("getGridParam", "colModel")), Business.getFile(o, n))
    }), $("#config").show().click(function (e) {
        d.config()
    }), function () {
        var t = !1, i = !1, r = !1;
        !1 !== a.isAdmin || a.rights.AMOUNT_COSTAMOUNT, !1 !== a.isAdmin || a.rights.AMOUNT_OUTAMOUNT, !1 !== a.isAdmin || a.rights.AMOUNT_INAMOUNT || (t = !0, i = !0), 0 === a.taxRequiredCheck && (i = !0);
        var o = "基本单位", s = "基本数量";
        1 === a.siType && (r = !0, o = "单位", s = "数量");
        var u = [{name: "assistName", label: "供应商类别", width: 80, align: "center"}, {
            name: "buName",
            label: "供应商",
            width: 80,
            align: "center"
        }, {name: "invNo", label: "商品编号", width: 80, align: "center"}, {
            name: "invName",
            label: "商品名称",
            width: 200,
            align: "center"
        }, {name: "spec", label: "规格型号", width: 60, align: "center"}, {
            name: "location",
            label: "仓库",
            width: 100,
            align: "center"
        }, {name: "secondUnit", label: "副单位", width: 80, hidden: r, align: "center"}, {
            name: "secondQty",
            label: "副单位数",
            width: 80,
            hidden: r,
            align: "center"
        }, {name: "unit", label: o, width: 60, align: "center"}, {
            name: "qty",
            label: s,
            width: 100,
            align: "center"
        }, {name: "unitPrice", label: "单价", width: 120, align: "right", hidden: t}, {
            name: "amount",
            label: "采购金额",
            width: 120,
            align: "right",
            hidden: t
        }, {name: "tax", label: "税额", width: 100, align: "right", hidden: i}, {
            name: "taxAmount",
            label: "价税合计",
            width: 100,
            align: "right",
            hidden: i
        }, {name: "locationNo", label: "", width: 0, hidden: !0}, {
            name: "buNo",
            label: "",
            width: 0,
            hidden: !0
        }], g = "local", c = "#";
        n.autoSearch && (g = "json", c = l), d.gridReg("grid", u), u = d.conf.grids.grid.colModel, $("#grid").jqGrid({
            url: c,
            postData: n,
            datatype: g,
            autowidth: !0,
            gridview: !0,
            colModel: u,
            cmTemplate: {sortable: !1, title: !1},
            page: 1,
            sortname: "date",
            sortorder: "desc",
            rowNum: 1e6,
            loadonce: !0,
            viewrecords: !0,
            shrinkToFit: !1,
            forceFit: !0,
            footerrow: !0,
            userDataOnFooter: !0,
            jsonReader: {root: "data.list", userdata: "data.total", repeatitems: !1, id: "0"},
            onCellSelect: function (e) {
                if (Business.verifyRight("PU_QUERY")) {
                    var t = $("#grid").getRowData(e), i = t.buNo, r = t.invNo, a = t.locationNo;
                    i || "小计" !== t.location || (i = $("#grid").getRowData(e - 1).buNo), parent.tab.addTabItem({
                        tabid: "report-puDetail",
                        text: "采购明细表",
                        url: "/report/pu-detail-new.jsp?autoSearch=true&beginDate=" + n.beginDate + "&endDate=" + n.endDate + "&customerNo=" + i + "&goodsNo=" + r + "&storageNo=" + a
                    })
                }
            },
            loadComplete: function (t) {
                var i;
                if (t && t.data) {
                    var r = t.data.list.length;
                    i = r ? 41 * r : 1
                }
                e(i)
            },
            gridComplete: function () {
                $("#grid").footerData("set", {assistName: "合计:"}), $("table.ui-jqgrid-ftable").find('td[aria-describedby="grid_unit"]').prevUntil().css("border-right-color", "#fff"), $("#grid").find('td[aria-describedby="grid_invNo"]').each(function (e) {
                    var t = $(this);
                    "&nbsp;" === t.html() && t.parent().addClass("fb")
                })
            },
            resizeStop: function (e, t) {
                d.setGridWidthByIndex(e, t + 1, "grid")
            }
        }), n.autoSearch ? ($(".no-query").remove(), $(".ui-print").show()) : $(".ui-print").hide()
    }();
    var s;
    $(window).on("resize", function (t) {
        s || (s = setTimeout(function () {
            e(), s = null
        }, 50))
    })
});