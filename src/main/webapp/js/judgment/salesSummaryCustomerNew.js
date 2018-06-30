$(function () {
    function e(a) {
        a && (e.h = a);
        var r = t(), o = $(window).height() - $(".grid-wrap").offset().top - 65 - 150, n = i(), l = $("#grid"), d = $(".ui-jqgrid-htable").height();
        o > n && (o = n), r < l.width() && (o += 17), $("#grid-wrap").height(function () {
            return document.body.clientHeight - this.offsetTop - 36 - 5
        }), l.jqGrid("setGridHeight", o), l.jqGrid("setGridWidth", r);
        var s = o > 0 ? parseInt(o, 10) : 0;
        $(".frozen-sdiv").attr("style", "position:absolute;left:0;top:" + (parseInt(d, 10) + s + 1) + "px")
    }

    function t() {
        return $(window).width() - $("#grid-wrap").offset().left - 36 - 20
    }

    function i() {
        return $(window).height() - $("#grid").offset().top - 36 - 46
    }

    function a(t) {
        $(".no-query").remove(), $(".ui-print").show(), void 0 !== t && ($("#grid").jqGrid(t ? "showCol" : "hideCol", ["unitCost", "cost", "saleProfit", "salepPofitRate"]), e()), $("#grid").clearGridData(!0), $("#grid").jqGrid("setGridParam", {
            datatype: "json",
            postData: o,
            url: l
        }).trigger("reloadGrid")
    }

    var r = parent.SYSTEM, o = $.extend({
        beginDate: "",
        endDate: "",
        customerNo: "",
        goodsNo: "",
        storageNo: "",
        profit: "",
        colModel: ""
    }, Public.urlParam()), n = "/report/salesDetail.do?action=customerExporter", l = "/report/salesDetail.do?action=customer", d = Public.mod_PageConfig.init("salesSummaryCustomerNew");
    !function () {
        Business.getSearchList(), Business.filterCustomer(), Business.filterGoods(), Business.filterStorage(), $("#date,#customer,#goods,#storage,#filter,#chk-wrap").show(), $("#filter label").text("客户类别"), $("#chk-wrap .chk:eq(1)").hide(), $("#conditions-trigger").trigger("click"), $("#filter-fromDate").val(o.beginDate || ""), $("#filter-toDate").val(o.endDate || ""), $("#filter-customer input").val(o.customerNo || ""), $("#filter-goods input").val(o.goodsNo || ""), $("#filter-storage input").val(o.storageNo || ""), o.beginDate && o.endDate && ($("#selected-period").text(o.beginDate + "至" + o.endDate), $("div.grid-subtitle").text("日期: " + o.beginDate + " 至 " + o.endDate)), $("#filter-fromDate, #filter-toDate").datepicker(), Public.dateCheck(), r.rights.SAREPORTBU_COST || r.isAdmin ? ($("#chk-wrap").show(), "1" === o.profit && $("#chk-wrap input").attr("checked", !0)) : $("#chk-wrap").hide(), chkboxes = $("#chk-wrap").cssCheckbox();
        var e = Public.categoryTree($("#catorage"), {
            typeNumber: "customertype",
            inputWidth: 174,
            height: 147,
            width: 164
        });
        Business.moreFilterEvent(), $("#filter-submit").on("click", function (t) {
            t.preventDefault();
            var i = $("#filter-fromDate").val(), r = $("#filter-toDate").val(), n = 0 == e.getValue() ? -1 : e.getValue();
            if (i && r && new Date(i).getTime() > new Date(r).getTime()) parent.Public.tips({
                type: 1,
                content: "开始日期不能大于结束日期"
            }); else {
                o = {
                    beginDate: i,
                    endDate: r,
                    customerNo: $("#filter-customer input").val() || "",
                    goodsNo: $("#filter-goods input").val() || "",
                    storageNo: $("#filter-storage input").val() || "",
                    profit: "",
                    categoryId: n
                }, $("#selected-period").text(i + "至" + r), $("div.grid-subtitle").text("日期: " + i + " 至 " + r), chkVals = chkboxes.chkVal();
                for (var l = 0, d = chkVals.length; l < d; l++)o[chkVals[l]] = 1;
                a(o.profit), $("#filter-menu").removeClass("ui-btn-menu-cur")
            }
        }), $("#filter-reset").on("click", function (e) {
            e.preventDefault(), $("#filter-fromDate").val(o.beginDate), $("#filter-toDate").val(o.endDate), $("#filter-customer input").val(""), $("#filter-goods input").val(""), $("#filter-storage input").val(""), o.customerNo = "", o.goodsNo = "", o.storageNo = ""
        })
    }(), $("#refresh").on("click", function (e) {
        e.preventDefault(), $("#filter-submit").click()
    }), $("#btn-print").click(function (e) {
        e.preventDefault(), Business.verifyRight("SAREPORTBU_PRINT") && $("div.ui-print").printTable()
    }), $("#btn-export").click(function (e) {
        e.preventDefault(), Business.verifyRight("SAREPORTBU_EXPORT") && Business.noDataExportTips() && (o.colModel = JSON.stringify($("#grid").jqGrid("getGridParam", "colModel")), Business.getFile(n, o))
    }), $("#config").show().click(function (e) {
        d.config()
    }), function () {
        var t = !1, i = !1, a = !1, n = "基本单位", s = "基本数量";
        1 === r.siType && (a = !0, n = "单位", s = "数量"), !1 !== r.isAdmin || r.rights.AMOUNT_COSTAMOUNT, !1 !== r.isAdmin || r.rights.AMOUNT_OUTAMOUNT || (t = !0, i = !0), !1 !== r.isAdmin || r.rights.AMOUNT_INAMOUNT, 0 === r.taxRequiredCheck && (i = !0);
        var c = !0;
        1 == o.profit && (c = !1);
        var g = [{name: "assistName", label: "客户类别", width: 80, align: "center"}, {
            name: "buName",
            label: "客户",
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
            width: 80,
            align: "center"
        }, {name: "secondUnit", label: "副单位", width: 80, hidden: a, align: "center"}, {
            name: "secondQty",
            label: "副单位数",
            width: 80,
            hidden: a,
            align: "center"
        }, {name: "unit", label: n, width: 100, align: "center"}, {
            name: "qty",
            label: s,
            width: 60,
            align: "right"
        }, {name: "unitPrice", label: "单价", width: 60, align: "right", hidden: t}, {
            name: "amount",
            label: "销售收入",
            width: 60,
            align: "right",
            hidden: t
        }, {name: "tax", label: "税额", width: 100, align: "right", hidden: i}, {
            name: "taxAmount",
            label: "价税合计",
            width: 100,
            align: "right",
            hidden: i
        }, {name: "unitCost", label: "单位成本", width: 60, align: "right", hidden: c}, {
            name: "cost",
            label: "销售成本",
            width: 60,
            align: "right",
            hidden: c
        }, {name: "saleProfit", label: "销售毛利", width: 60, align: "right", hidden: c}, {
            name: "salepPofitRate",
            label: "毛利率",
            width: 60,
            align: "right",
            hidden: c
        }, {name: "buNo", label: "", width: 0, hidden: !0}, {
            name: "locationNo",
            label: "",
            width: 0,
            hidden: !0
        }], u = "local", h = "#";
        o.autoSearch && (u = "json", h = l), d.gridReg("grid", g), g = d.conf.grids.grid.colModel, $("#grid").jqGrid({
            url: h,
            postData: o,
            datatype: u,
            mtype: "POST",
            autowidth: !0,
            gridview: !0,
            colModel: g,
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
                if (Business.verifyRight("SAREPORTDETAIL_QUERY")) {
                    var t = $("#grid").getRowData(e), i = t.buNo, a = t.invNo, r = t.locationNo;
                    i || "小计" !== t.location || (i = $("#grid").getRowData(e - 1).buNo), parent.tab.addTabItem({
                        tabid: "report-salesDetail",
                        text: "销售明细表",
                        url: "/report/sales-detail.jsp?autoSearch=true&beginDate=" + o.beginDate + "&endDate=" + o.endDate + "&customerNo=" + i + "&goodsNo=" + a + "&storageNo=" + r + "&profit=" + o.profit
                    })
                }
            },
            loadComplete: function (t) {
                var i;
                if (t && t.data) {
                    var a = t.data.list.length;
                    i = a ? 41 * a : 1
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
        }), o.autoSearch ? ($(".no-query").remove(), $(".ui-print").show()) : $(".ui-print").hide()
    }(), "saleRankReport" === o.dataFrom && a();
    var s;
    $(window).on("resize", function (t) {
        s || (s = setTimeout(function () {
            e(), s = null
        }, 50))
    })
});