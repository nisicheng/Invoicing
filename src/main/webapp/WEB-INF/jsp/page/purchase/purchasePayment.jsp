<%--
  Created by IntelliJ IDEA.
  User: HP
  Date: 2017/12/26
  Time: 20:06
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="renderer" content="webkit|ie-stand|ie-comp">
    <title>精斗云云进销存</title>
    <link href="${request.contextPath }/css/bootstrap.min.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath }/css/common.css" rel="stylesheet" type="text/css">
    <link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath }/js/plugins/layer/laydate/need/laydate.css">
    <link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath }/js/plugins/layer/laydate/skins/default/laydate.css" id="LayDateSkin">
    <link href="${pageContext.request.contextPath }/css/ui.min.css" rel="stylesheet">
    <script src="${pageContext.request.contextPath }/js/shopping.js"></script>
    <script src="${pageContext.request.contextPath }/js/common.js"></script>
    <script src="${pageContext.request.contextPath }/js/jquery.dialog.js"></script>
    <link rel="stylesheet" href="${pageContext.request.contextPath }/css/report.css">
    <style type="text/css">
        th{
            text-align: center;
        }
        td{
            text-align: center;
        }
        li{
            list-style: none;
        }
        .filter-menu .mod-choose-input {
            position: relative;
            *zoom: 1;
        }

        .filter-menu .mod-choose-input .ui-input {
            padding-right: 25px;
            width: 226px;
            font-family: "宋体";
        }

        .filter-menu .ui-datepicker-input {
            width: 105px;
            font-family: "宋体";
        }

        .ui-icon-ellipsis {
            right: 3px;
        }

        .ul-inline li {
            position: relative;
        }

        #grid tr {
            cursor: pointer;
        }

    </style>
</head>
<body style="">
<div class="wrapper">
    <!-- header -->
    <div class="mod-search cf" id="report-search">
        <div class="l" id="filter-menu">
            <ul class="ul-inline fix" id="filterItems">
                <li id="date" style="display: list-item;"><label>单据日期:</label>
                    <input id="hello" style="height: 25px" class="">
                    <span class="todate"> 至 </span>
                    <input id="end" style="height: 25px" class=""></li>
                <li id="supplier" style="display: list-item;">
                    <label>供应商:</label>
                        <input type="text" class="ui-input" style="height: 25px">
                        <span class="ui-icon-ellipsis"></span>
                </li>
                <li  style="display: list-item;">
                    <label>订单编号:</label>
                        <input type="text" style="height: 25px" class="ui-input">
                        <span class="ui-icon-ellipsis"></span>
                </li>
                <div class="btns"><a class="ui-btn mrb ui-btn-search" id="filter-submit">查询</a></div>
            </ul>
        </div>
    </div>
    <div class="ui-print" style="display: block;">
        <div class="cf box-flex">
            <div class="flex">
            </div>
            <div style="text-align: center;"><span style="font-size: 20px">采购付款一览表</span></div>
            <div class="fr">
                <a href="#" class="ui-btn ui-btn-export btn-sm mrb fl" id="btn-export">导出</a>
                <a href="#" class="ui-btn ui-btn-print btn-sm fl" id="btn-print">打印</a>
            </div>
        </div>
        <div class="grid-wrap" id="grid-wrap" style="height: 486px;">
            <!-- <div class="grid-title">采购付款一览表</div> -->
            <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all" id="gbox_grid" dir="ltr" style="width: 1201px;height: 450px;">
                <table class="table table-bordered" style="width: 1200px;">

                    <thead>
                    <tr>
                        <th style="width: 25px;"><input type="checkbox" class="checkAll"></th>
                        <th style="display: none">销货商品id</th>
                        <th>供应商</th>
                        <th>采购类别</th>
                        <th>单据日期</th>
                        <th>单据编号</th>
                        <th>采购数量</th>
                        <th>采购单价</th>
                        <th>采购金额</th>
                        <th>采购人</th>
                    </tr>
                    </thead>
                    <tbody>
                    <c:forEach items="${procurementInformations}" var="procure">
                        <tr class="eachtr">
                            <td style="width: 25px;text-align: center"><input class="ck" type="checkbox"></td>
                            <td class="procurementId">${procure.procurement.supplier.supplierName}</td>
                            <td ><c:if test="${procure.procurement.procurementId.contains('GHDD')}">购货订单</c:if>
                                <c:if test="${procure.procurement.procurementId.contains('GH2')}">购货单</c:if>
                            </td>
                            <td><fmt:formatDate value="${procure.procurement.procurementDate}" pattern="yyyy-MM-dd"></fmt:formatDate> </td>
                            <td class="">${procure.procurementId}</td>
                            <td style="">${procure.piVolume}</td>
                            <td class="prv">${procure.piActualPrice}</td>
                            <td class="prv">${procure.piTotalPrice}</td>
                            <td class="merchandiseActualQuntity">${procure.procurement.procurementEmployee.employeeName}</td>
                        </tr>
                    </c:forEach>
                    </tbody>
                </table>
                <div  style="position: absolute;right: 100px;top: 370px;">
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
    </div>
    <!-- grid end -->
