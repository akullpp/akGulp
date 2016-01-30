'use strict';

module.exports = function(gulp, $, config, _) {
    gulp.task('test', function (done) {
        var tasks = [];

        if (config.args.su) {
            $.util.log('Skipping \'test:unit\'');
        } else {
            tasks.push(['test:unit']);
        }
        if (config.args.se) {
            $.util.log('Skipping \'test:e2e\'');
        } else {
            tasks.push(['test:e2e']);
        }

        tasks.push(done);
        $.runSequence.apply(null, tasks);
    });

    gulp.task('test:unit', function (done) {
        return runKarma(true, done);
    });

    gulp.task('test:unit:watch', function (done) {
        return runKarma(false, done);
    });

    gulp.task('test:e2e', function () {
        return gulp.src(config.paths.test.e2e)
            .pipe($.angularProtractor({
                configFile: config.paths.test.protractor,
            }));
    });

    function runKarma(watch, done) {
        var dependencies = $.wiredep({
            devDependencies: true
        });

        var options = {
            files: _.union(
                config.consts.karma.dependencies || dependencies,
                config.paths.test.unit,
                config.paths.app.scripts,
                config.paths.app.partials
            ),
            singleRun: watch,
            proxyValidateSSL: false,
            proxies: {
                '/': config.consts.proxy.url
            },
            urlRoot: '/_karma_/',
            browsers: config.consts.karma.browsers,
            frameworks: ['mocha'],
            reporters: ['progress', 'junit', 'coverage'],
            preprocessors: {
              '**/*.html': ['ng-html2js'],
            },
            ngHtml2JsPreprocessor: {
                stripPrefix: config.paths.base
            },
            junitReporter: {
                outputFile: config.paths.build.reports.test,
                useBrowserName: false
            },
            coverageReporter: {
                type: 'lcov',
                dir: $.path.join(config.paths.build.reports.coverage),
                subdir: '.'
            }
        };

        options.preprocessors[config.paths.app.scripts] = ['coverage'];

        return new $.karma(options, done).start();
    }
};
