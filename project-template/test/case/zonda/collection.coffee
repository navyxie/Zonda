# Test Zonda Util Collection
define ( require ) ->
  module "Collection"

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
      url: "/dog/create"
      expire: 1
      fake: true

    UPDATE:
      url: "/dog/update"
      expire: 1
      fake: true

    READ:
      url: "/dog/read"
      expire: 1300
      fake: true

    READ_LIST:
      url: "/dog/read_list"
      expire: 1300
      fake: true

    DELELE:
      url: "/dog/delete"
      expire: 1300
      fake: true

  Backbone = require "backbone"
  Util = require "util"

  Model = Util.Model
  View = Backbone.View
  Collection = Util.Collection

  collection = new Collection
    NAME: "dog"
    API: API
    Model: Model
    View: View
  
# END define
