/*
 * viewComment.js
 * 分页视图
 */
define(function(require, exports, module){
    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');

    var View = Backbone.View.extend({

        el : $(".ajax-pagination").attr('content'),

        commentTPL : require('./tpl/comment.tpl'),

        initialize : function ( page, model ) {
            // 绑定渲染函数
            model.on('ready', this.render, this );
        },

        render : function (data) {
            var _this = this;

            // 加亮评价分类
            $(".evaluate-percent")
                .find('.on')
                .removeClass('on')
                .andSelf()
                .find('.' + data.type )
                .addClass('on');

            // 渲染评论
            var res_comment = '';

            _.each( data.data.comments, function ( value, key ) {

                // 若无评论内容，不显示
                if ( /^\s*$/.test( value.comment ) ) {
                    return false;
                }

                res_comment = res_comment + _.template( _this.commentTPL, {
                    name : value.user_name,
                    time : value.commenttime,
                    content : value.comment
                });

            }); // END 渲染评论

            // 插入评论
            $(this.el).html( res_comment );

            // 完毕后，将评价详情的位置放到屏幕合适的位置
            var yEvaluate = $(".title-fruit").position();

            $(".ajax-pagination").find("li").each(function(){
                $(this).click(function(){

                    window.scrollTo(0,yEvaluate.top);

                });

            });// END 完毕后，将评价详情的位置放到屏幕合适的位置

        } // END render

    });

    // API
    module.exports = View;

});
