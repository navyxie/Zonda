/**
 * util.js
 * 框架组件
 */
define(function(require, exports, module){

    var Util = {
        route          : require('./route/route'),
        cookie         : require('./cookie/cookie'),
        gif            : require('./gif/gif'),
        dialog         : require('./dialog/dialog'),
        verify         : require('./verify/verify'),
        stateMachine   : require('./stateMachine/stateMachine'),
        rightClickMenu : require('./rightClickMenu/rightClickMenu'),
        ajax           : require('./ajax/ajax'),
        slide          : require('./slide/slide'),
        tips           : require('./tips/tips'),
        scaffold       : require('./scaffold/scaffold'),
        upload         : require('./upload/upload'),
        ie             : require('./ie/ie')
    };

    // API
    module.exports = Util;
    
});
