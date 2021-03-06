// Generated by CoffeeScript 1.6.2
define(function(require, exports, module) {
  var $, Exception, FakeServer, Http;

  $ = require("jquery");
  FakeServer = require("test/fake/server");
  Exception = require("../exception/exception");
  Http = function(config) {
    $.ajaxSetup({
      dataType: "JSON",
      type: "POST",
      error: function(error) {
        config.caller.trigger("" + config.namespace + ":HTTP:error", error, config.data);
        return Exception("network", {
          caller: config.caller,
          url: config.url,
          status: error.status,
          statusText: error.statusText,
          responseText: error.responseText
        });
      },
      success: function(respond) {
        if ((respond.status && respond.status !== 1) || (respond.err && respond.err !== null)) {
          console.log("ERROR");
          return config.caller.trigger("" + config.namespace + ":HTTP:error", respond.info, config.data);
        } else {
          return config.caller.trigger("" + config.namespace + ":HTTP:success", respond.data, config.data);
        }
      }
    });
    $.ajax(config);
    return FakeServer(config.url);
  };
  return module.exports = Http;
});
