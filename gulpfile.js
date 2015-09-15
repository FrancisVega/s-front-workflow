/*
 *
 * Gulp project boilerplate
 *
 */

// Vars
var gulp         = require('gulp'),
    browserSync  = require('browser-sync'),
    sass         = require('gulp-sass'),
    plumber      = require('gulp-plumber'),
    jshint       = require('gulp-jshint'),
    concat       = require('gulp-concat'),
    rename       = require('gulp-rename'),
    uglify       = require('gulp-uglify'),
    svgmin       = require('gulp-svgmin');

// Rutas báses del proyecto
var dirs = {
    src: 'src/',
    dist: 'dist/',
};

// Sass con gulp-sass (libsass)
gulp.task('sass', function(){
    return gulp.src(dirs.src + 'scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(dirs.src + 'css'))
        .pipe(browserSync.reload({
            stream: true
        }))
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


// Copia htmls, css, js y el directorio assets (imágenes, fuentes, etc..)
gulp.task('copy', function() {
    // HTML
    gulp.src(['*.html'], {cwd: dirs.src})
    .pipe(gulp.dest(dirs.dist));

    // CSS
    gulp.src(['css/**/*.css'], {cwd: dirs.src})
    .pipe(gulp.dest(dirs.dist + 'css'));

    // Assets
    gulp.src(['assets/**'], {cwd: dirs.src})
    .pipe(gulp.dest(dirs.dist + 'assets'));

});

// Default
gulp.task('default', ['sass', 'watch']);
gulp.task('build', ['svgo', 'lint', 'sass', 'scripts', 'copy']);
