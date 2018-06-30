$(function () {
    function e(i) {
        i && (e.h = i);
        var a = t(), o = $(window).height() - $(".grid-wrap").offset().top - 65 - 150, n = r(), l = $("#grid"), s = $(".ui-jqgrid-htable").height();
        o > n && (o = n), a < l.width() && (o += 17), $("#grid-wrap").height(function () {
            return document.body.clientHeight - this.offsetTop - 36 - 5
        }), l.jqGrid("setGridHeight", o), l.jqGrid("setGridWidth", a);
        var d = o > 0 ? parseInt(o, 10) : 0;
        $(".frozen-sdiv").attr("style", "position:absolute;left:0;top:" + (parseInt(s, 10) + d + 1) + "px")
    }

    function t() {
        return $(window).width() - $("#grid-wrap").offset().left - 36 - 20
    }

    function r() {
        return $(window).height() - $("#grid").offset().top - 36 - 46
    }

    function i(t) {
        if ($(".no-query").remove(), $(".ui-print").show(), void 0 !== t) {
            m = !!t;
            var r = ["invCategory", "invNo", "invName", "invSpec", "invUnit", "price", "unitCost"], i = ["BatchNo", "proDate"], a = ["taxPrice"];
            l.ISWARRANTY && (r = r.concat(i)), l.taxRequiredCheck && (r = r.concat(a)), $("#grid").jqGrid(t ? "showCol" : "hideCol", r), e()
        }
        $("#grid").clearGridData(!0), $("#grid").jqGrid("setGridParam", {
            datatype: "json",
            postData: s,
            url: u
        }).trigger("reloadGrid")
    }

    var a, o, n, l = parent.SYSTEM, s = $.extend({
        beginDate: "",
        endDate: "",
        sortType: 0,
        categoryId: "",
        customerNo: ""
    }, Public.urlParam()), d = Public.urlParam(), g = 0, c = "/report/salesCharts.do?action=exporter", u = "/report/salesCharts.do?action=detail", h = Public.mod_PageConfig.init("saleAndReceipt"), m = !1;
    !function () {
        Business.getSearchList(), Business.filterCustomer(), Business.filterGoods(), Business.filterSaler(), $("#date,#sale-rank-filter,#filter,#customer,#goodsfilter,#goods").show(), $("#goods,#goodsfilter").hide(), $("#btn-print").hide(), $("#filter label").text("客户类别"), $("#customer").before($("#filter").remove()), $("#goods").before($("#goodsfilter").remove()), $("#conditions-trigger").trigger("click"), $("#filter-fromDate").val(s.beginDate || ""), $("#filter-toDate").val(s.endDate || ""), $("#filter-customer input").val(s.customerNo || ""), s.beginDate && s.endDate && $("div.grid-subtitle").text("日期: " + s.beginDate + " 至 " + s.endDate), $("#filter-fromDate, #filter-toDate").datepicker(), Public.dateCheck();
        var e = Business.saleRankCatorageCombo($("#sale-rank-catorage"), {
            editable: !1,
            extraListHtml: "",
            defaultSelected: 0,
            trigger: !0,
            width: 112,
            callback: {
                onChange: function (e) {
                    "1" === e.value ? ($("#goods,#goodsfilter").show(), $("#filter,#customer").hide()) : ($("#goods,#goodsfilter").hide(), $("#filter,#customer").show())
                }
            }
        });
        n = Public.categoryTree($("#filterCat"), {rootTxt: "", width: 200});
        var t = Public.categoryTree($("#catorage"), {
            typeNumber: "customertype",
            inputWidth: 198,
            height: 200,
            width: 188
        });
        Business.moreFilterEvent(), $("#filter-submit").on("click", function (r) {
            r.preventDefault();
            var a = 0 == t.getValue() ? -1 : t.getValue(), o = 0 == n.getValue() ? -1 : n.getValue(), l = $("#filter-fromDate").val(), d = $("#filter-toDate").val();
            l && d && new Date(l).getTime() > new Date(d).getTime() ? parent.Public.tips({
                    type: 1,
                    content: "开始日期不能大于结束日期"
                }) : (1 === (g = e.getValue()) ? (s = {
                        beginDate: l,
                        endDate: d,
                        sortType: g,
                        categoryId: o,
                        customerNo: $("#filter-goods input").val() || ""
                    }, $("#jqgh_grid_categoryName").html($("#jqgh_grid_categoryName").html().replace(/客户/, "商品")), $("#jqgh_grid_number").html($("#jqgh_grid_number").html().replace(/客户/, "商品")), $("#jqgh_grid_name ").html($("#jqgh_grid_name").html().replace(/客户/, "商品")), $("#jqgh_grid_qty").html($("#jqgh_grid_qty").html().replace(/笔数/, "基本数量"))) : (s = {
                        beginDate: l,
                        endDate: d,
                        sortType: g,
                        categoryId: a,
                        customerNo: $("#filter-customer input").val() || ""
                    }, $("#jqgh_grid_categoryName").html($("#jqgh_grid_categoryName").html().replace(/商品/, "客户")), $("#jqgh_grid_number").html($("#jqgh_grid_number").html().replace(/商品/, "客户")), $("#jqgh_grid_name").html($("#jqgh_grid_name").html().replace(/商品/, "客户")), $("#jqgh_grid_qty").html($("#jqgh_grid_qty").html().replace(/基本数量/, "笔数"))), $("div.grid-subtitle").text("日期: " + l + " 至 " + d), i(s.showDetail))
        })
    }(), function (t) {
        var r = !1;
        l.taxRequiredCheck || (r = !0), l.ISWARRANTY;
        l.serviceType;
        o = [{name: "categoryName", label: "客户类别", width: 120, align: "center"}, {
            name: "number",
            label: "客户编号",
            width: 100,
            align: "right",
            sortable: !0
        }, {name: "name", label: "客户名称", width: 150, align: "center"}, {
            name: "qty",
            label: "销售笔数",
            width: 120,
            align: "center",
            sortable: !0
        }, {name: "amount", label: "销售金额", width: 120, align: "right", sortable: !0}, {
            name: "tax",
            label: "税额",
            hidden: r,
            width: 100,
            align: "right",
            sortable: !0
        }, {name: "taxAmount", label: "价税合计", hidden: r, width: 120, align: "right", sortable: !0}, {
            name: "unitCost",
            label: "单位成本",
            width: 100,
            align: "right",
            sortable: !0
        }, {name: "cost", label: "销售成本", width: 100, align: "right", sortable: !0}, {
            name: "saleProfit",
            label: "销售毛利",
            width: 120,
            align: "right",
            sortable: !0
        }, {name: "saleProfitRate", label: "毛利率", width: 80, align: "right", sortable: !0}];
        var i = "local", n = "#";
        s.autoSearch && (i = "json", n = u), h.gridReg("grid", o), o = h.conf.grids.grid.colModel, a = $("#grid").jqGrid({
            url: n,
            postData: s,
            datatype: i,
            autowidth: !0,
            gridview: !0,
            rownumbers: !0,
            colModel: o,
            cmTemplate: {sortable: !1, title: !1},
            sortname: "number",
            page: 1,
            pager: "#page",
            rowNum: 100,
            rowList: [100, 200, 500],
            viewrecords: !0,
            shrinkToFit: !1,
            forceFit: !0,
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
                var t = "/report/", r = "", i = $("#grid").getRowData(e);
                if (i.billId, i.transTypeName, 1 === g) {
                    if (!Business.verifyRight("SAREPORTINV_QUERY"))return;
                    t = t + "sales-summary.jsp?goodsNo=" + i.number + "&beginDate=" + s.beginDate + "&endDate=" + s.endDate + "&dataFrom=saleRankReport", r = "销售汇总表（按商品）"
                } else {
                    if (!Business.verifyRight("SAREPORTBU_QUERY"))return;
                    t = t + "sales-summary-customer-new.jsp?customerNo=" + i.number + "&beginDate=" + s.beginDate + "&endDate=" + s.endDate + "&dataFrom=saleRankReport", r = "销售汇总表（按客户）"
                }
                parent.tab.addTabItem({tabid: "report-sales", text: r, url: t})
            },
            loadComplete: function (t) {
                var r;
                if (t && t.data) {
                    var i = t.data.rows.length;
                    r = i ? 41 * i : 1
                }
                e(r);
                var a = $(".ui-paging-info").html();
                "无数据显示" == a ? $(".ui-paging-info").html(a) : $(".ui-paging-info").html("共" + a.split("共")[1]), Public.addDefUpArrow(this, o, !0)
            },
            gridComplete: function () {
                $("#grid").footerData("set", {date: "合计:"}), $(".frozen-div,.frozen-div #grid_date").css("height", "36px"), $(".frozen-bdiv").css("top", "37px")
            },
            resizeStop: function (e, t) {
                h.setGridWidthByIndex(e, t + 1, "grid")
            }
        }).jqGrid("setFrozenColumns"), s.autoSearch ? ($(".no-query").remove(), $(".ui-print").show()) : $(".ui-print").hide()
    }(), $("#btn-export").click(function (e) {
        if (e.preventDefault(), Business.verifyRight("APPREPORTSALE_EXPORT") && Business.noDataExportTips()) {
            var t = {}, r = [];
            for (var i in s)s[i] && (t[i] = s[i]);
            var a = $("span.s-ico:visible");
            0 === a.length ? (t.sord = "amount", t.sidx = "desc") : (t.sord = a.children(':not(".ui-state-disabled")').attr("sort"), t.sidx = a.parent().attr("id").split("jqgh_grid_")[1]), t.rows = "5000", t.page = "1", $.each(o, function (e, t) {
                var i = t.name, a = new RegExp("BatchNo|proDate"), n = new RegExp("taxPrice"), s = new RegExp("invCategory|invNo|invName|invSpec|invUnit|price|taxPrice|BatchNo|proDate"), d = l.ISWARRANTY && a.test(i), g = l.taxRequiredCheck && n.test(i);
                if (!t.hidden && (m && (d || g) || m || !s.test(i))) {
                    var c = {title: o[e].label, property: o[e].name};
                    r.push(c)
                }
            }), 1 === g && $.each(r, function (e, t) {
                "categoryName" === t.property ? t.title = "商品类别" : "number" === t.property ? t.title = "商品编号" : "name" === t.property ? t.title = "商品名称" : "qty" === t.property && (t.title = "销售基本数量")
            }), t.userdata = JSON.stringify(r), Business.getFile(c, t)
        }
    }), d.fromType && $("#filter-submit").trigger("click"), $("#config").show().click(function (e) {
        h.config()
    }), function (e) {
        "profitDetail" === e.fromType && $("#filter-submit").trigger("click")
    }(d);
    var p;
    $(window).on("resize", function (t) {
        p || (p = setTimeout(function () {
            e(), p = null
        }, 50))
    })
});