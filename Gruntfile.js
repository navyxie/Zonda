module.exports = function(grunt) {

  grunt.loadNpmTasks("grunt-contrib-qunit");

  grunt.initConfig({
    qunit: {
      all: ["http://localhost:3000/test/index.html"]
    }
  });

  grunt.registerTask("test", ["qunit"]);

};
