# Zonda Util message
# - - -
# Base on Backbone Events.

define ( require, exports, module ) ->
  $ = require "jquery"
  _ = require "underscore"
  Backbone = require "backbone"
  Mustache = require "mustache"

  prefix = "#zonda-util-message"
  delay = 1300

  TPL = require "./tpl/message.tpl"

  message = _.extend
    delay: delay

    open: ->

    close: ->

    error: ( info, callback ) ->

    success: ( info, callback ) ->

    tip: ( info, callback ) ->

    loading: ( info, callback ) ->

  , Backbone.Events

  module.exports = message
  
# END define
