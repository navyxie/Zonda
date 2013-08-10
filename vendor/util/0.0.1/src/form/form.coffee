# Zonda Util Form
# - - -
# Base on Bootstrap Form.
# Verify, dump, and other method coming soon.
# - - -
# !! Every task of Form is async !!

define ( require, exports, module ) ->
  $ = require "jquery"
  _ = require "underscore"
  Backbone = require "backbone"
  Cell = require "./cell"

  # Main
  # - - -
  # @form: the jQuery selector of Form DOM
  class Form
    constructor: (@sel) ->
      @cells = Cell @sel
      console.log @cells

    listen: ->

    taskRunner: (cell) ->

    dump: (callback)->

    # Register a task to a cell of this form
    # - - -
    registerTask: ( task, cell ) ->

  module.exports = Form
  
# END define
