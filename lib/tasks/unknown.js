'use strict';

module.exports = function(gulp, $, config, _) {
    /**
     * Copies unknown files in the source files with preserved paths to dist.
     *
     * Known files can be configered via `paths.unknown` and should be negative globs. The unhandled files are all files with file extensions in `paths.app.base`.
     *
     * **The files should be processed by a task as soon as possible.**
     *
     * ```
     * config.paths.app.base/**&#47;* -> config.paths.build.dist.base/config.paths.app.base
     * ```
     *
     * @private
     * @namespace unknown
     */
    gulp.task('unknown', function () {
        return gulp.src($.path.join(config.paths.app.base, '**/*'), {read:false})
            // Filter everything that has a file ending combined with the negative globs in the array
            .pipe($.filter(_.union(['**/*.*'], config.paths.unknown)))
            .pipe(gulp.dest($.path.join(config.paths.build.dist.base, config.paths.app.base)))
            .pipe($.size({
                showFiles: true,
                title: 'unknown files: '
            }));
    });
};
