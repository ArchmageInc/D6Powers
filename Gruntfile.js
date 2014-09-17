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
      modules:{
        options:{
          mangle: false,
        },
        files: [{
            expand: true,
            flatten: true,
            cwd:  'D6App/modules',
            src:  '**/*.js',
            dest: 'js/min/modules'
        }]
      },
      app:  {
        options:{
          mangle: false,
        },
        files:{
          'js/min/D6App.min.js': 'D6App/D6App.js'
        }
      },
      providers:{
        options:{
          mangle: false,
        },
        files: [{
            expand: true,
            flatten: true,
            cwd:  'D6App/providers',
            src:  '**/*.js',
            dest: 'js/min/providers'
        }]
      },
      directives:{
        options:{
          mangle: false,
        },
        files: [{
            expand: true,
            flatten: true,
            cwd:  'D6App/directives',
            src:  '**/*.js',
            dest: 'js/min/directives'
        }]
      },
      filters:{
        options:{
          mangle: false,
        },
        files: [{
            expand: true,
            flatten: true,
            cwd:  'D6App/filters',
            src:  '**/*.js',
            dest: 'js/min/filters'
        }]
      },
      controllers:{
        options:{
          mangle: false,
        },
        files: [{
            expand: true,
            flatten: true,
            cwd:  'D6App/controllers',
            src:  '**/*.js',
            dest: 'js/min/controllers'
        }]
      }
    },
    concat: {
      target: {
        src: ['js/min/modules/*.js','js/min/*.js','js/min/providers/*.js','js/min/directives/*.js','js/min/filters/*.js','js/min/controllers/*.js'],
        dest: 'js/d6.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task.
  grunt.registerTask('default', ['wiredep','less']);
  grunt.registerTask('js', ['uglify','concat']);
};
