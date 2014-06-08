/* global module */
'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // lint tool, will run on file changes, use `grunt watch`
        jshint: {
            all: [
                './*.js',
                'lib/**/*.js',
                'test/**/*.js',
                'test/*/*.js'
            ],
            options: {
                jshintrc: './.jshintrc'
            }
        },

        // Mocha is our unit testing framework.
        // This task will be automatically run on file changes if
        // you run `grunt watch`
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['test/**/*-test.js']
            }
        },
        
        // Automatically run tasks when files changes
        watch: {
            scripts: {
                files: '<%= jshint.all %>',
                tasks: ['clear', 'jshint', 'mochaTest']
            }
        }
    });

    // load tasks from grunt plugins
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-clear');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');

    // Shortcuts to tasks
    grunt.registerTask('test', 'mochaTest');

    grunt.registerTask('default', ['jshint:all', 'mochaTest']);
};
