$(function(){
  var node_a="";
  var type_a="";
  var area_a="";
  var pageX="";
  click_list(node_a,type_a,area_a,pageX);
  area_A();
  type_A();
  node_A();
  browse_list(node_a,type_a,area_a,pageX);
});
//显示select区域信息
function area_A(){
        	$.ajax({
				type:"post",
		        url: "/web/area_A",
		        dataType: "jsonp",
		        jsonp:"jsoncallback",
		        success: function(data){
				   var list_ar="";
		           var ar_A=data.data.length; 				   
				   for(var i=0;i<ar_A;i++){
					  var dd=data.data[i].browse_area;
					  list_ar+='<option value="'+dd+'">'+dd+'</option>';
				   }
				   $("#one").html('<option selected = "selected" value="">区域</option>'+list_ar);
				   $("#one").select({
			               width: "200px"
		                });
		        }
		     })
}
//显示select类型信息
function type_A(){
        	$.ajax({
				type:"post",
		        url: "/web/type_A",
		        dataType: "jsonp",
		        jsonp:"jsoncallback",
		        success: function(data){
				   var list_ty="";
		           var ty_A=data.data.length;
                   for(var i=0;i<ty_A;i++){
					   var dd=data.data[i].browse_type;
					   list_ty+='<option value="'+dd+'">'+dd+'</option>';
				   }				   
				   $("#two").html('<option selected = "selected" value="">类型</option>'+list_ty);
				   $("#two").select({
			               width: "200px"
		                });
		        }
		     })
}
//显示select节点信息
function node_A(){
        	$.ajax({
				type:"post",
		        url: "/web/node_A",
		        dataType: "jsonp",
		        jsonp:"jsoncallback",
		        success: function(data){
				   var list_no="";
		           var no_A=data.data.length;
                   for(var i=0;i<no_A;i++){
					   var dd=data.data[i].browse_node;
					   list_no+='<option value="'+dd+'">'+dd+'</option>';
				   }				   
                   $("#three").html('<option selected = "selected" value="">节点</option>'+list_no);	

					$("#three").select({
			               width: "200px"
		                });				
		        }
		     })
}
//改变select
function click_list(node_a,type_a,area_a,pageX){
    $(document).on("click",".qwe .select_list_ul li",function(){
		var area_a=$("#qew_one .select_container_nw").attr("val");
		var type_a=$("#qew_two .select_container_nw").attr("val");
		var node_a=$("#qew_three .select_container_nw").attr("val");
		browse_list(node_a,type_a,area_a,pageX);
	});
}
//显示数据列表
function browse_list(node_a,type_a,area_a,pageX){
	$.ajax({
				type:"post",
		        url: "/web/browse_list",
		        dataType: "jsonp",
				data:{
                 node_a:node_a,
                 type_a:type_a,
                 area_a:area_a,
				 pageX:pageX
		        },
		        jsonp:"jsoncallback",
		        success: function(data){
					if (data.total==0)
					{
						 $("#four").html("<div style='text-align:center;color:#EE2C2C;font-size:18px;margin-top:20%;'>没有符合您要搜索的信息，可以通过以下方式定制</div>");
						 $("#pagination").hide();
					     return;
					}else{
						
						 $("#pagination").show();
					}
					var relev_cookie=data.relev_cookie;
					click_K(relev_cookie);
		        	var list_aa='';
					var len=data.data.length;
					for(var i=0;i<len;i++){
						var no=data.data[i].browse_node;
						var ty=data.data[i].browse_type;
						var ar=data.data[i].browse_area;
						var att=data.data[i].browse_attr;
						var app=data.data[i].browse_appo;
						list_aa+='<div class="list_id"><div style="width:200px;background:red;">'+no+'</div><div style="width:200px;background:#ffcccc;">'+ty+'</div><div style="width:200px;background:#ccccff;">'+ar+'</div><div style="width:150px;background:#ffe4c4;">'+att+'</div><div style="width:150px;background:#ba55d3;">'+app+'</div></div>';
					}
					
					$("#four").html(list_aa);
					isFirstPaging=true;
					   var cur_page = data.current_page;  //当前页数
					   var last_page = data.last_page;  //总页数
					   $("#pagination").pagination(last_page,{//总页数。
						  current_page:parseInt(cur_page)-1,//当前页面索引。
						  num_edge_entries: 1, //边缘页数
						  num_display_entries: 4, //主体页数
						  callback: function(page_cur,jq){
							  if (!isFirstPaging){
								  var iPage=parseInt(page_cur)+1;
								  browse_list(node_a,type_a,area_a,iPage);
							  }
							  isFirstPaging=false;
						  },
						   items_per_page: 1, //每页显示5项
						   prev_text: "前一页",
						   next_text: "后一页"
						});
		        }
		     })
}
function click_K(relev_cookie){
	$(document).on("click",".level_one a",function(){
									if(relev_cookie==3||relev_cookie=="error"){
									   alert("亲，您没有权限哦");
                                       $(this).removeAttr('href');
									   return;
									}else{
										$(".l_one a").attr("href","/web/tinajia");
										//$(".l_one a").attr("href","/web/plcnode.php?acc="+relev_cookie);
										$(".l_two a").attr("href","/web/account.php?acc="+relev_cookie);
										$(".l_three a").attr("href","/web/region.php?acc="+relev_cookie);
									}
								
							})
}

	















