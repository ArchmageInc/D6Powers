/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    wiredep: {
        target: {

            // Point to the files that should be updated when
            // you run `grunt wiredep`
            src: [
              'index.html'
            ],
            cwd: '',
            dependencies: true,
            devDependencies: false,
            exclude: [],
            fileTypes: {},
            ignorePath: '',
            overrides: {}
        }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-wiredep');

  // Default task.
  grunt.registerTask('default', ['wiredep']);

};
