define(function(require, exports, module){
    var Mustache = require('mustache');

    var view = {
        title: "Joe",
        calc: function () { // 在模板中的逻辑
            return 2 + 4;
        }
    };

    var output = Mustache.render("{{title}} spends {{calc}}", view);

    // DEBUG
    console.log(output);
    // END DEBUG

});
