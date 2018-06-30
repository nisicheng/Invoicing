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
    }, curRow, curCol, loading, SYSTEM = system = parent.SYSTEM, billRequiredCheck = system.billRequiredCheck, requiredMoney = system.requiredMoney, taxRequiredCheck = system.taxRequiredCheck, taxRequiredInput = system.taxRequiredInput, hiddenAmount = !1, hiddenExpense = !1, hideCustomerCombo = !1, urlParam = Public.urlParam();
if (urlParam.id)var url_id = urlParam.id;
var disEditable = urlParam.disEditable, defaultPage = Public.getDefaultPage(), qtyPlaces = Number(parent.SYSTEM.qtyPlaces), pricePlaces = Number(parent.SYSTEM.pricePlaces), amountPlaces = Number(parent.SYSTEM.amountPlaces), isCopy = !1, dia_unitId, dia_qty, THISPAGE = {
    init: function (t) {
        "150502" == urlParam.transType ? this.mod_PageConfig = Public.mod_PageConfig.init("purchaseBack") : this.mod_PageConfig = Public.mod_PageConfig.init("purchase"), !1 !== SYSTEM.isAdmin || SYSTEM.rights.AMOUNT_INAMOUNT || (hiddenAmount = !0, $("#amountArea").hide()), (!1 === SYSTEM.isAdmin && !SYSTEM.rights.AMOUNT_INAMOUNT || "150502" == urlParam.transType) && (hiddenExpense = !0), this.initDom(t), this.loadGrid(t), this.initCombo(), t.id > 0 && t.checked ? this.disableEdit() : (this.editable = !0, $("#grid").jqGrid("setGridParam", {cellEdit: !0})), this.addEvent(), $.cookie("BarCodeInsert") && (THISPAGE.$_barCodeInsert.addClass("open"), THISPAGE.$_barCodeInsert.removeClass("close")), this.goodsEdittypeInit(), this.triggerEdit()
    }, initDom: function (t) {
        var e = this;
        this.$_customer = $("#customer"), this.$_date = $("#date").val(t.date || system.endDate), this.$_number = $("#number"), this.$_note = $("#note"), this.$_discountRate = $("#discountRate"), this.$_deduction = $("#deduction"), this.$_discount = $("#discount"), this.$_payment = $("#payment"), this.$_arrears = $("#arrears"), this.$_totalArrears = $("#totalArrears"), this.$_toolTop = $("#toolTop"), this.$_toolBottom = $("#toolBottom"), this.$_paymentTxt = $("#paymentTxt"), this.$_accountInfo = $("#accountInfo"), this.$_userName = $("#userName"), this.$_modifyTime = $("#modifyTime"), this.$_modifyName = $("#modifyName"), this.$_createTime = $("#createTime"), this.$_checkName = $("#checkName"), this.$_checkTime = $("#checkTime"), this.customerArrears = 0, this.$_note.placeholder(), this.$_purExpense = $("#purExpense"), this.$_expenseInfo = $("#expenseInfo"), "150502" == urlParam.transType ? $("#preferential").html("退款优惠:") : $("#preferential").html("付款优惠:"), "150502" == originalData.transType ? (parent.$("#page-tab").find("li.l-selected").children("a").html("购货退货单"), $("#paymentTxt").html("本次退款:"), $("#doExpense").hide(), $(".linkToCheck").on("click", function (t) {
                t.preventDefault(), parent.tab.addTabItem({
                    tabid: "purchase-purchaseBackList",
                    text: "购货退货单记录",
                    url: "/scm/invPu.do?action=initPurList&transType=150502"
                })
            })) : (parent.$("#page-tab").find("li.l-selected").children("a").html("购货单"), $("#paymentTxt").html("本次付款:")), this.customerCombo = Business.billSupplierCombo($("#customer"), {
            defaultSelected: t.buId ? ["id", t.buId] : 0,
            callback: {
                onChange: function (t) {
                    e.$_customer.data("contactInfo", t)
                }
            }
        }), "add" !== t.status || t.buId ? t.buId ? (this.$_customer.data("contactInfo", {
                    id: t.buId,
                    name: t.contactName.split(" ")[1],
                    number: t.contactName.split(" ")[0],
                    cLevel: t.cLevel,
                    taxRate: t.taxRate
                }), this.customerCombo.input.val(t.contactName)) : this.customerCombo.input.val(t.contactName) : Public.ajaxPost("/basedata/contact.do?action=getRecentlyContact", {
                transType: originalData.transType,
                billType: "PUR"
            }, function (t) {
                var a = {id: (t = t.data).buId, name: t.contactName, cLevel: t.cLevel, taxRate: t.taxRate};
                e.$_customer.data("contactInfo", a), e.customerCombo.input.val(t.number + " " + t.contactName)
            }), hideCustomerCombo && this.customerCombo.disable(), this.$_date.datepicker({
            onSelect: function (t) {
                if (!(originalData.id > 0)) {
                    var a = t.format("yyyy-MM-dd");
                    e.$_number.text(""), Public.ajaxPost("/basedata/systemProfile.do?action=generateDocNo", {
                        billType: "PUR",
                        billDate: a
                    }, function (t) {
                        200 === t.status ? e.$_number.text(t.data.billNo) : parent.Public.tips({
                                type: 1,
                                content: t.msg
                            })
                    })
                }
            }
        }), this.$_note.val(t.description || ""), this.$_discountRate.val(t.disRate), this.$_deduction.val(t.disAmount), this.$_discount.val(t.amount);
        var a = t.rpAmount, i = t.arrears;
        if (SYSTEM.autoFillSettAmount && t.accounts.length < 2 && "add" === t.status && (SYSTEM.isAdmin || SYSTEM.rights.SettAcct_QUERY) && (a = t.rpAmount || t.amount, i = Number(t.amount) - Number(a)), this.$_payment.val(a), this.$_arrears.val(i), t.feeBill) {
            var n = 0;
            $.each(t.feeBill, function (t, e) {
                n += Number(e.amount)
            }), this.$_expenseInfo.data("expenseInfo", t.feeBill), this.$_purExpense.val(n)
        } else this.$_purExpense.val("0.00");
        if (requiredMoney)if ($("#accountWrap").show(), !1 !== SYSTEM.isAdmin || SYSTEM.rights.SettAcct_QUERY) {
            var r = "";
            if ("add" === t.status) {
                for (var o in SYSTEM.accountInfo)o++;
                for (var s = 0; s < o; s++)"1" === SYSTEM.accountInfo[s].isdefault && (r = SYSTEM.accountInfo[s].id);
                r = r || 0, (f = []).push({
                    accId: r,
                    account: "",
                    payment: e.$_payment.val(),
                    wayId: 0,
                    way: "",
                    settlement: ""
                }), e.$_accountInfo.data("accountInfo", f).hide(), e.$_payment.removeAttr("disabled").removeClass("ui-input-dis")
            } else r = t.accId;
            this.accountCombo = Business.accountCombo($("#account"), {
                width: 112,
                height: 300,
                emptyOptions: !0,
                addOptions: {text: "多账户", value: -1},
                defaultSelected: ["id", r],
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
            })
        } else this.accountCombo = Business.accountCombo($("#account"), {
            width: 112,
            height: 300,
            data: [],
            editable: !1,
            disabled: !0,
            addOptions: {text: "(没有账户管理权限)", value: 0}
        });
        var d = '<a id="savaAndAdd" class="ui-btn ui-btn-sp">保存并新增</a><a id="save" class="ui-btn">保存</a>', l = '<a id="add" class="ui-btn ui-btn-sp">新增</a><a id="copy" class="ui-btn">复制</a><a href="/scm/invPu.do?action=toPdf&id=' + t.id + '" target="_blank" id="print" class="ui-btn">打印</a><a id="edit" class="ui-btn">保存</a>', u = '<a id="add" class="ui-btn ui-btn-sp">新增</a><a id="copy" class="ui-btn">复制</a><a href="/scm/invPu.do?action=toPdf&id=' + t.id + '" target="_blank" id="print" class="ui-btn">打印</a>', c = "";
        "150501" == originalData.transType && (c = '<a id="toPuReturn" class="ui-btn ui-btn-sc">生成购货退货单</a>'), 1 == SYSTEM.ISSERNUM && (l += '<a id="SN_export" class="ui-btn">导出SN</a>', u += '<a id="SN_export" class="ui-btn">导出SN</a>');
        var m = "", p = "";
        billRequiredCheck ? (m = '<a class="ui-btn" id="audit">审核</a>', p = '<a class="ui-btn" id="reAudit">反审核</a>') : (this.$_checkName.parent().hide(), this.$_checkTime.parent().hide());
        var h = '<a class="ui-btn-prev" id="prev" title="上一张"><b></b></a><a class="ui-btn-next" id="next" title="下一张"><b></b></a>';
        if (this.btn_add = d, this.btn_edit = l, this.btn_audit = m, this.btn_view = u, this.btn_puReturn = c, this.btn_p_n = h, this.btn_reaudit = p, t.id > 0) {
            if (this.$_number.text(t.billNo), $("#editBills").css("display", "none"), this.$_date.val(t.date), this.$_totalArrears.val(t.totalArrears), t.accounts.length > 0) this.$_accountInfo.data("accountInfo", t.accounts); else {
                var f = [{accId: 0, account: "", payment: this.$_payment.val(), wayId: 0, way: "", settlement: ""}];
                this.$_accountInfo.data("accountInfo", f)
            }
            -1 === t.accId && (this.$_accountInfo.show(), e.$_payment.attr("disabled", "disabled").addClass("ui-input-dis")), $("#grid").jqGrid("footerData", "set", {
                qty: t.totalQty,
                amount: t.totalAmount
            }), "list" !== urlParam.flag && (h = ""), "edit" === t.status ? (t.checked || !billRequiredCheck ? this.$_toolBottom.html("<span id=groupBtn>" + c + l + m + "</span>" + h) : this.$_toolBottom.html("<span id=groupBtn>" + l + m + "</span>" + h), this.$_checkTime.parent().hide(), this.$_checkName.parent().hide()) : t.checked ? ($("#mark").addClass("has-audit"), this.$_toolBottom.html('<span id="groupBtn">' + c + u + p + "</span>" + h)) : (this.$_toolBottom.html('<span id="groupBtn">' + u + "</span>" + h), this.$_checkTime.parent().hide(), this.$_checkName.parent().hide()), originalData.billStatus && "2" == originalData.billStatus && "150501" == originalData.transType && $("#toPuReturn").addClass("ui-btn-dis"), "150502" == t.transType ? ($("#toPuReturn").remove(), this.idList = parent.cacheList.purchaseBackId || []) : this.idList = parent.cacheList.purchaseId || [], this.idPostion = $.inArray(String(t.id), this.idList), this.idLength = this.idList.length, 0 === this.idPostion && $("#prev").addClass("ui-btn-prev-dis"), this.idPostion === this.idLength - 1 && $("#next").addClass("ui-btn-next-dis"), this.$_userName.html(t.userName), this.$_modifyTime.html(t.modifyTime), this.$_modifyName.html(t.modifyName), this.$_createTime.html(t.createTime), this.$_checkName.html(t.checkName), this.$_checkTime.html(t.checkTime)
        } else billRequiredCheck ? this.$_toolBottom.html("<span id=groupBtn>" + d + m + "</span>") : this.$_toolBottom.html('<span id="groupBtn">' + d + "</span>"), this.$_userName.html(system.realName || ""), this.$_modifyTime.parent().hide(), this.$_modifyName.parent().hide(), this.$_createTime.parent().hide(), this.$_checkName.parent().hide(), this.$_checkTime.parent().hide();
        disEditable && (THISPAGE.disableEdit(), this.$_toolBottom.hide())
    }, loadGrid: function (t) {
        function e(t) {
            return Math.round(100 * t) / 100
        }

        function a(t) {
            if (taxRequiredCheck) {
                var e = $("#grid").jqGrid("getRowData", t), a = parseFloat(e.taxRate) || 0;
                if ($.isNumeric(a)) {
                    var i = parseFloat(e.amount), n = i * a / 100, r = i + n;
                    $("#grid").jqGrid("setRowData", t, {tax: n, taxAmount: r})
                }
            }
        }

        function i(t) {
            if (t)var e = t.toString().replace(",", "");
            t = parseFloat(e);
            var a = qtyPlaces;
            if (0 === t || isNaN(t))return "";
            var i = /(\d{1,3})(?=(\d{3})+(?:$|\D))/g;
            return (t = t.toFixed(a).split("."))[1] ? t[0].replace(i, "$1,") + "." + t[1] : t[0].replace(i, "$1,")
        }

        function n(t, e) {
            return $(".priceAuto")[0]
        }

        function r(t, e, a) {
            if ("get" === e)return t.val().split("：")[1] || t.val() || "";
            "set" === e && $("input", t).val(a)
        }

        function o() {
            $("#initCombo").append($(".priceAuto").val(""))
        }

        function s(t) {
            var e = $("#" + t).data("goodsInfo"), a = $.extend(!0, {}, e);
            if (!$.isEmptyObject(a)) {
                1 == a.isWarranty && $("#grid").jqGrid("showCol", "batch"), a.safeDays > 0 && $("#grid").jqGrid("showCol", ["prodDate", "safeDays", "validDate"]);
                var i = Business.setPurRowData(t), n = $("#" + t).data("skuInfo") || i.getSkuInfo(), r = $("#" + t).data("unitInfo") || i.getUnitInfo(), o = i.getTaxRate(), s = i.getPrice();
                $("#" + t).data("skuInfo", n), $("#" + t).data("unitInfo", r);
                var d = {
                    barCode: a.barCode,
                    skuName: n.name,
                    mainUnit: a.mainUnit || a.unitName,
                    unitId: r.unitId,
                    qty: a.qty || 1,
                    price: s.thePrice,
                    taxPrice: s.theTaxPrice,
                    discountRate: a.discountRate || 0,
                    deduction: a.deduction || 0,
                    locationName: a.locationName,
                    locationId: a.locationId,
                    taxRate: o || 0,
                    srcOrderNo: a.srcOrderNo || "",
                    srcOrderEntryId: a.srcOrderEntryId || "",
                    srcOrderId: a.srcOrderId || "",
                    serNumList: a.serNumList,
                    safeDays: a.safeDays || "",
                    isSerNum: a.isSerNum
                };
                SYSTEM.ISSERNUM && 1 == a.isSerNum && (d.qty = d.serNumList ? d.serNumList.length : 0), d = $.extend(!0, d, i.setAmount(d.qty));
                var l = $("#grid").jqGrid("setRowData", t, d);
                invorder = "", l && (THISPAGE.calTotal(), issearch = 0, invorder = "STR")
            }
        }

        var d, l, u = this, c = (new Date).format();
        if (t.id) {
            var m = 5 - t.entries.length;
            if (m > 0)for (var p = 0; p < m; p++)t.entries.push({})
        }
        u.newId = 6;
        var h = !1;
        1 === SYSTEM.siType && (h = !0);
        var f = !0;
        "150502" == originalData.transType && "puToBack" == urlParam.turnType && (f = !1);
        var g = [{
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
            width: 300,
            nameExt: '<label> -- 扫描枪录入</label><span id="barCodeInsert" class="close"><span class="ui-icon-circle"></span></span>',
            classes: "goods",
            formatter: function (t, e, a) {
                return t ? "undefined undefined" == t ? "&#160;" : (s(e.rowId), t) : a.invNumber ? a.invSpec ? a.invNumber + " " + a.invName + "_" + a.invSpec : a.invNumber + " " + a.invName : "&#160;"
            },
            editable: !0,
            enterCallback: function (t, e, a) {
                if (THISPAGE.$_barCodeInsert.hasClass("open")) {
                    if (Business.filterBarcodeGood())return;
                    var i = function (t) {
                        var e = $("#" + t), a = e.next(), i = e.index() + 1;
                        return 0 == a.length ? ($("#grid").jqGrid("addRowData", THISPAGE.newId, {}, "last"), THISPAGE.newId++, $("#" + (THISPAGE.newId - 1)).index()) : a.data("goodsInfo") ? arguments.callee(i) : i
                    }(THISPAGE.curID);
                    $("#grid").jqGrid("nextCell", i, 1)
                } else 0 != $("#grid")[0].p.savedRow.length && $("#grid").jqGrid("nextCell", $("#grid")[0].p.savedRow[0].id, $("#grid")[0].p.savedRow[0].ic)
            }
        }, {name: "barCode", label: "商品条码", hideDefault: !0, width: 120, hidden: !0}, {
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
            },
            align: "left"
        }, {name: "srcQty", label: "可退数量", width: 80, align: "right", editable: !1, hidden: f}, (d = {
            name: "batch",
            label: "批次",
            nameExt: '<small id="batchBatch">批量</small>',
            width: 90,
            classes: "ui-ellipsis batch",
            hidden: !0,
            title: !1,
            editable: !0,
            align: "left",
            edittype: "custom"
        }, _defineProperty(d, "edittype", "custom"), _defineProperty(d, "editoptions", {
            custom_element: function (t, e) {
                return $(".batchAuto")[0]
            }, custom_value: function (t, e, a) {
                if ("get" === e)return t.val();
                "set" === e && $("input", t).val(a)
            }, handle: function () {
                $("#initCombo").append($(".batchAuto").val(""))
            }, trigger: "ui-icon-ellipsis"
        }), d), (l = {
            name: "prodDate",
            label: "生产日期",
            width: 90,
            hidden: !0,
            title: !1,
            editable: !0,
            edittype: "custom"
        }, _defineProperty(l, "edittype", "custom"), _defineProperty(l, "editoptions", {
            custom_element: function (t, e) {
                return $(".dateAuto")[0]
            }, custom_value: function (t, e, a) {
                if ("get" === e)return t.val();
                "set" === e && $("input", t).val(a)
            }, handle: function () {
                $("#initCombo").append($(".dateAuto"))
            }
        }), l), {
            name: "safeDays",
            label: "保质期(天)",
            width: 90,
            hidden: !0,
            title: !1,
            addClassign: "left"
        }, {name: "validDate", label: "有效期至", width: 90, hidden: !0, title: !1, align: "left"}, {
            name: "producer",
            label: "产地",
            width: 90,
            hideDefault: !0,
            hidden: !0,
            title: !1,
            align: "left",
            editable: !0
        }, {
            name: "registrationNo",
            label: "注册证号",
            width: 90,
            hideDefault: !0,
            hidden: !0,
            title: !1,
            align: "left",
            editable: !0
        }, {
            name: "proLicense",
            label: "生产许可证",
            width: 90,
            hideDefault: !0,
            hidden: !0,
            title: !1,
            align: "left",
            editable: !0
        }, {
            name: "qty",
            label: '<span class="red">*</span>数量',
            width: 80,
            align: "right",
            classes: "right",
            unformat: function (t, e, a) {
                e.colModel.formatter;
                var i, n, r = e.colModel.formatoptions || {}, o = /([\.\*\_\'\(\)\{\}\+\?\\])/g;
                return n = (r = $.extend({}, ($.jgrid.formatter || {}).currency, r)).thousandsSeparator.replace(o, "\\$1"), stripTag = new RegExp(n, "g"), i = $(a).text(), r.prefix && r.prefix.length && (i = i.substr(r.prefix.length)), r.suffix && r.suffix.length && (i = i.substr(0, i.length - r.suffix.length)), i = i.replace(stripTag, "").replace(r.decimalSeparator, ".").replace("SN", "")
            },
            formatter: function (t, e, a) {
                var t = i(t), n = $("#" + e.rowId).data("goodsInfo");
                return "合计" !== a.goods && (Number(a.isSerNum) || n && "1" == n.isSerNum || a.invSerNumList) && ("150502" == originalData.transType && n && a.skuName && a.skuName !== n.skuName && (t = ""), n && n.serNumList && n.serNumList.length > 0 || a.invSerNumList ? "" == t ? (n.serNumList = [], t = "<span class='qtyInsert'>SN</span>") : t = "<span class='qtyInsertAfter'>SN</span>" + t : t = "<span class='qtyInsert'>SN</span>"), t || "&#160;"
            },
            formatoptions: {decimalPlaces: qtyPlaces},
            trigger: "qtyInsert",
            editable: !0,
            edittype: "custom",
            editoptions: {
                custom_element: function (t, e) {
                    return $('<input type="text" class="textbox"/>')[0]
                }, custom_value: function (t, e, a) {
                    if (!(t = $(t)).closest("tr").data("goodsInfo"))return "";
                    if ("get" === e) {
                        var i = t.val();
                        return "&#160;" == i && (i = ""), i || ""
                    }
                    "set" === e && t.val(a)
                }, handle: function () {
                }
            }
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
            editoptions: {custom_element: n, custom_value: r, handle: o, trigger: "ui-icon-triangle-1-s"}
        }];
        taxRequiredCheck && g.push({
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
            editoptions: {custom_element: n, custom_value: r, handle: o, trigger: "ui-icon-triangle-1-s"}
        }), g.push({
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
        }, {name: "isSerNum", label: "是否有序列号", hidden: !0}, {name: "prices", label: "销售价格数组", hidden: !0}, {
            name: "amount",
            label: "购货金额",
            hidden: hiddenAmount,
            width: 100,
            fixed: !0,
            align: "right",
            formatter: "currency",
            formatoptions: {showZero: !0, decimalPlaces: amountPlaces},
            editable: !0
        }), this.calAmount = "amount", taxRequiredCheck && (g.pop(), g.push({
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
        }), this.calAmount = "taxAmount"), g.push({
            name: "shareAmount",
            label: "采购费用",
            hidden: hiddenExpense,
            width: 100,
            title: !0,
            align: "right",
            formatter: "currency",
            editable: !0
        }, {name: "description", label: "备注", width: 150, title: !0, editable: !0}, {
            name: "srcOrderEntryId",
            label: "源单分录ID",
            width: 0,
            hidden: !0
        }, {name: "srcOrderId", label: "源单ID", width: 0, hidden: !0}, {
            name: "srcOrderNo",
            label: "关联购货订单号",
            width: 120,
            fixed: !0,
            hidden: h,
            formatter: function (t, e, a) {
                return t && (hideCustomerCombo = !0), t || "&#160;"
            }
        }, {name: "srcBillId", label: "原购货单号id", title: !0, hidden: !0}, {
            name: "srcBillEntryId",
            label: "原购货单号体id",
            title: !0,
            hidden: !0
        }, {name: "srcBillNo", label: "原购货单号", width: 150, title: !0, hidden: f});
        u.mod_PageConfig.gridReg("grid", g), g = u.mod_PageConfig.conf.grids.grid.colModel, $("#grid").jqGrid({
            data: t.entries,
            datatype: "clientSide",
            autowidth: !0,
            height: "100%",
            rownumbers: !0,
            gridview: !0,
            onselectrow: !1,
            colModel: g,
            cmTemplate: {sortable: !1, title: !1},
            shrinkToFit: !1,
            forceFit: !0,
            rowNum: 1e3,
            cellEdit: !1,
            cellsubmit: "clientArray",
            localReader: {root: "rows", records: "records", repeatitems: !1, id: "id"},
            jsonReader: {root: "data.entries", records: "records", repeatitems: !1, id: "id"},
            loadComplete: function (t) {
                if (THISPAGE.$_barCodeInsert = $("#barCodeInsert"), urlParam.id > 0) {
                    var e = t.rows, a = e.length;
                    u.newId = a + 1;
                    for (var i = 0; i < a; i++) {
                        var n = i + 1, r = e[i];
                        if ($.isEmptyObject(e[i]))break;
                        var o = $.extend(!0, {
                            id: r.invId,
                            number: r.invNumber,
                            name: r.invName,
                            spec: r.invSpec,
                            unitId: r.unitId,
                            unitName: r.mainUnit,
                            prices: r.prices,
                            taxPrice: r.taxPrice,
                            isSerNum: r.isSerNum,
                            serNumList: r.serNumList || r.invSerNumList,
                            skuId: r.skuId,
                            skuName: r.skuName
                        }, r);
                        Business.cacheManage.getGoodsInfoByNumber(o.number, function (t) {
                            o.isSerNum = t.isSerNum, o.isWarranty = r.isWarranty = t.isWarranty, o.safeDays = r.safeDays = t.safeDays, o.barCode = r.barCode = t.barCode, o.invSkus = t.invSkus, o.prices = t.prices, o.taxPrice = t.taxPrice, o.id = r.invId, $("#" + n).data("goodsInfo", o).data("storageInfo", {
                                id: r.locationId,
                                name: r.locationName
                            }).data("unitInfo", {unitId: r.unitId, name: r.mainUnit}).data("skuInfo", {
                                name: r.skuName,
                                id: r.skuId
                            }).data("prices", {id: r.prices})
                        }), 1 == r.isWarranty && $("#grid").jqGrid("showCol", "batch"), r.safeDays > 0 && ($("#grid").jqGrid("showCol", "prodDate"), $("#grid").jqGrid("showCol", "safeDays"), $("#grid").jqGrid("showCol", "validDate"))
                    }
                }
            },
            gridComplete: function () {
                setTimeout(function () {
                    Public.autoGrid($("#grid"))
                }, 10)
            },
            beforeEditCell: function (t, e, a, i, n) {
            },
            afterEditCell: function (t, e, a, i, n) {
                function r() {
                    var e = $("#" + t).data("goodsInfo");
                    if (e) {
                        var a = $("#grid").jqGrid("getRowData", t);
                        (e = $.extend(!0, {}, e)).skuName = a.skuName, e.mainUnit = a.mainUnit, e.unitId = a.unitId, e.qty = a.qty, e.price = a.price, e.customSetPrice = a.price, e.taxPrice = a.taxPrice, e.discountRate = a.discountRate, e.deduction = a.deduction, e.amount = a.amount, e.taxRate = a.taxRate, e.tax = a.tax, e.taxAmount = a.taxAmount, e.locationName = a.locationName, e.srcOrderNo = a.srcOrderNo, $("#" + t).data("goodsInfo", e)
                    }
                }

                if (THISPAGE.curID = t, "goods" === e && (r(), $("#" + i + "_goods", "#grid").val(a), THISPAGE.goodsCombo.selectByText(a)), "skuName" === e) {
                    if (r(), !(d = $("#" + t).data("goodsInfo")) || !d.invSkus || !d.invSkus.length)return $("#grid").jqGrid("restoreCell", i, n), curCol = n + 1, $("#grid").jqGrid("nextCell", i, n + 1), void THISPAGE.skuCombo.loadData([], 1, !1);
                    if ("string" == typeof d.invSkus && (d.invSkus = $.parseJSON(d.invSkus)), $("#" + i + "_skuName", "#grid").val(a), THISPAGE.skuCombo.loadData(d.invSkus || [], -1, !1), THISPAGE.skuCombo.selectByText(a), !d || "150502" != originalData.transType)return;
                    SYSTEM.ISSERNUM && 1 == d.isSerNum && Business.serNumManage({
                        row: $("#" + t),
                        enableStorage: !0,
                        enableSku: !0,
                        isEdit: originalData.status,
                        isCreate: "150502" != originalData.transType
                    })
                }
                if ("qty" === e) {
                    r();
                    var o = $("#" + t);
                    if (!(d = o.data("goodsInfo")))return;
                    $("#" + i + "_qty", "#grid").val(a), SYSTEM.ISSERNUM && 1 == d.isSerNum && Business.serNumManage({
                        row: o,
                        enableStorage: 0 == a,
                        enableSku: 0 == a,
                        isEdit: originalData.status,
                        isQty: !0,
                        isCreate: "150502" != originalData.transType
                    })
                }
                if ("price" === e && $("#" + i + "_price", "#grid").val(a), "taxPrice" === e && $("#" + i + "_taxPrice", "#grid").val(a), "locationName" !== e || ($("#" + i + "_locationName", "#grid").val(a), THISPAGE.storageCombo.selectByText(a), d = $("#" + t).data("goodsInfo"))) {
                    if ("batch" === e) {
                        var s = $(this);
                        if (r(), !(d = $("#" + t).data("goodsInfo")).isWarranty)return;
                        if (!d)return $("#grid").jqGrid("restoreCell", i, n), curCol = n + 1, void $("#grid").jqGrid("nextCell", i, n + 1);
                        if ($("#" + i + "_batch", "#grid").val(a), "150502" == originalData.transType) {
                            $("#grid").jqGrid("setCell", t, "prodDate", "", "not-editable-cell"), $("#grid").jqGrid("setCell", t, "producer", "", "not-editable-cell"), $("#grid").jqGrid("setCell", t, "registrationNo", "", "not-editable-cell"), $("#grid").jqGrid("setCell", t, "proLicense", "", "not-editable-cell"), Business.showBatchDialog(THISPAGE, s, "sales", $("#" + t), "")
                        } else $("#" + i + "_batch", "#grid").val(a), THISPAGE.batchCombo.selectByText(a)
                    }
                    if ("prodDate" === e) {
                        var d = $("#" + t).data("goodsInfo");
                        if (!d)return $("#grid").jqGrid("restoreCell", i, n), curCol = n + 1, void $("#grid").jqGrid("nextCell", i, n + 1);
                        if (!d.safeDays)return $("#grid").jqGrid("restoreCell", i, n), curCol = n + 1, void $("#grid").jqGrid("nextCell", i, n + 1);
                        a ? THISPAGE.cellPikaday.setDate(a) : THISPAGE.cellPikaday.setDate(THISPAGE.cellPikaday.getDate() || new Date)
                    }
                    if ("mainUnit" === e) {
                        $("#" + i + "_mainUnit", "#grid").val(a);
                        var l = $("#" + t).data("unitInfo") || {};
                        if (!l.unitId || "0" === l.unitId)return $("#grid").jqGrid("restoreCell", i, n), curCol = n + 1, void $("#grid").jqGrid("nextCell", i, n + 1);
                        THISPAGE.unitCombo.enable(), THISPAGE.unitCombo.loadData(function () {
                            for (var t = {}, e = 0; e < SYSTEM.unitInfo.length; e++) {
                                var a = SYSTEM.unitInfo[e], i = l.unitId;
                                l.unitId == a.id && (l = a), l.unitId = i;
                                var n = a.unitTypeId || e;
                                t[n] || (t[n] = []), t[n].push(a)
                            }
                            return l.unitTypeId ? t[l.unitTypeId] : [l]
                        }), THISPAGE.unitCombo.selectByText(a)
                    }
                }
            },
            formatCell: function (t, e, a, i, n) {
                if ("qty" == e && a) {
                    var r = a.split("</span>");
                    return 2 === r.length ? r[1] : r[0] || "&160;"
                }
            },
            beforeSaveCell: function (t, e, a, i, n) {
                if ("goods" === e && ((s = $("#" + t).data("goodsInfo")) && !s.isWarranty && ($("#grid").jqGrid("setCell", t, "producer", "", "not-editable-cell"), $("#grid").jqGrid("setCell", t, "registrationNo", "", "not-editable-cell"), $("#grid").jqGrid("setCell", t, "proLicense", "", "not-editable-cell")), !s || THISPAGE.$_barCodeInsert && THISPAGE.$_barCodeInsert.hasClass("open"))) {
                    var r, o = function (e) {
                        $("#" + t).data("goodsInfo", e).data("storageInfo", {
                            id: e.locationId,
                            name: e.locationName
                        }).data("unitInfo", {unitId: e.unitId, name: e.unitName}).data("skuInfo", {
                            id: e.skuId,
                            name: e.skuName
                        }), r = Business.formatGoodsName(e)
                    };
                    return THISPAGE.$_barCodeInsert && THISPAGE.$_barCodeInsert.hasClass("open") ? Business.cacheManage.getGoodsInfoByBarCode($.trim(a), o, !0) : Business.cacheManage.getGoodsInfoByNumber(a, o, !0), r ? ($("#" + t).find(".btn_query_inventory").show(), r) : ($.dialog({
                            width: 775,
                            height: 510,
                            title: "选择商品",
                            content: "url:/settings/goods-batch.jsp",
                            data: {
                                skuMult: SYSTEM.enableAssistingProp, skey: a, callback: function (t, e, a) {
                                    "" === e && ($("#grid").jqGrid("addRowData", t, {}, "last"), u.newId = t + 1), setTimeout(function () {
                                        $("#grid").jqGrid("editCell", a, 2, !0)
                                    }, 10), u.calTotal()
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
                if ("locationName" === e) {
                    var s = $("#" + t).data("goodsInfo");
                    "150502" == urlParam.transType && s.isSerNum && 1 == s.isSerNum && a != s.locationName && $("#grid").jqGrid("setRowData", i, {
                        locationName: a,
                        qty: ""
                    })
                }
                return $("#" + t).find(".btn_query_inventory").show(), a
            },
            afterSaveCell: function (t, i, n, r, o) {
                switch (i) {
                    case"goods":
                        THISPAGE.$_barCodeInsert && THISPAGE.$_barCodeInsert.hasClass("open");
                        var s = $("#grid").jqGrid("getDataIDs"), d = Math.max.apply(null, s) + 1;
                        u.newId;
                        0 == $("#" + t).next().length && ($("#grid").jqGrid("addRowData", d, {}, "last"), u.newId = d + 1);
                        break;
                    case"skuName":
                        $("#" + t).data("goodsInfo").srcOrderNo && $("#grid").jqGrid("setRowData", t, {
                            srcOrderNo: "",
                            srcOrderId: "",
                            srcOrderEntryId: ""
                        });
                        break;
                    case"mainUnit":
                        var l = $(".unitAuto").getCombo().getValue(), m = $("#" + t).data("goodsInfo"), p = $("#grid").jqGrid("getRowData", t);
                        if (m.prices)for (C = 0; C < m.prices.length; C++)if (m.prices[C].unitId == l) {
                            var h = parseFloat($("#grid").jqGrid("getRowData", t).qty), f = m.prices[C].purPrice, g = parseFloat($("#grid").jqGrid("getRowData", t).discountRate), b = parseFloat(p.taxRate);
                            if (SYSTEM.invPriceIsTax && f > 0 && (f = Number(f / Number(1 + Number(b / 100)))), $.isNumeric(f))if ($.isNumeric(g))var v = h * f - (P = h * f * g / 100), y = $("#grid").jqGrid("setRowData", t, {
                                unitId: l,
                                price: f,
                                deduction: P,
                                amount: v
                            }); else y = $("#grid").jqGrid("setRowData", t, {unitId: l, amount: h * f});
                            if ($.isNumeric(b))var I = f * (1 + b / 100), y = $("#grid").jqGrid("setRowData", t, {taxPrice: I});
                            a(t), y && THISPAGE.calTotal()
                        }
                        break;
                    case"qty":
                        var n = parseFloat(n) || 0, p = $("#grid").jqGrid("getRowData", t), f = parseFloat(p.price), g = parseFloat(p.discountRate), I = parseFloat(p.taxPrice), b = parseFloat(p.taxRate) || 0;
                        if (SYSTEM.invPriceIsTax)var v = (S = (n * I * (1 - g / 100)).toFixed(2)) - (T = (S / (1 + b / 100) * b / 100).toFixed(2)), P = (n * I / (1 + b / 100) * g / 100).toFixed(2), y = $("#grid").jqGrid("setRowData", t, {
                            taxAmount: S,
                            tax: T,
                            amount: v,
                            price: f,
                            deduction: P
                        }); else {
                            if ($.isNumeric(f))if ($.isNumeric(g))var v = n * f - (P = n * f * g / 100), D = (100 - n) / 10, y = $("#grid").jqGrid("setRowData", t, {
                                deduction: P,
                                amount: v,
                                goodsDiscountRate: D
                            }); else y = $("#grid").jqGrid("setRowData", t, {amount: n * f});
                            a(t)
                        }
                        y && THISPAGE.calTotal();
                        break;
                    case"price":
                        var n = parseFloat(n) || 0, p = $("#grid").jqGrid("getRowData", t), h = parseFloat(p.qty), b = parseFloat(p.taxRate) || 0, g = parseFloat(p.discountRate), P = parseFloat(p.deduction), _ = 100;
                        if (SYSTEM.qtyPlaces > 2)for (C = 0; C < SYSTEM.qtyPlaces - 2; C++)_ *= 10;
                        g ? P = n * h * g / 100 : g = Business.disRateFormat(Number(P).div(Number(h).mul(Number(n))).mul(100));
                        var T = (v = Math.round((n * h - P) * _) / _) * b / 100, S = Number(Math.round(100 * v) / 100) + Number(Math.round(100 * T) / 100), I = Number(n).mul(1..add(Number(b).div(100)));
                        (y = $("#grid").jqGrid("setRowData", t, {
                            tax: T,
                            taxAmount: S,
                            taxPrice: I,
                            deduction: P,
                            amount: v,
                            discountRate: g
                        })) && THISPAGE.calTotal();
                        break;
                    case"taxPrice":
                        var n = parseFloat(n) || 0, p = $("#grid").jqGrid("getRowData", t), b = parseFloat(p.taxRate), h = parseFloat(p.qty), g = parseFloat(p.discountRate) || 0, P = parseFloat(p.deduction), f = ((v = (S = Math.round(n * h * (1 - g / 100) * 100) / 100) - (T = Number(S / (1 + b / 100) * b / 100))) / h / (1 - g / 100) * 100 / 100).toFixed(10);
                        if (g) {
                            P = f * h * g / 100;
                            D = (100 - g) / 10
                        } else g = Business.disRateFormat(Number(P).div(Number(h).mul(Number(f))).mul(100));
                        (y = $("#grid").jqGrid("setRowData", t, {
                            tax: T,
                            taxAmount: S,
                            price: f,
                            deduction: P,
                            amount: v,
                            discountRate: g
                        })) && THISPAGE.calTotal();
                        break;
                    case"discountRate":
                        var n = parseFloat(n) || 0, p = $("#grid").jqGrid("getRowData", t), b = parseFloat(p.taxRate), h = parseFloat(p.qty), f = parseFloat(p.price), I = parseFloat(p.taxPrice);
                        if (SYSTEM.invPriceIsTax)var v = (S = (h * I * (1 - n / 100)).toFixed(2)) - (T = (S / (1 + b / 100) * b / 100).toFixed(2)), P = (h * I / (1 + b / 100) * n / 100).toFixed(2), y = $("#grid").jqGrid("setRowData", t, {
                            taxAmount: S,
                            tax: T,
                            amount: v,
                            price: f,
                            deduction: P
                        }); else {
                            if ($.isNumeric(h) && $.isNumeric(f))var D = (100 - n) / 10, v = (x = h * f) - (P = x * n / 100);
                            var T = v * b / 100, S = Number(e(v)) + Number(e(T))
                        }
                        (y = $("#grid").jqGrid("setRowData", t, {
                            tax: T,
                            taxAmount: S,
                            taxPrice: I,
                            deduction: P,
                            amount: v,
                            goodsDiscountRate: D
                        })) && THISPAGE.calTotal();
                        break;
                    case"goodsDiscountRate":
                        var n = parseFloat(n) || 0, p = $("#grid").jqGrid("getRowData", t), h = parseFloat(p.qty), f = parseFloat(p.price);
                        if ($.isNumeric(h) && $.isNumeric(f))var v = (x = h * f) - (P = x * (g = 100 - 10 * n) / 100), y = $("#grid").jqGrid("setRowData", t, {
                            deduction: P,
                            amount: v,
                            discountRate: g
                        });
                        a(t), y && THISPAGE.calTotal();
                        break;
                    case"deduction":
                        var n = parseFloat(n) || 0, p = $("#grid").jqGrid("getRowData", t), h = parseFloat(p.qty), b = parseFloat(p.taxRate), I = parseFloat(p.taxPrice), f = parseFloat(p.price);
                        if (SYSTEM.invPriceIsTax)var g = Number(n).div(Number(Number(h).mul(Number(I))).div(Number(1..add(Number(b).div(100))))).mul(100), f = ((v = (S = (h * I * (1 - (g = Business.disRateFormat(g)) / 100)).toFixed(2)) - (T = (parseFloat(S / (1 + b / 100)) * b / 100).toFixed(2))) / (h * (1 - g / 100))).toFixed(2); else {
                            if ($.isNumeric(h) && $.isNumeric(f))var x = Number(h).mul(Number(f)), v = x > 0 ? Number(x).subtr(Number(n)) : 0, g = x ? Number(n).mul(100).div(x) : 0, D = (100 - (g = Business.disRateFormat(g))) / 10;
                            var T = v * b / 100, I = (S = Number(e(v)) + Number(e(T))) / h / (1 - g / 100);
                            S / h == 0 && 1 - g / 100 == 0 && (I = (n * (1 + b / 100) / h).toFixed(2))
                        }
                        (y = $("#grid").jqGrid("setRowData", t, {
                            tax: T,
                            taxAmount: S,
                            taxPrice: I,
                            amount: v,
                            discountRate: g,
                            goodsDiscountRate: D
                        })) && THISPAGE.calTotal();
                        break;
                    case"amount":
                        var n = parseFloat(n) || 0, p = $("#grid").jqGrid("getRowData", t), b = parseFloat(p.taxRate), h = parseFloat(p.qty), g = parseFloat(p.discountRate) || 0, P = parseFloat(p.deduction), T = n * b / 100, D = parseFloat(p.goodsDiscountRate), N = 100;
                        if (SYSTEM.pricePlaces > 2)for (C = 0; C < SYSTEM.pricePlaces - 2; C++)N *= 10;
                        var S = Math.round(100 * (n + T)) / 100, f = Math.round(n / h / (1 - g / 100) * N) / N, I = Math.round(S / h / (1 - g / 100) * N) / N;
                        if (g) {
                            P = f * h * g / 100;
                            D = (100 - g) / 10
                        } else g = P / (h * f) * 100;
                        (y = $("#grid").jqGrid("setRowData", t, {
                            tax: T,
                            taxAmount: S,
                            taxPrice: I,
                            deduction: P,
                            price: f,
                            discountRate: g,
                            goodsDiscountRate: D
                        })) && THISPAGE.calTotal();
                        break;
                    case"taxRate":
                        var A = n, n = parseFloat(n) || 0, p = $("#grid").jqGrid("getRowData", t), v = parseFloat(p.amount), f = parseFloat(p.price);
                        if ($.isNumeric(n)) {
                            S = v + (T = v * n / 100);
                            (y = $("#grid").jqGrid("setRowData", t, {tax: T, taxAmount: S})) && THISPAGE.calTotal()
                        }
                        if ("" === A && (y = $("#grid").jqGrid("setRowData", t, {
                                tax: "",
                                taxAmount: v
                            })) && THISPAGE.calTotal(), $.isNumeric(f)) {
                            I = f * (1 + n / 100);
                            (y = $("#grid").jqGrid("setRowData", t, {taxPrice: I})) && THISPAGE.calTotal()
                        }
                        break;
                    case"tax":
                        var n = parseFloat(n) || 0, p = $("#grid").jqGrid("getRowData", t);
                        if ($.isNumeric(n)) {
                            S = (v = parseFloat(p.amount)) + n;
                            (y = $("#grid").jqGrid("setRowData", t, {taxAmount: S})) && THISPAGE.calTotal()
                        }
                        break;
                    case"taxAmount":
                        var n = parseFloat(n) || 0, p = $("#grid").jqGrid("getRowData", t), b = parseFloat(p.taxRate), h = parseFloat(p.qty), g = parseFloat(p.discountRate) || 0, P = parseFloat(p.deduction), D = parseFloat(p.goodsDiscountRate), N = 100;
                        if (SYSTEM.pricePlaces > 2)for (var C = 0; C < SYSTEM.pricePlaces - 2; C++)N *= 10;
                        var T = Math.round(n / (1 + b / 100) * b / 100 * 100) / 100, v = Math.round(100 * (n - T)) / 100, I = Math.round(n / h / (1 - g / 100) * N) / N, f = Math.round(v / h / (1 - g / 100) * N) / N;
                        if (g) {
                            P = f * h * g / 100;
                            D = (100 - g) / 10
                        } else g = P / (h * f) * 100;
                        (y = $("#grid").jqGrid("setRowData", t, {
                            tax: T,
                            amount: v,
                            taxPrice: I,
                            deduction: P,
                            price: f,
                            discountRate: g,
                            goodsDiscountRate: D
                        })) && THISPAGE.calTotal();
                        break;
                    case"shareAmount":
                        THISPAGE.calTotal();
                        break;
                    case"batch":
                        E = $("#grid").jqGrid("getRowData", t);
                        if ((m = $("#" + t).data("goodsInfo") || {}).safeDays && "0" !== m.safeDays) {
                            G = {};
                            if ($.trim(E.prodDate) || (G.prodDate = c), $.trim(E.safeDays) || (G.safeDays = m.safeDays), !$.trim(E.validDate)) {
                                k = (R = E.prodDate || G.prodDate).split("-");
                                if ("Invalid Date" === (R = new Date(k[0], k[1] - 1, k[2])).toString())return defaultPage.Public.tips({
                                    type: 2,
                                    content: "日期格式错误！"
                                }), void setTimeout(function () {
                                    $("#grid").jqGrid("editCellByColName", t, "prodDate")
                                }, 10);
                                R && (R.addDays(Number(E.safeDays || G.safeDays)), G.validDate = R.format())
                            }
                            $.isEmptyObject(G) || $("#grid").jqGrid("setRowData", t, G)
                        }
                        break;
                    case"prodDate":
                        var E = $("#grid").jqGrid("getRowData", t), m = $("#" + t).data("goodsInfo") || {}, G = {};
                        $.trim(E.safeDays) || (G.safeDays = m.safeDays), $.trim(n) || (G.prodDate = c);
                        var R = n || G.prodDate, k = R.split("-");
                        if ("Invalid Date" === (R = new Date(k[0], k[1] - 1, k[2])).toString())return defaultPage.Public.tips({
                            type: 2,
                            content: "日期格式错误！"
                        }), void setTimeout(function () {
                            $("#grid").jqGrid("editCellByColName", t, "prodDate")
                        }, 10);
                        R && (R.addDays(Number(E.safeDays || G.safeDays)), G.validDate = R.format()), $("#grid").jqGrid("setRowData", t, G)
                }
            },
            loadonce: !0,
            resizeStop: function (t, e) {
                u.mod_PageConfig.setGridWidthByIndex(t, e, "grid")
            },
            footerrow: !0,
            userData: {
                goods: "合计：",
                qty: t.totalQty,
                deduction: t.totalDiscount,
                amount: t.totalAmount,
                tax: t.totalTax,
                taxAmount: t.totalTaxAmount,
                shareAmount: t.totalShareAmount
            },
            userDataOnFooter: !0,
            loadError: function (t, e, a) {
                Public.tips({type: 1, content: "Type: " + e + "; Response: " + t.status + " " + t.statusText})
            }
        }), $("#grid").jqGrid("setGridParam", {cellEdit: !0})
    }, goodsEdittypeInit: function () {
        if (0 != $("#grid")[0].p.savedRow.length && $("#grid").jqGrid("saveCell", $("#grid")[0].p.savedRow[0].id, $("#grid")[0].p.savedRow[0].ic), THISPAGE.$_barCodeInsert.hasClass("open")) $("#grid").jqGrid("setColProp", "goods", {
            edittype: "text",
            editoptions: null
        }); else {
            $("#grid").jqGrid("setColProp", "goods", {
                edittype: "custom", editoptions: {
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
        }
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
                taxAmount: t.totalTaxAmount,
                shareAmount: t.totalShareAmount
            }
        }).trigger("reloadGrid"), function () {
            if (e.$_customer.data("contactInfo", {
                    id: t.buId,
                    name: t.contactName,
                    taxRate: t.taxRate
                }), e.customerCombo.input.val(t.contactName), e.$_date.val(t.date), e.$_number.text(t.billNo), e.$_note.val(t.description), e.$_discountRate.val(t.disRate), e.$_deduction.val(t.disAmount), e.$_discount.val(t.amount), e.$_payment.val(t.rpAmount), e.accountCombo.selectByValue(t.accId, !1), t.feeBill) {
                var a = 0;
                $.each(t.feeBill, function (t, e) {
                    a += Number(e.amount)
                }), e.$_purExpense.val(a)
            } else e.$_purExpense.val(0);
            e.$_expenseInfo.data("expenseInfo", t.feeBill || []), e.$_accountInfo.data("accountInfo", t.accounts), -1 === t.accId ? e.$_accountInfo.show() : e.$_accountInfo.hide(), e.$_arrears.val(t.arrears), e.$_totalArrears.val(t.totalArrears), e.$_userName.html(t.userName), e.$_modifyTime.html(t.modifyTime), e.$_modifyName.html(t.modifyName), e.$_createTime.html(t.createTime), e.$_checkName.html(t.checkName), e.$_checkTime.html(t.checkTime)
        }(), "edit" === t.status ? this.editable || (e.enableEdit(), $("#groupBtn").html(e.btn_edit + e.btn_audit), $("#mark").removeClass("has-audit")) : this.editable && (e.disableEdit(), $("#groupBtn").html(e.btn_view + e.btn_reaudit), $("#mark").addClass("has-audit"))
    }, initCombo: function () {
        var t = this;
        this.goodsCombo = Business.billGoodsCombo($(".goodsAuto"), {
            userData: {
                isCreate: "150502" != originalData.transType,
                billType: "purchase"
            }
        }), this.skuCombo = Business.billskuCombo($(".skuAuto"), {
            data: [],
            defaultSelected: -1
        }), this.storageCombo = Business.billStorageCombo($(".storageAuto")), this.unitCombo = Business.unitCombo($(".unitAuto"), {
            defaultSelected: -1,
            forceSelection: !1,
            callback: {
                onChange: function (t) {
                    var e = this.input.parents("tr");
                    t && (t.id = t.id || t.unitId, e.data("unitInfo", {unitId: t.id, name: t.name, rate: t.rate}))
                }
            }
        }), this.cellPikaday = new Pikaday({
            field: $(".dateAuto")[0],
            editable: !1
        }), this.batchCombo = Business.batchCombo($(".batchAuto")), this.priceCombo = $(".priceAuto").combo({
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
                            var r = function () {
                                var t = {cId: i.id};
                                n[a.id] = t, Public.ajaxPost("/basedata/inventory.do?action=listBySelected", {
                                    type: "sa",
                                    ids: a.id,
                                    contactId: i.id
                                }, function (a) {
                                    if (200 === a.status && a.data && a.data.result) {
                                        for (var i = a.data.result, n = 0, r = i.length; n < r; n++) {
                                            var o = i[n];
                                            o.nearPrice && (t.prices = {}, t.prices.nearPrice = o.nearPrice), o.salePrice && (t.prices = t.prices || {}, t.prices.levelPrice = o.salePrice, t.prices.discountRate = o.discountRate)
                                        }
                                        t.prices && e.show()
                                    }
                                })
                            };
                            if (n[a.id]) {
                                var o = n[a.id];
                                o.cId != i.id ? r() : o.prices && e.show()
                            } else r()
                        }
                    }
                }
            }
        }).getCombo()
    }, disableEdit: function () {
        this.customerCombo.disable(), this.$_date.attr("disabled", "disabled").addClass("ui-input-dis"), this.$_note.attr("disabled", "disabled").addClass("ui-input-dis"), this.$_discountRate.attr("disabled", "disabled").addClass("ui-input-dis"), this.$_deduction.attr("disabled", "disabled").addClass("ui-input-dis"), this.$_payment.attr("disabled", "disabled").addClass("ui-input-dis"), this.accountCombo.disable(), $("#grid").jqGrid("setGridParam", {cellEdit: !1}), this.editable = !1
    }, enableEdit: function () {
        disEditable || (!hideCustomerCombo && this.customerCombo.enable(), this.$_date.removeAttr("disabled").removeClass("ui-input-dis"), this.$_note.removeAttr("disabled").removeClass("ui-input-dis"), this.$_discountRate.removeAttr("disabled").removeClass("ui-input-dis"), this.$_deduction.removeAttr("disabled").removeClass("ui-input-dis"), this.$_payment.removeAttr("disabled").removeClass("ui-input-dis"), this.accountCombo.enable(), $("#grid").jqGrid("setGridParam", {cellEdit: !0}), this.editable = !0)
    }, triggerEdit: function () {
        var t = !0;
        originalData.id > 0 && originalData.checked && (t = !1), "edit" == originalData.status && (t = "150502" == urlParam.transType ? Business.verifyRight("PUBACK_UPDATE", !0) : Business.verifyRight("PU_UPDATE", !0)), t ? this.enableEdit() : this.disableEdit()
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
            cancel: function () {
                var t = e.$_accountInfo.data("accountInfo");
                t ? 1 === t.length && e.accountCombo.selectByValue(t[0].accId) : e.accountCombo.selectByValue(0)
            }
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
        this.$_date.bind("keydown", function (t) {
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
        }), Business.billsEvent(e, "purchase"), Business.coderRuleEvent(e, "150501" == originalData.transType ? "PUR" : "PURT", e.$_date.val()), this.$_deduction.keyup(function () {
            var t = Number($(this).val()) || 0, a = Number($("#grid").jqGrid("footerData", "get")[e.calAmount].replace(/,/g, "")), i = (a - t.toFixed(2)).toFixed(amountPlaces);
            if (a) {
                var n = t / a * 100;
                THISPAGE.$_discountRate.val(n.toFixed(amountPlaces)), THISPAGE.$_discount.val(i), SYSTEM.autoFillSettAmount && -1 !== THISPAGE.accountCombo.getValue() && "add" === originalData.status && (SYSTEM.isAdmin || SYSTEM.rights.SettAcct_QUERY) && (THISPAGE.$_payment.val(i), e.$_accountInfo.data("accountInfo")[0].payment = e.$_payment.val());
                var r = i - Number($.trim(e.$_payment.val()));
                THISPAGE.$_arrears.val(r.toFixed(amountPlaces))
            }
        }).on("keypress", function (t) {
            Public.numerical(t)
        }).on("focus", function () {
            this.select()
        }).blur(function (t) {
            $(this).val() < 0 ? (defaultPage.Public.tips({
                    type: 2,
                    content: "优惠金额不能为负数！"
                }), $(this).focus()) : $(this).val(Number($(this).val()).toFixed(2))
        }), this.$_discountRate.keyup(function () {
            var t = Number($(this).val()) || 0, a = Number($("#grid").jqGrid("footerData", "get")[e.calAmount].replace(/,/g, "")), i = (a * (t / 100)).toFixed(amountPlaces), n = (a - i).toFixed(amountPlaces);
            THISPAGE.$_deduction.val(i), THISPAGE.$_discount.val(n), SYSTEM.autoFillSettAmount && -1 !== THISPAGE.accountCombo.getValue() && "add" === originalData.status && (SYSTEM.isAdmin || SYSTEM.rights.SettAcct_QUERY) && (THISPAGE.$_payment.val(n), e.$_accountInfo.data("accountInfo")[0].payment = e.$_payment.val());
            var r = n - Number($.trim(e.$_payment.val()));
            THISPAGE.$_arrears.val(r.toFixed(amountPlaces))
        }).on("keypress", function (t) {
            Public.numerical(t)
        }).on("focus", function () {
            this.select()
        }).blur(function (t) {
            $(this).val() < 0 && (defaultPage.Public.tips({type: 2, content: "优惠率不能为负数！"}), $(this).focus())
        }), this.$_payment.keyup(function () {
            var t = Number($(this).val()) || 0, a = e.$_discount.val(), i = Number(parseFloat(a) - parseFloat(t)), n = Number(i + THISPAGE.customerArrears);
            THISPAGE.$_arrears.val(i.toFixed(amountPlaces)), THISPAGE.$_totalArrears.val(n.toFixed(amountPlaces));
            var r = e.$_accountInfo.data("accountInfo");
            r && 1 === r.length && (r[0].payment = t)
        }).on("keypress", function (t) {
            Public.numerical(t)
        }).on("focus", function () {
            this.select()
        }).blur(function (t) {
            $(this).val(Number($(this).val()).toFixed(2))
        }), $(".wrapper").on("click", "#SN_export", function (t) {
            t.preventDefault();
            var e = "150501" == urlParam.transType ? "PU_EXPORT" : "PUBACK_EXPORT";
            if (Business.verifyRight(e) && Business.noDataExportTips()) {
                var a = "150501" == urlParam.transType ? "PURCHASE" : "PURCHASE_RETURN", i = {
                    id: originalData.id,
                    type: a
                };
                Business.getFile("/scm/invSa.do?action=exportSN", i)
            }
        }), $(".wrapper").on("click", "#save", function (a) {
            if (a.preventDefault(), "150502" == urlParam.transType) {
                if (!Business.verifyRight("PUBACK_ADD"))return
            } else if (!Business.verifyRight("PU_ADD"))return;
            if (!t())return !1;
            var i = $(this);
            setTimeout(function () {
                var t = THISPAGE.getPostData();
                if (t) {
                    var a = function () {
                        i.ajaxPost("/scm/invPu.do?action=add", {postData: JSON.stringify(t)}, function (t) {
                            200 === t.status ? (e.$_modifyTime.html((new Date).format("yyyy-MM-dd hh:mm:ss")).parent().show(), e.$_modifyName.html(system.realName).parent().show(), e.$_createTime.html((new Date).format("yyyy-MM-dd hh:mm:ss")).parent().show(), originalData.id = t.data.id, "150502" == t.transType ? e.idList = parent.cacheList.purchaseBackId || [] : e.idList = parent.cacheList.purchaseId || [], e.idPostion = $.inArray(String(t.data.id), e.idList), e.idLength = e.idList.length, 0 === e.idPostion && $("#prev").addClass("ui-btn-prev-dis"), e.idPostion === e.idLength - 1 && $("#next").addClass("ui-btn-next-dis"), billRequiredCheck ? e.$_toolBottom.html('<span id="groupBtn">' + e.btn_edit + e.btn_audit + "</span>") : e.$_toolBottom.html('<span id="groupBtn">' + e.btn_puReturn + e.btn_edit + "</span>"), parent.Public.tips({content: "保存成功！"}), $("#editBills").css("display", "none"), Business.clearDirtyCell($("#grid")), originalData.status = "edit", e.triggerEdit()) : parent.Public.tips({
                                    type: 1,
                                    content: t.msg
                                })
                        })
                    };
                    "edit" === originalData.stata && (t.id = originalData.id, t.stata = "edit");
                    var n = (n = t.date).replace(/-/g, "/");
                    (n = new Date(n + " 00:00:00").getTime()) > system.curDate ? $.dialog.confirm("单据日期大于本日，确定保存？", function () {
                            a()
                        }) : a()
                }
            }, 300)
        }), $(".wrapper").on("click", "#savaAndAdd", function (e) {
            function a() {
                i.ajaxPost("/scm/invPu.do?action=addNew", {postData: JSON.stringify(n)}, function (t) {
                    if (200 === t.status) {
                        for (var e = 0, a = 0; a < SYSTEM.accountInfo.length; a++)"1" === SYSTEM.accountInfo[a].isdefault && (e = SYSTEM.accountInfo[a].id);
                        $("#grid").clearGridData(!0);
                        for (a = 1; a <= 5; a++)$("#grid").jqGrid("addRowData", a, {});
                        THISPAGE.newId = 6;
                        var i = $.extend(!0, {}, newPurData);
                        i.date = THISPAGE.$_date.val(), i.accId = e, THISPAGE.initDom(i), THISPAGE.accountCombo.selectByValue(e), THISPAGE.$_number.text(t.data.billNo), parent.Public.tips({content: "保存成功！"}), originalData.status = "add"
                    } else parent.Public.tips({type: 1, content: t.msg})
                })
            }

            if (e.preventDefault(), "150502" == urlParam.transType) {
                if (!Business.verifyRight("PUBACK_ADD"))return
            } else if (!Business.verifyRight("PU_ADD"))return;
            if (!t())return !1;
            var i = $(this), n = THISPAGE.getPostData();
            if (n) {
                var r = (r = n.date).replace(/-/g, "/");
                (r = new Date(r + " 00:00:00").getTime()) > system.curDate ? $.dialog.confirm("单据日期大于本日，确定保存？", function () {
                        a()
                    }) : a()
            }
        }), $(".wrapper").on("click", "#copy", function (t) {
            if (t.preventDefault(), "150502" == urlParam.transType) {
                if (!Business.verifyRight("PUBACK_ADD"))return
            } else if (!Business.verifyRight("PU_ADD"))return;
            var a = $(this), i = THISPAGE.getPostData(), n = "PUR";
            "150502" == originalData.transType && (n = "PURT");
            var r = i.date;
            a.ajaxPost("/basedata/systemProfile.do?action=generateDocNo", {billType: n, billDate: r}, function (t) {
                if (200 === t.status) {
                    originalData.id = -1, isCopy = !0, e.$_number.text(t.data.billNo), $("#mark").removeClass(), e.$_checkName.html(""), e.$_checkTime.html(""), e.enableEdit(), $("#groupBtn").html(e.btn_edit + e.btn_audit), e.$_modifyTime.html((new Date).format("yyyy-MM-dd hh:mm:ss")).parent().hide(), e.$_modifyName.html(system.realName).parent().hide(), e.$_createTime.html((new Date).format("yyyy-MM-dd hh:mm:ss")).parent().hide(), $("[aria-describedby=grid_srcOrderNo]").html(""), parent.Public.tips({content: "复制数据成功！"}), originalData.status = "add", $("#editBills").css("display", "inline-block");
                    var a = e.btn_add;
                    billRequiredCheck && (a += e.btn_audit), e.$_toolBottom.html('<span id="groupBtn">' + a + "</span>"), e.$_date = $("#date").val(system.endDate), e.$_deliveryDate = $("#deliveryDate").val(system.endDate);
                    for (var n = $("#grid").jqGrid("getDataIDs"), r = 0; r < n.length; r++) {
                        var o = $("#" + n[r]).data("goodsInfo");
                        o && o.serNumList && $("#grid").jqGrid("setRowData", n[r], {qty: ""}), i.feeBill && $("#grid").jqGrid("setCell", n[r], "shareAmount", "&#160;")
                    }
                    i.feeBill && ($("#grid").jqGrid("footerData", "set", {shareAmount: "&#160;"}), $("#purExpense").val("0.00"), e.$_expenseInfo.data("expenseInfo", []))
                } else parent.Public.tips({type: 1, content: t.msg})
            })
        }), $(".wrapper").on("click", "#edit", function (a) {
            function i() {
                n.ajaxPost("/scm/invPu.do?action=updateInvPu", {postData: JSON.stringify(r)}, function (t) {
                    200 === t.status ? (e.$_modifyTime.html((new Date).format("yyyy-MM-dd hh:mm:ss")).parent().show(), e.$_modifyName.html(system.realName).parent().show(), originalData.id = t.data.id, parent.Public.tips({content: "修改成功！"}), Business.clearDirtyCell($("#grid")), originalData.status = "edit") : parent.Public.tips({
                            type: 1,
                            content: t.msg
                        })
                })
            }

            if (a.preventDefault(), "150502" == urlParam.transType) {
                if (!Business.verifyRight("PUBACK_UPDATE"))return
            } else if (!Business.verifyRight("PU_UPDATE"))return;
            if (!t())return !1;
            var n = $(this), r = THISPAGE.getPostData();
            if (r) {
                var o = (o = r.date).replace(/-/g, "/");
                (o = new Date(o + " 00:00:00").getTime()) > system.curDate ? $.dialog.confirm("单据日期大于本日，确定保存？", function () {
                        i()
                    }) : i()
            }
        }), $(".wrapper").on("click", "#audit", function (t) {
            if (t.preventDefault(), "150502" == urlParam.transType) {
                if (!Business.verifyRight("PUBACK_CHECK"))return
            } else if (!Business.verifyRight("PU_CHECK"))return;
            var a = $(this);
            setTimeout(function () {
                function t() {
                    a.ajaxPost("/scm/invPu.do?action=checkInvPu", {postData: JSON.stringify(i)}, function (t) {
                        200 === t.status ? (originalData.checked = 1, originalData.id = t.data.id, $("#mark").addClass("has-audit"), e.$_checkName.html(SYSTEM.realName).parent().show(), e.$_checkTime.html((new Date).format("yyyy-MM-dd hh:mm:ss")).parent().show(), $("#edit").hide(), e.disableEdit(), $("#groupBtn").html(e.btn_puReturn + e.btn_view + e.btn_reaudit), "150502" == originalData.transType && $("#toPuReturn").remove(), parent.Public.tips({content: "审核成功！"}), $("#editBills").css("display", "none"), Business.clearDirtyCell($("#grid")), originalData.status = "edit") : (e.$_checkTime.parent().hide(), e.$_checkName.parent().hide(), parent.Public.tips({
                                type: 1,
                                content: t.msg
                            }))
                    })
                }

                var i = THISPAGE.getPostData({checkSerNum: !0});
                if (i) {
                    var n = (n = i.date).replace(/-/g, "/");
                    (n = new Date(n + " 00:00:00").getTime()) > system.curDate && "edit" !== originalData.status ? $.dialog.confirm("单据日期大于本日，确定保存？", function () {
                            t()
                        }) : t()
                }
            }, 300)
        }), $(".wrapper").on("click", "#reAudit", function (t) {
            if (t.preventDefault(), "150502" == urlParam.transType) {
                if (!Business.verifyRight("PUBACK_UNCHECK"))return
            } else if (!Business.verifyRight("PU_UNCHECK"))return;
            $(this).ajaxPost("/scm/invPu.do?action=rsBatchCheckInvPu", {id: originalData.id}, function (t) {
                var a = "购货单";
                "150502" == originalData.transType && (a = "购货退货单"), 200 === t.status && 0 != t.data.failArr.length ? Public.antiCheck(t.data, a) : 200 === t.status ? (originalData.checked = 0, $("#mark").removeClass(), $("#edit").show(), e.$_checkName.html(""), e.$_checkTime.html(""), e.$_checkName.parent().hide(), e.$_checkTime.parent().hide(), $("#groupBtn").html(e.btn_edit + e.btn_audit), "150502" == originalData && $("#toPuReturn").remove(), parent.Public.tips({content: "反审核成功！"}), e.triggerEdit()) : parent.Public.tips({
                            type: 1,
                            content: t.msg
                        })
            })
        }), $(".wrapper").on("click", "#add", function (t) {
            if (t.preventDefault(), "150502" == urlParam.transType) {
                if (!Business.verifyRight("PUBACK_ADD"))return
            } else if (!Business.verifyRight("PU_ADD"))return;
            var e = "购货单", a = "purchase-purchase";
            if ("150502" == originalData.transType)var e = "购货退货单", a = "purchase-purchaseBack";
            parent.tab.overrideSelectedTabItem({
                tabid: a,
                text: e,
                url: "/scm/invPu.do?action=initPur&transType=" + originalData.transType
            })
        }), $(".wrapper").on("click", "#print", function (t) {
            if (t.preventDefault(), "150502" == urlParam.transType) {
                if (!Business.verifyRight("PUBACK_PRINT"))return
            } else if (!Business.verifyRight("PU_PRINT"))return;
            Public.print({
                title: "购货单列表",
                $grid: $("#grid"),
                pdf: "/scm/invPu.do?action=toPdf",
                billType: 10101,
                filterConditions: {id: originalData.id}
            })
        }), this.$_accountInfo.click(function () {
            var t = $(this).data("accountInfo");
            e.chooseAccount(t)
        }), $(".wrapper").on("click", "#prev", function (t) {
            if (t.preventDefault(), $(this).hasClass("ui-btn-prev-dis"))return parent.Public.tips({
                type: 2,
                content: "已经没有上一张了！"
            }), !1;
            e.idPostion = e.idPostion - 1, 0 === e.idPostion && $(this).addClass("ui-btn-prev-dis"), loading = $.dialog.loading("数据加载中...", 1e3, "loading.gif", !0), Public.ajaxGet("/scm/invPu.do?action=update", {id: e.idList[e.idPostion]}, function (t) {
                originalData.id = e.idList[e.idPostion], THISPAGE.reloadData(t.data), $("#next").removeClass("ui-btn-next-dis"), loading && loading.close()
            })
        }), $(".wrapper").on("click", "#next", function (t) {
            if (t.preventDefault(), $(this).hasClass("ui-btn-next-dis"))return parent.Public.tips({
                type: 2,
                content: "已经没有下一张了！"
            }), !1;
            e.idPostion = e.idPostion + 1, e.idLength === e.idPostion + 1 && $(this).addClass("ui-btn-next-dis"), loading = $.dialog.loading("数据加载中...", 1e3, "loading.gif", !0), Public.ajaxGet("/scm/invPu.do?action=update", {id: e.idList[e.idPostion]}, function (t) {
                originalData.id = e.idList[e.idPostion], THISPAGE.reloadData(t.data), $("#prev").removeClass("ui-btn-prev-dis"), loading && loading.close()
            })
        }), THISPAGE.$_barCodeInsert.click(function (t) {
            var a = 1;
            THISPAGE.$_barCodeInsert.hasClass("open") ? (THISPAGE.$_barCodeInsert.removeClass("open"), THISPAGE.$_barCodeInsert.addClass("close"), a = null) : (THISPAGE.$_barCodeInsert.addClass("open"), THISPAGE.$_barCodeInsert.removeClass("close")), e.goodsEdittypeInit(), $.cookie("BarCodeInsert", a)
        }), $(document).on("click", "#ldg_lockmask", function (t) {
            t.stopPropagation()
        }), $("#grid").on("click", 'tr[role="row"]', function (t) {
            if ($("#mark").hasClass("has-audit")) {
                var e = $(this), a = (e.prop("id"), e.data("goodsInfo"));
                if (!a)return;
                SYSTEM.ISSERNUM && 1 == a.isSerNum && Business.serNumManage({row: e, view: !0})
            }
        }), $("#expenseInfo").on("click", function (t) {
            t.preventDefault();
            var a = e.$_expenseInfo.data("expenseInfo");
            $.dialog({
                title: "采购费用",
                content: "url:/purchase/expense-manage.jsp",
                data: {
                    expenseInfo: a, callback: function (t, a) {
                        try {
                            $("#purExpense").val(t.totalAmount), e.$_expenseInfo.data("expenseInfo", t.feeBill), a && a.api.close()
                        } catch (t) {
                        }
                    }
                },
                width: 512,
                height: 220,
                max: !1,
                min: !1,
                cache: !1,
                lock: !0
            })
        }), $("#doExpense").on("click", function (t) {
            t.preventDefault();
            for (var e = Number($("#purExpense").val()), a = $("#grid").jqGrid("getDataIDs"), i = a.length, n = [], r = $("#grid").jqGrid("footerData", "get").amount.replace(/,/g, ""), o = 0, s = 0, d = 0, i = a.length; d < i; d++) {
                var l = $("#grid").jqGrid("getRowData", a[d]);
                if ("" !== l.goods) {
                    var u = Math.floor(e * (l.amount / r) * 100) / 100;
                    $("#grid").jqGrid("setRowData", a[d], {shareAmount: u}), o = Number(o) + Number(u), 0, n.push(a[d])
                }
            }
            var s = e - o, c = parseFloat($("#grid").jqGrid("getRowData", n[n.length - 1]).shareAmount || 0), m = parseFloat(s) + parseFloat(c);
            $("#grid").jqGrid("setRowData", n[n.length - 1], {shareAmount: m}), THISPAGE.calTotal()
        }), $("#expenseList").on("click", function (t) {
            t.preventDefault(), Business.verifyRight("FEEBILL_QUERY") && parent.tab.addTabItem({
                tabid: "money-expenseList",
                text: "采购销售费用清单",
                url: "/money/expense-list.jsp"
            })
        }), $("#batchBatch").on("click", function (t) {
            if (t.preventDefault(), THISPAGE.editable) {
                $("#grid");
                for (var e = $("#grid").jqGrid("getDataIDs"), a = [], i = [], n = 0, r = e.length; n < r; n++) {
                    var o = e[n];
                    if ("" !== $("#grid").jqGrid("getRowData", o).goods) {
                        var s = $("#" + o).data("goodsInfo");
                        if (s) {
                            if (!s)return void defaultPage.Public.tips({type: 2, content: "请先录入一个商品！"});
                            s.isWarranty && (a.push(o), i.push(s.id))
                        }
                    }
                }
                $.dialog({
                    width: 700,
                    height: 500,
                    title: "批量选择商品批号",
                    content: "url:/purchase/purchase-batch-batch.jsp",
                    data: {
                        goodsInfo: s, invIdArr: i, curIds: a, callback: function (t, e) {
                        }
                    },
                    lock: !0,
                    button: [{
                        name: "选中", defClass: "ui_state_highlight fl", callback: function () {
                            return this.content.callback(), !1
                        }
                    }, {
                        name: "选中并关闭", defClass: "ui_state_highlight", callback: function () {
                            return this.content.callback(), this.close(), !1
                        }
                    }, {
                        name: "关闭", callback: function () {
                            return !0
                        }
                    }]
                })
            } else Public.tips({type: 2, content: "已审核单据不能修改！"})
        }), $(".linkToCheck").on("click", function (t) {
            t.preventDefault(), "150502" == originalData.transType ? parent.tab.addTabItem({
                    tabid: "purchase-purchaseBackList",
                    text: "购货退货单记录",
                    url: "/scm/invPu.do?action=initPurList&transType=150502"
                }) : parent.tab.addTabItem({
                    tabid: "purchase-purchaseList",
                    text: "购货单记录",
                    url: "/scm/invPu.do?action=initPurList"
                })
        }), $("#operaLog").powerFloat({
            eventType: "hover", hoverHold: !1, reverseSharp: !0, target: function () {
                return $("#operaLogBox")
            }
        }), $(".wrapper").on("click", "#toPuReturn", function (t) {
            t.preventDefault(), Business.verifyRight("PUBACK_ADD") && (originalData.checked || !billRequiredCheck ? originalData.billStatus && "2" == originalData.billStatus && "150501" == originalData.transType ? Public.tips({
                        type: 2,
                        content: "该单据已全部退货，不能再生成购货退货单！"
                    }) : parent.tab.addTabItem({
                        tabid: "purchase-purchaseBack",
                        text: "购货退货单",
                        url: "/scm/invPu.do?action=initPur&transType=150502&turn&turnType=puToBack&id=" + originalData.id
                    }) : Public.tips({type: 2, content: "该单据未审核，不能生成购货退货单！"}))
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
        for (var t = $("#grid").jqGrid("getDataIDs"), e = 0, a = 0, i = 0, n = 0, r = 0, o = 0, s = 0, d = t.length; s < d; s++) {
            var l = t[s], u = $("#grid").jqGrid("getRowData", l);
            if ($("#" + l).data("goodsInfo")) {
                if (u.qty) {
                    var c = u.qty.replace(",", "");
                    e += parseFloat(c)
                }
                u.deduction && (a += parseFloat(u.deduction)), u.amount && (i += parseFloat(u.amount)), u.tax && (n += parseFloat(u.tax)), u.taxAmount && (r += parseFloat(u.taxAmount)), u.shareAmount && (o += parseFloat(u.shareAmount))
            }
        }
        $("#grid").jqGrid("footerData", "set", {
            goods: "合计：",
            qty: e,
            deduction: a,
            amount: i,
            tax: n,
            taxAmount: r,
            shareAmount: o
        });
        var m = taxRequiredCheck ? r : i, p = Number(this.$_deduction.val()) || 0, h = (m ? p / m * 100 : 0).toFixed(2);
        this.$_discountRate.val(h);
        var f = (m - Number(p)).toFixed(2);
        this.$_discount.val(f), SYSTEM.autoFillSettAmount && -1 !== THISPAGE.accountCombo.getValue() && "add" === originalData.status && (SYSTEM.isAdmin || SYSTEM.rights.SettAcct_QUERY) && (this.$_payment.val(f), this.$_accountInfo.data("accountInfo")[0].payment = this.$_payment.val());
        var g = (f - Number(this.$_payment.val())).toFixed(2);
        g = Number(g) ? g : "0.00", this.$_arrears.val(g)
    }, _getEntriesData: function (t) {
        t = t || {};
        for (var e = [], a = [], i = $("#grid").jqGrid("getDataIDs"), n = 0, r = i.length; n < r; n++) {
            var o, s = i[n], d = $("#grid").jqGrid("getRowData", s);
            if ("" !== d.goods) {
                var l = $("#" + s).data("goodsInfo");
                if (l) {
                    var u = $("#" + s).data("skuInfo") || {};
                    if (l.invSkus && l.invSkus.length > 0 && !u.id)return parent.Public.tips({
                        type: 2,
                        content: "请选择相应的属性！"
                    }), $("#grid").jqGrid("editCellByColName", s, "skuName"), !1;
                    var c = $("#" + s).data("storageInfo");
                    if (!c || !c.id)return parent.Public.tips({
                        type: 2,
                        content: "请选择相应的仓库！"
                    }), $("#grid").jqGrid("editCellByColName", s, "locationName"), !1;
                    var m = $("#" + s).data("unitInfo") || {};
                    $("#grid").jqGrid("getRowData", s);
                    if (SYSTEM.ISSERNUM) {
                        var p = l.serNumList, h = !1, f = [];
                        if (p && p.length == Number(d.qty)) a = $.unique(a), $.each(p, function (t, e) {
                            -1 != $.inArray(e.serNum, a) && ($("#" + s).find("td:eq(2)").addClass("red"), f.push(e.serNum), h = !0)
                        }), l.uniqueSerNum = f, $.each(p, function (t, e) {
                            a.push(e.serNum)
                        }); else {
                            var g = !1;
                            if (1 == l.isSerNum && (g = !0, t.checkSerNum && (g = !0)), g)return parent.Public.tips({
                                type: 2,
                                content: "请点击数量设置【" + l.name + "】的序列号"
                            }), $("#grid").jqGrid("editCellByColName", s, "qty"), !1
                        }
                    }
                    o = {
                        invId: l.id,
                        invNumber: l.number,
                        invName: l.name,
                        invSpec: l.spec || "",
                        skuId: u.id || -1,
                        skuName: u.name || "",
                        unitId: m.unitId || -1,
                        mainUnit: m.name || "",
                        qty: d.qty,
                        price: d.price,
                        taxPrice: d.taxPrice,
                        discountRate: d.discountRate,
                        deduction: d.deduction,
                        goodsDiscountRate: d.goodsDiscountRate,
                        amount: d.amount,
                        locationId: c.id,
                        locationName: c.name,
                        description: d.description,
                        srcOrderEntryId: d.srcOrderEntryId,
                        srcOrderId: d.srcOrderId,
                        srcOrderNo: d.srcOrderNo,
                        srcBillId: d.srcBillId,
                        srcBillNo: d.srcBillNo,
                        srcQty: d.srcQty,
                        srcBillEntryId: d.srcBillEntryId,
                        serNumList: p,
                        shareAmount: d.shareAmount || 0
                    }, isCopy && (o.srcOrderEntryId = "", o.srcOrderId = "", o.srcOrderNo = ""), SYSTEM.ISWARRANTY && $.extend(!0, o, {
                        batch: d.batch || "",
                        producer: d.producer || "",
                        registrationNo: d.registrationNo || "",
                        proLicense: d.proLicense || "",
                        prodDate: d.prodDate || "",
                        safeDays: d.safeDays || "",
                        validDate: d.validDate || ""
                    }), taxRequiredCheck && (o.taxRate = d.taxRate, o.tax = d.tax, o.taxAmount = d.taxAmount), e.push(o)
                }
            }
        }
        return h ? (parent.Public.tips({type: 2, content: "红字行存在重复的序列号，请修改！"}), !1) : e
    }, getPostData: function (t) {
        var e = this, a = this;
        null !== curRow && null !== curCol && ($("#grid").jqGrid("saveCell", curRow, curCol), curRow = null, curCol = null);
        var i = a.$_customer.find("input");
        if ("" === i.val())return a.$_customer.removeData("contactInfo"), parent.Public.tips({
            type: 2,
            content: "请选择供应商！"
        }), a.customerCombo.active = !0, a.customerCombo.doQuery(), a.customerCombo.input.focus(), !1;
        var n = a.$_customer.data("contactInfo");
        if (!n || !n.id)return setTimeout(function () {
            i.focus().select()
        }, 15), parent.Public.tips({type: 2, content: "当前供应商不存在！"}), !1;
        var r = a.$_expenseInfo.data("expenseInfo"), o = this._getEntriesData(t);
        if (!o)return !1;
        if (o.length > 0) {
            for (var s = $.trim(e.$_note.val()), d = {
                id: originalData.id,
                buId: n.id,
                contactName: n.name,
                date: $.trim(e.$_date.val()),
                billNo: $.trim(e.$_number.text()),
                transType: originalData.transType,
                entries: o,
                totalQty: $("#grid").jqGrid("footerData", "get").qty.replace(/,/g, ""),
                totalAmount: $("#grid").jqGrid("footerData", "get").amount.replace(/,/g, ""),
                totalShareAmount: $("#grid").jqGrid("footerData", "get").shareAmount.replace(/,/g, ""),
                description: s === e.$_note[0].defaultValue ? "" : s,
                disRate: $.trim(e.$_discountRate.val() || 0),
                disAmount: $.trim(e.$_deduction.val() || 0),
                amount: $.trim(e.$_discount.val()),
                rpAmount: $.trim(e.$_payment.val() || 0),
                arrears: $.trim(e.$_arrears.val()),
                totalArrears: "",
                feeBill: r
            }, l = 0, u = 0; u < d.entries.length; u++)l = (1e4 * l + 1e4 * Number(d.entries[u].shareAmount)) / 1e4;
            if (l = l.toFixed(2), 0 == Number(l) && 0 == Number($("#purExpense").val()) && delete d.feeBill, Number($("#purExpense").val()) && Number($("#purExpense").val()) < 0)return Public.tips({
                type: 2,
                content: "采购费用不能为负数！"
            }), !1;
            if (Number(l) != Number($("#purExpense").val()) && Number(l > 0))return defaultPage.Public.tips({
                type: 2,
                content: "总费用和分录费用之和不相等！"
            }), !1;
            if (d.disRate < 0)return defaultPage.Public.tips({type: 2, content: "优惠率不能为负数！"}), !1;
            if (d.disAmount < 0)return defaultPage.Public.tips({type: 2, content: "优惠金额不能为负数！"}), !1;
            if (taxRequiredCheck && (d.totalTax = $("#grid").jqGrid("footerData", "get").tax.replace(/,/g, ""), d.totalTaxAmount = $("#grid").jqGrid("footerData", "get").taxAmount.replace(/,/g, "")), requiredMoney) {
                d.accId = e.accountCombo.getValue(), d.accounts = e.$_accountInfo.data("accountInfo");
                var c = "150501" == d.transType ? "付款额" : "退款额";
                if (0 !== Number(d.rpAmount) && 0 === d.accId || 0 !== Number(d.rpAmount) && "" === d.accId)return parent.Public.tips({
                    type: 1,
                    content: c + "不为空时，请选择结算账户！"
                }), $("#account input[type=text]").focus(), !1;
                if (0 === Number(d.rpAmount) && 0 !== d.accId && (d.accId = 0), -1 === d.accId && !d.accounts)return parent.Public.tips({
                    type: 1,
                    content: "请检查账户信息是否正确！"
                }), !1
            }
            return d
        }
        return parent.Public.tips({type: 2, content: "商品信息不能为空！"}), $("#grid").jqGrid("editCell", 1, 2, !0), !1
    }, triggerSaveBeforeClose: function () {
        $("#save").trigger("click"), $("#edit").trigger("click")
    }, checkGridIsChange: function () {
        return Business.checkGridIsChange($("#grid"))
    }
}, hasLoaded = !1, newPurData = {
    id: -1,
    status: "add",
    customer: 0,
    transType: 150501,
    entries: [{id: "1"}, {id: "2"}, {id: "3"}, {id: "4"}, {id: "5"}],
    description: "",
    totalQty: 0,
    totalDiscount: 0,
    totalAmount: 0,
    totalTax: 0,
    totalTaxAmount: 0,
    disRate: 0,
    disAmount: 0,
    totalShareAmount: 0,
    shareAmount: "0.00",
    amount: "0.00",
    rpAmount: "0.00",
    arrears: "0.00",
    accounts: [],
    feeBill: [],
    accId: 0
}, originalData = $.extend(!0, {}, newPurData);
$(function () {
    if (urlParam.id) {
        if (!hasLoaded) {
            var t = $(".bills").hide();
            if (urlParam.turn) {
                var e = "";
                "puToBack" === urlParam.turnType ? (e = "/scm/invPu.do?action=queryDetails", Public.ajaxGet(e, {
                        id: urlParam.id,
                        transtype: urlParam.transType
                    }, function (e) {
                        200 === e.status ? ((originalData = e.data).id = -1, originalData.orderId = e.data.id, originalData.status = "add", originalData.transType = "150502", THISPAGE.init(e.data), t.show(), hasLoaded = !0) : parent.Public.tips({
                                type: 1,
                                content: e.msg
                            })
                    })) : (e = "/scm/invPo.do?action=queryDetails", Public.ajaxGet(e, {
                        id: urlParam.id,
                        transtype: urlParam.transType
                    }, function (e) {
                        200 === e.status ? ((originalData = e.data).id = -1, originalData.orderId = e.data.id, originalData.orderNo = e.data.billNo, originalData.status = "add", THISPAGE.init(e.data), t.show(), hasLoaded = !0) : parent.Public.tips({
                                type: 1,
                                content: e.msg
                            })
                    }))
            } else if (urlParam.turnBygoodList) {
                originalData = {
                    id: -1,
                    status: "add",
                    customer: 0,
                    entries: [{id: "1"}, {id: "2"}, {id: "3"}, {id: "4"}, {id: "5"}],
                    description: "",
                    totalQty: 0,
                    totalDiscount: 0,
                    totalAmount: 0,
                    totalTax: 0,
                    totalTaxAmount: 0,
                    disRate: 0,
                    disAmount: 0,
                    totalShareAmount: 0,
                    shareAmount: "0.00",
                    amount: "0.00",
                    rpAmount: "0.00",
                    arrears: "0.00",
                    accounts: [],
                    accId: 0
                }, "150502" === urlParam.transType ? originalData.transType = "150502" : originalData.transType = "150501", THISPAGE.init(originalData), t.show(), hasLoaded = !0;
                for (var a = parent[urlParam.fn].data, i = [], n = {}, r = 0; r < a.length; r++) {
                    var o = a[r];
                    n[o.id] || i.push(o.id), n[o.id] = {
                        id: o.id,
                        qty: o.qty,
                        skuId: o.skuId,
                        skuName: o.skuName,
                        locationName: o.locationName,
                        locationId: o.locationId
                    }
                }
                if (!i.length)return;
                Public.ajaxGet("/basedata/inventory.do?action=list", {ids: i.join()}, function (t) {
                    if (200 === t.status) {
                        var e = t.data.rows || {};
                        curRow = THISPAGE.curID = 1;
                        var i = 1;
                        newId = THISPAGE.newId;
                        for (var n = 0; n < a.length; n++) {
                            var r = a[n];
                            if ("object" == (void 0 === r ? "undefined" : _typeof(r))) {
                                for (var o = 0; o < e.length; o++) {
                                    var s = e[o];
                                    r.id == s.id && (r = $.extend({}, s, r))
                                }
                                if (r) {
                                    if (delete r.amount, "" === r.spec) d = r.number + " " + r.name; else var d = r.number + " " + r.name + "_" + r.spec;
                                    if (i) l = i; else var l = newId;
                                    if ((t = $.extend(!0, {}, r)).goods = d, t.id = l, t.qty = t.qty || 1, i) u = $("#grid").jqGrid("setRowData", Number(i), {}); else {
                                        var u = $("#grid").jqGrid("addRowData", Number(newId), {}, "last");
                                        newId++
                                    }
                                    r.isSerNum = 0 == r.isSerNum ? 0 : 1, u && $("#" + l).data("goodsInfo", r).data("storageInfo", {
                                        id: r.locationId,
                                        name: r.locationName
                                    }).data("unitInfo", {
                                        unitId: r.unitId,
                                        name: r.unitName
                                    }).data("skuInfo", {
                                        id: r.skuId,
                                        name: r.skuName
                                    }), $("#grid").jqGrid("setRowData", l, t), curRow++, i = $("#" + i).next().length > 0 ? $("#" + i).next().attr("id") : ""
                                }
                            }
                        }
                        "" === i && ($("#grid").jqGrid("addRowData", newId, {}, "last"), THISPAGE.newId = newId + 1), setTimeout(function () {
                            $("#grid").jqGrid("editCell", curRow, 2, !0)
                        }, 10), THISPAGE.calTotal()
                    } else parent.Public.tips({type: 1, content: t.msg})
                })
            } else Public.ajaxGet("/scm/invPu.do?action=update", {id: urlParam.id}, function (e) {
                200 === e.status ? (originalData = e.data, THISPAGE.init(e.data), t.show(), hasLoaded = !0) : parent.Public.tips({
                        type: 1,
                        content: e.msg
                    })
            })
        }
    } else"150502" === urlParam.transType ? originalData.transType = "150502" : originalData.transType = "150501", THISPAGE.init(originalData)
});