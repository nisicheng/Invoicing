$(function () {
    function e(e, a, i) {
        for (var t = "", r = 0; r < i.digits - e.toString().length; r++)t += "0";
        return t += e
    }

    function a(e, a, i) {
        return e ? "是" : "否"
    }

    function i(e, a, i) {
        var t = i.prefix, r = "", n = "", o = [];
        if (o = (new Date).format("yyyy-MM-dd").split("-"), i.numMode && 2 == i.numMode && (r = o[0]), i.numMode && 3 == i.numMode && (r = o[0] + o[1]), i.numMode && 4 == i.numMode && (r = o[0] + o[1] + o[2]), i.numMode && 5 == i.numMode && (r = o[1]), i.numMode && 6 == i.numMode && (r = o[2]), i.numMode && 7 == i.numMode && (r = o[0] + o[2]), i.numMode && 8 == i.numMode && (r = o[1] + o[2]), i.startNo) {
            for (var d = "", c = 0; c < i.digits - i.startNo.toString().length; c++)d += "0";
            n = d + i.startNo
        }
        return t = t + r + n
    }

    function t(e, a, i) {
        var t = "";
        switch (i.typeNo) {
            case"PUR":
                t = "购货单";
                break;
            case"PO":
                t = "购货订单";
                break;
            case"PURT":
                t = "购货退货单";
                break;
            case"SALE":
                t = "销货单";
                break;
            case"SO":
                t = "销货订单";
                break;
            case"SALET":
                t = "销货退货单";
                break;
            case"TRANSFER":
                t = "调拨单";
                break;
            case"OI":
                t = "其他入库单";
                break;
            case"OO":
                t = "其他出库单";
                break;
            case"CADJ":
                t = "成本调整";
                break;
            case"ZZD":
                t = "组装单";
                break;
            case"CXD":
                t = "拆卸单";
                break;
            case"RECEIPT":
                t = "收款单";
                break;
            case"PAYMENT":
                t = "付款单";
                break;
            case"VERIFICA":
                t = "核销单";
                break;
            case"QTSR":
                t = "其他收入单";
                break;
            case"QTZC":
                t = "其他支出单";
                break;
            case"ZJZZ":
                t = "资金转账单"
        }
        return t
    }

    var r = "/basedata/docNo.do?action=list", n = {
        operate: function (e, a) {
            if ("add" == e)var i = "新增编码规则", t = {
                oper: e,
                callback: this.callback
            }; else var i = "修改编码规则", r = $("#grid").jqGrid("getRowData", a), t = {
                oper: e,
                rowId: a,
                callback: this.callback,
                rowData: r
            };
            $.dialog({
                title: i,
                content: "url:coderule-manage.jsp",
                data: t,
                width: 640,
                height: 368,
                max: !1,
                min: !1,
                cache: !1,
                lock: !0
            })
        }, del: function (e) {
            $.dialog.confirm("删除的编码规则将不能恢复，请确认是否删除？", function () {
                Public.ajaxPost("../basedata/docNo.do?action=delete", {id: e}, function (e) {
                    if (e && 200 == e.status) {
                        for (var a = e.data, i = (a.successArr, 0); i < a.successArr.length; i++)(t = a.successArr[i]).number = $("#grid").jqGrid("getRowData", t.id).name;
                        for (i = 0; i < a.failArr.length; i++) {
                            var t = a.failArr[i];
                            t.number = $("#grid").jqGrid("getRowData", t.id).name
                        }
                        Public.showBasicDeleteMsg(a, "规则"), $("#grid").jqGrid("setGridParam").trigger("reloadGrid")
                    } else parent.Public.tips({type: 1, content: "删除编码规则失败！" + e.msg})
                })
            })
        }, callback: function () {
            $("#grid").jqGrid("setGridParam").trigger("reloadGrid")
        }
    }, o = Public.mod_PageConfig.init("billsCoderule");
    _self = this, this.mod_PageConfig = o, function (n) {
        var d = Public.setGrid(), c = [{
            name: "operate",
            label: "操作",
            width: 60,
            fixed: !0,
            formatter: Public.operFmatter
        }, {name: "id", label: "id", hidden: !0}, {
            name: "typeNo",
            label: "单据类型",
            index: "typeNo",
            hidden: !0
        }, {
            name: "typeName",
            label: "单据类型",
            index: "typeName",
            width: 150,
            fixed: !0,
            align: "center",
            formatter: t
        }, {name: "name", label: "规则名称", index: "name", width: 150, align: "center"}, {
            name: "numMode",
            label: "年月日",
            index: "numMode",
            hidden: !0
        }, {
            name: "numberDemo",
            label: "编号规则",
            index: "numberDemo",
            width: 250,
            align: "center",
            formatter: i
        }, {
            name: "digits",
            label: "编号位数",
            index: "digits",
            width: 80,
            classes: "ui-ellipsis",
            align: "center"
        }, {
            name: "startNo",
            label: "起始编号",
            index: "startNo",
            width: 150,
            fixed: !0,
            formatter: e,
            align: "center"
        }, {name: "prefix", label: "编码前缀", index: "startNo", hidden: !0}, {
            name: "defaults",
            label: "默认状态",
            index: "defaults",
            align: "center",
            formatter: a
        }];
        o.gridReg("grid", c), c = o.conf.grids.grid.colModel, $("#grid").jqGrid({
            url: r,
            datatype: "json",
            autowidth: !0,
            height: d.h,
            altRows: !0,
            gridview: !0,
            onselectrow: !1,
            multiselect: !0,
            rownumbers: !0,
            colModel: c,
            pager: "#page",
            viewrecords: !0,
            cmTemplate: {sortable: !1},
            rowNum: 100,
            rowList: [100, 200, 500],
            shrinkToFit: !1,
            forceFit: !0,
            jsonReader: {root: "data.rows", records: "records", total: "total", repeatitems: !1, id: "id"},
            loadComplete: function (e) {
            },
            loadError: function (e, a, i) {
            },
            resizeStop: function (e, a) {
                o.setGridWidthByIndex(e, a, "grid")
            }
        })
    }(), $("#config").show().click(function (e) {
        _self.mod_PageConfig.config()
    }), $("#btn-add").on("click", function (e) {
        e.preventDefault(), Business.verifyRight("DOCNO_ADD") && n.operate("add")
    }), $("#grid").on("click", ".operating .ui-icon-pencil", function (e) {
        if (e.preventDefault(), Business.verifyRight("DOCNO_UPDATE")) {
            var a = $(this).parent().data("id");
            n.operate("edit", a)
        }
    }), $("#grid").on("click", ".operating .ui-icon-trash", function (e) {
        if (e.preventDefault(), Business.verifyRight("DOCNO_DELETE")) {
            var a = $(this).parent().data("id");
            n.del(a + "")
        }
    }), $("#btn-batchDel").click(function (e) {
        if (e.preventDefault(), Business.verifyRight("DOCNO_DELETE")) {
            var a = $("#grid").jqGrid("getGridParam", "selarrrow");
            a.length ? n.del(a.join()) : parent.Public.tips({type: 2, content: "请选择需要删除的项"})
        }
    }), $(window).resize(function () {
        Public.resizeGrid()
    })
});