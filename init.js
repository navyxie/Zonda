// SeaJS 入口文件
// --------------
// author degas.yerya

// 配置seajs
seajs.config({
    //顶级标识
    base : '../',

    // 配置别称
    alias : {
        // 开发模式
        'util' : 'src/util/util.module',
        // 线上模式
        //'util' : 'dist/util/util.module',
        'underscore' : 'lib/underscore/1.3.3/underscore',
        'bootstrap' : 'lib/bootstrap/2.1.0/bootstrap',
        'jquery' : 'lib/jquery/1.8.0/jquery',
        'jquery-ui' : 'lib/jquery-ui/1.8.22/jquery-ui',
        'easing' : 'lib/easing/1.3.0/jquery.easing',
        'backbone' : 'lib/backbone/0.9.2/backbone'
    },

    // 预加载
    preload : [
        'lib/modernizr/2.6.1/modernizr',
        'core/1.2.1/plugin-text',
        // 开发模式
        'core/1.2.1/plugin-debug',
        window.JSON ? '' : 'lib/json',
        Function.prototype.bind ? '' : 'lib/es5-safe'
    ],

    charset : 'utf-8'
});

// 启动 DOM 路由
// 如果使用'util-debug'模式，则会加载对应的开发版本的模块
// 打包部署以后将这里改成'util'即可
seajs.use('util', function ( Util ) {

    Util.route({
        '#demo' : 'demo'
    });

});
