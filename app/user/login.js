/**
 * 验证注册信息，并提交到服务器
 */
define(function(require){
    var $ = require('jquery');
    var Util = require('util');

    // 预先验证
    Util.verify();

    //进入页面后焦点自动移到邮箱处
    $("#input-email").focus();

    //通过按回车登陆
    $("#input-password").keypress(function(event){
        if ( event.keyCode === 13 ) {
            event.preventDefault();
            $(".btn").click();
            return false;
        }
    });//END keypress

    $(".btn").click(function(){

        // 判断提交信息是否有错误
        if(!Util.verify("all")){
            return false;
        }

        // 判断密码位数是否够六位
        var length = $("#input-password").val().length;
        var controlGroup = $("#input-password").parent().parent();
        var helpInline = controlGroup.find(".help-inline");

        if(length < 6){

            controlGroup.addClass("error");
            helpInline.text("密码不能小于六位数");
            controlGroup.find("#input-password").focus();
            return false;

        }else{

            controlGroup.removeClass("error");
            helpInline.text("");

        }// END 判断密码位数是否够六位


        Util.ajax({
            url : "/user.php",
            data : {
                act :"act_login",
            back_act:"./index.php",
            email : $("#input-email").val(),
            password  : $("#input-password").val()
            },
            dataType : "JSON",
            type : "POST",
            success : function (data) {
                if ( data.status === 1 ) {
                    if ( data.data.url ) {
                        location.href = data.data.url;
                    } else {
                        location.href ="/";
                    }

                } else {
                    Util.dialog({
                        title : "错误消息",
                        content : data.info
                    });
                    Util.dialog.open();
                }
            }

        }); // END ajax

    });//END click

    //忘记密码
    $(".forget").click(function(){
        Util.dialog({
            title : "重设密码",
            content:     '<div class="control-group">' +
            '<label class="control-label" for="reset-email">邮箱：</label>' +
            '<div class="controls">' +
            '<input type="text" id="reset-email" placeholder="邮箱" ruler =\'{"type":"email","required":true,"noblank":true,"xxs":true}\' />' +
            '<span class="help-inline"></span>' +
            '</div>' +
            '</div>' ,
            button: {
                '发送新密码至此邮箱': sendData
            }
        });// END Util.dialog

        Util.dialog.open();

        // 预验证全部所有弹窗项
        if ( !Util.verify('pre','#util-dialog') ) {
            return false;
        }
    });// END click .forget

    //修改密码时发送邮箱地址
    function sendData() {

        var Data = {
            email: $("#reset-email").val()
        };

        // 提交验证所有弹窗项
        if ( !Util.verify('all','#util-dialog') ) {
            return false;
        }

        Util.dialog.close();

        // 显示加载中...
        Util.gif.open();

        // 发送数据
        Util.ajax({
            url : "/user.php?act=send_pwd_email",
            data : Data,
            type: "POST",
            success : function ( data ) {

                Util.gif.close();

                if ( data.status === 1 ) {

                    Util.dialog({
                        title : "消息",
                        content : data.info
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

    }// END sendEmail

});//END define
