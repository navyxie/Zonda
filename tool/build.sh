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
    ;;
    *)
        echo $1 ? 表示没有这个选项 =。=
    ;;
esac
