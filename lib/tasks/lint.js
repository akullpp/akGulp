'use strict';

module.exports = function(gulp, $, config) {
    /**
     * Lints scripts and test files.
     *
     * Reports to stdout.
     *
     * Exits on errors if the `consts.productionFlag` if active.
     *
     * @public
     * @namespace lint
     */
    gulp.task('lint', ['lint:scripts', 'lint:tests']);

    /**
     * Lints scripts.
     *
     * Reports to stdout.
     *
     * Exits on errors if the `consts.productionFlag` if active.
     *
     * @public
     * @name lint:scripts
     * @memberof lint
     */
    gulp.task('lint:scripts', function () {
        return lint(true);
    });

    /**
     * Lints tests.
     *
     * Reports to stdout.
     *
     * Exits on errors if the `consts.productionFlag` if active.
     *
     * @public
     * @name lint:tests
     * @memberof lint
     */
    gulp.task('lint:tests', function () {
        return lint(false);
    });

    function lint(scripts) {
        return gulp.src(scripts ? config.paths.app.scripts : config.paths.tests)
            .pipe($.plumber({
                errorHandler: $.errorHandler
            }))
            // Filter all JavaScript files
            .pipe($.filter('**/*.js'))
            .pipe($.eslint(config.consts.eslint))
            // Use default formatter for output on stdout
            .pipe($.eslint.format(config.consts.eslintFormat))
            // Fail after error in production
            .pipe($.if(config.isProduction, $.eslint.failAfterError()));
    }
};
