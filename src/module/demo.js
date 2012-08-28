// demo.js
// --------------
// demo 测试

define( function ( require, exports, module ) {
    var player = require('module/player.module');

    player.config = {
        //video : '',
        wrap : 'a',
        width : '660'
    };

    player.init();

});
