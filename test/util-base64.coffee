# util-base64
vows = require "vows"
assert = require "assert"

require "seajs"
require "../etc/env"

base64 = require "../util/0.1.2/src/base64/base64"

vows.describe("Test Encode").addBatch
  "Chinese" :
    topic: ->
      base64.encode "春眠不觉晓，处处闻啼鸟"
    "output is string": (topic) ->
      assert.equal typeof topic, "string"
      return null
.export module
