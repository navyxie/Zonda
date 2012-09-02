/**
 * IE debug 模块
 * author Degas
 */
    define(function ( require, exports, module ) {
        // 加载 ie.css
        require('css/ie/ie.css');

        // 加载jQuery 模块
        var $ = require('jquery');

        // 加载 Underscore 模块
        var _ = require('underscore');

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
            // 背景图片修复
            window.DD_belatedPNG.fix('.pngfix');

            // img 标签修复
            $(".apps img").each( function () {
                window.DD_belatedPNG.fixPng( $(this)[0] );
            });

        } // END png fix

    });// END define
