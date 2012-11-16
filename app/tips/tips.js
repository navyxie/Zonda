/**
 * 小贴士
 */
define(function( require, exports, module ){
    var $ = require('jquery');
    var Util = require('util');
    var _ = require('underscore');

    // 没页码栏时左边框消失
    if ( !$(".pagination").find("span").hasClass("page_now") ) {
    
        $(".pagination").css("border","0");
    
    } else {
    
        $(".pagination").css("border-left","1px solid #e1e1e1");
    
    }// END 没页码栏时左边框消失

});// END define
