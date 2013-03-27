# test case dialog
define ( require ) ->
  module "dialog"

  Util = require "util"

  dialog = Util.dialog

  test "API", ->
    ok dialog
    ok dialog.open
    ok dialog.close

    strictEqual typeof dialog, "function"
    strictEqual typeof dialog.open, "function"
    strictEqual typeof dialog.close, "function"
  
# END define
