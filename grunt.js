/*
 * Jenkins extension grunt file
 */
module.exports = function (grunt) {

	// Base build dirs
	var BASE = 'build\/';
	var BUILD_DIRS = {
		CHROME: BASE + 'chrome\/',
		FIREFOX: BASE + 'firefox\/'
	};

	// Asset dirs
	var ASSET_DIRS = {
		HTML: 'html\/',
		JS: 'js\/',
		LIB: 'lib\/',
		CSS: 'css\/',
		IMG: 'img\/'
	};

	// Browser-specific code dirs
	var BROWSER_DIRS = {
		CHROME: 'chrome\/',
		FIREFOX: 'firefox\/'
	};

	// Project configuration
	grunt.initConfig({
		lint: {
			files: [ 'js/*.js' ] 
		}
		//csslint: {
	//		files: [ 'css/*.css' ]
	//	},
	});

	// Load required tasks in NPM
	//grunt.loadNpmTasks('grunt-css');

	// Default task
	grunt.registerTask('default', 'clean initialise deployChrome');

// Define new tasks in here

	// Clean build folder
	grunt.registerTask('clean', 'Clean build folder', function () {
		var rimraf = require('rimraf'); // rm -rf package!
		// Can just use the sync version; we're not deleting a lot of
		// dirs here
		rimraf.sync(BASE);

		grunt.log.writeln('Cleaned build folder...');	
	});

	// Initialise
	grunt.registerTask('initialise', 'Initialise the build.', function () {
		// Build folder deleted via clean task first
		grunt.log.writeln('Create ' + BUILD_DIRS.CHROME + '...');
		grunt.file.mkdir(BUILD_DIRS.CHROME);
	});

	// Checkout source from Git prior to building
	grunt.registerTask('checkout', 'Checkout extension code from Git.', function () {
		// Get from Git - which repo? Local to begin with
	});


	// Deploy for Chrome extension
	grunt.registerTask('deployChrome', 'Build and deploy extension for Google Chrome', function () {
//		jake.cpR(ASSET_DIRS.IMG, BUILD_DIRS.CHROME);
		var files = grunt.file.expand(ASSET_DIRS.HTML + '*.html');
		files.concat(grunt.file.expand(ASSET_DIRS.CSS + '*.css'));
		files.concat(grunt.file.expand(ASSET_DIRS.JS + '*.js'));
		files.concat(grunt.file.expand(ASSET_DIRS.LIB + '*'));
		files.concat(grunt.file.expand(ASSET_DIRS.CHROME + 'manifest.json'));
		grunt.utils._.each(files, function (filename) {
			grunt.log.writeln('Copying ' + filename + ' to ' + BUILD_DIRS.CHROME + '...');
			grunt.file.copy(filename, BUILD_DIRS.CHROME);
		});
	});
	
};
