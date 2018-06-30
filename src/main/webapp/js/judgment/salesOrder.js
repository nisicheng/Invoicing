function _defineProperty(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
            value: a,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = a, t
}
var curRow, curCol, loading, SYSTEM = system = parent.SYSTEM, billRequiredCheck = system.billRequiredCheck, requiredMoney = system.requiredMoney, taxRequiredCheck = system.taxRequiredCheck, taxRequiredInput = system.taxRequiredInput, hiddenAmount = !1, urlParam = Public.urlParam(), disEditable = urlParam.disEditable, qtyPlaces = Number(parent.SYSTEM.qtyPlaces), pricePlaces = Number(parent.SYSTEM.pricePlaces), amountPlaces = Number(parent.SYSTEM.amountPlaces), defaultPage = Public.getDefaultPage(), dia_unitId, dia_qty, THISPAGE = {
    init: function (t) {
        this.mod_PageConfig = Public.mod_PageConfig.init("salesOrder"), !1 !== SYSTEM.isAdmin || SYSTEM.rights.AMOUNT_OUTAMOUNT || (hiddenAmount = !0, $("#amountArea").hide()), this.initDom(t), this.loadGrid(t), this.initCombo(), t.id > 0 && t.checked ? this.disableEdit() : (this.editable = !0, $("#grid").jqGrid("setGridParam", {cellEdit: !0})), this.addEvent(), setTimeout(function () {
            $("#grid").jqGrid("nextCell", 1, 1)
        }, 10), $.cookie("BarCodeInsert") && (THISPAGE.$_barCodeInsert.removeClass("close"), THISPAGE.$_barCodeInsert.addClass("open")), this.goodsEdittypeInit(), this.triggerEdit()
    }, initDom: function (t) {
        var e = this;
        if (this.$_customer = $("#customer"), this.$_date = $("#date").val(system.endDate), this.$_deliveryDate = $("#deliveryDate").val(system.endDate), this.$_number = $("#number"), this.$_classes = $("#classes"), this.$_note = $("#note"), this.$_discountRate = $("#discountRate"), this.$_deduction = $("#deduction"), this.$_discount = $("#discount"), this.$_payment = $("#payment"), this.$_arrears = $("#arrears"), this.$_totalArrears = $("#totalArrears"), this.$_toolTop = $("#toolTop"), this.$_toolBottom = $("#toolBottom"), this.$_paymentTxt = $("#paymentTxt"), this.$_accountInfo = $("#accountInfo"), this.$_userName = $("#userName"), this.$_modifyTime = $("#modifyTime"), this.$_modifyName = $("#modifyName"), this.$_createTime = $("#createTime"), this.$_checkName = $("#checkName"), this.$_checkTime = $("#checkTime"), this.customerArrears = 0, this.$_note.placeholder(), "add" !== t.status || t.salesId) a = ["id", t.salesId]; else var a = 0;
        this.salesCombo = Business.billSalesCombo($("#sales"), {defaultSelected: a});
        var i = t;
        if (this.customerCombo = Business.billCustomerCombo($("#customer"), {
                defaultSelected: -1,
                callback: {
                    onChange: function (t) {
                        t ? ($("#customer").data("contactInfo", t), ("edit" == originalData.status && i.buId != t.id || "add" == originalData.status) && (t.employeeId ? e.salesCombo.selectByValue(t.employeeId) : e.setSaleByContact(t))) : $("#customer").removeData("contactInfo")
                    }
                }
            }), "add" !== t.status || t.buId) {
            if (!this.customerCombo.getValue()) {
                var o = {id: t.buId, name: t.contactName, cLevel: t.cLevel};
                this.$_customer.data("contactInfo", o), this.customerCombo.input.val(t.contactName)
            }
            for (var n = 0; n < SYSTEM.salesInfo.length; n++)if (SYSTEM.salesInfo[n].id === t.salesId) {
                this.salesCombo.selectByText(SYSTEM.salesInfo[n].name);
                break
            }
        } else Public.ajaxPost("/basedata/contact.do?action=getRecentlyContact", {
            transType: originalData.transType,
            billType: "SO"
        }, function (t) {
            var a = {id: (t = t.data).buId, name: t.contactName, cLevel: t.cLevel, number: t.number};
            e.$_customer.data("contactInfo", a), e.customerCombo.selectByText(t.number + " " + t.contactName)
        });
        $("#customer").data("callback", function (t) {
            Number(t.employeeId) ? THISPAGE.salesCombo.selectByValue(Number(t.employeeId)) : e.setSaleByContact(t)
        }), this.$_date.datepicker({
            onSelect: function (t) {
                if (!(originalData.id > 0)) {
                    var a = t.format("yyyy-MM-dd");
                    e.$_number.text(""), Public.ajaxPost("/basedata/systemProfile.do?action=generateDocNo", {
                        billType: "SO",
                        billDate: a
                    }, function (t) {
                        200 === t.status ? e.$_number.text(t.data.billNo) : parent.Public.tips({
                                type: 1,
                                content: t.msg
                            })
                    })
                }
            }
        }), this.$_deliveryDate.datepicker(), this.classBox = this.$_classes.cssRadio({
            callback: function (t) {
                "150601" == t.find("input").val() ? e.$_paymentTxt.text("本次收款:") : e.$_paymentTxt.text("本次退款:")
            }
        }), 150601 == t.transType ? this.classBox.setValue(0) : this.classBox.setValue(1), t.description && this.$_note.val(t.description), this.$_discountRate.val(t.disRate), this.$_deduction.val(t.disAmount), this.$_discount.val(t.amount), this.$_payment.val(t.rpAmount), this.$_arrears.val(t.arrears), requiredMoney && ($("#accountWrap").show(), this.accountCombo = Business.accountCombo($("#account"), {
            width: 112,
            height: 300,
            emptyOptions: !0,
            addOptions: {text: "多账户", value: -1},
            callback: {
                onChange: function (t) {
                    if (-1 === this.getValue()) e.chooseAccount(); else {
                        var a = [];
                        a.push({
                            accId: this.getValue(),
                            account: "",
                            payment: e.$_payment.val(),
                            wayId: 0,
                            way: "",
                            settlement: ""
                        }), e.$_accountInfo.data("accountInfo", a).hide(), e.$_payment.removeAttr("disabled").removeClass("ui-input-dis")
                    }
                }
            }
        }), this.accountCombo.selectByValue(t.accId, !1));
        var s = '<a id="savaAndAdd" class="ui-btn ui-btn-sp">保存并新增</a><a id="save" class="ui-btn">保存</a>', r = '<a id="add" class="ui-btn ui-btn-sp">新增</a><a id="copy" class="ui-btn">复制</a><a href="/scm/invSo.do?action=toPdf&id=' + t.id + '" target="_blank" id="print" class="ui-btn">打印</a><a id="edit" class="ui-btn">保存</a>', d = '<a id="add" class="ui-btn ui-btn-sp">新增</a><a id="copy" class="ui-btn">复制</a><a href="/scm/invSo.do?action=toPdf&id=' + t.id + '" target="_blank" id="print" class="ui-btn">打印</a>', l = "", c = "", u = '<a id="turn" class="ui-btn ' + (2 == t.billStatus ? "ui-btn-dis" : "ui-btn-sc") + '">生成销货单</a>', m = '<a id="turn" class="ui-btn ' + (2 == t.billStatus ? "ui-btn-dis" : "ui-btn-sc") + '">生成退货单</a>', p = "150602" == originalData.transType ? m : u, h = '<a class="ui-btn" id="close">关闭</a>', b = '<a class="ui-btn" id="open">开启</a>';
        billRequiredCheck ? (l = '<a class="ui-btn" id="audit">审核</a>', c = '<a class="ui-btn" id="reAudit">反审核</a>') : (r = p + r, this.$_checkName.parent().hide(), this.$_checkTime.parent().hide());
        var g = '<a class="ui-btn-prev" id="prev" title="上一张"><b></b></a><a class="ui-btn-next" id="next" title="下一张"><b></b></a>';
        if (this.btn_add = s, this.btn_edit = r, this.btn_audit = l, this.btn_view = d, this.btn_reaudit = c, this.btn_turn = p, this.btn_close = h, this.btn_open = b, t.id > 0) {
            if (this.$_number.text(t.billNo), $("#editBills").css("display", "none"), this.$_date.val(t.date), this.$_deliveryDate.val(t.deliveryDate), this.$_totalArrears.val(t.totalArrears), this.$_accountInfo.data("accountInfo", t.accounts), -1 === t.accId && (this.$_accountInfo.show(), e.$_payment.attr("disabled", "disabled").addClass("ui-input-dis")), $("#grid").jqGrid("footerData", "set", {
                    qty: t.totalQty,
                    amount: t.totalAmount
                }), "list" !== urlParam.flag && (g = ""), t.isDelete && $("#mark").addClass("has-closed"), "edit" === t.status) {
                f = r + l;
                t.isDelete ? f = d + b : f += billRequiredCheck ? t.checked ? h : "" : h, this.$_toolBottom.html('<span id="groupBtn">' + f + "</span>" + g), this.$_checkTime.parent().hide(), this.$_checkName.parent().hide()
            } else if (t.checked) {
                $("#mark").addClass("has-audit");
                f = p + d + c;
                t.isDelete ? f = d + b : f += h, this.$_toolBottom.html('<span id="groupBtn">' + f + "</span>" + g)
            } else {
                var f = d;
                t.isDelete ? f += b : f += billRequiredCheck ? t.checked ? h : "" : h, this.$_toolBottom.html('<span id="groupBtn">' + f + "</span>" + g), this.$_checkTime.parent().hide(), this.$_checkName.parent().hide()
            }
            this.idList = parent.cacheList.salesOrderId || [], this.idPostion = $.inArray(String(t.id), this.idList), this.idLength = this.idList.length, 0 === this.idPostion && $("#prev").addClass("ui-btn-prev-dis"), this.idPostion === this.idLength - 1 && $("#next").addClass("ui-btn-next-dis"), this.$_userName.html(t.userName), this.$_modifyTime.html(t.modifyTime), this.$_modifyName.html(t.modifyName), this.$_createTime.html(t.createTime), this.$_checkName.html(t.checkName), this.$_checkTime.html(t.checkTime)
        } else billRequiredCheck ? this.$_toolBottom.html('<span id="groupBtn">' + s + l + "</span>") : this.$_toolBottom.html('<span id="groupBtn">' + s + "</span>"), this.$_userName.html(system.realName || ""), this.$_modifyTime.parent().hide(), this.$_modifyName.parent().hide(), this.$_createTime.parent().hide(), this.$_checkName.parent().hide(), this.$_checkTime.parent().hide();
        disEditable && (THISPAGE.disableEdit(), this.$_toolBottom.hide())
    }, loadGrid: function (t) {
        function e(t) {
            if (taxRequiredCheck) {
                var e = $("#grid").jqGrid("getRowData", t), a = parseFloat(e.taxRate) || 0;
                if ($.isNumeric(a)) {
                    var i = parseFloat(e.amount), o = i * a / 100, n = i + o;
                    $("#grid").jqGrid("setRowData", t, {tax: o, taxAmount: n})
                }
            }
        }

        function a(t) {
            return Math.round(100 * t) / 100
        }

        function i(t, e) {
            return $(".priceAuto")[0]
        }

        function o(t, e, a) {
            if ("get" === e)return t.val().split("：")[1] || t.val();
            "set" === e && $("input", t).val(a)
        }

        function n() {
            $("#initCombo").append($(".priceAuto").val(""))
        }

        function s(t) {
            var e = $("#" + t).data("goodsInfo");
            if (e) a = $.extend(!0, {}, e); else var a = e;
            var i = $("#grid").jqGrid("getRowData", t), o = r.$_customer.data("contactInfo") || {};
            if (a) {
                var n = a.id + "" + (a.skuId || 0);
                n !== i.goodId && (i = {});
                var s = Business.getSalesFullData({
                    curRowInfo: a,
                    contactInfo: o,
                    rowid: t,
                    row: i
                }), d = s.thePrice, l = s.theTaxPrice, c = s.unitInfo, u = s.skuInfo, m = {
                    goodId: n,
                    customerInvNumber: (a = s.curRowInfo).customerInvNumber,
                    barCode: a.barCode,
                    skuName: u.name || "",
                    mainUnit: c.name || "",
                    unitId: c.unitId || 0,
                    qty: a.qty || 1,
                    price: d,
                    taxPrice: l,
                    discountRate: a.discountRate || 0,
                    deduction: a.deduction || 0,
                    locationName: a.locationName,
                    locationId: a.locationId,
                    taxRate: a.taxRate || taxRequiredInput,
                    srcOrderNo: a.srcOrderNo || "",
                    srcOrderEntryId: a.srcOrderEntryId || "",
                    srcOrderId: a.srcOrderId || "",
                    safeDays: a.safeDays || ""
                };
                if (m.qty > 0 && (m.deduction = i.deduction || Number(m.qty).mul(Number(m.price || 0)).mul(Number(m.discountRate || 0).div(100)), m.amount = 0 === i.amount ? "" + i.amount : i.amount || Number(m.qty).mul(Number(m.price || 0)).subtr(Number(m.deduction || 0)), Number(m.qty) !== Number(i.qty) && (m.amount = Number(m.qty).mul(Number(m.price || 0)).subtr(Number(m.deduction || 0)))), taxRequiredCheck) {
                    var p = parseFloat(m.taxRate), h = Number(m.amount).mul(Number(p).div(100)), b = Number(m.amount).add(h);
                    m.tax = i.tax || h, m.taxAmount = i.taxAmount || b
                }
                var g = $("#grid").jqGrid("setRowData", t, m);
                invorder = "", g && (THISPAGE.calTotal(), invorder = "STR")
            }
        }

        var r = this;
        if (t.id) {
            var d = 5 - t.entries.length;
            if (d > 0)for (var l = 0; l < d; l++)t.entries.push({})
        }
        r.newId = 6;
        var c = [{
            name: "operating",
            label: " ",
            nameExt: "",
            width: 1,
            fixed: !0,
            formatter: Public.billsOper_goods,
            align: "left"
        }, {
            name: "goodId", label: " ", nameExt: "", width: 1, hidden: !0, formatter: function (t, e, a) {
                return t || (a.invId ? a.invId + "" + a.skuId : "")
            }
        }, {
            name: "goods",
            label: '<span class="red">*</span>商品',
            nameExt: '<label> -- 扫描枪录入</label><span id="barCodeInsert" class="close"><span class="ui-icon-circle"></span></span>',
            width: 300,
            classes: "goods",
            formatter: function (t, e, a) {
                return t ? "undefined undefined" == t ? "&#160;" : (s(e.rowId), t) : a.invNumber ? a.invSpec ? a.invNumber + " " + a.invName + "_" + a.invSpec : a.invNumber + " " + a.invName : "&#160;"
            },
            editable: !0,
            enterCallback: function () {
                if (THISPAGE.$_barCodeInsert.hasClass("open")) {
                    if (Business.filterBarcodeGood())return;
                    var t = function (t) {
                        var e = $("#" + t), a = e.next(), i = e.index() + 1;
                        return 0 == a.length ? ($("#grid").jqGrid("addRowData", THISPAGE.newId, {}, "last"), THISPAGE.newId++, $("#" + (THISPAGE.newId - 1)).index()) : a.data("goodsInfo") ? arguments.callee(i) : i
                    }(THISPAGE.curID);
                    $("#grid").jqGrid("nextCell", t, 1)
                } else 0 != $("#grid")[0].p.savedRow.length && $("#grid").jqGrid("nextCell", $("#grid")[0].p.savedRow[0].id, $("#grid")[0].p.savedRow[0].ic)
            }
        }, {name: "customerInvNumber", label: "物料编码", width: 120, hidden: !0}, {
            name: "invNumberMap",
            label: "物料编码数组",
            hidden: !0
        }, {name: "barCode", label: "商品条码", width: 120, hideDefault: !0, hidden: !0}, {
            name: "skuId",
            label: "属性ID",
            hidden: !0
        }, {
            name: "skuName",
            label: "属性",
            width: 100,
            classes: "ui-ellipsis skuInfo",
            hidden: !SYSTEM.enableAssistingProp,
            editable: !0,
            edittype: "custom",
            editoptions: {
                custom_element: function (t, e) {
                    return $(".skuAuto")[0]
                }, custom_value: function (t, e, a) {
                    if ("get" === e)return "" !== $(".skuAuto").getCombo().getValue() ? $(t).val() : ($(t).parents("tr").removeData("skuInfo"), "");
                    "set" === e && $("input", t).val(a)
                }, handle: function () {
                    $("#initCombo").append($(".skuAuto").val(""))
                }, trigger: "ui-icon-ellipsis"
            }
        }, {
            name: "mainUnit",
            label: "单位",
            width: 80,
            editable: !0,
            edittype: "custom",
            editoptions: {
                custom_element: function (t, e) {
                    return $(".unitAuto")[0]
                }, custom_value: function (t, e, a) {
                    if ("get" === e) {
                        if ("" !== $(".unitAuto").getCombo().getValue())return $(t).val();
                        var i = $(t).parents("tr").data("unitInfo") || {};
                        return THISPAGE.unitCombo.selectByIndex(i.unitId || i.id), i.name || ""
                    }
                    "set" === e && $("input", t).val(a)
                }, handle: function () {
                    $("#initCombo").append($(".unitAuto").val(""))
                }, trigger: "ui-icon-triangle-1-s"
            }
        }, {name: "unitId", label: "单位Id", hidden: !0}, {
            name: "inventory",
            label: " ",
            width: 20,
            align: "center",
            formatter: Public.billsQueryInventory
        }, {
            name: "locationName",
            label: '<span class="red">*</span>仓库',
            nameExt: '<small id="batchStorage">批量</small>',
            width: 100,
            link: "inventory",
            editable: !0,
            edittype: "custom",
            editoptions: {
                custom_element: function (t, e) {
                    return $(".storageAuto")[0]
                }, custom_value: function (t, e, a) {
                    if ("get" === e)return "" !== $(".storageAuto").getCombo().getValue() ? $(t).val() : ($(t).parents("tr").removeData("storageInfo"), "");
                    "set" === e && $("input", t).val(a)
                }, handle: function () {
                    $("#initCombo").append($(".storageAuto").val(""))
                }, trigger: "ui-icon-triangle-1-s"
            }
        }, {
            name: "qty",
            label: '<span class="red">*</span>数量',
            width: 80,
            align: "right",
            formatter: "number",
            formatoptions: {decimalPlaces: qtyPlaces},
            editable: !0
        }, {
            name: "price",
            label: "销售单价",
            hidden: hiddenAmount,
            width: 100,
            fixed: !0,
            align: "right",
            formatter: "currency",
            formatoptions: {showZero: !0, decimalPlaces: pricePlaces},
            editable: !0,
            edittype: "custom",
            editoptions: {custom_element: i, custom_value: o, handle: n, trigger: "ui-icon-triangle-1-s"}
        }];
        taxRequiredCheck && c.push({
            name: "taxPrice",
            label: "含税单价",
            hidden: hiddenAmount,
            width: 100,
            fixed: !0,
            align: "right",
            formatter: "currency",
            formatoptions: {showZero: !0, decimalPlaces: pricePlaces},
            editable: !0,
            edittype: "custom",
            editoptions: {custom_element: i, custom_value: o, handle: n, trigger: "ui-icon-triangle-1-s"}
        }), c.push({
            name: "discountRate",
            label: "折扣率(%)",
            nameExt: '<small id="batch_discountRate">批量</small>',
            hidden: hiddenAmount,
            width: 126,
            fixed: !0,
            align: "right",
            formatter: "integer",
            editable: !0
        }, {
            name: "goodsDiscountRate",
            label: "商品折扣(折)",
            nameExt: '<small id="batch_goodsDiscountRate">批量</small>',
            hidden: !0,
            width: 126,
            fixed: !0,
            align: "right",
            formatter: "currency",
            formatoptions: {showZero: !0, decimalPlaces: amountPlaces},
            editable: !0,
            editrules: {minValue: 0, maxValue: 10}
        }, {
            name: "deduction",
            label: "折扣额",
            nameExt: '<small id="batch_deduction">批量</small>',
            hidden: hiddenAmount,
            width: 126,
            fixed: !0,
            align: "right",
            formatter: "currency",
            formatoptions: {showZero: !0, decimalPlaces: amountPlaces},
            editable: !0
        }, {name: "prices", label: "销售价格数组", hidden: !0}, {
            name: "amount",
            label: "销售金额",
            hidden: hiddenAmount,
            width: 100,
            fixed: !0,
            align: "right",
            formatter: "currency",
            formatoptions: {showZero: !0, decimalPlaces: amountPlaces},
            editable: !0
        }), this.calAmount = "amount", taxRequiredCheck && (c.pop(), c.push({
            name: "amount",
            label: "金额",
            hidden: hiddenAmount,
            width: 100,
            fixed: !0,
            align: "right",
            formatter: "currency",
            formatoptions: {showZero: !0, decimalPlaces: amountPlaces},
            editable: !0
        }, {
            name: "taxRate",
            label: "税率(%)",
            hidden: hiddenAmount,
            width: 70,
            fixed: !0,
            align: "right",
            formatter: "integer",
            editable: !0
        }, {
            name: "tax",
            label: "税额",
            hidden: hiddenAmount,
            width: 70,
            fixed: !0,
            align: "right",
            formatter: "currency",
            formatoptions: {showZero: !0, decimalPlaces: amountPlaces},
            editable: !0
        }, {
            name: "taxAmount",
            label: "价税合计",
            hidden: hiddenAmount,
            width: 100,
            fixed: !0,
            align: "right",
            formatter: "currency",
            formatoptions: {showZero: !0, decimalPlaces: amountPlaces},
            editable: !0
        }), this.calAmount = "taxAmount"), c.push({
            name: "description",
            label: "备注",
            width: 150,
            title: !0,
            editable: !0
        });
        r.mod_PageConfig.gridReg("grid", c), c = r.mod_PageConfig.conf.grids.grid.colModel, $("#grid").jqGrid({
            data: t.entries,
            datatype: "clientSide",
            autowidth: !0,
            height: "100%",
            rownumbers: !0,
            gridview: !0,
            onselectrow: !1,
            colModel: c,
            cmTemplate: {sortable: !1, title: !1},
            shrinkToFit: !0,
            forceFit: !1,
            rowNum: 1e3,
            cellEdit: !1,
            cellsubmit: "clientArray",
            localReader: {root: "rows", records: "records", repeatitems: !1, id: "id"},
            jsonReader: {root: "data.entries", records: "records", repeatitems: !1, id: "id"},
            loadComplete: function (t) {
                if (THISPAGE.$_barCodeInsert = $("#barCodeInsert"), urlParam.id > 0) {
                    var e = t.rows, a = e.length, i = "";
                    r.newId = a + 1;
                    for (var o = {}, n = 0; n < a; n++) {
                        var s = n + 1, d = e[n];
                        if ($.isEmptyObject(e[n]))break;
                        i += i ? "," + s : s, o[d.invId] = s;
                        var l = $.extend(!0, {
                            id: d.invId,
                            number: d.invNumber,
                            name: d.invName,
                            prices: d.prices,
                            spec: d.invSpec,
                            unitId: d.unitId,
                            unitName: d.mainUnit,
                            invNumberMap: d.invNumberMap
                        }, d);
                        Business.cacheManage.getGoodsInfoByNumber(l.number, function (t) {
                            l.isSerNum = t.isSerNum, l.isWarranty = d.isWarranty = t.isWarranty, l.safeDays = d.safeDays = t.safeDays, l.invNumberMap = d.invNumberMap = t.invNumberMap, l.barCode = d.barCode = t.barCode, l.invSkus = t.invSkus, l.prices = t.prices, l.invNumberMap = t.invNumberMap, l.id = d.invId, $("#" + s).data("goodsInfo", l).data("storageInfo", {
                                id: d.locationId,
                                name: d.locationName
                            }).data("unitInfo", {unitId: d.unitId, name: d.mainUnit}).data("skuInfo", {
                                name: d.skuName,
                                id: d.skuId
                            }).data("prices", {id: d.prices}).data("invNumberMap", {id: d.invNumberMap})
                        })
                    }
                }
            },
            gridComplete: function () {
                setTimeout(function () {
                    Public.autoGrid($("#grid"))
                }, 10)
            },
            afterEditCell: function (t, e, a, i, o) {
                function n() {
                    var e = $("#" + t).data("goodsInfo");
                    if (e) {
                        var a = $("#grid").jqGrid("getRowData", t);
                        (e = $.extend(!0, {}, e)).skuName = a.skuName, e.mainUnit = a.mainUnit, e.unitId = a.unitId, e.qty = a.qty, e.price = a.price, e.salePrice = a.salePrice, e.customSetPrice = a.price, e.taxPrice = a.taxPrice, e.discountRate = a.discountRate, e.deduction = a.deduction, e.amount = a.amount, e.taxRate = a.taxRate, e.tax = a.tax, e.taxAmount = a.taxAmount, e.locationName = a.locationName, $("#" + t).data("goodsInfo", e)
                    }
                }

                if (THISPAGE.curID = t, "goods" === e && (n(), $("#" + i + "_goods", "#grid").val(a), THISPAGE.goodsCombo.selectByText(a)), "skuName" === e) {
                    n();
                    var s = $("#" + t).data("goodsInfo");
                    if (!s || !s.invSkus || !s.invSkus.length)return $("#grid").jqGrid("restoreCell", i, o), curCol = o + 1, $("#grid").jqGrid("nextCell", i, o + 1), void THISPAGE.skuCombo.loadData([]);
                    "string" == typeof s.invSkus && (s.invSkus = $.parseJSON(s.invSkus)), $("#" + i + "_skuName", "#grid").val(a), THISPAGE.skuCombo.loadData(s.invSkus || [], -1, !1), THISPAGE.skuCombo.selectByText(a)
                }
                if ("price" === e && $("#" + i + "_price", "#grid").val(a), "taxPrice" === e && $("#" + i + "_taxPrice", "#grid").val(a), "locationName" === e && ($("#" + i + "_locationName", "#grid").val(a), THISPAGE.storageCombo.selectByText(a)), "mainUnit" === e) {
                    $("#" + i + "_mainUnit", "#grid").val(a);
                    var r = $("#" + t).data("unitInfo") || {};
                    if (!r.unitId || "0" === r.unitId)return $("#grid").jqGrid("restoreCell", i, o), curCol = o + 1, void $("#grid").jqGrid("nextCell", i, o + 1);
                    THISPAGE.unitCombo.enable(), THISPAGE.unitCombo.loadData(function () {
                        for (var t = {}, e = 0; e < SYSTEM.unitInfo.length; e++) {
                            var a = SYSTEM.unitInfo[e], i = r.unitId;
                            r.unitId == a.id && (r = a), r.unitId = i;
                            var o = a.unitTypeId || e;
                            t[o] || (t[o] = []), t[o].push(a)
                        }
                        return r.unitTypeId ? t[r.unitTypeId] : [r]
                    }), THISPAGE.unitCombo.selectByText(a)
                }
            },
            formatCell: function (t, e, a, i, o) {
            },
            beforeSubmitCell: function (t, e, a, i, o) {
            },
            beforeSaveCell: function (t, e, a, i, o) {
                switch (e) {
                    case"goods":
                        if (!$("#" + t).data("goodsInfo") || THISPAGE.$_barCodeInsert && THISPAGE.$_barCodeInsert.hasClass("open")) {
                            var n, s = function (e) {
                                $("#" + t).data("goodsInfo", e).data("storageInfo", {
                                    id: e.locationId,
                                    name: e.locationName
                                }).data("unitInfo", {
                                    unitId: e.unitId,
                                    name: e.unitName
                                }), n = Business.formatGoodsName(e)
                            };
                            return THISPAGE.$_barCodeInsert.hasClass("open") ? Business.cacheManage.getGoodsInfoByBarCode($.trim(a), s, !0) : Business.cacheManage.getGoodsInfoByNumber(a, s, !0), n ? ($("#" + t).find(".btn_query_inventory").show(), n) : ($.dialog({
                                    width: 775,
                                    height: 510,
                                    title: "选择商品",
                                    content: "url:/settings/goods-batch.jsp",
                                    data: {
                                        skuMult: SYSTEM.enableAssistingProp, skey: a, callback: function (t, e, a) {
                                            "" === e && ($("#grid").jqGrid("addRowData", t, {}, "last"), r.newId = t + 1), setTimeout(function () {
                                                $("#grid").jqGrid("editCell", a, 2, !0)
                                            }, 10), r.calTotal()
                                        }
                                    },
                                    lock: !0,
                                    button: [{
                                        name: "选中",
                                        defClass: "ui_state_highlight fl",
                                        focus: !0,
                                        callback: function () {
                                            return this.content.callback && this.content.callback("purchase"), !1
                                        }
                                    }, {
                                        name: "选中并关闭", defClass: "ui_state_highlight", callback: function () {
                                            return this.content.callback("purchase"), this.close(), !1
                                        }
                                    }, {
                                        name: "关闭", callback: function () {
                                            return !0
                                        }
                                    }]
                                }), setTimeout(function () {
                                    $("#grid").jqGrid("editCell", curRow, 2, !0), $("#grid").jqGrid("setCell", curRow, 2, "")
                                }, 10), "&#160;")
                        }
                }
                return $("#" + t).find(".btn_query_inventory").show(), a
            },
            afterSaveCell: function (t, i, o, n, s) {
                switch (i) {
                    case"goods":
                        var d = $("#grid").jqGrid("getDataIDs"), l = Math.max.apply(null, d) + 1;
                        r.newId;
                        0 == $("#" + t).next().length && ($("#grid").jqGrid("addRowData", l, {}, "last"), r.newId = l + 1);
                        break;
                    case"skuName":
                        $("#" + t).data("goodsInfo").srcOrderNo && $("#grid").jqGrid("setRowData", t, {
                            srcOrderNo: "",
                            srcOrderId: "",
                            srcOrderEntryId: ""
                        });
                        break;
                    case"mainUnit":
                        var c = $(".unitAuto").getCombo().getValue(), u = r.$_customer.data("contactInfo"), m = u ? u.cLevel : 0, p = $("#" + t).data("goodsInfo"), h = $("#grid").jqGrid("getRowData", t);
                        if (p.prices)for (k = 0; k < p.prices.length; k++)if (p.prices[k].unitId == c) {
                            var b = [p.prices[k].salePrice, p.prices[k].retailPrice, p.prices[k].salePrice1, p.prices[k].salePrice, p.prices[k].salePrice], g = parseFloat(h.qty), f = b[m], v = parseFloat(h.discountRate), y = parseFloat(h.taxRate);
                            if (SYSTEM.invPriceIsTax && f > 0 && (f = Number(f / Number(1 + Number(y / 100)))), $.isNumeric(f))if ($.isNumeric(v))var _ = g * f - (D = g * f * v / 100), I = $("#grid").jqGrid("setRowData", t, {
                                unitId: c,
                                price: f,
                                deduction: D,
                                amount: _
                            }); else I = $("#grid").jqGrid("setRowData", t, {unitId: c, amount: g * f});
                            if ($.isNumeric(y))var P = f * (1 + y / 100), I = $("#grid").jqGrid("setRowData", t, {taxPrice: P});
                            e(t), I && THISPAGE.calTotal()
                        }
                        break;
                    case"qty":
                        var o = parseFloat(o) || 0, h = $("#grid").jqGrid("getRowData", t), f = parseFloat(h.price), v = parseFloat(h.discountRate), P = parseFloat(h.taxPrice), y = parseFloat(h.taxRate) || 0;
                        if (SYSTEM.invPriceIsTax)var _ = (N = (o * P * (1 - v / 100)).toFixed(2)) - (C = (N / (1 + y / 100) * y / 100).toFixed(2)), D = (o * P / (1 + y / 100) * v / 100).toFixed(2), I = $("#grid").jqGrid("setRowData", t, {
                            taxAmount: N,
                            tax: C,
                            amount: _,
                            price: f,
                            deduction: D
                        }); else {
                            if ($.isNumeric(f))if ($.isNumeric(v))var _ = o * f - (D = o * f * v / 100), x = (100 - o) / 10, I = $("#grid").jqGrid("setRowData", t, {
                                deduction: D,
                                amount: _,
                                goodsDiscountRate: x
                            }); else I = $("#grid").jqGrid("setRowData", t, {amount: o * f});
                            e(t)
                        }
                        I && THISPAGE.calTotal();
                        break;
                    case"price":
                        var o = parseFloat(o) || 0, h = $("#grid").jqGrid("getRowData", t), g = parseFloat(h.qty), y = parseFloat(h.taxRate) || 0, v = parseFloat(h.discountRate), D = parseFloat(h.deduction);
                        v ? D = Number(o).mul(Number(g)).mul(Number(v)).div(100) : v = Business.disRateFormat(Number(D).div(Number(g).mul(o)).mul(100));
                        var _ = Number(o).mul(Number(g)).subtr(Number(D)), C = Number(_).mul(Number(y)).div(100), N = Number(_).add(Number(C)), P = Number(o).mul(1..add(Number(y).div(100)));
                        (I = $("#grid").jqGrid("setRowData", t, {
                            tax: C,
                            taxAmount: N,
                            taxPrice: P,
                            deduction: D,
                            amount: _,
                            discountRate: v
                        })) && THISPAGE.calTotal();
                        break;
                    case"taxPrice":
                        var o = parseFloat(o) || 0, h = $("#grid").jqGrid("getRowData", t), y = parseFloat(h.taxRate), g = parseFloat(h.qty), v = parseFloat(h.discountRate) || 0, D = parseFloat(h.deduction), x = parseFloat(h.goodsDiscountRate), f = ((_ = (N = Math.round(o * g * (1 - v / 100) * 100) / 100) - (C = Number(N / (1 + y / 100) * y / 100))) / g / (1 - v / 100) * 100 / 100).toFixed(10);
                        v ? (D = f * g * v / 100, x = (100 - v) / 10) : v = Business.disRateFormat(Number(D).div(Number(g).mul(Number(f))).mul(100)), (I = $("#grid").jqGrid("setRowData", t, {
                            tax: C,
                            taxAmount: N,
                            price: f,
                            deduction: D,
                            amount: _,
                            discountRate: v,
                            goodsDiscountRate: x
                        })) && THISPAGE.calTotal();
                        break;
                    case"discountRate":
                        var o = parseFloat(o) || 0, h = $("#grid").jqGrid("getRowData", t), y = parseFloat(h.taxRate), g = parseFloat(h.qty), f = parseFloat(h.price), P = parseFloat(h.taxPrice);
                        if (SYSTEM.invPriceIsTax)var _ = (N = (g * P * (1 - o / 100)).toFixed(2)) - (C = (N / (1 + y / 100) * y / 100).toFixed(2)), D = (g * P / (1 + y / 100) * o / 100).toFixed(2), I = $("#grid").jqGrid("setRowData", t, {
                            taxAmount: N,
                            tax: C,
                            amount: _,
                            price: f,
                            deduction: D
                        }); else {
                            if ($.isNumeric(g) && $.isNumeric(f))var x = (100 - o) / 10, _ = (T = g * f) - (D = T * o / 100);
                            var C = _ * y / 100, N = Number(a(_)) + Number(a(C))
                        }
                        (I = $("#grid").jqGrid("setRowData", t, {
                            tax: C,
                            taxAmount: N,
                            taxPrice: P,
                            deduction: D,
                            amount: _,
                            goodsDiscountRate: x
                        })) && THISPAGE.calTotal();
                        break;
                    case"goodsDiscountRate":
                        var o = parseFloat(o) || 0, h = $("#grid").jqGrid("getRowData", t), g = parseFloat(h.qty), f = parseFloat(h.price), x = parseFloat(h.goodsDiscountRate);
                        if ($.isNumeric(g) && $.isNumeric(f))var x = (100 - (v = 100 - 10 * o)) / 10, _ = (T = g * f) - (D = T * v / 100), I = $("#grid").jqGrid("setRowData", t, {
                            deduction: D,
                            amount: _,
                            discountRate: v
                        });
                        e(t), I && THISPAGE.calTotal();
                        break;
                    case"deduction":
                        var o = parseFloat(o) || 0, h = $("#grid").jqGrid("getRowData", t), g = parseFloat(h.qty), y = parseFloat(h.taxRate), P = parseFloat(h.taxPrice), f = parseFloat(h.price);
                        if (SYSTEM.invPriceIsTax)var v = Number(o).div(Number(Number(g).mul(Number(P))).div(Number(1..add(Number(y).div(100))))).mul(100), f = ((_ = (N = (g * P * (1 - (v = Business.disRateFormat(v)) / 100)).toFixed(amountPlaces)) - (C = (parseFloat(N / (1 + y / 100)) * y / 100).toFixed(amountPlaces))) / (g * (1 - v / 100))).toFixed(amountPlaces); else {
                            if ($.isNumeric(g) && $.isNumeric(f))var T = Number(g).mul(Number(f)), _ = T > 0 ? Number(T).subtr(Number(o)) : 0, v = T ? Number(o).mul(100).div(T) : 0, x = (100 - (v = Business.disRateFormat(v))) / 10;
                            var C = _ * y / 100, P = (N = Number(a(_)) + Number(a(C))) / g / (1 - v / 100);
                            N / g == 0 && 1 - v / 100 == 0 && (P = (o * (1 + y / 100) / g).toFixed(2))
                        }
                        (I = $("#grid").jqGrid("setRowData", t, {
                            tax: C,
                            taxAmount: N,
                            taxPrice: P,
                            amount: _,
                            discountRate: v,
                            goodsDiscountRate: x
                        })) && THISPAGE.calTotal();
                        break;
                    case"amount":
                        var o = parseFloat(o) || 0, h = $("#grid").jqGrid("getRowData", t), y = parseFloat(h.taxRate), g = parseFloat(h.qty), v = parseFloat(h.discountRate) || 0, D = parseFloat(h.deduction), x = parseFloat(h.goodsDiscountRate), S = 100;
                        if (SYSTEM.pricePlaces > 2)for (k = 0; k < SYSTEM.pricePlaces - 2; k++)S *= 10;
                        var C = o * y / 100, N = Math.round(100 * (o + C)) / 100, f = Math.round(o / g / (1 - v / 100) * S) / S, P = Math.round(N / g / (1 - v / 100) * S) / S;
                        if (v) {
                            D = f * g * v / 100;
                            x = (100 - v) / 10
                        } else v = D / (g * f) * 100;
                        (I = $("#grid").jqGrid("setRowData", t, {
                            tax: C,
                            taxAmount: N,
                            taxPrice: P,
                            deduction: D,
                            price: f,
                            discountRate: v,
                            goodsDiscountRate: x
                        })) && THISPAGE.calTotal();
                        break;
                    case"taxRate":
                        var A = o, o = parseFloat(o) || 0, h = $("#grid").jqGrid("getRowData", t), _ = parseFloat(h.amount), f = parseFloat(h.price);
                        if ($.isNumeric(o)) {
                            N = _ + (C = _ * o / 100);
                            (I = $("#grid").jqGrid("setRowData", t, {tax: C, taxAmount: N})) && THISPAGE.calTotal()
                        }
                        if ("" === A && (I = $("#grid").jqGrid("setRowData", t, {
                                tax: "",
                                taxAmount: _
                            })) && THISPAGE.calTotal(), $.isNumeric(f)) {
                            P = f * (1 + o / 100);
                            (I = $("#grid").jqGrid("setRowData", t, {taxPrice: P})) && THISPAGE.calTotal()
                        }
                        break;
                    case"tax":
                        var o = parseFloat(o) || 0, h = $("#grid").jqGrid("getRowData", t);
                        if ($.isNumeric(o)) {
                            N = (_ = parseFloat(h.amount)) + o;
                            (I = $("#grid").jqGrid("setRowData", t, {taxAmount: N})) && THISPAGE.calTotal()
                        }
                        break;
                    case"taxAmount":
                        var o = parseFloat(o) || 0, h = $("#grid").jqGrid("getRowData", t), y = parseFloat(h.taxRate), g = parseFloat(h.qty), v = parseFloat(h.discountRate) || 0, D = parseFloat(h.deduction), x = parseFloat(h.goodsDiscountRate), S = 100;
                        if (SYSTEM.pricePlaces > 2)for (var k = 0; k < SYSTEM.pricePlaces - 2; k++)S *= 10;
                        var C = Math.round(o / (1 + y / 100) * y / 100 * 100) / 100, _ = Math.round(100 * (o - C)) / 100, P = Math.round(o / g / (1 - v / 100) * S) / S, f = Math.round(_ / g / (1 - v / 100) * S) / S;
                        if (v) {
                            D = f * g * v / 100;
                            x = (100 - v) / 10
                        } else v = D / (g * f) * 100;
                        (I = $("#grid").jqGrid("setRowData", t, {
                            tax: C,
                            amount: _,
                            taxPrice: P,
                            deduction: D,
                            price: f,
                            discountRate: v,
                            goodsDiscountRate: x
                        })) && THISPAGE.calTotal()
                }
            },
            loadonce: !0,
            resizeStop: function (t, e) {
                r.mod_PageConfig.setGridWidthByIndex(t, e, "grid")
            },
            footerrow: !0,
            userData: {
                goods: "合计：",
                qty: t.totalQty,
                deduction: t.totalDiscount,
                amount: t.totalAmount,
                tax: t.totalTax,
                taxAmount: t.totalTaxAmount
            },
            userDataOnFooter: !0,
            loadError: function (t, e, a) {
                Public.tips({type: 1, content: "Type: " + e + "; Response: " + t.status + " " + t.statusText})
            }
        })
    }, setSaleByContact: function (t) {
        var e = this;
        e.salesCombo && Public.ajaxGet("/scm/invSo.do?action=findNearSoEmp", {buid: t.id}, function (t) {
            t.data && e.salesCombo.selectByValue(t.data.empId)
        })
    }, goodsEdittypeInit: function () {
        0 != $("#grid")[0].p.savedRow.length && $("#grid").jqGrid("saveCell", $("#grid")[0].p.savedRow[0].id, $("#grid")[0].p.savedRow[0].ic), THISPAGE.$_barCodeInsert.hasClass("open") ? $("#grid").jqGrid("setColProp", "goods", {
                edittype: "text",
                editoptions: null
            }) : $("#grid").jqGrid("setColProp", "goods", {
                edittype: "custom",
                editoptions: {
                    custom_element: function (t, e) {
                        return $(".goodsAuto")[0]
                    }, custom_value: function (t, e, a) {
                        if ("get" === e)return "" !== $(".goodsAuto").getCombo().getValue() ? $(t).val() : ($(t).parents("tr").removeData("goodsInfo"), "");
                        "set" === e && $("input", t).val(a)
                    }, handle: function () {
                        $("#initCombo").append($(".goodsAuto").val("").unbind("focus.once"))
                    }, trigger: "ui-icon-ellipsis sales"
                }
            })
    }, reloadData: function (t) {
        $("#grid").clearGridData();
        var e = this;
        originalData = t;
        var a = 8 - t.entries.length;
        if (a > 0)for (var i = 0; i < a; i++)t.entries.push({});
        $("#grid").jqGrid("setGridParam", {
            data: t.entries,
            userData: {
                qty: t.totalQty,
                deduction: t.totalDiscount,
                amount: t.totalAmount,
                tax: t.totalTax,
                taxAmount: t.totalTaxAmount
            }
        }).trigger("reloadGrid"), e.$_customer.data("contactInfo", {
            id: t.buId,
            name: t.contactName
        }), e.customerCombo.input.val(t.contactName), e.salesCombo.selectByValue(t.salesId, !1), e.$_date.val(t.date), e.$_deliveryDate.val(t.deliveryDate), e.$_number.text(t.billNo), 150601 == t.transType ? e.classBox.setValue(0) : e.classBox.setValue(1), e.$_note.val(t.description), e.$_discountRate.val(t.disRate), e.$_deduction.val(t.disAmount), e.$_discount.val(t.amount), e.$_payment.val(t.rpAmount), e.accountCombo.selectByValue(t.accId, !1), e.$_accountInfo.data("accountInfo", t.accounts), -1 === t.accId ? e.$_accountInfo.show() : e.$_accountInfo.hide(), e.$_arrears.val(t.arrears), e.$_totalArrears.val(t.totalArrears), e.$_userName.html(t.userName), e.$_modifyTime.html(t.modifyTime), e.$_modifyName.html(t.modifyName), e.$_createTime.html(t.createTime), e.$_checkName.html(t.checkName), e.$_checkTime.html(t.checkTime), "edit" === t.status ? this.editable || (e.enableEdit(), $("#groupBtn").html(e.btn_edit + e.btn_audit), $("#mark").removeClass("has-audit")) : this.editable && (e.disableEdit(), $("#groupBtn").html(e.btn_turn + e.btn_view + e.btn_reaudit), $("#mark").addClass("has-audit"))
    }, initCombo: function () {
        var t = this;
        this.goodsCombo = Business.billGoodsCombo($(".goodsAuto"), {
            disSerNum: !0,
            userData: {billType: "sales"}
        }), this.skuCombo = Business.billskuCombo($(".skuAuto"), {data: []}), this.storageCombo = Business.billStorageCombo($(".storageAuto")), this.unitCombo = Business.unitCombo($(".unitAuto"), {
            defaultSelected: -1,
            forceSelection: !1
        }), this.priceCombo = $(".priceAuto").combo({
            data: function () {
                if (!this.input)return [];
                var t = $("#customer").data("contactInfo");
                if (!t)return [];
                var e = this.input.closest("tr").data("goodsInfo");
                if (!e)return [];
                var a = $("#customer").data("priceList")[e.id];
                if (!a || !a.prices)return [];
                if (t.id <= 0)return [];
                var i = [];
                if (a.prices.levelPrice) {
                    var o = "";
                    t.cLevel < 3 ? o = ["零售", "批发", "VIP"][t.cLevel] + "价：" + a.prices.levelPrice : a.prices.discountRate && (o = ["折扣一", "折扣二"][t.cLevel - 3] + "价：" + a.prices.levelPrice * a.prices.discountRate / 100), o && i.push({
                        name: o,
                        id: 1
                    })
                }
                return a.prices.nearPrice && i.push({name: "最近售价：" + a.prices.nearPrice, id: 2}), i
            },
            text: "name",
            value: "id",
            defaultSelected: 0,
            cache: !1,
            editable: !0,
            trigger: !1,
            defaultFlag: !1,
            forceSelection: !1,
            listWidth: 140,
            callback: {
                onChange: function (t) {
                }, onFocus: function () {
                    var e = $(".priceAuto ").siblings(".ui-icon-triangle-1-s").hide(), a = this.input.closest("tr").data("goodsInfo");
                    if (a) {
                        var i = t.$_customer.data("contactInfo"), o = t.$_customer.data("priceList");
                        if (o || (o = {}, t.$_customer.data("priceList", o)), i && "" !== $.trim(t.$_customer.find("input").val())) {
                            var n = function () {
                                var t = {cId: i.id};
                                o[a.id] = t, Public.ajaxPost("/basedata/inventory.do?action=listBySelected", {
                                    type: "so",
                                    ids: a.id,
                                    contactId: i.id
                                }, function (a) {
                                    if (200 === a.status && a.data && a.data.result) {
                                        for (var i = a.data.result, o = 0, n = i.length; o < n; o++) {
                                            var s = i[o];
                                            s.nearPrice && (t.prices = {}, t.prices.nearPrice = s.nearPrice), s.salePrice && (t.prices = t.prices || {}, t.prices.levelPrice = s.salePrice, t.prices.discountRate = s.discountRate)
                                        }
                                        t.prices && e.show()
                                    }
                                })
                            };
                            if (o[a.id]) {
                                var s = o[a.id];
                                s.cId != i.id ? n() : s.prices && e.show()
                            } else n()
                        }
                    }
                }
            }
        }).getCombo()
    }, disableEdit: function () {
        this.customerCombo.disable(), this.salesCombo.disable(), this.$_date.attr("disabled", "disabled").addClass("ui-input-dis"), this.$_deliveryDate.attr("disabled", "disabled").addClass("ui-input-dis"), this.$_note.attr("disabled", "disabled").addClass("ui-input-dis"), this.$_discountRate.attr("disabled", "disabled").addClass("ui-input-dis"), this.$_deduction.attr("disabled", "disabled").addClass("ui-input-dis"), this.$_payment.attr("disabled", "disabled").addClass("ui-input-dis"), this.accountCombo.disable(), $("#grid").jqGrid("setGridParam", {cellEdit: !1}), this.editable = !1
    }, enableEdit: function () {
        disEditable || (this.salesCombo.enable(), this.customerCombo.enable(), this.$_date.removeAttr("disabled").removeClass("ui-input-dis"), this.$_deliveryDate.removeAttr("disabled").removeClass("ui-input-dis"), this.$_note.removeAttr("disabled").removeClass("ui-input-dis"), this.$_discountRate.removeAttr("disabled").removeClass("ui-input-dis"), this.$_deduction.removeAttr("disabled").removeClass("ui-input-dis"), this.$_payment.removeAttr("disabled").removeClass("ui-input-dis"), this.accountCombo.enable(), $("#grid").jqGrid("setGridParam", {cellEdit: !0}), this.editable = !0)
    }, triggerEdit: function () {
        var t = !0;
        originalData.id > 0 && originalData.checked && (t = !1), "edit" == originalData.status && (t = Business.verifyRight("SO_UPDATE", !0)), t ? this.enableEdit() : this.disableEdit()
    }, chooseAccount: function (t) {
        var e = this;
        e.$_accountInfo.show(), e.$_payment.attr("disabled", "disabled").addClass("ui-input-dis"), $.dialog({
            width: 670,
            height: 250,
            title: "多账户结算",
            content: "url:/settings/choose-account.jsp",
            data: {accountInfo: t, type: "purchase"},
            lock: !0,
            ok: function () {
                var t = this.content.callback();
                if (!t)return !1;
                e.$_payment.val(t.payment).trigger("keyup"), e.$_accountInfo.data("accountInfo", t.accounts), e.accountCombo.blur()
            },
            cancel: !0
        })
    }, addEvent: function () {
        function t() {
            for (var t = $("#grid tr.edited"), e = 0, a = t.length; e < a; e++) {
                var i = $.trim(t.eq(e).find("td.goods").text()), o = t.eq(e).attr("id");
                if ("" == i || "undefined undefined" == i)return parent.Public.tips({
                    type: 1,
                    content: "单据中商品列不能为空！"
                }), $("#grid").jqGrid("editCellByColName", o, "goods"), !1
            }
            return !0
        }

        var e = this;
        this.customerCombo.input.enterKey(), this.$_date.bind("keydown", function (t) {
            13 === t.which && e.$_deliveryDate.trigger("focus").select()
        }).bind("focus", function (t) {
            e.dateValue = $(this).val()
        }).bind("blur", function (t) {
            /((^((1[8-9]\d{2})|([2-9]\d{3}))(-)(10|12|0?[13578])(-)(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(-)(11|0?[469])(-)(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(-)(0?2)(-)(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)(-)(0?2)(-)(29)$)|(^([3579][26]00)(-)(0?2)(-)(29)$)|(^([1][89][0][48])(-)(0?2)(-)(29)$)|(^([2-9][0-9][0][48])(-)(0?2)(-)(29)$)|(^([1][89][2468][048])(-)(0?2)(-)(29)$)|(^([2-9][0-9][2468][048])(-)(0?2)(-)(29)$)|(^([1][89][13579][26])(-)(0?2)(-)(29)$)|(^([2-9][0-9][13579][26])(-)(0?2)(-)(29)$))/.test($(this).val()) || (parent.Public.tips({
                type: 2,
                content: "日期格式有误！如：2012-08-08。"
            }), $(this).val(e.dateValue))
        }), this.$_deliveryDate.bind("keydown", function (t) {
            13 === t.which && $("#grid").jqGrid("editCell", 1, 2, !0)
        }).bind("focus", function (t) {
            e.dateValue = $(this).val()
        }).bind("blur", function (t) {
            /((^((1[8-9]\d{2})|([2-9]\d{3}))(-)(10|12|0?[13578])(-)(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(-)(11|0?[469])(-)(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(-)(0?2)(-)(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)(-)(0?2)(-)(29)$)|(^([3579][26]00)(-)(0?2)(-)(29)$)|(^([1][89][0][48])(-)(0?2)(-)(29)$)|(^([2-9][0-9][0][48])(-)(0?2)(-)(29)$)|(^([1][89][2468][048])(-)(0?2)(-)(29)$)|(^([2-9][0-9][2468][048])(-)(0?2)(-)(29)$)|(^([1][89][13579][26])(-)(0?2)(-)(29)$)|(^([2-9][0-9][13579][26])(-)(0?2)(-)(29)$))/.test($(this).val()) || (parent.Public.tips({
                type: 2,
                content: "日期格式有误！如：2012-08-08。"
            }), $(this).val(e.dateValue))
        }), this.$_note.enterKey(), this.$_discount.enterKey(), this.$_discountRate.enterKey(), $(".grid-wrap").on("click", ".ui-icon-triangle-1-s", function (t) {
            var e = $(this).siblings().getCombo();
            setTimeout(function () {
                e.active = !0, e.doQuery()
            }, 10)
        }), Business.billsEvent(e, "sales"), Business.coderRuleEvent(e, "SO", e.$_date.val()), this.$_deduction.keyup(function () {
            var t = Number($(this).val()), a = Number($("#grid").jqGrid("footerData", "get")[e.calAmount].replace(/,/g, "")), i = (a - t).toFixed(amountPlaces);
            if (a) {
                var o = t / a * 100, n = i - Number($.trim(e.$_payment.val()));
                THISPAGE.$_discountRate.val(o.toFixed(amountPlaces)), THISPAGE.$_discount.val(i), THISPAGE.$_arrears.val(n)
            }
        }).on("keypress", function (t) {
            Public.numerical(t)
        }).on("click", function () {
            this.select()
        }), this.$_discountRate.keyup(function () {
            var t = Number($(this).val()), a = Number($("#grid").jqGrid("footerData", "get")[e.calAmount].replace(/,/g, "")), i = (a * (t / 100)).toFixed(amountPlaces), o = (a - i).toFixed(amountPlaces), n = o - Number($.trim(e.$_payment.val()));
            THISPAGE.$_deduction.val(i), THISPAGE.$_discount.val(o), THISPAGE.$_arrears.val(n)
        }).on("keypress", function (t) {
            Public.numerical(t)
        }).on("click", function () {
            this.select()
        }).blur(function (t) {
            $(this).val() < 0 && (defaultPage.Public.tips(_defineProperty({content: 2}, "content", "优惠率不能为负数！")), $(this).focus())
        }), this.$_payment.keyup(function () {
            var t = $(this).val() || 0, a = e.$_discount.val(), i = Number(parseFloat(a) - parseFloat(t)), o = Number(i + THISPAGE.customerArrears);
            THISPAGE.$_arrears.val(i.toFixed(amountPlaces)), THISPAGE.$_totalArrears.val(o.toFixed(amountPlaces));
            var n = e.$_accountInfo.data("accountInfo");
            n && 1 === n.length && (n[0].payment = t)
        }).on("keypress", function (t) {
            Public.numerical(t)
        }).on("click", function () {
            this.select()
        }), $(".wrapper").on("click", "#save", function (a) {
            if (a.preventDefault(), Business.verifyRight("SO_ADD")) {
                if (!t())return !1;
                var i = $(this);
                setTimeout(function () {
                    function t() {
                        i.ajaxPost("/scm/invSo.do?action=add", {postData: JSON.stringify(a)}, function (t) {
                            if (200 === t.status) {
                                e.$_modifyTime.html((new Date).format("yyyy-MM-dd hh:mm:ss")).parent().show(), e.$_modifyName.html(system.realName).parent().show(), e.$_createTime.html((new Date).format("yyyy-MM-dd hh:mm:ss")).parent().show(), originalData.id = t.data.id, THISPAGE.copyflag = null;
                                var a = e.btn_edit;
                                a += billRequiredCheck ? e.btn_audit : e.btn_audit + e.btn_close, e.$_toolBottom.html('<span id="groupBtn">' + a + "</span>"), parent.Public.tips({content: "保存成功！"}), $("#editBills").css("display", "none"), Business.clearDirtyCell($("#grid")), e.triggerEdit()
                            } else parent.Public.tips({type: 1, content: t.msg})
                        })
                    }

                    var a = THISPAGE.getPostData();
                    if (a) {
                        "edit" === originalData.stata && (a.id = originalData.id, a.stata = "edit"), THISPAGE.copyflag && (a.copyflag = THISPAGE.copyflag);
                        var o = (o = a.date).replace(/-/g, "/");
                        (o = new Date(o + " 00:00:00").getTime()) > system.curDate ? $.dialog.confirm("单据日期大于本日，确定保存？", function () {
                                t()
                            }) : t()
                    }
                }, 300)
            }
        }), $(".wrapper").on("click", "#savaAndAdd", function (a) {
            if (a.preventDefault(), !t())return !1;
            var i = $(this);
            setTimeout(function () {
                function t() {
                    i.ajaxPost("/scm/invSo.do?action=addNew", {postData: JSON.stringify(a)}, function (t) {
                        if (200 === t.status) {
                            e.$_number.text(t.data.billNo), $("#grid").clearGridData(), $("#grid").clearGridData(!0);
                            for (var a = 1; a <= 5; a++)$("#grid").jqGrid("addRowData", a, {});
                            e.newId = 6, e.$_note.val(""), e.$_discountRate.val(originalData.disRate), e.$_deduction.val(originalData.disAmount), e.$_discount.val(originalData.amount), e.$_payment.val(originalData.rpAmount), e.$_arrears.val(originalData.arrears), e.accountCombo.selectByValue(0, !0), parent.Public.tips({content: "保存成功！"}), originalData.status = "add"
                        } else parent.Public.tips({type: 1, content: t.msg})
                    })
                }

                var a = THISPAGE.getPostData();
                if (a) {
                    var o = (o = a.date).replace(/-/g, "/");
                    (o = new Date(o + " 00:00:00").getTime()) > system.curDate ? $.dialog.confirm("单据日期大于本日，确定保存？", function () {
                            t()
                        }) : t()
                }
            }, 300)
        }), $(".wrapper").on("click", "#copy", function (t) {
            if (t.preventDefault(), Business.verifyRight("SO_ADD")) {
                var a = $(this);
                e.$_date = $("#date").val(system.endDate), e.$_deliveryDate = $("#deliveryDate").val(system.endDate);
                var i = THISPAGE.getPostData().date;
                a.ajaxPost("/basedata/systemProfile.do?action=generateDocNo", {
                    billType: "SO",
                    billDate: i
                }, function (t) {
                    if (200 === t.status) {
                        originalData.id = -1, THISPAGE.copyflag = 1, e.$_number.text(t.data.billNo), $("#mark").removeClass(), e.$_checkName.html(""), e.$_checkTime.html(""), e.enableEdit(), $("#groupBtn").html(e.btn_edit + e.btn_audit), e.accountCombo.selectByValue(0, !0), e.$_modifyTime.html((new Date).format("yyyy-MM-dd hh:mm:ss")).parent().hide(), e.$_modifyName.html(system.realName).parent().hide(), e.$_createTime.html((new Date).format("yyyy-MM-dd hh:mm:ss")).parent().hide(), parent.Public.tips({content: "复制数据成功,并生成新的单据！"}), originalData.status = "add", $("#editBills").css("display", "inline-block");
                        var a = e.btn_add;
                        billRequiredCheck && (a += e.btn_audit), e.$_toolBottom.html('<span id="groupBtn">' + a + "</span>")
                    } else parent.Public.tips({type: 1, content: t.msg})
                })
            }
        }), $(".wrapper").on("click", "#edit", function (a) {
            function i() {
                o.ajaxPost("/scm/invSo.do?action=updateInvSo", {postData: JSON.stringify(n)}, function (t) {
                    200 === t.status ? (e.$_modifyTime.html((new Date).format("yyyy-MM-dd hh:mm:ss")).parent().show(), e.$_modifyName.html(system.realName).parent().show(), originalData.id = t.data.id, parent.Public.tips({content: "修改成功！"}), Business.clearDirtyCell($("#grid")), originalData.status = "edit") : parent.Public.tips({
                            type: 1,
                            content: t.msg
                        })
                })
            }

            if (a.preventDefault(), Business.verifyRight("SO_UPDATE")) {
                if (!t())return !1;
                var o = $(this), n = THISPAGE.getPostData();
                if (n) {
                    var s = (s = n.date).replace(/-/g, "/");
                    (s = new Date(s + " 00:00:00").getTime()) > system.curDate ? $.dialog.confirm("单据日期大于本日，确定保存？", function () {
                            i()
                        }) : i()
                }
            }
        }), $(".wrapper").on("click", "#audit", function (t) {
            if (t.preventDefault(), Business.verifyRight("SO_CHECK")) {
                var a = $(this);
                setTimeout(function () {
                    function t() {
                        a.ajaxPost("/scm/invSo.do?action=checkInvSo", {postData: JSON.stringify(i)}, function (t) {
                            200 === t.status ? (originalData.checked = 1, originalData.id = t.data.id, $("#mark").addClass("has-audit"), e.$_checkName.html(SYSTEM.realName).parent().show(), e.$_checkTime.html((new Date).format("yyyy-MM-dd hh:mm:ss")).parent().show(), e.disableEdit(), $("#groupBtn").html(e.btn_turn + e.btn_view + e.btn_reaudit + e.btn_close), "150602" == e.classBox.getValue() ? $("#turn").html("生成退货单") : $("#turn").html("生成销货单"), parent.Public.tips({content: "审核成功！"}), $("#editBills").css("display", "none"), Business.clearDirtyCell($("#grid")), originalData.status = "edit") : (e.$_checkTime.parent().hide(), e.$_checkName.parent().hide(), parent.Public.tips({
                                    type: 1,
                                    content: t.msg
                                }))
                        })
                    }

                    var i = THISPAGE.getPostData();
                    if (i) {
                        var o = (o = i.date).replace(/-/g, "/");
                        (o = new Date(o + " 00:00:00").getTime()) > system.curDate && "edit" !== originalData.status ? $.dialog.confirm("单据日期大于本日，确定保存？", function () {
                                t()
                            }) : t()
                    }
                }, 300)
            }
        }), $(".wrapper").on("click", "#reAudit", function (t) {
            t.preventDefault(), Business.verifyRight("SO_UNCHECK") && $(this).ajaxPost("/scm/invSo.do?action=rsBatchCheckInvSo", {id: originalData.id}, function (t) {
                200 === t.status && 0 != t.data.failArr.length ? Public.antiCheck(t.data, "销货订单") : 200 === t.status ? (originalData.checked = 0, $("#mark").removeClass(), e.$_checkName.html(""), e.$_checkTime.html(""), e.$_checkName.parent().hide(), e.$_checkTime.parent().hide(), $("#groupBtn").html(e.btn_edit + e.btn_audit), parent.Public.tips({content: "反审核成功！"}), e.triggerEdit()) : parent.Public.tips({
                            type: 1,
                            content: t.msg
                        })
            })
        }), $(".wrapper").on("click", "#close", function (t) {
            if (t.preventDefault(), Business.verifyRight("SO_CLOSE")) {
                var a = $(this);
                THISPAGE.getPostData() && a.ajaxPost("/scm/invSo.do?action=batchClose", {id: originalData.id}, function (t) {
                    200 === t.status && t.msg && t.msg.length ? 1 == t.msg[0].isSuccess ? ($("#mark").addClass("has-closed"), e.disableEdit(), $("#groupBtn").html(e.btn_view + e.btn_open), "150602" == e.classBox.getValue() ? $("#turn").html("生成退货单") : $("#turn").html("生成销货单"), parent.Public.tips({content: "关闭成功！"})) : parent.Public.tips({
                                type: 1,
                                content: "关闭失败：" + t.msg[0].msg || ""
                            }) : parent.Public.tips({type: 1, content: t.msg})
                })
            }
        }), $(".wrapper").on("click", "#open", function (t) {
            t.preventDefault(), Business.verifyRight("SO_UNCLOSE") && $(this).ajaxPost("/scm/invSo.do?action=rebatchClose", {id: originalData.id}, function (t) {
                200 === t.status && t.msg && t.msg.length ? 1 == t.msg[0].isSuccess ? ($("#mark").removeClass("has-closed"), e.enableEdit(), $("#groupBtn").html((billRequiredCheck ? e.btn_turn : "") + e.btn_edit + (billRequiredCheck ? e.btn_reaudit : e.btn_audit) + e.btn_close), "150602" == e.classBox.getValue() ? $("#turn").html("生成退货单") : $("#turn").html("生成销货单"), parent.Public.tips({content: "开启成功！"})) : parent.Public.tips({
                            type: 1,
                            content: "开启失败：" + t.msg[0].msg || ""
                        }) : parent.Public.tips({type: 1, content: t.msg})
            })
        }), $(".wrapper").on("click", "#add", function (t) {
            t.preventDefault(), Business.verifyRight("SO_ADD") && parent.tab.overrideSelectedTabItem({
                tabid: "sales-salesOrder",
                text: "销售订单",
                url: "/scm/invSo.do?action=initSo"
            })
        }), $(".wrapper").on("click", "#print", function (t) {
            t.preventDefault(), Business.verifyRight("SO_PRINT") && Public.print({
                title: "销货订单列表",
                $grid: $("#grid"),
                pdf: "/scm/invSo.do?action=toPdf",
                billType: 10303,
                filterConditions: {id: originalData.id}
            })
        }), this.$_accountInfo.click(function () {
            var t = $(this).data("accountInfo");
            e.chooseAccount(t)
        }), $(".wrapper").on("click", "#turn", function (t) {
            if (t.preventDefault(), Business.verifyRight("SA_ADD")) {
                var a = !0;
                if ($.ajax({
                        async: !1,
                        url: "../scm/invSa.do?action=queryOrderALlNum",
                        data: {id: originalData.id, transtype: e.classBox.getValue()},
                        dataType: "JSON",
                        type: "post",
                        success: function (t) {
                            t.data.num || (parent.Public.tips({type: 1, content: "该订单已全部生成销货单！"}), a = !1)
                        },
                        error: function (t) {
                        }
                    }), a && ($.ajax({
                        async: !1,
                        url: "../scm/invSa.do?action=getBillState",
                        data: {id: originalData.id, transtype: e.classBox.getValue()},
                        dataType: "JSON",
                        type: "post",
                        success: function (t) {
                            "2" == t.data.state && (parent.Public.tips({type: 1, content: "该订单已全部入库，不能生成销货单！"}), a = !1)
                        },
                        error: function (t) {
                        }
                    }), a))if ($(this).hasClass("ui-btn-dis")) parent.Public.tips({
                    type: 1,
                    content: "该订单已全部入库，不能生成销货单！"
                }); else {
                    var i = "销货单", o = "sales-sales", n = e.classBox.getValue();
                    if ("150602" == n)var i = "销货退货单", o = "sales-salesBack";
                    parent.tab.addTabItem({
                        tabid: o,
                        text: i,
                        url: "/scm/invSa.do?action=initSale&id=" + originalData.id + "&flag=list&turn&transType=" + n
                    }), parent.tab.reload(o)
                }
            }
        }), $("#prev").click(function (t) {
            if (t.preventDefault(), $(this).hasClass("ui-btn-prev-dis"))return parent.Public.tips({
                type: 2,
                content: "已经没有上一张了！"
            }), !1;
            e.idPostion = e.idPostion - 1, 0 === e.idPostion && $(this).addClass("ui-btn-prev-dis"), loading = $.dialog.loading("数据加载中...", 1e3, "loading.gif", !0), Public.ajaxGet("/scm/invSo.do?action=update", {id: e.idList[e.idPostion]}, function (t) {
                THISPAGE.reloadData(t.data), $("#next").removeClass("ui-btn-next-dis"), loading && loading.close()
            })
        }), $("#next").click(function (t) {
            if (t.preventDefault(), $(this).hasClass("ui-btn-next-dis"))return parent.Public.tips({
                type: 2,
                content: "已经没有下一张了！"
            }), !1;
            e.idPostion = e.idPostion + 1, e.idLength === e.idPostion + 1 && $(this).addClass("ui-btn-next-dis"), loading = $.dialog.loading("数据加载中...", 1e3, "loading.gif", !0), Public.ajaxGet("/scm/invSo.do?action=update", {id: e.idList[e.idPostion]}, function (t) {
                THISPAGE.reloadData(t.data), $("#prev").removeClass("ui-btn-prev-dis"), loading && loading.close()
            })
        }), THISPAGE.$_barCodeInsert.click(function (t) {
            var a = 1;
            THISPAGE.$_barCodeInsert.hasClass("open") ? (THISPAGE.$_barCodeInsert.addClass("close"), THISPAGE.$_barCodeInsert.removeClass("open"), a = null) : (THISPAGE.$_barCodeInsert.removeClass("close"), THISPAGE.$_barCodeInsert.addClass("open")), e.goodsEdittypeInit(), $.cookie("BarCodeInsert", a)
        }), $("#operaLog").powerFloat({
            eventType: "hover", hoverHold: !1, reverseSharp: !0, target: function () {
                return $("#operaLogBox")
            }
        }), $("#config").show().click(function (t) {
            e.mod_PageConfig.config()
        }), $(window).resize(function (t) {
            Public.autoGrid($("#grid"))
        })
    }, resetData: function () {
        var t = this;
        $("#grid").clearGridData();
        for (var e = 1; e <= 8; e++)$("#grid").jqGrid("addRowData", e, {}), $("#grid").jqGrid("footerData", "set", {
            qty: 0,
            amount: 0
        });
        t.$_note.val(""), t.$_discountRate.val(originalData.disRate), t.$_deduction.val(originalData.disAmount), t.$_discount.val(originalData.amount), t.$_payment.val(originalData.rpAmount), t.$_arrears.val(originalData.arrears)
    }, calTotal: function () {
        for (var t = $("#grid").jqGrid("getDataIDs"), e = 0, a = 0, i = 0, o = 0, n = 0, s = 0, r = t.length; s < r; s++) {
            var d = t[s], l = $("#grid").jqGrid("getRowData", d);
            $("#" + d).data("goodsInfo") && (l.qty && (e += parseFloat(l.qty)), l.deduction && (a += parseFloat(l.deduction)), l.amount && (i += parseFloat(l.amount)), l.tax && (o += parseFloat(l.tax)), l.taxAmount && (n += parseFloat(l.taxAmount)))
        }
        $("#grid").jqGrid("footerData", "set", {qty: e, deduction: a, amount: i, tax: o, taxAmount: n});
        var c = taxRequiredCheck ? n : i, u = Number(this.$_deduction.val()) || 0, m = (c ? u / c * 100 : 0).toFixed(2);
        this.$_discountRate.val(m);
        var p = (c - Number(u)).toFixed(2);
        this.$_discount.val(p);
        var h = (p - Number(this.$_payment.val())).toFixed(2);
        h = Number(h) ? h : "0.00", this.$_discount.val(p), this.$_arrears.val(h)
    }, _getEntriesData: function () {
        for (var t = [], e = $("#grid").jqGrid("getDataIDs"), a = 0, i = e.length; a < i; a++) {
            var o, n = e[a], s = $("#grid").jqGrid("getRowData", n);
            if ("" !== s.goods) {
                var r = $("#" + n).data("goodsInfo"), d = $("#" + n).data("storageInfo"), l = $("#" + n).data("unitInfo") || {}, c = $("#" + n).data("skuInfo") || {};
                if (r.invSkus && r.invSkus.length > 0 && !c.id)return parent.Public.tips({
                    type: 2,
                    content: "请选择相应的属性！"
                }), $("#grid").jqGrid("editCellByColName", n, "skuName"), !1;
                if (!d || !d.id)return parent.Public.tips({
                    type: 2,
                    content: "请选择相应的仓库！"
                }), $("#grid").jqGrid("editCellByColName", n, "locationName"), !1;
                if (r.invNumberMap) {
                    for (var u = !1, m = this.$_customer.data("contactInfo"), p = 0; p < r.invNumberMap.length; p++)m.id == r.invNumberMap[p].buId && (r.customerInvNumber = r.invNumberMap[p].number, u = !0);
                    u || (r.customerInvNumber = "")
                }
                $("#grid").jqGrid("setRowData", e[a], {customerInvNumber: r.customerInvNumber});
                $("#grid").jqGrid("getRowData", n);
                o = {
                    invId: r.id,
                    invNumber: r.number,
                    invName: r.name,
                    invSpec: r.spec || "",
                    skuId: c.id || -1,
                    skuName: c.name || "",
                    unitId: l.unitId || -1,
                    mainUnit: l.name || "",
                    qty: s.qty,
                    price: s.price,
                    taxPrice: s.taxPrice,
                    discountRate: s.discountRate,
                    deduction: s.deduction,
                    goodsDiscountRate: s.goodsDiscountRate,
                    amount: s.amount,
                    locationId: d.id,
                    locationName: d.name,
                    description: s.description
                }, taxRequiredCheck && (o.taxRate = s.taxRate, o.tax = s.tax, o.taxAmount = s.taxAmount), t.push(o)
            }
        }
        return t
    }, getPostData: function () {
        var t = this, e = this;
        null !== curRow && null !== curCol && ($("#grid").jqGrid("saveCell", curRow, curCol), curRow = null, curCol = null);
        var a = e.$_customer.find("input");
        if ("" === a.val())return e.$_customer.removeData("contactInfo"), parent.Public.tips({
            type: 2,
            content: "请选择客户！"
        }), !1;
        var i = e.$_customer.data("contactInfo");
        if (!i || !i.id)return setTimeout(function () {
            a.focus().select()
        }, 15), parent.Public.tips({type: 2, content: "当前客户不存在！"}), !1;
        var o = this._getEntriesData();
        if (!o)return !1;
        if (o.length > 0) {
            var n = $.trim(t.$_note.val()), s = {
                id: originalData.id,
                buId: i.id,
                contactName: i.name,
                salesId: t.salesCombo.getValue(),
                salesName: t.salesCombo.getText(),
                date: $.trim(t.$_date.val()),
                deliveryDate: $.trim(t.$_deliveryDate.val()),
                billNo: $.trim(t.$_number.text()),
                transType: t.classBox.getValue(),
                entries: o,
                totalQty: $("#grid").jqGrid("footerData", "get").qty.replace(/,/g, ""),
                totalDiscount: $("#grid").jqGrid("footerData", "get").deduction.replace(/,/g, ""),
                totalAmount: $("#grid").jqGrid("footerData", "get").amount.replace(/,/g, ""),
                description: n === t.$_note[0].defaultValue ? "" : n,
                disRate: $.trim(t.$_discountRate.val()),
                disAmount: $.trim(t.$_deduction.val()),
                amount: $.trim(t.$_discount.val())
            };
            return taxRequiredCheck && (s.totalTax = $("#grid").jqGrid("footerData", "get").tax.replace(/,/g, ""), s.totalTaxAmount = $("#grid").jqGrid("footerData", "get").taxAmount.replace(/,/g, "")), s
        }
        return parent.Public.tips({type: 2, content: "商品信息不能为空！"}), $("#grid").jqGrid("editCell", 1, 2, !0), !1
    }, triggerSaveBeforeClose: function () {
        $("#save").trigger("click"), $("#edit").trigger("click")
    }, checkGridIsChange: function () {
        return Business.checkGridIsChange($("#grid"))
    }
};
$(".linkToCheck").on("click", function (t) {
    t.preventDefault(), parent.tab.addTabItem({
        tabid: "sales-salesOrderList",
        text: "销货订单记录",
        url: "/scm/invSo.do?action=initSoList"
    })
});
var hasLoaded = !1, originalData;
$(function () {
    if (urlParam.id) {
        if (!hasLoaded) {
            var t = $(".bills").hide();
            Public.ajaxGet("/scm/invSo.do?action=update", {id: urlParam.id}, function (e) {
                200 === e.status ? (originalData = e.data, THISPAGE.init(e.data), t.show(), hasLoaded = !0) : parent.Public.tips({
                        type: 1,
                        content: e.msg
                    })
            })
        }
    } else originalData = {
        id: -1,
        status: "add",
        customer: 0,
        transType: 150601,
        entries: [{id: "1", mainUnit: null}, {id: "2"}, {id: "3"}, {id: "4"}, {id: "5"}],
        totalQty: 0,
        totalDiscount: 0,
        totalAmount: 0,
        totalTax: 0,
        totalTaxAmount: 0,
        disRate: 0,
        disAmount: 0,
        amount: "0.00",
        rpAmount: "0.00",
        arrears: "0.00",
        accId: 0
    }, THISPAGE.init(originalData)
});