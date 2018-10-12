//import gulp from 'gulp';
var gulp = require('gulp');
var replace = require('gulp-string-replace');
var p = require('./package.json');
var version = p.version;
//gulp.task('serve:after', ['version']);

//var versionFix = function() { 
  //console.log('Test');
   //gulp.src(["./dist/index.html"])
    /*.pipe(replace(/bundle.js/g, 'bundle.js?v='+p.version))
   .pipe(gulp.dest('./dist/'))
   .pipe(replace(/favicon.ico/g, 'favicon.ico?v='+p.version))
   .pipe(gulp.dest('./dist/')) */
   //.pipe(replace(/v.VERSION/g, 'v. '+p.version))
   //.pipe(gulp.dest('./dist/'));
 //}

//const version = gulp.series(versionFix);

//exports.version = gulp.task('version', gulp.parallel(versionFix));
//NEW...
//var del = require('del');
function versionFix(cb) {
    //del(['docs', 'coverage', 'build', 'release']);
    console.log('The new version will be: ', p.version);
    gulp.src(["./dist/index.html"])
    /*.pipe(replace(/bundle.js/g, 'bundle.js?v='+p.version))
   .pipe(gulp.dest('./dist/'))
   .pipe(replace(/favicon.ico/g, 'favicon.ico?v='+p.version))
   .pipe(gulp.dest('./dist/')) */
   .pipe(replace(/v.VERSION/g, 'v. '+p.version))
   .pipe(gulp.dest('./dist/'));
    cb();
}

gulp.task('version', gulp.series(versionFix));

