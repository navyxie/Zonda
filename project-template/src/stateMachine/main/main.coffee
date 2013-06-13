# View state of main
# - - -

define ( require, exports, module ) ->
  $ = require "jquery"

  module.exports =
    send:
      activate: ->
        do $("#mail-send-box").fadeIn

        $("#mail-template-list").fadeIn
          duration: 500
          always: ->
            $(@).find(".scroll").slideDown "fast"

        $("#mail-template-variable").fadeIn
          duration: 500
          always: ->
            $(@).find(".scroll").slideDown "fast"

      deactivate: ->
        do $("#mail-send-box").hide

        $("#mail-template-list").hide ->
          do $(@).find(".scroll").slideUp

        $("#mail-template-variable").hide ->
          do $(@).find(".scroll").slideUp

    setting:
      activate: ->
        do $("#mail-setting").fadeIn
      deactivate: ->
        do $("#mail-setting").hide

    status:
      activate: ->
        do $("#mail-status").fadeIn
      deactivate: ->
        do $("#mail-status").hide

# END define
