function cancleGridEdit() {
    null !== curRow && null !== curCol && ($("#grid").jqGrid("saveCell", curRow, curCol), curRow = null, curCol = null)
}
var curRow, curCol, curArrears, curGroup, urlParam = Public.urlParam(), queryConditions = {matchCon: ""}, SYSTEM = system = parent.SYSTEM, hiddenAmount = !1, billRequiredCheck = system.billRequiredCheck, pricePlaces = Number(parent.SYSTEM.pricePlaces), THISPAGE = {
    init: function (e) {
        !1 !== SYSTEM.isAdmin || SYSTEM.rights.AMOUNT_INAMOUNT || (hiddenAmount = !0), this.mod_PageConfig = Public.mod_PageConfig.init("purchaseView"), this.initDom(), this.loadGrid(), this.editable = !0, $("#grid").jqGrid("setGridParam", {cellEdit: !0}), this.addEvent()
    }, initDom: function () {
        this.$_matchCon = $("#matchCon"), this.$_hasPurReady = $("#hasPurReady").attr("checked", !0), this.$_saleOrderNumber = $("#saleOrderNumber"), this.$_beginDate = $("#beginDate").val(system.beginDate), this.$_endDate = $("#endDate").val(system.endDate), this.$_matchCon.placeholder(), this.$_saleOrderNumber.placeholder(), this.$_beginDate.datepicker(), this.$_endDate.datepicker()
    }, loadGrid: function () {
        function e(e, t, i) {
            return e = 0 == e ? "" : e
        }

        var t = Public.setGrid(), i = this;
        queryConditions.beginDate = this.$_beginDate.val(), queryConditions.endDate = this.$_endDate.val(), queryConditions.flag = !0 === this.$_hasPurReady.prop("checked") ? 1 : 0, i.markRow = [];
        var n = ["操作", "商品", "属性", "单位", "数量", "订单号", "订单日期", "库存", "购货/销货日期", "购货订单号", "以销定购数量", "实际入库数量", "销货单号", "销货出库数量", "未出库数量", '待采购数量<a title="(销货订单总数量-以销定购前已出库数量-以销定购数量)" class="question-tips"></a>', '<span class="red">*</span>本次采购数量', "本次采购价格", "商品id", "属性id", "单位id", "销售订单体id", "销售订单id", "分录", "仓库id", "仓库名称"], r = [{
            name: "operating",
            label: "操作",
            width: 60,
            fixed: !0,
            formatter: function (e, t, i) {
                return '<div class="operating" data-id="' + i.toBillId + '"><a class="ui-icon ui-icon-pencil" title="修改"></a><a class="ui-icon ui-icon-trash" title="删除"></a></div>'
            },
            align: "center",
            sortable: !1,
            hidden: !0
        }, {name: "invName", label: "商品", index: "invName", width: 100, align: "center"}, {
            name: "skuName",
            label: "属性",
            index: "skuName",
            width: 100,
            align: "center"
        }, {name: "unitName", label: "单位", index: "unitName", width: 61, align: "center"}, {
            name: "qty",
            colNames: "数量",
            index: "qty",
            width: 61,
            formatter: e,
            align: "center"
        }, {
            name: "billNo", label: "订单号", index: "billNo", width: 150, formatter: function (e, t, i) {
                var n = '<span class="salesOrderLink" style="text-decoration:underline;cursor:pointer">' + e + "</span>";
                return e ? n : ""
            }, title: !0, align: "center"
        }, {name: "date", label: "订单日期", index: "date", width: 100, align: "center"}, {
            name: "inventory",
            label: "库存",
            width: 60,
            align: "center",
            formatter: function (e, t, i) {
                return '<a class="ui-icon-cart btn_query_inventory"></a>'
            }
        }, {
            name: "toDate", label: "购货/销货日期", index: "toDate", formatter: function (e, t, i) {
                for (var n = [], r = 0; r < i.entries.length; r++)i.entries[r].toDate ? n.push(i.entries[r].toDate) : n.push("&#160;");
                return n.join('<p class="line" />')
            }, width: 100, align: "center"
        }, {
            name: "purBillNo", label: "购货订单号", index: "purBillNo", width: 120, formatter: function (e, t, i) {
                for (var n = [], r = 0; r < i.entries.length; r++)if (i.entries[r].purBillNo) {
                    var a = '<span class="purBillNoLink link" data-id="' + i.entries[r].toBillId + '">' + i.entries[r].purBillNo + "</span>";
                    n.push(a)
                } else n.push("&#160;");
                return n.join('<p class="line" />')
            }, align: "center"
        }, {
            name: "puQty", label: "以销定购数量", index: "puQty", width: 80, formatter: function (e, t, i) {
                for (var n = [], r = 0; r < i.entries.length; r++)i.entries[r].puQty ? n.push(i.entries[r].puQty) : n.push("&#160;");
                return n.join('<p class="line" />')
            }, align: "center"
        }, {
            name: "puEntryQty",
            label: "实际入库数量",
            index: "puEntryQty",
            width: 100,
            align: "center",
            formatter: function (e, t, i) {
                for (var n = [], r = 0; r < i.entries.length; r++)i.entries[r].puEntryQty ? n.push(i.entries[r].puEntryQty) : n.push("&#160;");
                return n.join('<p class="line" />')
            }
        }, {
            name: "saBillNo", label: "销货单号", index: "saBillNo", width: 120, formatter: function (e, t, i) {
                for (var n = [], r = 0; r < i.entries.length; r++)if (i.entries[r].saBillNo) {
                    var a = '<span class="saBillNoLink link" data-id="' + i.entries[r].toBillId + '">' + i.entries[r].saBillNo + "</span>";
                    n.push(a)
                } else n.push("&#160;");
                return n.join('<p class="line" />')
            }, align: "center"
        }, {
            name: "saQty", label: "销货出库数量", index: "saQty", width: 100, formatter: function (e, t, i) {
                for (var n = [], r = 0; r < i.entries.length; r++)i.entries[r].saQty ? n.push(i.entries[r].saQty) : n.push("&#160;");
                return n.join('<p class="line" />')
            }, align: "center"
        }, {name: "ioQty", label: "未出库数量", index: "ioQty", width: 80, formatter: e, align: "center"}, {
            name: "purQty",
            label: "待采购数量",
            index: "purQty",
            title: !0,
            width: 80,
            formatter: function (e, t, i) {
                return 0 == e && "1" != i.numNo ? "&#160;" : e
            },
            align: "center"
        }, {
            name: "purThisQty",
            label: "本次采购数量",
            index: "purThisQty",
            width: 80,
            formatter: "number",
            formatoptions: {thousandsSeparator: ",", defaulValue: "", decimalPlaces: ""},
            align: "center",
            classes: "edit",
            editable: !0
        }, {
            name: "purPrice",
            label: "本次采购价格",
            index: "purPrice",
            width: 100,
            formatter: "currency",
            formatoptions: {showZero: !0, decimalPlaces: pricePlaces},
            align: "right",
            classes: "edit",
            editable: !0
        }, {name: "invId", label: "商品id", index: "invId", align: "center", hidden: !0}, {
            name: "skuId",
            label: "属性id",
            index: "skuId",
            align: "center",
            hidden: !0
        }, {name: "unitId", label: "单位id", index: "unitId", align: "center", hidden: !0}, {
            name: "entryId",
            label: "销售订单体id",
            index: "entryId",
            align: "center",
            hidden: !0
        }, {name: "billId", label: "销售订单id", index: "billId", align: "center", hidden: !0}, {
            name: "numNo",
            label: "分录",
            index: "numNo",
            align: "center",
            hidden: !0
        }, {name: "locationId", label: "仓库id", index: "locationId", align: "center", hidden: !0}, {
            name: "locationName",
            label: "仓库名称",
            index: "locationName",
            align: "center",
            hidden: !0
        }];
        this.mod_PageConfig.gridReg("grid", r), r = this.mod_PageConfig.conf.grids.grid.colModel, $("#grid").jqGrid({
            url: "/scm/invSo.do?action=findSoToOrder",
            postData: queryConditions,
            datatype: "json",
            autowidth: !0,
            height: t.h,
            colNames: n,
            altRows: !0,
            gridview: !0,
            multiselect: !0,
            onselectrow: !1,
            colModel: r,
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
                $('td[aria-describedby="grid_invName"]').each(function (e, t) {
                    var i = $(this);
                    $.trim(i.text()) ? i.closest("tr").find(".cbox").change(function (e) {
                            i.closest("tr").nextUntil('tr:not(".tr_detail")').each(function (e, t) {
                                $(this).find(".cbox").trigger("click")
                            })
                        }) : i.closest("tr").addClass("tr_detail").find(".cbox").hide()
                });
                var t = "", i = !0;
                $('td[aria-describedby="grid_billNo"]').each(function (e, n) {
                    var r = $(n).attr("title");
                    r !== t && (i = !i, t = r), !0 === i && $(n).closest("tr").addClass("ui-state-distbill")
                }), $($('td[aria-describedby="grid_purThisQty"]')[0]).trigger("click"), $('td[aria-describedby="grid_purThisQty"]').keyup(function (e) {
                    switch (e.keyCode) {
                        case 40:
                            $(this).closest("tr").next().find('td[aria-describedby="grid_purThisQty"]').trigger("click");
                            break;
                        case 38:
                            $(this).closest("tr").prev().find('td[aria-describedby="grid_purThisQty"]').trigger("click")
                    }
                })
            },
            loadError: function (e, t, i) {
            },
            editCell: function (e, t, i) {
                $("#grid").jqGrid("getRowData", e)
            },
            ondblClickRow: function (e, t, i, n) {
                $("#" + e).find(".ui-icon-pencil").trigger("click")
            },
            afterEditCell: function (e, t, i, n, r) {
                var a = $("#grid").jqGrid("getRowData", e);
                "purThisQty" !== t || "1" === a.numNo ? "purPrice" !== t || "1" === a.numNo || $("#grid").jqGrid("restoreCell", n, r) : $("#grid").jqGrid("restoreCell", n, r)
            },
            beforeSaveCell: function (e, t, i, n, r) {
                return i
            },
            onSelectRow: function (e, t) {
                cancleGridEdit();
                var i = $("#grid").jqGrid("getRowData", e);
                if (t) {
                    if (i.purThisQty)return;
                    $("#grid").jqGrid("setRowData", e, {purThisQty: i.purQty})
                } else $("#grid").jqGrid("setRowData", e, {purThisQty: ""})
            },
            afterSaveCell: function (e, t, i, n, r) {
                return i
            },
            resizeStop: function (e, t) {
                THISPAGE.mod_PageConfig.setGridWidthByIndex(e, t, "grid")
            }
        }).jqGrid("setGroupHeaders", {
            useColSpanStyle: !0,
            groupHeaders: [{
                startColumnName: "invName",
                numberOfColumns: 7,
                titleText: "销货订单信息"
            }, {startColumnName: "toDate", numberOfColumns: 8, titleText: "实际出入库数量"}, {
                startColumnName: "purThisQty",
                numberOfColumns: 2,
                titleText: "本次采购信息"
            }]
        }), $("#grid").jqGrid("setFrozenColumns")
    }, reloadData: function (e) {
        this.markRow = [], $("#grid").jqGrid("setGridParam", {
            url: "/scm/invSo.do?action=findSoToOrder",
            datatype: "json",
            postData: e
        }).trigger("reloadGrid")
    }, addEvent: function () {
        var e = this;
        $("#toPo").on("click", function (e) {
            if (Business.verifyRight("PO_ADD")) {
                cancleGridEdit();
                for (var t = $("#grid").jqGrid("getGridParam", "selarrrow"), i = [], n = 0; n < t.length; n++)(a = t[n]) && 1 == (d = $("#grid").jqGrid("getRowData", a)).numNo && i.push(t[n]);
                for (var r = [], n = 0; n < i.length; n++) {
                    var a = i[n];
                    if (a) {
                        var d = $("#grid").jqGrid("getRowData", a);
                        if (d.purQty < 0 || 0 == d.purQty)return void parent.parent.Public.tips({
                            type: 2,
                            content: "待采购数量需大于0，否则无法生成购货订单！"
                        });
                        if (!d.purThisQty)return void parent.parent.Public.tips({type: 2, content: "请录入本次采购数量！"});
                        if (d)var l = d.billNo.split("</span>")[0].split('">')[1], o = {
                            id: d.invId,
                            qty: d.purThisQty,
                            price: d.purPrice,
                            skuId: d.skuId,
                            skuName: d.skuName,
                            unitName: d.unitName,
                            unitId: d.unitId,
                            inventory: "",
                            locationName: d.locationName,
                            locationId: d.locationId,
                            srcOrderEntryId: d.entryId,
                            srcOrderId: d.billId,
                            srcOrderNo: l
                        };
                        r.push(o)
                    }
                }
                if (r.length) {
                    var s = "purchase-purchaseOrder";
                    parent.cachePurView = r, parent.parent.tab.addTabItem({
                        tabid: s,
                        text: "购货订单",
                        url: "/scm/invPo.do?action=initPo&id=-1&goodsIds=&flag=list&turnBygoodList=1&transType=160701"
                    }), parent.parent.tab.reload(s)
                } else parent.parent.Public.tips({type: 2, content: "请先选择单据！"})
            } else e.preventDefault()
        }), $(".grid-wrap").on("click", ".ui-icon-pencil", function (e) {
            if (e.preventDefault(), Business.verifyRight("PO_ADD")) {
                var t = $(this).closest("tr")[0].id, i = $("#grid").jqGrid("getRowData", t), n = ($(this).parent().data("id"), []);
                if (i.purQty < 0 || 0 == i.purQty) parent.parent.Public.tips({
                    type: 2,
                    content: "待采购数量需大于0，否则无法生成购货订单！"
                }); else {
                    if (i)var r = i.billNo.split("</span>")[0].split('">')[1], a = {
                        id: i.invId,
                        qty: i.purThisQty,
                        price: i.purPrice,
                        skuId: i.skuId,
                        skuName: i.skuName,
                        unitName: i.unitName,
                        unitId: i.unitId,
                        inventory: "",
                        locationName: i.locationName,
                        locationId: i.locationId,
                        srcOrderEntryId: i.entryId,
                        srcOrderId: i.billId,
                        srcOrderNo: r
                    };
                    if (n.push(a), i.purThisQty) {
                        if (n.length) {
                            var d = "purchase-purchaseOrder";
                            parent.cachePurView = n, parent.parent.tab.addTabItem({
                                tabid: d,
                                text: "购货订单",
                                url: "/scm/invPo.do?action=initPo&id=-1&goodsIds=&flag=list&turnBygoodList=1&transType=160701"
                            }), parent.parent.tab.reload(d)
                        }
                    } else parent.parent.Public.tips({type: 2, content: "请输入本次采购数量！"})
                }
            }
        }), $("#grid").on("click", ".btn_query_inventory", function (e) {
            e.stopPropagation();
            var t = $("#grid").jqGrid("getRowData", $(this).closest("tr").attr("id"));
            if (t.invId) {
                t.invName;
                void 0 !== t.skuName && t.skuName.length > 0 && " " + t.skuName, Business.forSearch($(this).closest("tr").attr("id"), "grid")
            } else parent.Public.tips({type: 2, content: "请先录入商品！"})
        }), $(".grid-wrap").on("click", ".salesOrderLink", function (e) {
            e.preventDefault();
            var t = $(this).closest("tr")[0].id, i = $("#grid").jqGrid("getRowData", t), n = 1 == i.disEditable ? "&disEditable=true" : "";
            parent.tab.addTabItem({
                tabid: "sales-salesOrder",
                text: "销货订单",
                url: "/sales/salesOrder.jsp?id=" + i.billId + "&flag=list" + n
            })
        }), $(".grid-wrap").on("click", ".purBillNoLink", function (e) {
            e.preventDefault();
            var t = $(this).data("id"), i = $(this).closest("tr")[0].id, n = $("#grid").jqGrid("getRowData", i);
            parent.cacheList.purchaseId = $("#grid").jqGrid("getDataIDs");
            var r = 1 == n.disEditable ? "&disEditable=true" : "";
            parent.tab.addTabItem({
                tabid: "purchase-purchaseOrder",
                text: "购货订单",
                url: "/purchase/purchaseOrder.jsp?id=" + t + "&flag=list" + r + "&transType=" + queryConditions.transType
            })
        }), $(".grid-wrap").on("click", ".saBillNoLink", function (e) {
            e.preventDefault();
            var t = $(this).data("id");
            parent.tab.addTabItem({
                tabid: "sales-sales",
                text: "销货单",
                url: "/sales/sales.jsp?id=" + t + "&flag=list&transType=" + queryConditions.transType
            })
        }), $("#grid").on("click", 'td:not(".edit")', function (e) {
            "grid_cb" !== $(this).attr("aria-describedby") && $(this).closest("tr").find(".cbox").trigger("click")
        }), $("#search").click(function () {
            for (var t in queryConditions)"transType" != t && (queryConditions[t] = "");
            queryConditions.matchCon = "请输入商品编号/商品名称/规格/属性" === e.$_matchCon.val() ? "" : e.$_matchCon.val(), queryConditions.flag = !0 === e.$_hasPurReady.prop("checked") ? 1 : 0, queryConditions.billNo = "请输入销售订单号" === e.$_saleOrderNumber.val() ? "" : e.$_saleOrderNumber.val(), queryConditions.beginDate = e.$_beginDate.val(), queryConditions.endDate = e.$_endDate.val(), THISPAGE.reloadData(queryConditions)
        }), $("#moreCon").click(function () {
            queryConditions.matchCon = e.$_matchCon.val(), queryConditions.beginDate = e.$_beginDate.val(), queryConditions.endDate = e.$_endDate.val(), $.dialog({
                id: "moreCon",
                lock: !0,
                width: 480,
                height: 300,
                min: !1,
                max: !1,
                title: "高级搜索",
                button: [{
                    name: "确定", focus: !0, callback: function () {
                        queryConditions = this.content.handle(), THISPAGE.reloadData(queryConditions), "" !== queryConditions.matchCon ? e.$_matchCon.val(queryConditions.matchCon) : e.$_matchCon.val("请输入商品编号/商品名称/规格/属性"), e.$_beginDate.val(queryConditions.beginDate), e.$_endDate.val(queryConditions.endDate)
                    }
                }, {name: "取消"}],
                resize: !1,
                content: "url:/purchase/purchase-search.jsp?type=purchase&page=purchaseOrderList",
                data: queryConditions
            })
        }), $(window).resize(function () {
            Public.resizeGrid()
        }), $(".wrapper").on("click", ".checkedAll", function (e) {
            e.preventDefault()
        }), $("#config").show().click(function (t) {
            e.mod_PageConfig.config()
        }), $("#saleOrderNumber").bind("keyup", function (e) {
            var t = e || window.event;
            13 == (t.keyCode || t.which || t.charCode) && $("#search").click()
        }), setTimeout(function () {
            $(".checkedAll").on("click", function (e) {
                e.preventDefault()
            })
        }, 1e3)
    }
};
$(function () {
    THISPAGE.init()
});