# Zonda Util Queue
# - - -
# Helper for Async code

define ( require, exports, module ) ->
  _ = require "underscore"
  Backbone = require "backbone"

  class Queue
    constructor: ( @NAME, @SIZE )->
      _.extend @, Backbone.Events

      @data = []

    # Check All of queue cell's status
    # - - -
    # if all status is "success", queue trigger "success"
    # if some status is "error", queue trigger "error"
    checkAll: ->
      if @SIZE
        counter = @SIZE
      else
        counter = @data.length

      for cell in @data
        if cell.status is "error"
          @trigger "#{@NAME}:queue:error", cell

        if cell.status is "success"
          counter -= 1

      if counter is 0
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

      if _is_new
        @data.push { name: name, status: status, info: info }
      else
        do @checkAll

# END define
