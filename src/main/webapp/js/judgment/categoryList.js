function initDom() {
    function e(e, t, a) {
        conditions.typeNumber = e, conditions.name = t, a || $("#grid").setGridParam({postData: conditions}).trigger("reloadGrid"), parent.$("li.l-selected a").eq(0).text(conditions.name + "类别")
    }

    var t, a = $(".ui-tab").on("click", "li", function (t) {
        var a = $(this), i = a.data("id"), n = a.html(), r = conditions.typeNumber, o = conditions.name;
        if (conditions.typeNumber = i, conditions.name = n, !verifyRight(rightsAction.query))return conditions.typeNumber = r, void(conditions.name = o);
        $(".cur").removeClass("cur"), a.addClass("cur"), $("#custom-assisting").getCombo().selectByIndex(0, !1), e(i, n)
    }), i = [], n = {customertype: "客户", supplytype: "供应商", trade: "商品", paccttype: "支出", raccttype: "收入"};
    for (var r in n)i.push('<li data-id="' + r + '">' + n[r] + "</li>");
    a.append(i.join(""));
    var o = $("#assisting-category-select li[data-id=" + typeNumber + "]");
    1 == o.length ? (o.addClass("cur"), t = 0) : (t = ["number", typeNumber], $("#custom-assisting").parent().addClass("cur")), e(typeNumber, n[typeNumber], !0), $("#custom-assisting").combo({
        data: "../basedata/assist.do?action=getAssistType",
        text: "name",
        value: "number",
        width: 170,
        ajaxOptions: {
            formatData: function (e) {
                (e = e.data.items).unshift({number: "", name: "选择其他类别"});
                for (var t = 0, a = e.length; t < a; t++)e[t].name = e[t].name.replace("类别", ""), n[e[t].number] && (e.splice(t, 1), t--, a--);
                return e.length > 1 && $("#custom-assisting").parent().show(), e
            }
        },
        defaultSelected: t,
        defaultFlag: !1,
        callback: {
            onChange: function (t) {
                if (t.number) {
                    var a = t.number, i = t.name;
                    $("#assisting-category-select li").removeClass("cur"), $("#custom-assisting").parent().addClass("cur"), e(a, i)
                } else $("#custom-assisting").getCombo().selectByValue(conditions.typeNumber, !1)
            }, beforeChange: function (e) {
                var t = e.number, a = e.name;
                return _oType = conditions.typeNumber, _oName = conditions.name, conditions.typeNumber = t, conditions.name = a, !!verifyRight(rightsAction.query) || (conditions.typeNumber = _oType, conditions.name = _oName, !1)
            }
        }
    })
}
function initEvent() {
    $("#btn-add").click(function (e) {
        e.preventDefault(), verifyRight(rightsAction.add) && handle.operate("add")
    }), $("#grid").on("click", ".operating .ui-icon-pencil", function (e) {
        if (e.preventDefault(), verifyRight(rightsAction.update)) {
            var t = $(this).parent().data("id");
            handle.operate("edit", t)
        }
    }), $("#grid").on("click", ".operating .ui-icon-trash", function (e) {
        if (e.preventDefault(), verifyRight(rightsAction.del)) {
            var t = $(this).parent().data("id");
            handle.del(t)
        }
    }), $("#btn-refresh").click(function (e) {
        e.preventDefault(), $("#grid").trigger("reloadGrid")
    }), $("#search").click(function (e) {
        e.preventDefault();
        var t = $.trim($("#matchCon").val());
        conditions.skey = "输入类别名称查询" == t ? "" : t, $("#grid").setGridParam({postData: conditions}).trigger("reloadGrid")
    }), $("#matchCon").placeholder(), $(window).resize(function () {
        Public.resizeGrid()
    })
}
function initGrid() {
    var e = [{
        name: "operate",
        label: "操作",
        width: 60,
        fixed: !0,
        align: "center",
        formatter: Public.operFmatter
    }, {
        name: "name", label: "类别", width: 200, formatter: function (e, t, a) {
            for (var i = parseInt(a.level) - 1, n = "", r = 0; r < i; r++)n += "&nbsp;&nbsp;&nbsp;";
            return 0 !== i && (n += "|-&nbsp;"), n + e
        }
    }, {name: "id", label: "id", hidden: !0}, {name: "level", label: "level", hidden: !0}, {
        name: "parentId",
        label: "parentId",
        hidden: !0
    }, {name: "parentName", label: "parentName", hidden: !0}, {name: "detail", label: "是否叶", hidden: !0}];
    $("#grid").jqGrid({
        url: url,
        postData: conditions,
        datatype: "json",
        height: Public.setGrid().h,
        altRows: !0,
        gridview: !0,
        colModel: e,
        autowidth: !0,
        viewrecords: !0,
        cmTemplate: {sortable: !1, title: !1},
        page: 1,
        pager: "#page",
        rowNum: 2e3,
        shrinkToFit: !1,
        scroll: 1,
        jsonReader: {root: "data.items", records: "data.totalsize", repeatitems: !1, id: "id"},
        loadComplete: function (e) {
            if (e && 200 == e.status) {
                var t = {};
                e = e.data;
                for (a = 0; a < e.items.length; a++)t[(i = e.items[a]).id] = i;
                showParentCategory = "trade" === conditions.typeNumber || "customertype" === conditions.typeNumber || "supplytype" === conditions.typeNumber;
                for (var a = 0; a < e.items.length; a++) {
                    var i = e.items[a], n = t[i.parentId] || {};
                    n.name && (showParentCategory = !0, t[i.id].parentName = n.name)
                }
                parent.SYSTEM.categoryInfo = parent.SYSTEM.categoryInfo || {}, parent.SYSTEM.categoryInfo[conditions.typeNumber] = e.items, $("#grid").data("gridData", t)
            } else {
                var r = 250 == e.status ? "没有" + conditions.name + "类别数据！" : "获取" + conditions.name + "类别数据失败！" + e.msg;
                parent.Public.tips({type: 2, content: r})
            }
        },
        loadError: function (e, t, a) {
            parent.Public.tips({type: 1, content: "操作失败了哦，请检查您的网络链接！"})
        }
    })
}
function initValidator() {
    $("#manage-form").validate({
        rules: {category: {required: !0}},
        messages: {category: {required: "类别不能为空"}},
        errorClass: "valid-error"
    })
}
function postData(e) {
    if ($("#manage-form").validate().form()) {
        var t = $.trim($("#category2").val()), a = $.trim($("#ParentCategory").val()), i = e ? "update" : "add", n = a ? $("#ParentCategory").data("PID") : "";
        if (Number(n) !== e) {
            var r = {
                parentId: n,
                id: e,
                name: t
            }, o = "add" == i ? "新增" + conditions.name + "类别" : "修改" + conditions.name + "类别";
            r.typeNumber = conditions.typeNumber, Public.ajaxPost("../basedata/assist.do?action=" + i, r, function (e) {
                200 == e.status ? (parent.parent.Public.tips({content: o + "成功！"}), handle.callback(e.data, i)) : parent.parent.Public.tips({
                        type: 1,
                        content: o + "失败！" + e.msg
                    })
            })
        } else parent.parent.Public.tips({type: 2, content: "当前分类和上级分类不能相同！"})
    } else $("#manage-form").find("input.valid-error").eq(0).focus()
}
function resetForm() {
    $("#manage-form").validate().resetForm(), $("#ParentCategory").val(""), $("#category2").val("").focus().select()
}
function verifyRight(e) {
    var t = rightsType[conditions.typeNumber];
    if (!t)return !0;
    switch (e) {
        case rightsAction.query:
        case rightsAction.add:
        case rightsAction.del:
        case rightsAction.update:
            break;
        default:
            return !1
    }
    return Business.verifyRight(t += e)
}
var typeNumber, showParentCategory, url = "../basedata/assist.do?action=list&isDelete=2", urlParam = Public.urlParam();
urlParam.typeNumber && (typeNumber = urlParam.typeNumber);
var conditions = {typeNumber: typeNumber, skey: "", name: ""}, rightsType = {
    customertype: "BUTYPE",
    supplytype: "SUPPLYTYPE",
    trade: "TRADETYPE",
    raccttype: "RACCTTYPE",
    paccttype: "PACCTTYPE"
}, rightsAction = {
    query: "_QUERY",
    add: "_ADD",
    del: "_DELETE",
    update: "_UPDATE"
}, handle = {
    operate: function (e, t) {
        if ("add" == e) a = "新增" + conditions.name + "类别", this.callback; else {
            var a = "修改" + conditions.name + "类别";
            $("#grid").data("gridData")[t], this.callback
        }
        var i = ['<form id="manage-form" action="">', '<ul class="mod-form-rows manage-wrap" id="manager">', '<li class="row-item" style="position:relative; display:none;">', '<div class="label-wrap"><label for="ParentCategory">上级分类:</label></div>', '<div class="ctn-wrap" style="position:relative;"><input type="text" value="" class="ui-input" name="ParentCategory" id="ParentCategory" readonly></div>', '<div class="dn hideFeild"></div>', "</li>", '<li class="row-item">', '<div class="label-wrap"><span class="red spe_red">*</span><label for="category2">类别:</label></div>', '<div class="ctn-wrap"><input type="text" value="" class="ui-input" name="category" id="category2"></div>', "</li>", "</ul>", "</form>"], n = 90;
        showParentCategory && (n = 150), this.dialog = $.dialog({
            title: a,
            content: i.join(""),
            width: 400,
            height: n,
            max: !1,
            min: !1,
            cache: !1,
            lock: !0,
            okVal: "确定",
            ok: function () {
                return postData(t), !1
            },
            cancelVal: "取消",
            cancel: function () {
                return !0
            },
            init: function () {
                var a = $(".hideFeild"), i = $("#ParentCategory"), n = $("#category2");
                if (showParentCategory && (i.closest("li").show(), $("#ParentCategory").click(function (e) {
                        a.show().data("hasInit") || (a.show().data("hasInit", !0), Public.zTree.init(a, {
                            defaultClass: "ztreeDefault",
                            typeNumber: conditions.typeNumber
                        }, {
                            callback: {
                                beforeClick: function (e, t) {
                                    i.val(t.name), i.data("PID", t.id), a.hide()
                                }
                            }
                        }))
                    }), $(".ui_dialog").click(function (e) {
                        a.hide()
                    }), $("#ParentCategory").closest(".row-item").click(function (e) {
                        var t = e || window.event;
                        t.stopPropagation ? t.stopPropagation() : window.event && (window.event.cancelBubble = !0)
                    }), document.onclick = function () {
                        a.hide()
                    }), "add" != e) {
                    var r = $("#grid").data("gridData")[t];
                    n.val(r.name), i.val(r.parentName), i.data("PID", r.parentId)
                }
                initValidator()
            }
        })
    }, del: function (e) {
        $.dialog.confirm("删除的" + conditions.name + "类别将不能恢复，请确认是否删除？", function () {
            Public.ajaxPost("../basedata/assist.do?action=delete", {
                id: e,
                typeNumber: conditions.typeNumber
            }, function (t) {
                if (t && 200 == t.status) {
                    parent.Public.tips({content: "删除" + conditions.name + "类别成功！"}), $("#grid").jqGrid("delRowData", e);
                    for (var a = parent.SYSTEM.categoryInfo[conditions.typeNumber].length, i = 0; i < a; i++)parent.SYSTEM.categoryInfo[conditions.typeNumber][i].id === e && (parent.SYSTEM.categoryInfo[conditions.typeNumber].splice(i, 1), i--, a--)
                } else parent.Public.tips({type: 1, content: "删除" + conditions.name + "类别失败！" + t.msg})
            })
        })
    }, callback: function (e, t) {
        var a = $("#grid").data("gridData");
        a || (a = {}, $("#grid").data("gridData", a));
        for (var i = parent.SYSTEM.categoryInfo[conditions.typeNumber].length, n = !0, r = 0; r < i; r++)parent.SYSTEM.categoryInfo[conditions.typeNumber][r].id === e.id && (parent.SYSTEM.categoryInfo[conditions.typeNumber][r] = e, n = !1);
        n && parent.SYSTEM.categoryInfo[conditions.typeNumber].push(e), a[e.id] = e, e.parentId && (a[e.id].parentName = a[e.parentId].name), "add" != t ? ($("#grid").jqGrid("setRowData", e.id, e), this.dialog.close()) : ($("#grid").jqGrid("addRowData", e.id, e, "last"), this.dialog.close()), $("#grid").setGridParam({postData: conditions}).trigger("reloadGrid")
    }
};
initDom(), initEvent(), initGrid();