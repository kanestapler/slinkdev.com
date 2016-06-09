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

//delete dist folder
gulp.task('clean', function() {
    return del(['dist', 'scripts']);
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('src/client/layout/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/layout/css'));
});

//Compile ts to js
gulp.task('compile', ['compileClient', 'compileServer']);

gulp.task('compileClient', function () {
    return gulp.src('src/client/**/*.ts')
        .pipe(ts({
            noImplicitAny: true,
            out: 'client.js'
        }))
        .pipe(gulp.dest('scripts'));
});

gulp.task('compileServer', function () {
    return gulp.src('src/server/**/*.ts')
        .pipe(ts({
            noImplicitAny: true,
            out: 'server.js'
        }))
        .pipe(gulp.dest('scripts'));
});

// Concatenate & Minify JS
gulp.task('minify', ['compile'], function() {
    return gulp.src('scripts/client.js')
        .pipe(concat('all.js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('src/**/*.ts', ['lint', 'compile', 'minify']);
    gulp.watch('src/layout/*.scss', ['sass']);
});

gulp.task('build', ['lint', 'sass', 'compile', 'minify']);

// Default Task
gulp.task('default', ['lint', 'sass', 'compile', 'minify', 'watch']);