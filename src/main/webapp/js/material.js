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



    //1.客户管理
    $("#Customer-management").click(function () {
        $("#tabManage").remove();
        $("li").removeClass("l-selected");
        $("div").removeClass("l-tab-links-item-close");
        // $("#iframs").before().append("<li tabid=\"purchase-purchaseOrder\" class=\"l-selected\"><a>销货订单</a><div class=\"l-tab-links-item-left\"></div><div class=\"l-tab-links-item-right\"></div><div id='aaa' class=\"l-tab-links-item-close\"></div></li> <li id=\"tabManage\"></li>");
        $("#iff").attr("src", "/client/cooperative.do");

        $("#ons").css("display", "none");
        $("#showiframe").css("display", "block");

    });

    //2.供应商管理
    $("#Supplier-management").click(function () {
        $("#tabManage").remove();
        $("li").removeClass("l-selected");
        $("div").removeClass("l-tab-links-item-close");
        // $("#iframs").before().append("<li tabid=\"purchase-purchaseOrder\" class=\"l-selected\"><a>销货订单</a><div class=\"l-tab-links-item-left\"></div><div class=\"l-tab-links-item-right\"></div><div id='aaa' class=\"l-tab-links-item-close\"></div></li> <li id=\"tabManage\"></li>");
        $("#iff").attr("src", "/supplier/cooperative.do");

        $("#ons").css("display", "none");
        $("#showiframe").css("display", "block");

    });

    //3.商品管理
    $("#product-brand").click(function () {
        $("#tabManage").remove();
        $("li").removeClass("l-selected");
        $("div").removeClass("l-tab-links-item-close");
        // $("#iframs").before().append("<li tabid=\"purchase-purchaseOrder\" class=\"l-selected\"><a>销货订单</a><div class=\"l-tab-links-item-left\"></div><div class=\"l-tab-links-item-right\"></div><div id='aaa' class=\"l-tab-links-item-close\"></div></li> <li id=\"tabManage\"></li>");
        $("#iff").attr("src", "/merchandise/cooperative.do");

        $("#ons").css("display", "none");
        $("#showiframe").css("display", "block");

    });

    //4.职员管理
    $("#Commodity-management").click(function () {
        $("#tabManage").remove();
        $("li").removeClass("l-selected");
        $("div").removeClass("l-tab-links-item-close");
        // $("#iframs").before().append("<li tabid=\"purchase-purchaseOrder\" class=\"l-selected\"><a>销货订单</a><div class=\"l-tab-links-item-left\"></div><div class=\"l-tab-links-item-right\"></div><div id='aaa' class=\"l-tab-links-item-close\"></div></li> <li id=\"tabManage\"></li>");
        $("#iff").attr("src", "/employee/cooperative.do");

        $("#ons").css("display", "none");
        $("#showiframe").css("display", "block");

    });

    // //5.商品品牌
    // $("#product brand").click(function () {
    //     $("#tabManage").remove();
    //     $("li").removeClass("l-selected");
    //     $("div").removeClass("l-tab-links-item-close");
    //     // $("#iframs").before().append("<li tabid=\"purchase-purchaseOrder\" class=\"l-selected\"><a>销货订单</a><div class=\"l-tab-links-item-left\"></div><div class=\"l-tab-links-item-right\"></div><div id='aaa' class=\"l-tab-links-item-close\"></div></li> <li id=\"tabManage\"></li>");
    //     $("#iff").attr("src", "/sales/loginsalesOrders.do");
    //
    //     $("#ons").css("display", "none");
    //     $("#showiframe").css("display", "block");
    //
    // });

    //7.客户类别
    $("#client-categories").click(function () {
        $("#tabManage").remove();
        $("li").removeClass("l-selected");
        $("div").removeClass("l-tab-links-item-close");
        // $("#iframs").before().append("<li tabid=\"purchase-purchaseOrder\" class=\"l-selected\"><a>销货订单</a><div class=\"l-tab-links-item-left\"></div><div class=\"l-tab-links-item-right\"></div><div id='aaa' class=\"l-tab-links-item-close\"></div></li> <li id=\"tabManage\"></li>");
        $("#iff").attr("src", "/sales/loginsalesOrders.do");

        $("#ons").css("display", "none");
        $("#showiframe").css("display", "block");

    });

    //8.供应商类别
    $("#Supplier-category").click(function () {
        $("#tabManage").remove();
        $("li").removeClass("l-selected");
        $("div").removeClass("l-tab-links-item-close");
        // $("#iframs").before().append("<li tabid=\"purchase-purchaseOrder\" class=\"l-selected\"><a>销货订单</a><div class=\"l-tab-links-item-left\"></div><div class=\"l-tab-links-item-right\"></div><div id='aaa' class=\"l-tab-links-item-close\"></div></li> <li id=\"tabManage\"></li>");
        $("#iff").attr("src", "/sales/loginsalesOrders.do");

        $("#ons").css("display", "none");
        $("#showiframe").css("display", "block");

    });

    //9.商品类别
    $("#Product-category").click(function () {
        $("#tabManage").remove();
        $("li").removeClass("l-selected");
        $("div").removeClass("l-tab-links-item-close");
        // $("#iframs").before().append("<li tabid=\"purchase-purchaseOrder\" class=\"l-selected\"><a>销货订单</a><div class=\"l-tab-links-item-left\"></div><div class=\"l-tab-links-item-right\"></div><div id='aaa' class=\"l-tab-links-item-close\"></div></li> <li id=\"tabManage\"></li>");
        $("#iff").attr("src", "/productType/all.do");
        $("#ons").css("display", "none");
        $("#showiframe").css("display", "block");

    });

    //10.支出类别
    $("#Expenditure-category").click(function () {
        $("#tabManage").remove();
        $("li").removeClass("l-selected");
        $("div").removeClass("l-tab-links-item-close");
        // $("#iframs").before().append("<li tabid=\"purchase-purchaseOrder\" class=\"l-selected\"><a>销货订单</a><div class=\"l-tab-links-item-left\"></div><div class=\"l-tab-links-item-right\"></div><div id='aaa' class=\"l-tab-links-item-close\"></div></li> <li id=\"tabManage\"></li>");
        $("#iff").attr("src", "/sales/loginsalesOrders.do");

        $("#ons").css("display", "none");
        $("#showiframe").css("display", "block");

    });

    //11.收入类别
    $("#Income-category").click(function () {
        $("#tabManage").remove();
        $("li").removeClass("l-selected");
        $("div").removeClass("l-tab-links-item-close");
        // $("#iframs").before().append("<li tabid=\"purchase-purchaseOrder\" class=\"l-selected\"><a>销货订单</a><div class=\"l-tab-links-item-left\"></div><div class=\"l-tab-links-item-right\"></div><div id='aaa' class=\"l-tab-links-item-close\"></div></li> <li id=\"tabManage\"></li>");
        $("#iff").attr("src", "/sales/loginsalesOrders.do");

        $("#ons").css("display", "none");
        $("#showiframe").css("display", "block");

    });

    //12.计量单位
    $("#unit-of-measurement").click(function () {
        $("#tabManage").remove();
        $("li").removeClass("l-selected");
        $("div").removeClass("l-tab-links-item-close");
        // $("#iframs").before().append("<li tabid=\"purchase-purchaseOrder\" class=\"l-selected\"><a>销货订单</a><div class=\"l-tab-links-item-left\"></div><div class=\"l-tab-links-item-right\"></div><div id='aaa' class=\"l-tab-links-item-close\"></div></li> <li id=\"tabManage\"></li>");
        $("#iff").attr("src", "/sales/loginsalesOrders.do");

        $("#ons").css("display", "none");
        $("#showiframe").css("display", "block");

    });

    //13.单据编码规则
    $("#Document-coding-rules").click(function () {
        $("#tabManage").remove();
        $("li").removeClass("l-selected");
        $("div").removeClass("l-tab-links-item-close");
        // $("#iframs").before().append("<li tabid=\"purchase-purchaseOrder\" class=\"l-selected\"><a>销货订单</a><div class=\"l-tab-links-item-left\"></div><div class=\"l-tab-links-item-right\"></div><div id='aaa' class=\"l-tab-links-item-close\"></div></li> <li id=\"tabManage\"></li>");
        $("#iff").attr("src", "/sales/loginsalesOrders.do");

        $("#ons").css("display", "none");
        $("#showiframe").css("display", "block");

    });

    //14.单位和商品类型的管理
    $("#unitsAndType").click(function () {
        $("#tabManage").remove();
        $("li").removeClass("l-selected");
        $("div").removeClass("l-tab-links-item-close");
        $("#iff").attr("src", "/unitsandtype/units.do");

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
