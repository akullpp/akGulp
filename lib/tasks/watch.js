'use strict';

module.exports = function (gulp, $, config) {
    gulp.task('watch', function () {
        gulp.watch(config.paths.app.styles, ['styles']);

        gulp.watch(config.paths.app.scripts, ['watch:scripts']);

        gulp.watch(config.paths.tests, ['watch:tests']);

        gulp.watch([
            config.paths.app.mainHtml,
            'bower.json'
        ], ['deps']);


        gulp.task('watch:scripts', function (done) {
            $.runSequence(
               ['lint:scripts'],
               ['test:watch'],
               ['deps'],
               done
            );
        });

        gulp.task('watch:tests', function (done) {
            $.runSequence(
                ['lint:test'],
                ['test:watch'],
                done
            );
        })
    });
};
