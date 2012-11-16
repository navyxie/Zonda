define(function(require, exports, module){
    // 阻止IE67用户访问
    require('./FCie');

    var Util = require('util');

    //var $ = require('jquery');
    var $ = require('countdown');

    $(function() {

        // 首页slide
        Util.slide.config = {
            slideDOM : $('#main-slide .slide-list')[0],
            speed    : 7000,
            animation : "slip",
            pageDOM : $(".slide-page")[0]
        };

        // slide初始化
        Util.slide.init();

        // 只有一张幻灯片时，无鼠标停止效果
        if ( Util.slide.slideLength !== 1 ) {

            var timer;

            // 鼠标放上去的时候停止
            $(".slide-list").hover(function(){
            
                Util.slide.stop();

            },function(){
                // 重新计时
                clearTimeout( timer );

                timer = setTimeout(function(){
                    Util.slide.pause();
                }, Util.slide.config.speed);

            });// END hover
        }

        // 时区不对，加8小时
        var endDate = new Date( $('#end-time').val() * 1000 + 8*60*60*1000 );
        var startDate = new Date( $('#start-time').val() * 1000  + 8*60*60*1000 );

        var nowDate = new Date();

        // 限时抢购是否开始
        if ( nowDate.valueOf() > startDate.valueOf() ) {
        
            // 限时抢购计时器
            $('#countdown_dashboard').countDown({
                targetDate: {
                    'day'   : endDate.getDate(),
                    'month' : endDate.getMonth() + 1,
                    'year'  : endDate.getFullYear(),
                    'hour'  : endDate.getHours(),
                    'min'   : endDate.getMinutes(),
                    'sec'   : endDate.getSeconds()
                }
            });

        }

    });
        var Time = $(".collocation").attr("onpromote");
        if (Time === "1"){
        
            $(".left-amount").show();
            $("#countdown_dashboard").show();
            $(".recommend-get-ing").show();
        
        } else {

            $(".spe").show();
            $(".recommend-get-wart").show();
        
        }



});
