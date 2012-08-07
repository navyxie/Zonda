/**
 * root.js
 * 以视图的唯一DOM加载所需脚本
 */
define( function ( require, exports, module ) {
    var $ = require('jquery');

    // 使用jqueryUI
    // ------------
    // var jui = require('jquery-ui');
    // jui('#input').datepicker();
    
    // 使用脚手架
    var scaffold = require('./helper/scaffold.helper');

    // 栅格系统示意图，16格960系统
    scaffold.makeGrid( 40, 16, 20 );

    // 方便使用console调试
    window.sca = scaffold;

    // 加载 IE 模块
    if ( $.browser.msie ) {
        require.async('./module/ie/ie');
    }

    // index.html
    if ( $("#main").attr('view') === 'index' ) {
        require.async('./module/index');
    }

    // footer.html
    if ( $("#footer")[0] ) {
        require.async('./module/footer');
    }

<<<<<<< HEAD
    var jqueryUI = require('jquery-ui');
    // jqueryUI.init( $ );
    $("#time").datepicker();
=======
    // cookie test
    var cookie = require("module/cookie.module");
    cookie.set("name","niko");
    //console.log( cookie.get("name") );
>>>>>>> 01fc9dde8ca3edeec547eae33fc16ff86974a212

}); // END root.js
