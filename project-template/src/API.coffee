# Zonda API
# - - -
# For Type System

define ( require, exports, module ) ->

  API =
    dog: require "./genre/dog"

  window.Zonda =
    API: API
  
  module.exports = API

# END define
