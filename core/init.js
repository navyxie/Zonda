// SeaJS 入口文件
// --------------
// author degas.yerya

// 配置
seajs.config({
    //顶级标识
    base : '/Zonda',

    // 配置别称
    alias : {
        'util' : 'module/util.module',
        'underscore' : 'lib/underscore-min.js',
        'bootstrap' : 'lib/bootstrap.min.js',
        'jquery' : 'lib/jquery-1.7.2.min.js',
        'jquery-ui' : 'lib/jquery-ui/jquery-ui-1.8.22.min.js',
        'backbone' : 'lib/backbone-min.js',
        'fancybox' : 'lib/jquery.fancybox-1.3.4.pack.js',
        'pngFix' : 'lib/DD_belatedPNG_0.0.8a-min.js'
    },

    // 预加载
    preload : [
        'lib/modernizr',
        'core/plugin-text',
        window.JSON ? '' : 'lib/json',
        Function.prototype.bind ? '' : 'lib/es5-safe'
    ],

    charset : 'utf-8'
});

// 加载主文件
seajs.use('root');
