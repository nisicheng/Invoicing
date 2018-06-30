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

    $("#sales").click(function () {
            //alert("销售订单表");
            $("#tabManage").remove();
            $("li").removeClass("l-selected");
            $("div").removeClass("l-tab-links-item-close");
           // $("#iframs").before().append("<li tabid=\"purchase-purchaseOrder\" class=\"l-selected\"><a>销货订单</a><div class=\"l-tab-links-item-left\"></div><div class=\"l-tab-links-item-right\"></div><div id='aaa' class=\"l-tab-links-item-close\"></div></li> <li id=\"tabManage\"></li>");
            $("#iff").attr("src", "/sales/loginsalesOrders.do");

            $("#ons").css("display", "none");
            $("#showiframe").css("display", "block");

    });

    $("#salesForAbout").click(function () {
       // alert("销售单表");
        $("#tabManage").remove();
        $("li").removeClass("l-selected");
        $("div").removeClass("l-tab-links-item-close");
       // $("#iframs").before().append("<li tabid=\"purchase-purchaseOrder\" class=\"l-selected\"><a>销货订单</a><div class=\"l-tab-links-item-left\"></div><div class=\"l-tab-links-item-right\"></div><div id='aaa' class=\"l-tab-links-item-close\"></div></li> <li id=\"tabManage\"></li>");
        $("#iff").attr("src", "/salesForInvPu/loginsalesOrdersForInvPu.do");

        $("#ons").css("display", "none");
        $("#showiframe").css("display", "block");

    });

    $("#Original-document").click(function () {
       // alert("asd");
        $("#tabManage").remove();
        $("li").removeClass("l-selected");
        $("div").removeClass("l-tab-links-item-close");
        // $("#iframs").before().append("<li tabid=\"purchase-purchaseOrder\" class=\"l-selected\"><a>销货订单</a><div class=\"l-tab-links-item-left\"></div><div class=\"l-tab-links-item-right\"></div><div id='aaa' class=\"l-tab-links-item-close\"></div></li> <li id=\"tabManage\"></li>");
        $("#iff").attr("src", "/sales/loginsalesOrdersForAbout.do");

        $("#ons").css("display", "none");
        $("#showiframe").css("display", "block");

    });

    $("#Sales-order-details").click(function () {
     //   alert("商品订单明细表");
        $("#tabManage").remove();
        $("li").removeClass("l-selected");
        $("div").removeClass("l-tab-links-item-close");
        // $("#iframs").before().append("<li tabid=\"purchase-purchaseOrder\" class=\"l-selected\"><a>销货订单</a><div class=\"l-tab-links-item-left\"></div><div class=\"l-tab-links-item-right\"></div><div id='aaa' class=\"l-tab-links-item-close\"></div></li> <li id=\"tabManage\"></li>");
        $("#iff").attr("src", "/salesOrder/loginSalesOrder.do");

        $("#ons").css("display", "none");
        $("#showiframe").css("display", "block");

    });


    $("#Sales-details").click(function () {
        //alert("商品销售明细表");
        $("#tabManage").remove();
        $("li").removeClass("l-selected");
        $("div").removeClass("l-tab-links-item-close");
        // $("#iframs").before().append("<li tabid=\"purchase-purchaseOrder\" class=\"l-selected\"><a>销货订单</a><div class=\"l-tab-links-item-left\"></div><div class=\"l-tab-links-item-right\"></div><div id='aaa' class=\"l-tab-links-item-close\"></div></li> <li id=\"tabManage\"></li>");
        $("#iff").attr("src", "/detail/logindetailOrders.do");

        $("#ons").css("display", "none");
        $("#showiframe").css("display", "block");

    });

    $("#Sales-summary-commodity").click(function () {
        //alert("销售汇总表（按商品）");
        $("#tabManage").remove();
        $("li").removeClass("l-selected");
        $("div").removeClass("l-tab-links-item-close");
        // $("#iframs").before().append("<li tabid=\"purchase-purchaseOrder\" class=\"l-selected\"><a>销货订单</a><div class=\"l-tab-links-item-left\"></div><div class=\"l-tab-links-item-right\"></div><div id='aaa' class=\"l-tab-links-item-close\"></div></li> <li id=\"tabManage\"></li>");
        $("#iff").attr("src", "/commodity/loginCommodity.do");

        $("#ons").css("display", "none");
        $("#showiframe").css("display", "block");

    });

    $("#Sales-summary-client").click(function () {
       // alert("销售汇总表（按客户）");
        $("#tabManage").remove();
        $("li").removeClass("l-selected");
        $("div").removeClass("l-tab-links-item-close");
        // $("#iframs").before().append("<li tabid=\"purchase-purchaseOrder\" class=\"l-selected\"><a>销货订单</a><div class=\"l-tab-links-item-left\"></div><div class=\"l-tab-links-item-right\"></div><div id='aaa' class=\"l-tab-links-item-close\"></div></li> <li id=\"tabManage\"></li>");
        $("#iff").attr("src", "/summaryClient/loginSummaryClient.do");

        $("#ons").css("display", "none");
        $("#showiframe").css("display", "block");

    });

    $("#Sales-summary-salesperson").click(function () {
        //alert("销售汇总表（按销售人员）");
        $("#tabManage").remove();
        $("li").removeClass("l-selected");
        $("div").removeClass("l-tab-links-item-close");
        // $("#iframs").before().append("<li tabid=\"purchase-purchaseOrder\" class=\"l-selected\"><a>销货订单</a><div class=\"l-tab-links-item-left\"></div><div class=\"l-tab-links-item-right\"></div><div id='aaa' class=\"l-tab-links-item-close\"></div></li> <li id=\"tabManage\"></li>");
        $("#iff").attr("src", "/salesperson/loginSalesperson.do");

        $("#ons").css("display", "none");
        $("#showiframe").css("display", "block");

    });

    $("#Sales-receipt-list").click(function () {
       // alert("销售收款一览表");
        $("#tabManage").remove();
        $("li").removeClass("l-selected");
        $("div").removeClass("l-tab-links-item-close");
        // $("#iframs").before().append("<li tabid=\"purchase-purchaseOrder\" class=\"l-selected\"><a>销货订单</a><div class=\"l-tab-links-item-left\"></div><div class=\"l-tab-links-item-right\"></div><div id='aaa' class=\"l-tab-links-item-close\"></div></li> <li id=\"tabManage\"></li>");
        $("#iff").attr("src", "/receiptDetail/loginReceiptDetailOrders.do");

        $("#ons").css("display", "none");
        $("#showiframe").css("display", "block");

    });


    $("#sales-profit").click(function () {
       // alert("销售利润表");
        $("#tabManage").remove();
        $("li").removeClass("l-selected");
        $("div").removeClass("l-tab-links-item-close");
        // $("#iframs").before().append("<li tabid=\"purchase-purchaseOrder\" class=\"l-selected\"><a>销货订单</a><div class=\"l-tab-links-item-left\"></div><div class=\"l-tab-links-item-right\"></div><div id='aaa' class=\"l-tab-links-item-close\"></div></li> <li id=\"tabManage\"></li>");
        $("#iff").attr("src", "/salesProfit/loginSalesProfit.do");

        $("#ons").css("display", "none");
        $("#showiframe").css("display", "block");

    });




    $("#Sales-ranking").click(function () {
      //  alert("销售排行表");
        $("#tabManage").remove();
        $("li").removeClass("l-selected");
        $("div").removeClass("l-tab-links-item-close");
        // $("#iframs").before().append("<li tabid=\"purchase-purchaseOrder\" class=\"l-selected\"><a>销货订单</a><div class=\"l-tab-links-item-left\"></div><div class=\"l-tab-links-item-right\"></div><div id='aaa' class=\"l-tab-links-item-close\"></div></li> <li id=\"tabManage\"></li>");
        $("#iff").attr("src", "/salesRanking/loginSalesRanking.do");

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
