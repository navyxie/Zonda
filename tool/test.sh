#!/bin/bash

# use npm test and vows for Zonda

x=`echo $0 | grep "^/"`
pwdp=`pwd`
if test "${x}"; then                                                                                                                         
  dir=`dirname $0`
else
  dir=`dirname $pwdp/$0`
fi
cd $dir
# go to the this shell dir

# nodejs static server port
port=3000

# Generate env.js
node module/config.js

cd ../

node tool/module/server.js &

grunt test --debug

#phantomjs test/addons/phantomjs/runner.js http://localhost:$port/test/index.html

kill -9 `cat tool/module/pid.tmp`
rm tool/module/pid.tmp
