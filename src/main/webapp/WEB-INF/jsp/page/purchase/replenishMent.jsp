
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>

<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <meta name="viewport" content="width=1280, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="renderer" content="webkit|ie-stand|ie-comp">
    <title>恒辉医药进销存</title>

    <link href="${request.contextPath }/css/bootstrap.min.css" rel="stylesheet">
    <link href="${request.contextPath }/css/common.css" rel="stylesheet" type="text/css">
    <link href="${request.contextPath }/css/print.css" rel="stylesheet" type="text/css">
    <link href="${request.contextPath }/css/ui.min.css" rel="stylesheet">
    <script type="text/javascript" async="" src="${request.contextPath }/js/vds.js"></script>
    <script src="${request.contextPath }/js/jquery-1.10.2.min.js"></script>
    <script src="${request.contextPath }/js/json3.min.js"></script>
    <script src="${request.contextPath }/js/vue.js"></script>
    <script src="${request.contextPath }/js/common.js"></script>
    <script src="${request.contextPath }/js/grid.js"></script>
    <script src="${request.contextPath }/js/plugins.js"></script>
    <script src="${request.contextPath }/js/jquery.dialog.js"></script>
    <link rel="stylesheet" href="${pageContext.request.contextPath }/css/paging.css">
    <script src="${pageContext.request.contextPath }/js/jquery-1.11.1.min.js"></script>
    <script src="${pageContext.request.contextPath }/js/paging.js"></script>
    <style>
        th{
            text-align: center;
        }
        td{
            text-align: center;
        }
        li{
            list-style: none;
        }
        .mod-search {
            position: relative;
        }

        #custom {
            position: absolute;
            top: 0;
            right: 0;
        }

        #manager li {
            margin: 8px 0;
        }

        #manager .ui-label {
            width: 204px;
            display: inline-block;
            line-height: 18px;
            font-size: 14px;
            text-align: center;
        }

        #manager .ui-label-warning:hover {
            background-color: #FFBA5A;
        }

        .no-query {
            border: none;
        }

        .ul-inline li {
            margin-right: 20px;
        }

        #tipsBox p {
            line-height: 24px;
        }
    </style>
</head>

<body class="min-w inventoryList" style="">
<form action="/replenishMent/login.do" method="post">
<div class="bill-ser-top">
    <ul class="ul-inline cf">
        <li>
            <label>商品类别:</label>

            <span class="ui-tree-wrap" style="width:145px">
                <select name="productTypeId" style="height: 30px;width:145px">
                    <option value="0">请选择</option>
                            <c:forEach items="${productTypeLists}" var="product">
                                 <option  value="${product.productTypeId}">${product.productTypeName}</option>
                             </c:forEach>
                </select>
                <span class="trigger"></span>
            </span>
        </li>
        <li style="display: list-item;">
            <label>商品:</label>
            <span class="ui-combo-wrap" id="filter-goods">
          <input id="goodsAuto" type="text" name="merchandiseName"  value="" >
          <i class="ui-icon-ellipsis"></i>
        </span>
        </li>


        <li><input type="submit" class="mrb ui-btn ui-btn-search" id="search" value="查询"></li>
    </ul>
