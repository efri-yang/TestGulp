$(function(){
/**
 * 关闭广告
 */




	(function($){
		$("#J_dc-notice").find(".close").on("click",function(){
			$("#J_dc-notice").slideUp();
		})
	})(jQuery);

/**
 * 点击下拉更多
 */
	NavPullDown=(function(){
		var $mask=$('<div class="dcselectdown-mask" data-roler="dcselectmask"></div>'),
			$dcTab1=$("#J_dc-tab1"),
			$dcSelDownBox=$('[data-roler="dcseldownbox-hanger"]'),
			$dcSelectDown=$('[data-roler="dcselectdown"]'),
			iscroll=null,
			$rotateElem=$dcSelectDown.find("strong");


		var show=function(){
				_showNav();
				_showMask();
				_handles("show");
			},
			hide=function(){
				_hideNav();
				_hideMask();
				_handles("hide");
			},
			init=function(){
				var h=GetIscrollHeight('[data-roler="dcseldownbox-hanger"]','.dcseldown-list',0);
				$dcSelDownBox.height(h);
				iscroll=new IScroll('#J_iscroll-wrapper-dcseldown', {
					scrollbars: true,
					mouseWheel: true,
					interactiveScrollbars: true,
					shrinkScrollbars: 'scale',
					fadeScrollbars: true,
					click:true
				});
			},
			_showNav=function(){
				$dcSelDownBox.addClass('unfold');	
			},
			_hideNav=function(){
				$dcSelDownBox.removeClass('unfold');	
			},
			_showMask=function(){
				$mask.appendTo($("body"));
			},
			_hideMask=function(){
				$mask.remove();
			},
			_handles=function(statu){
				if(statu=="show"){
					$dcTab1.css({"zIndex":104});
					$rotateElem.addClass('unfold');
				}else if(statu=="hide"){
					$dcTab1.css({"zIndex":10});
					$rotateElem.removeClass('unfold');
				}	
			};
		$(document).on("touchstart",'[data-roler="dcselectmask"]',function(){
			hide();
		});
		return {
			init:init,
			show:show,
			hide:hide,
			iscroll:iscroll
		}
	})();
	NavPullDown.init();
/**
 * [点击关闭]
 */
$('[data-roler="dcselectdown"]').on("click",function(){
	if($(this).hasClass('oncurr')){
		if(!$('[data-roler="dcselectmask"]').length){
			NavPullDown.show();
		}else{
			NavPullDown.hide();
		}
	}
}).on("touchmove",function(e){
	e.preventDefault();
});

/**
 * tab选项卡
 */
var $prolis=$(".dc-pro-list").children('li');
MainProTemp2=(function(){
	return{
		resetProListStatu:function(){
			var orders=ShopCart.getOrders();
			$.each($prolis,function(index1,elem){
				var $elem=$(elem);
				var num=0;
				var pid=$elem.data("pid");
				var $amount=$elem.find('[data-roler="amountnum"]');
				var $reduceBtn=$elem.find('[data-roler="amountreduce"]');
				if(!orders.length){
					$amount.hide();
					$reduceBtn.hide()
				}else{
					$.each(orders,function(index2,obj){
						if(obj.DishId==pid){	
								$amount.html(obj.Count);
								$amount.show();
								$reduceBtn.show();
								return;
						}else{
							if(num==(orders.length-1)){
								$amount.hide();
								$reduceBtn.hide();
							}
						}
						num++;
					})		
				}
			})
		}
	}
})();

MainProTemp2.resetProListStatu();
$("#J_dc-tab1").children('li').each(function(index, el) {
	$(this).on("click",function(){
		if(!$(this).hasClass('oncurr')){
			$(this).addClass('oncurr').siblings().removeClass('oncurr');
			var target=$(this).data("target");
			if(target=="dc-tab-seller"){
				$("body").addClass("bgf2f2f2");
				MyCartEffect.hideFootBar();
				NavPullDown.hide();
			}else{
				$("body").removeClass("bgf2f2f2");
				MyCartEffect.showFootBar();
			}
			$(".dc-tab-bds").hide();
			$("."+target).show();
		}
	})
});



var $titSort=$(".sort-tit-wrap");
var posArray=[];
$.each($titSort,function(index, el) {
	var $el=$(el);
	var top=$el.offset().top;
	posArray[index]=top;
});
$(".dcseldown-list a:not(.ignore)").each(function(index,elem){
	$(this).on("click",function(event){
		event.preventDefault();
		NavPullDown.hide();
		var href=$(this).data("href");
		var $el=$(href);
		var top=$el.offset().top;
		$('html,body').animate({scrollTop:(top-42)}, 500)
	})
});

	/**
	 * 滚动固定标题
	 * duration 固定时间执行
	 * delay 例如不间断的事件会在会后一个事件上延迟delay秒执行
	 */
	(function($){
		// $('html,body').animate({scrollTop: '50px'}, 800)
		var $titWrap=$(".dc-tabwrap");
		function throttle(fn,delay,duration){
          var timer=null,last_exec=0;
          return function(){
             var context=this,args=arguments,elapsed = +new Date();
             clearTimeout(timer);  
             if(!last_exec){
                last_exec = elapsed;
             }
             if(elapsed-last_exec > duration){
                  fn.apply(context, args);
                  last_exec=elapsed;     
             }else {
                    timer = setTimeout(function(){
                        fn.apply(context, args);
                    }, delay);
             }
          }
      }
      function handFunc(){
      		var scrollTop=$(window).scrollTop();
       		
       			if(scrollTop >=0){
       				$titWrap.addClass('dc-tabwrap-fixed');
       				
       			}else{
       				$titWrap.removeClass('dc-tabwrap-fixed');
       				
       			}
       		
      }
      $(window).on("scroll",throttle(handFunc,250,50))
	})(jQuery);

LazyLoad();//图片加载

//获取本地coookie
//匹配购物车




})	

