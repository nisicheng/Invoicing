$(function () {
    function e(e, t, i) {
        return '<span class="set-status ' + (1 == e ? "close" : "open") + '" data-delete="' + e + '" data-id="' + i.id + '"><span class="ui-icon-circle"></span></span>'
    }

    function t(e, t, i) {
        return e ? "（空）" == e ? "" : e : ""
    }

    function i(e, t, i) {
        var a = "";
        switch (e) {
            case 0:
                a = "零售客户";
                break;
            case 1:
                a = "批发客户";
                break;
            case 2:
                a = "VIP客户";
                break;
            case 3:
                a = "折扣等级一";
                break;
            case 4:
                a = "折扣等级二";
                break;
            default:
                a = "零售客户"
        }
        return a
    }

    var a, n = !1, r = "/basedata/contact.do?action=list", s = 1, c = {
        operate: function (e, t) {
            if ("add" == e)var i = '新增客户<a href="http://club.kingdee.com/club/cloudschool/course?cid=759#pid=3414" target="_blank" class="video-icon"></a>', a = {
                oper: e,
                callback: this.callback
            }; else var i = "修改客户", a = {oper: e, rowId: t, callback: this.callback};
            $.dialog({
                title: i,
                content: "url:customer-manage.jsp",
                data: a,
                width: 640,
                height: 510,
                max: !1,
                min: !1,
                cache: !1,
                lock: !0
            })
        }, del: function (e) {
            $.dialog.confirm("删除的客户将不能恢复，请确认是否删除？", function () {
                Public.ajaxPost("../basedata/contact.do?action=delete", {id: e}, function (e) {
                    if (e && 200 == e.status) {
                        for (var t = e.data, i = (t.successArr, 0); i < t.successArr.length; i++)(a = t.successArr[i]).number = $("#grid").jqGrid("getRowData", a.id).name;
                        for (i = 0; i < t.failArr.length; i++) {
                            var a = t.failArr[i];
                            a.number = $("#grid").jqGrid("getRowData", a.id).name
                        }
                        Public.showBasicDeleteMsg(t, "客户"), $("#search").trigger("click")
                    } else parent.Public.tips({type: 1, content: "删除客户失败！" + e.msg})
                })
            })
        }, setStatus: function (e, t) {
            var i = !1;
            !1 === t && (i = Business.verifyRight("BU_启用")), !0 === t && (i = Business.verifyRight("BU_禁用")), e && i && Public.ajaxPost("../basedata/contact.do?action=disable", {
                contactIds: e,
                flag: 1,
                disable: Number(t)
            }, function (i) {
                i && 200 == i.status ? (parent.Public.tips({content: "客户状态修改成功！"}), $("#grid").jqGrid("setCell", e, "delete", t)) : parent.Public.tips({
                        type: 1,
                        content: "客户状态修改失败！" + i.msg
                    })
            })
        }, setStatuses: function (e, t) {
            var i = !1;
            if (!1 === t && (i = Business.verifyRight("BU_启用")), !0 === t && (i = Business.verifyRight("BU_禁用")), i && e && 0 != e.length) {
                var a = $("#grid").jqGrid("getGridParam", "selarrrow").join();
                Public.ajaxPost("../basedata/contact.do?action=disable", {
                    contactIds: a,
                    flag: 1,
                    disable: Number(t)
                }, function (i) {
                    if (i && 200 == i.status) {
                        parent.Public.tips({content: "客户状态修改成功！"});
                        for (var a = 0; a < e.length; a++) {
                            var n = e[a];
                            $("#grid").jqGrid("setCell", n, "delete", t)
                        }
                    } else parent.Public.tips({type: 1, content: "客户状态修改失败！" + i.msg})
                })
            }
        }, callback: function (e, t, i) {
            var a = $("#grid").data("gridData");
            a || (a = {}, $("#grid").data("gridData", a)), a[e.id] = e, "edit" == t ? ($("#grid").jqGrid("setRowData", e.id, e), i && i.api.close()) : (e.difMoney = e.amount - e.periodMoney, $("#grid").jqGrid("addRowData", e.id, e, "first"), i && i.resetForm(e))
        }
    }, o = Public.mod_PageConfig.init("customerList");
    _self = this, this.mod_PageConfig = o, a = Public.categoryTree($("#catorage"), {
        typeNumber: "customertype",
        inputWidth: 208,
        height: 200,
        width: 198,
        rootTxt: "请选择客户类别"
    }), function () {
        var a = Public.setGrid(), s = !(parent.SYSTEM.isAdmin || parent.SYSTEM.rights.AMOUNT_OUTAMOUNT), c = [{
            name: "operate",
            label: "操作",
            width: 60,
            fixed: !0,
            formatter: Public.operFmatter,
            title: !1
        }, {
            name: "customerType",
            label: "客户类别",
            index: "customerType",
            width: 100,
            fixed: !0,
            title: !1
        }, {name: "cLevel", label: "客户等级", index: "cLevel", width: 100, title: !1, formatter: i}, {
            name: "number",
            label: "客户编号",
            index: "number",
            width: 100,
            title: !1
        }, {name: "name", label: "客户名称", index: "name", width: 220, classes: "ui-ellipsis"}, {
            name: "employeeId",
            label: "销售人员ID",
            index: "employeeId",
            width: 220,
            hidden: !0
        }, {name: "employeeName", label: "销售人员", index: "employeeName", width: 220, formatter: t}, {
            name: "contacter",
            label: "联系人",
            index: "contacter",
            width: 80,
            align: "center",
            fixed: !0
        }, {name: "mobile", label: "手机", index: "mobile", width: 100, align: "center", title: !1}, {
            name: "telephone",
            label: "座机",
            index: "telephone",
            width: 100,
            title: !1
        }, {name: "linkIm", label: "QQ/微信/Email", index: "linkIm", width: 120, title: !1}, {
            name: "difMoney",
            label: "应收款余额",
            index: "difMoney",
            width: 100,
            align: "right",
            title: !1,
            formatter: "currency",
            hidden: s
        }, {
            name: "deliveryAddress",
            label: "送货地址",
            index: "deliveryAddress",
            width: 200,
            classes: "ui-ellipsis",
            formatter: function (e, t, i) {
                return (i.province || "") + (i.city || "") + (i.county || "") + (e || "")
            }
        }, {
            name: "authUser", label: "已授权用户", index: "authUser", width: 200, formatter: function (e, t, i) {
                return null === e || void 0 === e ? "" : e
            }
        }, {name: "delete", label: "状态", index: "delete", width: 80, align: "center", formatter: e}];
        o.gridReg("grid", c), c = o.conf.grids.grid.colModel, $("#grid").jqGrid({
            url: r,
            postData: {isDelete: "0"},
            datatype: "json",
            autowidth: !0,
            height: a.h,
            altRows: !0,
            gridview: !0,
            onselectrow: !1,
            multiselect: !0,
            colModel: c,
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
                    var t = {};
                    e = e.data;
                    for (var i = 0; i < e.rows.length; i++) {
                        var a = e.rows[i];
                        t[a.id] = a
                    }
                    $("#grid").data("gridData", t)
                } else {
                    var r = 250 === e.status ? n ? "没有满足条件的结果哦！" : "没有客户数据哦！" : e.msg;
                    parent.Public.tips({type: 2, content: r})
                }
            },
            loadError: function (e, t, i) {
                parent.Public.tips({type: 1, content: "操作失败了哦，请检查您的网络链接！"})
            },
            resizeStop: function (e, t) {
                o.setGridWidthByIndex(e, t, "grid")
            }
        })
    }(), function () {
        $_matchCon = $("#matchCon"), $_matchCon.placeholder(), $("#search").on("click", function (e) {
            e.preventDefault();
            var t = "输入客户编号/ 名称/ 联系人/ 电话查询" === $_matchCon.val() ? "" : $.trim($_matchCon.val());
            console.log(a.getValue());
            var i = 0 == a.getValue() ? -1 : a.getValue(), n = !0 === $("#chk-ischecked").find("span").hasClass("checked") ? 1 : 0;
            $("#grid").jqGrid("setGridParam", {
                page: 1,
                postData: {skey: t, categoryId: i, isDelete: n, isUserOpt: s}
            }).trigger("reloadGrid"), s = 1
        });
        $("#config").show().click(function (e) {
            _self.mod_PageConfig.config()
        }), $(document).on("click", "#chk-ischecked", function () {
            var e = $(this).find("span");
            e.hasClass("checked") ? e.removeClass("checked") : e.addClass("checked"), s = 0, $("#search").trigger("click")
        }), $("#btn-add").on("click", function (e) {
            e.preventDefault(), Business.verifyRight("BU_ADD") && c.operate("add")
        }), $("#btn-print").on("click", function (e) {
            e.preventDefault()
        }), $("#btn-import").on("click", function (e) {
            e.preventDefault(), Business.verifyRight("BU_导入") && parent.$.dialog({
                width: 630,
                height: 400,
                data: {importType: "cus"},
                title: "客户导入",
                content: "url:/settings/cus-sup-import.jsp",
                lock: !0
            })
        }), $("#btn-export").on("click", function (e) {
            if (Business.verifyRight("BU_EXPORT")) {
                if (!Business.noDataExportTips())return !1;
                var t = "输入客户编号/ 名称/ 联系人/ 电话查询" === $_matchCon.val() ? "" : $.trim($_matchCon.val()), i = 0 == a.getValue() ? -1 : a.getValue(), n = !0 === $("#chk-ischecked").find("span").hasClass("checked") ? 1 : 0;
                $(this).attr("href", "/basedata/customer.do?action=exporter&skey=" + t + "&categoryId=" + i + "&isDelete=" + n)
            }
        }), $("#grid").on("click", ".operating .ui-icon-pencil", function (e) {
            if (e.preventDefault(), Business.verifyRight("BU_UPDATE")) {
                var t = $(this).parent().data("id");
                c.operate("edit", t)
            }
        }), $("#grid").on("click", ".operating .ui-icon-trash", function (e) {
            if (e.preventDefault(), Business.verifyRight("BU_DELETE")) {
                var t = $(this).parent().data("id");
                c.del(t + "")
            }
        }), $("#btn-batchDel").click(function (e) {
            if (e.preventDefault(), Business.verifyRight("BU_DELETE")) {
                var t = $("#grid").jqGrid("getGridParam", "selarrrow");
                t.length ? c.del(t.join()) : parent.Public.tips({type: 2, content: "请选择需要删除的项"})
            }
        }), $("#btn-disable").click(function (e) {
            e.preventDefault();
            var t = $("#grid").jqGrid("getGridParam", "selarrrow").concat();
            t && 0 != t.length ? c.setStatuses(t, !0) : parent.Public.tips({type: 1, content: " 请先选择要禁用的客户！"})
        }), $("#btn-enable").click(function (e) {
            e.preventDefault();
            var t = $("#grid").jqGrid("getGridParam", "selarrrow").concat();
            t && 0 != t.length ? c.setStatuses(t, !1) : parent.Public.tips({type: 1, content: " 请先选择要启用的客户！"})
        }), $("#grid").on("click", ".set-status", function (e) {
            e.stopPropagation(), e.preventDefault();
            var t = $(this).data("id"), i = !$(this).data("delete");
            c.setStatus(t, i)
        }), $(window).resize(function () {
            Public.resizeGrid()
        })
    }()
});