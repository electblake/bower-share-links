// Generated on 2014-11-11 using generator-angular 0.9.8
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths for the application
  var appConfig = {
    src: require('./bower.json').appPath || 'src',
    js: require('./bower.json').appPath || 'js',
    dist: 'dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: appConfig,

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= yeoman.src %>/scripts/{,*/}*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },

    watch: {
      build: {
        files: [
          '<%= yeoman.src %>/scripts/**/*.js'
        ],
        tasks: [
          'build'
        ]
      }
    },

    // Empties folders to start fresh
    clean: {
      build: {
        dot: true,
        src: [
          '<%= yeoman.src %>/js/{,*/}*'
        ]
      },
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/{,*/}*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      }
    },

    concat: {
      options: {
        separator: ';'
      },
      angular: {
        src: ['<%= yeoman.src %>/ng/**/*.js'],
        dest: '<%= yeoman.js %>/ng-share-links.js',
      }
    },

    // uglify: {
    //   options: {
    //     sourceMap: true,
    //     sourceMapName: '<%= yeoman.src %>/js/app.min.js.map'
    //   },
    //   build: {
    //     files: {
    //       '<%= yeoman.src %>/js/app.min.js': [
    //         '<%= yeoman.src %>/js/app.js'
    //       ]
    //     }
    //   }
    // },

    // Test settings
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    }
  });

  grunt.registerTask('build', [
    'clean:build',
    'angular:build',
    // 'uglify:build'
  ]);

  grunt.registerTask('angular:build', [
    'concat:angular'
  ]);

  // simple build task
  // grunt.registerTask('build', [
  //   'useminPrepare',
  //   'concat:generated',
  //   'cssmin:generated',
  //   'uglify:generated',
  //   'filerev',
  //   'usemin'
  // ]);

};
