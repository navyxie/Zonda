# Zonda Util Form Cell
# - - -
# Generate Form Cell Object
# Base on Bootstrap

define ( require, exports, module ) ->

  # Helper
  # - - -
  # task attributes filter
  filter = ( attrs ) ->
    tasks = {}

    for key, attr of attrs
      continue if not (/^task-/.test attr.name)
      name = attr.name.replace /^task-/, ""
      tasks[name] = attr.value

    return tasks

  ALIAS =
    "INPUT:text":     "text"
    "INPUT:password": "password"
    "INPUT:radio":    "radio"
    "INPUT:checkbox": "checkbox"
    "TEXTAREA":       "textarea"
    "SELECT":         "select"

  # Factory
  # - - -
  # @form: the jQuery selector of Form DOM
  Wrap = (form) ->
    cells = []

    for sel, type of ALIAS
      $(form).find(sel).each ->
        cells.push new Cell type, @

    return cells

  # Main
  # - - -
  # Make a Form cell to Cell Object
  class Cell
    constructor: ( @type, cell ) ->
      cell = $ cell
      @dom = cell
      @group_dom = @dom.parents ".form-group"
      
      @name = cell.attr "name"
      @default = cell.attr "default"
      value = cell.attr "value"

      if @default isnt undefined and value is undefined
        cell.val @default

      # Generate the task list of this cell
      # - - -
      attrs = cell.prop "attributes"
      @tasks = filter attrs

  module.exports = Wrap
  
# END define
