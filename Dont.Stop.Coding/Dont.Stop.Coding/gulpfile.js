/// <binding AfterBuild='dev-bundle' Clean='dev-clean-bundle' ProjectOpened='dev-watch-bundle' />

var gulp = require('gulp');
var concat = require('gulp-concat');
var del = require('del');
var watch = require('gulp-watch');

var paths = {
	transpiled: [
		'src/scripts/**/*.js',
		'src/scripts/**/*.map'
	],
	typescript: ['src/scripts/**/*.ts'],
	pages: ['src/**/*.html'],
	styles: ['src/styles/*'],
	images: ['src/images/*']
};

var watchPaths = []
	.concat(paths.transpiled)
	.concat(paths.typescript)
	.concat(paths.pages)
	.concat(paths.styles)
	.concat(paths.images);

gulp.task('dev-clean-bundle', function () {
	return	del(['bundle-dev/*']);
});

function moveAll() {
	gulp.src(paths.typescript).pipe(gulp.dest('dist/dev/scripts'));
	gulp.src(paths.transpiled).pipe(gulp.dest('dist/dev/scripts'));
	gulp.src(paths.pages).pipe(gulp.dest('dist/dev'));
	gulp.src(paths.styles).pipe(gulp.dest('dist/dev/styles'));
	gulp.src(paths.images).pipe(gulp.dest('dist/dev/images'));
}

gulp.task('dev-bundle', function () {
	// wait for all files to build before bundling
	setTimeout(function() {
		moveAll();
	}, 200);
});

gulp.task('dev-watch-bundle', function () {
    gulp.watch(watchPaths, ['dev-clean-bundle', 'dev-bundle']);
});

/*********************************** PROD *******************************************/

//gulp.task('prod-clean-bundle', function () {
//	return	del(['bundle-prod/*']);
//});

//gulp.task('prod-pack-js', function() {
//	return gulp.src(['transpiled/**/*.js'])
//		.pipe(concat('scripts.js'))
//		.pipe(gulp.dest('bundle-prod'));
//});

//gulp.task('prod-move-css', function() {
//	gulp.src(paths.styles).pipe(gulp.dest('bundle-prod'));
//});

//gulp.task('prod-watch-bundle', function () {
//	gulp.watch(watchPaths, ['prod-clean-bundle', 'prod-pack-js', 'prod-move-css']);
//});