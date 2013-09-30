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

deploy_map = CONFIG.deploy_map

# Replace the hash files
# - - -
if CONFIG.version is "md5"
  hash_map = fs.readFileSync "#{project_dir}/dist/.cache_hash_map.json", encoding: "utf8"
  hash_map = JSON.parse hash_map

HashReplace = (text) ->
  return text if CONFIG.version isnt "md5"

  for file, hash of hash_map
    target_file = file.replace CONFIG.version, hash
    text = text.replace file, target_file

  return text

# Main Function
# - - -
Deploy = ( rel_path, frag_name ) ->
  deploy_dir = path.resolve project_dir, rel_path

  console.log "\n   Deploying: ".bold + "#{deploy_dir}/" + " #{frag_name}".bold.yellow + "..."

  try
    tpl = fs.readFileSync "#{project_dir}/tool/deploy_fragment/#{frag_name}", encoding: "utf8"

    res_content = Mustache.render tpl, CONFIG: CONFIG

    # Replace the md5 files, when the version is md5
    # - - -
    res_content = HashReplace res_content

    fs.writeFileSync "#{deploy_dir}/#{frag_name}", res_content

    console.log "   >>".bold + " Success!".green
  catch err
    console.log "   >>".bold + " Error!".red.inverse
    console.log "   >>".bold + " #{err}".red.inverse.bold

# END Deploy

# Deploy all fragment
# - - -
for frag_name, rel_path of deploy_map
  Deploy rel_path, frag_name
