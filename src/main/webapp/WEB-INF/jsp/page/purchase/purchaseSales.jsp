
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>恒辉医药进销存</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath }/select/dist/css/bootstrap-select.css">
    <link href="${request.contextPath }/css/common.css" rel="stylesheet" type="text/css">
    <link href="${pageContext.request.contextPath }/css/bootstrap.min.css" rel="stylesheet" type="text/css">
    <link href="${pageContext.request.contextPath }/css/ui.min.css" rel="stylesheet">
    <script src="${pageContext.request.contextPath }/js/jquery-1.10.2.min.js"></script>
    <script src="${request.contextPath }/js/jquery.dialog.js"></script>
    <link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath }/js/plugins/layer/laydate/need/laydate.css">
    <link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath }/js/plugins/layer/laydate/skins/default/laydate.css" id="LayDateSkin">
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
    </style>
    <script type="text/javascript">
        $(function () {
            $("#search").click(function () {
                var v=$("#end").val();
                var c=$("#hello").val();
                if(c>v){
                   alert("起始日期不能大于结束日期");
                   return false;
                }

            });
            //全选
            $("#checkAll").click(function () {
                if(this.checked){
                    $(".ck").prop("checked", true);
                }else{
                    $(".ck").prop("checked", false);
                }
            });
            $("#toPo").click(function () {
                if($("input[type='checkbox']").is(':checked')){
                    var salesInformation=new Array();
                    var salesInformationList=null;
                    $(".eachtr").each(function (index,data) {
                        if($(data).find(".ck").is(':checked')){
                            var merchandiseId=$(data).find(".merchandiseId").html();
                            var merchandiseName=$(data).find(".merchandiseName").html();
                            var unitsId=$(data).find(".unitsId").html();
                            var unitsName=$(data).find(".unitsName").html();
                            var siVolume=$(data).find(".piVolume").val();
                            var salesId=$(data).find(".salesId").html();
                            var salesDate=$(data).find(".salesDate").html();
                            var siActualPrice=$(data).find(".piActualPrice").val();
                            var obj=new Object();
                            obj.merchandiseId=merchandiseId;
                            obj.merchandiseName=merchandiseName;
                            obj.unitsName=unitsName;
                            obj.unitsId=unitsId;
                            obj.siVolume=siVolume;
                            obj.salesId=salesId;
                            obj.salesDate=salesDate;
                            obj.siActualPrice=siActualPrice;
                            salesInformation.push(obj);
                            salesInformationList=JSON.stringify(salesInformation);
                        }

                    });
                    $.ajax({
                        type: "post",
                        url: "/purchases/generateOrders.do",
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
                    return false;
                }

            })
        })
    </script>
</head>
<body style="">

<div class="bill-ser-top">
    <form action="/purchases/showPurchaseSales.do" method="post">
    <div style="height: 30px;"></div>
    <ul class="ul-inline cf">
        <li >
            <label>&nbsp;&nbsp;&nbsp;商品名称:</label>
            <input type="text"  name="merchandiseName"/>
        </li>
        <li >
            <label>&nbsp;&nbsp;&nbsp;交货日期:</label>
            <input id="hello"  name="startTime">
            <i>-</i>
            <input id="end" class="" name="endTime">
        </li>
        <li >
            <input type="checkbox" id="check" name="siState" value="1"  onclick="this.value=this.checked?1:0"><label> 已采购完订单不显示</label>
            <input type="submit" class="ui-btn ui-btn-search" href="" id="search" value="查询"/>
        </li>
    </ul>
    <br/>
    </form>
</div>
<div class="wrapper btc">
    <div class="bill-ser-botm">
        <div class="cf">
            <div class="fr" style="position: absolute;top: 70px;right: 60px">
                <button class="btn btn-info" id="toPo"><span style="color: white">生成购货订单</span></button>
                <a href="/purchases/excel.do" class="btn btn-default" id="export">导出</a>
            </div>
        </div>
    </div>
    <div>
        <table class="table table-bordered" style="width: 1250px">
            <thead>
            <tr>
                <th style="width: 25px;"><input type="checkbox" id="checkAll"></th>
                <th style="display: none">销货商品id</th>
                <th>销货商品名称</th>
                <th>销货商品单位</th>
                <th>销货商品数量</th>
                <th>订单号</th>
                <th>订单日期</th>
                <th>待采购数量</th>
                <th>本次采购数量</th>
                <th>本次采购价格</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <c:forEach items="${salesInformations}" var="salesInfo">
                <tr class="eachtr">
                    <td style="width: 25px;text-align: center"><input class="ck" type="checkbox"></td>
                    <td class="merchandiseId" style="display: none">${salesInfo.merchandise.merchandiseId}</td>
                    <td class="merchandiseName">${salesInfo.merchandise.merchandiseName}</td>
                    <td style="display: none" class="unitsId">${salesInfo.units.unitsId}</td>
                    <td class="unitsName">${salesInfo.units.unitsName}</td>
                    <td class="siVolume">${salesInfo.siVolume}</td>
                    <td class="salesId">${salesInfo.salesId}</td>
                    <td class="salesDate"><fmt:formatDate value="${salesInfo.sales.salesDate}" pattern="yyyy-MM-dd"/> </td>
                    <td>${salesInfo.siVolume}</td>
                    <td><input  onchange="if(/\D/.test(this.value)){alert('只能输入数字');this.value='';}" class="piVolume" type="text" style="border: none;height: 30px;text-align: center"></td>
                    <td><input  onchange="if(/\D/.test(this.value)){alert('只能输入数字');this.value='';}" class="piActualPrice" type="text" style="border: none;height: 30px;text-align: center"></td>
                    <td style="width: 120px;text-align: center"><button type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#myModal" >修改</button><button type="button" class="btn btn-warning btn-sm" data-toggle="modal" data-target="#del" >删除</button></td>
                </tr>
            </c:forEach>

            </tbody>


        </table>
        <div class="ads" id="dsa" style="position: absolute;right: 100px;top: 420px;">
            <ul class="pagination" >
                <li><a href="?start=0">首页</a></li>
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
                <li><a href="?start=${page.last}">末页</a></li>
                <li><a >共有${totalPage}条数据</a></li>
                <li><a>共有${len}页</a></li>
            </ul>
        </div>

    </div>
</div>




<div style="left: 0px; top: 0px; visibility: hidden; position: absolute;" class="">

    <div  class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog" >
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        &times;
                    </button>
                    <h4 class="modal-title" id="myModalLabel">
                        修改采购订单
                    </h4>
                </div>
                <div class="modal-body">
                    <div class="input-group">
                        <span class="input-group-addon">商品名称</span>
                        <input type="text" class="form-control" placeholder="twitterhandle">
                    </div>
                    <br/>
                    <div class="input-group">
                        <span class="input-group-addon" style="width: 81px;">单位</span>
                        <input type="text" class="form-control" placeholder="twitterhandle" style="width:487px;">
                    </div>
                    <br/>
                    <div class="input-group">
                        <span class="input-group-addon" style="width: 81px;">数量</span>
                        <input type="text" class="form-control" placeholder="twitterhandle" style="width:487px;">
                    </div>
                    <br/>
                    <div class="input-group">
                        <span class="input-group-addon" style="width: 81px;">订单号</span>
                        <input type="text" class="form-control" placeholder="twitterhandle" style="width:487px;">
                    </div>
                    <br/>
                    <div class="input-group">
                        <span class="input-group-addon" style="width: 81px;">订单日期</span>
                        <input type="text" class="form-control" placeholder="twitterhandle" style="width:487px;">
                    </div>
                    <br/>  <div class="input-group">
                    <span class="input-group-addon" style="width: 81px;">库存</span>
                    <input type="text" class="form-control" placeholder="twitterhandle" style="width:487px;">
                </div>
                    <br/>  <div class="input-group">
                    <span class="input-group-addon" style="width: 81px;">购货日期</span>
                    <input type="text" class="form-control" placeholder="twitterhandle" style="width:487px;">
                </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success">
                        保存
                    </button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭
                    </button>

                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal -->
    </div>

    <div  class="modal fade" id="del" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog" >
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        &times;
                    </button>
                    <h4 class="modal-title" >
                        确定删除吗
                    </h4>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">
                        确定
                    </button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭
                    </button>

                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal -->
    </div>


</div>
<script src="${pageContext.request.contextPath }/js/jquery.min.js?v=2.1.4"></script>
<script src="${pageContext.request.contextPath }/js/bootstrap.min.js?v=3.3.6"></script>
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