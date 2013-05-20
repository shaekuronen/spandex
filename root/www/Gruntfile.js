
// livereload
'use strict';
var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
  return connect.static(path.resolve(point));
};
// end livereload

/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json')

    ,livereload: {
      port: 35729 
    }

    // start a node server
    ,connect: {
      preview: {
        options: {
          port: 9000
          ,keepalive: true
          ,base: './preview'
          ,middleware: function(connect, options) {
            return [lrSnippet, folderMount(connect, options.base)]
          }
        }
      }
      ,optimize: {
        options: {
          port: 9001
          ,keepalive: true
          ,base: './production'
        }
      }
    }

    // delete everything from preview or production directories before optimize task
    ,clean: {
      optimize: {
        src: 'production/'
      }
      ,preview: {
        src: 'preview/'
      }
      ,preview_css: {
        src: 'preview/css/'
      }
      ,preview_js: {
        src: 'preview/js/'
      }
      ,preview_img: {
        src: 'preview/img/'
      }
      ,post_optimize: {
        src: [
          'production/pages/', 
          'production/templates/',
          'production/scripts.ejs',
          'production/head.ejs'
        ]
      }
    }

    ,ejs_static: {
      preview: {
        options: {
          src: 'dev/',
          layout_src: 'dev/pages/',
          index_page: 'dev/pages/home/index.html',
          data: 'preview/data/pages.json'
        },
        files: {
          'preview/': 'dev/pages/**/index.html'
        },
      },
      optimize: {
        options: {
          src: 'production/',
          layout_src: 'production/pages/',
          index_page: 'production/pages/home/index.html',
          data: 'production/data/pages.json'
        },
        files: {
          'production/': 'production/pages/**/index.html'
        },
      }
    }

    // get the scripts inside scripts.ejs and head.ejs build:js blocks
    ,'useminPrepare': {
      html: [
        'production/head.ejs'
        ,'production/scripts.ejs'
      ]     
    }

    // update the scripts links to point to the concatenated and minified js/main.js
    ,usemin: {
      html: [
        'production/templates/global/head.ejs'
        ,'production/templates/global/scripts.ejs'
      ]
    }

    ,rev: {
      files: {
        src: [
          'production/js/main.js'
          ,'production/css/main.css'
        ]
      }
    }

    ,copy: {
      preview: {
        files: [
          {expand: true, cwd: 'dev/', src: ['img/**'], dest: 'preview/'}
          ,{expand: true, cwd: 'dev/', src: ['css/**'], dest: 'preview/'}
          ,{expand: true, cwd: 'dev/', src: ['js/**'], dest: 'preview/'}
          ,{expand: true, cwd: 'dev/', src: ['data/**'], dest: 'preview/'}
          ,{expand: true, cwd: 'dev/', src: ['.ht*'], dest: 'preview/'}
        ]
      }
      ,img: {
        files: [
          {expand: true, cwd: 'dev/', src: ['img/**'], dest: 'preview/'}
        ]
      }
      ,css: {
        files: [
          {expand: true, cwd: 'dev/', src: ['css/**'], dest: 'preview/'}
        ]
      }
      ,js: {
        files: [
          {expand: true, cwd: 'dev/', src: ['js/**'], dest: 'preview/'}
        ]
      }
      ,optimize: {
        files: [
          {expand: true, flatten: true, cwd: 'dev/', src: ['templates/global/head.ejs'], dest: 'production/', filter: 'isFile'}
          ,{expand: true, flatten: true, cwd: 'dev/', src: ['templates/global/scripts.ejs'], dest: 'production/', filter: 'isFile'}
          ,{expand: true, cwd: 'dev/', src: ['pages/**'], dest: 'production/'}
          ,{expand: true, cwd: 'dev/', src: ['templates/**'], dest: 'production/'}
          ,{expand: true, cwd: 'dev/', src: ['js/**'], dest: 'production/'}
          ,{expand: true, cwd: 'dev/', src: ['css/**'], dest: 'production/'}
          ,{expand: true, cwd: 'dev/', src: ['img/**'], dest: 'production/'}
          ,{expand: true, cwd: 'dev/', src: ['data/**'], dest: 'production/'}
          ,{expand: true, cwd: 'dev/', src: ['.ht*'], dest: 'production/'}
          ,{expand: true, cwd: 'dev/', src: ['robots.txt'], dest: 'production/'}
          ,{expand: true, cwd: 'dev/', src: ['js/vendor/modernizr.custom.js'], dest: 'production/'}
          ,{expand: true, flatten: true, cwd: 'dev/', src: ['css/fonts/**'], dest: 'production/fonts/', filter: 'isFile'}
        ]
      }
    }

    // start preview server as a background process
    // superuser.com/questions/178587/how-do-i-detach-a-process-from-terminal-entirely
    // askubuntu.com/questions/157779/how-to-determine-whether-a-process-is-running-or-not-and-make-use-f-it-to-make-a
    // https://gist.github.com/m-allanson/4637797
    // github.com/rma4ok/grunt-bg-shell
    ,exec: {
      start_server: {
        command: 'grunt connect:preview &'
      }
    }   

    ,regarde: {
      pages: {
        files: [
          'dev/pages/*.ejs'
          ,'dev/pages/**/*.ejs'
        ]
        ,tasks: ['template', 'livereload']
      }
      ,inc: {
        files: [
          'dev/inc/*.ejs'
          ,'dev/inc/**/*.ejs'
        ]
        ,tasks: ['template', 'livereload']
      }
      ,css: {
        files: [
          'dev/css/*.css'
          ,'dev/css/**/*.css'
        ]
        ,tasks: ['refresh_css', 'livereload']
      }
      ,js: {
        files: [
          'dev/js/*.js'
          ,'dev/js/**/*.js'
        ]
        ,tasks: ['refresh_js', 'livereload']
      }
      ,img: {
        files: [
          'dev/img/'
        ]
        ,tasks: ['refresh_img', 'livereload']
      }
    }

    ,imagemin: {
      production: {
        options: {      
          optimizationLevel: 1
        }
        ,files: [ {
          expand: true
          ,cwd: 'production/img/'
          ,src:'**/*'
          ,dest: 'production/img/' 
        } ]
      }      
    }

    // gzip assets 1-to-1 for production
    ,compress: {
      main: {
        options: {
          mode: 'gzip'
        }
        ,files: [ {
          expand: true 
          ,cwd: 'production/' 
          ,src: '**/*' 
          ,dest: 'production/'
        } ]
      }
    }

  });

  // these plugins provide necessary tasks
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-rev');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-reload');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-livereload');
  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-ejs-static');
  grunt.loadNpmTasks('grunt-contrib-compress');

  // DEVELOPMENT
  // preview the site during development
  grunt.registerTask('preview', [
    'clean:preview', 
    'copy:preview', 
    'ejs_static:preview', 
    'livereload-start', 
    'exec:start_server', 
    'regarde'
  ]);

  // refresh the preview css
  grunt.registerTask('refresh_css', ['clean:preview_css', 'copy:css' ]);

  // refresh the preview js
  grunt.registerTask('refresh_js', ['clean:preview_js', 'copy:js' ]);

  // refresh the preview img
  grunt.registerTask('refresh_img', ['clean:preview_img', 'copy:img' ]);
  // END DEVELOPEMENT

  // DEPLOYMENT
  // optimize the site for deployment
  grunt.registerTask('optimize', [
    'clean:optimize', 
    'copy:optimize',  
    'useminPrepare', 
    'concat', 
    'cssmin', 
    'uglify', 
    'rev', 
    'usemin', 
    'ejs_static:optimize', 
    'copy:optimize', 
    'clean:post_optimize', 
    'connect:optimize'
  ]);
  // END DEPLOYMENT

};