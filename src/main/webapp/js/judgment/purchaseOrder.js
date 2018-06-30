function _defineProperty(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
            value: a,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = a, t
}
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
        return typeof t
    } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    }, curRow, curCol, loading, SYSTEM = system = parent.SYSTEM, billRequiredCheck = system.billRequiredCheck, requiredMoney = system.requiredMoney, taxRequiredCheck = system.taxRequiredCheck, taxRequiredInput = system.taxRequiredInput, hiddenAmount = !1, hideCustomerCombo = !1, urlParam = Public.urlParam(), disEditable = urlParam.disEditable, qtyPlaces = Number(parent.SYSTEM.qtyPlaces), pricePlaces = Number(parent.SYSTEM.pricePlaces), amountPlaces = Number(parent.SYSTEM.amountPlaces), dia_unitId, dia_qty, THISPAGE = {
    init: function (t) {
        this.mod_PageConfig = Public.mod_PageConfig.init("purchaseOrder"), !1 !== SYSTEM.isAdmin || SYSTEM.rights.AMOUNT_INAMOUNT || (hiddenAmount = !0, $("#amountArea").hide()), this.loadGrid(t), this.initDom(t), this.initCombo(), this.triggerEdit(), this.addEvent(), $.cookie("BarCodeInsert") && (THISPAGE.$_barCodeInsert.addClass("open"), THISPAGE.$_barCodeInsert.removeClass("close")), this.goodsEdittypeInit()
    }, initDom: function (t) {
        var e = this;
        this.$_customer = $("#customer"), this.$_date = $("#date").val(system.endDate), this.$_deliveryDate = $("#deliveryDate").val(system.endDate), this.$_number = $("#number"), this.$_classes = $("#classes"), this.$_note = $("#note"), this.$_discountRate = $("#discountRate"), this.$_deduction = $("#deduction"), this.$_discount = $("#discount"), this.$_payment = $("#payment"), this.$_arrears = $("#arrears"), this.$_totalArrears = $("#totalArrears"), this.$_toolTop = $("#toolTop"), this.$_toolBottom = $("#toolBottom"), this.$_paymentTxt = $("#paymentTxt"), this.$_accountInfo = $("#accountInfo"), this.$_userName = $("#userName"), this.$_modifyTime = $("#modifyTime"), this.$_modifyName = $("#modifyName"), this.$_createTime = $("#createTime"), this.$_checkName = $("#checkName"), this.$_checkTime = $("#checkTime"), this.customerArrears = 0, this.$_note.placeholder(), this.customerCombo = Business.billSupplierCombo($("#customer"), {
            defaultSelected: t.buId ? ["id", t.buId] : 0,
            callback: {
                onChange: function (t) {
                    if (t) {
                        t.buId, t.contactName, t.cLevel, t.taxRate;
                        e.$_customer.data("contactInfo", t)
                    }
                }
            }
        }), "add" !== t.status || t.buId || Public.ajaxPost("/basedata/contact.do?action=getRecentlyContact", {
            transType: "160701" === originalData.transType ? "150501" : originalData.transType,
            billType: "PO"
        }, function (t) {
            var a = {id: (t = t.data).buId, name: t.contactName, cLevel: t.cLevel, taxRate: t.taxRate};
            e.$_customer.data("contactInfo", a), e.customerCombo.input.val(t.number + " " + t.contactName)
        }), hideCustomerCombo && this.customerCombo.disable(), this.$_date.datepicker({
            onSelect: function (t) {
                if (!(originalData.id > 0)) {
                    var a = t.format("yyyy-MM-dd");
                    e.$_number.text(""), Public.ajaxPost("/basedata/systemProfile.do?action=generateDocNo", {
                        billType: "PO",
                        billDate: a
                    }, function (t) {
                        200 === t.status ? e.$_number.text(t.data.billNo) : parent.Public.tips({
                                type: 1,
                                content: t.msg
                            })
                    })
                }
            }
        }), this.$_deliveryDate.datepicker(), this.classes = this.$_classes.cssRadio({
            callback: function (t) {
                "150501" === t.find("input").val() ? e.$_paymentTxt.text("本次付款:") : e.$_paymentTxt.text("本次退款:")
            }
        }), 150501 == t.transType || 160701 == t.transType ? this.classes.setValue(0) : this.classes.setValue(1), t.description && this.$_note.val(t.description), this.$_discountRate.val(t.disRate), this.$_deduction.val(t.disAmount), this.$_discount.val(t.amount), this.$_payment.val(t.rpAmount), this.$_arrears.val(t.arrears), requiredMoney && ($("#accountWrap").show(), this.accountCombo = Business.accountCombo($("#account"), {
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
        var a = '<a id="savaAndAdd" class="ui-btn ui-btn-sp">保存并新增</a><a id="save" class="ui-btn">保存</a>', i = '<a id="add" class="ui-btn ui-btn-sp">新增</a><a id="copy" class="ui-btn">复制</a><a href="/scm/invPo.do?action=toPdf&id=' + t.id + '" target="_blank" id="print" class="ui-btn">打印</a><a id="edit" class="ui-btn">保存</a>', n = '<a id="add" class="ui-btn ui-btn-sp">新增</a><a id="copy" class="ui-btn">复制</a><a href="/scm/invPo.do?action=toPdf&id=' + t.id + '" target="_blank" id="print" class="ui-btn">打印</a>', o = "", r = "", s = "150502" == originalData.transType ? "生成退货单" : "生成购货单", d = '<a id="turn" class="ui-btn ' + (2 == t.billStatus ? "ui-btn-dis" : "ui-btn-sc") + '">' + s + "</a>", l = '<a class="ui-btn" id="close">关闭</a>', u = '<a class="ui-btn" id="open">开启</a>';
        billRequiredCheck ? (o = '<a class="ui-btn" id="audit">审核</a>', r = '<a class="ui-btn" id="reAudit">反审核</a>') : (i = d + i, this.$_checkName.parent().hide(), this.$_checkTime.parent().hide());
        var c = '<a class="ui-btn-prev" id="prev" title="上一张"><b></b></a><a class="ui-btn-next" id="next" title="下一张"><b></b></a>';
        if (this.btn_add = a, this.btn_edit = i, this.btn_audit = o, this.btn_view = n, this.btn_reaudit = r, this.btn_turn = d, this.btn_close = l, this.btn_open = u, t.id > 0) {
            if (this.$_number.text(t.billNo), $("#editBills").css("display", "none"), this.$_date.val(t.date), this.$_deliveryDate.val(t.deliveryDate), this.$_totalArrears.val(t.totalArrears), this.$_accountInfo.data("accountInfo", t.accounts), -1 === t.accId && (this.$_accountInfo.show(), e.$_payment.attr("disabled", "disabled").addClass("ui-input-dis")), $("#grid").jqGrid("footerData", "set", {
                    qty: t.totalQty,
                    amount: t.totalAmount
                }), "list" !== urlParam.flag && (c = ""), t.isDelete && $("#mark").addClass("has-closed"), "edit" === t.status) {
                m = i + o;
                t.isDelete ? m = n + u : m += billRequiredCheck ? t.checked ? l : "" : l, this.$_toolBottom.html('<span id="groupBtn">' + m + "</span>" + c), this.$_checkTime.parent().hide(), this.$_checkName.parent().hide()
            } else if (t.checked) {
                $("#mark").addClass("has-audit");
                m = d + n + r;
                t.isDelete ? m = n + u : m += l, this.$_toolBottom.html('<span id="groupBtn">' + m + "</span>" + c)
            } else {
                var m = n;
                t.isDelete ? m += u : m += billRequiredCheck ? t.checked ? l : "" : l, this.$_toolBottom.html('<span id="groupBtn">' + m + "</span>" + c), this.$_checkTime.parent().hide(), this.$_checkName.parent().hide()
            }
            this.idList = parent.cacheList.purchaseOrderId || [], this.idPostion = $.inArray(String(t.id), this.idList), this.idLength = this.idList.length, 0 === this.idPostion && $("#prev").addClass("ui-btn-prev-dis"), this.idPostion === this.idLength - 1 && $("#next").addClass("ui-btn-next-dis"), this.$_userName.html(t.userName), this.$_modifyTime.html(t.modifyTime), this.$_modifyName.html(t.modifyName), this.$_createTime.html(t.createTime), this.$_checkName.html(t.checkName), this.$_checkTime.html(t.checkTime)
        } else billRequiredCheck ? this.$_toolBottom.html('<span id="groupBtn">' + a + o + "</span>") : this.$_toolBottom.html('<span id="groupBtn">' + a + "</span>"), this.$_userName.html(system.realName || ""), this.$_modifyTime.parent().hide(), this.$_modifyName.parent().hide(), this.$_createTime.parent().hide(), this.$_checkName.parent().hide(), this.$_checkTime.parent().hide();
        disEditable && (THISPAGE.disableEdit(), this.$_toolBottom.hide())
    }, loadGrid: function (t) {
        function e(t) {
            if (taxRequiredCheck) {
                var e = $("#grid").jqGrid("getRowData", t), a = parseFloat(e.taxRate);
                if ($.isNumeric(a)) {
                    var i = parseFloat(e.amount), n = i * a / 100, o = i + n;
                    $("#grid").jqGrid("setRowData", t, {tax: n, taxAmount: o})
                }
            }
        }

        function a(t) {
            return Math.round(100 * t) / 100
        }

        function i(t, e) {
            return $(".priceAuto")[0]
        }

        function n(t, e, a) {
            if ("get" === e)return t.val().split("：")[1] || t.val() || "";
            "set" === e && $("input", t).val(a)
        }

        function o() {
            $("#initCombo").append($(".priceAuto").val(""))
        }

        function r(t) {
            var e = $("#" + t).data("goodsInfo"), a = $.extend(!0, {}, e);
            if (!$.isEmptyObject(a)) {
                var i = Business.setPurRowData(t), n = $("#" + t).data("skuInfo") || i.getSkuInfo(), o = $("#" + t).data("unitInfo") || i.getUnitInfo(), r = i.getTaxRate(), s = i.getPrice();
                $("#" + t).data("skuInfo", n), $("#" + t).data("unitInfo", o);
                var d = {
                    barCode: a.barCode,
                    skuName: n.name,
                    mainUnit: a.mainUnit || a.unitName,
                    unitId: a.unitId,
                    qty: a.qty || 1,
                    price: s.thePrice,
                    taxPrice: s.theTaxPrice,
                    discountRate: a.discountRate || 0,
                    deduction: a.deduction || 0,
                    locationName: a.locationName,
                    srcOrderNo: a.srcOrderNo || "",
                    srcOrderEntryId: a.srcOrderEntryId || "",
                    srcOrderId: a.srcOrderId || "",
                    taxRate: r || 0,
                    safeDays: a.safeDays
                };
                d = $.extend(!0, d, i.setAmount(d.qty));
                var l = $("#grid").jqGrid("setRowData", t, d);
                invorder = "", l && (THISPAGE.calTotal(), issearch = 0, invorder = "STR")
            }
        }

        var s = this;
        if (t.id) {
            var d = 5 - t.entries.length;
            if (d > 0)for (var l = 0; l < d; l++)t.entries.push({})
        }
        s.newId = 6;
        var u = !1;
        1 === SYSTEM.siType && (u = !0);
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
                return t ? "undefined undefined" == t ? "&#160;" : (r(e.rowId), t) : a.invNumber ? a.invSpec ? a.invNumber + " " + a.invName + "_" + a.invSpec : a.invNumber + " " + a.invName : "&#160;"
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
            label: "购货单价",
            hidden: hiddenAmount,
            width: 100,
            fixed: !0,
            align: "right",
            formatter: "currency",
            formatoptions: {showZero: !0, decimalPlaces: pricePlaces},
            editable: !0,
            edittype: "custom",
            editoptions: {custom_element: i, custom_value: n, handle: o, trigger: "ui-icon-triangle-1-s"}
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
            editoptions: {custom_element: i, custom_value: n, handle: o, trigger: "ui-icon-triangle-1-s"}
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
            label: "购货金额",
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
        }, {name: "srcOrderEntryId", label: "源单分录ID", width: 0, hidden: !0}, {
            name: "srcOrderId",
            label: "源单ID",
            width: 0,
            hidden: !0
        }, {
            name: "srcOrderNo", label: "关联销货订单号", width: 120, fixed: !0, hidden: u, formatter: function (t, e, a) {
                return t && (hideCustomerCombo = !0), t || "&#160;"
            }
        });
        s.mod_PageConfig.gridReg("grid", c), c = s.mod_PageConfig.conf.grids.grid.colModel, $("#grid").jqGrid({
            data: t.entries,
            datatype: "clientSide",
            autowidth: !0,
            height: "100%",
            rownumbers: !0,
            gridview: !0,
            onselectrow: !1,
            colModel: c,
            cmTemplate: {sortable: !1, title: !1},
            shrinkToFit: !1,
            forceFit: !0,
            rowNum: 1e3,
            cellEdit: !1,
            cellsubmit: "clientArray",
            localReader: {root: "rows", records: "records", repeatitems: !1, id: "id"},
            jsonReader: {root: "data.entries", records: "records", repeatitems: !1, id: "id"},
            loadComplete: function (t) {
                if (THISPAGE.$_barCodeInsert = $("#barCodeInsert"), urlParam.id > 0 || "1" == urlParam.turnBygoodList) {
                    var e = t.rows, a = e.length;
                    s.newId = a + 1;
                    for (var i = 0; i < a; i++) {
                        var n = i + 1, o = e[i];
                        if ($.isEmptyObject(e[i]))break;
                        var r = $.extend(!0, {
                            id: o.invId,
                            number: o.invNumber,
                            name: o.invName,
                            spec: o.invSpec,
                            unitId: o.unitId,
                            unitName: o.mainUnit,
                            prices: o.prices,
                            taxPrice: o.taxPrice,
                            skuId: o.skuId,
                            skuName: o.skuName
                        }, o);
                        Business.cacheManage.getGoodsInfoByNumber(r.number, function (t) {
                            r.isSerNum = t.isSerNum, r.isWarranty = o.isWarranty = t.isWarranty, r.safeDays = o.safeDays = t.safeDays, r.barCode = o.barCode = t.barCode, r.invSkus = t.invSkus, r.prices = t.prices, r.taxPrice = t.taxPrice, r.id = o.invId, $("#" + n).data("goodsInfo", r).data("storageInfo", {
                                id: o.locationId,
                                name: o.locationName
                            }).data("unitInfo", {unitId: o.unitId, name: o.mainUnit}).data("skuInfo", {
                                id: o.skuId,
                                name: o.skuName
                            }).data("prices", {id: o.prices})
                        })
                    }
                }
            },
            gridComplete: function () {
                setTimeout(function () {
                    Public.autoGrid($("#grid"))
                }, 10)
            },
            afterEditCell: function (t, e, a, i, n) {
                function o() {
                    var e = $("#" + t).data("goodsInfo");
                    if (e) {
                        var a = $("#grid").jqGrid("getRowData", t);
                        (e = $.extend(!0, {}, e)).skuName = a.skuName, e.mainUnit = a.mainUnit, e.unitId = a.unitId, e.qty = a.qty, e.price = a.price, e.customSetPrice = a.price, e.taxPrice = a.taxPrice, e.discountRate = a.discountRate, e.deduction = a.deduction, e.amount = a.amount, e.taxRate = a.taxRate, e.tax = a.tax, e.taxAmount = a.taxAmount, e.locationName = a.locationName, $("#" + t).data("goodsInfo", e)
                    }
                }

                if (THISPAGE.curID = t, "goods" === e && (o(), $("#" + i + "_goods", "#grid").val(a), THISPAGE.goodsCombo.selectByText(a)), "skuName" === e) {
                    o();
                    var r = $("#" + t).data("goodsInfo");
                    if (!r || !r.invSkus || !r.invSkus.length)return $("#grid").jqGrid("restoreCell", i, n), curCol = n + 1, $("#grid").jqGrid("nextCell", i, n + 1), void THISPAGE.skuCombo.loadData([]);
                    "string" == typeof r.invSkus && (r.invSkus = $.parseJSON(r.invSkus)), $("#" + i + "_skuName", "#grid").val(a), THISPAGE.skuCombo.loadData(r.invSkus || [], -1, !1), THISPAGE.skuCombo.selectByText(a)
                }
                if ("price" === e && $("#" + i + "_price", "#grid").val(a), "taxPrice" === e && $("#" + i + "_taxPrice", "#grid").val(a), "locationName" === e && ($("#" + i + "_locationName", "#grid").val(a), THISPAGE.storageCombo.selectByText(a)), "mainUnit" === e) {
                    $("#" + i + "_mainUnit", "#grid").val(a);
                    var s = $("#" + t).data("unitInfo") || {};
                    if (!s.unitId || "0" === s.unitId)return $("#grid").jqGrid("restoreCell", i, n), curCol = n + 1, void $("#grid").jqGrid("nextCell", i, n + 1);
                    THISPAGE.unitCombo.enable(), THISPAGE.unitCombo.loadData(function () {
                        for (var t = {}, e = 0; e < SYSTEM.unitInfo.length; e++) {
                            var a = SYSTEM.unitInfo[e], i = s.unitId;
                            s.unitId == a.id && (s = a), s.unitId = i;
                            var n = a.unitTypeId || e;
                            t[n] || (t[n] = []), t[n].push(a)
                        }
                        return s.unitTypeId ? t[s.unitTypeId] : [s]
                    }), THISPAGE.unitCombo.selectByText(a)
                }
            },
            formatCell: function (t, e, a, i, n) {
            },
            beforeSubmitCell: function (t, e, a, i, n) {
            },
            beforeSaveCell: function (t, e, a, i, n) {
                if ("goods" === e && (!$("#" + t).data("goodsInfo") || THISPAGE.$_barCodeInsert && THISPAGE.$_barCodeInsert.hasClass("open"))) {
                    var o, r = function (e) {
                        $("#" + t).data("goodsInfo", e).data("storageInfo", {
                            id: e.locationId,
                            name: e.locationName
                        }).data("unitInfo", {unitId: e.unitId, name: e.unitName}).data("skuInfo", {
                            skuId: e.skuId,
                            name: e.skuName
                        }), o = Business.formatGoodsName(e)
                    };
                    return THISPAGE.$_barCodeInsert && THISPAGE.$_barCodeInsert.hasClass("open") ? Business.cacheManage.getGoodsInfoByBarCode($.trim(a), r, !0) : Business.cacheManage.getGoodsInfoByNumber(a, r, !0), o ? ($("#" + t).find(".btn_query_inventory").show(), o) : ($.dialog({
                            width: 775,
                            height: 510,
                            title: "选择商品",
                            content: "url:/settings/goods-batch.jsp",
                            data: {
                                skuMult: SYSTEM.enableAssistingProp, skey: a, callback: function (t, e, a) {
                                    "" === e && ($("#grid").jqGrid("addRowData", t, {}, "last"), s.newId = t + 1), setTimeout(function () {
                                        $("#grid").jqGrid("editCell", a, 2, !0)
                                    }, 10), s.calTotal()
                                }
                            },
                            lock: !0,
                            button: [{
                                name: "选中", defClass: "ui_state_highlight fl", focus: !0, callback: function () {
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
                return $("#" + t).find(".btn_query_inventory").show(), a
            },
            afterSaveCell: function (t, i, n, o, r) {
                switch (i) {
                    case"goods":
                        var d = $("#grid").jqGrid("getDataIDs"), l = Math.max.apply(null, d) + 1;
                        s.newId;
                        0 == $("#" + t).next().length && ($("#grid").jqGrid("addRowData", l, {}, "last"), s.newId = l + 1);
                        break;
                    case"skuName":
                        $("#" + t).data("goodsInfo").srcOrderNo && $("#grid").jqGrid("setRowData", t, {
                            srcOrderNo: "",
                            srcOrderId: "",
                            srcOrderEntryId: ""
                        });
                        break;
                    case"mainUnit":
                        var u = $(".unitAuto").getCombo().getValue(), c = $("#" + t).data("goodsInfo"), m = $("#grid").jqGrid("getRowData", t);
                        if (c.prices)for (N = 0; N < c.prices.length; N++)if (c.prices[N].unitId == u) {
                            var p = parseFloat(m.qty), h = c.prices[N].purPrice, g = parseFloat(m.discountRate), f = parseFloat(m.taxRate);
                            if (SYSTEM.invPriceIsTax && h > 0 && (h = Number(h / Number(1 + Number(f / 100)))), $.isNumeric(h))if ($.isNumeric(g))var b = p * h - (P = p * h * g / 100), v = $("#grid").jqGrid("setRowData", t, {
                                unitId: u,
                                price: h,
                                deduction: P,
                                amount: b
                            }); else v = $("#grid").jqGrid("setRowData", t, {unitId: u, amount: p * h});
                            if ($.isNumeric(f))var y = h * (1 + f / 100), v = $("#grid").jqGrid("setRowData", t, {taxPrice: y});
                            e(t), v && THISPAGE.calTotal()
                        }
                        break;
                    case"qty":
                        var n = parseFloat(n) || 0, m = $("#grid").jqGrid("getRowData", t), h = parseFloat(m.price), g = parseFloat(m.discountRate), y = parseFloat(m.taxPrice), f = parseFloat(m.taxRate) || 0;
                        if (SYSTEM.invPriceIsTax)var b = (T = (n * y * (1 - g / 100)).toFixed(2)) - (D = (T / (1 + f / 100) * f / 100).toFixed(2)), P = (n * y / (1 + f / 100) * g / 100).toFixed(2), v = $("#grid").jqGrid("setRowData", t, {
                            taxAmount: T,
                            tax: D,
                            amount: b,
                            price: h,
                            deduction: P
                        }); else {
                            if ($.isNumeric(h))if ($.isNumeric(g))var b = n * h - (P = n * h * g / 100), I = (100 - n) / 10, v = $("#grid").jqGrid("setRowData", t, {
                                deduction: P,
                                amount: b,
                                goodsDiscountRate: I
                            }); else v = $("#grid").jqGrid("setRowData", t, {amount: n * h});
                            e(t)
                        }
                        v && THISPAGE.calTotal();
                        break;
                    case"price":
                        var n = parseFloat(n) || 0, m = $("#grid").jqGrid("getRowData", t), p = parseFloat(m.qty), f = parseFloat(m.taxRate) || 0, g = parseFloat(m.discountRate), I = parseFloat(m.goodsDiscountRate), P = parseFloat(m.deduction), _ = 100;
                        if (SYSTEM.qtyPlaces > 2)for (N = 0; N < SYSTEM.qtyPlaces - 2; N++)_ *= 10;
                        if (g) {
                            P = n * p * g / 100
                        } else g = Business.disRateFormat(Number(P).div(Number(p).mul(Number(n))).mul(100));
                        var D = (b = Math.round((n * p - P) * _) / _) * f / 100, T = Number(Math.round(100 * b) / 100) + Number(Math.round(100 * D) / 100), y = Number(n).mul(1..add(Number(f).div(100)));
                        (v = $("#grid").jqGrid("setRowData", t, {
                            tax: D,
                            taxAmount: T,
                            taxPrice: y,
                            deduction: P,
                            amount: b,
                            discountRate: g
                        })) && THISPAGE.calTotal();
                        break;
                    case"taxPrice":
                        var n = parseFloat(n) || 0, m = $("#grid").jqGrid("getRowData", t), f = parseFloat(m.taxRate), p = parseFloat(m.qty), g = parseFloat(m.discountRate) || 0, I = parseFloat(m.goodsDiscountRate), P = parseFloat(m.deduction), h = ((b = (T = Math.round(n * p * (1 - g / 100) * 100) / 100) - (D = Number(T / (1 + f / 100) * f / 100))) / p / (1 - g / 100) * 100 / 100).toFixed(10);
                        if (g) {
                            P = h * p * g / 100;
                            I = (100 - g) / 10
                        } else g = Business.disRateFormat(Number(P).div(Number(p).mul(Number(n))).mul(100));
                        (v = $("#grid").jqGrid("setRowData", t, {
                            tax: D,
                            taxAmount: T,
                            price: h,
                            deduction: P,
                            amount: b,
                            discountRate: g,
                            goodsDiscountRate: I
                        })) && THISPAGE.calTotal();
                        break;
                    case"discountRate":
                        var n = parseFloat(n) || 0, m = $("#grid").jqGrid("getRowData", t), f = parseFloat(m.taxRate), p = parseFloat(m.qty), h = parseFloat(m.price), y = parseFloat(m.taxPrice);
                        if (SYSTEM.invPriceIsTax)var b = (T = (p * y * (1 - n / 100)).toFixed(2)) - (D = (T / (1 + f / 100) * f / 100).toFixed(2)), P = (p * y / (1 + f / 100) * n / 100).toFixed(2), v = $("#grid").jqGrid("setRowData", t, {
                            taxAmount: T,
                            tax: D,
                            amount: b,
                            price: h,
                            deduction: P
                        }); else {
                            if ($.isNumeric(p) && $.isNumeric(h))var I = (100 - n) / 10, b = (x = p * h) - (P = x * n / 100);
                            var D = b * f / 100, T = Number(a(b)) + Number(a(D))
                        }
                        (v = $("#grid").jqGrid("setRowData", t, {
                            tax: D,
                            taxAmount: T,
                            taxPrice: y,
                            deduction: P,
                            amount: b,
                            goodsDiscountRate: I
                        })) && THISPAGE.calTotal();
                        break;
                    case"goodsDiscountRate":
                        var n = parseFloat(n) || 0, m = $("#grid").jqGrid("getRowData", t), p = parseFloat(m.qty), h = parseFloat(m.price);
                        if ($.isNumeric(p) && $.isNumeric(h))var b = (x = p * h) - (P = x * (g = 100 - 10 * n) / 100), v = $("#grid").jqGrid("setRowData", t, {
                            deduction: P,
                            amount: b,
                            discountRate: g
                        });
                        e(t), v && THISPAGE.calTotal();
                        break;
                    case"deduction":
                        var n = parseFloat(n) || 0, m = $("#grid").jqGrid("getRowData", t), p = parseFloat(m.qty), f = parseFloat(m.taxRate), y = parseFloat(m.taxPrice), h = parseFloat(m.price);
                        if (SYSTEM.invPriceIsTax)var g = Number(n).div(Number(Number(p).mul(Number(y))).div(Number(1..add(Number(f).div(100))))).mul(100), h = ((b = (T = (p * y * (1 - (g = Business.disRateFormat(g)) / 100)).toFixed(2)) - (D = (parseFloat(T / (1 + f / 100)) * f / 100).toFixed(2))) / (p * (1 - g / 100))).toFixed(2); else {
                            if ($.isNumeric(p) && $.isNumeric(h))var x = Number(p).mul(Number(h)), b = x > 0 ? Number(x).subtr(Number(n)) : 0, g = x ? Number(n).mul(100).div(x) : 0, I = (100 - (g = Business.disRateFormat(g))) / 10;
                            var D = b * f / 100, y = (T = Number(a(b)) + Number(a(D))) / p / (1 - g / 100);
                            T / p == 0 && 1 - g / 100 == 0 && (y = (n * (1 + f / 100) / p).toFixed(2))
                        }
                        (v = $("#grid").jqGrid("setRowData", t, {
                            tax: D,
                            taxAmount: T,
                            taxPrice: y,
                            amount: b,
                            discountRate: g,
                            goodsDiscountRate: I
                        })) && THISPAGE.calTotal();
                        break;
                    case"amount":
                        var n = parseFloat(n) || 0, m = $("#grid").jqGrid("getRowData", t), f = parseFloat(m.taxRate), p = parseFloat(m.qty), g = parseFloat(m.discountRate) || 0, P = parseFloat(m.deduction), I = parseFloat(m.goodsDiscountRate), C = 100;
                        if (SYSTEM.pricePlaces > 2)for (N = 0; N < SYSTEM.pricePlaces - 2; N++)C *= 10;
                        var D = n * f / 100, T = Math.round(100 * (n + D)) / 100, h = Math.round(n / p / (1 - g / 100) * C) / C, y = Math.round(T / p / (1 - g / 100) * C) / C;
                        if (g) {
                            P = h * p * g / 100;
                            I = (100 - g) / 10
                        } else g = P / (p * h) * 100;
                        (v = $("#grid").jqGrid("setRowData", t, {
                            tax: D,
                            taxAmount: T,
                            taxPrice: y,
                            deduction: P,
                            price: h,
                            discountRate: g,
                            goodsDiscountRate: I
                        })) && THISPAGE.calTotal();
                        break;
                    case"taxRate":
                        var A = n, n = parseFloat(n) || 0, m = $("#grid").jqGrid("getRowData", t), b = parseFloat(m.amount), h = parseFloat(m.price);
                        if ($.isNumeric(n)) {
                            T = b + (D = b * n / 100);
                            (v = $("#grid").jqGrid("setRowData", t, {tax: D, taxAmount: T})) && THISPAGE.calTotal()
                        }
                        if ("" === A && (v = $("#grid").jqGrid("setRowData", t, {
                                tax: "",
                                taxAmount: b
                            })) && THISPAGE.calTotal(), $.isNumeric(h)) {
                            y = h * (1 + n / 100);
                            (v = $("#grid").jqGrid("setRowData", t, {taxPrice: y})) && THISPAGE.calTotal()
                        }
                        break;
                    case"tax":
                        var n = parseFloat(n) || 0, m = $("#grid").jqGrid("getRowData", t);
                        if ($.isNumeric(n)) {
                            T = (b = parseFloat(m.amount)) + n;
                            (v = $("#grid").jqGrid("setRowData", t, {taxAmount: T})) && THISPAGE.calTotal()
                        }
                        break;
                    case"taxAmount":
                        var n = parseFloat(n) || 0, m = $("#grid").jqGrid("getRowData", t), f = parseFloat(m.taxRate), p = parseFloat(m.qty), g = parseFloat(m.discountRate) || 0, P = parseFloat(m.deduction), I = parseFloat(m.goodsDiscountRate), C = 100;
                        if (SYSTEM.pricePlaces > 2)for (var N = 0; N < SYSTEM.pricePlaces - 2; N++)C *= 10;
                        var D = Math.round(n / (1 + f / 100) * f / 100 * 100) / 100, b = Math.round(100 * (n - D)) / 100, y = Math.round(n / p / (1 - g / 100) * C) / C, h = Math.round(b / p / (1 - g / 100) * C) / C;
                        if (g) {
                            P = h * p * g / 100;
                            I = (100 - g) / 10
                        } else g = P / (p * h) * 100;
                        (v = $("#grid").jqGrid("setRowData", t, {
                            tax: D,
                            amount: b,
                            taxPrice: y,
                            deduction: P,
                            price: h,
                            discountRate: g,
                            goodsDiscountRate: I
                        })) && THISPAGE.calTotal()
                }
            },
            loadonce: !0,
            resizeStop: function (t, e) {
                s.mod_PageConfig.setGridWidthByIndex(t, e, "grid")
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
        }), $("#grid").jqGrid("setGridParam", {cellEdit: !0})
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
                    }, trigger: "ui-icon-ellipsis purchase"
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
            name: t.contactName,
            taxRate: t.taxRate
        }), e.customerCombo.input.val(t.contactName), e.$_date.val(t.date), e.$_deliveryDate.val(t.deliveryDate), e.$_number.text(t.billNo), 150501 == t.transType || 160701 == t.transType ? e.classes.setValue(0) : e.classes.setValue(1), e.$_note.val(t.description), e.$_discountRate.val(t.disRate), e.$_deduction.val(t.disAmount), e.$_discount.val(t.amount), e.$_payment.val(t.rpAmount), e.accountCombo.selectByValue(t.accId, !1), e.$_accountInfo.data("accountInfo", t.accounts), -1 === t.accId ? e.$_accountInfo.show() : e.$_accountInfo.hide(), e.$_arrears.val(t.arrears), e.$_totalArrears.val(t.totalArrears), e.$_userName.html(t.userName), e.$_modifyTime.html(t.modifyTime), e.$_modifyName.html(t.modifyName), e.$_createTime.html(t.createTime), e.$_checkName.html(t.checkName), e.$_checkTime.html(t.checkTime), "edit" === t.status ? this.editable || (e.enableEdit(), $("#groupBtn").html(e.btn_edit + e.btn_audit), $("#mark").removeClass("has-audit")) : this.editable && (e.disableEdit(), $("#groupBtn").html(e.btn_turn + e.btn_view + e.btn_reaudit), $("#mark").addClass("has-audit"))
    }, initCombo: function () {
        var t = this;
        this.goodsCombo = Business.billGoodsCombo($(".goodsAuto"), {
            disSerNum: !0,
            userData: {billType: "purchase"}
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
                return a.prices.nearPrice && i.push({name: "最近采购价：" + a.prices.nearPrice, id: 2}), i
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
                        var i = t.$_customer.data("contactInfo"), n = t.$_customer.data("priceList");
                        if (n || (n = {}, t.$_customer.data("priceList", n)), i && "" !== $.trim(t.$_customer.find("input").val())) {
                            var o = function () {
                                var t = {cId: i.id};
                                n[a.id] = t, Public.ajaxPost("/basedata/inventory.do?action=listBySelected", {
                                    type: "sa",
                                    ids: a.id,
                                    contactId: i.id
                                }, function (a) {
                                    if (200 === a.status && a.data && a.data.result) {
                                        for (var i = a.data.result, n = 0, o = i.length; n < o; n++) {
                                            var r = i[n];
                                            r.nearPrice && (t.prices = {}, t.prices.nearPrice = r.nearPrice), r.salePrice && (t.prices = t.prices || {}, t.prices.levelPrice = r.salePrice, t.prices.discountRate = r.discountRate)
                                        }
                                        t.prices && e.show()
                                    }
                                })
                            };
                            if (n[a.id]) {
                                var r = n[a.id];
                                r.cId != i.id ? o() : r.prices && e.show()
                            } else o()
                        }
                    }
                }
            }
        }).getCombo()
    }, disableEdit: function () {
        this.customerCombo.disable(), this.$_date.attr("disabled", "disabled").addClass("ui-input-dis"), this.$_deliveryDate.attr("disabled", "disabled").addClass("ui-input-dis"), this.$_note.attr("disabled", "disabled").addClass("ui-input-dis"), this.$_discountRate.attr("disabled", "disabled").addClass("ui-input-dis"), this.$_deduction.attr("disabled", "disabled").addClass("ui-input-dis"), this.$_payment.attr("disabled", "disabled").addClass("ui-input-dis"), this.accountCombo.disable(), $("#grid").jqGrid("setGridParam", {cellEdit: !1}), this.editable = !1
    }, enableEdit: function () {
        disEditable || (!hideCustomerCombo && this.customerCombo.enable(), this.customerCombo.enable(), this.$_date.removeAttr("disabled").removeClass("ui-input-dis"), this.$_deliveryDate.removeAttr("disabled").removeClass("ui-input-dis"), this.$_note.removeAttr("disabled").removeClass("ui-input-dis"), this.$_discountRate.removeAttr("disabled").removeClass("ui-input-dis"), this.$_deduction.removeAttr("disabled").removeClass("ui-input-dis"), this.$_payment.removeAttr("disabled").removeClass("ui-input-dis"), this.accountCombo.enable(), $("#grid").jqGrid("setGridParam", {cellEdit: !0}), this.editable = !0)
    }, triggerEdit: function () {
        var t = !0;
        originalData.id > 0 && originalData.checked && (t = !1), "edit" == originalData.status && (t = Business.verifyRight("PO_UPDATE", !0)), t ? this.enableEdit() : this.disableEdit()
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
                var i = $.trim(t.eq(e).find("td.goods").text()), n = t.eq(e).attr("id");
                if ("" == i || "undefined undefined" == i)return parent.Public.tips({
                    type: 1,
                    content: "单据中商品列不能为空！"
                }), $("#grid").jqGrid("editCellByColName", n, "goods"), !1
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
        }), Business.billsEvent(e, "purchase"), Business.coderRuleEvent(e, "PO", e.$_date.val()), this.$_deduction.keyup(function () {
            var t = Number($(this).val()), a = Number($("#grid").jqGrid("footerData", "get")[e.calAmount].replace(/,/g, "")), i = (a - t).toFixed(amountPlaces);
            if (a) {
                var n = t / a * 100, o = i - Number($.trim(e.$_payment.val()));
                THISPAGE.$_discountRate.val(n.toFixed(amountPlaces)), THISPAGE.$_discount.val(i), THISPAGE.$_arrears.val(o.toFixed(amountPlaces))
            }
        }).on("keypress", function (t) {
            Public.numerical(t)
        }).on("focus", function () {
            this.select()
        }).blur(function (t) {
            $(this).val() < 0 && (defaultPage.Public.tips(_defineProperty({content: 2}, "content", "优惠金额不能为负数！")), $(this).focus())
        }), this.$_discountRate.keyup(function () {
            var t = Number($(this).val()), a = Number($("#grid").jqGrid("footerData", "get")[e.calAmount].replace(/,/g, "")), i = (a * (t / 100)).toFixed(amountPlaces), n = (a - i).toFixed(amountPlaces), o = n - Number($.trim(e.$_payment.val()));
            THISPAGE.$_deduction.val(i), THISPAGE.$_discount.val(n), THISPAGE.$_arrears.val(o.toFixed(amountPlaces))
        }).on("keypress", function (t) {
            Public.numerical(t)
        }).on("focus", function () {
            this.select()
        }).blur(function (t) {
            $(this).val() < 0 && (defaultPage.Public.tips(_defineProperty({content: 2}, "content", "优惠金额不能为负数！")), $(this).focus())
        }), this.$_payment.keyup(function () {
            var t = $(this).val() || 0, a = e.$_discount.val(), i = Number(parseFloat(a) - parseFloat(t)), n = Number(i + THISPAGE.customerArrears);
            THISPAGE.$_arrears.val(i.toFixed(amountPlaces)), THISPAGE.$_totalArrears.val(n.toFixed(amountPlaces));
            var o = e.$_accountInfo.data("accountInfo");
            o && 1 === o.length && (o[0].payment = Number(t).toFixed(2))
        }).on("keypress", function (t) {
            Public.numerical(t)
        }).on("focus", function () {
            this.select()
        }), $(".wrapper").on("click", "#save", function (a) {
            if (a.preventDefault(), Business.verifyRight("PO_ADD")) {
                if (!t())return !1;
                var i = $(this);
                setTimeout(function () {
                    function t() {
                        i.ajaxPost("/scm/invPo.do?action=add", {postData: JSON.stringify(a)}, function (t) {
                            if (200 === t.status) {
                                e.$_modifyTime.html((new Date).format("yyyy-MM-dd hh:mm:ss")).parent().show(), e.$_modifyName.html(system.realName).parent().show(), e.$_createTime.html((new Date).format("yyyy-MM-dd hh:mm:ss")).parent().show(), originalData.id = t.data.id, THISPAGE.copyflag = null;
                                var a = e.btn_edit;
                                a += billRequiredCheck ? e.btn_audit : e.btn_audit + e.btn_close, e.$_toolBottom.html('<span id="groupBtn">' + a + "</span>"), parent.Public.tips({content: "保存成功！"}), $("#editBills").css("display", "none"), Business.clearDirtyCell($("#grid")), originalData.status = "edit", e.triggerEdit()
                            } else parent.Public.tips({type: 1, content: t.msg})
                        })
                    }

                    var a = THISPAGE.getPostData();
                    if (a) {
                        "edit" === originalData.stata && (a.id = originalData.id, a.stata = "edit"), THISPAGE.copyflag && (a.copyflag = THISPAGE.copyflag);
                        var n = (n = a.date).replace(/-/g, "/");
                        (n = new Date(n + " 00:00:00").getTime()) > system.curDate ? $.dialog.confirm("单据日期大于本日，确定保存？", function () {
                                t()
                            }) : t()
                    }
                }, 300)
            }
        }), $(".wrapper").on("click", "#savaAndAdd", function (a) {
            if (a.preventDefault(), Business.verifyRight("PO_ADD")) {
                if (!t())return !1;
                var i = $(this);
                setTimeout(function () {
                    function t() {
                        i.ajaxPost("/scm/invPo.do?action=addNew", {postData: JSON.stringify(a)}, function (t) {
                            if (200 === t.status) {
                                e.$_number.text(t.data.billNo), $("#grid").clearGridData(), $("#grid").clearGridData(!0);
                                for (var a = 1; a <= 5; a++)$("#grid").jqGrid("addRowData", a, {});
                                e.newId = 6, e.$_note.val(""), e.$_discountRate.val(originalData.disRate), e.$_deduction.val(originalData.disAmount), e.$_discount.val(originalData.amount), e.$_payment.val(originalData.rpAmount), e.$_arrears.val(originalData.arrears), e.accountCombo.selectByValue(0, !0), parent.Public.tips({content: "保存成功！"}), originalData.status = "add"
                            } else parent.Public.tips({type: 1, content: t.msg})
                        })
                    }

                    var a = THISPAGE.getPostData();
                    if (a) {
                        var n = (n = a.date).replace(/-/g, "/");
                        (n = new Date(n + " 00:00:00").getTime()) > system.curDate ? $.dialog.confirm("单据日期大于本日，确定保存？", function () {
                                t()
                            }) : t()
                    }
                }, 300)
            }
        }), $(".wrapper").on("click", "#copy", function (t) {
            if (t.preventDefault(), Business.verifyRight("PO_ADD")) {
                var a = $(this);
                e.$_date = $("#date").val(system.endDate), e.$_deliveryDate = $("#deliveryDate").val(system.endDate);
                var i = THISPAGE.getPostData().date;
                a.ajaxPost("/basedata/systemProfile.do?action=generateDocNo", {
                    billType: "PO",
                    billDate: i
                }, function (t) {
                    if (200 === t.status) {
                        originalData.id = -1, THISPAGE.copyflag = 1, e.$_number.text(t.data.billNo), $("#mark").removeClass(), e.$_checkName.html(""), e.$_checkTime.html(""), e.enableEdit(), $("#groupBtn").html(e.btn_edit + e.btn_audit), e.accountCombo.selectByValue(0, !0), e.$_modifyTime.html((new Date).format("yyyy-MM-dd hh:mm:ss")).parent().show(), e.$_modifyName.html(system.realName).parent().show(), e.$_createTime.html((new Date).format("yyyy-MM-dd hh:mm:ss")).parent().hide(), parent.Public.tips({content: "复制数据成功,并生成新的单据！"}), originalData.status = "add", $("#editBills").css("display", "inline-block");
                        var a = e.btn_add;
                        billRequiredCheck && (a += e.btn_audit), e.$_toolBottom.html('<span id="groupBtn">' + a + "</span>")
                    } else parent.Public.tips({type: 1, content: t.msg})
                })
            }
        }), $(".wrapper").on("click", "#edit", function (a) {
            function i() {
                n.ajaxPost("/scm/invPo.do?action=updateInvPo", {postData: JSON.stringify(o)}, function (t) {
                    200 === t.status ? (e.$_modifyTime.html((new Date).format("yyyy-MM-dd hh:mm:ss")).parent().hide(), e.$_modifyName.html(system.realName).parent().hide(), originalData.id = t.data.id, parent.Public.tips({content: "修改成功！"}), Business.clearDirtyCell($("#grid")), originalData.status = "edit") : parent.Public.tips({
                            type: 1,
                            content: t.msg
                        })
                })
            }

            if (a.preventDefault(), Business.verifyRight("PO_UPDATE")) {
                if (!t())return !1;
                var n = $(this), o = THISPAGE.getPostData();
                if (o) {
                    var r = (r = o.date).replace(/-/g, "/");
                    (r = new Date(r + " 00:00:00").getTime()) > system.curDate ? $.dialog.confirm("单据日期大于本日，确定保存？", function () {
                            i()
                        }) : i()
                }
            }
        }), $(".wrapper").on("click", "#audit", function (t) {
            if (t.preventDefault(), Business.verifyRight("PO_CHECK")) {
                var a = $(this);
                setTimeout(function () {
                    function t() {
                        a.ajaxPost("/scm/invPo.do?action=checkInvPo", {postData: JSON.stringify(i)}, function (t) {
                            200 === t.status ? (originalData.checked = 1, originalData.id = t.data.id, $("#mark").addClass("has-audit"), e.$_checkName.html(SYSTEM.realName).parent().show(), e.$_checkTime.html((new Date).format("yyyy-MM-dd hh:mm:ss")).parent().show(), $("#edit").hide(), e.disableEdit(), $("#groupBtn").html(e.btn_turn + e.btn_view + e.btn_reaudit + e.btn_close), "150502" == e.classes.getValue() ? $("#turn").html("生成退货单") : $("#turn").html("生成购货单"), parent.Public.tips({content: "审核成功！"}), $("#editBills").css("display", "none"), Business.clearDirtyCell($("#grid")), originalData.status = "edit") : parent.Public.tips({
                                    type: 1,
                                    content: t.msg
                                })
                        })
                    }

                    var i = THISPAGE.getPostData();
                    if (i) {
                        var n = (n = i.date).replace(/-/g, "/");
                        (n = new Date(n + " 00:00:00").getTime()) > system.curDate && "edit" !== originalData.status ? $.dialog.confirm("单据日期大于本日，确定保存？", function () {
                                t()
                            }) : t()
                    }
                }, 300)
            }
        }), $(".wrapper").on("click", "#reAudit", function (t) {
            t.preventDefault(), Business.verifyRight("PO_UNCHECK") && $(this).ajaxPost("/scm/invPo.do?action=rsBatchCheckInvPo", {id: originalData.id}, function (t) {
                200 === t.status && 0 != t.data.failArr.length ? Public.antiCheck(t.data, "购货订单") : 200 === t.status ? (originalData.checked = 0, $("#mark").removeClass(), e.$_checkName.html(""), e.$_checkTime.html(""), e.$_checkName.parent().hide(), e.$_checkTime.parent().hide(), $("#groupBtn").html(e.btn_edit + e.btn_audit), parent.Public.tips({content: "反审核成功！"}), e.triggerEdit()) : parent.Public.tips({
                            type: 1,
                            content: t.msg
                        })
            })
        }), $(".wrapper").on("click", "#close", function (t) {
            if (t.preventDefault(), Business.verifyRight("PO_CLOSE")) {
                var a = $(this);
                THISPAGE.getPostData() && a.ajaxPost("/scm/invPo.do?action=batchClose", {id: originalData.id}, function (t) {
                    200 === t.status && t.msg && t.msg.length ? 1 == t.msg[0].isSuccess ? ($("#mark").addClass("has-closed'has-closed'"), e.disableEdit(), $("#groupBtn").html(e.btn_view + e.btn_open), "150502" == e.classes.getValue() ? $("#turn").html("生成退货单") : $("#turn").html("生成购货单"), parent.Public.tips({content: "关闭成功！"})) : parent.Public.tips({
                                type: 1,
                                content: "关闭失败：" + t.msg[0].msg || ""
                            }) : parent.Public.tips({type: 1, content: t.msg})
                })
            }
        }), $(".wrapper").on("click", "#open", function (t) {
            t.preventDefault(), Business.verifyRight("PO_UNCLOSE") && $(this).ajaxPost("/scm/invPo.do?action=rebatchClose", {id: originalData.id}, function (t) {
                200 === t.status && t.msg && t.msg.length ? 1 == t.msg[0].isSuccess ? ($("#mark").removeClass("has-closed"), e.enableEdit(), $("#groupBtn").html((billRequiredCheck ? e.btn_turn : "") + e.btn_edit + e.btn_reaudit + e.btn_close), "150502" == e.classes.getValue() ? $("#turn").html("生成退货单") : $("#turn").html("生成购货单"), parent.Public.tips({content: "开启成功！"})) : parent.Public.tips({
                            type: 1,
                            content: "开启失败：" + t.msg[0].msg || ""
                        }) : parent.Public.tips({type: 1, content: t.msg})
            })
        }), $(".wrapper").on("click", "#add", function (t) {
            t.preventDefault(), Business.verifyRight("PO_ADD") && parent.tab.overrideSelectedTabItem({
                tabid: "purchase-purchaseOrder",
                text: "购货订单",
                url: "/scm/invPo.do?action=initPo"
            })
        }), $(".wrapper").on("click", "#print", function (t) {
            t.preventDefault(), Business.verifyRight("PO_PRINT") && Public.print({
                title: "购货订单列表",
                $grid: $("#grid"),
                pdf: "/scm/invPo.do?action=toPdf",
                billType: 10301,
                filterConditions: {id: originalData.id}
            })
        }), this.$_accountInfo.click(function () {
            var t = $(this).data("accountInfo");
            e.chooseAccount(t)
        }), $(".wrapper").on("click", "#turn", function (t) {
            if (Business.verifyRight("PU_ADD")) {
                var a = !0;
                if ($.ajax({
                        async: !1,
                        url: "../scm/invPu.do?action=queryOrderALlNum",
                        data: {id: originalData.id, transtype: e.classes.getValue()},
                        dataType: "JSON",
                        type: "post",
                        success: function (t) {
                            t.data.num || (parent.Public.tips({type: 1, content: "该订单已全部生成购货单！"}), a = !1)
                        },
                        error: function (t) {
                        }
                    }), a && ($.ajax({
                        async: !1,
                        url: "../scm/invPu.do?action=getBillState",
                        data: {id: originalData.id, transtype: e.classes.getValue()},
                        dataType: "JSON",
                        type: "post",
                        success: function (t) {
                            "2" == t.data.state && (parent.Public.tips({type: 1, content: "该订单已全部入库，不能生成购货单！"}), a = !1)
                        },
                        error: function (t) {
                        }
                    }), a))if ($(this).hasClass("ui-btn-dis")) parent.Public.tips({
                    type: 1,
                    content: "该订单已全部入库，不能生成购货单！"
                }); else {
                    var i = "购货单", n = "purchase-purchase", o = e.classes.getValue();
                    if ("150502" == o)var i = "购货退货单", n = "purchase-purchaseBack";
                    parent.tab.addTabItem({
                        tabid: n,
                        text: i,
                        url: "/scm/invPu.do?action=initPur&id=" + originalData.id + "&flag=list&turn&transType=" + o
                    }), parent.tab.reload(n)
                }
            }
        }), $("#prev").click(function (t) {
            if (t.preventDefault(), $(this).hasClass("ui-btn-prev-dis"))return parent.Public.tips({
                type: 2,
                content: "已经没有上一张了！"
            }), !1;
            e.idPostion = e.idPostion - 1, 0 === e.idPostion && $(this).addClass("ui-btn-prev-dis"), loading = $.dialog.loading("数据加载中...", 1e3, "loading.gif", !0), Public.ajaxGet("/scm/invPo.do?action=update", {id: e.idList[e.idPostion]}, function (t) {
                originalData.id = e.idList[e.idPostion], THISPAGE.reloadData(t.data), $("#next").removeClass("ui-btn-next-dis"), loading && loading.close()
            })
        }), $("#next").click(function (t) {
            if (t.preventDefault(), $(this).hasClass("ui-btn-next-dis"))return parent.Public.tips({
                type: 2,
                content: "已经没有下一张了！"
            }), !1;
            e.idPostion = e.idPostion + 1, e.idLength === e.idPostion + 1 && $(this).addClass("ui-btn-next-dis"), loading = $.dialog.loading("数据加载中...", 1e3, "loading.gif", !0), Public.ajaxGet("/scm/invPo.do?action=update", {id: e.idList[e.idPostion]}, function (t) {
                originalData.id = e.idList[e.idPostion], THISPAGE.reloadData(t.data), $("#prev").removeClass("ui-btn-prev-dis"), loading && loading.close()
            })
        }), THISPAGE.$_barCodeInsert.click(function (t) {
            var a = 1;
            THISPAGE.$_barCodeInsert.hasClass("open") ? (THISPAGE.$_barCodeInsert.removeClass("open"), THISPAGE.$_barCodeInsert.addClass("close"), a = null) : (THISPAGE.$_barCodeInsert.addClass("open"), THISPAGE.$_barCodeInsert.removeClass("close")), e.goodsEdittypeInit(), $.cookie("BarCodeInsert", a)
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
        for (var t = $("#grid").jqGrid("getDataIDs"), e = 0, a = 0, i = 0, n = 0, o = 0, r = 0, s = t.length; r < s; r++) {
            var d = t[r], l = $("#grid").jqGrid("getRowData", d);
            $("#" + d).data("goodsInfo") && (l.qty && (e += parseFloat(l.qty)), l.deduction && (a += parseFloat(l.deduction)), l.amount && (i += parseFloat(l.amount)), l.tax && (n += parseFloat(l.tax)), l.taxAmount && (o += parseFloat(l.taxAmount)))
        }
        $("#grid").jqGrid("footerData", "set", {qty: e, deduction: a, amount: i, tax: n, taxAmount: o});
        var u = taxRequiredCheck ? o : i, c = Number(this.$_deduction.val()) || 0, m = (u ? c / u * 100 : 0).toFixed(2);
        this.$_discountRate.val(m);
        var p = (u - Number(c)).toFixed(2);
        this.$_discount.val(p);
        var h = (p - Number(this.$_payment.val())).toFixed(2);
        h = Number(h) ? h : "0.00", this.$_discount.val(p), this.$_arrears.val(h)
    }, _getEntriesData: function () {
        for (var t = [], e = $("#grid").jqGrid("getDataIDs"), a = 0, i = e.length; a < i; a++) {
            var n, o = e[a], r = $("#grid").jqGrid("getRowData", o);
            if ("" !== r.goods) {
                var s = $("#" + o).data("goodsInfo"), d = $("#" + o).data("storageInfo"), l = $("#" + o).data("skuInfo") || {};
                if (s.invSkus && s.invSkus.length > 0 && !l.id)return parent.Public.tips({
                    type: 2,
                    content: "请选择相应的属性！"
                }), $("#grid").jqGrid("editCellByColName", o, "skuName"), !1;
                if (!d || !d.id)return parent.Public.tips({
                    type: 2,
                    content: "请选择相应的仓库！"
                }), $("#grid").jqGrid("editCellByColName", o, "locationName"), !1;
                var u = $("#" + o).data("unitInfo") || {};
                $("#grid").jqGrid("getRowData", o);
                n = {
                    invId: s.id,
                    invNumber: s.number,
                    invName: s.name,
                    invSpec: s.spec || "",
                    skuId: l.id || -1,
                    skuName: l.name || "",
                    unitId: u.unitId || -1,
                    mainUnit: u.name || "",
                    qty: r.qty,
                    price: r.price,
                    taxPrice: r.taxPrice,
                    discountRate: r.discountRate,
                    deduction: r.deduction,
                    amount: r.amount,
                    goodsDiscountRate: r.goodsDiscountRate,
                    description: r.description,
                    locationId: d.id,
                    locationName: d.name,
                    srcOrderEntryId: r.srcOrderEntryId,
                    srcOrderId: r.srcOrderId,
                    srcOrderNo: r.srcOrderNo
                }, taxRequiredCheck && (n.taxRate = r.taxRate, n.tax = r.tax, n.taxAmount = r.taxAmount), t.push(n)
            }
        }
        return t
    }, getPostData: function () {
        var t = this, e = this;
        null !== curRow && null !== curCol && ($("#grid").jqGrid("saveCell", curRow, curCol), curRow = null, curCol = null);
        var a = e.$_customer.find("input");
        if ("" === a.val())return e.$_customer.removeData("contactInfo"), parent.Public.tips({
            type: 2,
            content: "请选择供应商！"
        }), e.customerCombo.active = !0, e.customerCombo.doQuery(), e.customerCombo.input.focus(), !1;
        var i = e.$_customer.data("contactInfo");
        if (!i || !i.id)return setTimeout(function () {
            a.focus().select()
        }, 15), parent.Public.tips({type: 2, content: "当前供应商不存在！"}), !1;
        var n = this._getEntriesData();
        if (!n)return !1;
        if (n.length > 0) {
            var o = $.trim(t.$_note.val()), r = {
                id: originalData.id,
                buId: i.id,
                contactName: i.name,
                date: $.trim(t.$_date.val()),
                deliveryDate: $.trim(t.$_deliveryDate.val()),
                billNo: $.trim(t.$_number.text()),
                transType: t.classes.getValue(),
                entries: n,
                totalQty: $("#grid").jqGrid("footerData", "get").qty.replace(/,/g, ""),
                totalAmount: $("#grid").jqGrid("footerData", "get").amount.replace(/,/g, ""),
                description: o === t.$_note[0].defaultValue ? "" : o,
                disRate: $.trim(t.$_discountRate.val()),
                disAmount: $.trim(t.$_deduction.val()),
                amount: $.trim(t.$_discount.val())
            };
            return taxRequiredCheck && (r.totalTax = $("#grid").jqGrid("footerData", "get").tax.replace(/,/g, ""), r.totalTaxAmount = $("#grid").jqGrid("footerData", "get").taxAmount.replace(/,/g, "")), r
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
        tabid: "purchase-purchaseOrderList",
        text: "购货订单记录",
        url: "/scm/invPo.do?action=initPoList"
    })
});
var hasLoaded = !1, originalData;
$(function () {
    if (urlParam.id) {
        if (!hasLoaded) {
            var t = $(".bills").hide();
            if (urlParam.turn) Public.ajaxGet("/scm/invPo.do?action=queryDetails", {
                id: urlParam.id,
                transtype: _self.classes.getValue()
            }, function (e) {
                200 === e.status ? ((originalData = e.data).id = -1, originalData.orderId = e.data.id, originalData.orderNo = e.data.billNo, originalData.status = "add", THISPAGE.init(e.data), t.show(), hasLoaded = !0) : parent.Public.tips({
                        type: 1,
                        content: e.msg
                    })
            }); else if (urlParam.turnBygoodList) {
                originalData = {
                    id: -1,
                    status: "add",
                    customer: 0,
                    transType: urlParam.transType,
                    entries: [{id: "1"}, {id: "2"}, {id: "3"}, {id: "4"}, {id: "5"}],
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
                }, "150502" === urlParam.transType ? originalData.transType = "150502" : "160701" === urlParam.transType ? originalData.transType = "160701" : originalData.transType = "150501", THISPAGE.init(originalData), t.show(), hasLoaded = !0;
                var e = {};
                e = urlParam.goodsIds ? parent[urlParam.fn].data : parent.cachePurView;
                for (var a = [], i = {}, n = 0; n < e.length; n++) {
                    var o = e[n];
                    i[o.id] || a.push(o.id), i[o.id] = {
                        id: o.id,
                        qty: o.qty,
                        skuId: o.skuId,
                        skuName: o.skuName,
                        unitName: o.unitName,
                        unitId: o.unitId,
                        locationName: o.locationName,
                        locationId: o.locationId
                    }
                }
                if (!a.length)return;
                Public.ajaxPost("/basedata/inventory.do?action=list", {ids: a.join()}, function (t) {
                    if (200 === t.status) {
                        var a = t.data.rows || {};
                        curRow = THISPAGE.curID = 1;
                        var i = 1;
                        newId = THISPAGE.newId;
                        for (var n = 0; n < e.length; n++) {
                            var o = e[n];
                            if ("object" == (void 0 === o ? "undefined" : _typeof(o))) {
                                for (var r = 0; r < a.length; r++) {
                                    var s = a[r];
                                    o.id == s.id && (o = $.extend({}, s, o))
                                }
                                if (o) {
                                    if (delete o.amount, "" === o.spec) d = o.number + " " + o.name; else var d = o.number + " " + o.name + "_" + o.spec;
                                    if (i) l = i; else var l = newId;
                                    if ((t = $.extend(!0, {}, o)).goods = d, t.id = l, t.qty = t.qty || 1, i) u = $("#grid").jqGrid("setRowData", Number(i), {}); else {
                                        var u = $("#grid").jqGrid("addRowData", Number(newId), {}, "last");
                                        newId++
                                    }
                                    o.isSerNum = 0 == o.isSerNum ? 0 : 1, u && $("#" + l).data("goodsInfo", o).data("storageInfo", {
                                        id: o.locationId,
                                        name: o.locationName
                                    }).data("unitInfo", {
                                        unitId: o.unitId,
                                        name: o.unitName
                                    }).data("skuInfo", {
                                        id: o.skuId,
                                        name: o.skuName
                                    }), $("#grid").jqGrid("setRowData", l, {goods: t.goods}), curRow++, i = $("#" + i).next().length > 0 ? $("#" + i).next().attr("id") : ""
                                }
                            }
                        }
                        "" === i && ($("#grid").jqGrid("addRowData", newId, {}, "last"), THISPAGE.newId = newId + 1), setTimeout(function () {
                            $("#grid").jqGrid("editCell", curRow, 2, !0)
                        }, 10), THISPAGE.calTotal()
                    } else parent.Public.tips({type: 1, content: t.msg})
                })
            } else Public.ajaxGet("/scm/invPo.do?action=update", {id: urlParam.id}, function (e) {
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
        transType: 150501,
        entries: [{id: "1"}, {id: "2"}, {id: "3"}, {id: "4"}, {id: "5"}],
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
    }, "150502" === urlParam.transType ? originalData.transType = "150502" : originalData.transType = "150501", THISPAGE.init(originalData)
});