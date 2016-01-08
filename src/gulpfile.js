'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var nodemon = require('gulp-nodemon');

gulp.task('develop', function(){
    return nodemon({ script: 'app.js'
                    , ext: 'html js'
                    , env: {'NODE_ENV': 'development'}
    })
    .on('restart', function(){
        console.log('restarted');
    });
});
