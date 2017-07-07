$(function(){
	one_first();//默认加载1级菜单.
	three_change();//3级
	region_auto();//默认数据
})
function one_first(){
	$.ajax({
				type:"post",
		        url: "/web/one_first",
		        dataType: "jsonp",
		        jsonp:"jsoncallback",
		        success: function(data){
				  if(data.data=="error"){
					  $("#one_first").html('<option value="默认" selected="selected">默认</option>');
				  }else{
						var list="";
						for(var i=0;i<data.data.length;i++){
						   var one_a=data.data[i].one_name;
						   list+='<option value="'+one_a+'">'+one_a+'</option>';
						}
				        $("#one_first").append(list);  
				  }
				   
		        }
		     })
	$("#one_first").change(function(){
		var one_t_l=$(this).val();
		if(one_t_l=="默认"){
		     window.location.reload(); 
		}else{
			//2级菜单。
				$.ajax({
					type:"post",
					url: "/web/two_change",
					dataType: "jsonp",
					data:{
					  one_t_l:one_t_l	
					},
					jsonp:"jsoncallback",
					success: function(data){
						   if(data.data=="miss"){
							   alert("缺少上级参数");
							   window.location.reload();
						   }
						   if(data.data=="error"){
							   $("#two_first").html('<option value="未定义" selected="selected">未定义</option>');
						   }else{
							   var list="";
							   for(var i=0;i<data.data.length;i++){
								   var two_a=data.data[i].two_name; 
								   list+='<option value="'+two_a+'">'+two_a+'</option>';
							   }
					               $("#two_first").html('<option value="未定义" selected="selected">未定义</option>'+list); 
						   }
					}
				 })
		 }
	})
	   
}

function three_change(){
	$("#two_first").change(function(){
	    var two_l_z=$(this).val();
		$.ajax({
				type:"post",
		        url: "/web/chane_list_a",
				data:{
				  two_l_z:two_l_z	
				},
		        dataType: "jsonp",
		        jsonp:"jsoncallback",
		        success: function(data){
					if(data.data=="miss"){
					    alert("缺少上级参数");
					    window.location.reload();
				    }
				   if(data.data=="error"){
					  $("#three_first").html('<option value="未定义" selected="selected">未定义</option>'); 
				   }else{
					   var list="";
					   for(var i=0;i<data.data.length;i++){
						   var three_a=data.data[i].three_name; 
						   list+='<option value="'+three_a+'">'+three_a+'</option>';
					   }
			               $("#three_first").html('<option value="未定义" selected="selected">未定义</option>'+list); 
				   }
		        }
		    })
			
    })
}
function region_auto(){
	$.ajax({
				type:"post",
		        url: "/web/region_auto",
		        dataType: "jsonp",
		        jsonp:"jsoncallback",
		        success: function(data){
				   
		        }
		     })
}











