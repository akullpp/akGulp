'use strict';

module.exports = function(gulp, $, config) {
    gulp.task('images', function () {
        return gulp.src(config.paths.app.images)
            .pipe($.plumber({
                errorHandler: $.errorHandler
            }))
            .pipe($.imagemin())
            .pipe(gulp.dest($.path.join(config.paths.build.dist.images)))
            .pipe($.size({
                title: 'images'
            }));
    });
};
