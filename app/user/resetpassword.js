/**
 * 设置新密码
 * 编辑新密码
 */
define(function(require){
    var $ = require('jquery');
    var Util = require('util');
    var _ = require("underscore");

    //预验证
    Util.verify();

    //绑定设置新密码按钮
    $(".btn").click(function(){
        var uid = $(".uid").text();
        var code = $(".code").text();

        // 判断密码位数是否够六位
        var length = $("#reset-new-pwd").val().length;
        var controlGroup = $("#reset-new-pwd").parent().parent();
        var helpInline = controlGroup.find(".help-inline");

        if(length < 6){

            controlGroup.addClass("error");
            helpInline.text("密码不能小于六位数");
            controlGroup.find("#reset-new-pwd").focus();
            return false;

        }else{

            controlGroup.removeClass("error");
            helpInline.text("");

        }// END 判断密码位数是否够六位

        // 验证密码是否一致
        var Password = $("#reset-new-pwd").val();

        var ConfirmPassword = $("#reset-repeat-pwd").val();
        var controlGrouprepeat = $("#reset-repeat-pwd").parent().parent();
        var helpInlinerepeat = controlGrouprepeat.find(".help-inline");

        if( Password !== ConfirmPassword ){

            controlGrouprepeat.addClass("error");
            helpInlinerepeat.text("两次密码不一致");
            controlGrouprepeat.find("#reset-repeat-pwd").focus();
            return false;

        }else{

            controlGrouprepeat.removeClass("error");
            helpInlinerepeat.text("");

        }

        //发送数据
        Util.ajax({
            url : "/user.php?act=act_edit_password",
            data : {
                new_password : $("#reset-new-pwd").val(),
            confirm_password : $("#reset-repeat-pwd").val(),
            uid : uid,
            code : code

            },
            type : "POST",
            dataType : "JSON",
            success : function (data) {
                if(data.status === 1){
                    Util.dialog({

                        title : "重置密码情况",
                        content : "密码重置成功"
                    });
                    Util.dialog.open().close(1200);
                    setTimeout(function(){
                        location.href ="/";
                    }, 1200);
                }else{

                    Util.dialog({

                        title : "重置密码情况",
                        content : data.info
                    });
                    Util.dialog.open();

                }

            }

        });// END 传输数据

    });// END click

});// END define
