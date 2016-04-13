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
        },
        coveralls: {
            // Options relevant to all targets
            options: {
                // When true, grunt-coveralls will only print a warning rather than
                // an error, to prevent CI builds from failing unnecessarily (e.g. if
                // coveralls.io is down). Optional, defaults to false.
                force: false
            },

            habana: {
                // LCOV coverage file (can be string, glob or array)
                src: './coverage/*.info',
                options: {
                    // Any options for just this target
                }
            },
  }
    });

    // Load the plugin that provides the "jshint" task.
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.loadNpmTasks('grunt-coveralls');

    // Default task(s).
    grunt.registerTask('default', ['jshint']);

};