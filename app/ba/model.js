/**
 * model.js
 */
define(function(require, exports, module){
    var _ = require('underscore');
    var Backbone = require('backbone');

    var Model = Backbone.Model.extend({

        initialize : function( defaults ) {
            this.defaults = defaults;
        }

    });

    module.exports = Model;
    
});
