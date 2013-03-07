# comboVendor.coffee
#
# combo all of the "/assets/vendor/Zonda/vendor" to "/assets/dist/vendor-combo.js"

fs = require "fs"
path = require "path"

colors = require "/usr/local/lib/node_modules/colors"

listVendor = require "./listVendor"

project_dir = path.resolve './', '../'

zonda_vendor_dir = "vendor/Zonda/vendor"

# the list of vendor/Zonda/vendor
vendor_list = listVendor "#{project_dir}/#{zonda_vendor_dir}", zonda_vendor_dir

# create the vendor-combo.js
fs.writeFileSync "#{project_dir}/dist/vendor-combo.js", ""

# the realpath of vendor-combo.js
combo = "#{project_dir}/dist/vendor-combo.js"

# read etc/package.json to get the order of vendor
package_info = fs.readFileSync "#{project_dir}/etc/package.json", "utf8"
package_info = JSON.parse package_info

# combo vendor order by package.json's dependencies
for name of package_info.dependencies
  _vendor_content = fs.readFileSync "#{project_dir}/#{vendor_list.alias[name]}.js"
  fs.appendFileSync combo, _vendor_content

# END main
