/**
 * 用户模块
 * author 3P
 */
define(function(require, exports, module){
    var Util = require('util');

    Util.route({
        // 注册
        '#user-register-main' : function () {
            require('./register');
        },
        // 个人信息
        '#user-profile-main' : function () {
            require('./profile');
        },
        // 地址
        '.location-info' : function () {
            var address = require('./address');
            address('#user-profile-main');
        },
        // 登录
        '#user-login-main' : function () {
            require('./login');
        },
        // 账号设置
        '#user-account-setting' : function () {
            require('./account');
        },
        // 通知
        '#user-notice-main' : function () {
            require('./notice');
        },
        // 我的可否有
        '#message-main' : function () {
            require('./message');
        },
        // 重置密码
        '#user-reset-password-step-3' : function () {
            require('./resetpassword');
        }

    });

});
