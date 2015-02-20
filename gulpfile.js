'use strict';

var gulp = require('gulp');

// Javascript
var to5 = require('gulp-6to5');
var concat = require('gulp-concat');
var addsrc = require('gulp-add-src');
var uglify = require('gulp-uglify');

// CSS
var stylus = require('gulp-stylus');
var nib = require('nib');

// HTML
var jade = require('gulp-jade');

// Server
var webserver = require('gulp-webserver');

gulp.task('main', function () {
  gulp.src(['app/**/*.js'])
    .pipe(to5({loose: 'all', modules: 'amd', moduleIds: true}))
    .pipe(addsrc.prepend('lib/**/*.js'))
    .pipe(concat('script.js'))
    .pipe(gulp.dest('build'));

  // gulp.src(['workers/**/*.js'])
  //   .pipe(to5({loose: 'all'}))
  //   .pipe(gulp.dest('build'));

  gulp.src(['app/**/*.styl'])
    .pipe(stylus({use: nib(), compress: true}))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('build'));

  gulp.src(['app/index.jade'])
    .pipe(jade({}))
    .pipe(gulp.dest('build'));

  gulp.src(['assets/**/*'])
    .pipe(gulp.dest('build'));
});

gulp.task('level-builder', function () {
  gulp.src(['level-builder/index.jade'])
    .pipe(jade({}))
    .pipe(gulp.dest('build'));
});

gulp.task('webserver', function () {
  gulp.src('build')
    .pipe(webserver({
      host: process.env.IP,
      port: process.env.PORT,
      livereload: true,
      directoryListing: false,
      open: true,
      fallback: 'index.html'
    }));
});

gulp.task('watch', function () {
  gulp.watch(['app/**', 'workers/**'], ['main']);
});

gulp.task('default', ['main', 'webserver', 'watch']);
gulp.task('build', ['main']);
gulp.task('build-level', ['level-builder']);
