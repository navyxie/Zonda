/**
 * detail.js
 * ---------
 * 详细页面js
 */
define(function(require, exports, module){

    var $ = require('jquery-ui');
    var _ = require('underscore');
    var Backbone=  require('backbone');
    var Util = require('util');

    // 商品评价
    require('./comment/comment');

    // 左侧图片展示
    require('./imgView');

    // 加入购物车 + 直接购买操作
    require('./buyOptionView');

    // 倒计时
    require('./countDown');

    // 送货时间判断
    require('./deliveryTime');

    // 商品数量Model
    var NumModel = Backbone.Model.extend();

    // 水果详情 View
    var FruitDetail = Backbone.View.extend({

        el : $('.detail-wrap'),

        // 记录数量
        amount : '',

        events : {
            // 增加和减少数量
            'click .show-amount .action-kind' : 'changeAmount',

            // 手动输入数量时，失去焦点事件
            'focusout .show-amount .self-input input' : 'changeAmountBySelf',

            // 显示和隐藏预定方式设置
            'change #reserve-checkbox' : 'showReserve'
        },

        // 显示/隐藏 预定设置
        showReserve : function(event) {

            if ( $(event.target).attr('checked') ) {
                this.$('.reserve-setting').fadeIn();

                if ( !this.$el.find('.date-chose').val() ) {

                    // 设置开始送货时间为当天
                    var current = this.getCurentDate();
                    this.$el.find('.reserve-setting .date-chose').val( current[0]);
                    this.$el.find('.altField').val( current[1]);
                }

            } else {
                this.$('.reserve-setting').fadeOut();

                var $cur;
                var $del = $('.delivery-time option');
                var id = $('.delivery-time select').val();

                $del.each( function( index ) {
                    if ( parseInt(id, 10) === parseInt($(this).val(), 10) ) {
                        $cur = $(this);
                    }
                });

                // 触发deliveryTime 重新检查送货时间
                if ( $cur ) {
                    $cur[0].click();
                    $('.delivery-time select').trigger('change', $cur.val());
                }
            }

            // 显示和隐藏预定设置框时,重新查询价格
            this.changePrice();
        },

        // 手动输入数量
        changeAmountBySelf : function(event) {

            // 获得input 中的数据
            var num = parseInt( $(event.target).val(), 10);

            // 如果数量 的类型是数字 && 同时 > 0
            if( !_.isNaN(num) && num > 0 && num < 10000) {

                // 修改自己的model(model已经被监听，任何变化都会触发changePrice)
                this.amount.set({ num : num });

                // 显示改变后的数据
                this.$('.show-amount .self-input input').val(num);

            } else {

                // 否则将输入框中的数字还原为原来的数据
                this.$('.show-amount .self-input input').val(this.amount.get('num'));
            }
        },// END changeAmountBySelf

        // 数量变化(递减 "-" 和 "+")
        changeAmount : function( event ) {

            var num = this.amount.get('num');

            // 执行减操作
            if ( $(event.target).hasClass('minus') ) {
                num =  num > 1 ? num-1 : 1;
            } else if ( $(event.target).hasClass('add') ) {
                num++;
            }

            if ( num < 10000 ) {
                this.$('.show-amount .self-input input').val(num);

                // 会触发changePrice
                this.amount.set({ num : num });
            }
            
        },// END changeAmount

        // 更新显示的价格
        changePrice : function() {

            // 字符串规则，333,343，用于查询对应规则的总价
            var attr = '';
            
            attr += this.$('.buy-way li.on-way').attr('spec-id');

            // 预定checkebox 选中, 则一定预定(默认选中第一个)
            if ( $('#reserve-checkbox').attr('checked') ) {

                attr += ',' + this.$('.reserve-list li.on').attr('spec-id');
            }

            var DATA = {
                act : 'price',
                id : parseInt( this.$('#detail-fruit-id').val(), 10),
                attr : attr,
                number : parseInt( this.$('.show-amount .self-input input').val(), 10)
            };

            // 缓存当前this
            var _this = this;

            // 取得服务器算出的当前商品总价
            $.ajax({
                url : 'goods.php',
                type : 'GET',
                data : DATA,
                dataType : 'JSON',
                success : function ( data ) {

                    // 原始数据
                    var origPrice = data.result;

                    origPrice = origPrice.replace('￥','').replace('元','');

                    origPrice = parseFloat(origPrice);

                    // 商品数量
                    var num = parseInt( _this.amount.get('num'), 10 );

                    // 估算单价
                    var univalent = (Math.round( ((origPrice / num)*100) ) / 100).toFixed(2);

                    // 更新该规格下的单价：当前总价/数量
                    $('.detail-des .price .valuation').text(
                        '￥' + univalent + '元'
                    );

                    // 更新总价
                    $('.detail .total').text(
                        univalent +
                        ' x ' +
                        ( num ) +
                        ' = ' +
                        data.result
                    );
                },
                error : function ( error ) {
                    $('.detail .total').text('抱歉：发生错误了');
                }
            });// END ajax
        }, // END 更新显示的价格

        // View初始化
        initialize : function() {

            // 获得页面输入框中的数量，并创建model
            var tmpNum = parseInt( this.$('.show-amount .self-input input').val(), 10);
            
            // datepicker初始化有问题，如果大于1000，则可能时时间
            // 直接设为1
            tmpNum = tmpNum > 1000 ? 1 : tmpNum;

            this.$('.show-amount .self-input input').val(tmpNum);

            this.amount = new NumModel({
                num : tmpNum
            });

            // 监听数量变化（任何set操作都会触发 changePrice）
            this.amount.on('change', this.changePrice, this);

            // 绑定价格变化事件
            this.bindPriceChangeEvent();

            // 初始化jquery-ui 日历插件(datepicker)
            this.initDatepicker();

        },// END initialize

        // 没有用backbone的 events, event.target会不确定,增加判断难度
        // 与价格有关的事件绑定
        bindPriceChangeEvent : function() {

            var _this = this;
            
            // 购买方式改变
            this.$('.buy-way').delegate('li', 'click', function(event){

                event.stopPropagation();

                // 判断是否已经选中
                if ( !$(this).hasClass('on-way') ) {

                    var onKind = this;
                 
                    $(this).siblings().removeClass('on-way');
                    $(this).addClass('on-way');

                    //显示对应描述
                    $('.fruit-des li').each( function() {
                        if ( $(this).attr('order') === $(onKind).attr('order') && $(this).text() ) {
                            $(this).siblings().hide();
                            $(this).show();
                        }
                    });

                    _this.changePrice();
                }
            });

            // 预定方式改变
            this.$('.reserve-list').delegate('li', 'click', function(event) {

                event.stopPropagation();

                // 获得日历可选取范围，用于重新初始化 日历选择
                var range = $(this).attr('range');
                var timelong = $(this).attr('timelong');

                // 如果已经选中，则不做变化
                if ( !$(this).hasClass('on') ) {

                    // 改变选中效果
                    $(this).siblings().removeClass('on');
                    $(this).addClass('on');

                    // 重新初始化日历选择
                    $('.reserve-setting .date-chose').datepicker('destroy');
                    _this.datepickerSet( range-timelong-1 );

                    // 显示预定方式
                    $('.get-fruit-date .show-kind').html( $(this).find('span').text() );

                    // 必须还原为当天，规则不一样，必须重新初始化
                    var resetDate = _this.getCurentDate();
                    $('input.date-chose').val(resetDate[0]);
                    $('.altField').val(resetDate[1]);

                    $('.get-fruit-date .show-date').html( '开始送货时间：<span>' + resetDate[0] + ' ' + resetDate[1] + '</span>');

                }// END if

                // 这里取消必须重新计算价格
                _this.changePrice();

            });// END 预定列表点击事件绑定

            return this;
        }, // END bindPriceChangeEvent

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

            var defaultRange = $('.reserve-list li.on').attr('range');
            var defaultTimelong = $('.reserve-list li.on').attr('timelong');

            this.datepickerSet( defaultRange - defaultTimelong -1 );

            // 设置开始送货时间为当天
            var current = this.getCurentDate();

            // 显示预定方式
            $('.show-kind').text( $('.reserve-list li.on span').text() );

            $('.show-date').html( '开始送货时间：<span>' + current[0] + ' ' + current[1] + '</span>');

            return this;
        }, // END initDatepicker

        // 设置datepicker
        datepickerSet : function( maxDate ) {

            // 默认选中第一种预定方式
            $('.reserve-setting .date-chose').datepicker({
                dateFormat : 'yy-mm-dd',
                minDate : 1,
                maxDate : maxDate,
                altField : '.altField',
                altFormat : 'DD',
                onSelect: function(dateText, inst) { // 回调
                    
                    if (dateText) {
                        $('.get-fruit-date .show-date').html(
                            '开始送货时间：<span>' + dateText + ' ' + $('.altField').val() + '</span>'
                        );
                    }
                }
            });
        
        },

        // 获得第二天 [ 2012-11-1, 星期四]
        getCurentDate : function() {

            var tmp = [];

            var current = new Date();

            // 第二天
            current = new Date(current.valueOf() + 86400000);

            tmp.push( current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate() );

            tmp.push( '星期' + '天一二三四五六'.charAt(current.getDay()) );

            return tmp;
        }
    });

    $(function() {
        var detail = new FruitDetail();

        // 显示商品描述 原来是隐藏的,用于优化加载，可能会干掉
        $('.description-service').show();

        $('head').append( '<script type="text/javascript" src="http://v2.jiathis.com/code/jia.js" charset="utf-8"></script>' );
        
    });
});
