'use strict';

module.exports = function(gulp, $, config) {
    /**
     * Copies the fonts to dist.
     *
     * Folders are automatically flattened.
     *
     * ```
     * paths.app.fonts -> paths.build.dist.fonts
     * ```
     *
     * Used internally by {@link build}.
     *
     * @protected
     * @namespace fonts
     */
    gulp.task('fonts', function () {
        return gulp.src(config.paths.app.fonts, {read:false})
            .pipe($.flatten())
            .pipe(gulp.dest(config.paths.build.dist.fonts))
            .pipe($.size({
                title: 'fonts'
            }));
    });
};
