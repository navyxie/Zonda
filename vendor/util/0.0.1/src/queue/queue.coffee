# Zonda Util Queue
# - - -
# Helper for Async code

define ( require, exports, module ) ->
  _ = require "underscore"
  Backbone = require "backbone"

  class Queue
    constructor: (@name)->
      _.extend @, Backbone.Events

    checkStatus: ->
  
# END define
