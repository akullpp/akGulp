'use strict';

module.exports = function(gulp, $, config) {
    var pjson = require($.path.join(process.cwd(), 'package.json'));

    gulp.task('build', function (done) {
        $.runSequence(
            ['clean'],
            ['test:build'],
            // ['lint'],
            ['partials', 'styles'],
            ['deps'],
            ['deps:partials'],
            ['compile', 'images', 'fonts'],
            ['version'],
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
                prefix: config.consts.partials.prefix,
            }))
            .pipe($.concat(config.consts.partials.out))
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

    gulp.task('version', function (done) {
        $.fs.writeFile($.path.join(config.paths.build.dist.base,  'VERSION'), pjson.version, done);
    });

    function enableStrictDI() {
        return $.replace(/ng\-app="[^"]*"/g, '$& ng-strict-di');
    }

    function writeVersion() {
        return $.replace(/VERSION/, pjson.version);
    }
};
