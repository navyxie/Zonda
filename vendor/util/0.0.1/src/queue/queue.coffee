# Zonda Util Queue
# - - -
# Helper for Async code

define ( require, exports, module ) ->
  _ = require "underscore"
  Backbone = require "backbone"

  class Queue
    constructor: (@name)->
      _.extend @, Backbone.Events

      @data = []

    # Check All of queue cell's status
    # - - -
    # if all status is "success", queue trigger "success"
    # if some status is "error", queue trigger "error"
    checkAll: ->
      _counter = @data.length

      for i in @data

    # Update / Create
    # - - -
    setter: ( name, status ) ->

      do checkAll

# END define
