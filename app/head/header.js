/**
 * header.js
 * ---------
 * 头部js
 */
define(function(require, exports, module){

    var $ = require('jquery-ui');

     // 通过按回车搜索
    $(".header-search").find("input").keypress(function(event){
        if ( event.keyCode === 13 ) {
            event.preventDefault();
            $(".header-search").find("a").click();
            return false;
        }
    });// END keypress

    // 提交搜索
    $(".header-search").find("a").click( function() {
    
        var value = $(".header-search").find("input").val();
        if (!value) {
        
            var placeholder = $(".header-search").find("input").attr("placeholder");
            $(".header-search").find("input").val(placeholder);
            $(".header-search").submit();

        } else {
        
            $(".header-search").submit();
        
        }

    });// END 搜索

    // 控制今日鲜果下拉列表显示
    // 如果只有一个分类时，调整显示位置
    if ( $(".today-fruit-list .cell").size() === 1 ) {
        $(".today-fruit-list")
            .css('right','169px')
            .removeClass('caret-today-fruit-more')
            .addClass('caret-today-fruit-one');
    }

    // 今日鲜果
    $(".today-fruit-title").mouseover(function(){
        $(".today-fruit-list").css('display','');
    });

    // 关闭
    $(".today-fruit-list .cancel").click(function(){
        $(".today-fruit-list").fadeOut('fast');
    });
    
});
