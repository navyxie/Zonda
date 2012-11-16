/**
 * 用户通知
 */
define(function(require){
    var $ = require('jquery');
    var Util = require('util');

    // 取出通知未读的条数
    var i = 0;
    $("#user-notice-main").find("li").each(function(){

        var is_read = $(this).attr("is_read");
        if(is_read === "0"){

            i = i+1;
            $(this).find('.icon-hand-right').css("display","block");

        } else {
        
            $(this).find('.icon-hand-right').css("display","none");
        
        }

    //如果没通知，隐藏页码栏，显示无通知的提示
    if ( $(".user-notice-main-detail").find("a").hasClass("detail") ) {
    
        $(".pagination").show();
        $(".no-notice").css("display","none");

    } else {
    
        $(".no-notice").css("display","block");

    }
    // END 如果没通知，隐藏页码栏，显示无通知的提示

    });// END 取出通知未读条数

    //渲染已读的通知
    $("ul").find("li").each(function(){

        var _this = $(this).find(".detail");
        var read = $(this).attr("is_read");
        if(read === "1"){

            $(_this).css("color","#777");

        }else{

            $(_this).css("color","#444");

        }

    });

    //点击弹出内容
    $("li").find("a").each(function(){

        var id = $(this).parent().attr("notice_id");
        var check = 0;
        $(this).click(function(){

            $(this).css("color","#777");
            $(this).parent().find('.icon-hand-right').css("display","none");

            if(check === 0){

                check = 1;
                $(this).parent().find('span').css("display","block");

            }else{

                check = 0;
                $(this).parent().find('span').css("display","none");

            }

            // 判断是否是已读
            var read = $(this).parent().attr("is_read");
            var is_this = $(this).parent();
            if(read === "0"){

                Util.ajax({
                    url : 'user.php?act=read_notice&id='+id,
                    type : "REQUEST",
                    data : {
                        id : id
                    },
                    success : function ( data ) {

                        if ( data.status === 1 ) {

                            // 渲染目前的未读通知条数
                            i = i-1;
                            is_this.attr("is_read","1");
                            if (i > 0){

                                $(".on").find("a").text("通知"+"("+i+")");

                            }else{

                                $(".on").find("a").text("通知");

                            }

                        }else {
                            Util.dialog({
                                title : "消息",
                                content : data.info
                            });
                            Util.dialog.open();
                        }

                    }

                });

            } //END 判断是否已读

        });// END click

        // 删除通知
        var _this = this;
        $(_this).parent().find('.icon-remove').click(function(){

            var is_read = $(_this).parent().attr("is_read");
            var id = $(_this).parent().attr("notice_id");

            if(is_read === "1"){

                Util.dialog({
                    title : "确认删除",
                    content : "你真的要删除这条通知么？",
                    button : {
                        "确定" : function () {
                            Util.ajax({
                                url : 'user.php?act=del_notice&id='+id,
                            type : "REQUEST",
                            data : {
                                id : $(_this).parent().attr('notice_id')
                            },
                            success : function ( data ) {
                                Util.dialog.close();

                                if ( data.status === 1 ) {

                                    $(_this).parent().fadeOut('slow');
                                } else {
                                    Util.dialog({
                                        title : "消息",
                                        content : data.info
                                    });
                                    Util.dialog.open();
                                }

                            }

                            });

                        } // END 确定

                    }// END button

                });// END 确认删除

                Util.dialog.open();

            }// END 如果是已读
            else{
                Util.dialog({
                    title : "确认删除",
                    content : "你真的要删除这条通知么？",
                    button : {
                        "确定" : function () {
                            Util.ajax({
                                url : 'user.php?act=del_notice&id='+id,
                            type : "REQUEST",
                            data : {
                                id : $(_this).parent().attr('notice_id')
                            },
                            success : function ( data ) {
                                Util.dialog.close();

                                if ( data.status === 1 ) {

                                    // 渲染目前的未读通知条数
                                    i = i-1;
                                    if (i > 0){

                                        $(".on").find("a").text("通知"+"("+i+")");

                                    }else{

                                        $(".on").find("a").text("通知");

                                    }

                                    $(_this).parent().fadeOut('slow');

                                } else {
                                    Util.dialog({
                                        title : "消息",
                                        content : data.info
                                    });
                                    Util.dialog.open();
                                }

                            }

                            });

                        } // END 确定

                    }// END button

                });// END 确认删除

                Util.dialog.open();

            }// END 如果是未读


        });// END click

    });//END each

});//END define
