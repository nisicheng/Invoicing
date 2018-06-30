<%--商品收发汇总
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2017-12-07
  Time: 10:17
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

    <link href="../../css/ui.min.css" rel="stylesheet">
    <script type="text/javascript" async="" src="../../js/vds.js"></script>
    <script src="../../js/jquery-1.10.2.min.js"></script>
    <script src="../../js/json3.min.js"></script>
    <script src="../../js/vue.js"></script>
    <script src="../../js/common.js"></script>
    <script src="../../js/grid.js"></script>
    <script src="../../js/plugins.js"></script>
    <script src="../../js/jquery.dialog.js"></script>
    <script type="text/javascript">
        var _vds = _vds || [];
        window._vds = _vds;
        (function () {
            _vds.push(['setAccountId', '9bc3c61326fa7ba9']);
            (function () {
                var vds = document.createElement('script');
                vds.type = 'text/javascript';
                vds.async = true;
                vds.src = 'https://dn-growing.qbox.me/vds.js';
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(vds, s);
            })();
        })();
    </script>

    <script type="text/javascript">
        var DOMAIN = document.domain;
        var WDURL = "";
        var SCHEME = "blue";
        try {
            var host = window.location.host;
            var domainDot = host.indexOf('.');
            var domain = host.substring(domainDot + 1, host.length);
            document.domain = domain;
        } catch (e) {
        }
        //ctrl+F5 增加版本号来清空iframe的缓存的
        $(document).keydown(function (event) {
            /* Act on the event */
            if (event.keyCode === 116 && event.ctrlKey) {
                var defaultPage = Public.getDefaultPage();
                var href = defaultPage.location.href.split('?')[0] + '?';
                var params = Public.urlParam();
                params['version'] = Date.parse((new Date()));
                for (i in params) {
                    if (i && typeof i != 'function') {
                        href += i + '=' + params[i] + '&';
                    }
                }
                defaultPage.location.href = href;
                event.preventDefault();
            }
        });
    </script>

    <link rel="stylesheet" href="../../css/report.css">
    <style type="text/css">
        .filter-menu .mod-choose-input {
            position: relative;
            *zoom: 1;
        }

        .filter-menu .mod-choose-input .ui-input {
            padding-right: 25px;
            width: 226px;
            font-family: "宋体";
        }

        .filter-menu .ui-datepicker-input {
            width: 105px;
            font-family: "宋体";
        }

        .ui-icon-ellipsis {
            right: 3px;
        }

        .ul-inline li {
            position: relative;
        }

        #goodsAuto {
            width: 200px;
        }

        .no-query {
            background: url("/css/img/no_query.png") no-repeat scroll 100px 60px #fff;
            background-position: center;
            border: 1px solid #ddd;
            border-top: none;
            height: 402px;
            margin-right: 0;
        }

        #chk-wrap {
            line-height: 30px;
        }
    </style>
