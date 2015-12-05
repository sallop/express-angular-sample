/* File: gulpfile.js */

var gulp = require('gulp'),
	gutil = require('gulp-util'),
	jshint = require('gulp-jshint');

var sources = {
	js: [
		'src/*.js',
		'src/public/javascripts/*js'
	],
	css: [
		'src/public/css/*.css'
	]
};
// create a default task and just log a message
gulp.task('default', ['watch'], function(){
	return gutil.log('Gulp is running!');
});

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

gulp.watch('watch', function(){
	gulp.watch(sources.js, ['jshint']);
});




