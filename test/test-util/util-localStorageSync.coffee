# util-localStorageSync
vows = require "vows"
assert = require "assert"

require "seajs"
require "../../etc/env"

require "../mock-module/window"

localStorageSync = require "../../util/0.1.2/src/localStorageSync/localStorageSync"

Backbone = require "../../vendor/backbone/0.9.10/backbone"

Backbone.sync = localStorageSync

vows.describe("LocalStorage Server for Backbone.sync").addBatch

  "API":
    topic: ->
      Backbone.sync

    "is function": (topic) ->
      assert.equal typeof topic, "function"

  "sync::create, Model::save":
    topic: ->
      model = new Backbone.Model()

      model.url = "/mock"

      res = ""

      model.on "change", (data) ->
        res = data

      model.save
        name: "shiyang"
        age: 23

      return res

    "get the id": (res) ->
      assert.ok res
      assert.ok res.id
      assert.equal typeof res.id, "string"

    "get the name": (res) ->
      assert.ok res.toJSON().name
      assert.equal res.toJSON().name, "shiyang"

    "get the age": (res) ->
      assert.ok res.toJSON().age
      assert.equal res.toJSON().age, 23

  "sync::create, Model::set, save":
    topic: ->
      model = new Backbone.Model()

      model.url = "/mock"

      res = ""

      model.on "change", (data) ->
        res = data

      model.set
        name: "shiyang"
        age: 23

      model.save()

      return res

    "get the id": (res) ->
      assert.ok res
      assert.ok res.id
      assert.equal typeof res.id, "string"

    "get the name": (res) ->
      assert.ok res.toJSON().name
      assert.equal res.toJSON().name, "shiyang"

  "sync::create, Collection::create":
    topic: ->
      Model = Backbone.Model.extend
        url: "/mock"

      Collection = Backbone.Collection.extend
        url: "mock"
        initialize: ( Model ) ->
          @model = Model

      collection = new Collection Model
      res = ""

      collection.on "change", (data) ->
        res = data

      collection.create
        name: "degas"
        sex: "man"

      return res

    "id of model in Collection": (res) ->
      assert.ok res.id

    "name of data in model in Collection": (res) ->
      assert.ok res.toJSON().name
      assert.equal res.toJSON().name, "degas"

.addBatch
  "sync::read":
    topic: ->
      Model = Backbone.Model.extend
        url: "/mock"

      Collection = Backbone.Collection.extend
        url: "/mock"
        initialize: ( model ) ->
          @model = model

      collection = new Collection Model

      res = ""

      collection.fetch
        error: (err) ->

      collection = JSON.stringify collection

      return collection

    "fetch to update the Collection": ( res ) ->
      console.dir res

      #assert.ok res
      #assert.ok res.old
      #assert.ok res.new
      #assert.notEqual res.old, res.new

.export module
