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

  test "setter CREATE", ->
    queue = new Util.Queue "QueA"

    queue.setter "say", "running"
    queue.setter "run", "running"

    strictEqual queue.data.length, 2
    strictEqual queue.data[0].name, "say"
    strictEqual queue.data[0].status, "running"
    strictEqual queue.data[1].name, "run"
    strictEqual queue.data[1].status, "running"

  test "setter CREATE/UPDATE", ->
    queue = new Util.Queue "QueA"

    queue.setter "a", "running"
    queue.setter "b", "running"

    strictEqual queue.data.length, 2
    strictEqual queue.data[0].name, "a"
    strictEqual queue.data[0].status, "running"
    strictEqual queue.data[1].name, "b"
    strictEqual queue.data[1].status, "running"

    queue.setter "a", "success"
    strictEqual queue.data[0].status, "success"

  test "queue error", ->
    queue = new Util.Queue "QueB"

    queue.on "#{queue.NAME}:queue:error", ->
      strictEqual queue.data.length, 4
      strictEqual queue.data[1].status, "error"
      do start

    queue.setter "say", "running"
    queue.setter "run", "running"
    queue.setter "hehe", "running"
    queue.setter "xixi", "running"

    do stop

    setTimeout ->
      queue.setter "say", "success"
    , 500

    setTimeout ->
      queue.setter "run", "error"
    , 600

  test "queue success", ->
    queue = new Util.Queue "QueC"

    queue.on "#{queue.NAME}:queue:success", ->
      strictEqual queue.data[0].status, "success"
      strictEqual queue.data[1].status, "success"
      strictEqual queue.data[2].status, "success"
      strictEqual queue.data[3].status, "success"
      strictEqual queue.data[4].status, "success"
      do start

    queue.setter "a", "running"
    queue.setter "b", "running"
    queue.setter "c", "running"
    queue.setter "d", "running"
    queue.setter "e", "running"
    
    do stop

    setTimeout ->
      queue.setter "a","success"
    , 100

    setTimeout ->
      queue.setter "b","success"
    , 200

    setTimeout ->
      queue.setter "c","success"
    , 300

    setTimeout ->
      queue.setter "d","success"
    , 400

    setTimeout ->
      queue.setter "e","success"
    , 500
  test "queue info", ->
    queue = new Util.Queue "QueD"

    queue.setter "say", "running", "hello"

    strictEqual queue.data[0].info, "hello"
