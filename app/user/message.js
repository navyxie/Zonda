/**
 * 个人信息
 * 编辑我的客服
 */
define(function(require){
    var $ = require('jquery');
    var Util = require('util');
    var _ = require("underscore");

    // 预验证
    Util.verify();

    //阻止按回车发送
    $(".check-box").find("input").keypress(function(event){
        if ( event.keyCode === 13 ) {
            event.preventDefault();
            $(".btn").click();
            return false;
        }
    });//END keypress

    //传送新的问题
    $(".message-add").find(".btn").click(function(){

        if (!Util.verify("all")){return false;}
        var text = $(".message-add").find("textarea").val();

        // 传送数据
        Util.ajax({
            url : "/user.php?act=add_msg",
            type : "POST",
            data : {
                content : text
            },
            success : function (data) {
                location.href ="/user.php?act=list";
            }

        });// END  传送

    });// END 传送新的问题

});// END define

