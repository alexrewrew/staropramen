'use strict';

var gulp = require('gulp');
var stylus = require('gulp-stylus');
var browserSync = require('browser-sync');
var concat = require('gulp-concat'); //конкатинація
var uglify = require('gulp-uglify'); //мініфікація js
var cleanCSS = require('gulp-clean-css'); //мініфі/**/кація css
var htmlmin = require('gulp-html-minifier'); //мініфікація html
var autoprefixer = require('gulp-autoprefixer'); //розстановка автопрефіксів
var clean = require('gulp-clean'); //очищення папки dist
var csscomb = require('gulp-csscomb'); //компановка css
var rimraf = require('rimraf');
var imagemin = require('gulp-imagemin');
var pug = require('gulp-pug');
var notify = require("gulp-notify");

//browser sync
gulp.task('browserSync', function () {
    browserSync({
        server: {
            baseDir: 'app'
        }
    })
});

//stylus compilation
gulp.task('stylus', function () {
    //noinspection JSUnresolvedFunction
    return gulp.src('app/stylus/style.styl')
        .pipe(stylus({'include css': true}).on('error', notify.onError(function (error) {
            return 'An error occurred while compiling stylus.\nLook in the console for details.\n' + error;
        })))
        .pipe(autoprefixer({
            browsers: ['last 20 versions'],
            cascade: false
        }))
        .pipe(csscomb())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

//pug compilation
gulp.task('pug', function buildHTML() {
    return gulp.src('app/pages/*.pug')
        .pipe(pug({pretty: true}).on('error', notify.onError(function (error) {
            return 'An error occurred while compiling jade.\nLook in the console for details.\n' + error;
        })))
        .pipe(gulp.dest('app/'))
});

//js concat
gulp.task('scripts', function () {
    return gulp.src(['app/libs/jquery/dist/jquery.js', 'app/libs/slick-carousel/slick/slick.js', 'app/libs/bootstrap 3 without grid (full)/js/bootstrap.js', 'app/js/scripts/scripts.js'])
        .pipe(concat('main.js'))
        .pipe(gulp.dest('app/js'));
});

//--------BUILD

//clean dest
gulp.task('clean', function (cb) {
    rimraf('./dist/*', cb);
});

//js minify
gulp.task('compress', function () {
    return gulp.src('app/js/main.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// css minify
gulp.task('minify-css', function () {
    return gulp.src('app/css/style.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'));
});

//html minify
gulp.task('minify-html', function () {
    gulp.src('app/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'))
});

//img minify
gulp.task('imagemin', function () {
    gulp.src('app/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
});

//copy fonts
gulp.task('fonts', function () {
    return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
})

//copy video
gulp.task('video', function () {
    return gulp.src('app/video/**/*')
        .pipe(gulp.dest('dist/video'))
})

//copy php
gulp.task('php', function () {
    return gulp.src('app/php/**/*')
        .pipe(gulp.dest('dist/php'))
})
//copy audio
gulp.task('php', function () {
    return gulp.src('app/audio/**/*')
        .pipe(gulp.dest('dist/audio'))
})

//build
gulp.task('build', ['fonts', 'video', 'imagemin', 'minify-css', 'compress', 'minify-html'], function () {
});

//watch
gulp.task('watch', ['scripts', 'pug', 'browserSync', 'stylus'], function () { //запуск browser-sync та sass відслідковувачів
    gulp.watch('app/stylus/**/*.styl', ['stylus']); //пошук scss файлів
    /*gulp.watch('app/html/!*.html', ['rigger']); //пошук html файлів*/
    gulp.watch('app/pages/**/*.pug', ['pug']); //пошук html файлів
    gulp.watch(['app/js/scripts/scripts.js'], ['scripts']); //пошук html файлів
    gulp.watch('app/*.html', browserSync.reload); //пошук html файлів
    gulp.watch('app/js/*.js', browserSync.reload); //пошук js файлів
});