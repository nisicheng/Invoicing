

var Public = Public || {};
var Business = Business || {};
Public.isIE6 = !window.XMLHttpRequest;  //ie6

$(function(){
  var defaultPage = Public.getDefaultPage();

  /**
  * 在for循环里执行iframe的大数据的调用，会造成卡顿，所以用定义变量的方式去用for循环
  **/ 
  window.SYSTEM = defaultPage.SYSTEM;
  //菜单按钮
  $('.ui-btn-menu .menu-btn').on('mouseenter.menuEvent',function(e){
    if($(this).hasClass("ui-btn-dis")) {
      return false;
    }
    $(this).parent().addClass('ui-btn-menu-cur');
    $(this).blur();
    e.preventDefault();
  });
  $(document).on('click.menu',function(e){
    var target  = e.target || e.srcElement;
    $('.ui-btn-menu').each(function(){
      var menu = $(this);
      if($(target).closest(menu).length == 0 && $('.con',menu).is(':visible')){
         menu.removeClass('ui-btn-menu-cur');
      }
    })

  });

  // 增加行分录
  $('.grid-wrap').on('click', '.ui-icon-plus,.ui-icon-plusAdd', function(e){
    var rowId = $(this).parent().data('id');
    var newId = $('#grid tbody tr').length;
    var datarow = { id: THISPAGE.newId };
    var su = $("#grid").jqGrid('addRowData', THISPAGE.newId, datarow, 'before', rowId);
    if(su) {
      $(this).parents('td').removeAttr('class');
      $(this).parents('tr').removeClass('selected-row ui-state-hover');
      $("#grid").jqGrid('resetSelection');
      THISPAGE.newId++;
    }
  });

  // 删除行分录
  $('.grid-wrap').on('click', '.ui-icon-trashDel', function(e){
    if($('#grid tbody tr').length === 2) {
      parent.Public.tips({type: 2, content: '至少保留一条分录！'});
      return false;
    }
    var rowId = $(this).parent().data('id');
    var su = $("#grid").jqGrid('delRowData', rowId);
  });

  // 非组装单F7选择客户供应商
  $('#customer,#supplier').on('click', '.ui-icon-ellipsis', function(e){
    e.preventDefault();
    var $this = $(this);
    if ($(this).data('special')) {
      return;
    }
    var skey = $(this).data('skey');
    var lable = $(this).parent().prev().text().slice(0, -1);
    lable = lable.indexOf('供应商') !== -1 ? '供应商' : lable;
    lable = lable.indexOf('购货单位') !== -1 ? '购货单位' : lable;
    lable = lable.indexOf('客户') !== -1 ? '客户' : lable;
    lable = lable.indexOf('销货单位') !== -1 ? '销货单位' : lable;
    var title = '选择' + lable;
    if(lable === '供应商' || lable === '购货单位') {
      var content = 'url:/settings/select-customer.jsp?type=10';
    } else {
      var content = 'url:/settings/select-customer.jsp';
    }
    $.dialog({
      width: 775,
      height: 510,
      title: title,
      content: content,
      data: {
        skey : skey,
        curObj : $this.parent()
      },
      lock: true,
      ok: function(){
        if(typeof this.content.callback === 'function'){
          this.content.callback();
          this.close();
        }
        return false;
      },
      cancel: function(){
        return true;
      }
    });
  });

  //enter
    $('body').on('keyup','#matchCon',function(e) {
     // 兼容FF和IE和Opera    
    var theEvent = e || window.event;    
    var code = theEvent.keyCode || theEvent.which || theEvent.charCode;    
    if (code == 13) {    
      $('#search').click();
        }
    });
    
    setTimeout(function(){$('.ui-icon-config').html("列设置").removeClass("ui-icon");}, 10);
    setTimeout(function(){$('.ui-icon-expenseTips').append('<span class="ui-icon-config">列设置</span><span class="ui-icon-expense"><span style="color:red">√</span>表示这笔费用已分摊入商品购货成本</span>').removeClass("ui-icon");}, 10);

});

//设置表格宽高
Public.setGrid = function(adjustH, adjustW){
  var defaultPage = Public.getDefaultPage();
  if(defaultPage.SYSTEM.skin === 'green'){
    var adjustH = adjustH || 70;
  } else {
    var adjustH = adjustH || 65;
  };
  var adjustW = adjustW || 20;
  var gridW = $(window).width() - adjustW, gridH = $(window).height() - $(".grid-wrap").offset().top - adjustH;
  return {
    w : gridW,
    h : gridH
  }
};
//重设表格宽高
Public.resizeGrid = function(adjustH, adjustW){
  var grid = $("#grid");
  var gridWH = Public.setGrid(adjustH, adjustW);
  grid.jqGrid('setGridHeight', gridWH.h);
  grid.jqGrid('setGridWidth', gridWH.w);
};
//表格宽度自适应
Public.autoGrid = function($grid){
  $grid.jqGrid('setGridWidth', $grid.closest('.grid-wrap').innerWidth() -2 );//去掉border的宽度
}
//自定义报表宽高初始化以及自适应
Public.initCustomGrid = function(tableObj){
  //去除报表原始定义的宽度
  $(tableObj).css("width") && $(tableObj).attr("width","auto");
  //获取报表宽度当做最小宽度
  var _minWidth = $(tableObj).outerWidth();
  $(tableObj).css("min-width",_minWidth+"px");
  //获取当前window对象的宽度作为报表原始的宽度
  $(tableObj).width($(window).width() - 74);
  $(tableObj).closest('.mod-report').height($(window).height() - 66);
  //设置resize事件
  var _throttle = function(method,context){
    clearTimeout(method.tid);
    method.tid = setTimeout(function(){
      method.call(context);
    },100)
  };
  var _resize = function(){
    $(tableObj).width($(window).width() - 74);
    $(tableObj).closest('.mod-report').height($(window).height() - 66);
  };
  $(window).resize(function() {
    _throttle(_resize);
  });
}
/**
 * 节点赋100%高度
 *
 * @param {object} obj 赋高的对象
*/
Public.setAutoHeight = function(obj){
  if(!obj || obj.length < 1){
    return ;
}

Public._setAutoHeight(obj);
  $(window).bind('resize', function(){
    Public._setAutoHeight(obj);
  });
}

Public._setAutoHeight = function(obj){
  obj = $(obj);
  //parent = parent || window;
  var winH = $(window).height();
  var h = winH - obj.offset().top - (obj.outerHeight() - obj.height());
  obj.height(h);
}
//操作项格式化，适用于有“修改、删除”操作的表格
Public.operFmatter = function (val, opt, row) {
  var html_con = '<div class="operating" data-id="' + row.id + '"><span class="ui-icon ui-icon-pencil" title="修改"></span><span class="ui-icon ui-icon-trash" title="删除"></span></div>';
  return html_con;
};

Public.billsOper = function (val, opt, row) {
  var html_con = '<div class="operating" data-id="' + opt.rowId + '"><span class="ui-icon ui-icon-plus" title="新增行"></span><span class="ui-icon ui-icon-trash" title="删除行"></span></div>';
  return html_con;
};
Public.billsOper_goods = function (val, opt, row) {
  var html_con = '<div class="eperatingCell" style="height: 44px;"><div class="operating" data-id="' + opt.rowId + '"><span class="ui-icon ui-icon-plusAdd" title="新增行"></span><span class="ui-icon ui-icon-trashDel" title="删除行"></span></div></div>';
  return html_con;
};
/*单据分录的库存查询*/
Public.billsQueryInventory = function (val, opt, row) {
  var isShow = row.goods ? '' : 'display:none';
  var html_con = '<a class="ui-icon-cart btn_query_inventory" style="' + isShow + '"></a>';
  return html_con;  
}
Public.dateCheck = function(){
  $('.ui-datepicker-input').bind('focus', function(e){
    $(this).data('original', $(this).val());
  }).bind('blur', function(e){
    var reg = /((^((1[8-9]\d{2})|([2-9]\d{3}))(-)(10|12|0?[13578])(-)(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(-)(11|0?[469])(-)(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(-)(0?2)(-)(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)(-)(0?2)(-)(29)$)|(^([3579][26]00)(-)(0?2)(-)(29)$)|(^([1][89][0][48])(-)(0?2)(-)(29)$)|(^([2-9][0-9][0][48])(-)(0?2)(-)(29)$)|(^([1][89][2468][048])(-)(0?2)(-)(29)$)|(^([2-9][0-9][2468][048])(-)(0?2)(-)(29)$)|(^([1][89][13579][26])(-)(0?2)(-)(29)$)|(^([2-9][0-9][13579][26])(-)(0?2)(-)(29)$))/;
    var _self = $(this);
    setTimeout(function(){
      if(!reg.test(_self.val())) {
        parent.Public.tips({type:1, content : '日期格式有误！如：2013-08-08。'});
        _self.val(_self.data('original'));
      };
    }, 10)

  });
}
//日期格式化
Date.prototype.format = function(format){ 
  if(!format){
    format = 'yyyy-MM-dd';//默认1997-01-01这样的格式
  }
  var o = { 
    "M+" : this.getMonth()+1, //month 
    "d+" : this.getDate(), //day 
    "h+" : this.getHours(), //hour 
    "m+" : this.getMinutes(), //minute 
    "s+" : this.getSeconds(), //second 
    "q+" : Math.floor((this.getMonth()+3)/3), //quarter 
    "S" : this.getMilliseconds() //millisecond 
  } 

  if(/(y+)/.test(format)) { 
    format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
  } 

  for(var k in o) { 
    if(new RegExp("("+ k +")").test(format)) { 
      format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length)); 
    } 
  } 
  return format; 
} 
Date.prototype.addMonths= function(m){
  var d = this.getDate();
  this.setMonth(this.getMonth() + m);
  if (this.getDate() < d)
      this.setDate(0);
};
Date.prototype.addDays = function(d){
  this.setDate(this.getDate() + d);
};
Public.getHostName = function(){
  var defaultPage = Public.getDefaultPage();
  var result = defaultPage.location.hostname;
  if(!/.com/.test(result)){
    //是IP形式的，兼容内网
    result += ':'+defaultPage.location.port;
  }
  return result
};
//根据之前的编码生成下一个编码
Public.getSuggestNum = function(prevNum){
  if (prevNum == '' || !prevNum) {
    return '';
  }
  var reg = /^([a-zA-Z0-9\-_]*[a-zA-Z\-_]+)?(\d+)$/;
  var match = prevNum.match(reg);
  if (match) {
    var prefix = match[1] || '';
    var prevNum = match[2];
    var num = parseInt(prevNum, 10) + 1;
    var delta = prevNum.toString().length - num.toString().length;
    if (delta > 0) {
      for (var i = 0; i < delta; i++) {
        num = '0' + num;
      }
    }
    return prefix + num;
  } else {
    return '';
  }
};

Public.bindEnterSkip = function(obj, func){
  var args = arguments;
  $(obj).on('keydown', 'input:visible:not(:disabled)', function(e){
    if (e.keyCode == '13') {
      var inputs = $(obj).find('input:visible:not(:disabled)');
      var idx = inputs.index($(this));
      idx = idx + 1;
      if (idx >= inputs.length) {
        if (typeof func == 'function') {
          var _args = Array.prototype.slice.call(args, 2 );
          func.apply(null,_args);
        }
      } else {
        inputs.eq(idx).focus();
      }
    }
  });
};

/*获取URL参数值*/
Public.getRequest = Public.urlParam = function() {
   var param, url = location.search, theRequest = {};
   if (url.indexOf("?") != -1) {
      var str = url.substr(1);
      strs = str.split("&");
      for(var i = 0, len = strs.length; i < len; i ++) {
     param = strs[i].split("=");
         theRequest[param[0]]=decodeURIComponent(param[1]);
      }
   }
   return theRequest;
};
//查询未审核的单据   newType 1(未审核单据)  newType 2 今日笔数 3 未发货销货订单
Public.getUnchecked = function() {
  var urlParam = Public.urlParam();
  if (urlParam.newType) {
    if (urlParam.newType == 1){
      THISPAGE.$_beginDate.val(''); 
      THISPAGE.$_endDate.val('');
      if(THISPAGE.checkedCombo){
        THISPAGE.checkedCombo.selectByText('未审核');
        queryConditions.checked = THISPAGE.checkedCombo.getValue() ? THISPAGE.checkedCombo.getValue() - 1 : '-1';
      } else{
        queryConditions.checked = 0;
      }
      queryConditions.beginDate = THISPAGE.$_beginDate.val();
      queryConditions.endDate = THISPAGE.$_endDate.val();
      $('#checked') && $('#checked').val('0');
      $('#search').trigger('click')
    }
    else if (urlParam.newType == 2) {
      THISPAGE.$_beginDate.val(THISPAGE.$_endDate.val());
    }
    else if (urlParam.newType == 3) {  // 未出库和部分出库
      THISPAGE.$_beginDate.val(''); 
      THISPAGE.$_endDate.val('');
      if(THISPAGE.checkedCombo){
        THISPAGE.checkedCombo.selectByText('已审核');
        queryConditions.checked = THISPAGE.checkedCombo.getValue() ? THISPAGE.checkedCombo.getValue() - 1 : '-1';
      } else{
        queryConditions.checked = 0;
      }
      queryConditions.beginDate = THISPAGE.$_beginDate.val();
      queryConditions.endDate = THISPAGE.$_endDate.val();
      // $('#checked') && $('#checked').val('0');
      $($('input[name="billStatus"]')[0]).prop('checked', true)
      $($('input[name="billStatus"]')[1]).prop('checked', true)
      $("#billStatus").val('2,3')
      $('#search').trigger('click')
    }
  }
}
/**
 * [ajax description]
 * @param  {[type]} ajaxOpts [description]
 * 默认json格式
 * 默认post方式
 * @return {[type]}          [description]
 */
Public.ajax = function(ajaxOpts){    
  var opts = {
     type: "POST",
     dataType: "json",  
     timeout:900000 //15mins
  };
  $.extend(true, opts, ajaxOpts);
  var success = ajaxOpts.success;
  var error = ajaxOpts.error;
  opts.success = function(data, status){
    /*if(data.status != 200){
        var defaultPage = Public.getDefaultPage();
        var msg = data.msg || '出错了=. =||| ,请点击这里拷贝错误信息 :)';
      var errorStr = msg;
      if(data.data.error){
          var errorStr = '<a id="myText" href="javascript:window.clipboardData.setData("Text",data.error);alert("详细信息已经复制到剪切板，请拷贝给管理员！");"'+msg+'</a>'
      }
        defaultPage.Public.tips({type:1, content:errorStr});
        return;
      }*/
    success && success(data, status); 
  }
  opts.error = function(err,ms){  
    var content = '服务端响应错误！'
    if(ms === 'timeout'){
      content = '请求超时！';
    }
    parent.Public.tips({type: 1, content : content});
    error && error(err);
   }
  $.ajax(opts);  
};  
/*
  通用post请求，返回json
  url:请求地址， params：传递的参数{...}， callback：请求成功回调
*/ 
Public.ajaxPost = function(url, params, callback, errCallback){    
  Public.ajax({  
     url: url,
     data: params, 
     success: callback,  
     error: errCallback  
  });  
};  
//扩展对象方法
$.fn.extend({
  //为对象新增ajaxPost方法
  ajaxPost:function(url, params, callback, errCallback){
    var $this = $(this);
    var loading;
    var myTimer;
    var preventTooFast = 'ui-btn-dis';
    var ajaxOpts = {  
       url: url,
       data: params, 
       success: callback,  
       error: errCallback
    }
    $.extend(true, ajaxOpts, {
      beforeSend : function(){
        $this.addClass(preventTooFast);
        myTimer = setTimeout(function(){
          $this.removeClass(preventTooFast);
        },2000)
        loading = $.dialog.loading('提交中，请稍候...', 1000, 'loading.gif', true);//目前这些参数都还没有用到，留着以后用
      },
      success : callback,
      complete : function(){ 
        loading.close();
      },
      error: errCallback
    });
    if($this.hasClass(preventTooFast)){
      return;
    }
    Public.ajax(ajaxOpts); 
  }
});
Public.ajaxGet = function(url, params, callback, errCallback){    
  Public.ajax({  
     type: "GET",
     url: url,
     data: params,
     success: callback,   
     error: errCallback  
  });  
};
/*操作提示*/
Public.tips = function(options){ return new Public.Tips(options); }
Public.Tips = function(options){
  var defaults = {
    renderTo: 'body',
    type : 0,
    autoClose : true,
    removeOthers : true,
    time : undefined,
    top : 10,
    onClose : null,
    onShow : null
  }
  this.options = $.extend({},defaults,options);
  this._init();
  
  !Public.Tips._collection ?  Public.Tips._collection = [this] : Public.Tips._collection.push(this);
  
}

Public.Tips.removeAll = function(){
  try {
    for(var i=Public.Tips._collection.length-1; i>=0; i--){
      Public.Tips._collection[i].remove();
    }
  }catch(e){}
}

Public.Tips.prototype = {
  _init : function(){
    var self = this,opts = this.options,time;
    if(opts.removeOthers){
      Public.Tips.removeAll();
    }

    this._create();

    if(opts.autoClose){
      time = opts.time || opts.type == 1 ? 3000 : 2000;
      window.setTimeout(function(){
        self.remove();
      },time);
    }

  },
  
  _create : function(){
    var opts = this.options, self = this;
    if(opts.autoClose) {
      this.obj = $('<div class="ui-tips"><i></i></div>').append(opts.content);
    } else {
      this.obj = $('<div class="ui-tips"><i></i><span class="close"></span></div>').append(opts.content);
      this.closeBtn = this.obj.find('.close');
      this.closeBtn.bind('click',function(){
        self.remove();
      });
    };
    
    switch(opts.type){
      case 0 : 
        this.obj.addClass('ui-tips-success');
        break ;
      case 1 : 
        this.obj.addClass('ui-tips-error');
        break ;
      case 2 : 
        this.obj.addClass('ui-tips-warning');
        break ;
      default :
        this.obj.addClass('ui-tips-success');
        break ;
    }
    
    this.obj.appendTo('body').hide();
    this._setPos();
    if(opts.onShow){
        opts.onShow();
    }

  },

  _setPos : function(){
    var self = this, opts = this.options;
    if(opts.width){
      this.obj.css('width',opts.width);
    }
    var h =  this.obj.outerHeight(),winH = $(window).height(),scrollTop = $(window).scrollTop();
    //var top = parseInt(opts.top) ? (parseInt(opts.top) + scrollTop) : (winH > h ? scrollTop+(winH - h)/2 : scrollTop);
    var top = parseInt(opts.top) + scrollTop;
    this.obj.css({
      position : Public.isIE6 ? 'absolute' : 'fixed',
      left : '50%',
      top : "40%",
      zIndex : '9999',
      marginLeft : -self.obj.outerWidth()/2 
    });

    window.setTimeout(function(){
      self.obj.show().css({
        marginLeft : -self.obj.outerWidth()/2
      });
    },150);

    if(Public.isIE6){
      $(window).bind('resize scroll',function(){
        var top = $(window).scrollTop() + parseInt(opts.top);
        self.obj.css('top',top);
      })
    }
  },

  remove : function(){
    var opts = this.options;
    this.obj.fadeOut(200,function(){
      $(this).remove();
      if(opts.onClose){
        opts.onClose();
      }
    });
  }
};
//数值显示格式转化
Public.numToCurrency = function(val, dec) {
  val = parseFloat(val);  
  dec = dec || 2; //小数位
  if(val === 0 || isNaN(val)){
    return '';
  }
  val = val.toFixed(dec).split('.');
  var reg = /(\d{1,3})(?=(\d{3})+(?:$|\D))/g;
  return val[0].replace(reg, "$1,") + '.' + val[1];
};
//数值显示
Public.currencyToNum = function(val){
  var val = String(val);
  if ($.trim(val) == '') {
    return '';
  }
  val = val.replace(/,/g, '');
  val = parseFloat(val);
  return isNaN(val) ? 0 : val;
};
//只允许输入数字
Public.numerical = function(e){
  var allowed = '0123456789.-', allowedReg;
  allowed = allowed.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  allowedReg = new RegExp('[' + allowed + ']');
  var charCode = typeof e.charCode != 'undefined' ? e.charCode : e.keyCode; 
  var keyChar = String.fromCharCode(charCode);
  if(!e.ctrlKey && charCode != 0 && ! allowedReg.test(keyChar)){
    e.preventDefault();
  };
};

//限制只能输入允许的字符，不支持中文的控制
Public.limitInput = function(obj, allowedReg){
    var ctrlKey = null;
    obj.css('ime-mode', 'disabled').on('keydown',function(e){
        ctrlKey = e.ctrlKey;
    }).on('keypress',function(e){
        allowedReg = typeof allowedReg == 'string' ? new RegExp(allowedReg) : allowedReg;
        var charCode = typeof e.charCode != 'undefined' ? e.charCode : e.keyCode; 
        var keyChar = $.trim(String.fromCharCode(charCode));
        if(!ctrlKey && charCode != 0 && charCode != 13 && !allowedReg.test(keyChar)){
            e.preventDefault();
        } 
    });
};
//限制输入的字符长度
Public.limitLength = function(obj, count){
  obj.on('keyup',function(e){
        if(count < obj.val().length){
          e.preventDefault();
          obj.val(obj.val().substr(0,count));
        }
    });
};
/*批量绑定页签打开*/
Public.pageTab = function() {
  $(document).on('click', '[rel=pageTab]', function(e){
    e.preventDefault();
    var right = $(this).data('right');
    if (right && !Business.verifyRight(right)) {
      return false;
    };
    var tabid = $(this).attr('tabid'), url = $(this).attr('href'), showClose = $(this).attr('showClose'), text = $(this).attr('tabTxt') || $(this).text(),parentOpen = $(this).attr('parentOpen');
    if(parentOpen){
      parent.tab.addTabItem({tabid: tabid, text: text, url: url, showClose: showClose});
    } else {
      tab.addTabItem({tabid: tabid, text: text, url: url, showClose: showClose});
    }
  });
};

$.fn.artTab = function(options) {
  var defaults = {};
  var opts = $.extend({}, defaults, options);
  var callback = opts.callback || function () {};
  this.each(function(){
    var $tab_a =$("dt>a",this);
    var $this = $(this);
    $tab_a.bind("click", function(){
      var target = $(this);
      target.siblings().removeClass("cur").end().addClass("cur");
      var index = $tab_a.index(this);
      var showContent = $("dd>div", $this).eq(index);
      showContent.siblings().hide().end().show();
      callback(target, showContent, opts);
    });
    if(opts.tab)
      $tab_a.eq(opts.tab).trigger("click");
    if(location.hash) {
      var tabs = location.hash.substr(1);
      $tab_a.eq(tabs).trigger("click");
    }
  });   
};

//文本列表滚动
Public.txtSlide = function(opt){
  var def = {
    notice: '#notices > ul',
    size: 1, //显示出来的条数
    pause_time: 3000, //每次滚动后停留的时间
    speed: 'fast', //滚动动画执行的时间
    stop: true //鼠标移到列表时停止动画
  };
  opt = opt || {};
  opt = $.extend({}, def, opt);

  var $list = $(opt.notice),
    $lis = $list.children(),
    height = $lis.eq(0).outerHeight() * opt.size,
    interval_id;
  if($lis.length <= opt.size) return;
  interval_id = setInterval(begin, opt.pause_time);

  opt.stop && $list.on({
    'mouseover': function(){
      clearInterval(interval_id);
      $list.stop(true,true);
    },
    'mouseleave': function(){
      interval_id = setInterval(begin, opt.pause_time);
    }
  });

  function begin(){
    $list.stop(true, true).animate({marginTop: -height}, opt.speed, function(){
      for(var i=0; i<opt.size; i++){
        $list.append($list.find('li:first'));
      }
      $list.css('margin-top', 0);
    });
  }
};

// 可以排序的列名增加默认向上箭头 ———— ywx
Public.addDefUpArrow = function (tableGrid,colModel,judgeByTrue) {
  //1.不是第一次进入有排序的表头
  if (tableGrid.isNeedAdd === true) {
    $('.s-ico:visible').next('.ui-icon-default').css('display','none');
    $('.s-ico:hidden').next('.ui-icon-default').css('display','inline');     
    return;
  }  

  //2.不是第一次进入且没有排序表头
  if (tableGrid.isNeedAdd === false) {
    return;
  }

  //3.第一次进入
  if (judgeByTrue===true) {
    for (var i = 0; i < colModel.length; i++) {
      if (colModel[i].sortable === true) {
        var sortName = colModel[i].name;
        sort_thId = "jqgh_grid_" + sortName;
        $('#'+sort_thId).append('<span class="ui-icon-default"></span>');
        tableGrid.isNeedAdd = true;
      }
    }
  } else if (judgeByTrue===false) {
    for (var i = 0; i < colModel.length; i++) {
      if (colModel[i].sortable !== false) {
        var sortName = colModel[i].name;
        sort_thId = "jqgh_grid_" + sortName;
        $('#'+sort_thId).append('<span class="ui-icon-default"></span>');
        tableGrid.isNeedAdd = true;
      }
    }
  }
  if (tableGrid.isNeedAdd === true) {
    $('.s-ico:visible').next('.ui-icon-default').css('display','none');
    $('.s-ico:hidden').next('.ui-icon-default').css('display','inline');     
  } else{
    tableGrid.isNeedAdd = false;
  }
};


$.fn.enterKey = function() {
  this.each(function() {
    $(this).keydown(function(e) {
      if (e.which == 13) {
        var ref = $(this).data("ref");
        if (ref) {
          $('#' + ref).select().focus().click();
        }
        else {
          eval($(this).data("enterKeyHandler"));
        }
      }
    });
  });
};


//input占位符
$.fn.placeholder = function(){
  this.each(function() {
    $(this).focus(function(){
      if($.trim(this.value) == this.defaultValue){
        this.value = '';
      }
      $(this).removeClass('ui-input-ph');
    }).blur(function(){
      var val = $.trim(this.value);
      if(val == '' || val == this.defaultValue){
        $(this).addClass('ui-input-ph');
      }
      val == '' && $(this).val(this.defaultValue);
    });
  });
};

//单选框插件
$.fn.cssRadio = function(opts){
  var opts = $.extend({}, opts);
  var $_radio = $('label.radio', this), $_this = this;
  $_radio.each(function() {
    var self = $(this);
    if (self.find("input")[0].checked) {
      self.addClass("checked");
    };

  }).hover(function() {
    $(this).addClass("over");
  }, function() {
    $(this).removeClass("over");
  }).click(function(event) {
    $_radio.find("input").removeAttr("checked");
    $_radio.removeClass("checked");
    $(this).find("input").attr("checked", "checked");
    $(this).addClass("checked");
    opts.callback($(this));
  });
  return {
    getValue: function() {
      return $_radio.find("input[checked]").val();
    },
    setValue: function(index) {
      return $_radio.eq(index).click();
    }
  }
};
//复选框插件
$.fn.cssCheckbox = function() {
  var $_chk = $(".chk", this);
  $_chk.each(function() {
    if ($(this).find("input")[0].checked) {
      $(this).addClass("checked");
    };
    if ($(this).find("input")[0].disabled) {
      $(this).addClass("dis_check");
    };
  }).hover(function() {
    $(this).addClass("over")
  }, function() {
    $(this).removeClass("over")
  }).click(function(event) {
    if ($(this).find("input")[0].disabled) {
      return;
    };
    $(this).toggleClass("checked");
    $(this).find("input")[0].checked = !$(this).find("input")[0].checked;
    event.preventDefault();
  });
  
  return {
    chkAll:function(){
      $_chk.addClass("checked");
      $_chk.find("input").attr("checked","checked");
    },  
    chkNot:function(){
      $_chk.removeClass("checked");
      $_chk.find("input").removeAttr("checked");
    },
    chkThis:function(){
      $_chk.toggleClass("checked");
      $_chk.find("input")[0].checked = !$_chk.find("input")[0].checked;
    },
    chkVal:function(){
      var val = [];
      $_chk.find("input:checked").each(function() {
              val.push($(this).val());
          });
      return val;
    }
  }
};

Public.getDefaultPage = function(){
  var win = window.self;
  var i = 20;//最多20层，防止无限嵌套
  try{
    do{
      if (/default-new.jsp|default.jsp/.test(win.location.href)) {
        return win;
      }
      win = win.parent;
      i--;
    } while(i>0);
  }catch(e){
    return win;
  }
  return win;
};

//权限验证
Business.verifyRight = function(right, noTip, tipMsg){
  var system = Public.getDefaultPage().SYSTEM;
  var isAdmin = system.isAdmin;
  var siExperied = system.siExpired;
  var rights = system.rights;
  if (isAdmin && !siExperied) {
    return true;
  };

  if(rights[right]) {
    return true;
  }

  var tipMsgHTML = '<h4 class="tit">您没有该功能的使用权限哦！</h4>';
  if (noTip===false&&typeof(tipMsg)!==undefined&&tipMsg.length>0) {
  	tipMsgHTML = '<h4 class="tit">' + tipMsg + '</h4>';
  }
  // 没有通过验证的处理
  var html = [
    '<div class="ui-dialog-tips">',
    tipMsgHTML,
    '<p>请联系管理员为您授权！</p>',
    '</div>'
  ].join('');
  var width = 280;

  if(siExperied){
    html = [
      '<div class="ui-dialog-tips">',
      '<p>谢谢您使用本产品，您的当前服务已经到期，到期3个月后数据将被自动清除，如需继续使用请购买/续费！</p>',
      '<p style="color:#AAA; font-size:12px;">(续费后请刷新页面或重新登录。)</p>',
      '</div>'
    ].join('');
    width = 240;
  }

  var dialogOpt = {
    width: width,
    title: '系统提示',
    icon: 'alert.gif',
    fixed: true,
    lock: true,
    resize: false,
    ok: true,
    content: html
  }
  !noTip && $.dialog(dialogOpt);
  return false;
};

//无数据导出提示
Business.noDataExportTips = function() {
  var ids = $("#grid").jqGrid('getDataIDs');
  var content = ['<div class="nodata-tips-wrap cf">',
  '<div class="nodata-tips-left"></div>',
  '<div class="nodata-tips-right"><p>亲，没有数据可以导出哦。。。</p></div>',
  '</div><div id="nodata-ok">我知道了</div>']
  if (ids.length === 0) {
    $.dialog({
      title : '无数据导出',
      width: 500,
      height: 320,
      content : content.join(''),
      lock: true,
      init: function(){
        var $this = this;
        $this.DOM.title.closest('tr').remove();
        $('#nodata-ok').click(function(e) {
          $this.close();
        });
      }
    });
    return false;
  }else{
    return true;
  }
}

