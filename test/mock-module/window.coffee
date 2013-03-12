# window.coffee
#
# mock the "window" host object for Nodejs

global.window =
  localStorage : require "./localStorage"
