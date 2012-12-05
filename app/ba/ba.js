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

<<<<<<< HEAD
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
=======
            var model      = new Model({id:1,name:'shiyang',age:23}),
                collection = new Collection( model ),
                view       = new View( collection );

            window.collection = collection;
            window.Backbone = Backbone;
            
>>>>>>> f68c72ddfa38a7f7f669170e632fc626e1228a7e
        }

    });

    new Route();

    Backbone.history.start();

});