//获取文件
Business.getFile = function(url, args, isNewWinOpen, method){
  if (typeof url != 'string') {
    return ;
  }
  var method = method || 'post'
  var url = url.indexOf('?') == -1 ? url += '?' : url;
  if(args.id) {
    url += '&id=' + args.id + '&random=' + new Date().getTime();
  } else {
    url += '&random=' + new Date().getTime();
  };
  
  var downloadForm = parent.$('form#downloadForm');
  if (downloadForm.length == 0) {
    downloadForm = parent.$('<form method="' + method + '"/>').attr('id', 'downloadForm').hide().appendTo('body');
  } else {
    downloadForm.empty();
  }
  downloadForm.attr('action', url);
  for( k in args){
    $('<input type="hidden" />').attr({name: k, value: args[k]}).appendTo(downloadForm);
  }
  if (isNewWinOpen) {
    downloadForm.attr('target', '_blank');
  } else{
    var downloadIframe = $('iframe#downloadIframe');
    if (downloadIframe.length == 0) {
      downloadIframe = $('<iframe />').attr('id', 'downloadIframe').hide().appendTo('body');
    }
    downloadForm.attr('target', 'downloadIframe');
  }
  downloadForm.trigger('submit');
};
Business.billCustomerCombo = function($_obj, opts){
  var defaultPage = Public.getDefaultPage();
  opts = $.extend(true, {
    data: function(){
      if(SYSTEM.customerInfo) {
        var usingData = []//获取启用状态的;
        for (var i = 0; i < SYSTEM.customerInfo.length; i++) {
          var g = SYSTEM.customerInfo[i];
          if(!g['delete']){
            usingData.push(g);
          }
        };
        return usingData;
      } else {
        return '/basedata/contact.do?action=list$simple=1';
      }
    }
  }, opts);
  return Business.customerCombo($_obj, opts);
}
Business.brandCombo = function($_obj, opts){
  var defaultPage = Public.getDefaultPage();
  opts = $.extend(true, {
    data: function(){
      if(SYSTEM.brandInfo) {
        var usingData = []//获取启用状态的;
        for (var i = 0; i < SYSTEM.brandInfo.length; i++) {
          var g = SYSTEM.brandInfo[i];
          if(g['isdelete']){
            usingData.push(g);
          }
        };
        return usingData;
      } else {
        return '/basedata/brand.do?action=list&isDelete=2';
      }
    },
    ajaxOptions: {
      formatData: function(data){
        data.data.rows.unshift({name:'（空）',id:0})
        defaultPage.SYSTEM.brandInfo = data.data.rows; //更新
        return data.data.rows;
      } 
    },
  }, opts);
  return $_obj.combo(opts).getCombo()
}
Business.customerCombo = function($_obj, opts){
  if ($_obj.length == 0) { return };
  var defaultPage = Public.getDefaultPage();
  var opts = $.extend(true, {
    data: function(){
      return defaultPage.SYSTEM.customerInfo;
    },
    ajaxOptions: {
      formatData: function(data){
        defaultPage.SYSTEM.customerInfo = data.data.rows; //更新
        return data.data.rows;
      } 
    },
    width: 200,
    height: 300,
    formatText: function(row){
      return row.number + ' ' + row.name;
    },
    //formatResult: 'name',
    text: 'name',
    value: 'id',
    defaultSelected: 0,
    editable: true,
    extraListHtml: '<a href="javascript:void(0);" id="quickAddCustomer" class="quick-add-link"><i class="ui-icon-add"></i>新增客户</a>',
    maxListWidth: 500,
    cache: false,
    forceSelection: false,
    // maxFilter: 100,
    trigger: false,
    customMatch:function(item,query){
      var reg = new RegExp(query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'i');
      try{
        var text = item.text + (item.rawData.pinYin || '');
             }
            catch(err)
             {
         var text = item.text;
            }
      
      if(text.search(reg) == -1){
        return false;
      }
      return true;
    },
    callback: {
      onChange: function(data){
        if(data) {
          $_obj.data('contactInfo', data);
          this.input.trigger('nextAction');
        } else {
          $_obj.removeData('contactInfo');
          $_obj.removeData('priceList');
        }
      },
      onEnter:function(e){
        //e.stopPropagation();
        var skey = $_obj.find('input').val();
        if(!$_obj.data('contactInfo')){
          $_obj.find('.ui-icon-ellipsis').data('skey',skey).data('type','customerInfo').trigger('click');
        }
      }
    }
  }, opts);
  
  var customerCombo = $_obj.combo(opts).getCombo(); 
  //新增客户
  $('#quickAddCustomer').on('click', function(e){
    e.preventDefault();
    if (!Business.verifyRight('BU_ADD')) {
      return ;
    };
    $.dialog({
      title : '新增客户',
      content : 'url:/settings/customer-manage.jsp',
      data: {oper: 'add', callback: function(data, oper, dialogWin){
        //parent.getCustomer();
        //_self.customerCombo.selectByValue(data.id, false);
        //customerCombo.loadData('/basedata/contact.do?action=list', ['id', data.id]);
        if(data && data.id) {
          $_obj.data('contactInfo', data);  //存储
          $_obj.find('input').val(data.number + ' ' + data.name); //回填数据
          defaultPage.SYSTEM.customerInfo.push(data); //增加进缓存
          customerCombo.collapse(); //关闭下拉
        }
        dialogWin && dialogWin.api.close();
      }},
      width : 640,
      height : 460,
      max : false,
      min : false,
      cache : false,
      lock: true
    });
  });
  
  customerCombo.input.focus(function() {
    var $_this = $(this);
    setTimeout(function(){
      $_this.select();
    }, 15);
  });
  
  return customerCombo;
};
Business.billSalesCombo = function($_obj, opts){
  var defaultPage = Public.getDefaultPage();
  opts = $.extend(true, {
    data: function(){
      if(defaultPage.SYSTEM.salesInfo) {
        var usingData = []//获取启用状态的;
        for (var i = 0; i < defaultPage.SYSTEM.salesInfo.length; i++) {
          var g = defaultPage.SYSTEM.salesInfo[i];
          if(!g['delete']){
            usingData.push(g);
          }
        };
        return usingData;
      } else {
        return '/basedata/employee.do?action=list';
      }
    }
  }, opts);
  return Business.salesCombo($_obj, opts);
}
Business.salesCombo = function($_obj, opts){
  if ($_obj.length == 0) { return };
  var defaultPage = Public.getDefaultPage();
  var opts = $.extend(true, {
    data: function(){
      if(defaultPage.SYSTEM.salesInfo) {
        return defaultPage.SYSTEM.salesInfo;
      } else {
        return '/basedata/employee.do?action=list';
      }
    },
    ajaxOptions: {
      formatData: function(data){
        if(data.status == 200){
          defaultPage.SYSTEM.salesInfo = data.data.items; //更新
          return data.data.items;
        }else{
          defaultPage.SYSTEM.salesInfo = [];
          return [];
        }
      } 
    },
    width: 120,
    height: 300,
    text: 'name',
    value: 'id',
    defaultSelected: 0,
    defaultFlag: false,
    cache: false,
    editable: true,
    emptyOptions: true,
    callback: {
      onChange: function(data){
      }
    },
    extraListHtml: '<a href="javascript:void(0);" id="quickAddSales" class="quick-add-link"><i class="ui-icon-add"></i>新增职员</a>'
  }, opts);
  
  var salesCombo = $_obj.combo(opts).getCombo();  
  //新增客户
  $('#quickAddSales').on('click', function(e){
    e.preventDefault();
    if (!Business.verifyRight('EMPLOYEEMANAGER_ADD')) {
      return ;
    };
    $.dialog({
      title : '新增职员',
      content : 'url:/settings/staff-manage.jsp',
      data: {oper: 'add', callback: function(data, oper, dialogWin){
        //parent.getCustomer();
        //_self.customerCombo.selectByValue(data.id, false);
        salesCombo.loadData('/basedata/employee.do?action=list', ['id', data.id]);
        dialogWin && dialogWin.api.close();
      }},
      width : 400,
      height : 160,
      max : false,
      min : false,
      cache : false,
      lock: true
    });
  });
  return salesCombo;
};
Business.billSupplierCombo = function($_obj, opts){
  var defaultPage = Public.getDefaultPage();
  opts = $.extend(true, {
    data: function(){
      if(defaultPage.SYSTEM.supplierInfo) {
        var usingData = []//获取启用状态的;
        for (var i = 0; i < defaultPage.SYSTEM.supplierInfo.length; i++) {
          var g = defaultPage.SYSTEM.supplierInfo[i];
          if(!g['delete']){
            usingData.push(g);
          }
        };
        return usingData;
      } else {
        return '/basedata/contact.do?action=listt&simple=1&type=10';
      }
    }
  }, opts);
  return Business.supplierCombo($_obj, opts);
}
Business.supplierCombo = function($_obj, opts){
  if ($_obj.length == 0) { return };
  var defaultPage = Public.getDefaultPage();
  var opts = $.extend(true, {
    data: function(){
      return defaultPage.SYSTEM.supplierInfo;
    },
    ajaxOptions: {
      formatData: function(data){
        defaultPage.SYSTEM.supplierInfo = data.data.rows; //更新
        return data.data.rows;
      } 
    },      
    width: 200,
    height: 300,
    formatText: function(row){
      return row.number + ' ' + row.name;
    },
    //formatResult: 'name',
    text: 'name',
    value: 'id',
    defaultSelected: 0,
    editable: true,
    extraListHtml: '<a href="javascript:void(0);" id="quickAddVendor" class="quick-add-link"><i class="ui-icon-add"></i>新增供应商</a>',
    maxListWidth: 500,
    cache: false,
    forceSelection: false,
    // maxFilter: 10,
    trigger: false,
    customMatch:function(item,query){
      var reg = new RegExp(query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'i');
      try{
        var text = item.text + (item.rawData.pinYin || '');
             }
            catch(err)
             {
         var text = item.text;
            }
      if(text.search(reg) == -1){
        return false;
      }
      return true;
    },
    callback: {
      onChange: function(data){
        if(data) {
          $_obj.data('contactInfo', data);
          this.input.trigger('nextAction');
        } else {
          $_obj.removeData('contactInfo');
        }
      },
      onEnter:function(e){
        //e.stopPropagation();
        var skey = $_obj.find('input').val();
        if(!$_obj.data('contactInfo')){
          $_obj.find('.ui-icon-ellipsis').data('skey',skey).data('type','supplierInfo').trigger('click');
        }
      }
    }     
  }, opts);
  
  var supplierCombo = $_obj.combo(opts).getCombo(); 
  //新增供应商
  $('#quickAddVendor').on('click', function(e){
    e.preventDefault();
    if (!Business.verifyRight('PUR_ADD')) {
      return ;
    };
    $.dialog({
      title : '新增供应商',
      content : 'url:/settings/vendor-manage.jsp',
      data: {oper: 'add', callback: function(data, oper, dialogWin){
        //parent.getCustomer();
        //_self.customerCombo.selectByValue(data.id, false);
        supplierCombo.loadData('/basedata/contact.do?type=10&action=list', ['id', data.id]);
        dialogWin && dialogWin.api.close();
      }},
      width : 640,
      height : 460,
      max : false,
      min : false,
      cache : false,
      lock: true
    });
  });
  
  supplierCombo.input.focus(function() {
    var $_this = $(this);
    setTimeout(function(){
      $_this.select();
    }, 15);
  });
  return supplierCombo;
};
Business.billSettlementAccountCombo = function($_obj, opts){
  var defaultPage = Public.getDefaultPage();
  opts = $.extend(true, {
    data: function(){
      if(defaultPage.SYSTEM.settlementAccountInfo) {
        var usingData = []//获取启用状态的;
        for (var i = 0; i < defaultPage.SYSTEM.settlementAccountInfo.length; i++) {
          var g = defaultPage.SYSTEM.settlementAccountInfo[i];
          if(!g['delete']){
            usingData.push(g);
          }
        };
        return usingData;
      } else {
        return '/basedata/settAcct.do?action=list';
      }
    }
  }, opts);
  return Business.settlementAccountCombo($_obj, opts);
}
//结算账户下拉框初始化
Business.settlementAccountCombo = function($_obj, opts){
  if ($_obj.length == 0) { return };
  var defaultPage = Public.getDefaultPage();
  var getInfo=(function(){
    Public.ajaxGet('/basedata/settAcct.do?action=list', {}, function(data){
      if(data.status === 200) {
        defaultPage.SYSTEM.settlementAccountInfo = data.data.items;
      } else if (data.status === 250){
        defaultPage.SYSTEM.settlementAccountInfo = [];
      } else {
        Public.tips({type: 1, content : data.msg});
      }
    });
  })();
  var opts = $.extend(true, {
    data: function(){
      return defaultPage.SYSTEM.settlementAccountInfo || [];
    },
    ajaxOptions: {
      formatData: function(data){
        defaultPage.SYSTEM.settlementAccountInfo = data.data.items; //更新
        return data.data.items;
      } 
    },
    width: 200,
    height: 300,
    /*formatText: function(row){
      return row.number + ' ' + row.name;
    },*/
    //formatResult: 'name',
    text: 'name',
    value: 'id',
    defaultSelected: -1,
    defaultFlag: false,
    cache: false,
    editable: true,
    callback: {
      onChange: function(data){
      }
    },
    extraListHtml: '<a href="javascript:void(0);" id="quickAddVendor" class="quick-add-link"><i class="ui-icon-add"></i>新增结算账户</a>'
  }, opts);
  
  var settlementAccountCombo = $_obj.combo(opts).getCombo();  
  //新增结算账户
  $('#quickAddVendor').on('click', function(e){
    e.preventDefault();
    if (!Business.verifyRight('SettAcct_ADD')) {
      return ;
    };
    $.dialog({
      title : '新增结算账户',
      content : 'url:/settings/settlementAccount-manage.jsp',
      data: {oper: 'add', callback: function(data, oper, dialogWin){
        defaultPage.SYSTEM.settlementAccountInfo.push(data);
        settlementAccountCombo.loadData('/basedata/settAcct.do?action=query', ['id', data.id]);
        dialogWin && dialogWin.api.close();
      }},
      width : 640,
      height : 205,
      max : false,
      min : false,
      cache : false,
      lock: true
    });
  });
  return settlementAccountCombo;
};
Business.formatGoodsName = function(good){
  //console.log(good);
  var number = good.number;
  var name = good.name;
  var spec = good.spec ? '_' + good.spec : '';

  //var invSkus=good.invSkus ? '_' + good.invSkus : '';
  //var invSkus=good.invSkus ? '_' + good.invSkus : '';
  return number + ' ' + name + spec;
}
Business.cacheManage = {
  init : function(){
    if(this.inited) return;
    this.inited = 1;//只启用一次
    this.defaultPage = Public.getDefaultPage();
    this.goodsInfo = this.defaultPage.SYSTEM.goodsInfo;
  },
  getGoodInfo:function(params, callback, effective){
    if(!params)return;
    var defaultPage = Public.getDefaultPage();
    var _self = this;
    _self.init();
    var _prop = '';
    var val = '';
    switch(params.action){
      case 'queryByMatchCon':_prop = 'number';_skuprop = 'skuNumber';val = params.matchCon; break;
      case 'queryByBarcode':_prop = 'barCode';_skuprop = 'skuBarCode';val = params.barCode; break;
      default:return;
    }
    if(!val){
      callback({});
      return {};
    };
    //本地匹配多一次
    for (var i = _self.goodsInfo.length - 1; i >= 0; i--) {
      var good = _self.goodsInfo[i];
      delete good.amount;
      if(good[_prop] === val){
        /*$('#' + rowid).data('goodsInfo',good);
        var number = good.number;
        var name = good.name;
        var spec = good.spec ? '_' + good.spec : '';
        var barCode  = good.barCode ? '_' + good.barCode : '';
        return number + name + spec;*/
        if(good['delete'] && effective){
          defaultPage.Public.tips({type:2 , content:'该商品已经被禁用！'});
          return {};
        }

        if (THISPAGE.$_barCodeInsert !== undefined && THISPAGE.$_barCodeInsert.hasClass('open') === true) {
          good.skuName = undefined;
        }
        if(typeof callback === 'function'){
          callback(good);
        }
        return good;
      }


    if(good.invSkus){
      if(good.invSkus.length>0){
        for (var k =0; k<good.invSkus.length; k++) {
          if(good.invSkus[k][_skuprop] === val){
            if (THISPAGE.$_barCodeInsert !== undefined && THISPAGE.$_barCodeInsert.hasClass('open') === true) {
              good.skuName = good.invSkus[k].skuName;
            }
            if(good['delete'] && effective){
              defaultPage.Public.tips({type:2 , content:'该商品已经被禁用！'});
              return {};
            }
            if(typeof callback === 'function'){
              callback(good);
            }
            invorder=k;
            issearch=1;
            return good;
          }
        }
      }
   };

    };
    //本地匹配不到，则去后端查找
    defaultPage.$.ajax({
      url: '/basedata/inventory.do',
      type: 'post',
      dataType: 'json',
      data: params,
      async:false,//勿修改该属性
      success:function(data){
        if(data.status === 200 && data.data){
          var good = {};
          if(data.data.items){
            // if(data.data.items.length == 1){//精确匹配到的才需要,这个接口后面需要改成精确匹配编码&名称
            //   good = data.data.items[0];
            // }else{
            //   return good;
            // }
            // 接口为模糊查询接口，匹配的有商品编码、商品名称、规格型号等，用商品编号去取唯一匹配
            $.each(data.data.items, function(i, el) {
              if (el.number === val) {
                good = el;
              }
            })
          }else{
            good = data.data;
          }
          delete good.amount;
          good.unitId = good.unitId || good.baseUnitId;
          if(good.unitId){
            for (var i = _self.defaultPage.SYSTEM.unitInfo.length - 1; i >= 0; i--) {
              var unit = _self.defaultPage.SYSTEM.unitInfo[i];
              if(unit.id == good.unitId){
                good.mainUnit = unit.name;
                good.unitName = unit.name;
              }
            };
          }
          // 加入缓存
          defaultPage.SYSTEM.goodsInfo.push(good);
          if(good['delete'] && effective){
            defaultPage.Public.tips({type:2 , content:'该商品已经被禁用！'});
            return {};
          }
          //_self.goodsInfo.push(good);
          if(typeof callback === 'function'){
            callback(good);
          }
          return good;
        }else{
          //_self.defaultPage.Public.tips({type: 1, content : data.msg});
        }
      }
    })
    .done(function() {
      //console.log("success");
    })
    .fail(function() {
      // console.log("error");
    })
    .always(function() {
      // console.log("complete");
    });
  },
  getGoodsInfoByNumber:function(number, callback,effective){
    return this.getGoodInfo({
      action:'queryByMatchCon',
      matchCon:number
    },callback, effective);
  },
  getGoodsInfoByBarCode:function(barCode, callback,effective){
    return this.getGoodInfo({
      action:'queryByBarcode',
      barCode:barCode
    },callback, effective);
  }
}
Business.serNumManage = function(opts){
  var parentTr = opts.row,
  goodsInfo = opts.data || parentTr.data('goodsInfo') || {},
  serNumUsedList = goodsInfo.serNumList,
  isCreate = opts.isCreate,
  isEdit = opts.isEdit,
  isQty = opts.isQty,//出库点击数量列直接弹出录入页，其他列弹出列表页
  enableStorage = opts.enableStorage,
  enableSku = opts.enableSku,
  view = opts.view,
  $grid = parentTr.closest('table'),
  defaultPage = Public.getDefaultPage();

  
  var oldData = {
    goodsInfo: goodsInfo,
    storageInfo : parentTr.data('storageInfo') || {},
    unitInfo : parentTr.data('unitInfo')||{},
    skuInfo: parentTr.data('skuInfo')||{}
  } 
  /*if(!view){
    //非查询模式
    $grid.jqGrid("restoreCell", curRow, curCol);
    parentTr.data('goodsInfo', null).data('storageInfo', null).data('unitInfo', null);
  }*/
  var params = {
    width: 650,
    height: 400,
    title: (serNumUsedList ? '修改' : '录入') + '【'+goodsInfo.name+''+ (oldData.skuInfo && oldData.skuInfo.name ? '_'+ oldData.skuInfo.name : '') +'】的序列号',
    content: 'url:/settings/serNumBatch.jsp',
    data: {
      invId: goodsInfo.id,
      isCreate:isCreate,
      isEdit:isEdit,
      enableStorage : enableStorage,
      enableSku : enableSku,
      serNumUsedList : serNumUsedList,
      storageInfo : oldData.storageInfo,
      skuInfo:oldData.skuInfo,
      goodsInfo:oldData.goodsInfo,
      view : view,
      callback: function(serNumList,win){
        var curID = THISPAGE.curID;
        // $grid.jqGrid("restoreCell", curRow, curCol);
        //根据仓库分组
        var storageList = {};
        if(!$.isArray(serNumList)){
          var _serNumList = [];
          for(var item in serNumList){
            _serNumList.push(serNumList[item]);
          }
          serNumList = _serNumList;
        }
        //出库的时候，有辅助属性的需要带出来
        if(false && !isCreate && oldData.goodsInfo.invSkus && oldData.goodsInfo.invSkus.length){
          //从后台获取对应的sku
          $.fn.ajaxPost('/series/invSerNumAction.do?action=findSkuForSerNums',{serNums: serNumList.join()},function(data){
            if(data.status === 200){
              for (var i = 0; i < data.data.items.length; i++) {
                var thisSku = data.data.items[i];
                //如果后端返回的顺序和条数和前端提交的相同就可以直接用i作为指针去改序列号列表中的数据，不然应该用下面这段被注释掉的代码
                /*for (var j = 0; j < serNumList.length; j++) {
                  if(serNumList[j].serNum == thisSku.serNum){
                    serNumList[j].skuInfo = {
                      skuId: thisSku.skuId,
                      skuName: thisSku.skuName
                    }
                  }
                };*/
                serNumList[i].skuInfo = thisSku ? {} : {
                  id: thisSku.skuId,
                  name: thisSku.skuName
                }
              };
              rowHandle();
            }else{
              defaultPage.Public.tips({type:1,content:data.msg || '服务端响应错误！'})
              return;
            }
          });
        }else{
          rowHandle();
        }
        function rowHandle(){
          //根据sku和仓库分组
          for (var i = 0; i < serNumList.length; i++) {
            var _sernum = serNumList[i];
            if(isCreate && !$.isEmptyObject(oldData.storageInfo)){
              //新增的时候检查，不新增分录
              //如果已经指定的仓库,序列号全部入到当前仓库
              var locationId = oldData.storageInfo.id || 0;
            }else{
              if(_sernum.locationId > 0 || _sernum.locationId == 0){
                var locationId = _sernum.locationId;
              }else{
                var locationId = -1;
              }
              // var locationId = _sernum.locationId || -1;
            }
            if(isCreate && !$.isEmptyObject(oldData.skuInfo)){
              //新增的时候检查，不新增分录
              //如果已经指定的sku,序列号全部入到当前sku
              var skuId = oldData.skuInfo.id || 0;
            }else{
              if(_sernum.skuId > 0 || _sernum.skuId == 0){
                var skuId = _sernum.skuId;
              }else{
                var skuId = -1;
              }
              // var skuId = _sernum.skuId || -1;
            }
            storageList[locationId + '_' + skuId] = storageList[locationId + '_' + skuId] || [];
            storageList[locationId + '_' + skuId].push(_sernum);
          };
          for(item in storageList){
            if(typeof storageList[item] === 'function') continue;
            var serNums = storageList[item];
            var addId = curID || THISPAGE.newId;
            if(curID) {
              //$('#'+curID).data('goodsInfo', null).data('storageInfo',null).data('unitInfo',null);
              var su = $grid.jqGrid('setRowData', Number(curID), {});
            } else {
              var su = $grid.jqGrid('addRowData', Number(THISPAGE.newId), {}, 'last');
              THISPAGE.newId++;
            };  
            var rowData = $grid.jqGrid('getRowData',curID);
            var tempRowData = $.extend(true, {}, goodsInfo);//克隆对象，不然会污染combo的数据
            var unitInfo = $('#' + THISPAGE.curID).data('unitInfo'); // 返回的数据带有多个仓库的序列号时，复制第一条商品的单位信息
            // if(tempRowData.goods){
            //   delete tempRowData.goods;
            // } ////PROJECT-26200 -- 不能这样改，会引起PROJECT-33001，在对应的单据业务页面，对已录入的数据保留，不带入系统默认设置的数据 20170627 by wsx
            // tempRowData.goods = goodsInfo.number + ' ' + goodsInfo.name + (goodsInfo.spec ? '_' + goodsInfo.spec: '');
            if (curID !== THISPAGE.curID) {
              tempRowData.goods = goodsInfo.number + ' ' + goodsInfo.name + (goodsInfo.spec ? '_' + goodsInfo.spec: '')
            } else {
              delete tempRowData.goods;
            }
            tempRowData.qty = serNums.length;
            tempRowData.serNumList = serNums;
            
            //计算金额和税率start
            /*当选择的序列号存在于多个仓库时，需要复制第一条的商品信息，此处对rowData取的数据做兼容
            如rowData数据不为空，那么该条数据已录入过，则取rowData的数据，
            如rowData的数据为空，那么该条数据为从上一条复制的，还未写入行数据中，则取tempRowData中的数据，防止为空造成计算失败*/
            if(tempRowData.qty >0 && (rowData.goods || tempRowData.goods)){
              var _qty = parseFloat(tempRowData.qty);
              var _price = parseFloat(rowData.price || tempRowData.price);
              var _discountRate = parseFloat(rowData.discountRate || tempRowData.discountRate);
              if($.isNumeric(_price)) {
                if($.isNumeric(_discountRate)) {
                  tempRowData.deduction = _qty * _price * _discountRate / 100;//重新计算折扣额会导致PROJECT-15589
                  tempRowData.amount = _qty * _price - tempRowData.deduction;
                } else {
                  tempRowData.amount = _qty * _price;
                };
              };
              //tempRowData.amount = rowData.price * tempRowData.qty;
              var amount = Number(tempRowData.amount);
              if(defaultPage.SYSTEM.taxRequiredCheck) {
                var taxRate = rowData.taxRate || tempRowData.taxRate;
                var tax = amount * taxRate / 100;
                var taxAmount = amount + tax;
                tempRowData.tax = tax;
                tempRowData.taxAmount = taxAmount;
              };
            }
            //计算金额和税率end
            if(!isCreate){
              tempRowData.locationId = serNums[0].locationId;
              tempRowData.locationName = serNums[0].locationName;
              tempRowData.skuName = serNums[0].skuName;
              tempRowData.skuId = serNums[0].skuId;
            }else{
              tempRowData.locationId = oldData.storageInfo.id;
              tempRowData.locationName = oldData.storageInfo.name;
              tempRowData.skuName = oldData.skuInfo.name;
              tempRowData.skuId = oldData.skuInfo.id;
            }
            if(typeof opts.beforeSet === 'function'){
              opts.beforeSet(tempRowData);
            }
            if(su){
              $('#' + addId).data('goodsInfo',tempRowData)
              .data('storageInfo', { 
                id: tempRowData.locationId, 
                name: tempRowData.locationName
              }).data('unitInfo',{
                unitId: tempRowData.unitId,
                name: tempRowData.unitName
              }).data('skuInfo',{
                name:tempRowData.skuName,
                id: tempRowData.skuId
              });
            }
            $grid.jqGrid('setRowData', addId, tempRowData);
            $('#'+addId).find('.red').removeClass('red');//保存成功即是正确的数据，去除红色提示
            if(serNumUsedList){
              //有使用过的说明是修改状态
            }else{
              curRow && curRow++;
            }
            var $_nextTr = $('#' + curID).next();
            if($_nextTr.length > 0) {
              curID = $('#' + curID).next().attr('id');
            } else {
              curID = '';
            };
            if(curID === '') {
              if($grid[0].id === 'fixedGrid'){
                //组装拆卸单的特殊处理,不需要新增一行
                win.close();
                return;
              }
              $grid.jqGrid('addRowData', THISPAGE.newId, {}, 'last');
              THISPAGE.newId = THISPAGE.newId + 1;
            };
            THISPAGE.calTotal();  
            /*if(serNumUsedList){
              //有使用过的说明是修改状态 
              setTimeout( function() { $grid.jqGrid("nextCell") }, 10);
            }else{
              setTimeout( function() { $grid.jqGrid("editCell", curRow, 2, true) }, 10);
            }*/
          }
          typeof opts.afterSelected === 'function' && opts.afterSelected(); 
          win.close();
        }
      }
    },
    init:function(){
    },
    lock: true,
    ok:false,
    focus:false,//很奇葩，不设置这个按回车会触发该控件上close按钮的click事件~~~
    /*cancel:function(){
      $('#' + THISPAGE.curID).data('goodsInfo',oldData.goodsInfo)
      .data('storageInfo', { 
        id: oldData.storageInfo.id, 
        name: oldData.storageInfo.name
      }).data('unitInfo',{
        unitId: oldData.unitInfo.unitId,
        name: oldData.unitInfo.name
      });
    },*/
    esc:false,//插件的BUG，在自定义按钮之后，esc不触发cancel事件, 需要设定cancelVal="cancel",才能找到cancel方法，看源码
    //cancelVal:'cancel',
    cancel:function(){
      //console.log(111)
      $grid.jqGrid("saveCells");
    }
  };
  if(!isCreate && !isQty && (!serNumUsedList || (enableSku || enableStorage))){
    //出库,非数量列,没有选序列号或者要更换仓库或者属性的时候 
    params.title = '选择【'+goodsInfo.name+'】的序列号',
    params.content = 'url:/settings/serNumList.jsp';
    params.button = [{name: '确认',defClass:'ui_state_highlight', callback: function () {
              this.content.serNumCallback();
              //this.close();
                  return false;
            }}];
    params.width = 800;
    params.height = 460;
    params.data.enableStorage = true;
    params.data.enableSku = true;
  }
  if(view){
    //查询模式
    params.cancel = true;
    params.cancelVal = '关闭';
    params.ok = false;
  }
  $grid.jqGrid("saveCells");
  $.dialog(params);
}
/**
 * isSkuSingle 可以为回调的执行函数
 */
