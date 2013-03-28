# test case dialog
define ( require ) ->
  module "dialog"

  Util = require "util"

  $ = require "jquery"

  title = "title"
  content = "content"

  $ ->
    test "API", ->
      ok Util.dialog
      ok Util.dialog.open
      ok Util.dialog.close

      strictEqual typeof Util.dialog, "function"
      strictEqual typeof Util.dialog.open, "function"
      strictEqual typeof Util.dialog.close, "function"

    test "dialog.open", ->
      Util.dialog
        title: title
        content: content

      ok $("#zonda-util-dialog")[0]
      ok true

# END define