</head>
<body style="">
<div class="wrapper">
    <div class="mod-search cf" id="report-search">
        <div class="l" id="filter-menu">
            <ul class="ul-inline fix" id="filterItems">
                <li id="filter-billDate"><label>开票日期:</label><input type="text" value=""
                                                                    class="ui-input ui-datepicker-input"
                                                                    name="filter-billFromDate" id="filter-billFromDate"
                                                                    maxlength="10"><span class="todate"> 至 </span><input
                        type="text" value="" class="ui-input ui-datepicker-input" name="filter-billToDate"
                        id="filter-billToDate" maxlength="10"></li>
                <li id="date" style="display: list-item;"><label>单据日期:</label><input type="text" value=""
                                                                                     class="ui-input ui-datepicker-input"
                                                                                     name="filter-fromDate"
                                                                                     id="filter-fromDate"
                                                                                     maxlength="10"><span
                        class="todate"> 至 </span><input type="text" value="" class="ui-input ui-datepicker-input"
                                                        name="filter-toDate" id="filter-toDate" maxlength="10"></li>
                <li id="billsNo"><label>单据编号:</label><input type="text" class="ui-input ui-input-ph" id="billsNoAuto">
                </li>
                <li id="sale-rank-filter"><span id="sale-rank-catorage"></span></li>
                <li id="customer"><label>客户:</label><span class="mod-choose-input" id="filter-customer"><input
                        type="text" class="ui-input" id="customerAuto"><span class="ui-icon-ellipsis"></span></span>
                </li>
                <li id="supplier"><label>供应商:</label><span class="mod-choose-input" id="filter-supplier"><input
                        type="text" class="ui-input" id="supplierAuto"><span class="ui-icon-ellipsis"></span></span>
                </li>
                <li id="storage" style="display: list-item;"><label>仓库:</label><span class="mod-choose-input"
                                                                                     id="filter-storage"><input
                        type="text" class="ui-input" id="storageAuto" autocomplete="off"><span
                        class="ui-icon-ellipsis"></span></span></li>
                <li id="goods" style="display: list-item;"><label>商品:</label><span class="mod-choose-input"
                                                                                   id="filter-goods"><input type="text"
                                                                                                            class="ui-input"
                                                                                                            id="goodsAuto"
                                                                                                            autocomplete="off"><span
                        class="ui-icon-ellipsis"></span></span></li>
                <li id="sales"><label>销售人员:</label><span class="mod-choose-input" id="filter-saler"><input type="text"
                                                                                                           class="ui-input"
                                                                                                           id="salerAuto"><span
                        class="ui-icon-ellipsis"></span></span></li>
                <li id="remarks"><label>备注(分录):</label><input type="text" value="请输入备注查询" class="ui-input ui-input-ph"
                                                              name="remarkCon" id="remarkCon"></li>
                <li id="billNum"><label>订单号/单据编号:</label><input type="text" value="请输入单号查询" style="width:115px;"
                                                                class="ui-input ui-input-ph" name="matchCon"
                                                                id="matchCon"></li>
                <li id="bill_no"><label>发票号:</label><input type="text" class="ui-input ui-input-ph" id="billNoAuto">
                </li>
                <li id="bill_title"><label>发票抬头:</label><input type="text" class="ui-input ui-input-ph"
                                                               id="billTitleAuto"></li>
                <li id="filter"><label>客户/供应商类别:</label><span id="catorage"></span></li>
                <li id="goodsfilter" style="display: list-item;"><label>商品类别:</label><span class="ui-tree-wrap"
                                                                                           style="width:145px"><input
                        type="text" class="input-txt" style="width:119px" id="filterCat" autocomplete="off"
                        placeholder="类别" value=""><span class="trigger"></span></span></li>
                <li class="chk-list" id="chk-stock"><span class="chk"><input type="checkbox" value="profit"
                                                                             name="showSto">零库存商品</span></li>
                <li id="deliveryDate"><label>预计交货日:</label><input type="text" value=""
                                                                  class="ui-input ui-datepicker-input"
                                                                  name="filter-fromDeliveryDate"
                                                                  id="filter-fromDeliveryDate" maxlength="10"><span
                        class="todate"> 至 </span><input type="text" value="" class="ui-input ui-datepicker-input"
                                                        name="filter-toDeliveryDate" id="filter-toDeliveryDate"
                                                        maxlength="10"></li>
                <li id="account"><label>结算账户:</label><span class="mod-choose-input" id="filter-settlementAccount"><input
                        type="text" class="ui-input" id="settlementAccountAuto"><span
                        class="ui-icon-ellipsis"></span></span></li>
                <li id="buName"><label>往来单位:</label><span class="mod-choose-input" id="filter-buName"><input type="text"
                                                                                                             class="ui-input"
                                                                                                             id="buName"><span
                        class="ui-icon-ellipsis"></span></span></li>
                <li id="payerAndPayee"><label>收/付款人:</label><span class="mod-choose-input"
                                                                  id="filter-payerAndPayee"><input type="text"
                                                                                                   class="ui-input"
                                                                                                   id="payerAndPayee"><span
                        class="ui-icon-ellipsis"></span></span></li>
                <li id="saleCustomer"><label>销货单位/购货单位:</label><span class="ui-combo-wrap" id="customerSale"><input
                        type="text" name="" class="input-txt" autocomplete="off" value="" data-ref="date"><i
                        class="ui-icon-ellipsis"></i></span></li>
                <li id="serial"><label>序列号:</label><span class="mod-choose-input"><input type="text" class="ui-input"
                                                                                         id="serNumAuto"
                                                                                         autocomplete="off"><span
                        class="ui-icon-ellipsis"></span></span></li>
                <li class="chk-list" id="profit-wrap"><span class="chk"><input type="checkbox" value="warehouse"
                                                                               name="warehouse" id="warehouse">在库</span><span
                        class="chk"><input type="checkbox" value="outbound" name="outbound"
                                           id="outbound">已出库</span><span class="chk"><input type="checkbox"
                                                                                            value="isCheck"
                                                                                            name="isCheck" id="isCheck">查询未审核单据</span>
                </li>
                <li id="status-wrap"><label>状态:</label><span class="chk"><input type="checkbox" value="0" name="status"><i>未入库</i></span><span
                        class="chk"><input type="checkbox" value="1" name="status"><i>部分入库</i></span><span
                        class="chk"><input type="checkbox" value="2" name="status"><i>已入库</i></span></li>
                <li id="match"><span class="chk" title="是否显示商品明细"><input type="checkbox" name="match">是否显示商品明细</span>
                </li>
                <li id="chk-realQty"><span class="chk" title="显示可用库存"><input type="checkbox"
                                                                             name="showRealQty">显示可用库存</span></li>
                <li class="chk-list" id="chk-blank"><span class="chk"><input type="checkbox" value="profit"
                                                                             name="showBlank"><i>不显示无欠款客户/不显示无欠款供应商/不显示已收款商品明细</i></span>
                </li>
                <li class="chk-list" id="chk-wrap" style="display: none;"><span class="chk"><input type="checkbox"
                                                                                                   value="profit"
                                                                                                   name="profit"><i>计算毛利</i></span><span
                        class="chk"><input type="checkbox" value="showSku" name="showSku"><i>显示辅助属性</i></span></li>
                <li id="classes"><label class="radio"><input type="radio" name="classes" value="150601">销货</label><label
                        class="radio"><input type="radio" name="classes" value="150602">退货</label></li>
                <li id="billType"><label class="radio"><input type="radio" name="billType" value="0">已全部开票</label><label
                        class="radio checked"><input type="radio" name="billType" value="1" checked="">未全部开票</label>
                </li>
                <li class="chk-list" id="chk-ischecked" style="display: list-item;"><span class="chk"><input
                        type="checkbox" value="ischecked" name="ischecked">无发生额不显示</span></li>
                <li id="othertype1">
                    <div id="incomeExpenseType"></div>
                </li>
                <li id="othertype2">
                    <div id="incomeName" class="dn"></div>
                </li>
                <li id="othertype3">
                    <div id="expenseName" class="dn"></div>
                </li>
                <div class="btns"><a class="ui-btn mrb ui-btn-search" id="filter-submit">查询</a></div>
            </ul>
            <a href="http://vip2-gd.youshang.com/report/goods-flow-summary.jsp?beginDate=2017-11-01&amp;endDate=2017-11-21#"
               id="conditions-trigger" class="ui-btn conditions-trigger" tabindex="-1" style="display: none;">&nbsp;更多条件<b></b></a>
        </div>
    </div>
    <div class="no-query"></div>
    <!-- grid begin -->
    <div class="ui-print" style="display: none;">
        <!-- 列配置 -->
        <div class="cf box-flex">
            <div class="flex">
                <span id="config" class="ui-config"><a
                        href="http://vip2-gd.youshang.com/report/goods-flow-summary.jsp?beginDate=2017-11-01&amp;endDate=2017-11-21#"
                        class="ui-icon-config-new"></a>列设置</span>
            </div>
            <div class="grid-title flex">商品收发汇总表</div>
            <div class="fr">
                <a href="http://vip2-gd.youshang.com/report/goods-flow-summary.jsp?beginDate=2017-11-01&amp;endDate=2017-11-21#"
                   class="ui-btn ui-btn-export btn-sm mrb fl" id="btn-export">导出</a>
                <a href="http://vip2-gd.youshang.com/report/goods-flow-summary.jsp?beginDate=2017-11-01&amp;endDate=2017-11-21#"
                   class="ui-btn ui-btn-print btn-sm fl" id="btn-print" style="display: none;">打印</a>
            </div>
        </div>
        <div class="grid-wrap" id="grid-wrap">
            <!-- <div class="grid-title">商品收发汇总表</div> -->
            <div class="grid-subtitle">2017-11-01至2017-11-21</div>
            <table id="grid"></table>
        </div>
    </div>
    <!-- grid end -->
