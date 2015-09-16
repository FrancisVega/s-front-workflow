/*
 *
 * Gulp project boilerplate
 *
 */

// Vars
var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var sass         = require('gulp-sass');
var plumber      = require('gulp-plumber');
var jshint       = require('gulp-jshint');
var concat       = require('gulp-concat');
var rename       = require('gulp-rename');
var uglify       = require('gulp-uglify');
var svgmin       = require('gulp-svgmin');
var minifyCss    = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps   = require('gulp-sourcemaps');
var imageMin     = require('gulp-imagemin');
var pngquant     = require('imagemin-pngquant');

// Rutas báses del proyecto
var dirs = {
    src: 'src/',
    dist: 'dist/',
};

// Sass con gulp-sass (libsass)
gulp.task('sass', function(){
    return gulp.src(dirs.src + 'scss/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('src/css'))
        // Reloading the stream
        .pipe(browserSync.reload({
            stream: true
        }));
});

// BrowserSync
gulp.task('browserSync', function() {
    browserSync({
        files: "*.php, *.html, *.js, *.css",
        server: {
            baseDir: dirs.src
        },
        // browser: 'safari'
        browser: 'google chrome',
        notify: false
    })
});

// Watch
gulp.task('watch', ['browserSync'], function(){
    gulp.watch(dirs.src + 'scss/*.scss', ['sass']);
    gulp.watch(dirs.src + '*.html', browserSync.reload);
    gulp.watch(dirs.src + 'js/*.js', browserSync.reload);
});

/*
 *
 * Tareas exclusivas para build
 *
 */

// Optimizar SVGs
gulp.task('svgo', function () {
    return gulp.src(dirs.src + "assets/images/*.svg")
        .pipe(svgmin())
        .pipe(gulp.dest(dirs.src + "assets/images"));
});


// Optimiza imágenes
gulp.task('imageMin', function() {
    return gulp.src(dirs.src + "assets/images/*.*")
        .pipe(imageMin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(dirs.dist + "assets/images"));
})

// Lint Task
gulp.task('lint', function() {
    return gulp.src(dirs.src + 'js/*.js')
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(dirs.src + 'js/*.js')
        .pipe(plumber())
        .pipe(concat('all.js'))
        .pipe(gulp.dest(dirs.dist + '/js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(dirs.dist + '/js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// Minifica el css de SRC directamente a DIST
gulp.task('miniCSS', function() {
    return gulp.src(dirs.src + 'css/*.css')
        .pipe(minifyCss({compatibilituy: 'ie8'}))
        .pipe(gulp.dest(dirs.dist + 'css'))
})

// Copia html y tipografía
gulp.task('copy', function() {
    // HTML
    gulp.src(['*.html'], {cwd: dirs.src})
    .pipe(gulp.dest(dirs.dist));

    // Typografía
    gulp.src(['assets/fonts/*.*'], {cwd: dirs.src})
    .pipe(gulp.dest(dirs.dist + 'assets/fonts'));

});

// Default
gulp.task('default', ['sass', 'watch']);
gulp.task('build', ['svgo', 'lint', 'sass', 'scripts', 'miniCSS', 'imageMin', 'copy']);
