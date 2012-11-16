/**
 * countDown.js
 * ----------------
 *  倒计时
 */
define(function(require, exports, module){

    var $ = require('jquery-ui');
    var _ = require('underscore');
    var Backbone=  require('backbone');

    // 倒计时
    var jQuery = require('countdown');

    // 倒计时View
    var CountDownView = Backbone.View.extend({

        el : $('#detail_countdown_dashboard'),

        initialize : function() {
            this.countDown() ;
        },

        // 限时抢购
        countDown : function() {

            // 开始时间和结束时间 时区不对，加8小时
            // 限时抢购
            var endDate = new Date( this.$('#detail-end-time').val() * 1000 + 28800000 );

            var startDate = new Date( this.$('#detail-start-time').val() * 1000  + 28800000 );

            var nowDate = new Date();

            // 限时抢购是否开始 ? 是否已经结束,首页显示，详细页面隐藏
            if ( nowDate.valueOf() > startDate.valueOf() && nowDate.valueOf() < endDate.valueOf() ) {
                // 限时抢购计时器
                jQuery('#detail_countdown_dashboard').countDown({
                    targetDate: {
                        'day'   : endDate.getDate(),
                        'month' : endDate.getMonth() + 1,
                        'year'  : endDate.getFullYear(),
                        'hour'  : endDate.getHours(),
                        'min'   : endDate.getMinutes(),
                        'sec'   : endDate.getSeconds()
                    }
                });
                $('#detail_countdown_dashboard').show();
            }
        }
    });

    $(function() {
        var countDownView = new CountDownView();
    });
});

