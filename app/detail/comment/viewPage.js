/**
 * viewPage.js
 * 生成页码
 */
define(function(require, exports, module){
    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');

    var Page = Backbone.View.extend({

        el : $(".ajax-pagination"),

        TPL : require('./tpl/page.tpl'),

        onPage : 1, // 当前页，默认页

        initialize : function ( page, model ) {
            this.onPage = page;

            // 绑定渲染函数
            model.on('ready', this.render, this );
        },

        render : function (data) {
            var _this = this;

            // 若有评论，显示翻页
            if ( data.data.total_nums !== 0 && data.data.page_nums !== 1 ) {
                $('.ajax-pagination').fadeIn('fast');
            }

            // 更新当前页码
            this.onPage = Math.abs( data.onPage );

            // 分页页数
            this.pageNum = Math.abs( data.data.page_nums );

            // 组织分页数据
            var templateData = {
                pageData : [],
                type : data.type,
                onPage : this.onPage,
                pageNum : this.pageNum
            };

            // 循环分页页码
            for ( var i = 1; i<= this.pageNum; i++ ) {
                templateData.pageData.push( i );
            }

            // 插入分页
            this.$el.find('ul').html(
                // 编译分页模板
                _.template( this.TPL, templateData )
            );

            // 加亮当前页码
            this.$el.find('ul .active').removeClass('active');

            this.$el.find('ul li a').each(function (index) {
                if ( Math.abs( $(this).text() ) === _this.onPage ) {

                    $(this).parent().addClass('active');

                }
            });

            // 第一页且不止一页
            if ( this.onPage === 1 && this.onPage !== this.pageNum ) {
                this.$el.find('.prev').addClass('active');
            
            // 第一页，且仅有一页
            } else if ( this.onPage === 1 && this.onPage === this.pageNum ) {
                this.$el.find('.prev').addClass('active');
                this.$el.find('.next').addClass('active');
            // 最后一页
            } else if ( this.onPage === this.pageNum ) {
                this.$el.find('.next').addClass('active');
            // 非第一页，也非最后一页
            } else {
                this.$el.find('.prev,.next').removeClass('active');
            }
        }

    });

    // API
    module.exports = Page;

});
