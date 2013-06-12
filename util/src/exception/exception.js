// Generated by CoffeeScript 1.6.2
define(function(require, exports, module) {
  var Exception;

  Exception = function(type, error) {
    switch (type) {
      case "network":
        throw " HTTP ERROR!\ncaller: " + error.caller.NAME + "\nurl: " + error.url + "\nstatus: " + error.status + "\nresponseText: \n" + error.responseText;
        break;
      case "genre":
        throw " Genre ERROR!\nposition: " + error.position + "\nexpect: " + error.expect + "\nnot: " + error.not;
    }
  };
  return module.exports = Exception;
});