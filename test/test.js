/**
 * test
 */
define(function(require, exports, module){
    var _ = require('underscore');

    // 依赖Sinon
    require('sinon');

    // QUit样式
    // 默认样式
    //require('test/qunit/1.10.0/qunit.css');
    // 新主题
    require('test/themes/ninja.css');

    // 加载PHP渲染的测试样例数据
    // TODO 后端考虑改成Nodejs的
    var caseDate = window.php_var;

    _.each( caseDate, function( cell ) {
        require.async( cell.url );
    });
});
