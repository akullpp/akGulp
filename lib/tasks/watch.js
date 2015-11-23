'use strict';

module.exports = function (gulp, $, config, _) {
    gulp.task('watch', function () {
        gulp.watch(config.paths.app.styles, ['lint:css', 'styles']);

        gulp.watch(config.paths.app.images, ['images']);

        gulp.watch(_.union(
            config.paths.test.unit,
            config.paths.test.api,
            config.paths.test.e2e
        ), ['test:unit:watch']);

        gulp.watch('bower.json', ['deps']);

        gulp.watch(config.paths.app.scripts, function (e) {
            if (e.type === 'added' || e.type === 'deleted') {
                gulp.start('deps');
            } else {
                gulp.start('lint:js');
                gulp.start('test:unit:watch');
            }
        });
    });
};
