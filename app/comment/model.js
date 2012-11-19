/**
 * model.js
 * 分页数据模型
 */
define(function(require, exports, module){
    var Util = require('util');
    var Backbone = require('backbone');
    var _ = require('underscore');

    var Model = function ( url, good_id ) {

        var _this = this;

        // 扩展事件
        _.extend( this, Backbone.Events );

        // 服务器节点
        this.url = url;
        this.good_id = good_id;

        // 取出数据
        this.get = function( type, page ) {
            /**
             * type值，好评/一般/不好
             * 好评: nice
             * 一般: common
             * 不好: bad
             * 全部: all
             */

            // 缓存当前类型和页码
            _this.type = type || 'all';
            _this.page = page || 1;

            // 取得服务端数据
            Util.ajax({
                url : _this.url,
                data : {
                    'good_id' : _this.good_id,
                    'page' : _this.page,
                    'type' : _this.type
                },
                success : function (data) {
                    data.onPage = 1;
                    data.type = _this.type;

                    // 响应成功，触发响应成功事件
                    _this.trigger('ready', data);
                }
            });

        }; // END get

        return this;

    }; // END Model

    // API
    module.exports = Model;

});
