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
  Queue = require "../queue/queue"

  # Main
  # - - -
  # @form: the jQuery selector of Form DOM
  class Form
    constructor: (@sel) ->
      _.extend @, Backbone.Events

      @cells = Cell sel
      @dom = $ sel
      @name = @dom.attr "name"

      # The name of Form is required
      # - - -
      throw "From:#{@sel} must have a name!" if @name is undefined

    listen: ->

    taskRunner: (cell) ->
      if cell.dom.is ":hidden"
        return null

      if cell.status is "running"
        return null
      else
        cell.status = "running"

      namespace = "#{@name}:#{cell.name}:taskRunner"
      task_queue = new Queue namespace

      task_queue.once "#{namespace}:queue:error", (err_cell) ->
        cell.status = "error"
        cell.dom.parents(".form-group")
          .removeClass("has-success")
          .addClass("has-warning")
          .find(".help-block")
          .html """
            <i class="icon-remove-sign"></i> #{err_cell.info}
          """

      task_queue.once "#{namespace}:queue:success", ->
        cell.status = "success"
        cell.dom.parents(".form-group")
          .removeClass("has-warning")
          .addClass("has-success")
          .find(".help-block")
          .html """
            <i class="icon-ok-sign"></i>
          """

      for name of cell.tasks
        throw "No such task named #{name}!" unless name of @tasks
        task_queue.setter name, "running"
        @tasks[name] cell, task_queue

    dump: (callback)->

    # Register a task to a cell of this form
    # - - -
    registerTask: ( task, cell ) ->

    # Build-in task
    # - - -
    tasks:

      # Inspect cell value with the RegExp
      # - - -
      regexp: ( cell, task_queue ) ->
        exp = cell.tasks.regexp.replace /^\//, ""
        exp = exp.replace /\/$/, ""
        exp = new RegExp exp

        if exp.test cell.dom.val()
          task_queue.setter "regexp", "success"
        else
          task_queue.setter "regexp", "error", "Type Error"

  module.exports = Form
  
# END define
