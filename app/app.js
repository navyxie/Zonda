define(function(require){
    var Util = require("util");

    var aoo = Util.base64.encode("式样");

    aoo = Util.base64.decode(aoo);

    console.log(aoo);

});
