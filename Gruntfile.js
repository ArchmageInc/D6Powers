/*global module:false*/
module.exports = function(grunt) {
  grunt.initConfig({
    wiredep: {
      target: {
          src: [
            'index.html'
          ],
          cwd: '',
          dependencies: true,
          devDependencies: true,
          exclude: [],
          fileTypes: {},
          ignorePath: '',
          overrides: {}
      }
    },
    less: {
      target:{
        options:{
          paths:  ["modules/D6App/assets/less"]
        },
        files: {
          "modules/D6App/assets/css/screen.css": "modules/D6App/assets/less/screen.less"
        }
        
      }
    },
    uglify: {
      target: {
        files: [{
            expand: true,
            cwd:  'D6App/modules',
            src:  '**/*.js',
            dest: 'js'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task.
  grunt.registerTask('default', ['wiredep','less']);

};
