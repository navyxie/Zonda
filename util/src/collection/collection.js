// Generated by CoffeeScript 1.6.2
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(function(require, exports, module) {
  var Collection, Exception, Model, _;

  _ = require("underscore");
  Model = require("../model/model");
  Exception = require("../exception/exception");
  Collection = (function(_super) {
    __extends(Collection, _super);

    function Collection(config) {
      _.extend(this, Backbone.Events);
      this.NAME = config.NAME;
      this.API = config.API;
      this.Model = config.Model;
      this.View = config.View;
      this.model_list = {};
      this.view_list = {};
    }

    Collection.prototype.fetch = function() {
      this.once("" + this.NAME + ":READ_LIST:success", this.update, this);
      return this.sync("READ_LIST");
    };

    Collection.prototype.update = function(respond) {
      var _this = this;

      if (typeof respond !== "array") {
        Exception("genre", {
          position: "Collection:" + this.NAME + ":READ_LIST",
          expect: "array",
          not: typeof respond
        });
      }
      _.each(respond, function(id) {
        id = Math.abs(id);
        if (_this.model_list[id]) {
          return _this.model_list[id].READ({
            id: id
          });
        } else {
          return _this.factory(id);
        }
      });
      return _.each(this.model_list, function(model, id) {
        id = Math.abs(id);
        if (-1 === _.indexOf(respond, id)) {
          delete this.model_list[id];
          this.view_list[id].remove();
          return delete this.view_list[id];
        }
      });
    };

    Collection.prototype.factory = function(id) {
      var model, view;

      model = new this.Model("" + this.NAME);
      model.id = id;
      view = new this.View(model);
      this.model_list[id] = model;
      this.view_list[id] = view;
      return model.READ({
        id: model.id
      });
    };

    return Collection;

  })(ModelClass);
  return module.exports = Collection;
});
