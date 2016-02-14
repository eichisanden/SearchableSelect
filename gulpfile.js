const gulp = require('gulp');
const zip = require('gulp-zip');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const webpack = require('gulp-webpack');
const del = require('del');
const crx = require('gulp-crx-pack');
const fs = require('fs');

// Packaging for Chrome.
gulp.task('crx', ['copy2'], () => {
  return gulp.src('dist')
    .pipe(crx({
      privateKey: fs.readFileSync('./src/chrome/SearchableSelect.pem', 'utf8'),
      filename: 'searchableSelect.crx'
    }))
    .pipe(gulp.dest('package'));
});

gulp.task('copy2', ['xpi'], () => {
  return gulp.src(['src/chrome/manifest.json'])
      .pipe(gulp.dest('dist'));
});

// Packaging for Firefox.
gulp.task('xpi', ['copy'], () => {
  return gulp.src('dist/*')
      .pipe(zip('searchableSelect.xpi'))
      .pipe(gulp.dest('package'));
});

gulp.task('copy', ['webpack'], () => {
  return gulp.src(['build/background.js', 'src/firefox/manifest.json', 'src/css/select2.min.css'])
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
  del(['build', 'dist', 'package'], (err, deletedFiles) => {
    console.log('Files deleted:', deletedFiles.join(', '));
  });
});

gulp.task('default', ['crx']);
