/**
 * rating.js
 * 交易成功，评价
 */
define(function(require, exports, module){
    var $ = require('jquery');
    var Util = require('util');
    var _ = require('underscore');

    // 处理评星
    $(".star-list").each(function(){
        var _this = this;
        $(this)
            .attr('num','5')
            .find('.star')
            .each(function(i){
                var parent = $(_this);
                var num = i;

                $(this).click(function(){

                    parent.find('.on').removeClass('on');

                    $(this).addClass('on');

                    $(_this).attr({
                        'num' : 5 - num
                    });

                    parent.find('.star').each(function(j){
                        if ( j > i ) {
                            $(this).addClass('on');
                        }
                    }); // END each

                }); // END click

            }); // END each

    }); // END 评星

    // 发送评论
    $(".rating-main #add-new-rating").click(function(){
        var res = [];

        // 检查是否为每个该评星的地方评星
        $(".star-list").each(function(i){
            if ( Math.abs( $(this).attr('num') ) === 0 ) {
                res.push(i);
            }
        });

        _.each( res, function( value, key){

            Util.dialog({
                title : "小提醒",
                content : "请给 " + $('.star-list').eq(value).parent().find('.title').text() + "评个星吧~"
            });

            Util.dialog.open();
        });

        if ( res.length !== 0 ) {
            return false;
        }

        Util.ajax({
            url : "/comment.php",
            data : {
                id : $(this).attr('goods-id'),
                order_id : $("#order_id").val(),
                goods : $(".star-list").eq(2).attr('num'),
                customer_service : $(".star-list").eq(1).attr('num'),
                logistic : $(".star-list").eq(0).attr('num'),
                comment : $(".rating-content").val(),
                action : "comment"
            },
            success : function (data) {
                if ( data.status === 1 ) {
                    Util.dialog({
                        title : "成功",
                        content : "感谢您的评价~"
                    });
                    Util.dialog.open().close(1300);
                    setTimeout(function(){
                        history.back(1);
                    }, 1300);
                } else {
                    Util.dialog({
                        title : "哦啊，出现错误了",
                        content : data.info
                    });
                    Util.dialog.open();
                }
            } // END success
        });

    }); // END 发送评论

});
