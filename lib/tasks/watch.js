'use strict';

module.exports = function (gulp, $, config) {
    gulp.task('watch', function () {
        gulp.watch(config.paths.app.styles, ['styles']);
        gulp.watch(config.paths.app.images, ['images']);
        gulp.watch([
            config.paths.app.scripts,
            config.paths.test.unit,
            config.paths.test.api,
            config.paths.test.e2e
        ], ['lint', 'test:unit:watch']);
        gulp.watch([
            config.paths.app.mainHtml,
            $.path.join(config.paths.app.base, '**/*.js'),
            'bower.json'
        ], ['deps']);
    });
};
