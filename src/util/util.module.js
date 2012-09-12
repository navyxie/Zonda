// util.module.js
// --------------
// 模块工具函数

define(function ( require, exports, module ) {

    var $ = require('jquery');

    // IE debug
    if ( $.browser.msie ) {
        require.async('./ie');
    }

    // API
    module.exports = {
        verify         : require('./verify.module'),
        route          : require('./route.module'),
        dialog         : require('./dialog.module'),
        StateMachine   : require('./state.machine.module'),
        gif            : require('./gif.module'),
        rightClickMenu : require('./right.click.menu.module'),
        ajax           : require('./ajax.module')
    };

});