Business.billSkuManage = function(parentTr , data, isSkuSingle){
  var $grid = parentTr.closest('table');
  var defaultPage = Public.getDefaultPage();
  $grid.jqGrid("restoreCell", curRow, curCol);
  // parentTr.data('goodsInfo', null);
  $.dialog({
    width: 470,
    height: 410,
    title: '选择【'+data.name+'】的属性',
    content: 'url:http://'+Public.getHostName()+'/settings/assistingProp-batch.jsp',
    data: {
      //skey:_self.skey,
      isSingle : isSkuSingle,
      skuClassId:data.skuClassId,
      invId: data.id,
      invNumber: data.number,
      skuCombo:THISPAGE.skuCombo,
      goodsInfo:data,
      callback: function(goodsPropList,win){
        var curID = THISPAGE.curID;
        $grid.jqGrid("restoreCell", curRow, curCol);
        if(isSkuSingle){
          var tempData = goodsPropList[0];
          var addId = curID;
          var tempRowData = $.extend(true, {}, data);//克隆对象，不然会污染combo的数据
          if(typeof isSkuSingle === 'function'){
            isSkuSingle(addId,tempRowData,tempData);
          }else{
            tempRowData.qty = tempData.qty;
            tempRowData.skuName = tempData.skuName;
            tempRowData.skuId = tempData.skuId;
            var skuInfo = $('#' + addId).data('skuInfo') ||{};
            $('#' + addId).data('goodsInfo',tempRowData)
            /*.data('storageInfo', { 
              id: tempRowData.locationId, 
              name: tempRowData.locationName
            })
            .data('unitInfo',{
              unitId: tempRowData.unitId,
              name: tempRowData.unitName
            })*/
            .data('skuInfo',{
              id: tempRowData.skuId,
              name: tempRowData.skuName
            });
            var goodsData = $.extend(true, {}, tempRowData);
            delete goodsData.id;
            if(tempRowData.skuId != skuInfo.id){
              goodsData.srcOrderNo = '';
              goodsData.srcOrderEntryId = '';
              goodsData.srcOrderId = '';
            }
            $grid.jqGrid('setRowData', addId, goodsData); 
          }         
        }else{
          for(var i = 0 ,len = goodsPropList.length; i<len; i++){
            if(i !== 0){
              //判断下一行是否有数据
              curID = (function(curID){
                var $_curRow = $('#' + curID);
                var _nextRow = Number($_curRow.attr('id')) + 1;
                var $_nextTr = $('#'+_nextRow);
                if($_nextTr.length == 0) {
                  $("#grid").jqGrid('addRowData', THISPAGE.newId, {}, 'after', curID);
                  THISPAGE.newId++;
                  return $('#'+(THISPAGE.newId-1)).attr('id');
                }
                if($_nextTr.data('goodsInfo')){
                  return arguments.callee(_nextRow);
                }else{
                  curID = _nextRow;
                  return curID;
                }
              })(THISPAGE.curID);
            }
            
            var addId = curID || THISPAGE.newId;
            var $thisRow = $('#' + addId);
            var tempData = goodsPropList[i];
            var skuInfo = $('#' + addId).data('skuInfo') ||{};
            if(curID) {
              // $('#'+curID).data('goodsInfo', null).data('storageInfo',null).data('unitInfo',null);
              var su = $grid.jqGrid('setRowData', Number(curID), {});
            } else {
              var su = $grid.jqGrid('addRowData', Number(THISPAGE.newId), {}, 'last');
              THISPAGE.newId++;
            };
            var tempRowData = $.extend(true, {}, data);//克隆对象，不然会污染combo的数据
            tempRowData.goods = data.number + ' ' + data.name + (data.spec ? '_' + data.spec: '');
            tempRowData.qty = tempData.qty;
            tempRowData.skuName = tempData.skuName;
            tempRowData.skuId = tempData.skuId;
            if(tempRowData.qty>0){
              var _qty = parseFloat(tempData.qty);
              var _price = parseFloat(tempRowData.price);
              var _discountRate = parseFloat(tempRowData.discountRate);
              if($.isNumeric(_price)) {
                if($.isNumeric(_discountRate)) {
                  tempRowData.deduction =  _qty * _price * _discountRate / 100;//重新计算折扣额会导致PROJECT-15589
                  tempRowData.amount = _qty * _price - tempRowData.deduction;
                } else {
                  tempRowData.amount = _qty * _price;
                };
              };
              var amount = Number(tempRowData.amount);
              if(defaultPage.SYSTEM.taxRequiredCheck) {
                var taxRate = tempRowData.taxRate;
                var tax = amount * taxRate / 100;
                var taxAmount = amount + tax;
                tempRowData.tax = tax;
                tempRowData.taxAmount = taxAmount;
              };
            }
            if(su){
              $('#' + addId)
              .data('goodsInfo',tempRowData)
              .data('skuInfo',{
                id: tempRowData.skuId,
                name: tempRowData.skuName
              });
              !$('#' + addId).data('storageInfo') && $('#' + addId).data('storageInfo', { 
                id: tempRowData.locationId, 
                name: tempRowData.locationName
              });
              !$('#' + addId).data('unitInfo') && $('#' + addId).data('unitInfo',{
                unitId: tempRowData.unitId,
                name: tempRowData.unitName
              });
            }
            if(tempRowData.skuId != skuInfo.id){
              tempRowData.srcOrderNo = '';
              tempRowData.srcOrderEntryId = '';
              tempRowData.srcOrderId = '';
            }
            $grid.jqGrid('setRowData', addId, tempRowData);
            curRow && curRow++;
            var $_nextTr = $('#' + curID).next();
            if($_nextTr.length > 0) {
              curID = $('#' + curID).next().attr('id');
            } else {
              curID = '';
            };
            if($grid[0].id === 'fixedGrid'){
              //组装拆卸单的特殊处理,只要处理第一条
              break;
            }
          }
          if(curID === '') {
            if($grid[0].id === 'fixedGrid'){
              //组装拆卸单的特殊处理,不需要新增一行
              win.close();
              return;
            }
            $grid.jqGrid('addRowData', THISPAGE.newId, {}, 'last');
            THISPAGE.newId = THISPAGE.newId + 1;
          };
          THISPAGE.calTotal();  
          // setTimeout( function() { $grid.jqGrid("editCell", curRow, 2, true) }, 10);
        }
        win.close();
      }
    },
    init:function(){
      //_self.skey = '';
      // $grid.jqGrid("editCell", curRow, 2, true);
    },
    close:function(){
      //console.log(123)
    },
    lock: true,
    ok:false,
    focus:false,//很奇葩，不设置这个按回车会触发该控件上close按钮的click事件~~~
    cancle:false
  });
}
Business.billGoodsCombo = function($_obj, opts , isSkuSingle){
  var defaultPage = Public.getDefaultPage();
  opts = $.extend(true, {
    // autoSelectFirst:false//变来变去的。。。
    data: function(){
      if(SYSTEM.goodsInfo) {
        var usingData = []//获取启用状态的;
        for (var i = 0; i <  SYSTEM.goodsInfo.length; i++) {
          var g = SYSTEM.goodsInfo[i];
          if(!g['delete']){
            usingData.push(g);
          }
        };
        return usingData;
      } else {
        return '/basedata/inventory.do?action=listCache';
      }
    },
    forGoodsCombo: true
  }, opts);
  opts.callback = {
      onChange : function(data){
        var _self = this;
        _self.addQuery = true;
        var defaultPage = Public.getDefaultPage();
        var SYSTEM = defaultPage.SYSTEM;
        var parentTr = this.input.parents('tr');
        var $thisTd = this.input.closest('td');
        var $grid = parentTr.closest('table');
        var goodsInfo = parentTr.data('goodsInfo')||{};
        opts.userData = opts.userData || {};
        if(data) {
          if(data.id != goodsInfo.id){
            //如果有商品信息
            delete data.amount;//商品的amount标示的是期初总额，这个字段没用
            /*if(!opts.disSerNum  && SYSTEM.ISSERNUM && data.isSerNum){
              //如果启用序列号
              parentTr.find('td:gt('+$thisTd.index()+')').html('');
              Business.serNumManage({
                row : parentTr,
                data : data,
                creatable : opts.userData.creatable,
                beforeSet : opts.userData.beforeSet
              });
            }
            else{
              parentTr.data('goodsInfo', data);
              parentTr.data('storageInfo', { id: data.locationId, name: data.locationName});
              parentTr.data('unitInfo', { unitId: data.unitId, name: data.unitName});
            }*/
            parentTr.data('goodsInfo', data);
            parentTr.data('storageInfo', { id: data.locationId, name: data.locationName});
            if(data.purUnitId && opts.userData.billType == 'purchase'){
              data.unitId = data.purUnitId;
              data.unitName = data.purUnitName;
            }
            if(data.saleUnitId && opts.userData.billType == 'sales'){
              data.unitId = data.saleUnitId;
              data.unitName = data.saleUnitName;
            }
            parentTr.data('unitInfo', { unitId: data.unitId, name: data.unitName});
            parentTr.data('skuInfo',null);
          }else{
            //no changes
          }
        }else{
          parentTr.data('goodsInfo', null);
          parentTr.data('storageInfo',null);
          parentTr.data('unitInfo',null);
          parentTr.data('skuInfo',null);
        }
      },
  };
  return Business.goodsCombo($_obj, opts);
}
Business.billListGoodsCombo = function($_obj, opts , isSkuSingle){  //非表格形式的商品下拉框
  var defaultPage = Public.getDefaultPage();
  opts = $.extend(true, {
    // autoSelectFirst:false//变来变去的。。。
    data: function(){
      if(SYSTEM.goodsInfo) {
        var usingData = []//获取启用状态的;
        for (var i = 0; i <  SYSTEM.goodsInfo.length; i++) {
          var g = SYSTEM.goodsInfo[i];
          if(!g['delete']){
            usingData.push(g);
          }
        };
        return usingData;
      } else {
        return '/basedata/inventory.do?action=listCache';
      }
    }
  }, opts);
  opts.callback = {
      onChange : function(data){
        var _self = this;
        _self.addQuery = true;
        var defaultPage = Public.getDefaultPage();
        var SYSTEM = defaultPage.SYSTEM;
        var parentTr = this.input.parents('tr');
        var $thisTd = this.input.closest('td');
        var $grid = parentTr.closest('table');
        var goodsInfo = parentTr.data('goodsInfo')||{};
        opts.userData = opts.userData || {};
        if(data) {
          if(data.id != goodsInfo.id){
            //如果有商品信息
            delete data.amount;//商品的amount标示的是期初总额，这个字段没用
            parentTr.data('goodsInfo', data);
            parentTr.data('storageInfo', { id: data.locationId, name: data.locationName});
            parentTr.data('unitInfo', { unitId: data.unitId, name: data.unitName});
            parentTr.data('skuInfo',null);
          }else{
            //no changes
          }
        }else{
          parentTr.data('goodsInfo', null);
          parentTr.data('storageInfo',null);
          parentTr.data('unitInfo',null);
          parentTr.data('skuInfo',null);
        }
      }/*,
      forGoodsCombo: true*/
  };
  return Business.goodsCombo($_obj, opts);
}
Business.goodsCombo = function($_obj, opts){
  var defaultPage = Public.getDefaultPage();
  if ($_obj.length == 0) { return };
  var opts = $.extend(true, {
    data: function(){
      // if(defaultPage.SYSTEM.goodsInfo) {
        return defaultPage.SYSTEM.goodsInfo || [];
      // } else {
        // return '/basedata/inventory.do?action=listCache';
      // }
    },
    ajaxOptions: {
      formatData: function(data){
        defaultPage.SYSTEM.goodsInfo = data.data.rows;  //更新
        return data.data.rows;
      } 
    },
    formatText: function(data){
      return Business.formatGoodsName(data);
    },
    value: 'id',
    defaultSelected: -1,
    editable: true,
    extraListHtml: '<a href="javascript:void(0);" class="quick-add-link quickAddGoods"><i class="ui-icon-add"></i>新增商品</a>',// /PROJECT-20667
    maxListWidth: 500,
    cache: false,
    forceSelection: true,
    trigger: false,
    listHeight: 182,
    listWrapCls: 'ui-droplist-wrap',
    customMatch:function(item,query){
      var reg = new RegExp(query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'i');
      var text = item.text + (item.rawData.pinYin || '');
      if(text.search(reg) == -1){

            var invSkus_=item.rawData.invSkus;

            if(invSkus_){ 
                 if(invSkus_.length>0){ 

                  var bool_arr=[];

                  for(var i = 0; i < invSkus_.length; i++){
                    var invSkus_text=(invSkus_[i].skuNumber || '')+(invSkus_[i].skuBarCode || '');

                    if(invSkus_text.search(reg) == -1){
                      bool_arr.push("F");
                    }else{
                          bool_arr.push("T");
                    }
          }

                   if($.inArray("T", bool_arr)==-1){return false;}
                   }else{
                    return false;
                  }
        }
        };

      return true;
    },
    callback: {
      onChange: function(data){
        var _self = this;
        _self.addQuery = true;
        var parentTr = this.input.parents('tr');
        var goodsInfo = parentTr.data('goodsInfo')||{};
        if(data) {
          if(data.id != goodsInfo.id){
            parentTr.data('goodsInfo', data);
            parentTr.data('storageInfo', { id: data.locationId, name: data.locationName});
            parentTr.data('unitInfo', { unitId: data.unitId, name: data.unitName});
          }
        }else{
          parentTr.data('goodsInfo', null);
          parentTr.data('storageInfo',null);
          parentTr.data('unitInfo',null);
        }
      },
      // incrementalSearch: function(pos, callback){
      //  var _self = this;
      //  var query = $_obj.val()
      //  Public.ajaxGet('/basedata/inventory.do?action=list', { rows: 20, skey: query }, function(data){
      //    if(data.status === 200 || data.status === 250) {
      //      //SYSTEM.goodsInfo.push(data.data.rows);        
      //      _self.rawData = _self.addData = data.data.rows; 
      //      if(data.data.rows.length < _self.opts.maxFilter) {
      //        _self.addQuery = false;
      //      } else {
      //        _self.addQuery = true;
      //      };
      //      callback.call(_self);
      //      var addId = [];
      //      $.each(data.data.rows, function(i, n){
      //        addId.push(n.id); 
      //      });
      //      $.each(pos, function(i, n){
      //        if($.inArray(n.value, addId) !== -1) {
      //          if(i === 0) {
      //            defaultPage.SYSTEM.goodsInfo.splice(i, 1);
      //          } else {
      //            defaultPage.SYSTEM.goodsInfo.splice(i - 1, 1);
      //          };
      //        };  
      //      });
      //      $.merge(defaultPage.SYSTEM.goodsInfo, data.data.rows);
      //      var goodsInfo = defaultPage.SYSTEM.goodsInfo;
      //      if(goodsInfo.length > 100) {
      //        goodsInfo.splice(0, goodsInfo.length - 100);
      //      }
      //    };
      //  });
      // },
      onListClick: function(){

      },

      onEnter:function(){
        setTimeout(function(){
          if(goodsCombo.isExpanded){
            goodsCombo.collapse();
          }
        },50)
      }
    },
    forceSelection : false,
    queryDelay: 0,
    inputCls: 'edit_subject',
    wrapCls: 'edit_subject_wrap',
    focusCls: '',
    disabledCls: '',
    activeCls: ''
  }, opts);
  
  var goodsCombo = $_obj.combo(opts).getCombo();
  
  //新增商品
  $('.quickAddGoods').on('click', function(e){
    e.preventDefault();
    if (!Business.verifyRight('INVENTORY_ADD')) {
      return ;
    };
    var _w = 1260,
    _h = defaultPage.SYSTEM.enableStorage?790:690;
    _h = defaultPage.SYSTEM.enableAssistingProp?_h:_h-100;
    _h = defaultPage.SYSTEM.ISSERNUM?_h + 40:_h;
    $.dialog({
      title : '新增商品',
      content : 'url:/settings/goods-manage.jsp',
      data: {oper: 'add', callback: function(data, oper, dialogWin){
        var goodID = data.id;
        //_self.goodsCombo.getAllRawData().push(data);
        defaultPage.SYSTEM.goodsInfo.push(data);
        data.unitId = data.unitId || data.baseUnitId;
        dialogWin && dialogWin.api.close();
        //var allRawData = _self.goodsCombo.getAllRawData();
        goodsCombo.loadData(defaultPage.SYSTEM.goodsInfo, '-1', false);
        setTimeout( function() {
           //$("#grid").jqGrid("editCell", editRow, 2, true)
           goodsCombo.selectByValue(goodID, true);
           $_obj.focus();
        }, 10);
        
      }},
      width : _w,
      height : _h,
      max : false,
      min : false,
      cache : false,
      lock: true
    });
  });
  return goodsCombo;
};
Business.categoryCombo = function($_obj, opts, type){
  if ($_obj.length == 0) { return };
  var typeNumber = type||'';
  if(typeof opts != 'object'){
    typeNumber = opts;
    opts = {};
  }
  if(!typeNumber) { return };
  var defaultPage = Public.getDefaultPage();
  var opts = $.extend(true, {
    data: function(){
      if(defaultPage.SYSTEM.categoryInfo && defaultPage.SYSTEM.categoryInfo[typeNumber]) {
        return defaultPage.SYSTEM.categoryInfo[typeNumber];
      } else {
        return '../basedata/assist.do?action=list&isDelete=2&typeNumber='+typeNumber;
      }
    },
    ajaxOptions: {
      formatData: function(data){
        defaultPage.SYSTEM.categoryInfo = defaultPage.SYSTEM.categoryInfo ||{};
        defaultPage.SYSTEM.categoryInfo[typeNumber] = data.data.items;  //更新
        return data.data.items;
      } 
    },
    text: 'name',
    value: 'id',
    defaultSelected: -1,
    editable: true,
    extraListHtml: '<a href="javascript:void(0);" id="quickAddCategory" class="quick-add-link"><i class="ui-icon-add"></i>新增类别</a>',
    maxListWidth: 500,
    cache: false,
    forceSelection: true,
    // maxFilter: 10,
    trigger: false,
    callback: {
      onChange: function(data){
        var parentTr = this.input.parents('tr');
        if(data) {
          parentTr.data('categoryInfo', data);
        }
      },
      onListClick: function(){

      }
    },
    queryDelay: 0
  }, opts);
  
  var categoryCombo = $_obj.combo(opts).getCombo();
  var rights = {
      'customertype' : 'BUTYPE_ADD',// '客户',
      'supplytype' : 'SUPPLYTYPE_ADD',// '供应商',
      'trade' : 'TRADETYPE_ADD'// '商品'
    };
  //新增分类
  $('#quickAddCategory').on('click', function(e){
    e.preventDefault();
    if (rights[typeNumber] && !Business.verifyRight(rights[typeNumber])) {
      return ;
    };
    var callback=function(data,dialogWin){
      categoryCombo.loadData(function(){return defaultPage.SYSTEM.categoryInfo[typeNumber]}, '-1', false);
      dialogWin.close();
      setTimeout( function() {
        categoryCombo.selectByValue(data.id, true);
        $_obj.focus();
      }, 10);
    };
    Public.categoryPop(typeNumber,window.parent,callback);
  });
  return categoryCombo;
};
Business.forSearch = function(rowid, gridId){
  var goodsInfo = $('#' + rowid).data('goodsInfo')
  var rowData = $('#grid').jqGrid('getRowData', rowid)
  if (goodsInfo) var id = goodsInfo.id
  if (!id && rowData) var id = rowData.invId
  if(id) {
    $.dialog({
      width: 470,
      height: 410,
      title: '商品库存查询',
      content: 'url:/inventory.jsp',
      data: { rowid: rowid, gridId: gridId},
      cancel: true,
      lock: true,
      ok: function() {
        this.content.callback()
      },
      okVal: '确认',
      cancelVal: '关闭'
    });
    //goodsCombo.removeSelected(false);
  } else {
    parent.Public.tips({type: 2, content : '请先选择一个商品！'});
  };
};
Business.billStorageCombo = function($_obj, opts){
  var defaultPage = Public.getDefaultPage();
  opts = $.extend(true, {
    data: function(){
      if(defaultPage.SYSTEM.storageInfo) {
        var usingData = []//获取启用状态的;
        for (var i = 0; i < defaultPage.SYSTEM.storageInfo.length; i++) {
          var g = defaultPage.SYSTEM.storageInfo[i];
          if(!g['delete']){
            usingData.push(g);
          }
        };
        return usingData;
      } else {
        return '/basedata/invlocation.do?action=list&isDelete=2';
      }
    }
  }, opts);
  return Business.storageCombo($_obj, opts);
}
Business.storageCombo = function($_obj, opts){
  var defaultPage = Public.getDefaultPage();
  if ($_obj.length == 0) { return };
  var opts = $.extend(true, {
      //data: parent.SYSTEM.storageInfo/*'/basedata/invlocation.do?action=list&isEnable=1'*/,
      data: function(){
        return defaultPage.SYSTEM.storageInfo;
      },
      /*ajaxOptions: {
        formatData: function(data){
          return data.data.items;
        } 
      },*/
      text: 'name',
      value: 'id',
      defaultSelected: 0,
      cache: false,
      editable: true,
      trigger: false,
      defaultFlag: false,
      callback: {
        onChange: function(data){
          var parentTr = this.input.parents('tr');
          //var storageInfo = parentTr.data('storageInfo');
          //console.log(parentTr.data('storageInfo'))
          /*if(!storageInfo) {
            storageInfo = {};
          };*/
          if(data) {
            parentTr.data('storageInfo', {id: data.id, name: data.name});
            //storageInfo.id = data.id;
            //storageInfo.name = data.name;
          }
        }
      }
    }, opts);
  
  var storageCombo = $_obj.combo(opts).getCombo();
  return storageCombo;
};

Business.billskuCombo = function($_obj, opts){
  var defaultPage = Public.getDefaultPage();
  opts = $.extend(true, {
    data: function(){
      if(!this.input) return [];
      var parentTr = this.input.closest('tr');
      var goodsInfo = parentTr.data('goodsInfo');
      if(!goodsInfo)return;
      return goodsInfo.invSkus || [];
    },
    callback: {
      onChange: function(data){
        if(data){
          var parentTr = this.input.closest('tr');
          var goodsInfo = parentTr.data('goodsInfo');
          if(!goodsInfo)return;
          parentTr.data('skuInfo',{
            name:data.skuName,
            id: data.skuId
          });
        }else{
          
        }
      }
    }
  }, opts);
  return Business.skuCombo($_obj, opts);
}
Business.skuCombo = function($_obj, opts){
  var defaultPage = Public.getDefaultPage();
  if ($_obj.length == 0) { return };
  var $extraListHtml = $('<a href="javascript:void(0);" id="quickAddSku" class="quick-add-link quickAddSku"><i class="ui-icon-add"></i>新增辅助属性</a>');
  var opts = $.extend(true, {
      data: function(){
        return defaultPage.SYSTEM.skuInfo || [];
      },
      text: 'skuName',
      value: 'skuId',
      defaultSelected: 0,
      cache: false,
      editable: true,
      trigger: false,
      defaultFlag: false,
      extraListHtml: $extraListHtml,
      callback: {
        onChange: function(data){
          
        }
      }
    }, opts);
  var skuCombo = $_obj.combo(opts).getCombo();
  //添加属性
  $extraListHtml.on('click', function(e){
    e.preventDefault();
    if (!Business.verifyRight('FZSX_ADD')) {
      return ;
    };
    var good = $('#' + THISPAGE.curID).data('goodsInfo');
    if(!SYSTEM.enableAssistingProp)return;
      if(!good){
        return;
      }else{
        if(good.skuId || good.skuClassId){
          $.dialog({
            title : '新增辅助属性',
            content: 'url:/settings/assistingPropGroupManage.jsp',
            data: {
              invId: good.id,
              invNumber: good.number,
              skuId : good.skuId,
              skuClassId:good.skuClassId,
              callback: function(data,win){
                if(data) {
                  $('#' + THISPAGE.curID).data('goodsInfo').invSkus.push(data);
                  skuCombo.loadData($('#' + THISPAGE.curID).data('goodsInfo').invSkus);
                  $_obj.val(data.skuName);  //回填数据
                  $('#' + THISPAGE.curID).data('skuInfo',{
                    name:data.skuName,
                    id: data.skuId
                  });
                  skuCombo.collapse();  //关闭下拉
                }               
                // win && win.close();
              }
            },
            width : 400,
            height : 180,
            max : false,
            min : false,
            cache : false,
            lock: true
          });         
        }
      }
  });
  return skuCombo;
};
Business.batchCombo = function($_obj, opts){
  var defaultPage = Public.getDefaultPage();
  if ($_obj.length == 0) { return };
  var opts = $.extend(true, {
      data: function(){
        return defaultPage.SYSTEM.batchInfo;
      },
      text: 'name',
      value: 'id',
      defaultSelected: 0,
      cache: false,
      editable: true,
      trigger: false,
      defaultFlag: false,
      forceSelection:false,
      callback: {
        onChange: function(data){
        }
      }
    }, opts);
  
  var batchCombo = $_obj.combo(opts).getCombo();
  return batchCombo;
};

// 销售排行表的排序方式 
Business.saleRankCatorageCombo = function($_obj, opts){
  var defaultPage = Public.getDefaultPage();
  if ($_obj.length == 0) { return };
  var opts = $.extend(true, {
      data: [{id: 0, name: '按客户',value:'0'}, {id:1, name: '按商品',value:'1'}],
      text: 'name',
      value: 'id',
      defaultSelected: 0,
      cache: false,
      editable: true,
      trigger: false,
      defaultFlag: false,
      forceSelection:false,
      callback: {
        onChange: function(data){
        }
      }
    }, opts);
  
  var saleRankCatorageCombo = $_obj.combo(opts).getCombo();
  return saleRankCatorageCombo;
};

// 权限设置套用其他同事权限
Business.otherUserAuthorityCombo = function($_obj, opts){
  var defaultPage = Public.getDefaultPage();
  if ($_obj.length == 0) { return };
  var opts = $.extend(true, {
      data: [{id: 0, name: '按客户',value:'0'}, {id:1, name: '按商品',value:'1'}],
      text: 'name',
      value: 'id',
      defaultSelected: -1,
      addOptions:{id:-1, text:'请选择同事'},
      cache: false,
      editable: true,
      trigger: false,
      defaultFlag: false,
      forceSelection:false,
      callback: {
        onChange: function(data){
        }
      }
    }, opts);
  
  var otherUserAuthorityCombo = $_obj.combo(opts).getCombo();
  return otherUserAuthorityCombo;
};


Business.unitCombo = function($_obj, opts){
  if ($_obj.length == 0) { return };
  var defaultPage = Public.getDefaultPage();
  var opts = $.extend(true, {
      //data: parent.SYSTEM.storageInfo/*'/basedata/invlocation.do?action=list&isEnable=1'*/,
      data: function(){
        return (defaultPage.SYSTEM || opts.userData.system).unitInfo;
      },
      /*ajaxOptions: {
        formatData: function(data){
          return data.data.items;
        } 
      },*/
      text: 'name',
      value: 'id',
      defaultSelected: 0,
      cache: false,
      editable: true,//这个会在grid.celledit.js里面的//edit 修复自定义编辑获取焦点 --arenp 这里导致页面一次录很多分录之后出现页面定位错误
      trigger: false,
      defaultFlag: false,
      forceSelection:false,
      callback: {
        onChange: function(data){
          var parentTr = this.input.parents('tr');
          //var storageInfo = parentTr.data('storageInfo');
          //console.log(parentTr.data('storageInfo'))
          /*if(!storageInfo) {
            storageInfo = {};
          };*/
          if(data) {
            data.id = data.id || data.unitId;
            parentTr.data('unitInfo', {unitId: data.id, name: data.name});
            //storageInfo.id = data.id;
            //storageInfo.name = data.name;
          }
        }
      }
    }, opts);
  
  var unitCombo = $_obj.combo(opts).getCombo();
  return unitCombo;
};
Business.accountCombo = function($_obj, opts){
  var getData = function(){
    if(SYSTEM.accountInfo) {
      return SYSTEM.accountInfo;
    } else {
      return '/basedata/settAcct.do?action=list';
    }
  };
  var defaultValueId = 0;
  var data = getData();
  for(var i = 0 ; i < data.length ; i++){
    if(data[i].isdefault == '1'){
      defaultValueId = data[i].id;
      break;
    }
  }
  
  if ($_obj.length == 0) { return ;};

  var opts = $.extend(true, {
    data: data,
    ajaxOptions: {
      formatData: function(data){
        SYSTEM.accountInfo = data.data.items; //更新
        return data.data.items;
      } 
    },
    formatText: function(data){
      return data.number + ' ' + data.name;
    },
    value: 'id',
    defaultSelected: ['id',defaultValueId],
    defaultFlag: false,
    cache: false,
    editable: true
  }, opts); 
  var accountCombo = $_obj.combo(opts).getCombo();
  return accountCombo;
};

Business.paymentCombo = function($_obj, opts){
  if ($_obj.length == 0) { return };

  var opts = $.extend(true, {
    data: function(){
      if(SYSTEM.paymentInfo) {
        return SYSTEM.paymentInfo;
      } else {
        return '/basedata/assist.do?action=list&typeNumber=PayMethod&isDelete=2';
      }
    },
    ajaxOptions: {
      formatData: function(data){
        SYSTEM.paymentInfo = data.data.items; //更新缓存
        return data.data.items;
      } 
    },
    emptyOptions: true,
    text: 'name',
    value: 'id',
    defaultSelected: 0,
    cache: false,
    editable: false,
    trigger: false,
    defaultFlag: false
    
  }, opts);
  var paymentCombo = $_obj.combo(opts).getCombo();  
  return paymentCombo;
};
/*
 * 网店下拉框
 */
Business.storeCombo = function($_obj, opts){
  if ($_obj.length == 0) { return };
  var defaultPage = Public.getDefaultPage();
  var SYSTEM = SYSTEM || defaultPage.SYSTEM || opts.system;
  var opts = $.extend(true, {
    data: function(){
      if(SYSTEM.storeInfo) {
        return SYSTEM.storeInfo;
      } else {
        return '/bs/cloudStore.do?action=list';
      }
    },
    ajaxOptions: {
      formatData: function(data){
        SYSTEM.storeInfo = data.data.items; //更新
        return data.data.items;
      } 
    },
    formatText: function(data){
      return data.name;
    },
    value: 'id',
    defaultSelected: 0,
    addOptions : {text : '(所有)',value : -1  },
    defaultFlag: false,
    cache: false,
    editable: true
  }, opts); 
  var storeCombo = $_obj.combo(opts).getCombo();
  return storeCombo;
};
  /*
  * 物流公司下拉框
  */
