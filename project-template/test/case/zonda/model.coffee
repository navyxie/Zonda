# Test Case for Util Model
define ( require ) ->
  module "Model"

  # Test API
  # - - -
  API =
    genre:
      "id~id : @Number": ""

      "variety~var : @String": ""
      "lifetime~life : @Number": ""

      "min-height~min-h : @Number": ""
      "max-height~max-h : @Number": ""

      "wool~wool : @Array": [
        {
          "type~type : @Array": [
            {
              "name~typename : @String": ""
              "id~typeid : @Number": ""
            }
          ]
          "color~color : @Array": [
            {
              "name~colorname : @String": ""
              "id~colorid : @Number": ""
            }
          ]
        }
      ]

    CREATE:
      url: "/FAKE_CREATE_dog"
      expire: 1

    UPDATE:
      url: "/FAKE_UPDATE_dog"
      expire: 1

    READ:
      url: "/FAKE_READ_dog"
      expire: 1300

    READ_LIST:
      url: "/FAKE_READ_LIST_dog"
      expire: 1300

    DELELE:
      url: "/FAKE_DELETE_dog"
      expire: 1300
  # - - -
  # Test API

  Util = require "util"

  Model = Util.Model

  dog_Model = new Model "dog", API

  test "API", ->
    ok dog_Model.CREATE
    ok dog_Model.READ
    ok dog_Model.UPDATE
    ok dog_Model.DELELE

    ok dog_Model.genre
    ok dog_Model.NAME
    ok dog_Model.namespace

  asyncTest "act", ->
    dog_Model.once "#{dog_Model.NAME}:READ:success", (respond) ->

    dog_Model.READ id: 1

# END define
