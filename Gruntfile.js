'use strict';

// npm packages that are not entirely necessary:
// - babel-cli
// - babel-preset-env
// - grunt-cli (unless it is needed by grunt-contrib-watch; the eslint, mochaTest, and nsp tasks run fine without it)
// To reinstall them: $ npm i --save-dev babel-preset-env grunt-cli

module.exports = function (grunt) {
	const packageJsonFilename = 'package.json';
	const gruntfile = grunt.file.readJSON(packageJsonFilename);

	grunt.initConfig({
		pkg: gruntfile,
		eslint: {
			target: [
				'*.js',
				'test/*_spec.js'
			]
		},
		mochaTest: {
			options: {
				reporter: 'spec'
			},
			test: {
				src: ['test/*_spec.js']
			}
		},
		nsp: {
			package: gruntfile
		// },
		// watch: {		// npm i --save-dev grunt-contrib-watch
			// js: {
			// 	files: ['*.js'],
			// 	tasks: 'build'
			// },
			// pkg: {
			// 	files: packageJsonFilename,
			// 	tasks: 'build'
			// },
			// readme: {
			// 	files: 'README.md',
			// 	tasks: 'build'
			// }
		}
	});

	// Tasks
	grunt.loadNpmTasks('grunt-eslint');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-nsp');
	// grunt.loadNpmTasks('grunt-contrib-watch');

	// Aliases
	grunt.registerTask('test', ['eslint', 'mochaTest', 'nsp']);
	// grunt.registerTask("build", ["concat", "babel"]);	// See avoidwork/filesize.js/Gruntfile.js
	grunt.registerTask('default', ['test']);
};
