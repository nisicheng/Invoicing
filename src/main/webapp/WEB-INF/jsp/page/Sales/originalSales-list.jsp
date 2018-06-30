<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2017-12-06
  Time: 10:25
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
    <link href="${pageContext.request.contextPath }/css/common.css" rel="stylesheet" type="text/css">
    <link href="${pageContext.request.contextPath }/css/ui.min.css" rel="stylesheet">
    <link rel="shortcut icon" href="favicon.ico">
    <link href="${pageContext.request.contextPath }/css/bootstrap.min14ed.css?v=3.3.6" rel="stylesheet">
    <link href="${pageContext.request.contextPath }/css/font-awesome.min93e3.css?v=4.4.0" rel="stylesheet">
    <link href="${pageContext.request.contextPath }/css/animate.min.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/css/plugins/webuploader/webuploader.css">
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/css/demo/webuploader-demo.min.css">
    <link href="${pageContext.request.contextPath }/css/style.min862f.css?v=4.1.0" rel="stylesheet">

    <style type="text/css">
        .mod-toolbar-top strong.txt, #period {
            font-size: 14px;
            margin-right: 10px;
        }

        .ul-inline li label {
            vertical-align: middle;
        }

        .ul-inline li input {
            vertical-align: middle;
        }

        a.modeBtn {
            vertical-align: middle;
            width: 25px;
            height: 25px;
            display: inline-block;
            background: url("/css/img/ov_icons_2.png") no-repeat 0 0;
        }

        a.modeBtn.toPic.enable {
            background-position: -20px 2px;
        }

        a.modeBtn.toPic {
            background-position: 2px 2px;
        }

        a.modeBtn.toList.enable {
            background-position: -20px -22px;
        }

        a.modeBtn.toList {
            background-position: 2px -22px;
        }

        /*.cbox{background: #979292; font-size: 12px; color: #fff;  padding: 1px;  line-height: 12px;   border-radius: 3px;   z-index: 1;  border: 2px solid #fff;}*/
        /*.checked .cbox{background: #408BB5;}*/
        .container {
            margin: 0 15px;
            position: relative;
        }

        /*左侧分类栏样式*/
        #bsCategory {
            width: 200px;
            background: #fff;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            border: 1px solid #dedede;
            overflow: hidden;
        }

        #bsCategory h3 {
            background: #EEEEEE url(/css/default/img/ui-th.png) 0 0 repeat-x;
            border-bottom: 1px solid #dedede;
            color: #555;
            line-height: 30px;
            text-align: center;
        }

        /*右侧内容区样式*/
        /*.container .dataWrapper{ margin-left: 210px;}*/
        .container .dataWrapper {
            margin-top: 30px;
        }

        /*图片视图的样式*/
        #picGridWrap {
            background: #fff;
            padding: 10px;
            border: 1px solid #E4E3E3;
        }

        #picGridWrap .cbox {
            width: 20px;
            height: 20px;
            display: inline-block;
            background: url("/css/img/ov_icons_1.png") no-repeat -1px 2px #fff;
            border-radius: 3px;
            z-index: 1;
        }

        #picGridWrap .cbox:hover {
            background-position: -27px 2px;
        }

        #picGridWrap .checked .cbox {
            background-position: -53px 2px;
        }

        #picGridWrap .groupchk .cbox {
            position: relative;
            top: 4px;
        }

        #picGridWrap .chkAll .cbox {
            position: relative;
            top: 4px;
        }

        #innerCenter a {
            float: none;
        }

        #innerRight {
            float: right;
        }

        #picGridWrap .changeBtns {
            background: #fff;
            padding: 0 0 10px 5px;
            border-bottom: 1px solid #E4E3E3;
        }

        #checkAll {
            margin-right: 10px;
            cursor: pointer;
        }

        #checkAll i {
            border: none;
            margin-right: 3px;
        }

        #sortDate {
            padding-right: 15px;
            cursor: pointer;
            margin-top: 3px;
            z-index: 2;
            vertical-align: middle;
        }

        #sortDate:hover {
            color: #408BB5;
        }

        #sortDate.asc {
            background: url("/css/img/asc.png") no-repeat 52px 2px;
        }

        #sortDate.desc {
            background: url("/css/img/desc.png") no-repeat 52px 2px;
        }

        #picGrid {
            overflow: auto;
            zoom: 1;
        }

        #picGrid .group h3 {
            font-size: 12px;
            font-weight: bold;
            padding-top: 15px;
        }

        #picGrid .group h3 span:hover {
            cursor: pointer;
        }

        #picGrid .group h3 span i {
            margin: 0 5px;
            border: none;
        }

        #picGrid .list {
            padding: 0 10px;
        }

        #picGrid .picItem {
            position: relative;
            float: left;
            width: 160px;
            height: 150px;
            border: 1px solid #ccc;
            margin: 5px; /*overflow: hidden;*/
        }

        #picGrid .picItem:hover {
            cursor: pointer;
            border-color: #408BB5;
        }

        #picGrid .picItem .itemInner {
            position: relative;
            height: 150px;
            width: 160px;
            zoom: 1;
        }

        #picGrid .picItem .itemInner .imgWrap {
            position: absolute;
            bottom: 0;
            right: 0;
            left: 0;
            top: 0;
            margin: auto;
        }

        #picGrid .picItem .img {
            max-width: 140px;
            max-height: 140px;
        }

        #picGrid .picItem img:hover {
        }

        #picGrid .picItem .imgWrap.first {
            top: 0;
            left: -6px;
            bottom: 10px;
            right: 0px;
            /*border: 2px solid #fff;*/
        }

        #picGrid .picItem .imgWrap.first .img {
            max-width: 140px;
            max-height: 110px;
        }

        #picGrid .picItem .imgWrap.second {
            top: 10px;
            left: 10px;
            bottom: 0;
            right: 0;
            border: 2px solid #fff;
        }

        #picGrid .picItem .imgWrap.second .img {
            max-width: 140px;
            max-height: 110px;
        }

        #picGrid .picItem .cbox {
            position: absolute;
            top: 5px;
            left: 5px;
        }

        #picGrid .picItem.selected {
            border-color: #408BB5;
        }

        #picGrid .picItem .tools {
            position: absolute;
            /*background: #ccc;*/
        }

        #picGrid .picItem .tools.top {
            right: 3px;
            top: 3px;
        }

        #picGrid .picItem .tools.top .btn {
            display: none;
            width: 25px;
            height: 25px;
            /*display: inline-block;*/
            background: url("/css/img/ov_icons_1.png") no-repeat 0 0 #fff;
            border-radius: 3px;
            z-index: 1;
            border: none;
        }

        #picGrid .picItem .tools.top .split {
            background-position: 2px -41px;
        }

        #picGrid .picItem .tools.top .split:hover {
            background-position: -23px -41px;
        }

        #picGrid .picItem .tools.top .del {
            background-position: 2px -18px;
        }

        #picGrid .picItem .tools.top .del:hover {
            background-position: -23px -18px;
        }

        #picGrid .picItem:hover .tools.top .btn {
            display: inline-block;
        }

        #picGrid .picItem .tools.bottom {
            bottom: 0;
            background: #e1e1e1;
            width: 100%;
        }

        #picGrid .picItem .tools.bottom a {
            cursor: default;
            display: inline-block;
            padding: 0px 3px;
            color: #fff;
            border: 2px solid #fff;
        }

        #picGrid .picItem .tools .btn {
            cursor: pointer;
            color: #fff;
        }

        #picGrid .picItem .tools.bottom a {
            border: none;
            padding: 0 10px;
            color: #666;
        }

        #picGrid .picItem .tools.bottom .btn:hover {
            text-decoration: underline;
        }

        #picGrid .picItem .tools.bottom .cleanUp {
            float: right;
        }

        /*左侧树的特殊样式限制*/
        #ztree {
            width: 190px;
            overflow: auto;
        }

        #ztree_1_switch {
            display: none;
        }

        #ztree_1_ul {
            padding: 0;
        }

        /*生成凭证选项*/
        .createVoucherPop li {
            margin: -1px 0;
        }

        .createVoucherPop li a {
            width: 200px;
            margin: 0;
            cursor: pointer;
        }

        /*列表视图的样式*/
        .autoGrid {
            padding: 0;
        }

        .autoGrid tr.jqgroup td {
            padding: 5px;
        }

        #checkboxWrap {
            padding-left: 10px;
        }

        .picItem .bottom {
            text-align: center;
            height: 19px;
            line-height: 19px;
            overflow: hidden;
        }
    </style>
