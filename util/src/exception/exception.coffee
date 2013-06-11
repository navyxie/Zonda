# Zonda Util Exception
# - - -
define ( require, exports, module ) ->
  Exception = ( type, error ) ->

    switch type
      when "network"
        throw """ HTTP ERROR!
          caller: #{error.caller.NAME}
          url: #{error.url}
          status: #{error.status}
          responseText: \n#{error.responseText}
        """

  module.exports = Exception
  
# END define
