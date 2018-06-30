<%--调拨单
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2017-12-07
  Time: 10:14
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
    <link href="../../css/bootstrap.min.css">
    <link href="../../css/ui.min.css" rel="stylesheet">
    <link rel="shortcut icon" href="favicon.ico">
    <link href="../../css/bootstrap.min14ed.css?v=3.3.6" rel="stylesheet">
    <link href="../../css/font-awesome.min93e3.css?v=4.4.0" rel="stylesheet">
    <link rel="shortcut icon" href="favicon.ico">
    <link href="../../css/bootstrap.min14ed.css?v=3.3.6" rel="stylesheet">
    <link href="../../css/font-awesome.min93e3.css?v=4.4.0" rel="stylesheet">
    <link href="../../css/animate.min.css" rel="stylesheet">
    <link href="../../css/animate.min.css" rel="stylesheet">
    <link href="../../css/style.min862f.css?v=4.1.0" rel="stylesheet">
    <link type="text/css" rel="stylesheet"
          href="../../js/plugins/layer/laydate/need/laydate.css">
    <link type="text/css" rel="stylesheet"
          href="../../js/plugins/layer/laydate/skins/default/laydate.css"
          id="LayDateSkin">
    <link href="../../css/animate.min.css" rel="stylesheet">
    <link href="../../css/style.min862f.css?v=4.1.0" rel="stylesheet">
    <script type="text/javascript" src="../../js/bootstrap.min.js"></script>
    <script type="text/javascript" src="../../js/plugins/suggest/bootstrap-suggest.min.js"></script>
    <script type="text/javascript" async="" src="../../js/vds.js"></script>
    <script src="../../js/jquery-1.10.2.min.js"></script>
    <script src="../../js/json3.min.js"></script>
    <script src="../../js/vue.js"></script>
    <script src="../../js/common.js"></script>
    <script src="../../js/grid.js"></script>
    <script src="../../js/plugins.js"></script>
    <script src="../../js/jquery.dialog.js"></script>
    <link href="../../css/bills.css" rel="stylesheet" type="text/css">
