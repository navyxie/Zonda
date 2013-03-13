# util-StateMachine
vows = require "vows"
assert = require "assert"

require "seajs"
require "../../etc/env"

require "../mock-module/window"

StateMachine = require "../../util/0.1.2/src/StateMachine/StateMachine"

vows.describe("StateMachine").addBatch
  "API StateMachine":
    topic: ->
      return StateMachine
    "Constructor": (res) ->
      assert.ok res
      assert.strictEqual typeof res, "function"
  "API StateMachine instance":
    topic: ->
      res = new StateMachine
      return res
    "instance has a 'add' method": (res) ->
      assert.ok res
      assert.ok res.add
      assert.strictEqual typeof res, "object"
      assert.strictEqual typeof res.add, "function"

  "active method":
    topic: ->
      stateMachine = new StateMachine

      main_view_status = true
      list_view_status = false
      sub_view_status = false

      main_view =
        activate: ->
          main_view_status = true
        deactivate: ->
          main_view_status = false

      sub_view =
        activate: ->
          sub_view_status = true
        deactivate: ->
          sub_view_status = false

      list_view =
        activate: ->
          list_view_status = true
        deactivate: ->
          list_view_status = false

      stateMachine.add main_view
      stateMachine.add sub_view
      stateMachine.add list_view

      sub_view.active()

      return {
        main_view_status: main_view_status
        sub_view_status: sub_view_status
        list_view_status: list_view_status
      }

    "sub_view is actived": (status)->
      assert.ok status
      assert.ok status.sub_view_status

    "main_view is deactived": (status)->
      assert.ok status
      assert.strictEqual status.main_view_status, false

    "list_view is deactived": (status)->
      assert.ok status
      assert.strictEqual status.list_view_status, false

.export module
