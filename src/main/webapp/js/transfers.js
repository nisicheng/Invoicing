function _defineProperty(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
            value: a,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = a, t
}
var curRow, curCol, curArrears, loading, urlParam = Public.urlParam(), system = SYSTEM = parent.SYSTEM, billRequiredCheck = SYSTEM.billRequiredCheck, qtyPlaces = Number(parent.SYSTEM.qtyPlaces), pricePlaces = Number(parent.SYSTEM.pricePlaces), amountPlaces = Number(parent.SYSTEM.amountPlaces), defaultPage = Public.getDefaultPage();
if (urlParam.id)var url_id = urlParam.id;
var disEditable = urlParam.disEditable, allStorageInfo = [], THISPAGE = {
    init: function (t) {
        this.mod_PageConfig = Public.mod_PageConfig.init("transfers"), system.isAdmin || this.getAllStorage(), this.loadGrid(t), this.initDom(t), this.initCombo(), this.addEvent(), t.id > 0 && t.checked ? this.disableEdit() : (this.editable = !0, $("#grid").jqGrid("setGridParam", {cellEdit: !0})), $.cookie("BarCodeInsert") && (THISPAGE.$_barCodeInsert.addClass("open"), THISPAGE.$_barCodeInsert.removeClass("close")), this.goodsEdittypeInit()
    }, initDom: function (t) {
        this.$_date = $("#date").val(SYSTEM.endDate), this.$_number = $("#number"), this.$_note = $("#note"), this.$_toolTop = $("#toolTop"), this.$_toolBottom = $("#toolBottom"), this.$_userName = $("#userName"), this.$_modifyTime = $("#modifyTime"), this.$_modifyName = $("#modifyName"), this.$_createTime = $("#createTime"), this.$_checkName = $("#checkName"), this.$_checkTime = $("#checkTime"), this.$_note.placeholder(), this.$_date.datepicker({
            onSelect: function (t) {
                if (!(originalData.id > 0)) {
                    var e = t.format("yyyy-MM-dd");
                    THISPAGE.$_number.text(""), Public.ajaxPost("/basedata/systemProfile.do?action=generateDocNo", {
                        billType: "TRANSFER",
                        billDate: e
                    }, function (t) {
                        200 === t.status ? THISPAGE.$_number.text(t.data.billNo) : parent.Public.tips({
                                type: 1,
                                content: t.msg
                            })
                    })
                }
            }
        });
        var e = '<a id="savaAndAdd" class="ui-btn ui-btn-sp mrb">保存并新增</a><a id="save" class="ui-btn">保存</a>', a = '<a id="add" class="ui-btn ui-btn-sp mrb">新增</a><a id="copy" class="ui-btn">复制</a><a href="javascript:;" target="_blank" id="print" class="ui-btn mrb">打印</a><a id="edit" class="ui-btn mrb">保存</a>', i = '<a id="add" class="ui-btn ui-btn-sp mrb">新增</a><a id="copy" class="ui-btn">复制</a><a href="javascript:;" target="_blank" id="print" class="ui-btn mrb">打印</a><b></b></a>';
        1 == SYSTEM.ISSERNUM && (a = '<a id="add" class="ui-btn ui-btn-sp mrb">新增</a><a id="copy" class="ui-btn">复制</a><a target="_blank" id="print" class="ui-btn mrb">打印</a><a id="edit" class="ui-btn">保存</a><a id="SN_export" class="ui-btn">导出SN</a>', i = '<a id="add" class="ui-btn ui-btn-sp mrb">新增</a><a id="copy" class="ui-btn">复制</a><a target="_blank" id="print" class="ui-btn mrb">打印</a><a id="SN_export" class="ui-btn">导出SN</a>');
        var n = "", o = "";
        billRequiredCheck ? (n = '<a class="ui-btn" id="audit">审核</a>', o = '<a class="ui-btn" id="reAudit">反审核</a>') : this.$_checkName.parent().hide();
        var r = '<a class="ui-btn-prev" id="prev" title="上一张"><b></b></a><a class="ui-btn-next" id="next" title="下一张"><b></b></a>';
        if (this.btn_add = e, e += "", this.btn_edit = a, this.btn_audit = n, this.btn_view = i, this.btn_reaudit = o, this.btn_tempSave = "", t.id > 0) {
            if (this.$_number.text(t.billNo), $("#editBills").css("display", "none"), this.$_date.val(t.date), t.description && this.$_note.val(t.description), $("#grid").jqGrid("footerData", "set", {
                    qty: t.totalQty,
                    amount: t.totalAmount
                }), "list" !== urlParam.flag && (r = ""), "edit" === t.status) {
                var s = "<span id=groupBtn>" + a + n + "</span>" + r;
                t.temp || (s += ""), this.$_toolBottom.html(s), t.temp, this.$_checkTime.parent().hide(), this.$_checkName.parent().hide()
            } else t.checked ? ($("#mark").addClass("has-audit"), this.$_toolBottom.html('<span id="groupBtn">' + i + o + "</span>" + r)) : (this.$_toolBottom.html('<span id="groupBtn">' + i + "</span>" + r), this.$_checkTime.parent().hide(), this.$_checkName.parent().hide());
            this.transfersListIds = parent.transfersListIds || [], this.idPostion = $.inArray(String(t.id), this.transfersListIds), this.idLength = this.transfersListIds.length, 0 === this.idPostion && $("#prev").addClass("ui-btn-prev-dis"), this.idPostion === this.idLength - 1 && $("#next").addClass("ui-btn-next-dis"), this.$_userName.html(t.userName), this.$_modifyTime.html(t.modifyTime), this.$_modifyName.html(t.modifyName), this.$_createTime.html(t.createTime), this.$_checkName.html(t.checkName), this.$_checkTime.html(t.checkTime)
        } else billRequiredCheck ? this.$_toolBottom.html("<span id=groupBtn>" + e + n + "</span>") : this.$_toolBottom.html('<span id="groupBtn">' + e + "</span>"), this.$_userName.html(SYSTEM.realName || ""), this.$_modifyTime.parent().hide(), this.$_modifyName.parent().hide(), this.$_createTime.parent().hide(), this.$_checkName.parent().hide(), this.$_checkTime.parent().hide();
        disEditable && (THISPAGE.disableEdit(), this.$_toolBottom.hide())
    }, loadGrid: function (t) {
        function e(t) {
            if (t)var e = t.toString().replace(",", "");
            t = parseFloat(e);
            var a = qtyPlaces;
            if (0 === t || isNaN(t))return "";
            var i = /(\d{1,3})(?=(\d{3})+(?:$|\D))/g;
            return (t = t.toFixed(a).split("."))[1] ? t[0].replace(i, "$1,") + "." + t[1] : t[0].replace(i, "$1,")
        }

        function a(t) {
            var e = $("#" + t).data("goodsInfo"), a = $("#grid").jqGrid("getRowData", t);
            if (a && e && a.batch && (e.batch = a.batch), e) {
                $("#grid").jqGrid("getDataIDs");
                e.batch || $("#grid").jqGrid("setCell", t, "batch", "&#160;"), e.safeDays || ($("#grid").jqGrid("setCell", t, "prodDate", "&#160;"), $("#grid").jqGrid("setCell", t, "safeDays", "&#160;"), $("#grid").jqGrid("setCell", t, "validDate", "&#160;")), 1 == e.isWarranty && $("#grid").jqGrid("showCol", "batch"), e.safeDays > 0 && ($("#grid").jqGrid("showCol", "prodDate"), $("#grid").jqGrid("showCol", "safeDays"), $("#grid").jqGrid("showCol", "validDate")), e.prices && e.saleUnitName && (e.mainUnit = e.saleUnitName, e.unitId = e.saleUnitId, $("#" + t).data("unitInfo", {
                    unitId: e.saleUnitId,
                    name: e.saleUnitName
                }));
                Number(e.purPrice);
                if ("number" != typeof invorder)var i = e.skuName || "", n = e.skuId || ""; else var i = e.invSkus[invorder].skuName || "", n = e.invSkus[invorder].skuId || "";
                var o = {
                    barCode: e.barCode,
                    skuName: i,
                    mainUnit: e.mainUnit || e.unitName,
                    unitId: e.unitId,
                    qty: e.qty || 1,
                    price: e.price || e.salePrice,
                    discountRate: e.discountRate || 0,
                    deduction: e.deduction || 0,
                    amount: e.amount || e.salePrice,
                    inLocationName: e.inLocationName,
                    inLocationId: e.inLocationId,
                    outLocationName: e.locationName || e.outLocationName,
                    outLocationId: e.locationId || e.outLocationId,
                    serNumList: e.serNumList,
                    safeDays: e.safeDays,
                    isSerNum: e.isSerNum
                };
                SYSTEM.ISSERNUM && 1 == e.isSerNum && (o.qty = o.serNumList ? o.serNumList.length : 0);
                var r = $("#grid").jqGrid("setRowData", t, o);
                invorder = "", r && (THISPAGE.calTotal(), 1 == issearch && setTimeout(function () {
                    $("#" + t).data("skuInfo", {id: n, name: i})
                }, 100), 1 == fdialog && setTimeout(function () {
                    $("#" + t).find("td[aria-describedby=grid_locationName]").trigger("click"), $("#" + t).next().find(".goods").trigger("click")
                }, 100), issearch = 0, fdialog = 0, invorder = "STR")
            }
        }

        var i, n, o = this, r = (new Date).format();
        if (t.id) {
            for (d = 0; d < t.entries.length; d++)t.entries[d].id = d + 1;
            var s = 5 - t.entries.length;
            if (s > 0)for (var d = 0; d < s; d++)t.entries.push({})
        }
        o.newId = 6;
        var l = [{
            name: "operating",
            label: " ",
            nameExt: "",
            width: 1,
            fixed: !0,
            formatter: Public.billsOper_goods,
            align: "left"
        }, {
            name: "goods",
            label: '<span class="red">*</span>商品',
            nameExt: '<label> -- 扫描枪录入</label><span id="barCodeInsert" class="close"><span class="ui-icon-circle"></span></span>',
            width: 318,
            classes: "goods",
            formatter: function (t, e, i) {
                return t ? "undefined undefined" == t ? "&#160;" : (a(e.rowId), t) : i.invNumber ? i.invSpec ? i.invNumber + " " + i.invName + "_" + i.invSpec : i.invNumber + " " + i.invName : "&#160;"
            },
            editable: !0,
            edittype: "custom",
            editoptions: {
                custom_element: function (t, e) {
                    return $(".goodsAuto")[0]
                }, custom_value: function (t, e, a) {
                    if ("get" === e)return "" !== $(".goodsAuto").getCombo().getValue() ? $(t).val() : ($(t).parents("tr").removeData("goodsInfo"), "");
                    "set" === e && $("input", t).val(a)
                }, handle: function () {
                    $("#initCombo").append($(".goodsAuto").val("").unbind("focus.once"))
                }, trigger: "ui-icon-ellipsis"
            },
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
        }, {name: "unitId", label: "单位Id", hidden: !0}, (i = {
            name: "batch",
            label: "批次",
            width: 90,
            classes: "ui-ellipsis batch",
            hidden: !0,
            title: !1,
            editable: !0,
            align: "left",
            edittype: "custom"
        }, _defineProperty(i, "edittype", "custom"), _defineProperty(i, "editoptions", {
            custom_element: function (t, e) {
                return $(".batchAuto")[0]
            }, custom_value: function (t, e, a) {
                if ("get" === e)return t.val();
                "set" === e && $("input", t).val(a)
            }, handle: function () {
                $("#initCombo").append($(".batchAuto").val(""))
            }, trigger: "ui-icon-ellipsis"
        }), i), (n = {
            name: "prodDate",
            label: "生产日期",
            width: 90,
            hidden: !0,
            title: !1,
            editable: !0,
            edittype: "custom"
        }, _defineProperty(n, "edittype", "custom"), _defineProperty(n, "editoptions", {
            custom_element: function (t, e) {
                return $(".dateAuto")[0]
            }, custom_value: function (t, e, a) {
                if ("get" === e)return t.val();
                "set" === e && $("input", t).val(a)
            }, handle: function () {
                $("#initCombo").append($(".dateAuto"))
            }
        }), n), {name: "safeDays", label: "保质期(天)", width: 90, hidden: !0, title: !1, align: "left"}, {
            name: "validDate",
            label: "有效期至",
            width: 90,
            hidden: !0,
            title: !1,
            align: "left"
        }, {
            name: "producer",
            label: "产地",
            width: 90,
            hidden: !0,
            title: !1,
            align: "left",
            editable: !1
        }, {
            name: "registrationNo",
            label: "注册证号",
            width: 90,
            hidden: !0,
            title: !1,
            align: "left",
            editable: !1
        }, {
            name: "proLicense",
            label: "生产许可证",
            width: 90,
            hidden: !0,
            title: !1,
            align: "left",
            editable: !1
        }, {
            name: "qty",
            label: '<span class="red">*</span>数量',
            width: 80,
            align: "right",
            classes: "right",
            unformat: function (t, e, a) {
                e.colModel.formatter;
                var i, n, o = e.colModel.formatoptions || {}, r = /([\.\*\_\'\(\)\{\}\+\?\\])/g;
                return n = (o = $.extend({}, ($.jgrid.formatter || {}).currency, o)).thousandsSeparator.replace(r, "\\$1"), stripTag = new RegExp(n, "g"), i = $(a).text(), o.prefix && o.prefix.length && (i = i.substr(o.prefix.length)), o.suffix && o.suffix.length && (i = i.substr(0, i.length - o.suffix.length)), i = i.replace(stripTag, "").replace(o.decimalSeparator, ".").replace("SN", "")
            },
            formatter: function (t, a, i) {
                var t = e(t), n = $("#" + a.rowId).data("goodsInfo");
                return "合计" !== i.goods && (Number(i.isSerNum) || n && "1" == n.isSerNum || i.invSerNumList) && (n && i.skuName && i.skuName !== n.skuName && (t = ""), n && n.serNumList && n.serNumList.length > 0 || i.invSerNumList ? "" == t ? (n.serNumList = [], t = "<span class='qtyInsert'>SN</span>") : t = "<span class='qtyInsertAfter'>SN</span>" + t : t = "<span class='qtyInsert'>SN</span>"), t || "&#160;"
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
            name: "inventory",
            label: " ",
            width: 20,
            align: "center",
            formatter: Public.billsQueryInventory
        }, {
            name: "outLocationName",
            label: '<span class="red">*</span>调出仓库',
            nameExt: '<small id="batch-storageA">批量</small>',
            sortable: !1,
            width: 100,
            link: "inventory",
            title: !0,
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
            name: "inLocationName",
            label: '<span class="red">*</span>调入仓库',
            nameExt: '<small id="batch-storageB">批量</small>',
            width: 100,
            title: !0,
            editable: !0,
            edittype: "custom",
            editoptions: {
                custom_element: function (t, e) {
                    return $(".inStorage")[0]
                }, custom_value: function (t, e, a) {
                    if ("get" === e)return "" !== $(".inStorage").getCombo().getValue() ? $(t).val() : ($(t).parents("tr").removeData("inStorage"), "");
                    "set" === e && $("input", t).val(a)
                }, handle: function () {
                    $("#initCombo").append($(".inStorage").val(""))
                }, trigger: "ui-icon-triangle-1-s"
            }
        }, {name: "description", label: "备注", width: 150, title: !0, editable: !0}, {
            name: "isSerNum",
            label: "是否有序列号",
            hidden: !0
        }];
        o.mod_PageConfig.gridReg("grid", l), l = o.mod_PageConfig.conf.grids.grid.colModel, $("#grid").jqGrid({
            data: t.entries,
            datatype: "clientSide",
            autowidth: !0,
            height: "100%",
            rownumbers: !0,
            gridview: !0,
            onselectrow: !1,
            colModel: l,
            cmTemplate: {sortable: !1},
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
                    o.newId = a + 1;
                    for (var i = 0; i < a; i++) {
                        var n = i + 1, r = e[i];
                        if ($.isEmptyObject(e[i]))break;
                        var s = $.extend(!0, {
                            id: r.invId,
                            number: r.invNumber,
                            name: r.invName,
                            spec: r.invSpec,
                            unitId: r.unitId,
                            unitName: r.mainUnit,
                            isSerNum: r.isSerNum,
                            serNumList: r.serNumList || r.invSerNumList
                        }, r);
                        Business.cacheManage.getGoodsInfoByNumber(s.number, function (t) {
                            s.isSerNum = t.isSerNum, s.isWarranty = r.isWarranty = t.isWarranty, s.safeDays = r.safeDays = t.safeDays, s.barCode = r.barCode = t.barCode, s.invSkus = t.invSkus, s.id = r.invId, $("#" + n).data("goodsInfo", s).data("storageInfo", {
                                id: r.outLocationId,
                                name: r.outLocationName
                            }).data("inStorage", {
                                id: r.inLocationId,
                                name: r.inLocationName
                            }).data("unitInfo", {unitId: r.unitId, name: r.mainUnit}).data("skuInfo", {
                                name: r.skuName,
                                id: r.skuId
                            })
                        }), 1 == r.isWarranty && $("#grid").jqGrid("showCol", "batch"), r.safeDays > 0 && ($("#grid").jqGrid("showCol", "prodDate"), $("#grid").jqGrid("showCol", "safeDays"), $("#grid").jqGrid("showCol", "validDate"))
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
                        (e = $.extend(!0, {}, e)).skuName = a.skuName, e.mainUnit = a.mainUnit, e.unitId = a.unitId, e.qty = a.qty, e.price = a.price, e.discountRate = a.discountRate, e.deduction = a.deduction, e.amount_old = a.amount, e.taxRate = a.taxRate, e.tax = a.tax, e.taxAmount = a.taxAmount, e.inLocationId = a.inLocationId, e.inLocationName = a.inLocationName, e.outLocationId = a.outLocationId, e.outLocationName = a.outLocationName, $("#" + t).data("goodsInfo", e)
                    }
                }

                if (THISPAGE.curID = t, "goods" === e && (o(), $("#" + i + "_goods", "#grid").val(a), THISPAGE.goodsCombo.selectByText(a)), "skuName" === e) {
                    if (o(), !(s = $("#" + t).data("goodsInfo")) || !s.invSkus || !s.invSkus.length)return $("#grid").jqGrid("restoreCell", i, n), curCol = n + 1, $("#grid").jqGrid("nextCell", i, n + 1), void THISPAGE.skuCombo.loadData([]);
                    if ("string" == typeof s.invSkus && (s.invSkus = $.parseJSON(s.invSkus)), $("#" + i + "_skuName", "#grid").val(a), THISPAGE.skuCombo.loadData(s.invSkus || [], -1, !1), THISPAGE.skuCombo.selectByText(a), !(s = $("#" + t).data("goodsInfo")))return;
                    SYSTEM.ISSERNUM && 1 == s.isSerNum && Business.serNumManage({
                        row: $("#" + t),
                        enableStorage: !0,
                        enableSku: !0,
                        beforeSet: function (t) {
                            t.outLocationName = t.locationName, t.outLocationId = t.locationId
                        }
                    })
                }
                if ("qty" === e) {
                    if (o(), !(s = $("#" + t).data("goodsInfo")))return;
                    $("#" + i + "_qty", "#grid").val(a), SYSTEM.ISSERNUM && 1 == s.isSerNum && Business.serNumManage({
                        row: $("#" + t),
                        beforeSet: function (t) {
                            t.outLocationName = t.locationName, t.outLocationId = t.locationId
                        }
                    })
                }
                if ("outLocationName" === e) {
                    if ($("#" + i + "_outLocationName", "#grid").val(a), THISPAGE.outStorageCombo.selectByText(a), !(s = $("#" + t).data("goodsInfo")))return;
                    SYSTEM.ISSERNUM && 1 == s.isSerNum && Business.serNumManage({
                        row: $("#" + t),
                        enableStorage: !0,
                        enableSku: !0,
                        beforeSet: function (t) {
                            t.outLocationName = t.locationName, t.outLocationId = t.locationId
                        }
                    })
                }
                if ("inLocationName" === e && ($("#" + i + "_inLocationName", "#grid").val(a), THISPAGE.inStorageCombo.selectByText(a)), "batch" === e) {
                    var r = $(this);
                    if (o(), !(s = $("#" + t).data("goodsInfo")).isWarranty)return;
                    if (!s)return $("#grid").jqGrid("restoreCell", i, n), curCol = n + 1, void $("#grid").jqGrid("nextCell", i, n + 1);
                    $("#grid").jqGrid("setCell", t, "prodDate", "", "not-editable-cell"), $("#grid").jqGrid("setCell", t, "producer", "", "not-editable-cell"), $("#grid").jqGrid("setCell", t, "registrationNo", "", "not-editable-cell"), $("#grid").jqGrid("setCell", t, "proLicense", "", "not-editable-cell"), Business.showBatchDialog(THISPAGE, r, "sales", $("#" + t), ""), $("#" + i + "_batch", "#grid").val(a), THISPAGE.batchCombo.selectByText(a)
                }
                if ("prodDate" === e) {
                    var s = $("#" + t).data("goodsInfo");
                    if (!s)return $("#grid").jqGrid("restoreCell", i, n), curCol = n + 1, void $("#grid").jqGrid("nextCell", i, n + 1);
                    if (!s.safeDays)return $("#grid").jqGrid("restoreCell", i, n), curCol = n + 1, void $("#grid").jqGrid("nextCell", i, n + 1);
                    a ? THISPAGE.cellPikaday.setDate(a) : THISPAGE.cellPikaday.setDate(THISPAGE.cellPikaday.getDate() || new Date)
                }
                if ("mainUnit" === e) {
                    $("#" + i + "_mainUnit", "#grid").val(a);
                    var d = $("#" + t).data("unitInfo") || {};
                    if (!d.unitId || "0" === d.unitId)return $("#grid").jqGrid("restoreCell", i, n), curCol = n + 1, void $("#grid").jqGrid("nextCell", i, n + 1);
                    THISPAGE.unitCombo.loadData(function () {
                        for (var t = {}, e = 0; e < SYSTEM.unitInfo.length; e++) {
                            var a = SYSTEM.unitInfo[e], i = d.unitId;
                            d.unitId == a.id && (d = a), d.unitId = i;
                            var n = a.unitTypeId || e;
                            t[n] || (t[n] = []), t[n].push(a)
                        }
                        return d.unitTypeId ? t[d.unitTypeId] : [d]
                    }), THISPAGE.unitCombo.selectByText(a)
                }
            },
            formatCell: function (t, e, a, i, n) {
                if ("qty" == e && a) {
                    var o = a.split("</span>");
                    return 2 === o.length ? o[1] : o[0] || "&160;"
                }
            },
            beforeSubmitCell: function (t, e, a, i, n) {
            },
            beforeSaveCell: function (t, e, a, i, n) {
                if ("goods" === e) {
                    var r = $("#" + t).data("goodsInfo");
                    if (r && !r.isWarranty && ($("#grid").jqGrid("setCell", t, "producer", "", "not-editable-cell"), $("#grid").jqGrid("setCell", t, "registrationNo", "", "not-editable-cell"), $("#grid").jqGrid("setCell", t, "proLicense", "", "not-editable-cell")), !r || THISPAGE.$_barCodeInsert && THISPAGE.$_barCodeInsert.hasClass("open")) {
                        var s, d = function (e) {
                            $("#" + t).data("goodsInfo", e).data("storageInfo", {
                                id: e.locationId,
                                name: e.locationName
                            }).data("unitInfo", {unitId: e.unitId, name: e.unitName}), s = Business.formatGoodsName(e)
                        };
                        return THISPAGE.$_barCodeInsert && THISPAGE.$_barCodeInsert.hasClass("open") ? Business.cacheManage.getGoodsInfoByBarCode($.trim(a), d, !0) : Business.cacheManage.getGoodsInfoByNumber(a, d, !0), s ? ($("#" + t).find(".btn_query_inventory").show(), s) : ($.dialog({
                                width: 775,
                                height: 510,
                                title: "选择商品",
                                content: "url:/settings/goods-batch.jsp",
                                data: {
                                    skuMult: SYSTEM.enableAssistingProp, skey: a, callback: function (t, e, a) {
                                        "" === e && ($("#grid").jqGrid("addRowData", t, {}, "last"), o.newId = t + 1), setTimeout(function () {
                                            $("#grid").jqGrid("editCell", a, 2, !0)
                                        }, 10), o.calTotal()
                                    }
                                },
                                lock: !0,
                                button: [{
                                    name: "选中", defClass: "ui_state_highlight fl", focus: !0, callback: function () {
                                        return this.content.callback && this.content.callback(), !1
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
                            }), setTimeout(function () {
                                $("#grid").jqGrid("editCell", curRow, 2, !0), $("#grid").jqGrid("setCell", curRow, 2, "")
                            }, 10), "&#160;")
                    }
                }
                return $("#" + t).find(".btn_query_inventory").show(), a
            },
            afterSaveCell: function (t, e, a, i, n) {
                switch (e) {
                    case"goods":
                        var s = $("#grid").jqGrid("getDataIDs"), d = Math.max.apply(null, s) + 1;
                        o.newId;
                        0 == $("#" + t).next().length && ($("#grid").jqGrid("addRowData", d, {}, "last"), o.newId = d + 1);
                        break;
                    case"qty":
                        THISPAGE.calTotal();
                        break;
                    case"batch":
                        l = $("#grid").jqGrid("getRowData", t);
                        if ((u = $("#" + t).data("goodsInfo") || {}).safeDays) {
                            c = {};
                            if ($.trim(l.prodDate) || (c.prodDate = r), $.trim(l.safeDays) || (c.safeDays = u.safeDays), !$.trim(l.validDate)) {
                                g = (m = l.prodDate || c.prodDate).split("-");
                                if ("Invalid Date" === (m = new Date(g[0], g[1] - 1, g[2])).toString())return defaultPage.Public.tips({
                                    type: 2,
                                    content: "日期格式错误！"
                                }), void setTimeout(function () {
                                    $("#grid").jqGrid("editCellByColName", t, "prodDate")
                                }, 10);
                                m && (m.addDays(Number(l.safeDays || c.safeDays)), c.validDate = m.format())
                            }
                            $.isEmptyObject(c) || $("#grid").jqGrid("setRowData", t, c)
                        }
                        break;
                    case"prodDate":
                        var l = $("#grid").jqGrid("getRowData", t), u = $("#" + t).data("goodsInfo") || {}, c = {};
                        $.trim(l.safeDays) || (c.safeDays = u.safeDays), $.trim(a) || (c.prodDate = r);
                        var m = a || c.prodDate, g = m.split("-");
                        if ("Invalid Date" === (m = new Date(g[0], g[1] - 1, g[2])).toString())return defaultPage.Public.tips({
                            type: 2,
                            content: "日期格式错误！"
                        }), void setTimeout(function () {
                            $("#grid").jqGrid("editCellByColName", t, "prodDate")
                        }, 10);
                        m && (m.addDays(Number(l.safeDays || c.safeDays)), c.validDate = m.format()), $("#grid").jqGrid("setRowData", t, c)
                }
            },
            loadonce: !0,
            resizeStop: function (t, e) {
                o.mod_PageConfig.setGridWidthByIndex(t, e, "grid")
            },
            footerrow: !0,
            userData: {goods: "合计：", qty: t.totalQty, amount: t.totalAmount},
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
                    }, trigger: "ui-icon-ellipsis"
                }
            })
    }, reloadData: function (t) {
        $("#grid").clearGridData();
        var e = this;
        originalData = t;
        for (i = 0; i < t.entries.length; i++)t.entries[i].id = i + 1;
        var a = 8 - t.entries.length;
        if (a > 0)for (var i = 0; i < a; i++)t.entries.push({});
        $("#grid").jqGrid("setGridParam", {
            data: t.entries,
            userData: {
                billNo: "合计：",
                billPrice: t.billPrice,
                hasCheck: t.billHasCheck,
                notCheck: t.billNotCheck,
                nowCheck: t.billNowCheck
            },
            cellEdit: !0,
            datatype: "clientSide"
        }).trigger("reloadGrid"), e.$_date.val(t.date), e.$_number.text(t.billNo), e.$_note.val(t.note), e.$_userName.html(t.userName), t.note && e.$_note.val(t.note), e.$_userName.html(t.userName), e.$_modifyTime.html(t.modifyTime), e.$_modifyName.html(t.modifyName), e.$_createTime.html(t.createTime), e.$_checkName.html(t.checkName), e.$_checkTime.html(t.checkTime), "edit" === t.status ? this.editable || (e.enableEdit(), $("#groupBtn").html(e.btn_edit + e.btn_audit), $("#mark").removeClass("has-audit")) : this.editable && (e.disableEdit(), $("#groupBtn").html(e.btn_view + e.btn_reaudit), $("#mark").addClass("has-audit"))
    }, initCombo: function () {
        this.goodsCombo = Business.billGoodsCombo($(".goodsAuto"), {
            userData: {
                beforeSet: function (t) {
                    t.outLocationName = t.locationName, t.outLocationId = t.locationId
                }, billType: "sales"
            }
        }), this.skuCombo = Business.billskuCombo($(".skuAuto"), {data: []}), this.outStorageCombo = $(".storageAuto").combo({
            data: function () {
                if (defaultPage.SYSTEM.storageInfo) {
                    for (var t = [], e = 0; e < defaultPage.SYSTEM.storageInfo.length; e++) {
                        var a = defaultPage.SYSTEM.storageInfo[e];
                        a.delete || t.push(a)
                    }
                    return t
                }
                return "/basedata/invlocation.do?action=list&isDelete=2"
            },
            text: "name",
            value: "id",
            defaultSelected: 0,
            cache: !1,
            trigger: !1,
            defaultFlag: !1,
            editable: !0,
            callback: {
                onChange: function (t) {
                    var e = this.input.parents("tr"), a = e.data("storageInfo");
                    a || (a = {}), t && (a.id = t.id, a.name = t.name), e.data("storageInfo", a)
                }
            }
        }).getCombo(), this.inStorageCombo = $(".inStorage").combo({
            data: function () {
                var t = [], e = [];
                e = system.isAdmin ? defaultPage.SYSTEM.storageInfo : allStorageInfo;
                for (var a = 0; a < e.length; a++) {
                    var i = e[a];
                    i.delete || t.push(i)
                }
                return t
            },
            text: "name",
            value: "id",
            defaultSelected: 0,
            cache: !1,
            editable: !0,
            trigger: !1,
            defaultFlag: !1,
            callback: {
                onChange: function (t) {
                    var e = this.input.parents("tr"), a = e.data("inStorage");
                    a || (a = {}), t && (a.id = t.id, a.name = t.name), e.data("inStorage", a)
                }
            }
        }).getCombo(), $("#batchStorage").combo({
            data: function () {
                return parent.SYSTEM.storageInfo
            },
            text: "name",
            value: "id",
            defaultSelected: 0,
            cache: !1,
            editable: !1,
            trigger: !0,
            defaultFlag: !1,
            callback: {
                onChange: function (t) {
                }
            }
        }), this.unitCombo = Business.unitCombo($(".unitAuto"), {
            defaultSelected: -1,
            forceSelection: !1
        }), this.cellPikaday = new Pikaday({
            field: $(".dateAuto")[0],
            editable: !1
        }), this.batchCombo = Business.batchCombo($(".batchAuto"))
    }, getAllStorage: function () {
        SYSTEM.isAdmin || SYSTEM.rights.INVLOCTION_QUERY ? Public.ajaxGet("/basedata/invlocation.do?action=listNotAuth&isDelete=0", {}, function (t) {
                200 === t.status ? (allStorageInfo = t.data.rows, THISPAGE.initAllStorageBox()) : 250 === t.status ? allStorageInfo = [] : Public.tips({
                            type: 1,
                            content: t.msg
                        })
            }) : allStorageInfo = []
    }, initAllStorageBox: function () {
        var t = "<ul>", e = 0;
        for (allStorageInfo.length; e < allStorageInfo.length; e++)t += '<li data-id="' + allStorageInfo[e].id + '" data-name="' + allStorageInfo[e].name + '" >' + allStorageInfo[e].locationNo + " " + allStorageInfo[e].name + "</li>";
        t += "</ul>", $("#allstorageBox").html(t)
    }, addEvent: function () {
        var t = this;
        this.$_date.bind("keydown", function (t) {
            13 === t.which && $("#grid").jqGrid("editCell", 1, 2, !0)
        }).bind("focus", function (e) {
            t.dateValue = $(this).val()
        }).bind("blur", function (e) {
            /((^((1[8-9]\d{2})|([2-9]\d{3}))(-)(10|12|0?[13578])(-)(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(-)(11|0?[469])(-)(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(-)(0?2)(-)(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)(-)(0?2)(-)(29)$)|(^([3579][26]00)(-)(0?2)(-)(29)$)|(^([1][89][0][48])(-)(0?2)(-)(29)$)|(^([2-9][0-9][0][48])(-)(0?2)(-)(29)$)|(^([1][89][2468][048])(-)(0?2)(-)(29)$)|(^([2-9][0-9][2468][048])(-)(0?2)(-)(29)$)|(^([1][89][13579][26])(-)(0?2)(-)(29)$)|(^([2-9][0-9][13579][26])(-)(0?2)(-)(29)$))/.test($(this).val()) || (parent.Public.tips({
                type: 2,
                content: "日期格式有误！如：2012-08-08。"
            }), $(this).val(t.dateValue))
        }), $(".grid-wrap").on("click", ".ui-icon-triangle-1-s", function (t) {
            var e = $(this).siblings().getCombo();
            setTimeout(function () {
                e.active = !0, e.doQuery()
            }, 10)
        }), Business.coderRuleEvent(t, "TRANSFER", t.$_date.val()), $("#batch-storageA").powerFloat({
            eventType: "click",
            hoverHold: !1,
            reverseSharp: !0,
            target: function () {
                return null !== curRow && null !== curCol && ($("#grid").jqGrid("saveCell", curRow, curCol), curRow = null, curCol = null), $(".wrapper").data("batch", "storageA"), $("#storageBox")
            }
        }), $("#batch-storageB").powerFloat({
            eventType: "click", hoverHold: !1, reverseSharp: !0, target: function () {
                return null !== curRow && null !== curCol && ($("#grid").jqGrid("saveCell", curRow, curCol), curRow = null, curCol = null), $(".wrapper").data("batch", "storageB"), system.isAdmin ? $("#storageBox") : $("#allstorageBox")
            }
        }), $(".wrapper").on("click", "#storageBox li,#allstorageBox li", function (t) {
            var e = $(this).data("id"), a = $(this).data("name"), i = $("#grid").jqGrid("getDataIDs");
            if ("storageA" === $(".wrapper").data("batch"))var n = "outLocationName", o = "storageInfo"; else var n = "inLocationName", o = "inStorage";
            for (var r = 0, s = i.length; r < s; r++) {
                var d = i[r], l = $("#grid").jqGrid("getRowData", d), u = $("#" + d);
                if ("" !== l.goods && void 0 !== u.data("goodsInfo")) {
                    var c = {};
                    c[n] = a, $("#grid").jqGrid("setRowData", d, c), $("#" + d).data(o, {id: e, name: a})
                }
            }
            $.powerFloat.hide()
        }), Business.billsEvent(t, "transfers"), $("#grid").on("click", 'tr[role="row"]', function (t) {
            if ($("#mark").hasClass("has-audit")) {
                var e = $(this), a = (e.prop("id"), e.data("goodsInfo"));
                if (!a)return;
                SYSTEM.ISSERNUM && 1 == a.isSerNum && Business.serNumManage({row: e, view: !0})
            }
        }), $(".wrapper").on("click", "#SN_export", function (t) {
            t.preventDefault();
            if (Business.verifyRight("TF_EXPORT") && Business.noDataExportTips()) {
                var e = {id: originalData.id, type: "REQUISITION"};
                Business.getFile("/scm/invSa.do?action=exportSN", e)
            }
        }), $(".wrapper").on("click", "#save", function (e) {
            e.preventDefault();
            var a = $(this), i = THISPAGE.getPostData();
            setTimeout(function () {
                function e() {
                    a.ajaxPost("/scm/invTf.do?action=add", {postData: JSON.stringify(i)}, function (e) {
                        200 === e.status ? (t.$_modifyTime.html((new Date).format("yyyy-MM-dd hh:mm:ss")).parent().show(), t.$_modifyName.html(system.realName).parent().show(), t.$_createTime.html((new Date).format("yyyy-MM-dd hh:mm:ss")).parent().show(), originalData.id = e.data.id, THISPAGE.copyflag = null, billRequiredCheck ? t.$_toolBottom.html('<span id="groupBtn">' + t.btn_edit + t.btn_audit + "</span>") : t.$_toolBottom.html('<span id="groupBtn">' + t.btn_edit + "</span>"), parent.Public.tips({content: "保存成功！"}), $("#editBills").css("display", "none"), Business.clearDirtyCell($("#grid")), originalData.status = "edit") : parent.Public.tips({
                                type: 1,
                                content: e.msg
                            })
                    })
                }

                if (i) {
                    "edit" === originalData.stata && (i.id = originalData.id, i.stata = "edit"), THISPAGE.copyflag && (i.copyflag = THISPAGE.copyflag);
                    var n = (n = i.date).replace(/-/g, "/");
                    (n = new Date(n + " 00:00:00").getTime()) > SYSTEM.curDate ? $.dialog.confirm("单据日期大于本日，确定保存？", function () {
                            e()
                        }) : e()
                }
            }, 200)
        }), $(".wrapper").on("click", "#edit", function (e) {
            function a() {
                n.ajaxPost("/scm/invTf.do?action=updateInvTf", {postData: JSON.stringify(i)}, function (e) {
                    200 === e.status ? (t.$_modifyTime.html((new Date).format("yyyy-MM-dd hh:mm:ss")).parent().show(), t.$_modifyName.html(system.realName).parent().show(), originalData.id = e.data.id, parent.Public.tips({content: "修改成功！"}), Business.clearDirtyCell($("#grid")), originalData.status = "edit") : parent.Public.tips({
                            type: 1,
                            content: e.msg
                        })
                })
            }

            if (e.preventDefault(), Business.verifyRight("TF_UPDATE")) {
                var i = THISPAGE.getPostData(), n = $(this);
                if (i) {
                    var o = (o = i.date).replace(/-/g, "/");
                    (o = new Date(o + " 00:00:00").getTime()) > SYSTEM.curDate ? $.dialog.confirm("单据日期大于本日，确定保存？", function () {
                            a()
                        }) : a()
                }
            }
        }), $(".wrapper").on("click", "#savaAndAdd", function (e) {
            e.preventDefault();
            var a = $(this), i = THISPAGE.getPostData();
            setTimeout(function () {
                function e() {
                    a.ajaxPost("/scm/invTf.do?action=addNew", {postData: JSON.stringify(i)}, function (e) {
                        if (200 === e.status) {
                            t.$_number.text(e.data.billNo), $("#grid").clearGridData(), $("#grid").clearGridData(!0);
                            for (var a = 1; a <= 5; a++)$("#grid").jqGrid("addRowData", a, {});
                            t.newId = 6, t.$_note.val(""), parent.Public.tips({content: "保存成功！"}), originalData.status = "add"
                        } else parent.Public.tips({type: 1, content: e.msg})
                    })
                }

                if (i) {
                    var n = (n = i.date).replace(/-/g, "/");
                    (n = new Date(n + " 00:00:00").getTime()) > SYSTEM.curDate ? $.dialog.confirm("单据日期大于本日，确定保存？", function () {
                            e()
                        }) : e()
                }
            }, 200)
        }), $(".wrapper").on("click", "#add", function (t) {
            t.preventDefault(), Business.verifyRight("TF_ADD") && parent.tab.overrideSelectedTabItem({
                tabid: "storage-transfers",
                text: "调拨单",
                url: "/scm/invTf.do?action=initTf"
            })
        }), $(".wrapper").on("click", "#copy", function (e) {
            if (e.preventDefault(), Business.verifyRight("TF_ADD")) {
                var a = $(this);
                t.$_date = $("#date").val(SYSTEM.endDate);
                var i = THISPAGE.getPostData().date;
                a.ajaxPost("/basedata/systemProfile.do?action=generateDocNo", {
                    billType: "TRANSFER",
                    billDate: i
                }, function (e) {
                    if (200 === e.status) {
                        originalData.id = -1, THISPAGE.copyflag = 1, t.$_number.text(e.data.billNo), $("#mark").removeClass(), t.$_checkName.html(""), t.$_checkTime.html(""), t.enableEdit(), $("#groupBtn").html(t.btn_edit + t.btn_audit), t.$_modifyTime.html((new Date).format("yyyy-MM-dd hh:mm:ss")).parent().hide(), t.$_modifyName.html(system.realName).parent().hide(), t.$_createTime.html((new Date).format("yyyy-MM-dd hh:mm:ss")).parent().hide(), $("[aria-describedby=grid_srcOrderNo]").html(""), parent.Public.tips({content: "复制数据成功！"}), originalData.status = "add", $("#editBills").css("display", "inline-block");
                        var a = t.btn_add;
                        billRequiredCheck && (a += t.btn_audit), t.$_toolBottom.html('<span id="groupBtn">' + a + "</span>");
                        for (var i = $("#grid").jqGrid("getDataIDs"), n = 0; n < i.length; n++) {
                            var o = $("#" + i[n]).data("goodsInfo");
                            o && o.serNumList && $("#grid").jqGrid("setRowData", i[n], {qty: ""})
                        }
                    } else parent.Public.tips({type: 1, content: e.msg})
                })
            }
        }), $(".wrapper").on("click", "#print", function (t) {
            Business.verifyRight("TF_PRINT") ? Public.print({
                    title: "调拨单列表",
                    $grid: $("#grid"),
                    pdf: "/scm/invTf.do?action=toPdf",
                    billType: 10309,
                    filterConditions: {id: originalData.id}
                }) : t.preventDefault()
        }), $("#bottomField").on("click", "#prev", function (e) {
            if (e.preventDefault(), $(this).hasClass("ui-btn-prev-dis"))return parent.Public.tips({
                type: 2,
                content: "已经没有上一张了！"
            }), !1;
            t.idPostion = t.idPostion - 1, 0 === t.idPostion && $(this).addClass("ui-btn-prev-dis"), t.idPostion && (loading = $.dialog.loading("数据加载中...", 1e3, "loading.gif", !0), Public.ajaxGet("/scm/invTf.do?action=update", {id: t.transfersListIds[t.idPostion]}, function (t) {
                THISPAGE.reloadData(t.data), $("#next").removeClass("ui-btn-next-dis"), loading && loading.close()
            }))
        }), $("#bottomField").on("click", "#next", function (e) {
            if (e.preventDefault(), $(this).hasClass("ui-btn-next-dis"))return parent.Public.tips({
                type: 2,
                content: "已经没有下一张了！"
            }), !1;
            t.idPostion = t.idPostion + 1, t.idLength === t.idPostion + 1 && $(this).addClass("ui-btn-next-dis"), t.idPostion && (loading = $.dialog.loading("数据加载中...", 1e3, "loading.gif", !0), Public.ajaxGet("/scm/invTf.do?action=update", {id: t.transfersListIds[t.idPostion]}, function (t) {
                THISPAGE.reloadData(t.data), $("#prev").removeClass("ui-btn-prev-dis"), loading && loading.close()
            }))
        }), $(".wrapper").on("click", "#audit", function (e) {
            if (e.preventDefault(), Business.verifyRight("TF_CHECK")) {
                var a = $(this), i = THISPAGE.getPostData({checkSerNum: !0});
                setTimeout(function () {
                    function e() {
                        a.ajaxPost("/scm/invTf.do?action=checkInvTf", {postData: JSON.stringify(i)}, function (e) {
                            200 === e.status ? (originalData.id = e.data.id, $("#mark").addClass("has-audit"), t.$_checkName.html(SYSTEM.realName).parent().show(), t.$_checkTime.html((new Date).format("yyyy-MM-dd hh:mm:ss")).parent().show(), $("#edit").hide(), t.disableEdit(), $("#groupBtn").html(t.btn_view + t.btn_reaudit), parent.Public.tips({content: "审核成功！"}), $("#editBills").css("display", "none"), Business.clearDirtyCell($("#grid")), originalData.status = "edit") : (t.$_checkTime.parent().hide(), t.$_checkName.parent().hide(), parent.Public.tips({
                                    type: 1,
                                    content: e.msg
                                }))
                        })
                    }

                    if (i) {
                        var n = (n = i.date).replace(/-/g, "/");
                        (n = new Date(n + " 00:00:00").getTime()) > SYSTEM.curDate && "edit" !== originalData.status ? $.dialog.confirm("单据日期大于本日，确定保存？", function () {
                                e()
                            }) : e()
                    }
                }, 200)
            }
        }), $(".wrapper").on("click", "#reAudit", function (e) {
            e.preventDefault(), Business.verifyRight("TF_UNCHECK") && $(this).ajaxPost("/scm/invTf.do?action=rsBatchCheckInvTf", {id: originalData.id}, function (e) {
                200 === e.status ? ($("#mark").removeClass(), $("#edit").show(), t.$_checkName.html(""), t.$_checkTime.html(""), t.$_checkName.parent().hide(), t.$_checkTime.parent().hide(), t.enableEdit(), $("#groupBtn").html(t.btn_edit + t.btn_audit), parent.Public.tips({content: "反审核成功！"})) : parent.Public.tips({
                        type: 1,
                        content: e.msg
                    })
            })
        }), THISPAGE.$_barCodeInsert.click(function (e) {
            var a = 1;
            THISPAGE.$_barCodeInsert.hasClass("open") ? (THISPAGE.$_barCodeInsert.removeClass("open"), THISPAGE.$_barCodeInsert.addClass("close"), a = null) : (THISPAGE.$_barCodeInsert.addClass("open"), THISPAGE.$_barCodeInsert.removeClass("close")), t.goodsEdittypeInit(), $.cookie("BarCodeInsert", a)
        }), $("#operaLog").powerFloat({
            eventType: "hover", hoverHold: !1, reverseSharp: !0, target: function () {
                return $("#operaLogBox")
            }
        }), $("#config").show().click(function (e) {
            t.mod_PageConfig.config()
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
        t.$_note.val("")
    }, disableEdit: function () {
        this.$_date.attr("disabled", "disabled").addClass("ui-input-dis"), this.$_note.attr("disabled", "disabled").addClass("ui-input-dis"), $("#grid").jqGrid("setGridParam", {cellEdit: !1}), this.editable = !1
    }, enableEdit: function () {
        disEditable || (this.$_date.removeAttr("disabled").removeClass("ui-input-dis"), this.$_note.removeAttr("disabled").removeClass("ui-input-dis"), $("#grid").jqGrid("setGridParam", {cellEdit: !0}), this.editable = !0)
    }, calTotal: function () {
        for (var t = $("#grid").jqGrid("getDataIDs"), e = 0, a = 0, i = t.length; a < i; a++) {
            var n = t[a], o = $("#grid").jqGrid("getRowData", n);
            o.qty && (e += parseFloat(o.qty))
        }
        $("#grid").jqGrid("footerData", "set", {qty: e})
    }, _getEntriesData: function () {
        for (var t = [], e = $("#grid").jqGrid("getDataIDs"), a = 0, i = e.length; a < i; a++) {
            var n, o = e[a], r = $("#grid").jqGrid("getRowData", o);
            if ("" !== r.goods) {
                var s = $("#" + o).data("goodsInfo"), d = $("#" + o).data("storageInfo"), l = $("#" + o).data("inStorage"), u = $("#" + o).data("unitInfo") || {}, c = $("#" + o).data("skuInfo") || {};
                if (s.invSkus && s.invSkus.length > 0 && !c.id)return parent.Public.tips({
                    type: 2,
                    content: "请选择相应的属性！"
                }), $("#grid").jqGrid("editCellByColName", o, "skuName"), !1;
                if (!d || !d.id)return parent.Public.tips({
                    type: 2,
                    content: "请选择调出仓库！"
                }), $("#grid").jqGrid("editCellByColName", o, "outLocationName"), !1;
                if (!l || !l.id)return parent.Public.tips({
                    type: 2,
                    content: "请选择调入仓库！"
                }), $("#grid").jqGrid("editCellByColName", o, "inLocationName"), !1;
                if (SYSTEM.ISSERNUM) {
                    var m = s.serNumList;
                    if (m || m && m.length != s.qty); else {
                        var g = !1;
                        if (1 == s.isSerNum && (g = !0), g)return parent.Public.tips({
                            type: 2,
                            content: "请点击数量设置【" + s.name + "】的序列号"
                        }), $("#grid").jqGrid("editCellByColName", o, "qty"), !1
                    }
                }
                n = {
                    invId: s.id,
                    invNumber: s.number,
                    invName: s.name,
                    invSpec: s.spec || "",
                    skuId: c.id || -1,
                    skuName: c.name || "",
                    unitId: u.unitId || -1,
                    mainUnit: u.name || "",
                    qty: r.qty,
                    description: r.description,
                    outLocationId: d.id,
                    outLocationName: d.name,
                    inLocationId: l.id,
                    inLocationName: l.name,
                    serNumList: m
                }, SYSTEM.ISWARRANTY && $.extend(!0, n, {
                    batch: r.batch || "",
                    producer: r.producer || "",
                    registrationNo: r.registrationNo || "",
                    proLicense: r.proLicense || "",
                    prodDate: r.prodDate || "",
                    safeDays: r.safeDays || "",
                    validDate: r.validDate || ""
                }), t.push(n)
            }
        }
        return t
    }, getPostData: function () {
        var t = this;
        null !== curRow && null !== curCol && ($("#grid").jqGrid("saveCell", curRow, curCol), curRow = null, curCol = null);
        var e = this._getEntriesData();
        if (!e)return !1;
        if (e.length > 0) {
            var a = $.trim(t.$_note.val());
            return t.calTotal(), {
                id: originalData.id,
                date: $.trim(t.$_date.val()),
                billNo: $.trim(t.$_number.text()),
                entries: e,
                totalQty: $("#grid").jqGrid("footerData", "get").qty.replace(/,/g, ""),
                description: a === t.$_note[0].defaultValue ? "" : a
            }
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
        tabid: "storage-transfersList",
        text: "调拨单记录",
        url: "/scm/invTf.do?action=initTfList"
    })
});
var hasLoaded = !1, originalData;
$(function () {
    urlParam.id ? hasLoaded || Public.ajaxGet("/scm/invTf.do?action=update", {id: urlParam.id}, function (t) {
            200 === t.status ? (originalData = t.data, THISPAGE.init(t.data), hasLoaded = !0) : 400 === t.status ? parent.Public.tips({
                        type: 1,
                        content: t.msg
                    }) : parent.Public.tips({type: 1, content: msg})
        }) : (originalData = {
            id: -1,
            status: "add",
            customer: 0,
            transType: 0,
            entries: [{id: "1"}, {id: "2"}, {id: "3"}, {id: "4"}, {id: "5"}],
            totalQty: 0,
            totalAmount: 0,
            disRate: 0,
            disAmount: 0,
            amount: "0.00",
            rpAmount: "0.00",
            arrears: "0.00"
        }, THISPAGE.init(originalData))
});