# app.coffee
# setup the app
define ( require, exports, module ) ->
  $ = require "jquery"

  setTimeout ->
    $(".alert")
      .text("Try to test Zonda...")
  , 1300

  setTimeout ->
    $(".alert")
      .fadeOut "fast", ->
        $(@).addClass "alert-info"
        $(@).fadeIn "slow"
        $(@).text "Finished!"
  , 3300

  tpl = require "./tpl/main.tpl"

  console.log tpl

# END define
