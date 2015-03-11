'use strict';

var gulp = require('gulp');

// Javascript
var babel  = require('gulp-babel');
var concat = require('gulp-concat');
var addsrc = require('gulp-add-src');
var uglify = require('gulp-uglify');

// CSS
var stylus = require('gulp-stylus');
var nib    = require('nib');

// HTML
var jade = require('gulp-jade');

// Server
var webserver = require('gulp-webserver');

gulp.task('main', function () {
  gulp.src(['app/**/*.js'])
    .pipe(babel({loose: 'all', modules: 'amd', moduleIds: true}))
      .on('error', function (e) {
        console.error(e.message);
        this.emit('end');
      })
    .pipe(addsrc.prepend('lib/**/*.js'))
    .pipe(concat('script.js'))
    .pipe(gulp.dest('build'));

  gulp.src(['app/**/!(variables)*.styl'])
    .pipe(addsrc.prepend('app/variables.styl'))
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
    .pipe(gulp.dest('build/level-builder'));

  gulp.src(['level-builder/!(lib)**/*.js'])
    .pipe(babel({loose: 'all', modules: 'amd', moduleIds: true}))
      .on('error', function (e) {
        console.error(e.message);
        this.emit('end');
      })
    .pipe(addsrc.prepend('level-builder/lib/**/*.js'))
    .pipe(concat('script.js'))
    .pipe(gulp.dest('build/level-builder'));

  gulp.src(['level-builder/**/!(variables)*.styl'])
    .pipe(addsrc.prepend('app/variables.styl'))
    .pipe(stylus({use: nib(), compress: true}))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('build/level-builder'));
});

gulp.task('webserver', function () {
  gulp.src('build')
    .pipe(webserver({
      livereload: true,
      host: '0.0.0.0',
      directoryListing: false,
      open: true,
      fallback: 'index.html'
    }));
});

gulp.task('watch', function () {
  gulp.watch(['app/**', 'assets/**', 'workers/**'], ['main']);
});

gulp.task('default', ['main', 'webserver', 'watch']);
gulp.task('build', ['main']);
gulp.task('build-level', ['level-builder']);
