// Vars
var gulp         = require('gulp'),
    browserSync  = require('browser-sync'),
    plumber      = require('gulp-plumber'),
    jshint       = require('gulp-jshint'),
    concat       = require('gulp-concat')
    rename       = require('gulp-rename'),
    compass      = require('gulp-compass'),
    uglify       = require('gulp-uglify'),
    svgmin       = require('gulp-svgmin');



// Rutas báses del proyecto
var dirs = {
    app: 'app/',
    dist: 'dist/',
};

// Sass
gulp.task('compass', function() {
    return gulp.src([dirs.app + 'scss/*.scss'])
        .pipe(plumber())
        .pipe(compass({
            css: dirs.app + 'css',
            sass: dirs.app + '/scss'
        }))
        .pipe(gulp.dest(dirs.app + 'temp'))
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
            baseDir: dirs.app
        },
        // browser: 'safari'
        browser: 'google chrome',
        notify: false
    })
});

// Watch
gulp.task('watch', ['browserSync'], function(){
    gulp.watch(dirs.app + 'scss/*.scss', ['compass']);
    gulp.watch(dirs.app + '*.html', browserSync.reload);
    gulp.watch(dirs.app + 'js/*.js', browserSync.reload);
});

/*
*  Tareas exclusivas para build
*/


// Optimizar SVGs
gulp.task('svgo', function () {
    return gulp.src(dirs.app + "assets/images/*.svg")
        .pipe(svgmin())
        .pipe(gulp.dest(dirs.app + "assets/images"));
});

// Lint Task
gulp.task('lint', function() {
    return gulp.src(dirs.app + 'js/*.js')
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(dirs.app + 'js/*.js')
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
    gulp.src(['*.html'], {cwd: dirs.app})
    .pipe(gulp.dest(dirs.dist));

    // CSS
    gulp.src(['css/**/*.css'], {cwd: dirs.app})
    .pipe(gulp.dest(dirs.dist + 'css'));

    // Assets
    gulp.src(['assets/**'], {cwd: dirs.app})
    .pipe(gulp.dest(dirs.dist + 'assets'));

});

// Default
gulp.task('default', ['compass', 'watch']);
gulp.task('build', ['svgo', 'lint', 'compass', 'scripts', 'copy']);
