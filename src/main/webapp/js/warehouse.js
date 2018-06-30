$(function () {

    $(".menu-item").mousemove(function () {
        $(this).children(".sub-nav-wrap").show();
    }).mouseout(function () {
        $(this).children(".sub-nav-wrap").hide();
    });
    $("#userName").mousemove(function () {
        $("#user_info").show();
    }).mouseout(function () {
        $("#user_info").hide();
    });

    //调拨单
    $("#Requisition").click(function () {
        $("#tabManage").remove();
        $("li").removeClass("l-selected");
        $("div").removeClass("l-tab-links-item-close");
        $("#iff").attr("src", "/requisition/RequisitionForSome.do");
        $("#ons").css("display", "none");
        $("#showiframe").css("display", "block");
    });

    //盘点记录
    $("#Count-records").click(function () {
        $("#tabManage").remove();
        $("li").removeClass("l-selected");
        $("div").removeClass("l-tab-links-item-close");
        $("#iff").attr("src", "/CountRecords/CountRecordsForSome.do");
        $("#ons").css("display", "none");
        $("#showiframe").css("display", "block");
    });

    //商品库存管理
    $("#Goods-inventory-balance").click(function () {
        $("#tabManage").remove();
        $("li").removeClass("l-selected");
        $("div").removeClass("l-tab-links-item-close");
        $("#iff").attr("src", "/merchandise/smerchandise.do");
        $("#ons").css("display", "none");
        $("#showiframe").css("display", "block");
    });

    //商品收发明细表
    $("#Goods-receipt-details").click(function () {
        $("#tabManage").remove();
        $("li").removeClass("l-selected");
        $("div").removeClass("l-tab-links-item-close");
        $("#iff").attr("src", "/warehouseReport/goods-flow-detail.do");
        $("#ons").css("display", "none");
        $("#showiframe").css("display", "block");
    });

    //商品收发汇总表
    $("#Send-and-receive-goods-summary").click(function () {
        $("#tabManage").remove();
        $("li").removeClass("l-selected");
        $("div").removeClass("l-tab-links-item-close");
        $("#iff").attr("src", "/warehouseReport/goods-flow-summary.do");
        $("#ons").css("display", "none");
        $("#showiframe").css("display", "block");
    });

    //入库记录表
    $("#warehousing").click(function () {
        $("#tabManage").remove();
        $("li").removeClass("l-selected");
        $("div").removeClass("l-tab-links-item-close");
        $("#iff").attr("src", "/warehousing/warehousing.do");
        $("#ons").css("display", "none");
        $("#showiframe").css("display", "block");
    });

    //出库记录表
    $("#storage_move").click(function () {
        $("#tabManage").remove();
        $("li").removeClass("l-selected");
        $("div").removeClass("l-tab-links-item-close");
        $("#iff").attr("src", "/stoagemove/sstoagemove.do");
        $("#ons").css("display", "none");
        $("#showiframe").css("display", "block");
    });
    $("body").on("click","#aaa",function(){
        $(this).parent().remove();
    });
    aaa();
});

function  aaa() {
    $("#filter-submit").click(function () {
        $(".no-query").remove();
        $(".ui-print").css("display","block");
    });
}
