var $category = $("#filterCat");
$(function () {
    function e(e) {
        $("#grid").jqGrid("GridUnload");
        for (var i = [{name: "assistName", label: "商品类别", width: 80, align: "center"}, {
            name: "invNo",
            label: "商品编号",
            frozen: !0,
            width: 80
        }, {name: "invName", label: "商品名称", frozen: !0, width: 200, classes: "ui-ellipsis", title: !0}, {
            name: "spec",
            label: "规格型号",
            frozen: !0,
            width: 60,
            align: "center"
        }, {name: "unit", label: "单位", frozen: !0, width: 40, align: "center"}, {
            name: "locationNo",
            label: "仓库编码",
            width: 0,
            hidden: !0
        }, {
            name: "location",
            label: "仓库",
            frozen: !0,
            width: 100
        }], o = e.colIndex, a = e.colNames, n = e.stoNames, d = [], c = "", g = 0, u = 6, f = o.length; u < f; u++) {
            var h = null;
            h = {
                name: o[u],
                label: a[u],
                width: 80,
                align: "right"
            }, i.push(h), o[u].split("_")[1] === c ? (d.pop(), d.push({
                    startColumnName: o[u - 1],
                    numberOfColumns: 2,
                    titleText: n[g - 1]
                })) : (d.push({
                    startColumnName: o[u],
                    numberOfColumns: 1,
                    titleText: n[g]
                }), g++), c = o[u].split("_")[1]
        }
        l.gridReg("grid", i), i = l.conf.grids.grid.colModel, $("#grid").jqGrid({
            ajaxGridOptions: {
                complete: function (e, t) {
                }
            },
            data: e.rows,
            datatype: "local",
            autowidth: !0,
            height: "auto",
            gridview: !0,
            colModel: i,
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
            userData: e.userdata,
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
                var t = $("#grid").getRowData(e), i = t.invNo, o = t.locationNo;
                Business.verifyRight("DeliverDetailReport_QUERY") && parent.tab.addTabItem({
                    tabid: "report-goodsFlowDetail",
                    text: "商品收发明细表",
                    url: "/report/goods-flow-detail.jsp?autoSearch=true&beginDate=" + r.beginDate + "&endDate=" + r.endDate + "&goodsNo=" + i + "&storageNo=" + o
                })
            },
            loadComplete: function (e) {
                var i;
                s = e.records;
                if (e && e.data) {
                    var o = e.data.rows.length;
                    i = o ? 41 * o : 1
                }
                t(i)
            },
            gridComplete: function () {
                $("#grid").footerData("set", {assistName: "合计:"}), $("table.ui-jqgrid-ftable").find('td[aria-describedby="grid_location"]').prevUntil().css("border-right-color", "#fff")
            },
            resizeStop: function (e, t) {
                l.setGridWidthByIndex(e, t + 1, "grid")
            }
        }).jqGrid("setGroupHeaders", {
            useColSpanStyle: !0,
            groupHeaders: d
        }).jqGrid("setFrozenColumns"), "profitDetail" === e.fromType && $("#filter-submit").trigger("click")
    }

    function t(e) {
        e && (t.h = e);
        var a = i(), r = $(window).height() - $(".grid-wrap").offset().top - 65 - 150, n = o(), s = $("#grid"), l = $(".ui-jqgrid-htable").height();
        r > n && (r = n), a < s.width() && (r += 17), $("#grid-wrap").height(function () {
            return document.body.clientHeight - this.offsetTop - 36 - 5
        }), s.jqGrid("setGridHeight", r), s.jqGrid("setGridWidth", a);
        var d = r > 0 ? parseInt(r, 10) : 0;
        $(".frozen-sdiv").attr("style", "position:absolute;left:0;top:" + (parseInt(l, 10) + d + 1) + "px")
    }

    function i() {
        return $(window).width() - $("#grid-wrap").offset().left - 36 - 20
    }

    function o() {
        return $(window).height() - $("#grid").offset().top - 36 - 46
    }

    var a = parent.SYSTEM, r = $.extend({
        beginDate: "",
        endDate: "",
        goodsNo: "",
        storageNo: "",
        showSku: "0"
    }, Public.urlParam()), n = null, s = 0, l = Public.mod_PageConfig.init("goodsFlowSummary");
    !function () {
        Business.getSearchList(), Business.filterGoods(), Business.filterStorage(), $("#date,#storage,#goodsfilter,#goods,#chk-ischecked").show(), $("#storage").insertBefore($("#goods")), $("#btn-print").hide(), $("#conditions-trigger").trigger("click"), Business.moreFilterEvent(), chkboxes = $("#chk-wrap").cssCheckbox(), r.beginDate && r.endDate && $(".grid-subtitle").text(r.beginDate + "至" + r.endDate), a.enableAssistingProp || $("#chk-wrap").hide(), "1" === r.showSku && $('#chk-wrap input[name="showSku"]').attr("checked", !0), $("#filter-fromDate").val(r.beginDate), $("#filter-toDate").val(r.endDate), $("#filter-goods input").val(r.goodsNo), $("#filter-storage input").val(r.storageNo), $("#chk-ischecked").cssCheckbox(), chkischecked_val = 0, $(document).on("click", "#chk-ischecked", function () {
            $(this).find("input").is(":checked") ? chkischecked_val = 1 : chkischecked_val = 0
        }), Public.dateCheck(), this.fDatePicker = new Pikaday({field: $("#filter-fromDate")[0]}), this.tDatePicker = new Pikaday({field: $("#filter-toDate")[0]}), n = Public.categoryTree($("#filterCat"), {
            rootTxt: "",
            width: 200
        }), $("#filterCat").placeholder(), setTimeout(function () {
            $("span[id$=_1_span]").html("全部")
        }, 1e3)
    }(), function () {
        var t = this;
        $("#filter-submit").click(function (i) {
            i.preventDefault();
            var o = $("#filter-fromDate").val(), a = $("#filter-toDate").val(), s = t.fDatePicker.getDate(), l = t.tDatePicker.getDate();
            if (s.getTime() > l.getTime()) parent.Public.tips({type: 1, content: "开始日期不能大于结束日期"}); else {
                r = {
                    beginDate: o,
                    endDate: a,
                    goods: $("#filter-goods input").data("ids") || "",
                    goodsNo: $("#filter-goods input").val() || "",
                    storage: $("#filter-storage input").data("ids") || "",
                    storageNo: $("#filter-storage input").val() || "",
                    catId: n.getValue(),
                    catName: n.getText(),
                    ischecked: chkischecked_val
                }, chkVals = chkboxes.chkVal();
                for (var d = 0, c = chkVals.length; d < c; d++)r[chkVals[d]] = 1;
                var g = $.dialog.tips("正在查询，请稍候...", 1e3, "loading.gif", !0);
                Public.ajaxPost("/report/deliverSummary.do?action=detail", r, function (t) {
                    200 === t.status ? ($(".no-query").remove(), $(".ui-print").show(), $(".grid-subtitle").text(r.beginDate + "至" + r.endDate), e(t.data), g.close()) : (g.close(), parent.Public.tips({
                            type: 1,
                            content: t.msg
                        }))
                })
            }
        }), r.search && $("#filter-submit").trigger("click"), r.fromType && $("#filter-submit").trigger("click"), $("#btn-print").click(function (e) {
            e.preventDefault(), Business.verifyRight("InvBalanceReport_PRINT") && window.print()
        }), $("#btn-export").click(function (e) {
            if (e.preventDefault(), Business.verifyRight("DeliverSummaryReport_EXPORT") && Business.noDataExportTips()) {
                var t = {};
                for (var i in r)r[i] && (t[i] = r[i]);
                Business.getFile("/report/deliverSummary.do?action=exporter", t)
            }
        }), $("#config").show().click(function (e) {
            l.config()
        })
    }();
    var d;
    $(window).on("resize", function (e) {
        d || (d = setTimeout(function () {
            t(), d = null
        }, 50))
    })
});