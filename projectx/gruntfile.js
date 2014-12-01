'use strict';

module.exports = function(grunt) {
	// ### Unified Watch Object
	var watchFiles = {
		serverViews: ['app/views/**/*.*'],
		serverJS: ['gruntfile.js', 'server.js', 'config/**/*.js', 'app/**/*.js'],
		clientViews: ['public/modules/**/views/**/*.html'],
		clientJS: ['public/js/*.js', 'public/modules/**/*.js'],
		clientSCSS: ['public/assets/scss/**/*.scss'],
		clientCSS: ['public/assets/css/style.css'],
		mochaTests: ['app/tests/**/*.js']
	};

	require('time-grunt')(grunt);

	// ### Project Configuration
	grunt.initConfig({

		// ### Load package.json so that we can create correctly versioned releases.
		pkg: grunt.file.readJSON('package.json'),

		// ### grunt-contrib-watch
        // Watch files and livereload in the browser during development.
		watch: {
			options: {
				livereload: true
			},
			serverViews: {
				files: watchFiles.serverViews
			},
			serverJS: {
				files: watchFiles.serverJS,
				tasks: ['jshint']
			},
			clientViews: {
				files: watchFiles.clientViews
			},
			clientJS: {
				files: watchFiles.clientJS,
				tasks: ['jshint']
			},
			clientSCSS: {
				files: watchFiles.clientSCSS,
				tasks: ['prettysass', 'sass', 'autoprefixer']
			}
		},

		// ### grunt-contrib-sass
		sass: {
			dist: {
				options: {
					style: 'expanded',
					noCache: true
				},
				files: [{
			        expand: true,
			        cwd: 'public/assets/scss',
			        src: ['**/*.{scss, sass}'],
			        dest: 'public/assets/css',
			        ext: '.css'
			    }]
			}
		},

		// ### grunt-autoprefixer
		autoprefixer: {
			options: {
                silent: true, // suppress logging
                browsers: ['last 2 versions', '> 1%', 'Explorer 10']
            },
			dist: {
				files: {
					'public/assets/css/style.css': 'public/assets/css/style.css'
				}
			}
		},

		// ### grunt-contrib-csslint
		csslint: {
			options: {
				csslintrc: '.csslintrc',
			},
			all: {
				src: watchFiles.clientCSS
			}
		},

		// ### grunt-contrib-cssmin
		cssmin: {
			combine: {
				files: {
					'public/dist/application.min.css': '<%= applicationCSSFiles %>'
				}
			}
		},

		// ### grunt-contrib-jshint
		jshint: {
			all: {
				src: watchFiles.clientJS.concat(watchFiles.serverJS),
				options: {
					reporter: require('jshint-stylish'),
					jshintrc: '.jshintrc',
					force: true
				}
			}
		},

		// ### grunt-contrib-uglify
		uglify: {
			production: {
				options: {
					mangle: false
				},
				files: {
					'public/dist/application.min.js': 'public/dist/application.js'
				}
			}
		},

		// ### grunt-jsbeautifier
		'jsbeautifier': {
			files: ['gruntfile.js', 'public/*.js', 'app/**/*.js', 'public/modules/**/*.js'],
			options: {
				js: {
					indentWithTabs: true,
					indentLevel: 0
				}
			}
		},

		// ### grunt-prettysass
		prettysass: {
			options: {
				alphabetize: true,
				indent: 't'
			},
			app: {
				src: [
					'public/assets/scss/**/*.scss',
					'!public/assets/scss/modules/_fonts.scss'
				]
			}
		},

		// ### grunt-nodemon
		nodemon: {
			dev: {
				script: 'server.js',
				options: {
					nodeArgs: ['--debug'],
					ext: 'js,html',
					watch: watchFiles.serverViews.concat(watchFiles.serverJS)
				}
			}
		},

		// ### grunt-node-inspector
		'node-inspector': {
			custom: {
				options: {
					'web-port': 1337,
					'web-host': 'localhost',
					'debug-port': 5858,
					'save-live-edit': true,
					'no-preload': true,
					'stack-trace-limit': 50,
					'hidden': []
				}
			}
		},

		// ### grunt-ng-annotate
		ngAnnotate: {
			production: {
				files: {
					'public/dist/application.js': '<%= applicationJavaScriptFiles %>'
				}
			}
		},

		// ### grunt-concurrent
		concurrent: {
			default: ['nodemon', 'watch' ],
			debug: ['nodemon', 'watch', 'node-inspector'],
			options: {
				logConcurrentOutput: true,
				limit: 10
			}
		},

		// ### grunt-env
		env: {
			test: {
				NODE_ENV: 'test'
			}
		},

		// ### grunt-mocha-test
		mochaTest: {
			src: watchFiles.mochaTests,
			options: {
				reporter: 'spec',
				require: 'server.js'
			}
		},

		// ### grunt-karma
		karma: {
			unit: {
				configFile: 'karma.conf.js'
			}
		},

		// ### grunt-vagrant-commands
		vagrant_commands: {
			vvv: {
				commands: [
					['halt'],
					['up', '--provision']
				]
			},
		},

		// ### grunt-shell
		shell: {
			preVagrantUp: {
				command: [
					'cd ../projectx_core',
					'librarian-puppet install'
				].join('&&')
			}
		}
	});

	// #### Load all grunt tasks
	require('load-grunt-tasks')(grunt);

	// #### Making grunt default to force in order not to break the project.
	grunt.option('force', true);

	// #### A Task for loading the configuration object
	grunt.task.registerTask('loadConfig', 'Task that loads the config into a grunt option.', function() {
		var init = require('./config/init')();
		var config = require('./config/config');

		grunt.config.set('applicationJavaScriptFiles', config.assets.js);
		grunt.config.set('applicationCSSFiles', config.assets.css);
	});

	// #### Default task
	// kickoff dev workflow, compile scss files, launch nodemon server, and trigger watch tasks  
	grunt.registerTask('default', ['sass', 'autoprefixer', 'concurrent:default']);

	// #### Init task
	// install puppet modules using librarian-puppet,
	// creates, configures, and provisions vagrant
	grunt.registerTask('init', ['shell:preVagrantUp', 'vagrant_commands']);

	// #### Debug task
	grunt.registerTask('debug', ['lint', 'concurrent:debug']);

	// #### Lint task
	grunt.registerTask('lint', ['jshint', 'csslint']);

	// #### Build task
	grunt.registerTask('build', ['loadConfig', 'ngAnnotate', 'uglify', 'prettysass', 'sass', 'autoprefixer', 'cssmin']);

	// #### Test task
	grunt.registerTask('test', ['env:test', 'mochaTest', 'karma:unit']);
};
