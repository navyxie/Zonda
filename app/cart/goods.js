/**
 * goods.js
 * ---------------
 * 果篮中商品操作
 */
define(function(require, exports, module){

    var $ = require('jquery-ui');
    var _ = require('underscore');
    var Backbone=  require('backbone');
    var Util = require('util');

    var NumModel = Backbone.Model.extend();

    var GoodsView = Backbone.View.extend({

        events : {
            // 增加和减少数量
            'click .show-amount .action-kind' : 'changeAmount',

            // 手动输入数据
            'focusout .show-amount .self-input input' : 'changeAmountBySelf',

            // 改变预定放方式
            'click .reserve-area .change-date' : 'reserveSet',
            
            // 送货时间
            'change .delivery-time select' : 'beforeChangePrice'
        },

        // 改变送货时间时先判断送货时间是否正确
        beforeChangePrice : function( event ) {

            var $target,

                _this = this,

                // 选中送货日期的id
                id = $(event.target).val(),

                // 今天的最迟送货时间
                lastTime,

                now = (new Date()).valueOf();//+ 12*60*60*1000;

            // 如果没有选择预定,做时间判断
            if ( !_this.hasReserve ) {
            
                var $del = _this.$el.find('.delivery-time option');

                // 最后一个送货时间段
                lastTime = ($del.eq( $del.length-1 )).attr('data-id');

                $del.each( function( index ) {
                    if ( parseInt(id, 10) === parseInt($(this).val(), 10) ) {
                        $target = $(this);
                    }
                });

                // 首先判断是否超过了今天的最后送货时间
                if ( now > lastTime * 1000 ) {

                    // 将此水果设为不可结算
                    _this.$el.attr('allowed', false);

                    Util.dialog({
                        title : '预定' ,
                        content : '非常抱歉，果篮中有些发货时间段已过期, 您可以选择预定',
                        button : {

                            '预定' : function() {
                                Util.dialog.close();
                                _this.$el.find('.reserve-area .change-date').click();
                                $('.modal #cart-reserve-checkbox').click();
                            }
                        }
                    });

                    Util.dialog.open();

                } else {

                    // 是否超过当前送货时间段
                    if ( now > $target.attr('data-id')*1000  ) {
                        Util.dialog({
                            title : '当前时间段发送已完成',
                            content : "当前时间段发送已完成，请重新选择时间段  (或预定)"
                        });

                        Util.dialog.open();
                        Util.dialog.close(3000);

                        $target = $target.next();

                        // 找到离当前时间最近的下一次送货时间
                        while ( $target.attr('data-id') * 1000 < now ) {
                            $target = $target.next();
                        }

                        _this.$el.find('.delivery-time select').val($target.val());
                    }

                    // 只有送货时间正确后才能去结算
                    _this.$el.attr('allowed', true);
                }// END if
                     
            }// END if

            this.changePrice();

        },

        initialize : function() {

            // 编辑预定时间模板
            this.reserveTpl = require('./tpl/reserve.tpl');

            // 商品数量
            this.amount = new NumModel({
                num : parseInt( this.$('.show-amount .self-input input').val(), 10)
            });

            // 监听数量变化
            this.amount.on('change', this.changePrice, this);

            // 商品号
            this.goodsId = this.$el.attr('goods-id');

            // 预定方式数据
            this.reserveData = JSON.parse( this.$el.attr('reserve-data') );

            // 预定方式 361,345
            this.goodsAttrId = this.$el.attr('goods-attr-id');

            var tmp = this.goodsAttrId.split(',');

            this.kind = tmp;

            // 如果规则多余一个，则一定有预定
            if ( this.kind.length > 1) {
                this.hasReserve = true;
            } else {
                this.hasReserve = false;
            }

            // 标识弹出窗口，否则每个view都会监听
            this.modalWinId = this.$el.attr('rec-id');

            this.setDefault();

            // 绑定修改规格事件
            this.bindreserveSet();

            // 设置datepicker样式
            this.initDatepicker();

            // 初始化即查看送货时间是否正确
            var onId = this.$el.find('.delivery-time select').val();
            var $tmp;

            if ( onId ) {
                this.$el.find('.delivery-time option').each( function() {
                    if ( $(this).val() === onId ) {
                        $tmp = $(this);
                    }
                });
            }

            var tmpEvent = {};

            // 模拟select 改变，检查时间是否正确
            _.extend(tmpEvent,  Backbone.Events);

            tmpEvent.target = $tmp;

            this.beforeChangePrice(tmpEvent );

        },// END initialize

        // 初始化jquery-ui datepicker
        initDatepicker : function() {

            // datepiker ui 中文设置
            $.datepicker.regional['zh-CN'] = {
                monthNames: ['一月','二月','三月','四月','五月','六月',
                '七月','八月','九月','十月','十一月','十二月'],
                monthNamesShort: ['一','二','三','四','五','六',
                '七','八','九','十','十一','十二'],
                dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
                dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],
                dayNamesMin: ['日','一','二','三','四','五','六'],
                dateFormat: 'yyyy-mm-dd', firstDay: 1,
                prevText: '&#x3c;上月', prevStatus: '显示上月',
                prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: '显示上一年',
                nextText: '下月&#x3e;', nextStatus: '显示下月',
                nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: '显示下一年',
                currentText: '今天', currentStatus: '显示本月',
                todayText: '今天', todayStatus: '显示本月',
                clearText: '清除', clearStatus: '清除已选日期',
                closeText: '关闭', closeStatus: '不改变当前选择',
                yearStatus: '选择年份', monthStatus: '选择月份',
                weekText: '周', weekStatus: '年内周次',
                dayStatus: '选择 m月 d日, DD', defaultStatus: '请选择日期',
                isRTL: false
            };

            $.datepicker.setDefaults( $.datepicker.regional[ "zh-CN" ] );

            return this;
        },// END initDatepicker

        // 初始化预定设置
        setDefault : function() {

            var _this = this;

            // 规则数组
            var rulerArray = [];

            // 合并为rulerArray
            _.each( this.reserveData, function (value,key){
                rulerArray = rulerArray.concat( value.values );
            });

            // 若为已预定的商品
            if ( this.$el.attr('date') !== '[]' && this.$el.attr('date') !== void 0 ) {

                // 获取预定的日期数组
                var dateArray = JSON.parse(this.$el.attr('date').split(','));

                // 获取原来的预定时间长度
                this.timelong = dateArray.length;

                // 开始送货的时间
                this.firstDay = dateArray[0];

                // 开始送货的星期
                this.firstWeek = this.getCurentWeek(this.firstDay);

                // 当前预定规则
                _this.curRuler = '';

                // 初始化日历规则
                // 例：当前的数据只有一个[222,223]数组，对应一个规则，其中
                // 数组的第二项代表预定操作的id，必须从给定的规则数组中
                // 查询出对应的规则,如223可能对应 range=7 timelong=1
                // 而2xx可能对应 range=8 timelong=5
                // 取得range,用与日历的范围选择初始化
                // _this.curRuler.range既是需要的数据
                _.each( rulerArray, function (value,key) {
                    if ( Math.abs(value.id) === Math.abs(_this.kind[1])  ) {
                        _this.curRuler = value;
                    }
                });

            } else {

                // 如果原来没有预定，则把初始化的日期设置为今天
                var tmp = _this.getCurentDate();

                _this.firstDay = tmp[0];
                _this.firstWeek = tmp[1];
            }// END if

        },// END setDefault

        // 获得 星期
        getCurentWeek : function( date ) {

            var current = new Date(date);

            return '星期' + '天一二三四五六'.charAt(current.getDay());

        },

        // 获得第二天日期 [ 2012-11-1, 星期四]
        getCurentDate : function() {

            var tmp = [];

            var current = new Date();

            // 从第二天开始
            current = new Date(current.valueOf() + 86400000);

            tmp.push( current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate() );

            tmp.push( '星期' + '天一二三四五六'.charAt(current.getDay()) );

            return tmp;
        },

        getToday : function() {

            var tmp = [];

            var current = new Date();

            tmp.push( current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate() );

            tmp.push( '星期' + '天一二三四五六'.charAt(current.getDay()) );

            return tmp;
        },

        // 手动输入数量
        changeAmountBySelf : function(event) {

            var num = parseInt( $(event.target).val(), 10);

            if( !_.isNaN(num) && num > 0 && num < 10000 ) {
                var res = this.amount.set({ num : num });
                
                this.$('.show-amount .self-input input').val(num);
            } else {
                this.$('.show-amount .self-input input').val(this.amount.get('num'));
            }
        },

        // 数量变化
        changeAmount : function( event ) {

            var num = this.amount.get('num');

            if ( $(event.target).hasClass('minus') ){
                num =  num > 1 ? num-1 : 1;
            } else if ( $(event.target).hasClass('add') ) {
                num++;
            }

            if ( num < 10000 ) {
                this.$('.show-amount .self-input input').val(num);

                this.amount.set({ num : num });
            }
        },

        // 改变预定
        reserveSet : function() {

            var _this = this;

            this.dialog = Util.dialog({
                title : '预定设置',
                content : _.template( _this.reserveTpl, {
                    'data'      : _this.reserveData,
                    'on'        : _this.kind,
                    'modalWinId': _this.modalWinId,
                    'firstDay'  : _this.firstDay,
                    'firstWeek' : _this.firstWeek,
                    'hasReserve': _this.hasReserve
                }),
                button : {
                    '确定' : function( ) {

                        // 外容器
                        var $dialog = $("#util-dialog");

                        // 被选中的选项
                        var optArrary = [];

                        var attr = [],
                            timelong,
                            date;

                        // 取得水果规格id
                        attr.push( $dialog.find('.cart-kind-list li.on').attr('goods-attr-id'));

                        // 是否预定
                        if ( $dialog.find('#cart-reserve-checkbox').attr('checked') ) {

                            var $onReserve = $dialog.find('.cart-reserve-list li.on');

                            attr.push( $onReserve.attr('goods-attr-id') );

                            timelong = parseInt($onReserve.attr('timelong'), 10);

                            date = _this.covDate( $('.modal-body .date-chose').val(), timelong );

                        }

                        var DATA = {
                            rec_id : _this.$el.attr('rec-id'),
                            goods_number : _this.amount.get('num'),
                            goods_id : _this.goodsId,
                            attr : attr,
                            delivery_time : _this.$el.find('.delivery-time select').val()
                        };

                        if (date) {
                            DATA.date = date;
                        }

                        $.ajax({
                            url : 'flow.php?step=update',
                            type : 'POST',
                            dataType : 'JSON',
                            data : DATA,
                            success : function( data ) {
                                if (data.status === 1) {
                                    location.reload();
                                }

                                // 必须有错误处理，可能库存不够
                            }
                        });

                    } // END updateOrder

                }// END 确定按钮回调

            });// END dialog

            Util.dialog.open();

            // 初始化日历选中必须在这里
            // 如果有预定
            // 根据当前规则初始化日历UI
            // 否则选择预定第一项作为初始化
            if ( _this.curRuler !== '' &&  _this.curRuler !== void 0) {

                this.dateChose( parseInt(_this.curRuler.range, 10) - parseInt(_this.curRuler.timelong, 10) );
            } else {
                var $tmp = $('.cart-reserve-list li.on');
                this.dateChose( parseInt($tmp.attr('range'), 10) - parseInt($tmp.attr('timelong'), 10));
            }
        
        },// END reserveSet

        // 更改各种属性改变价格( 主要针对 数量的增减 )
        changePrice : function()  {

            var _this = this;
            var attr = [];

            var tmp = this.$el.attr('goods-attr-id').split(',');

            _.each( tmp, function( value ) {
                attr.push(value) ;
            });

            var DATA = {
                rec_id : _this.$el.attr('rec-id'),
                goods_number : _this.amount.get('num'),
                goods_id : _this.goodsId,
                attr : attr,
                delivery_time : this.$el.find('.delivery-time select').val()
            };
            var date = this.$el.attr('date');

            var tmpArray = [];
            
            // 如果有预定，则原封发送，对于没有预定的,不做任何处理
            if ( date !== undefined && date !== '[]') {
                date = JSON.parse(date);
            }

            DATA.date = date;

            $.ajax({
                url : 'flow.php?step=update',
                type : 'POST',
                dataType : 'JSON',
                data : DATA,
                success : function( data ) {
                    if ( data.status === 1) {

                        var old = $('#header .fruit-basket .money').text();

                        old = old.replace('￥','').replace('元','');

                        // 原来总价
                        old = parseFloat( old );

                        var thisOld = _this.$el.find('.price-total').text();

                        thisOld = thisOld.replace('￥','').replace('元','');

                        // 本商品原来总价
                        thisOld = parseFloat( thisOld );
                        
                        // 返回的单价
                        var newPrice = parseFloat( data.data );

                        // 取得当前数量
                        var num = _this.amount.get('num');
                        
                        // 算出现在这件商品的总价
                        var onTotal = num * newPrice;

                        if (  onTotal < thisOld ) {
                            old -= (thisOld - onTotal);
                        } else {
                            old += (onTotal - thisOld);
                        }

                        old = (old).toFixed(2);

                        onTotal = (onTotal).toFixed(2);

                        $('#header .fruit-basket .money').text('￥' + old);
                        $('.cart-total-price .price-show').text('￥' + old);
                        _this.$el.find('.price-total').text('￥' + onTotal + '元');
                        
                    }// END if
                }
            });

        }, // END changePrice

        // 预定方式改变事件绑定
        bindreserveSet : function() {
            var _this = this;

            // 购买方式改变
            $('body').delegate('.modal'+ _this.modalWinId + ' ul li', 'click', function(event){
                event.stopPropagation();

                // 判断是否已经选中
                if ( !$(this).hasClass('on') ) {
                 
                    $(this).siblings().removeClass('on');
                    $(this).addClass('on');

                    // 是预定时间
                    if ( $(this).parent().hasClass('cart-reserve-list') ) {

                        // 重新初始化日历
                        _this.dateChose( parseInt($(this).attr('range'), 10) - parseInt($(this).attr('timelong'), 10));

                        // 同时还原时间框中的预定时间（必须！规则不一样）
                        var resetDate = _this.getCurentDate();
                        $('.reserve-wrap .date-chose').val( resetDate[0] );
                        $('.reserve-wrap .altField').val( resetDate[1] );

                    }

                } // END 判断是否选中

            });// END 购买方式改变

            // 预定设置显示/隐藏
            $('body').delegate('.modal'+ _this.modalWinId + ' #cart-reserve-checkbox', 'change', function(event){

                if ( $(this).attr('checked') ) {
                    $('.reserve-wrap').slideDown();
                } else {
                    $('.reserve-wrap').slideUp();
                }
            });

        },// END bindreserveSet

        dateChose : function( range ) {

            // 重新初始化日历选择
            $('.date-chose').datepicker('destroy');

            $('.date-chose').datepicker({
                dateFormat : 'yy-mm-dd',
                minDate : 1,
                maxDate : range-1,
                altField : '.altField',
                altFormat : 'DD'
                /*
                onSelect: function(dateText, inst) {
                    if (dateText) {
                        $('.get-fruit-date .show-date').html( '开始送货时间：<span class="my-date">' + dateText + '</span>' );
                    }
                }
                */

            });
        }, // END dateChose

        // 返回今天到n天后的所有天日期
        covDate : function ( today, timelong ) {
            // 结果
            var res = [],
                tmp;

            today = today.replace(/-/g, '/');
            // 算出开始日期的‘时间戳’
            today = (new Date(today)).valueOf();

            for ( var i = 0; i < timelong; i++ ) {
                // 转成普通日期
                tmp = new Date( today + 86400000 * i );

                tmp = tmp.getFullYear() + '-' + (tmp.getMonth() + 1) + '-' + tmp.getDate();

                res.push(tmp);
            }

            return res;

        } // END covDate

    });

    module.exports = GoodsView;
});
