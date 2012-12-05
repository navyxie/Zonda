/**
 * collection.js
 */
define(function(require, exports, module){
    var _ = require('underscore');
    var Backbone = require('backbone');
    var Util = require('util');

    var Collection = Backbone.Collection.extend({

        initialize : function ( model ) {
            this.model = model;
        },

        // LocalStorage Sync
        sync : Util.sync

    });

    module.exports = Collection;
    
});
