const gulp = require('gulp'),
  postcss = require('gulp-postcss'),
  cssnext = require("postcss-cssnext"),
  sourcemaps = require('gulp-sourcemaps'),
  autoprefixer = require('autoprefixer'),
  browserSync = require('browser-sync').create(),
  babel = require('gulp-babel');


// ------------------------------
// CSS build
gulp.task('css-build', function () {
  let plugins = [
    cssnext(),
    require('postcss-normalize')({
      forceImport: true
    }),
    require('cssnano')({
      autoprefixer: false
    })
  ];

  return gulp.src('src/css/styles.css')
    .pipe(postcss(plugins))
    .pipe(gulp.dest('app/assets/css'))
    .pipe(browserSync.stream());
});

// ------------------------------
// JS build
gulp.task('js-build', () =>
  gulp.src('src/js/app.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('app/assets/js'))
);
gulp.task('js-watch', ['js-build'], function(done) {
  browserSync.reload();
  done();
});


// ------------------------------
// Browsersync

gulp.task('reload', function (done) {
  browserSync.reload();
  done();
});

gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: "./app"
    },
    open: false,
    notify: false
  });

  gulp.watch("src/css/**/*.css", ['css-build']);
  gulp.watch("src/js/**/*.js", ['js-watch']);
  gulp.watch('app/**/*.html', ['reload']);
});


// ------------------------------
// Default
gulp.task('default', ['browser-sync']);