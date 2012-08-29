#!/bin/bash

case $1 in
    build)
        cd ../
        spm build
    ;;
    lib)
        cd ../
        #spm build --convertStyle=default --dist=./lib --src=./lib-debug
        spm build --convertStyle=default --dist=./lib --src=./lib-debug
    ;;
    *)
        echo $1 ? 表示没有这个选项 =。=
    ;;
esac
