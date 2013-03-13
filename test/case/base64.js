// Test Base64
define(function(require, exports, module){
    var Q = require("qunit");
    var sinon = window.sinon

    // Test Module
    Q.module("Test Base64");

    var Base64 = require("util").base64;

    var str_chinese = "热烈庆祝18大顺利召开，哈哈！"
    var str_special_symbols = "\"\'\\?!@#$%^&*()_+,./?><|=-[]{}"
    var _str_chinese
    var _str_special_symbols

    Q.test("API check", function () {
        Q.ok( Base64.encode, "has encode");
        Q.ok( Base64.decode, "has decode");
        Q.strictEqual( typeof Base64.encode, "function", "has encode method");
        Q.strictEqual( typeof Base64.decode, "function", "has decode method");
    });

    Q.test("Encode",function(){
        _str_chinese = Base64.encode(str_chinese)
        _str_special_symbols = Base64.encode(str_special_symbols)

        Q.ok( Base64.encode(str_chinese), "test encoding chinese char");
        Q.ok( Base64.encode(str_special_symbols), "test encoding special symbols");
    });

    Q.test("Decode",function(){
        
        Q.ok( Base64.decode(_str_chinese), "test encoding chinese char");
        Q.ok( Base64.decode(_str_special_symbols), "test encoding special symbols");

        Q.strictEqual( Base64.decode(_str_chinese), str_chinese, '');
        Q.strictEqual( Base64.decode(_str_special_symbols), str_special_symbols, '');
    });

});
