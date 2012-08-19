// player.module.js
// --------------
// 封转jplayer

define( function ( require, exports, module ) {
    // 使用模块工具
    var util = require('util');

    // 配置
    exports.config = {
    };

    // 默认配置
    var _config = {
        width : 630,
        height : 353
    };

    // 必须配置项
    var need = {
        wrap : '',
        video : ''
    };

    // 初始化方法
    exports.init = function () {
        util.checkConfig({
            config : exports.config,
            _config : _config,
            need : need
        });
    }; // END init

});
