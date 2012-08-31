// route.module.js
// ---------------
// DOM 路由器
// TODO:由于seajs对require的设计是只能require直接量，不能使用变量
// 但是对于路由来说，加载是一个自动的的过程，需要使用变量
// 于是使用 eval('require("' + a + '")') 实现
// 性能会受到很大的影响，先实现，再优化，或者再废弃这种方式

define(function ( require, exports, module) {
    return function ( ruler ) {
        var $ = require('jquery');
        var _ = require('underscore');

        _.each( ruler, function ( action, selector ) {
            if ( $(selector)[0] ) {
                eval('require.async("../app/' + action + '")');
            }
        });

    };
});

/* add by niko just suggest */
/*
Util.route({
	'#index' : function(){
		require.async("../app/index/");	
	},
	'#header' : function(){
		require.async("../app/header/");	
	} 
});

define(function ( require, exports, module) {
    return function ( ruler ) {
        var $ = require('jquery');
        var _ = require('underscore');

        _.each( ruler, function ( action, selector ) {
            if ( $(selector)[0] ) {
            	action(); 
            }
        });
    };
});
*/