</head>
<body style="">
<div class="wrapper">
    <div class="mod-toolbar-top mr0 cf dn" id="toolTop"></div>
    <div class="bills cf">
        <div class="con-header">
            <dl class="cf">

                <dd class="mr20 tc">
                    <label>单据日期:</label>
                    <input type="text" id="hello">
                </dd>

                <dd id="identifiers" style="float:right">
                    <label>单据编号:</label>
                    <span id="number">XS20171204001</span>
                    <i id="editBills"></i>
                    <span class="ui-combo-wrap" id="numberAuto" style="display: none;">
            <i class="trigger"></i>
          </span>
                </dd>
            </dl>
            <hr class="hrcls">
        </div>
        <div class="wrapper_con">

            <div class="grid-wrap">
                <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all" id="gbox_grid" dir="ltr"
                     style="width: 1191px;">
                    <div class="ui-widget-overlay jqgrid-overlay" id="lui_grid"></div>
                    <div class="loading ui-state-default ui-state-active" id="load_grid" style="display: none;">读取中...
                    </div>
                    <div class="ui-jqgrid-view" id="gview_grid" style="width: 1191px;">
                        <div style="position:fixed;top:0px;width:1px;height:1px;" tabindex="0">
                            <div tabindex="-1" style="width:1px;height:1px;" id="grid_kn"></div>
                        </div>
                        <div class="ui-jqgrid-titlebar ui-jqgrid-caption ui-widget-header ui-corner-top ui-helper-clearfix"
                             style="display: none;"><a role="link"
                                                       class="ui-jqgrid-titlebar-close ui-corner-all HeaderButton"
                                                       style="right: 0px;"><span
                                class="ui-icon ui-icon-circle-triangle-n"></span></a><span
                                class="ui-jqgrid-title"></span></div>
                        <div class="ui-state-default ui-jqgrid-hdiv ui-corner-top" style="width: 1191px;">
                            <div class="ui-jqgrid-hbox">
                                <table class="ui-jqgrid-htable" style="width:1023px" role="grid"
                                       aria-labelledby="gbox_grid" cellspacing="0" cellpadding="0" border="0">
                                    <thead>
                                    <tr class="ui-jqgrid-labels" role="rowheader">
                                        <th id="grid_rn" role="columnheader"
                                            class="ui-state-default ui-th-column ui-th-ltr" style="width: 25px;">
                                            <div id="jqgh_grid_rn"><span class="s-ico" style="display:none"><span
                                                    sort="asc"
                                                    class="ui-grid-ico-sort ui-icon-asc ui-state-disabled ui-icon ui-icon-triangle-1-n ui-sort-ltr"></span><span
                                                    sort="desc"
                                                    class="ui-grid-ico-sort ui-icon-desc ui-state-disabled ui-icon ui-icon-triangle-1-s ui-sort-ltr"></span></span>
                                            </div>
                                        </th>
                                        <th id="grid_operating" role="columnheader"
                                            class="ui-state-default ui-th-column ui-th-ltr" style="width: 0px;"><span
                                                class="ui-jqgrid-resize ui-jqgrid-resize-ltr"
                                                style="cursor: col-resize;">&nbsp;</span>
                                            <div id="jqgh_grid_operating" class="ui-jqgrid-sortable"><span class="s-ico"
                                                                                                           style="display:none"><span
                                                    sort="asc"
                                                    class="ui-grid-ico-sort ui-icon-asc ui-state-disabled ui-icon ui-icon-triangle-1-n ui-sort-ltr"></span><span
                                                    sort="desc"
                                                    class="ui-grid-ico-sort ui-icon-desc ui-state-disabled ui-icon ui-icon-triangle-1-s ui-sort-ltr"></span></span>
                                            </div>
                                        </th>
                                        <th id="grid_goods" role="columnheader"
                                            class="ui-state-default ui-th-column ui-th-ltr" style="width: 318px;"><span
                                                class="ui-jqgrid-resize ui-jqgrid-resize-ltr"
                                                style="cursor: col-resize;">&nbsp;</span>
                                            <div id="jqgh_grid_goods" class="ui-jqgrid-sortable">商品<label> --
                                                扫描枪录入</label><span id="barCodeInsert" class="close"><span
                                                    class="ui-icon-circle"></span></span><span class="s-ico"
                                                                                               style="display:none"><span
                                                    sort="asc"
                                                    class="ui-grid-ico-sort ui-icon-asc ui-state-disabled ui-icon ui-icon-triangle-1-n ui-sort-ltr"></span><span
                                                    sort="desc"
                                                    class="ui-grid-ico-sort ui-icon-desc ui-state-disabled ui-icon ui-icon-triangle-1-s ui-sort-ltr"></span></span>
                                            </div>
                                        </th>
                                        <th id="grid_barCode" role="columnheader"
                                            class="ui-state-default ui-th-column ui-th-ltr"
                                            style="width: 120px; display: none;"><span
                                                class="ui-jqgrid-resize ui-jqgrid-resize-ltr"
                                                style="cursor: col-resize;">&nbsp;</span>
                                            <div id="jqgh_grid_barCode" class="ui-jqgrid-sortable">商品条码<span
                                                    class="s-ico" style="display:none"><span sort="asc"
                                                                                             class="ui-grid-ico-sort ui-icon-asc ui-state-disabled ui-icon ui-icon-triangle-1-n ui-sort-ltr"></span><span
                                                    sort="desc"
                                                    class="ui-grid-ico-sort ui-icon-desc ui-state-disabled ui-icon ui-icon-triangle-1-s ui-sort-ltr"></span></span>
                                            </div>
                                        </th>
                                        <th id="grid_skuId" role="columnheader"
                                            class="ui-state-default ui-th-column ui-th-ltr"
                                            style="width: 150px; display: none;"><span
                                                class="ui-jqgrid-resize ui-jqgrid-resize-ltr"
                                                style="cursor: col-resize;">&nbsp;</span>
                                            <div id="jqgh_grid_skuId" class="ui-jqgrid-sortable">属性ID<span class="s-ico"
                                                                                                           style="display:none"><span
                                                    sort="asc"
                                                    class="ui-grid-ico-sort ui-icon-asc ui-state-disabled ui-icon ui-icon-triangle-1-n ui-sort-ltr"></span><span
                                                    sort="desc"
                                                    class="ui-grid-ico-sort ui-icon-desc ui-state-disabled ui-icon ui-icon-triangle-1-s ui-sort-ltr"></span></span>
                                            </div>
                                        </th>
                                        <th id="grid_skuName" role="columnheader"
                                            class="ui-state-default ui-th-column ui-th-ltr" style="width: 100px;"><span
                                                class="ui-jqgrid-resize ui-jqgrid-resize-ltr"
                                                style="cursor: col-resize;">&nbsp;</span>
                                            <div id="jqgh_grid_skuName" class="ui-jqgrid-sortable">属性<span class="s-ico"
                                                                                                           style="display:none"><span
                                                    sort="asc"
                                                    class="ui-grid-ico-sort ui-icon-asc ui-state-disabled ui-icon ui-icon-triangle-1-n ui-sort-ltr"></span><span
                                                    sort="desc"
                                                    class="ui-grid-ico-sort ui-icon-desc ui-state-disabled ui-icon ui-icon-triangle-1-s ui-sort-ltr"></span></span>
                                            </div>
                                        </th>
                                        <th id="grid_mainUnit" role="columnheader"
                                            class="ui-state-default ui-th-column ui-th-ltr" style="width: 80px;"><span
                                                class="ui-jqgrid-resize ui-jqgrid-resize-ltr"
                                                style="cursor: col-resize;">&nbsp;</span>
                                            <div id="jqgh_grid_mainUnit" class="ui-jqgrid-sortable">单位<span
                                                    class="s-ico" style="display:none"><span sort="asc"
                                                                                             class="ui-grid-ico-sort ui-icon-asc ui-state-disabled ui-icon ui-icon-triangle-1-n ui-sort-ltr"></span><span
                                                    sort="desc"
                                                    class="ui-grid-ico-sort ui-icon-desc ui-state-disabled ui-icon ui-icon-triangle-1-s ui-sort-ltr"></span></span>
                                            </div>
                                        </th>
                                        <th id="grid_unitId" role="columnheader"
                                            class="ui-state-default ui-th-column ui-th-ltr"
                                            style="width: 150px; display: none;"><span
                                                class="ui-jqgrid-resize ui-jqgrid-resize-ltr"
                                                style="cursor: col-resize;">&nbsp;</span>
                                            <div id="jqgh_grid_unitId" class="ui-jqgrid-sortable">单位Id<span
                                                    class="s-ico" style="display:none"><span sort="asc"
                                                                                             class="ui-grid-ico-sort ui-icon-asc ui-state-disabled ui-icon ui-icon-triangle-1-n ui-sort-ltr"></span><span
                                                    sort="desc"
                                                    class="ui-grid-ico-sort ui-icon-desc ui-state-disabled ui-icon ui-icon-triangle-1-s ui-sort-ltr"></span></span>
                                            </div>
                                        </th>
                                        <th id="grid_batch" role="columnheader"
                                            class="ui-state-default ui-th-column ui-th-ltr"
                                            style="width: 90px; display: none;"><span
                                                class="ui-jqgrid-resize ui-jqgrid-resize-ltr"
                                                style="cursor: col-resize;">&nbsp;</span>
                                            <div id="jqgh_grid_batch" class="ui-jqgrid-sortable">批次<span class="s-ico"
                                                                                                         style="display:none"><span
                                                    sort="asc"
                                                    class="ui-grid-ico-sort ui-icon-asc ui-state-disabled ui-icon ui-icon-triangle-1-n ui-sort-ltr"></span><span
                                                    sort="desc"
                                                    class="ui-grid-ico-sort ui-icon-desc ui-state-disabled ui-icon ui-icon-triangle-1-s ui-sort-ltr"></span></span>
                                            </div>
                                        </th>
                                        <th id="grid_prodDate" role="columnheader"
                                            class="ui-state-default ui-th-column ui-th-ltr"
                                            style="width: 90px; display: none;"><span
                                                class="ui-jqgrid-resize ui-jqgrid-resize-ltr"
                                                style="cursor: col-resize;">&nbsp;</span>
                                            <div id="jqgh_grid_prodDate" class="ui-jqgrid-sortable">生产日期<span
                                                    class="s-ico" style="display:none"><span sort="asc"
                                                                                             class="ui-grid-ico-sort ui-icon-asc ui-state-disabled ui-icon ui-icon-triangle-1-n ui-sort-ltr"></span><span
                                                    sort="desc"
                                                    class="ui-grid-ico-sort ui-icon-desc ui-state-disabled ui-icon ui-icon-triangle-1-s ui-sort-ltr"></span></span>
                                            </div>
                                        </th>
                                        <th id="grid_safeDays" role="columnheader"
                                            class="ui-state-default ui-th-column ui-th-ltr"
                                            style="width: 90px; display: none;"><span
                                                class="ui-jqgrid-resize ui-jqgrid-resize-ltr"
                                                style="cursor: col-resize;">&nbsp;</span>
                                            <div id="jqgh_grid_safeDays" class="ui-jqgrid-sortable">保质期(天)<span
                                                    class="s-ico" style="display:none"><span sort="asc"
                                                                                             class="ui-grid-ico-sort ui-icon-asc ui-state-disabled ui-icon ui-icon-triangle-1-n ui-sort-ltr"></span><span
                                                    sort="desc"
                                                    class="ui-grid-ico-sort ui-icon-desc ui-state-disabled ui-icon ui-icon-triangle-1-s ui-sort-ltr"></span></span>
                                            </div>
                                        </th>
                                        <th id="grid_validDate" role="columnheader"
                                            class="ui-state-default ui-th-column ui-th-ltr"
                                            style="width: 90px; display: none;"><span
                                                class="ui-jqgrid-resize ui-jqgrid-resize-ltr"
                                                style="cursor: col-resize;">&nbsp;</span>
                                            <div id="jqgh_grid_validDate" class="ui-jqgrid-sortable">有效期至<span
                                                    class="s-ico" style="display:none"><span sort="asc"
                                                                                             class="ui-grid-ico-sort ui-icon-asc ui-state-disabled ui-icon ui-icon-triangle-1-n ui-sort-ltr"></span><span
                                                    sort="desc"
                                                    class="ui-grid-ico-sort ui-icon-desc ui-state-disabled ui-icon ui-icon-triangle-1-s ui-sort-ltr"></span></span>
                                            </div>
                                        </th>
                                        <th id="grid_producer" role="columnheader"
                                            class="ui-state-default ui-th-column ui-th-ltr"
                                            style="width: 90px; display: none;"><span
                                                class="ui-jqgrid-resize ui-jqgrid-resize-ltr"
                                                style="cursor: col-resize;">&nbsp;</span>
                                            <div id="jqgh_grid_producer" class="ui-jqgrid-sortable">产地<span
                                                    class="s-ico" style="display:none"><span sort="asc"
                                                                                             class="ui-grid-ico-sort ui-icon-asc ui-state-disabled ui-icon ui-icon-triangle-1-n ui-sort-ltr"></span><span
                                                    sort="desc"
                                                    class="ui-grid-ico-sort ui-icon-desc ui-state-disabled ui-icon ui-icon-triangle-1-s ui-sort-ltr"></span></span>
                                            </div>
                                        </th>
                                        <th id="grid_registrationNo" role="columnheader"
                                            class="ui-state-default ui-th-column ui-th-ltr"
                                            style="width: 90px; display: none;"><span
                                                class="ui-jqgrid-resize ui-jqgrid-resize-ltr"
                                                style="cursor: col-resize;">&nbsp;</span>
                                            <div id="jqgh_grid_registrationNo" class="ui-jqgrid-sortable">注册证号<span
                                                    class="s-ico" style="display:none"><span sort="asc"
                                                                                             class="ui-grid-ico-sort ui-icon-asc ui-state-disabled ui-icon ui-icon-triangle-1-n ui-sort-ltr"></span><span
                                                    sort="desc"
                                                    class="ui-grid-ico-sort ui-icon-desc ui-state-disabled ui-icon ui-icon-triangle-1-s ui-sort-ltr"></span></span>
                                            </div>
                                        </th>
                                        <th id="grid_proLicense" role="columnheader"
                                            class="ui-state-default ui-th-column ui-th-ltr"
                                            style="width: 90px; display: none;"><span
                                                class="ui-jqgrid-resize ui-jqgrid-resize-ltr"
                                                style="cursor: col-resize;">&nbsp;</span>
                                            <div id="jqgh_grid_proLicense" class="ui-jqgrid-sortable">生产许可证<span
                                                    class="s-ico" style="display:none"><span sort="asc"
                                                                                             class="ui-grid-ico-sort ui-icon-asc ui-state-disabled ui-icon ui-icon-triangle-1-n ui-sort-ltr"></span><span
                                                    sort="desc"
                                                    class="ui-grid-ico-sort ui-icon-desc ui-state-disabled ui-icon ui-icon-triangle-1-s ui-sort-ltr"></span></span>
                                            </div>
                                        </th>
                                        <th id="grid_qty" role="columnheader"
                                            class="ui-state-default ui-th-column ui-th-ltr" style="width: 80px;"><span
                                                class="ui-jqgrid-resize ui-jqgrid-resize-ltr"
                                                style="cursor: col-resize;">&nbsp;</span>
                                            <div id="jqgh_grid_qty" class="ui-jqgrid-sortable">数量<span class="s-ico"
                                                                                                       style="display:none"><span
                                                    sort="asc"
                                                    class="ui-grid-ico-sort ui-icon-asc ui-state-disabled ui-icon ui-icon-triangle-1-n ui-sort-ltr"></span><span
                                                    sort="desc"
                                                    class="ui-grid-ico-sort ui-icon-desc ui-state-disabled ui-icon ui-icon-triangle-1-s ui-sort-ltr"></span></span>
                                            </div>
                                        </th>
                                        <th id="grid_inventory" role="columnheader"
                                            class="ui-state-default ui-th-column ui-th-ltr" style="width: 20px;"><span
                                                class="ui-jqgrid-resize ui-jqgrid-resize-ltr"
                                                style="cursor: col-resize;">&nbsp;</span>
                                            <div id="jqgh_grid_inventory" class="ui-jqgrid-sortable"><span class="s-ico"
                                                                                                           style="display:none"><span
                                                    sort="asc"
                                                    class="ui-grid-ico-sort ui-icon-asc ui-state-disabled ui-icon ui-icon-triangle-1-n ui-sort-ltr"></span><span
                                                    sort="desc"
                                                    class="ui-grid-ico-sort ui-icon-desc ui-state-disabled ui-icon ui-icon-triangle-1-s ui-sort-ltr"></span></span>
                                            </div>
                                        </th>
                                        <th id="grid_outLocationName" role="columnheader"
                                            class="ui-state-default ui-th-column ui-th-ltr" style="width: 100px;"><span
                                                class="ui-jqgrid-resize ui-jqgrid-resize-ltr"
                                                style="cursor: col-resize;">&nbsp;</span>
                                        <th id="grid_description" role="columnheader"
                                            class="ui-state-default ui-th-column ui-th-ltr" style="width: 150px;"><span
                                                class="ui-jqgrid-resize ui-jqgrid-resize-ltr"
                                                style="cursor: col-resize;">&nbsp;</span>
                                            <div id="jqgh_grid_description" class="ui-jqgrid-sortable">备注<span
                                                    class="s-ico" style="display:none"><span sort="asc"
                                                                                             class="ui-grid-ico-sort ui-icon-asc ui-state-disabled ui-icon ui-icon-triangle-1-n ui-sort-ltr"></span><span
                                                    sort="desc"
                                                    class="ui-grid-ico-sort ui-icon-desc ui-state-disabled ui-icon ui-icon-triangle-1-s ui-sort-ltr"></span></span>
                                            </div>
                                        </th>
                                        <th id="grid_isSerNum" role="columnheader"
                                            class="ui-state-default ui-th-column ui-th-ltr"
                                            style="width: 150px; display: none;"><span
                                                class="ui-jqgrid-resize ui-jqgrid-resize-ltr"
                                                style="cursor: col-resize;">&nbsp;</span>
                                            <div id="jqgh_grid_isSerNum" class="ui-jqgrid-sortable">是否有序列号<span
                                                    class="s-ico" style="display:none"><span sort="asc"
                                                                                             class="ui-grid-ico-sort ui-icon-asc ui-state-disabled ui-icon ui-icon-triangle-1-n ui-sort-ltr"></span><span
                                                    sort="desc"
                                                    class="ui-grid-ico-sort ui-icon-desc ui-state-disabled ui-icon ui-icon-triangle-1-s ui-sort-ltr"></span></span>
                                            </div>
                                        </th>
                                    </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                        <div class="ui-jqgrid-bdiv" style="height: 100%; width: 1191px;">
                            <div style="position:relative;">
                                <div></div>
                                <table id="grid" tabindex="0" cellspacing="0" cellpadding="0" border="0" role="grid"
                                       aria-multiselectable="false" aria-labelledby="gbox_grid" class="ui-jqgrid-btable"
                                       style="width: 1023px;">
                                    <tbody>
                                    <tr class="jqgfirstrow" role="row" style="height:auto">
                                        <td role="gridcell" style="height:0px;width:25px;"></td>
                                        <td role="gridcell" style="height:0px;width:0px;"></td>
                                        <td role="gridcell" style="height:0px;width:318px;"></td>
                                        <td role="gridcell" style="height:0px;width:120px;display:none;"></td>
                                        <td role="gridcell" style="height:0px;width:150px;display:none;"></td>
                                        <td role="gridcell" style="height:0px;width:100px;"></td>
                                        <td role="gridcell" style="height:0px;width:80px;"></td>
                                        <td role="gridcell" style="height:0px;width:150px;display:none;"></td>
                                        <td role="gridcell" style="height:0px;width:90px;display:none;"></td>
                                        <td role="gridcell" style="height:0px;width:90px;display:none;"></td>
                                        <td role="gridcell" style="height:0px;width:90px;display:none;"></td>
                                        <td role="gridcell" style="height:0px;width:90px;display:none;"></td>
                                        <td role="gridcell" style="height:0px;width:90px;display:none;"></td>
                                        <td role="gridcell" style="height:0px;width:90px;display:none;"></td>
                                        <td role="gridcell" style="height:0px;width:90px;display:none;"></td>
                                        <td role="gridcell" style="height:0px;width:80px;"></td>
                                        <td role="gridcell" style="height:0px;width:20px;"></td>
                                        <td role="gridcell" style="height:0px;width:100px;"></td>
                                        <td role="gridcell" style="height:0px;width:100px;"></td>
                                        <td role="gridcell" style="height:0px;width:150px;"></td>
                                        <td role="gridcell" style="height:0px;width:150px;display:none;"></td>
                                    </tr>
                                    <tr role="row" id="1" tabindex="-1" class="ui-widget-content jqgrow ui-row-ltr selected-row">
                                        <td role="gridcell" class="ui-state-default jqgrid-rownum"
                                            style="text-align:center;width: 25px;" title="1" aria-describedby="grid_rn">
                                            1
                                        </td>
                                        <td role="gridcell" style="text-align:left;" title=""
                                            aria-describedby="grid_operating">
                                            <div class="eperatingCell" style="height: 44px;">
                                                <div class="operating" data-id="1"><span class="ui-icon ui-icon-plusAdd"
                                                                                         title="新增行"></span><span
                                                        class="ui-icon ui-icon-trashDel" title="删除行"></span></div>
                                            </div>
                                        </td>
                                        <td role="gridcell" style="" class="goods" title=""
                                            aria-describedby="grid_goods" tabindex="-1">&nbsp;
                                            <input type="text" class="textbox"
                                                   style="width: 285px;height:35px; border: none;text-align:center">
                                        </td>


                                        <td role="gridcell" style="" class="ui-ellipsis skuInfo" title=""
                                            aria-describedby="grid_skuName" tabindex="-1">&nbsp;
                                            <input type="text" class="textbox"
                                                   style="width: 90px;height:35px; border: none;text-align:center">
                                        </td>
                                        <td role="gridcell" style="" title="" aria-describedby="grid_mainUnit" class=""
                                            tabindex="-1">&nbsp;
                                            <input type="text" class="textbox"
                                                   style="width: 70px;height:35px; border: none;text-align:center">
                                        </td>


                                        <td role="gridcell" style="text-align:right;" class="right edit-cell ui-state-highlight" title="" aria-describedby="grid_qty" tabindex="-1">&nbsp;
                                            <input type="text" class="textbox"
                                                   style="width: 76px;height:35px; border: none;text-align:center">
                                        </td>
                                        <td role="gridcell" style="text-align:center;" title="" aria-describedby="grid_inventory">
                                            <a class="ui-icon-cart btn_query_inventory" style="display:none"></a></td>
                                        <td role="gridcell" style="" title="" aria-describedby="grid_outLocationName"
                                            class="" tabindex="-1">&nbsp;
                                            <input type="text" class="textbox"
                                                   style="width: 85px;height:35px; border: none;text-align:center">
                                        </td>
                                        <td role="gridcell" style="" title="" aria-describedby="grid_inLocationName"
                                            class="" tabindex="-1">&nbsp;
                                            <input type="text" class="textbox"
                                                   style="width: 85px;height:35px; border: none;text-align:center">
                                        </td>
                                        <td role="gridcell" style="" title="" aria-describedby="grid_description"
                                            class="" tabindex="-1">&nbsp;
                                            <input type="text" class="textbox"
                                                   style="width: 135px;height:35px; border: none;text-align:center">
                                        </td>
                                        <td role="gridcell" style="display:none;" title=""
                                            aria-describedby="grid_isSerNum">&nbsp;
                                        </td>
                                    </tr>
                                    <!--复制上面tr-->
                                    <tr role="row" id="2" tabindex="-1" class="ui-widget-content jqgrow ui-row-ltr selected-row">
                                        <td role="gridcell" class="ui-state-default jqgrid-rownum"
                                            style="text-align:center;width: 25px;" title="2" aria-describedby="grid_rn">
                                            2
                                        </td>
                                        <td role="gridcell" style="text-align:left;" title=""
                                            aria-describedby="grid_operating">
                                            <div class="eperatingCell" style="height: 44px;">
                                                <div class="operating" data-id="1">
                                                    <span class="ui-icon ui-icon-plusAdd" title="新增行"></span>
                                                    <span class="ui-icon ui-icon-trashDel" title="删除行"></span>
                                                </div>
                                            </div>
                                        </td>
                                        <td role="gridcell" style="" class="goods" title=""
                                            aria-describedby="grid_goods" tabindex="-1">&nbsp;
                                            <input type="text" class="textbox"
                                                   style="width: 285px;height:35px; border: none;text-align:center">
                                        </td>


                                        <td role="gridcell" style="" class="ui-ellipsis skuInfo" title=""
                                            aria-describedby="grid_skuName" tabindex="-1">&nbsp;
                                            <input type="text" class="textbox"
                                                   style="width: 90px;height:35px; border: none;text-align:center">
                                        </td>
                                        <td role="gridcell" style="" title="" aria-describedby="grid_mainUnit" class=""
                                            tabindex="-1">&nbsp;
                                            <input type="text" class="textbox"
                                                   style="width: 70px;height:35px; border: none;text-align:center">
                                        </td>


                                        <td role="gridcell" style="text-align:right;" class="right edit-cell ui-state-highlight" title="" aria-describedby="grid_qty" tabindex="-1">&nbsp;
                                            <input type="text" class="textbox"
                                                   style="width: 76px;height:35px; border: none;text-align:center">
                                        </td>
                                        <td role="gridcell" style="text-align:center;" title="" aria-describedby="grid_inventory">
                                            <a class="ui-icon-cart btn_query_inventory" style="display:none"></a></td>
                                        <td role="gridcell" style="" title="" aria-describedby="grid_outLocationName"
                                            class="" tabindex="-1">&nbsp;
                                            <input type="text" class="textbox"
                                                   style="width: 85px;height:35px; border: none;text-align:center">
                                        </td>
                                        <td role="gridcell" style="" title="" aria-describedby="grid_inLocationName"
                                            class="" tabindex="-1">&nbsp;
                                            <input type="text" class="textbox"
                                                   style="width: 85px;height:35px; border: none;text-align:center">
                                        </td>
                                        <td role="gridcell" style="" title="" aria-describedby="grid_description"
                                            class="" tabindex="-1">&nbsp;
                                            <input type="text" class="textbox"
                                                   style="width: 135px;height:35px; border: none;text-align:center">
                                        </td>
                                        <td role="gridcell" style="display:none;" title=""
                                            aria-describedby="grid_isSerNum">&nbsp;
                                        </td>
                                    </tr>
                                    <tr role="row" id="3" tabindex="-1" class="ui-widget-content jqgrow ui-row-ltr selected-row">
                                        <td role="gridcell" class="ui-state-default jqgrid-rownum"
                                            style="text-align:center;width: 25px;" title="3" aria-describedby="grid_rn">
                                            3
                                        </td>
                                        <td role="gridcell" style="text-align:left;" title=""
                                            aria-describedby="grid_operating">
                                            <div class="eperatingCell" style="height: 44px;">
                                                <div class="operating" data-id="1"><span class="ui-icon ui-icon-plusAdd"
                                                                                         title="新增行"></span><span
                                                        class="ui-icon ui-icon-trashDel" title="删除行"></span></div>
                                            </div>
                                        </td>
                                        <td role="gridcell" style="" class="goods" title=""
                                            aria-describedby="grid_goods" tabindex="-1">&nbsp;
                                            <input type="text" class="textbox"
                                                   style="width: 285px;height:35px; border: none;text-align:center">
                                        </td>


                                        <td role="gridcell" style="" class="ui-ellipsis skuInfo" title=""
                                            aria-describedby="grid_skuName" tabindex="-1">&nbsp;
                                            <input type="text" class="textbox"
                                                   style="width: 90px;height:35px; border: none;text-align:center">
                                        </td>
                                        <td role="gridcell" style="" title="" aria-describedby="grid_mainUnit" class=""
                                            tabindex="-1">&nbsp;
                                            <input type="text" class="textbox"
                                                   style="width: 70px;height:35px; border: none;text-align:center">
                                        </td>


                                        <td role="gridcell" style="text-align:right;" class="right edit-cell ui-state-highlight" title="" aria-describedby="grid_qty" tabindex="-1">&nbsp;
                                            <input type="text" class="textbox"
                                                   style="width: 76px;height:35px; border: none;text-align:center">
                                        </td>
                                        <td role="gridcell" style="text-align:center;" title="" aria-describedby="grid_inventory">
                                            <a class="ui-icon-cart btn_query_inventory" style="display:none"></a></td>
                                        <td role="gridcell" style="" title="" aria-describedby="grid_outLocationName"
                                            class="" tabindex="-1">&nbsp;
                                            <input type="text" class="textbox"
                                                   style="width: 85px;height:35px; border: none;text-align:center">
                                        </td>
                                        <td role="gridcell" style="" title="" aria-describedby="grid_inLocationName"
                                            class="" tabindex="-1">&nbsp;
                                            <input type="text" class="textbox"
                                                   style="width: 85px;height:35px; border: none;text-align:center">
                                        </td>
                                        <td role="gridcell" style="" title="" aria-describedby="grid_description"
                                            class="" tabindex="-1">&nbsp;
                                            <input type="text" class="textbox"
                                                   style="width: 135px;height:35px; border: none;text-align:center">
                                        </td>
                                        <td role="gridcell" style="display:none;" title=""
                                            aria-describedby="grid_isSerNum">&nbsp;
                                        </td>
                                    </tr>
                                    <tr role="row" id="4" tabindex="-1" class="ui-widget-content jqgrow ui-row-ltr selected-row">
                                        <td role="gridcell" class="ui-state-default jqgrid-rownum"
                                            style="text-align:center;width: 25px;" title="4" aria-describedby="grid_rn">
                                            4
                                        </td>
                                        <td role="gridcell" style="text-align:left;" title=""
                                            aria-describedby="grid_operating">
                                            <div class="eperatingCell" style="height: 44px;">
                                                <div class="operating" data-id="1"><span class="ui-icon ui-icon-plusAdd"
                                                                                         title="新增行"></span><span
                                                        class="ui-icon ui-icon-trashDel" title="删除行"></span></div>
                                            </div>
                                        </td>
                                        <td role="gridcell" style="" class="goods" title=""
                                            aria-describedby="grid_goods" tabindex="-1">&nbsp;
                                            <input type="text" class="textbox"
                                                   style="width: 285px;height:35px; border: none;text-align:center">
                                        </td>


                                        <td role="gridcell" style="" class="ui-ellipsis skuInfo" title=""
                                            aria-describedby="grid_skuName" tabindex="-1">&nbsp;
                                            <input type="text" class="textbox"
                                                   style="width: 90px;height:35px; border: none;text-align:center">
                                        </td>
                                        <td role="gridcell" style="" title="" aria-describedby="grid_mainUnit" class=""
                                            tabindex="-1">&nbsp;
                                            <input type="text" class="textbox"
                                                   style="width: 70px;height:35px; border: none;text-align:center">
                                        </td>


                                        <td role="gridcell" style="text-align:right;" class="right edit-cell ui-state-highlight" title="" aria-describedby="grid_qty" tabindex="-1">&nbsp;
                                            <input type="text" class="textbox"
                                                   style="width: 76px;height:35px; border: none;text-align:center">
                                        </td>
                                        <td role="gridcell" style="text-align:center;" title="" aria-describedby="grid_inventory">
                                            <a class="ui-icon-cart btn_query_inventory" style="display:none"></a></td>
                                        <td role="gridcell" style="" title="" aria-describedby="grid_outLocationName"
                                            class="" tabindex="-1">&nbsp;
                                            <input type="text" class="textbox"
                                                   style="width: 85px;height:35px; border: none;text-align:center">
                                        </td>
                                        <td role="gridcell" style="" title="" aria-describedby="grid_inLocationName"
                                            class="" tabindex="-1">&nbsp;
                                            <input type="text" class="textbox"
                                                   style="width: 85px;height:35px; border: none;text-align:center">
                                        </td>
                                        <td role="gridcell" style="" title="" aria-describedby="grid_description"
                                            class="" tabindex="-1">&nbsp;
                                            <input type="text" class="textbox"
                                                   style="width: 135px;height:35px; border: none;text-align:center">
                                        </td>
                                        <td role="gridcell" style="display:none;" title=""
                                            aria-describedby="grid_isSerNum">&nbsp;
                                        </td>
                                    </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="ui-jqgrid-sdiv" style="width: 1191px;">
                            <div class="ui-jqgrid-hbox">
                                <table role="grid" style="width:1023px" class="ui-jqgrid-ftable" cellspacing="0"
                                       cellpadding="0" border="0">
                                    <tbody>
                                    <tr role="row" class="ui-widget-content footrow footrow-ltr">
                                        <td role="gridcell" style="text-align:center;width: 25px;"
                                            aria-describedby="grid_rn" class="ui-state-default jqgrid-rownum">&nbsp;
                                            <input type="text" class="textbox"
                                                   style="width: 85px;height:35px; border: none;text-align:center">
                                        </td>
                                        <td role="gridcell" style="text-align:left;width: 0px;"
                                            aria-describedby="grid_operating">&nbsp;
                                        </td>
                                        <td role="gridcell" style="width: 318px;" class="goods"
                                            aria-describedby="grid_goods" title="合计：">合计：
                                        </td>
                                        <td role="gridcell" style="display:none;width: 120px;"
                                            aria-describedby="grid_barCode">&nbsp;
                                        </td>
                                        <td role="gridcell" style="display:none;width: 150px;"
                                            aria-describedby="grid_skuId">&nbsp;
                                        </td>
                                        <td role="gridcell" style="width: 100px;" class="ui-ellipsis skuInfo"
                                            aria-describedby="grid_skuName">&nbsp;
                                        </td>
                                        <td role="gridcell" style="width: 80px;" aria-describedby="grid_mainUnit">
                                            &nbsp;
                                        </td>
                                        <td role="gridcell" style="display:none;width: 150px;"
                                            aria-describedby="grid_unitId">&nbsp;
                                        </td>
                                        <td role="gridcell" style="text-align:left;display:none;width: 90px;"
                                            class="ui-ellipsis batch" aria-describedby="grid_batch">&nbsp;
                                        </td>
                                        <td role="gridcell" style="display:none;width: 90px;"
                                            aria-describedby="grid_prodDate">&nbsp;
                                        </td>
                                        <td role="gridcell" style="text-align:left;display:none;width: 90px;"
                                            aria-describedby="grid_safeDays">&nbsp;
                                        </td>
                                        <td role="gridcell" style="text-align:left;display:none;width: 90px;"
                                            aria-describedby="grid_validDate">&nbsp;
                                        </td>
                                        <td role="gridcell" style="text-align:left;display:none;width: 90px;"
                                            aria-describedby="grid_producer">&nbsp;
                                        </td>
                                        <td role="gridcell" style="text-align:left;display:none;width: 90px;"
                                            aria-describedby="grid_registrationNo">&nbsp;
                                        </td>
                                        <td role="gridcell" style="text-align:left;display:none;width: 90px;"
                                            aria-describedby="grid_proLicense">&nbsp;
                                        </td>
                                        <td role="gridcell" style="text-align:right;width: 80px;" class="right"
                                            aria-describedby="grid_qty" title="">&nbsp;
                                        </td>
                                        <td role="gridcell" style="text-align:center;width: 20px;"
                                            aria-describedby="grid_inventory">&nbsp;
                                        </td>
                                        <td role="gridcell" style="width: 100px;"
                                            aria-describedby="grid_outLocationName">&nbsp;
                                        </td>
                                        <td role="gridcell" style="width: 100px;"
                                            aria-describedby="grid_inLocationName">&nbsp;
                                        </td>
                                        <td role="gridcell" style="width: 150px;" aria-describedby="grid_description">
                                            &nbsp;
                                        </td>
                                        <td role="gridcell" style="display:none;width: 150px;"
                                            aria-describedby="grid_isSerNum">&nbsp;
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="ui-jqgrid-resize-mark" id="rs_mgrid">&nbsp;</div>
                </div>
                <div id="page"></div>
            </div>
            <div class="cf" id="bottomField">
                <div class="fr" id="toolBottom"><span id="groupBtn"><a id="savaAndAdd"
                                                                       class="ui-btn ui-btn-sp">保存并新增</a><a id="save"
                                                                                                            class="ui-btn">保存</a></span>
                </div>
            </div>
            <div id="mark"></div>
        </div>
        <div class="con-footer cf">
            <div class="mb10">
                <textarea type="text" id="note" class="ui-input ui-input-ph">暂无备注信息</textarea>
            </div>
            <ul id="amountArea" class="cf">
                <li>
                    <label>优惠率:</label>
                    <input type="text" id="discountRate" class="ui-input" data-ref="deduction">%
                </li>
                <li>
                    <label>优惠金额:</label>
                    <input type="text" id="deduction" class="ui-input" data-ref="payment">
                </li>
                <li>
                    <label>优惠后金额:</label>
                    <input type="text" id="discount" class="ui-input ui-input-dis" data-ref="discountRate" disabled="">
                </li>
            </ul>
            <ul class="dn">
                <li>
                    <label id="paymentTxt">本次收款:</label>
                    <input type="text" id="payment" class="ui-input"> 
                </li>
                <li id="accountWrap" class="dn" style="display: list-item;">
                    <label>结算账户:</label>
                    <span class="ui-combo-wrap" id="account" style="padding: 0px; width: 110px;">

          <input type="text" class="input-txt" autocomplete="off" style="width: 84px;"><i class="trigger"></i></span><a
                        id="accountInfo" class="ui-icon ui-icon-folder-open" style="display:none;"></a>
                </li>
                <li>
                    <label>本次欠款:</label>
                    <input type="text" id="arrears" class="ui-input ui-input-dis" disabled="">
                </li>
                <li>
                    <label>累计欠款:</label>
                    <input type="text" id="totalArrears" class="ui-input ui-input-dis" disabled="">
                </li>
            </ul>

            <div class="cf fr">
                <a href="http://vip2-gd.youshang.com/scm/invSo.do?action=initSo&amp;beginDate=2017-11-01&amp;endDate=2017-11-21#"
                   class="linkToCheck ui-btn-bill ui-btn-add mr20">历史单据</a>
                <a href="http://vip2-gd.youshang.com/scm/invSo.do?action=initSo&amp;beginDate=2017-11-01&amp;endDate=2017-11-21#"
                   id="operaLog" class="ui-btn">操作日志</a>
            </div>
        </div>
        <div id="initCombo" class="dn">

            <input type="text" class="textbox storageAuto" name="storage" autocomplete="off">
            <input type="text" class="textbox unitAuto" name="unit" autocomplete="off">
            <input type="text" class="textbox priceAuto" name="price" autocomplete="off">
            <input type="text" class="textbox skuAuto" name="price" autocomplete="off">
        </div>
        <div id="storageBox" class="shadow target_box dn">
            <ul>
                <li data-id="129609203891259700" data-name="默认仓库">CK001 默认仓库</li>
            </ul>
        </div>
        <div id="discountRateBox" class="shadow target_box dn"><p>批量填充折扣率</p>
            <p><input type="text" style="width:100px;">% &nbsp;&nbsp;&nbsp;&nbsp;<input type="button" value="确定"
                                                                                        style="float:right"></p></div>
        <div id="goodsDiscountRateBox" class="shadow target_box dn"><p>批量填充商品折扣</p>
            <p><input type="text" style="width:100px;">折&nbsp;&nbsp;&nbsp;&nbsp;<input type="button" value="确定"
                                                                                       style="float:right"></p></div>
        <div id="deductionBox" class="shadow target_box dn"><p>输入折扣额,将会自动分摊到每个商品</p>
            <p><input type="text" style="width:100px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input
                    type="button" value="确定" style="float:right"></p></div>
        <ul id="operaLogBox" class="shadow opera-log-box dn">
            <li>
                <span class="fl" style="margin-right: 50px;"><label>制单人：</label><span id="userName"
                                                                                      style="margin-left: 12px;">郭旭</span></span>
            </li>
            <li>
                <span class="fl" style="display: none;"><label>制单时间：</label><span id="createTime"></span></span>
            </li>
            <li>
                <span class="fl" style="display: none;"><label>审核人：</label><span id="checkName"
                                                                                 style="margin-left: 12px;"></span></span>
            </li>
            <li>
                <span class="fl" style="display: none;"><label>审核时间：</label><span id="checkTime"></span></span>
            </li>
            <li>
                <span class="fl" style="display: none;"><label>最后修改人：</label><span id="modifyName"
                                                                                   style="margin-left: 12px;"></span></span>
            </li>
            <li>
                <span class="fl" style="display: none;"><label>最后修改时间：</label><span id="modifyTime"></span></span>
            </li>
        </ul>
    </div>
