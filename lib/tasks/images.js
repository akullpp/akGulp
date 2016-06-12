'use strict';

module.exports = function(gulp, $, config) {
    /**
     * Copies the images to dist.
     *
     * Currently without compressions since the binaries would be downloaded.
     *
     * ```
     * paths.app.images -> paths.build.dist.images
     * ```
     *
     * Used internally by {@link build}.
     *
     * @protected
     * @namespace images
     */
    gulp.task('images', function () {
        return gulp.src(config.paths.app.images)
            .pipe(gulp.dest(config.paths.build.dist.images))
            .pipe($.size({
                title: 'images'
            }));
    });
};
