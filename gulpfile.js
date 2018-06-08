var gulp = require('gulp');
var replace = require('gulp-string-replace');
var p = require('./package.json');
var version = p.version;
gulp.task('serve:after', ['version']);

console.log('Task init!!!');
gulp.task('version', function() {
  gulp.src(["./dist/index.html"])
 /*  .pipe(replace(/bundle.js/g, 'bundle.js?v='+p.version))
  .pipe(gulp.dest('./dist/'))
  .pipe(replace(/favicon.ico/g, 'favicon.ico?v='+p.version))
  .pipe(gulp.dest('./dist/')) */
  .pipe(replace(/v.VERSION/g, 'v. '+p.version))
  .pipe(gulp.dest('./dist/'));
  
});