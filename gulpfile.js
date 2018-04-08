var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglifyjs = require('gulp-uglifyjs'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    del = require('del');

gulp.task('css', ['scss'], function(){
    return gulp.src('app/css/libs.css')
        .pipe(cssnano())
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest('app/css'))
});

gulp.task('js', function(){
    return gulp.src(['',
        ''])
        .pipe(concat('libs.min.js'))
        .pipe(uglifyjs())
        .pipe(gulp.dest('app/js'))
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "app"
        },
        notify: false,
    });
});

gulp.task('scss', function(){
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(autoprefixer({
            browsers: ['last 15 versions']
        }))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('watch',['scss', 'browser-sync'], function(){
    gulp.watch('app/scss/**/*.scss', ['scss'])
    gulp.watch('app/**/*.html' , browserSync.reload)
    gulp.watch('app/js/**/*.js' , browserSync.reload)
});

gulp.task('default', ['watch']);

gulp.task('clean', function(){
    del.sync('dist')
});

gulp.task('build', ['clean'], function(){
    var buildHtml = gulp.src('app/*.html')
        .pipe(gulp.dest("dist"))

    var buildJs = gulp.src('app/js/**/*.js')
        .pipe(gulp.dest('dist/js'))

    var buildFonts = gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))

    var buildCss = gulp.src(['!app/css/libs.css',
        'app/css/**/*.css'])
        .pipe(gulp.dest('dist/css'))
});