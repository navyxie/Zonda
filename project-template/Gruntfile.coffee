module.exports = (grunt) ->
  transport = require "grunt-cmd-transport"
  style = transport.style.init grunt
  text = transport.text.init grunt
  script = transport.script.init grunt

  grunt.initConfig

    qunit:
      all:
        options:
          timeout: 10000
          urls: [
            "http://localhost:3000/assets/test/zonda.html",
            "http://localhost:3000/assets/test/app.html"
          ]
    # END qunit

    connect:
      server:
        options:
          port: 3000
          base: "../"
    # END connect

    transport:
      app:
        options:
          alias: grunt.file.readJSON "etc/spm_alias.json"
          debug: false
        files: [
          {
            cwd: "src"
            src: "**/*"
            dest: ".build/"
          }
        ]

    # END transport

    concat:
      app:
        options:
          include: "all"
        files: [
          {
            expand: true
            cwd: ".build/"
            src: ["app.js"]
            dest: "dist/"
            ext: ".js"
          }
        ]

    # END transport

    uglify:
      app:
        files: [
          {
            expand: true
            cwd: "dist/"
            src: ["**/*.js", "!**/*-debug.js"]
            dest: "dist/"
            ext: ".js"
          }
        ]
    # END transport

    clean:
      spm: [".build"]

  # END grunt.initConfig


  grunt.loadNpmTasks "grunt-cmd-transport"
  grunt.loadNpmTasks "grunt-cmd-concat"

  grunt.loadNpmTasks "grunt-contrib-clean"
  grunt.loadNpmTasks "grunt-contrib-uglify"

  grunt.loadNpmTasks "grunt-contrib-qunit"
  grunt.loadNpmTasks "grunt-contrib-connect"

  grunt.registerTask "test", ["connect", "qunit"]
  grunt.registerTask "build", ["transport:app", "concat:app", "uglify:app", "clean"]
