#!/bin/bash
# build 选项：根据package.json打包src下的代码
# lib选项

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

        #通过init.js判断当前Zonda状态
        if [  ];then
        fi

        #拷贝app.js副本
        cp app-debug.js app.js
        cp app.js app-debug.js

        #修改init.js中的线上版本为开发版本
        sed -i "s/app_version_type='dev'/app_version_type='prod'/g" ./init.js

        #模拟spm标准目录
        mkdir src
        cp -r app/* src/

        #spm 打包
        spm build -v

        #放置打包好的app.js
        cp dist/app.js app/app.js

        #删除打包临时源文件
        rm -rf src/ dist/

        echo Zonda-App打包完成
    ;;
    # 开发模式
    dev)
        cd ../

        #从app-deub.js复原app.js
        cp app/app-debug.js app/app.js

        #替换init.js中Zonda的状态为开发版本
        sed -i "s/app_version_type='prod'/app_version_type='dev'/g" ./init.js

        echo Zonda切换至开发模式
    ;;
    *)
        echo $1 ? 没有选项 =。=
    ;;
esac
