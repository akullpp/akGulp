'use strict';

module.exports = function(gulp, $, config) {
    /**
     * Deletes the `paths.build.base` folder.
     *
     * @public
     * @namespace clean
     */
    gulp.task('clean', function () {
        return $.del(config.paths.build.base);
    });
};
