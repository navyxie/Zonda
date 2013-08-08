# test case queue
define ( require ) ->
  Util = require "util"

  module "Queue"

  test "API", ->
    queue = new Util.Queue "test"
    ok Util.Queue
    strictEqual typeof Util.Queue, "function"
    strictEqual typeof queue, "object"
    strictEqual typeof queue.dump, "function"
    strictEqual typeof queue.add, "function"
    strictEqual typeof queue.remove, "function"
    strictEqual typeof queue.update, "function"
