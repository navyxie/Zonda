# Zonda Util Slide Page
# - - -
define ( require, exports, module ) ->
  $ = require "jquery"
  Mustache = require "mustache"

  timer = ""

  module.exports = (config) ->
    # Generate Page
    # - - -
    for index in [0...@length]
      $(config.page.sel).append Mustache.render config.page.tpl, page: index

    $(config.page.sel).children().each (index) =>
      $(config.page.sel).children().eq(index).on "mouseover", =>
        clearTimeout timer
        timer = setTimeout =>
          @goto index
          do @autoPlay
        , 300

    @on "#{config.sel}:goto:slide:success", (now) =>
      $(config.page.sel).find(".active").removeClass "active"
      $(config.page.sel).children().eq(now.index).addClass "active"

# END define
