'use strict';

var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    concat = require('gulp-concat'),
    changed = require('gulp-changed'),
    debug = require('gulp-debug'),
    del = require('del'),
    maps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify');

gulp.task('moveScripts', function() {
    return gulp.src([
            'bower_components/react/react.min.js',
            'bower_components/react/JSXTransformer.js'
        ])
        .pipe(changed('dist/js/vendor'))
        .pipe(debug({title: 'Scripts moved:'}))
        .pipe(gulp.dest('dist/js/vendor'));
});

gulp.task('concatScripts', function() {
    return gulp.src('src/app/js/components/**/*.js')
        .pipe(debug({title: 'Scripts cat\'d and minified'}))
        .pipe(maps.init())
        .pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(maps.write('./'))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
});

gulp.task('moveStyles', function() {
    return gulp.src([
            'bower_components/fuselage/scss/fuselage.scss',
            'bower_components/fuselage/scss/_settings.scss'
        ])
        .pipe(changed('src/app/scss'))
        .pipe(debug({title: 'Styles moved:'}))
        .pipe(gulp.dest('src/app/scss'));
});

gulp.task('compileSass', ['moveStyles'], function() {
    return gulp.src('src/app/scss/app.scss')
        .pipe(maps.init())
        .pipe(sass({
            outputStyle: 'compressed',
            includePaths: ['bower_components/fuselage/scss/components']
        }).on('error', sass.logError))
        .pipe(debug({title: 'Sass compiled:'}))
        .pipe(rename('app.min.css'))
        .pipe(maps.write('./'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('moveHTML', function() {
    return gulp.src('src/app/*.html')
        .pipe(changed('src/app/*.html'))
        .pipe(debug({title: 'HTML moved:'}))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

gulp.task('watchFiles', function() {
    gulp.watch('src/app/scss/**', ['compileSass']);
    gulp.watch('src/app/js/components/**', ['concatScripts']);
    gulp.watch('src/app/*.html', ['moveHTML']);
});

gulp.task('clean', function() {
    del('dist');
});

gulp.task('build', ['moveScripts', 'concatScripts', 'compileSass', 'moveHTML']);

gulp.task('serve', ['build'], function() {
    browserSync.init({
        port: 3000,
        server: {
            baseDir: './dist'
        }
    });

    gulp.start('watchFiles');
});

gulp.task('default', ['clean'], function() {
    gulp.start('build');
});
