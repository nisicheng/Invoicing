<%--
  Created by IntelliJ IDEA.
  User: HP
  Date: 2017-12-17
  Time: 21:58
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="${pageContext.request.contextPath }/css/paging.css">
    <script src="${pageContext.request.contextPath }/js/jquery-1.11.1.min.js"></script>
    <script src="${pageContext.request.contextPath }/js/paging.js"></script>
</head>
<body>
<div class="box" id="box"></div>
<script>
    var setTotalCount = 301;
    $('#box').paging({

        initPageNo: 1, // 初始页码
        totalPages:20, //总页数
        totalCount: '合计' + setTotalCount + '条数据', // 条目总数
        slideSpeed: 600, // 缓动速度。单位毫秒
        jump: true, //是否支持跳转
        callback: function(page) { // 回调函数
            console.log(page);
        }
    })
</script>
</body>

</html>
