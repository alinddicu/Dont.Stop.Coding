/// <binding AfterBuild='all-dev, all-prod' ProjectOpened='watch-dev, watch-prod' />

/*********************************** COMMON *******************************************/

var gulp = require('gulp');
var fs = require('fs');
var concat = require('gulp-concat');
var del = require('del');
var watch = require('gulp-watch');
var inject = require('gulp-inject');
var uglify = require('gulp-uglify-es').default;
var rename = require("gulp-rename");
var sourcemaps = require('gulp-sourcemaps');
var csso = require('gulp-csso');

var gulpFolder = __dirname;
var prodDistDest = 'dist/prod';
var koTemplateExtension = '.ko.html';

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

var buildResources = JSON.parse(fs.readFileSync(gulpFolder + '\\' + paths.buildResources, "utf8"));

var watchPaths = []
	.concat(paths.transpiled)
	.concat(paths.typescript)
	.concat(paths.libs)
	.concat(paths.pages)
	.concat(paths.styles)
	.concat(paths.images)
	.concat(paths.templates)
	.concat(paths.buildResources);

function injectionTransformation(filepath, relativePath) {
	var fileName = filepath.substring(filepath.lastIndexOf('/') + 1);
	if (filepath.slice(-koTemplateExtension.length) === koTemplateExtension) {
		filepath = gulpFolder + filepath;
		var templateId = fileName.substring(0, fileName.indexOf(koTemplateExtension));
		var fileContent = fs.readFileSync(filepath, "utf8");

		console.info('Injecting ko html: ' + templateId);

		return '<script type="text/html" id="' + templateId + '">' + fileContent + '</script>';
	}
	else if (filepath.slice(-4) === '.css') {
		console.info('Injecting css: ' + fileName);

		filepath = filepath.replace(relativePath, '');
		return '<link rel="stylesheet" href="' + filepath + '" type="text/css"/>';
	}
	else if (filepath.slice(-3) === '.js') {
		console.info('Injecting js: ' + fileName);

		filepath = filepath.replace(relativePath, '');
		return '<script src="' + filepath + '"></script >';
	}

	// Use the default transform as fallback:
	return inject.transform.apply(inject.transform, arguments);
}

/*********************************** DEV *******************************************/

gulp.task('dev-clean', function () {
	return del(['dist/dev/*']);
});

gulp.task('dev-copy-all', function () {
	var result = gulp.src(paths.typescript).pipe(gulp.dest('dist/dev/scripts'));
	result && gulp.src(paths.transpiled).pipe(gulp.dest('dist/dev/scripts'));
	result && gulp.src(paths.styles).pipe(gulp.dest('dist/dev/styles'));
	result && gulp.src(paths.images).pipe(gulp.dest('dist/dev/images'));
	result && gulp.src(paths.libs).pipe(gulp.dest('dist/dev/lib'));

	return result && gulp.src(paths.libs).pipe(gulp.dest('src/lib'));
});

gulp.task('dev-inject-all', function () {
	var srcFiles = []
		.concat(['src/templates/**/*' + koTemplateExtension])
		.concat(buildResources.css)
		.concat(buildResources.js.libs)
		.concat(buildResources.js.app);

	return gulp.src('./src/index.html')
		.pipe(inject(gulp.src(srcFiles, { read: false }), {
			transform: function (filepath) {
				return injectionTransformation(filepath, '/src/');
			}
		}))
		.pipe(gulp.dest('dist/dev'));
});

gulp.task('all-dev', gulp.series('dev-clean', 'dev-copy-all', 'dev-inject-all'));

gulp.task('watch-dev', function () {
	gulp.watch(watchPaths, gulp.series('all-dev'));
});

/*********************************** PROD *******************************************/

gulp.task('prod-clean', function () {
	return del(['dist/prod/*']);
});

gulp.task('prod-copy-images', function () {
	return gulp.src(paths.images).pipe(gulp.dest('dist/prod/images'));
});

gulp.task('prod-concat-minify-js', function () {
	return gulp.src([].concat(buildResources.js.libs).concat(buildResources.js.app))
		.pipe(concat('scripts.js'))
		.pipe(rename('scripts.min.js'))
		//.pipe(sourcemaps.init())
		//.pipe(uglify())
		//.pipe(sourcemaps.write())
		.pipe(gulp.dest(prodDistDest));
});

gulp.task('prod-concat-minify-css', function () {
	return gulp.src(buildResources.css)
		.pipe(concat('styles.css'))
		.pipe(csso())
		.pipe(rename('styles.min.css'))
		.pipe(gulp.dest(prodDistDest));
});

gulp.task('prod-inject-all', function () {
	
	var srcFiles = []
		.concat(['src/templates/**/*' + koTemplateExtension])
		.concat(['dist/prod/*.css'])
		.concat(['dist/prod/*.js']);

	return gulp.src('./src/index.html')
		.pipe(inject(gulp.src(srcFiles, { read: false }), {
			transform: function (filepath) {
				return injectionTransformation(filepath, '/dist/prod/');
			}
		}))
		.pipe(gulp.dest(prodDistDest));
});

gulp.task('all-prod', gulp.series('prod-clean', 'prod-copy-images', 'prod-concat-minify-js', 'prod-concat-minify-css', 'prod-inject-all'));

gulp.task('watch-prod', function () {
	gulp.watch(watchPaths, gulp.series('all-prod'));
});
