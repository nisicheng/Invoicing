$(function () {
    function e(a) {
        a && (e.h = a);
        var r = t(), n = $(window).height() - $(".grid-wrap").offset().top - 65 - 150, l = i(), o = $("#grid"), d = $(".ui-jqgrid-htable").height();
        n > l && (n = l), r < o.width() && (n += 17), $("#grid-wrap").height(function () {
            return document.body.clientHeight - this.offsetTop - 36 - 5
        }), o.jqGrid("setGridHeight", n), o.jqGrid("setGridWidth", r);
        var s = n > 0 ? parseInt(n, 10) : 0;
        $(".frozen-sdiv").attr("style", "position:absolute;left:0;top:" + (parseInt(d, 10) + s + 1) + "px")
    }

    function t() {
        return $(window).width() - $("#grid-wrap").offset().left - 36 - 20
    }

    function i() {
        return $(window).height() - $("#grid").offset().top - 36 - 46
    }

    function a() {
        $(".no-query").remove(), $(".ui-print").show(), $("#grid").clearGridData(!0), $("#grid").jqGrid("setGridParam", {
            mtype: "POST",
            datatype: "json",
            postData: n,
            url: o
        }).trigger("reloadGrid")
    }

    var r = parent.SYSTEM, n = $.extend({
        beginDate: "",
        endDate: "",
        customerNo: "",
        goodsNo: "",
        storageNo: "",
        colModel: ""
    }, Public.urlParam()), l = "/report/puDetail.do?action=detailExporter", o = "/report/puDetail.do?action=purchaseDetailList", d = Public.mod_PageConfig.init("puDetailNew");
    !function () {
        Business.getSearchList(), Business.filterSupplier(), Business.filterGoods(), Business.filterStorage(), $("#date,#supplier,#goods,#storage,#billNum,#filter").show(), $("#remarkCon").val(""), $("#billNum label").text("单据编号"), $("#filter label").text("供应商类别"), $("#filter-fromDate").val(n.beginDate || ""), $("#filter-toDate").val(n.endDate || ""), $("#filter-supplier input").val(n.customerNo || ""), $("#filter-goods input").val(n.goodsNo || ""), $("#filter-storage input").val(n.storageNo || ""), n.beginDate && n.endDate && ($("#selected-period").text(n.beginDate + "至" + n.endDate), $("div.grid-subtitle").text("日期: " + n.beginDate + " 至 " + n.endDate)), $("#filter-fromDate, #filter-toDate").datepicker(), Business.moreFilterEvent();
        var e = $("#matchCon");
        e.placeholder();
        var t = Public.categoryTree($("#catorage"), {
            typeNumber: "supplytype",
            inputWidth: 122,
            height: 200,
            width: 112
        });
        $("#filter-submit").on("click", function (i) {
            i.preventDefault();
            var r = $("#filter-fromDate").val(), l = $("#filter-toDate").val(), o = "请输入单号查询" === e.val() ? "" : $.trim(e.val()), d = 0 == t.getValue() ? -1 : t.getValue();
            r && l && new Date(r).getTime() > new Date(l).getTime() ? parent.Public.tips({
                    type: 1,
                    content: "开始日期不能大于结束日期"
                }) : (n = {
                    beginDate: r,
                    endDate: l,
                    customerNo: $("#filter-supplier input").val() || "",
                    goodsNo: $("#filter-goods input").val() || "",
                    storageNo: $("#filter-storage input").val() || "",
                    billNo: o,
                    categoryId: d,
                    desc: "请输入备注查询" == $("#remarkCon").val() ? "" : $("#remarkCon").val()
                }, $("#selected-period").text(r + "至" + l), $("div.grid-subtitle").text("日期: " + r + " 至 " + l), a(), $("#filter-menu").removeClass("ui-btn-menu-cur"))
        }), $("#filter-reset").on("click", function (e) {
            e.preventDefault(), $("#filter-fromDate").val(n.beginDate), $("#filter-toDate").val(n.endDate), $("#filter-supplier input").val(""), $("#filter-goods input").val(""), $("#filter-storage input").val(""), n.customerNo = "", n.goodsNo = "", n.storageNo = ""
        })
    }(), $("#refresh").on("click", function (e) {
        e.preventDefault(), $("#filter-submit").click()
    }), $("#btn-print").click(function (e) {
        e.preventDefault(), Business.verifyRight("PUREOORTDETAIL_PRINT") && $("div.ui-print").printTable()
    }), $("#btn-export").click(function (e) {
        e.preventDefault(), Business.verifyRight("PUREOORTDETAIL_EXPORT") && Business.noDataExportTips() && (n.colModel = JSON.stringify($("#grid").jqGrid("getGridParam", "colModel")), Business.getFile(l, n))
    }), $("#config").show().click(function (e) {
        d.config()
    }), function () {
        var t = !1, i = !1;
        !1 !== r.isAdmin || r.rights.AMOUNT_COSTAMOUNT, !1 !== r.isAdmin || r.rights.AMOUNT_OUTAMOUNT, !1 !== r.isAdmin || r.rights.AMOUNT_INAMOUNT || (t = !0, i = !0), 0 === r.taxRequiredCheck && (i = !0);
        var a = [{name: "date", label: "采购日期", width: 80, align: "center"}, {
            name: "billNo",
            label: "采购单据号",
            width: 200,
            align: "center"
        }, {name: "transType", label: "业务类别", width: 60, align: "center"}, {
            name: "buName",
            label: "供应商",
            width: 100,
            align: "center"
        }, {name: "invNo", label: "商品编号", width: 80, align: "center"}, {
            name: "invName",
            label: "商品名称",
            width: 120,
            align: "center"
        }, {name: "spec", label: "规格型号", width: 120, align: "center"}, {
            name: "unit",
            label: "单位",
            width: 60,
            align: "center"
        }, {name: "location", label: "仓库", width: 100, align: "center"}, {
            name: "qty",
            label: "数量",
            width: 100,
            align: "right"
        }, {name: "unitPrice", label: "单价", width: 100, align: "right", hidden: t}, {
            name: "amount",
            label: "采购金额",
            width: 100,
            align: "right",
            hidden: t
        }, {name: "tax", label: "税额", width: 100, align: "right", hidden: i}, {
            name: "taxAmount",
            label: "价税合计",
            width: 100,
            align: "right",
            hidden: i
        }, {name: "description", label: "备注", width: 180, align: "left"}, {
            name: "billId",
            label: "",
            width: 0,
            hidden: !0
        }, {name: "billType", label: "", width: 0, hidden: !0}], l = "local", s = "#";
        n.autoSearch && (l = "json", s = o), d.gridReg("grid", a), a = d.conf.grids.grid.colModel, $("#grid").jqGrid({
            url: s,
            postData: n,
            datatype: l,
            autowidth: !0,
            gridview: !0,
            colModel: a,
            cmTemplate: {sortable: !1, title: !1},
            page: 1,
            sortname: "date",
            sortorder: "desc",
            pager: "#page",
            rowNum: 500,
            rowList: [500, 1e3, 5e3],
            viewrecords: !0,
            shrinkToFit: !1,
            forceFit: !0,
            footerrow: !0,
            userDataOnFooter: !0,
            jsonReader: {
                root: "data.rows",
                records: "data.records",
                total: "data.total",
                userdata: "data.userData",
                repeatitems: !1,
                id: "0"
            },
            onCellSelect: function (e) {
                var t = $("#grid").getRowData(e), i = t.billId;
                if (t.billType, "退货" == t.transType) {
                    if (a = "150502", !Business.verifyRight("PUBACK_QUERY"))return;
                    parent.tab.addTabItem({
                        tabid: "purchase-purchaseBack",
                        text: "购货退货单",
                        url: "/purchase/purchase.jsp?id=" + i + "&transType=" + a
                    })
                } else {
                    var a = "150501";
                    if (!Business.verifyRight("PU_QUERY"))return;
                    parent.tab.addTabItem({
                        tabid: "purchase-purchase",
                        text: "购货单",
                        url: "/purchase/purchase.jsp?id=" + i + "&transType=" + a
                    })
                }
            },
            loadComplete: function (t) {
                var i;
                if (t && t.data) {
                    var a = t.data.rows.length;
                    i = a ? 31 * a : 1
                }
                e(i)
            },
            gridComplete: function () {
                $("#grid").footerData("set", {date: "合计:"}), $("table.ui-jqgrid-ftable").find('td[aria-describedby="grid_location"]').prevUntil().css("border-right-color", "#fff")
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