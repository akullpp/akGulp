'use strict';

module.exports = function(gulp, $, config) {

	gulp.task('styles', function () {
		return gulp.src(config.paths.app.styles)
            .pipe($.plumber())
			.pipe($.changed(config.paths.build.tmp.styles, {
				extension: '.scss'
			}))
			.pipe($.sass())
			.pipe($.uncss({
				html: config.paths.app.htmls
			}))
			.pipe($.autoprefixer({
				browsers: ['last 2 version']
			}))
			.pipe($.size({
				title: 'styles'
			}))
			.pipe(gulp.dest(config.paths.build.tmp.styles))
	});
};
