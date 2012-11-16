/**
 * checkout.js
 * ---------
 * 订单确认
 */
define(function(require, exports, module){
    var $ = require('jquery');
    var Util = require('util');

    // 原总价，首次从属性中获得
    var totalPrice = $(".order-total-pirce").attr('noformat');

    // 贺卡价格
    var cardPrice = 0;

    // 包装价格
    var packPrice = 0;

    // 更新价格
    function changePrice () {
        // 做加法
        var new_totalPrice = parseFloat(totalPrice) + cardPrice + packPrice;

        // 转成价格格式
        new_totalPrice = parseFloat( new_totalPrice ).toFixed(2);

        $(".order-total-pirce").text(
            '总计：' +
            '￥' +
            new_totalPrice +
            '元'
        );

    } // END changePrice

    // 引用修改地址API
    var address = require('app/user/address');

    // 启用地址修改，只能存在一个地址
    address('.receiving-address', 'order');

    // TODO 修改送货时间

    // 贺卡
    $(".gift-list li").each(function(i){
        var _this = this;

        // 当前贺卡价格
        var price = $(_this).attr('money');

        price = price.replace('￥','').replace('元','');

        $(this).find('label input').click(function() {

            // 选中(用onGift标记是否已经选中，否则连续点击会出问题)
            if ( $(this).attr('checked') !== void 0 && !$(this).hasClass('onGift') ) {

                $('.onGift').removeClass('onGift');
                $(this).addClass('onGift');

                // 关闭所有的贺卡
                $(".gift-list li").find('.gift-face').slideUp();

                // 选中无贺卡
                if ( !$(_this).find('.gift-face')[0] ) {
                    cardPrice = 0;
                    changePrice();
                } else {
                    $(_this).find('.gift-face').slideDown();

                    // 修改价格
                    cardPrice = parseFloat(price);
                    changePrice();
                }
            }
        });
    });

    // 订单备注
    $("#remark-unit-1").click(function(){
        // 选中
        if ( $(this).attr('checked') !== void 0 ) {

            $('.addition-content-wrap .remark-info').slideDown();

        // 取消选中
        } else {
            $('.addition-content-wrap .remark-info').hide('fast');
        }
    }); // END 订单备注

    var packSel = {
        dom : $()
    };

    // 选择包装时，更新价格
    $('.flowBox input[name=pack]').click(function(){
        var price = $(this).attr('price');

        packPrice = parseFloat( price );

        // 保存当前DOM
        packSel.dom = $(this);

        // 更新价格
        changePrice();
    });

    // 确认递交订单
    $("#post-order-button").click(function(){
        // 检查地址，没有一个可用地址
        if ( !$(".address-list").find('li')[0] ) {
            Util.dialog({
                title : "提示信息",
                content : "还没有填写有效地址哦~",
                button : {
                    '填写一个地址' : function () {
                        Util.dialog.close();
                        $("#user-location-info-add-new").click();
                    }
                }
            });
            
            Util.dialog.open();

            return false;
        } // END 填写地址
        
        // 检查贺卡内容是否填写
        var cardResError = [];
        var cardSel = {
            dom : $()
        };

        $(".gift-list li").each(function(){
            var _this = this;

            // 找到已经被选中的贺卡
            if ( $(this).find('label input').attr('checked') !== void 0 ) {

                // 无卡片
                if ( Math.abs( $(this).find('label input').val() ) === 0 ) {
                    return false;
                }

                // 选中的Card的DOM
                cardSel.dom = $(this);

                var cardCont = $(this).find('.gift-face .gift-content .gift-wish textarea').val();

                // 卡片不能为空
                if ( /^\s*$/.test( cardCont ) ) {
                    cardResError.push({
                        'card' : $(_this),
                        'error' : '内容还未填写'
                    });
                }

                // 卡片字数不能超过120
                if ( cardCont.length >= 120 ) {
                    cardResError.push({
                        'card' : $(_this),
                        'error' : '字数不能超过120个'
                    });
                }
            }

        });

        // 含有错误，弹出
        if ( cardResError.length !== 0 ) {
            Util.dialog({
                title : "提示信息",
                content : cardResError[0].card.attr('card-name') + cardResError[0].error,
                button : {
                    '现在去修改' : function () {

                        Util.dialog.close();

                        cardResError[0].card.find('.gift-face .gift-content .gift-wish textarea').focus();
                    }
                } // END button
            });

            Util.dialog.open();

            return false;
        } // END 检查贺卡错误

        // 加入贺卡内容，同步提交
        $("#order-new-form").append(
            '<input type="hidden" name="card_message" value="' + cardSel.dom.find('.gift-wish textarea').val() + '"/>'
        ).submit();

        // 发送到服务端
        /**
        var DATA = {
            // 地址id
            address_id : $("input:radio[name=consignee]").val(),
            // 支付方式
            payment : $("input:radio[name=payment]").val(),
            // 包装有错误
            pack_id : packSel.dom.val(),
            // 贺卡
            card_id : cardSel.dom.attr('card-id'),
            card_message : cardSel.dom.find('.gift-wish textarea').val(),
            //商品ids JSON
            cart_need_ids : $(".order-info-table-wrap").attr('goods-ids'),
            // 订单备注
            postscript: $(".remark-info").val()
        };

        Util.ajax({
            url : "flow.php?step=done",
            data : DATA,
            type : 'POST',
            success : function(data) {
                // 成功后跳转到这里/user.php?act=order_list
                console.log(data);
                location.href =
            }
        });
        */

    });// END 确认提交订单

});