Business.logisticCombo = function($_obj, opts){
  if ($_obj.length == 0) { return };
  var defaultPage = Public.getDefaultPage();
  var SYSTEM = SYSTEM || defaultPage.SYSTEM || opts.system;
  var opts = $.extend(true, {
    data: function(){
      if(SYSTEM.logisticInfo) {
        return SYSTEM.logisticInfo;
      } else {
        return '/bs/express.do?action=list';
      }
    },
    ajaxOptions: {
      formatData: function(data){
        SYSTEM.logisticInfo = data.data.items;  //更新
        return data.data.items;
      } 
    },
    formatText: function(data){
      return data.number + ' ' + data.name;
    },
    value: 'id',
    defaultSelected: 0,
    addOptions : {text : '(空)',value : 0  },
    defaultFlag: false,
    cache: false,
    editable: true
  }, opts); 
  var logisticCombo = $_obj.combo(opts).getCombo();
  return logisticCombo;
};
// 批次弹出框
Business.showBatchDialog = function (THISPAGE, grid, type, row, isSingle) {
  var _self = THISPAGE;
  var goodsInfo = row.data('goodsInfo');
  var skuInfo = row.data('skuInfo');
  var rowid = row.attr('id');
  var _grid = '#grid';
  if (rowid == 'fix1') {
    rowid = 1; // 这个是拆卸单，组装单的第一个表。rile够
    _grid = '#fixedGrid';
  }
  var skuId = '';
  if (skuInfo) {
    skuId = skuInfo.id;
  }
  var storageInfo = row.data('storageInfo');
  $.dialog({
    width: 570,
    height: 500,
    title: '选择商品【'+ goodsInfo.number +' ' + goodsInfo.name +'】的批号',
    content: 'url:http://'+Public.getHostName()+'/settings/batch-batch.jsp',
    data: {
      isSingle: isSingle,
      skey:_self.skey,
      goodsInfo:goodsInfo,
      skuId:skuId,
      storageInfo:storageInfo,
      callback: function(batchList){
        if(!batchList)return;
        var rowId = row[0].id;
        function _updateGoodsInfo(){
          var goodsInfo = $('#' + rowId).data('goodsInfo');
          if(goodsInfo){
            var rowData = grid.jqGrid('getRowData',rowId);
            goodsInfo = $.extend(true,{},goodsInfo);
            goodsInfo.skuName = rowData.skuName;
            // goodsInfo.skuId = rowData.skuId;
            goodsInfo.mainUnit = rowData.mainUnit;
            goodsInfo.unitId = rowData.unitId;
            goodsInfo.qty = rowData.qty;
            goodsInfo.price = rowData.price;
            goodsInfo.salePrice = rowData.price;
            goodsInfo.customSetPrice = rowData.price;//客户手动修改的价格，在点击商品并不修改商品时使用，其他地方不要修改或重设，手贱勿动
            goodsInfo.taxPrice = rowData.taxPrice;
            goodsInfo.discountRate = rowData.discountRate;
            goodsInfo.deduction = rowData.deduction;
            goodsInfo.amount = rowData.amount;
            goodsInfo.taxRate = rowData.taxRate;
            goodsInfo.tax = rowData.tax;
            goodsInfo.taxAmount = rowData.taxAmount;
            goodsInfo.locationName = rowData.locationName;
            goodsInfo.locationId = rowData.locationId;
            $('#' + rowId).data('goodsInfo',goodsInfo);
          }
        }
        _updateGoodsInfo();
        var isfirst = true;
        var firstItem = grid.jqGrid('getRowData', rowId);
        var firstUnitInfo = $('#' + rowId).data('unitInfo');
        for (batchId in batchList){
          var batchData = batchList[batchId];
          if(batchId != 'function'){
            if(isfirst){
              storageInfo = {
                id: batchData.locationId, 
                name: batchData.locationName
              };
              var _rowData = {
                batch: batchData.batch,
                producer: batchData.producer,
                registrationNo: batchData.registrationNo,
                proLicense: batchData.proLicense,
                prodDate: batchData.prodDate,
                safeDays: goodsInfo.safeDays,
                id: batchData.invId,
                validDate: batchData.validDate,
                locationId: batchData.locationId, 
                locationName: batchData.locationName,
                outLocationId: batchData.locationId, //调拨单中使用
                outLocationName: batchData.locationName //调拨单中使用
              };
              grid.jqGrid('setRowData', rowId, _rowData);
              row.data('storageInfo',storageInfo);
              var _lastId = rowId;
              isfirst = false;
            }else{
              var nextId = (function(rowId){
                var $nextRow = $('#'+rowId).next();
                if($nextRow.length){
                  if($nextRow.data('goodsInfo')){
                    return arguments.callee($nextRow[0].id);
                  }else{
                    return $nextRow[0].id;
                  }
                }else{
                  var newId = Number(rowId) + 1;
                  grid.jqGrid('addRowData', newId, 'last');
                  grid.jqGrid('addRowData', newId + 1, {}, 'last');
                  _self.newId = newId +   2;
                  return newId;
                }
              })(rowId);
              var _rowData = $.extend(true, {}, firstItem );
              $.extend(true, _rowData, {
                batch: batchData.batch,
                id: batchData.invId,
                producer: batchData.producer,  //  产地
                registrationNo: batchData.registrationNo,
                proLicense: batchData.proLicense,
                prodDate: batchData.prodDate,
                safeDays: goodsInfo.safeDays,
                validDate: batchData.validDate,
                locationId: batchData.locationId, 
                locationName: batchData.locationName,
                outLocationId: batchData.locationId, //调拨单中使用
                outLocationName: batchData.locationName //调拨单中使用
              });
              grid.jqGrid('setRowData', nextId, _rowData);
            
              _lastId = nextId;
            }
            //有批次的
            if(_rowData.batch) _rowData.isWarranty = 1;
            $.extend(true, goodsInfo, _rowData)
            $('#'+_lastId).data('goodsInfo',goodsInfo)
            .data('storageInfo', { 
              id: _rowData.locationId, 
              name: _rowData.locationName
            }).data('unitInfo',firstUnitInfo);
          }
        }
        if(isSingle){
          //grid.jqGrid('editCellByColName', Number(_lastId) + 1, 'goods');
        }else{
          //跳转到下一行的商品选择。但是因为点了行+，行号不一定就是按顺序来的，而且人家都还没录入数量之类的就跳到下一行不好吧。所以注释掉
          // grid.jqGrid('editCellByColName', Number(_lastId) + 1, 'goods');
          _self.calTotal && _self.calTotal();
        }
      }
    },
    lock: true,
    button:[{name: '选中',defClass:'ui_state_highlight fl', callback: function () {
      this.content.callback(type);
      $(_grid).jqGrid('nextCell',rowid,'batch');
          return false;
    }},
    {name: '选中并关闭',defClass:'ui_state_highlight', callback: function () {
      this.content.callback(type);
      this.close();
      return false;
    }},
    {name: '关闭', callback: function () {
      return true;
    }}]
  });
};
Business.billsEvent = function(obj, type, flag){
  var _self = obj;
  var defaultPage = Public.getDefaultPage();
  // 删除行分录
  $('.grid-wrap').on('click', '.ui-icon-trash, .ui-icon-trashDel', function(e){
    _self.calTotal();
  });
  $(".goodsAuto").keydown(function(e) {
    // e.preventDefault;
    e.stopPropagation();
    if(e.keyCode == 46){
      if($('#grid tbody tr').length === 2) {
        parent.Public.tips({type: 2, content: '至少保留一条分录！'});
        return false;
      }
      var su = $(this).closest('tr').find(".ui-icon-trash, .ui-icon-trashDel").trigger('click');
      if(su) {
        _self.calTotal();
      };
    }
  });
  //查询库存
  $('.grid-wrap').on('click', '.ui-icon-cart', function(e){
    e.preventDefault();
    var goodsInfo = $(this).closest('tr').data('goodsInfo');
    if(!goodsInfo){
      parent.Public.tips({type: 2, content: '请先录入商品！'});
      return;
    }
    var gridId = $(this).closest('table').attr('id')
    var rowid = $(this).closest('tr').attr('id')
    if(curRow !== null && curCol !== null){
      $("#grid").jqGrid("saveCell", curRow, curCol);
    }
    
    // var row = $('#grid').jqGrid('getRowData', rowid);
    Business.forSearch(rowid, gridId);
    // var searchText = row.goods;
    // if (typeof(row.skuName) === "undefined" || row.skuName.length === 0 ) {
    //   Business.forSearch(goodsInfo.id, searchText);
    //   return;
    // } 
    // //有属性的商品查询
    // var invSkus = goodsInfo.invSkus;
    // var thisSkuId = -1;
    // for (var i = 0; i < invSkus.length; i++) {
    //   if(invSkus[i].skuName === row.skuName){
    //     thisSkuId = invSkus[i].skuId;
    //     break;
    //   }
    // }
    // if (thisSkuId !== -1) {
    //   searchText += " " + row.skuName;
    //   Business.forSearch(goodsInfo.id.toString(), searchText ,thisSkuId.toString());
    // }

  });

  //区分组装拆卸单
  if(type !== 'assemble') {
    //批量添加属性
    $('.grid-wrap').on('click', '.skuInfo .ui-icon-ellipsis', function(e){
      if(!SYSTEM.enableAssistingProp)return;
      var good = $('#' + THISPAGE.curID).data('goodsInfo');
      if(!good){
        return;
      }else{
        if(good.skuId || good.skuClassId){
          Business.billSkuManage($('#' + THISPAGE.curID),good);
        }
      }
    });
    //批量添加
    $('.grid-wrap').on('click', '.goods .ui-icon-ellipsis', function(e){
      var skuMult = false;var billType;
      if(!$(this).hasClass('disableSku')){
        skuMult = $(this).data('skuMult') || defaultPage.SYSTEM.enableAssistingProp;
      }
      if($(this).hasClass('sales'))billType = 'sales';
      if($(this).hasClass('purchase'))billType = 'purchase';
      self.skey = $(this).parent().find("input").val(); //将界面上的输入值带入
      $.dialog({
        width: 775,
        height: 510,
        title: '选择商品',
        content: 'url:http://'+Public.getHostName()+'/settings/goods-batch.jsp',
        data: {
          skuMult: skuMult,
          skey:_self.skey,
          billType:billType,
          callback: function(newId, curID, curRow, curCol){
            if(curID === '') {
              $("#grid").jqGrid('addRowData', newId, {}, 'last');
              _self.newId = newId + 1;
            };
            setTimeout( function() { $("#grid").jqGrid("editCell", curRow, curCol, true) }, 10);
            _self.calTotal();
          }
        },
        lock: true,
        button:[{name: '新增商品',defClass:'ui_state_highlight fl', callback: function () {
          // this.content.callback();
          var data = {oper: 'add'};
            parent.tab.addTabItem({
              tabid: "setting-goodsManage",
              text: "新增商品",
              url: "/settings/goods-manage.jsp?data=" + JSON.stringify(data)
            });
            return false;
        }},
        {name: '选中',defClass:'ui_state_highlight', callback: function () {
          this.content.callback();
              return false;
        }},
        {name: '选中并关闭',defClass:'ui_state_highlight', callback: function () {
          this.content.callback();
          this.close();
              return false;
        }},
        {name: '关闭', callback: function () {
              return true;
        }}]
      });
      $(this).data('hasInstance', true);
    });
    
    //取消分录编辑状态
    $(document).bind('click.cancel', function(e){
      if(!$(e.target).closest(".ui-jqgrid-bdiv").length > 0 && $(e.target).closest(".pika-single").length == 0 && curRow !== null && curCol !== null){
         $("#grid").jqGrid("saveCell", curRow, curCol);
         curRow = null;
         curCol = null;
      };
    });
  };  
  //批量添加批次
  $('.grid-wrap').on('click', '.batch .ui-icon-ellipsis', function(e){
    var _$this = $(this);
    var _$grid = _$this.closest('.ui-jqgrid-btable');
    var _$tr = _$this.closest('tr');
    var goodsInfo = _$tr.data('goodsInfo');
    var isSingle = _$this.closest('td').hasClass('isSingle');
    if(!goodsInfo){
      defaultPage.Public.tips({type:2, content:"请先选择一个商品！"});
      return;
    }
    Business.showBatchDialog(_self, _$grid, type, _$tr, isSingle);
    $(this).data('hasInstance', true);
  });

  initStorage();
  
  function initStorage() {
    var data = []//获取启用状态的;
    for (var i = 0; i < defaultPage.SYSTEM.storageInfo.length; i++) {
      var g = defaultPage.SYSTEM.storageInfo[i];
      if(!g['delete']){
        data.push(g);
      }
    };
    var list = '<ul>';
    for(var i = 0, len = data.length; i < data.length; i++) {
      list += '<li data-id="' + data[i].id + '" data-name="' + data[i].name + '" >' + data[i].locationNo + ' ' +data[i].name + '</li>';
    };
    list += '</ul>';
    $("#storageBox").html(list);
  };

  if(type === 'transfers') {
    return;
  };
  
  $("#batchStorage").powerFloat({
    eventType: "click",
    hoverHold: false,
    reverseSharp: true,
    target: function(){
      if(curRow !== null && curCol !== null){
         $("#grid").jqGrid("saveCell", curRow, curCol);
         curRow = null;
         curCol = null;
      };
      return $("#storageBox");
    }
  });

  $('.wrapper').on('click', '#storageBox li', function(e){
    var stoId = $(this).data('id');
    var stoName = $(this).data('name');
    var ids = $("#grid").jqGrid('getDataIDs');
    var batName = 'locationName';
    var batInfo = 'storageInfo';
    var urlParam = Public.urlParam();
    var purchaseBack = urlParam.transType == '150502';//购货退货单
    var sales = urlParam.transType == '150601';//销货单
    var out = urlParam.type == 'out'//其他出库单
    var zz = urlParam.type == 'zz';//组装单子件
    for(var i = 0, len = ids.length; i < len; i++){
      var id = ids[i], itemData;
      var row = $("#grid").jqGrid('getRowData',id);
      //var $_id = $('#' + id);
      var goodsInfo = $('#' + id).data('goodsInfo')
      if(row.goods === '' || goodsInfo === undefined) {
        continue; //跳过无效分录
      };
      var setData = {};
      setData[batName] = stoName;

      if(purchaseBack || sales || out || zz){//出库类单据更改仓库需清空序列号及数量重新录入
        if(goodsInfo.isSerNum && goodsInfo.isSerNum == 1 && stoName != goodsInfo.locationName){
          setData['qty'] = '';
        }
      }
      
      $("#grid").jqGrid('setRowData', id, setData);
      $('#' + id).data(batInfo, { id: stoId, name: stoName });
    };
    $.powerFloat.hide();
  });

  //批量折扣率
  initDiscountRate();

  function initDiscountRate() {
      var html='<p>批量填充折扣率</p>';
      html+=' <p><input type="text" style="width:100px;"/>% &nbsp&nbsp&nbsp&nbsp<input type="button" value="确定" style="float:right"/></p>'
      $("#discountRateBox").html(html);
  };

  $("#batch_discountRate").powerFloat({
    eventType: "click",
    hoverHold: false,
    reverseSharp: true,
    target: function(){
      if(curRow !== null && curCol !== null){
         $("#grid").jqGrid("saveCell", curRow, curCol);
         curRow = null;
         curCol = null;
      };
      return $("#discountRateBox");
    }
  });

  $('.wrapper').on('click', '#discountRateBox input[type=button]', function(e){
    // 目前只有销货单销货退货单的折扣权限限制
    if(type === 'sales'){
      if(flag === '150602'){
        if(!Business.verifyRight('SABACK_DISCOUNT')){
          return;
        }
      }
      if(flag === '150601'){
        if(!Business.verifyRight('SA_DISCOUNT')){
          return;
        }
      }
    }
    var txtVal = $(this).prev().val();
    if(txtVal>100 || txtVal<0){
      Public.tips({type: 2,content: "请输入0-100之间的有效数字！"});
      $.powerFloat.hide();
      return
    }
    var ids = $("#grid").jqGrid('getDataIDs');
    var batName = 'discountRate';

    for(var i = 0, len = ids.length; i < len; i++){
      var id = ids[i], itemData;
      var row = $("#grid").jqGrid('getRowData',id);
      var taxRate = parseFloat(row.taxRate);
      var $_id = $('#' + id);
      if(row.goods === '' || $_id.data('goodsInfo') === undefined) {
        continue; //跳过无效分录
      };

     var original = parseFloat(row.qty) * parseFloat(row.price);
      var deduction = original * txtVal / 100;

      //商品折扣
      var goodsDiscountRate=(100-txtVal)/10;

      //计算金额几兄弟
        var amount = original - deduction;
      // var amount = original - deduction;
      var tax = amount * taxRate / 100;                     //税额
      var taxAmount = Number(_toFixedTwo(amount)) + Number(_toFixedTwo(tax));       //价税合计
      var taxPrice = taxAmount / row.qty / (1 - txtVal / 100);                                        //含税单价
            if((taxAmount / row.qty)==0 &&(1 - txtVal / 100)==0){
        taxPrice=(original*(1+taxRate/100)/row.qty).toFixed(2);
      } 
      var setData = {};
      setData[batName] = txtVal;
      setData.goodsDiscountRate=goodsDiscountRate;
      setData.deduction=deduction;
      setData.amount=amount;
      setData.tax=tax;
      setData.taxAmount=taxAmount;
      setData.taxPrice=taxPrice;
      $("#grid").jqGrid('setRowData', id, setData);

      THISPAGE.calTotal();
    };
    $.powerFloat.hide();
  });
    //批量商品折扣
  initGoodsDiscountRate();

  function initGoodsDiscountRate() {
      var html='<p>批量填充商品折扣</p>';
      html+=' <p><input type="text" style="width:100px;"/>折&nbsp&nbsp&nbsp&nbsp<input type="button" value="确定" style="float:right"/></p>'
      $("#goodsDiscountRateBox").html(html);
  };

  $("#batch_goodsDiscountRate").powerFloat({
    eventType: "click",
    hoverHold: false,
    reverseSharp: true,
    target: function(){
      if(curRow !== null && curCol !== null){
         $("#grid").jqGrid("saveCell", curRow, curCol);
         curRow = null;
         curCol = null;
      };
      return $("#goodsDiscountRateBox");
    }
  });

  $('.wrapper').on('click', '#goodsDiscountRateBox input[type=button]', function(e){
    var txtVal = $(this).prev().val();
    if(txtVal>10||txtVal<0){
      Public.tips({type: 2,content: "请输入0-10之间的有效数字！"});
      $.powerFloat.hide();
      return
    }
    var ids = $("#grid").jqGrid('getDataIDs');
    var batName = 'goodsDiscountRate';
      //以下for循环用于循环出行数
    for(var i = 0, len = ids.length; i < len; i++){
      var id = ids[i], itemData;
      var row = $("#grid").jqGrid('getRowData',id);
      var taxRate = parseFloat(row.taxRate);
      var $_id = $('#' + id);
      if(row.goods === '' || $_id.data('goodsInfo') === undefined) {
        continue; //跳过无效分录
      };

      //计算折扣兄弟
      var original = parseFloat(row.qty) * parseFloat(row.price);
      var discountRate=(10-txtVal)*10;
        var deduction = original * discountRate / 100;
          
      //计算金额几兄弟
        var amount = original - deduction;
      var tax = amount * taxRate / 100;                     //税额
      var taxAmount = Number(_toFixedTwo(amount)) + Number(_toFixedTwo(tax));       //价税合计
      var taxPrice = taxAmount / row.qty / (1 - discountRate / 100);                                        //含税单价

      var setData = {};
      setData[batName] = txtVal;
      setData.deduction=deduction;
      setData.discountRate=(discountRate).toFixed(2);
      setData.tax=tax;
      setData.amount=amount;
      setData.taxAmount=taxAmount;
      setData.taxPrice=taxPrice;
      $("#grid").jqGrid('setRowData', id, setData);

      THISPAGE.calTotal();
    };
    $.powerFloat.hide();
  });
  //批量折扣额
  initDeduction();

  function initDeduction() {
      var html='<p>输入折扣额,将会自动分摊到每个商品</p>';
      html+=' <p><input type="text" style="width:100px;"/>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<input type="button" value="确定" style="float:right"/></p>'
      $("#deductionBox").html(html);
  };

  $("#batch_deduction").powerFloat({
    eventType: "click",
    hoverHold: false,
    reverseSharp: true,
    target: function(){
      if(curRow !== null && curCol !== null){
         $("#grid").jqGrid("saveCell", curRow, curCol);
         curRow = null;
         curCol = null;
      };
      return $("#deductionBox");
    }
  });
   
  $('.wrapper').on('click', '#deductionBox input[type=button]', function(e){
    // 目前只有销货单销货退货单的折扣权限限制
    if(type === 'sales'){
      if(flag === '150602'){
        if(!Business.verifyRight('SABACK_DISCOUNT')){
          return;
        }
      }
      if(flag === '150601'){
        if(!Business.verifyRight('SA_DISCOUNT')){
          return;
        }
      }
    }
    var txtVal = $(this).prev().val();
    var former=txtVal;
    var ids = $("#grid").jqGrid('getDataIDs');
    var batName = 'deduction';
    var total_amount=0;
    for(var i = 0, len = ids.length; i < len; i++){
      var id = ids[i], itemData;
      var row = $("#grid").jqGrid('getRowData',id);
      var $_id = $('#' + id);
      var qty=row.qty;
      var price=row.price;
      if(row.qty&&row.price) {
        total_amount += parseFloat(qty*price);
      };
      if(row.goods === '' || $_id.data('goodsInfo') === undefined){
        continue; //跳过无效分录
      }
    }
    var ids = $("#grid").jqGrid('getDataIDs');
    var transfer=0;
    var Count1=0;
    for(var i = 0, len = ids.length; i < len; i++){
      var id = ids[i], itemData;
      var row = $("#grid").jqGrid('getRowData',id);
      var $_id = $('#' + id);
      var qty=row.qty;
      var price=row.price;
      var power=(qty*price)/total_amount;
      var output= power* former;
      txtVal=(output).toFixed(2);
      if(txtVal!=""){
        transfer += parseFloat(txtVal);
      }
      var taxRate = parseFloat(row.taxRate);
      if(row.goods === '' || $_id.data('goodsInfo') === undefined) {
        continue; //跳过无效分录
      }else{
        Count1++;
      };
      //计算折扣
      var original = parseFloat(row.qty) * parseFloat(row.price);
      var discountRate = Business.disRateFormat(Number(txtVal).div(Number(original)).mul(100));
      var deduction=Number(discountRate*price*qty/100);
      var goodsDiscountRate=(100-discountRate)/10;
      //计算金额
      var amount = original - txtVal;
      var tax = amount * taxRate / 100;                     //税额
      var taxAmount = Number(_toFixedTwo(amount)) + Number(_toFixedTwo(tax));       //价税合计
      var taxPrice =Number((row.price)*(taxRate/100))+Number((row.price));
      //含税单价
      var setData = {};
      setData[batName] = txtVal;
      setData.goodsDiscountRate=goodsDiscountRate;
      setData.discountRate=discountRate;
      setData.tax=tax;
      setData.deduction=deduction;
      setData.amount=amount;
      setData.taxAmount=(taxAmount).toFixed(2);
      setData.taxPrice=(taxPrice).toFixed(2);
      if(goodsDiscountRate==-Infinity||goodsDiscountRate==Infinity){
        setData.goodsDiscountRate="";
      }
      if(discountRate==-Infinity||discountRate==Infinity){
        setData.discountRate="";
      }
      $("#grid").jqGrid('setRowData', id, setData);
      THISPAGE.calTotal();
    }   
    if (former - transfer > 0) {
      var remain = former - transfer;
      var id = Count1;
      var row = $("#grid").jqGrid('getRowData', id);
      deduction = row.deduction;
      var setData = {};
      var input = (deduction - 0) + (remain - 0);
      var inputAmunt = (amount - 0) - (remain - 0);
      var inputTaxAmount = (taxAmount - 0) - (remain - 0);
      var inputResult = (input).toFixed(2);
      var inputResultAmount = (inputAmunt).toFixed(2);
      var inputResultTaxAmount = (inputTaxAmount).toFixed(2);
      setData[batName] = inputResult;
      setData.amount = inputResultAmount;
      setData.taxAmount = inputResultTaxAmount;
      $("#grid").jqGrid('setRowData', id, setData);
      THISPAGE.calTotal();
    } else if (former - transfer <= 0) {
      var remain = transfer - former;
      var id = Count1;
      var row = $("#grid").jqGrid('getRowData', id);
      deduction = row.deduction;
      var setData = {};
      var input = (deduction - 0) - Math.abs(remain - 0);
      var inputAmunt = (amount - 0) + Math.abs(remain - 0);
      var inputTaxAmount = (taxAmount - 0) + Math.abs(remain - 0);
      var inputResult = (input).toFixed(2);
      var inputResultAmount = (inputAmunt).toFixed(2);
      var inputResultTaxAmount = (inputTaxAmount).toFixed(2);
      setData[batName] = inputResult;
      setData.amount = inputResultAmount;
      setData.taxAmount = inputResultTaxAmount;
      $("#grid").jqGrid('setRowData', id, setData);
      THISPAGE.calTotal();
    }
    $.powerFloat.hide();
  });

  function _toFixedTwo(val){
    return Math.round(val * 100) / 100;
  }

};
Business.coderRuleEvent = function (obj, type, date){
   // 修改单据编号
  $('#editBills').on('click', function(e) {
    e.preventDefault();
    var text = $('#number').text();
    $('#editBills').hide();
    $('#number').hide();
    $('#numberAuto').show();
    var numberCombo = Business.coderRuleCombo($('#numberAuto'),{
      defaultSelected: -1
    }, type, date);
    var $_input = $('#numberAuto').find('input');
    $_input.val(text);
    $_input.data("coderInfo",{name: text})
    // numberCombo.hasEnter = 0;
    // $_input.focus();
  });
}
//单据编号下拉框
Business.coderRuleCombo = function($_obj, opts, type,date){
  if ($_obj.length == 0) { return };
  var typeNo = type||'';
  if(typeof opts != 'object'){
    typeNo = opts;
    opts = {};
  }
  if(!typeNo) { return };
  var defaultPage = Public.getDefaultPage();
  var opts = $.extend(true, {
    data: function(){
      if(defaultPage.SYSTEM.coderRuleInfo && defaultPage.SYSTEM.coderRuleInfo[typeNo]) {
        return defaultPage.SYSTEM.coderRuleInfo[typeNo];
      } else {
        return '../basedata/docNo.do?action=list&typeNo='+typeNo;
      }
    },
    ajaxOptions: {
      formatData: function(data){
        defaultPage.SYSTEM.coderRuleInfo = defaultPage.SYSTEM.coderRuleInfo ||{};
        defaultPage.SYSTEM.coderRuleInfo[typeNo] = data.data.rows;  //更新
        return data.data.rows;
      } 
    },
    formatText: function(data){
      return Business.formatCoderRule(data);
    },
    text: 'name',
    value: 'id',
    defaultSelected: 0,
    editable: true,
    maxListWidth: 500,
    cache: false,
    forceSelection: false,//匹配不到时返回输入的值
    trigger: false,
    callback: {
      onChange: function(data){
        var _self = this;
        if(data) { //下拉选中有的
          Public.ajaxPost('../basedata/docNo.do?action=getLastDocNo',{id: data.id, billDate: date, typeNo: typeNo},function(data){
            if(data.status == 200){
              var text = data.data.billNo;
              _self.input.val(text);
            }else{
              Public.tips({type: 1, content: data.msg});
            }
          })
        }else{ 
          var text = this.input.val();
          this.input.val(text);
        }
        $('#number').text(text);
      },
      onBlur: function(data){
        if(this.input.val()){ //下拉选择中没有的
          $('#number').text(this.input.val());
        }
        Business.restoreBill(this);
      }
    },
    queryDelay: 0
  }, opts);
  var coderRuleCombo = $_obj.combo(opts).getCombo();
  return coderRuleCombo;
};
//基础资料编号前缀匹配
Business.numberCombo = function($_obj, opts, type){
  if ($_obj.length == 0) { return };
  var typeNo = type||''
  if(typeof opts != 'object'){
    typeNo = opts;
    opts = {};
  }
  if(!typeNo) { return };
  var url = "";
  var width = '';
  var skey = $_obj.find('input').val();
  if(type == "goods"){ //商品
    url = '/basedata/inventory.do?action=getNextNo';
    width = 262;
  }
  if(type == 'vendor'){ //供应商
    url = '/basedata/contact.do?action=getNextNo&type=10';
    width = 206;
  }
  if(type == 'customer'){ //客户
    url = '/basedata/contact.do?action=getNextNo&type=-10';
    width = 206;
  }
  if(type == 'storage'){ //仓库
    url = '/basedata/invlocation.do?action=getNextNo';
    width = 210;
  }
  if(type == 'staff'){ //职员
    url = '/basedata/employee.do?action=getNextNo';
    width = 210;
  }
  if(type == 'settlementAccount'){ //账户
    url = '/basedata/settAcct.do?action=getNextNo';
    width = 198;
  }
  var defaultPage = Public.getDefaultPage();
  var opts = $.extend(true, {
    data: url,
    ajaxOptions: function (){
      return {
        data: {skey: $_obj.find('input').val()},
        formatData: function(data){
          if(data.data && data.data.items){
            defaultPage.SYSTEM.baseNumberInfo = defaultPage.SYSTEM.baseNumberInfo ||{};
            defaultPage.SYSTEM.baseNumberInfo[typeNo] = data.data.items;  //更新
            return data.data.items;
          }
        } 
      }
    },
    autoSelectFirst:true,
    text: 'number',
    value: 'number',
    loadOnce: false,
    defaultSelected: -1,
    editable: true,
    width: width,
    cache: false,
    queryDelay: 300,
    forceSelection: false,//匹配不到时返回输入的值
    trigger: false
  }, opts);
  var baseNumberCombo = $_obj.combo(opts).getCombo();
  return baseNumberCombo;
}

Business.restoreBill = function (combo, text){
    $('#editBills').show();
    $("#number").text(text).show();
    $('#numberAuto').hide();
};
Business.formatCoderRule = function(coderRule){
  var status = coderRule.numMode;
  var prefix = coderRule.prefix;//前缀
  var numMode = '';//年，月，日
  if(status == 2 || status == 3 || status == 4 || status == 7){
    numMode += 'YYYY';
  }
  if(status == 5 || status == 3 || status == 4 || status == 8){
    numMode += 'MM';
  }
  if(status == 6 || status == 7 || status == 4 || status == 8){
    numMode += 'DD';
  }
  return prefix + numMode;
};
//客户下拉框
Business.filterCustomer = function(){
  Business.customerCombo($('#customerAuto'), {
    width: '',
    formatText: function(data){
      return data.number + ' ' + data.name;
    },
    trigger: false,
    forceSelection: false,
    noDataText: '',
    extraListHtmlCls: '',
    extraListHtml: '', 
    callback: {
      onChange: function(data){
        if(data) {
          this.input.data('ids', data.id);
          this.input.val(data.number);
        }
      }
    }
  });
  
  //客户
  $('#filter-customer .ui-icon-ellipsis').on('click', function(){
    var $input = $(this).prev('input');
    if ($(this).hasClass('adv')) {
      parent.$.dialog({
        width: 570,
        height: 500,
        title: '选择客户',
        content: 'url:/settings/customer-batch.jsp',
        data:{isDelete:2},
        lock: true,
        ok: function(){
          Business.setFilterData(this.content, $input);
        },
        cancel: function(){
          return true;
        }
      });
    }else{
      $.dialog({
        width: 570,
        height: 500,
        title: '选择客户',
        content: 'url:/settings/customer-batch.jsp',
        data:{isDelete:2},
        lock: true,
        ok: function(){
          Business.setFilterData(this.content, $input);
        },
        cancel: function(){
          return true;
        }
      });
      
    }
  });
};

Business.filterSupplier = function(){
  Business.supplierCombo($('#supplierAuto'), {
    width: '',
    formatText: function(data){
      return data.number + ' ' + data.name;
    },
    trigger: false,
    forceSelection: false,
    noDataText: '',
    extraListHtmlCls: '',
    extraListHtml: '', 
    callback: {
      onChange: function(data){
        if(data) {
          this.input.data('ids', data.id);
          this.input.val(data.number);
        }
      }
    }
  });
  
  //供应商
  $('#filter-supplier .ui-icon-ellipsis').on('click', function(){
    var $input = $(this).prev('input');
    if ($(this).hasClass('adv')) {
      parent.$.dialog({
        width: 570,
        height: 500,
        title: '选择供应商',
        content: 'url:/settings/supplier-batch.jsp',
        data:{isDelete:2},
        lock: true,
        ok: function(){
          Business.setFilterData(this.content, $input);
        },
        cancel: function(){
          return true;
        }
      });
    } else {
      $.dialog({
        width: 570,
        height: 500,
        title: '选择供应商',
        content: 'url:/settings/supplier-batch.jsp',
        data:{isDelete:2},
        lock: true,
        ok: function(){
          Business.setFilterData(this.content, $input);
        },
        cancel: function(){
          return true;
        }
      });
    }
    
  });
};
//结算账户查询区域下拉框初始化
Business.filterSettlementAccount = function(){
  Business.settlementAccountCombo($('#settlementAccountAuto'), {
    width: '',
    formatText: function(data){
      return data.number + ' ' + data.name;
    },
    trigger: false,
    forceSelection: false,
    noDataText: '',
    extraListHtmlCls: '',
    extraListHtml: '', 
    callback: {
      onChange: function(data){
        if(data) {
          //this.input.data('ids', data.id);
          this.input.val(data.number);
        }
      }
    }
  });
  
  //结算账户
  $('#filter-settlementAccount .ui-icon-ellipsis').on('click', function(){
    var $input = $(this).prev('input');
    $.dialog({
      width: 470,
      height: 500,
      title: '选择结算账户',
      content: 'url:/settings/settlementAccount-batch.jsp',
      data:{isDelete:2},
      lock: true,
      ok: function(){
        Business.setFilterData(this.content, $input);
      },
      cancel: function(){
        return true;
      }
    });
  });
};

/*
 * 用户下拉框 by luotuxiu
 * 
 * 
 */
Business.filterUserCombo = function($_obj, opts){
  if ($_obj.length == 0) { return };
  var defaultPage = Public.getDefaultPage();
  var SYSTEM = SYSTEM || defaultPage.SYSTEM || opts.system;
  var opts = $.extend(true, {
    data: function(){
      if(SYSTEM.userInfo) {
        return SYSTEM.userInfo;
      } else {
        return [];
      }
    },
    
    // ajaxOptions: {
    //  formatData: function(data){
    //    // SYSTEM.userInfo = data.data.items; //更新
    //    return data.data.items;
    //  } 
    // },
    formatText: function(data){
      return data.realName;
    },
    value: 'realName',
    defaultSelected: 0,
    addOptions : {text : '(所有)',value : -1  },
    defaultFlag: false,
    cache: false,
    editable: false,
    trigger:true
  }, opts); 
  var userCombo = $_obj.combo(opts).getCombo();
  return userCombo;
};

Business.filtercheckStatusCombo = function($_obj, opts){
  if ($_obj.length == 0) { return };
  var defaultPage = Public.getDefaultPage();
  var SYSTEM = SYSTEM || defaultPage.SYSTEM || opts.system;
  var opts = $.extend(true, {
    data: function(){
      return [
        {name:'未审核', id:1},
        {name:'已审核', id:2}
      ]
    },
    text: 'name',
    value: 'id',
    defaultSelected: 0,
    addOptions : {text : '(所有)',value : -1  },
    defaultFlag: false,
    cache: false,
    editable: false,
    trigger:true
  }, opts); 
  var checkStatusCombo = $_obj.combo(opts).getCombo();
  return checkStatusCombo;
};

Business.filterinStoreStatusCombo = function($_obj, opts){
  if ($_obj.length == 0) { return };
  var defaultPage = Public.getDefaultPage();
  var SYSTEM = SYSTEM || defaultPage.SYSTEM || opts.system;
  var opts = $.extend(true, {
    text: 'name',
    value: 'id',
    defaultSelected: 0,
    addOptions : {text : '(所有)',value : -1  },
    defaultFlag: false,
    cache: false,
    editable: false,
    trigger:true
  }, opts); 
  var checkinStoreStatusCombo = $_obj.combo(opts).getCombo();
  return checkinStoreStatusCombo;
};

Business.filterTypeCombo = function($_obj, opts){
  if ($_obj.length == 0) { return };
  var defaultPage = Public.getDefaultPage();
  var SYSTEM = SYSTEM || defaultPage.SYSTEM || opts.system;
  var opts = $.extend(true, {
    text: 'name',
    value: 'id',
    defaultSelected: 0,
    addOptions : {text : '(所有)',value : -1  },
    defaultFlag: false,
    cache: false,
    editable: false,
    trigger:true
  }, opts); 
  var checkinStoreStatusCombo = $_obj.combo(opts).getCombo();
  return checkinStoreStatusCombo;
};

//by luotuxiu end

