/**
 * deliveryTime.js
 * ---------------
 *  送货时间判断
 */
define(function(require, exports, module){
    var $ = require('jquery-ui');
    var _ = require('underscore');
    var Backbone=  require('backbone');

    var Util = require('util');

    // 送货时间View
    var DeliveryTimeView = Backbone.View.extend({

        el : $('.reserve'),

        events : {
            // 送货时间判断
            'change .delivery-time' : 'judgeDelTime'
        },

        // 今天所有送货时间均过期
        allPassed : function() {
        
            // 先保存，然后删除，就不能放进果篮
            var timeId = $('.delivery-time select').val('');
            $('.delivery-time select').val('');

            Util.dialog({
                title : '预定' ,
                content : '今天所有时间段已过期，可以给您换成预定明天吗?',
                button : {

                    '确定' : function() {

                        $('.delivery-time select').val( timeId );
                        // 选成预定
                        $('#reserve-checkbox').click();
                        Util.dialog.close();
                    },

                    // 删除送货时间
                    '取消' : function() {
                        Util.dialog.close();
                    }
                }
            });

            Util.dialog.open();

            // 删除默认取消
            $('.modal-footer .btn').eq(0).remove();

        },

        // 重新选择送货时间
        choseOtherDelTime : function( $target, now ) {

            // 是否超过当前送货时间段
            if ( now > $target.attr('data-effect')*1000  ) {

                $('.delivery-time-alert').text('送货时间已过期').show();

                _.delay( function(){
                    $('.delivery-time-alert').hide();
                }, 3000);

                $target = $target.next();

                // 找到离当前时间最近的下一次送货时间
                while ( $target.attr('data-effect') * 1000 < now ) {
                    $target = $target.next();
                }

                // 选中下一次可选时间
                $('.delivery-time select').val( $target.val() );
            }
        
        },

        // 送货时间选择
        judgeDelTime : function ( event ) {

            var $target;
            
            // 选中送货时间的id
            var id = $(event.target).val();

            // 今天的最后送货时间
            var lastTime;

            var now = (new Date()).valueOf();

            // 如果没有选择预定,做时间判断
            if ( !$('#reserve-checkbox').attr('checked') && id ) {
            
                var $del = $('.delivery-time option');

                // 最后一个送货时间
                lastTime = ($del.eq( $del.length-1 )).attr('data-effect');

                // 找到选中时间对应的option DOM
                $del.each( function( index ) {
                    if ( parseInt(id, 10) === parseInt($(this).val(), 10) ) {
                        $target = $(this);
                    }
                });

                // 首先判断是否超过了今天的最后送货时间
                if ( now > lastTime*1000 ) {
                    this.allPassed();
                } else {
                    this.choseOtherDelTime( $target, now );
                }// END if
                     
            }// END if

        } // END END judgeDelTime

    });

    $(function() {
        var deliveryTime = new DeliveryTimeView();
    });
});
