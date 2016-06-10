'use strict';

module.exports = function(gulp, $, config) {
    var pjson = require($.path.join(process.cwd(), 'package.json'));

    /**
     * Builds the application.
     *
     * Runs sequentially:
     *
     * 1. {@link clean}
     * 2. {@link tests tests:build}
     * 3. {@link lint}
     * 4. {@link partials} and {@link styles}
     * 5. {@link inject}
     * 6. {@link inject inject:partials}
     * 7. {@link assets}
     * 8. {@link build build:compile}, {@link images}, {@link fonts}
     * 9. {@link version}
     *
     * @public
     * @namespace build
     */
    gulp.task('build', function (done) {
        $.runSequence(
            ['clean'],
            ['tests:build'],
            // ['lint'],
            ['partials', 'styles'],
            ['inject'],
            ['inject:partials'],
            ['assets'],
            ['build:compile'],
            ['images', 'fonts', 'version'],
            done
        );
    });

    /**
     * Compiles the application.
     *
     * Used internally by {@link build}.
     *
     * @private
     * @name build:compile
     * @memberof build
     */
    gulp.task('build:compile', function () {
        var jsFilter = $.filter('**/*.js', {
            restore: true
        });
        var cssFilter = $.filter('**/*.css', {
            restore: true
        });
        var assets = $.useref.assets({
            searchPath: [
                config.paths.build.tmp.base,
                config.paths.base,
                'node_modules'
            ]
        });

        return gulp.src(config.paths.build.tmp.mainHtml)
            .pipe(enableStrictDI())
            .pipe(writeVersion())
            .pipe(assets)
            .pipe($.rev())
            .pipe(jsFilter)
            .pipe($.ngAnnotate({
                single_quotes: true
            }))
            .pipe($.sourcemaps.init())
            .pipe($.uglify({
                preserveComments: $.uglifySaveLicense
            }))
            .pipe($.sourcemaps.write('.'))
            .pipe(jsFilter.restore)
            .pipe(cssFilter)
            .pipe($.csso())
            .pipe(cssFilter.restore)
            .pipe(assets.restore())
            .pipe($.useref())
            .pipe($.revReplace())
            .pipe(gulp.dest(config.paths.build.dist.base))
            .pipe($.size({
                title: 'build'
            }));
    });

    // Adds the ngStrictDi to the same element as the ngApp is attached to.
    function enableStrictDI() {
        return $.replace(/ng\-app="[^"]*"/g, '$& ng-strict-di');
    }

    // Substitutes the string VERSION with the package.json's version once.
    function writeVersion() {
        return $.replace(/VERSION/, pjson.version);
    }
};
