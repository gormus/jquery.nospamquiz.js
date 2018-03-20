var gulp = require('gulp');
var header = require('gulp-header');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var pump = require('pump');
var rimraf = require('rimraf').sync;
var jshint = require('gulp-jshint');

var pkg = require('./package.json');
var banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join('\n');

gulp.task('clean', function () {
  rimraf('dist');
});

gulp.task('build', function (cb) {
  pump([
    gulp.src('src/*.js'),
    jshint(),
    jshint.reporter('jshint-stylish'),
    uglify(),
    header(banner, { pkg : pkg }),
    rename({ suffix: '.min' }),
    gulp.dest('dist')
  ], cb);
});

gulp.task('default', ['clean', 'build']);
