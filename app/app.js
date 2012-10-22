/**
 * app.js
 * 入口
 */
define(function(require, exports, module){
    var Backbone  = require('backbone');

    var Route = Backbone.Router.extend({

        routes :  {
            ""     : "index",
            "todo" : "todo"
        },

        index : function () {
        },

        todo  : require('app/todo/controller')
    });

    new Route();

    Backbone.history.start();

});
