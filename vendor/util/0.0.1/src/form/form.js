// Generated by CoffeeScript 1.6.3
define(function(require, exports, module) {
  var $, Backbone, Cell, Form, Queue, _;
  $ = require("jquery");
  _ = require("underscore");
  Backbone = require("backbone");
  Cell = require("./cell");
  Queue = require("../queue/queue");
  Form = (function() {
    function Form(sel) {
      this.sel = sel;
      _.extend(this, Backbone.Events);
      this.cells = Cell(sel);
      this.dom = $(sel);
      this.name = this.dom.attr("name");
      if (this.name === void 0) {
        throw "From:" + this.sel + " must have a name!";
      }
    }

    Form.prototype.listen = function() {};

    Form.prototype.taskRunner = function(cell) {
      var name, namespace, task_queue, _results;
      if (cell.dom.is(":hidden")) {
        return null;
      }
      if (cell.status === "running") {
        return null;
      } else {
        cell.status = "running";
      }
      namespace = "" + this.name + ":" + cell.name + ":taskRunner";
      task_queue = new Queue(namespace);
      task_queue.once("" + namespace + ":queue:error", function(err_cell) {
        cell.status = "error";
        return cell.dom.parents(".form-group").removeClass("has-success").addClass("has-warning").find(".help-block").html("<i class=\"icon-remove-sign\"></i> " + err_cell.info);
      });
      task_queue.once("" + namespace + ":queue:success", function() {
        cell.status = "success";
        return cell.dom.parents(".form-group").removeClass("has-warning").addClass("has-success").find(".help-block").html("<i class=\"icon-ok-sign\"></i>");
      });
      _results = [];
      for (name in cell.tasks) {
        if (!(name in this.tasks)) {
          throw "No such task named " + name + "!";
        }
        task_queue.setter(name, "running");
        _results.push(this.tasks[name](cell, task_queue));
      }
      return _results;
    };

    Form.prototype.dump = function(callback) {};

    Form.prototype.registerTask = function(task, cell) {};

    Form.prototype.tasks = {
      regexp: function(cell, task_queue) {
        var exp;
        exp = cell.tasks.regexp.replace(/^\//, "");
        exp = exp.replace(/\/$/, "");
        exp = new RegExp(exp);
        if (exp.test(cell.dom.val())) {
          return task_queue.setter("regexp", "success");
        } else {
          return task_queue.setter("regexp", "error", "Type Error");
        }
      }
    };

    return Form;

  })();
  return module.exports = Form;
});
