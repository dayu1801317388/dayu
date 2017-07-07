$(function(){
	$("#tiao_g").click(function(){
		if($(".home_list_middle .main").is(':hidden')){
			$(".home_list_middle .main").show();
			$("#tiao_g").text("调光>OFF");
		}else{
			$(".home_list_middle .main").hide();
			$("#tiao_g").text("调光>ON");
		}
	})
	$(".contain .track").mouseup(function(){
		var aaa=$(".contain .show").text();
	})
})/*jquery 结束*/

$(function(){ScrollerTrack.Init();});
	var ScrollerTrack={
	 BodyWidth:200,
	 MaxValue:100,
	 CurrentX:0,
	 CurrentValue:0,
	 Count:0,
	 Init:function(){
	 var mWidth=ScrollerTrack.BodyWidth;
	 $(".contain").css("width",mWidth+"px");
	 var count=ScrollerTrack.MaxValue/20;
	 ScrollerTrack.Count=count;
	 var itemWidth=mWidth/count;
	 for(var i=0;i<count;i++){
	  var span=$("<span>"+(i+1)*20+"</span>");
	  $(span).css("width",itemWidth+"px").css("margin-left",i*itemWidth+"px");
	  $(".value").append(span);
	 }
	 ScrollerTrack.Value();
	 },
	Value:function(){
	  var currentValue;
	  var isMoving=false;
	  ScrollerTrack.CurrentX=$(".track").offset().left;
	  $(".track").mousedown(function() {
	  var target=$(this).parent();
	  isMoving=true;
	  $("html,body").mousemove(function(event) {
	   if(isMoving==false)return;
	   var changeX = event.clientX - ScrollerTrack.CurrentX;
			 currentValue = changeX - ScrollerTrack.CurrentX;
	   if(changeX<=0){
	   $(target).find(".track").css("margin-left", "0px");
	   $(target).find(".valueC").css("width", "0px");
	   $(target).find(".show").css("margin-left", "-15px");
	   $(target).find(".show").html(0);
	   ScrollerTrack.CurrentValue=0;
	   }
	   else if(changeX>=ScrollerTrack.BodyWidth-16){
	   $(target).find(".track").css("margin-left", ScrollerTrack.BodyWidth-16+"px");
	   $(target).find(".valueC").css("width",ScrollerTrack.BodyWidth-16+"px");
	   $(target).find(".show").css("margin-left", ScrollerTrack.BodyWidth-31+"px");
	   $(target).find(".show").html(ScrollerTrack.MaxValue);
	   ScrollerTrack.CurrentValue=ScrollerTrack.MaxValue;
	   }
	   else{
	   $(target).find(".track").css("margin-left", changeX+"px");
	   $(target).find(".valueC").css("width", changeX+"px");
	   $(target).find(".show").css("margin-left", changeX-15+"px");
	   var v=ScrollerTrack.MaxValue*((changeX+16)/ScrollerTrack.BodyWidth);
	   $(target).find(".show").html(parseInt(v));
	   ScrollerTrack.CurrentValue=parseInt(v);
	   }
	  });
	  });
	  $("html,body").mouseup(function() {
	  isMoving=false;
	  });
    }
    }
	