</div>

<div id="COMBO_WRAP">
    <div class="ui-droplist-wrap" style="position: absolute; top: 0px; z-index: 1000; width: 118px; display: none;">
        <div class="droplist" style="position: relative; overflow: auto; height: 26px;">
            <div class="list-item" data-value="0">(空)</div>
        </div>
        <div class="extra-list-ctn"><a href="javascript:void(0);" id="quickAddSales" class="quick-add-link"><i
                class="ui-icon-add"></i>新增职员</a></div>
    </div>
    <div class="ui-droplist-wrap" style="display: none; position: absolute; top: 0px; z-index: 1000;">
        <div class="droplist" style="position: relative; overflow: auto;"></div>
        <div class="extra-list-ctn"><a href="javascript:void(0);" id="quickAddCustomer" class="quick-add-link"><i
                class="ui-icon-add"></i>新增客户</a></div>
    </div>
    <div class="ui-droplist-wrap" style="position: absolute; top: 0px; z-index: 1000; width: 110px; display: none;">
        <div class="droplist" style="position: relative; overflow: auto; height: 102px;">
            <div class="list-item" data-value="0">(空)</div>
            <div class="list-item" data-value="-1">多账户</div>
            <div class="list-item" data-value="129609203891259698">1001 现金</div>
            <div class="list-item" data-value="129609203891259699">1002 银行存款</div>
        </div>
    </div>
    <div class="ui-droplist-wrap" style="display: none; position: absolute; top: 0px; z-index: 1000; border: 0px;">
        <div class="droplist"
             style="position: relative; height: 300px; overflow: auto; width: 861px; border: 1px solid rgb(204, 204, 204);"></div>
        <div class="extra-list-ctn"
             style="width: 856px; border-top: none; border-right: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); border-left: 1px solid rgb(204, 204, 204); border-image: initial;">
            <a href="javascript:void(0);" class="quick-add-link quickAddGoods"><i class="ui-icon-add"></i>新增商品</a></div>
    </div>
    <div class="ui-droplist-wrap" style="position: absolute; top: 0px; z-index: 1000; width: 2px; display: none;">
        <div class="droplist" style="position: relative; overflow: auto; height: 28px;">
            <div class="tips">没有匹配的选项</div>
        </div>
        <div class="extra-list-ctn"><a href="javascript:void(0);" id="quickAddSku" class="quick-add-link quickAddSku"><i
                class="ui-icon-add"></i>新增辅助属性</a></div>
    </div>
    <div class="ui-droplist-wrap" style="position: absolute; top: 0px; z-index: 1000; width: 2px; display: none;">
        <div class="droplist" style="position: relative; overflow: auto; height: 26px;">
            <div class="list-item" data-value="129609203891259700">默认仓库</div>
        </div>
    </div>
    <div class="ui-droplist-wrap" style="display: none; position: absolute; top: 0px; z-index: 1000;">
        <div class="droplist" style="position: relative; overflow: auto;"></div>
    </div>
    <div class="ui-droplist-wrap" style="display: none; position: absolute; top: 0px; z-index: 1000;">
        <div class="droplist" style="position: relative; overflow: auto;"></div>
    </div>
