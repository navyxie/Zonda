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

    $("#div-easing").slideUp(1000, 'easeInOutCirc', function () {
        $(this).slideDown(1000, 'easeOutBounce');
    });

    // TEST jquery-ui
    $ = require('jquery-ui');

    $('body').append('<input id="jui-date" type="text" />');

    $("#jui-date").datepicker();

});
