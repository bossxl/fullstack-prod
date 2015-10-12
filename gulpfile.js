var gulp = require('gulp');
var gulpNSP = require('gulp-nsp');
var nodemon = require('gulp-nodemon');
var jshint = require('gulp-jshint');
var bump = require('gulp-bump');
var shrinkwrap = require('gulp-shrinkwrap');

gulp.task('nsp', ['shrinkwrap'],function (cb) {
  gulpNSP('./package.json', cb);
});

gulp.task('lint', function () {xs
  gulp.src('./index.js')
    .pipe(jshint())
});

gulp.task('shrinkwrap', function () {
  return gulp.src('package.json')
    .pipe(shrinkwrap())      // just like running `npm shrinkwrap`
    .pipe(gulp.dest('./'));  // writes newly created `npm-shrinkwrap.json` to the location of your choice
});

gulp.task('bump-prod', ['nsp'], function(){
  gulp.src('./package.json')
  .pipe(bump({type:'minor'}))
  .pipe(gulp.dest('./'));
});
gulp.task('bump-dev', function(){
  gulp.src('./package.json')
  .pipe(bump({type:'patch'}))
  .pipe(gulp.dest('./'));
});

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('production', ['shrinkwrap', 'nsp', 'bump-prod']);

gulp.task('develop', function () {
  nodemon({ script: 'index.js'
          , ext: 'html js'
          , tasks: ['lint', 'bump-dev'] })
    .on('restart', function () {
      console.log('restarted!')
    })
});