/**
 * test
 */
define(function(require, exports, module){
    var _ = require('underscore');
    var $ = require('jquery');

    // 依赖Sinon
    require('sinon');

    // QUit样式
    // 默认样式
    //require('test/qunit/1.10.0/qunit.css');
    // 新主题
    require('test/themes/ninja.css');

    // 通过Node服务器获取case下的测试文件路径，并动态加载
    // Node服务器端:11122
    $.ajax({
        url : location.origin + ':11122',
        dataType : "JSON",
        success : function ( data ) {
            _.each( data, function( cell ) {
                require.async( cell.path );
                // DEBUG
                console.log(cell);
                // END DEBUG
            });
        }
    });

});
