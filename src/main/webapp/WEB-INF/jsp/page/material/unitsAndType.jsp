<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport"
          content="maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0"/>
    <style>
        * {
            margin: 0;
            padding: 0
        }

        ul, li {
            list-style: none
        }

        .tabClick {
            background: #f3f3f3;
            overflow: hidden
        }

        .tabClick li {
            height: 40px;
            line-height: 40px;
            width: 25%;
            float: left;
            text-align: center
        }

        .tabClick li.active {
            color: #099;
            transition: 0.1s;
            font-weight: bold
        }

        .tabCon {
            overflow: hidden
        }

        .tabBox {
            position: relative
        }

        .tabList {
            word-break: break-all;
            width: 100%;
            float: left;
            line-height: 50px;
            text-align: left;
            color: #5d5d5d;
            font-size: 20px;
            font-family: "Arial Black"
        }

        .lineBorder {
            height: 2px;
            overflow: hidden;
            border-bottom: 1px solid #099;
            background: #f3f3f3
        }

        .lineDiv {
            background: #099;
            height: 2px;
            width: 25%;
        }
    </style>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=1280, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="renderer" content="webkit|ie-stand|ie-comp">
    <link rel="stylesheet" href="${pageContext.request.contextPath }/css/bootstrap.min.css" type="text/css">
    <script src="${pageContext.request.contextPath }/js/jquery.min.js"></script>
    <script src="${pageContext.request.contextPath }/js/bootstrap.min.js"></script>

    <title>精斗云云进销存</title>
    <link href="${pageContext.request.contextPath }/css/select.css" rel="stylesheet" type="text/css"/>
    <link rel="icon" href="http://vip2-gd.youshang.com/css/blue/img/favicon.png" type="image/x-icon">
    <link href="${pageContext.request.contextPath }/css/common.css" rel="stylesheet" type="text/css">
    <link href="${pageContext.request.contextPath }/css/print.css" rel="stylesheet" type="text/css">
    <link href="${pageContext.request.contextPath }/css/ui.min.css" rel="stylesheet">
    <script src="${pageContext.request.contextPath }/js/jquery-1.10.2.min.js"></script>
    <script src="${pageContext.request.contextPath }/js/json3.min.js"></script>
    <script src="${pageContext.request.contextPath }/js/vue.js"></script>
    <script src="${pageContext.request.contextPath }/js/common.js"></script>
    <script src="${pageContext.request.contextPath }/js/grid.js"></script>
    <script src="${pageContext.request.contextPath }/js/plugins.js"></script>
    <script src="${pageContext.request.contextPath }/js/jquery.dialog.js"></script>
    <%--<script src="${pageContext.request.contextPath }/js/material/unitsAndProductType.js"></script>--%>
</head>
<body>
<span style="display:none;">

</span><!-- 代码部分begin -->
<div class="wrap" id="wrap">
    <ul class="tabClick">
        <li class="active">单位</li>
        <li>商品种类</li>
        <li>销售状态</li>
        <li style="display: none">Tab4</li>
    </ul>
    <div class="lineBorder">
        <div class="lineDiv"><!--移动的div--></div>
    </div>
    <div class="tabCon">
        <div class="tabBox">
            <div class="tabList">
                <c:forEach items="${u}" var="u">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <div style="display: none">${u.unitsId}</div>
                    ${u.unitsName}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button type="button" id="updateunits" onclick="updateunits(${u.unitsId})" class="btn btn-info btn-sm" data-toggle="modal" data-target="#unitsUpdate"><span class="up">修改</span></button>
                    <button type="button" id="deleteunits" onclick="deleteunits(${u.unitsId})" class="btn btn-warning btn-sm" data-toggle="modal" data-target="#unitsDelete"><span class="up">删除</span></button>
                    </br>
                </c:forEach>
            </div>
            <div class="tabList">
                <c:forEach items="${p}" var="p">
                    <div style="display: none">${p.productTypeId}</div>
                    <div style="width: 400px;float: left"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${p.productTypeName}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    <div style="float: left">
                    <button type="button" id="updateproductType" onclick="updateproductType(${p.productTypeId})" class="btn btn-info btn-sm" data-toggle="modal" data-target="#productTypeUpdate"><span class="up">修改</span></button>
                    <button type="button" id="deleteproductType" onclick="deleteproductType(${p.productTypeId})" class="btn btn-warning btn-sm" data-toggle="modal" data-target="#productTypeDelete"><span class="up">删除</span></button></div>
                    </br>
                </c:forEach>
            </div>
            <div class="tabList">
                <c:forEach items="${s}" var="s">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <div style="display: none">${s.salesStatusId}</div>
                         ${s.salesStatusName}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <div style="display: none">${s.salesStatusState}</div>
                        <button type="button" id="updatesalesStatus" onclick="updatesalesStatus(${s.salesStatusId})" class="btn btn-info btn-sm" data-toggle="modal" data-target="#salesStatusUpdate"><span class="up">修改</span></button>
                        <button type="button" id="deletesalesStatus" onclick="deletesalesStatus(${s.salesStatusId})" class="btn btn-warning btn-sm" data-toggle="modal" data-target="#salesStatusDelete"><span class="up">删除</span></button>
                        </br>
                </c:forEach>
            </div>
            <div class="tabList" style="display: none">
            </div>
        </div>
    </div>
