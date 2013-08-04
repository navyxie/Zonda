define ( require, exports, module ) ->
  Util = require "util"
  b = require "./b"

  do b

  tpl = require "./d.tpl"

  Util.Dialog
    title: "Welcome~"
    content: "Hi Zonda~"
  .open()
  
# END define
