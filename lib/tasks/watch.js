'use strict';

module.exports = function (gulp, $, config) {
    /**
     * Watches styles, scripts, tests, the main HTML and bower file for changes.
     *
     * Respectively, see:
     *
     * * {@link styles} for `paths.app.styles`
     * * {@link watch watch:scripts} for `paths.app.scripts`
     * * {@link watch watch:tests} for `paths.tests`
     *
     * If there is a change in the `paths.app.mainHtml` detected the {@link deps} task is executed.
     *
     * Used internally by {@link dev}.
     *
     * @private
     * @namespace watch
     */
    gulp.task('watch', function () {
        gulp.watch(config.paths.app.styles, ['styles']);

        gulp.watch(config.paths.app.scripts, ['watch:scripts']);

        gulp.watch(config.paths.tests, ['watch:tests']);

        gulp.watch(config.paths.app.mainHtml, ['inject']);
    });

    /**
     * Sequential task list for `paths.app.scripts` changes.
     *
     * 1. {@link lint lint:scripts}
     * 2. {@link inject:scripts}
     * 3. {@link tests tests:watch}
     *
     * Used internally by {@link watch}.
     *
     * @private
     * @name watch:scripts
     * @memberof watch
     */
    gulp.task('watch:scripts', function (done) {
        $.runSequence(
           ['lint:scripts'],
           ['inject:scripts'],
           ['tests:watch'],
           done
        );
    });

    /**
     * Sequential task list for `paths.app.tests` changes.
     *
     * 1. {@link lint lint:tests}
     * 3. {@link tests tests:watch}
     *
     * Used internally by {@link watch}.
     *
     * @private
     * @name watch:tests
     * @memberof watch
     */
    gulp.task('watch:tests', function (done) {
        $.runSequence(
            ['lint:tests'],
            ['tests:watch'],
            done
        );
    });
};
