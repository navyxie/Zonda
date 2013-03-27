# config.coffee
#
# Generate the etc/env.js, for configure the SeaJS

fs = require "fs"
path = require "path"

listVendor = require "./listVendor"

project_dir = path.resolve './', '../'

zonda_vendor_dir = "vendor/Zonda/vendor"

vendor_list = listVendor "#{project_dir}/#{zonda_vendor_dir}", zonda_vendor_dir

alias = JSON.stringify vendor_list.alias
dependencies = JSON.stringify vendor_list.dependencies

env = """
  seajs.config({
    base: "/assets",
    charset: "utf-8",
    alias: #{alias}
  });
"""

fs.writeFileSync "#{project_dir}/etc/env.js", env

package_info = """
{
    "name": "dist",
    "root": "/assets",
    "dependencies": #{dependencies},
    "output": {
        "app.js" : "."
    }
}
"""

fs.writeFileSync "#{project_dir}/etc/package.json", package_info
