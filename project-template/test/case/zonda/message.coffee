# test case message
define ( require ) ->
  module "Message"

  Util = require "util"

  Message = Util.message

  test "API", ->
    ok Message.error "info"
