<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>恒辉医药进销存</title>
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

    <script type="text/javascript" src="${pageContext.request.contextPath }/js/plugins/suggest/bootstrap-suggest.min.js"></script>
    <script type="text/javascript" async="" src="${pageContext.request.contextPath }/js/vds.js"></script>
    <script src="${pageContext.request.contextPath }/js/jquery-1.10.2.min.js"></script>
    <link href="${pageContext.request.contextPath }/css/bills.css" rel="stylesheet" type="text/css">
    <script type="text/javascript">
        $(function () {
            $("#excel").click(function () {
                var procurementInformation=new  Array();
                var procurements=new Array();
                var procurementInformationList=null;
                var supplierId=$("#supplierId").val();
                var procurementId=$("#procurementId").val();
                var procurementDate=$("#end").val();
                var procurementEmployeeId=$("#procurementEmployeeId").val();
                var procurementList=new Object();
                procurementList.supplierId=supplierId;
                procurementList.procurementId=procurementId;
                procurementList.procurementDate=procurementDate;
                procurementList.procurementEmployeeId=procurementEmployeeId;
                procurements.push(procurementList);
                var procurement=JSON.stringify(procurements);
                $(".trParam").each(function (index,data) {
                    if($(data).find(".piVolume").val()==""){
                        return false;
                    }
                    var procurementId=$(".procurementId").val();
                    var merchandiseId=$(data).find(".selectpicker").val();
                    var piVolume =$(data).find(".piVolume").val();
                    var piActualPrice =$(data).find(".piActualPrice").val();
                    var piTotalPrice =$(data).find(".piTotalPrice").val();
                    var piRemarks =$(data).find(".piRemarks").val();
                    var unitsId=$(data).find(".unitsId").val();
                    var object = new Object();
                    object.piVolume = piVolume;
                    object.piActualPrice=piActualPrice;
                    object.piTotalPrice=piTotalPrice;
                    object.piRemarks=piRemarks;
                    object.merchandiseId=merchandiseId;
                    object.procurementId=procurementId;
                    object.unitsId=unitsId;
                    procurementInformation.push(object);
                    procurementInformationList=JSON.stringify(procurementInformation);

                });
                window.location.href="/purchaseOrder/MapExportExcel.do?procurement"+procurement;
            });

            $("#btnline").click(function () {
              var tr=  $(".trParam").eq(5).clone();
                $("#addtr").append(tr);
            });
            $(".selectpicker").change(function () {
                var id=$(this).val();
                var name=$(this);
                $.ajax({
                    url:"/purchases/ajaxMerchand.do",
                    data:{"merchandiseId":id},
                    dataType:"JSON",
                    success:function (date) {
                        name.parent().parent('td').next("td").find("input").val(date.units.unitsName);
                        name.parent().parent('td').next("td").find("input").eq(1).val(date.units.unitsId);
                    }
                });
            });
            $("#operaLog").click(function () {
                if($("#end").val()==""){
                    alert("请选择日期");
                    return false;
                }
                var procurementInformation=new  Array();
                var procurements=new Array();
                var procurementInformationList=null;
                var supplierId=$("#supplierId").val();
                var procurementId=$("#procurementId").val();
                var procurementDate=$("#end").val();
                var procurementEmployeeId=$("#procurementEmployeeId").val();
                var procurementList=new Object();
                procurementList.supplierId=supplierId;
                procurementList.procurementId=procurementId;
                procurementList.procurementDate=procurementDate;
                procurementList.procurementEmployeeId=procurementEmployeeId;
                procurements.push(procurementList);
                var procurement=JSON.stringify(procurements);
                $(".trParam").each(function (index,data) {
                   if($(data).find(".piVolume").val()==""){
                       return false;
                   }
                   var procurementId=$(".procurementId").val();
                   var merchandiseId=$(data).find(".selectpicker").val();
                    var piVolume =$(data).find(".piVolume").val();
                    var piActualPrice =$(data).find(".piActualPrice").val();
                    var piTotalPrice =$(data).find(".piTotalPrice").val();
                    var piRemarks =$(data).find(".piRemarks").val();
                    var unitsId=$(data).find(".unitsId").val();
                    var object = new Object();
                    object.piVolume = piVolume;
                    object.piActualPrice=piActualPrice;
                    object.piTotalPrice=piTotalPrice;
                    object.piRemarks=piRemarks;
                    object.merchandiseId=merchandiseId;
                    object.procurementId=procurementId;
                    object.unitsId=unitsId;
                    procurementInformation.push(object);
                     procurementInformationList=JSON.stringify(procurementInformation);

                    })
                $.ajax({
                    type: "post",
                    url: "/purchases/saveProcurementInformationList.do",
                    data:{
                        "procurementInformationList":procurementInformationList,
                        "procurementList":procurement
                    },
                    dataType: "json",
                    success: function (data) {
                        if(data==1){
                            alert("成功了");
                            window.location.href="/purchases/loginPurchaseOrder.do";
                        }
                    }
                });
            });
            var tatal=0;
            $(".piActualPrice").blur(function () {
                if( $(this).parent('td').prev("td").find("input").val()==""){
                    alert("请输入数量");
                    return false;
                }
                if($(this).val()==""){
                    alert("请输入购货单价");
                    return false;
                }

                if($(this).parent('td').prev("td").find("input").val()!="" && $(this).val()!=""){

                    mun=parseInt($(this).parent('td').prev("td").find("input").val());
                    money=parseInt($(this).val());
                    totalPrice=mun*money;
                    tatal+=totalPrice;
                    $("#all").html(tatal);
                    $(this).parent('td').next("td").find("input").val(totalPrice);
                }

            })
        })
    </script>
    <style>
        #daochu{
            position:absolute;
            left:1100px;
            top:15px;
        }
        td{text-align: center}
        th{text-align: center}
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
<form action="/purchases/saveSupplierorProcureMent.do" method="post" id="form">
<div class="wrapper">
    <div class="mod-toolbar-top mr0 cf dn" id="toolTop"></div>
    <div class="bills cf">
        <div class="con-header">
            <dl class="cf">
                <dd class="mr40" style="width: 360px">
                    <input type="text" name="procurementEmployeeId" id="procurementEmployeeId" style="display:none;" value="${user.userId}"/>
                    <label><span class="red">*</span>供应商:</label>
                    <div class="input-group" style="width: 300px;float: right">
                        <select  class="selectpicker show-tick form-control" style="width:30px;height: 20px;padding-top: 2px;padding-bottom: 2px;font-size: 12px" data-live-search="true" id="supplierId" name="supplierId">
                               <c:forEach items="${supps}" var="su">`
                                   <option value="${su.supplierId}">${su.supplierName}</option>
                               </c:forEach>
                        </select>
                    </div>
                <dd class="mr20">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label>单据日期:</label>
                    <input id="end" name="procurementDate" class="">
                </dd>
                <dd id="identifier">
                    <label >&nbsp;&nbsp;&nbsp;&nbsp;单据编号:</label>
                    <input disabled="disabled" class="procurementId" id="procurementId" name="procurementId" value="${purId}" />
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


                            <table class="table table-bordered" >
                                <caption style="height: 50px;">
                                    <button style="float: right; position: absolute;right: 130px" id="btnline" type="button" class="btn btn-primary ">添加行</button>
                                    <input type="text" class="btn btn-info" style="float: right; position: absolute;right: 20px;width: 80px;font-weight:800" id="excel"  value="导出"/>
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
                                        <td style="width: 30px;"></td>
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
                                        <td >
                                            <input type="text"  disabled="disabled" style="border: 0px;height: 30px;font-size: 16px;background-color: white;text-align: center">
                                            <input type="text" class="unitsId" style="display: none">
                                        </td>
                                        <td><input type="text"  onchange="if(/\D/.test(this.value)){alert('只能输入数字');this.value='';}" class="piVolume" name="piVolume" style="border: 0px;height: 30px;font-size: 16px;text-align: center"></td>
                                        <td><input type="text"  onchange="if(/\D/.test(this.value)){alert('只能输入数字');  this.value='';}" class="piActualPrice" name="piActualPrice" style="border: 0px;height: 30px;font-size: 16px;text-align: center"></td>
                                        <td style="font-size: 16px;"><input  onchange="if(/\D/.test(this.value)){alert('只能输入数字');  this.value='';}" class="piTotalPrice" type="text" name="piTotalPrice"disabled="disabled" style="border: 0px;height: 30px;font-size: 16px;background-color: white;text-align: center"></td>
                                        <td><input type="text" class="piRemarks" name="piRemarks" style="border: 0px;height: 30px;font-size: 16px;"/></td>
                                    </tr>
                                </c:forEach>
                                </tbody>
                            </table>

                        <div class="ui-jqgrid-sdiv" style="width: 1300px;">
                            <div class="ui-jqgrid-hbox">
                                <table class="table table-bordered">
                                    <thead>
                                        <th style="font-size: 18px">
                                            合计：
                                        </th>
                                        <th style="width: 950px;text-align: right" id="all">

                                        </th>



                                    </thead>
                                </table>
                            </div>
                        </div>
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