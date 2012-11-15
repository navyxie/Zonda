/**
 * page模块
 * test case
 */
define(function(require, exports, module){
    var Q = require('qunit');

    Q.module( "group a" );

    Q.test( "a basic test example", function() {

        Q.ok( 1, "this test is fine" );
        
    });

    Q.test( "a basic test example 2", function() {

        Q.ok( true, "this test is fine" );
    });

    Q.module( "group b" );

    Q.test( "a basic test example 3", function() {
        Q.ok( true, "this test is fine" );
    });

    Q.test( "a basic test example 4", function() {
        Q.ok( true, "this test is fine" );
    });

});
