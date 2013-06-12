# Zonda Util Collection
# - - -
# Just like the Collection of Backbone
define ( require, exports, module ) ->
  _ = require "underscore"

  Model = require "../model/model"

  Exception = require "../exception/exception"

  class Collection extends ModelClass
    constructor: (config)->
      _.extend @, Backbone.Events

      @NAME       = config.NAME
      @API        = config.API
      @Model      = config.Model
      @View       = config.View

      @model_list = {}
      @view_list  = {}

    fetch: ->
      @once "#{@NAME}:READ_LIST:success", @update, @

      @sync "READ_LIST"

    update: (respond) ->
      if typeof respond isnt "array"
        Exception "genre",
          position: "Collection:#{@NAME}:READ_LIST"
          expect: "array"
          not: typeof respond

      # Add or Update Model
      # - - -
      _.each respond, (id) =>
        id = Math.abs id

        if @model_list[id]
          @model_list[id].READ id: id
        else
          @factory id

      # Remove Model
      # - - -
      _.each @model_list, ( model, id ) ->
        id = Math.abs id
        if -1 is _.indexOf respond, id
          delete @model_list[id]
          do @view_list[id].remove
          delete @view_list[id]

    factory: (id) ->
      model = new @Model "#{@NAME}", @API

      model.id = id

      view = new @View model

      @model_list[id] = model
      @view_list[id]  = view

      model.READ id: model.id

  module.exports = Collection
  
# END define
