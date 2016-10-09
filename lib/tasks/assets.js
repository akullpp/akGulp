'use strict';

/**
 * Copies static assets to a folder.
 *
 * @private
 * @namespace assets
 */
module.exports = function(gulp, $, config) {
    /**
     * Copies static assets to the temporary folder.
     *
     * @private
     * @name assets:temp
     * @memberof assets
     */
    gulp.task('assets:temp', function () {
        return gulp.src(config.paths.app.assets)
            .pipe(gulp.dest(config.paths.build.tmp.assets))
            .pipe($.size({
                title: 'static assets: '
            }));
    });

    /**
     * Copies static assets to the distribution folder.
     *
     * @private
     * @name assets:dist
     * @memberof assets
     */
    gulp.task('assets:dist', function () {
        return gulp.src(config.paths.app.assets)
            .pipe(gulp.dest(config.paths.build.dist.assets))
            .pipe($.size({
                title: 'static assets: '
            }));
    });
};
