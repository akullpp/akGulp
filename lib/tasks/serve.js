'use strict';

module.exports = function(gulp, $, config) {
    /**
     * Static file server for development.
     *
     * Serves with priority from:
     *
     * 1. `paths.build.tmp.base`
     * 2. `paths.base`
     *
     * Therefore the `index.html` located in the temporary folder precedes the same file in the base folder.
     *
     * @public
     * @namespace serve
     */
    gulp.task('serve', function () {
        return server([
            config.paths.build.tmp.base,
            config.paths.base,
            'node_modules'
        ]);
	});

    /**
     * Static file server that serves the `paths.build.dist.base` folder after executing the {@link build} task.
     *
     * @public
     * @name serve:dist
     * @memberof serve
     */
    gulp.task('serve:dist', ['build'], function () {
        return server(config.paths.build.dist.base);
    });

    function server(filesToServe) {
        return gulp.src(filesToServe, {read:false})
            .pipe($.plumber({
                errorHandler: $.errorHandler
            }))
            .pipe($.webserver(config.consts.webserver));
    }
};
