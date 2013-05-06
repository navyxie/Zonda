# test case base64
define ( require ) ->
  module "Dialog"

  Util = require "util"

  Dialog = Util.dialog

  test "API", ->
    ok Dialog.open
    ok Dialog.close

    strictEqual typeof Dialog.open, "function"
    strictEqual typeof Dialog.close, "function"

  test "Dialog Render", ->
    Dialog
      title: "small"
      content: "big"
      button:
        "hehe": ->
    .open()

    ok Dialog.$dom[0]

    strictEqual Dialog.$dom.find(".modal-header h3").text(), "small"

    ok /big/.test Dialog.$dom.find(".modal-body").text()

    ok /hehe/.test Dialog.$dom.find(".modal-footer button[id]").text()

    do Dialog.close
    
  test "Dialog Style", ->
    do Dialog.close

    Dialog
      title: "small"
      content: "big"
      class: "haha"
      button:
        "hehe": ->
    .open()

    ok Dialog.$dom.hasClass "haha"

    do Dialog.close
    
  test "Dialog button callback", ->
    do Dialog.close

    num = 1

    Dialog
      title: "small"
      content: "big"
      class: "haha"
      button:
        "hehe": ->
          num = 2
          do start
    .open()

    do stop

    Dialog.$dom.find(".modal-footer button").trigger "click"

    strictEqual num, 2

    do Dialog.close

# END define
