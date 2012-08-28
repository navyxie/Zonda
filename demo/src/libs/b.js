define( function ( require, exports, module ) {
    var c = require('./c');
    c.init();

    exports.init = function () {
        console.log('b');
    };
});
