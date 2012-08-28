// util.module.js
// --------------
// 模块工具函数

define(function ( require, exports, module ) {

    // 可根据需要自己配置util提供的功能

    var ie = require('./ie');
    var verify = require('verify.module');
    var route = require('route.module');

    // API
    module.exports = {
        ie : ie,
        verify : verify,
        route : route
    };

});
