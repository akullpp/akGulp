'use strict';

module.exports = function(gulp, $, config) {
    /**
     * Preprocesses and autoprefixes the main style file and copies it to temp.
     *
     * The assumption is that the main style file contains all the required imports.
     *
     * ```
     * paths.app.mainStyle -> paths.build.tmp.styles
     * ```
     *
     * Used internally by {@link build}, {@link dev}, {@link watch}.
     *
     * @protected
     * @namespace styles
     */
	gulp.task('styles', function () {
		return gulp.src(config.paths.app.mainStyle)
            .pipe($.plumber({
                errorHandler: $.errorHandler
            }))
            // Preprocessing
			.pipe($.less(config.consts.less))
            // Autoprefixing
			.pipe($.autoprefixer(config.consts.autoprefixer))
			.pipe($.size({
				title: 'styles'
			}))
			.pipe(gulp.dest(config.paths.build.tmp.styles));
	});
};
