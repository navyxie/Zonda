// route.module.js
// ---------------
// DOM 路由器
// 但是对于路由来说，加载是一个自动的的过程，需要使用变量
// 于是使用 eval('require("' + a + '")') 实现
// 性能会受到很大的影响，先实现，再优化，或者再废弃这种方式
//
// 兼容Niko的方案，采用回调函数的形式执行
// 代码示例如下:
/**
Util.route({
	'#index' : function(){
		require.async('../app/index/-debug');
	},
	'#header' : function(){
		require.async('../app/header/-debug');
	}
});
*/

define("#util/0.0.1-dev/route/route-debug", ["jquery/1.8.0/jquery-debug", "#underscore/1.3.3/underscore-debug"], function ( require, exports, module) {
    return function ( ruler ) {
        var $ = require('jquery/1.8.0/jquery-debug');
        var _ = require('#underscore/1.3.3/underscore-debug');

        _.each( ruler, function ( action, selector ) {
            // 传入callback形式
            if ( $(selector)[0] && _.isFunction(action) ) {
                action();
            // 传入字符串，将在app目录下寻找文件，异步加载
            } else if ( $(selector)[0] && _.isString(action) ) {
                require.async( '../app/' + action );
            } // END if
        });

    }; // END return

});


/**
 * cookie模块
 * author: niko.yerya
 * ******************************************************************************
 * 代码示例
 *
 * var cookie = require('path/cookie.module-debug');
 *	
 * 设置cookie 还可跟其他参数，请详见方法注释
 * cookie.setCookie("name","yerya");
 *
 * 读取cookie
 * cookie.getCookie("name");
 *
 * 删除cookie
 * cookie.removeCookie("name");
 * 
 * 删除所有cookie
 * cookie.removeAll();
 *
 * ******************************************************************************
 *
 */

define("#util/0.0.1-dev/cookie/cookie-debug", [], function ( require, exports, module ) {

	var dom = document;

	//除去空白的工具函数
	function trim ( cookie ) {
		return cookie.replace(/^[\s]+|[\s]+$|(;)[\s]+|(=)[\s]+/,'$1');
	}

	//获取cookie值
	function getCookie ( name ) {

		//通过在docuemnt.cookie返回的所有cookie中以indexOf方法获取参数名称对应的值
		//其中 encodeURIComponent 在每次setCookie的时候都编码了，所以这里也需要编码查找
		var	cookieName = encodeURIComponent( name ) + "=",
			cookieStart = dom.cookie.indexOf( cookieName ),
			cookieValue = null;

			if ( cookieStart > -1 ) {
				var cookieEnd = dom.cookie.indexOf( ";", cookieStart );
				if ( cookieEnd == -1 ) {
					cookieEnd = dom.cookie.length;
				}
				cookieValue = decodeURIComponent( dom.cookie.substring( cookieStart + cookieName.length, cookieEnd ) );
			}

			return cookieValue;

	}//end getCookie

	//设置cookie( 名称 值 期限 URL路径 可选的域 布尔是否添加secure ),头两个参数必须
	function setCookie ( name, value, expires, path, domain, secure ) {

		var cookieText = encodeURIComponent( name ) + "=" + encodeURIComponent( value );

		if ( expires instanceof Date ) {
			cookieText += "; expires=" + expires.toGMTString();
		}

		if ( path ) {
			cookieText += "; path=" + path;
		}

		if ( domain ) {
			cookieText += "; domain=" + domain;
		}

		if ( secure ) {
			cookieText += "; secure"
		}

		dom.cookie = cookieText;
	}//end setCookie

	//删除cookie值，将cookie时间设置为0即可
	function removeCookie ( name, path, domain, secure ) {
		setCookie( name, "", new Date(0), path, domain, secure );	
	}

	//删除所有cookie
	function removeAllCookie () {

		var cookieText = dom.cookie,	
			arr = cookieText.split("=");

		for ( var i=arr.length; i--; ) {
			var newArr = arr[i].split(';');	
			if ( newArr.length > 1 ) {
				removeCookie( trim ( newArr[1] ) );
			} else {
				removeCookie( trim ( newArr[0] ) );
			}
		}

	}//end removeAllCookie

	//对外接口
	module.exports = {
    	set: setCookie,
    	get: getCookie,
    	remove: removeCookie,
    	removeAll: removeAllCookie	
  	};

});


// gif.module.js
// -------------
// gif 加载示意
// 不可复用

define("#util/0.0.1-dev/gif/gif-debug", ["jquery/1.8.0/jquery-debug"], function( require, exports, module) {
    var $ = require('jquery/1.8.0/jquery-debug');

    var main = function () {
        $(document.body).append(
            '<div id="ajax-loader">Loading ...</div>'
        );

    };

    main.open = function () {
        $("#ajax-loader").fadeIn('fast');
        return this;
    };

    main.close = function () {
        $("#ajax-loader").fadeOut('slow');
        return this;
    };

    main();

    // API
    module.exports = main;

});


// dialog.module.js
// ----------------
// 基于Bootstrap的对话框封装
//
// 依赖 bootstrap,jquery
// 默认dialog模板为bootstrap modal模板
//
// Usage:
/**
var Util = require('util-debug');

// 配置
Util.dialog({
    title : 'dialog标题' ,
    content : 'dialog内部html或者文本', // 这里将会向dialog内部嵌入编译好的HTML
    button : {  // 按钮，会实例化为按钮对象，绑定点击事件到后面的callback
         '提交' : function() {...},
         '更多' : function() {...}
         // ...
    },
    css : {
        height: 200,
        color: '#fff'
    } // 传入css，API参照jQuery $('#sel').css()
});

// 打开dialog
Util.dialog.open();

// 关闭dialog
Util.dialog.close();

// 延时1300毫秒关闭
Util.dialog.close(1300);

// 链式调用
Util.dialog.open().close(1300);

*/

