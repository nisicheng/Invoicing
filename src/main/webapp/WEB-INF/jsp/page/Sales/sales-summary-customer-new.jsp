<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>精斗云云进销存</title>
    <link href="${pageContext.request.contextPath }/css/bootstrap.min.css">
    <link href="${pageContext.request.contextPath }/css/ui.min.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath }/css/bootstrap.min14ed.css?v=3.3.6" rel="stylesheet">
    <link href="${pageContext.request.contextPath }/css/font-awesome.min93e3.css?v=4.4.0" rel="stylesheet">
    <link type="text/css" rel="stylesheet"
          href="${pageContext.request.contextPath }/js/plugins/layer/laydate/need/laydate.css">
    <link type="text/css" rel="stylesheet"
          href="${pageContext.request.contextPath }/js/plugins/layer/laydate/skins/default/laydate.css"
          id="LayDateSkin">
    <link rel="stylesheet" href="${pageContext.request.contextPath }/select/dist/css/bootstrap-select.css">
    <link href="${pageContext.request.contextPath }/css/animate.min.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath }/css/style.min862f.css?v=4.1.0" rel="stylesheet">

    <script type="text/javascript"
            src="${pageContext.request.contextPath }/js/plugins/suggest/bootstrap-suggest.min.js"></script>
    <script type="text/javascript" async="" src="${pageContext.request.contextPath }/js/vds.js"></script>
    <script src="${pageContext.request.contextPath }/js/jquery-1.10.2.min.js"></script>
    <link href="${pageContext.request.contextPath }/css/bills.css" rel="stylesheet" type="text/css">
    <script type="text/javascript">
        $(function () {


        })
    </script>
    <style>
        td {
            text-align: center
        }

        th {
            text-align: center
        }

        #editBills {
            background: url(${pageContext.request.contextPath }/img/edit.png);
            display: inline-block;
            width: 13px;
            height: 12px;
        }

        #check_history {
            background: green;
            border-radius: 10px 10px;
            width: 80px;
            text-align: center;
        }

        #check_history a {
            color: #fff;
        }

        .wrapper_con {
            overflow-y: auto;
            overflow-x: hidden;
        }
    </style>
</head>

<body style="">
<form  >

    <div class="wrapper">
        <div class="mod-toolbar-top mr0 cf dn" id="toolTop"></div>
        <div class="bills cf">
            <div class="con-header">
                <dl class="cf">
                    <dd class="mr40" style="width: 240px">
                        <input type="text" name="EmployeeId" style="display:none;" value="${user.userId}"/>
                        <label><span class="red">*</span>客户:</label>
                        <div class="input-group" style="width: 200px;float: right">
                            <select class="selectpicker show-tick form-control"
                                    style="width:30px;height: 20px;padding-top: 2px;padding-bottom: 2px;font-size: 12px"
                                    data-live-search="true"   id="clientId" name="clientId">
                                <c:forEach items="${clientss}" var="cl">
                                    <option value="${cl.clientId}">${cl.clientName}</option>
                                </c:forEach>
                            </select>
                        </div>
                    </dd>

                    <dd class="mr40" style="width: 240px">
                        <input type="text" name="EmployeeId" style="display:none;" value="${user.userId}"/>
                        <label><span class="red">*</span>商品:</label>
                        <div class="input-group" style="width: 200px;float: right">
                            <select class="selectpicker show-tick form-control"
                                    style="width:30px;height: 20px;padding-top: 2px;padding-bottom: 2px;font-size: 12px"
                                    data-live-search="true"   id="merchandiseId" name="merchandiseId">
                                <c:forEach items="${merchandisess}" var="mls">
                                    <option value="${mls.merchandiseId}">${mls.merchandiseName}</option>
                                </c:forEach>
                            </select>
                        </div>
                    </dd>


                    <dd class="mr40" style="width: 280px">
                        <label><span class="red">&nbsp;&nbsp;&nbsp;*</span>销售人员:</label>
                        <div class="input-group" style="width: 200px;float: right">
                            <select class="selectpicker show-tick form-control"
                                    style="width:30px;height: 20px;padding-top: 2px;padding-bottom: 2px;font-size: 12px"
                                    data-live-search="true" id="employeeId" name="supplierId">
                                <c:forEach items="${employeess}" var="em">
                                    <option value="${em.employeeId}">${em.employeeName}</option>
                                </c:forEach>
                            </select>
                        </div>
                    </dd>

                    <dd class="mr20 tc">
                        <label>单据日期:</label>
                        <input id="hello" name="salesDateHello" class="">
                    </dd>
                    <dd class="mr20 tc">
                        <label>至:</label>
                        <input id="end" name="salesDateEnd" class="">
                    </dd>
                    <button type="submit" class="btn btn-info">查找</button>
                </dl>
                <hr class="hrcls">
                <div class="grid-title flex" style="text-align:center"><label style="font-size: large">售汇总表（按客户）</label> </div>
            </div>
        </div>
    </div>

    <form id="form">
        <%--展示信息--%>
        <div style="position: relative;left: 50px">
            <table class="table table-striped" style="width: 1200px">
                <thead>
                <tr>
                    <th>销售日期</th>
                    <th>订单编号</th>
                    <th>业务员</th>
                    <th>客户</th>
                    <th>商品编号</th>
                    <th>商品名称</th>
                    <th>单位</th>
                    <th>数量</th>
                    <th>单价</th>
                    <th>销售收入</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody id="tbod">

                <!--放循环的位置-->
                <c:forEach items="${saless}" var="s">
                    <c:if test="${s.salesState==0}">
                        <tr id="${s.salesId}"  class="saless">
                            <td id="salesDate"><fmt:formatDate type="date" value="${s.salesDate}" /></td>
                            <td id="salesId">${s.salesId}</td>
                            <td id="employeeName">${s.employee.employeeName}</td>
                            <td id="clientName">${s.client.clientName}</td>
                            <td id="merchandiseIds">${s.salesInformations.merchandiseId}</td>
                            <td id="merchandiseName">${s.salesInformations.merchandise.merchandiseName}</td>
                            <td id="unitsName">${s.salesInformations.units.unitsName}</td>
                            <td id="siVolume">${s.salesInformations.siVolume}</td>
                            <td id="siActualPrice">${s.salesInformations.siActualPrice}</td>
                            <td id="siTotalPrice">${s.salesInformations.siTotalPrice}</td>
                            <td  >
                                <button type="button" onclick="gainclient(${c.clientId})"id="${c.clientId}" data-target="#update" name="updateClient"   class="btn btn-info btn-sm" data-toggle="modal"  ><span class="up">修改</span></button>
                            </td>
                        </tr>
                    </c:if>
                </c:forEach>


                </tbody>
            </table>
        </div>
    </form>



</form>
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
            ti
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