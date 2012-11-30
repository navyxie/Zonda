/**
 * collection.js
 */
define(function(require, exports, module){
    var _ = require('underscore');
    var Backbone = require('backbone');

    var Collection = Backbone.Collection.extend({

        initialize : function ( model ) {
            this.model = model;
        },

        // LocalStorage Sync
        sync : function ( method, model ) {
            var data = JSON.parse( localStorage.zondaBackboneData );
        }

    });

    module.exports = Collection;
    
});
