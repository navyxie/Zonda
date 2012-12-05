/**
 * model.js
 */
define(function(require, exports, module){
    var _ = require('underscore');
    var Backbone = require('backbone');
    var Util = require('util');

    var Model = Backbone.Model.extend({

        defaults : {
            id : 0,
            name : "shiyang",
            age : 12
        },

        sync : Util.sync

    });

    module.exports = Model;
    
});
