# test case stateMachine
define ( require ) ->
  module "StateMachine"

  Util = require "util"

  StateMachine = Util.StateMachine

  mainStateMachine = new StateMachine()

  main_state = false
  list_state = false
  sub_state = false

  main_view =
    activate: ->
      main_state = true
    deactivate: ->
      main_state = false

  list_view =
    activate: ->
      list_state = true
    deactivate: ->
      list_state = false

  sub_view =
    activate: ->
      sub_state = true
    deactivate: ->
      sub_state = false

  mainStateMachine.add main_view
  mainStateMachine.add list_view
  mainStateMachine.add sub_view

  test "API", ->
    ok StateMachine
    strictEqual typeof StateMachine, "function"

  test "Instance API", ->
    ok mainStateMachine
    strictEqual typeof mainStateMachine, "object"

  test "Add of Instance API", ->
    ok mainStateMachine.add
    strictEqual typeof mainStateMachine.add, "function"

  test "Active::main_view", ->
    main_view.active()

    ok main_state
    strictEqual list_state, false
    strictEqual sub_state, false

  test "Active::list_view", ->
    list_view.active()

    ok list_state
    strictEqual main_state, false
    strictEqual sub_state, false

  test "Active::sub_view", ->

    sub_view.active()

    ok sub_state
    strictEqual main_state, false
    strictEqual list_state, false

  test "other StateMachine", ->
    otherStateMachine = new StateMachine()

    a_state = false
    b_state = false
    c_state = false

    a_view =
      activate: ->
        a_state = true
      deactivate: ->
        a_state = false

    b_view =
      activate: ->
        b_state = true
      deactivate: ->
        b_state = false

    c_view =
      activate: ->
        c_state = true
      deactivate: ->
        c_state = false

    otherStateMachine.add a_view
    otherStateMachine.add b_view
    otherStateMachine.add c_view

    a_view.active()

    ok a_state
    strictEqual b_state, false
    strictEqual c_state, false

    sub_view.active()

    ok sub_state
    strictEqual main_state, false
    strictEqual list_state, false

# END define
