// SeaJS 入口文件
// --------------
// author degas.yerya

// 配置seajs
seajs.config({
    //顶级标识
    base : '/',

    // 配置别称
    alias : {
        // 开发模式
        'util-debug' : 'src/util.module',
        // 线上模式
        'util' : 'dist/util.module',
        'underscore' : 'lib/underscore-min.js',
        'bootstrap' : 'lib/bootstrap.min.js',
        'jquery' : 'lib/jquery/1.7.2/jquery-1.7.2.min.js',
        'jquery-ui' : 'lib/jquery-ui/1.8.22/jquery-ui-1.8.22.min.js',
        'backbone' : 'lib/backbone-min.js',
        'fancybox' : 'lib/jquery.fancybox-1.3.4.pack.js',
        'pngFix' : 'lib/DD_belatedPNG_0.0.8a-min.js'
    },

    // 预加载
    preload : [
        'lib/modernizr',
        'core/1.2.1/plugin-text',
        window.JSON ? '' : 'lib/json',
        Function.prototype.bind ? '' : 'lib/es5-safe'
    ],

    charset : 'utf-8'
});

// 启动 DOM 路由
// 如果使用'util-debug'模式，则会加载对应的开发版本的模块
// 打包部署以后将这里改成'util'即可
seajs.use('util-debug', function ( Util ) {

    Util.route({
        '#index' : 'index.module',
        '#header' : 'header.module'
    });

});
