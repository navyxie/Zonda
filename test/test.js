/**
 * test
 */
define(function(require, exports, module){
    require('qunit');
    require('sinon');

    var _ = require('underscore');
    var $ = require('jquery');

    // QUit样式
    // 默认样式
    require('test/qunit/1.10.0/qunit.css');
    // 新主题
    //require('test/themes/ninja.css');

    // JSON RPC 模块
    require('./case/rpc');

<<<<<<< HEAD
    // localStorageSync for Backbone
    require('./case/localStorageSync');

=======
>>>>>>> f68c72ddfa38a7f7f669170e632fc626e1228a7e
    // 读取当前目录下的case.json
    /**
     * Node监听目录变化不靠谱，暂无解决办法，先手动解决
    $.ajax({
        url : "/Zonda/test/case.json",
        dataType : "JSON",
        success : function ( caseList ) {
            _.each( caseList, function( cell ) {
                require.async( cell.path );
            });

        }
    }); // END ajax
    */

});
