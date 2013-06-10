# Genre Dog
# - - -
define ( require, exports, module ) ->

  module.exports =

    genre:
      "id ~ id : @Int": not null

      "variety ~ var : @String": null
      "lifetime ~ life : @Int": null

      "min-height ~ min-h : @Float": null
      "max-height ~ max-h : @Float": null

      "wool ~ wool : @Array : @Object": [
        {
          "type ~ type : @Array : @Object": {
            "name ~ name : @String": null
            "id ~ id : @Int": not null
          }
          "color ~ color : @Array : @Object": {
            "name ~ name : @String": null
            "id ~ id : @Int": not null
          }
        }
      ]

    CREATE:
      url: "/FAKE_CREATE_dog"
      expire: 1
      input:
        variety: not null
        lifetime: not null
        wool: not null
      output:
        id: not null

    UPDATE:
      url: "/FAKE_UPDATE_dog"
      expire: 1
      input: "@dog"
      output: null

    READ:
      url: "/FAKE_READ_dog"
      expire: 1300
      input:
        id: not null
      output: "@dog"

    READ_LIST:
      url: "/FAKE_READ_LIST_dog"
      expire: 1300
      input: null
      output: ": @Array : @dog"

    DELELE:
      url: "/FAKE_DELETE_dog"
      expire: 1300
      input:
        id: not null
      output: null
  
# END define
