/// <binding AfterBuild='karma' />

var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('node', function(done) {
	shell.task('node app.js');
	done();
});

gulp.task('karma', function(done) {
	shell.task('powershell -Command "./karma.ps1"');
	done();
});

gulp.task('server', gulp.series('node', 'karma'));