</div>
<script src="../../js/judgment/goodsFlowSummary.js"></script>

<div id="COMBO_WRAP">
    <div class="ui-droplist-wrap" style="display: none; position: absolute; top: 0px; z-index: 1000;">
        <div class="droplist" style="position: relative; overflow: auto;"></div>
    </div>
    <div class="ui-droplist-wrap" style="position: absolute; top: 0px; z-index: 1000; width: 175px; display: none;">
        <div class="droplist" style="position: relative; overflow: auto; height: 26px;">
            <div class="list-item" data-value="129609203891259700">CK001 默认仓库</div>
        </div>
    </div>
</div>
<div class="pika-single is-hidden is-bound" style=""></div>
<div class="pika-single is-hidden is-bound" style=""></div>
<ul id="tree5579" class="ztree ztreeCombo showRoot" style="top: 143px; left: 524px; width: 250px;">
    <li id="tree5579_1" class="level0" tabindex="0" hidefocus="true" treenode=""><span id="tree5579_1_switch" title=""
                                                                                       class="button level0 switch root_docu"
                                                                                       treenode_switch=""></span><a
            id="tree5579_1_a" class="level0" treenode_a="" onclick="" target="_blank" style=""><span id="tree5579_1_ico"
                                                                                                     title=""
                                                                                                     treenode_ico=""
                                                                                                     class="button ico_docu"
                                                                                                     style=""></span><span
            id="tree5579_1_span">全部</span></a></li>
</ul>
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
</body>
</html>
