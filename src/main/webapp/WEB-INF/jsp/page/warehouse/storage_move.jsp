<%--出库
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2017-12-07
  Time: 10:16
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=1280, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="renderer" content="webkit|ie-stand|ie-comp">
    <title>恒辉商品库存</title>
    <link rel="icon" href="http://vip2-gd.youshang.com/css/blue/img/favicon.png" type="image/x-icon">
    <link href="../../css/common.css" rel="stylesheet" type="text/css">
    <link href="../../css/print.css" rel="stylesheet" type="text/css">
    <link href="../../css/bootstrap.min.css" rel="stylesheet" type="text/css">
    <link type="text/css" rel="stylesheet" href="../../js/plugins/layer/laydate/need/laydate.css">
    <link type="text/css" rel="stylesheet" href="../../js/plugins/layer/laydate/skins/default/laydate.css"
          id="LayDateSkin">
    <link href="../../css/ui.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../../css/report.css">
        <link rel="stylesheet" href="${pageContext.request.contextPath }/select/dist/css/bootstrap-select.css">
    <script src="${pageContext.request.contextPath }/js/warehousing/warehouse.js"></script>
    <style>
        .ui-icon-ellipsis {
            right: 5px;
        }
        #grid tr {
            cursor: pointer;
        }
        .no-query {
            background-position: center;
            border: 1px solid #ddd;
            border-top: none;
            height: 402px;
            margin-right: 0;
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
    <!-- header -->
    <form action="/stoagemove/sstoagemove.do" method="post">
        <div class="mod-search cf" id="report-search">
            <div class="l" id="filter-menu">
                <ul class="ul-inline fix" id="filterItems">
                    <li id="merchandiseForName" style="display: list-item;"><label>出库人</label>
                        <select  name="smBuyer" style="width:115px;height: 32px">
                            <option value="0">请选择</option>
                            <c:forEach items="${emp}" var="e">
                                <option value="${e.employeeId}">${e.employeeName}</option>
                            </c:forEach>
                        </select><br>
                    </li>
                    <li id="product" style="display: list-item;"><label>经办人</label>
                        <select  name="smUserId" style="width:115px;height: 32px">
                            <option value="0">请选择</option>
                            <c:forEach items="${u}" var="u">
                                <option value="${u.userId}">${u.userName}</option>
                            </c:forEach>
                        </select><br></li>
                    <li id="units" style="display: list-item;"><label>出库日期</label>
                        <input id="end"  name="smDate" class="">
                    </li>
                    <div class="btns"><input class="ui-btn mrb ui-btn-search" id="filter-submit" type="submit"value="查询"></div>
                </ul>
            </div>
        </div>
    </form>

    <table class="table table-striped" style="width: 1200px">
        <thead>
        <tr>
            <th></th>
            <th>出库人</th>
            <th>售货单号</th>
            <th>出库日期</th>
            <th>出库备注</th>
            <th>经办人</th>
            <th style="display: none">是否已删除</th>
            <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;操作</th>
        </tr>
        </thead>
        <tbody id="tbody">
        <c:forEach var="s" items="${stor}">
                <tr id="${s.smId}">
                <td><input type="checkbox" style="display: none"/></td>
                <td>${s.employee.employeeName}</td>
                <td>${s.salesId}</td>
                <td><fmt:formatDate type="date" value="${s.smDate}" /></td>
                <td>${s.smRemarks}</td>
                <td>${s.user.userName}</td>
                <td style="display: none">${s.smState}</td>
                <td style="width: 120px;text-align: center">
                    <button type="button" id="${s.smId}" onclick="deletestorageMove(${s.smId})" class="btn btn-warning btn-sm" data-toggle="modal" data-target="#myDelete" ><span  class="up">删除</span></button></td>
            </tr>
        </c:forEach>
        </tbody>
    </table>
</div>
<!--删除-->
    <div  class="modal fade" id="myDelete" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog" >
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        &times;
                    </button>
                    <h4 class="modal-title" id="as"></h4>
                </div>
                <div class="modal-footer">
                    <button type="button" id="deletes" class="btn btn-danger" data-dismiss="modal">
                        确定
                    </button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">
                        取消
                    </button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal -->
</div>
<script src="${pageContext.request.contextPath }/js/jquery.min.js?v=2.1.4"></script>
<script src="${pageContext.request.contextPath }/js/bootstrap.min.js?v=3.3.6"></script>
<script src="${pageContext.request.contextPath }/js/content.min.js?v=1.0.0"></script>
<script src="${pageContext.request.contextPath }/js/plugins/suggest/bootstrap-suggest.min.js"></script>
<script src="${pageContext.request.contextPath }/js/plugins/layer/laydate/laydate.js"></script>
<script src="${pageContext.request.contextPath }/select/js/bootstrap-select.js"></script>
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
<script>
    //获取删除的信息
    function deletestorageMove(val) {
        $.ajax({
            type: "post",
            url: "/stoagemove/storageMoveId.do?smId="+val,
            dataType: "json",
            success: function (item) {
                if(item!=0){
                    $("#as").html("是否删除出库单号为：【"+item.salesId+"】的数据？");
                }
            },
            error: function () {
                alert("系统异常，请稍后重试！");
            }
        })
        //删除商品信息
        $("#deletes").click(function () {
            var smId=val;
            $.ajax({
                type: "post",
                url: "/stoagemove/deletestorageMove.do?smId="+smId,
                dataType: "json",
                success: function (data) {
                    alert("商品信息删除成功")
                    window.location.href="/storageMove/sstoagemove.do";
                },
                error: function () {
                    alert("系统异常，请稍后重试！");
                }
            })
        })
    }
</script>
</html>
