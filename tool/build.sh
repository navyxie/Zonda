#!/bin/bash
# build 选项：根据package.json打包src下的代码

cd ../util
spm build --src=./ --dist=./ -v
