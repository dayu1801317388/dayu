$(function(){
	account_list();
	level_guest();
})
function account_list(){
	$.ajax({
				type:"post",
		        url: "/web/account_list",
		        dataType: "jsonp",
		        jsonp:"jsoncallback",
		        success: function(data){
				   	if(data.data=="error"){
						$("#four").html("<div style='width:400px;text-align:center;color:#EE2C2C;font-size:18px;margin-top:30px;'>账户信息不存在</div>");
					}else{
						var list="";
						for(var i=0;i<data.data.length;i++){
							var name=data.data[i].register_email;
							var lev=data.data[i].register_lev;
							var id=data.data[i].register_id;
							if(name!="15850706150@163.com" && lev!="Root"){
								list+='<div class="list_id"><div style="width:200px;background:red;">'+name+'</div><div style="width:100px;background:#ffcccc;">'+lev+'</div><div class="root" style="width:80px;background:#ccccff;"><a href="/web/addlev.php?gu='+name+'&acc='+acc+'">配置权限</a></div><div class="root" style="width:80px;background:#ccccff;"><a href="javascript:del(\''+name+'\');"> 删除</a></div></div>';//转义在转义符号的前面。
							}
													
						}
						$("#four").html('<div class="list_id"><div style="width:200px;background:red;">'+data["ema"]+'</div><div style="width:100px;background:#ffcccc;">'+data["val"]+'</div></div>'+list);
					}   
		        }
		     })
}
//获取GET 参数的JS
(function($)
{
  $.extend(
  {
    urlGet:function()
    {
      var aQuery = window.location.href.split("?");//取得Get参数
      var aGET = new Array();
      if(aQuery.length > 1)
      {
        var aBuf = aQuery[1].split("&");
        for(var i=0, iLoop = aBuf.length; i<iLoop; i++)
        {
          var aTmp = aBuf[i].split("=");//分离key与Value
          aGET[aTmp[0]] = aTmp[1];
        }
      }
      return aGET;
    }
  });
})(jQuery);
var GET = $.urlGet(); //获取URL的Get参数
var acc=GET['acc'];
//判断权限
function level_guest(){
	$(document).on("click",".root a",function(){
		if(acc!=0){
		  alert("亲，您没有权限哦");
		  $(this).removeAttr('href');
		}
	})
}
var g_Lev="";
function del(g_Lev){
	 window.location.href="/web/delect_guest?g_Lev="+g_Lev+"&acc="+acc;
}








