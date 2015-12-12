/**
 * Auth 自动化工具
 */

'use strict';
var gulp = require('gulp'),
    path = require('path');

// 引入组件
var $ = require('gulp-load-plugins')();

gulp.task('minify', function () {
  return gulp.src('autoimgsizes.js')
    .pipe($.uglify())
    .pipe($.concat('autoimgsizes.min.js'))
    .pipe(gulp.dest(''))
});


// gulp task
gulp.task("default", ["minify"])
