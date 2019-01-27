﻿/// <binding AfterBuild='dev-clean, all-dev, prod-clean, all-prod' Clean='dev-clean, prod-clean' ProjectOpened='watch-dev, watch-prod' />

/// <reference path="typings/gulp-required.d.ts"/>

/*********************************** COMMON *******************************************/

let gulp = require('gulp');
let fs = require('fs');
let concat = require('gulp-concat');
let del = require('del');
let watch = require('gulp-watch');
let inject = require('gulp-inject');
let uglify = require('gulp-uglify');

let gulpFolder = __dirname;
let prodDistDest= 'dist/prod';
let koTemplateExtension = '.ko.html';

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
	.concat(paths.buildResources)
	;

/*********************************** DEV *******************************************/

gulp.task('dev-clean', function () {
	return del(['dist/dev/*']);
});

function buildIndexHtml() {
	let srcFiles = []
		.concat(['src/templates/**/*' + koTemplateExtension])
		.concat(buildResources.css)
		.concat(buildResources.js.libs)
		.concat(buildResources.js.app)
		;

	return gulp.src('./src/index.html')
		.pipe(inject(
			gulp.src(srcFiles, { read: false }), {
				transform: function (filepath) {
					var fileName = filepath.substring(filepath.lastIndexOf('/') + 1);
					if (filepath.slice(-koTemplateExtension.length) === koTemplateExtension) {
						filepath = gulpFolder + filepath;
						var templateId = fileName.substring(0, fileName.indexOf(koTemplateExtension));
						var fileContent = fs.readFileSync(filepath, "utf8");

						console.info('Injecting ko template with id: ' + templateId);

						return '<script type="text/html" id="' + templateId + '">' + fileContent + '</script>';
					}
					else if (filepath.slice(-4) === '.css') {
						console.info('Injecting css: ' + fileName);

						filepath = filepath.replace('/src/', '');
						return '<link rel="stylesheet" href="' + filepath + '" type="text/css"/>';
					}
					else if (filepath.slice(-3) === '.js') {
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
	return buildIndexHtml();
}

gulp.task('all-dev', function () {
	// wait for all files to build before bundling
	setTimeout(function () {
		buildDev();
	}, 200);

	return;
});

gulp.task('watch-dev', function () {
	gulp.watch(watchPaths, gulp.series('dev-clean', 'all-dev'));
});

/*********************************** PROD *******************************************/

gulp.task('prod-clean', function () {
	return del(['dist/prod/*']);
});

gulp.task('prod-copy-images', function () {
	return gulp.src(paths.images).pipe(gulp.dest('dist/prod/images'));
});

gulp.task('prod-concat-js', function () {

	return gulp.src([].concat(buildResources.js.libs).concat(buildResources.js.app))
		.pipe(concat('scripts.js'))
		.pipe(gulp.dest(prodDistDest));
});

gulp.task('prod-concat-css', function () {

	return gulp.src(buildResources.css)
		.pipe(concat('styles.css'))
		.pipe(gulp.dest(prodDistDest));
});

gulp.task('prod-inject-all', prodInjectAll);

function prodInjectAll() {

	gulp.src([].concat(buildResources.js.libs).concat(buildResources.js.app))
		.pipe(concat('scripts.js'))
		.pipe(gulp.dest(prodDistDest));

	var srcFiles = []
		.concat(['src/templates/**/*' + koTemplateExtension])
		.concat(['dist/prod/styles.css'])
		.concat(['dist/prod/scripts.js']);

	return gulp.src('./src/index.html')
		.pipe(inject(gulp.src(srcFiles, { read: false }), {
			transform: function (filepath) {
				var fileName = filepath.substring(filepath.lastIndexOf('/') + 1);
				if (filepath.slice(-koTemplateExtension.length) === koTemplateExtension) {
					filepath = gulpFolder + filepath;
					var templateId = fileName.substring(0, fileName.indexOf(koTemplateExtension));
					var fileContent = fs.readFileSync(filepath, "utf8");

					console.info('Injecting ko html: ' + templateId);

					return '<script type="text/html" id="' + templateId + '">' + fileContent + '</script>';
				}
				else if (filepath.slice(-3) === '.js') {
					console.info('Injecting js: ' + fileName);

					filepath = filepath.replace('/dist/prod/', '');
					return '<script src="' + filepath + '"></script >';
				}
				else if (filepath.slice(-4) === '.css') {
					console.info('Injecting css: ' + fileName);

					filepath = filepath.replace('/dist/prod/', '');
					return '<link rel="stylesheet" href="' + filepath + '" type="text/css"/>';
				}

				// Use the default transform as fallback:
				return inject.transform.apply(inject.transform, arguments);
			}
		}))
		.pipe(gulp.dest(prodDistDest));
}

gulp.task('all-prod', gulp.series('prod-copy-images', 'prod-concat-js', 'prod-concat-css', 'prod-inject-all'));

gulp.task('watch-prod', function () {
	gulp.watch(watchPaths, gulp.series('prod-clean', 'all-prod'));
});
