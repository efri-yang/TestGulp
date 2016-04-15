<?php  
	// $classid=$_GET["classid"];
	$classid=1;
	$a=0;
	for($i=0;$i<10000000;$i++){
		$a+=10;
	}
	if($classid==1){
		$arr=array(
			array("DishId"=>1,"title"=>"产品01","smallsrc"=>"images/demo/cy_picsec01.jpg","bigsrc"=>"images/demo/big1.jpg","promotion"=>"六店同庆，热销单品半价!","amount"=>"50","desc"=>"描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述述描述描述描述描述描述描述","present"=>"100","original"=>"40"),
			array("DishId"=>2,"title"=>"产品02","smallsrc"=>"images/demo/cy_picsec01.jpg","bigsrc"=>"images/demo/big1.jpg","promotion"=>"六店同庆，热销单品半价!","amount"=>"50","desc"=>"描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述述描述描述描述描述描述描述","present"=>"50","original"=>"40"),
			array("DishId"=>3,"title"=>"产品03","smallsrc"=>"images/demo/cy_picsec01.jpg","bigsrc"=>"images/demo/big1.jpg","promotion"=>"六店同庆，热销单品半价!","amount"=>"50","desc"=>"描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述述描述描述描述描述描述描述","present"=>"15","original"=>"40"),
			array("DishId"=>4,"title"=>"产品04","smallsrc"=>"images/demo/cy_picsec01.jpg","bigsrc"=>"images/demo/big1.jpg","promotion"=>"六店同庆，热销单品半价!","amount"=>"50","desc"=>"描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述述描述描述描述描述描述描述","present"=>"70","original"=>"40"),
			array("DishId"=>5,"title"=>"产品05","smallsrc"=>"images/demo/cy_picsec01.jpg","bigsrc"=>"images/demo/big1.jpg","promotion"=>"六店同庆，热销单品半价!","amount"=>"50","desc"=>"描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述述描述描述描述描述描述描述","present"=>"15","original"=>"40","present"=>"15","original"=>"40"),
			array("DishId"=>6,"title"=>"产品06","smallsrc"=>"images/demo/cy_picsec01.jpg","bigsrc"=>"images/demo/big1.jpg","promotion"=>"六店同庆，热销单品半价!","amount"=>"50","desc"=>"描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述述描述描述描述描述描述描述","present"=>"60","original"=>"40"),
			array("DishId"=>7,"title"=>"产品07","smallsrc"=>"images/demo/cy_picsec01.jpg","bigsrc"=>"images/demo/big1.jpg","promotion"=>"六店同庆，热销单品半价!","amount"=>"50","desc"=>"描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述述描述描述描述描述描述描述","present"=>"55","original"=>"40"),
			array("DishId"=>8,"title"=>"产品08","smallsrc"=>"images/demo/cy_picsec01.jpg","bigsrc"=>"images/demo/big1.jpg","promotion"=>"六店同庆，热销单品半价!","amount"=>"50","desc"=>"描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述述描述描述描述描述描述描述","present"=>"15","original"=>"40"),
			array("DishId"=>9,"title"=>"产品09","smallsrc"=>"images/demo/cy_picsec01.jpg","bigsrc"=>"images/demo/big1.jpg","promotion"=>"六店同庆，热销单品半价!","amount"=>"50","desc"=>"描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述述描述描述描述描述描述描述","present"=>"25","original"=>"40"),
			array("DishId"=>10,"title"=>"产品10","smallsrc"=>"images/demo/cy_picsec01.jpg","bigsrc"=>"images/demo/big1.jpg","promotion"=>"六店同庆，热销单品半价!","amount"=>"50","desc"=>"描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述述描述描述描述描述描述描述","present"=>"15","original"=>"40"),
			array("DishId"=>11,"title"=>"产品11","smallsrc"=>"images/demo/cy_picsec01.jpg","bigsrc"=>"images/demo/big1.jpg","promotion"=>"六店同庆，热销单品半价!","amount"=>"50","desc"=>"描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述述描述描述描述描述描述描述","present"=>"10","original"=>"40"),
			array("DishId"=>12,"title"=>"产品12","smallsrc"=>"images/demo/cy_picsec01.jpg","bigsrc"=>"images/demo/big1.jpg","promotion"=>"六店同庆，热销单品半价!","amount"=>"50","desc"=>"描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述述描述描述描述描述描述描述","present"=>"15","original"=>"40"),
			array("DishId"=>13,"title"=>"产品13","smallsrc"=>"images/demo/cy_picsec01.jpg","bigsrc"=>"images/demo/big1.jpg","promotion"=>"六店同庆，热销单品半价!","amount"=>"50","desc"=>"描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述述描述描述描述描述描述描述","present"=>"45","original"=>"40"),
			array("DishId"=>14,"title"=>"产品14","smallsrc"=>"images/demo/cy_picsec01.jpg","bigsrc"=>"images/demo/big1.jpg","promotion"=>"六店同庆，热销单品半价!","amount"=>"50","desc"=>"描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述述描述描述描述描述描述描述","present"=>"15","original"=>"40"),
			array("DishId"=>15,"title"=>"产品15","smallsrc"=>"images/demo/cy_picsec01.jpg","bigsrc"=>"images/demo/big1.jpg","promotion"=>"六店同庆，热销单品半价!","amount"=>"50","desc"=>"描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述述描述描述描述描述描述描述","present"=>"15","original"=>"40"));
	}else if($classid==2){
		$arr=array(
			array("DishId"=>1,"title"=>"产品01","smallsrc"=>"images/demo/cy_picsec01.jpg","bigsrc"=>"images/demo/big1.jpg","promotion"=>"六店同庆，热销单品半价!","amount"=>"50","desc"=>"描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述述描述描述描述描述描述描述","present"=>"100","original"=>"40"),
			array("DishId"=>16,"title"=>"产品16","smallsrc"=>"images/demo/cy_picsec01.jpg","bigsrc"=>"images/demo/big1.jpg","promotion"=>"六店同庆，热销单品半价!","amount"=>"50","desc"=>"描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述述描述描述描述描述描述描述","present"=>"30","original"=>"40"),
			array("DishId"=>17,"title"=>"产品17","smallsrc"=>"images/demo/cy_picsec01.jpg","bigsrc"=>"images/demo/big1.jpg","promotion"=>"六店同庆，热销单品半价!","amount"=>"50","desc"=>"描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述述描述描述描述描述描述描述","present"=>"35","original"=>"40"),
			array("DishId"=>18,"title"=>"产品18","smallsrc"=>"images/demo/cy_picsec01.jpg","bigsrc"=>"images/demo/big1.jpg","promotion"=>"六店同庆，热销单品半价!","amount"=>"50","desc"=>"描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述述描述描述描述描述描述描述","present"=>"35","original"=>"40"),
			array("DishId"=>19,"title"=>"产品19","smallsrc"=>"images/demo/cy_picsec01.jpg","bigsrc"=>"images/demo/big1.jpg","promotion"=>"六店同庆，热销单品半价!","amount"=>"50","desc"=>"描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述述描述描述描述描述描述描述","present"=>"35","original"=>"40"),
			array("DishId"=>20,"title"=>"产品20","smallsrc"=>"images/demo/cy_picsec01.jpg","bigsrc"=>"images/demo/big1.jpg","promotion"=>"六店同庆，热销单品半价!","amount"=>"50","desc"=>"描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述述描述描述描述描述描述描述","present"=>"60","original"=>"40"),
			array("DishId"=>21,"title"=>"产品06","smallsrc"=>"images/demo/cy_picsec01.jpg","bigsrc"=>"images/demo/big1.jpg","promotion"=>"六店同庆，热销单品半价!","amount"=>"50","desc"=>"描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述述描述描述描述描述描述描述","present"=>"15","original"=>"40"),
			array("DishId"=>22,"title"=>"产品07","smallsrc"=>"images/demo/cy_picsec01.jpg","bigsrc"=>"images/demo/big1.jpg","promotion"=>"六店同庆，热销单品半价!","amount"=>"50","desc"=>"描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述述描述描述描述描述描述描述","present"=>"15","original"=>"40"),
			array("DishId"=>23,"title"=>"产品08","smallsrc"=>"images/demo/cy_picsec01.jpg","bigsrc"=>"images/demo/big1.jpg","promotion"=>"六店同庆，热销单品半价!","amount"=>"50","desc"=>"描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述述描述描述描述描述描述描述","present"=>"15","original"=>"40"),
			array("DishId"=>24,"title"=>"产品09","smallsrc"=>"images/demo/cy_picsec01.jpg","bigsrc"=>"images/demo/big1.jpg","promotion"=>"六店同庆，热销单品半价!","amount"=>"50","desc"=>"描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述述描述描述描述描述描述描述","present"=>"15","original"=>"40"),
			array("DishId"=>25,"title"=>"产品10","smallsrc"=>"images/demo/cy_picsec01.jpg","bigsrc"=>"images/demo/big1.jpg","promotion"=>"六店同庆，热销单品半价!","amount"=>"50","desc"=>"描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述述描述描述描述描述描述描述","present"=>"15","original"=>"40"),
			array("DishId"=>26,"title"=>"产品11","smallsrc"=>"images/demo/cy_picsec01.jpg","bigsrc"=>"images/demo/big1.jpg","promotion"=>"六店同庆，热销单品半价!","amount"=>"50","desc"=>"描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述述描述描述描述描述描述描述","present"=>"45","original"=>"40"),
			array("DishId"=>27,"title"=>"产品12","smallsrc"=>"images/demo/cy_picsec01.jpg","bigsrc"=>"images/demo/big1.jpg","promotion"=>"六店同庆，热销单品半价!","amount"=>"50","desc"=>"描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述述描述描述描述描述描述描述","present"=>"15","original"=>"40"),
			array("DishId"=>28,"title"=>"产品13","smallsrc"=>"images/demo/cy_picsec01.jpg","bigsrc"=>"images/demo/big1.jpg","promotion"=>"六店同庆，热销单品半价!","amount"=>"50","desc"=>"描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述述描述描述描述描述描述描述","present"=>"15","original"=>"40"),
			array("DishId"=>29,"title"=>"产品14","smallsrc"=>"images/demo/cy_picsec01.jpg","bigsrc"=>"images/demo/big1.jpg","promotion"=>"六店同庆，热销单品半价!","amount"=>"50","desc"=>"描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述述描述描述描述描述描述描述","present"=>"15","original"=>"40"),
			array("DishId"=>30,"title"=>"产品15","smallsrc"=>"images/demo/cy_picsec01.jpg","bigsrc"=>"images/demo/big1.jpg","promotion"=>"六店同庆，热销单品半价!","amount"=>"50","desc"=>"描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述述描述描述描述描述描述描述","present"=>"15","original"=>"40"));
	}else if($classid==3){
		$arr=array(
			array("DishId"=>60,"title"=>"产品60","smallsrc"=>"images/demo/cy_picsec01.jpg","bigsrc"=>"images/demo/big1.jpg","promotion"=>"六店同庆，热销单品半价!","amount"=>"50","desc"=>"描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述述描述描述描述描述描述描述","present"=>"15","original"=>"40"),
			array("DishId"=>61,"title"=>"产品61","smallsrc"=>"images/demo/cy_picsec01.jpg","bigsrc"=>"images/demo/big1.jpg","promotion"=>"六店同庆，热销单品半价!","amount"=>"50","desc"=>"描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述述描述描述描述描述描述描述","present"=>"15","original"=>"40"),
			array("DishId"=>62,"title"=>"产品62","smallsrc"=>"images/demo/cy_picsec01.jpg","bigsrc"=>"images/demo/big1.jpg","promotion"=>"六店同庆，热销单品半价!","amount"=>"50","desc"=>"描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述述描述描述描述描述描述描述","present"=>"15","original"=>"40"));
			
	}else{
		$arr=array();
	};
	
	// $arr=array(
	// 	array("DishId"=>1,"title"=>"产品01","smallsrc"=>"images/demo/cy_picsec01.jpg","bigsrc"=>"images/demo/big1.jpg","promotion"=>"六店同庆，热销单品半价!","amount"=>"50","desc"=>"描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述述描述描述描述描述描述描述","present"=>"15","original"=>"40"),
	// 	array("DishId"=>2,"title"=>"产品02","smallsrc"=>"images/demo/cy_picsec01.jpg","bigsrc"=>"images/demo/big1.jpg","promotion"=>"六店同庆，热销单品半价!","amount"=>"50","desc"=>"描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述述描述描述描述描述描述描述","present"=>"15","original"=>"40"),
	// 	array("DishId"=>3,"title"=>"产品03","smallsrc"=>"images/demo/cy_picsec01.jpg","bigsrc"=>"images/demo/big1.jpg","promotion"=>"六店同庆，热销单品半价!","amount"=>"50","desc"=>"描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述述描述描述描述描述描述描述","present"=>"15","original"=>"40"),
	// 	array("DishId"=>4,"title"=>"产品04","smallsrc"=>"images/demo/cy_picsec01.jpg","bigsrc"=>"images/demo/big1.jpg","promotion"=>"六店同庆，热销单品半价!","amount"=>"50","desc"=>"描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述述描述描述描述描述描述描述","present"=>"15","original"=>"40"),
	// 	array("DishId"=>5,"title"=>"产品05","smallsrc"=>"images/demo/cy_picsec01.jpg","bigsrc"=>"images/demo/big1.jpg","promotion"=>"六店同庆，热销单品半价!","amount"=>"50","desc"=>"描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述述描述描述描述描述描述描述","present"=>"15","original"=>"40","present"=>"15","original"=>"40"),
	// 	array("DishId"=>6,"title"=>"产品06","smallsrc"=>"images/demo/cy_picsec01.jpg","bigsrc"=>"images/demo/big1.jpg","promotion"=>"六店同庆，热销单品半价!","amount"=>"50","desc"=>"描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述述描述描述描述描述描述描述","present"=>"15","original"=>"40"),
	// 	array("DishId"=>7,"title"=>"产品07","smallsrc"=>"images/demo/cy_picsec01.jpg","bigsrc"=>"images/demo/big1.jpg","promotion"=>"六店同庆，热销单品半价!","amount"=>"50","desc"=>"描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述述描述描述描述描述描述描述","present"=>"15","original"=>"40"),
	// 	array("DishId"=>8,"title"=>"产品08","smallsrc"=>"images/demo/cy_picsec01.jpg","bigsrc"=>"images/demo/big1.jpg","promotion"=>"六店同庆，热销单品半价!","amount"=>"50","desc"=>"描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述述描述描述描述描述描述描述","present"=>"15","original"=>"40"),
	// 	array("DishId"=>9,"title"=>"产品09","smallsrc"=>"images/demo/cy_picsec01.jpg","bigsrc"=>"images/demo/big1.jpg","promotion"=>"六店同庆，热销单品半价!","amount"=>"50","desc"=>"描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述述描述描述描述描述描述描述","present"=>"15","original"=>"40"),
	// 	array("DishId"=>10,"title"=>"产品10","smallsrc"=>"images/demo/cy_picsec01.jpg","bigsrc"=>"images/demo/big1.jpg","promotion"=>"六店同庆，热销单品半价!","amount"=>"50","desc"=>"描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述述描述描述描述描述描述描述","present"=>"15","original"=>"40"),
	// 	array("DishId"=>11,"title"=>"产品11","smallsrc"=>"images/demo/cy_picsec01.jpg","bigsrc"=>"images/demo/big1.jpg","promotion"=>"六店同庆，热销单品半价!","amount"=>"50","desc"=>"描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述述描述描述描述描述描述描述","present"=>"15","original"=>"40"),
	// 	array("DishId"=>12,"title"=>"产品12","smallsrc"=>"images/demo/cy_picsec01.jpg","bigsrc"=>"images/demo/big1.jpg","promotion"=>"六店同庆，热销单品半价!","amount"=>"50","desc"=>"描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述述描述描述描述描述描述描述","present"=>"15","original"=>"40"),
	// 	array("DishId"=>13,"title"=>"产品13","smallsrc"=>"images/demo/cy_picsec01.jpg","bigsrc"=>"images/demo/big1.jpg","promotion"=>"六店同庆，热销单品半价!","amount"=>"50","desc"=>"描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述述描述描述描述描述描述描述","present"=>"15","original"=>"40"),
	// 	array("DishId"=>14,"title"=>"产品14","smallsrc"=>"images/demo/cy_picsec01.jpg","bigsrc"=>"images/demo/big1.jpg","promotion"=>"六店同庆，热销单品半价!","amount"=>"50","desc"=>"描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述述描述描述描述描述描述描述","present"=>"15","original"=>"40"),
	// 	array("DishId"=>15,"title"=>"产品15","smallsrc"=>"images/demo/cy_picsec01.jpg","bigsrc"=>"images/demo/big1.jpg","promotion"=>"六店同庆，热销单品半价!","amount"=>"50","desc"=>"描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述述描述描述描述描述描述描述","present"=>"15","original"=>"40")
	// );



	echo json_encode($arr);

?>