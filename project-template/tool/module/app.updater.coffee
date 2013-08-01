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
fs.readdir "#{project_dir}/dist", (err) ->
  fs.mkdirSync "#{project_dir}/dist" if err isnt null
