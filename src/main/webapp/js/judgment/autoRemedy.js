var curRow, curCol, SYSTEM = parent.SYSTEM, queryConditions = {
    showZero: "1",
    purNum: "1",
    minStore: "1"
}, colModel = [], storageCombo = {}, THISPAGE = {
    init: function () {
        this.mod_PageConfig = Public.mod_PageConfig.init("autoRemedy"), this.initDom(), this.loadGrid(), this.addEvent()
    }, initDom: function () {
        $("#chkFieldInput").attr("checked", !0), $("#purNumInput").attr("checked", !0), $("#minStoreInput").attr("checked", !0), this.chkField = $("#chkField").cssCheckbox(), this.purNum = $("#purNum").cssCheckbox(), this.minStore = $("#minStore").cssCheckbox(), this.$_category = $("#category"), SYSTEM.hasOnlineStore || $(".wdOrderQty").hide(), storageCombo = $("#storage").combo({
            data: function () {
                return parent.SYSTEM.storageInfo
            },
            text: "name",
            value: "id",
            width: 120,
            defaultSelected: 0,
            addOptions: {text: "全部仓库", value: -1},
            cache: !1
        }).getCombo(), Business.filterGoods(), this.categoryTree = Public.categoryTree(this.$_category, {
            rootTxt: "",
            width: 200
        })
    }, loadGrid: function () {
        var e = !0, i = !0;
        SYSTEM.enableAssistingProp && (e = !1), SYSTEM.hasOnlineStore && (i = !1);
        var t = Public.setGrid();
        colModel = [{
            name: "operating", label: "操作", width: 60, fixed: !0, formatter: function (e, i, t) {
                return '<div class="operating" data-id="' + t.toBillId + '"><a class="ui-icon ui-icon-pencil" title="修改"></a><a class="ui-icon ui-icon-trash" title="删除"></a></div>'
            }, align: "center", sortable: !1, hidden: !0
        }, {name: "invName", label: "商品", index: "invName", width: 200, align: "center"}, {
            name: "skuName",
            label: "属性",
            index: "skuName",
            width: 150,
            align: "center",
            hidden: e
        }, {name: "unitName", label: "单位", index: "unitName", width: 150, align: "center"}, {
            name: "saleNum",
            label: "销售在订量",
            index: "saleNum",
            width: 120,
            align: "center"
        }, {name: "wdNum", label: "网店订购量", index: "wdNum", width: 120, align: "center", hidden: i}, {
            name: "storeNum",
            label: "库存余额",
            index: "storeNum",
            width: 120,
            align: "center"
        }, {name: "purNum", label: "采购在订量", index: "purNum", width: 120, align: "center"}, {
            name: "minStore",
            label: "最低库存",
            index: "minStore",
            width: 120,
            align: "center"
        }, {name: "suggestPurNum", label: "建议采购量", index: "suggestPurNum", width: 120, align: "center"}, {
            name: "invId",
            label: "商品id",
            index: "invId",
            align: "center",
            hidden: !0
        }, {name: "skuId", label: "属性id", index: "skuId", align: "center", hidden: !0}, {
            name: "unitId",
            label: "单位id",
            index: "unitId",
            align: "center",
            hidden: !0
        }], this.mod_PageConfig.gridReg("grid", colModel), colModel = this.mod_PageConfig.conf.grids.grid.colModel, $("#grid").jqGrid({
            url: "/scm/invSupply.do?action=detail",
            postData: queryConditions,
            datatype: "json",
            autowidth: !0,
            height: t.h,
            altRows: !0,
            gridview: !0,
            multiselect: !0,
            onselectrow: !1,
            colModel: colModel,
            cmTemplate: {sortable: !1, title: !1, classes: "ui-ellipsis"},
            shrinkToFit: !1,
            forceFit: !0,
            page: 1,
            pager: "#page",
            rowNum: 100,
            cellEdit: !1,
            cellsubmit: "clientArray",
            rowList: [100, 200, 500],
            viewrecords: !0,
            jsonReader: {root: "data.rows", records: "data.rows", total: "data.total", repeatitems: !1, id: "id"},
            gridComplete: function (e) {
            },
            loadError: function (e, i, t) {
            },
            editCell: function (e, i, t) {
                $("#grid").jqGrid("getRowData", e)
            },
            afterEditCell: function (e, i, t, n, o) {
            },
            beforeSaveCell: function (e, i, t, n, o) {
                return t
            },
            onSelectRow: function (e, i) {
            },
            afterSaveCell: function (e, i, t, n, o) {
                return t
            },
            resizeStop: function (e, i) {
                THISPAGE.mod_PageConfig.setGridWidthByIndex(e, i, "grid")
            }
        }), $("#grid").jqGrid("setFrozenColumns")
    }, reloadData: function (e) {
        $("#grid").jqGrid("setGridParam", {
            url: "/scm/invSupply.do?action=detail",
            datatype: "json",
            postData: e,
            page: 1
        }).trigger("reloadGrid")
    }, addEvent: function () {
        var e = this;
        $("#search").click(function () {
            queryConditions.showZero = e.chkField.chkVal().length > 0 ? "1" : "0", queryConditions.purNum = e.purNum.chkVal().length > 0 ? "1" : "0", queryConditions.minStore = e.minStore.chkVal().length > 0 ? "1" : "0", queryConditions.productNum = $("#filter-goods input").val() || "", queryConditions.locationId = storageCombo.getValue(), queryConditions.catId = e.categoryTree.getValue(), e.reloadData(queryConditions)
        }), $("#toPo").on("click", function (e) {
            if (Business.verifyRight("PO_ADD")) {
                for (var i = $("#grid").jqGrid("getGridParam", "selarrrow"), t = [], n = 0; n < i.length; n++) {
                    var o = i[n], r = $("#grid").jqGrid("getRowData", o);
                    if (r)var a = {
                        id: r.invId,
                        qty: r.suggestPurNum,
                        skuId: r.skuId,
                        skuName: r.skuName,
                        unitName: r.unitName,
                        unitId: r.unitId,
                        locationName: r.locationName,
                        locationId: r.locationId
                    };
                    t.push(a)
                }
                if (t.length) {
                    var d = "purchase-purchaseOrder";
                    parent.cachePurView = t, parent.parent.tab.addTabItem({
                        tabid: d,
                        text: "购货订单",
                        url: "/scm/invPo.do?action=initPo&id=-1&goodsIds=&flag=list&turnBygoodList=1&transType=160701"
                    }), parent.parent.tab.reload(d)
                } else parent.parent.Public.tips({type: 2, content: "请先选择商品！"})
            } else e.preventDefault()
        }), $(".wrapper").on("click", "#export", function (e) {
            if (Business.verifyRight("INVSUPPLY_EXPORT")) {
                if (!Business.noDataExportTips())return !1;
                var i = "";
                for (var t in queryConditions)queryConditions[t] && (i += "&" + t + "=" + queryConditions[t]);
                var n = "/scm/invSupply.do?action=exportInvSupply" + i;
                $(this).attr("href", n)
            } else e.preventDefault()
        }), $("#formula").powerFloat({
            eventType: "click", hoverHold: !1, reverseSharp: !0, target: function () {
                return $("#formulaBox")
            }
        }), $("#minStore,#purNum").click(function (i) {
            i.preventDefault(), $("#search").trigger("click");
            var t = e.minStore.chkVal().length > 0, n = e.purNum.chkVal().length > 0;
            $("#grid").jqGrid(t ? "showCol" : "hideCol", ["minStore"]), $("#grid").jqGrid(n ? "showCol" : "hideCol", ["purNum"])
        }), $("#tips").powerFloat({
            eventType: "hover", hoverHold: !1, reverseSharp: !0, target: function () {
                return $("#tipsBox")
            }
        }), $("#config").show().click(function (i) {
            e.mod_PageConfig.config()
        }), $(window).resize(function () {
            Public.resizeGrid()
        })
    }
};
$(function () {
    THISPAGE.init()
});