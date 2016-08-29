module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        jshint: {
            src: ['src/**/*.js', 'spec/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        simplemocha: {
            all: {
                src: ['spec/*.spec.js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-simple-mocha');

    grunt.registerTask('test', ['jshint', 'simplemocha']);
    grunt.registerTask('default', ['test']);

};