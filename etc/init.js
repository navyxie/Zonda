var app_version_type="dev",

  alias = {
    "util" : "util/0.1.1/src/util",
    "jquery" : "lib/jquery/1.9.1/jquery/src/jquery",
    "jquery-ui" : "lib/jquery-ui/1.9.0/jquery-ui",
    "underscore" : "lib/underscore/1.4.2/underscore",
    "backbone" : "lib/backbone/0.9.2/backbone",
    "bootstrap" : "lib/bootstrap/2.2.1/bootstrap",
    "mustache" : "lib/mustache/0.7.1/mustache",
    "easing" : "lib/easing/1.3.0/easing",
    "fancybox" : "lib/fancybox/1.3.4/fancybox",
    "zepto" : "lib/zepto/1.0.1/zepto",
    "modernizr" : "lib/modernizr/2.6.1/modernizr",
    "moment" : "lib/moment/1.7.2/moment"
  };

switch( app_version_type ) {
    case "dev":
        seajs.config({
            base : "/Zonda",
            alias : {
                "util" : "util/0.1.1/src/util",
                "jquery" : "lib/jquery/1.9.1/jquery/src/jquery",
                "jquery-ui" : "lib/jquery-ui/1.9.0/jquery-ui",
                "underscore" : "lib/underscore/1.4.2/underscore",
                "backbone" : "lib/backbone/0.9.2/backbone",
                "bootstrap" : "lib/bootstrap/2.2.1/bootstrap",
                "mustache" : "lib/mustache/0.7.1/mustache",
                "easing" : "lib/easing/1.3.0/easing",
                "fancybox" : "lib/fancybox/1.3.4/fancybox",
                "zepto" : "lib/zepto/1.0.1/zepto",
                "modernizr" : "lib/modernizr/2.6.1/modernizr",
                "moment" : "lib/moment/1.7.2/moment"
            },
            preload : [
                Function.prototype.bind ? "" : "lib/es5-shim/2.0.5/es5-shim",
                "core/1.3.0/plugin-text",
                window.JSON ? "" : "lib/json2/1.1.1/json2"
            ],
            charset : "utf-8"
        });
        seajs.use("app/app");
        break;
    case "prod":
        seajs.config({
            base : "/Zonda",
            preload : [
                Function.prototype.bind ? "" : "lib/es5-shim/2.0.5/es5-shim",
                window.JSON ? "" : "lib/json2/1.1.1/json2"
            ],
            charset : "utf-8"
        });
        seajs.use("dist/app");
        break;
    case "test":
        seajs.config({
            base : "/Zonda",
            alias : {
                "util" : "util/0.1.1/src/util",
                "mustache" : "lib/mustache/0.7.1/mustache",
                "underscore" : "lib/underscore/1.4.2/underscore",
                "bootstrap" : "lib/bootstrap/2.2.1/bootstrap",
                "jquery" : "lib/jquery/1.8.2/jquery",
                "jquery-ui" : "lib/jquery-ui/1.9.0/jquery-ui",
                "easing" : "lib/easing/1.3.0/easing",
                "modernizr" : "lib/modernizr/2.6.1/modernizr",
                "moment" : "lib/moment/1.7.2/moment",
                "zepto" : "lib/zepto/1.0.1/zepto",
                "backbone" : "lib/backbone/0.9.2/backbone",
                "fancybox" : "lib/fancybox/1.3.4/fancybox",
                "qunit" : "test/qunit/1.10.0/qunit",
                "sinon" : "test/addons/sinon"
            },
            preload : [
                Function.prototype.bind ? "" : "lib/es5-shim/2.0.5/es5-shim",
                "core/1.3.0/plugin-text",
                window.JSON ? "" : "lib/json2/1.1.1/json2"
            ],
            charset : "utf-8"
        });
        seajs.use("test/test");
        seajs.use("app/app");
        break;
    default:
        alert("Zonda Config Error!");
}
