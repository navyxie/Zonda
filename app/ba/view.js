/**
 * view.js
 */
define(function(require, exports, module){
    var _ = require('underscore');
    var Backbone = require('backbone');
    var $ = require('jquery');

    var View = Backbone.View.extend({

        initialize : function ( model ) {
            this.model = model;
        }

    });

    module.exports = View;
    
});