</div>
<div class="pika-single is-hidden is-bound" style=""></div>
<div class="pika-single is-hidden is-bound" style=""></div>
<div style="position: absolute; left: -9999em; top: 208px; visibility: visible; width: auto; z-index: 1976;">
    <table class="ui_border ui_state_visible ui_state_focus">
        <tbody>
        <tr>
            <td class="ui_lt"></td>
            <td class="ui_t"></td>
            <td class="ui_rt"></td>
        </tr>
        <tr>
            <td class="ui_l"></td>
            <td class="ui_c">
                <div class="ui_inner">
                    <table class="ui_dialog">
                        <tbody>
                        <tr>
                            <td colspan="2">
                                <div class="ui_title_bar">
                                    <div class="ui_title" unselectable="on" style="cursor: move;">视窗</div>
                                    <div class="ui_title_buttons"><a class="ui_min" href="javascript:void(0);"
                                                                     title="最小化" style="display: none;"><b
                                            class="ui_min_b"></b></a><a class="ui_max" href="javascript:void(0);"
                                                                        title="最大化" style="display: none;"><b
                                            class="ui_max_b"></b></a><a class="ui_res" href="javascript:void(0);"
                                                                        title="还原"><b class="ui_res_b"></b><b
                                            class="ui_res_t"></b></a><a class="ui_close" href="javascript:void(0);"
                                                                        title="关闭(esc键)" style="display: inline-block;">×</a>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="ui_icon" style="display: none;"></td>
                            <td class="ui_main" style="width: auto; height: auto;">
                                <div class="ui_content" style="padding: 10px;">
                                    <div class="ui_loading"><span>loading...</span></div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <div class="ui_buttons" style="display: none;"></div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </td>
            <td class="ui_r"></td>
        </tr>
        <tr>
            <td class="ui_lb"></td>
            <td class="ui_b"></td>
            <td class="ui_rb" style="cursor: auto;"></td>
        </tr>
        </tbody>
    </table>
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
