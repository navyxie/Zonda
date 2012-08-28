/**
 * IE debug 模块
 * author Degas
 */
    define("#Zonda/0.0.1-dev/ie-debug", [], function ( require, exports, module ) {
        // 加载 ie.css
        require('./ie.css#');

        // 加载jQuery 模块
        var $ = require('jquery-debug');

        // 加载 Underscore 模块
        var _ = require('underscore-debug');

        // 方法，是否为IE6
        var IE6 = function () {
            if ( $.browser.msie && $.browser.version.slice(0, 3) === "6.0") {
                return true;
            }
        }; // END IE6
        
        // 为IE6+的数组加上indexOf
        if ( ![].indexOf ) {
            Array.prototype.indexOf = function ( src ) {
                for ( var i in this ) {
                    if ( this[i] === src ) {
                        return i;
                    }//end if
                }//end for
                return -1;
            };
        } // END indexOf

        // PNG Fix in IE6
        if ( IE6() ) {
            require.async('pngFix', function ( DD_belatedPNG ) {
                this.DD_belatedPNG = DD_belatedPNG;

                // 背景图片修复
                DD_belatedPNG.fix(
                    '#header .menu,' +
                    '#header .first-menu-cell'
                );

                // img 标签修复
                $(".apps img").each( function () {
                    DD_belatedPNG.fixPng( $(this)[0] );
                });

            });
        } // END png fix

    });// END define


// util.module.js
// --------------
// 模块工具函数

define("#Zonda/0.0.1-dev/util/util.module-debug", ["./ie-debug", "jquery-debug", "underscore-debug", "verify.module-debug", "route.module-debug"], function ( require, exports, module ) {

    // 可根据需要自己配置util提供的功能

    var ie = require('./ie-debug');
    var verify = require('undefined-debug');
    var route = require('undefined-debug');

    // API
    module.exports = {
        ie : ie,
        verify : verify,
        route : route
    };

});
