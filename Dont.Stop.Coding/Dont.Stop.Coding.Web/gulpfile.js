/// <binding AfterBuild='all-dev, all-prod' ProjectOpened='watch-dev, watch-prod' />

/*********************************** COMMON *******************************************/

var gulp = require('gulp');
var fs = require('fs');
var concat = require('gulp-concat');
var del = require('del');
var inject = require('gulp-inject');
var uglify = require('gulp-uglify-es').default;
var rename = require("gulp-rename");
var sourcemaps = require('gulp-sourcemaps');
var csso = require('gulp-csso');
var hash = require('gulp-hash-filename');
var newer = require('gulp-newer');
var browserSync = require('browser-sync').create();
var cssHash = null;
var jsHash = null;
var hashFormula = { "format": "{name}-{hash}-{ext}" };

var gulpFolder = __dirname;
var prodDistDest = 'dist';
var devDistDest = '../Dont.Stop.Coding.WebApi/wwwroot';
var koTemplateExtension = '.ko.html';
var buildResourcesFile = 'build-resources.json';
var buildResources = JSON.parse(fs.readFileSync(gulpFolder + '\\' + buildResourcesFile, "utf8"));

var paths = {
	libs: buildResources.js.libs.map(function (lib) { return "src/lib/" + lib.substring(lib.lastIndexOf('/') + 1) }),
	transpiled: ['src/scripts/**/*.js'],
	typescript: ['src/scripts/**/*.ts'],
	pages: ['src/**/*.html'],
	styles: ['src/styles/*.css'],
	images: [
		'src/images/**/*.png',
		'src/images/**/*.gif',
		'src/images/**/*.jpg',
		'src/images/**/*.jpeg'
	],
	templates: ['src/templates/**/*.t.html'],
	buildResources: ['buildResourcesFile']
};

var watchPaths = []
	.concat(paths.transpiled)
	.concat(paths.typescript)
	.concat(paths.libs)
	.concat(paths.pages)
	.concat(paths.styles)
	.concat(paths.images)
	.concat(paths.templates)
	.concat(paths.buildResources);

function extractHash(baseFileName) {
	return baseFileName.substring(baseFileName.indexOf('-') + 1, baseFileName.lastIndexOf('-'));
}

function createInjectedHashedFikeLink(filename, hash) {
	return cssHash ? (filename + "?" + hash) : filename;
}

function injectionTransformation(filepath, relativePath) {
	var fileName = filepath.substring(filepath.lastIndexOf('/') + 1);
	if (filepath.slice(-koTemplateExtension.length) === koTemplateExtension)
	{
		filepath = gulpFolder + filepath;
		var templateId = fileName.substring(0, fileName.indexOf(koTemplateExtension));
		var fileContent = fs.readFileSync(filepath, "utf8");

		console.info('Injecting ko html: ' + templateId);

		return '<script type="text/html" id="' + templateId + '">' + fileContent + '</script>';
	}
	else if (filepath.slice(-4) === '.css')
	{
		console.info('Injecting css: ' + fileName);

		filepath = filepath.replace(relativePath, '');
		var cssLink = createInjectedHashedFikeLink(filepath, cssHash);
		return '<link rel="stylesheet" href="' + cssLink + '" type="text/css"/>';
	}
	else if (filepath.slice(-3) === '.js')
	{
		console.info('Injecting js: ' + fileName);

		filepath = filepath.replace(relativePath, '');
		var jsLink = createInjectedHashedFikeLink(filepath, cssHash);
		return '<script src="' + jsLink + '"></script >';
	}

	// Use the default transform as fallback:
	return inject.transform.apply(inject.transform, arguments);
}

/*********************************** DEV *******************************************/

gulp.task('dev-clean', function () {
	return del([devDistDest + '/*'], { force: true });
});

gulp.task('dev-copy-all', function () {
	var scriptsDest = devDistDest + '/scripts';
	var result = gulp.src(paths.typescript).pipe(newer(scriptsDest)).pipe(gulp.dest(scriptsDest));
	result && gulp.src(paths.transpiled).pipe(newer(scriptsDest)).pipe(gulp.dest(scriptsDest));

	var stylesDest = devDistDest + '/styles';
	result && gulp.src(paths.styles).pipe(newer(stylesDest)).pipe(gulp.dest(stylesDest));

	var imagesDest = devDistDest + '/images';
	result && gulp.src(paths.images).pipe(newer(imagesDest)).pipe(gulp.dest(imagesDest));

	var libsDest = devDistDest + '/lib';
	return result && gulp.src(buildResources.js.libs).pipe(newer(libsDest)).pipe(gulp.dest(libsDest));
});

gulp.task('dev-inject-all', function () {
	var srcFiles = []
		.concat(['src/templates/**/*' + koTemplateExtension])
		.concat(buildResources.css)
		.concat(paths.libs)
		.concat(buildResources.js.app);

	return gulp.src('./src/index.html')
		.pipe(inject(gulp.src(srcFiles, { read: false }), {
			transform: function (filepath) {
				return injectionTransformation(filepath, '/src/');
			}
		}))
		.pipe(gulp.dest(devDistDest + ''))
		.pipe(browserSync.stream());
});

gulp.task('all-dev', gulp.series('dev-copy-all', 'dev-inject-all'));

gulp.task('watch-dev', function () {
	//browserSync.init({
	//	server: {
	//		 baseDir: devDistDest
	//	},
	//	open: false,
	//	startPath: "/index.html"
	//});

	gulp.watch(watchPaths, gulp.series('all-dev'))
	//	.on('change', browserSync.reload)
	;
});

/*********************************** PROD *******************************************/

gulp.task('prod-clean', function () {
	return del([prodDistDest + '/*']);
});

gulp.task('prod-copy-images', function () {
	return gulp.src(paths.images).pipe(gulp.dest(prodDistDest + '/images'));
});

gulp.task('prod-concat-minify-js', function () {
	return gulp.src([].concat(buildResources.js.libs).concat(buildResources.js.app))
		.pipe(concat('scripts.js'))
		.pipe(uglify())
		.pipe(hash(hashFormula))
		.pipe(rename(function (path) { jsHash = extractHash(path.basename); }))
		.pipe(rename('scripts.min.js'))
		.pipe(gulp.dest(prodDistDest));
});

gulp.task('prod-concat-minify-css', function () {
	return gulp.src(buildResources.css)
		.pipe(concat('styles.css'))
		.pipe(csso())
		.pipe(hash(hashFormula))
		.pipe(rename(function (path) { cssHash = extractHash(path.basename); }))
		.pipe(rename('styles.min.css'))
		.pipe(gulp.dest(prodDistDest));
});

gulp.task('prod-inject-all', function () {

	var srcFiles = []
		.concat(['src/templates/**/*' + koTemplateExtension])
		.concat([prodDistDest + '/*.css'])
		.concat([prodDistDest + '/*.js']);

	return gulp.src('./src/index.html')
		.pipe(inject(gulp.src(srcFiles, { read: false }), {
			transform: function (filepath) {
				return injectionTransformation(filepath, '/' + prodDistDest + '/');
			}
		}))
		.pipe(gulp.dest(prodDistDest));
});

gulp.task('all-prod', gulp.series('prod-clean', 'prod-copy-images', 'prod-concat-minify-js', 'prod-concat-minify-css', 'prod-inject-all'));

gulp.task('watch-prod', function () {
	gulp.watch(watchPaths, gulp.series('all-prod'));
});
