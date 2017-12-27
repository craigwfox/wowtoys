const gulp = require('gulp'),
  postcss = require('gulp-postcss'),
  cssnext = require("postcss-cssnext"),
  sourcemaps = require('gulp-sourcemaps'),
  autoprefixer = require('autoprefixer'),
  browserSync = require('browser-sync').create();

gulp.task('css', function () {
  let plugins = [
    cssnext({ browsers: ['last 2 versions'] })
  ];

  return gulp.src('src/css/styles.css')
    .pipe(postcss(plugins))
    .pipe(gulp.dest('app/'));
});

gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: "./app"
    }
  });

  gulp.watch("src/css/**/*.css", ['css']);
});