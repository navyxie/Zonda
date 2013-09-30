# Zonda Tool
# Hash file, and rename the file
# - - -

require "js-yaml"
fs = require "fs"
path = require "path"
colors = require "colors"
exec = require("child_process").exec
crypto = require "crypto"

# Welcome
# - - -
console.log "\n\n Zonda Tool".bold + ":  Hash files..."

# Config
# - - -
project_dir = path.resolve './', '../'

target_dir = "#{project_dir}/dist"

CONFIG = require "#{project_dir}/etc/zonda.yml"

hash_type = CONFIG.version

if hash_type isnt "md5"
  console.log "   >>".bold + " The version is not " + "'md5'".green + " in etc/zonda.yml, nothing to do!"
  return false

target = ["app-#{hash_type}.js", "framework-#{hash_type}.js", "app-#{hash_type}.css"]

# Hash file
# - - -
hash_map = {}

for file in target
  console.log "\n   Hash dist/#{file}...:  ".bold

  hash_sum = crypto.createHash hash_type

  file_content = fs.readFileSync "#{target_dir}/#{file}"

  hash_sum.update file_content

  hex = hash_sum.digest("hex")

  hash_map[file] = hex

  name = "#{file}".replace hash_type, hex

  fs.renameSync "#{target_dir}/#{file}", "#{target_dir}/#{name}"

  console.log "   >>".bold + " Success: ".green + "[" + "#{hex}".yellow + "]"

# Write Cache
cache_file = "#{target_dir}/.cache_hash_map.json"

fs.writeFileSync cache_file, JSON.stringify(hash_map)

console.log "\n   [" + "Cache".green.inverse + "]" + " the md5 version > " + "#{cache_file}".yellow

console.log "\n\n Zonda Tool".bold + " >> " + "Hash files" + " Success!\n".bold.yellow