</head>
<body style="">
<div class="wrapper">
    <div class="mod-toolbar-top">
        <div class="fl">
            <ul class="ul-inline">
                <li>
                    <span id="billType"></span>
                </li>

                <li id="checkboxWrap">
                    <label class="chk" style="margin-top:6px; "><input type="checkbox" name="box" value="isVoucher">已生成销售单</label>
                </li>
                <li><a class="ui-btn ui-btn-refresh" id="search" title="刷新"><b></b></a></li>
            </ul>
        </div>
        <div class="fr">

            <button class="ui-btn" id="uploadAttachment"  data-toggle="modal" data-target="#del">导入附件</button>

            <a class="ui-btn ui-btn-sp" id="create">生成销货单</a>

        </div>
    </div>
    <div class="container">

        <div class="dataWrapper" id="picGridWrap">

            <p class="changeBtns">
                <span class="cboxWrap chkAll" id="checkAll"><i class="cbox"></i>全选</span>
                <span id="sortDate" class="desc">上传日期</span>
            </p>
            <div id="picGrid" style="height: 511.4px;">
                <div class="group"  data-toggle="modal" data-target="#myModal">
                    <h3><span class="cboxWrap groupchk"><i class="cbox"></i>2017-09-22</span></h3>
                    <ul class="list cf">
                        <li class="picItem" id="88887792">
                            <div class="itemInner"><span class="cboxWrap"><i class="cbox"></i></span><span
                                    class="imgWrap" style="width: 93px; height: 140px;"><img class="img"
                                                                                             src="http://pics.youshang.com/group1/M00/07/B4/CvQFsVnEeJ-AaecVAAD7gxAbzms648_200x200.jpg"
                                                                                             href="http://pics.youshang.com/group1/M00/07/B4/CvQFsVnEeJ-AaecVAAD7gxAbzms648.jpg"></span><span
                                    class="tools top"><a href="#" class="del btn" data-id="88887792"></a></span></div>
                            <div class="tools bottom">狗</div>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
        <div class="dataWrapper autoGrid grid-wrap dn" id="dataGrid">
            <table id="grid">
            </table>
            <div id="page"></div>
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
                        原始单据
                    </h4>
                </div>
                <div class="modal-body" style="text-align: center">
                    <img src="http://pics.youshang.com/group1/M00/07/B4/CvQFsVnEeJ-AaecVAAD7gxAbzms648_200x200.jpg  ">
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
                        上传原始单据
                    </h4>
                </div>
                <div class="modal-body">
                    <div class="col-sm-12">
                        <div class="ibox float-e-margins">
                            <div class="ibox-title">

                                <div class="ibox-tools">
                                    <a class="collapse-link">
                                        <i class="fa fa-chevron-up"></i>
                                    </a>
                                    <a class="dropdown-toggle" data-toggle="dropdown" href="form_file_upload.html#">
                                        <i class="fa fa-wrench"></i>
                                    </a>
                                    <ul class="dropdown-menu dropdown-user">
                                        <li><a href="form_file_upload.html#">选项1</a>
                                        </li>
                                        <li><a href="form_file_upload.html#">选项2</a>
                                        </li>
                                    </ul>
                                    <a class="close-link">
                                        <i class="fa fa-times"></i>
                                    </a>
                                </div>
                            </div>
                            <div class="ibox-content">
                                <div class="page-container">
                                    <p>您可以尝试文件拖拽，使用QQ截屏工具，然后激活窗口后粘贴，或者点击添加图片按钮，来体验此demo.</p>
                                    <div id="uploader" class="wu-example">
                                        <div class="queueList">
                                            <div id="dndArea" class="placeholder">
                                                <div id="filePicker" class="webuploader-container">
                                                    <div class="webuploader-pick">点击选择图片</div>
                                                    <div id="rt_rt_1c0fp97fr12mc17cm1bgq13r21f231" style="position: absolute; top: 0px; left: 451.192px; width: 168px; height: 44px; overflow: hidden; bottom: auto; right: auto;">
                                                        <input type="file" name="file" class="webuploader-element-invisible">
                                                        <label style="opacity: 0; width: 100%; height: 100%; display: block; cursor: pointer; background: rgb(255, 255, 255);"></label>
                                                    </div>
                                                </div>
                                                <p>或将照片拖到这里，单次最多可选300张</p>
                                            </div>
                                            <ul class="filelist" style="display: none;"></ul></div>
                                        <div class="statusBar element-invisible" style="">
                                            <div class="progress" style="display: none;">
                                                <span class="text">0%</span>
                                                <span class="percentage" style="width: 0%;"></span>
                                            </div>
                                            <div class="info">共0张（0B），已上传0张</div>
                                            <div class="btns">
                                                <div id="filePicker2" class="webuploader-container"><div class="webuploader-pick">继续添加</div><div id="rt_rt_1c0fp97fu8pnja6129d1p84opk6" style="position: absolute; top: 0px; left: 9.98846px; width: 94px; height: 41px; overflow: hidden; bottom: auto; right: auto;"><input type="file" name="file" class="webuploader-element-invisible" multiple="multiple" accept="image/*"><label style="opacity: 0; width: 100%; height: 100%; display: block; cursor: pointer; background: rgb(255, 255, 255);"></label></div></div>
                                                <div class="uploadBtn state-pedding">开始上传</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
<div id="ldg_lockmask"
     style="position: fixed; left: 0px; top: 0px; width: 100%; height: 100%; overflow: hidden; z-index: 1977; display: none;"></div>

<script src="${pageContext.request.contextPath }/js/jquery.min.js?v=2.1.4"></script>

<script src="${pageContext.request.contextPath }/js/bootstrap.min.js?v=3.3.6"></script>
<script src="${pageContext.request.contextPath }/js/content.min.js?v=1.0.0"></script>
<script src="${pageContext.request.contextPath }/js/plugins/layer/laydate/laydate.js"></script>
<script src="${pageContext.request.contextPath }/js/plugins/webuploader/webuploader.min.js"></script>
<script src="${pageContext.request.contextPath }/js/demo/webuploader-demo.min.js"></script>
<script type="text/javascript">
    var BASE_URL = '${pageContext.request.contextPath }/js/plugins/webuploader/index.html';
</script>
<script type="text/javascript" src="http://tajs.qq.com/stats?sId=9051096" charset="UTF-8"></script>
</body>
</html>
