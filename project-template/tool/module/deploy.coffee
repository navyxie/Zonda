# Zonda Tool
# Deploy the HTML Fragments within Zonda's CSS/JS
# - - -

require "js-yaml"
fs = require "fs"
path = require "path"
colors = require "colors"
Mustache = require "mustache"
exec = require('child_process').exec

# Welcome
# - - -
console.log "\n\n Zonda Tool".bold + ":  Deploy..."

project_dir = path.resolve './', '../'

CONFIG = require "#{project_dir}/etc/zonda.yml"

# Render the HTML Fragment
# - - -
tpl = fs.readFileSync "#{project_dir}/tool/deploy/fragment.html", encoding: "utf8"

res_content = Mustache.render tpl, CONFIG: CONFIG

# Deploy
# - - -
deploy_dir = path.resolve project_dir, CONFIG.deploy_dir

fs.writeFileSync "#{deploy_dir}/#{CONFIG.deploy_file}", res_content

console.log "\n\n Zonda Tool".bold + " >> " + "Generate framework-#{CONFIG.version}.js" + " Success!\n".bold.yellow
