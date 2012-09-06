// header.js
// ---------
// 头部

define(function ( require, exports, module) {
    // test jquery-ui
    var $ = require('jquery-ui');
    $("#hh").datepicker();

    // test tips
    var Tips = require('../module/tips.module');

    Tips.some({
        "target" : $('.tips')
    });

    // test bootstrap
    var bootstrap = require('bootstrap');

    // test fancybox
    var fb = require('lib/fancybox/1.3.4/jquery.fancybox');

    fb('.fancybox-test').fancybox({
        'easingIn' : 'easeOutBack',
        'easingOut' : 'easeInBack',
        'transitionIn'	: 'elastic',
        'transitionOut'	: 'elastic'
    });

    // 测试上传文件模块
    var FILE = require('../module/upload.module');

    // 配置上传文件模块
    FILE.config = {
        url      : $("#upload-form").attr('action'),
        fileType : 'rar, zip, doc, docx, pdf, xls, xlsx, png, jpeg, jpg, bmp, gif, avi, rmvb',
        msg      : function ( msg ) { console.log(msg); },
        fileList : document.getElementById('upload-list-wrap'),
        ploadForm : document.getElementById('upload-form')
    };

    $('#upload-block')[0].ondragenter = function ( event ) {
        // 必须阻止事件冒泡
        event.stopPropagation();

        // 阻止默认动作
        event.preventDefault();

        $("#upload-block").css('border-color','#888');
    };

    $('#upload-block')[0].ondragover = function ( event ) {
        // 必须阻止事件冒泡
        event.stopPropagation();

        // 阻止默认动作
        event.preventDefault();

        $("#upload-block").css('border-color','#aaa');
    };

    // 松开鼠标，停止拖拽时
    $('#upload-block')[0].ondrop = function ( event ) {
        // 必须阻止事件冒泡
        event.stopPropagation();

        // 阻止默认动作
        event.preventDefault();

        // 执行上传动作
        FILE.upload( event.dataTransfer.files );

        $("#upload-block").css('border-color','#eee');
    };

    /**
     * 通过 input file 表单选择多文件上传
     */
    $("#upload-form input").change( function () {
        FILE.upload( this.files );
    });

});
