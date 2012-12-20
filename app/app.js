define(function(require, exports, module){
    var Backbone = require('backbone');

    var model = Backbone.Model.extend({
        initialize : function ( def ) {
            this.defaults = def || { name : 'Degas', age : 23 };
        }
    });
});
