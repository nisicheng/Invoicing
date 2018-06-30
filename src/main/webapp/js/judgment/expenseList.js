var SYSTEM = system = parent.SYSTEM, VERSION = parent.SYSTEM.siType, billRequiredCheck = SYSTEM.billRequiredCheck, curRow, curCol, loading, params = $.extend({
    buId: "",
    accountId: ""
}, Public.urlParam()), THISPAGE = {
    init: function (e) {
        this.mod_PageConfig = Public.mod_PageConfig.init("expenseList"), this.initDom(e), this.loadGrid(), this.addEvent()
    }, initDom: function (e) {
        this.$_customer = $("#customer"), this.customerCombo = Business.billSupplierCombo($("#customer"), {defaultSelected: -1}), this.$_customer.data("contactInfo", {
            id: "0",
            name: ""
        }), this.customerCombo.input.val("(空)");
        var t = {
            data: "/basedata/assist.do?action=list&isDelete=2&typeNumber=paccttype",
            text: "name",
            value: "id",
            addOptions: {value: "", text: "所有支出项目"},
            defaultSelected: 0,
            editable: !1,
            trigger: !0,
            cache: !1,
            extraListHtml: "",
            callback: {
                onChange: function (e) {
                    params.accountId = void 0 !== e ? e.id : ""
                }
            }
        };
        Business.categoryCombo($("#expenseType"), t, !0), this.$_beginDate = $("#beginDate").val(system.beginDate), this.$_endDate = $("#endDate").val(system.endDate), this.$_beginDate.datepicker(), this.$_endDate.datepicker()
    }, loadGrid: function () {
        function e() {
            var e = t(), i = a(), n = $("#grid");
            originalData > Math.floor(i / 41).toFixed(0) ? n.jqGrid("setGridHeight", i) : n.jqGrid("setGridHeight", "auto"), n.jqGrid("setGridWidth", e, !1)
        }

        function t() {
            return $(window).width() - (t.offsetLeft || (t.offsetLeft = $("#grid-wrap").offset().left)) - 36 - 22
        }

        function a() {
            return $(window).height() - (a.offsetTop = $("#grid").offset().top) - 36 - 16
        }

        params.beginDate = this.$_beginDate.val(), params.endDate = this.$_endDate.val();
        var i = [{name: "billId", label: "费用单id", width: 0, hidden: !0}, {
            name: "contactName",
            label: "供应商",
            width: 150,
            align: "center"
        }, {name: "buId", label: "供应商id", align: "center", hidden: !0}, {
            name: "assistName",
            label: "支出类别",
            width: 120,
            align: "center"
        }, {name: "accountId", label: "支出类别id", width: 0, align: "center", hidden: !0}, {
            name: "amount",
            label: "金额",
            width: 80,
            formatter: "currency",
            align: "right"
        }, {name: "rAmount", label: "未付费用", width: 80, formatter: "currency", align: "right"}, {
            name: "srcOrderNo",
            label: "源单号",
            width: 150,
            align: "center",
            formatter: function (e, t, a) {
                var i = e;
                return a.share && (i += ' <span style="color:red">√</span>'), i
            }
        }, {name: "srcOrderId", label: "源单号id", width: 0, hidden: !0}, {
            name: "srcContactName",
            label: "源单往来单位",
            width: 150,
            align: "center"
        }, {
            name: "qtzc", label: "其他支出单编号", width: 150, align: "center", formatter: function (e, t, a) {
                for (var i = [], n = 0; n < a.qtzc.length; n++)if (a.qtzc[n].qtzcBillNo) {
                    var r = '<span class="otherBillNoLink link" data-id="' + a.qtzc[n].qtzcBillId + '">' + a.qtzc[n].qtzcBillNo + "</span>";
                    i.push(r)
                } else i.push("&#160;");
                return i.join('<p class="line" />')
            }
        }, {name: "date", label: "源单日期", width: 120}, {
            name: "des",
            label: "备注",
            width: 200,
            align: "center"
        }, {name: "payType", label: "付款状态", width: 100, align: "center"}];
        this.mod_PageConfig.gridReg("grid", i), i = this.mod_PageConfig.conf.grids.grid.colModel;
        $("#grid").jqGrid({
            url: "/scm/feeBill.do?action=list",
            postData: params,
            datatype: "json",
            autowidth: !0,
            height: "auto",
            altRows: !0,
            gridview: !0,
            colModel: i,
            cmTemplate: {sortable: !1, title: !1},
            multiselect: !0,
            page: 1,
            pager: "#page",
            rowNum: 100,
            rowList: [100, 200, 500],
            viewrecords: !0,
            shrinkToFit: !1,
            forceFit: !1,
            footerrow: !0,
            userDataOnFooter: !0,
            jsonReader: {
                root: "data.data.entries",
                records: "data.records",
                total: "data.total",
                userdata: "data.data.userData",
                repeatitems: !1,
                id: "billId"
            },
            loadComplete: function (e) {
                var n = originalData = e.records, r = a();
                n > Math.floor(r / 41).toFixed(0) && ($("#grid").jqGrid("setGridHeight", r), $("#grid").jqGrid("setGridWidth", t(), !1)), Public.addDefUpArrow(this, i, !0)
            },
            loadError: function (e, t, a) {
            },
            ondblClickRow: function (e, t, a, i) {
                $("#" + e).find(".ui-icon-pencil").trigger("click")
            },
            resizeStop: function (e, t) {
                THISPAGE.mod_PageConfig.setGridWidthByIndex(e, t - 1, "grid")
            }
        }).navGrid("#page", {edit: !1, add: !1, del: !1, search: !1, refresh: !1}).navButtonAdd("#page", {
            caption: "",
            buttonicon: "ui-icon-expenseTips",
            onClickButton: function () {
                THISPAGE.mod_PageConfig.config()
            },
            position: "last"
        });
        var n;
        $(window).on("resize", function (t) {
            n || (n = setTimeout(function () {
                e(), n = null
            }, 50))
        })
    }, reloadData: function (e) {
        $("#grid").clearGridData(!0);
        $("#grid").jqGrid("setGridParam", {
            url: "/scm/feeBill.do?action=list",
            datatype: "json",
            postData: e
        }).trigger("reloadGrid")
    }, addEvent: function () {
        var e = this;
        Business.billsEvent(e, "expenseList"), $("#search").click(function (t) {
            if (t.preventDefault(), Business.verifyRight("FEEBILL_QUERY")) {
                var a = e.$_customer.find("input"), i = e.$_customer.data("contactInfo");
                if (params.beginDate = e.$_beginDate.val(), params.endDate = e.$_endDate.val(), !i || !i.id)return setTimeout(function () {
                    a.focus().select()
                }, 15), parent.Public.tips({type: 2, content: "当前供应商不存在！"}), !1;
                params.buId = i.id, params.accountId = params.accountId;
                var n = new Array;
                $('input[name="billStatus"]').each(function (e, t) {
                    $(this).is(":checked") && n.push($(this).val())
                }), e.$_payType = n.join(","), params.payType = e.$_payType ? e.$_payType : "", THISPAGE.reloadData(params)
            }
        }), $("#export").click(function (t) {
            if (Business.verifyRight("FEEBILL_EXPORT")) {
                if (!Business.noDataExportTips())return !1;
                var a = e.$_customer.data("contactInfo");
                params.buId = a.id, params.beginDate = e.$_beginDate.val(), params.endDate = e.$_endDate.val();
                var i = $("#grid").jqGrid("getGridParam", "selarrrow").join(), n = i ? "&id=" + i : "", r = new Array;
                $('input[name="billStatus"]').each(function (e, t) {
                    $(this).is(":checked") && r.push($(this).val())
                }), e.$_payType = r.join(","), params.payType = e.$_payType ? e.$_payType : "";
                for (var o in params)params[o] && (n += "&" + o + "=" + params[o]);
                var d = "/scm/feeBill.do?action=exportFeeBill" + n;
                $(this).attr("href", d)
            } else t.preventDefault()
        }), $("#toPay").click(function (e) {
            if (e.preventDefault(), Business.verifyRight("QTZC_ADD")) {
                for (var t = $("#grid").jqGrid("getGridParam", "selarrrow"), a = [], i = 0; i < t.length; i++) {
                    s = t[i];
                    if ("已付" == (l = $("#grid").jqGrid("getRowData", s)).payType)return void parent.parent.Public.tips({
                        type: 2,
                        content: "请选择未支付完成的单据！"
                    });
                    for (var n = 0, r = 0; r < t.length; r++) {
                        var o = $("#grid").jqGrid("getRowData", t[r]);
                        l.buId != o.buId && (n += 1)
                    }
                    if (n > 0)return void parent.parent.Public.tips({type: 2, content: "请选择供应商相同的单据！"});
                    a.push(t[i])
                }
                for (var d = [], i = 0; i < a.length; i++) {
                    var s = a[i], l = $("#grid").jqGrid("getRowData", s);
                    if (l)var c = {
                        expenseId: l.billId,
                        buId: l.buId,
                        contactName: l.contactName,
                        accountId: l.accountId,
                        assistName: l.assistName,
                        amount: l.rAmount,
                        des: l.des
                    };
                    d.push(c)
                }
                var p = "fn" + (new Date).getTime();
                if (parent[p] = {data: d}, d.length) {
                    var u = "money-otherExpense";
                    parent.parent.tab.addTabItem({
                        tabid: u,
                        text: "其他支出单",
                        url: "/money/other-expense.jsp?id=-2&fn=" + p
                    }), parent.parent.tab.reload(u)
                } else parent.parent.Public.tips({type: 2, content: "请先选择单据！"})
            }
        }), $(".grid-wrap").on("click", ".otherBillNoLink", function (e) {
            e.preventDefault();
            var t = $(this).data("id");
            parent.tab.addTabItem({
                tabid: "money-otherExpense",
                text: "其他支出单",
                url: "/money/other-expense.jsp?id=" + t
            });
            $("#grid").jqGrid("getDataIDs");
            parent.salesListIds = $("#grid").jqGrid("getDataIDs")
        }), $("#refresh").click(function () {
            THISPAGE.reloadData(params)
        }), $(window).resize(function () {
            Public.resizeGrid()
        })
    }
};
$(function () {
    THISPAGE.init()
});