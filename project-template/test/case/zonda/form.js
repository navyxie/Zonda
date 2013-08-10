// Generated by CoffeeScript 1.6.3
define(function(require) {
  var Backbone, Mustache, Util, form_html;
  Backbone = require("backbone");
  Util = require("util");
  Mustache = require("mustache");
  form_html = "<form name=\"test-form\" class=\"form-horizontal\">\n  <fieldset>\n   <legend>All kind of form cell</legend>\n\n    <div class=\"form-group\">\n      <label for=\"test-text\" class=\"col-lg-2 control-label\">text</label>\n      <div class=\"col-lg-5\">\n        <input id=\"test-text\" class=\"form-control\" type=\"text\" name=\"test-text\" task-RegExp=\"/[^^\\s{0,}$]/\" />\n      </div>\n      <span class=\"col-lg-5 help-block\"></span>\n    </div>\n\n    <div class=\"form-group\">\n      <label class=\"col-lg-2 control-label\" for=\"test-password\">password</label>\n      <div class=\"col-lg-5\">\n        <input id=\"test-password\" class=\"form-control\" type=\"password\" name=\"test-password\" />\n      </div>\n      <span class=\"col-lg-5 help-block\"></span>\n    </div>\n\n    <div class=\"form-group\">\n      <label class=\"col-lg-2 control-label\" for=\"test-password-retype\">pd:retype</label>\n      <div class=\"col-lg-5\">\n        <input id=\"test-password-retype\" class=\"form-control\" type=\"password\" name=\"test-password-retype\" />\n      </div>\n      <span class=\"col-lg-5 help-block\"></span>\n    </div>\n\n    <div class=\"form-group\">\n      <div class=\"col-lg-offset-2 col-lg-5\">\n        <div class=\"checkbox\">\n          <label>\n            <input id=\"test-checkbox\" name=\"test-checkbox\" type=\"checkbox\"> checkbox\n          </label>\n        </div>\n      </div>\n      <span class=\"col-lg-5 help-block\"></span>\n    </div>\n\n    <div class=\"form-group\">\n      <label class=\"col-lg-2 control-label\" for=\"test-textarea\">textarea</label>\n      <div class=\"col-lg-5\">\n        <textarea id=\"test-textarea\" class=\"form-control\" name=\"test-textarea\" rows=\"3\"></textarea>\n      </div>\n      <span class=\"col-lg-5 help-block\"></span>\n    </div>\n\n    <div class=\"form-group\">\n      <div class=\"col-lg-offset-2 col-lg-5\">\n        <div class=\"radio\">\n          <label for=\"test-radio-a\">\n            <input id=\"test-radio-a\" type=\"radio\" name=\"test-radio\" />\n            radio a\n          </label>\n        </div>\n        <div class=\"radio\">\n          <label for=\"test-radio-b\">\n            <input id=\"test-radio-b\" type=\"radio\" name=\"test-radio\" />\n            radio b\n          </label>\n          </label>\n        </div>\n      </div>\n      <span class=\"col-lg-5 help-block\"></span>\n    </div>\n\n    <div class=\"form-group\">\n      <label class=\"col-lg-2 control-label\" for=\"test-select\">select</label>\n      <div class=\"col-lg-5\">\n        <select default=\"2\" id=\"test-select\" class=\"form-control\" name=\"test-select\">\n          <option value=\"0\">0</option>\n          <option value=\"1\">1</option>\n          <option value=\"2\">2</option>\n        </select>\n      </div>\n      <span class=\"col-lg-5 help-block\"></span>\n    </div>\n\n  </fieldset>\n</form>";
  module("Form");
  test("API", function() {
    ok(Util.Form);
    ok(Util.Form.prototype.taskRunner);
    strictEqual(typeof Util.Form.prototype.taskRunner, "function");
    ok(Util.Form.prototype.dump);
    strictEqual(typeof Util.Form.prototype.dump, "function");
    ok(Util.Form.prototype.listen);
    strictEqual(typeof Util.Form.prototype.listen, "function");
    ok(Util.Form.prototype.registerTask);
    return strictEqual(typeof Util.Form.prototype.registerTask, "function");
  });
  test("cells / initialize / constructe", function() {
    Util.Dialog({
      title: "Form Test",
      content: form_html,
      backdrop: false
    }).open();
    stop();
    Util.Dialog.$dom.on("shown.bs.modal", function() {
      var cell, form, _i, _len, _ref;
      form = new Util.Form("form[name=test-form]");
      ok(form.cells);
      ok(form.sel);
      ok(form.dom);
      strictEqual(Object.prototype.toString.call(form.cells), "[object Array]");
      strictEqual(form.cells.length, 8);
      _ref = form.cells;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        cell = _ref[_i];
        if (cell.type === "text") {
          ok(cell.tasks.regexp);
          strictEqual(cell.tasks.regexp, "/[^^\\s{0,}$]/");
        }
      }
      return Util.Dialog.close();
    });
    return Util.Dialog.$dom.on("hidden.bs.modal", start);
  });
  return test("taskRunner", function() {
    expect(2);
    Util.Dialog({
      title: "Form Test",
      content: form_html,
      backdrop: false
    }).open();
    stop();
    Util.Dialog.$dom.on("shown.bs.modal", function() {
      var cell, form, namespace, test_cell, _i, _len, _ref;
      form = new Util.Form("form[name=test-form]");
      _ref = form.cells;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        cell = _ref[_i];
        if (cell.name === "test-text") {
          test_cell = cell;
        }
      }
      namespace = "" + form.name + ":test-text:taskRunner";
      Backbone.Events.once("" + namespace + ":queue:error", function() {
        return setTimeout(function() {
          return ok($(form.sel).find("input:text").parents(".form-group").hasClass("has-warning"));
        }, 500);
      });
      Backbone.Events.once("" + namespace + ":queue:success", function() {
        return setTimeout(function() {
          return ok($(form.sel).find("input:text").parents(".form-group").hasClass("has-success"));
        }, 500);
      });
      setTimeout(function() {
        test_cell.dom.val("    ");
        return form.taskRunner(test_cell);
      }, 1300);
      return setTimeout(function() {
        test_cell.dom.val("not null");
        return form.taskRunner(test_cell);
      }, 2600);
    });
    return Util.Dialog.$dom.on("hidden.bs.modal", start);
  });
});
