/**
 * 个人信息
 * 编辑个人信息
 */
define(function(require){
    var $ = require('jquery');
    var Util = require('util');
    var _ = require("underscore");
    var Backbone = require('backbone');

    //提交订阅邮件
    function emailHandler () {

        // 显示邮件设置页面
        $("#user-changepwd-pwd").hide();
        $("#user-changepwd-email").fadeIn('fast');

        $(".user-changepwd-header a[ac-type='pwd']").parent().removeClass('on');
        $(".user-changepwd-header a[ac-type='email']").parent().addClass('on');

        //设置一个中间变量取是否勾选
        var value = 1;

        //动态获得勾选的值
        $("#user-changepwd-email").find("input").click(function(){
            if(value === 1){
                value = 0;

            }else{
                value = 1;

            }

        });//END click

        //发送订阅邮箱请求
        $("#user-changepwd-email").find(".btn").click(function(){
            if(value === 1){

                //发送订阅请求
                Util.ajax({
                    url : "/user.php?act=email_list&job=add",
                    type : "GET",
                    data : {
                        email : "12345@54321.com"
                    },
                    success : function(data){

                        Util.dialog({
                            title : "订阅情况",
                        content : data.info
                        });
                        Util.dialog.open();
                    }

                });// END 发送数据

            }
            else{

                // 发送取消请求
                Util.ajax({
                    url : "/user.php?act=email_list&job=del",
                    type : "GET",
                    data : {
                    email : "12345@54321.com"
                    },
                    success : function(data){

                    Util.dialog({

                        title : "订阅情况",
                    content : data.data
                    });
                    Util.dialog.open();

                    }

                });//END 取消发送

            }// END 取消订阅*/

        }); // END 绑定按钮

    } // END emailHandler

    // 提交修改密码
    function pwdHandler () {

        // 显示修改密码
        $("#user-changepwd-email").hide();
        $("#user-changepwd-pwd").fadeIn('fast');

        $(".user-changepwd-header a[ac-type='pwd']").parent().addClass('on');
        $(".user-changepwd-header a[ac-type='email']").parent().removeClass('on');

        Util.verify();

        //通过按回车修改密码
        $("#repeat-pwd").keypress(function(event){
            if ( event.keyCode === 13 ) {
                event.preventDefault();
                $("#user-changepwd-pwd").find(".btn").click();
                return false;
            }
        });

        //绑定提交修改密码按钮
        $("#user-changepwd-pwd").find(".btn").click(function(){

            //验证两次密码是否一致
            var newPwd = $("#new-pwd").val();
            var repeatPwd = $("#repeat-pwd").val();

            // 判断密码位数是否够六位
            var length = $("#new-pwd").val().length;
            var controlGroup = $("#new-pwd").parent().parent();
            var helpInline = controlGroup.find(".help-inline");

            if(length < 6){

                controlGroup.addClass("error");
                helpInline.text("密码不能小于六位数");
                controlGroup.find("#new-pwd").focus();
                return false;

            }else{

                controlGroup.removeClass("error");
                helpInline.text("");

            }// END 判断密码位数是否够六位

            if( newPwd !== repeatPwd ){
                controlGroup.addClass("error");
                helpInline.text("两次密码不一致");
                controlGroup.find("#new-pwd").focus();
                return false;
            }else{
                controlGroup.removeClass("error");
                helpInline.text("");

                //提交修改密码
                Util.ajax({
                    url : "/user.php",
                    type : "POST",
                    data : {
                        old_password : $("#orig-pwd").val(),
                    new_password : $("#new-pwd").val(),
                    confirm_password : $("#repeat-pwd").val(),
                    act : "act_edit_password"
                    },
                    success : function(data){
                        if(data.status === 1){
                            Util.dialog({

                                title : "密码修改情况",
                                content : "密码修改成功"
                            });
                            Util.dialog.open().close(1200);
                            setTimeout(function(){
                                location.href ="/user.php?act=login";
                            }, 1200);
                        }else{

                            Util.dialog({

                                title : "密码修改情况",
                                content : data.info
                            });
                            Util.dialog.open();

                        }

                    }// END 传输成功

                });// END 提交密码

            }
        });// END 提交密码

    } // END pwdHandler

    // 当前页面路由
    var acRoute = Backbone.Router.extend({
        routes : {
            'email' : 'emailHandler',
            'pwd' : 'pwdHandler'
        },
        emailHandler : emailHandler,
        pwdHandler : pwdHandler
    });

    new acRoute();

});//END define

