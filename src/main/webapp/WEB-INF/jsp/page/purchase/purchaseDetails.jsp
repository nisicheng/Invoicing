
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<!-- saved from url=(0092)http://vip2-gd.youshang.com/report/pu-detail-new.jsp?beginDate=2017-11-01&endDate=2017-11-21 -->
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=1280, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="renderer" content="webkit|ie-stand|ie-comp">
    <title>恒辉医药进销存</title>
    <link href="${request.contextPath }/css/bootstrap.min.css" rel="stylesheet">
    <link href="${request.contextPath }/css/common.css" rel="stylesheet" type="text/css">
    <link href="${request.contextPath }/css/print.css" rel="stylesheet" type="text/css">
    <link type="text/css" rel="stylesheet" href="${request.contextPath }/js/plugins/layer/laydate/need/laydate.css">
    <link type="text/css" rel="stylesheet" href="${request.contextPath }/js/plugins/layer/laydate/skins/default/laydate.css" id="LayDateSkin">
    <link href="${request.contextPath }/css/ui.min.css" rel="stylesheet">
    <script type="text/javascript" async="" src="${request.contextPath }/js/vds.js"></script>
    <script src="${request.contextPath }/js/vue.js"></script>
    <script src="${request.contextPath }/js/common.js"></script>
    <script src="${request.contextPath }/js/grid.js"></script>
    <script src="${request.contextPath }/js/plugins.js"></script>
    <script src="${request.contextPath }/js/jquery.dialog.js"></script>
    <script src="${request.contextPath }/js/shopping.js"></script>
    <link rel="stylesheet" type="text/css" href="${request.contextPath }/css/sweet-alert.css">
    <script src="${request.contextPath }/js/sweet-alert.min.js"></script>
    <script language="javascript" src="${request.contextPath }/js/demo/jquery-1.4.4.min.js"></script>
    <script language="javascript" src="${request.contextPath }/js/jquery.jqprint-0.3.js"></script>
    <link rel="stylesheet" href="${request.contextPath }/css/report.css">
    <script language="javascript">

        function aa(){
            $("#ddd").jqprint();
        }
    </script>
    <style>
        .ui-icon-ellipsis {
            right: 5px;
        }

        #grid tr {
            cursor: pointer;
        }
        th{
            text-align: center;
        }
        td{
            text-align: center;
        }
        li{
            list-style: none;
        }
        .box-flex {
            overflow: hidden;
            zoom: 1;
        }

        .box-flex .flex {
            float: left;
            width: 33.3%;
        }

        .grid-title {
            font-size: 24px;
            text-align: center;
            clear: none;
        }
    </style>
</head>
<body style="">
<div class="wrapper">
<form action="/purchaseDetails/login.do" method="post">
    <div class="mod-search cf" id="report-search">
        <div class="l" id="filter-menu">
            <ul class="ul-inline fix" id="filterItems">
                <li id="date" style="display: list-item; "><label>单据日期:</label>
                    <input id="hello" name="startTime" class="">
                    <span class="todate"> 至 </span>
                    <input id="end" name="endTime" class="">
                </li>
                <li id="supplier" style=""><label>供应商:</label>
                    <span class="mod-choose-input" id="filter-supplier">
                        <input  style="height: 31px;" type="text" name="supplierName" id="supplierAuto">
                        <span class="ui-icon-ellipsis"></span>
                    </span>
                </li>
                <li  style="float: left">
                    <label>商品:</label>
                    <span class="mod-choose-input" id="filter-goods">
                        <input  style="height: 31px;" type="text" name="merchandiseName" id="goodsAuto">
                        <span class="ui-icon-ellipsis"></span>
                    </span>
                </li>
                <li  style="display: list-item;">
                    <label>订单编号:</label>
                    <span class="mod-choose-input" >
                        <input  style="height: 31px;" type="text"  name="procurementId" autocomplete="off">
                        <span class="ui-icon-ellipsis"></span>
                    </span>
                </li>
                <li style="display: list-item;">
                    <label>采购状态:</label>
                    <select style="width: 100px;height: 31px;font-size: 14px" name="piState">
                        <option value="-1">请选择</option>
                        <option value="0">未入库</option>
                        <option value="1">已提交</option>
                        <option value="2">已入库</option>
                    </select>
                </li>
                <div class="btns"><input type="submit" class="ui-btn mrb ui-btn-search" id="filter" value="搜索"></div>
            </ul>
        </div>
    </div>
