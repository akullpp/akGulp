'use strict';

module.exports = function(gulp, $, config, _) {
    var sources = _.union(
        config.paths.app.scripts,
        config.paths.test.unit,
        config.paths.test.e2e
    );

    gulp.task('lint', function () {
        return gulp.src(sources)
            .pipe($.plumber({
                errorHandler: $.errorHandler
            }))
            .pipe($.filter('**/*.js'))
            .pipe($.eslint())
            .pipe($.eslint.format());
    });
};
