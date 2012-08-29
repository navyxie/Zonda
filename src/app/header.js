// header.js
// ---------
// 头部

define(function ( require, exports, module) {
    // test jquery-ui
    var $ = require('jquery-ui');
    $("#hh").datepicker();

    // test tips
    var Tips = require('../module/tips.module');
    Tips.some({
        "target" : $("#tips-p")
    });

});
