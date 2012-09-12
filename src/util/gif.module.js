// gif.module.js
// -------------
// gif 加载示意
// 不可复用

define(function( require, exports, module) {
    var $ = require('jquery');

    var main = function () {
        $(document.body).append(
            '<div id="ajax-loader">Loading ...</div>'
        );

    };

    main.open = function () {
        $("#ajax-loader").fadeIn('fast');
        return this;
    };

    main.close = function () {
        $("#ajax-loader").fadeOut('slow');
        return this;
    };

    main();

    // API
    module.exports = main;

});
