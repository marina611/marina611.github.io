const gulp        = require('gulp');
const sass        = require('gulp-sass');
const plumber     = require('gulp-plumber');
const sourcemaps  = require('gulp-sourcemaps');
const browserSync = require('browser-sync');
const uglify      = require('gulp-uglify');
const cleanCSS    = require('gulp-clean-css');

// sass conversion
gulp.task('sass', function(){
  gulp.src('./scss/**/*.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./css/'))
    // optimization
    .pipe(cleanCSS())
    .pipe(gulp.dest('./dist/css/')); // 別ディレクトリ
});

// browser-sync
gulp.task('browser-sync', function() {
    browserSync({
        server: {
             baseDir: "."
            ,index  : "index.html"
        }
    });
});
gulp.task('bs-reload', function () {
    browserSync.reload();
});

//CSS optimization
gulp.task('minify-css', function() {
    return gulp.src("./css/*.css")
        .pipe(cleanCSS())
        .pipe(gulp.dest('./css')); // overwrite
        // .pipe(gulp.dest('./dist/css/')); // 別ディレクトリ
});

// watch task
gulp.task('sass-watch', ['sass','browser-sync'], function(){
  let watcher = gulp.watch('./scss/**/*.scss', ['sass']);
  gulp.watch('./*.html',['bs-reload']);
  gulp.watch('./scss/**/*.scss',['bs-reload']);
  gulp.watch('./js/**/*.js',['bs-reload']);
});

gulp.task('default', ['sass-watch','browser-sync']);
