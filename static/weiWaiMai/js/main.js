require(["jquery"],function($){
	$(function(){
		$("#btn1").on("click",function(){
			alert("xxx")
			$.ajax({
				url:"php/list.php",
				dataType:"json",
				success:function(data){
					console.dir(data)
				}
			})
		})
	})
})