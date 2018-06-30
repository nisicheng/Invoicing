<%--盘点
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2017-12-07
  Time: 10:15
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <meta name="viewport" content="width=1280, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="renderer" content="webkit|ie-stand|ie-comp">
    <title>精斗云云进销存</title>

    <link rel="icon" href="http://vip2-gd.youshang.com/css/blue/img/favicon.png" type="image/x-icon">
    <link href="../../css/common.css" rel="stylesheet" type="text/css">
    <link href="../../css/print.css" rel="stylesheet" type="text/css">
    <link href="../../css/bootstrap.min.css" rel="stylesheet" type="text/css">
    <link href="../../css/ui.min.css" rel="stylesheet">
    <script type="text/javascript" async="" src="../../js/vds.js"></script>
    <script src="../../js/jquery-1.10.2.min.js"></script>
    <script src="../../js/json3.min.js"></script>
    <script src="../../js/vue.js"></script>
    <script src="../../js/common.js"></script>
    <script src="../../js/grid.js"></script>
    <script src="../../js/plugins.js"></script>
    <script src="../../js/jquery.dialog.js"></script>
    <link type="text/css" rel="stylesheet" href="../../js/plugins/layer/laydate/need/laydate.css">
    <link type="text/css" rel="stylesheet" href="../../js/plugins/layer/laydate/skins/default/laydate.css"
          id="LayDateSkin">
</head>
<body style="">
<div class="bill-ser-top">
    <ul class="ul-inline cf">

        <li>
            <label>盘点日期:</label>
            <input id="hello" class="">
            <i>-</i>
            <input id="end" class="">
        </li>
        <li>
            <label>商品:</label>
            <input type="text" id="hasPurReady"/>
            <a class="ui-btn ui-btn-search" id="search">查询</a>
        </li>
    </ul>
</div>
<div class="wrapper btc">
    <div class="ui-jqgrid-titlebar ui-jqgrid-caption ui-widget-header ui-corner-top ui-helper-clearfix"
         style="display: none;">
        <a role="link" class="ui-jqgrid-titlebar-close ui-corner-all HeaderButton" style="right: 0px;">
            <span class="ui-icon ui-icon-circle-triangle-n"></span>
        </a><span class="ui-jqgrid-title"></span>
    </div>
    <table class="table table-striped" style="width: 1200px">
        <thead>
        <tr>
            <th style="display: none">商品id</th>
            <th>盘点时间</th>
            <th>盘点编号</th>
            <th>盘点结果</th>
            <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;操作</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>Tanmay</td>
            <td>Bangalore</td>
            <td>560001</td>
            <td style="width: 120px;text-align: center">
                <button type="button" class="btn btn-info btn-sm">修改</button>
                <button type="button" class="btn btn-warning btn-sm">删除</button>
            </td>
        </tr>
        </tbody>
    </table>
</div>

<div style="left: 0px; top: 0px; visibility: hidden; position: absolute;" class="">

    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
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
                    <br/>
                    <div class="input-group">
                        <span class="input-group-addon" style="width: 81px;">库存</span>
                        <input type="text" class="form-control" placeholder="twitterhandle" style="width:487px;">
                    </div>
                    <br/>
                    <div class="input-group">
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

    <div class="modal fade" id="del" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        &times;
                    </button>
                    <h4 class="modal-title">
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
<script src="../../js/jquery.min.js?v=2.1.4"></script>
<script src="../../js/bootstrap.min.js?v=3.3.6"></script>
<script src="../../js/content.min.js?v=1.0.0"></script>
<script src="../../js/plugins/layer/laydate/laydate.js"></script>
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
