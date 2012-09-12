// ajax.module.js
// --------------
// 封装jQuery的ajax API

define(function( require, exports, module ) {
    var $ = require('jquery');
    var dialog = require('./dialog.module');

    $.ajaxSetup({
        type : 'POST',
        error : function (error) {
            dialog({
                title : '发生错误了！！',
                content : error.responseText
            });

            dialog.open();
        }
    });

    // API
    module.exports = $.ajax;

});
