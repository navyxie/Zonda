# util-base64
vows = require "vows"
assert = require "assert"

require "seajs"
require "../../etc/env"

base64 = require "../../util/0.1.2/src/base64/base64"

vows.describe("Test Util.base64").addBatch
  "Encode Symbol" :
    topic: ->
      base64.encode "!~@#$%^&*()_+"
    "output is string": (topic) ->
      assert.equal typeof topic, "string"

  "Decode Symbol" :
    topic: ->
      base64.decode "IiF+QCMkJV4mKigpXysi"
    "get the Symbol": (topic) ->
      assert.equal topic, "!~@#$%^&*()_+"

  "Encode Symbol_more" :
    topic: ->
      base64.encode "-=[]\\{}|;\':\",./<>?"
    "output is string": (topic) ->
      assert.equal typeof topic, "string"

  "Decode Symbol_more" :
    topic: ->
      base64.decode "Ii09W11cXHt9fDsnOlwiLC4vPD4/Ig=="
    "get the Symbol": (topic) ->
      assert.equal topic, "-=[]\\{}|;\':\",./<>?"

  "Encode Chinese" :
    topic: ->
      base64.encode "春眠不觉晓，处处闻啼鸟"
    "output is string": (topic) ->
      assert.equal typeof topic, "string"

  "Decode Chinese" :
    topic: ->
      base64.decode "Ilx1NjYyNVx1NzcyMFx1NGUwZFx1ODljOVx1NjY1M1x1ZmYwY1x1NTkwNFx1NTkwNFx1OTVmYlx1NTU3Y1x1OWUxZiI="
    "get the poem": (topic) ->
      assert.equal topic, "春眠不觉晓，处处闻啼鸟"

.export module
