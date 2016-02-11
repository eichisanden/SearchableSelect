const gulp = require('gulp');
const zip = require('gulp-zip');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const webpack = require('gulp-webpack');
const del = require('del');

gulp.task('zip', ['copy'], () => {
  return gulp.src('dist/*')
      .pipe(zip('searchableSelect.xpi'))
      .pipe(gulp.dest('xpi'));
});

gulp.task('copy', ['webpack'], () => {
  return gulp.src(['build/background.js', 'src/manifest.json', 'src/css/select2.css'])
      .pipe(gulp.dest('dist'));
});

const webpackConfig = {
  entry: './build/content_script.js',
  output: {
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js']
  }
};

gulp.task('webpack', ['babel'], () => {
  return gulp.src('./build/content_script.js')
      .pipe(webpack(webpackConfig))
      .pipe(gulp.dest('dist'));
});

gulp.task('babel', ['clean'], () => {
  return gulp.src('./src/js/*.js')
      .pipe(babel({presets: ['es2015']}))
      .pipe(uglify())
      .pipe(gulp.dest('build'));
});

gulp.task('clean', () => {
  del(['build', 'dist', 'xpi'], (err, deletedFiles) => {
    console.log('Files deleted:', deletedFiles.join(', '));
  });
});

gulp.task('default', ['zip']);
