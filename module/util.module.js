// util.module.js
// --------------
// 模块工具函数

define( function ( require, exports, module ) {
    var _ = require('underscore');

    // checkConfig
    // -----------
    // 配置检查函数
    // input  : 传入模块的引用
    // output : 返回检查更新后的配置
    var checkConfig = function ( callerModule ) {

        console.log( callerModule );

        // 传入的配置
        var config = callerModule.config;
        // 默认配置
        var _config = callerModule._config;
        // 必须配置项
        var need = callerModule.need;

        // 当配置改变时，重新检查配置
        if ( _.isEqual( _config, config ) ) {
            return false;
        } else {
            // 将当前配置与默认/缓存配置合并
            _.extend( _config, config );

            // 将合并的配置保存到当前配置中
            config = _config;

            // 修改传入模块的配置
            callerModule.config = config;
        }

        // 检查是否包含必须的配置项
        try {
            _.each( need, function ( em, key ) {
                if ( !_.has( config, key ) ) {
                    throw new Error( callerModule.module + '模块未配置' + key );
                }
            });

        } catch (e) {
            // 输入错误信息
            if ( window.console !== undefined ) {
                console.error( e.message );
            } else {
                alert( e.message );
            }
        } // END try catch

    }; // END checkConfig

    // verify
    // ------
    // 表单验证，for Bootstrap Form
    // 使用verification.module作为验证核心，为Bootsrap表单处理DOM
    var verify = function () {
        // 通过表单的ruler检查，并且只检查可见的表单的ruler
        var verify = require("module/verification.module");

        var $ = require('jquery');

        // 消息回调函数
        // 作为当前作用域的jQuery对象的扩展
        $.fn.msg = function ( result ) {
            if (  result.status === 0 ) {
                $(this).addClass('error').find('.help-inline').text( result.info );
            } else {
                $(this).removeClass('error').find('.help-inline').text('');
            }
        };

        $(".control-group").each( function (it) {
            // 只检查“可见”表单的ruler
            var cell = $(this).find("[ruler]:visible");
            var _this = this;

            if ( cell[0] ) {
                cell.change( function () {
                    var data = {
                        ruler : cell.attr('ruler'),
                        data  : cell.val()
                    };

                    // 验证数据，并将结果传给消息函数
                    $(_this).msg( verify.check( data ) );
                });
            } // END if

        }); // END each

    }; // END verify

    // API
    module.exports = {
        checkConfig : checkConfig,
        verify : verify
    };

});
