module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            files: ['test/**/*.js', 'data/**/*.js', 'views/**/*.js', 'controllers/**/*.js']
        },
        watch: {
            files: ['test/**/*.js', 'data/**/*.js', 'views/**/*.js', 'controllers/**/*.js'],
            tasks : ['jshint']
        }
    });

    // Load the plugin that provides the "jshint" task.
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['jshint']);

};