</div>
<%--修改单位--%>
<div class="modal fade" id="unitsUpdate" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    &times;
                </button>
                <h6 class="modal-title" >
                    修改单位信息
                </h6>
            </div>
            <input type="text" style="display: none">
            <div class="modal-body" style="width: 300px;height: 100px;">

                <div class="input-group">
                    <input id="updateunitsId" type="text" style="display:none;">
                    <span class="input-group-addon" style="width: 81px;">单位名称</span>
                    <input maxlength='1' id="updateunitsName" type="text" class="form-control" style="width:487px;">
                </div>
                <br>
            </div>
            <div class="modal-footer">
                <button type="button" id="updateu" class="btn btn-primary">
                    提交修改
                </button>
                <button type="buttson" class="btn btn-default" data-dismiss="modal">
                    取消
                </button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<%--删除单位--%>
<div  class="modal fade" id="unitsDelete" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" >
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    &times;
                </button>
                <h4 class="modal-title" id="as"></h4>
            </div>
            <div class="modal-footer">
                <button type="button" id="deleteu" class="btn btn-danger" data-dismiss="modal">
                    确定
                </button>
                <button type="button" class="btn btn-default" data-dismiss="modal">
                    取消
                </button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>


<%--修改商品种类--%>
<div class="modal fade" id="productTypeUpdate" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    &times;
                </button>
                <h6 class="modal-title" >
                    修改商品类型信息
                </h6>
            </div>
            <input type="text" style="display: none">
            <div class="modal-body" style="width: 300px;height: 100px;">

                <div class="input-group">
                    <input id="updateproductTypeId" type="text" style="display:none;">
                    <span class="input-group-addon" style="width: 81px;">商品类型名称</span>
                    <input maxlength='10' id="updateproductTypeName" type="text" class="form-control" style="width:400px;">
                </div>
                <br>
            </div>
            <div class="modal-footer">
                <button type="button" id="updatep" class="btn btn-primary">
                    提交修改
                </button>
                <button type="buttson" class="btn btn-default" data-dismiss="modal">
                    取消
                </button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<%--删除商品种类--%>
<div  class="modal fade" id="productTypeDelete" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" >
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    &times;
                </button>
                <h4 class="modal-title" id="asas"></h4>
            </div>
            <div class="modal-footer">
                <button type="button" id="deletep" class="btn btn-danger" data-dismiss="modal">
                    确定
                </button>
                <button type="button" class="btn btn-default" data-dismiss="modal">
                    取消
                </button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>

<%--修改销售类型--%>
<div class="modal fade" id="salesStatusUpdate" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    &times;
                </button>
                <h6 class="modal-title" >
                    修改销售状态信息
                </h6>
            </div>
            <input type="text" style="display: none">
            <div class="modal-body" style="width: 300px;height: 100px;">

                <div class="input-group">
                    <input id="updatesalesStatusId" type="text" style="display:none;">
                    <span class="input-group-addon" style="width: 81px;">销售状态名称</span>
                    <input maxlength='2' id="updatesalesStatusName" type="text" class="form-control" style="width:400px;">
                </div>
                <br>
            </div>
            <div class="modal-footer">
                <button type="button" id="updates" class="btn btn-primary">
                    提交修改
                </button>
                <button type="buttson" class="btn btn-default" data-dismiss="modal">
                    取消
                </button>
            </div>
        </div>
    </div>
