#!/bin/bash

# get path
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
  # make alias and plugins of SeaJs config
  # TODO do not finish yet

  # Cat list. !DO NOT change the file order!!
  cd $seajs_dir
  cat sea-debug.js \
      plugin-text.js \
      plugin-debug.js \
      plugin-flush.js \
      plugin-nocache.js \
      plugin-shim.js \
      plugin-warning.js \
      plugin-combo.js \
      $project_dir/etc/env.js \
      > $dist_dir/framework-dev.js

  ;; # END dev

  *)
  ;;
esac
