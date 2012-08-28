#!/bin/bash

case $1 in
    build)
        cd ../
        spm build
    ;;
    lib)
        cd ../
        spm build --dist=./lib --src=./lib
    ;;
    *)
        echo $1 ? 表示没有这个选项 =。=
    ;;
esac
