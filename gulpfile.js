var gulp           = require('gulp');
var browserSync    = require('browser-sync').create();
var sass           = require('gulp-sass');
var sourcemaps     = require('gulp-sourcemaps');
var spritesmith    = require('gulp.spritesmith');
var buffer         = require('vinyl-buffer');
var csso           = require('gulp-csso');
var imagemin       = require('gulp-imagemin');
var merge          = require('merge-stream');
var cleanCSS       = require('gulp-clean-css');
var injectPartials = require('gulp-inject-partials');
var gulpCopy       = require('gulp-copy');
var del            = require('del');
var vfs            = require('vinyl-fs');
var svgSprite      = require('gulp-svg-sprite');
var autoprefixer   = require('gulp-autoprefixer');

// Static Server + watching scss/html files
gulp.task('serve', ['sass-dev', 'sprite', 'sprite:svg'], function() {
	// Create symlink for css, js, img, images, lib folders
	vfs.src(['css','js','img','images','lib', 'fonts'], {followSymlinks: false})
		//  in case you re using windows
		//  delete it and install linux or
		//  replace next row with       .pipe(vfs.symlink('./dist'));
		.pipe(vfs.symlink('./dist', {relativeSymlinks: true}));


	browserSync.init({
		server: "dist/"
	});

	gulp.watch("scss/**/**", ['bs-reload']);
	gulp.watch("img/icons/*", ['bs-reload']);
	gulp.watch("*.html", ['bs-reload']);
	gulp.watch("*.tpl", ['bs-reload']);
	gulp.watch("js/**/**", ['bs-reload']);
});

// Static Server + watching scss files
gulp.task('serve:backend', ['sass-dev', 'sprite', 'sprite:svg'], function() {

    gulp.watch("scss/**/**", ['sass-dev']);
    gulp.watch("img/icons/*", ['sass-dev']);
    gulp.watch("js/**/**", ['sass-dev']);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass-dev', function() {
	// Make sass with sourcemaps
	return gulp.src("scss/main.scss")
		.pipe(sourcemaps.init())
		.pipe(sass({
			errLogToConsole: true
		}).on('error', sass.logError))
		.pipe(autoprefixer({
			cascade: 'false',
			browsers: ['last 100 version'],
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest("css"));
});
gulp.task('sass', function() {
	// Make sass without sourcemaps
	return gulp.src("scss/main.scss")
		.pipe(sass({
			style: 'compressed'
		}))
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(gulp.dest("css"));
});

// Generate spritesheet for icons
gulp.task('sprite', function () {
	// Generate our spritesheet
	var spriteData = gulp.src('img/icons/*.png').pipe(spritesmith({
		imgName: '../img/sprite.png',
		cssName: 'sprite.css'
	}));

	// Pipe image stream through image optimizer and onto disk
	var imgStream = spriteData.img
	// DEV: We must buffer our stream into a Buffer for `imagemin`
		.pipe(buffer())
		.pipe(imagemin())
		.pipe(gulp.dest('img/'));

	// Pipe CSS stream through CSS optimizer and onto disk
	var cssStream = spriteData.css
		.pipe(csso())
		.pipe(gulp.dest('css'));

	// Return a merged stream to handle both `end` events
	return merge(imgStream, cssStream);
});

/*SVG*/
gulp.task('sprite:svg', function() {
    gulp.src('img/svg/**/*.svg')
        .pipe(svgSprite({
			mode: {
				view: {
					bust: false
				},
				symbol: true
			}
    	}))
        .pipe(gulp.dest('img/svg-sprite/'));
});

gulp.task('dist', ['sprite', 'sass-dev'], function() {
	return gulp.src('*.html')
		.pipe(injectPartials())
		.pipe(gulp.dest('dist/'));
});

// Reload all Browsers
gulp.task('bs-reload', ['dist'], function () {
    browserSync.reload();
});

gulp.task('default', ['dist', 'serve']);
gulp.task('pro', ['sass', 'sprite']);
gulp.task('backend', ['serve:backend']);
