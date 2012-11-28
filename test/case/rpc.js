/**
 * rpc test
 */
define(function(require, exports, module){
    var Q = require('qunit');
    var sinon = window.sinon;

    Q.module("Rpc模块API测试");

    var Rpc = require('#util/0.1.1/src/rpc/rpc');
    var HttpClientTransport = require('#util/0.1.1/src/rpc/transport/httpClientTransport');

    // 完全正常的参数
    Q.test('实例API基本校验', function () {
        var rpcObj = new Rpc();

        Q.ok( rpcObj, 'rpc对象是存在');
        Q.ok( rpcObj.newClient, '含有newClient方法');
        Q.ok( rpcObj.newServer, '含有newServer方法');
    });

    Q.test('实例newClient的API', function () {
        var rpcObj = new Rpc();

        var rpcClient = rpcObj.newClient();

        Q.ok( rpcClient, 'rpcClient对象' );
        Q.ok( rpcClient.dial, 'dial方法' );
        Q.ok( rpcClient.request, 'request方法' );
        Q.ok( rpcClient.url, 'url成员' );
        Q.ok( rpcClient.transport, 'transport成员' );
    });

    Q.test('dial方法/成功连接', function () {
        var rpcObj = new Rpc();
        var rpcClient = rpcObj.newClient();

        var Obj_fakeDATA = {
            info : '失败',
            status : 0,
            data : {}
        }; // END fakeDATA

        var JSON_fakeDATA = JSON.stringify( Obj_fakeDATA );

        // Fake server
        var server = sinon.sandbox.useFakeServer();

        server.respondWith (
            "POST", "/mock",
            [
                200,
                { "Content-Type" : "application/json" },
                JSON_fakeDATA
            ]
        ); // END server.respondWith

        // dial回调返回值
        var dialRES;

        // 链接到Mock服务器
        rpcClient.dial('/mock', function (res) {
            dialRES = res;
        });

        server.respond();

        Q.strictEqual( rpcClient.url, "/mock", '将传入的url缓存到ClientModel中');

        Q.strictEqual( rpcClient.transport.constructor, (new HttpClientTransport()).constructor, '检查ClientModel的协议层对象');

        Q.deepEqual( dialRES, Obj_fakeDATA, '测试dial方法返回');

    });

    Q.test('dial方法/连接失败/返回值不为JSON的Rpc服务器', function () {
        var rpcObj = new Rpc();
        var rpcClient = rpcObj.newClient();

        var Obj_fakeDATA = '我不是一个JSON字符串'; // END fakeDATA

        var JSON_fakeDATA = Obj_fakeDATA;

        // Fake server
        var server = sinon.sandbox.useFakeServer();

        server.respondWith (
            "POST", "/mock",
            [
                200,
                { "Content-Type" : "application/json" },
                JSON_fakeDATA
            ]
        ); // END server.respondWith

        // dial回调返回值
        var dialRES;
        var dialErr;

        // 链接到Mock服务器
        rpcClient.dial('/mock', function (res) {
            dialRES = res;
        });

        rpcClient.on('error:dial', function (err) {
            dialErr = err;
        }, this);

        server.respond();

        Q.strictEqual( rpcClient.url, "/mock", '将传入的url缓存到ClientModel中');

        Q.strictEqual( rpcClient.transport.constructor, (new HttpClientTransport()).constructor, '检查ClientModel的协议层对象');

        Q.ok( dialErr, 'dial失败，获得jQuery Ajax err对象');

        Q.strictEqual( dialErr.status, 200, '响应状态正确');

        Q.equal( dialErr.responseText, '我不是一个JSON字符串', '非JSON返回值');

    });

    Q.test('request方法，成功发送，获得正确响应', function () {
        var rpcObj = new Rpc();
        var rpcClient = rpcObj.newClient();

        var Obj_fakeDATA = {
            info : 'success',
            status : 1,
            data : {}
        }; // END fakeDATA

        var JSON_fakeDATA = JSON.stringify( Obj_fakeDATA );

        // Fake server
        var server = sinon.sandbox.useFakeServer();

        server.respondWith (
            "POST", "/mock",
            [
                200,
                { "Content-Type" : "application/json" },
                JSON_fakeDATA
            ]
        ); // END server.respondWith

        // 链接到Mock服务器
        rpcClient.dial('/mock');

        // request回调返回值
        var RES;

        // rpcClient request 回调
        var rpcRequestCallback = function (res) {
            RES = res;
        }; // END rpcRequestCallback

        rpcClient.on('request:ready',function(){
            // DEBUG
            console.log(1);
            // END DEBUG
        });

        rpcClient.request('add',{
            'a' : 1,
            'b' : 2
        }, rpcRequestCallback );

        server.respond();

        Q.strictEqual( rpcClient.url, "/mock", '将传入的url缓存到ClientModel中');

        Q.strictEqual( rpcClient.transport.constructor, (new HttpClientTransport()).constructor, '检查ClientModel的协议层对象');

        Q.ok( RES, 'request 返回存在');

        Q.strictEqual( RES.status, 1, '获得正确的响应');

    });

    Q.test('request，发送失败，没有发送参数', function () {
        Q.ok(1);
    });

    Q.test('request，发送成功，不可用的响应', function () {
        Q.ok(1);
    });

    Q.test('Rpc HttpClientTransport协议层', function () {
        Q.ok(1);
    });

});
