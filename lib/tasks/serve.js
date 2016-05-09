'use strict';

module.exports = function(gulp, $, config, _) {
	gulp.task('serve', function () {
        return server([
            config.paths.build.tmp.base,
            config.paths.base
        ]);
	});

    gulp.task('serve:dist', ['build'], function () {
        return server(config.paths.build.dist.base);
    });

    function server(filesToServe) {
        return gulp.src(filesToServe)
            .pipe($.plumber({
                errorHandler: $.errorHandler
            }))
            .pipe($.webserver({
                livereload: _.get(config, 'consts.webserver.livereload'),
                middleware: _.get(config, 'consts.webserver.middleware'),
                open: config.consts.webserver.open,
                port: _.get(config, 'consts.webserver.port'),
                proxies: _.get(config, 'consts.webserver.proxies')
            }));
    }
};
