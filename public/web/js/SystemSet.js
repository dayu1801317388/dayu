$(function(){
	$(document).ready(function(){
		$("#1").click(function(){
			var oldValue=parseInt($(".hjgjl>input").val());//取出现在的值，并使用parseInt转为int类型数据
			oldValue++;//自加1
			$(".hjgjl>input").val(oldValue);//将增加后的值付给原控件
		});
   });
   $(document).ready(function(){
		$("#2").click(function(){
			var oldValue=parseInt($(".hjgjl>input").val());//取出现在的值，并使用parseInt转为int类型数据
			oldValue--;//自加1
			if(oldValue==1||oldValue==0){
			   $(".hjgjl>input").val(1);
			}else{
			   $(".hjgjl>input").val(oldValue);//将增加后的值付给原控件
			}
		
		});
   });
   $(document).ready(function(){
		$("#3").click(function(){
			var oldValue=parseInt($("#ff_1").val());//取出现在的值，并使用parseInt转为int类型数据
			oldValue++;//自加1
			if(oldValue==24){
				$("#ff_1").val(0);
			}else{
				$("#ff_1").val(oldValue);//将增加后的值付给原控件
			}
		});
   });
   $(document).ready(function(){
		$("#4").click(function(){
			var oldValue=parseInt($("#ff_1").val());//取出现在的值，并使用parseInt转为int类型数据
			oldValue--;//自加1
			if(oldValue==0||oldValue<0){
			   $("#ff_1").val(0);
			}else{
			   $("#ff_1").val(oldValue);//将增加后的值付给原控件
			}
		
		});
   });
   $(document).ready(function(){
		$("#5").click(function(){
			var oldValue=parseInt($("#ff_2").val());//取出现在的值，并使用parseInt转为int类型数据
			oldValue++;//自加1
			if(oldValue==60){
				$("#ff_2").val(0);
			}else{
				$("#ff_2").val(oldValue);//将增加后的值付给原控件
			}
		});
   });
   $(document).ready(function(){
		$("#6").click(function(){
			var oldValue=parseInt($("#ff_2").val());//取出现在的值，并使用parseInt转为int类型数据
			oldValue--;//自加1
			if(oldValue==0||oldValue<0){
			   $("#ff_2").val(0);
			}else{
			   $("#ff_2").val(oldValue);//将增加后的值付给原控件
			}
		
		});
   });
   
})

