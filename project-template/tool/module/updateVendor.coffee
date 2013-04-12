# updateVendor.coffee
#
# Build the vendors in Zonda
#
# Parameter:
# @name
# @version
# @app_root

colors = require "/usr/local/lib/node_modules/colors"
fs = require "fs"
path = require "path"
exec = require("child_process").exec

project_dir = path.resolve "./", "../"

app_root = fs.readFileSync "#{project_dir}/tool/.app_root", "utf8"

app_root = app_root.replace "\n", ""

build = ( path, name, version ) ->
  exec "cd #{path} && spm build && cp ./dist/#{name}.js ./", ( err, stdout, stderr ) ->
    if err isnt null
      console.log "ERROR".red.inverse + "build the " + "#{name}.#{version}".red.underline + " failed!"
      return false

    console.log stdout

# Build Zonda.Util
# ----------------
util_dir = "#{project_dir}/vendor/Zonda/util"

fs.writeFileSync "#{project_dir}/vendor/Zonda/util/package.json", """
  {
    "name": "util",
    "root": "#{app_root}/vendor/Zonda",
    "output": {
      "util.js": "."
    }
  }
"""

build util_dir, "Util", "Zonda Util package"

# ----------------
# Build Zonda.Util

module.exports = ( name, version, app_root ) ->
  module_dir = path.resolve "#{project_dir}/vendor/Zonda/vendor/#{name}/#{version}"

  console.log "Update the vendor: " + "#{name}/#{version}".green

  if fs.existsSync "#{module_dir}/package.json"
    spm_build_config = """
      {
        "name": "#{name}",
        "root": "#{app_root}/vendor/Zonda/vendor",
        "version": "#{version}",
        "output": {
          "#{name}.js": "."
        }
      }
    """

    fs.writeFileSync "#{project_dir}/vendor/Zonda/vendor/#{name}/#{version}/package.json", spm_build_config

    console.log "Generate the package.json for " + "#{name}.#{version}".green.underline + "\n"

    exec "cd #{module_dir} && spm build && cp ./dist/#{name}.js ./", ( err, stdout, stderr ) ->
      if err isnt null
        console.log "ERROR".red.inverse + "build the " + "#{name}.#{version}".red.underline + " failed!"
        return false

      console.log stdout

  else
    console.log "WAR".inverse.red + " vendor #{name}".underline + " has no " + "package.json".yellow
