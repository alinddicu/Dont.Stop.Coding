/// <binding AfterBuild='karma' />

var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('server', ['node', 'karma']);

gulp.task('node', shell.task('node app.js'));
gulp.task('karma', shell.task('powershell -Command "./karma.ps1"'));