define("#util/0.0.1-dev/dialog/dialog-debug", ["bootstrap/2.1.0/bootstrap-debug", "#underscore/1.3.3/underscore-debug"], function( require, exports, module ){
    var $ = require('bootstrap/2.1.0/bootstrap-debug');
    var _ = require('#underscore/1.3.3/underscore-debug');

    // 准备模板
    var dialogTPL = '<div class="modal" id="dialog" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button><h3 id="myModalLabel"><%= title %></h3></div><div class="modal-body"><%= content %></div><div class="modal-footer"><button class="btn" data-dismiss="modal" aria-hidden="true">取消</button></div></div>';

    // dialog对象构造函数
    var Constructor = function ( config ) {

        // 已存在dialogDOM时，不打开新窗口
        if ( $("#dialog:visible")[0] ) {
            return false;
        }

        // 插入对话框
        $(document.body).append(
            _.template( dialogTPL, {
                'title' : config.title,
                'content' : config.content
            }) // 模板编译
        );

        // 自定义css
        if ( config.css ) {
            $("#dialog").css( config.css );
        }

        // 动态创建button
        _.each( config.button, function ( callback, buttonName ) {
            // 生成唯一ID
            var uid = _.uniqueId('dialog-button-');

            // 插入<button>
            $("#dialog .modal-footer").append(
                '<button id="' + uid + '" class="btn btn-success">' +
                buttonName +
                '</button>'
            );

            // 绑定click事件
            $( "#" + uid ).click( callback );
        });

        // 关闭窗口时摧毁dialog对象
        $("#dialog").on( 'hide', function(){
            delete $("#dialog").modal;
            $("#dialog").remove();
        });

        return this;

    }; // END Constructor

    // 打开窗口方法
    Constructor.open = function () {
        $("#dialog").modal({
            'show' : true,
            'backdrop' : false
        });

        return this;
    };

    // 关闭窗口方法
    Constructor.close = function ( delay ) {

        if ( delay ) {
            // 延时关闭
            setTimeout(function() {
                $("#dialog").modal('hide');
            }, delay);

        } else {
            $("#dialog").modal('hide');
        }
    };

    // API
    module.exports = Constructor;

});


/**
 * 数据验证模块 verification.js
 * author : Degas
 *
 * API:
 *  check { Function } : 方法；验证数据，接受并返回以下参数；函数
 *      input { Array/Object } : 接受参数；待验证数据，对象包括以下两个成员；对象或数组
 *          input[i].ruler { String/JSON } : 接受参数；验证规则；JSON字符串
 *          input[i].data { String/Other } : 接受参数；待验证参数；各种格式
 *      output { Object } : 返回参数；验证结果，包括以下两个成员；对象
 *          output.status { Number } : 返回参数；验证通过为‘1’，失败为‘0’；对象成员，数字
 *          output.info { String } : 返回参数；验证信息；对象成员，字符串
 *
 *  验证模块使用方法：
 *
 * 验证规则以JSON字符串的形式写在HTML或TPL中
 *  在需要被验证的input/select的节点上加上属性verification，示例如下：
 *  ruler = "{'required':true,'type':'email'}"
 *  或
 *  ruler = "{'required':true,'type':'select','vacancy':'_0'}"
 *
 *  参数说明：
 *  required 值为true或false，若为true，则此项为必填写项
 *  vacancy 值为某个制定的字符串或者数字，表示此表单已填写的默认值
 *  type 值为email，number，分别验证是否为电子邮箱和数字（数字允许出现‘-’）
 *  type 值为select，则将验证该select是否选择，
 *      此时将当前表单已经填写的数据对比vacancy的值，若值为vacancy默认值，
 *      则表示此select未选择，验证不通过
 */

define("#util/0.0.1-dev/verify/verification-debug", ["#underscore/1.3.3/underscore-debug", "jquery/1.8.0/jquery-debug"], function ( require, exports, module ) {
    // 加载Underscore模块
    var _ = require('#underscore/1.3.3/underscore-debug');
    
    // 加载jQuery模块
    var $ = require('jquery/1.8.0/jquery-debug');

    // 数据分类处理，错误信息输出
    // 检查待验证数据格式，为单个数据或一组数据
    var main = function ( input ) {
        // 返回结果
        var result = {};
        var tmp = {};

        try {
            // 一组数据
            if ( _.isArray( input ) ) {
                for ( var i = 0; i < input.length; i++ ) {
                    // 调用check检测
                    tmp = check( input[i].name, input[i].data, input[i].ruler, input[i].title );

                    if ( tmp.status === 0 ) {
                        return tmp;
                    } else {
                        result[ input[i].name ] = input[i].data;
                    }
                } // END for

            // 单个数据
            } else if ( _.isObject( input ) ) {
                // 调用check检测
                tmp = check( input.name, input.data, input.ruler, input.title );

                if ( tmp.status === 0 ) {
                    return tmp;
                } else {
                    result = input;
                }

            } else if ( _.isEmpty( input ) ) {
                throw new Error('待验证数据为空!');
            } else {
                throw new Error('待验证数据格式不正确!');
            }
        } catch (e) {
            if ( typeof console !== undefined ) {
                console.error( e.message );
            } else {
                console = {};
                alert( e.message );
            }
        }

        // 返回数据
        return result;

    };// END  检查数据

    // 验证方法 check
    // 验证规则
    var check = function ( name, data, ruler, title ) {
        var result = {};
        //ruler = eval( '(' + ruler + ')' );
        // 使用JSON方式解析
        ruler = JSON.parse( ruler );

        if ( title === undefined ) {
            title = '此项';
        }

        // 是否允许为空
        if ( ruler.required && /^\s*$/.test( data ) ) {
            result.info = title + '不能为空';
            result.status = 0;
            return result;
        }

        // 数据类型为数字
        if ( ruler.type === 'number' && !/^(\d{1,}-){0,}\d*$/.test( data ) ) {
            result.info = title + '格式不是数字';
            result.status = 0;
            return result;
        }

        // 数据类型为邮箱
        if ( ruler.type === 'email' && !/^\w{1,}@.{1,}\.{1,}\w{1,}$/.test( data ) ) {
            result.info = title + '格式不为Email';
            result.status = 0;
            return result;
        }

        // 验证select表单
        if ( ruler.type === 'select' && ruler.vacancy === data ) {
            result.info = title + '未选择';
            result.status = 0;
            return result;
        }

        // 验证全部通过
        result.status = 1;
        result.info = title + '通过验证';

        return result;
    };// END check

    // API / 对外接口
    module.exports = {
        check : main
    };

});


// verify.module.js
// ----------------
// 表单验证，for Bootstrap Form
// 使用verification.module作为验证核心，为Bootsrap表单处理DOM

