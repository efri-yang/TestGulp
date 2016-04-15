$(function(){




var $dcPro=$("#J_dc-pro"),//中间iscroll容器
	$dcTab1=$("#J_dc-tab1"),//tab头部容器
	$dcFtNav=$("#J_mycartfootbar"),//固定在底部的导航
	$window=$(window),//window对象
	mainProTempId="prolisttemp",
	$proListUl=$("#J_dc-pro-list"),
	$noticeBox=$("#J_dc-notice"),//公告容器
	myScrollForDcNav,//左侧导航iscroll实例
	myScrollForDcPro;//右侧产品iscroll实例

function calculateHeight(){
	var exactH,
		tabH=$dcTab1.height(),
		winH=$window.height(),
		dcFtNavH=$dcFtNav.height(),
		dcNoticeH=$noticeBox.height();
	if($noticeBox.css("display")=="block"){
		exactH=winH-(tabH+dcNoticeH+dcFtNavH);
	}else{
		exactH=winH-(tabH+dcFtNavH);
	}
	$dcPro.height(exactH);
};
$window.on("resize",function(){
	calculateHeight();
}).trigger("resize");

/**
 * 关闭广告
 */
$noticeBox.find(".close").on("click",function(event){

	$noticeBox.slideUp(function(){
		calculateHeight();
		setTimeout(function () {
		        myScrollForDcNav.refresh();
		        MainProTemp1.refresh();
		 }, 10);
	})
});



/**
 * tab选项卡
 */
// var FootFixedCartObj=new FootFixedCart();
$dcTab1.children('li').each(function(index, el) {
	$(this).on("click",function(){
		if(!$(this).hasClass('oncurr')){
			$(this).addClass('oncurr').siblings().removeClass('oncurr');
			var target=$(this).data("target");
			if(target=="dc-tab-seller"){
				$("body").addClass("bgf2f2f2");
				MyCartEffect.hideFootBar();
			}else{
				$("body").removeClass("bgf2f2f2")
				MyCartEffect.showFootBar();
			}
			$(".dc-tab-bds").hide();
			$("."+target).show();
		}
	})
});

/**
 * 左边滚动iscroll
 */
$window.on("load",function(){
	myScrollForDcNav = new IScroll('#J_iscroll-wrapper-dcnav', {
		scrollbars: false,
		mouseWheel: true,
		interactiveScrollbars: true,
		shrinkScrollbars: 'scale',
		fadeScrollbars: true,
		click:true
	});
})






MainProTemp1=(function(){
	var myScroll,
	_iscroll=function(){
		myScroll=new IScroll("#J_iscroll-wrapper-dcprolist", {
			scrollbars: true,
			mouseWheel: true,
			interactiveScrollbars: true,
			shrinkScrollbars: 'scale',
			fadeScrollbars: true,
			click:true
		});
	};

	return{
		init:function(){
			mixDataByOrders();
			var html=this.render(serverProListData);
			this.addTempHtml(html);

		},
		render:function(dataobj,tempid){
			var data=[];
			data.list=dataobj;
			var tempid=tempid ? tempid : mainProTempId;
			var html=template(tempid,data);
			return html;	
		},
		addTempHtml:function(html){
			$proListUl.html(html);
			this.refresh();
			LazyLoad();
		},
		refresh:function(){
			if(!myScroll){
				_iscroll();
				myScroll.on("scrollEnd",function(){
					LazyLoad();
				})
			}
			myScroll.refresh();
		}
	}
})();


MainProTemp1.init();


var  loadLayer;
$(".dc-pro-lf-nav").children("li:not(.ignore)").each(function(index,elem){
	$(this).on("click",function(){
		var $this=$(this);	
		if($this.hasClass("oncurr")) return;
		var prolistData=null,
			url=$this.data("url");
		$this.addClass("oncurr").siblings().removeClass();
		if($this.data("prodata")){
			prolistData=$this.data("prodata");
			serverProListData=prolistData;
			resetProListStatu();
		}else{
			$.ajax({
				url: url,
				type:"get",
				dataType:"json",
				beforeSend:function(){
					loadLayer=layer.open({
					    type: 2,
					    shade:false
					})
				},
				complete:function(){
					layer.close(loadLayer)
				},
				success:function(data){
					serverProListData=data;
					$this.data("prodata",data);
					resetProListStatu();
				}
			})
		}
	})

})




})


