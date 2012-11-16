/**
 * app.js
 * 入口
 */
define(function(require, exports, module){
    var Util = require('util');
    var $ = require('jquery');
    var Backbone = require('backbone');

    // DOM Route
    Util.route({
        // 用户
        '#main.user' : function () {
            require('./user/user');
        },
        // header
        '#header' : function () {
            require('./head/header');
        },
 
        // 搜索
        '#nav-search' : function () {
            require('./search/search');
            require('./tips/tips');
        },
 
        // 首页
        '#main.index' : function () {
            require('./index/index');
        },
        // 商品详情
        '#main.detail' : function () {
            require('./detail/detail');
        },

        // 评价
        '#main.rating' : function () {
            require('./rating/rating');
        },
        // 订单
        '#main.order' : function () {
            require('./order/order');
        },
        // 果篮
        '#main.cart' : function () {
            require('./cart/cart');
        },
        // 订单确认
        '#main.confirm-order-form' : function () {
            require('./cart/checkout');
        },
        // 小贴士
        '.article-cat-main' : function () {
            require('./tips/tips');
        },
        // 抽奖
        '.lottery' : function () {
            require('./lottery/lottery');
        }
    });

    // Hash Route
    var Route = Backbone.Router.extend({

        routes : {
            'rating' : 'rating'
        },

        rating : function () {
            require('./rating/rating');
        }

    });

    new Route();

    Backbone.history.start();

});
