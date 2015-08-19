'use strict';

var gulp = require('gulp'),
    browserify = require('browserify'),
    browserSync = require('browser-sync').create(),
    buffer = require('vinyl-buffer'),
    concat = require('gulp-concat'),
    changed = require('gulp-changed'),
    debug = require('gulp-debug'),
    del = require('del'),
    gutil = require('gulp-util'),
    maps = require('gulp-sourcemaps'),
    reactify = require('reactify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    source = require('vinyl-source-stream'),
    uglify = require('gulp-uglify');

gulp.task('JS', function () {
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: './src/app/js/app.js',
    debug: true,
    // defining transforms here will avoid crashing your stream
    transform: [reactify]
  });

  return b.bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(maps.init({loadMaps: true}))
    .pipe(debug({title: 'JS compiled:'}))
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .on('error', gutil.log)
    .pipe(maps.write('./'))
    .pipe(gulp.dest('./dist/js/'))
    .pipe(browserSync.stream());
});

gulp.task('moveSCSS', function() {
    return gulp.src([
            'bower_components/fuselage/scss/fuselage.scss',
            'bower_components/fuselage/scss/_settings.scss'
        ])
        .pipe(changed('src/app/scss'))
        .pipe(debug({title: 'Styles moved:'}))
        .pipe(gulp.dest('src/app/scss'));
});

gulp.task('compileSCSS', ['moveSCSS'], function() {
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
    gulp.watch('src/app/scss/**', ['compileSCSS']);
    gulp.watch('src/app/js/**/*.js*', ['JS']);
    gulp.watch('src/app/*.html', ['moveHTML']);
});

gulp.task('clean', function() {
    del('dist');
});

gulp.task('build', ['JS', 'compileSCSS', 'moveHTML']);

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
