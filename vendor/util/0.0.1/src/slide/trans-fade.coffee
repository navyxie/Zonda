# Transition of Slide
# - - -
define ( require, exports, module ) ->

  module.exports = ( where, now, cells ) ->
    cells.eq(where).fadeIn 1000
    cells.eq(now).fadeOut 1000
  
# END define
