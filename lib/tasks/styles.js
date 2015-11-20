'use strict';

module.exports = function(gulp, $, config) {

	gulp.task('styles', function () {
		return gulp.src(config.paths.app.styles)
            .pipe($.plumber({
                errorHandler: $.errorHandler
            }))
			.pipe($.sass())
			.pipe($.uncss({
				html: config.paths.app.htmls
			}))
			.pipe($.autoprefixer(config.consts.autoprefixer))
			.pipe($.size({
				title: 'styles'
			}))
			.pipe(gulp.dest(config.paths.build.tmp.styles))
	});
};