</form>
    <div class="ui-print" >
        <div class="cf box-flex">
            <div class="grid-title flex" style="position: absolute;right: 500px">商品采购明细表</div>
            <br/><br/>
            <div class="fr">
                <a href="/purchaseDetails/excel.do" class="ui-btn ui-btn-export btn-sm mrb fl" id="btn-export">导出</a>
                <input type="button" onclick="aa()" class="ui-btn ui-btn-print btn-sm fl"  value="打印">&nbsp;&nbsp;&nbsp;
                <button class=" ui-btn ui-btn-search btn-sm mrb f1" id="allxiugai">批量修改</button>
            </div>
        </div>
        <div class="grid-wrap" id="grid-wrap" style="height: 1200px;">
            <div id="ddd" class="ui-jqgrid ui-widget ui-widget-content ui-corner-all"  style="width: 1200px;height: 450px">

                    <table class="table table-bordered" style="width: 1200px">

                        <thead>
                        <tr>
                            <th style="width: 25px;"><input type="checkbox" class="checkAll"></th>
                            <th style="display: none">销货商品id</th>
                            <th>采购单号</th>
                            <th>商品名称</th>
                            <th>商品单位</th>
                            <th>采购日期</th>
                            <th>采购人</th>
                            <th>供应商</th>
                            <th>采购数量</th>
                            <th>采购价格</th>
                            <th>采购状态</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <c:forEach items="${procurementInformations}" var="procure">
                            <tr class="eachtr">
                                <td style="width: 25px;text-align: center"><input class="ck" type="checkbox"></td>
                                <td class="procurementId">${procure.procurementId}</td>
                                <td >${procure.merchandise.merchandiseName}</td>
                                <td>${procure.units.unitsName}</td>
                                <td class=""><fmt:formatDate value="${procure.procurement.procurementDate}" pattern="yyyy-MM-dd"/> </td>
                                <td style="">${procure.procurement.procurementEmployee.employeeName}</td>
                                <td class="prv">${procure.procurement.supplier.supplierName}</td>
                                <td class="merchandiseActualQuntity">${procure.piVolume}</td>
                                <td class="piVolume">${procure.piActualPrice}</td>
                                <td class="piState"><c:if test="${procure.procurement.procurementState==0}">未入库</c:if>
                                    <c:if test="${procure.procurement.procurementState==1}">已提交</c:if>
                                    <c:if test="${procure.procurement.procurementState==2}">已入库</c:if>
                                </td>
                                <td style="width: 120px;text-align: center">
                                    <button type="button" class="btn btn-info " data-toggle="modal" data-target="#del" >提交</button>
                                </td>
                            </tr>
                        </c:forEach>
                        </tbody>
                    </table>

            </div>
            <div class="ads" id="dsa" style="position: absolute;right: 100px;top: 500px;">
                <ul class="pagination" >
                    <li><a href="?start=0&productTypeId=${merchandise.productTypeId}">首页</a></li>
                    <%--<c:if test="${pages.currentPage >1}">--%>
                    <li><a href="">&laquo;</a></li>
                    <%--</c:if>--%>
                    <%--<c:if test="${pages.currentPage ==1}">--%>
                    <li style="display: none"><a href="">&laquo;${pages.currentPage-1}</a></li>
                    <%--</c:if>--%>
                    <c:forEach begin="1" end="${len}" varStatus="status">
                        <li><a href="?start=${page.start=status.index}">${status.index}</a></li>
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
    <!-- grid end -->
</div>


