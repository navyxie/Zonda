/**
 * cart.js
 * ---------
 * 果篮操作
 */
define(function(require, exports, module){
    
    var $ = require('jquery-ui');
    var _ = require('underscore');
    var Backbone=  require('backbone');
    var Util = require('util');

    var GoodsView = require('./goods');
    
    // 果篮view
    var CartView = Backbone.View.extend({

        el : $('.cart'),

        events : {

            // 是否结算改变后修改总价
            'change .is-select input' : 'changeTotalPrice',
            
            // 删除购物车中某件商品
            'click table .action a.delete' : 'deleteFromCart',

            // 清空购物车
            'click .cart-wrap a.clear-cart' : 'clearCart',

            // 继续购物
            'click .cart-action .keep-chose' : 'keepChose',
            
            // 结算
            'click .cart-action .close-account' : 'closeAccount'
        },

        // 从购物车中删除某件商品
        deleteFromCart : function ( event ) {
            event.preventDefault();
            event.stopPropagation();
            
            Util.dialog({
                title : '删除',
                content : '<div style="text-align: center">您确定要删除?</div>',
                button : {
                    '确定' : function(){
                        location.href = $(event.target).attr('href');
                    }
                }
            });

            Util.dialog.open();

            return this;
        },// END deleteFromCart

        // 清空购物车
        clearCart : function ( event ) {
            event.preventDefault();
            event.stopPropagation();
             
            // 如果果篮已经为空,则不做任何操作
            if ( $('table .empty-cart')[0] ){
                return false;
            }

            Util.dialog({
                title : '清空果篮',
                content : '<div style="text-align: center">您确定要清空果篮?</div>',
                button : {
                    '确定' : function(){
                        location.href = $(event.target).attr('href');
                    }
                }
            });

            Util.dialog.open();

            return this;
        },// END clearCart

        // 继续购物
        keepChose : function () {
            location.href = '/' ;
        },

        // 结算
        closeAccount : function () {

            var ids = [];

            //取出ids
            $('.is-select').each( function() {
                
                if ( $(this).find('input').attr('checked') === undefined ) { return; }

                if ( $(this).parent().attr('allowed') === 'false' ) {

                    Util.dialog({
                        title : '送货时间',
                        content : "您的果篮中某些送货时间已过期"
                    });

                    Util.dialog.open();
                    Util.dialog.close(4000);

                    return false;
                }

                ids.push( $(this).attr('order-id') );

            });

            // 如果果篮已经为空,则提醒
            if ( $('table .empty-cart')[0] ){

                Util.dialog({
                    title : '清空果篮',
                    content : '<div style="text-align: center">您的果篮没有任何东西</div>'
                });

                Util.dialog.open();
                Util.dialog.close(1300);

            } else {

                if ( ids.length !== 0) {
                    $('#checkout-form input').val( '[' + ids.toString() + ']');

                    $('#checkout-form').submit();
                }
                
            }// END if
        
        },// END closeAccount

        // 是否结算时 总价格变化
        changeTotalPrice : function ( event ) {

            var $target = $(event.target);

            var old = $('#header .fruit-basket .money').text();

            old = old.replace('￥','').replace('元','');

            // 原来总价
            old = parseFloat( old );

            var thisOld = $target.parent().parent().find('.price-total').text();

            thisOld = thisOld.replace('￥','').replace('元','');

            // 本商品原来总价
            thisOld = parseFloat( thisOld );

            // 如果原来要结算，则减去当前物品总价
            if ( $target.hasClass('has-checked') ) {
                $target.removeClass('has-checked');
                old -= thisOld;
            } else {
                $target.addClass('has-checked');
                old += thisOld;
            }

            old = (old).toFixed(2);
            $('#header .fruit-basket .money').text('￥' + old);
            $('.cart-total-price .price-show').text('￥' + old);

            return this;
        },// END changeTotalPrice

        initialize : function() {
            this.render();
        },

        render : function() {
        
            // 判断果篮是否为空，为空时，不创建
            if ( !$('.empty-cart')[0] ) {

                // 为每件商品初始化view
                $('.cart tbody tr').each( function() {
                    var tmp = new GoodsView({ el : $(this)[0] });
                });
            }

            return this;
        }// END render

    });// END CartView

    $(function() {
        var cart = new CartView();
    });
});
