'use strict';

module.exports = function(gulp, $, config, _) {
    /**
     * Copies unhandled assets with preserved paths to dist.
     *
     * Unhandled assets can be configered via `paths.unhandledAssets`. The unhandled assets are all files with file extensions in `paths.app.root`.
     *
     * **The files should be handled as soon as possible.**
     *
     * ```
     * config.paths.app.root/**&#47;* -> config.paths.build.dist.base/config.paths.app.root
     * ```
     *
     * @private
     * @namespace assets
     */
    gulp.task('assets', function () {
        return gulp.src($.path.join(config.paths.app.root, '**/*'), {read:false})
            .pipe($.filter(_.union(['**/*.*'], config.paths.unhandledAssets)))
            .pipe(gulp.dest($.path.join(config.paths.build.dist.base, config.paths.app.root)))
            .pipe($.size({
                showFiles: true,
                title: 'asset: '
            }));
    });
};
