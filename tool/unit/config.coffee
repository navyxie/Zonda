# config.coffee
# -------------
# 生成配置文件
fileAll = require "./dir"

fileAll("../lib", ( type, dir, depth ) ->
  console.log type
  console.log dir.name
  console.log depth
, 2)

