/**
* 用户通知
*/
define(function(require){
    var $ = require('jquery');
    var Util = require('util');
    var order = window.php_var.order;

    //取默认的地址
    var Address = "search.php?keywords="+window.php_var.keywords+"&order="+window.php_var.order+"&page="+window.php_var.page;

    //默认的检索
    $(".default").click(function(){

        location.href = "search.php?keywords="+window.php_var.keywords;

    });// END 默认

    // 按销量排序
    if(window.php_var.order === "DESC"){
        $(".order_num").click(function(){

            Address = "search.php?sort=order_num&order=ASC&keywords="+window.php_var.keywords+"&page="+window.php_var.page;
            location.href = Address;

        });

    }else{
        $(".order_num").click(function(){

            Address = "search.php?sort=order_num&order=DESC&keywords="+window.php_var.keywords+"&page="+window.php_var.page;
            location.href = Address;

        });

    }// END 销量

    //按评价检索
    if(window.php_var.order === "DESC"){

        $(".special").click(function(){

            Address = "search.php?sort=comment&order=ASC&keywords="+window.php_var.keywords+"&page="+window.php_var.page;
            location.href = Address;

        });

    }else{
        $(".special").click(function(){

            Address = "search.php?sort=comment&order=DESC&keywords="+window.php_var.keywords+"&page="+window.php_var.page;
            location.href = Address;

        });

    }// END 评论

    //按最低最高价格检索
    $(".price").mouseover(function(){

        $(".price").find("span").css("display","block");

    });

    $(".price").find(".btn-fruit").click(function(){

        $(".price").find("input").val("");

    });

    $(".price").mouseout(function(){

        $(".price").find("span").css("display","none");

    });

    //通过按回车登陆
    $(".max-price").keypress(function(event){
        if ( event.keyCode === 13 ) {
            event.preventDefault();
            $(".btn-success").click();
            return false;
        }
    });//END keypress


    if(window.php_var.order === "DESC"){
        $(".price").find(".btn-success").click(function(){

            var maxPrice = $(".price").find(".max-price").val();
            var minPrice = $(".price").find(".min-price").val();
            var address = "&min_price="+minPrice+"&max_price="+maxPrice;

            Address = "search.php?sort=shop_price&order=ASC&keywords="+window.php_var.keywords+"&price_unit="+window.php_var.price_unit+"&page="+window.php_var.page+address;
            location.href = Address;

        });

    }else{
        $(".price").find(".btn-success").click(function(){

            var maxPrice = $(".price").find(".max-price").val();
            var minPrice = $(".price").find(".min-price").val();

            Address = "search.php?sort=shop_price&order=DESC&keywords="+window.php_var.keywords+"&price_unit="+window.php_var.price_unit+"&page="+window.php_var.page+"&min_price="+minPrice+"&max_price="+maxPrice;
            location.href = Address;

        });

    }// END 最高价格

    //价格区间排
    if(window.php_var.order === "DESC"){
        $(".sub-price").click(function(){

            Address = "search.php?sort=shop_price&order=ASC&keywords="+window.php_var.keywords+"&price_unit="+window.php_var.price_unit+"&page="+window.php_var.page+"&min_price="+window.php_var.min_price+"&max_price="+window.php_var.max_price;
            location.href = Address;

        });

    }else{
        $(".sub-price").click(function(){

            Address = "search.php?sort=shop_price&order=DESC&keywords="+window.php_var.keywords+"&price_unit="+window.php_var.price_unit+"&page="+window.php_var.page+"&min_price="+window.php_var.min_price+"&max_price="+window.php_var.max_price;
            location.href = Address;

        });

    }// END 最高价格

    /*
    //按销量升降序渲染
    if(window.php_var.sort === "order_num"){

        if(window.php_var.order === "DESC"){
            $(".order_num").find(".icon-arrow-down").css("display","inline");
            $(".order_num").find(".icon-arrow-up").css("display","none");
        }else{
            $(".order_num").find(".icon-arrow-dowm").css("display","none");
            $(".order_num").find(".icon-arrow-up").css("display","inline");
        }// END 销量

    }else if(window.php_var.sort === "comment"){

        //按评价升降序渲染
        if(window.php_var.order === "DESC"){

            $(".special").find(".icon-arrow-down").css("display","inline");
            $(".special").find(".icon-arrow-up").css("display","none");
        }else{
            $(".special").find(".icon-arrow-down").css("display","none");
            $(".special").find(".icon-arrow-up").css("display","inline");
        }// END 评论

    }else if(window.php_var.sort === "shop_price"){

        //按最低最高价格升降序渲染
        if(window.php_var.order === "DESC"){
            $(".price").find(".icon-arrow-down").css("display","inline");
            $(".price").find(".icon-arrow-up").css("display","none");
        }else{
            $(".price").find(".icon-arrow-down").css("display","none");
            $(".price").find(".icon-arrow-up").css("display","inline");
        }// END 最高价格

    }else{

        $(".icon-arrow-down").css("display","none");
        $(".icon-arrow-up").css("display","none");

    }

    // 渲染单选框
    var price_unit = window.php_var.price_unit;
    if(price_unit === "大包") {

        $(".big-bag").find("input").attr("checked","checked");

    } else if(price_unit === "个") {

        $(".one").find("input").attr("checked","checked");

    }else if(price_unit === "小包") {

        $(".small-bag").find("input").attr("checked","checked");

    }else {

        $(".recommend").find("input").attr("checked","checked");

    }// END 渲染
    */

    // 按计价单位排
    $(".recommend").find("input").click(function(){

        location.href = Address;

    });// END 推荐

    //按计价单位排个
    $(".one").find("input").click(function(){

        location.href = Address+"&price_unit=个"+"&min_price="+window.php_var.min_price+"&max_price="+window.php_var.max_price;

    });// END 个

    //按计价单位排小包
    $(".small-bag").find("input").click(function(){

        location.href = Address+"&price_unit=小包"+"&min_price="+window.php_var.min_price+"&max_price="+window.php_var.max_price;

    });// END 小包

    //按计价单位排大包
    $(".big-bag").find("input").click(function(){

        location.href = Address+"&price_unit=大包"+"&min_price="+window.php_var.min_price+"&max_price="+window.php_var.max_price;

    });// END 大包

});