Business.filterGoods = function(opts){
  var opts = $.extend(true, { 
    forceSelection: false,
    noDataText: '',
    extraListHtmlCls: '',
    extraListHtml: '', 
    callback: {
      onChange: function(data){
        if(data) {
          this.input.data('ids', data.id);
          this.input.data('id', data.id); //  方便统一
          this.input.data('numbers', data.number); //  方便统一
          this.input.val(data.number);
        }
      }
    }
  },opts)
  var goodsCombo = Business.goodsCombo($('#goodsAuto'), opts);
  //商品  
  $('#filter-goods .ui-icon-ellipsis').on('click', function(){
    var $input = $(this).prev('input');
    var data = {
          isDelete:2//获取全部商品要传2。。。
        }
    var defaultPage = Public.getDefaultPage()
    if ($(this).hasClass('adv')) {
      defaultPage.$.dialog({
        width: 900, //775
        height: 500,
        title: '选择商品',
        content: 'url:/settings/goods-batch.jsp',
        data:data,
        lock: true,
        ok: function(){
          Business.setFilterGoods(this.content, $input,opts.isSingle);
        },
        cancel: function(){
          return true;
        }
      });

    }else{
      defaultPage.$.dialog({
      width: 900, //775
      height: 500,
      title: '选择商品',
      content: 'url:/settings/goods-batch.jsp',
      data:data,
      lock: true,
      ok: function(){
        Business.setFilterGoods(this.content, $input,opts.isSingle);
      },
      cancel: function(){
        return true;
      }
    });     
    }

  });
  return goodsCombo;
};
Business.filterStorage = function(opts){
  var defaultPage = Public.getDefaultPage();
  var storageCombo = Business.storageCombo($('#storageAuto'), { 
    data: function(){
      return defaultPage.SYSTEM.storageInfo;
    },
    formatText: function(data){
      return data.locationNo + ' ' + data.name;
    },
    activeCls: opts && opts.activeCls === "false" ? false : "ui-combo-active",
    editable: true,
    defaultSelected: -1,
    forceSelection: false,
    callback: {
      onChange: function(data){
        if(data) {
          this.input.data('ids', data.id);
          this.input.val(data.locationNo);
        }
      }
    }
  });
  //仓库
  $('#filter-storage .ui-icon-ellipsis').on('click', function(){
    var $input = $(this).prev('input');
    if ($(this).hasClass('adv')) {
      parent.$.dialog({
        width: 510,
        height: 500,
        title: '选择仓库',
        content: 'url:/settings/storage-batch.jsp',
        data:{isDelete:2},
        lock: true,
        ok: function(){
          Business.setFilterData(this.content, $input);
        },
        cancel: function(){
          return true;
        }
      });
    }else{
      $.dialog({
        width: 510,
        height: 500,
        title: '选择仓库',
        content: 'url:/settings/storage-batch.jsp',
        data:{isDelete:2},
        lock: true,
        ok: function(){
          Business.setFilterData(this.content, $input);
        },
        cancel: function(){
          return true;
        }
      });
    }
  });
  return storageCombo;
};
Business.filterSaler = function(){
  Business.salesCombo($('#salerAuto'), {
      defaultSelected: -1,
      editable: true,
      extraListHtml: '',
      width:0,
      emptyOptions:false,
      forceSelection: false,
      formatText: function(row){
        return row.number + ' ' + row.name;
      },
      callback: {
        onChange: function(data){
          if(data) {
            this.input.data('ids', data.id);
            this.input.val(data.number);
          }
        }
      },
      trigger:false
  });
  //销售员
  $('#filter-saler .ui-icon-ellipsis').on('click', function(){
    var $input = $(this).prev('input');

    if ($(this).hasClass('adv')) {
      parent.$.dialog({
        width: 510,
        height: 500,
        title: '选择销售员',
        content: 'url:/settings/saler-batch.jsp',
        data:{isDelete:2},
        lock: true,
        ok: function(){
          Business.setFilterData(this.content, $input);
        },
        cancel: function(){
          return true;
        }
      });

    } else {
      $.dialog({
        width: 510,
        height: 500,
        title: '选择销售员',
        content: 'url:/settings/saler-batch.jsp',
        data:{isDelete:2},
        lock: true,
        ok: function(){
          Business.setFilterData(this.content, $input);
        },
        cancel: function(){
          return true;
        }
      });
    }
  });
};

/**
 * 处理 扫描枪重复录入商品  ———— by ywx
 * @return {BOOL} true  已经有重复录入的商品
 *                false 新录入的商品需要新增一行
 */
Business.filterBarcodeGood = function () {
  var existedInfo= {isExisted:false,existedId:-1};
  var goodInput = $('tr[id="'+THISPAGE.curID+'"]').find('input[name="goods"]');
  var inputBarCode = goodInput.val();//输入的条形码值
  var goodName;//输入条形码值对应的商品名
  var skuName;//区分同一商品不同属性
  var isSerNum = 0;
  var callback = function(good){
    goodName = Business.formatGoodsName(good);
    skuName = typeof(good.skuName) === 'undefined' ? '' : good.skuName;
    isSerNum = good.isSerNum;
  }
  Business.cacheManage.getGoodsInfoByBarCode($.trim(inputBarCode),callback);
  //所有的商品列单元格
  var goodCells = $('#grid').find('tr[role="row"]').children('td[aria-describedby="grid_goods"]');
  for (var i = 0; i < goodCells.length; i++) {
    var goodCell = $(goodCells[i]);
    var preGoodName = goodCell.text();
    if (preGoodName === " ") continue;//为空
    if (preGoodName === goodName) {
      if (THISPAGE.curID === goodCell.closest('tr').attr('id')) {
        continue;
      }
      var preSkuName = goodCell.siblings('[aria-describedby="grid_skuName"]').text().trim();
      if (preSkuName === skuName){
        existedInfo.isExisted = true;
        existedInfo.existedId = i;
        invorder = ''
        break;
      }
    }
  }

  if (existedInfo.isExisted) {
    goodInput.val("");
    // 序列号商品不处理
    if (isSerNum === 1) {
      parent.Public.tips({type:2, content : '已经录入相同的序列号商品'});
      return true;
    }
    // 不是序列号商品,给已存在的商品数量加1
    var qtyCell = $(goodCells[existedInfo.existedId]).siblings('[aria-describedby="grid_qty"]');
    var qtyStr = qtyCell.text();
    var qtyNum = Number(qtyStr) + 1;
    //计算金额
    var ids = $("#grid").jqGrid('getDataIDs')
    var row = $("#grid").jqGrid('getRowData', ids[existedInfo.existedId]);
    var val = qtyNum
    var price = parseFloat(row.price);
    var discountRate = parseFloat(row.discountRate);
    var deduction = parseFloat(row.deduction);
    var taxPrice = parseFloat(row.taxPrice);
    var taxRate = parseFloat(row.taxRate);
    if(!$.isNumeric(taxRate)) { // 
      var amount = val * price;
      if($.isNumeric(discountRate)) {
        var deduction = val * price * discountRate / 100;
        amount = amount - deduction
        $('#grid').jqGrid('setRowData', ids[existedInfo.existedId],{deduction:deduction})
      }
      var su = $("#grid").jqGrid('setRowData', ids[existedInfo.existedId], {amount: amount});
    }else if(SYSTEM.invPriceIsTax) {
      var taxAmount = (val * taxPrice * (1 - discountRate / 100)).toFixed(2)
      var tax = ((taxAmount / (1 + taxRate / 100)) * taxRate / 100).toFixed(2)
      var amount = taxAmount - tax
      // var price = (amount / val * (1 - discountRate)).toFixed(qtyPlaces)  // 突然不用改这个了
      var deduction = (val * taxPrice / (1 + taxRate / 100) * discountRate / 100).toFixed(2)
      var su = $("#grid").jqGrid('setRowData', ids[existedInfo.existedId], {taxAmount: taxAmount, tax: tax, amount: amount, price: price, deduction: deduction});
    } else {
      if($.isNumeric(price)) {
        if($.isNumeric(discountRate)) {
          var deduction = val * price * discountRate / 100;
          var amount = val * price - deduction;
          var goodsDiscountRate=(100-val)/10; 
          var su = $("#grid").jqGrid('setRowData', ids[existedInfo.existedId], {deduction: deduction, amount: amount,goodsDiscountRate:goodsDiscountRate});
        } else {
          var su = $("#grid").jqGrid('setRowData', ids[existedInfo.existedId], {amount: val * price});
        };
      };
      if($.isNumeric(taxRate)) {
        var amount = parseFloat(amount);
        var tax = amount * taxRate / 100;
        var taxAmount = amount + tax;
        var su = $("#grid").jqGrid('setRowData', ids[existedInfo.existedId], {tax: tax, taxAmount: taxAmount});
      };
    }
    
    $('#grid').jqGrid('setRowData', ids[existedInfo.existedId],{qty:qtyNum})

    THISPAGE.calTotal();
    return true; 
  } 
  return false;
}

// 单据保存、审核时，清除表格里的dirtyCell ———— by ywx
Business.clearDirtyCell = function ($grid) {
  $grid.find('td.dirty-cell').removeClass('dirty-cell');
}

// 判断单据表格是否改变 ———— by ywx
Business.checkGridIsChange = function ($grid) {
  var gridRowData = [];
  if ($grid.length>1) {
    for (var i = 0; i < $grid.length; i++) {
      var thisRowData = $($grid[i]).jqGrid("getRowData");
      gridRowData = gridRowData.concat(thisRowData);
    };
  } else{
    gridRowData = $grid.jqGrid("getRowData");
  }
  var isHasInv = false;
  if (typeof(gridRowData)!==undefined&&gridRowData) {
    for (var i = 0; i < gridRowData.length; i++) {
      var rowData = gridRowData[i];
      if (rowData==null) {
        continue;
      }
      if(rowData.goods.length>0){
        isHasInv = true;
        break;
      }
    }
  }
  if (isHasInv === false) {
    return false; //没有商品分录
  }
  if ($grid.find('td.dirty-cell').length === 0) {  
    return false; //没有改变的单元格
  }
  return true;//有改变的单元格
}


//将弹窗中返回的数据记录到相应的input中
Business.setFilterData = function(dialogCtn, $input){
  var numbers = [];
  var ids = [];
  for(rowid in dialogCtn.addList){
    var row = dialogCtn.addList[rowid];
    ids.push(rowid);
    numbers.push(row.number || row.locationNo || row.serNum);
  }
  $input.data('ids', ids.join(',')).val(numbers.join(','));
};

Business.setFilterGoods = function(dialogCtn, $input,isSingle){
  var numbers = [];
  var ids = [];
  var names = [];
  for(rowid in dialogCtn.addList){
    var row = dialogCtn.addList[rowid];
    ids.push(row.id);
    numbers.push(row.number || row.locationNo);
    names.push(row.name);
  }
  if(isSingle) {
    $input.data('id', ids[ids.length-1]).data('numbers', numbers[names.length-1]).val(numbers[numbers.length-1]);
  }else {
    $input.data('ids', ids.join(',')).data('numbers', numbers.join(',')).val(numbers.join(','));
  }
};

Business.moreFilterEvent = function(h){
  // 更多条件显示隐藏事件监听
  showTrigger();
  $(window).resize(function() {
    showTrigger();
  });
  // 点击更多条件 
  $('#conditions-trigger').on('click', function(e){
    e.preventDefault();
    var _index = $('#filterItems').find('li:visible').last().position().top / 44;
    var _pos = (_index + 1) * 44 + 'px';
    // showTrigger();
    if (!$(this).hasClass('conditions-expand')) {
      $('#filterItems').stop().animate({'height': _pos}, 'normal', function(){
        $('#conditions-trigger').addClass('conditions-expand').html('&nbsp;收起条件<b></b>');
        //Public.resizeGrid(h);
        $(window).trigger("resize");
      });
    } else {
      $('#filterItems').stop().animate({'height': '44px'}, 'normal', function() {
        $('#conditions-trigger').removeClass('conditions-expand').html('&nbsp;更多条件<b></b>');
        //Public.resizeGrid(h);
        $(window).trigger("resize");
      })
    };
  });

  function showTrigger() {
    var _lastPos = $('#filterItems').find('li:visible').last().position().top;
    var _firstPos = $('#filterItems').find('li:visible').first().position().top;
    if(_firstPos < _lastPos) {
      $('#conditions-trigger').show();
    } else {
      $('#conditions-trigger').hide();
    }
  }
};

Business.gridEvent = function(){
  $('.grid-wrap').on('mouseenter', '.list tbody tr', function(e){
    $(this).addClass('tr-hover');
    if($_curTr) {
      $_curTr.removeClass('tr-hover');
      $_curTr = null;
    }
  }).on('mouseleave', '.list tbody tr', function(e){
    $(this).removeClass('tr-hover');
  });
};
Business.getSearchList = function(searchid){
  var html = [
          '<div class="l" id="filter-menu">',
            '<ul class="ul-inline fix" id="filterItems">',
              '<li id="filter-billDate">',
                '<label>开票日期:</label>',
                '<input type="text" value="" class="ui-input ui-datepicker-input" name="filter-billFromDate" id="filter-billFromDate" maxlength="10" />',
                '<span class="todate"> 至 </span>',
                '<input type="text" value="" class="ui-input ui-datepicker-input" name="filter-billToDate" id="filter-billToDate" maxlength="10" />',
              '</li>',
              '<li id="date">',
                '<label>单据日期:</label>',
                '<input type="text" value="" class="ui-input ui-datepicker-input" name="filter-fromDate" id="filter-fromDate" maxlength="10" />',
                '<span class="todate"> 至 </span>',
                '<input type="text" value="" class="ui-input ui-datepicker-input" name="filter-toDate" id="filter-toDate" maxlength="10" />',
              '</li>',
              '<li id="billsNo">',
                '<label>单据编号:</label>',
                '<input type="text" class="ui-input ui-input-ph" id="billsNoAuto">',
              '</li>',
                  '</li>',
                '<li id="sale-rank-filter">',
                      '<span id="sale-rank-catorage"></span>',
                    '</li>',
              '<li id="customer">',
                '<label>客户:</label>',
                '<span class="mod-choose-input" id="filter-customer"><input type="text" class="ui-input" id="customerAuto"/><span class="ui-icon-ellipsis"></span></span>',
              '</li>',
              '<li id="supplier">',
                '<label>供应商:</label>',
                '<span class="mod-choose-input" id="filter-supplier"><input type="text" class="ui-input" id="supplierAuto"/><span class="ui-icon-ellipsis"></span></span>',
              '</li>',
              '<li id="goods">',
                '<label>商品:</label>',
                '<span class="mod-choose-input" id="filter-goods"><input type="text" class="ui-input" id="goodsAuto"/><span class="ui-icon-ellipsis"></span></span>',
              '</li>',
              '<li id="sales">',
                '<label>销售人员:</label>',
                '<span class="mod-choose-input" id="filter-saler"><input type="text" class="ui-input" id="salerAuto"><span class="ui-icon-ellipsis"></span></span>',
              '</li>',  
              '<li id="remarks">',
                '<label>备注(分录):</label>',
                '<input type="text" value="请输入备注查询" class="ui-input ui-input-ph" name="remarkCon" id="remarkCon" />',
              '</li>',//后续后端实现再放开           
              '<li id="billNum">',
                '<label>订单号/单据编号:</label>',
                '<input type="text" value="请输入单号查询" style="width:115px;" class="ui-input ui-input-ph" name="matchCon" id="matchCon"  />',
              '</li>',
              '<li id="bill_no">',
                '<label>发票号:</label>',
                '<input type="text" class="ui-input ui-input-ph" id="billNoAuto">',
              '</li>',
              '<li id="bill_title">',
                '<label>发票抬头:</label>',
                '<input type="text" class="ui-input ui-input-ph" id="billTitleAuto">',
              '</li>',
              '<li id="filter">',
                '<label>客户/供应商类别:</label>',
                '<span id="catorage"></span>',
              '</li>',
              '<li id="goodsfilter">',
                '<label>商品类别:</label>',
                '<input type="text" value="" class="ui-input" name="filterCat" id="filterCat" />',
              '</li>',
              '<li class="chk-list" id="chk-stock">',
                '<span class="chk">',
                '<input type="checkbox" value="profit" name="showSto" />',
                '零库存商品</span>',
              '</li>',
              '<li id="deliveryDate">',
                '<label>预计交货日:</label>',
                '<input type="text" value="" class="ui-input ui-datepicker-input" name="filter-fromDeliveryDate" id="filter-fromDeliveryDate" maxlength="10" />',
                '<span class="todate"> 至 </span>',
                '<input type="text" value="" class="ui-input ui-datepicker-input" name="filter-toDeliveryDate" id="filter-toDeliveryDate" maxlength="10" />',
              '</li>',
              '<li id="storage">',
                '<label>仓库:</label>',
                '<span class="mod-choose-input" id="filter-storage"><input type="text" class="ui-input" id="storageAuto"/><span class="ui-icon-ellipsis"></span></span>',
              '</li>',
              '<li id="account">',
                '<label>结算账户:</label>',
                '<span class="mod-choose-input" id="filter-settlementAccount"><input type="text" class="ui-input" id="settlementAccountAuto"/><span class="ui-icon-ellipsis"></span></span>',
              '</li>',
              '<li id="buName">',
                '<label>往来单位:</label>',
                '<span class="mod-choose-input" id="filter-buName"><input type="text" class="ui-input" id="buName"/><span class="ui-icon-ellipsis"></span></span>',
              '</li>',
              '<li id="payerAndPayee">',
                '<label>收/付款人:</label>',
                '<span class="mod-choose-input" id="filter-payerAndPayee"><input type="text" class="ui-input" id="payerAndPayee"/><span class="ui-icon-ellipsis"></span></span>',
              '</li>',
              '<li id="saleCustomer">',
                '<label>销货单位/购货单位:</label>',
                '<span class="ui-combo-wrap" id="customerSale">',
                '<input type="text" name="" class="input-txt" autocomplete="off" value="" data-ref="date">',
                '<i class="ui-icon-ellipsis"></i></span></dd>',
              '</li>',
              '<li id="serial">',
                '<label>序列号:</label>',
                '<span class="mod-choose-input"><input type="text" class="ui-input" id="serNumAuto" autocomplete="off"><span class="ui-icon-ellipsis"></span></span>',
              '</li>',
              '<li class="chk-list" id="profit-wrap">',
                '<span class="chk"><input type="checkbox" value="warehouse" name="warehouse" id="warehouse"/>在库</span>',
                '<span class="chk"><input type="checkbox" value="outbound" name="outbound" id="outbound" />已出库</span>',
                '<span class="chk"><input type="checkbox" value="isCheck" name="isCheck" id="isCheck"/>查询未审核单据</span>',
              '</li>',
              '<li id="status-wrap">',
                '<label>状态:</label>',
                '<span class="chk"><input type="checkbox" value="0" name="status" /><i>未入库</i></span>',
                '<span class="chk"><input type="checkbox" value="1" name="status" /><i>部分入库</i></span>',
                '<span class="chk"><input type="checkbox" value="2" name="status" /><i>已入库</i></span>',
              '</li>',
              '<li id="match">',
                '<span class="chk" title="是否显示商品明细"><input type="checkbox" name="match">是否显示商品明细</span>',
              '</li>',
              '<li id="chk-realQty">',
                '<span class="chk" title="显示可用库存"><input type="checkbox" name="showRealQty">显示可用库存</span>',
              '</li>',
              '<li class="chk-list" id="chk-blank">',
                '<span class="chk">',
                '<input type="checkbox" value="profit" name="showBlank" />',
                '<i>不显示无欠款客户/不显示无欠款供应商/不显示已收款商品明细</i></span>',
              '</li>',
              '<li class="chk-list" id="chk-wrap">',
                '<span class="chk">',
                '<input type="checkbox" value="profit" name="profit" />',
                '<i>计算毛利</i></span>',//||按商品排列
                '<span class="chk">',
                '<input type="checkbox" value="showSku" name="showSku" />',
                '<i>显示辅助属性</i></span>',//||按单据排列
              '</li>',
              '<li id="classes">',
                '<label class="radio">',
                  '<input type="radio" name="classes" value="150601">销货',
                '</label>',
                '<label class="radio">',
                  '<input type="radio" name="classes" value="150602">退货',
                '</label>',
              '</li>',
              '<li id="billType">',
                '<label class="radio">',
                  '<input type="radio" name="billType" value="0">已全部开票',
                '</label>',
                '<label class="radio checked">',
                  '<input type="radio" name="billType" value="1" checked>未全部开票',
                '</label>',
              '</li>',
              '<li class="chk-list" id="chk-ischecked">',
                '<span class="chk">',
                '<input type="checkbox" value="ischecked" name="ischecked" />',
                '无发生额不显示</span>',
              '</li>',
              '<li id="othertype1"><div id="incomeExpenseType"></div></li>',
              '<li id="othertype2"><div id="incomeName" class="dn"></div></li>',
              '<li id="othertype3"><div id="expenseName" class="dn"></div></li>',
              '<div class="btns">',
                '<a class="ui-btn mrb ui-btn-search" id="filter-submit">查询</a>',
              '</div>',
            '</ul>',
            '<a href="#" id="conditions-trigger" class="ui-btn conditions-trigger" tabindex="-1">&nbsp;更多条件<b></b></a>',
          '</div></div>'
          ].join('');
  $('.mod-search').html(html);
  // radio模拟点击
  $('.radio').on('click', function() {
    $(this).addClass('checked').siblings().removeClass('checked');
  })
}

Business.getAdvSearchList = function(searchid){
  var html = [
          '<div class="l advancedSearch-div" id="filter-menu">',
            '<ul class="ul-inline fix" id="filterItems">',
              '<li id="filter-billDate">',
                '<label>开票日期:</label>',
                '<input type="text" value="" class="ui-input ui-datepicker-input" name="filter-billFromDate" id="filter-billFromDate" maxlength="10" />',
                '<span class="todate"> 至 </span>',
                '<input type="text" value="" class="ui-input ui-datepicker-input" name="filter-billToDate" id="filter-billToDate" maxlength="10" />',
              '</li>',
              '<li id="date">',
                '<label>单据日期:</label>',
                '<input type="text" value="" class="ui-input ui-datepicker-input" name="filter-fromDate" id="filter-fromDate" maxlength="10" />',
                '<span class="todate"> ~ </span>',
                '<input type="text" value="" class="ui-input ui-datepicker-input" name="filter-toDate" id="filter-toDate" maxlength="10" />',
              '</li>',
              '<li id="billsNo">',
                '<label>单据编号:</label>',
                '<input type="text" class="ui-input ui-input-ph" id="billsNoAuto">',
              '</li>',
                  '</li>',
                '<li id="sale-rank-filter">',
                      '<span id="sale-rank-catorage"></span>',
                    '</li>',
              '<li id="customer">',
                '<label>客户:</label>',
                '<span class="mod-choose-input" id="filter-customer"><input type="text" class="ui-input" id="customerAuto"/><span class="ui-icon-ellipsis adv"></span></span>',
              '</li>',
              '<li id="supplier">',
                        '<label>供应商:</label>',
                        '<span class="mod-choose-input" id="filter-supplier"><input type="text" class="ui-input" id="supplierAuto"/><span class="ui-icon-ellipsis adv"></span></span>',
                      '</li>',
              '<li id="goods">',
                '<label>商品:</label>',
                '<span class="mod-choose-input" id="filter-goods"><input type="text" class="ui-input" id="goodsAuto" placeholder="请输入商品编号或名称或型号" /><span class="ui-icon-ellipsis adv"></span></span>',
              '</li>',
              '<li id="sales">',
                '<label>销售人员:</label>',
                '<span class="mod-choose-input" id="filter-saler"><input type="text" class="ui-input" id="salerAuto"><span class="ui-icon-ellipsis adv"></span></span>',
              '</li>',  
              '<li id="remarks">',
                '<label>分录备注:</label>',
                '<input type="text" placeholder="请输入备注查询" class="ui-input ui-input-ph" name="remarkCon" id="remarkCon" />',
              '</li>',//后续后端实现再放开           
              '<li id="billNum">',
                '<label>订单号/单据编号:</label>',
                '<input type="text" value="请输入单号查询" style="width:115px;" class="ui-input ui-input-ph" name="matchCon" id="matchCon"  />',
              '</li>',
              '<li id="bill_no">',
                      '<label>发票号:</label>',
                      '<input type="text" class="ui-input ui-input-ph" id="billNoAuto">',
                  '</li>',
              '<li id="bill_title">',
                      '<label>发票抬头:</label>',
                      '<input type="text" class="ui-input ui-input-ph" id="billTitleAuto">',
                  '</li>',
              '<li id="filter">',
                '<label>客户/供应商类别:</label>',
                    '<span id="catorage"></span>',
                  '</li>',
                  '<li id="goodsfilter">',
                '<label>商品类别:</label>',
                '<input type="text" value="" class="ui-input" name="filterCat" id="filterCat" />',
              '</li>',
              '<li id="storage">',
                '<label>仓库:</label>',
                '<span class="mod-choose-input" id="filter-storage"><input type="text" class="ui-input" id="storageAuto"/><span class="ui-icon-ellipsis adv"></span></span>',
              '</li>',
              '<li id="checkStatusfilter">',
                '<label>审核状态:</label>',
                '<span id="checkStatus"></span>',
              '</li>',              
              '<li class="chk-list" id="chk-stock">',
                '<span class="chk">',
                '<input type="checkbox" value="profit" name="showSto" />',
                '零库存商品</span>',
              '</li>',
              '<li id="deliveryDate">',
                        '<label>预计交货日:</label>',
                        '<input type="text" value="" class="ui-input ui-datepicker-input" name="filter-fromDeliveryDate" id="filter-fromDeliveryDate" maxlength="10" />',
                        '<span class="todate"> 至 </span>',
                        '<input type="text" value="" class="ui-input ui-datepicker-input" name="filter-toDeliveryDate" id="filter-toDeliveryDate" maxlength="10" />',
                     '</li>',
              '<li id="account">',
                '<label>结算账户:</label>',
                '<span class="mod-choose-input" id="filter-settlementAccount"><input type="text" class="ui-input" id="settlementAccountAuto"/><span class="ui-icon-ellipsis"></span></span>',
              '</li>',
              '<li id="buName">',
                '<label>往来单位:</label>',
                '<span class="mod-choose-input" id="filter-buName"><input type="text" class="ui-input" id="buName"/><span class="ui-icon-ellipsis"></span></span>',
              '</li>',
              '<li id="payerAndPayee">',
                '<label>收/付款人:</label>',
                '<span class="mod-choose-input" id="filter-payerAndPayee"><input type="text" class="ui-input" id="payerAndPayee"/><span class="ui-icon-ellipsis"></span></span>',
              '</li>',
              '<li id="saleCustomer">',
                '<label>销货单位/购货单位:</label>',
                '<span class="ui-combo-wrap" id="customerSale">',
                '<input type="text" name="" class="input-txt" autocomplete="off" value="" data-ref="date">',
                '<i class="ui-icon-ellipsis"></i></span></dd>',
              '</li>',
                '<li id="serial">',
                        '<label>序列号:</label>',
                        '<span class="mod-choose-input"><input type="text" class="ui-input" id="serNumAuto" autocomplete="off"><span class="ui-icon-ellipsis"></span></span>',
                      '</li>',
                      '<li class="chk-list" id="profit-wrap">',
                        '<span class="chk"><input type="checkbox" value="warehouse" name="warehouse" id="warehouse"/>在库</span>',
                        '<span class="chk"><input type="checkbox" value="outbound" name="outbound" id="outbound" />已出库</span>',
                        '<span class="chk"><input type="checkbox" value="isCheck" name="isCheck" id="isCheck"/>查询未审核单据</span>',
                      '</li>',
                      '<li id="status-wrap">',
                        '<label>状态:</label>',
                        '<span class="chk"><input type="checkbox" value="0" name="status" /><i>未入库</i></span>',
                        '<span class="chk"><input type="checkbox" value="1" name="status" /><i>部分入库</i></span>',
                        '<span class="chk"><input type="checkbox" value="2" name="status" /><i>已入库</i></span>',
                      '</li>',
              '<li id="match">',
                '<span class="chk" title="是否显示商品明细"><input type="checkbox" name="match">是否显示商品明细</span>',
              '</li>',
              '<li id="chk-realQty">',
                '<span class="chk" title="显示可用库存"><input type="checkbox" name="showRealQty">显示可用库存</span>',
              '</li>',
              '<li class="chk-list" id="chk-blank">',
                '<span class="chk">',
                '<input type="checkbox" value="profit" name="showBlank" />',
                '<i>不显示无欠款客户/不显示无欠款供应商/不显示已收款商品明细</i></span>',
              '</li>',
              '<li class="chk-list" id="chk-wrap">',
                '<span class="chk">',
                '<input type="checkbox" value="profit" name="profit" />',
                '<i>计算毛利</i></span>',//||按商品排列
                '<span class="chk">',
                '<input type="checkbox" value="showSku" name="showSku" />',
                '<i>显示辅助属性</i></span>',//||按单据排列
              '</li>',
              '<li id="classes">',
                '<label class="radio">',
                  '<input type="radio" name="classes" value="150601">销货',
                '</label>',
                '<label class="radio">',
                  '<input type="radio" name="classes" value="150602">退货',
                '</label>',
              '</li>',
              '<li id="billType">',
                '<label class="radio">',
                  '<input type="radio" name="billType" value="0">已全部开票',
                '</label>',
                '<label class="radio checked">',
                  '<input type="radio" name="billType" value="1" checked>未全部开票',
                '</label>',
              '</li>',
              '<li class="chk-list" id="chk-ischecked">',
                '<span class="chk">',
                '<input type="checkbox" value="ischecked" name="ischecked" />',
                '无发生额不显示</span>',
              '</li>',
              '<li id="othertype1"><div id="incomeExpenseType"></div></li>',
              '<li id="othertype2"><div id="incomeName" class="dn"></div></li>',
              '<li id="othertype3"><div id="expenseName" class="dn"></div></li>',
              '<li id="usersCreatfilter">',
                '<label>制单人:</label>',
                '<span id="usersCreat"></span>',
              '</li>',
              '<li id="usersModifyfilter">',
                '<label>最后修改人:</label>',
                '<span id="usersModify"></span>',
              '</li>',
              '<li id="usersCheckfilter">',
                '<label>审核人:</label>',
                '<span id="usersChecks"></span>',
              '</li>',
            '</ul>',
          '</div></div>'
          ].join('');
  $('.mod-search').html(html);
  // radio模拟点击
  $('.radio').on('click', function() {
    $(this).addClass('checked').siblings().removeClass('checked');
  })
}