</div>
</form>
<div class="wrapper btc">
    <div class="bill-ser-botm">
        <div class="cf">
            <div class="ui-config-box">
            </div>
            <div class="fr">
                <a class="ui-btn-bill ui-btn-add ml10" id="toPo">生成购货订单</a>
                <a href="/replenishMent/excel.do" class="ui-btn-bill ui-btn-hl ml10" id="export">导出</a>
            </div>
        </div>
    </div>
    <div >
        <table class="table table-bordered" style="width: 1250px">
            <thead>
            <tr>
                <th style="width: 25px;"><input type="checkbox" class="checkAll"></th>
                <th style="display: none">销货商品id</th>
                <th>商品名称</th>
                <th>商品单位</th>
                <th>商品规格</th>
                <th>安全存量</th>
                <th>采购在订量</th>
                <th>库存余额</th>
                <th>建议购数量</th>
                <th>建议采购价格</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <c:forEach items="${merchandises}" var="merchand">
            <tr class="eachtr">
                <td style="width: 25px;text-align: center"><input class="ck" type="checkbox"></td>
                <td class="merchandiseId" style="display:none;">${merchand.merchandiseId}</td>
                <td class="merchandiseName">${merchand.merchandiseName}</td>
                <td class="unitsId" style="display: none">${merchand.unitsId}</td>
                <td class="unitsName">${merchand.units.unitsName}</td>
                <td style="">${merchand.merchandiseSpecification}</td>
                <td class="merchandiseSafetyStock">${merchand.merchandiseSafetyStock}</td>
                <td class="prv"><c:forEach items="${procurementInformations}" var="pro">
                    <c:if test="${merchand.merchandiseId==pro.merchandiseId}">${pro.piVolume}</c:if>
                </c:forEach></td>
                <td class="merchandiseActualQuntity">${merchand.merchandiseActualQuntity}</td>
                <td class="piVolume"></td>
                <td><input style="border: none;height: 30px;text-align: center;background-color: transparent" class="piActualPrice" value="${merchand.merchandiseSalsePrice}"/></td>
                <td style="width: 120px;text-align: center"><button type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#myModal" >修改</button><button type="button" class="btn btn-warning btn-sm" data-toggle="modal" data-target="#del" >删除</button></td>
            </tr>
            </c:forEach>
            </tbody>
        </table>
        <div class="ads" id="dsa" style="position: absolute;right: 100px;top: 370px;">
            <ul class="pagination" >
                <li><a href="?start=0&productTypeId=${merchandise.productTypeId}">首页</a></li>
                <%--<c:if test="${pages.currentPage >1}">--%>
                    <li><a href="">&laquo;</a></li>
                <%--</c:if>--%>
                <%--<c:if test="${pages.currentPage ==1}">--%>
                    <li style="display: none"><a href="">&laquo;${pages.currentPage-1}</a></li>
                <%--</c:if>--%>
                <c:forEach begin="1" end="${len}" varStatus="status">
                    <li><a href="?start=${page.start=status.index}&productTypeId=${merchandise.productTypeId}">${status.index}</a></li>
                </c:forEach>
                <%--<c:if test="${pages.currentPage<pages.totalPage}">--%>
                    <li><a href="">&raquo;</a></li>
                <%--</c:if>--%>
                <%--<c:if test="${pages.currentPage==pages.totalPage}">--%>
                    <li style="display: none"><a href="">&raquo;${pages.currentPage+1}</a></li>
                <%--</c:if>--%>
                <li><a href="?start=${page.last}&productTypeId=${merchandise.productTypeId}">末页</a></li>
                <li><a >共有${totalPage}条数据</a></li>
                <li><a>共有${len}页</a></li>
            </ul>
        </div>
    </div>
</div>
<div >
    <div></div>


</div>
<ul id="tree8402" class="ztree ztreeCombo showRoot" style="top: 143px; left: 524px; width: 250px; display: none;"></ul>
<div style="left: 0px; top: 0px; visibility: hidden; position: absolute;" class=""></div>
<script>
    $(function () {
        $("#toPo").click(function () {
            if($("input[type='checkbox']").is(':checked')){
                var replenish=new Array();
                var salesInformationList=null;
                $(".eachtr").each(function (index,data) {
                    if($(data).find(".ck").is(':checked')){
                        var a=$(data).find(".piVolume").html();
                        if(a==0){
                            alert("有建议购货数量为0的商品，请重新选购");
                            return false;
                        }
                        var merchandiseId=$(data).find(".merchandiseId").html();
                        var merchandiseName=$(data).find(".merchandiseName").html();
                        var unitsId=$(data).find(".unitsId").html();
                        var unitsName=$(data).find(".unitsName").html();
                        var siVolume=$(data).find(".piVolume").html();
                        var siActualPrice=$(data).find(".piActualPrice").val();
                        var obj=new Object();
                        obj.merchandiseId=merchandiseId;
                        obj.merchandiseName=merchandiseName;
                        obj.unitsName=unitsName;
                        obj.unitsId=unitsId;
                        obj.siVolume=siVolume;
                        obj.siActualPrice=siActualPrice;
                        replenish.push(obj);
                        salesInformationList=JSON.stringify(replenish);
                    }

                });
                $.ajax({
                    type: "post",
                    url: "/replenishMent/generateOrders.do",
                    data:{
                        "salesInformationList":salesInformationList
                    },
                    dataType: "json",
                    success:function () {
                        window.location.href="/purchaseOrder/loginPurchase.do";
                    }
                })
            }else {
                alert("请选择你要生成订单的列");
            }
        });

        $(".eachtr").each(function (index,date) {
            a=parseInt($(date).find(".merchandiseSafetyStock").html());
            b=parseInt($(date).find(".merchandiseActualQuntity").html());
            c=parseInt($(date).find(".prv").html());
            if(isNaN(c)){
                c=0;
            }
            d=a-b-c;
            if(d<0){
                d=0;
            }
            $(date).find(".piVolume").html(d);

        });
        $("#checkAll").click(function () {
            if(this.checked){
                $("[type='checkbox']").prop("checked", true);
            }else{
                $("[type='checkbox']").prop("checked", false);
            }
        });

    })
</script>
</body>
</html>