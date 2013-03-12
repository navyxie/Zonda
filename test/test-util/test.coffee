require "seajs"
require "../../etc/env"

require "../mock-module/window"

localStorageSync = require "../../util/0.1.2/src/localStorageSync/localStorageSync"

Backbone = require "../../vendor/backbone/0.9.10/backbone"

Backbone.sync = localStorageSync

Model = Backbone.Model.extend
  url: "/mock"

Collection = Backbone.Collection.extend
  url: "/mock"
  initialize: ( model ) ->
    @model = model

collection = new Collection Model

res = ""

collection.fetch()
