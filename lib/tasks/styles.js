'use strict';

module.exports = function(gulp, $, config) {
	gulp.task('styles', function () {
		return gulp.src(config.paths.app.mainStyle)
            .pipe($.plumber({
                errorHandler: $.errorHandler
            }))
			.pipe($.less())
			.pipe($.autoprefixer(config.consts.autoprefixer))
			.pipe($.size({
				title: 'styles'
			}))
			.pipe(gulp.dest(config.paths.build.tmp.styles));
	});
};
