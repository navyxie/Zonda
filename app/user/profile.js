/**
 * 个人信息
 * 编辑个人信息
 */
define(function(require){
    var $ = require('jquery');
    var Util = require('util');
    var _ = require("underscore");

    // 编辑昵称
    var nickGroup = $("#user-nick-name").parent().parent();

    nickGroup.find('.icon-pencil').click(function(){
        var origName = $("#user-nick-name").text();
        var pencil = $(this);

        $("#user-nick-name").hide();

        pencil.hide();

        // 插入input和button
        nickGroup.find('.controls').prepend( '<input value="' +
            origName +
            '" type="text" ruler=\'{"required":true, "noblank":true, "xxs":true }\' />'+
            '<a class="btn btn-fruit-success btn-success" style="line-height:20px; margin-left: 10px;" href="javascript:;">保存</a>'
            );

        // input键盘事件发生时
        // 检查输入是否正确
        // 在正确的前提下，提交到服务端验证昵称是否已经存在
        nickGroup.find('input').keyup(function(event){

            if ( event.keyCode === 13 ) {
                return false;
            }

            var _this = this;
            var _name = $(".name").find("input").val().length;

            // 输入原来的名字，返回
            if ( $(this).val() === origName ) {
                nickGroup
            .removeClass('error')
            .find('.help-inline')
            .text('');

        return false;
            }

            Util.verify('all');

            // 填写有错误，不发送
            if ( nickGroup.hasClass('error') ) {
                return false;
            }

            Util.ajax({
                url : "/user.php?act=is_register",
                type : "POST",
                data : {
                    username : $(_this).val()
                },
                success : function (data) {
                    if ( data.status === 1 && data.data === 'exist' ) {
                        nickGroup
                .addClass('error')
                .find('.help-inline')
                .text('昵称已经存在了，换一个吧~');
                    } else if ( data.status === 1 && data.data === 'noExist') {
                        nickGroup
                .removeClass('error')
                .find('.help-inline')
                .text('');
                    } else {
                        Util.dialog({
                            title : "错误消息",
                            content : data.info
                        });
                        Util.dialog.open();
                    }
                }
            }); // END ajax

        }); // END input keyup

        // 回车保存
        nickGroup.find('input').keypress(function(event){
            if ( event.keyCode === 13 ) {
                event.preventDefault();
                nickGroup.find('.btn-fruit-success').click();
                return false;
            }
        });

        // 点击保存
        nickGroup.find('.btn-fruit-success').click(function(){

            // 判断昵称是否过长、过短
            var nameLength = $(".name").find("input").val().length;
            var nameControlGroup = $(".name").parent();
            var nameHelpInline = nameControlGroup.find(".help-inline");

            if(nameLength > 60 ){

                nameControlGroup.addClass("error");
                nameHelpInline.text("昵称过长！");
                nameControlGroup.find("input").focus();
                return false;

            }else{

                nameControlGroup.removeClass("error");
                nameHelpInline.text("");
            }

            if(nameLength < 3 ){

                nameControlGroup.addClass("error");
                nameHelpInline.text("昵称需大于3位数！");
                nameControlGroup.find("input").focus();
                return false;

            }else{

                nameControlGroup.removeClass("error");
                nameHelpInline.text("");

            }// END 判断昵称是否过长、过短

            if ( !Util.verify('all') ) {
                return false;
            }

            Util.ajax({
                url : "user.php?act=act_edit_profile",
                type : "POST",
                data : {
                    user_name : nickGroup.find('input').val()
                },
                success : function (data) {
                    if ( data.status === 1 ) {

                        $("#user-nick-name").fadeIn('slow').text( nickGroup.find('input').val() );

                        // 恢复编辑按钮原来的样式
                        pencil.removeAttr('style');

                        nickGroup
                .find('input')
                .remove()
                .andSelf()
                .find('.btn-fruit-success')
                .remove();

                    } else {

                        Util.dialog({
                            title : "错误消息",
                            content : "啊哦，出现错误了！" + data.info
                        });

                        Util.dialog.open().close(1300);

                        nickGroup.find('input').focus();
                    }
                }
            });

        }); // END 点击保存事件

    }); // END 点击编辑事件

});// END define
