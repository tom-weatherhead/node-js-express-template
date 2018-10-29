// node-js-express-template/Gruntfile.js

'use strict';

module.exports = grunt => {
	const packageJsonFilename = 'package.json';
	const gruntfile = grunt.file.readJSON(packageJsonFilename);

	grunt.initConfig({
		pkg: gruntfile,
		eslint: {
			target: [
				'*.js',
				'client_side/js/*.js',
				'src/*.js',
				'test/*.js'
			]
		},
		mochaTest: {
			options: {
				reporter: 'spec'
			},
			test: {
				src: [
					'test/*_spec.js'
				]
			}
		},
		run: {
			/*
			options: {
				jest: {
					testEnvironment: 'jsdom',
					testMatch: [
						'<rootDir>/test/jest/*_jest.js'
					]
				}
			},
			*/
			npm_test_jest: {
				exec: 'npm run test-jest --silent'
			}
		} /* ,
		watch: {
			js: {
				files: [
					'*.js',
					'src/*.js',
					'test/** /*.js' // TODO: Delete the space in this string.
				],
				tasks: 'build'
			},
			pkg: {
				files: 'package.json',
				tasks: 'build'
			},
			readme: {
				files: 'README.md',
				tasks: 'build'
			}
		} */
	});

	// Tasks
	grunt.loadNpmTasks('grunt-eslint');
	// grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-mocha-test');
	// grunt.loadNpmTasks('grunt-run');

	// Aliases
	grunt.registerTask('test', ['eslint', 'mochaTest' /* , 'run:npm_test_jest' */ ]);
	// grunt.registerTask('test', ['eslint']);

	grunt.registerTask('default', ['test']);
};
