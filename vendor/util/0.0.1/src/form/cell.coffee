# Zonda Util Form Cell
# - - -

define ( require, exports, module ) ->

  # Factory
  # - - -
  # @form: the jQuery selector of Form DOM
  Wrap = (form) ->
    alias =
      "INPUT:text": "text"
      "INPUT:password": "password"
      "INPUT:radio": "radio"
      "INPUT:checkbox": "checkbox"
      "TEXTAREA": "textarea"
      "SELECT": "select"

  # Main
  # - - -
  # Make a Form cell to Cell Object
  class Cell
    constructor: ( @type, cell ) ->
      @name = cell.attr "name"

      # Generate the task list of this cell
      # - - -

  module.exports = Wrap
  
# END define
