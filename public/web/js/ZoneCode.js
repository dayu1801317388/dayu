$(function(){
	$("#demo").focus(function(){
		$(this).css("border","2px solid #0077FF");
	}).blur(function(){
		$(this).css("border","1px solid #888");
	})
	$("#1").click(function(){
		$(this).text("大区(显示)");
		$("#2").text("分区(隐藏)");
		$("#3").text("子区(隐藏)");
		$("#4").text("位置(隐藏)");
	})
	$("#2").click(function(){
		$(this).text("分区(显示)");
		$("#1").text("大区(隐藏)");
		$("#3").text("子区(隐藏)");
		$("#4").text("位置(隐藏)");
	})
	$("#3").click(function(){
		$(this).text("子区(显示)");
		$("#1").text("大区(隐藏)");
		$("#2").text("分区(隐藏)");
		$("#4").text("位置(隐藏)");
	})
	$("#4").click(function(){
		$(this).text("位置(显示)");
		$("#1").text("大区(隐藏)");
		$("#2").text("分区(隐藏)");
		$("#3").text("子区(隐藏)");
	})
})