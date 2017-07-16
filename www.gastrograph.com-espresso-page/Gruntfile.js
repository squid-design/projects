module.exports = function(grunt) {
  grunt.initConfig({
    concat: {
      options: {
        separator: ';',
      },
      js_frontend: {
        src: [
          './assets/js/jquery-1.12.0.min.js',
          './bower_components/bootstrap/dist/js/bootstrap.js',
          './assets/js/modernizr-2.7.1.min.js',
          './assets/js/enquire.min.js',
          './assets/js/espresso.js',
          './assets/js/jquery.maskedinput.js',
          './assets/js/jquery.payment.js',
          './assets/js/prefixfree.min.js',
          './assets/js/coffee.js',
          './assets/js/bootstrapValidator.js',
          './assets/js/pageLoaded.js',
          './assets/js/imagesloaded.js',
          './assets/js/picturefill.min.js',
          './assets/js/search.js',
          './assets/js/science-page.js',
          './assets/js/whitepapers.js',
          './assets/js/how-to-review.js',
          './assets/js/blur-effect.js',
          './assets/js/chat-animation.js',
          './assets/js/hover-box.js',
          './assets/js/svg.js',
          './assets/js/css3-animate-it.js',
          './assets/js/jquery.sequence.js',
          './assets/js/casestudy-sequence.js',
          './assets/js/featurelog.js',
          './assets/js/opensource-cards.js'
        ],
        dest: './assets/js/frontend.js',
      }
    },
    coffee: {
        compile: {
            options: {
                join: true
            },
            files: {
                "./assets/js/coffee.js": "./assets/js/coffee/*.coffee"
            }
        }
    },
    less: {
      dev: {
        options: {
          compress: false, //minifying the result
        },
        files: {
          "./assets/css/frontend.css":"./assets/less/frontend.less",
        }
      },
      prod: {
        options: {
          compress: true, //minifying the result
        },
        files: {
          "./assets/css/frontend.css":"./assets/less/frontend.less",
        }
      }
    },
    uglify: {
      options: {
        mangle: false //set to true to minify function and variable names
      },
      frontend: {
        files: {
          './assets/js/frontend.js': './assets/js/frontend.js',
        }
      }
    },
    watch: {
      dev: {
        files: ['Gruntfile.js', './assets/js/coffee/*.coffee', './assets/js/*.js', '!./assets/js/frontend.js', '!less-1.6.1.min.js', './assets/less/*.less', './bower_components/bootstrap/dist/js/bootstrap.js'],
        tasks: ['coffee:compile', 'concat:js_frontend', 'less:dev']
      },
      prod: {
        files: ['Gruntfile.js', './assets/js/coffee/*.coffee', './assets/js/*.js', '!./assets/js/frontend.js', '!less-1.6.1.min.js', './assets/less/*.less', './bower_components/bootstrap/dist/js/bootstrap.js'],
        tasks: ['coffee:compile', 'concat:js_frontend', 'uglify:frontend', 'less:prod']
      }
    }
  });

   // Plugin loading
   grunt.loadNpmTasks('grunt-contrib-concat');
   grunt.loadNpmTasks('grunt-contrib-watch');
   grunt.loadNpmTasks('grunt-contrib-less');
   grunt.loadNpmTasks('grunt-contrib-coffee');
   grunt.loadNpmTasks('grunt-contrib-uglify');

   // Task definition
   grunt.registerTask('default', ['coffee:compile', 'concat:js_frontend', 'uglify:frontend', 'less:prod', 'watch:prod']);
   grunt.registerTask('prod', ['coffee:compile', 'concat:js_frontend', 'uglify:frontend', 'less:prod', 'watch:prod']);
   grunt.registerTask('dev', ['coffee:compile', 'concat:js_frontend', 'less:dev', 'watch:dev']);
};
