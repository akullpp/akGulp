'use strict';

module.exports = function(gulp, $, config) {
	gulp.task('deps', ['styles'], function () {
		return gulp.src(config.paths.app.mainHtml)
            .pipe($.plumber({
                errorHandler: $.errorHandler
            }))
			.pipe($.wiredep.stream({
				exclude: 'jquery.js'
			}))
			.pipe($.inject(gulp.src(config.paths.app.scripts)
                .pipe($.plumber({
                    errorHandler: $.errorHandler
                }))
				.pipe($.angularFilesort()), {
					relative: true
				}))
            .pipe($.inject(gulp.src(config.paths.build.tmp.mainStyle), {
                ignorePath: config.paths.build.tmp.base,
                addRootSlash: false
            }))
			.pipe(gulp.dest(config.paths.build.tmp.base));
	});

    gulp.task('deps:partials', function () {
        return gulp.src(config.paths.build.tmp.mainHtml)
            .pipe($.inject(gulp.src(config.paths.build.tmp.mainPartials, {
                read: false
            }), {
                read: false,
                starttag: '<!-- inject:partials -->',
                addRootSlash: false,
                addPrefix: '..'
            }))
            .pipe(gulp.dest(config.paths.build.tmp.base));
    });
};
