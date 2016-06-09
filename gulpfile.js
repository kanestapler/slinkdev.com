// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var ts = require('gulp-typescript');
var del = require('del');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('src/**/*.ts')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('src/layout/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/layout/css'));
});

//Compile ts to js
gulp.task('compile', function () {
    return gulp.src('src/**/*.ts')
        .pipe(ts({
            noImplicitAny: true,
            out: 'output.js'
        }))
        .pipe(gulp.dest('scripts'));
});

//delete dist folder
gulp.task('clean', function() {
    del(['dist', 'scripts']);
});

// Concatenate & Minify JS
gulp.task('minify', ['compile'], function() {
    return gulp.src('scripts/*.js')
        .pipe(concat('all.js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('src/**/*.ts', ['lint', 'compile']);
    gulp.watch('src/layout/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'compile', 'minify', 'watch']);