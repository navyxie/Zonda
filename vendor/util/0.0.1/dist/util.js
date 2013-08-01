define("/assets/vendor/Zonda/vendor/util/0.0.1/util",["./base64/base64","underscore","./dialog/dialog","bootstrap","mustache","./dialog/tpl/dialog.tpl","./exception/exception","./http/http","jquery","test/fake/server","./stateMachine/stateMachine","backbone","./genre/genre","./model/model","./collection/collection"],function(a,b,c){return c.exports={Base64:a("./base64/base64"),Dialog:a("./dialog/dialog"),Exception:a("./exception/exception"),Http:a("./http/http"),StateMachine:a("./stateMachine/stateMachine"),Genre:a("./genre/genre"),Model:a("./model/model"),Collection:a("./collection/collection")}}),define("/assets/vendor/Zonda/vendor/util/0.0.1/base64/base64",["underscore"],function(a,b,c){var d,e,f,g,h,i,j,k;return e=a("underscore"),g="=",f="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",d=function(a){var b;return b=JSON.stringify(a),b.replace(/[\u007f-\uffff]/g,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})},k=function(a,b){var c;if(c=f.indexOf(a.charAt(b)),-1===c)throw"Cannot decode base64";return c},h=function(a){var b,c,d,e,f,h;if(e=0,d=a.length,f=[],a=String(a),0===d)return a;if(0!==d%4)throw"Cannot decode base64";for(a.charAt(d-1)===g&&(e=1,a.charAt(d-2)===g&&(e=2),d-=4),c=h=0;d>h;c=h+=4)b=k(a,c)<<18|k(a,c+1)<<12|k(a,c+2)<<6|k(a,c+3),f.push(String.fromCharCode(b>>16,255&b>>8,255&b));switch(e){case 1:b=k(a,c)<<18|k(a,c+1)<<12|k(a,c+2)<<6,f.push(String.fromCharCode(b>>16,255&b>>8));break;case 2:b=k(a,c)<<18|k(a,c+1)<<12,f.push(String.fromCharCode(b>>16))}return f.join("")},j=function(a,b){var c;if(c=a.charCodeAt(b),c>255)throw"INVALID_CHARACTER_ERR: DOM Exception 5";return c},i=function(a){var b,c,d,e,h;if(1!==arguments.length)throw"SyntaxError: exactly one argument required";if(a=String(a),e=[],d=a.length-a.length%3,0===a.length)return a;for(c=h=0;d>h;c=h+=3)b=j(a,c)<<16|j(a,c+1)<<8|j(a,c+2),e.push(f.charAt(b>>18)),e.push(f.charAt(63&b>>12)),e.push(f.charAt(63&b>>6)),e.push(f.charAt(63&b));switch(a.length-d){case 1:b=j(a,c)<<16,e.push(f.charAt(b>>18)+f.charAt(63&b>>12)+g+g);break;case 2:b=j(a,c)<<16|j(a,c+1)<<8,e.push(f.charAt(b>>18)+f.charAt(63&b>>12)+f.charAt(63&b>>6)+g)}return e.join("")},c.exports={decode:function(a){return a=h(a),JSON.parse(a)},encode:function(a){return a=d(a),i(a)}}}),define("/assets/vendor/Zonda/vendor/util/0.0.1/dialog/dialog",["bootstrap","underscore","mustache"],function(a,b,c){var d,e,f,g,h,i;return d=a("bootstrap"),i=a("underscore"),e=a("mustache"),h=a("/assets/vendor/Zonda/vendor/util/0.0.1/dialog/tpl/dialog.tpl"),g="zonda-util",f=function(a){var b;return f.config=a,d("#"+g+"-dialog:visible")[0]?!1:(b=e.render(h,{title:a.title,content:a.content}),d(document.body).append(b),a.css&&d("#"+g+"-dialog").css(a.css),a["class"]&&d("#"+g+"-dialog").addClass(a["class"]),i.each(a.button,function(a,b){var c;return c=i.uniqueId(""+g+"-dialog-button-"),d("#"+g+"-dialog .modal-footer").append('<button id="'+c+'" class="btn btn-success">\n  '+b+"\n</button>"),d("#"+c).on("click",function(){return d(this).hasClass("disabled")?!1:(d(this).addClass("disabled"),a())})}),f.$dom=d("#"+g+"-dialog"),d("#"+g+"-dialog").on("hide",function(){return delete d("#"+g+"-dialog").modal,d("#"+g+"-dialog").remove(),d(".modal-backdrop").remove()}),f)},f.open=function(){var a;return d("#"+g+"-dialog .modal-body").css({"max-height":window.innerHeight-141}),a=d("#"+g+"-dialog").outerHeight(),d("#"+g+"-dialog").css({"margin-top":-a/2}),d("#"+g+"-dialog").modal({show:!0,backdrop:f.config.backdrop}),f},f.close=function(a){return a?setTimeout(function(){return d("#"+g+"-dialog").modal("hide")},a):d("#"+g+"-dialog").modal("hide"),f},c.exports=f}),define("/assets/vendor/Zonda/vendor/util/0.0.1/dialog/tpl/dialog.tpl",[],'<div id="zonda-util-dialog" class="modal fade hide" tabindex="-1" role="dialog" aria-hidden="true">\n  <div class="modal-header">\n    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>\n    <h3>{{title}}</h3>\n  </div>\n  <div class="modal-body">\n    {{{content}}}\n  </div>\n  <div class="modal-footer">\n    <button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>\n  </div>\n</div>\n'),define("/assets/vendor/Zonda/vendor/util/0.0.1/exception/exception",[],function(a,b,c){var d;return d=function(a,b){switch(a){case"network":throw" HTTP ERROR!\ncaller: "+b.caller.NAME+"\nurl: "+b.url+"\nstatus: "+b.status+"\nresponseText: \n"+b.responseText;case"genre":throw" Genre ERROR!\nposition: "+b.position+"\nexpect: "+b.expect+"\nnot: "+b.not}},c.exports=d}),define("/assets/vendor/Zonda/vendor/util/0.0.1/http/http",["jquery","test/fake/server","/assets/vendor/Zonda/vendor/util/0.0.1/exception/exception"],function(a,b,c){var d,e,f,g;return d=a("jquery"),f=a("test/fake/server"),e=a("/assets/vendor/Zonda/vendor/util/0.0.1/exception/exception"),g=function(a){return d.ajaxSetup({dataType:"JSON",type:"POST",error:function(b){return a.caller.trigger(""+a.namespace+":HTTP:error",b,a.data),e("network",{caller:a.caller,url:a.url,status:b.status,statusText:b.statusText,responseText:b.responseText})},success:function(b){return b.status&&1!==b.status||b.err&&null!==b.err?(console.log("ERROR"),a.caller.trigger(""+a.namespace+":HTTP:error",b.info,a.data)):a.caller.trigger(""+a.namespace+":HTTP:success",b.data,a.data)}}),a.fake?(d.ajax(a),f(a.url)):d.ajax(a)},c.exports=g}),define("/assets/vendor/Zonda/vendor/util/0.0.1/stateMachine/stateMachine",["underscore","backbone"],function(a,b,c){var d,e,f;return f=a("underscore"),d=a("backbone"),e=function(){},f.extend(e.prototype,d.Events),e.prototype.add=function(a){var b=this;return this.on("view:change",function(b){return b===a?a.activate():a.deactivate()},this),a.active=function(){return b.trigger("view:change",a)}},c.exports=e}),define("/assets/vendor/Zonda/vendor/util/0.0.1/genre/genre",["underscore","/assets/vendor/Zonda/vendor/util/0.0.1/exception/exception"],function(a,b,c){var d,e,f,g;return g=a("underscore"),d=a("/assets/vendor/Zonda/vendor/util/0.0.1/exception/exception"),f=function(a){return Object.prototype.toString.call(a)},e=function(){function a(a,b){var c=this;this.NAME=a,this.API=b,this.GENRE={},this.recursive(this.API.genre,function(a,b,d){var e,f;return d=d.replace(/\s*/g,"").split("/"),e=g.clone(d),g.each(d,function(a,b){return d[b]=a.split("~")[0],e[b]=function(){var b;return b=a.split(":")[0].split("~"),b.length<2?b[0]:b[1]}()}),d=d.join("/"),e=e.join("/"),a=a.replace(/\s*/g,""),f=a.split(":"),c.GENRE[d]={local_name:f[0].split("~")[0],remote_name:f[0].split("~")[1],genre:f[1].replace(/^@/g,""),essential_act:void 0},c.GENRE[e]=c.GENRE[d]})}return a.prototype.recursive=function(a,b,c){var d,e,h=this;return e=this.NAME?this.NAME:"TOP",c||(c=e),"[object Object]"===f(a)?(d={},g.each(a,function(a,e){var g,i;return g=""+c+"/"+e,i=b(e,a,g),i&&(e=i),d[e]=a,"[object Object]"===f(a)||"[object Array]"===f(a)?d[e]=h.recursive(a,b,g):void 0}),d):"[object Array]"===f(a)?(d=[],g.each(a,function(a){return d.push(h.recursive(a,b,""+c+"/[]"))}),d):a},a.prototype.genre_map={Function:"[object Function]",Object:"[object Object]",Array:"[object Array]",Number:"[object Number]",String:"[object String]"},a.prototype.inspect=function(a){var b,c=this;return b=g.clone(this.GENRE),this.recursive(a,function(a,e,g){return c.GENRE[g]?c.genre_map[c.GENRE[g].genre]!==f(e)?d("genre",{position:g,expect:c.genre_map[c.GENRE[g].genre],not:f(e)}):b[g].is_inspected=!0:null}),!0},a.prototype.modifyKey=function(a,b){var c=this;return this.recursive(a,function(a,d,e){return c.GENRE[e]?c.GENRE[e][b]:void 0})},a.prototype.toLocal=function(a){return this.modifyKey(a,"local_name")},a.prototype.toRemote=function(a){return this.modifyKey(a,"remote_name")},a}(),c.exports=e}),define("/assets/vendor/Zonda/vendor/util/0.0.1/model/model",["underscore","backbone","/assets/vendor/Zonda/vendor/util/0.0.1/genre/genre","/assets/vendor/Zonda/vendor/util/0.0.1/exception/exception","/assets/vendor/Zonda/vendor/util/0.0.1/http/http","jquery","test/fake/server"],function(a,b,c){var d,e,f,g,h;return h=a("underscore"),d=a("backbone"),e=a("/assets/vendor/Zonda/vendor/util/0.0.1/genre/genre"),f=a("/assets/vendor/Zonda/vendor/util/0.0.1/http/http"),g=function(){function a(a,b){var c=this;this.NAME=a,this.API=b,h.extend(this,d.Events),this.connection_stack=[],this.namespace=this.id?""+this.NAME+":"+this.id:""+this.NAME,this.genre=new e("@"+this.NAME,this.API),h.each(this.API,function(a,b){return"genre"!==b?c[b]=function(a){return c.sync(b,a)}:void 0})}return a.prototype.sync=function(a,b){var c=this;if(void 0!==b&&"object"!=typeof b)throw"["+this.NAME+"] Model.sync ERROR: request is not a object!";return this.genre.inspect(b),this.genre.toRemote(b),this.once(""+this.namespace+":"+a+":HTTP:success",function(b){return b=c.genre.toLocal(b),c.trigger(""+c.namespace+":"+a+":success",b)}),this.connection_stack.push(f({url:this.API[a].url,data:b,caller:this,namespace:""+this.namespace+":"+a,fake:this.API[a].fake}))},a.prototype.abort=function(){return h.each(this.connection_stack,function(a){return a.abort()})},a}(),c.exports=g});var __hasProp={}.hasOwnProperty,__extends=function(a,b){function c(){this.constructor=a}for(var d in b)__hasProp.call(b,d)&&(a[d]=b[d]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a};define("/assets/vendor/Zonda/vendor/util/0.0.1/collection/collection",["underscore","backbone","/assets/vendor/Zonda/vendor/util/0.0.1/exception/exception","/assets/vendor/Zonda/vendor/util/0.0.1/genre/genre","/assets/vendor/Zonda/vendor/util/0.0.1/model/model","/assets/vendor/Zonda/vendor/util/0.0.1/http/http","jquery","test/fake/server"],function(a,b,c){var d,e,f,g,h,i;return i=a("underscore"),d=a("backbone"),f=a("/assets/vendor/Zonda/vendor/util/0.0.1/exception/exception"),g=a("/assets/vendor/Zonda/vendor/util/0.0.1/genre/genre"),h=a("/assets/vendor/Zonda/vendor/util/0.0.1/model/model"),e=function(a){function b(a){i.extend(this,d.Events),this.NAME=a.NAME,this.namespace=this.NAME,this.API=a.API,this.Model=a.Model,this.View=a.View,this.model_list={},this.view_list={},this.genre=new g("@"+this.NAME,this.API),this.connection_stack=[]}return __extends(b,a),b.prototype.fetch=function(){return this.once(""+this.NAME+":READ_LIST:HTTP:success",this.update,this),this.sync("READ_LIST")},b.prototype.update=function(a){var b=this;return"[object Array]"!==Object.prototype.toString.call(a)&&f("genre",{position:"Collection:"+this.NAME+":READ_LIST",expect:"array",not:typeof a}),i.each(a,function(a){return a=Math.abs(a),b.model_list[a]?b.model_list[a].READ({id:a}):b.factory(a)}),i.each(this.model_list,function(b,c){return c=Math.abs(c),-1===i.indexOf(a,c)?(delete this.model_list[c],this.view_list[c].remove(),delete this.view_list[c]):void 0})},b.prototype.factory=function(a){var b,c;return b=new this.Model(""+this.NAME,this.API),b.id=a,c=new this.View(b),this.model_list[a]=b,this.view_list[a]=c,b.READ({id:b.id})},b}(h),c.exports=e});