/* File: gulpfile.js */

var gulp = require('gulp'),
  gutil = require('gulp-util'),
  jshint = require('gulp-jshint'),
  nodemon = require('gulp-nodemon'),
  browserSync = require('browser-sync').create();

var sources = {
  js: [
    'src/*.js',
    'src/public/javascripts/*.js'
  ],
  css: [
    'src/public/css/*.css'
  ]
};

gulp.task('scripts', function(){
  gulp.src("bower_components/angular/angular.js")
    .pipe(gulp.dest("src/public/javascripts"));

});

gulp.task('styles', function(){
  gulp.src("bower_components/bootstrap/dist/css/bootstrap.css")
    .pipe(gulp.dest("src/public/stylesheets"));

});

gulp.task('jshint', function(){
  return gulp.src( sources.js )
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch', function(){
  //browserSync.init({
  //  proxy: ""
  //});
  gulp.watch(sources.js, ['jshint']);
});

gulp.task('nodemon', function(){
  var started = false;

  return nodemon({
    script: 'src/app.js',
    ext: 'js html',
    env: {'NODE_ENV': 'development'}
  }).on('start', function(){
    // to avoid nodemon being started multiple times
    if(!started){
      cb();
      started = true;
    }
  });
});


gulp.task('browser-sync', ['nodemon'], function(){
  browserSync.init( null, {
    proxy: "http://localhost:3000",
    //files: ["src/public/javascripts/controller.js"],
    files: sources.js,
    browser: "google-chrome",
    port: 7000
  });
});

// create a default task and just log a message
//gulp.task('default', ['scripts', 'styles', 'jshint', 'watch'], function(){
gulp.task('default', ['scripts', 'styles', 'jshint', 'browser-sync'], function(){
  return gutil.log('Gulp is running!');
});


