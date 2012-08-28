define( function ( require, exports, module ) {

    exports.init = function () {
        console.log('c');
    };
});


define( function ( require, exports, module ) {
    var c = require('./c-debug');
    c.init();

    exports.init = function () {
        console.log('b');
    };
});


define( function ( require, exports, module ) {
    console.log('root');
    var b = require('./libs/b-debug');
    b.init();
});
