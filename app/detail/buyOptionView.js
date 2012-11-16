/**
 * buyOptionView.js
 * ----------------
 * 加入购物车+直接购买操作
 */
define(function(require, exports, module){

    var $ = require('jquery-ui');
    var _ = require('underscore');
    var Backbone=  require('backbone');
    var Util = require('util');

    // 水果Model
    var GoodsModel = Backbone.Model.extend({

        // 数据初始化后续操纵
        initialize : function() {
            // 数组 : [水果规格, 预定方式]
            this.spec = [];

            // 送货时间
            this.delivery_time = '';

            // 商品id
            this.goods_id = 0;

            // 商品数量
            this.number = 1;

            // unkown property
            this.quick = 1;
            this.parent = 0;
        },

        // 数据验证
        validate : function( attrs ) {

            // 未选择送货时间
            if ( !attrs.delivery_time || attrs.delivery_time.length === 0 )  {
                return "No Delivery Time";
            }
        },

        // 加入购物车 或 直接购买
        // 传入回调函数 和 环境变量
        save : function( callback, _this) {

            $.ajax({
                url : this.url,
                dataType : 'JSON',
                data : {
                    'goods' : JSON.stringify({
                         
                        spec : this.get('spec'),

                        delivery_time : this.get('delivery_time'),

                        goods_id : this.get('goods_id'),

                        number : this.get('number'),

                        quick : this.get('quick'),

                        parent : this.get('parent'),

                        date : this.get('date')
                    })
                },
                success : function( data ) {
                    callback( data, _this );
                }
            });
        }
    });

    // 加入购物车 + 直接购买
    var BuyOptionView = Backbone.View.extend({

        el : $('.detail-wrap'),

        events : {
            // 加入果篮 + 直接购买操作
            'click .cart-action' : 'cartAction'
        },

        initialize : function() {
            this.model = new GoodsModel();

            // 监听数据验证错误
            this.model.on('error', this.remind, this);
        },

        // 提醒未选择送货时间
        remind : function( error ) {
            $('.delivery-time-alert').fadeIn();

            _.delay( function() {
                $('.delivery-time-alert').fadeOut();
            }, 3000 );

        },

        // 获取水果数据
        prepareData : function () {
        
            var spec = [];

            // 水果规则必须
            spec.push( this.$('.buy-way li.on-way').attr('spec-id') );

            this.model.set({
                delivery_time : $('.delivery-time select').val(),
                goods_id : parseInt( this.$('#detail-fruit-id').val(), 10),
                number : parseInt( this.$('.show-amount .self-input input').val(), 10)
            });

            // 预定checkebox 选中, 则一定预定(默认选中第一个)
            if ( this.$('#reserve-checkbox').is(':checked') ) {

                // 获得预定方式id
                spec.push( this.$('.reserve-list li.on').attr('spec-id') );

                // 获得预定时间数组
                this.model.set({
                    date :  this.covDate( $('input.date-chose').val(), $('.reserve-list .on').attr('timelong') )
                });
                        
            }

            this.model.set({ spec : spec });

        },

        // 成功加入果篮效果
        addBasket : function() {

            $(".Shelter").css({ "display" : "block" });
            $(".btn-clone").css({ "display" : "none" });

            // 加入果篮特效
            var clone = $(".clone").clone();
            $(".clone").css("display","block");

            $(".clone").animate({

                "top" : "-=245px",
                "left" : "+=653px"

            }, 2000, function() {

                $(this).remove();
                $(".detail-img-wrap").append( clone );
                $(".Shelter").css({ "display" : "none" });
                $(".btn-clone").css({ "display" : "block" });
                $(".basket-A").hide(80);
                $(".basket-B").show(80);

                $(".basket-B").css({ "-webkit-transform" : "rotate(-30deg)" });

                setTimeout( function() {
                    $(".basket-B").css({ "-webkit-transform" : "rotate(+25deg)" });
                }, 100);

                setTimeout( function() {
                    $(".basket-B").css({ "-webkit-transform" : "rotate(-15deg)" });
                }, 200);

                setTimeout( function() {
                    $(".basket-B").css({ "-webkit-transform" : "rotate(+10deg)" });
                }, 300);

                setTimeout( function() {
                    $(".basket-B").css({ "-webkit-transform" : "rotate(-5deg)" });
                }, 350);

                setTimeout( function() {
                    $(".basket-B").css({ "-webkit-transform" : "rotate(0deg)" });
                }, 450);

                setTimeout( function() {
                    $(".basket-B").removeAttr("style");
                }, 500);
            });
        },

        // 加入购物车：服务器返回后续操作
        addCartReact : function ( data, _this ) {
        
            // 正确返回
            if ( data.error === 0 ) {

                // 消息
                $('.response').empty().html( data.content );

                var cartPrice = data.cart_info.total.goods_price.replace('元','');

                // 加入果篮效果
                _this.addBasket();

                // 更新果篮
                $('.fruit-basket .money').text( cartPrice );
            } else {
                $('.response').empty().text(data.message);
            }

        },
        
        // 直接购买：服务器返回后续操作
        directBuyReact : function( data ) {
        
            if ( data.error === 0 ) {
                $('#buynow-form input').val( '[' + data.goods.rec_id + ']');

                $('#buynow-form').submit();
            } else {
                $('.response').empty().text(data.message);
            }
        },

        // 加入果篮 / 直接购买
        cartAction : function( event ) {

            var $actionType = $(event.target);

            // 提取数据
            this.prepareData();

            // 是加入果篮还是直接购买
            if ( $actionType.hasClass('store-in') ) {
                this.model.url =  '/flow.php?step=add_to_cart';
                this.model.set({ buyKind : 'addToCart' });
            } else {
                this.model.url =  '/flow.php?step=add_to_cart&direct_buy=true';
                this.model.set({ buyKind : 'directBuy' });
            }
            
            switch ( this.model.get('buyKind') ) {
                case 'addToCart':
                    this.model.save( this.addCartReact, this );
                    break;

                case 'directBuy':
                    this.model.save( this.directBuyReact, this );
                    break;

                default:
                    break;
            }

            //'goods' : JSON.stringify(DATA)
            
        }, // END cartAction

        // 返回 today 到 timelong 天后的所有天日期[2012-11-1, 2012-11-2,...]
        covDate : function ( today, timelong ) {

            // 结果
            var res = [],
                tmp;

            today = today.replace(/-/g, '/');

            // 算出开始日期的‘时间戳’
            today = (new Date(today)).valueOf();

            for ( var i = 0; i < timelong; i++ ) {
                // 转成普通日期
                tmp = new Date( today + 86400000*i );

                // 格式化
                tmp = tmp.getFullYear() + '-' + (tmp.getMonth() + 1) + '-' + tmp.getDate();

                res.push(tmp);
            }

            //return JSON.stringify(res);
            //return res.toString();
            return res;

        } // END covDate

    });

    $(function() {
        var buyOptionView = new BuyOptionView();
    });

});
