'use strict';

module.exports = function(gulp, $, config, _) {
	var proxyTarget = _.get(config, 'proxy.url', config.consts.proxy.url);
	var proxyPrefixes = _.get(config, 'proxy.prefixes', config.consts.proxy.prefixes);
	var proxy = $.httpProxy.createProxyServer({
		target: proxyTarget
	});

    function isProxiedPrefix(url) {
        return _.some(proxyPrefixes, function (expression) {
            return expression.test(url);
        });
    }

	function proxyMiddleware(req, res, next) {
		if (isProxiedPrefix(req.url)) {
			proxy.web(req, res, function (err) {
                next(err);
            });
		} else {
			next();
		}
	}

    function server(filesToWatch, filesToServe) {
        return $.browserSync({
            files: filesToWatch,
            notify: false,
            server: {
                baseDir: filesToServe,
                middleware: proxyMiddleware
            }
        });
    }

	gulp.task('serve', function () {
        return server([
            config.paths.app.base,
            config.paths.build.tmp.base,
        ], _.union([
            config.paths.build.tmp.base,
            config.paths.base
        ], config.paths.app.base));
	});

    gulp.task('serve:dist', ['build'], function () {
        return server(config.paths.build.dist.base, config.paths.build.dist.base);
    });
};
