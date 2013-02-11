/**
 * test
 */
define(function(require, exports, module){
    require("qunit");
    require("sinon");
    require("test/qunit/1.10.0/qunit.css");
    //require("test/themes/ninja.css");

    // TEST Module
    // -----------
    // require test case

    // JSON RPC
    require("./case/rpc");

    // localStorageSync for Backbone
    require("./case/localStorageSync");

    // base64
    require("./case/base64");

});
