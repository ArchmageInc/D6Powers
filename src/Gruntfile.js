/*global module:false*/
module.exports = function(grunt) {
  grunt.initConfig({
    bower: {
      install: {
        "options":{
          "targetDir":  "build/js/lib"
        }
      }
    },
    copy:{
      assets:{
        files: [
          {
            expand: true,
            cwd: "assets",
            src: ["**/*",".htaccess"],
            dest: "build/"
          }
        ]
      },
      views: {
        files: [
          {
            expand: true,
            cwd: "D6App/views",
            src: ["*/*.html"],
            dest: 'build/views/'
          }
        ]
      }
    },
    wiredep: {
      lib: {
        src: [
          "build/index.html"
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
          "build/css/screen.css": "D6App/assets/less/screen.less"
        }
        
      }
    },
    uglify: {
      modules:{
        options:{
          mangle: false
        },
        files: [{
            expand: true,
            flatten: true,
            cwd:  'D6App/modules',
            src:  '**/*.js',
            dest: 'build/scripts/modules'
        }]
      },
      app:  {
        options:{
          mangle: false
        },
        files:{
          'build/scripts/D6App.min.js': 'D6App/D6App.js'
        }
      },
      providers:{
        options:{
          mangle: false
        },
        files: [{
            expand: true,
            flatten: true,
            cwd:  'D6App/providers',
            src:  '**/*.js',
            dest: 'build/scripts/providers'
        }]
      },
      directives:{
        options:{
          mangle: false
        },
        files: [{
            expand: true,
            flatten: true,
            cwd:  'D6App/directives',
            src:  '**/*.js',
            dest: 'build/scripts/directives'
        }]
      },
      filters:{
        options:{
          mangle: false
        },
        files: [{
            expand: true,
            flatten: true,
            cwd:  'D6App/filters',
            src:  '**/*.js',
            dest: 'build/scripts/filters'
        }]
      },
      controllers:{
        options:{
          mangle: false
        },
        files: [{
            expand: true,
            flatten: true,
            cwd:  'D6App/controllers',
            src:  '**/*.js',
            dest: 'build/scripts/controllers'
        }]
      }
    },
    concat: {
      target: {
        src: ['build/scripts/modules/*.js','build/scripts/*.js','build/scripts/providers/*.js','build/scripts/directives/*.js','build/scripts/filters/*.js','build/scripts/controllers/*.js'],
        dest: 'build/js/d6.min.js'
      }
    },
    clean:{
      start:["build"],
      end: ["build/scripts"]
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
  grunt.loadNpmTasks('grunt-bower-task');
  
  grunt.registerTask('js', ['bower','wiredep','uglify','concat','clean:end']);
  grunt.registerTask('css', ['less']);
  grunt.registerTask('html',['copy']);
  
  grunt.registerTask('build',['clean:start','html','js','css']);
  
  grunt.registerTask('default', ['build','watch']);
};
