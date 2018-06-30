function initEvent() {
    $("#btn-add").click(function (t) {
        t.preventDefault(), Business.verifyRight("EMPLOYEEMANAGER_ADD") && handle.operate("add")
    }), $("#btn-disable").click(function (t) {
        t.preventDefault();
        var e = $("#grid").jqGrid("getGridParam", "selarrrow").concat();
        e && 0 != e.length ? handle.setStatuses(e, !0) : parent.Public.tips({type: 1, content: " 请先选择要禁用的职员！"})
    }), $("#btn-enable").click(function (t) {
        t.preventDefault();
        var e = $("#grid").jqGrid("getGridParam", "selarrrow").concat();
        e && 0 != e.length ? handle.setStatuses(e, !1) : parent.Public.tips({type: 1, content: " 请先选择要启用的职员！"})
    }), $("#btn-import").click(function (t) {
        t.preventDefault()
    }), $("#btn-export").click(function (t) {
        t.preventDefault()
    }), $("#btn-print").click(function (t) {
        t.preventDefault()
    }), $("#btn-refresh").click(function (t) {
        t.preventDefault(), $("#grid").trigger("reloadGrid")
    }), $("#grid").on("click", ".operating .ui-icon-pencil", function (t) {
        if (t.preventDefault(), Business.verifyRight("EMPLOYEEMANAGER_UPDATE")) {
            var e = $(this).parent().data("id");
            handle.operate("edit", e)
        }
    }), $("#grid").on("click", ".operating .ui-icon-trash", function (t) {
        if (t.preventDefault(), Business.verifyRight("EMPLOYEEMANAGER_DELETE")) {
            var e = $(this).parent().data("id");
            handle.del(e)
        }
    }), $("#grid").on("click", ".set-status", function (t) {
        if (t.stopPropagation(), t.preventDefault(), Business.verifyRight("EMPLOYEEMANAGER_UPDATE")) {
            var e = $(this).data("id"), a = !$(this).data("delete");
            handle.setStatus(e, a)
        }
    }), $(window).resize(function () {
        Public.resizeGrid()
    })
}
function initGrid() {
    var t = ["操作", "职员编号", "职员名称", "手机号码", "状态"], e = [{
        name: "operate",
        width: 60,
        fixed: !0,
        align: "center",
        formatter: Public.operFmatter
    }, {name: "number", index: "number", width: 150}, {name: "name", index: "name", width: 350}, {
        name: "mobile",
        index: "mobile",
        width: 350
    }, {name: "delete", index: "delete", width: 100, formatter: statusFmatter, align: "center"}];
    $("#grid").jqGrid({
        url: "/basedata/employee.do?action=list&isDelete=2",
        datatype: "json",
        height: Public.setGrid().h,
        altRows: !0,
        gridview: !0,
        colNames: t,
        colModel: e,
        autowidth: !0,
        pager: "#page",
        viewrecords: !0,
        cmTemplate: {sortable: !1, title: !1},
        page: 1,
        rowNum: 100,
        rowList: [100, 200, 500],
        shrinkToFit: !1,
        cellLayout: 8,
        jsonReader: {root: "data.items", records: "data.records", total: "data.total", repeatitems: !1, id: "id"},
        loadComplete: function (t) {
            if (t && 200 == t.status) {
                var e = {};
                t = t.data;
                for (var a = 0; a < t.items.length; a++) {
                    var i = t.items[a];
                    e[i.id] = i
                }
                $("#grid").data("gridData", e)
            } else parent.Public.tips({type: 2, content: "获取职员数据失败！" + t.msg})
        },
        loadError: function (t, e, a) {
            parent.Public.tips({type: 1, content: "数据加载错误！"})
        }
    })
}
function statusFmatter(t, e, a) {
    return '<span class="set-status ' + (!0 === t ? "close" : "open") + '" data-delete="' + t + '" data-id="' + a.id + '"><span class="ui-icon-circle"></span></span>'
}
var handle = {
    operate: function (t, e) {
        if ("add" == t)var a = "新增职员", i = {oper: t, callback: this.callback}; else var a = "修改职员", i = {
            oper: t,
            rowData: $("#grid").data("gridData")[e],
            callback: this.callback
        };
        $.dialog({
            title: a,
            content: "url:staff-manage.jsp",
            data: i,
            width: 400,
            height: 200,
            max: !1,
            min: !1,
            cache: !1,
            lock: !0
        })
    }, setStatus: function (t, e) {
        t && Public.ajaxPost("../basedata/employee.do?action=disable", {
            employeeIds: t,
            disable: Number(e)
        }, function (a) {
            a && 200 == a.status ? (parent.Public.tips({content: "职员状态修改成功！"}), $("#grid").jqGrid("setCell", t, "delete", e)) : parent.Public.tips({
                    type: 1,
                    content: "职员状态修改失败！" + a.msg
                })
        })
    }, callback: function (t, e, a) {
        var i = $("#grid").data("gridData");
        i || (i = {}, $("#grid").data("gridData", i)), i[t.id] = t, "edit" == e ? ($("#grid").jqGrid("setRowData", t.id, t), a && a.api.close()) : ($("#grid").jqGrid("addRowData", t.id, t, "last"), a && a.resetForm(t))
    }, del: function (t) {
        $.dialog.confirm("删除的职员将不能恢复，请确认是否删除？", function () {
            Public.ajaxPost("/basedata/employee.do?action=delete", {id: t}, function (e) {
                e && 200 == e.status ? (parent.Public.tips({content: "职员删除成功！"}), $("#grid").jqGrid("delRowData", t)) : parent.Public.tips({
                        type: 1,
                        content: "职员删除失败！" + e.msg
                    })
            })
        })
    }
};
initEvent(), initGrid();