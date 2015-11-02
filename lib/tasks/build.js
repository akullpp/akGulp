'use strict';

module.exports = function(gulp, $, config) {
    gulp.task('build', function (done) {
        $.runSequence(
            ['clean'],
            ['test'],
            ['lint'],
            ['partials'],
            ['deps'],
            ['deps:partials'],
            ['compile', 'images', 'fonts'],
            done
        );
    });

    gulp.task('partials', function () {
        return gulp.src(config.paths.app.partials)
            .pipe($.minifyHtml({
                empty: true,
                spare: true,
                quotes: true,
                loose: true
            }))
            .pipe($.ngHtml2js({
                moduleName: config.moduleName,
                prefix: 'app/',
            }))
            .pipe($.concat('partials.min.js'))
            .pipe($.uglify())
            .pipe(gulp.dest(config.paths.build.tmp.base))
            .pipe($.size({
                title: 'partials'
            }));
    });

    gulp.task('compile', function () {
        var jsFilter = $.filter('**/*.js', {
            restore: true
        });
        var cssFilter = $.filter('**/*.css', {
            restore: true
        });
        var assets = $.useref.assets({
            searchPath: [
                config.paths.build.tmp.base,
                config.paths.base
            ]
        });

        return gulp.src(config.paths.build.tmp.mainHtml)
            .pipe(enableStrictDI())
            .pipe(assets)
            .pipe($.rev())
            .pipe(jsFilter)
            .pipe($.ngAnnotate({
                single_quotes: true
            }))
            .pipe($.uglify({
                preserveComments: $.uglifySaveLicense
            }))
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


    function enableStrictDI() {
        return $.replace(/ng\-app="[^"]*"/g, '$& ng-strict-di');
    }
};