Business.getSalesFullData = function(opts) {
  var theSkuName, skuId, theUnitId, theUnitName, thePrice, theTaxPrice;
  var curRowInfo = opts.curRowInfo || {},
      rowid = opts.rowid || '1',
      row = opts.row || {},
      contactInfo = opts.contactInfo || {};
  var unitInfo = $('#' + rowid).data('unitInfo') || {};
  var skuInfo = $('#' + rowid).data('skuInfo') || {};
  var getData = {
    init: function(opts) {
      this.getSku();
      this.getUnit();
      this.getPrice(); // 价格依赖于属性及单位，必须放在获取属性及单位之后
      this.getInvNumberMap();
    },
    getSku: function() {
      if (typeof invorder === "number") { // 通过下拉选择的商品，从缓存中获取辅助属性，该处使用全局变量，不好修改，暂时不改。。。
        skuInfo = {
          name: curRowInfo.invSkus[invorder].skuName,
          id: curRowInfo.invSkus[invorder].skuId
        }
        $('#' + rowid).data('skuInfo', skuInfo)
      }
    },
    getUnit: function() {
      //多计量单位
      if (curRowInfo.prices && curRowInfo.prices.length > 0) {
        if(curRowInfo.saleUnitName){
          theUnitId=fdialog==1 ? dia_unitId : curRowInfo.saleUnitId;
        }else{
          //启用多单位未设置首选出库单位，默认带出基本单位及价格
          $.each(system.unitGroupInfo,function(i,el){
            if(el.id == curRowInfo.unitTypeId){
              $.each(el.entries,function(index,item) {
                if(item['default']){
                  theUnitId = item.id;
                  theUnitName = item.name; 
                }
              });
            }
          })
          //因为未设置首选出库强行带出，combo模糊搜索的unitInfo数据不完整，带出后给unitInfo赋值（提交时用到）
          //F7在弹窗中已带入unitInfo，跳过，不判断会引起F7窗口带入的数据在保存时始终是基本单位
          if(unitInfo && (!unitInfo.unitId || unitInfo.unitId === '0')){
            $('#' + rowid).data('unitInfo',{unitId: theUnitId,name: theUnitName});
          }
        }
      };
    },
    getPrice: function() {
      /*******************************************************************************************
        销货类单据（销货单、销货退货单、销货订单）的价格只与客户有关，带出该客户所在等级对应的价格
        系统预设5个客户等级 level 1/2/3 对应零售、批发、vip价格；level 4/5 对应折扣率一、折扣率二
        未启用辅助属性及多单位，该商品仅有一组价格策略；启用辅助属性的在每个辅助属性纬度对应一组价格策略
        启用多单位的该单位组的每个单位对应一组价格策略
        价格带出begin
      ******************************************************************************************/
      // clevelPrice客户等级价格, priceArr价格策略组数据, thePrice最终带出的数据
      var clevelPrice, priceArr;
      
      // 未启用辅助属性、未启用多单位的商品价格组
      priceArr = [
        curRowInfo.salePrice, //零售价格
        curRowInfo.retailPrice, //批发价格
        curRowInfo.salePrice1, //vip价格
        curRowInfo.salePrice2, //折扣率一
        curRowInfo.salePrice3 //折扣率二
      ];

      // 启用辅助属性（多辅助属性）的价格组
      if(typeof invorder === "number"){
        priceArr = [
          curRowInfo.invSkus[invorder].skuSaleprice || 0, //零售价格
          curRowInfo.invSkus[invorder].skuRetailPrice || 0, //批发价格
          curRowInfo.invSkus[invorder].skuSaleprice1 || 0, //vip价格
          curRowInfo.invSkus[invorder].skuSaleprice2 || 0, //折扣率一
          curRowInfo.invSkus[invorder].skuSaleprice3 || 0 //折扣率二
        ];
      }

      // 多计量单位的价格组
      if (curRowInfo.prices && curRowInfo.prices.length > 0) {
        for (var i = 0; i < curRowInfo.prices.length; i++) {
          if(curRowInfo.prices[i].unitId == theUnitId){
            priceArr = [
              curRowInfo.prices[i].salePrice, //零售价格
              curRowInfo.prices[i].retailPrice, //批发价格
              curRowInfo.prices[i].salePrice1, //vip价格
              curRowInfo.prices[i].salePrice2, //折扣率一
              curRowInfo.prices[i].salePrice3 //折扣率二
            ];
          }
        };
      }
      
      // 取当前选择的客户信息，以带出价格
      if (contactInfo && contactInfo.cLevel !== -1) {
        if(contactInfo.cLevel < 3){
          clevelPrice = priceArr[contactInfo.cLevel];
          clevelPrice += ''; //批发和VIP客户金额设置为0时带出来的不是0而是零售价：/PROJECT-27326
        }else{
          //折扣用户的销售单价取零售价，金额再按照折扣率计算
          clevelPrice = priceArr[0];
          //不更改商品时已修改非预设的折扣额保留
          curRowInfo.discountRate = row.discountRate || priceArr[contactInfo.cLevel];
        }
      } else {
        // 未选择客户或客户无等级（端数据）带入的价格为0--2017-03-03
        clevelPrice = '0';
      }

      thePrice = row.price || clevelPrice; // 客户手动修改了价格，优先使用客户修改的价格

      // 启用税率
      if (taxRequiredCheck) {
        // 未启用商品价格含税
        if (!SYSTEM.invPriceIsTax) {
          // 含税单价 = 单价 * (1 + 税率)
          theTaxPrice = row.taxPrice || Number(thePrice).mul((1).add(Number(curRowInfo.taxRate || taxRequiredInput).div(100))) || 0
        }
        //启用了商品价格含税,通过含税单价反算单价
        if(SYSTEM.invPriceIsTax && curRowInfo.taxPrice === undefined){
          theTaxPrice = thePrice;
          // 单价 = 含税单价 / (1 + 税率)
          thePrice = Number(thePrice).div((1).add(Number(curRowInfo.taxRate || taxRequiredInput).div(100)))
        }
      }
    },
    getInvNumberMap: function() {
      //物料编码
      if(curRowInfo.invNumberMap){
        hasCusInvNumber = false;
        if(contactInfo && contactInfo.id){
          for (var i = 0; i < curRowInfo.invNumberMap.length; i++) {
            if(contactInfo.id == curRowInfo.invNumberMap[i].buId){ //是对应客户
              curRowInfo.customerInvNumber = curRowInfo.invNumberMap[i].number;//该客户的该物料编码
              hasCusInvNumber = true;
            }
          };
          if(!hasCusInvNumber){
            curRowInfo.customerInvNumber = "";
          }
        }
      }
    }
  }

  getData.init();

  var returnData = {
    unitInfo: unitInfo,
    skuInfo: skuInfo,
    curRowInfo: curRowInfo,
    thePrice: thePrice,
    theTaxPrice: theTaxPrice
  }

  return returnData;
}

Business.setPurRowData = function(rowid) {
  var goodsInfo = $('#' + rowid).data('goodsInfo'),
      curRowInfo = $.extend(true, {}, goodsInfo);

  var row = $('#grid').jqGrid('getRowData',rowid);
  if (!$.isEmptyObject(curRowInfo)) {
    /*根据商品ID+属性ID，标识当前行的唯一标识，goodId--已录入的商品id，newgoodId--正在录入的商品id，当两者不相等时说明该行商品已更换，清空row*/
    var newgoodId = curRowInfo.id + '' + (curRowInfo.skuId || 0);
    if (newgoodId !== row.goodId) {
      row = {}
    }
  }
  
  var setRowData = {
    getTaxRate: function() {
      //供应商信息
      var contactInfo = $("#customer").data('contactInfo') || {};
      var taxRate = taxRequiredInput || 0
      // 启用税率且选择了供应商
      if(taxRequiredCheck && contactInfo){
        // 供应商税率
        taxRate = contactInfo.taxRate === 0 ? '' + contactInfo.taxRate : contactInfo.taxRate || taxRate
      }
      // 行内已录入的税率
      taxRate = row.taxRate === 0 ? '' + row.taxRate : row.taxRate || taxRate
      return taxRate
    },
    getPrice: function() {
      // 预计采购价
      var thePrice = curRowInfo.purPrice || 0,
          theTaxPrice;
      // 多辅助属性预计采购价
      if (typeof invorder === 'number') {
        thePrice = curRowInfo.invSkus[invorder].skuPurprice || thePrice;
      }
      // 多单位预计采购价(启用多单位后，多辅助属性设置的价格失效)
      if (curRowInfo.prices && curRowInfo.prices.length > 0) {
        for (var i = 0; i < curRowInfo.prices.length; i++) {                     
          if(curRowInfo.prices[i].unitId == this.getUnitInfo().unitId){
            thePrice = curRowInfo.prices[i].purPrice || thePrice;
          }
        }
      }
      // 启用税率的价格
      if (taxRequiredCheck) {
        var taxRate = this.getTaxRate()
        // 未启用商品价格含税
        if (!SYSTEM.invPriceIsTax) {
          // 含税单价 = 单价 * (1 + 税率)
          theTaxPrice = Number(thePrice).mul((1).add(Number(taxRate).div(100))) || 0
        }
        //启用了商品价格含税,通过含税单价反算单价
        if(SYSTEM.invPriceIsTax && curRowInfo.taxPrice === undefined){
          theTaxPrice = thePrice;
          // 单价 = 含税单价 / (1 + 税率)
          thePrice = Number(thePrice).div((1).add(Number(taxRate).div(100)))
        }
      }

      return {
        thePrice: row.price || thePrice,
        theTaxPrice: row.taxPrice || theTaxPrice
      }
    },
    getSkuInfo: function() {
      var skuInfo = {}
      if (typeof invorder === 'number') {
        skuInfo = {
          name: curRowInfo.invSkus[invorder].skuName || '',
          id: curRowInfo.invSkus[invorder].skuId || ''
        }
      }
      return skuInfo
    },
    getUnitInfo: function() {
      var unitInfo = {};
      // 多计量单位
      if (curRowInfo.prices && curRowInfo.prices.length > 0) {
        //启用多单位未设置首选入库单位，默认带出基本单位及价格
        if(!curRowInfo.purUnitName){
          $.each(system.unitGroupInfo,function(i,el){
            if(el.id == curRowInfo.unitTypeId){
              $.each(el.entries,function(index,item) {
                if(item['default']){
                  unitInfo = {
                    unitId: item.id,
                    name: item.name
                  }
                }
              });
            }  
          })
        } else {
          unitInfo = {
            unitId: curRowInfo.purUnitId,
            name: curRowInfo.purUnitName
          }
        }
        return unitInfo
      }
    },
    setAmount: function(qty) {
      var deduction = 0, // 折扣额
          amount = 0, // 金额
          tax, // 税额
          taxAmount; // 价税合计
      if(qty > 0){
        var price = this.getPrice().thePrice,
            disRate = curRowInfo.discountRate || 0;
        // 重新计算折扣额会导致PROJECT-15589
        deduction = row.deduction || Number(qty).mul(Number(price)).mul(Number(disRate)).div(100);
        amount = row.amount || Number(qty).mul(Number(price)).subtr(deduction);
        // 数量改变一定要重新计算金额（F7弹窗可以直接带回数量，不判断当商品不变数量改变时，金额不会重新计算）
        if (Number(qty) !== Number(row.qty)) {
          amount = Number(qty).mul(Number(price)).subtr(deduction)
        }
      }

      if(taxRequiredCheck) {
        var taxRate = this.getTaxRate();
        // 税额
        tax = curRowInfo.tax || Number(amount).mul(Number(taxRate)).div(100)
        // 价税合计
        taxAmount = curRowInfo.taxAmount || Number(amount).add(Number(tax));
        // 金额改变时价税合计要重新计算（F7弹窗不改变商品只改变数量时）
        if (Number(amount) !== Number(row.amount)) {
          taxAmount = Number(amount).add(Number(tax))
        }
      }

      return {
        deduction: deduction,
        amount: amount,
        tax: tax,
        taxAmount: taxAmount
      }
    }
  }

  return setRowData
}

// 折扣率小数位最多保留8位
Business.disRateFormat = function(disRate) {
  var decimalDigits = ('' + disRate).split('.')[1]
  if (decimalDigits && decimalDigits.length >= 8) {
    return Number(disRate).toFixed(8)
  } else {
    return Number(disRate)
  }
}

//判断:当前元素是否是被筛选元素的子元素
$.fn.isChildOf = function(b){
  return (this.parents(b).length > 0);
};

//判断:当前元素是否是被筛选元素的子元素或者本身
$.fn.isChildAndSelfOf = function(b){
  return (this.closest(b).length > 0);
};

//数字输入框
$.fn.digital = function() {
  this.each(function(){
    $(this).keyup(function() {
      this.value = this.value.replace(/\D/g,'');
    })
  });
};

/** 
 1. 设置cookie的值，把name变量的值设为value   
example $.cookie(’name’, ‘value’);
 2.新建一个cookie 包括有效期 路径 域名等
example $.cookie(’name’, ‘value’, {expires: 7, path: ‘/’, domain: ‘jquery.com’, secure: true});
3.新建cookie
example $.cookie(’name’, ‘value’);
4.删除一个cookie
example $.cookie(’name’, null);
5.取一个cookie(name)值给myvar
var account= $.cookie('name');
**/
$.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        var path = options.path ? '; path=' + options.path : '';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};
Public.print = function (opt){
    try{
    var voucherIds = opt.$grid.jqGrid('getGridParam').selarrrow.join();
    }catch(e){
     console.log("Print error")
    }
  var pdfUrl = opt.pdf;
  var sidx = opt.$grid.jqGrid('getGridParam','sortname');
  var sord = opt.$grid.jqGrid('getGridParam','sortorder');
  var billType = opt.billType;
  var data = {
    sidx: sidx,
    sord: sord,
    op: 2
  };

  if(opt.isShow){var isShow=opt.isShow};

  if(opt.filterConditions){
    data = $.extend(true, data, opt.filterConditions);
  };
  if(voucherIds) {
    data.id = voucherIds;
  };
  $.dialog({
    title: opt.title,
    content : 'url:../print/print-settings-voucher.jsp',
    data: {taodaData: data, pdfData: data, pdfUrl: pdfUrl, billType:billType ,opt:opt,isShow:isShow},
    width: 520,
    height: 400,
    min: false,
    max: false,
    lock: true,
    ok: function(){
      this.content.doPrint();
      return false;
    },
    okVal: '打印',
    cancel: true
  });
};
//生成树
Public.zTree = {
  init: function($target, opts, setting ,callback) {
    var tree = {
      zTree: {},
      opts:{
        showRoot:true,
        defaultClass:'',
        disExpandAll:false,//showRoot为true时无效
        callback:'',
        rootTxt:'全部'
      },
      setting: {
          edit: {
            enable: false
          },
          check: {
            enable: false
          },
          view: {
              dblClickExpand: false,
              showLine: true,
              selectedMulti: false
          },
          data: {
              simpleData: {
                  enable: true,
                  idKey: "id",
                  pIdKey: "parentId",
                  rootPId: ""
              }
          },
          callback: {
              //beforeClick: function(treeId, treeNode) {}
          }
      },
      _getTemplate: function(opts) {
        this.id = 'tree'+parseInt(Math.random()*10000);
          var _defaultClass = "ztree";
          if (opts) {
              if(opts.defaultClass){
                  _defaultClass += ' ' + opts.defaultClass;
              }
          }
          return '<ul id="'+this.id+'" class="' + _defaultClass + '"></ul>';
      },
      getData: function(opts) {
        var self = this;
        self.opts = $.extend(true, self.opts, opts);
        var opts = self.opts;
        var selectedValue = opts.queryString;
        if(selectedValue == undefined || selectedValue == 'undefined' || selectedValue == 'null' || selectedValue == null){
          selectedValue = "";
        }
        selectedValue = encodeURI(encodeURI(selectedValue));//防止中文乱码
        // Public.ajaxPost(opts.url || '../basedata/assist.do?action=list&typeNumber='+opts.typeNumber+'&isDelete=2&selectedValue='+selectedValue, {}, function(data) {
        //   if (data.status === 200 && data.data) {
        //       self.render(data.data.items);
        //     } else {
        //       Public.tips({
        //         type: 2,
        //         content: "加载失败！"
        //       });
        //     }
        // });
        opts.typeNumber = opts.typeNumber ? opts.typeNumber : 'trade'
        opts.isDelete = opts.isDelete ? opts.isDelete : '2'
        $.ajax({
          url: opts.url || '../basedata/assist.do?action=list&typeNumber='+opts.typeNumber+'&isDelete='+opts.isDelete+'&selectedValue='+selectedValue,
          type: 'GET',
          data: opts.postData,
          dataType: 'json',
          async:false,//同步执行，防止出现执行不成功的问题
          success: function(data){
            if (data.status === 200 && data.data) {
              self.render(data.data.items);
            } else {
              Public.tips({
                type: 2,
                content: "加载失败！"
              });
            }
          }
        })
      },
      render: function(data) {
        var self = this;
        // var data = self.ajaxData || [];
        var callback = self.opts.afterRender;
        if(self.opts.showRoot){
          data.unshift({name:self.opts.rootTxt,id:0});
            self.obj.addClass('showRoot');
        }
        if(!data.length) return;
        self.zTree = $.fn.zTree.init(self.obj, self.setting, data);
        //self.zTree.selectNode(self.zTree.getNodeByParam("id", 101));
        self.zTree.expandAll(!self.opts.disExpandAll);
        if(callback && typeof callback === 'function'){
          callback(self, data);
        }
      },
      init: function($target, opts, setting ,callback) {
          if ($target.length === 0) {
              return;
          }
          var self = this;
          self.opts = $.extend(true, self.opts, opts);
          self.container = $($target);
          self.obj = $(self._getTemplate(opts)); 
          self.container.append(self.obj);
          setting = $.extend(true, self.setting, setting);
          
          self.getData();
          var callback = self.opts.inited;
          if(callback && typeof callback === 'function'){
            callback(self);
          }
          return self;
      }
    }
    return tree.init($target, opts, setting ,callback)
  }
};
//分类下拉框
// initload=0;  //增加统计变量，判断是否为首次加载
// int_flag="";
Public.categoryTree = function($obj, opts) {
  // 处理模糊搜索调用接口太频繁问题
  var _last;
  if ($obj.length === 0) {
        return;
    }
  opts = opts ? opts : opts = {};
  var opts = $.extend(true, {
    inputWidth:'145',
    width:'',//'auto' or int
    height:'240',//'auto' or int
    trigger:true,
    defaultClass:'ztreeCombo',
    disExpandAll:false,//展开全部
    defaultSelectValue:0,
    showRoot:true,//显示root选择
    rootTxt:'',
    queryString: '',
    treeSettings : {
      callback:{
        beforeClick: function(treeId, treeNode) {
          if(_Combo.obj){
            _Combo.obj.val(treeNode.name);
            _Combo.obj.data('id', treeNode.id);
            _Combo.hideTree();
            // $("#category").val(treeNode.name);
            // $("#category").data('id', treeNode.id);
            // $("#category").click();
            // $(".ztreeCombo").remove()
          }
        }
      }
    }
  }, opts);
  var readonly = opts.disable ? ' readonly' : '';
  var _Combo = {
    container:$('<span class="ui-tree-wrap" style="width:'+opts.inputWidth+'px"></span>'),
    // obj : $('<input type="text" class="input-txt" style="width:'+(opts.inputWidth-26)+'px" id="'+$obj.attr('id')+'" onkeyup="Public.categoryTree($category,null);int_flag=1" onclick="Public.categoryTree($category,null);int_flag=1" autocomplete="off"  placeholder="类别" value="'+($obj.val()||$obj.text())+'">'),
    obj : $('<input type="text" class="input-txt" style="width:'+(opts.inputWidth-26)+'px" id="'+$obj.attr('id')+'" autocomplete="off"  placeholder="类别"'+ readonly +' value="'+($obj.val()||$obj.text())+'">'),
    trigger : $('<span class="trigger"></span>'),
    data:{},
    // filterTree:function(){
    //  var selectedValue = $.trim($("#category").val());
    //  if(selectedValue != ""){
    //    init();
    //  }
    //  setTimeout(function(){$("span[id$=_1_span]").html("全部");},300);
    // },
    init: function(){
      var _parent = $obj.parent();
      var _this = _Combo;
      $obj.remove();
      _this.obj.appendTo(_this.container);
      if(opts.trigger){
        _this.container.append(_this.trigger);
      }
      _this.container.appendTo(_parent);
      var len=$(".ztreeCombo").length;
      for(var i = 0; i < len; i++){
        if(i==len){
          $(".ztreeCombo").eq(i).show();
        }else{
          // $(".ztreeCombo").eq(i).remove();
        };
      };
      // setTimeout(function(){$("span[id$=_1_span]").html("全部");},300);
      // after Tree Render
      opts.afterRender = function(publicTree ,data){
        _this.zTree = publicTree;
        
        //_this.data = data;
        if(publicTree){
          for ( var i = 0, len = data.length; i < len; i++){
            _this.data[data[i].id] = data[i];
          };
          if(opts.defaultSelectValue !== ''){
            _this.selectByValue(opts.defaultSelectValue);
          };
        }
      };
      opts.inited = function(publicTree){
        _this.zTree = publicTree;
        //_this.data = data;
        if(publicTree){
          publicTree.obj.css({
            'max-height' : opts.height
          });
          _this._eventInit();
          $(".ztreeCombo").css({"top":"143px","left":"524px","width":"250px"});
          $(".inventory .ztreeCombo").css({"top":"50px","left":"319px","width":"200px"});
          // _this.showTree();
        }
      }
      
      _this.zTree = Public.zTree.init($('body'), opts , opts.treeSettings);
      return _this;
    },
    showTree:function(){
      var _this = _Combo;
      if(!_this.zTree)return;
      if(_this.zTree){
        var offset = _this.obj.offset();
        var topDiff = _this.obj.outerHeight();
        var w = opts.width? opts.width : _this.obj.width();
        var _o = _this.zTree.obj.hide();
        _o.css({width:w, top:offset.top + topDiff,left:offset.left-1});
      }
      var _o = _this.zTree.obj.show();
      _this.isShow = true;
      _this.container.addClass('ui-tree-active');

      // 有新增的按钮
      if (opts.extraListHtml) {
        var rights = {
          'customertype' : 'BUTYPE_ADD',// '客户',
          'supplytype' : 'SUPPLYTYPE_ADD',// '供应商',
          'trade' : 'TRADETYPE_ADD'// '商品'
        };
        $('<div class="extra-list-ctn"></div>').append(opts.extraListHtml).appendTo($('body')).css({
          "top":$(_this.zTree.obj[0])[0].offsetTop + $(_this.zTree.obj[0]).innerHeight() + 'px',
          "left":$(_this.zTree.obj[0])[0].offsetLeft + 'px',
          "width": opts.extraListHtmlWidth + "px",
          "position":"absolute"})
        .bind('click', function(e){
          e.preventDefault();
          $(this).remove()
          if (rights[opts.typeNumber] && !Business.verifyRight(rights[opts.typeNumber])) {
            return ;
          };
          var callback=function(data,dialogWin){
            // _this.zTree.getData(opts)
            // _this.selectByText(data.name)
            // _this.selectByValue(data.id)
            // _Combo.obj.data('id', data.id);
            // _this.zTree.getData(opts)
            // categoryCombo.loadData(function(){return defaultPage.SYSTEM.categoryInfo[opts.typeNumber]}, '-1', false);
            var parentId = $('#ParentCategory').data('PID');
            var parentNode = _this.zTree.zTree.getNodeByParam('id',parentId,null)
            _this.addData(parentNode,data);
            _Combo.obj.val(data.name)
            dialogWin.close();
          };
          Public.categoryPop1(opts.typeNumber,window.parent,{},callback);
        });
      }
    },
    hideTree:function(){
      var _this = _Combo;
      if(!_this.zTree)return;
      var _o = _this.zTree.obj.hide();
      _this.isShow = false;
      // 隐藏extrahtml
      _this.zTree.obj.siblings('.extra-list-ctn').hide().remove();
      _this.container.removeClass('ui-tree-active');
      if(opts.callback) opts.callback()
    },
    _eventInit: function(){
      var _this = this;
      if(opts.trigger){
        _this.trigger.on('click',function(e){
          e.stopPropagation();
          if(_this.zTree && !_this.isShow){
            _this.showTree();
          }else{
            _this.hideTree();
          }
        });
      };
      _this.obj.on('click',function(e){
        e.stopPropagation();
        if(_this.zTree && !_this.isShow){
          _this.showTree();
        }else{
          _this.hideTree();
        }
      });
      _this.obj.on('keyup', function(e){
        e.stopPropagation();
        var self = $(this);
        _last = e.timeStamp;
        setTimeout(function() {
          if (_last - e.timeStamp == 0) {
            // 如果时差为0 （表示停止输入1s之内都没有keyup事件发生）则调用一次接口
            _this.zTree.getData({queryString: self.val()});
            // setTimeout(function(){$("span[id$=_1_span]").html("全部");},300);
          }
        }, 1000)
      })
      if(_this.zTree){
        _this.zTree.obj.on('click',function(e){
          e.stopPropagation();
        });
      }

      $(document).click(function(){
        _this.selectByText($(_this.obj).val())
        _this.hideTree();
      });
        
    },
    getValue:function(){
      var id = this.obj.data('id') || 0;
      // text不唯一，不能用text去匹配id，若有重复，会始终匹配到最后一个
      // if(!id){
      //   var text = this.obj.val();
      //   if(this.data){
      //     for(var item in this.data){
      //       if(this.data[item].name === text){
      //         id = this.data[item].id;
      //       }
      //     }
      //   }
      // }
      return id;
    },
    getText:function(){
      if(this.obj.data('id'))
        return this.obj.val();
      return '';
    },
    selectByValue:function(value){
      if(value !== ''){
        if(this.data){
          this.obj.data('id', value);
          var _temp = this.data[value] 
          if (_temp) {
            this.obj.val(_temp.name);
          } else {
            this.obj.val('');
          }
        }
      }
      return this;
    },
    addData: function(parentNode, data){
      this.zTree.zTree.addNodes(parentNode, {name:data.name, id: data.id});
      this.data[data.id] = data
    },
    selectByText: function(value) {
      if(value !== ''){
        if(this.data){
          for(_temp in this.data) {
            var _temp = this.data[_temp];
            if (_temp.name === value) {
              this.obj.val(_temp.name)
              return this;
            }
          };
          this.obj.val('');
        }
      }
      return this;
    }
  };
  return _Combo.init();
};
Public.batchSetGoodsTree = function($obj, opts) {
    if ($obj.length === 0) {
          return;
      }
    opts = opts ? opts : opts = {};
    var opts = $.extend(true, {
      inputWidth:'110',
      width:'',//'auto' or int
      height:'240',//'auto' or int
      trigger:true,
      defaultClass:'ztreeCombo',
      disExpandAll:false,//展开全部
      defaultSelectValue:0,
      showRoot:true,//显示root选择
      rootTxt:'全部',
      treeSettings : {
        callback:{
          beforeClick: function(treeId, treeNode) {
            if(_Combo.obj){
              _Combo.obj.val(treeNode.name);
              _Combo.obj.data('id', treeNode.id);
              _Combo.hideTree();
            }
          }
        }
      }
    }, opts);
    var _Combo = {
      container:$('<span class="ui-tree-wrap" style="width:'+opts.inputWidth+'px"></span>'),
      obj : $('<input type="text" class="input-txt" style="width:'+(opts.inputWidth-26)+'px" id="'+$obj.attr('id')+'" autocomplete="off"  placeholder="全部"  readonly value="'+($obj.val()||$obj.text())+'">'),
      trigger : $('<span class="trigger"></span>'),
      data:{},
      init : function(){
        var _parent = $obj.parent();
        var _this = this;
        $obj.remove();
        this.obj.appendTo(this.container);
        if(opts.trigger){
          this.container.append(this.trigger);
        }

        this.container.appendTo(_parent);
        opts.callback = function(publicTree ,data){
          _this.zTree = publicTree;
          //_this.data = data;
          if(publicTree){
            publicTree.obj.css({
              'max-height' : opts.height
            });
            for ( var i = 0, len = data.length; i < len; i++){
              _this.data[data[i].id] = data[i];
            };
            if(opts.defaultSelectValue !== ''){
              _this.selectByValue(opts.defaultSelectValue);
            };
            _this._eventInit();
          }
        };
        this.zTree = Public.zTree.init($('body'), opts , opts.treeSettings);
        return this;
      },
      showTree:function(){
        if(!this.zTree)return;
        if(this.zTree){
          var offset = this.obj.offset();
          var topDiff = this.obj.outerHeight();
          var w = opts.width? opts.width : this.obj.width();
          var _o = this.zTree.obj.hide();
          _o.css({width:w, top:offset.top + topDiff,left:offset.left-1});
        }
        var _o = this.zTree.obj.show();
        this.isShow = true;
        this.container.addClass('ui-tree-active');
      },
      hideTree:function(){
        if(!this.zTree)return;
        var _o = this.zTree.obj.hide();
        this.isShow = false;
        this.container.removeClass('ui-tree-active');
      },
      _eventInit: function(){
        var _this = this;
        if(opts.trigger){
          _this.trigger.on('click',function(e){
            e.stopPropagation();
            if(_this.zTree && !_this.isShow){
              _this.showTree();
            }else{
              _this.hideTree();
            }
          });
        };
        _this.obj.on('click',function(e){
          e.stopPropagation();
          if(_this.zTree && !_this.isShow){
            _this.showTree();
          }else{
            _this.hideTree();
          }
        });
        if(_this.zTree){
          _this.zTree.obj.on('click',function(e){
            e.stopPropagation();
          });
        }
        $(document).click(function(){
          _this.hideTree();
        });
      },
      getValue:function(){
        var id = this.obj.data('id') || '';
        if(!id){
          var text = this.obj.val();
          if(this.data){
            for(var item in this.data){
              if(this.data[item].name === text){
                id = this.data[item].id;
              }
            }
          }
        }
        return id;
      },
      getText:function(){
        if(this.obj.data('id'))
          return this.obj.val();
        return '';
      },
      selectByValue:function(value){
        if(value !== ''){
          if(this.data){
            this.obj.data('id', value);
            this.obj.val(this.data[value].name);
          }
        }
        return this;
      }
    };
    return _Combo.init();
  };
/*
 * 分类新增弹窗
 * 不支持多级结构（树）
 * type string 分类类型
 * parentWin object 父窗口对象,决定弹窗的覆盖范围，默认当前窗口的parent
 */
Public.categoryPop1 = function(type,targetWin,opts,callback){ 
  var defaultPage = Public.getDefaultPage();
  var self = {
      init:function(){
        var myParent = targetWin || parent;
        var showParentCategory = false;
        var content = ['<form id="manage-form" action="">',
                     '<ul class="mod-form-rows manage-wrap" id="manager" style="width:300px;>',
                     '<li class="row-item" style="position:relative; ">',
                         '<div class="label-wrap"><span class="red spe_red">*</span><label for="ParentCategory">上级分类:</label></div>',
                         '<div class="ctn-wrap" style="position:relative;margin-bottom:10px"><input type="text" value="" class="ui-input" name="ParentCategory" id="ParentCategory" readonly></div>',
                         '<div class="dn hideFeild" style="margin-left:70px"></div>',
                     '</li>',
                     '<li class="row-item">',
                         '<div class="label-wrap"><span class="red spe_red">*</span><label for="category2">类别:</label></div>',
                         '<div class="ctn-wrap" style="margin-top:10px"><input type="text" value="" class="ui-input" name="category" id="category2"></div>',
                     '</li>',
                 '</ul>',
               '</form>'];
        this.dialog = $.dialog({
          title : '新增类别',
          content : content.join(''),
          //data: data,
          width : 400,
          height : 150,
          max : false,
          min : false,
          cache : false,
          lock: true,
          okVal:'确定',
          ok:function(){
            var category = $.trim($('#category2').val());
            var parentId = $('#ParentCategory').data('PID');
            if(!category){
              defaultPage.Public.tips({type:1,content : '请输入类别名称！'});
              // category.focus();
              return false;
            }
            var oper = 'add'; 
            var params = { name: category ,typeNumber: type, parentId:parentId};
            var msg = '新增类别';
            Public.ajaxPost('../basedata/assist.do?action=' + oper, params, function(data){
              if (data.status == 200) {
                defaultPage.Public.tips({content : msg + '成功！'});
                // defaultPage.SYSTEM.categoryInfo[type].push(data.data);
                if(typeof callback ==='function'){
                  callback(data.data,self.dialog);
                }
              } else {
                defaultPage.Public.tips({type:1, content : msg + '失败！' + data.msg});
              }
            });
            return false;
          },
          cancelVal:'取消',
          cancel:function(){
            return true;
          },
          init:function(){  
            var $hideFeild = $('.hideFeild'),
            $parentCategory = $('#ParentCategory'),
            $category2 = $('#category2');
              //弹出分类树
            $('#ParentCategory').click(function(e){
              e.stopPropagation()
              if($hideFeild.show().data('hasInit'))return;
              $hideFeild.show().data('hasInit',true);
              Public.zTree.init($hideFeild, {defaultClass:'ztreeDefault', typeNumber: type, postData:opts.postData,defaultSelectValue:opts.defaultSelectValue}, {callback:{
                beforeClick: function(treeId, treeNode) {
                  $parentCategory.val(treeNode.name);
                  $parentCategory.data('PID',treeNode.id);
                  $hideFeild.hide();
                }
              }});
            });
            $('.ui_dialog').click(function(e){
              $hideFeild.hide();
            });
            $('#ParentCategory').closest('.row-item').click(function(e){
              var ev = e || window.event;
                  if(ev.stopPropagation){
                      ev.stopPropagation();
                  }
                  else if(window.event){
                      window.event.cancelBubble = true;//兼容IE
                  }
            });
          }
        })
      }
  }  
  self.init();
}
Public.categoryPop = function(type,targetWin,callback){ 
  var defaultPage = Public.getDefaultPage();
  var self = {
      init:function(){
        var myParent = targetWin || parent;
        var showParentCategory = false;
        var content = $(['<form id="manage-form" action="" style="width: 282px;">',
                       '<ul class="mod-form-rows manage-wrap" id="manager">',
                       '<li class="row-item">',
                           '<div class="label-wrap"><label for="category">类别:</label></div>',
                           '<div class="ctn-wrap"><input type="text" value="" class="ui-input" name="category" id="category" style="width:190px;"></div>',
                       '</li>',
                   '</ul>',
                 '</form>'].join(''));
        var height = 90;
        var dialog = myParent.$.dialog({
          title : '新增类别',
          content : content,
          //data: data,
          width : 400,
          height : height,
          max : false,
          min : false,
          cache : false,
          lock: true,
          okVal:'确定',
          ok:function(){
            var category = $.trim(content.find('#category').val());
            if(!category){
              defaultPage.Public.tips({type:1,content : '请输入类别名称！'});
              // category.focus();
              return false;
            }
            var oper = 'add'; 
            var params = { name: category ,typeNumber: type};
            var msg = '新增类别';
            Public.ajaxPost('../basedata/assist.do?action=' + oper, params, function(data){
              if (data.status == 200) {
                defaultPage.Public.tips({content : msg + '成功！'});
                defaultPage.SYSTEM.categoryInfo[type].push(data.data);
                if(typeof callback ==='function'){
                  callback(data.data,dialog);
                }
              } else {
                defaultPage.Public.tips({type:1, content : msg + '失败！' + data.msg});
              }
            });
            return false;
          },
          cancelVal:'取消',
          cancel:function(){
            return true;
          }
        });
      }
  };
  self.init();
};
/*
 * 兼容IE8 数组对象不支持indexOf()
 * create by guoliang_zou ,20140812
 */
