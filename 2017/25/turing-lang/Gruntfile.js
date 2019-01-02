module.exports = function (grunt) {
    'use strict';

    var expandFiles = function (glob) {
        return grunt.file.expand({
            filter: 'isFile'
        }, glob);
    };

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        // Task configuration.
        
        watch: {
            all: {
                files: ['src/**/*.*', 'test/**/*.*'],
                tasks: ['default']
            },
        },
        jshint: {
            all: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
            options: {
                jshintrc: '.jshintrc',
            }
        },
        babel: {
            options: {
                sourceMap: true
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: './src',
                    src: ['**/*.js'],
                    dest: 'lib',
                    ext: '.js'
                }]
            }
        },
        browserify: {
            main: {
                src: ['./src/turing-lang.js'],
                dest: 'dist/turing-lang.js',
                options: {
                    transform: [["babelify", {}]]
                },
            }
        },
        mochaTest: {
          test: {
            options: {
              reporter: 'spec',
              quiet: false, // Optionally suppress output to standard out (defaults to false)
              clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
            },
            src: ['test/**/*.js']
          }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-mocha-test');

    // Default task.
    grunt.registerTask('default', ['jshint', 'babel', 'mochaTest', 'browserify']);
};