/* File: gulpfile.js */

var gulp = require('gulp'),
  gutil = require('gulp-util'),
  jshint = require('gulp-jshint'),
  nodemon = require('gulp-nodemon'),
  browserSync = require('browser-sync').create();

var BROWSER_SYNC_RELOAD_DELAY = 500;

var sources = {
  js: [
    'src/*.js',
    'src/public/javascripts/*.js',
  ],
  css: [
    'src/public/css/*.css',
  ]
};

gulp.task('scripts', function(){
  gulp.src([
    "node_modules/angular/angular.js",
    "node_modules/bootstrap/dist/js/bootstrap.js"
  ])
  .pipe(gulp.dest("src/javascripts"));
});

gulp.task('styles', function(){
  gulp.src([
    "node_modules/bootstrap/dist/css/bootstrap.css"
  ])
  .pipe(gulp.dest("src/stylesheets"));
});

gulp.task('jshint', function(){
  return gulp.src( sources.js )
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch', function(){
  gulp.watch(sources.js, ['jshint']);
});

gulp.task('nodemon', function(){
  var started = false;
  return nodemon({ script: 'app.js'
                , ext: 'js html'
                , env: {'NODE_ENV': 'development'}
  }).on('start', function(){
      if(!started){
          started = true;
        console.log('nodemon start');
      }
  }).on('restart', function(){
      console.log('nodemon restart');
      setTimeout(function(){
         browserSync.reload({ stream: false });
      }, 1000);
  }).on('error', function(err){
      throw err;
  });
});

gulp.task('browser-sync', ['nodemon'], function(){
  process.chdir('src');
  browserSync.init( null, {
    proxy: "http://localhost:3000",
    files: [
      "public/javascripts/controller.js",
      "app.js"
      ],
    //files: sources.js,
    browser: "google-chrome",
    port: 7000 // open browser-sync at port:7000
  });
});

// create a default task and just log a message
gulp.task('default', ['scripts', 'styles', 'jshint', 'browser-sync'], function(){
  return gutil.log('Gulp is running!');
});


