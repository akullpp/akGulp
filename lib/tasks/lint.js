'use strict';

module.exports = function(gulp, $, config, _) {
    gulp.task('lint', ['lint:scripts', 'lint:test']);

    gulp.task('lint:scripts', function () {
        return gulp.src(config.paths.app.scripts)
            .pipe($.plumber({
                errorHandler: $.errorHandler
            }))
            .pipe($.filter('**/*.js'))
            .pipe($.eslint())
            .pipe($.eslint.format());
    });

    gulp.task('lint:test', function () {
        return gulp.src(config.paths.test.unit)
            .pipe($.plumber({
                errorHandler: $.errorHandler
            }))
            .pipe($.filter('**/*.js'))
            .pipe($.eslint())
            .pipe($.eslint.format());
    });
};
