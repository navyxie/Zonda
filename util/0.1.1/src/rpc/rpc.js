/**
 * rpc.js
 * JSON rpc
 */
define(function(require, exports, module){
    var _ = require('underscore');

    var RpcClient = require('./client/rpcClient');
    var HttpClientTransport = require('./transport/httpClientTransport');

    // 依赖注入
    var Combination = function ( config ) {

        // 默认传输协议为HTTP
        this.transport = new HttpClientTransport();

        // 合并配置，可能会配置transport
        _.extend( this, config );

        // 根据配置的transport实例化client
        this.client = new RpcClient( this.transport );

        return this;

    }; // END Rpc

    // Rpc 对外接口
    var Rpc = function ( config ) {
        var comb = new Combination ( config );

        this.newClient = function () {
            return comb.client;
        };

        // TODO
        this.newServer = function () {
            return comb.server;
        };

    }; // END Rpc

    // API
    module.exports = Rpc;

}); // END rpc
