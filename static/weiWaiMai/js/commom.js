
var ShopCart,GetIscrollHeight,LazyLoad,MyCartEffect,MainBD,MainProTemp1,MainProTemp2;

var elemStr={
		totalCountId:"#J_totalamount",
		cartId:"#J_mycart",
		totalPriceId:"#J_totalprize",
		clearCartId:"#J_cleancart",
		fillBtnId:"#J_had-fulfil",
		noFillBtnId:"#J_no-fulfil",
		myCartProListWrapId:"#J_mycartprolist-wrapper",
		myCartProListId:"#J_mycart-pro-list",
		myCartContainerId:"#J_mycart-container",
		myCartMaskId:"#J_mycart-mask",
		myCartBoxId:"#J_mycart-box",
		myCartFootBarId:"#J_mycartfootbar",
		myCartTempId:"mycartprotemp",
		distancePrizeId:"#J_distanceprize",
		myCartIscrollId:"#J_iscroll-wrapper-mycartpro",
		amountnumSel:'[data-roler="amountnum"]',
		reduceBtnSel:'[data-roler="amountreduce"]'
};

var mixDataByOrders=function(){

	//服务端的数据与本地的cookie进行匹配，设置服务器端的数量数据
	if(ShopCart.getOrders().length==0){
		$.each(serverProListData,function(index1,obj1){
			serverProListData[index1].Count=0;	
		});	
	}else{
		$.each(serverProListData,function(index1,obj1){
			var num=0;
			$.each(ShopCart.getOrders(),function(index2,obj2){
				if(obj1.DishId==obj2.DishId){
					serverProListData[index1].Count=obj2.Count;
					return;	
				}else{
					if(num==(ShopCart.getOrders().length-1)){
						serverProListData[index1].Count=0;	
					}
				}
				num++;
				
			})
		});
	}
	// console.dir(serverProListData)
	// return serverProListData;
};
var resetProListStatu=function(){
	if(MainProTemp1){
		mixDataByOrders();
		var data=[];
		data.list=serverProListData;
		var html=template("prolisttemp",data)
		$("#J_dc-pro-list").html(html);
		LazyLoad();
		MainProTemp1.refresh()
	}else if(MainProTemp2){
		//初始化的时候已经被进行了匹配
		MainProTemp2.resetProListStatu();
	}
};
var toDecimal=function(x) { 
      var f = parseFloat(x); 
      if (isNaN(f)) { 
        return; 
      } 
      f = Math.round(x*100)/100; 
      return f; 
    } 
