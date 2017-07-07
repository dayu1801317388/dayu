$(function(){
	ul_list_x();
	$(".st_tree").SimpleTree({
		click:function(a){
			if(!$(a).attr("hasChild"))
				alert($(a).attr("ref"));
		}
	});
	$(document).on("click",".triangle-up_one",function(){
		if($(".st_tree").is(':hidden')){
			$(".st_tree").show();
		}else{
			$(".st_tree").hide();
		}
	})
	$(document).on("click",".triangle-up",function(){
		$(".list_bottom_list").hide();
	})
	$(".modal-body input").focus(function(){
		$(this).css("border","2px solid #0077FF");
	}).blur(function(){
		$(this).css("border","1px solid #888");
	})
	$(".list_bottom").mouseenter(function(){
		$(this).css({"font-size":"18px","color":"#0077FF"});
	}).mouseleave( function(){
		$(this).css({"font-size":"14px","color":"#333"});
        
    });
	$(".cap").mouseenter(function(){
		$(this).css({"font-size":"18px","color":"#0077FF"});
	}).mouseleave( function(){
		$(this).css({"font-size":"14px","color":"#333"});
        
    });
	$(".pin_one").focus(function(){
		$(this).css("border","2px solid #0077FF");
	}).blur(function(){
		$(this).css("border","1px solid #fff");
	})
	$("#map_dt").click(function(){
		var ls=$(this).attr("ls");
		if(ls==1){
			window.location.href="/web/map.php";
		}else{
			history.go(-1);
		}
	})
	$("#websocket").click(function(){
		var ls=$(this).attr("ls");
		if(ls==1){
			top.location="WebSocket.php";
		}else{
			history.go(-1);
		}
	})
})/*jquery 结束*/

function ul_list_x(){
	$(document).on("click",".list_bottom",function(){
		var ls=$(this).attr("ls");
		var index=$(this).index();
		if($(".list_bottom_list").is(':hidden')){
			$(".list_bottom_list").show();		
		}
		for(i=1;i<6;i++){
		   if(ls==i){
			  $(".list_bottom_list").css("right",(80*i)+(i*20)+"px");
		   }
		}
		var list="";
		if(ls==1){
			list+='<li><a href="/web/help.php">在线帮助</a></li><li><a href="/web/UseGuide.php">系统使用指南</a></li><li><a href="/web/AboutJs.php">关于吉山</a></li>';
			$(".list_bottom_list").html(list+'<div class="triangle-up"></div>');
		}else if(ls==2){
			list+='<li><a href="/web/OnlineUser.php">在线用户</a></li><li><a href="/web/TerminalReport.php">终端报表</a></li><li><a href="/web/FaultStatistics.php">故障统计</a></li><li><a href="/web/PowerStatistics.php">用电统计</a></li>';
			$(".list_bottom_list").html(list+'<div class="triangle-up"></div>');
		}else if(ls==3){
			list+='<li><a href="/web/AccountManagement.php">用户信息管理</a></li><li><a href="/web/AccountPassword.php">账户密码</a></li>';
			$(".list_bottom_list").html(list+'<div class="triangle-up"></div>');
		}else if(ls==4){
			list+='<li><a href="/web/EquipmentGroup.php">设备分组</a></li><li><a href="/web/SystemBackup.php">系统备份</a></li><li><a href="/web/SystemRestore.php">系统恢复</a></li><li><a href="/web/SystemSet.php">系统设置</a></li><li><a href="/web/ZoneCode.php">区域代码</a></li><li><a href="/web/DataDictionary.php">词典管理</a></li>';
			$(".list_bottom_list").html(list+'<div class="triangle-up"></div>');
		}else if(ls==5){
			list+='<li><a href="/web/Concentrator.php">集中器</a></li><li><a href="/web/Repeater.php">中继器</a></li><li><a href="/web/Lighting.php">照明设备</a></li><li><a href="/web/Sensor.php">传感器</a></li><li><a href="/web/VideoSurveillance.php">视频监控设备</a></li><li><a href="/web/WattHourMeter.php">电表</a></li>';
			$(".list_bottom_list").html(list+'<div class="triangle-up"></div>');
		}
	})
	
}

(function($) {  
  var placeholderfriend = {  
    focus: function(s) {  
      s = $(s).hide().prev().show().focus();  
      var idValue = s.attr("id");  
      if (idValue) {  
        s.attr("id", idValue.replace("placeholderfriend", ""));  
      }  
      var clsValue = s.attr("class");  
      if (clsValue) {  
        s.attr("class", clsValue.replace("placeholderfriend", ""));  
      }  
    }  
  }  
  
  //判断是否支持placeholder  
  function isPlaceholer() {  
    var input = document.createElement('input');  
    return "placeholder" in input;  
  }  
  //不支持的代码  
  if (!isPlaceholer()) {  
    $(function() {  
  
      var form = $(this);  
      var elements = form.find("input[type='text'][placeholder]");  
      elements.each(function() {  
        var s = $(this);  
        var pValue = s.attr("placeholder");  
        var sValue = s.val();  
        if (pValue) {  
          if (sValue == '') {  
            s.val(pValue);  
          }  
        }  
      });  
  
      elements.focus(function() {  
        var s = $(this);  
        var pValue = s.attr("placeholder");  
        var sValue = s.val();  
        if (sValue && pValue) {  
          if (sValue == pValue) {  
            s.val('');  
          }  
        }  
      });  
  
      elements.blur(function() {  
        var s = $(this);  
        var pValue = s.attr("placeholder");  
        var sValue = s.val();  
        if (!sValue) {  
          s.val(pValue);  
        }  
      });  
  
      var elementsPass = form.find("input[type='password'][placeholder]");  
      elementsPass.each(function(i) {  
        var s = $(this);  
        var pValue = s.attr("placeholder");  
        var sValue = s.val();  
        if (pValue) {  
          if (sValue == '') {  
            var html = this.outerHTML || "";  
            html = html.replace(/\s*type=(['"])?password\1/gi, " type=text placeholderfriend").replace(/\s*(?:value|on[a-z]+|name)(=(['"])?\S*\1)?/gi, " ").replace(/\s*placeholderfriend/, " placeholderfriend value='" + pValue + "' " + "onfocus='placeholderfriendfocus(this);' ");  
            var idValue = s.attr("id");  
            if (idValue) {  
              s.attr("id", idValue + "placeholderfriend");  
            }  
            var clsValue = s.attr("class");  
            if (clsValue) {  
              s.attr("class", clsValue + "placeholderfriend");  
            }  
            s.hide();  
            s.after(html);  
          }  
        }  
      });  
  
      elementsPass.blur(function() {  
        var s = $(this);  
        var sValue = s.val();  
        if (sValue == '') {  
          var idValue = s.attr("id");  
          if (idValue) {  
            s.attr("id", idValue + "placeholderfriend");  
          }  
          var clsValue = s.attr("class");  
          if (clsValue) {  
            s.attr("class", clsValue + "placeholderfriend");  
          }  
          s.hide().next().show();  
        }  
      });  
  
    });  
  }  
  window.placeholderfriendfocus = placeholderfriend.focus;  
})(jQuery);


