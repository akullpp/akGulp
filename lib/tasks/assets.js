'use strict';

module.exports = function(gulp, $, config, _) {
    /**
     * Copies unhandled assets with preserved paths to dist.
     *
     * Unhandled assets can be configered via `paths.unhandledAssets` and should be negative globs. The unhandled assets are all files with file extensions in `paths.app.base`.
     *
     * **The files should be handled as soon as possible.**
     *
     * ```
     * config.paths.app.base/**&#47;* -> config.paths.build.dist.base/config.paths.app.base
     * ```
     *
     * @private
     * @namespace assets
     */
    gulp.task('assets', function () {
        return gulp.src($.path.join(config.paths.app.base, '**/*'), {read:false})
            // Filter everything that has a file ending combined with the negative globs in the array
            .pipe($.filter(_.union(['**/*.*'], config.paths.unhandledAssets)))
            .pipe(gulp.dest($.path.join(config.paths.build.dist.base, config.paths.app.base)))
            .pipe($.size({
                showFiles: true,
                title: 'asset: '
            }));
    });
};