</div>
<%--删除销售类型--%>
<div  class="modal fade" id="salesStatusDelete" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" >
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    &times;
                </button>
                <h4 class="modal-title" id="asasas"></h4>
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



<script charset="utf-8">
    window.onload = function () {
        var windowWidth = document.body.clientWidth; //window 宽度;
        var wrap = document.getElementById('wrap');
        var tabClick = wrap.querySelectorAll('.tabClick')[0];
        var tabLi = tabClick.getElementsByTagName('li');

        var tabBox = wrap.querySelectorAll('.tabBox')[0];
        var tabList = tabBox.querySelectorAll('.tabList');

        var lineBorder = wrap.querySelectorAll('.lineBorder')[0];
        var lineDiv = lineBorder.querySelectorAll('.lineDiv')[0];

        var tar = 0;
        var endX = 0;
        var dist = 0;

        tabBox.style.overflow = 'hidden';
        tabBox.style.position = 'relative';
        tabBox.style.width = windowWidth * tabList.length + "px";

        for (var i = 0; i < tabLi.length; i++) {
            tabList[i].style.width = windowWidth + "px";
            tabList[i].style.float = 'left';
            tabList[i].style.float = 'left';
            tabList[i].style.padding = '0';
            tabList[i].style.margin = '0';
            tabList[i].style.verticalAlign = 'top';
            tabList[i].style.display = 'table-cell';
        }

        for (var i = 0; i < tabLi.length; i++) {
            tabLi[i].start = i;
            tabLi[i].onclick = function () {
                var star = this.start;
                for (var i = 0; i < tabLi.length; i++) {
                    tabLi[i].className = '';
                }
                ;
                tabLi[star].className = 'active';
                init.lineAnme(lineDiv, windowWidth / tabLi.length * star)
                init.translate(tabBox, windowWidth, star);
                endX = -star * windowWidth;
            }
        }

        function OnTab(star) {
            if (star < 0) {
                star = 0;
            } else if (star >= tabLi.length) {
                star = tabLi.length - 1
            }
            for (var i = 0; i < tabLi.length; i++) {
                tabLi[i].className = '';
            }
            ;

            tabLi[star].className = 'active';
            init.translate(tabBox, windowWidth, star);
            endX = -star * windowWidth;
        };

        tabBox.addEventListener('touchstart', chstart, false);
        tabBox.addEventListener('touchmove', chmove, false);
        tabBox.addEventListener('touchend', chend, false);

        //按下
        function chstart(ev) {
            ev.preventDefault;
            var touch = ev.touches[0];
            tar = touch.pageX;
            tabBox.style.webkitTransition = 'all 0s ease-in-out';
            tabBox.style.transition = 'all 0s ease-in-out';
        };

        //滑动
        function chmove(ev) {
            var stars = wrap.querySelector('.active').start;
            ev.preventDefault;
            var touch = ev.touches[0];
            var distance = touch.pageX - tar;
            dist = distance;
            init.touchs(tabBox, windowWidth, tar, distance, endX);
            init.lineAnme(lineDiv, -dist / tabLi.length - endX / 4);
        };

        //离开
        function chend(ev) {
            var str = tabBox.style.transform;
            var strs = JSON.stringify(str.split(",", 1));
            endX = Number(strs.substr(14, strs.length - 18));

            if (endX > 0) {
                init.back(tabBox, windowWidth, tar, 0, 0, 0.3);
                endX = 0
            } else if (endX < -windowWidth * tabList.length + windowWidth) {
                endX = -windowWidth * tabList.length + windowWidth
                init.back(tabBox, windowWidth, tar, 0, endX, 0.3);
            } else if (dist < -windowWidth / 3) {
                OnTab(tabClick.querySelector('.active').start + 1);
                init.back(tabBox, windowWidth, tar, 0, endX, 0.3);
            } else if (dist > windowWidth / 3) {
                OnTab(tabClick.querySelector('.active').start - 1);
            } else {
                OnTab(tabClick.querySelector('.active').start);
            }
            var stars = wrap.querySelector('.active').start;
            init.lineAnme(lineDiv, stars * windowWidth / 4);

        };
    };

    var init = {
        translate: function (obj, windowWidth, star) {
            obj.style.webkitTransform = 'translate3d(' + -star * windowWidth + 'px,0,0)';
            obj.style.transform = 'translate3d(' + -star * windowWidth + ',0,0)px';
            obj.style.webkitTransition = 'all 0.3s ease-in-out';
            obj.style.transition = 'all 0.3s ease-in-out';
        },
        touchs: function (obj, windowWidth, tar, distance, endX) {
            obj.style.webkitTransform = 'translate3d(' + (distance + endX) + 'px,0,0)';
            obj.style.transform = 'translate3d(' + (distance + endX) + ',0,0)px';
        },
        lineAnme: function (obj, stance) {
            obj.style.webkitTransform = 'translate3d(' + stance + 'px,0,0)';
            obj.style.transform = 'translate3d(' + stance + 'px,0,0)';
            obj.style.webkitTransition = 'all 0.1s ease-in-out';
            obj.style.transition = 'all 0.1s ease-in-out';
        },
        back: function (obj, windowWidth, tar, distance, endX, time) {
            obj.style.webkitTransform = 'translate3d(' + (distance + endX) + 'px,0,0)';
            obj.style.transform = 'translate3d(' + (distance + endX) + ',0,0)px';
            obj.style.webkitTransition = 'all ' + time + 's ease-in-out';
            obj.style.transition = 'all ' + time + 's ease-in-out';
        },
    }

