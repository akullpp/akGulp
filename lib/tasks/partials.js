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
            // Minification of HTML
            .pipe($.htmlmin(config.consts.htmlmin))
            // Scriptification from HTML to JS
            .pipe($.ngHtml2js(_.extend(config.consts.ngHtml2js, {
                moduleName: config.moduleName,
                prefix: config.paths.app.base
            })))
            // Concatenation to a single JS file
            .pipe($.concat($.path.basename(config.paths.build.tmp.mainPartials)))
            // Minification of JS
            .pipe($.uglify(config.consts.uglify))
            .pipe(gulp.dest(config.paths.build.tmp.base))
            .pipe($.size({
                title: 'partials'
            }));
    });
};
