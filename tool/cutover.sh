#!/bin/bash
# build 选项：根据package.json打包src下的代码
# lib选项：还可跟一个参数表示要打包具体的某个第三方模块，不加选项，则打包全部的第三方模块

case $1 in
    build)
        cd ../
        spm build --src=./util --dist=./util --global-config=./init.js -v
    ;;
    lib)
        cd ../
        #spm build --convertStyle=default --dist=./lib --src=./lib-debug
        spm build --convertStyle=default --dist=./lib/$2 --src=./lib-debug/$2
    ;;
    *)
        echo $1 ? 表示没有这个选项 =。=
    ;;
esac
