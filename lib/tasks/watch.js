'use strict';

module.exports = function (gulp, $, config) {
    /**
     * Watches styles, scripts, tests, the main HTML for changes.
     *
     * If there's a change in:
     *
     * * `paths.app.styles` the {@link styles} task is executed.
     * * `paths.app.scripts` the {@link lint lint:scripts}, {@link test test:run} tasks are executed. If the change is a new or removed or renamed file, the {@link inject} task is executed additionally.
     * * `paths.tests`, the {@link lint lint:tests} and {@link test test:run} task is run.
     * * `paths.app.mainHtml` the {@link inject} task is executed.
     * * `paths.app.assets` the {@link assets assets:temp} task is executed.
     *
     * Used internally by {@link dev}.
     *
     * @private
     * @namespace watch
     */
    gulp.task('watch', function () {
        // Styles
        gulp.watch(config.paths.app.styles, ['styles']);

        // Run tests, lint scripts. If new, removed or renamed file, then inject again.
        gulp.watch(config.paths.app.scripts, ['lint:scripts']);
        gulp.watch(config.paths.app.scripts, function (event) {
            if (event.type !== 'changed') {
                $.runSequence('inject');
            }
        });
        gulp.watch(config.paths.app.scripts, ['test:run']);

        // Run and lint tests.
        gulp.watch(config.paths.tests, ['test:run']);
        gulp.watch(config.paths.tests, ['lint:tests']);

        // Inject if index.html changes.
        gulp.watch(config.paths.app.mainHtml, ['inject']);

        // Copies assets to the temporary folder.
        gulp.watch(config.paths.app.assets, ['assets:temp']);
    });
};
