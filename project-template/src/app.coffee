define ( require, exports, module ) ->
  Util = require "util"
  b = require "./b"

  do b

  tpl = require "./d.tpl"

  Util.Dialog
    title: "Welcome~"
    content: "Hi Zonda~"
    button:
      "hehe": ->
        alert 1

  setTimeout ->
    do Util.Dialog.open
  , 1300
  
# END define
