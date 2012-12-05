/**
 * model.js
 */
define(function(require, exports, module){
    var _ = require('underscore');
    var Backbone = require('backbone');
<<<<<<< HEAD
    var Util = require('util');

    var Model = Backbone.Model.extend({

        defaults : {
            id : 0,
            name : "shiyang",
            age : 12
        },

        sync : Util.sync
=======

    var Model = Backbone.Model.extend({

        initialize : function( defaults ) {
            this.defaults = defaults;
        }
>>>>>>> f68c72ddfa38a7f7f669170e632fc626e1228a7e

    });

    module.exports = Model;
    
});
