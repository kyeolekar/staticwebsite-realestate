// Gulp File

// Grabbing the gulp package

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    scss = require('gulp-sass'),
    webserver = require('gulp-webserver');

// Creating a default task
gulp.task('default', ['watch', 'webserver'])

// Task for copying html files
gulp.task('copy-html', function(){
  // Copying all html from source to public
  gulp.src('source/*.html').pipe(gulp.dest('public'))
});

// Task for using jslint on all js files
gulp.task('jshint', function(){
  return gulp.src('source/javascript/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// Task to compile scss
gulp.task('build-css', function(){
  return gulp.src('source/scss/**/*.scss')
    .pipe(scss())
    .pipe(gulp.dest('public/assets/stylesheets'))
})

gulp.task('copy-js', function(){
  // Copying all html from source to public
  gulp.src('source/javascript/**/*.js').pipe(gulp.dest('public/assets/javascript'))
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
  // gulp.watch('source/javascript/**/*.js', ['jshint']);
  gulp.watch('source/*.html', ['copy-html']);
  gulp.watch('source/scss/**/*.scss', ['build-css'])
  gulp.watch('source/javascript/**/*.js', ['copy-js'])
});


// Websever
gulp.task('webserver', function() {
  gulp.src('public')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

// Gulp task for server
gulp.task('server', function() {
  // Run server at start
  server.run(['app.js']);

  // Restart server on changes
  gulp.watch('source/javascript/**/*.js', server.notify);
  gulp.watch('source/*.html',  server.notify)
  gulp.watch('source/scss/**/*.scss', server.notify);
  gulp.watch(['app/images/**/*'], server.notify);
  gulp.watch(['app.js', 'routes/**/*.js'], [server.run]);
})