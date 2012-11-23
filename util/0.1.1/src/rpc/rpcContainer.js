/**
 * rpcContainer.js
 * 依赖注入
 */
define(function(require, exports, module){
    var _ = require('underscore');

    var RpcClient = require('...');
    var HttpClientTransport = require('...');

    var Container = function ( config ) {

        var client = function () {
            return new RpcClient();
        };

        var clientTransport = function () {
            // 默认HTTP协议
            return new HttpClientTransport();
        };

        // 依赖注入
        var combination = _.extend({

            client : client(),
            transport : clientTransport()

        }, config ); // END combination

        this.newClient = function () {
        };

        return this;

    }; // END Rpc

    module.exports = Container;
    
});
