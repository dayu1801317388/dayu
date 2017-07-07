$(function(){
    var add="南京金港科创园";
	map_list(add);
});
function map_list(add){
	$.ajax({
				type:"post",
		        url: "/web/map_list",
		        dataType: "jsonp",
		        jsonp:"jsoncallback",
		        success: function(data){
				  if(data.data=="error"){
					var dat_a="";
					mapssss(dat_a,add);
				  }else{
				    var dat_a=data.data;
					mapssss(dat_a,add);
				  }
		        }
		     })
}
function mapssss(dat_a,add)
{
  map = new BMap.Map("MapContent");    
  map.centerAndZoom(new BMap.Point('118.9130010000', '32.1298120000'), 11);
  map.enableScrollWheelZoom(true); //启用滚轮放大缩小
  //向地图中添加缩放控件
  var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
  map.addControl(ctrl_nav);
  //向地图中添加缩略图控件
  var ctrl_ove = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:1});
  map.addControl(ctrl_ove);
  //向地图中添加比例尺控件
  var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
  map.addControl(ctrl_sca);
  //地图、卫星、混合模式切换 
  map.addControl(new BMap.MapTypeControl({mapTypes: [BMAP_NORMAL_MAP, BMAP_SATELLITE_MAP, BMAP_HYBRID_MAP]}));
  
  //---------------------------------------------鼠标右键（放大，缩小）操作---------------------------------------------  
        var menu = new BMap.ContextMenu(); //右键菜单  
        var txtMenuItem = [  //右键菜单项目  
            {  
                text:'放大',  
                callback:function(){map.zoomIn()}  
            },  
            {  
                text:'缩小',  
                callback:function(){map.zoomOut()}  
            },  
            {  
                text:'放置到最大级',  
                callback:function(){map.setZoom(18)}  
            },  
            {  
                text:'查看全国',  
                callback:function(){map.setZoom(4)}  
            },  
            {  
                text:'在此添加标注',  
                callback:function(p){  
                var marker = new BMap.Marker(p), px = map.pointToPixel(p);  
                    map.addOverlay(marker);  
                }  
            }  
        ];  
        for(var i=0; i < txtMenuItem.length; i++){  
            menu.addItem(new BMap.MenuItem(txtMenuItem[i].text,txtMenuItem[i].callback,100)); //菜单添加项目  
            if(i==1 || i==3) {  
                menu.addSeparator();  //添加右键菜单的分割线  
            }  
        }  
           
    map.addContextMenu(menu); 
  if(dat_a!=""){
	var point=new Array();     //存放标注点经纬信息的数组
    var marker=new Array();    //存放标注点对象的数组
    var info=new Array();       //存放提示信息窗口对象的数组
	var searchInfoWindow =new Array();//存放检索信息窗口对象的数组
	for (var i = 0; i < dat_a.length; i++) {
                        var p0 = dat_a[i].m_point.split("|")[0]; //
                        var p1 = dat_a[i].m_point.split("|")[1]; //按照原数组的point格式将地图点坐标的经纬度分别提出来
                        point[i] = new window.BMap.Point(p0, p1); //循环生成新的地图点
                        marker[i] = new window.BMap.Marker(point[i]); //按照地图点坐标生成标记
                        map.addOverlay(marker[i]);
                        marker[i].setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
                        var label = new window.BMap.Label(dat_a[i].m_title, { offset: new window.BMap.Size(20, -10) });
                        marker[i].setLabel(label);
						info[i] = "<p style=’font-size:12px;lineheight:1.8em;’>" + "</br>地址：" + dat_a[i].m_title + "</br> 电话：" + 123456 + "</br></p>";
                  
						//创建百度样式检索信息窗口对象                       
                        searchInfoWindow[i] = new BMapLib.SearchInfoWindow(map, info[i], {
                                title  : dat_a[i].m_title,      //标题
                                width  : 290,             //宽度
                                height : 55,              //高度
                                panel  : "panel",         //检索结果面板
                                enableAutoPan : true,     //自动平移
                                searchTypes   :[
                                    BMAPLIB_TAB_SEARCH,   //周边检索
                                    BMAPLIB_TAB_TO_HERE,  //到这里去
                                    BMAPLIB_TAB_FROM_HERE //从这里出发
                                ]
                            });
					    marker[i].addEventListener("click", 
                            (function(k){
                                return function(){
									//alert(dat_a[k].m_title);
                                    searchInfoWindow[k].open(marker[k]);
                                }
                            })(i)                            
                        ); 
			
                   }
  }
  var local = new BMap.LocalSearch(map, {
    renderOptions:{map: map}
  });
  local.search(add);
  //local.search($("#product_search").val());
};
