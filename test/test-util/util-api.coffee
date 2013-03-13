# util-api.coffee
vows = require "vows"
assert = require "assert"

require "seajs"
require "../../etc/env"

Util = require "../../util/0.1.2/src/util"

vows.describe("API of Util").addBatch
  "API Base64":
    topic: ->
      return Util.base64
    "Util.base64": (res) ->
      assert.ok res
      assert.strictEqual typeof res, "object"
  "API StateMachine":
    topic: ->
      return Util.StateMachine
    "Util.StateMachine": (res) ->
      assert.ok res
      assert.strictEqual typeof res, "function"
.export module
