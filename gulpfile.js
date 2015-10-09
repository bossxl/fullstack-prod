var gulp = require('gulp');
var gulpNSP = require('gulp-nsp');
var nodemon = require('gulp-nodemon');
var jshint = require('gulp-jshint');
var bump = require('gulp-bump');
var shrinkwrap = require('gulp-shrinkwrap');

gulp.task('nsp', function (cb) {
  gulpNSP('./package.json', cb);
});

gulp.task('lint', function () {
  gulp.src('./index.js')
    .pipe(jshint())
});

gulp.task('bump-prod', function(){
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

gulp.task('production', ['nsp','bump-prod']);

gulp.task('develop', function () {
  nodemon({ script: 'index.js'
          , ext: 'html js'
          , tasks: ['lint', 'bump-dev'] })
    .on('restart', function () {
      console.log('restarted!')
    })
})