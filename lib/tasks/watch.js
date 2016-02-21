'use strict';

module.exports = function (gulp, $, config, _) {
    gulp.task('watch', function () {
        gulp.watch(config.paths.app.styles, ['styles']);

        gulp.watch(config.paths.tests, [
            'lint:test',
            'test:watch'
        ]);

        gulp.watch('bower.json', ['deps']);

        gulp.watch(config.paths.app.scripts, [
            'lint:scripts',
            'test:watch',
            'deps'
        ]);
    });
};
