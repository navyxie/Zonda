# Zonda Util Slide Page
# - - -
define ( require, exports, module ) ->
  $ = require "jquery"
  Mustache = require "mustache"
  

  module.exports = (config) ->
    # Generate Page
    # - - -
    for index in [1...config.length]
      $(config.page.sel).append Mustache.render config.page.tpl, page: index

    $(config.page.sel).children.each (index) =>
      @goto index
      do @autoPlay

    @on "#{config.sel}:goto:slide:success", (now) =>
      $(config.page.sel).find(".active").removeClass "active"
      $(config.page.sel).children().eq(now.index).addClass "active"

# END define
