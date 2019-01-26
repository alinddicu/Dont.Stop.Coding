/// <binding AfterBuild='dev-bundle' Clean='dev-clean-bundle' ProjectOpened='dev-watch-bundle' />

var gulp = require('gulp');
var fs = require('fs');
var concat = require('gulp-concat');
var del = require('del');
var watch = require('gulp-watch');
var inject = require('gulp-inject');

var paths = {
	libs: [
		'node_modules/linq/linq.min.js',
		'node_modules/knockout/build/output/knockout-latest.js',
		'node_modules/sammy/lib/min/sammy-latest.min.js',
		'node_modules/jquery/dist/jquery.min.js'
	],
	transpiled: ['src/scripts/**/*.js'],
	typescript: ['src/scripts/**/*.ts'],
	pages: ['src/**/*.html'],
	styles: ['src/styles/*'],
	images: ['src/images/**/*.png'],
	templates: ['src/templates/**/*.t.html']
};

var watchPaths = []
	.concat(paths.transpiled)
	.concat(paths.typescript)
	.concat(paths.libs)
	.concat(paths.pages)
	.concat(paths.styles)
	.concat(paths.images)
	.concat(paths.templates);

gulp.task('dev-clean-bundle', function () {
	return del(['bundle-dev/*']);
});

function moveAll() {
	gulp.src(paths.typescript).pipe(gulp.dest('dist/dev/scripts'));
	gulp.src(paths.transpiled).pipe(gulp.dest('dist/dev/scripts'));
	gulp.src(paths.styles).pipe(gulp.dest('dist/dev/styles'));
	gulp.src(paths.images).pipe(gulp.dest('dist/dev/images'));
	gulp.src(paths.libs).pipe(gulp.dest('dist/dev/lib'));
	// for disabling index.html warnings, only
	gulp.src(paths.libs).pipe(gulp.dest('src/lib'));

	var templateExt = '.ko.html';
	gulp.src('./src/index.html')
  .pipe(inject(
    gulp.src(['src/templates/**/*' + templateExt], { read: false }), {
    	transform: function (filepath) {
    		if (filepath.slice(-templateExt.length) === templateExt)
    		{
    			filepath = __dirname + filepath;
    			var templateId = filepath.substring(filepath.lastIndexOf('/') + 1, filepath.indexOf(templateExt));
    			console.log('Injecting template with id: ' + templateId);
    			var fileContent = fs.readFileSync(filepath, "utf8");
    			return '<script type="text/html" id="' + templateId + '">' + fileContent + '</script>';
    		}

    		// Use the default transform as fallback:
    		return inject.transform.apply(inject.transform, arguments);
    	}
    }
  ))
  .pipe(gulp.dest('dist/dev'));
}

gulp.task('dev-bundle', function () {
	// wait for all files to build before bundling
	setTimeout(function () {
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