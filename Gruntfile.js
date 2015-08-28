module.exports = function(grunt) {
    var files = ['lib/**/*.js', 'test/**/*.js', 'data/**/*.js', 'views/**/*.js', 'controllers/**/*.js'];
    // Project configuration.
    grunt.initConfig({
        jshint: {
            files: files
        },
        watch: {
            files: files,
            tasks : ['jshint']
        }
    });

    // Load the plugin that provides the "jshint" task.
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['jshint']);

};