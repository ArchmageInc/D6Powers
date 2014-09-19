/*global module:false*/
module.exports = function(grunt) {
  grunt.initConfig({
    copy:{
      views: {
        files: [
          {
            expand: true,
            cwd: "D6App/views",
            src: ["*/*.html"],
            dest: "../dist/views/",
          }
        ]
      }
    },
    wiredep: {
      target: {
        src: [
          "../index.html"
        ],
        options:{
          dependencies: true,
          fileTypes:{
            html:{
              replace:{
                js: '<script src="/{{filePath}}"></script>'
              }
            }
          }
        }
      }
    },
    less: {
      target:{
        options:{
          paths:  ["D6App/assets/less"]
        },
        files: {
          "../dist/css/screen.css": "D6App/assets/less/screen.less"
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
            dest: 'assets/scripts/modules'
        }]
      },
      app:  {
        options:{
          mangle: false,
        },
        files:{
          'assets/scripts/D6App.min.js': 'D6App/D6App.js'
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
            dest: 'assets/scripts/providers'
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
            dest: 'assets/scripts/directives'
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
            dest: 'assets/scripts/filters'
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
            dest: 'assets/scripts/controllers'
        }]
      }
    },
    concat: {
      target: {
        src: ['assets/scripts/modules/*.js','assets/scripts/*.js','assets/scripts/providers/*.js','assets/scripts/directives/*.js','assets/scripts/filters/*.js','assets/scripts/controllers/*.js'],
        dest: '../dist/js/d6.min.js'
      }
    },
    clean:{
      js:["assets/scripts"]
    },
    watch:{
      html:{
        options:{
          interrupt: true
        },
        files: ['D6App/views/**/*.html'],
        tasks:  ['copy']
      },
      js:{
        options:{
          interrupt: true
        },
        files:  ['D6App/**/*.js'],
        tasks:  ['js']
      },
      css:{
        options:{
          interrupt: true
        },
        files:  ['**/*.less'],
        tasks:  ['css']
      }
    }
  });

  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('js', ['wiredep','uglify','concat','clean']);
  grunt.registerTask('css', ['less']);
  grunt.registerTask('html',['copy']);
  grunt.registerTask('default', ['html','js','css','watch']);
};
