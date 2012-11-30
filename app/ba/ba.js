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

            var model      = new Model({id:1,name:'shiyang',age:23}),
                collection = new Collection( model ),
                view       = new View( collection );

            window.collection = collection;
            window.Backbone = Backbone;
            
        }

    });

    new Route();

    Backbone.history.start();

});
