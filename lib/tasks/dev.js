'use strict';

module.exports = function(gulp, $) {
    /**
     * Local development task.
     *
     * Runs sequentially:
     *
     * 1. {@link clean}
     * 2. {@link styles}
     * 3. {@link inject}
     * 4. {@link watch}
     * 5. {@link serve}
     *
     * @public
     * @namespace dev
     */
    gulp.task('dev', function (done) {
        $.runSequence(
            ['clean'],
            ['styles'],
            ['inject'],
            ['watch'],
            ['serve'],
            done
        );
    });
};
