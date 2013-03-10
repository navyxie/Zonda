// state.machine.module.js
// ---------------
// 状态机
//
// Usage:
//
/**
    var Util = require('util');
    var StateMachine = new Util.StateMachine();

    // 主界面状态回调
    var mainView = {
        activate : function () {
            $("#side-bar .table-list").show();
            $("#green-bar ul.green-bar-list").show();
        },
        deactivate : function () {
            $("#side-bar .table-list").hide();
            $("#green-bar ul.green-bar-list").hide();
        }
    };

    // 邮件发送状态回调
    var mailView = {
        activate : function () {
            // 面包屑
            $(".green-bar-list.location .pos").append(
                '<a href="javascript:mainView();">数据管理</a>' +
                '>' +
                '<a href="javascript:;">发送邮件</a>'
            );
        },
        deactivate : function () {
            $("#side-bar .mail").remove();
            $("#lookTable #add-page-wrap").empty();

            // 清除面包屑
            $(".green-bar-list.location .pos").empty();
        }
    };

    // 添加为状态
    StateMachine.add( mainView );
    StateMachine.add( mailView );

    // 加入全局变量，方便在View中调用
    // 这里主要为了快速开发
    window.mailView = mailView.active;
    window.mainView = mainView.active;

*/

define(function ( require, exports, module) {
    var $ = require('jquery');

    var Events = {
        bind : function () {
            if ( !this.o ) {
                this.o = $({});
            }

            this.o.bind.apply( this.o, arguments );
        },
        trigger : function () {
            if ( !this.o ) {
                this.o = $({});
            }

            this.o.trigger.apply( this.o, arguments );
        }
    };

    var StateMachine = function() {};

    StateMachine.fn = StateMachine.prototype;

    // 用Events扩展构造器
    $.extend( StateMachine.fn, Events );

    // 添加状态方法
    StateMachine.fn.add = function ( controller ) {
        // 为此状态绑定事件
        this.bind( 'change', function ( e, current ) {
            if ( controller === current ) {
                controller.activate();
            } else {
                controller.deactivate();
            }
        });

        // 激活该状态
        controller.active = $.proxy( function() {
            this.trigger( 'change', controller );
        }, this);

    }; // END add

    // API
    module.exports = StateMachine;

});
