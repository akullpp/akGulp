'use strict';

module.exports = function (gulp, $) {
    /**
     * Local development task.
     *
     * Runs sequentially:
     *
     * 1. {@link clean}
     * 2. {@link assets assets:temp}, {@link styles}
     * 3. {@link lint}, {@link inject}
     * 4. {@link serve}
     * 5. {@link watch}
     * 6. {@link test test:watch}
     *
     * @public
     * @namespace dev
     */
    gulp.task('dev', function () {
        $.runSequence(
            ['clean'],
            ['assets:temp', 'styles'],
            ['lint', 'inject'],
            ['serve'],
            ['watch'],
            ['test:watch']
        );
    });
};
