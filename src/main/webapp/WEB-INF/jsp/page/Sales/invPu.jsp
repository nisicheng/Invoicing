<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
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
            var i = 7;
            $("#btnline").click(function () {
                $("#addtr").append("<tr><td>" + i + "</td><td><select><option>请选择</option></select></td><td></td><td></td><td></td><td></td><td></td></tr>");
                i = i + 1;
            });
            $(".selectpicker").change(function () {
                var id=$(this).val();
                var name=$(this);
                $.ajax({
                    url:"/salesForInvPu/ajaxMerchand.do",
                    data:{"merchandiseId":id},
                    dataType:"JSON",
                    success:function (date) {
                        name.parent().parent('td').next("td").find("input").val(date.units.unitsName);
                        name.parent().parent('td').next("td").find("input").eq(1).val(date.units.unitsId);
                    }
                });
            });



            $("#operaLog").click(function () {
                if ($("#end").val() == "") {
                    alert("请选择日期");
                    return false;
                }
                var salesInformation = new Array();
                var sales = new Array();
                var clientId = $("#clientId").val();
                var employeeId =$("#employeeId").val();
                var salesDate = $("#end").val();
                var salesId = $("#salesId").val();
                var salesList=new Object();
                salesList.clientId = clientId;
                salesList.employeeId = employeeId;
                salesList.salesDate = salesDate;
                salesList.salesId = salesId;
                sales.push(salesList);
                $(".trParam").each(function (index, data) {
                    if ($(data).find(".siVolume").val() == "") {
                        return false;
                    }
                    var salesId = $(".salesId").val();
                    var merchandiseId=$(data).find(".selectpicker").val();
                    var siVolume = $(data).find(".siVolume").val();
                    var unitsId = $(data).find(".unitsId").val();
                    var siActualPrice = $(data).find(".siActualPrice").val();
                    var siTotalPrice = $(data).find(".siTotalPrice").val();
                    var siRemarks = $(data).find(".siRemarks").val();
                    var object = new Object();
                    object.salesId = salesId;
                    object.merchandiseId = merchandiseId;
                    object.siVolume = siVolume;
                    object.unitsId = unitsId;
                    object.siActualPrice = siActualPrice;
                    object.siTotalPrice = siTotalPrice;
                    object.siRemarks = siRemarks;
                    salesInformation.push(object);
                });

                var salesInformationListForPu = JSON.stringify(salesInformation);
                var saleForPu = JSON.stringify(sales);
                $.ajax({
                    type: "post",
                    url: "/salesForInvPu/saveSaveInformationListForPu.do",
                    data: {
                        "saveInformationListForPu": salesInformationListForPu,
                        "saveListForPu": saleForPu},
                    async: false,
                    dataType: "json",
                    success:function (data) {
                        if(data>0){
                            alert("成功添加购货单")
                            window.location.href="/salesForInvPu/loginsalesOrdersForInvPu.do";
                        }else {
                            alert("失败")
                        }
                    },error:function () {
                        alert("ss")
                    }
                })

            });
            $(".siActualPrice").blur(function () {
                if ($(this).parent('td').prev("td").find("input").val() == "") {
                    alert("请输入数量");
                    return false;
                }
                if ($(this).val() == "") {
                    alert("请输入购货单价");
                    return false;
                }
                mun = parseInt($(this).parent('td').prev("td").find("input").val());
                money = parseInt($(this).val());
                totalPrice = mun * money;
                $(this).parent('td').next("td").find("input").val(totalPrice);
            })
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
                        <label><span class="red">*</span>销售人员:</label>
                        <div class="input-group" style="width: 170px;float: right">
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
                        <input id="end" name="salesDate" class="">
                    </dd>
                    <dd id="identifier">
                        <label>&nbsp;&nbsp;&nbsp;&nbsp;单据编号:</label>
                        <input disabled="disabled" class="salesId" id="salesId" name="salesId" value="${salesId}"/>
                        <i id="editBills"></i>
                        <span class="ui-combo-wrap" id="numberAuto" style="display: none;">
              <i class="trigger"></i>
            </span>
                    </dd>
                </dl>
                <hr class="hrcls">
            </div>

            <div class="wrapper_con">

                <span id="config" class="ui-config"><a href="#" class="ui-icon-config-new"></a></span>
                <div class="grid-wrap">
                    <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all" id="gbox_grid" dir="ltr"
                         style="width: 1200px;">
                        <div class="ui-jqgrid-view" id="gview_grid" style="width: 1200px;">


                            <table class="table table-bordered">
                                <caption>
                                    <button id="btnline" type="button" class="btn btn-primary ">添加行</button>
                                </caption>
                                <thead>
                                <tr style="text-align: center">
                                    <th width="30px" style="text-align: center"></th>
                                    <th style="width: 300px;text-align: center">选择商品</th>
                                    <th style="width: 160px">单位</th>
                                    <th style="width: 100px">数量</th>
                                    <th style="width: 160px">购货单价</th>
                                    <th style="width: 160px">购货金额</th>
                                    <th>备注</th>
                                </tr>
                                </thead>
                                <tbody id="addtr">
                                <c:forEach begin="1" end="6" varStatus="status">
                                    <tr class="trParam">
                                        <td style="width: 30px;">${status.index}</td>
                                        <td>
                                            <div style="width: 150px">
                                                <select  class="selectpicker show-tick form-control"  style="width:30px;height: 20px;padding-top: 2px;padding-bottom: 2px;font-size: 12px" data-live-search="true"  name="merchandiseId">
                                                    <option>请选择</option>
                                                    <c:forEach items="${merchandises}" var="mer">
                                                        <option  class="aaa" value="${mer.merchandiseId}">${mer.merchandiseName}</option>
                                                    </c:forEach>
                                                </select>
                                            </div>
                                        </td>
                                        <td>
                                            <input type="text" disabled="disabled"
                                                   style="border: 0px;height: 30px;font-size: 16px;background-color: white;text-align: center">
                                            <input type="text" class="unitsId" style="display: none">
                                        </td>
                                        <td><input type="text"
                                                   onchange="if(/\D/.test(this.value)){alert('只能输入数字');this.value='';}"
                                                   class="siVolume" name="siVolume"
                                                   style="border: 0px;height: 30px;font-size: 16px;text-align: center">
                                        </td>
                                        <td><input type="text"
                                                   onchange="if(/\D/.test(this.value)){alert('只能输入数字');this.value='';}"
                                                   class="siActualPrice" name="siActualPrice"
                                                   style="border: 0px;height: 30px;font-size: 16px;text-align: center">
                                        </td>
                                        <td style="font-size: 16px;"><input
                                                onchange="if(/\D/.test(this.value)){alert('只能输入数字');this.value='';}"
                                                class="siTotalPrice" type="text" name="siTotalPrice" disabled="disabled"
                                                style="border: 0px;height: 30px;font-size: 16px;background-color: white;text-align: center">
                                        </td>
                                        <td><input type="text" class="siRemarks" name="siRemarks"
                                                   style="border: 0px;height: 30px;font-size: 16px;"/></td>
                                    </tr>
                                </c:forEach>


                                </tbody>
                            </table>

                        </div>
                        <div class="ui-jqgrid-resize-mark" id="rs_mgrid">&nbsp;</div>
                    </div>
                    <div id="page"></div>
                </div>

            </div>
            <div id="mark"></div>
        </div>

        <div class="con-footer cf">

            <div class="cf fr" style="float:right">
                <input type="button" id="operaLog" class="ui-btn" value="提交"/>
            </div>
        </div>
    </div>
    </div>
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