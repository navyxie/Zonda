/**
 * imgView.js
 * ------------
 * 左侧图片View
 */
define(function(require, exports, module){
    var $ = require('jquery-ui');
    var _ = require('underscore');
    var Backbone=  require('backbone');

    // 图片放大plugin
    var jQueryCloudZoom = require('cloud-zoom');

    // 左侧图片展示View
    var ImgView = Backbone.View.extend({

        el : $('.detail-image'),

        // 记录共几张缩略图,1张时忽略
        thumbNum: '',

        events : {
            // 左侧图片展示hover事件
            'hover .detail-thumb li' : 'prepareImageShow'
        },

        initialize : function() {
             
            // 取得缩略图数量
            this.thumbNum = this.$('.detail-thumb li').length;
        },

        // 缩略图鼠标划过事件
        prepareImageShow : function( event ) {

            // 1张时忽略
            if ( this.thumbNum > 1 ) {
            
                var $current = $(event.currentTarget);

                // 选中效果
                $current.parent().find('li').removeClass('on');
                $current.addClass('on');

                this.$('.detail-img-wrap img.goods-show-img').attr(
                    'src', $current.find('.thumb-wrap').attr('target-href')
                );

                this.$('.detail-img-wrap img.goods-show-img').parent().attr(
                    'href', $current.find('.thumb-wrap').attr('target-href')
                );

                // 删除缓存的放大内容, 重新初始化
                $('.mousetrap').remove();

                jQueryCloudZoom('.detail-img-wrap .cloud-zoom').CloudZoom();
            }

        }// END prepareImageShow

    });

    $(function() {

        var imgView = new ImgView();

        // 图片放大
        jQueryCloudZoom('.detail-img-wrap .cloud-zoom').CloudZoom();
    });
});
