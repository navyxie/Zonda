/**
 * 用户地址
 */
define(function( require, exports, module ){
    var $ = require('jquery');
    var Util = require('util');
    var _ = require('underscore');

    // 读取模板文件
    var locationTPL = require('./tpl/location-info.tpl');

    // 主函数
    var main = function ( rootDOM, order ) {
        var addressCELL;

        // 判断在哪里调用此函数，将分别使用不同的地址模板
        if ( order === 'order' ) {
            addressCELL = require('./tpl/order-address-cell.tpl');
        } else {
            addressCELL = require('./tpl/address-cell.tpl');
        }

        // 创建新地址DOM
        function makeNewAddress ( data ) {
            var addressUl = $( rootDOM ).find(".address-list");

            // 默认位置，最后一位
            var eq = -1, currLi;

            addressUl.find('li').each(function(e){
                if ( Math.abs( $(this).attr('aid') ) === Math.abs( data.aid ) ) {
                    eq = e;
                    currLi = $(this);
                }
            });

            // 如果有当前元素，则删除原来的元素
            if ( currLi ) {
                currLi.remove();
            }

            // 当位置不存在，或为第一个时，直接前插到第一个
            if ( eq <= 0 ) {
                addressUl.append(
                        _.template( addressCELL, data)
                        );
                // 当前位置存在，则插入到当前位置

            } else {
                addressUl.find('li').eq( eq -1 ).after(
                        _.template( addressCELL, data)
                        );
            }

        } // END makeNewAddress

        // 更新地址
        function updateAddress () {

            // 验证全部表单
            if ( !Util.verify('all') ) {
                return false;
            }

            // 组织数据
            var DATA = {
                address_id : $("#util-dialog").find('form').attr('aid'),
                address : $("#util-dialog").find('form .sub-address').val(),
                consignee : $("#util-dialog").find('form .sub-name').val(),
                mobile : $("#util-dialog").find('form .sub-tel').val(),
                act : 'act_edit_address'
            };

            Util.dialog.close();

            // 显示加载中...
            Util.gif.open();

            // 发送数据
            Util.ajax({
                url : "/user.php",
                data : DATA,
                success : function ( data ) {

                    Util.gif.close();

                    if ( data.status === 1 ) {

                        // 动态创建新地址
                        makeNewAddress({
                            aid : data.data.address_id,
                            zone : '电子科技大学清水河校区',
                            detail : DATA.address,
                            name : DATA.consignee,
                            tel : DATA.mobile
                        });

                        Util.dialog({
                            title : "消息",
                            content : "添加成功"
                        });

                        Util.dialog.open().close(1300);
                    } else {

                        Util.dialog({
                            title : "错误消息",
                            content : data.info
                        });

                        Util.dialog.open();
                    }
                } // END success

            }); // END ajax

        } // END updateAddress

        $(".mentioning-address").live('click', function(){
            // 选择自提地址
            if ( $(this).attr('checked') !== void 0 ) {
                $(".sub-address").val('活动中心 111号房间 自提').attr('disabled','disabled');

                // 清除之前的错误
                var par = $(".sub-address").parent().parent();

                par.removeClass('error').find('.help-inline').text('');

            } else {
                $(".sub-address").val('').removeAttr('disabled');
            }
        });

        // 添加新地址
        $("#user-location-info-add-new").click(function(){

            Util.dialog({
                title : "添加新地址",
            content : _.template( locationTPL, {
                detail : '',
            name : '',
            tel : '',
            aid : ''
            }),
            button : {
                '保存新地址' : updateAddress
            }
            }); // END Util.dialog

            Util.dialog.open();

            // 对话框生成后，并且可见时，即预验证
            Util.verify();

        }); // END 添加新地址

        // 编辑地址
        $( rootDOM ).find(".address-list").delegate( 'li .icon-pencil', 'click',function () {
            var _this = $(this).parent().parent();

            var origAddress = {
                aid : $(_this).attr('aid'),
            zone : $(_this).find('.zone').text(),
            detail : $(_this).find('.detail').text(),
            name : $(_this).find('.name').text(),
            tel : $(_this).find('.tel').text()
            };

            Util.dialog({
                title : "编辑地址",
                content : _.template( locationTPL, origAddress ),
                button : {
                    '保存修改' : updateAddress
                }
            });

            Util.dialog.open();

            // 验证
            Util.verify();

        }); // END 编辑地址

        // 删除地址
        $( rootDOM ).find(".address-list").delegate( 'li .icon-remove', 'click',function () {
            var _this = $(this).parent().parent();

            Util.dialog({
                title : "确认删除",
                content : "确定要删除这个地址吗？",
                button : {
                    "确定" : function () {
                        Util.ajax({
                            url : 'user.php?act=drop_consignee',
                        type : "GET",
                        data : {
                            id : $(_this).attr('aid')
                        },
                        success : function ( data ) {
                            Util.dialog.close();

                            if ( data.status === 1 ) {
                                $(_this).fadeOut('slow');
                            } else {
                                Util.dialog({
                                    title : "消息",
                                    content : data.info
                                });
                                Util.dialog.open();
                            }
                        }

                        });// END 传输数据

                    } // END 确定

                }

            }); // END Util.dialog

            Util.dialog.open();
        }); // END 删除地址
        
        // 设为默认地址
        $( rootDOM ).find(".address-list").delegate( 'li .icon-check', 'click',function () {
            var _this = $(this).parent().parent();

            Util.ajax({
                url : 'user.php?act=set_default_address',
            type : "GET",
            data : {
                address_id : $(_this).attr('aid')
            },
            success : function ( data ) {
                if ( data.status === 1 ) {

                    $( rootDOM ).find('.address-list').prepend( $(_this) );

                    try {
                        $(_this).find('input:radio').attr('checked','checked');
                    } catch (e) {}

                    Util.dialog({
                        title : "消息提示",
                        content : "设置默认地址成功~"
                    });

                    Util.dialog.open().close(1300);
                } else {
                    Util.dialog({
                        title : "消息提示",
                        content : "设置默认地址失败了...<br />等会儿再试试吧~"
                    });
                    Util.dialog.open();
                } // END else
            }

            });// END 传输数据

        }); // END 设置为默认地址

    }; // END main

    module.exports = main;

});// END define
