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
        route : require('src/util/route.module'),
        verify : require('src/util/verify.module')
    };

});
