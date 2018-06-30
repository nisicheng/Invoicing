$(function () {
    var e = this, i = !1, t = Public.mod_PageConfig.init("shippingAddress"), a = 0;
    _page = {
        $btnAdd: $("#btn-add"), $btnRefresh: $("#btn-refresh"), init: function () {
            var e = [{
                name: "operate",
                label: "操作",
                width: 60,
                fixed: !0,
                align: "center",
                formatter: Public.operFmatter
            }, {name: "shortName", label: "地址简称", width: 100}, {
                name: "linkman",
                label: "联系人",
                width: 100,
                align: "center"
            }, {name: "phone", label: "联系电话", width: 100, align: "center"}, {
                name: "mobile",
                label: "手机号码",
                width: 100,
                align: "center"
            }, {name: "province", label: "省", width: 60, classes: "ui-ellipsis", align: "center"}, {
                name: "city",
                label: "市",
                width: 60,
                classes: "ui-ellipsis",
                align: "center"
            }, {name: "area", label: "区", width: 60, classes: "ui-ellipsis", align: "center"}, {
                name: "address",
                label: "详细地址",
                width: 150
            }, {name: "postalcode", label: "邮政编码", width: 80, align: "center"}, {
                name: "isDefault",
                label: "默认地址",
                width: 80,
                align: "center",
                formatter: function (e) {
                    return 1 == e ? (i = !0, "是") : "否"
                }
            }];
            t.gridReg("grid", e), e = t.conf.grids.grid.colModel, this.$gird = $("#grid").jqGrid({
                colModel: e,
                url: "/basedata/deliveryAddr.do?action=list",
                datatype: "json",
                height: Public.setGrid().h,
                altRows: !0,
                gridview: !0,
                autowidth: !0,
                pager: "#page",
                viewrecords: !0,
                multiselect: !0,
                cmTemplate: {sortable: !1, title: !1},
                page: 1,
                rowNum: 3e3,
                shrinkToFit: !1,
                forceFit: !0,
                scroll: 1,
                jsonReader: {root: "data.items", records: "data.totalsize", repeatitems: !1, id: "id"},
                loadComplete: function (e) {
                    if (e && 200 == e.status) {
                        var i = {};
                        e = e.data;
                        for (var t = 0; t < e.items.length; t++) {
                            var a = e.items[t];
                            i[a.id] = a
                        }
                        $("#grid").data("gridData", i), 0 == e.items.length && parent.Public.tips({
                            type: 2,
                            content: "没有地址数据！"
                        })
                    } else parent.Public.tips({type: 2, content: "获取地址数据失败！" + e.msg})
                },
                loadError: function (e, i, t) {
                    parent.Public.tips({type: 1, content: "操作失败了哦，请检查您的网络链接！"})
                },
                resizeStop: function (e, i) {
                    t.setGridWidthByIndex(e, i, "grid")
                }
            }).navGrid("#page", {edit: !1, add: !1, del: !1, search: !1, refresh: !1}).navButtonAdd("#page", {
                caption: "",
                buttonicon: "ui-icon-config",
                onClickButton: function () {
                    t.config()
                },
                position: "last"
            })
        }
    }, _event = {
        init: function () {
            _page.$btnRefresh.click(function (e) {
                e.preventDefault(), a = 1, _page.$gird.jqGrid("setGridParam", {
                    url: "/basedata/deliveryAddr.do?action=list",
                    datatype: "json",
                    postData: {isUserOpt: a}
                }).trigger("reloadGrid")
            }), _page.$btnAdd.click(function (t) {
                t.preventDefault(), Business.verifyRight("DELIVERYADDR_ADD") && e.pop("新增发货地址", {
                    oper: "add",
                    callback: e.callback,
                    hasDefault: i
                }, "url:shippingAddressManage.jsp")
            }), _page.$gird.on("click", ".operating .ui-icon-pencil", function (t) {
                if (t.preventDefault(), Business.verifyRight("DELIVERYADDR_UPDATE")) {
                    var a = $(this).parent().data("id");
                    Public.ajaxPost("/basedata/deliveryAddr.do?action=query", {id: a}, function (t) {
                        200 == t.status ? e.pop("修改发货地址", {
                                oper: "edit",
                                rowData: t.data,
                                callback: e.callback,
                                hasDefault: i
                            }, "url:shippingAddressManage.jsp") : parent.parent.Public.tips({
                                type: 1,
                                content: msg + "失败！" + t.msg
                            })
                    })
                }
            }), _page.$gird.on("click", ".operating .ui-icon-trash", function (e) {
                if (e.preventDefault(), Business.verifyRight("DELIVERYADDR_DELETE")) {
                    var t = $(this).parent().data("id");
                    $.dialog.confirm("删除的地址将不能恢复，请确认是否删除？", function () {
                        Public.ajaxPost("/basedata/deliveryAddr.do?action=delete", {id: t}, function (e) {
                            e && 200 == e.status ? (parent.Public.tips({content: "地址删除成功！"}), "是" == $("#grid").jqGrid("getRowData", t).isDefault && (i = !1), $("#grid").jqGrid("delRowData", t)) : parent.Public.tips({
                                    type: 1,
                                    content: "地址删除失败！" + e.msg
                                })
                        })
                    })
                }
            }), $(window).resize(function () {
                Public.resizeGrid()
            })
        }
    }, e.callback = function (e, t, a, n) {
        i = n;
        var r = $("#grid").data("gridData");
        r || (r = {}, $("#grid").data("gridData", r)), r[e.id] = e, "edit" == t ? ($("#grid").jqGrid("setRowData", e.id, e), a && a.api.close()) : ($("#grid").jqGrid("addRowData", e.id, e, "last"), a && a.resetForm(e))
    }, e.pop = function (e, i, t) {
        $.dialog({title: e, content: t, data: i, width: 640, height: 310, min: !1, max: !1, cache: !1, lock: !0})
    }, e.init = function () {
        _page.init(), _event.init()
    }, e.init()
});