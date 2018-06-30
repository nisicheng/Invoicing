<%--
  Created by IntelliJ IDEA.
  User: HP
  Date: 2017/12/25
  Time: 16:44
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>恒辉医药进销存</title>

    <link href="${request.contextPath }/css/bootstrap.min.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath }/css/print.css" rel="stylesheet" type="text/css">
    <link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath }/js/plugins/layer/laydate/need/laydate.css">
    <link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath }/js/plugins/layer/laydate/skins/default/laydate.css" id="LayDateSkin">
    <link href="${pageContext.request.contextPath }/css/ui.min.css" rel="stylesheet">
    <script src="${pageContext.request.contextPath }/js/shopping.js"></script>
    <script src="${pageContext.request.contextPath }/js/jquery.dialog.js"></script>
    <link rel="stylesheet" href="${pageContext.request.contextPath }/css/report.css">
    <script language="javascript" src="${request.contextPath }/js/jquery.jqprint-0.3.js"></script>
    <script language="javascript">
        function aa(){
            $("#ddd").jqprint();
        }
    </script>
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
        .ui-icon-ellipsis {
            right: 5px;
        }

        #grid tr {
            cursor: pointer;
        }
    </style>
</head>
<body style="">
<div class="wrapper">
    <!-- header -->
    <form action="/procurementSummary/login.do">
    <div >
        <div>
            <ul >
                <li style="float: left;position:relative;top:15px" ><label>单据日期:</label>
                    <input id="hello" name="startTime" class="" style="height: 25px">
                    <span class="todate"> 至 </span>
                    <input id="end" name="endTime" class="" style="height: 25px">
                <li style="float: left;position:relative;top:15px" ><label>商品:</label>
                    <span class="mod-choose-input" id="filter-goods">
                        <input name="piRemarks" type="text" class="ui-input" style="height: 25px">
                        <span class="ui-icon-ellipsis"></span></span></li>
                <li style="float: left;position:relative;top:15px">
                    <label>供应商:</label>
                    <input style="position: absolute;top: -1px;left: 60px;width: 160px;height: 25px" name="supplierName" type="text" class="form-control" id="test_data" autocomplete="off" data-id="" alt="43345" >
                                <div class="input-group-btn">
                                    <ul class="dropdown-menu dropdown-menu-right" role="menu" style="padding-top: 0px; max-height: 375px; max-width: 800px; overflow: auto; width: auto; transition: 0.3s; left: -490px; right: auto; min-width: 555px;">
                                        <table class="table table-condensed table-sm" style="margin:0">
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </ul>
                                </div>
                </li>
                <div class="btns" style="position: absolute;right: 150px;top: 20px"><input type="submit" class="ui-btn mrb ui-btn-search" value="查询"></div>
            </ul>
        </div>
    </div>
    </form>
    <div style="height: 55px"></div>
    <div class="ui-print" >
        <!-- 列配置 -->
        <div class="cf box-flex">
            <div class="flex">
            </div>
            <div class="grid-title flex">采购汇总表</div>
            <div class="fr">
                <input type="button" onclick="aa()" style="float: right" class="ui-btn ui-btn-export btn-sm mrb fl" id="btn-export" value="导出"/>
                <input type="button" onclick="aa()" style="float: right" class="ui-btn ui-btn-print btn-sm fl" id="btn-print" value="打印"/>
            </div>
        </div>
        <div class="grid-wrap" id="grid-wrap" style="height: 486px;">
            <div id="ddd" class="ui-jqgrid ui-widget ui-widget-content ui-corner-all" id="gbox_grid" dir="ltr" style="width: 1201px;height: 450px">
                <table class="table table-bordered" style="width: 1200px">

                    <thead>
                    <tr>
                        <th style="width: 25px;"><input type="checkbox" class="checkAll"></th>
                        <th style="display: none">销货商品id</th>
                        <th>供应商</th>
                        <th>商品类别</th>
                        <th>商品编号</th>
                        <th>商品名称</th>
                        <th>规格型号</th>
                        <th>商品单位</th>
                        <th>商品数量</th>
                        <th>商品单价</th>
                        <th>商品总价</th>
                        <th>采购人</th>
                    </tr>
                    </thead>
                    <tbody>
                    <c:forEach items="${procurementInformationList}" var="procure">
                        <tr class="eachtr">
                            <td style="width: 25px;text-align: center"><input class="ck" type="checkbox"></td>
                            <td class="procurementId">${procure.procurement.supplier.supplierName}</td>
                            <td >${procure.merchandise.productType.productTypeName}</td>
                            <td>${procure.merchandise.merchandiseId}</td>
                            <td class="">${procure.merchandise.merchandiseName}</td>
                            <td style="">${procure.merchandise.merchandiseSpecification}</td>
                            <td class="prv">${procure.units.unitsName}</td>
                            <td class="merchandiseActualQuntity">${procure.piVolume}</td>
                            <td>${procure.piActualPrice}</td>
                            <td class="piVolume">${procure.piTotalPrice}</td>
                            <td class="piState">${procure.procurement.procurementEmployee.employeeName}</td>

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
    <div class="ui-droplist-wrap" style="position: absolute; top: 0px; z-index: 1000; width: 175px; display: none;">
        <div class="droplist" style="position: relative; overflow: auto; height: 26px;">
            <div class="list-item" data-value="129609203891259700">CK001 默认仓库</div>
        </div>
    </div>
</div>
<div class="pika-single is-hidden is-bound" style=""></div>
<div class="pika-single is-hidden is-bound" style=""></div>
<ul id="tree1164" class="ztree ztreeCombo showRoot" style="top: 143px; left: 524px; width: 250px;">
    <li id="tree1164_1" class="level0" tabindex="0" hidefocus="true" treenode=""><span id="tree1164_1_switch" title="" class="button level0 switch root_docu" treenode_switch=""></span><a
            id="tree1164_1_a" class="level0" treenode_a="" onclick="" target="_blank" style=""><span id="tree1164_1_ico" title="" treenode_ico="" class="button ico_docu" style=""></span><span
            id="tree1164_1_span">全部</span></a></li>
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
                <div class="ui_inner"></div>
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
<script src="${pageContext.request.contextPath }/js/nisicheng/jquery.min.js"></script>
<script src="${pageContext.request.contextPath }/js/nisicheng/bootstrap.min.js"></script>
<script src="${pageContext.request.contextPath }/js/content.min.js?v=1.0.0"></script>
<script src="${pageContext.request.contextPath }/js/bootstrap-suggest.js"></script>
<script src="${pageContext.request.contextPath }/js/demo.js?ver=20160422"></script>
<script src="${pageContext.request.contextPath }/js/tether.min.js"></script>
<script src="${pageContext.request.contextPath }/js/plugins/layer/laydate/laydate.js"></script>
<script>
    $(function () {
        var dataList = {value: []};
        <c:forEach items="${suppliers}" var="sup">
        dataList.value.push({
            id:${sup.supplierId},
            word:"${sup.supplierName}"
        });
        </c:forEach>

        $("#test_data").bsSuggest({
            indexId: 1,  //data.value 的第几个数据，作为input输入框的内容
            indexKey: 1, //data.value 的第几个数据，作为input输入框的内容
            data: dataList
        }).on('onDataRequestSuccess', function (e, result) {
            console.log('从 json.data 参数中获取，不会触发 onDataRequestSuccess 事件', result);
        }).on('onSetSelectValue', function (e, keyword, data) {
            console.log('onSetSelectValue: ', keyword, data);
        }).on('onUnsetSelectValue', function () {
            console.log("onUnsetSelectValue");
        });
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