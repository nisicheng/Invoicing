$(function () {
    var e, t = !1, i = 1, a = {
        operate: function (e, t) {
            if ("add" == e)var i = '新增供应商<a href="http://club.kingdee.com/club/cloudschool/course?cid=759#pid=3413" target="_blank" class="video-icon"></a>', a = {
                oper: e,
                callback: this.callback
            }; else var i = "修改供应商", a = {oper: e, rowId: t, callback: this.callback};
            $.dialog({
                title: i,
                content: "url:vendor-manage.jsp",
                data: a,
                width: 640,
                height: 510,
                max: !1,
                min: !1,
                cache: !1,
                lock: !0
            })
        }, del: function (e) {
            $.dialog.confirm("删除的供应商将不能恢复，请确认是否删除？", function () {
                Public.ajaxPost("../basedata/contact.do?type=10&action=delete", {id: e}, function (e) {
                    if (e && 200 == e.status) {
                        for (var t = e.data, i = (t.successArr, 0); i < t.successArr.length; i++)(a = t.successArr[i]).number = $("#grid").jqGrid("getRowData", a.id).name;
                        for (i = 0; i < t.failArr.length; i++) {
                            var a = t.failArr[i];
                            a.number = $("#grid").jqGrid("getRowData", a.id).name
                        }
                        Public.showBasicDeleteMsg(t, "客户"), $("#search").trigger("click")
                    } else parent.Public.tips({type: 1, content: "删除供应商失败！" + e.msg})
                })
            })
        }, setStatus: function (e, t) {
            var i = !1;
            !1 === t && (i = Business.verifyRight("PUR_启用")), !0 === t && (i = Business.verifyRight("PUR_禁用")), e && i && Public.ajaxPost("../basedata/contact.do?action=disable", {
                contactIds: e,
                disable: Number(t)
            }, function (i) {
                i && 200 == i.status ? (parent.Public.tips({content: "供应商状态修改成功！"}), $("#grid").jqGrid("setCell", e, "delete", t)) : parent.Public.tips({
                        type: 1,
                        content: "供应商状态修改失败！" + i.msg
                    })
            })
        }, setStatuses: function (e, t) {
            var i = !1;
            if (!1 === t && (i = Business.verifyRight("PUR_启用")), !0 === t && (i = Business.verifyRight("PUR_禁用")), i && e && 0 != e.length) {
                var a = $("#grid").jqGrid("getGridParam", "selarrrow").join();
                Public.ajaxPost("../basedata/contact.do?action=disable", {
                    contactIds: a,
                    disable: Number(t)
                }, function (i) {
                    if (i && 200 == i.status) {
                        parent.Public.tips({content: "供应商状态修改成功！"});
                        for (var a = 0; a < e.length; a++) {
                            var n = e[a];
                            $("#grid").jqGrid("setCell", n, "delete", t)
                        }
                    } else parent.Public.tips({type: 1, content: "供应商状态修改失败！" + i.msg})
                })
            }
        }, callback: function (e, t, i) {
            var a = $("#grid").data("gridData");
            a || (a = {}, $("#grid").data("gridData", a)), e.difMoney = e.amount - e.periodMoney;
            parent.parent.SYSTEM;
            a[e.id] = e, "edit" == t ? ($("#grid").jqGrid("setRowData", e.id, e), i && i.api.close()) : ($("#grid").jqGrid("addRowData", e.id, e, "first"), i && i.resetForm(e))
        }
    }, n = {
        statusFmatter: function (e, t, i) {
            return '<span class="set-status ' + (1 == e ? "close" : "open") + '" data-delete="' + e + '" data-id="' + i.id + '"><span class="ui-icon-circle"></span></span>'
        }, addressFormat: function (e, t, i) {
            var a = "";
            return i.linkMans && (i = JSON.parse(i.linkMans)[0]), i && (a = (i.province || "") + (i.city || "") + (i.county || "") + (i.deliveryAddress || "" || i.address || "")), a
        }
    }, r = Public.mod_PageConfig.init("vendorList");
    e = Public.categoryTree($("#catorage"), {
        typeNumber: "supplytype",
        inputWidth: 208,
        height: 200,
        width: 198,
        rootTxt: "请选择供应商类别"
    }), function () {
        var e = Public.setGrid(), i = parent.SYSTEM.rights, a = !(parent.SYSTEM.isAdmin || i.AMOUNT_INAMOUNT), s = [{
            name: "operate",
            label: "操作",
            width: 60,
            fixed: !0,
            formatter: Public.operFmatter,
            title: !1
        }, {name: "customerType", label: "供应商类别", index: "customerType", width: 100, title: !1}, {
            name: "number",
            label: "供应商编号",
            index: "number",
            width: 100,
            title: !1
        }, {name: "name", label: "供应商名称", index: "name", width: 220, classes: "ui-ellipsis"}, {
            name: "contacter",
            label: "首要联系人",
            index: "contacter",
            width: 100,
            align: "center"
        }, {name: "mobile", label: "手机", index: "mobile", width: 100, align: "center", title: !1}, {
            name: "telephone",
            label: "座机",
            index: "telephone",
            width: 100,
            title: !1
        }, {name: "linkIm", label: "QQ/微信/Email", index: "linkIm", width: 120, title: !1}, {
            name: "address",
            label: "联系地址",
            index: "address",
            width: 180,
            title: !1,
            formatter: n.addressFormat
        }, {
            name: "difMoney",
            label: "应付款余额",
            index: "difMoney",
            width: 100,
            align: "right",
            title: !1,
            formatter: "currency",
            hidden: a
        }, {name: "delete", label: "状态", index: "delete", width: 80, align: "center", formatter: n.statusFmatter}];
        r.gridReg("grid", s), s = r.conf.grids.grid.colModel, $("#grid").jqGrid({
            url: "/basedata/contact.do?type=10&action=list",
            datatype: "json",
            postData: {isDelete: "0"},
            autowidth: !0,
            height: e.h,
            altRows: !0,
            gridview: !0,
            onselectrow: !1,
            multiselect: !0,
            colModel: s,
            pager: "#page",
            viewrecords: !0,
            cmTemplate: {sortable: !1},
            rowNum: 100,
            rowList: [100, 200, 500],
            shrinkToFit: !1,
            forceFit: !0,
            jsonReader: {root: "data.rows", records: "data.records", total: "data.total", repeatitems: !1, id: "id"},
            loadComplete: function (e) {
                if (e && 200 == e.status) {
                    var i = {};
                    e = e.data;
                    for (var a = 0; a < e.rows.length; a++) {
                        var n = e.rows[a];
                        i[n.id] = n
                    }
                    $("#grid").data("gridData", i)
                } else {
                    var r = 250 === e.status ? t ? "没有满足条件的结果哦！" : "没有客户数据哦！" : e.msg;
                    parent.Public.tips({type: 2, content: r})
                }
            },
            loadError: function (e, t, i) {
                parent.Public.tips({type: 1, content: "操作失败了哦，请检查您的网络链接！"})
            },
            resizeStop: function (e, t) {
                r.setGridWidthByIndex(e, t, "grid")
            }
        })
    }(), $_matchCon = $("#matchCon"), $_matchCon.placeholder(), $("#config").show().click(function (e) {
        r.config()
    }), $("#search").on("click", function (t) {
        t.preventDefault();
        var a = $_matchCon.val() === $_matchCon[0].defaultValue ? "" : $.trim($_matchCon.val()), n = 0 == e.getValue() ? -1 : e.getValue(), r = !0 === $("#chk-ischecked").find("span").hasClass("checked") ? 1 : 0;
        $("#grid").jqGrid("setGridParam", {
            page: 1,
            postData: {skey: a, categoryId: n, isDelete: r, isUserOpt: i}
        }).trigger("reloadGrid"), i = 1
    }), $("#btn-add").on("click", function (e) {
        e.preventDefault(), Business.verifyRight("PUR_ADD") && a.operate("add")
    }), $(document).on("click", "#chk-ischecked", function () {
        var e = $(this).find("span");
        e.hasClass("checked") ? e.removeClass("checked") : e.addClass("checked"), i = 0, $("#search").trigger("click")
    }), $("#btn-print").on("click", function (e) {
        e.preventDefault()
    }), $("#btn-import").on("click", function (e) {
        e.preventDefault(), Business.verifyRight("PUR_导入") && parent.$.dialog({
            width: 630,
            height: 400,
            data: {importType: "sup"},
            title: "供应商导入",
            content: "url:/settings/cus-sup-import.jsp",
            lock: !0
        })
    }), $("#btn-export").on("click", function (t) {
        if (Business.verifyRight("PUR_EXPORT")) {
            if (!Business.noDataExportTips())return !1;
            var i = $_matchCon.val() === $_matchCon[0].defaultValue ? "" : $.trim($_matchCon.val()), a = 0 == e.getValue() ? -1 : e.getValue(), n = !0 === $("#chk-ischecked").find("span").hasClass("checked") ? 1 : 0;
            $(this).attr("href", "/basedata/supplier.do?action=exporter&isDelete=" + n + "&categoryId=" + a + "&skey=" + i)
        }
    }), $("#grid").on("click", ".operating .ui-icon-pencil", function (e) {
        if (e.preventDefault(), Business.verifyRight("PUR_UPDATE")) {
            var t = $(this).parent().data("id");
            a.operate("edit", t)
        }
    }), $("#grid").on("click", ".operating .ui-icon-trash", function (e) {
        if (e.preventDefault(), Business.verifyRight("PUR_DELETE")) {
            var t = $(this).parent().data("id");
            a.del(t + "")
        }
    }), $("#btn-batchDel").click(function (e) {
        if (e.preventDefault(), Business.verifyRight("PUR_DELETE")) {
            var t = $("#grid").jqGrid("getGridParam", "selarrrow");
            t.length ? a.del(t.join()) : parent.Public.tips({type: 2, content: "请选择需要删除的项"})
        }
    }), $("#btn-disable").click(function (e) {
        e.preventDefault();
        var t = $("#grid").jqGrid("getGridParam", "selarrrow").concat();
        t && 0 != t.length ? a.setStatuses(t, !0) : parent.Public.tips({type: 1, content: " 请先选择要禁用的供应商！"})
    }), $("#btn-enable").click(function (e) {
        e.preventDefault();
        var t = $("#grid").jqGrid("getGridParam", "selarrrow").concat();
        t && 0 != t.length ? a.setStatuses(t, !1) : parent.Public.tips({type: 1, content: " 请先选择要启用的供应商！"})
    }), $("#grid").on("click", ".set-status", function (e) {
        e.stopPropagation(), e.preventDefault();
        var t = $(this).data("id"), i = !$(this).data("delete");
        a.setStatus(t, i)
    }), $(window).resize(function () {
        Public.resizeGrid()
    })
});