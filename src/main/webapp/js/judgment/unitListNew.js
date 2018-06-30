function initEvent() {
    $("#btn-add").click(function (t) {
        t.preventDefault(), Business.verifyRight("UNIT_ADD") && handle.operate("add")
    }), $("#grid").on("click", ".operating .ui-icon-pencil", function (t) {
        if (t.preventDefault(), Business.verifyRight("UNIT_UPDATE")) {
            var a = $(this).parent().data("id");
            handle.operate("edit", a)
        }
    }), $("#btn-add-group").click(function (t) {
        t.preventDefault(), Business.verifyRight("UNIT_ADD") && handle.operateForGroup("add")
    }), $("#gridGroup").on("click", ".operating .ui-icon-pencil", function (t) {
        if (t.preventDefault(), Business.verifyRight("UNIT_UPDATE")) {
            var a = $(this).parent().data("id");
            handle.operateForGroup("edit", a)
        }
    }), $("#grid").on("click", ".operating .ui-icon-trash", function (t) {
        if (t.preventDefault(), Business.verifyRight("UNIT_DELETE")) {
            var a = $(this).parent().data("id");
            handle.del(a)
        }
    }), $("#gridGroup").on("click", ".operating .ui-icon-trash", function (t) {
        if (t.preventDefault(), Business.verifyRight("UNIT_DELETE")) {
            var a = $(this).parent().data("id");
            handle.delGroup(a)
        }
    }), $("#btn-refresh").click(function (t) {
        t.preventDefault(), $("#grid").trigger("reloadGrid"), $("#gridGroup").trigger("reloadGrid")
    }), $(window).resize(function () {
    })
}
function initGrid() {
    var t = [{
        name: "operate",
        label: "操作",
        width: 60,
        fixed: !0,
        align: "center",
        formatter: Public.operFmatter
    }, {name: "name", label: "名称", width: 200}, {
        name: "rate",
        label: "换算关系",
        align: "center",
        hidden: !0,
        formatter: function (t, a, e) {
            return e.rate || "&#160;"
        }
    }, {
        name: "rate", label: "是否默认单位", align: "center", hidden: !0, formatter: function (t, a, e) {
            return e.default ? "是" : "&#160;"
        }
    }];
    $("#grid").jqGrid({
        url: "../basedata/unit.do?action=list&isDelete=2",
        datatype: "json",
        postData: {unitTypeId: 0},
        autowidth: !0,
        height: 250,
        altRows: !0,
        gridview: !0,
        colModel: t,
        viewrecords: !0,
        cmTemplate: {sortable: !1, title: !1},
        page: 1,
        pager: "#page",
        rowNum: 2e3,
        shrinkToFit: !1,
        scroll: 1,
        jsonReader: {root: "data.items", records: "data.totalsize", repeatitems: !1, id: "id"},
        loadComplete: function (t) {
            if (t && 200 == t.status) {
                var a = {};
                t = t.data;
                for (var e = 0; e < t.items.length; e++) {
                    var i = t.items[e];
                    a[i.id] = i
                }
                $("#grid").data("gridData", a)
            } else {
                var r = 250 == t.status ? "没有计量单位数据！" : "获取计量单位数据失败！" + t.msg;
                parent.Public.tips({type: 2, content: r})
            }
        },
        loadError: function (t, a, e) {
            parent.Public.tips({type: 1, content: "操作失败了哦，请检查您的网络链接！"})
        }
    })
}
function initGridGroup() {
    var t = [{
        name: "operate",
        label: "操作",
        width: 60,
        fixed: !0,
        align: "center",
        formatter: Public.operFmatter
    }, {name: "name", label: "名称", width: 200}];
    $("#gridGroup").jqGrid({
        url: "../basedata/unit.do?action=list&isDelete=2",
        datatype: "json",
        autowidth: !0,
        height: 250,
        altRows: !0,
        gridview: !0,
        colModel: t,
        viewrecords: !0,
        cmTemplate: {sortable: !1, title: !1},
        page: 1,
        pager: "#pageGroup",
        rowNum: 2e3,
        shrinkToFit: !1,
        scroll: 1,
        jsonReader: {root: "data.unitTypes", records: "data.totalsize", repeatitems: !1, id: "id"},
        loadComplete: function (t) {
            if (t && 200 == t.status) {
                var a = {};
                t = t.data;
                for (var e = 0; e < t.unitTypes.length; e++) {
                    var i = t.unitTypes[e];
                    a[i.id] = i
                }
                $("#gridGroup").data("gridData", a)
            } else {
                var r = 250 == t.status ? "没有计量单位数据！" : "获取计量单位数据失败！" + t.msg;
                parent.Public.tips({type: 2, content: r})
            }
        },
        loadError: function (t, a, e) {
            parent.Public.tips({type: 1, content: "操作失败了哦，请检查您的网络链接！"})
        }
    })
}
var defaultPage = Public.getDefaultPage(), ajustH = 300, ajustW = 270, siType = (defaultPage = Public.getDefaultPage()).SYSTEM.siType, handle = {
    operate: function (t, a) {
        if ("add" == t)var e = "新增单计量单位", i = {oper: t, callback: this.callback}; else var e = "修改单计量单位", i = {
            oper: t,
            rowData: $("#grid").data("gridData")[a],
            callback: this.callback
        };
        $.dialog({
            title: e,
            content: "url:unit-manage.jsp",
            data: i,
            width: 400,
            height: 100,
            max: !1,
            min: !1,
            cache: !1,
            lock: !0
        })
    }, operateForGroup: function (t, a) {
        if ("add" == t)var e = "新增多计量单位", i = {oper: t, callback: this.callback}; else var e = "修改多计量单位", i = {
            oper: t,
            rowData: $("#gridGroup").data("gridData")[a],
            callback: this.callback
        };
        $.dialog({
            title: e,
            content: "url:unit-manage-group.jsp",
            data: i,
            width: 500,
            height: 1 === siType ? 100 : 230,
            max: !1,
            min: !1,
            cache: !1,
            lock: !0
        })
    }, del: function (t) {
        $("#grid").data("gridData")[t];
        $.dialog.confirm("删除的计量单位将不能恢复，请确认是否删除？", function () {
            Public.ajaxPost("../basedata/unit.do?action=delete", {id: t}, function (a) {
                if (a && 200 == a.status) {
                    parent.Public.tips({content: "删除计量单位成功！"}), $("#grid").jqGrid("delRowData", t);
                    for (var e = 0; e < defaultPage.SYSTEM.unitInfo.length; e++)defaultPage.SYSTEM.unitInfo[e].id == t && defaultPage.SYSTEM.unitInfo.splice(e, 1)
                } else parent.Public.tips({type: 1, content: "删除计量单位失败！" + a.msg})
            })
        })
    }, delGroup: function (t) {
        $("#gridGroup").data("gridData")[t];
        $.dialog.confirm("删除的计量单位将不能恢复，请确认是否删除？", function () {
            Public.ajaxPost("../basedata/unitType.do?action=delete", {id: t}, function (a) {
                if (a && 200 == a.status) {
                    parent.Public.tips({content: "删除多计量单位成功！"}), $("#gridGroup").jqGrid("delRowData", t);
                    for (var e = 0; e < defaultPage.SYSTEM.unitGroupInfo.length; e++)defaultPage.SYSTEM.unitGroupInfo[e].id == t && defaultPage.SYSTEM.unitGroupInfo.splice(e, 1)
                } else parent.Public.tips({type: 1, content: "删除多计量单位失败！" + a.msg})
            })
        })
    }, callback: function (t, a, e, i) {
        if ("units" == i) r = $("#gridGroup"); else var r = $("#grid");
        var n = r.data("gridData");
        n || (n = {}, r.data("gridData", n)), n[t.id] = t, "edit" == a ? (r.jqGrid("getRowData", t.id).name ? r.jqGrid("setRowData", t.id, t) : r.jqGrid("addRowData", t.id, t, "last"), e && e.api.close()) : (r.jqGrid("addRowData", t.id, t, "last"), e && e.resetForm(t))
    }
}, format = {
    groupUnitName: function (t, a, e) {
        return e.unitTypes[0].name
    }
};
$(function () {
    initEvent(), initGrid(), initGridGroup(), 1 === siType && $("#unitGroupWap").hide().trigger("click")
});