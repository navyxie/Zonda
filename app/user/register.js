/*
 * 验证注册信息，并提交到服务器
 */
define(function(require){
    var $ = require('jquery');
    var Util = require('util');

    // 预先验证
    Util.verify();

    //通过按回车登陆
    $(".check-box").find("input").keypress(function(event){
        if ( event.keyCode === 13 ) {
            event.preventDefault();
            $(".btn").click();
            return false;
        }
    });//END keypress

    // 是否同意协议
    var check = 0;

    var content = $("#contract_content").html();
    var title = $('#contract_title').text();

    function Check() {

        Util.dialog.close();
        $(".check-box").find("input").attr("checked","checked");
        check = 1;

    }

    //点击协议
    $(".clause").click(function(){

        Util.dialog({
            title : title,
            content : content,
            button: {'已阅读协议并同意' : Check}

        });

        Util.dialog.open();

    });// ENd click

    //协议的勾选框
    $(".check-box").find("input").click(function(){
        if(check === 0){
            check = 1;
            var checkbox = $(".checkbox").parent().parent();
            checkbox.removeClass("error");
            var checkHelpInline = checkbox.find(".help-inline");
            checkHelpInline.text("");

        }else{
            check = 0;
        }
    });// END checkbox

    //通过按回车登陆
    $("#input-confirm-password").keypress(function(event){
        if ( event.keyCode === 13 ) {
            event.preventDefault();
            $(".btn").click();
            return false;
        }
    });//END keypress

    // 点击提交按钮
    $(".btn").click(function(){

        // 判断提交信息是否有错误
        if(!Util.verify("all")){
            return false;
        }

        // 判断昵称是否过长
        var nameLength = $("#input-name").val().length;
        var nameControlGroup = $("#input-name").parent().parent();
        var nameHelpInline = nameControlGroup.find(".help-inline");

        if(nameLength > 60 ){

            nameControlGroup.addClass("error");
            nameHelpInline.text("昵称过长！");
            nameControlGroup.find("#input-name").focus();
            return false;

        }else{

            nameControlGroup.removeClass("error");
            nameHelpInline.text("");
        }// END 判断昵称是否过长

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

        // 验证密码是否一致
        var Password = $("#input-password").val();

        var ConfirmPassword = $("#input-confirm-password").val();
        var controlGrouprepeat = $("#input-confirm-password").parent().parent();
        var helpInlinerepeat = controlGrouprepeat.find(".help-inline");

        if( Password !== ConfirmPassword ){

            controlGrouprepeat.addClass("error");
            helpInlinerepeat.text("两次密码不一致");
            controlGrouprepeat.find("#input-confirm-password").focus();
            return false;

        }else{

            controlGrouprepeat.removeClass("error");
            helpInlinerepeat.text("");

        }

        var checkbox = $(".check-box").parent().parent();
        var checkHelpInline = checkbox.find(".help-inline");

        // 检查是否已阅读条款
        if (check === 0) {
            checkbox.addClass("error");
            checkHelpInline.text("请阅读需求");
            return false;
        }else {

            checkbox.removeClass("error");
            checkHelpInline.text("");

        }

        //验证邮箱是否存在
        Util.ajax({
            url : "/user.php?act=check_email",
            data : {
                email : $("#input-email").val()
            },
            type : "POST",
            dataType : "JSON",
            success : function (data) {

                // 服务器处理正确
                if ( data.status === 0 ) {

                    testInfo(data);

                }
                else{
                    if(data.data === "exist" ){

                        testEmail();

                    }else {
                        
                        //取用户名返回值
                        Util.ajax({
                            url : "/user.php?act=is_register",
                            data : {
                                username : $("#input-name").val()
                            },
                            type : "POST",
                            dataType : "JSON",
                            success : function (data) {

                                if(data.data==="exist"){

                                    testUsername();

                                }else{

                                    testSend();
                                }

                            }

                        });//END 取用户名返回值

                    }
                }
            }

        });//END 验证邮箱存在

        //验证服务器处理是否正确
        function testInfo (data) {

            Util.dialog({
                title : "出现错误了",
                content : data.info
            });

            Util.dialog.open();

            return false;

        }

        //验证邮箱是否存在
        function testEmail () {

            var controlGroupEmail = $("#input-email").parent().parent();
            var helpInlineEmail = controlGroupEmail.find(".help-inline");

            controlGroupEmail.addClass("error");
            helpInlineEmail.text("你的Email已存在");
            controlGroupEmail.find("#input-confirm-password").focus();

            return false;

        }

        //验证用户名是否存在
        function testUsername () {

            var controlGroupUser= $("#input-name").parent().parent();
            var helpInlineUser= controlGroupUser.find(".help-inline");

            controlGroupUser.addClass("error");
            helpInlineUser.text("你的用户名已存在");
            controlGroupUser.find("#input-confirm-password").focus();

            return false;

        }

        // 传送数据
        function testSend () {

            Util.ajax({
                url : "/user.php",
                data : {
                    email : $("#input-email").val(),
                    username : $("#input-name").val(),
                    password  : $("#input-password").val(),
                    confirm_password: $("#input-confirm-password").val(),
                    agreement: check,
                    act :"act_register",
                    back_act:""
                },
                dataType : "JSON",
                type : "POST",
                success : function (data) {
                    if (data.status === 1){
                        Util.dialog({

                            title : "注册情况",
                            content : "恭喜你！！！注册成功"

                        });
                        Util.dialog.open().close(1200);
                        setTimeout(function(){

                            location.href ="/";
                        }, 1200);

                    }else{

                        Util.dialog({

                            title : "注册情况",
                            content : data.info
                        });
                        Util.dialog.open();

                    }

                }// END 最后一次传输成功

            }); // END ajax

        }// END testSend

    }); // END 点击提交按钮

});// END define