$(function(){



/**
 * [GetIscrollHeight 计算iscroll的高度(max-height)]
 * @param {[type]} iscrollbox     [iscroll滚动容器,基于window来计算宽高的那个元素]
 * @param {[type]} iscrollcontent [iscroll滚动内容]
 * @param {[type]} distance       [需要扣除的距离]
 * @param {[type]} container      [依赖的容器]
 */
GetIscrollHeight=function(iscrollbox,iscrollcontent,distance,container){
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
};
/**
 * [LazyLoad 图片懒加载]
 * @param {[string]} selector [样式选择器]
 */
LazyLoad=function(selector){
	var selector=selector ? selector :'img.lazy[data-loaded!=true]';
	$(selector).lazyload({
		effect : "fadeIn",
		load:function(){
			$(this).attr("data-loaded",true);
		}
	});
};


ShopCart=(function(){
	var orders=[];//[{DishId:1,Count:3,title:"标题"}]
	return {
		setOrders:function(localcartdata,servercartdata){
			var arrObj=[];
			//页面初始化的时候设置orders的值
			//localcartdata 没有的时候是一个空对象[object Array]
			//localcartdata本地购物车[{DishId:1,Count:1}]
			//servercartdata服务器端返回的购物车数据[{DishId:1,"title":"标题","price":"价格"}]
			$.each(localcartdata,function(index1,obj1){
				console.dir(index1)
				var num=0;
				$.each(servercartdata,function(index2,obj2){
					if(obj1.DishId==obj2.DishId){
						//如果本地的cookie和服务器的返回数据相比，都拥有id
						arrObj[num]=$.extend(obj1,obj2);
						return;
					}
					num++;
				})
			});
			orders=arrObj;
		},
		add:function(data){
			//判断通过id判断数据是否在orders里面，在那么就替换
			var index=this.getItemIndexByPId(data.DishId);	
			if(index || index===0){//在orders中存在对应的产品
				orders[index].Count++;
			}else{//如果不存在的时候,就要通过
				$.each(serverProListData,function(index1,obj1){
					if(obj1.DishId==data.DishId){
						serverProListData[index1].Count=1;
						dataDetailObj=$.extend(data,obj1,{Count:1});
						return;
					}
				});
				orders.push(dataDetailObj);
			}
			// console.dir(this.getOrderForCookie())
			
			CartLocal.a.set(this.getOrderForCookie());
			
			
		},
		reduce:function(data){
			var index=this.getItemIndexByPId(data.DishId);//获取pid对应项的index
			if($.type(index)!="number") return;
			orders[index].Count--;
			if(orders[index].Count<=0){
				orders.splice(index,1)
			}
			CartLocal.a.set(this.getOrderForCookie());
		},
		getTotalCount:function(){
			var total=0;
			$.each(orders,function(index,obj){
				total+=obj.Count;
			});
			return total;
		},
		getTotalPrize:function(){
			var totalPrice=0;
			$.each(orders,function(index,obj){
				totalPrice+=obj.Count*obj.present;
			});
			return toDecimal(totalPrice);
		},
		getDistance:function(totalSend){
			var distance=0;
			var currTotal=this.getTotalPrize();
			distance=totalSend-currTotal;
			return distance;
		},
		getItemCount:function(data){
			var index=this.getItemIndexByPId(data.DishId);
			if($.type(index)=="number"){
				return orders[index].Count;
			}
			return false;
		},
		getItemIndexByPId:function(id){//通过产品的id来找到orders里面对应的项的位置(index)
			var flag=false;
			$.each(orders,function(index, obj){
				if(obj.DishId==id){//找到的话
					flag=index;
					return;
				}
			});
			return flag;	
		},
		clearOrder:function(){
			orders.length=0;
			CartLocal.a.set(this.getOrderForCookie());
			return orders;
		},
		getOrders:function(){
			return orders;
		},
		getOrderForCookie:function(){
			var arr=[],objdata={},num=0;
			// console.dir(orders);
			$.each(orders,function(index,obj1){
				objdata={};
				objdata.DishId=obj1.DishId;
				objdata.Count=obj1.Count;
				arr[num]=objdata;
				num++;
			});
			return arr;
		},
		dir:function(){
			console.dir(orders);
		}
	}
})();


MainBd=(function(){
	return{
		show:function($reducebtn,$amount){
			$reducebtn.show();
			$amount.show();
		},
		hide:function($reducebtn,$amount){
			$reducebtn.hide();
			$amount.hide();
		},
		resetStatu:function(){
			

		}
	}
})();
/**
 * [description]
 * @param  {[type]} ){} [description]
 * @return {[type]}       [description]
 * 渲染
 */
MyCartEffect=(function(){
	var myScroll,
		_iscroll=function(){
			var h=GetIscrollHeight(elemStr.myCartBoxId,elemStr.myCartProListWrapId,86);
			$myCartProListWrap.height(h);
			myScroll=new IScroll(elemStr.myCartIscrollId, {
				scrollbars: true,
				mouseWheel: true,
				interactiveScrollbars: true,
				shrinkScrollbars: 'scale',
				fadeScrollbars: true,
				click:true
			});
		},
		_showMask=function(){
			$myCartMask.addClass('mask-show');
		},
		_hideMask=function(){
			$myCartMask.removeClass('mask-show');
		},
		_showCartDetail=function(){
			$myCartBox.addClass("mycart-detail-show");
		},
		_hideCartDetail=function(){
			$myCartBox.removeClass("mycart-detail-show");
		};


	return{
		init:function(severSendPrize,LocalCart,serverCart){
			ShopCart.setOrders(LocalCart,serverCart);//设置购物车orders初始化的值
			this.changeTotalCount();
			this.changeTotalPrize();
			this.changeSubtn(severSendPrize);
		},
		render:function(){
			var data=[];
			data.list=ShopCart.getOrders();
			var html=template(elemStr.myCartTempId,data);
			return html;	
		},
		appendTempHtml:function(html){
			var html=html ? html : this.render();
			$myCartProList.html(html);
			this.refresh();
		},
		refresh:function(){
			if(!myScroll){
				_iscroll();
			}
			myScroll.refresh();
		},
		show:function(callback){
			$myCartContainer.css("visibility","visible");
			_showCartDetail();
			_showMask();
			!!callback && callback();
		},
		hide:function(callback){
			$myCartContainer.css("visibility","hidden");
			_hideCartDetail();
			_hideMask();
			!!callback && callback();
		},
		hideFootBar:function(){
			$myCartFootBar.addClass('dc-bt-nav-hide')
		},
		showFootBar:function(){
			$myCartFootBar.removeClass('dc-bt-nav-hide')
		},
		removeItem:function($elem){
			$elem.remove();
		},
		clearCart:function(){
			var orders=ShopCart.clearOrder();//清除购物车数据
			var html=this.render(elemStr.myCartTempId,orders);//重新渲染html
			$myCartProList.html(html);
		},
		changeItemCount:function($elem,count){
			//添加或者是购买的时候 改变当前的产品的数量
			$elem.html(count);
		},
		changeTotalCount:function(){
			//改变总数量
			var value=ShopCart.getTotalCount();
			if(value>=1){
				$totalCount.fadeIn();
			}else if(value==0){
				$totalCount.fadeOut();
				return;
			}
			$totalCount.html(value);
		},
		changeTotalPrize:function(){
			var total=ShopCart.getTotalPrize();
			$totalPrice.html(total);
		},
		changeSubtn:function(sendTotal){
			var currtotal=ShopCart.getTotalPrize();
			var distance=sendTotal-currtotal;
			if(sendTotal <= currtotal){
				$noFillBtn.hide();
				$fillBtn.show();
			}else{
				$noFillBtn.show();
				$fillBtn.hide();
				$distancePrizeId.html(distance);
			}
		},
	}
})();




var $totalCount=$(elemStr.totalCountId),
	$cartId=$(elemStr.cartId),
	$totalPrice=$(elemStr.totalPriceId),
	$clearCart=$(elemStr.clearCartId)
	$fillBtn=$(elemStr.fillBtnId),
	$noFillBtn=$(elemStr.noFillBtnId),
	$myCartProListWrap=$(elemStr.myCartProListWrapId),
	$myCartProList=$(elemStr.myCartProListId),
	$myCartContainer=$(elemStr.myCartContainerId),
	$myCartMask=$(elemStr.myCartMaskId),
	$myCartBox=$(elemStr.myCartBoxId),
	$distancePrizeId=$(elemStr.distancePrizeId),
	$myCartFootBar=$(elemStr.myCartFootBarId);
/**
 * [购物车对象]
 */








/**
 * 通知
 */
(function(){
	var pageNotice;
	$(".dc-notice-txt").on("click",function(){
		pageNotice = layer.open({
		    type: 1,
		    content:$("#J_dc-notice-box-wrap").html(),
		    style:"position:fixed; left:0; top:0; width:100%; height:100%;background-color: rgba(0,0,0,0.7);"
		});
	})
	$(document).on("click","#J_dc-notice-box-close",function(){
		 layer.close(pageNotice); 
	})
})();
/**
 * 图片放大
 */
(function(){
	var pagePro,pageProLoad;
	$(document).on("click",'.dc-pro-list img[data-diabig]',function(){
			pageProLoad=layer.open({
				type:2
			});
			var $this=$(this),
				$parentLi=$(this).parents("li").eq(0),
				bigSrc=$(this).data("diabig"),
				pid=$parentLi.data("pid"),
				prize=$parentLi.find('[data-present="true"]').html(),
				unit=$parentLi.find('[data-present="true"]').data("unit"),
				title=$parentLi.find('[data-diatitle="true"]').html(),
				desc=$parentLi.find('[data-diadesc="true"]').html();
			var img=new Image();
		     img.src=bigSrc;
		    $(img).on("load",function(){
		    	layer.close(pageProLoad);
		    	$("#J_diaprotit").html(title);
				$("#J_diaproimg").attr("src",bigSrc);
				$("#J_diaproprize").html(prize);
				$("#J_diaprodesc").html(desc);
				$("#J_unit").html(unit);
				$("#fordatapid").attr("data-pid",pid);
				setTimeout(function(){
					pagePro= layer.open({
					    type: 1,
					    content:$("#J_dc-pro-detail-dialog").html(),
					    style:"width:80%;",
					    shadeClose:false
					});
					$("body").addClass("fullheight")
				},0)
		    })
	})
	$(document).on("click","#J_diaproclose",function(){
		layer.close(pagePro);
		resetProListStatu();
		$("body").removeClass("fullheight");
	});
	$(document).on("touchmove",'.dc-pro-detaildia',function(event){
		var $target=$(event.target);

		if(!$target.hasClass('desc')){
			event.preventDefault();
		}
		

	})
})();


function CartLocal() {
	        var $ = jQuery;

	        var storekey = $("[data-cart-storekey]").attr("data-cart-storekey");
	        this.get = function () {
	            try {
	                var data = $.cookie(storekey);
	                var json = decodeURIComponent(data);
	                var value = JSON.parse(json);
	                return value;
	            } catch (ex) {
	                return [];
	            }
	        };

	        this.set = function (value) {
	            var json = JSON.stringify(value);
	            var data = encodeURIComponent(json);
	            $.cookie(storekey, data, {
	                expires: 1000000,
	                path: "/"
	            });
	        };

};




CartLocal.a = new CartLocal();
var LocalCart=CartLocal.a.get();//获取本地的购物车cookie(拼接成购物车orders)
// CartLocal.a.set([{DishId:1,Count:2},{DishId:2,Count:2},{DishId:3,Count:2}]);

MyCartEffect.init(serverSendPrize,LocalCart,serverCart);//让购物车里面的数据拥有产品的信息
// console.dir(LocalCart);





//查看我购物车
$(document).on("click",'#J_mycart',function(event){
	event.stopPropagation();
	var $this=$(this);
	if(!!$this.data("show")){
		$this.data("show",0);
		$myCartMask.trigger("click");
	}else{
		$this.data("show",1);
		var html = MyCartEffect.appendTempHtml();
		MyCartEffect.show();
	}
	
	// var html = MyCartEffect.render();
	// 	$myCartProList.html(html);
	// 	MyCartEffect.refresh();//初始化iscroll,并刷新
	// 	MyCartEffect.show();
});
//我的购物车增加按钮
$(document).on("touchstart",'#J_mycart-pro-list [data-roler="amountadd"],.dc-pro-list [data-roler="amountadd"]',function(event){
	event.preventDefault();
	event.stopPropagation();
	var $this=$(this),
		$parentLi=$this.parents("li").eq(0),
		$reducebtn=$parentLi.find(elemStr.reduceBtnSel),
		$amountnum=$parentLi.find(elemStr.amountnumSel),
		DishId=$parentLi.data("pid");
	ShopCart.add({DishId:DishId});
	var itemCount=ShopCart.getItemCount({DishId:DishId});
	if(itemCount==1){
		MainBd.show($reducebtn,$amountnum);
	}
	MyCartEffect.changeItemCount($amountnum,itemCount);
	MyCartEffect.changeTotalPrize();
	MyCartEffect.changeTotalCount();
	MyCartEffect.changeSubtn(serverSendPrize);

	if($parentLi.prop("id")=="fordatapid"){
		layer.open({
			shade:false,
			content: '<div style="display:inline-block;background-color:rgba(0,0,0,0.8); color:#fff;padding:10px 15px;border-radius:5px; ">添加成功</div>',
			style:'background:none;border:none;text-align:center;box-shadow:none',
		    time: 1
		});
	}
	if(MainProTemp2){
		MainProTemp2.resetProListStatu();
	}
});
//我的购物车数量减少按钮
$(document).on("touchstart",'#J_mycart-pro-list [data-roler="amountreduce"],.dc-pro-list [data-roler="amountreduce"]',function(event){
	event.preventDefault();
		event.stopPropagation();
	var $this=$(this),
		tempHtml,
		$parentLi=$this.parents("li").eq(0),
		$parentUl=$parentLi.parent(),
		$amountnum=$parentLi.find(elemStr.amountnumSel),
		DishId=$parentLi.data("pid");

		
	ShopCart.reduce({DishId:DishId});
	// console.dir(ShopCart.getOrders())
	var itemCount=ShopCart.getItemCount({DishId:DishId});
	if(!itemCount){
		if($parentUl.prop("id")=="J_mycart-pro-list"){//购物车里面减号
			MyCartEffect.removeItem($parentLi);
			MyCartEffect.appendTempHtml();
		}else{//列表减号
			MainBd.hide($this,$amountnum);
		}
	}
	MyCartEffect.changeItemCount($amountnum,itemCount);
	MyCartEffect.changeTotalPrize();
	MyCartEffect.changeTotalCount();
	MyCartEffect.changeSubtn(serverSendPrize);

	if(MainProTemp2){
		MainProTemp2.resetProListStatu();
	}
});

//清楚购物车
$clearCart.on("click",function(event){
	ShopCart.clearOrder();
	MyCartEffect.appendTempHtml();
	MyCartEffect.changeTotalCount();//设置了购买数量
	MyCartEffect.changeTotalPrize();//设置总价格
	MyCartEffect.changeSubtn(serverSendPrize);//改变状态按钮
});


$myCartMask.on("click",function(event){
	event.preventDefault();
	$cartId.data("show",0)
	MyCartEffect.hide(resetProListStatu);
});



	

})