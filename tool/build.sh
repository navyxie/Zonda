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
    app)
        cd ../
        mkdir src
        rm -rf app/app-debug.js
        cp app/app-org.js app/app.js
        cp app/app.js app/app-org.js
        cp -r app/* src/
        spm build -v
        cp dist/app*js app/
        rm -rf dist/ src/
        echo App打包完成
    ;;
    *)
        echo $1 ? 没有选项 =。=
    ;;
esac
