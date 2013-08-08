# test case queue
define ( require ) ->
  Util = require "util"

  module "Queue"

  test "API", ->
    queue = new Util.Queue "test"
    ok Util.Queue
    strictEqual typeof Util.Queue, "function"
    strictEqual typeof Util.Queue, "function"
    strictEqual queue.NAME, "test"
    strictEqual typeof queue, "object"
    strictEqual typeof queue.setter, "function"
    strictEqual typeof queue.checkAll, "function"
