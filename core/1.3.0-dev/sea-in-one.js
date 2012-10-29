/*
 SeaJS - A Module Loader for the Web
 v1.3.0-dev | seajs.org | MIT Licensed
*/
this.seajs={_seajs:this.seajs};seajs.version="1.3.0-dev";seajs._util={};seajs._config={debug:"",preload:[]};
(function(a){var c=Object.prototype.toString,d=Array.prototype;a.isString=function(a){return"[object String]"===c.call(a)};a.isFunction=function(a){return"[object Function]"===c.call(a)};a.isRegExp=function(a){return"[object RegExp]"===c.call(a)};a.isObject=function(a){return a===Object(a)};a.isArray=Array.isArray||function(a){return"[object Array]"===c.call(a)};a.indexOf=d.indexOf?function(a,c){return a.indexOf(c)}:function(a,c){for(var b=0;b<a.length;b++)if(a[b]===c)return b;return-1};var b=a.forEach=
d.forEach?function(a,c){a.forEach(c)}:function(a,c){for(var b=0;b<a.length;b++)c(a[b],b,a)};a.map=d.map?function(a,c){return a.map(c)}:function(a,c){var d=[];b(a,function(a,b,e){d.push(c(a,b,e))});return d};a.filter=d.filter?function(a,c){return a.filter(c)}:function(a,c){var d=[];b(a,function(a,b,e){c(a,b,e)&&d.push(a)});return d};var e=a.keys=Object.keys||function(a){var c=[],b;for(b in a)a.hasOwnProperty(b)&&c.push(b);return c};a.unique=function(a){var c={};b(a,function(a){c[a]=1});return e(c)};
a.now=Date.now||function(){return(new Date).getTime()}})(seajs._util);(function(a){a.log=function(){if("undefined"!==typeof console){var a=Array.prototype.slice.call(arguments),d="log";console[a[a.length-1]]&&(d=a.pop());if("log"!==d||seajs.debug)if(console[d].apply)console[d].apply(console,a);else{var b=a.length;if(1===b)console[d](a[0]);else if(2===b)console[d](a[0],a[1]);else if(3===b)console[d](a[0],a[1],a[2]);else console[d](a.join(" "))}}}})(seajs._util);
(function(a,c,d){function b(a){a=a.match(p);return(a?a[0]:".")+"/"}function e(a){f.lastIndex=0;f.test(a)&&(a=a.replace(f,"$1/"));if(-1===a.indexOf("."))return a;for(var c=a.split("/"),b=[],d,e=0;e<c.length;e++)if(d=c[e],".."===d){if(0===b.length)throw Error("The path is invalid: "+a);b.pop()}else"."!==d&&b.push(d);return b.join("/")}function q(a){var a=e(a),c=a.charAt(a.length-1);if("/"===c)return a;"#"===c?a=a.slice(0,-1):-1===a.indexOf("?")&&!l.test(a)&&(a+=".js");0<a.indexOf(":80/")&&(a=a.replace(":80/",
"/"));return a}function i(a){if("#"===a.charAt(0))return a.substring(1);var b=c.alias;if(b&&s(a)){var d=a.split("/"),e=d[0];b.hasOwnProperty(e)&&(d[0]=b[e],a=d.join("/"))}return a}function k(a){return 0<a.indexOf("://")||0===a.indexOf("//")}function g(a){return"/"===a.charAt(0)&&"/"!==a.charAt(1)}function s(a){var c=a.charAt(0);return-1===a.indexOf("://")&&"."!==c&&"/"!==c}var p=/.*(?=\/.*$)/,f=/([^:\/])\/\/+/g,l=/\.(?:css|js)$/,o=/^(.*?\w)(?:\/|$)/,h={},d=d.location,r=d.protocol+"//"+d.host+function(a){"/"!==
a.charAt(0)&&(a="/"+a);return a}(d.pathname);0<r.indexOf("\\")&&(r=r.replace(/\\/g,"/"));a.dirname=b;a.realpath=e;a.normalize=q;a.parseAlias=i;a.parseMap=function(d){var f=c.map||[];if(!f.length)return d;for(var n=d,g=0;g<f.length;g++){var j=f[g];if(a.isArray(j)&&2===j.length){var i=j[0];if(a.isString(i)&&-1<n.indexOf(i)||a.isRegExp(i)&&i.test(n))n=n.replace(i,j[1])}else a.isFunction(j)&&(n=j(n))}k(n)||(n=e(b(r)+n));n!==d&&(h[n]=d);return n};a.unParseMap=function(a){return h[a]||a};a.id2Uri=function(a,
d){if(!a)return"";a=i(a);d||(d=r);var e;k(a)?e=a:0===a.indexOf("./")||0===a.indexOf("../")?(0===a.indexOf("./")&&(a=a.substring(2)),e=b(d)+a):e=g(a)?d.match(o)[1]+a:c.base+"/"+a;return q(e)};a.isAbsolute=k;a.isRoot=g;a.isTopLevel=s;a.pageUri=r})(seajs._util,seajs._config,this);
(function(a,c){function d(a,b){a.onload=a.onerror=a.onreadystatechange=function(){p.test(a.readyState)&&(a.onload=a.onerror=a.onreadystatechange=null,a.parentNode&&!c.debug&&k.removeChild(a),a=void 0,b())}}function b(c,b){h||r?(a.log("Start poll to fetch css"),setTimeout(function(){e(c,b)},1)):c.onload=c.onerror=function(){c.onload=c.onerror=null;c=void 0;b()}}function e(a,c){var b;if(h)a.sheet&&(b=!0);else if(a.sheet)try{a.sheet.cssRules&&(b=!0)}catch(d){"NS_ERROR_DOM_SECURITY_ERR"===d.name&&(b=
!0)}setTimeout(function(){b?c():e(a,c)},1)}function q(){}var i=document,k=i.head||i.getElementsByTagName("head")[0]||i.documentElement,g=k.getElementsByTagName("base")[0],s=/\.css(?:\?|$)/i,p=/loaded|complete|undefined/,f,l;a.fetch=function(c,e,h){var i=s.test(c),j=document.createElement(i?"link":"script");h&&(h=a.isFunction(h)?h(c):h)&&(j.charset=h);e=e||q;"SCRIPT"===j.nodeName?d(j,e):b(j,e);i?(j.rel="stylesheet",j.href=c):(j.async="async",j.src=c);f=j;g?k.insertBefore(j,g):k.appendChild(j);f=null};
a.getCurrentScript=function(){if(f)return f;if(l&&"interactive"===l.readyState)return l;for(var a=k.getElementsByTagName("script"),c=0;c<a.length;c++){var b=a[c];if("interactive"===b.readyState)return l=b}};a.getScriptAbsoluteSrc=function(a){return a.hasAttribute?a.src:a.getAttribute("src",4)};a.importStyle=function(a,c){if(!c||!i.getElementById(c)){var b=i.createElement("style");c&&(b.id=c);k.appendChild(b);b.styleSheet?b.styleSheet.cssText=a:b.appendChild(i.createTextNode(a))}};var o=navigator.userAgent,
h=536>Number(o.replace(/.*AppleWebKit\/(\d+)\..*/,"$1")),r=0<o.indexOf("Firefox")&&!("onload"in document.createElement("link"))})(seajs._util,seajs._config,this);(function(a){var c=/(?:^|[^.$])\brequire\s*\(\s*(["'])([^"'\s\)]+)\1\s*\)/g;a.parseDependencies=function(d){var b=[],e,d=d.replace(/^\s*\/\*[\s\S]*?\*\/\s*$/mg,"").replace(/^\s*\/\/.*$/mg,"");for(c.lastIndex=0;e=c.exec(d);)e[2]&&b.push(e[2]);return a.unique(b)}})(seajs._util);
(function(a,c,d){function b(a,c){this.uri=a;this.status=c||0}function e(a,d){return c.isString(a)?b._resolve(a,d):c.map(a,function(a){return e(a,d)})}function q(a,e){var m=c.parseMap(a);w[m]?(f[a]=f[m],e()):r[m]?u[m].push(e):(r[m]=!0,u[m]=[e],b._fetch(m,function(){w[m]=!0;var b=f[a];b.status===h.FETCHING&&(b.status=h.FETCHED);n&&(i(a,n),n=null);t&&b.status===h.FETCHED&&(f[a]=t,t.realUri=a);t=null;r[m]&&delete r[m];u[m]&&(c.forEach(u[m],function(a){a()}),delete u[m])},d.charset))}function i(a,d){var m=
f[a]||(f[a]=new b(a));m.status<h.SAVED&&(m.id=d.id||a,m.dependencies=e(c.filter(d.dependencies||[],function(a){return!!a}),a),m.factory=d.factory,m.status=h.SAVED);return m}function k(a,c){var b=a(c.require,c.exports,c);void 0!==b&&(c.exports=b)}function g(a){var b=a.realUri||a.uri,d=l[b];d&&(c.forEach(d,function(c){k(c,a)}),delete l[b])}function s(a){var b=a.uri;return c.filter(a.dependencies,function(a){j=[b];if(a=p(f[a],b))j.push(b),c.log("Found circular dependencies:",j.join(" --\> "),void 0);
return!a})}function p(a,b){if(!a||a.status!==h.SAVED)return!1;j.push(a.uri);var d=a.dependencies;if(d.length){if(-1<c.indexOf(d,b))return!0;for(var e=0;e<d.length;e++)if(p(f[d[e]],b))return!0}return!1}var f={},l={},o=[],h={FETCHING:1,FETCHED:2,SAVED:3,READY:4,COMPILING:5,COMPILED:6};b.prototype._use=function(a,b){c.isString(a)&&(a=[a]);var d=e(a,this.uri);this._load(d,function(){var a=c.map(d,function(a){return a?f[a]._compile():null});b&&b.apply(null,a)})};b.prototype._load=function(a,d){function e(a){(a||
{}).status<h.READY&&(a.status=h.READY);0===--i&&d()}var y=c.filter(a,function(a){return a&&(!f[a]||f[a].status<h.READY)}),k=y.length;if(0===k)d();else for(var i=k,g=0;g<k;g++)(function(a){function c(){d=f[a];if(d.status>=h.SAVED){var x=s(d);x.length?b.prototype._load(x,function(){e(d)}):e(d)}else e()}var d=f[a]||(f[a]=new b(a,h.FETCHING));d.status>=h.FETCHED?c():q(a,c)})(y[g])};b.prototype._compile=function(){function a(c){c=e(c,b.uri);c=f[c];if(!c)return null;if(c.status===h.COMPILING)return c.exports;
c.parent=b;return c._compile()}var b=this;if(b.status===h.COMPILED)return b.exports;if(b.status<h.READY&&!l[b.realUri||b.uri])return null;b.status=h.COMPILING;a.async=function(a,c){b._use(a,c)};a.resolve=function(a){return e(a,b.uri)};a.cache=f;b.require=a;b.exports={};var d=b.factory;c.isFunction(d)?(o.push(b),k(d,b),o.pop()):void 0!==d&&(b.exports=d);b.status=h.COMPILED;g(b);return b.exports};b._define=function(a,b,d){var k=arguments.length;1===k?(d=a,a=void 0):2===k&&(d=b,b=void 0,c.isArray(a)&&
(b=a,a=void 0));!c.isArray(b)&&c.isFunction(d)&&(b=c.parseDependencies(d.toString()));var k={id:a,dependencies:b,factory:d},g;if(document.attachEvent){var j=c.getCurrentScript();j&&(g=c.unParseMap(c.getScriptAbsoluteSrc(j)));g||c.log("Failed to derive URI from interactive script for:",d.toString(),"warn")}if(j=a?e(a):g){if(j===g){var l=f[g];l&&(l.realUri&&l.status===h.SAVED)&&(f[g]=null)}k=i(j,k);if(g){if((f[g]||{}).status===h.FETCHING)f[g]=k,k.realUri=g}else t||(t=k)}else n=k};b._getCompilingModule=
function(){return o[o.length-1]};b._find=function(a){var b=[];c.forEach(c.keys(f),function(d){if(c.isString(a)&&-1<d.indexOf(a)||c.isRegExp(a)&&a.test(d))d=f[d],d.exports&&b.push(d.exports)});return b};b._modify=function(b,c){var d=e(b),g=f[d];g&&g.status===h.COMPILED?k(c,g):(l[d]||(l[d]=[]),l[d].push(c));return a};b.STATUS=h;b._resolve=c.id2Uri;b._fetch=c.fetch;b.cache=f;var r={},w={},u={},n=null,t=null,j=[],v=new b(c.pageUri,h.COMPILED);a.use=function(c,b){var e=d.preload;e.length?v._use(e,function(){d.preload=
[];v._use(c,b)}):v._use(c,b);return a};a.define=b._define;a.cache=b.cache;a.find=b._find;a.modify=b._modify;a.pluginSDK={Module:b,util:c,config:d}})(seajs,seajs._util,seajs._config);
(function(a,c,d){var b="seajs-ts="+c.now(),e=document.getElementById("seajsnode");e||(e=document.getElementsByTagName("script"),e=e[e.length-1]);var q=e&&c.getScriptAbsoluteSrc(e)||c.pageUri,q=c.dirname(function(a){if(a.indexOf("??")===-1)return a;var b=a.split("??"),a=b[0],b=c.filter(b[1].split(","),function(a){return a.indexOf("sea.js")!==-1});return a+b[0]}(q));c.loaderDir=q;var i=q.match(/^(.+\/)seajs\/[\d\.]+\/$/);i&&(q=i[1]);d.base=q;if(e=e&&e.getAttribute("data-main"))d.main=e;d.charset="utf-8";
a.config=function(e){for(var g in e)if(e.hasOwnProperty(g)){var i=d[g],p=e[g];if(i&&g==="alias")for(var f in p){if(p.hasOwnProperty(f)){var l=i[f],o=p[f];/^\d+\.\d+\.\d+$/.test(o)&&(o=f+"/"+o+"/"+f);l&&l!==o&&c.log("The alias config is conflicted:","key =",'"'+f+'"',"previous =",'"'+l+'"',"current =",'"'+o+'"',"warn");i[f]=o}}else if(i&&(g==="map"||g==="preload")){c.isString(p)&&(p=[p]);c.forEach(p,function(a){a&&i.push(a)})}else d[g]=p}if((e=d.base)&&!c.isAbsolute(e))d.base=c.id2Uri((c.isRoot(e)?
"":"./")+e+"/");if(d.debug===2){d.debug=1;a.config({map:[[/^.*$/,function(a){a.indexOf("seajs-ts=")===-1&&(a=a+((a.indexOf("?")===-1?"?":"&")+b));return a}]]})}if(d.debug)a.debug=!!d.debug;return this};d.debug&&(a.debug=!!d.debug)})(seajs,seajs._util,seajs._config);
(function(a,c,d){a.log=c.log;a.importStyle=c.importStyle;a.config({alias:{seajs:c.loaderDir}});c.forEach(function(){var a=[],e=d.location.search,e=e.replace(/(seajs-\w+)(&|$)/g,"$1=1$2"),e=e+(" "+document.cookie);e.replace(/seajs-(\w+)=[1-9]/g,function(c,d){a.push(d)});return c.unique(a)}(),function(b){a.use("seajs/plugin-"+b);"debug"===b&&(a._use=a.use,a._useArgs=[],a.use=function(){a._useArgs.push(arguments);return a})})})(seajs,seajs._util,this);
(function(a,c,d){var b=a._seajs;if(b&&!b.args)d.seajs=a._seajs;else{d.define=a.define;c.main&&a.use(c.main);if(c=(b||0).args)for(var b={"0":"config",1:"use",2:"define"},e=0;e<c.length;e+=2)a[b[c[e]]].apply(a,c[e+1]);d.define.cmd={};delete a.define;delete a._util;delete a._config;delete a._seajs}})(seajs,seajs._config,this);
define("seajs/plugin-base",[],function(m,k){var l=seajs.pluginSDK,i=l.util,h=l.Module,g={},j={};k.add=function(b){g[b.name]=b};k.util={xhr:function(b,a){var c=window.ActiveXObject?new window.ActiveXObject("Microsoft.XMLHTTP"):new window.XMLHttpRequest;c.open("GET",b,!0);c.onreadystatechange=function(){if(4===c.readyState)if(200===c.status)a(c.responseText);else throw Error("Could not load: "+b+", status = "+c.status);};return c.send(null)},globalEval:function(b){b&&/\S/.test(b)&&(window.execScript||
function(a){window.eval.call(window,a)})(b)}};(function(){var b=h._resolve;h._resolve=function(a,c){var d,e;if(e=a.match(/^(\w+)!(.+)$/))d=e[1],a=e[2];a="#"+i.parseAlias(a);if(!d&&(e=a.match(/[^?]*(\.\w+)/))){e=e[1];for(var f in g)if(g.hasOwnProperty(f)&&-1<i.indexOf(g[f].ext,e)){d=f;break}}d&&!/\?|#$/.test(a)&&(a+="#");f=b(a,c);d&&(g[d]&&!j[f])&&(j[f]=d);return f}})();(function(){var b=h._fetch;h._fetch=function(a,c,d){var e=j[i.unParseMap(a)];e?g[e].fetch(a,c,d):b(a,c,d)}})()});
/**
 * The text plugin to load a module as text content
 */
define('seajs/plugin-text', ['./plugin-base'], function(require) {

  var plugin = require('./plugin-base')
  var util = plugin.util


  plugin.add({
    name: 'text',

    ext: ['.tpl', '.htm', '.html'],

    fetch: function(url, callback) {
      util.xhr(url, function(data) {
        var str = jsEscape(data)
        util.globalEval('define([], "' + str + '")')
        callback()
      })
    }
  })


  function jsEscape(s) {
    return s.replace(/(["\\])/g, '\\$1')
        .replace(/\r/g, "\\r")
        .replace(/\n/g, "\\n")
        .replace(/\t/g, "\\t")
        .replace(/\f/g, "\\f")
  }

});

// Runs it immediately
seajs.use('seajs/plugin-text');