if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(elt /*, from*/)
  {
    var len = this.length >>> 0;
    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;
    for (; from < len; from++)
    {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };
}
$(function(){
  /**
   * 页面配置模块
   * @param  {string}  id               页面ID ，标识
   * @return {[type]}                   [description]
   */
  Public.mod_PageConfig = (function(mod) {
    var inited = false,//模块启动开关
    defaultPage = Public.getDefaultPage(),
    SYSTEM = defaultPage.SYSTEM,
    conf;//当前页配置

    mod.init = function(id){
      inited = true;
      mod.pageId = id;
      SYSTEM.pageConfigInfo = SYSTEM.pageConfigInfo || {};
      SYSTEM.pageConfigInfo[''+ id] = SYSTEM.pageConfigInfo[''+ id] || {};
      conf = SYSTEM.pageConfigInfo[''+ id];
      _eventReg();//页面事件注册
      mod.gridReg = _gridReg;
      mod.conf = conf;
      mod.config = _config;
      mod.updatePageConfig = _updatePageConfig;
      mod.setGridWidthByIndex = _setGridWidthByIndex;
      return mod;
    };
    function _config(){
      var content = [
        '<div class="content" id="c_content">',
          '<ul class="c_wrapper" id="c_wrapper" style="margin-left:-10px;">',
          '</ul>',
        '</div>'
      ];
      $.dialog({
        title: '表格列配置',
        content: content.join(''),
        width: 610,
        height: 300,
        lock:true,
        init: function (){
          var $_tab = $('<ul class="ui-dialog-tab" id="c_tab" style="position:relative;top:-7px;margin-right:-20px;width:482px"></ul>');
          var $_wrapper = $('#c_wrapper');
          var count = 0;
          if (conf.grids.length > 1) {//设计要求增加左右边缘线
            $('.content').before('<div class="ui-caption-border"></div>');
          };
          for(var gridId in conf.grids){
            var conf_grid = conf.grids[gridId] || {};
            if(typeof conf.grids[gridId] != 'function' && conf_grid.isReg){
              var $grid = $('#' + gridId);
              var configGridId = 'c_'+gridId;
              var _caption = conf_grid.caption ? conf_grid.caption: '';
              $_tab.append('<li><p class="caption">'+_caption+'</p></li>');
              $_tab.css('border-bottom','1px solid #dcdcdc');
              $_wrapper.append([
                '<li class="grid-wrap dn">',
                    '<table id="'+configGridId+'">',
                    '</table>',
                    '<div class="c_btn">',
                    '<p class="c_upmove ui-btn" id=J_upmove_'+count+'>前移<span class="c-up-icon"></span></p>',
                    '<p class="c_downmove ui-btn" id=J_downmove_'+count+'>后移<span class="c-down-icon"></span></p></div>',
                  '</li>'
                   
              ].join(''));
              count++;
              var dataArr = conf_grid.colModel;//缓存里的配置信息
              var _dataArr=[];
              for (var i = 0; i < dataArr.length; i++) {
                var col = dataArr[i];
                if(!col)continue;
                if($.trim(col['label']) && !col.defhidden && !col.disConfigured){
                  _dataArr.push(col);
                }
              };
              var $configGrid = $('#'+configGridId);
              $configGrid.jqGrid({
                data:_dataArr,
                datatype: "clientSide",
                width:480,
                // autowidth:true,
                height: 290,
                rowNum:100,
                rownumbers: true,
                gridview: true,
                onselectrow: false,
                idPrefix: 'c_gridId_',  //表格id前缀
                colModel: [
                  {name:'name', label:'列名' ,hidden: true},
                  {name:'defLabel', label:'列名称' , width:100},
                  {name:'label', label:'列名称' , width:100 ,hidden:true},
                  {name:'aname', label:'别名' , width:100 , editable:true ,
                  unformat:function( text, options, cellval){
                    var ret, formatType = options.colModel.formatter,
                    op =options.colModel.formatoptions || {}, sep,
                    re = /([\.\*\_\'\(\)\{\}\+\?\\])/g,
                    op = $.extend({},($.jgrid.formatter || {}).currency,op);
                    sep = op.thousandsSeparator.replace(re,"\\$1");
                    stripTag = new RegExp(sep, "g");
                    ret = $(cellval).text();
                    if (op.prefix && op.prefix.length) {
                      ret = ret.substr(op.prefix.length);
                    }
                    if (op.suffix && op.suffix.length) {
                      ret = ret.substr(0, ret.length - op.suffix.length);
                    }
                    ret = ret.replace(stripTag,'').replace(op.decimalSeparator,'.').replace('*','');
                    return ret;
                  },
                  formatter:function(val ,opts, row){
                    if(!val){
                      val = row['label'];
                    }
                    var rowData = $('#' + opts.gid).jqGrid('getRowData','c_gridId_' + opts.rowId);
                    if(!$.isEmptyObject(rowData) && rowData['label'].indexOf('*') !== -1){
                      val = val ? '<span class="red">*</span>' + val : '';
                    }
                    return val;
                  }},
                  {name:'hidden', label:'是否显示' , width:50, align:'center', formatter:function(val ,opts, row){
                    //var text = val == true ? '已隐藏' : '已显示';
                    var isShow = '<span class="set-status open"><span class="ui-icon-circle"></span></span>';
                    var isHide = '<span class="set-status close"><span class="ui-icon-circle"></span></span>';
                    var status = val == true ? isHide : isShow;
                    return status;
                  }}
                ],
                shrinkToFit: true,
                forceFit: true,
                cellEdit: true,
                cellsubmit: 'clientArray',
                afterSaveCell: function(rowid,name,val,iRow,iCol) {
                  switch(name){
                    case 'aname': 
                    if(!$.trim(val)) {
                      defaultPage.Public.tips({type:2 , content:'请输入别名！'});
                      return;
                    }else{
                      var rowData = $(this).jqGrid('getRowData',rowid);
                      if (rowData['label'].indexOf('*') !== -1) {
                        rowData.aname = '<span class="red">*</span>' + rowData.aname;
                      }
                      var $_grid = $('#' + $(this)[0].id.split('_')[1]);
                      $_grid.jqGrid('setColProp',rowData['name'], { label : rowData.aname });
                      $configGrid.jqGrid('setRowData',rowid,{ label : rowData.aname });
                      /*if (_checkDuplicate()) { //不重复才更改单据或报表表格里的列名
                      }*/
                      //去掉别名校验吧
                      var $th = $('#jqgh_'+ $_grid[0].id + '_' + rowData['name']);
                      $th.html($th.html().replace(rowData['label'], rowData.aname));
                      _updatePageConfig($_grid[0].id, ['label' ,rowData.name, rowData['aname']]);  
                      return val;
                    }
                    break;
                  }
                },
                loadComplete: function (data) {
                  var rows = data['rows'];
                  var $this = $(this);
                  $.each(rows, function (i, el) {
                    if (el.frozen) {
                      $this.find('#c_gridId_' + (i + 1)).addClass('disabled');
                    }
                  })
                }
              });
              (function($grid, $configGrid){
                $configGrid.on('click', '.set-status', function(event) {
                  event.preventDefault();
                  /* Act on the event */
                  var $this = $(this);
                  var id = $this.closest('tr')[0].id;
                  var rowData = $configGrid.jqGrid('getRowData',id);
                  if($this.hasClass('open')){ //点击。隐藏状态
                    _updatePageConfig($grid[0].id,['hidden',rowData.name,true]);
                    $configGrid.jqGrid('setCell', id, 'hidden', true);//小表格
                    $grid.jqGrid('hideCol', rowData['name']);//大表格
                  }else{
                    _updatePageConfig($grid[0].id,['hidden',rowData.name,false]);
                    $configGrid.jqGrid('setCell', id, 'hidden', false); //小表格
                    $grid.jqGrid('showCol', rowData['name']); //大表格
                  }
                });

                $configGrid.on('click', 'tr:not(0)', function(event) {
                 $(this).addClass('selected-row');
                 $(this).siblings().removeClass('selected-row ui-state-hover');
                 $(this).siblings().find('td').removeClass('ui-state-highlight');
                });

                //列设置上下移动
                $(".c_upmove").on('click',function(event){
                  _cancelGridEdit();
                  var curGrid = $(this).closest('li').find($configGrid);
                  if(curGrid.length !== 0){
                    var $selectRow = curGrid.find("tr.selected-row");
                    if($selectRow.length == 0){
                      defaultPage.Public.tips({type:2 , content:'请选择要移动的行！'});
                      return
                    };
                    if($selectRow.prev().hasClass('jqgfirstrow')){
                      defaultPage.Public.tips({type:2 , content:'已经是第一行了！'});
                      return
                    };
                    $selectRow.insertBefore($selectRow.prev());  //$selectRow.prev().before($selectRow);
                    $selectRow.siblings().removeClass('ui-state-hover');
                    var curRowid = $selectRow.attr('id'),
                        prevRowid = $selectRow.next().attr('id'),
                        curRowData = $(curGrid).jqGrid('getRowData',curRowid),
                        prevRowData = $(curGrid).jqGrid('getRowData',prevRowid);
                    _updateColumnConfig($grid[0].id, ['prev',curRowData.name,prevRowData.name]);
                  }
                });

                $('.c_downmove').on('click',function(event){
                  _cancelGridEdit();
                  var curGrid = $(this).closest('li').find($configGrid);
                  if(curGrid.length !== 0){
                    var $selectRow = curGrid.find("tr.selected-row");
                    if($selectRow.length == 0){
                      defaultPage.Public.tips({type:2 , content:'请选择要移动的行！'});
                      return
                    };
                    if($selectRow.next().length == 0){
                      defaultPage.Public.tips({type:2 , content:'已经是最后一行了！'});
                      return
                    };
                    $selectRow.insertAfter($selectRow.next());
                    $selectRow.siblings().removeClass('ui-state-hover');
                    var curRowid = $selectRow.attr('id'),
                        nextRowid = $selectRow.prev().attr('id'),
                        curRowData = $(curGrid).jqGrid('getRowData',curRowid),
                        nextRowData = $(curGrid).jqGrid('getRowData',nextRowid);
                    _updateColumnConfig($grid[0].id, ['next',curRowData.name,nextRowData.name]);
                  }  
                });     
              })($grid, $configGrid);
            }
          };
          if(count == 1) {
            $_tab.hide();
          }
          $('.ui_content').prepend($_tab);
          $_tab.on('click', 'li', function(event) {
            event.preventDefault();
            /* Act on the event */
            var $this = $(this);
            var _index = $this.index();
            $this.addClass('cur').siblings('.cur').removeClass('cur');
            $_wrapper.find('li:eq('+_index+')').show().siblings().hide();
          });
          //第一个tab选中
          $_tab.find('li:eq(0)').addClass('cur');
          $_wrapper.find('li:eq(0)').show();
        },
        button:[
          {name: '恢复默认设置',defClass:'ui_state_highlight', callback: function () {
            var thisPop = this;
            _cancelGridEdit();
            $.dialog.confirm('该操作会刷新当前页签，是否继续?', function(){
              SYSTEM.pageConfigInfo[''+ mod.pageId] = null;
              _deleteConfig();
              $(window).unbind('unload');
              location.reload();
              thisPop.close();
            })
            return false;
          }},
          {name: '完成', defClass:'completeBtn',callback: function () {
            _cancelGridEdit();
            /*if (!_checkDuplicate()) {
              defaultPage.Public.tips({type:2 , content:'别名已存在，不允许重复！'});
              return false;
            }*/
            if (!_checkBlank()) {
              defaultPage.Public.tips({type:2 , content:'请输入别名！'});
              return false;
            }
            _updateConfig(_formatPostData());
            return true;
          }}
        ]
      });
    };
    function _checkBlank(){
      var table = $('#c_content').find('.ui-jqgrid-btable');
      var isBlank = false;
      $.each(table,function(index, el) {
        var ids = $(el).jqGrid("getDataIDs");
        $.each(ids,function(i,item){
          var aRowData = $(el).jqGrid('getRowData',item);
          if(aRowData.aname === ''){
            $(el).jqGrid('editCellByColName', item, 'aname');
            isBlank = true;
          }
        });
      });
      return !isBlank;
    }
    function _checkDuplicate(){
      var table = $('#c_content').find('.ui-jqgrid-btable');
      var isDuplicate = false;
      $.each(table,function(index, el) {
        var ids = $(el).jqGrid("getDataIDs"),aname = [];
        $.each(ids,function(i,item){
          var aRowData = $(el).jqGrid('getRowData',item);
          if($.inArray(aRowData.aname,aname) != -1){
            $(el).jqGrid('editCellByColName', item, 'aname');
            isDuplicate = true;
          }else{
            aname.push(aRowData.aname);
          }
        });
        if(ids.length === aname.length){
          isDuplicate = false;
        } 
      });
      return !isDuplicate;
    }
    function _cancelGridEdit(){
        for(var gridId in conf.grids){
            var conf_grid = conf.grids[gridId] || {};
            if(typeof conf.grids[gridId] != 'function' && conf_grid.isReg){
                var $grid = $('#' + gridId);
                var configGridId = 'c_'+gridId;
                var $confGrid = $('#'+configGridId);
                if($confGrid[0].p.savedRow.length != 0){
                    $confGrid.jqGrid("saveCell", $confGrid[0].p.savedRow[0].id, $confGrid[0].p.savedRow[0].ic);
                }
            }
        }
    };
    function _updatePageConfig(gridId, prop){
      //为了区分用户修改，必须精确到每个字段的每个属性 prop = [propName, colName, propValue];
      if(!conf.grids || !conf.grids[gridId] || !conf.grids[gridId].isReg || !prop || prop.length != 3){
        return ;
      }
      prop = {
        propName : prop[0],
        colName : prop[1],
        propValue : prop[2]
      }
      var g = conf.grids[gridId];
      for (var i = 0; i < g.colModel.length; i++) {
        var c1 = g.colModel[i];
        if(c1.name == prop.colName){
          c1[prop.propName] = prop.propValue;
        }
      };
      conf.curTime = Date.parse(new Date());
    };

    function _updateColumnConfig(gridId, prop){
      if(!conf.grids || !conf.grids[gridId] || !conf.grids[gridId].isReg || !prop){
        return ;
      }
      var g = conf.grids[gridId],cmMap = {},permutation = [],name1 = prop[1],name2 = prop[2],name3
      var ts = $('#' + gridId).closest('.ui-jqgrid').find('.ui-jqgrid-btable')[0];
      var colModel = ts.p.colModel;

      $.each(colModel, function(i) {
        cmMap[this.name] = i;
        if(colModel[i].name === name2) {
          name3 = colModel[i].link;
        }
      });
      if(prop[0] == 'prev'){
        if (name3) { //存在需要绑定移动的列
          $('#'+gridId+'_'+name3).insertBefore($('#'+gridId+'_'+name2));
        }
        $('#'+gridId+'_'+name1).insertBefore($('#'+gridId+'_'+name2));
      }else if(prop[0] == 'next'){
        if (name3) { //存在需要绑定移动的列
          $('#'+gridId+'_'+name3).insertAfter($('#'+gridId+'_'+name2));
          $('#'+gridId+'_'+name1).insertAfter($('#'+gridId+'_'+name3));
        } else {
          $('#'+gridId+'_'+name1).insertAfter($('#'+gridId+'_'+name2));
        }   
      }
      var p = $('#' + gridId).closest('.ui-jqgrid').find('.ui-jqgrid-labels')[0];
      var th = $('>th',p);
      th.each(function() {
        var id = $(">div", this).get(0).id.replace(/^jqgh_/g,'').replace(gridId+'_','');
        if (cmMap.hasOwnProperty(id)) {
          permutation.push(cmMap[id]);
        }
      });
      var tempArr = $.map(permutation, function(item, index) {
        return {
          val: index,
          index: item
        };
      }).sort(function(a, b){return a.index - b.index;});
      $.each(g.colModel, function(i) {
        var addIndex = tempArr.length - g.colModel.length;
        // 由于保存后的数据和缓存数据兼容的问题使用了c[4] || c[Index]的兼容，
        // c[4]为0会解读为false，从而导致不生效，这里将所有顺序字符串化
        g.colModel[i].Index = '' + tempArr[i + addIndex].val;
      }).sort(function(a, b){return a.Index - b.Index;});
      $('#' + gridId).jqGrid("remapColumns", permutation, true, true);
      conf.curTime = Date.parse(new Date());
    };

    function _gridReg(gridId , defColModel, caption){//表格一定要注册默认配置信息
      if(!defColModel){
        return;
      }
      conf.grids = conf.grids || {};
      conf.grids[gridId] = conf.grids[gridId] || {};
      var g = conf.grids[gridId];
      g.caption = caption;
      g.defColModel = defColModel;//保存默认配置，这里会保存到服务器，暂时不屏蔽
      g.colModel = g.colModel || defColModel;
      //将用户配置合并到默认配置里面去，使得默认配置可以扩展新的字段
      
      var configuredcolModel = [];

      for (var i = 0; i < defColModel.length; i++) {
        if(!defColModel[i]) continue;
        defColModel[i].defLabel = defColModel[i]['label'];

        if(!defColModel[i].hideDefault){//hideDefault--默认隐藏但可以从列配置显示的列
          defColModel[i].defhidden = defColModel[i].hidden;
        }

        c1 = defColModel[i];
        if(g.colModel){ //这个是存在缓存里的上次设置的状态数组。（也就是实际要显示的状态）
          for (var j = 0; j < g.colModel.length; j++) {
            var c = g.colModel[j];
            var name = c[0] || c['name'];
            var label = c[1] || c['label'];
            // c[4] = c[4] == 0 ? String(c[4]) : c[4]
            //if(c[0] === 'barCode' || c[0] === 'customerInvNumber'/*|| c[0] === 'goodsDiscountRate'*/){ //条码字段默认隐藏
            if(c[5] === true){
              var c2 = {
                 name: c[0] || c['name']
                ,label: c[1] || c['label']
                ,hidden: c[2]
                ,width: name === 'operating' && !$.trim(label) ? '0' : c[3] || c['width'] //操作列隐藏
                ,Index: c[4] || c['Index']
              };
            }else{
              var c2 = {
                 name: c[0] || c['name']
                ,label: c[1] || c['label']
                ,hidden: c.defhidden ? c1.hidden : (c[2] || c['hidden']) //c有defhidden 就是从缓存取的，因为数据库没有存def配置，处理因为缓存导致刷新子页面而把新放开/权限的字段给默认隐藏了
                ,width: name === 'operating' && !$.trim(label) ? '0' : c[3] || c['width'] //操作列隐藏
                ,Index: c[4] || c['Index']
              };
            }
            if(c1['name'] === c2['name']){
              /*if(c1.hidden && !c[2] && c1['width'] > 0){ //配置中的默认项为显示状态时
                delete c1.hidden; //页面上要删除
              }*/ //xiaoxian
              // c1 = $.extend(true, c1, c2); //这里不能用这个方法，如果拷贝了里面的方法会造成页面执行的方法不一样
              _modelClone(c1 , c2);
              configuredcolModel.push(c1);
            }
          };
        }
      };
      /**
       * 手贱勿动
       *newList ->  A B C D E F G
       *oldList ->    C F     B  (不能传 CFBK 这样的，因为k不在newlist中，会报错)
       *result  ->  A C F D E B G
       */
      function ko(oldList,newList){
        var obj2 = {};// {A:{index_0: 0}, B:{index_0: 1}}
        $.map(newList, function(item, index) {
          obj2[item.name] = {index_0: index, info:item};
          return item;
        });
        var newArr = $.map(oldList, function(item, index) {
          return {
            index: obj2[item.name].index_0,
            name:item.name
          };
        }); // => [C2 A0 B1]
        newArr.sort(function(a, b){return a.index - b.index;});  // -> [A B C]

        for (var i = 0; i < newList.length; i++) {
          var c = newList[i];
          if(!(c.Index === undefined)){
            //c.name // C
            for (var j = 0; j < oldList.length; j++) {
              if(oldList[j].name === c.name){
                targetname = newArr[j].name; // A
                break;
              }
            }
            obj2[c.name].index_1 = obj2[targetname].index_0
          }else{
            obj2[c.name].index_1 = obj2[c.name].index_0
          }
        }
        // obj2 =》 {A:{index_0: 0, index_1: 0}, B:{index_0: 1, index_1: 2}, B:{index_0: 1, index_1: 1}}
        var tmpArr = [];
        for(o in obj2){
          tmpArr.push(obj2[o])
        }

        tmpArr.sort(function(a, b){return a.index_1 - b.index_1;}); 
        return $.map(tmpArr, function(item, index) {
          return item.info;
        })
      }
      configuredcolModel.sort(function(a, b){return a.Index - b.Index;}); 
      g.colModel = ko(configuredcolModel, defColModel);//用户列配置扩展
      g.isReg = true;
    };
    function _modelClone(c1, c2 , propName){
      if(propName){
        c1[propName] = c2[propName];
      }else{
        // $.extend(true, c1, {//开放修改的列属性
        //  label: c2['label']//列名
        //  ,hidden: c2['hidden']//显示与隐藏
        //  ,width: c2['width']//宽度
        // });
        $.extend(true, c1, c2);
      }
      return c1;
    }
    function _eventReg(){
      //列配置
      $(window).on('unload',function(){
        if(conf && conf.curTime && conf.modifyTime != conf.curTime){
          conf.modifyTime = conf.curTime;
          // _updateConfig(_formatPostData());//讲道理点击完成的时候已经调用了，把这个注释掉也是可以的..就先注释掉了...PROJECT-24074
        }
      });
    }
    function _updateConfig(value){
      //defaultPage.Public.tips({type:2, content:'保存配置中，请稍候...'});
      defaultPage.$.ajax({
        url: '/basedata/userSetting.do?action=update',
        type: 'POST',
        dataType: 'json',
        data: {
          key : mod.pageId,
          value : value
        },
        async:false,//同步执行，防止出现执行不成功的问题
        timeout:3000
      })
      .done(function(data) {
        console.log("success");
        defaultPage.Public.tips({type:0, content:'保存配置成功'});
      })
      .fail(function(data) {
        //console.log("error");
        //defaultPage.Public.tips({type:1, content:'保存配置失败！'});
      })
      .always(function() {
        //console.log("complete");
      });
    }
    function _deleteConfig(key){
      defaultPage.$.post('/basedata/userSetting.do?action=delete',{
        key : mod.pageId
      })//关闭页面之后回调函数被释放，所以这里不要写回调函数, ie7下会报错
    }
    function _formatPostData(){//表格的列配置转成数组类型减少数据量
      var _conf = $.extend(true, {}, conf);//克隆conf
      for(var gridId in _conf.grids){
        var g = _conf.grids[gridId];
        if(typeof g != 'function' && g.isReg){
          var colModel = g.colModel;
          var tmpArr = [];
          for (var i = 0; i < colModel.length; i++) {
            var col = colModel[i];
            if(!col)continue;
            tmpArr.push([
               col['name']//列名,唯一标识
              ,col['label']//列名
              ,col.defhidden ? null : col['hidden']//显示与隐藏//默认是隐藏的就不受列配置的显影控制
              ,col['width']//宽度
              ,col['Index']//数组位置
              ,col['hideDefault']//默认隐藏，但可以通过列设置显示
            ])
          };
          g.colModel = tmpArr;
          delete g.defColModel;//删除克隆对象中的defColModel，这部分没不要存入数据库
        }
      }
      return JSON.stringify(_conf);
    }
    function _setGridWidthByIndex(newwidth, index, gridId){
      _updatePageConfig(gridId,['width', conf.grids[gridId].colModel[index-1]['name'] , newwidth]);
    }
    return mod;
  })(Public.mod_PageConfig || {})
});

/**
 * 省市区
 * 省下拉框ID：provinceCombo
 * 市下拉框ID：cityCombo
 * 区下拉框ID：areaCombo
 * 需要搭配COMBO插件
 * 默认值放在data('defaultValue')
 */ 
var mod_AreasCombo = (function(mod) {
  var _areasList = [],
    _capable = false,//模块启动开关
    _provinceList = [],
    _cityList = [], 
    _areasCahe = {},
    _pCombo,_cCombo,_aCombo;

  mod.init = function(_provinceCombo,_cityCombo,_areaCombo ,callback){
    _pCombo = _provinceCombo;
    _cCombo = _cityCombo;
    _aCombo = _areaCombo;
    //缓存省市数据
    if(!(_provinceCombo&&_cityCombo&&_areaCombo)){
      return;
    }
  Public.ajaxGet('../js/common/areasData.js', {}, function(data){
      if(data) {
        _capable = true;
        _areasList = data.areas_get_response.areas.area;
        for (i = 0,len = _areasList.length; i < len; i++) {
          if (_areasList[i].type === 2 && _areasList[i].parent_id === 1) {
            _provinceList.push({name:_areasList[i].name,id:_areasList[i].id, type:2, parent_id:1});
          } //中国的省
          if (_areasList[i].type === 3) {
            _cityList.push({name:_areasList[i].name,id:_areasList[i].id,type:_areasList[i].type,parent_id:_areasList[i].parent_id});
          } //中国的市
        }
        mod.provinceCombo = _getCombo( _pCombo,_getProvinceData());
        mod.cityCombo = _getCombo( _cCombo,[]);
        mod.areaCombo = _getCombo( _aCombo,[]);
        //mod.provinceCombo.loadData(_getProvinceData(),-1,false);
        callback();
      } else {
        Public.tips({type: 1, content : '初始化省市区失败！'});
      }
    });
    return mod;
  };
  function _getCombo(obj,data){
    var _disabled = $(obj).hasClass('disabled');
    return obj.combo({
      data: data,
      text: 'name',
      value: 'id',
      width: 112,
      defaultSelected: -1,
      //addOptions: {text:'', value: -1},
      cache: false,
      editable:true,
      disabled: _disabled,
      callback: {
        onFocus: null,
        onBlur: null,
        beforeChange: null,
        onChange: function(){
          switch(this){
          case mod.provinceCombo :
            mod.cityCombo.loadData(_getCityData(mod.provinceCombo.getValue()),-1,false);
            mod.areaCombo.loadData([],-1,false);
            break;
          case mod.cityCombo :
            mod.areaCombo.loadData(_getAreaData(mod.cityCombo.getValue()),-1,false);
            break;
          case mod.areaCombo :
            break;
          default:break;
          }
        },
        onExpand: null,
        onCollapse: null
      }
    }).getCombo();
  };
  function _getProvinceData (){
    var _data = [];
    for (i = 0,len = _provinceList.length; i < len; i++) {
      if (_provinceList[i].type === 2 && _provinceList[i].parent_id === 1) {
        _data.push({name:_provinceList[i].name,id:_provinceList[i].id});
      } 
    }
    return _data;
  };
  function _getCityData (PID){
    var _data = [];
    for (i = 0,len = _cityList.length; i < len; i++) {
      if (_cityList[i].parent_id === PID) {
        _data.push({name:_cityList[i].name,id:_cityList[i].id});
      } 
    }
    return _data;
  };
  function _getAreaData (PID){
    var _data = [];
    //查找缓存
    if(_areasCahe[PID]){
      _data = _areasCahe[PID].areaData;
    }
    //没有缓存则全表查找
    else{
      for (i = 0, len = _areasList.length; i < len; i++) {
        if (_areasList[i].type === 4 && _areasList[i].parent_id === PID) {
          _data.push({name:_areasList[i].name,id:_areasList[i].id});
        }
      }
      //缓存该次查找结果
      _areasCahe[PID] ={areaData : _data} ;
    }
    return _data;
  };
  return mod;
})(mod_AreasCombo || {})
/**
 * 报表联查方法
 * @param  {[type]} params [description] 必填
 * params.transferType 业务类型ID 必填
 * params.id 单据ID 必填
 * params.callback 执行之后的回调
 * template gotoDetailItem({transferType:'001', id: 1, callback:fn})
 * @return void
 */
Public.gotoDetailItem = function(params){
  if(!params)return;
  if(!params.transferType)return;
  if(!params.id)return;
  var urls = {
    //SALE
    '150601' : {tabid : 'sales-sales',text : '销货单',right:'SA_QUERY', url : '/sales/sales.jsp?id='},
    //SALEBACK
    '150602' : {tabid : 'sales-salesBack',text : '销货退货单',right:'SA_QUERY', url : '/sales/sales.jsp?transType=150602&id='},
    //PUR
    '150501' : {tabid : 'purchase-purchase',text : '购货单',right:'PU_QUERY',url : '/purchase/purchase.jsp?id='},
    //PUR
    '150502' : {tabid : 'purchase-purchaseBack',text : '购货退货单',right:'PU_QUERY',url : '/purchase/purchase.jsp?transType=150502&id='},
    //TRANSFER
    '103091' : {tabid : 'storage-transfers',text : '调拨单',right:'TF_QUERY',url : '/storage/transfers.jsp?id='},
    //OO
    '150806' : {tabid : 'storage-otherOutbound',text : '其它出库单',right:'OO_QUERY',url : '/storage/other-outbound.jsp?id='},
    //OI
    '150706' : {tabid : 'storage-otherWarehouse',text : '其它入库单',right:'IO_QUERY',url : '/storage/other-warehouse.jsp?id='},
    //OO
    '150801' : {tabid : 'storage-otherOutbound',text : '盘亏',right:'OO_QUERY',url : '/storage/other-outbound.jsp?id='},
    //OI
    '150701' : {tabid : 'storage-otherWarehouse',text : '盘盈',right:'IO_QUERY',url : '/storage/other-warehouse.jsp?id='},
    //CADJ
    '150807' : {tabid : 'storage-adjustment',text : '成本调整',right:'CADJ_QUERY',url : '/storage/adjustment.jsp?id='},
    //PAYMENT
    '153101' : {tabid : 'money-payment',text : '付款单',right:'PAYMENT_QUERY',url : '/money/payment.jsp?id='},
    //RECEIPT
    '153001' : {tabid : 'money-receipt',text : '收款单',right:'RECEIPT_QUERY',url : '/money/receipt.jsp?id='},
    //PAYMENT
    '153301' : {tabid : 'storage-assemble',text : '组装单',right:'ZZD_QUERY',url : '/storage/assemble.jsp?id='},
    //RECEIPT
    '153302' : {tabid : 'storage-disassemble',text : '拆卸单',right:'CXD_QUERY',url : '/storage/disassemble.jsp?id='},
    //
    '153402' : {tabid : 'money-otherExpense',text : '其他支出单',right:'QTZC_ADD',url : '/money/other-expense.jsp?id='},
    '153401' : {tabid : 'money-otherIncome',text : '其他收入单',right:'QTSR_ADD',url : '/money/other-income.jsp?id='},
    '150901' : {tabid : 'money-accountTransfer',text : '资金转账单',right:'ZJZZ_ADD',url : '/money/accountTransfer.jsp?id='},
    '153201' : {tabid : 'money-verification',text : '核销单',right:'VERIFICA_ADD',url : '/money/verification.jsp?id='},
    '153202' : {tabid : 'money-verification',text : '核销单',right:'VERIFICA_ADD',url : '/money/verification.jsp?id='},
    '153203' : {tabid : 'money-verification',text : '核销单',right:'VERIFICA_ADD',url : '/money/verification.jsp?id='},
    '153204' : {tabid : 'money-verification',text : '核销单',right:'VERIFICA_ADD',url : '/money/verification.jsp?id='},
    '153205' : {tabid : 'money-verification',text : '核销单',right:'VERIFICA_ADD',url : '/money/verification.jsp?id='}
    //VERIFICA //核销太恶心了，包含5种单据类型。。。
    //VERIFICA //核销太恶心了，包含5种单据类型。。。
    // : {tabid : 'money-verifica',text : '核销单 ',right:'VERIFICA_QUERY',url : '/money/verification.jsp?id='}
  };
  var item = urls[params.transferType + ''] ;
  if(item && Business.verifyRight(item.right)){
    parent.tab.addTabItem({
      tabid : item.tabid,
      text : item.text,
      url : item.url + params.id
    });
    typeof params.callback === 'function' && params.callback();
  }
}




/**
 * 报表联查方法 add by Luotuxiu
 * @param  {[type]} params [description] 必填
 * params.transferType 业务类型ID 必填
 * params.id 单据ID 必填
 * params.callback 执行之后的回调
 * template gotoDetailItem({transferType:'001', id: 1, callback:fn})
 * @return void
 */
Public.gotoListDetailItem = function(params){
  if(!params)return;
  if(!params.billType)return;
  if(!params.transType)return;
  var url = {};
  switch(params.transType) {
  case "150601":
    if (params.billType == "SALE") {
      url = {tabid : 'sales-salesList',text : '销货单记录',right:'SA_QUERY', url : '/sales/sales-list.jsp?fromGuide=delete'};
    } else {
      url = {tabid : 'sales-salesOrderList',text : '销货订单记录',right:'SO_QUERY', url : '/scm/invSo.do?action=initSoList&fromGuide=delete'};  
    }
    break;
  case "150602":
    url = {tabid : 'sales-salesBackList',text : '销货退货单记录',right:'SABACK_QUERY', url : '/sales/sales-list.jsp?transType=150602&fromGuide=delete'};
    break;
  case "150501":
    if (params.billType == "PUR") {
      url = {tabid : 'purchase-purchaseList',text : '购货单记录',right:'PU_QUERY',url : '/purchase/purchase-list.jsp?fromGuide=delete'};
    } else {
      url = {tabid : 'purchase-purchaseOrderList',text : '购货订单记录',right:'PU_QUERY',url : '/scm/invPo.do?action=initPoList&fromGuide=delete'};
    }
    break;
  case "150502":
    url = {tabid : 'purchase-purchaseBackList',text : '购货退货单记录',right:'PUBACK_QUERY',url : '/purchase/purchase-list.jsp?transType=150502&fromGuide=delete'};
    break;
  case "103091":
    url = {tabid : 'storage-transfersList',text : '调拨单记录',right:'TF_QUERY',url : '/storage/transfers-list.jsp?fromGuide=delete'};
    break;
    case "150806":
        url = {tabid : 'storage-otherOutboundList',text : '其它出库单记录 ',right:'OO_QUERY',url : '/storage/other-outbound-list.jsp?&fromGuide=delete'};
        break;
    case "150706":
      url = {tabid : 'storage-otherWarehouseList',text : '其它入库单记录',right:'IO_QUERY',url : '/storage/other-warehouse-list.jsp?fromGuide=delete'};
      break;
    case "150801":
        url = {tabid : 'storage-otherOutboundList',text : '其他出库单记录',right:'OO_QUERY',url : '/storage/other-outbound-list.jsp?fromGuide=delete'};
        break;
    case "150701":
       url = {tabid : 'storage-otherWarehouseList',text : '其他入库单记录',right:'IO_QUERY',url : '/storage/other-warehouse-list.jsp?fromGuide=delete'};
       break;
    case "150807":
        url =  {tabid : 'storage-adjustmentList',text : '成本调整单记录',right:'CADJ_QUERY',url : '/storage/adjustment-list.jsp?fromGuide=delete'};
        break;
    case "153101":
      url = {tabid : 'money-paymentList',text : '付款单记录',right:'PAYMENT_QUERY',url : '/money/payment-list.jsp?fromGuide=delete'};  
      break;
    case "153001":
        url = {tabid : 'money-receiptList',text : '收款单记录',right:'RECEIPT_QUERY',url : '/scm/receipt.do?action=initReceiptList&fromGuide=delete'};
        break;
    case "153301":
       url = {tabid : 'storage-assembleList',text : '组装单记录',right:'ZZD_QUERY',url : '/storage/assemble-list.jsp?fromGuide=delete'};
       break;
    case "153302":
       url =  {tabid : 'storage-disassembleList',text : '拆卸单记录',right:'CXD_QUERY',url : '/storage/disassemble-list.jsp?fromGuide=delete'};  
       break; 
    case "153201":
    case "153202":
    case "153203":
    case "153204":
    case "153205": //预收冲应收
      url =  {tabid : 'money-verifica',text : '核销单记录',right:'VERIFICA_QUERY',url : '/money/verification-list.jsp?fromGuide=delete'};
      break;
    case "153401":
       url =  {tabid : 'money-otherIncomeList',text : '其他收入单记录',right:'QTSR_QUERY',url : 'money/other-income-list.jsp?fromGuide=delete'};  
       break; 
    case "153402":
       url =  {tabid : 'money-otherExpenseList',text : '其他支出单记录',right:'QTZC_QUERY',url : 'money/other-expense-list.jsp?fromGuide=delete'};  
       break; 
    default:
     // url = ;
     break;
  }

  var item = url;
  if(item && Business.verifyRight(item.right)){
    parent.tab.addTabItem({
      tabid : item.tabid,
      text : item.text,
      url : item.url + "&ID=" + params.id
    });
    typeof params.callback === 'function' && params.callback();
  }
}

/**
 * 单据名单联查方法
 * @param  {[type]} params [description] 必填
 * params.transType 业务类型ID 必填
 * params.billType 单据ID 必填
 * @return void
 */
Public.getBillNameByParams = function(params){
  switch(params.transType) {
  case 150601:
    if (params.billType == "SALE") {
      return '销货单'; 
    } else {
      return '销货订单';  
    }
  case 150602:
    return '销货退货单';
  case 150501:
    if (params.billType == "PUR") {
      return '购货单'; 
    } else {
      return '购货订单';  
    }
  case 150502:
    return '购货退货单';
  case 103091:
    return '调拨单';
    case 150806:
        return '其它出库';
    case 150706:
      return '其它入库';
    case 150801:
      return '盘亏';
    case 150701:
      return '盘盈';
    case 150807:
      return '成本调整';
    case 153101:
      return '付款单';
    case 153001:
      return '收款单';
    case 153301:
      return '组装单';   
    case 153302:
      return '拆卸单'; 
    case 153201:
    case 153202:
    case 153203:
    case 153204:
    case 153205:
      return '核销单'; 
    case 153401:
      return '其他收入单';
    case 153402:
      return '其他支出单';         
  default:
    return '其它单据';
  }
  
}


Public.showDeleteMsg = function(data,tipsMsg){
  var successDiv = "";
  var failDivForRelative = "";
  var failDivForOrther = "";

  var successOpt = "";
  var failOpt  = "";
  var failOptMsg  = "";

  var regectOpt = "";
  var latterAlertHtml = "";

  for(var resultItem in data.msg){
    if(typeof data.msg[resultItem] === 'function') continue;//兼容ie8
    resultItem = data.msg[resultItem];
    if (resultItem.isSuccess) {
      successOpt = "<span class='relativeSpan'>" + resultItem.id + "</span>" +  "、" + successOpt;
    } else {
      if (resultItem.hasOwnProperty('data')) {
        var msgData = resultItem.data;
          regectOpt = "<span class='relativeSpan'>" + resultItem.id + "</span>" + "、" + regectOpt;
          for (var i = 0; i < msgData.length; i++) {
            var relativeObject = msgData[i];
            var params = {};
            params.billType = relativeObject.billType;
            params.transType = relativeObject.transType;
            latterAlertHtml = "<li>" + Public.getBillNameByParams(params) + relativeObject.billNo + " <a srcId='"+ relativeObject.billNo + "' transType='" + relativeObject.transType  + "' billType='" + relativeObject.billType + "' class='relativeLi'>点击查看</a></li>" + latterAlertHtml; 
          }
      } else {
        failOpt ="<p>" + tipsMsg + "<span class='relativeSpan'>" + resultItem.id + "</span>" + "删除失败，原因为:" +  resultItem.msg + "</p>" + failOpt;
      }
    }
  }

  if (successOpt != "") {
    successOpt = '<div style="overflow: auto;">'+
            '<img src="/css/base/dialog/icons/delete_success.png" class="ui_icon_bg ui_icon_det"> ' + 
            '<div class="ui_div_det">' + tipsMsg +successOpt.substring(0,successOpt.length-1) + '删除成功</div></div>';
  }

  if (failOpt != "") {
    failDivForOrther = '<div style="overflow: auto;">'+
            '<img src="/css/base/dialog/icons/delete_fail.png" class="ui_icon_bg ui_icon_det"> ' + 
            '<div class="ui_div_det">' +failOpt +  '</div></div>';
  }

  if (latterAlertHtml != "") {
    failDivForRelative = '<div style="overflow: auto;">'+
            '<img src="/css/base/dialog/icons/delete_reject.png" class="ui_icon_bg ui_icon_det"> ' + 
            '<div class="ui_div_det">' + tipsMsg + regectOpt.substring(0,regectOpt.length-1) + "已有以下关联单据，不能删除" +"<ul>" + latterAlertHtml + "</ul></div></div>";
    
  }
  var alertHtml  = "<div style='max-height: 500px;overflow-y: auto;''>" + successOpt  + failDivForRelative +  failDivForOrther  + "</div>";
  if (failOpt == "" && latterAlertHtml == "") {
    $.dialog({
      id: 'moreCon',
      lock: true,
      width: 502,
      min: false,
      max: false,
      title: '系统提示',
      resize: false,
      content:alertHtml
    }).time(2, function(){
      });

  } else {
    $.dialog({
      id: 'moreCon',
      lock: true,
      width: 502,
      min: false,
      max: false,
      title: '系统提示',
      button: [{
        name:'关闭'
      }],
      resize: false,
      content:alertHtml
    })
    //点击查看关联单据
    $('.relativeLi').click(function(event) {
      /* Act on the event */
      event.preventDefault();
    
      var params = {};
      params.billType = $(this).attr("billType");
      params.transType = $(this).attr("transType");
      params.id  = $(this).attr("srcId");
      params.callback = function(){

      }
      Public.gotoListDetailItem(params);
    });
  }
}

//审核、反审核
Public.antiCheck = function(data,tipsMsg,isReAudit){
  var successDiv = "";
  var failDivForRelative = "";
  var failDivForOrther = "";

  var successOpt = "";
  var failOpt  = "";
  var failOptMsg  = "";

  var regectOpt = "";
  var latterAlertHtml = "";

    // if(typeof data.msg[resultItem] === 'function') continue;//兼容ie8
  for (var i = 0; i < data["successArr"].length; i++) {
    var resultItem = data["successArr"][i];
    successOpt = "<span class='relativeSpan'>" + resultItem.billNo + "</span>" +  "、" + successOpt;
  }
  for(var j = 0; j < data["failArr"].length; j++){
    var resultItem = data["failArr"][j];
    if (resultItem.hasOwnProperty('data')) {
      var msgData = resultItem.data;
      regectOpt = "<span class='relativeSpan'>" + resultItem.billNo + "</span>" + "、" + regectOpt;
      for (var i = 0; i < msgData.length; i++) {
        var relativeObject = msgData[i];
        var params = {};
        params.billType = relativeObject.billType;
        params.transType = relativeObject.transType;
        latterAlertHtml = "<li>" + Public.getBillNameByParams(params) + relativeObject.billNo + " <a srcId='"+ relativeObject.billNo + "' transType='" + relativeObject.transType  + "' billType='" + relativeObject.billType + "' class='relativeLi'>点击查看</a></li>" + latterAlertHtml; 
      }
    } else {
      failOpt ="<p>" + tipsMsg + "<span class='relativeSpan'>" + resultItem.billNo + "</span>" + (isReAudit ? "反审核" : "审核")+"失败，原因为:" +  resultItem.msg + "</p>" + failOpt;
    }
  }

  if (successOpt != "") {
    //var _successOpt = successOpt
    successOpt = '<div style="overflow: auto;">'+
            '<img src="/css/base/dialog/icons/delete_success.png" class="ui_icon_bg ui_icon_det"> ' + 
            '<div class="ui_div_det">' + tipsMsg +successOpt.substring(0,successOpt.length-1) + (isReAudit ? '反审核' : '审核') + '成功</div></div>';
            //'<div class="ui_div_det">'  + '成功'+ (isReAudit ? '反审核' : '审核') + '<a id="suclength">' +  --successOpt.split('</span>').length +'</a>'+'条</div></div>' ;
  }

  if (failOpt != "") {
    failDivForOrther = '<div style="overflow: auto;">'+
            '<img src="/css/base/dialog/icons/delete_fail.png" class="ui_icon_bg ui_icon_det"> ' + 
            '<div class="ui_div_det">' + failOpt +  '</div></div>';
  }

  if (latterAlertHtml != "") {
    failDivForRelative = '<div style="overflow: auto;">'+
            '<img src="/css/base/dialog/icons/delete_reject.png" class="ui_icon_bg ui_icon_det"> ' + 
            '<div class="ui_div_det">' + tipsMsg + regectOpt.substring(0,regectOpt.length-1) + "已有以下关联单据，不能反审核" +"<ul>" + latterAlertHtml + "</ul></div></div>";
    
  }
  var alertHtml  = "<div style='max-height: 500px;overflow-y: auto;'>" + successOpt  + failDivForRelative +  failDivForOrther  + "</div>";
  if (failOpt == "" && latterAlertHtml == "") {
    $.dialog({
      id: 'moreCon',
      lock: true,
      width: 502,
      min: false,
      max: false,
      title: '系统提示',
      resize: false,
      content:alertHtml
    }).time(2, function(){
      });
  } else {
    $.dialog({
      id: 'moreCon',
      lock: true,
      width: 502,
      min: false,
      max: false,
      title: '系统提示',
      button: [{
        name:'关闭'
      }],
      resize: false,
      content:alertHtml
    })

    //点击查看关联单据
    $('.relativeLi').click(function(event) {
      /* Act on the event */
      event.preventDefault();
      var params = {};
      params.billType = $(this).attr("billType");
      params.transType = $(this).attr("transType");
      params.id  = $(this).attr("srcId");
      params.callback = function(){
      }
      Public.gotoListDetailItem(params);
    });
  }
  //$('#suclength').on('click', function() {
  //  if(_successOpt){
  //    var html = '<div class="ui_div_det">' + tipsMsg +_successOpt.substring(0,_successOpt.length-1) + (isReAudit ? '反审核' : '审核') + '成功</div></div>'
  //    $(html).appendTo(this.parentNode.parentNode);
  //    _successOpt = ''
  //  }
  //})
}


//显示基础资料被删除的公共函数
Public.showBasicDeleteMsg = function(data,tipsMsg){
  var successDiv = "";
  var failDivForRelative = "";

  var successOpt = "";

  var regectOpt = "";
  var latterAlertHtml = "";
  if (data.successArr.length != 0) {
    for (var i = 0; i < data.successArr.length; i++) {
      var obj = data.successArr[i];
      successOpt = successOpt +"<span class='relativeSpan'>"+ obj.number + "</span>、"; 
    }
  }

  if (data.failArr.length != 0) {
    var id_arr_fail = data.failArr || [];

    for (var i = 0; i < id_arr_fail.length; i++) {
      var latterAlertHtml = "";
      var failDetailData = id_arr_fail[i].data;

      if(failDetailData){
        for (var j = 0; j < failDetailData.length; j++) {
          var obj = failDetailData[j];
          latterAlertHtml = "<li>" + Public.getBillNameByParams(obj) +  " " + "<a class='relativeLi' billType='" + obj.billType+ "' transType='" +obj.transType + "'>点击查看</a></li>" + latterAlertHtml; 
        } 
      } 
      if (latterAlertHtml == '') {
        regectOpt = id_arr_fail[i].msg
      } else {
        regectOpt = tipsMsg +"<span class='relativeSpan'>" + id_arr_fail[i].number + "</span>已有业务往来，不能删除" +"<ul Id='" + id_arr_fail[i].number + "'>" + latterAlertHtml + "</ul>" + regectOpt; 
      }
    }
  }


  if (successOpt != "") {
    successOpt = '<div style="overflow: auto;">'+
            '<img src="/css/base/dialog/icons/delete_success.png" class="ui_icon_bg ui_icon_det"> ' + 
            '<div class="ui_div_det">成功删除' + tipsMsg + successOpt.substring(0,successOpt.length-1) + '</div></div>';
  }

  if (regectOpt != "") {
    failDivForRelative = '<div style="overflow: auto;">'+
            '<img src="/css/base/dialog/icons/delete_reject.png" class="ui_icon_bg ui_icon_det"> ' + 
            '<div class="ui_div_det">' + regectOpt + "</div></div>";
    
  }
  var alertHtml  = "<div style='max-height: 500px;overflow-y: auto;''>" +successOpt  +  failDivForRelative  + "</div>";
  if (latterAlertHtml == "") {
    $.dialog({
      id: 'moreCon',
      lock: true,
      width: 502,
      min: false,
      max: false,
      title: '系统提示',
      resize: false,
      content:alertHtml
    }).time(2, function(){
      });

  } else {
    $.dialog({
      id: 'moreCon',
      lock: true,
      width: 502,
      min: false,
      max: false,
      title: '系统提示',
      button: [{
        name:'关闭'
      }],
      resize: false,
      content:alertHtml
    })
    //点击查看关联单据
    $('.relativeLi').click(function(event) {
      /* Act on the event */
      event.preventDefault();
            
      var params = {};
      params.billType = $(this).attr("billType");
      params.transType = $(this).attr("transType");
      params.id  = $(this).parent().parent().attr("Id");
      params.path  = "id";
      params.callback = function(){

      }
      Public.gotoListDetailItem(params);
    });
  }
}


//显示商品被删除的公共函数
Public.showGoodsDeleteMsg = function(data,tipsMsg){
  var successDiv = "";
  var failDivForRelative = "";

  var successOpt = "";

  var regectOpt = "";
  var latterAlertHtml = "";
  if (data.successArr.length != 0) {
    for (var i = 0; i < data.successArr.length; i++) {
      var obj = data.successArr[i];
      successOpt = successOpt +"<span class='relativeSpan'>"+ obj.number + "</span>、"; 
    }
  }

  if (data.failArr.length != 0) {
    var id_arr_fail = data.failArr || [];

    for (var i = 0; i < id_arr_fail.length; i++) {
      var latterAlertHtml = "";
      var failDetailData = id_arr_fail[i].data;
      var failDetailMsg = id_arr_fail[i].msg;      

      if(failDetailData != null){
         for (var j = 0; j < failDetailData.length; j++) {
          var obj = failDetailData[j];
          latterAlertHtml =  latterAlertHtml + "<li>" + Public.getBillNameByParams(obj) +  " " + "<a class='relativeLi' billType='" + obj.billType+ "' transType='" +obj.transType + "'></a></li>" ; 
        } 
      }
      latterAlertHtml += "<li>" + failDetailMsg +"</li>"; 
      
      regectOpt = tipsMsg +"<span class='relativeSpan'>" + id_arr_fail[i].number + "</span>已有以下类型关联单据，不能删除" +"<ul Id='" + id_arr_fail[i].number + "'>" + latterAlertHtml + "</ul>" + regectOpt;
    }
  }


  if (successOpt != "") {
    successOpt = '<div style="overflow: auto;">'+
            '<img src="/css/base/dialog/icons/delete_success.png" class="ui_icon_bg ui_icon_det"> ' + 
            '<div class="ui_div_det">成功删除' + tipsMsg + successOpt.substring(0,successOpt.length-1) + '</div></div>';
  }

  if (regectOpt != "") {
    failDivForRelative = '<div style="overflow: auto;">'+
            '<img src="/css/base/dialog/icons/delete_reject.png" class="ui_icon_bg ui_icon_det"> ' + 
            '<div class="ui_div_det">' + regectOpt + "</div></div>";
    
  }
  var alertHtml  = "<div style='max-height: 500px;overflow-y: auto;''>" +successOpt  +  failDivForRelative+ "</div>";
  if (latterAlertHtml == "") {
    $.dialog({
      id: 'moreCon',
      lock: true,
      width: 502,
      min: false,
      max: false,
      title: '系统提示',
      resize: false,
      content:alertHtml
    }).time(2, function(){
      });

  } else {
    $.dialog({
      id: 'moreCon',
      lock: true,
      width: 502,
      min: false,
      max: false,
      title: '系统提示',
      button: [{
        name:'关闭'
      }],
      resize: false,
      content:alertHtml
    })
    //点击查看关联单据
    $('.relativeLi').click(function(event) {
      /* Act on the event */
      event.preventDefault();
            
      var params = {};
      params.billType = $(this).attr("billType");
      params.transType = $(this).attr("transType");
      params.id  = $(this).parent().parent().attr("Id");
      params.path  = "id";
      params.callback = function(){

      }
      Public.gotoListDetailItem(params);
    });
  }
}
// 可编辑的表格模块
Public.mode_superGrid = function(){
  var SuperGrid = function(target, options){
    if(arguments.length != 2){
      throw 'target, options is require!'
    }

    var self = this;
    this.$target = $(target);
    var gridId = this.$target[0].id;
    if(!gridId){
      console && console.log('建议生成grid的对象上设置ID属性');
    }

    // 默认参数
    this.opts = $.extend({
      data:[],
      datatype: "clientSide",
      autoHeight:true,
      autowidth: true,
      gridview: true,
      // onselectrow: false,
      idPrefix: gridId || '', // rowid的前缀 取决于grid的id
      cellEdit: false, // 设置为true会导致鼠标滑过时没有颜色变化效果
      cellsubmit: 'clientArray',
      cmTemplate: {sortable:false},
      shrinkToFit: false,
      // scroll: 1,
      jsonReader: {
        page: 'data.page',
        root: 'data.rows',
        records: 'data.records',
        repeatitems : false,
        total: 'data.total',
        id: 'id'
      }
    }, options);

    // 渲染表格
    this.render();

    eventInit.call(this);

    this.grid.jqGrid('setGridParam',{cellEdit: true}); // 表格加载完成再进行设置，会有鼠标滑过行的颜色变化效果
  }
  SuperGrid.prototype = {
    //取消表格编辑状态
    cancelEdit:function(){
      this.jqGrid("saveCells");
    },
    render:function(options){
      if(this.grid){
        // this.grid.trigger('reloadGrid');
        this.grid.jqGrid('setGridParam',options||{}).trigger('reloadGrid');
      };

      // 对外界传入的option做必要的封装
      // 例如 接管 afterEditCell等事件
      optionsHandle.call(this);

      // 如果没有初始化
      this.grid = this.$target.jqGrid(this.opts)
    },
    // 刷新grid
    refresh: function(options){
      $.extend(true, this.opts, options);
      this.render(options);
    },
    // 获取数据
    // 返回值每一行对象都会附加$comboData集合,储存combo咧的详细数据对象
    getData:function(){
      this.cancelEdit();
      var ids = this.jqGrid('getDataIDs');
      var opts = this.opts;
      var result = [];
      for (var i = 0; i < ids.length; i++) {
        var rowId = ids[i];
        var row = this.getRowData(rowId);
        result.push(row);
      }
      return result;
    },
    getRowData:function(rowId){
      var opts = this.opts;
      var row = this.grid.jqGrid('getRowData',rowId); // 这里不能this.jqGrid，不然会造成死循环
      for (var k = 0; k < opts.colModel.length; k++) {
        var col = opts.colModel[k];
        if(col.combo){
          var $wrapper = $('<div>' + row[col.name] + '</div>');
          var $data = $wrapper.find(".data");
          // var data = $data.length ? $.parseJSON($data.data('combo').replace(/'/g, '"')) : null;
          var data = $data.length ? $.parseJSON($data.html()) : null;
          if(data){
            row[col.name+'Id'] = data[col.comboOpts.value];
            row[col.name+'Name'] = data[col.comboOpts.text];
          }
          // 删除用来转载html结构的属性
          delete row[col.name];
        }
      }
      return row;
    },
    // 托管jqGrid的方法
    jqGrid:function(){
      var result;
      var fname = arguments[0];
      if(typeof fname === 'string' && typeof this[fname] === 'function'){
        var args = $.makeArray(arguments).slice(1);
        result = this[fname].apply(this,args)
      }else{
        result = this.grid.jqGrid.apply(this.grid, arguments)
      }
      return result;
    },
    /*
     * 新增行
     */
    addNewRow:function(rowData, pos, src){
      var newId = this.grid.data('newId');
      this.jqGrid('addRowData', newId, rowData||{}, pos, src)
      this.grid.data('newId' , newId+1);
      var iRow = $('#'+ this.grid[0].p.idPrefix + newId).index();
      this.jqGrid("nextCell",iRow,0);
    },
    /*
     * resize表格
     */
    resize:function(){
      var $warp = this.$target.closest('.ui-jqgrid').parent();
      this.jqGrid('setGridWidth', $warp.width())
      this.jqGrid('setGridHeight', $warp.height())
    }
  }

  function optionsHandle(){
    // 代理事件
    gridEventProxy.call(this);

    // 转换列设置
    for (var i = 0; i < this.opts.colModel.length; i++) {
      (function(col){
        var
          $el,
          combo;

        // 下拉框的实现
        if(col.combo){
          // 支持方法返回
          var getCombo = col.combo;

          // 获取下拉框的设置
          col.comboOpts = getCombo($('<div>')).opts;
          // if(typeof combo === 'function') combo = combo();

          if(!(typeof getCombo === 'function')){
            throw 'combo 必须有返回combo插件的生成函数！'
          }

          // 通过jqGrid的自定义编辑功能 实现combo控件的内嵌
          $.extend(true, col, {
            editable:true,
            edittype:'custom',
            editoptions:{
              custom_element: function(value, options) {
                $el = $('<input type="text" class="textbox" autocomplete="off">');
                combo = getCombo($el);
                if(!combo){
                  throw 'combo 必须有返回combo插件的生成函数！'
                }
                // 处理combo初始选中的问题
                if(value){
                  var $wrapper = $('<div>' + value + '</div>');
                  var $data = $wrapper.find('.data');
                  if($data.length) {
                    // var data = $.parseJSON($data.data('combo').replace(/'/g, '"'));
                    var data = $.parseJSON($data.html());
                    combo.selectByValue(data.id);
                  };
                }

                if(value == ''){
                  combo.selectByValue(null);
                }

                return $el[0];
              },
              custom_value: function(elem, operation, value) {
                var parentTr = $(elem).parents('tr');
                if(operation === 'get') {
                   if(combo.getValue() !== '') {
                    // parentTr.data(col.name, combo.getSelectedRow());
                    // return $(elem).val();
                    return  combo.getSelectedRow();
                   } else {
                    // parentTr.removeData(col.name);
                    return '';
                   }
                } else if(operation === 'set') {
                   $('input', elem).val(value);
                }
              },
              handle: function() {
                $el.remove();
              },
              trigger:'ui-icon-triangle-1-s'
            }
          });

          // 接管对应的formatter
          var old_frm = col.formatter;

          col.formatter = function(val, opt, row){
            var
              col = opt.colModel
              isObject = true;

            if(!val){
              isObject = false;
              // 不是通过combo录入的时候， 入调用了addRowData 或者初始化的时候
              var id = row[col.name+'Id'];
              var name = row[col.name+'Name'];
              if(id !== undefined && name !== undefined){
                // 检查信息的完整性
                // 例如，如果是good字段，则需要提供goodId 和 goodName
                val = {};
                val[col.comboOpts.value] = id;
                val[col.comboOpts.text] = name;
              }else{
                // console && console.log('检测出没有提供对应Id 和 Name的combo字段， 可能需要完善后端接口')
                return '&#160;';
              }
            }

            var content = val[col.comboOpts.text];
            // 文本可能存在格式化
            // 也存在combo没设置text对应key的情况
            // if((!content || isObject) && typeof col.comboOpts.formatText === 'function'){
            //  var content = col.comboOpts.formatText(val);

            //  // 补充缺省的name
            //  // if(!val[col.comboOpts.text]){
            //  //  val[col.comboOpts.text] = content;
            //  // }
            // }
            var jsonString = JSON.stringify(val); //双引号换成单引号，不然在data属性上会错乱 data= "{" "aa":""
            // var $dataField = $('<i class="dn data">' + jsonString + '</i>') // 这种方式会在title中显示出来
            var $dataField = $('<i class="dn data">'+jsonString+'</i>');

            // 完成表格原本设置的格式化
            if(old_frm){
              content = old_frm(val, opt, row);
            }
            var $wrapper = $('<div> ' + content + '</div>');
            $wrapper.append($dataField)

            return $wrapper.html() || '&#160;';
          }
        }
      })(this.opts.colModel[i]);
    }
  }
  function gridEventProxy(){
    var
      self = this,
      opts = this.opts;

    // 可维护扩展部分
    var eventHandles = {
      afterEditCell:function(rowid,name,val,iRow,iCol){
      },
      afterSaveCell:function(rowid,name,val,iRow,iCol){
      },
      gridComplete: function(){
        // 非异步的模式生成表格的话这个方法会在返回grid对象之前执行，很坑
        // 模拟异步很简单，如下
        setTimeout(function(){
          var rDatas = self.grid.getRowData();
          // 这里处理新增行的ID从哪里开始
          self.grid.data('newId', rDatas.length + 1);
        },0);
      }
    }
    for(eventName in eventHandles){
      (function(eventName){
        var oldFun = opts[eventName];
        var newFun = eventHandles[eventName] || function(){};
        opts[eventName] = function(){
          newFun && newFun.apply(self, arguments);
          oldFun && oldFun.apply(self, arguments);
        }
      })(eventName)
    }
  }
  function eventInit(){
    var
      self = this,
      timer_resizeCallback; // 自适应使用的计时器

    // 注册事件
    // 点击后取消编辑
    $(document).on('click',function(e){
      var cls_onClickGrid = 'superGrid_temp_forClickByDocument';
      self.grid.addClass(cls_onClickGrid);
      if(!$(e.target).closest('.'+cls_onClickGrid).length){
        self.cancelEdit();
      }
      self.grid.removeClass(cls_onClickGrid);
    })

    // 表格自适应
    $(window).on('resize', function(event) {
      // 性能需要
      clearTimeout(timer_resizeCallback);
      timer_resizeCallback = setTimeout(function(){
        self.resize();
      },10);
    });

    // 表格click事件处理
    self.$target
    .on('click', '.ui-icon-triangle-1-s', function(e){
      var $input = $(this).siblings('input');
      var _combo = $input.getCombo();
        setTimeout(function(){
          _combo.active = true;
          _combo.doQuery();
        }, 10);
    });
  }
  return SuperGrid;
}

//重写toFixed方法  
Number.prototype.toFixed = function(n) {
    if (n > 20 || n < 0) {
        throw new RangeError('toFixed() digits argument must be between 0 and 20');
    }
 
    var number = this;
     
    if (isNaN(number) || number >= Math.pow(10, 21)) {
        return number.toString();
    }
    if (typeof(n) == 'undefined' || n == 0) {
        return (Math.round(number)).toString();
    }
 
    var result = number.toString();
    var arr = result.split('.');
 
    // 整数的情况
    if (arr.length < 2) {
        result += '.';
        for (var i = 0; i < n; i++) {
            result += '0';
        }
        return result;
    }
 
    var integer = arr[0];
    var decimal = arr[1];
    if (decimal.length == n) {
        return result;
    }
    if (decimal.length < n) {
        for (var i = 0; i < n - decimal.length; i++) {
            result += '0';
        }
        return result;
    }
    result = integer + '.' + decimal.substr(0, n);
 
    var last = decimal.substr(n, 1);
 
    // 四舍五入，转换为整数再处理，避免浮点数精度的损失
    if (parseInt(last) >= 5) {
        var x = Math.pow(10, n);
        if (result >= 0) {
          result = Math.round((parseFloat(result) * x + 1)) / x;
        } else {
          result = Math.round((parseFloat(result) * x - 1)) / x;
        }
        
        result = result.toFixed(n);
    }
    return result;
 
} 

var invorder,issearch,fdialog,dia_unitId,dia_qty,dia_locationName,dia_locationId;
function invorderFun(k){invorder=k;issearch=1;}


/*自定义字段开始*/
// 获取某类单据的自定义字段
Business.getUdfData =  function(opts) {
  ajax('post', '/basedata/udf.do?action=listMetas', {menuCode: opts.menuCode, billId: opts.billId})
  .then(function(result) {
    opts.obj.udfData = result ? result.entries : []
  }, function(error) {
    Public.tips({type:1, content: error})
  })
}

// 保存单据的自定义字段
Business.setBillUdf = function(udfData, vueObj) {
  udfData.entries = $.map(udfData.entries, function(e, i) {
    e.value = e.value || ''
    return e;
  })
  ajax('post', '/basedata/udf.do?action=saveValues', {data: JSON.stringify(udfData)})
  .then(function(result) {
    // 保存并新增完成后清空自定义区
    // if (udfData.isSaveAndAdd) {
    //   var newUdfData = $.map(udfData.entries, function(e, i) {
    //     e.value = ''
    //     return e;
    //   })
    //   Vue.set(vueObj.udfData, newUdfData)
    // } else {
    //   console.log(result)
    // } 
    console.log(result)
  }, function(error) {
    Public.tips({type:1, content: error})
  })
}

Business.clearUdfData = function(vueObj) {
  var newUdfData = $.map(vueObj.udfData, function(e, i) {
    e.value = ''
    return e;
  })
  Vue.set(vueObj.udfData, newUdfData)
}
/*自定义字段结束*/