define("#util/0.0.1-dev/verify/verify-debug", ["./verification-debug", "#underscore/1.3.3/underscore-debug", "jquery/1.8.0/jquery-debug"], function ( require, exports, module ) {

    var _ = require('#underscore/1.3.3/underscore-debug');

    var verify = function ( type ) {
        // 验证结果
        // 数组，如果该数组含有0则表明某项数据验证失败
        var re = [];

        // 通过表单的ruler检查，并且只检查可见的表单的ruler
        var verify = require('./verification-debug');

        var $ = require('jquery/1.8.0/jquery-debug');

        // 消息回调函数
        // 作为当前作用域的jQuery对象的扩展
        $.fn.msg = function ( result ) {
            if (  result.status === 0 ) {
                $(this).addClass('error').find('.help-inline').text( result.info );

                // 正在进行全部表单检查出错，则聚焦到此错误表单，并返回false
                if ( type === 'all' ) {
                    // 向结果中加入一个错误标记
                    re.push(0);
                }

            } else {
                $(this).removeClass('error').find('.help-inline').text('');
            }
        }; // END msg

        // 为需要验证的表单项绑定事件
        $(".control-group").each( function () {
            // 只检查“可见”表单的ruler
            var cell = $(this).find("[ruler]:visible");
            var _this = this;

            if ( cell[0] ) {
                // 绑定 change 事件
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

        // 检查所有表单项目，直到遇到错误的表单，停止，聚焦
        if ( type === 'all' ) {
            // 清空验证结果
            re = [];

            // 遍历所有需要检查的表单
            $(".control-group").each( function () {
                // 只检查“可见”表单的ruler
                var cell = $(this).find("[ruler]:visible");
                var _this = this;

                if ( cell[0] ) {

                    var data = {
                        ruler : cell.attr('ruler'),
                        data  : cell.val()
                    };

                    // 验证数据，并将结果传给消息函数
                    return $(_this).msg( verify.check( data ) );

                } // END if

            }); // END each
        }

        // 结果分析，返回
        if ( _.include( re, 0 ) ) {
            $(".control-group.error").eq(0).find('[ruler]:visible').focus();
            return false;
        } else {
            return true;
        }

    }; // END verify

    // API
    module.exports = verify;

});


// state.machine.module.js
// ---------------
// 状态机
//
// Usage:
//
/**
    var Util = require('util-debug');
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

define("#util/0.0.1-dev/stateMachine/stateMachine-debug", ["jquery/1.8.0/jquery-debug"], function ( require, exports, module) {
    var $ = require('jquery/1.8.0/jquery-debug');

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


// right.click.menu.module.js
// ----------------
// 基于Bootstrap Dropdown Menu的右键菜单封装
//
// 依赖 bootstrap,jquery
// 默认菜单模板为Bootstrap Mrop Menu模板
//
// Usage:
/**
var Util = require('util-debug');

// 配置
Util.rightClickMenu({
    scope : '#sel',
    option : {
        '新建列表' : function () {
            alert(1);
        },
        '删除' : function () {
            alert(2);
        }
    }
});
*/

define("#util/0.0.1-dev/rightClickMenu/rightClickMenu-debug", ["bootstrap/2.1.0/bootstrap-debug", "#underscore/1.3.3/underscore-debug"], function( require, exports, module ){
    var $ = require('bootstrap/2.1.0/bootstrap-debug');
    var _ = require('#underscore/1.3.3/underscore-debug');

    // 插入菜单
    $(document.body).append(
        '<ul id="right-click-menu" class="dropdown-menu" style="display:none;" role="menu" aria-labelledby="dropdownMenu"></ul>'
    );

    // 点击隐藏事件
    $(window).click(function (event) {
        if ( event.button !== 2 ) {
            $("#right-click-menu").empty().hide();
        }
    });

    // 主控制器
    var main = function ( config ) {

        // 右键事件
        $( config.scope ).contextmenu(function (event) {
            event.stopPropagation();

            // 调用菜单控制
            menu(event, config);

            // 禁用浏览器右键
            return false;
        });

    }; // END main

    // 菜单控制
    var menu = function ( event, config ) {

        // 右键事件发生DOM
        var $target = $(event.target);

        // 寻找目标DOM
        $target.parents().each(function () {
            if ( _.include( $(config.target), $(this)[0] ) ) {
                $target = $(this);
            }
        });

        // 右键非选项的DOM，跳出
        if ( !_.include( $(config.target), $target[0] ) ) {
            return false;
        }

        // 显示菜单，并跟随鼠标
        $("#right-click-menu").empty().css({
            'top' : event.clientY,
            'left': event.clientX,
            'display' : 'block'
        });

        // 动态生成菜单选项
        _.each( config.option, function ( callback, optionName ) {
            // 生成唯一ID
            var uid = _.uniqueId('right-click-menu-option-');

            // 插入<button>
            $("#right-click-menu").append(
                '<li><a href="javascript:;" id="' + uid + '" class="right-click-menu-li">' +
                optionName +
                '</a></li>'
            );

            // 事件托管
            $("#right-click-menu").delegate('#'+ uid, 'click', function () {
                event.stopPropagation();
                $("#right-click-menu").hide().undelegate('click');

                // 执行选项回调
                callback( $target );
            });

        }); // END 动态生成

    }; // END 菜单控制

    // API
    module.exports = main;

});


// ajax.module.js
// --------------
// 封装jQuery的ajax API

define("#util/0.0.1-dev/ajax/ajax-debug", ["../dialog/dialog-debug", "jquery/1.8.0/jquery-debug", "bootstrap/2.1.0/bootstrap-debug", "#underscore/1.3.3/underscore-debug"], function( require, exports, module ) {
    var $ = require('jquery/1.8.0/jquery-debug');
    var dialog = require('../dialog/dialog-debug');

    $.ajaxSetup({
        type : 'POST',
        error : function (error) {
            dialog({
                title : '发生错误了！！',
                content : error.responseText
            });

            dialog.open();
        }
    });

    // API
    module.exports = $.ajax;

});


/**
 * slide.js
 * 幻灯片模块
 *
 * init: 方法，初始化slide实例，若需要page，则生成page，配置完毕后，须执行初始化init
 *
 * play: 方法，自动播放幻灯片
 * pause: 方法，停止播放幻灯片
 *
 * next: 方法，下一个
 * prev: 方法，上一个
 *
 * 配置参数如下：
 * slideDOM: DOM，必须参数，除此之外的配置参数为可选，
 *           作为slide的<ul>，该<ul>下的所有<li>将作为幻灯片播放
 *
 * slideLength: Number，幻灯片数目
 *
 * speed: Number，毫秒数，切换的速度
 *
 * pageDOM: DOM，将作为slide的页码的<ul>，
 *          模块会根据slideDOM的<ul>中的<li>的数量自动生成Page<li>插入到pageDOM中
 *
 * pageNum: true/false，是否在page上显示页码数字
 *
 * pageThumb : true/false, 是否在page上显示幻灯片缩略图
 *
 * animation: String，动画方式
 *
 * cutover : true/false，是否在page中加上“上一个”和“下一个”按钮
 *
 * ******************************************************************************
 * 代码示例
 *
 * var slide = require('path/slide.module-debug');
 *
 * 配置
 * slide.config = {
 *  slideDOM : document.getElementById('slider'),
 *  pageDOM  : document.getElementById('page'),
 *  speed    : 1200,
 *  ...
 * }
 *
 * 配置完毕，初始化
 * slide.init();
 *
 * 绑定事件
 * $("#play").click( function() {
 *  slide.play();
 * });
 *
 * ******************************************************************************
 *
 * 如果在页面上有多个slide，则使用下面的方法获得多个slide实例
 * seajs.use( 'path/slide.module', function ( slide ) {
 *
 *  slide.config = {
 *      ...
 *  };
 *
 *  slide.init();
 *
 *  ...
 *
 * });
 *
 */
define("#util/0.0.1-dev/slide/slide-debug", ["#underscore/1.3.3/underscore-debug", "jquery/1.8.0/jquery-debug"], function ( require, exports, module ) {
    var _ = require('#underscore/1.3.3/underscore-debug');
    var $ = require('jquery/1.8.0/jquery-debug');

    // 配置,初始置为空
    exports.config = {};

    // 必须的参数
    var need = {
        slideDOM : ''
    };

    // 默认配置 / 模块内部缓存配置
    var _config = {
        speed     : 2000,
        pageDOM   : null,
        pageNum   : false,
        pageThumb : false,
        animation : 'fade',
        cutover   : false
    };

    /**
     * 检查配置，并重写配置
     */
    var checkConfig = function ( ) {
        // 当配置改变时，重新检查配置
        if ( _.isEqual( _config, exports.config ) ) {
            return false;
        } else {
            // 将当前配置与默认/缓存配置合并
            _.extend( _config, exports.config );

            // 将合并的配置保存到当前配置中
            exports.config = _config;
        }

        // 检查是否包含必须的配置项
        try {
            _.each( need, function ( em, key ) {
                if ( !_.has( exports.config, key ) ) {
                    throw new Error('Slide模块未配置' + key );
                }
            });

        } catch (e) {
            if ( window.console !== undefined ) {
                console.error( e.message );
            } else {
                alert( e.message );
            }
        }

    }; // END checkConfig

    // 是否停止自动播放
    var autoPlay = true;

    // 计时器
    var timer;

    // 当前页码
    var onPage = -1;

    // 缓存幻灯片以及幻灯片页码的jQuery对象
    var slideArr;
    var pageArr;

    // Play 方法
    exports.play = function ( page ) {
        // 计数器置空
        clearTimeout( timer );

        // 传入了page参数，则跳到page指定的幻灯片
        if ( page !== undefined ) {
            // 将当前页码置为传入的page
            onPage = Math.abs( page );

            // 显示幻灯片
            // 根据选择的效果不同，采用不同的方式渲染
            // 淡入淡出 fade
            if ( exports.config.animation === 'fade' ) {
                slideArr.fadeOut('slow');
                slideArr.eq( onPage ).stop().fadeIn('slow');
            // 淡出后，再淡入
            } else if ( exports.config.animation === 'callBackFade' ) {
                slideArr.fadeOut('fast', function () {
                    slideArr.eq( onPage ).fadeIn('fast');
                });
            // 未实现的效果，则直接hide/show
            } else {
                slideArr.hide();
                slideArr.eq( onPage ).show();
            }

            if ( pageArr ) {
                // 当前页码加亮
                pageArr.removeClass('on');
                pageArr.eq( onPage ).addClass('on');
            }

        // 无参数，则从onPage对应的幻灯片开始
        } else {
            // 幻灯片播放到最后一张时，跳至第一张
            if ( onPage === (exports.slideLength -1) ) {
                exports.play( 0 );
            } else {
                // 播放下一张
                onPage = onPage +1;

                exports.play( onPage );
            }

            // 不执函数体末尾的延时递归
            return false;
        }

        // 如果当前幻灯片为开头或末尾，则“next”和“prev”按钮加上class
        if ( onPage === 0 && exports.config.cutover ) {
            $( exports.config.pageDOM ).find('.prev').addClass('beginning');
            $( exports.config.pageDOM ).find('.next').removeClass('end');
        } else if ( onPage === (exports.slideLength -1) && exports.config.cutover ) {
            $( exports.config.pageDOM ).find('.next').addClass('end');
            $( exports.config.pageDOM ).find('.prev').removeClass('beginning');
        } else {
            $( exports.config.pageDOM ).find('.prev').removeClass('beginning');
            $( exports.config.pageDOM ).find('.next').removeClass('end');
        }

        // 自动播放，切换速度按照配置执行
        if ( autoPlay ) {
            timer = setTimeout( function () {
                exports.play();
            }, exports.config.speed );
        }

    }; // END play

    // Stop 方法
    exports.pause = function () {
        if ( autoPlay ) {
            autoPlay = false;

            // 停止回调play方法
            clearTimeout( timer );
        } else {
            autoPlay = true;

            exports.play();
        }
    }; // END stop

    // Next 方法
    exports.next = function () {
        // 当前显示的幻灯片不为最后一张时，onPage加1
        if ( onPage !== (exports.slideLength -1) ) {
            onPage = onPage +1;
        }

        exports.play( onPage );
    }; // END next

    // Prev 方法
    exports.prev = function () {
        // 不为第一张时，onPage减1
        if ( onPage !== 0 ) {
            onPage = onPage -1;
        }

        exports.play( onPage );
    }; // END prev

    // TODO
    // 为多 li 幻灯片分组
    // 对于幻灯片单元为列表的幻灯片进行分割，可配置
    exports.cutCell = function ( num ) {
        if ( num <= 0  ) {
            return 0;
        } else {
            console.log( exports.slideLength % num );
        }
    };

    /**
     * init 方法
     * 初始化slide
     */
    exports.init = function () {
        // 检查配置
        checkConfig();

        // 将幻灯片个数缓存到模块配置中
        exports.slideLength = $( exports.config.slideDOM ).find('>li').size();

        // 缓存单张幻灯片的jQuery对象
        slideArr = $( exports.config.slideDOM ).find('>li');

        // 当传入了page的DOM并且幻灯片数量大于1时，生成page，next，prev
        if ( exports.config.pageDOM !== null && exports.slideLength > 1 ) {
        
            // 生成slide page
            var li;

            slideArr.each( function (i) {
                if ( exports.config.pageNum ) {
                    // 有页码的page
                    li = '<li><a class="slide-page-cell" page="' + i + '">' + i + '</a></li>';
                } else if ( exports.config.pageThumb ) {
                    // 有缩略图的page
                    li = '<li><a class="slide-page-cell" page="' + i + '"><img src="' + $(this).find('img').attr('src') + '" /></a></li>';
                } else {
                    // 无页码，无缩略图的page
                    li = '<li><a class="slide-page-cell" page="' + i + '"></a></li>';
                }

                $( exports.config.pageDOM ).append( li );

            });

            // 在page中生成“next”和“prev”按钮
            if ( exports.config.cutover ) {
                $( exports.config.pageDOM ).prepend( '<li><a class="prev"></a></li>' );
                $( exports.config.pageDOM ).append( '<li><a class="next"></a></li>' );

                // 为“next”和“prev”按钮绑定事件
                $( exports.config.pageDOM ).find('.next').click( function () {
                    exports.next();
                });

                $( exports.config.pageDOM ).find('.prev').click( function () {
                    exports.prev();
                });
            }

            // 缓存幻灯片页码的jQuery对象
            pageArr = $( exports.config.pageDOM ).find('li');

            // 为页面绑定点击事件，点击的时候调用play方法
            pageArr.each( function () {
                var page = $(this).find('a.slide-page-cell').attr('page');

                $(this).click( function () {
                    exports.play( page );
                });
            });

        } // END if

        // 初始化结束，执行自动播放
        exports.play();

    }; // END init

});


/**
 * Tips模块
 * author: niko.yerya
 * ******************************************************************************
 * 代码示例
 * [ 单个 ]
 * var Tips = require('tips.module-debug');
 * Tips.one({"target":node,"content":"niko.yerya","action":"hover","name":"tips-box","atuo":true});
 *
 * [ 多个-其中content和action取决于你的html中的属性，单个也支持，但是多个的更能体现优势 ]
 * var Tips = require('tips.module-debug');
 * Tips.some({"target":node});
 *
 * 样式可以自己设定，content可以传入标签创建，例如（多个的话，能够自定义）：
 * <span class="test" tips-info="1" tips-action="hover" >tips test</span>
 *
 * ******************************************************************************
 *
 */

define("#util/0.0.1-dev/tips/tips-debug", [], function ( require, exports, module ) {

	var dom = document;

	//初始化，传递参数
	function init ( userConfigs ) {
		userConfigs.target = userConfigs.target.find ? userConfigs.target[0] : userConfigs.target;
		userConfigs.content = userConfigs.content || "niko-yerya"; 
		userConfigs.action = userConfigs.action || "hover";
		userConfigs.name = userConfigs.name || "tips-box";
		userConfigs.auto = userConfigs.auto || true;
		createTips( userConfigs );
	}

	//多个类型
	function some ( userConfigs ) {

		(function(){
			var configs = userConfigs;
			var targets = userConfigs.target;
			for( var i = targets.length; i--; ) {
				configs.target = targets[i];
				init(configs);
			}
		})();

	}

	//创造Tips
	function createTips ( userConfigs ) {

		var tipsNode = dom.createElement("span");
			tipsNode.className = userConfigs.name;

		addClass( userConfigs.target, "tips-wrap" );

		if ( userConfigs.target.getAttribute("tips-info") ) {

			tipsNode.innerHTML = userConfigs.target.getAttribute("tips-info");

		} else {

			tipsNode.innerHTML = userConfigs.content;

		}

		if ( userConfigs.target.getAttribute("tips-action") ) {

			userConfigs.action = userConfigs.target.getAttribute("tips-action");

		}

		if ( userConfigs.auto ) {

			userConfigs.target.style.position = "relative";
			userConfigs.target.style.cursor = "help";
			tipsNode.style.position = "absolute";
			tipsNode.style.display = "block";
			tipsNode.style.visibility = "hidden";

		}

		userConfigs.target.appendChild( tipsNode );
		controll( userConfigs );

	}

	//控制器
	function controll ( userConfigs ) {

		switch ( userConfigs.action ) {

			case "hover": 

				addEvent( userConfigs.target, "mouseover", function(event) {
					var event = event || window.event,
						target = event.target || event.srcElement;

					if( !hasClass( target, userConfigs.name ) ) {
						show( target.getElementsByClassName( userConfigs.name )[0] );
					}

				});
				addEvent( userConfigs.target, "mouseout", function(event) {
					var event = event || window.event,
						target = event.target || event.srcElement;

					if( !hasClass(target, userConfigs.name) ) {
						hide( target.getElementsByClassName( userConfigs.name )[0] );
					}
					
				});

			break;

			case "click":

				addEvent( userConfigs.target, "click", function(event) {

					var event = event || window.event,
						target = event.target || event.srcElement,
						tipsNode = target.getElementsByClassName( userConfigs.name )[0];

					if( !hasClass( target, userConfigs.name ) ) { 
						if ( hasClass( target, "tips-clicked" ) ) {
							hide( tipsNode );
							removeClass( target, "tips-clicked" );
						} else {
							show( tipsNode );
							addClass( target, "tips-clicked" );
						}
					}
					
				});

			break;

			default:
			break;
		}	

	}

	//功能函数
	function show ( target ) {
		target.style.visibility = "visible";
	}

	function hide ( target ) {
		target.style.visibility = "hidden";
	}

	//扩充getElementsByClass
	if ( !document.getElementsByClassName ) {

		Object.prototype.getElementsByClassName = function ( classText ) {

			var nodes = [],
				all = this.getElementsByTagName("*");

			for ( var i=all.length; i--; ) {
				if ( all[i].className == classText && all[i].nodeType == 1 ) {
					nodes.push( all[i] );
				}
			}

			return nodes;

		}

	}

	//添加事件
	function addEvent ( node, e, fn ) {

		if ( node.addEventListener ) {
			node.addEventListener( e, fn );	
		} else if (node.attachEvent ) {
			node.attachEvent( "on" + e, fn );
		} else {
			return false;
		}

	}

	//是否有类
	function hasClass ( node, classText ) {

		var classNameText = node.className,
			classArr = classNameText.split(" ");

		if ( classArr.indexOf( classText ) == -1 ) {
			return false;
		} else {
			return true;
		}

	}

	//添加类
	function addClass ( node, classText ) {

		if ( !hasClass( node, classText ) ) {
			node.className += " " + classText;
		}

	}

	//删除类
	function removeClass ( node, classText ) {

		if ( hasClass( node, classText ) ) {
			node.className = node.className.split(" ").join("|").replace(/^(.*)$/g,"|$1|").replace("|"+classText+"|","|").replace(/^|(.*)|$/g,"$1").replace("|"," ");
		}

	}


	module.exports = {
		one: init,
		some: some
	}


});


/**
 * scaffold.helper.js
 *
 * 栅格系统脚手架工具
 * ------------------
 *
 * makeGrid : 方法，生成遮罩当前页面的栅格系统示意图，以便于检查当前页面的栅格布局
 *            默认为960栅格系统，可通过以下三个参数生成需要的单元格
 *            接受三个参数: columnWidth（单元格宽度）
 *                          columnNum  （单元格数目）
 *                          gutterWidth（单元格间距）
 *
 * destroyGrid : 方法，摧毁已生成的栅格系统示意图
 *
 * toggleGrid : 方法，显示或隐藏栅格系统
 *
 */
define("#util/0.0.1-dev/scaffold/scaffold-debug", ["jquery/1.8.0/jquery-debug"], function ( require, exports, module ) {
    var $ = require('jquery/1.8.0/jquery-debug');

    // showGrid 显示标准栅格系统
    exports.makeGrid = function ( columnWidth, columnNum, gutterWidth ) {
        // 清除之前的栅格系统示意图
        exports.destroyGrid();

        // 设定默认值
        if ( !columnWidth || !columnNum || !gutterWidth ) {
            // 每个栅格单元的宽度
            columnWidth = 60;

            //  栅格单元总数
            columnNum   = 12;

            // 栅格单元间隔
            gutterWidth = 20;
        }

        // 栅格单元的容器
        var wrap = '<div class="scaffold-grid-wrap"></div>';

        $(document.documentElement).append( wrap );

        // 插入当前页面后，转为jQuery对象
        wrap = $(".scaffold-grid-wrap");

        // 定义栅格单元的容器样式
        wrap.css({
            // 先隐藏
            'display' : 'none',
            // 计算宽度
            'width' : ( columnWidth + gutterWidth ) * columnNum + 'px',
            // 居中
            'position' : 'absolute',
            'left' : '50%',
            'margin-left' : -1 * ( columnWidth + gutterWidth ) * columnNum / 2 + 'px',
            // 置于最前面
            'z-index' : 1000,
            'top' : 0,
            // 高度100%
            'height' : $(document.documentElement).height(),
            // 背景
            'background' : 'rgba( 255, 255, 255, 0.2)'
        });

        // 生成栅格单元
        var column = '<div class="scaffold-column"></div>';

        // 插入到栅格单元的容器中
        for ( var i=0; i < columnNum; i++ ) {
            wrap.append( column );
        } // END for

        // 定义栅格单元样式
        $(".scaffold-column").css({
            'width' : columnWidth + 'px',
            'height' : '100%',
            'float' : 'left',
            'margin-left' : gutterWidth / 2 + 'px',
            'margin-right' : gutterWidth / 2 + 'px',
            'background' : 'rgba( 0, 0, 0, 0.3)'
        });

    }; // END showGrid

    // 显示或隐藏栅格系统示意图
    exports.toggleGrid = function() {
        if ( $(".scaffold-grid-wrap")[0] ) {
            $(".scaffold-grid-wrap").slideToggle('fast');
        } else {
            if ( window.console ) {
                console.log('No Grid System Schematic!');
            }
        }
    };// END toggleGrid

    // 清除栅格系统示意图
    exports.destroyGrid = function () {
        if ( $(".scaffold-grid-wrap")[0] ) {
            // 直接删除容器DOM
            $(".scaffold-grid-wrap").remove();
        } else {
            if ( window.console ) {
                console.log('Grid System Schematic Destroy!');
            }
        }
    }; // END hideGrid

}); // END scaffold.helper


// upload.module.js
// ----------------
// 上传模块
//
// Usage : (在app目录下的应用脚本调用)
//
// HTML
/**
<form id="upload-form" target="upload_iframe_hidden" method="POST" name="file-upload-form" action="/attach/addfile" enctype="multipart/form-data">
    <input id="upload-input-file" name="file" type="file" multiple="multiple" />
</form>
<iframe id="upload_iframe_hidden" name="upload_iframe_hidden" style="display:none" src="" frameborder="0"></iframe>
*/

// Javascript
/**
var FILE = require('../module/file-debug');

FILE.config = {
    url : 'server', // {STRING} 请求服务器脚本
    fileType : 'png, bmp, zip, rar', // {STRING} 允许上传的文件类型，暂不支持正则
    fileList : $('#upload-block ul')[0], // {DOM} 实例化后的file对象<li>，将插入的目标<ul>
    msg : function ( msg ) { console.log(msg) }, // {FUNCTION}, {msg: OBJECT} 消息回调函数，处理'文件格式错误'等消息，返回参数'msg'，为对象
    uploadForm : $("#upload-form")[0] // {DOM} 为兼容IE浏览器，需要使用<form>配合隐藏<iframe>的方式模拟异步上传文件
                                      // 所以在IE下使用upload模块时，需要先在页面中写好异步上传的<form>，<input:file>和<iframe:hidden>
};

FILE.upload( files ); // {files: HTML5 files 对象} 将HTML5的'files'对象传入upload方法，并启动上传

// 监听upload模块loading事件
// 在开始上传文件时触发
FILE.loading( function ( msg ) {
    $("#load-gif").fadeIn('fast');
});

// 监听upload模块ready事件
// 在全部文件上传完毕后触发
FILE.ready( function ( msg ) {
    $("#load-gif").stop().fadeOut('fast');
});

*/

define("#util/0.0.1-dev/upload/upload-debug", ["#underscore/1.3.3/underscore-debug", "jquery/1.8.0/jquery-debug", "#backbone/0.9.2/backbone-debug", "$-debug"], function( require, exports, module ) {
    // 加载 Underscore 模块
    var _ = require('#underscore/1.3.3/underscore-debug');

    // 加载 jQuery 模块
    var $ = require('jquery/1.8.0/jquery-debug');

    // 加载 Backbone 模块
    var Backbone = require('#backbone/0.9.2/backbone-debug');

    // 用 Backbone 为 exports 做扩展
    _.extend( exports, Backbone.Events );

    // 自定义 loading 模块事件
    exports.loading = function ( callBack ) {
        // 监听 upload 模块 loading 事件
        exports.on('loading', function ( msg ) {
            callBack( msg );
        });
    };

    // 自定义 ready 模块事件
    exports.ready = function ( callBack ) {
        // 监听 upload 模块 ready 事件
        exports.on('ready', function ( msg ) {
            callBack( msg );
        });
    };

    // 配置,初始置为空
    exports.config = {};

    // 必须的参数
    var need = {
        url      : '',
        fileType : '',
        fileList : '',
        msg      : ''
    };

    // 如果为IE浏览器，则需要配置文件上传表单
    if ( $.browser.msie ) {
        need.uploadForm = '';
    }

    // 默认配置 / 模块内部缓存配置
    var _config = {
        fileTpl  : '<li><a href="" target="_blank"><%= fileName %></a>&nbsp;&nbsp;<progress></progress><span class="delete red"> &times; </span></li>'
    };

    /**
     * 检查配置，并重写配置
     */
    var checkConfig = function ( ) {
        // 当配置改变时，重新检查配置
        if ( _.isEqual( _config, exports.config ) ) {
            return false;
        } else {
            // 将当前配置与默认/缓存配置合并
            _.extend( _config, exports.config );

            // 将合并的配置保存到当前配置中
            exports.config = _config;
        }

        // 检查是否包含必须的配置项
        try {
            _.each( need, function ( em, key ) {
                if ( !_.has( exports.config, key ) ) {
                    throw new Error('上传文件模块未配置' + key );
                }
            });

        } catch (e) {
            if ( window.console !== undefined ) {
                console.error( e.message );
            } else {
                alert( e.message );
            }
        }

        // 解析文件类型为数组
        if ( _.isString( exports.config.fileType ) ) {
            // 去掉空格
            exports.config.fileType = exports.config.fileType.replace(/\s{1,}/g, '');
            // 分割成数组
            exports.config.fileType = exports.config.fileType.split(',');
        }

    }; // END checkConfig

    /**
     * checkFileType 内部方法检查文件类型
     * 接受参数: fileList 文件对象
     * 返回符合要求的文件数组
     */
    var checkFileType = function ( fileList ) {
        // 错误消息队列
        var error_msg = [];

        // 正确文件队列
        var correctFileList = [];
        
        // 检查是否为文件夹
        if ( fileList.length !== undefined && fileList.length === 0 ) {
            error_msg.push( '暂不支持直接上传文件夹，请压缩后上传<br />' );
        } else if ( $.browser.msie ) {
            //兼容IE，检测文件名
            var name = $( exports.config.uploadForm ).find('input:file').val().split('.');
            // 后缀，转换为小写
            var suffix = _.last( name ).toLowerCase();

            if ( !_.include( exports.config.fileType, suffix ) ) {
                error_msg.push( '<span class="black">[ ' + name + ' ]</span> 为不允许上传的文件类型<br />' );

                exports.config.msg({
                    'status' : 0,
                    'info'   : error_msg.toString()
                });

                return 0;
            } else {
                // 正确格式的文件压入新的文件队列
                return 1;
            }
        }// END 兼容性 IE

        _.each( fileList, function ( file, key ) {
            var nameArr = file.name.split('.');
            // 后缀，转换为小写
            var suffix = _.last( nameArr ).toLowerCase();

            // 无后缀名
            if ( nameArr.length === 1 ) {
                error_msg.push( '<span class="black">[ ' + file.name + ' ]</span> 无后缀名，请重新选择<br />' );
            } else {
                if ( !_.include( exports.config.fileType, suffix ) ) {
                    error_msg.push( '<span class="black">[ ' + file.name + ' ]</span> 为不允许上传的文件类型<br />' );
                } else {
                    // 正确格式的文件压入新的文件队列
                    correctFileList.push( file );
                }
            } // END if
        }); // END each

        if ( error_msg.length === 0 ) {
            exports.config.msg({
                'status' : 1,
                'info'   : 'success'
            });

        } else {
            // 输出错误消息
            exports.config.msg({
                'status' : 0,
                'info'   : error_msg.toString()
            });
        }

        //返回正确的文件队列
        return correctFileList;

    };// END checkFileType

    /**
     * 获得后端需要的文件类型
     */
    var conv_fileType = function ( fileName ) {
        // 分割文件名
        var nameArr = fileName.split('.');
        // 后缀，转换为小写
        var suffix = _.last( nameArr ).toLowerCase();

        var image = ['jpeg', 'jpg', 'png', 'gif', 'bmp'];
        var doc   = ['doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx'];

        if ( _.include( image, suffix ) ) {
            return '1';
        } else if ( _.include( doc, suffix ) ) {
            return '2';
        } else {
            return '3';
        }

    }; // END conv_fileType

    /**
     * 文件DOM形态构造器
     * 属性:
     *     fileType : 文件类型
     *     fileName : 文件名
     *     filePath : 在服务器上的位置
     * 方法：
     *     delete   : 删除DOM形态
     *     loading  : 上传状态
     */
    var DOM = function ( fileName, fileType, fileSize ) {
        this.fileName = fileName;
        this.fileType = fileType;
        this.fileSize = fileSize;

        // 加载模板文件并编译
        var file_DOM = _.template( exports.config.fileTpl, this);

        // 插入文件DOM列表中
        $( exports.config.fileList ).prepend( file_DOM );

        // 获得该DOM节点
        this.dom = $( exports.config.fileList ).find('li').eq(0);

        var _this = this;

        // 绑定事件删除该节点
        $( this.dom ).find('.delete').click( function() {
            _this.dom.remove();
        });

        return this;
    };

    /**
     * 兼容IE的上传方法适配
     */
    // 目标iframe缓存
    var uploadIframe = null;

    // 当前正在上传的文件(文件名)
    var uploadCurrentFileName;

    // ieUpload 内置方法，使用同步表单+iframe形式模拟AJAX提交
    var ieUpload = function () {
        // 获取input:file中要上传的文件名，赋给uploadCurrentFileName
        uploadCurrentFileName = $( exports.config.uploadForm ).find('input:file').val();

        // 检查要上传的文件类型是否配置要求
        if ( !checkFileType( uploadCurrentFileName ) ) {
            return false;
        }

        exports.trigger('loading', 'Sending...');

        // 根据配置（同步表单的target）取得返回结果用的iframe，并缓存（性能）
        if ( uploadIframe === null ) {
            uploadIframe = $( 'iframe[name="' + exports.config.uploadForm.target + '"]' );
        }

        // 为该iframe绑定事件，根据配置提供的同步文件上传form的target确定目标iframe
        if ( uploadIframe.attr( 'isBind' ) !== 'yes' ) {
            // 绑定成功后为iframe加上属性 isBind=true，防止再次绑定
            uploadIframe.attr( 'isBind', 'yes' );

            uploadIframe.on( 'load', function () {
                // 初始化文件DOM形态
                var File = new DOM( uploadCurrentFileName );

                try {
                    var data = window.frames[ exports.config.uploadForm.target ].data;

                    if ( data.status === 1 ) {
                        File.dom.find('a').attr('href', data.data.url );

                        exports.trigger('ready', 'Ready');
                    } else {

                        exports.config.msg({
                            'status' : 0,
                            'info'   : '发生错误: ' + File.fileName + data.info
                        });

                        File.dom.remove();

                        exports.trigger('ready', 'Error');
                    }

                } catch (e) {

                    exports.config.msg({
                        'status' : 0,
                        'info'   : '发生错误: ' + File.fileName + e
                    });

                    File.dom.remove();

                    exports.trigger('ready', 'Error');
                }
            });
        } // END bind event

        // JS提交表单
        $( exports.config.uploadForm ).submit();

    }; // END ieUpload

    // upload 对外方法，接受文件对象，并发送文件到服务器
    exports.upload = function ( fileList ) {
        // 检查配置是否满足要求
        checkConfig();

        // 如果为IE浏览器，则使用ieUpload方法上传
        if ( $.browser.msie ) {
            ieUpload();
            return false;
        }

        // 检查要上传的文件类型是否配置要求
        var correctFileList = checkFileType( fileList );

        // 初始化文件的DOM形态,并上传到服务器
        _.each( correctFileList, function ( file, key) {
            // 转化为DOM形态
            var File = new DOM( file.name, file.type, file.size );

            // 对每个文件建立XHR,以及FormData
            var XHR  = new XMLHttpRequest();
            var FileData = new FormData();

            // 将数据加入表单中
            FileData.append( 'file', file );
            FileData.append( 'upload_type', conv_fileType( file.name ) );

            // 向服务器声明以AJAX的方式发送，期望获得AJAX返回
            FileData.append( 'ajax', 1 );

            XHR.open( 'POST', exports.config.url, true );

            exports.trigger('loading', 'Sending');

            // 进度条
            if ( $( File.dom ).find('progress')[0] ) {
                var progress   = $( File.dom ).find('progress')[0];
                progress.min   = 0;
                progress.max   = 100;
                progress.value = 0;

                XHR.onload = function() {
                    $( progress ).hide();
                };

                XHR.upload.onprogress = function ( event ) {
                    if ( event.lengthComputable ) {
                        progress.value =
                        progress.innerHTML = ( event.loaded / event.total * 100 || 0 );
                    }
                };
            } // END progress

            // 获得文件在服务器上的位置
            XHR.onreadystatechange = function () {
                if ( XHR.readyState === 4 ) {
                    try {
                        // 尝试解析JSON返回结果
                        var data = $.parseJSON( XHR.response );

                        if ( data.status === 1 ) {
                            // 以属性的形式将该文件在服务器上的url添加到文件的DOM形态中
                            File.dom.find('a').attr('href', data.data.url);

                            exports.trigger('ready', '完成');
                        } else {

                            exports.config.msg({
                                'status' : 0,
                                'info'   : '发生错误: ' + File.fileName + data.info
                            });

                            File.dom.remove();

                            exports.trigger('ready', 'Error');
                        }
                    } catch (e) {

                        exports.config.msg({
                            'status' : 0,
                            'info'   : '发生错误: ' + e
                        });

                        exports.trigger('ready', 'Error');
                    }// END try catch
                }
            };

            // 上传
            XHR.send( FileData );

        });

    }; // END upload

});


/**
 * util.js
 * 框架组件
 */
define("#util/0.0.1-dev/util-debug", ["./route/route-debug", "./cookie/cookie-debug", "./gif/gif-debug", "./dialog/dialog-debug", "./verify/verification-debug", "./verify/verify-debug", "./stateMachine/stateMachine-debug", "./rightClickMenu/rightClickMenu-debug", "./ajax/ajax-debug", "./slide/slide-debug", "./tips/tips-debug", "./scaffold/scaffold-debug", "./upload/upload-debug", "jquery/1.8.0/jquery-debug", "#underscore/1.3.3/underscore-debug", "bootstrap/2.1.0/bootstrap-debug", "#backbone/0.9.2/backbone-debug", "$-debug"], function(require, exports, module){

    var Util = {
        route          : require('./route/route-debug'),
        cookie         : require('./cookie/cookie-debug'),
        gif            : require('./gif/gif-debug'),
        dialog         : require('./dialog/dialog-debug'),
        verify         : require('./verify/verify-debug'),
        stateMachine   : require('./stateMachine/stateMachine-debug'),
        rightClickMenu : require('./rightClickMenu/rightClickMenu-debug'),
        ajax           : require('./ajax/ajax-debug'),
        slide          : require('./slide/slide-debug'),
        tips           : require('./tips/tips-debug'),
        scaffold       : require('./scaffold/scaffold-debug'),
        upload         : require('./upload/upload-debug')
    };

    // API
    module.exports = Util;
    
});
