# Zonda Tool
# Deploy the HTML within Zonda's CSS/JS
# - - -

require "js-yaml"
fs = require "fs"
path = require "path"
colors = require "colors"
mustache = require "mustache"
exec = require('child_process').exec

# Welcome
# - - -
console.log "\n\n Zonda Tool".bold + ":  Deploy..."

project_dir = path.resolve './', '../'

CONFIG = require "#{project_dir}/etc/zonda.yml"

tpl = readFileSync "#{project_dir}/tool/deploy/fragment.html"

console.log tpl
