# listVendor.coffee
#
# Parameter:
# @vendor_root_dir: the realpath of vendor dir
# @relative_root_dir: the relativepath of vendor dir
#
# Return:
# list the vendor dir, return a object like this:

###

alias = {
  "jquery": "vendor/Zonda/vendor/jquery/1.9.1/jquery",
  "underscore": "vendor/Zonda/vendor/underscore/1.4.4/underscore"
}

###

fs = require "fs"
path = require "path"

project_dir = path.resolve './', '../'

app_root = fs.readFileSync "#{project_dir}/tool/.app_root", "utf8"

app_root = app_root.replace "\n", ""

status = fs.readFileSync "#{project_dir}/tool/.status", "utf8"

status = status.replace "\n", ""

main = ( vendor_root_dir, relative_root_dir ) ->
  console.log "------------------------------------------------------------------------"
  console.log "Update Vendors"
  console.log "------------------------------------------------------------------------"

  alias = {}
  dependencies = {}
  info = {}

  list = fs.readdirSync vendor_root_dir

  for vendor_name in list
    version_list = fs.readdirSync "#{vendor_root_dir}/#{vendor_name}"

    # Just use the first version, the only one!
    # -----------------------------------------
    if status is "dev"
      alias[vendor_name] = "#{relative_root_dir}/#{vendor_name}/#{version_list[0]}/src/#{vendor_name}"
      dependencies[vendor_name] = "#{vendor_name}"
      info[vendor_name] = "#{version_list[0]}"
    else
      alias[vendor_name] = "#{relative_root_dir}/#{vendor_name}/#{version_list[0]}/#{vendor_name}"
      dependencies[vendor_name] = "#{vendor_name}"
      info[vendor_name] = "#{version_list[0]}"

  # Add Util
  # --------
  if status is "dev"
    alias.util = "vendor/Zonda/util/src/util"
    dependencies.util = "util"
  else
    alias.util = "vendor/Zonda/util/util"
    dependencies.util = "util"

  # Remove SeaJS
  # ------------
  delete alias.sea
  delete dependencies.sea
  delete info.sea

  console.log "------------------------------------------------------------------------"
  console.log "Update Vendors Success!"
  console.log "------------------------------------------------------------------------"

  return {
    alias : alias
    dependencies : dependencies
    info: info
  }

# END main

module.exports = main
