/**
 * collection.js
 */
define(function(require, exports, module){
    var _ = require('underscore');
    var Backbone = require('backbone');
<<<<<<< HEAD
    var Util = require('util');
=======
>>>>>>> f68c72ddfa38a7f7f669170e632fc626e1228a7e

    var Collection = Backbone.Collection.extend({

        initialize : function ( model ) {
            this.model = model;
        },

        // LocalStorage Sync
<<<<<<< HEAD
        sync : Util.sync
=======
        sync : function ( method, model ) {
            var data = JSON.parse( localStorage.zondaBackboneData );
        }
>>>>>>> f68c72ddfa38a7f7f669170e632fc626e1228a7e

    });

    module.exports = Collection;
    
});
