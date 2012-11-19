/**
 * page模块
 * test case
 */
define(function(require, exports, module){
    var Q = require('qunit');
    var sinon = window.sinon;

    Q.module("comment");

    // 待测试模块：评论数据层
    var pageModel = require('app/detail/comment/model');

    // 完全正常的参数
    Q.test('test CommentModel normal data', function () {
        // Fake Data
        var _fakeDATA = {
            info : '成功',
            status : 1,
            data : {
                comments : [
                    {
                        comment: "不错，全五星~",
                        comment_id: "148",
                        commenttime: "2012-11-16",
                        goods: "5",
                        goods_id: "89",
                        logistics: "5",
                        order_id: "301",
                        service: "5",
                        status: "0",
                        user_name: "德加"
                    }
                ],
                page_nums : 1000,
                total_nums : 1
            }
        }; // END fakeDATA

        var fakeDATA = JSON.stringify( _fakeDATA );

        // Fake server
        var server = sinon.sandbox.useFakeServer();

        server.respondWith (
            "GET", "/test",
            [
                200,
                { "Content-Type" : "application/json" },
                fakeDATA
            ]
        ); // END server.respondWith

        server.respondWith (
            "POST", "/test",
            [
                200,
                { "Content-Type" : "application/json" },
                fakeDATA
            ]
        ); // END server.respondWith

        var res;

        // 实例化测试模型
        var testModel = new pageModel( '/test', 100000000 );

        testModel.on('ready', function (data){
            res = data;
        }, this);
        
        testModel.get('nice', 1);

        _fakeDATA.onPage = 1;
        _fakeDATA.type = 'nice';

        server.respond();

        Q.ok(res);

        Q.deepEqual( res, _fakeDATA );

    }); // END test

    // 错误的初始化参数
    Q.test('test CommentModel bad data', function () {
        // Fake Data
        var _fakeDATA = {
            info : '成功',
            status : 1,
            data : {
                comments : [
                    {
                        comment: "不错，全五星~",
                        comment_id: "148",
                        commenttime: "2012-11-16",
                        goods: "5",
                        goods_id: "89",
                        logistics: "5",
                        order_id: "301",
                        service: "5",
                        status: "0",
                        user_name: "德加"
                    }
                ],
                page_nums : 1000,
                total_nums : 1
            }
        }; // END fakeDATA

        var fakeDATA = JSON.stringify( _fakeDATA );

        // Fake server
        var server = sinon.sandbox.useFakeServer();

        server.respondWith (
            "POST", "/test",
            [
                200,
                { "Content-Type" : "application/json" },
                fakeDATA
            ]
        ); // END server.respondWith

        server.respondWith (
            "GET", "/test",
            [
                200,
                { "Content-Type" : "application/json" },
                fakeDATA
            ]
        ); // END server.respondWith

        var res;

        // 实例化测试模型
        // 错误的实例化参数
        var testModel = new pageModel( '/test' );

        testModel.on('ready', function (data){
            res = data;
        }, this);
        
        // 无数据
        testModel.get();

        // 默认数据
        _fakeDATA.type = 'all';
        _fakeDATA.onPage = 1;

        server.respond();

        Q.ok(res);

        Q.deepEqual( res, _fakeDATA );
    });

});
