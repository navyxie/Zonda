# Zonda Util Model
# - - -
# Base on Backbone Events.

define ( require, exports, module ) ->
  _ = require "underscore"
  Backbone = require "backbone"

  Genre = require "../genre/genre"
  Http = require "../http/http"

  class Model
    constructor: ( @NAME, @API ) ->
      _.extend @, Backbone.Events

      # Build Genre for this Model
      # - - -
      @genre = new Genre @API, "@#{@NAME}"

      # Generate Namespace of this Model
      # - - -
      if @id
        @namespace = "#{@NAME}:#{@id}"
      else
        @namespace = "#{@NAME}"

      # Generate all Actions of this Model
      # - - -
      _.each @API, ( detail, act ) =>
        if act is "genre"
          return

        @[act] = (request) =>
          @sync act, request

    sync: ( act, request ) ->
      if request isnt undefined and typeof request isnt "object"
        throw "[#{@NAME}] Model.sync ERROR: request is not a object!"

      @genre.inspect  request
      @genre.toRemote request

      Http
        url:       @API[act].url
        data:      request
        caller:    @
        namespace: "#{@namespace}:#{act}"

  # END class Model

  module.exports = Model

# END define