</div>

<div id="COMBO_WRAP">
    <div class="ui-droplist-wrap" style="display: none; position: absolute; top: 0px; z-index: 1000;">
        <div class="droplist" style="position: relative; overflow: auto;"></div>
    </div>
    <div class="ui-droplist-wrap" style="display: none; position: absolute; top: 0px; z-index: 1000;">
        <div class="droplist" style="position: relative; overflow: auto;"></div>
    </div>
</div>
<div class="pika-single is-hidden is-bound" style=""></div>
<div class="pika-single is-hidden is-bound" style=""></div>
<ul id="tree5097" class="ztree ztreeCombo showRoot" style="max-height: 200px; top: 143px; left: 524px; width: 250px;">
    <li id="tree5097_1" class="level0" tabindex="0" hidefocus="true" treenode="">
        <span id="tree5097_1_switch" title="" class="button level0 switch root_docu" treenode_switch=""></span>
        <a id="tree5097_1_a" class="level0" treenode_a="" onclick="" target="_blank" style="">
            <span id="tree5097_1_ico" title="" treenode_ico="" class="button ico_docu" style=""></span><span
                id="tree5097_1_span"></span></a></li>
</ul>
<div style="left: 0px; top: 0px; visibility: hidden; position: absolute;" class="">
    <table class="ui_border">
        <tbody>
        <tr>
            <td class="ui_lt"></td>
            <td class="ui_t"></td>
            <td class="ui_rt"></td>
        </tr>
        <tr>
            <td class="ui_l"></td>
            <td class="ui_c">
                <div class="ui_inner">
                    <table class="ui_dialog">
                        <tbody>
                        <tr>
                            <td colspan="2">
                                <div class="ui_title_bar">
                                    <div class="ui_title" unselectable="on" style="cursor: move;"></div>
                                    <div class="ui_title_buttons">
                                        <a class="ui_min" href="javascript:void(0);" title="最小化" style="display: none;">
                                            <b class="ui_min_b"></b>
                                        </a>
                                        <a class="ui_max" href="javascript:void(0);" title="最大化" style="display: none;">
                                            <b class="ui_max_b"></b>
                                        </a><a class="ui_res" href="javascript:void(0);" title="还原"><b class="ui_res_b"></b>
                                        <b class="ui_res_t"></b></a>
                                        <a class="ui_close" href="javascript:void(0);" title="关闭(esc键)" style="display: inline-block;">×</a>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="ui_icon" style="display: none;"></td>
                            <td class="ui_main" style="width: auto; height: auto;">
                                <div class="ui_content" style="padding: 10px;"></div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <div class="ui_buttons" style="display: none;"></div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </td>
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
<script src="${pageContext.request.contextPath }/js/jquery.min.js?v=2.1.4"></script>
<script src="${pageContext.request.contextPath }/js/bootstrap.min.js?v=3.3.6"></script>
<script src="${pageContext.request.contextPath }/js/content.min.js?v=1.0.0"></script>
<script src="${pageContext.request.contextPath }/js/plugins/layer/laydate/laydate.js"></script>
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