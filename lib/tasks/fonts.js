'use strict';

module.exports = function(gulp, $, config, _) {
	gulp.task('fonts', function () {
		return gulp.src(config.paths.app.fonts)
			.pipe($.filter('**/*.{eot,svg,ttf,woff,woff2,otf}'))
            .pipe($.flatten())
			.pipe(gulp.dest(config.paths.build.dist.fonts))
			.pipe($.size({
				title: 'fonts'
			}));
	});
};
