#!/bin/bash

# version of app and framework
app_version=dev
framework_version=dev

# get path
x=`echo $0 | grep "^/"`
pwdp=`pwd`
if test "${x}"; then                                                                                                                         
  dir=`dirname $0`
else
  dir=`dirname $pwdp/$0`
fi
cd $dir

cd ../
project_dir=`pwd`

cd vendor/Zonda/vendor/sea/2.0.0pre/
seajs_dir=`pwd`

cd $project_dir
cd dist/
dist_dir=`pwd`

case $1 in
  # change project's status to "dev"
  dev)
  cd $project_dir/tool
  # make alias, plugins of SeaJs config, and package.json for SPM
  node module/config.js

  # build the framework-dev.js
  # Cat list. !DO NOT change the file order!!

  cd $seajs_dir
  cat sea-debug.js \
      plugin-text.js \
      plugin-debug.js \
      plugin-shim.js \
      plugin-warning.js \
      $project_dir/etc/env.js \
      > $dist_dir/framework-dev.js

  # build the dist-dev.js
  # just load the app.js
  echo 'seajs.use("/assets/src/app");' > $dist_dir/app-dev.js

  echo "Zonda in 'DEV' status Now."

  ;; # END dev

  # change project's status to "prod"
  prod)
  cd $project_dir/tool
  # make alias, plugins of SeaJs config, and package.json for SPM
  node module/config.js

  # combo vendor file
  node module/comboVendor.js

  cd $project_dir

  # cat the vendor-combo.js to framework-{{framework_version}}.js
  cat $dist_dir/vendor-combo.js >> $dist_dir/framework-$framework_version.js

  # use spm
  spm --build-config=./etc/package.json -v build

  # rename the app.js to be app-{{app_version}}.js
  mv $dist_dir/app.js $dist_dir/app-$app_version.js

  # add SeaJS bootstrap
  echo 'seajs.use("/assets/dist/app");' >> $dist_dir/app-$app_version.js

  echo "Zonda in 'PROD' status Now."

  ;;

  *)
  ;;
esac
