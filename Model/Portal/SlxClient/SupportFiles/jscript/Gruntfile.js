module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concurrent: {
            build: [
                'uglify:activity',
                'uglify:admin',
                'uglify:base',
                'uglify:dashboard',
                'uglify:dialog',
                'uglify:dojo',
                'uglify:report',
                'uglify:sage',
				'uglify:mingleChartWidget',
				'uglify:mingleOpportunityStatusWidget'
            ]
        }
    });

    grunt.loadTasks('grunt-tasks');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.registerTask('build', ['shell:buildDojo', 'concurrent:build']);
    grunt.registerTask('doc', ['shell:jsduck']);
    grunt.registerTask('docs', ['shell:jsduck']);
    grunt.registerTask('test', ['connect:server', 'jasmine:coverage']);
    grunt.registerTask('default', ['jshint']);
};