<div class="pika-single is-hidden is-bound" style=""></div>
<div class="pika-single is-hidden is-bound" style=""></div>
<ul id="tree9043" class="ztree ztreeCombo showRoot" style="max-height: 200px; top: 143px; left: 524px; width: 250px;">
    <li id="tree9043_1" class="level0" tabindex="0" hidefocus="true" treenode="">
        <span id="tree9043_1_switch" title="" class="button level0 switch root_docu" treenode_switch="">
            
        </span><a id="tree9043_1_a" class="level0" treenode_a="" onclick="" target="_blank" style="">
        <span id="tree9043_1_ico" title="" treenode_ico="" class="button ico_docu" style=""></span><span
            id="tree9043_1_span"></span></a></li>
</ul>
<div style="position: absolute; left: -9999em; top: 208px; visibility: visible; width: auto; z-index: 1976;">
    <table class="ui_border ui_state_visible ui_state_focus">
        <tbody>
        <tr>
            <td class="ui_lt"></td>
            <td class="ui_t"></td>
            <td class="ui_rt"></td>
        </tr>
        <tr>
            <td class="ui_l"></td>
            <td class="ui_c"></td>
            <td class="ui_r"></td>
        </tr>
        <tr>
            <td class="ui_lb"></td>
            <td class="ui_b"></td>
            <td class="ui_rb" style="cursor: auto;"></td>
        </tr>
        </tbody>
    </table>
</div>
<script src="${request.contextPath }/js/bootstrap.min.js?v=3.3.6"></script>
<script src="${request.contextPath }/js/content.min.js?v=1.0.0"></script>
<script src="${request.contextPath }/js/plugins/layer/laydate/laydate.js"></script>
<script>
    $(function () {
    $(".confirm").click(function () {
        window.location.href="/purchaseDetails/login.do";
    })
        $("#allxiugai").click(function () {
            var procure=new Array();
            var procureInfo=new Array();
            var prochreInfoList=null;
            var procureList=null;
            $(".eachtr").each(function (index,data){
                if($(data).find(".ck").is(':checked')){
                    var name=$(this).find(".piState").html();
                    if(name.trim()=="已提交"){
                        alert("您选的已有提交，请重新选择");
                        return false;
                    }else {
                        var procurementId=$(data).find(".procurementId").html();
                        var obj=new Object();
                        obj.procurementId=procurementId;
                        procure.push(obj);
                        procureInfo.push(obj);
                        procureList=JSON.stringify(procure);
                        prochreInfoList=JSON.stringify(procureInfo);
                    }
                }

            });
            $.ajax({
                type: "post",
                url: "/purchaseDetails/generateProcurement.do",
                data:{
                    "procureList":procureList,
                    "prochreInfoList":prochreInfoList
                },
                dataType: "json",
                success:function () {
                    swal(
                        {
                            title:"修改成功",
                            type:"info"
                        }
                    );
                }
            })
        })
    })
</script>
<script>
    laydate({elem: "#hello", event: "focus"});
    var start = {
        elem: "#start",
        format: "YYYY/MM/DD hh:mm:ss",
        min: laydate.now(),
        max: "2099-06-16 23:59:59",
        istime: true,
        istoday: false,
        choose: function (datas) {
            end.min = datas;
            end.start = datas
        }
    };
    var end = {
        elem: "#end",
        format: "YYYY/MM/DD hh:mm:ss",
        min: laydate.now(),
        max: "2099-06-16 23:59:59",
        istime: true,
        istoday: false,
        choose: function (datas) {
            start.max = datas
        }
    };
    laydate(start);
    laydate(end);
</script>
<script>
    laydate({elem: "#end", event: "focus"});
    var start = {
        elem: "#start",
        format: "YYYY/MM/DD hh:mm:ss",
        min: laydate.now(),
        max: "2099-06-16 23:59:59",
        istime: true,
        istoday: false,
        choose: function (datas) {
            end.min = datas;
            end.start = datas
        }
    };
    var end = {
        elem: "#end",
        format: "YYYY/MM/DD hh:mm:ss",
        min: laydate.now(),
        max: "2099-06-16 23:59:59",
        istime: true,
        istoday: false,
        choose: function (datas) {
            start.max = datas
        }
    };
    laydate(start);
    laydate(end);
</script>
</body>
</html>