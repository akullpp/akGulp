'use strict';

module.exports = function(gulp, $, config, _) {
    var sources = _.union(
        config.paths.app.scripts,
        config.paths.test.unit,
        config.paths.test.api,
        config.paths.test.e2e
    );

    gulp.task('lint', ['lint:html', 'lint:css', 'lint:js']);

    gulp.task('lint:html', function () {
        return gulp.src(config.paths.app.htmls)
            .pipe($.htmlhint({
                'doctype-first': false
            }))
            .pipe($.htmlhint.reporter("htmlhint-stylish"))
    });

    gulp.task('lint:css', function () {
        return gulp.src(config.paths.app.styles)
            .pipe($.sassLint())
            .pipe($.sassLint.format());
    });

	gulp.task('lint:js', function () {
		return gulp.src(sources)
            .pipe($.plumber({
                errorHandler: $.errorHandler
            }))
			.pipe($.filter('**/*.js'))
			.pipe($.eslint())
			.pipe($.eslint.format())
	});
};
