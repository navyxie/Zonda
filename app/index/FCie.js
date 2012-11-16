/**
 * FCie.module.js
 * --------------
 *  FC ie 6/7
 */
define( function ( require, exports, module ) {

    var $ = require('jquery');
    var _ = require('underscore');

    $(function() {
        if ($.browser.msie) {

            var version = $.browser.version;

            if (version === '6.0' || version === '7.0') {
               $('body').html(_.template(require('./FCie.tpl'), {}));
            }
        }
    
    });
});
