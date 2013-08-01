# Zonda Tool
# Generator of the dist/framework-version.js
# - - -
# When project pattern is "dev",
# concat the sea.js, some seajs plugin, seajs_config in the framework.js
#
# When project pattern is "prod",
# concat the sea.js, some seajs plugin, seajs_config in the framework.js
# concat all vendor and util into framework.js

require "js-yaml"
fs = require "fs"
path = require "path"
colors = require "colors"

# Welcome
# - - -
console.log "\n\n Zonda Tool".bold + ":  Generate framework..."

project_dir = path.resolve './', '../'

CONFIG = require "#{project_dir}/etc/zonda.yml"

# Mkdir dist
# - - -
fs.readdir "#{project_dir}/dist", (err) ->
  fs.mkdirSync "#{project_dir}/dist" if err isnt null

# Generate simple framework
# - - -
# Combo Seajs, Seajs Plugin, Seajs Config
console.log "\n   Generate simple framework-#{CONFIG.version}.js...:  ".bold + "#{project_dir}/dist"

sea = fs.readFileSync "#{project_dir}/vendor/Zonda/vendor/sea/#{CONFIG.sea_version}/sea-debug.js"

sea_plugin_text = fs.readFileSync "#{project_dir}/vendor/Zonda/vendor/sea/#{CONFIG.sea_version}/seajs-text-debug.js"

sea_config = fs.readFileSync "#{project_dir}/etc/seajs_config.js"

fs.writeFileSync "#{project_dir}/dist/framework-#{CONFIG.version}.js", sea+sea_plugin_text+sea_config

console.log "   >>".bold + " Success!".green
