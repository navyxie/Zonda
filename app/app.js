// app.js
// 测试样例
define(function(require, exports, module){
    var $ = require('jquery');
    var Util = require('util');

    window.Util = Util;

    $("#btn-app-init").click(function () {

        Util.dialog({
            title : 'Util.dialog',
            content : 'Hello world!'
        });

        Util.dialog.open();
    });
});
