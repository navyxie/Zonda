# test case message
define ( require ) ->
  module "Message"

  Util = require "util"

  Message = Util.message

  test "API", ->
    ok Message.error
    ok Message.success
    ok Message.tip
    ok Message.loading
