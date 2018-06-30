$(function () {
    var e = !1, t = 0, a = {
        operate: function (e, t) {
            function a() {
                t = "", $("#name").val(""), $("#number").val(""), $("#remark").val("")
            }

            function i(e, t) {
                if (e.parent().find(".invalid").remove(), t) {
                    var a = '<span class="red invalid">' + ("number" == e.attr("id") ? "品牌编码" : "品牌名称") + "不能为空  </span>";
                    e.parent().append(a)
                }
            }

            function r() {
                var a = $("#name").val();
                if (!a)return i($("#name"), 1), !1;
                var r = $("#number").val();
                if (!r)return i($("#number"), 1), !1;
                var s = $("#remark").val();
                if (("add" != e || parent.Business.verifyRight("BRAND_ADD")) && ("update" != e || parent.Business.verifyRight("BRAND_UPDATE"))) {
                    var l = t ? "update" : "add";
                    return Public.ajaxPost("../basedata/brand.do?action=" + l, {
                        name: a,
                        number: r,
                        remark: s,
                        id: t || ""
                    }, function (e) {
                        e && 200 == e.status ? (parent.Public.tips({
                                type: 0,
                                content: n + "成功"
                            }), $("#grid").trigger("reloadGrid")) : parent.Public.tips({
                                type: 1,
                                content: n + "失败！" + e.msg
                            })
                    }), !0
                }
            }

            if ("add" == e)var n = "新增商品品牌", s = {oper: e}; else var n = "修改商品品牌", s = {oper: e, rowId: t};
            var l = ['<form id="manage-form" action="">', '<ul class="mod-form-rows manage-wrap" id="manager">', '<li class="row-item" style="clear:both">', '<div class="label-wrap fl"><span class="red spe_red">*</span><label for="number">品牌编码:</label></div>', '<div class="ctn-wrap fl" style="position:relative;"><input type="text" maxlength="30" value="" class="ui-input" name="number" id="number"></br></div>', "</li>", '<li class="row-item" style="clear:both">', '<div class="label-wrap fl"><span class="red spe_red">*</span><label for="name">品牌名称:</label></div>', '<div class="ctn-wrap fl"><input type="text" value="" class="ui-input" maxlength="80" name="category" id="name"></br></div>', "</li>", '<li class="row-item" style="clear:both">', '<div class="label-wrap fl"><label for="remark">备注:</label></div>', '<div class="ctn-wrap fl"><textarea id="remark" maxlength="255" class="ui-input"></textarea></br></div>', "</li>", "</ul>", "</form>"];
            $.dialog({
                title: n, content: l, data: s, width: 400, height: 200, max: !1, min: !1, init: function () {
                    Public.ajaxGet("../basedata/brand.do?action=query", {id: t}, function (e) {
                        if (e && 200 == e.status) {
                            var e = e.data;
                            $("#name").val(e.name), $("#number").focus(), $("#number").val(e.number), $("#remark").val(e.remark)
                        } else $("#number").focus()
                    }), $(".ctn-wrap .ui-input").bind("blur", function (e) {
                        e.preventDefault();
                        var t = $(this);
                        "" !== t.val() && i(t, 0)
                    })
                }, button: [{
                    id: "save", name: "保存", focus: !0, callback: function () {
                        return !!r() && (!!t || (a(), $("#number").focus(), !1))
                    }
                }, {id: "cancel", name: "关闭"}], cache: !1, lock: !0
            })
        }, del: function (e) {
            $.dialog.confirm("删除的商品品牌将不能恢复，请确认是否删除？", function () {
                Public.ajaxPost("../basedata/brand.do?action=delete", {id: e}, function (e) {
                    e && 200 == e.status ? (Public.showBasicDeleteMsg(e.data, "商品品牌"), $("#search").trigger("click")) : parent.Public.tips({
                            type: 1,
                            content: "删除商品品牌失败！" + e.msg
                        })
                })
            })
        }, setStatus: function (e, t) {
            var a = !1;
            !1 === t && (a = Business.verifyRight("BRAND_ABLE")), !0 === t && (a = Business.verifyRight("BRAND_DISABLE")), e && a && Public.ajaxPost("../basedata/brand.do?action=disable", {
                ids: e,
                disable: Number(t)
            }, function (a) {
                a && 200 == a.status ? (parent.Public.tips({content: "商品品牌状态修改成功！"}), $("#grid").jqGrid("setCell", e, "isdelete", t)) : parent.Public.tips({
                        type: 1,
                        content: "商品品牌状态修改失败！" + a.msg
                    })
            })
        }, setStatuses: function (e, t) {
            var a = !1;
            if (!1 === t && (a = Business.verifyRight("BRAND_ABLE")), !0 === t && (a = Business.verifyRight("BRAND_DISABLE")), a && e && 0 != e.length) {
                var i = $("#grid").jqGrid("getGridParam", "selarrrow").join();
                Public.ajaxPost("../basedata/brand.do?action=disable", {ids: i, disable: Number(t)}, function (a) {
                    if (a && 200 == a.status) {
                        parent.Public.tips({content: "商品品牌状态修改成功！"});
                        for (var i = 0; i < e.length; i++) {
                            var r = e[i];
                            $("#grid").jqGrid("setCell", r, "isdelete", t)
                        }
                    } else parent.Public.tips({type: 1, content: "商品品牌状态修改失败！" + a.msg})
                })
            }
        }
    }, i = {
        statusFmatter: function (e, t, a) {
            return '<span class="set-status ' + (0 == e ? "close" : "open") + '" data-isdelete="' + e + '" data-id="' + a.id + '"><span class="ui-icon-circle"></span></span>'
        }, addressFormat: function (e, t, a) {
            var i = "";
            return a.linkMans && (a = JSON.parse(a.linkMans)[0]), a && (i = (a.province || "") + (a.city || "") + (a.county || "") + (a.deliveryAddress || "" || a.address || "")), i
        }
    }, r = Public.mod_PageConfig.init("brand");
    !function () {
        var t = Public.setGrid(), a = (parent.SYSTEM.rights, [{
            name: "operate",
            label: "操作",
            width: 60,
            fixed: !0,
            formatter: Public.operFmatter,
            title: !1
        }, {name: "number", label: "品牌编码", index: "number", width: 100, title: !1}, {
            name: "name",
            label: "品牌名称",
            index: "customerType",
            width: 100,
            title: !1
        }, {name: "id", label: "id", index: "id", width: 100, title: !1, hidden: !0}, {
            name: "remark",
            label: "备注",
            index: "difMoney",
            width: 100,
            title: !1
        }, {name: "isdelete", label: "状态", index: "delete", width: 80, align: "center", formatter: i.statusFmatter}]);
        r.gridReg("grid", a), a = r.conf.grids.grid.colModel, $("#grid").jqGrid({
            url: "/basedata/brand.do?action=list&isDelete=1",
            datatype: "json",
            autowidth: !0,
            height: t.h,
            altRows: !0,
            gridview: !0,
            onselectrow: !1,
            multiselect: !0,
            colModel: a,
            pager: "#page",
            viewrecords: !0,
            cmTemplate: {sortable: !1},
            rowNum: 100,
            rowList: [100, 200, 500, 1e3],
            shrinkToFit: !1,
            forceFit: !0,
            jsonReader: {root: "data.rows", records: "data.records", total: "data.total", repeatitems: !1, id: "id"},
            loadComplete: function (t) {
                if (t && 200 == t.status) {
                    var a = {};
                    t = t.data;
                    for (var i = 0; i < t.rows.length; i++) {
                        var r = t.rows[i];
                        a[r.id] = r
                    }
                    $("#grid").data("gridData", a)
                } else {
                    var n = 250 === t.status ? e ? "没有满足条件的结果哦！" : "没有客户数据哦！" : t.msg;
                    parent.Public.tips({type: 2, content: n})
                }
            },
            loadError: function (e, t, a) {
                parent.Public.tips({type: 1, content: "操作失败了哦，请检查您的网络链接！"})
            },
            resizeStop: function (e, t) {
                r.setGridWidthByIndex(e, t, "grid")
            }
        })
    }(), $_matchCon = $("#matchCon"), $_matchCon.placeholder(), $("#config").show().click(function (e) {
        r.config()
    }), $("#search").on("click", function (e) {
        e.preventDefault();
        var a = $_matchCon.val() === $_matchCon[0].defaultValue ? "" : $.trim($_matchCon.val());
        t = 1, $("#grid").jqGrid("setGridParam", {
            page: 1,
            postData: {skey: a, isUserOpt: t}
        }).trigger("reloadGrid"), t = 0
    }), $("#btn-add").on("click", function (e) {
        e.preventDefault(), Business.verifyRight("BRAND_ADD") && a.operate("add")
    }), $("#grid").on("click", ".operating .ui-icon-pencil", function (e) {
        if (e.preventDefault(), Business.verifyRight("BRAND_UPDATE")) {
            var t = $(this).parent().data("id");
            a.operate("edit", t)
        }
    }), $("#grid").on("click", ".operating .ui-icon-trash", function (e) {
        if (e.preventDefault(), Business.verifyRight("BRAND_DELETE")) {
            var t = $(this).parent().data("id");
            a.del(t + "")
        }
    }), $("#btn-batchDel").click(function (e) {
        if (e.preventDefault(), Business.verifyRight("BRAND_DELETE")) {
            var t = $("#grid").jqGrid("getGridParam", "selarrrow");
            t.length ? a.del(t.join()) : parent.Public.tips({type: 2, content: "请选择需要删除的项"})
        }
    }), $("#btn-disable").click(function (e) {
        e.preventDefault();
        var t = $("#grid").jqGrid("getGridParam", "selarrrow").concat();
        t && 0 != t.length ? a.setStatuses(t, !1) : parent.Public.tips({type: 1, content: " 请先选择要禁用的商品品牌！"})
    }), $("#btn-enable").click(function (e) {
        e.preventDefault();
        var t = $("#grid").jqGrid("getGridParam", "selarrrow").concat();
        t && 0 != t.length ? a.setStatuses(t, !0) : parent.Public.tips({type: 1, content: " 请先选择要启用的商品品牌！"})
    }), $("#grid").on("click", ".set-status", function (e) {
        e.stopPropagation(), e.preventDefault();
        var t = $(this).data("id"), i = !$(this).data("isdelete");
        a.setStatus(t, i)
    }), $(window).resize(function () {
        Public.resizeGrid()
    })
});