;(function(factory){
	if(typeof define === "function" && define.amd){
		define(["jquery"],factory);
	}else{
		factory(jQuery);
	}
})(function($){
	$.fn.tab=function(){
		this.on("click",function(){
			alert("xxxx")
		});
	}
	return "xxxx";
})