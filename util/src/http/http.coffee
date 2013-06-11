# Zonda Util Http
# - - -
# Encapsulate the $.ajax

define ( require, exports, module ) ->
  $ = require "jquery"

  Http = (config) ->
    $.ajaxSetup
      dataType : "JSON"
      type : "POST"

      error : (error) ->
        config.caller.trigger "#{config.namespace}:HTTP:error",
          error,
          config.data

        # TODO:ERROR

      success: (respond) ->
        if (respond.status and respond.status isnt 1) or (respond.err and respond.err isnt null)
          console.log "ERROR" # TODO:ERROR

          config.caller.trigger "#{config.namespace}:HTTP:error",
            respond.info,
            config.data

        else
          config.caller.trigger "#{config.namespace}:HTTP:success",
            data,
            config.data

    # END $.ajaxSetup

    return $.ajax config
    # TODO:fakeServer
    # TODO:abort the ajax

  module.exports = Http
  
# END define
