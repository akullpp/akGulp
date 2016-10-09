'use strict';

module.exports = function (gulp, $, config, _) {
    /**
     * Injects scripts, styles and partials into main HTML.
     *
     * Runs sequentially:
     *
     * 1. inject:scripts
     * 2. inject:styles
     * 3. inject:partials
     *
     * Used internally by {@link build} and {@link dev}.
     *
     * @protected
     * @namespace inject
     */
    gulp.task('inject', function (done) {
        $.runSequence(
            ['inject:scripts'],
            ['inject:styles'],
            done
        );
    });

    /**
     * Injects the automatically sorted scripts into the main `index.html` and copies it to temp.
     *
     * Angular modules are automatically sorted for the correct order.
     *
     * Used internally by {@link build}, {@link dev}, {@link inject} and {@link watch}.
     *
     * @private
     * @name inject:scripts
     * @memberof inject
     */
    gulp.task('inject:scripts', function () {
        return gulp.src(config.paths.app.mainHtml)
            // Injects into <!-- inject:js -->
            .pipe($.inject(gulp.src(config.paths.app.scripts)
                .pipe($.plumber({
                    errorHandler: $.errorHandler
                }))
                // Automatic sorting of Angular modules.
                .pipe($.angularFilesort(config.consts.angularFilesort)), config.consts.injectScripts))
            .pipe(gulp.dest(config.paths.build.tmp.base));
    });

    /**
     * Injects the main style file into the temporary `index.html`.
     *
     * Used internally by {@link build}, {@link dev}, {@link inject} and {@link watch}.
     *
     * @private
     * @name inject:styles
     * @memberof inject
     */
    gulp.task('inject:styles', function () {
        return gulp.src(config.paths.build.tmp.mainHtml)
            // Injects into <!-- inject:css -->
            .pipe($.inject(gulp.src(config.paths.build.tmp.mainStyle, {
                read: false
            }), _.extend(config.consts.injectStyles, {
                ignorePath: config.paths.build.tmp.base
            })))
            .pipe(gulp.dest(config.paths.build.tmp.base));
    });

    /**
     * Injects the partial file created by {@link partials} into the temporary `index.html`.
     *
     * Requires `paths.build.tmp.mainHtml` and `paths.build.tmp.mainPartials` to exist.
     *
     * Used internally by {@link build}.
     *
     * @private
     * @name partials:inject
     * @memberof partials
     */
    gulp.task('inject:partials', function () {
        return gulp.src(config.paths.build.tmp.mainHtml)
            // Injects into <!-- inject:partials -->
            .pipe($.inject(gulp.src(config.paths.build.tmp.mainPartials, {
                read: false
            }), config.consts.injectPartials))
            .pipe(gulp.dest(config.paths.build.tmp.base));
    });
};
