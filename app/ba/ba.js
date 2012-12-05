/**
 * ba.js
 * just for test Backbone sync
 */
define(function(require, exports, module){
    var Backbone = require('backbone');
    var $ = require('jquery');

    var Route = Backbone.Router.extend({

        routes : {
            '' : 'main'
        },

        main : function () {
            var Model      = require('./model'),
                Collection = require('./collection'),
                View       = require('./view');

            var collection = new Collection( Model );
            var view       = new View( collection );

            // TODO
            window.collection = collection;

            // Read
            collection.fetch();

            // Update
            collection.create({
                name: 'Degas',
                age: 23
            });

            // Delete

            // Create
        }

    });

    new Route();

    Backbone.history.start();

});
