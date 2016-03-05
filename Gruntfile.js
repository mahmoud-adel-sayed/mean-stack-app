module.exports = function(grunt){
	grunt.initConfig({
		env:{
			dev:{
				NODE_ENV: "development"
			},
			test:{
				NODE_ENV: "test"
			}
		},
		nodemon:{
			dev:{
				script: "server.js",
				options:{
					ext: "js,html",
					watch: ["server.js" , "app/**/*js" , "config/**/*.js"]
				}
			}
		},
		jshint:{
			all: {
				src: ["server.js" , "app/**/*.js" , "config/**/*.js"]
			}
		},
		csslint:{
			all: {
				src: "public/css/*.css"
			}
		},
		cssmin: {
		  target: {
		    files: [{
		      expand: true,
		      cwd: 'public/css',
		      src: ['*.css', '!*.min.css'],
		      dest: 'public/css',
		      ext: '.min.css'
		    }]
		  }
		},
		concat: {
		    dist: {
		      src: ["public/js/application.js" , "public/js/users/users.client.module.js" , "public/js/posts/posts.client.module.js" , "public/js/profile/profile.client.module.js" , "public/js/**/*.js" , "public/js/**/**/*.js"],
		      dest: "public/bundle.js",
		    },
		},
		uglify: {
			options: {
		      mangle: false
		    },
		    my_target: {
		      files: {
		          "public/bundle.min.js": ["public/bundle.js"]
		      }
		    }
		}
	});

	grunt.loadNpmTasks("grunt-env");
	grunt.loadNpmTasks("grunt-nodemon");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-csslint");
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-uglify");

	grunt.registerTask("default" , ["env:dev" , "cssmin" , "concat" , "uglify" , "nodemon"]);
	grunt.registerTask("lint" , ["jshint" , "csslint"]);
};