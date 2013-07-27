# Init
# - - -
define ( require, exports, module ) ->

  Util = require "util"

  Util.dialog
    title: "1"
    content: "1"
    class: "hehe"
  .open().close(1300)

# END define
