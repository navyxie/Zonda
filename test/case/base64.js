// Test Base64
define(function(require, exports, module){
    var Q = require("qunit");
    var sinon = window.sinon

    // Test Module
    Q.module("Test Base64");

    var Base64 = require('util').base64;

    Q.test('API check', function () {
        Q.ok( Base64.encode, 'has encode');
        Q.ok( Base64.decode, 'has decode');
        Q.strictEqual( typeof Base64.encode, 'function', 'has encode method');
        Q.strictEqual( typeof Base64.decode, 'function', 'has decode method');
    });

});
