<%--
  Created by IntelliJ IDEA.
  User: HP
  Date: 2017-11-30
  Time: 14:30
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>

    <!-- start: Meta -->
    <meta charset="utf-8">
    <title></title>
    <meta name="description" content="Bootstrap Metro Dashboard">
    <meta name="author" content="">
    <meta name="keyword" content="">
    <!-- end: Meta -->

    <!-- start: Mobile Specific -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- end: Mobile Specific -->

    <!-- start: CSS -->
    <link id="bootstrap-style" href="${pageContext.request.contextPath }/css/bootstrap.min.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath }/css/bootstrap-responsive.min.css" rel="stylesheet">
    <link id="base-style" href="${pageContext.request.contextPath }/css/style.css" rel="stylesheet">
    <link id="base-style-responsive" href="${pageContext.request.contextPath }/css/style-responsive.css" rel="stylesheet">
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800&subset=latin,cyrillic-ext,latin-ext' rel='stylesheet' type='text/css'>
    <!-- end: CSS -->


    <!-- The HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
    <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <link id="ie-style" href="${pageContext.request.contextPath }/css/ie.css" rel="stylesheet">
    <![endif]-->

    <!--[if IE 9]>
    <link id="ie9style" href="${pageContext.request.contextPath }/css/ie9.css" rel="stylesheet">
    <![endif]-->

    <!-- start: Favicon -->
    <link rel="shortcut icon" href="${pageContext.request.contextPath }/img/favicon.ico">
    <!-- end: Favicon -->




</head>

<body>	<!-- start: Content -->
<div id="content" class="span10">



    <div class="row-fluid sortable">
        <div class="box span12">
            <div class="box-header" data-original-title>
                <h2><i class="halflings-icon white user"></i><span class="break"></span>Members</h2>
                <div class="box-icon">
                    <a href="#" class="btn-minimize"><i class="halflings-icon white chevron-up"></i></a>
                    <a href="#" class="btn-close"><i class="halflings-icon white remove"></i></a>
                </div>
            </div>
            <div class="box-content">
                <table class="table table-striped table-bordered bootstrap-datatable datatable">
                    <thead>
                    <tr>
                        <th>Username</th>
                        <th>Date registered</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>name</td>
                        <td class="center">2012/02/01</td>
                        <td class="center">Staff</td>
                        <td class="center">
                            <span class="label label-important">Banned</span>
                        </td>
                        <td class="center">
                            <a class="btn btn-success" href="#">
                                <i class="halflings-icon white zoom-in"></i>
                            </a>
                            <a class="btn btn-info" href="#">
                                <i class="halflings-icon white edit"></i>
                            </a>
                            <a class="btn btn-danger" href="#">
                                <i class="halflings-icon white trash"></i>
                            </a>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div><!--/span-->
    </div><!--/row-->
</div><!--/.fluid-container-->


<!-- start: JavaScript-->

<script src="${pageContext.request.contextPath }/js/jquery-1.9.1.min.js"></script>
<script src="${pageContext.request.contextPath }/js/jquery-migrate-1.0.0.min.js"></script>

<script src="${pageContext.request.contextPath }/js/jquery-ui-1.10.0.custom.min.js"></script>

<script src="${pageContext.request.contextPath }/js/jquery.ui.touch-punch.js"></script>

<script src="${pageContext.request.contextPath }/js/modernizr.js"></script>

<script src="${pageContext.request.contextPath }/js/bootstrap.min.js"></script>

<script src="${pageContext.request.contextPath }/js/jquery.cookie.js"></script>

<script src='${pageContext.request.contextPath }/js/fullcalendar.min.js'></script>

<script src='${pageContext.request.contextPath }/js/jquery.dataTables.min.js'></script>

<script src="${pageContext.request.contextPath }/js/excanvas.js"></script>


<script src="${pageContext.request.contextPath }/js/jquery.chosen.min.js"></script>

<script src="${pageContext.request.contextPath }/js/jquery.uniform.min.js"></script>

<script src="${pageContext.request.contextPath }/js/jquery.cleditor.min.js"></script>

<script src="${pageContext.request.contextPath }/js/jquery.noty.js"></script>

<script src="${pageContext.request.contextPath }/js/jquery.elfinder.min.js"></script>

<script src="${pageContext.request.contextPath }/js/jquery.raty.min.js"></script>

<script src="${pageContext.request.contextPath }/js/jquery.iphone.toggle.js"></script>

<script src="${pageContext.request.contextPath }/js/jquery.uploadify-3.1.min.js"></script>

<script src="${pageContext.request.contextPath }/js/jquery.sparkline.min.js"></script>

<script src="${pageContext.request.contextPath }/js/counter.js"></script>

<script src="${pageContext.request.contextPath }/js/retina.js"></script>

<script src="${pageContext.request.contextPath }/js/custom.js"></script>
<!-- end: JavaScript-->

</body>
</html>

