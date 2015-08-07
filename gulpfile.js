'use strict';

var gulp = require('gulp');

gulp.task('hello', function(){
    console.log('Hello World!');
});

gulp.task('default', ['hello'], function() {
    console.log('This is the default task.');
});
