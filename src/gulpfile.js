'use strict';

var gulp = require('gulp'),
  gutil = require('gulp-util'),
  jshint = require('gulp-jshint'),
  nodemon = require('gulp-nodemon'),
  browserSync = require('browser-sync').create();

//var BROWSER_SYNC_RELOAD_DELAY = 500;
//var BROWSER_SYNC_RELOAD_DELAY = 50;
var BROWSER_SYNC_RELOAD_DELAY = 5;
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
//gulp.task('default', ['scripts', 'styles', 'jshint', 'watch'], function(){
gulp.task('default', ['scripts', 'styles', 'jshint', 'browser-sync'], function(){
  return gutil.log('Gulp is running!');
});


