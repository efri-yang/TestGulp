/**
 * [GetIscrollHeight description]
 * @param {[type]} iscrollbox     [iscroll滚动容器]
 * @param {[type]} iscrollcontent [iscroll滚动内容]
 * @param {[type]} distance       [需要扣除的距离]
 * @param {[type]} container      [依赖的容器]
 */
var GetIscrollHeight=function(iscrollbox,iscrollcontent,distance,container){
	var container=!!container ? container : window,
		$iscrollcontent=$(iscrollcontent),
		maxHeightPercent=$(iscrollbox).css("maxHeight");
	var	maxH=parseInt($(container).height())*((parseInt(maxHeightPercent))/100),
		iscrollContentH=$iscrollcontent.height();
		iscrollBoxH=maxH-distance;
	if(iscrollBoxH <= iscrollContentH){
		return iscrollBoxH;
	}else{
		return false;
	}
}

/**
 * 我的购物车
 * 方法：
 * 		1、显示(回调函数)
 * 		2、隐藏的方式
 * 		2、显示遮罩层的方法
 * 		3、关闭遮罩层的方法
 * 
 */



$(function(){
   // alert(GetIscrollHeight('[data-roler="cartdetailhanger"]','[data-roler="cartiscrollbox"]',86))
	function MyCart(){
		this.$cartBoxHanger=$('[data-roler="dc-mycartbox-hanger"]'),
		this.$cartdetailHanger=$('[data-roler="cartdetailhanger"]'),
		this.$cartiscrollbox=$('[data-roler="cartiscrollbox"]'),
		this.$maskHanger=$('[data-roler="cartmaskhanger"]');
		this.iscroll;
		this.init();
	};
	MyCart.prototype={
		init:function(){
			var _this=this;
			this._setIscrollHeight();
			if(!!this.iscroll){
				this.iscroll=new IScroll('#J_iscroll-wrapper-mycartpro', {
						scrollbars: true,
						mouseWheel: true,
						interactiveScrollbars: true,
						shrinkScrollbars: 'scale',
						fadeScrollbars: true
					});
			}
			this.$maskHanger.on("click",function(){
				_this.hide();
			})
		},
		show:function(callback){
			this.$cartBoxHanger.css("visibility","visible");
			this._showCartDetail();
			this._showMask();
			!!callback && callback();
		},
		hide:function(callback){
			this.$cartBoxHanger.css("visibility","hidden");
			this._hideCartDetail();
			this._hideMask();
			!!callback && callback();
		},
		_showMask:function(){
			this.$maskHanger.addClass('mask-show');
		},
		_hideMask:function(){
			this.$maskHanger.removeClass('mask-show');
		},
		_showCartDetail:function(){
			this.$cartdetailHanger.addClass("mycart-detail-show");
		},
		_hideCartDetail:function(){
			this.$cartdetailHanger.removeClass("mycart-detail-show");
		},
		_setIscrollHeight:function(){
			var h=GetIscrollHeight('[data-roler="cartdetailhanger"]','[data-roler="cartiscrollbox"]',86);
			this.$cartiscrollbox.height(h);
		}
	};





	// var Cart=new MyCart();
	// var $cartHanger=$('[data-roler="mycarthanger"]');
	// $cartHanger.on("click",function(){
	// 		Cart.show();
	// })

})