</script>
<!-- 代码部分end -->
</body>
<script>
    //获取要修改的单位名
    function updateunits(val) {
        $.ajax({
            type: "post",
            url: "/unitsandtype/unitsId.do",
            data:{"unitsId":val},
            dataType: "json",
            success: function (item) {
                if (item != 0) {
                    $("#updateunitsId").val(item.unitsId)
                    $("#updateunitsName").val(item.unitsName)
                    $("#updateunitsState").val(item.unitsState)
                }
            },
            error: function () {
                alert("系统异常，请稍后重试！");
            }
        })
        //修改单位名
        $("#updateu").click(function () {
            var units = new Array();
            var object = new Object();
            object.unitsId = $("#updateunitsId").val();
            object.unitsName = $("#updateunitsName").val()
            object.unitsState = $("#updateunitsState").val()
            units.push(object);
            var unitsList = JSON.stringify(units);
            $.ajax({
                type: "post",
                url: "/unitsandtype/updateunits.do",
                data: {
                    "Units": unitsList
                },
                dataType: "json",
                success: function (data) {
                    if (data != 0) {
                        alert("商品信息修改成功")
                        window.location.href="/unitsandtype/units.do";
                    }
                },
                error: function () {
                    alert("系统异常，请稍后重试！");
                }
            })
        })
    }
    //获取删除的单位
    function deleteunits(val) {
        $.ajax({
            type: "post",
            url: "/unitsandtype/unitsId.do?",
            data:{"unitsId":val},
            dataType: "json",
            success: function (item) {
                if(item!=0){
                    $("#as").html("是否删除单位【"+item.unitsName+"】");
                }
            },
            error: function () {
                alert("系统异常，请稍后重试！");
            }
        })
        //删除商品信息
        $("#deleteu").click(function () {
            var unitsId=val;
            $.ajax({
                type: "post",
                url: "/unitsandtype/deleteunits.do?",
                data:{"unitsId":val},
                dataType: "json",
                success: function (data) {
                    alert("商品信息删除成功")
                    window.location.href="/unitsandtype/units.do";
                },
                error: function () {
                    alert("系统异常，请稍后重试！");
                }
            })
        })
    }
    //获取要修改的商品类型名
    function updateproductType(val) {
        $.ajax({
            type: "post",
            url: "/unitsandtype/productTypeId.do",
            data:{"productTypeId":val},
            dataType: "json",
            success: function (item) {
                if (item != 0) {
                    $("#updateproductTypeId").val(item.productTypeId)
                    $("#updateproductTypeName").val(item.productTypeName)
                    $("#updateproductTypeState").val(item.productTypeState)
                }
            },
            error: function () {
                alert("系统异常，请稍后重试！");
            }
        })
        //修改商品类型名
        $("#deletep").click(function () {
            var productTypes = new Array();
            var object = new Object();
            object.productTypeId = $("#updateproductTypeId").val();
            object.productTypeName = $("#updateproductTypeName").val()
            object.productTypeState = $("#updateproductTypeState").val()
            productTypes.push(object);
            var productTypesList = JSON.stringify(productTypes);
            $.ajax({
                type: "post",
                url: "/unitsandtype/updateproductTypes.do",
                data: {
                    "ProductTypes": productTypesList
                },
                dataType: "json",
                success: function (data) {
                    if (data != 0) {
                        alert("商品信息修改成功")
                        window.location.href="/unitsandtype/units.do";
                    }
                },
                error: function () {
                    alert("系统异常，请稍后重试！");
                }
            })
        })
    }
    //获取删除的商品类型名
    function deleteproductType(val) {
        $.ajax({
            type: "post",
            url: "/unitsandtype/productTypeId.do?",
            data:{"productTypeId":val},
            dataType: "json",
            success: function (item) {
                if(item!=0){
                    $("#asas").html("是否删除单位【"+item.productTypeName+"】");
                }
            },
            error: function () {
                alert("系统异常，请稍后重试！");
            }
        })
        //删除商品信息
        $("#deletep").click(function () {
            var unitsId=val;
            $.ajax({
                type: "post",
                url: "/unitsandtype/deleteproductTypes.do?",
                data:{"productTypeId":val},
                dataType: "json",
                success: function (data) {
                    alert("商品信息删除成功")
                    window.location.href="/unitsandtype/units.do";
                },
                error: function () {
                    alert("系统异常，请稍后重试！");
                }
            })
        })
    }
    //获取要修改的销售状态名
    function updatesalesStatus(val) {
        $.ajax({
            type: "post",
            url: "/unitsandtype/salesStatusId.do",
            data:{"salesStatusId":val},
            dataType: "json",
            success: function (item) {
                if (item != 0) {
                    $("#updatesalesStatusId").val(item.salesStatusId)
                    $("#updatesalesStatusName").val(item.salesStatusName)
                    $("#updatesalesStatusState").val(item.salesStatusState)
                }
            },
            error: function () {
                alert("系统异常，请稍后重试！");
            }
        })
        //修改销售状态名
        $("#updates").click(function () {
            var salesStatus = new Array();
            var object = new Object();
            object.salesStatusId = $("#updatesalesStatusId").val();
            object.salesStatusName = $("#updatesalesStatusName").val()
            object.salesStatusState = $("#updatesalesStatusState").val()
            salesStatus.push(object);
            var salesStatusList = JSON.stringify(salesStatus);
            $.ajax({
                type: "post",
                url: "/unitsandtype/updatesalesStatus.do",
                data: {
                    "SalesStatus": salesStatusList
                },
                dataType: "json",
                success: function (data) {
                    if (data != 0) {
                        alert("商品信息修改成功")
                        window.location.href="/unitsandtype/units.do";
                    }
                },
                error: function () {
                    alert("系统异常，请稍后重试！");
                }
            })
        })
    }
    //获取删除的销售状态名
    function deletesalesStatus(val) {
        $.ajax({
            type: "post",
            url: "/unitsandtype/salesStatusId.do?",
            data:{"salesStatusId":val},
            dataType: "json",
            success: function (item) {
                if(item!=0){
                    $("#asasas").html("是否删除单位【"+item.salesStatusName+"】");
                }
            },
            error: function () {
                alert("系统异常，请稍后重试！");
            }
        })
        //删除商品信息
        $("#deletes").click(function () {
            var unitsId=val;
            $.ajax({
                type: "post",
                url: "/unitsandtype/deletesalesStatus.do?",
                data:{"salesStatusId":val},
                dataType: "json",
                success: function (data) {
                    alert("商品信息删除成功")
                    window.location.href="/unitsandtype/units.do";
                },
                error: function () {
                    alert("系统异常，请稍后重试！");
                }
            })
        })
    }
</script>
</html>