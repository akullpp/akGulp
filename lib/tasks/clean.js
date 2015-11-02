'use strict';

module.exports = function(gulp, $, config) {
	gulp.task('clean', function () {
		return $.del(config.paths.build.base);
	});
};
