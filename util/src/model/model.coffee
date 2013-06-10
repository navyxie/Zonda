# Zonda Util Model
# - - -
# Base on Backbone Events.

define ( require, exports, module ) ->
  _ = require "underscore"
  Backbone = require "backbone"

  API = Zonda.API
  Http = require "../http/http"

  class Model
    constructor: (@name) ->
      _.extend @, Backbone.Events

      _.each API[@name], ( detail, act ) =>
        if act is "genre"
          return

        @[act] = (request) =>
          @sync act, request

    sync: ( act, request ) ->
      if request isnt undefined and typeof request isnt "object"
        throw "Model.sync ERROR: request is not a object!"

      if @id
        namespace = "#{@name}:#{@id}:#{act}"
      else
        namespace = "#{@name}:#{act}"

      Http
        url:       API[@name][act].url
        data:      data
        caller:    @
        map:       API[@name].map
        namespace: namespace

  # END class Model

  module.exports = Model

# END define
