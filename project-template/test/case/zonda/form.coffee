# test case form
define ( require ) ->
  Util = require "util"
  Mustache = require "mustache"

  form_html = """
    <form name="test-form" class="form-horizontal">
      <fieldset>
       <legend>All kind of form cell</legend>

        <div class="form-group">
          <label for="test-text" class="col-lg-2 control-label">text</label>
          <div class="col-lg-5">
            <input id="test-text" class="form-control" type="text" name="test-text" task-RegExp="/[^^\s{0,}$]/" />
          </div>
          <span class="col-lg-5 help-block">msg</span>
        </div>

        <div class="form-group">
          <label class="col-lg-2 control-label" for="test-password">password</label>
          <div class="col-lg-5">
            <input id="test-password" class="form-control" type="password" name="test-password" />
          </div>
          <span class="col-lg-5 help-block">msg</span>
        </div>

        <div class="form-group">
          <label class="col-lg-2 control-label" for="test-password-retype">pd:retype</label>
          <div class="col-lg-5">
            <input id="test-password-retype" class="form-control" type="password" name="test-password-retype" />
          </div>
          <span class="col-lg-5 help-block">msg</span>
        </div>

        <div class="form-group">
          <div class="col-lg-offset-2 col-lg-5">
            <div class="checkbox">
              <label>
                <input id="test-checkbox" name="test-checkbox" type="checkbox"> checkbox
              </label>
            </div>
          </div>
          <span class="col-lg-5 help-block">msg</span>
        </div>

        <div class="form-group">
          <label class="col-lg-2 control-label" for="test-textarea">textarea</label>
          <div class="col-lg-5">
            <textarea id="test-textarea" class="form-control" name="test-textarea" rows="3"></textarea>
          </div>
          <span class="col-lg-5 help-block">msg</span>
        </div>

        <div class="form-group">
          <div class="col-lg-offset-2 col-lg-5">
            <div class="radio">
              <label for="test-radio-a">
                <input id="test-radio-a" type="radio" name="test-radio" />
                radio a
              </label>
            </div>
            <div class="radio">
              <label for="test-radio-b">
                <input id="test-radio-b" type="radio" name="test-radio" />
                radio b
              </label>
              </label>
            </div>
          </div>
          <span class="col-lg-5 help-block">msg</span>
        </div>

        <div class="form-group">
          <label class="col-lg-2 control-label" for="test-select">select</label>
          <div class="col-lg-5">
            <select default="2" id="test-select" class="form-control" name="test-select">
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <span class="col-lg-5 help-block">msg</span>
        </div>

      </fieldset>
    </form>
  """

  module "Form"

  test "API", ->
    ok Util.Form
    ok Util.Form::taskRunner
    strictEqual typeof Util.Form::taskRunner, "function"
    ok Util.Form::dump
    strictEqual typeof Util.Form::dump, "function"
    ok Util.Form::listen
    strictEqual typeof Util.Form::listen, "function"
    ok Util.Form::registerTask
    strictEqual typeof Util.Form::registerTask, "function"

  test "cells / initialize / constructe", ->
    Util.Dialog
      title: "Form Test"
      content: form_html
      backdrop: false
    .open()

    do stop

    Util.Dialog.$dom.on "shown.bs.modal", ->
      form = new Util.Form "form[name=test-form]"
      ok 1
      do start
