/// <binding AfterBuild='dev-bundle' Clean='dev-clean-bundle, prod-clean-bundle' ProjectOpened='dev-watch-bundle, prod-watch-bundle' />

var gulp = require('gulp');
var fs = require('fs');
var concat = require('gulp-concat');
var del = require('del');
var watch = require('gulp-watch');
var inject = require('gulp-inject');
var uglify = require('gulp-uglify');

var gulpFolder = __dirname;

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
	styles: ['src/styles/*.css'],
	images: ['src/images/**/*.png'],
	templates: ['src/templates/**/*.t.html'],
	buildResources: 'build-resources.json'
};

var watchPaths = []
	.concat(paths.transpiled)
	.concat(paths.typescript)
	.concat(paths.libs)
	.concat(paths.pages)
	.concat(paths.styles)
	.concat(paths.images)
	.concat(paths.templates)
	.concat(paths.buildResources)
;

gulp.task('dev-clean-bundle', function () {
	return del(['dist/dev/*']);
});

function buildIndexHtml() {
	var buildResources = JSON.parse(fs.readFileSync(gulpFolder + '\\' + paths.buildResources, "utf8"));
	var templateExt = '.ko.html';
	var srcFiles = []
		.concat(['src/templates/**/*' + templateExt])
		.concat(buildResources.css)
		.concat(buildResources.js.libs)
		.concat(buildResources.js.app)
	;

	gulp.src('./src/index.html')
		.pipe(inject(
			gulp.src(srcFiles, { read: false }), {
				transform: function (filepath) {
					var fileName = filepath.substring(filepath.lastIndexOf('/') + 1);
					if (filepath.slice(-templateExt.length) === templateExt)
					{
						filepath = gulpFolder + filepath;
						var templateId = fileName.substring(0, fileName.indexOf(templateExt));
						var fileContent = fs.readFileSync(filepath, "utf8");

						console.info('Injecting ko template with id: ' + templateId);

						return '<script type="text/html" id="' + templateId + '">' + fileContent + '</script>';
					}
					else if (filepath.slice(-4) === '.css')
					{
						console.info('Injecting css: ' + fileName);

						filepath = filepath.replace('/src/', '');
						return '<link rel="stylesheet" href="' + filepath + '" type="text/css"/>';
					}
					else if (filepath.slice(-3) === '.js')
					{
						console.info('Injecting js: ' + fileName);

						filepath = filepath.replace('/src/', '');
						return '<script src="' + filepath + '"></script >';
					}

					// Use the default transform as fallback:
					return inject.transform.apply(inject.transform, arguments);
				}
			}
		))
		.pipe(gulp.dest('dist/dev'));
}

function moveAll(environment) {
	gulp.src(paths.typescript).pipe(gulp.dest('dist/' + environment + '/scripts'));
	gulp.src(paths.transpiled).pipe(gulp.dest('dist/' + environment + '/scripts'));
	gulp.src(paths.styles).pipe(gulp.dest('dist/' + environment + '/styles'));
	gulp.src(paths.images).pipe(gulp.dest('dist/' + environment + '/images'));
	gulp.src(paths.libs).pipe(gulp.dest('dist/' + environment + '/lib'));
	gulp.src(paths.libs).pipe(gulp.dest('src/lib'));
}

function buildDev() {
	moveAll('dev');
	buildIndexHtml();
}

gulp.task('dev-bundle', function () {
	// wait for all files to build before bundling
	setTimeout(function () {
		buildDev();
	}, 200);
});

gulp.task('dev-watch-bundle', function () {
	gulp.watch(watchPaths, ['dev-clean-bundle', 'dev-bundle']);
});

/*********************************** PROD *******************************************/

gulp.task('prod-clean-bundle', function () {
	return del(['dist/prod/*']);
});

function moveProd() {
	gulp.src(paths.styles).pipe(gulp.dest('dist/prod/styles'));
	gulp.src(paths.images).pipe(gulp.dest('dist/prod/images'));
}

function buildProd() {
	moveProd();

	var buildResources = JSON.parse(fs.readFileSync(gulpFolder + '\\' + paths.buildResources, "utf8"));
	var distDest = 'dist/prod';

	gulp.src([].concat(buildResources.js.libs).concat(buildResources.js.app))
		.pipe(concat('scripts.js'))
		.pipe(gulp.dest(distDest));

	var templateExt = '.ko.html';
	var srcFiles = []
		.concat(['src/templates/**/*' + templateExt])
		.concat(buildResources.css)
		.concat(['dist/prod/scripts.js']);

	gulp.src('./src/index.html')
	.pipe(inject(gulp.src(srcFiles, { read: false }), {
		transform: function (filepath) {
			var fileName = filepath.substring(filepath.lastIndexOf('/') + 1);
			console.log('fileName: ' + fileName);

			if (filepath.slice(-templateExt.length) === templateExt)
			{
				filepath = gulpFolder + filepath;
				var templateId = fileName.substring(0, fileName.indexOf(templateExt));
				var fileContent = fs.readFileSync(filepath, "utf8");

				console.info('Injecting ko template with id: ' + templateId);

				return '<script type="text/html" id="' + templateId + '">' + fileContent + '</script>';
			}
			else if (filepath.slice(-3) === '.js')
			{
				console.info('Injecting js: ' + fileName);

				filepath = filepath.replace('/dist/prod/', '');
				return '<script src="' + filepath + '"></script >';
			}
			else if (filepath.slice(-4) === '.css')
			{
				console.info('Injecting css: ' + fileName);

				filepath = filepath.replace('/src/', '');
				return '<link rel="stylesheet" href="' + filepath + '" type="text/css"/>';
			}

			// Use the default transform as fallback:
			return inject.transform.apply(inject.transform, arguments);
		}
	}))
	.pipe(gulp.dest(distDest));
}

gulp.task('prod-bundle', function () {
	// wait for all files to build before bundling
	setTimeout(function () {
		buildProd();
	}, 200);
});

gulp.task('prod-watch-bundle', function () {
	gulp.watch(watchPaths, ['prod-clean-bundle', 'prod-bundle']);
});