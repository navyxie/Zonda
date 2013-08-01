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
