/**
 * app.js
 * 地阿杜
 */
define(function(require, exports, module){
    // TEST jquery
    var $ = require("jquery");

    window.$ = $;

    // TEST jquery.easing
    $ = require("easing");

    window.$ = $;

    $('body').append('<div id="div-easing" style="margin: 20px; background: olive; width: 100px;height: 100px; border: 1px solid #eee;"></div>');

    // TEST jquery-ui
    $ = require('jquery-ui');

    $('body').append('<input id="jui-date" type="text" />');

    $("#jui-date").datepicker();

    // TEST util and bootstrap
    var Util = require("util");
    $("#btn-app-init").click(function(){
        Util.dialog({
            title : "测试Util and Bootstrap",
            content : "fixing bug ^_^",
            button : {
                "测试jQuery.easing效果" : function () {

                    Util.dialog.close();

                    // 测试 jQuery.easing
                    $("#div-easing").slideUp( 1000, 'easeOutExpo', function () {
                        $(this).slideDown(800, 'easeOutBounce');
                    });
                }
            }
        });

        Util.dialog.open();
    });

    // TEST zepto
    var zepto = require('zepto');

    window.zepto = zepto;

    zepto('#div-easing').swipe(function(){
        $(this).fadeOut('fast').delay(800).fadeIn('slow');
    });

    // TEST moment
    var moment = require('moment');
    //console.log(moment().format());

    // TEST fancybox
    $ = require('fancybox');

    $("#img-fancybox").fancybox({
        'easingIn' : 'easeOutBack',
        'easingOut' : 'easeOutBack',
        'transitionIn': 'elastic',
        'transitionOut': 'elastic'
    });

});
