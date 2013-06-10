# Zonda Util Dialog
# - - -
# Base on Bootstrap@Twitter Modal.
# - - -
### Usage:
```coffeescript

  # Define a new dialog
  Util.dialog
    title: "I am the title"

    content: "some text/HTML, or Mustache.render output"

    css:
      "height": 1200

    class: "you can add class for this dialog"

    button:
      "Yes": ->
        # Generate the a button named "Yes", and do callback when you click the button

      "Other Button": ->
        # callback

  # Open it!
  do Util.dialog.open

  # Close it!
  do Util.dialog.close

  # Close dialog delay a moment
  Util.dialog.close 1200

  # Chain style
  Util.dialog.open().close(1300)

  # Return the dialog jQuery object
  console.log Util.dialog.$dom

  # Return the dialog config
  console.log Util.dialog.config

  # If you want to update the position and height of this dialog, just call:
  do Util.dialog.open

```
###

define ( require, exports, module ) ->
  $ = require "bootstrap" # use Bootstrap
  _ = require "underscore"
  Mustache = require "mustache"

  tpl = require "./tpl/dialog.tpl"

  prefix = "zonda-util"

  dialog = (config) ->

    dialog.config = config

    # Generate DOM of dialog
    # ----------------------
    if $("##{prefix}-dialog:visible")[0]
      return false

    dialog_html = Mustache.render tpl,
      title: config.title
      content: config.content
      
    $(document.body).append dialog_html
    # ----------------------
    # Generate DOM of dialog

    # Add Style
    # ---------
    if config.css
      $("##{prefix}-dialog").css config.css

    if config.class
      $("##{prefix}-dialog").addClass config.class
    # ---------
    # Add Style

    # Make button
    # -----------
    _.each config.button, ( button_callback, button_name ) ->
      uid = _.uniqueId("#{prefix}-dialog-button-")

      $("##{prefix}-dialog .modal-footer").append """
        <button id="#{uid}" class="btn btn-success">
          #{button_name}
        </button>
      """

      $("##{uid}").on "click", ->

        if $(@).hasClass "disabled"
          return false
        else
          $(@).addClass "disabled"

        do button_callback

    # -----------
    # Make button

    dialog.$dom = $("##{prefix}-dialog")

    # Destroy when closing the dialog
    $("##{prefix}-dialog").on "hide", ->
      delete $("##{prefix}-dialog").modal
      $("##{prefix}-dialog").remove()
      $(".modal-backdrop").remove()

    return dialog
  
  # END dialog define

  dialog.open = ->
    # Set height of dialog
    # --------------------
    $("##{prefix}-dialog .modal-body").css
      "max-height": window.innerHeight-141

    outerHeight = $("##{prefix}-dialog").outerHeight()

    # Vertically center
    $("##{prefix}-dialog").css
      "margin-top": -outerHeight/2

    $("##{prefix}-dialog").modal
      show: true
      backdrop: dialog.config.backdrop
    # --------------------
    # Set height of dialog

    return dialog
  # END dialog.open

  dialog.close = (delay) ->
    if delay
      setTimeout ->
        $("##{prefix}-dialog").modal "hide"
      , delay
    else
      $("##{prefix}-dialog").modal "hide"

    return dialog
  # END dialog.close

  module.exports = dialog
  
# END define
