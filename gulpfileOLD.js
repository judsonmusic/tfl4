var gulp = require('gulp');
var replace = require('gulp-string-replace');
var p = require('./package.json');
var version = p.version;
gulp.task('serve:after', ['version']);


var a = function() {
  gulp.src(["./dist/index.html"])
 /*  .pipe(replace(/bundle.js/g, 'bundle.js?v='+p.version))
  .pipe(gulp.dest('./dist/'))
  .pipe(replace(/favicon.ico/g, 'favicon.ico?v='+p.version))
  .pipe(gulp.dest('./dist/')) */
  .pipe(replace(/v.VERSION/g, 'v. '+p.version))
  .pipe(gulp.dest('./dist/'));
  
}
gulp.task('a', gulp.series(a));

// gulp.task('a', gulp.series(gulp.parallel('a'), function () {
//   // do something 
// }))
