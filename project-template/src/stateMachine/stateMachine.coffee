# View State Machine
# - - -

define ( require, exports, module ) ->
  StateMachine = require "../class/stateMachine"

  # List of view state
  # -------------
  main_view = require "./main/main"

  # List of State Machine
  # --------------------
  main_state_machine = new StateMachine

  # Add view state to State Machine
  for view_name, view of main_view
    main_state_machine.add view

  module.exports =
    main: main_view

# END define
