# Zonda Tool
# Generator of the dist/app-version.js
# - - -

require "js-yaml"
fs = require "fs"
path = require "path"
colors = require "colors"

# Welcome
# - - -
console.log "\n\n Zonda Tool".bold + ":  Generate app..."

project_dir = path.resolve './', '../'

CONFIG = require "#{project_dir}/etc/zonda.yml"

# Mkdir dist
# - - -
try
  fs.readdirSync "#{project_dir}/dist"
catch err
  fs.mkdirSync "#{project_dir}/dist" if err isnt null

# Generate app depends on CONFIG.pattern
# - - -
switch CONFIG.pattern
  when "dev"
    console.log "\n   Generate simple app-#{CONFIG.version}.js...:  ".bold
    fs.writeFileSync "#{project_dir}/dist/app-#{CONFIG.version}.js", """
      seajs.use("#{CONFIG.web_root}/src/#{app_bootstrap}");
      """
    console.log "   >>".bold + " Success!".green

  when "prod"
    console.log "\n   Generate combo app-#{CONFIG.version}.js...:  ".bold
