/**
 * lottery.js
 * 抽奖
 */
define(function(require, exports, module){
    var $ = require('jquery');
    var Util = require('util');

    // 点击某个圆圈
    $(".lottery-wrap .figure").each(function(i){
        $(this).click(function(){
            var _this = this;

            // 已被禁用，返回
            if ( $(this).hasClass('disabled') ) {
                return false;
            }

            $('.figure').addClass('disabled');

            var bg = [];

            var $figure = $('.figure');

            $figure.each( function() {
                bg.push($(this).css('background-image'));
            });

            var dataId, big;

            var timer = setInterval( function() {

                $figure.each( function (index) {
                    dataId = (parseInt( $(this).attr('data-id'), 10) + 1) % 3;

                    $(this).css({
                        'background' : bg[dataId]
                    });

                    $(this).attr( 'data-id', dataId );
                });

            }, 50);

            $(this)
                .css('opacity','100')
                .removeClass('disabled')
                .find('.des')
                .addClass('on')
                .css({
                    '-webkit-transform': 'rotateY( 360deg )',
                    '-moz-transform': 'rotateY( 360deg )',
                    '-o-transform': 'rotateY( 360deg )',
                    'transform': 'rotateY( 360deg )'
                })
                .text('抽奖中...');

            $.ajax({
                url : "/lottery.php?act=pumpPrize",
                type : "POST",
                data : {
                    'order_sn' : $(_this).attr('order_sn')
                },
                dataType : "JSON",
                success : function (data) {
                    if ( data.status === 1 ) {

                        setTimeout( function() {
                        
                            clearTimeout(timer);

                            $('.lottery').remove();
                            
                            Util.dialog({
                                title : '恭喜~',
                                content : "感谢您的参与，抽奖结果：" + data.data.prize.name + "!"
                            });

                            Util.dialog.open();

                            setTimeout( function() {
                                location.href = '/user.php?act=order_list';
                            }, 3000);
                        }, 5000);
                    
                    } else {

                        Util.dialog({
                            title : "提示信息",
                            content : data.info
                        });

                        Util.dialog.open();

                        setTimeout(function(){
                            history.back();
                        }, 1300);

                    }
                }

            }); // END ajax

        });// END click

    }); // END each

});
