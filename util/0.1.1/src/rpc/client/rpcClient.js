/**
 * rpcClient.js
 * JSON rpc 客户端
 */
define(function(require, exports, module){
    var Backbone = require('backbone');
    var $ = require('jquery');
    var _ = require('underscore');

    var Client = Backbone.Model.extend({

        initialize : function ( transport ) {
            this.transport = transport;

            // Hack 只期望获得transport协议层的事件
            _.extend( this, transport );
        },

        // 连接服务器
        dial : function ( url, callback ) {
            // url保存到当前Model
            this.url = url;

            // 调用协议层连接
            this.transport.dial( url, callback );
        },

        // 发送请求
        request : function ( method, data, callback) {
            var DATA = {
                method : method,
                url : this.url,
                data : data
            };

        }

    });

    module.exports = Client;

}); // END rpc
