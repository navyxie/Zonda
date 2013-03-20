// Test Base64
define(function(require){
    // Test Module
    module("Test Base64");

    var Base64 = require("util/0.1.2/src/util").base64;

    var str_chinese = "热烈庆祝18大顺利召开，哈哈！"
    var str_special_symbols = "\"\'\\?!@#$%^&*()_+,./?><|=-[]{}"
    var _str_chinese
    var _str_special_symbols

    test("API check", function () {
        ok( Base64.encode, "has encode");
        ok( Base64.decode, "has decode");
        strictEqual( typeof Base64.encode, "function", "has encode method");
        strictEqual( typeof Base64.decode, "function", "has decode method");
    });

    test("Encode",function(){
        _str_chinese = Base64.encode(str_chinese)
        _str_special_symbols = Base64.encode(str_special_symbols)

        ok( Base64.encode(str_chinese), "test encoding chinese char");
        ok( Base64.encode(str_special_symbols), "test encoding special symbols");
    });

    test("Decode",function(){
        
        ok( Base64.decode(_str_chinese), "test encoding chinese char");
        ok( Base64.decode(_str_special_symbols), "test encoding special symbols");

        strictEqual( Base64.decode(_str_chinese), str_chinese, '');
        strictEqual( Base64.decode(_str_special_symbols), str_special_symbols, '');
    });

});
