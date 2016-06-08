'use strict';

module.exports = function(gulp, $, config, _) {
    /**
     * Minifies, scriptifies, concatenates, uglifies all HTML files and copies them to temp.
     *
     * ```
     * paths.app.partials -> paths.build.tmp.base
     * ```
     *
     * Used internally by {@link build}.
     *
     * @protected
     * @namespace partials
     */
    gulp.task('partials', function () {
        return gulp.src(config.paths.app.partials)
            .pipe($.minifyHtml(config.consts.minifyHtml))
            .pipe($.ngHtml2js(_.extend(config.consts.ngHtml2js, {
                moduleName: config.moduleName,
                prefix: config.paths.app.root
            })))
            .pipe($.concat($.path.basename(config.paths.build.tmp.mainPartials)))
            .pipe($.uglify(config.consts.uglify))
            .pipe(gulp.dest(config.paths.build.tmp.base))
            .pipe($.size({
                title: 'partials'
            }));
    });
};
