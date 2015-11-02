'use strict';

module.exports = function(gulp, $, config, _) {
    var sources = [
        config.paths.app.scripts,
        config.paths.test.unit,
        config.paths.test.api,
        config.paths.test.e2e
    ];

	gulp.task('lint', function () {
		return gulp.src(sources)
            .pipe($.plumber())
			.pipe($.filter('**/*.js'))
			.pipe($.eslint())
			.pipe($.eslint.format())
	});
};
