# Zonda Util Queue
# - - -
# Helper for Async code

define ( require, exports, module ) ->
  _ = require "underscore"
  Backbone = require "backbone"

  class Queue
    constructor: (@NAME)->
      _.extend @, Backbone.Events

      @data = []

    # Check All of queue cell's status
    # - - -
    # if all status is "success", queue trigger "success"
    # if some status is "error", queue trigger "error"
    checkAll: ->
      _counter = @data.length

      for cell in @data
        if cell.status is "error"
          @trigger "#{@NAME}:queue:error", cell
        if cell.status is "success"
          _counter -= 1

      if _counter is 0
        @trigger "#{@NAME}:queue:success"

    # Update / Create
    # - - -
    setter: ( name, status, info ) ->
      _is_new = true

      for cell in @data
        if cell.name is name
          _is_new = false
          cell.status = status
          cell.info = info

      @data.push { name: name, status: status, info: info } if _is_new

      do @checkAll

# END define
