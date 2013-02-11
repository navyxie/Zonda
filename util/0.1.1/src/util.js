/**
 * util.js
 * 框架组件
 */
define(function(require, exports, module){

    var Util = {
        route          : require('./route/route'),
        cookie         : require('./cookie/cookie'), // 待测试
        gif            : require('./gif/gif'),
        dialog         : require('./dialog/dialog'),
        verify         : require('./verify/verify'),
        stateMachine   : require('./stateMachine/stateMachine'),
        rightClickMenu : require('./rightClickMenu/rightClickMenu'),
        ajax           : require('./ajax/ajax'),
        slide          : require('./slide/slide'),
        //tips           : require('./tips/tips'), // 有问题，需要检修
        scaffold       : require('./scaffold/scaffold'),
        upload         : require('./upload/upload'),
        rpc            : require('./rpc/rpc'),
        sync           : require('./localStorageSync/sync'),
        base64         : require('./base64/base64')
    };

    // API
    module.exports = Util;
    
});
