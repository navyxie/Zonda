/**
 * comment.js
 * 商品评价
 */
define(function(require, exports, module){
    /**
     * type值，好评/一般/不好
     * 好评: nice
     * 一般: common
     * 不好: bad
     * 全部: all
     */

    var Util = require('util');
    var Backbone = require('backbone');
    var $ = require('jquery');

    var el = $(".ajax-pagination");

    // Model
    // -----
    // 分页模型
    var Model = require('./model');

    // 构造分页模型
    var pageModle = new Model( el.attr('page-url'), el.attr('data-value') );

    // Controller
    // ----------
    // function main
    function main ( type, page ) {

        // 默认到第一页
        if ( page === void 0 ) {
            page = 1;
        }

        // 默认全部评价
        if ( type === void 0 ) {
            type = 'all';
        }

        // 初始化
        init( type, page );

        // 从模型中获取该页数据
        pageModle.get( type, page );

    } // END main

    // 是否已经初始化过
    var INIT = 0;

    // function init
    function init ( type, page ) {
        if ( INIT === 1 ) {
            return false;
        }

        INIT = 1;

        // VIEW
        // ----
        // 分页视图
        var ViewPage = require('./viewPage');

        // 初始化分页
        new ViewPage( page, pageModle );

        // 评论视图
        var ViewComment = require('./viewComment');

        // 初始化评论视图
        new ViewComment( page, pageModle );


    } // END init

    // Hash Route
    var pageRoute = Backbone.Router.extend({

        routes : {
            '' : 'main',
            'comment=:type/page=:page' : 'main',
            'comment=:type' : 'main'
        },

        // Main Controller
        main : main

    }); // END pageRoute

    // 初始化
    new pageRoute();
});
