#!/bin/bash

case $1 in
    #打包Zonda-Util模块
    util)
        cd ../util
        spm build -v 
        cp dist/util.js ./
        rm -rf dist
        echo Util模块打包完成
    ;;
    # 打包项目
    prod)

        cd ../
        echo 开始打包Zonda

        echo 清除HOME目录下的Zonda模块缓存，重新从源服务器下载
        rm -rf ~/.spm/sources/*

        #修改init.js中的线上版本为开发版本
        sed -i "s/app_version_type='\w*'/app_version_type='prod'/g" ./init.js

        #模拟spm标准目录
        mkdir src
        cp -r app/* src/

        #spm 打包
        spm build -v

        #删除打包临时源文件
        rm -rf src/

        #显示指明需要调用的模块ID
        echo 'seajs.use("#app/app");' >> dist/app.js

        echo Zonda-App打包完成
    ;;
    # 开发模式
    dev)
        cd ../

        #替换init.js中Zonda的状态为开发版本
        sed -i "s/app_version_type='\w*'/app_version_type='dev'/g" ./init.js

        echo Zonda切换至开发模式
    ;;
    test)
        cd ../

        #替换init.js中Zonda的状态为开发版本
        sed -i "s/app_version_type='\w*';/app_version_type='test';/g" ./init.js

        echo Zonda切换至测试模式

        #echo 开启测试模式Node服务，测试完成之前请勿关闭此进程!

        #cd tool/unit
        #node case.js
    ;;
    *)
        echo $1 ? 没有选项 =。=
    ;;
esac
