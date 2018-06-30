var curRow, curCol, loading = null, import_dialog = null, SYSTEM = parent.SYSTEM, $category = $("#category"), queryConditions = {}, qtyPlaces = Number(parent.SYSTEM.qtyPlaces), pricePlaces = Number(parent.SYSTEM.pricePlaces), amountPlaces = Number(parent.SYSTEM.amountPlaces), THISPAGE = {
    init: function (t) {
        this.mod_PageConfig = Public.mod_PageConfig.init("inventoryList"), this.initDom(t), this.addEvent(), this.loadGrid(t), $(".ui-jqgrid-bdiv").addClass("no-query")
    }, initDom: function (t) {
        this.$_beginDate = $("#beginDate").val(SYSTEM.beginDate), this.$_endDate = $("#endDate").val(SYSTEM.endDate), this.$_storage = $("#storage"), this.$_category = $("#category"), this.$_goods = $("#goodsAuto_no"), this.storageCombo = $("#storage").combo({
            data: function () {
                return parent.SYSTEM.storageInfo
            },
            text: "name",
            value: "id",
            width: 120,
            defaultSelected: 0,
            addOptions: {text: "所有仓库", value: -1},
            cache: !1
        }).getCombo(), this.$_beginDate.datepicker(), this.$_endDate.datepicker(), Business.filterGoods(), this.categoryTree = Public.categoryTree(this.$_category, {
            rootTxt: "",
            width: 200
        })
    }, loadGrid: function (t) {
        $("#grid").jqGrid("GridUnload");
        var e = $(window).height() - $(".grid-wrap").offset().top - 124, i = [{
            name: "operating",
            label: "操作",
            width: 60,
            fixed: !0,
            formatter: function (t, e, i) {
                return '<div class="operating" data-id="' + i.id + '"><a class="ui-icon ui-icon-pencil" title="修改"></a><a class="ui-icon ui-icon-trash" title="删除"></a></div>'
            },
            align: "center",
            sortable: !1
        }, {name: "pdDate", label: "盘点时间", width: 100}, {name: "billNo", label: "盘点编号", width: 150}, {
            name: "orderId",
            label: "盘点orderId",
            width: 0,
            hidden: !0
        }, {name: "billStatus", label: "跳转表示符", width: 0, hidden: !0}, {
            name: "oiBillID",
            label: "销售订单号id",
            index: "srcOrderId",
            width: 100,
            align: "center",
            hidden: !0,
            formatter: function (t, e, i) {
                if (i.pdResult)for (var a in i.pdResult)var o = i.pdResult[a].oiBillId;
                return o || ""
            }
        }, {name: "locationName", label: "盘点仓库", width: 100}, {
            name: "pdResult",
            label: "盘点结果",
            width: 250,
            formatter: function (t, e, i) {
                var a = [];
                if (t && t.length > 0) {
                    for (var o in t)a.push('<a class="oiBillNo" id=' + t[o].oiBillId + ">" + t[o].oiBillNo + "</a>");
                    a = a.join('<p class="line" />')
                }
                return a || ""
            }
        }];
        this.mod_PageConfig.gridReg("grid", i), i = this.mod_PageConfig.conf.grids.grid.colModel, $("#grid").jqGrid({
            data: t,
            mtype: "GET",
            autowidth: !0,
            height: e,
            rownumbers: !0,
            rownumWidth: 30,
            altRows: !0,
            gridview: !0,
            colModel: i,
            cmTemplate: {sortable: !1},
            sortname: "number",
            sortorder: "desc",
            pager: "#page",
            rowNum: 100,
            rowList: [100, 200, 500],
            viewrecords: !0,
            shrinkToFit: !1,
            forceFit: !0,
            cellEdit: !0,
            triggerAdd: !1,
            cellsubmit: "clientArray",
            localReader: {
                root: "data.rows",
                records: "data.records",
                repeatitems: !1,
                total: "data.total",
                page: "data.page",
                id: "orderId"
            },
            jsonReader: {
                root: "data.rows",
                records: "data.records",
                repeatitems: !1,
                total: "data.total",
                page: "data.page",
                id: "orderId"
            },
            gridComplete: function () {
            },
            afterSaveCell: function (t, e, i, a, o) {
            },
            loadError: function (t, e, i) {
            },
            ondblClickRow: function (t, e, i, a) {
                $("#" + t).find(".ui-icon-pencil").trigger("click")
            },
            resizeStop: function (t, e) {
                THISPAGE.mod_PageConfig.setGridWidthByIndex(t, e, "grid")
            }
        }).navGrid("#page", {edit: !1, add: !1, del: !1, search: !1, refresh: !1}).navButtonAdd("#page", {
            caption: "",
            buttonicon: "ui-icon-config",
            onClickButton: function () {
                THISPAGE.mod_PageConfig.config()
            },
            position: "last"
        })
    }, reloadData: function (t) {
        $("#grid").jqGrid("setGridParam", {
            url: "/scm/invOi.do?action=queryPdRecordList",
            datatype: "json",
            postData: t,
            page: 1
        }).trigger("reloadGrid")
    }, addEvent: function () {
        function t() {
            return {
                beginDate: $.trim(e.$_beginDate.val()),
                endDate: $.trim(e.$_endDate.val()),
                locationId: e.storageCombo.getValue(),
                categoryId: e.categoryTree.getValue(),
                goods: e.$_goods.val(),
                isDelete: 0
            }
        }

        var e = this;
        $("#search").click(function () {
            var i = t();
            e.reloadData(i), $(".ui-jqgrid-bdiv").removeClass("no-query")
        }), $("#goodsAuto_no").bind("keyup", function (t) {
            var e = t || window.event;
            13 == (e.keyCode || e.which || e.charCode) && $("#search").click()
        }), $(".grid-wrap").on("click", ".oiBillNo", function (t) {
            t.preventDefault();
            var e = $(this).attr("id"), i = ($("#grid").jqGrid("getRowData", e), $(this).text().split(" ")[1].substr(0, 4)), a = "QTCK" == i ? "其他出库单" : "其他入库单", o = "QTCK" == i ? "storage-otherOutbound" : "storage-otherWarehouse", r = "QTCK" == i ? "/scm/invOi.do?action=initOi&type=out" : "/scm/invOi.do?action=initOi&type=in";
            r = r + "&id=" + e, parent.tab.addTabItem({tabid: o, text: a, url: r})
        }), $(".grid-wrap").on("click", ".ui-icon-pencil", function (t) {
            t.preventDefault();
            var e, i = $(this).closest("tr").attr("id"), a = $("#grid").jqGrid("getRowData", i), o = !!a.pdResult, r = ($("#grid").jqGrid("getDataIDs"), "storage-inventory"), n = a.pdResult, d = n.indexOf("盈"), s = n.indexOf("亏");
            if (-1 != d && -1 == s ? e = "surPlus" : -1 == d && -1 != s ? e = "loss" : -1 != d && -1 != s ? e = "both" : -1 == d && -1 == d && (e = ""), 0 == a.billStatus) parent.tab.addTabItem({
                tabid: r,
                text: "盘点",
                url: "/storage/inventory.jsp?id=" + i + "&transType=" + queryConditions.transType + "&disEditable=" + o
            }); else {
                r = "storage-inventorySN";
                parent.tab.addTabItem({
                    tabid: r,
                    text: "序列号盘点",
                    url: "/storage/inventorySN.jsp?id=" + i + "&transType=" + queryConditions.transType + "&pdSign=" + e + "&disEditable=" + o
                })
            }
        }), $(".grid-wrap").on("click", ".ui-icon-trash", function (t) {
            t.preventDefault();
            var e = $(this).closest("tr").attr("id");
            $.dialog.confirm("您确定要删除该条记录吗？", function () {
                Public.ajaxPost("/scm/invOi.do?action=delete", {id: e}, function (t) {
                    if (200 === t.status && t.msg && t.msg.length) {
                        var e = "<p></p>";
                        for (var i in t.msg) {
                            var a = 1 == t.msg[i].isSuccess ? 0 : 1;
                            "function" != typeof t.msg[i] && (e += '<p class="' + (1 == (i = t.msg[i]).isSuccess ? "" : "red") + '">盘点记录［' + i.id + "］删除" + (1 == i.isSuccess ? "成功！" : "失败：" + i.msg) + "</p>")
                        }
                        parent.Public.tips({type: a, content: e})
                    } else parent.Public.tips({type: 1, content: t.msg});
                    $("#search").trigger("click")
                })
            })
        }), $(window).resize(function () {
            Public.resizeGrid(94)
        })
    }
};
$(function () {
    THISPAGE.init()
});