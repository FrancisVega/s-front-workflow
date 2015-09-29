//
// Secuoyas 2015
// Frontend Gulp Workflow
//

// --------------------------------------------------------------------------{{{
// GULP PLUGINS
//
// Gulp itself
var gulp         = require('gulp');
// General
var postcss      = require('gulp-postcss');
var browserSync  = require('browser-sync');
var plumber      = require('gulp-plumber');
var rename       = require('gulp-rename');
var concat       = require('gulp-concat');
// CSS
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var minifyCss    = require('gulp-minify-css');
var autoprefixer = require('autoprefixer'); // <- postcss
var csswring     = require('csswring'); // <- postcss
// JS
var uglify       = require('gulp-uglify');
var jshint       = require('gulp-jshint');
// Images
var imageMin     = require('gulp-imagemin');
var pngquant     = require('imagemin-pngquant');
var svgmin       = require('gulp-svgmin');
// }}} 


// --------------------------------------------------------------------------{{{
// DIRECTORIOS DEL PROYECTO
// src = Source
// dist = Distribution
//
// Si renombramos las carpetas por alguna razón en este diccionario se pueden
// cambiar rápidamente el nombre y todo sigue funcionando
var dirs = {
    src: 'src/',
    dist: 'dist/',
};
// }}} 


// --------------------------------------------------------------------------{{{
// SASS => CSS
// Sass con gulp-sass (libsass)
//
// Esta es una de las tareas principales.
// Creamos sourcemaps y css con los vendor-prefixes.
// También se actualiza el navegador.
gulp.task('sass', function(){
    // Postcss
    var processors = [
        autoprefixer({browsers:['last 2 versions']}),
        csswring
    ];

    return gulp.src(dirs.src + 'scss/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss())
        //.pipe(autoprefixer())
        .pipe(sourcemaps.write(.))
        .pipe(gulp.dest('src/css'))
        // Reloading the stream
        .pipe(browserSync.reload({
            stream: true
        }));
});
// }}} 


// --------------------------------------------------------------------------{{{
// REFRESCO DEL NAVEGADOR
// 
// Refrescamos el navegador cuando existan cambios en archivos php, html, js y
// css.
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
// }}} 


// --------------------------------------------------------------------------{{{
// WATCH
//
// Tarea para vigilar ciertos archivo y ejecutar las tareas convenientes.
// Por ejemplo cuando se modifique un archivo scss/*.scssm, es decir cualquier
// archivo sass, se lanza la tarea 'sass'
gulp.task('watch', ['browserSync'], function(){
    gulp.watch(dirs.src + 'scss/*.scss', ['sass']);
    gulp.watch(dirs.src + '*.html', browserSync.reload);
    gulp.watch(dirs.src + 'js/*.js', browserSync.reload);
});
// }}} 


// TAREAS BUILD
// --------------------------------------------------------------------------{{{
// OPTIMIZAR SVGS 
// 
// Optimiza los svgs quitándole metadatos
gulp.task('svgo', function () {
    return gulp.src(dirs.src + "assets/images/*.svg")
        .pipe(svgmin())
        .pipe(gulp.dest(dirs.src + "assets/images"));
});
// }}} 


// --------------------------------------------------------------------------{{{
// OPTIMIZA IMÁGENES
gulp.task('imageMin', function() {
    return gulp.src(dirs.src + "assets/images/*.*")
        .pipe(imageMin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(dirs.dist + "assets/images"));
})
// }}} 


// --------------------------------------------------------------------------{{{
// LINT TASK
gulp.task('lint', function() {
    return gulp.src(dirs.src + 'js/*.js')
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
// }}} 


// --------------------------------------------------------------------------{{{
// CONCATENATE & MINIFY JS
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
// }}} 


// --------------------------------------------------------------------------{{{
// MINIFICA EL CSS DE SRC DIRECTAMENTE A DIST
gulp.task('miniCSS', function() {
    return gulp.src(dirs.src + 'css/*.css')
        .pipe(minifyCss({compatibilituy: 'ie8'}))
        .pipe(gulp.dest(dirs.dist + 'css'))
})
// }}} 


// --------------------------------------------------------------------------{{{
// COPIA HTML Y TIPOGRAFÍA
gulp.task('copy', function() {
    // HTML
    gulp.src(['*.html'], {cwd: dirs.src})
    .pipe(gulp.dest(dirs.dist));

    // Typografía
    gulp.src(['assets/fonts/*.*'], {cwd: dirs.src})
    .pipe(gulp.dest(dirs.dist + 'assets/fonts'));

});
// }}} 


// --------------------------------------------------------------------------{{{
// TAREAS GULP
gulp.task('default', ['sass', 'watch']);
gulp.task('build', ['svgo', 'lint', 'sass', 'scripts', 'miniCSS', 'imageMin', 'copy']);
// }}} 
