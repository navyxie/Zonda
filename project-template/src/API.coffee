# Zonda API
# - - -
# For Type System

define "Zonda/API", [], ( require, exports, module ) ->
  API =
    dog: require "./genre/dog"

  window.Zonda =
    API: API
  
  module.exports = API

# END define
