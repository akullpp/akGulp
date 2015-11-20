'use strict';

module.exports = function(gulp, $, config, _) {
    var dependencies = $.wiredep({
        devDependencies: true
    });

    var unitFiles = _.union(
        dependencies.js,
        config.paths.test.unit,
        config.paths.app.scripts,
        config.paths.app.partials
    );

    var apiFiles = _.union(
        dependencies.js,
        config.paths.test.api,
        config.paths.app.scripts
    );

    gulp.task('test', function (done) {
        $.runSequence(
            ['test:unit'],
            ['test:api'],
            ['test:e2e'],
            done);
    });

    gulp.task('test:unit', function (done) {
        if (config.args.su) {
            $.util.log('Skipping \'test:unit\'');
            return done();
        }
        return runKarma(true, unitFiles, done);
    });

    gulp.task('test:unit:watch', function (done) {
        return runKarma(false, unitFiles, done);
    });

    gulp.task('test:api', function (done) {
        if (config.args.sa) {
            $.util.log('Skipping \'test:api\'');
            return done();
        }
        return runKarma(true, apiFiles, done);
    });

    gulp.task('test:e2e', function () {
        if (config.args.se) {
            $.util.log('Skipping \'test:e2e\'');
            return done();
        }
        return gulp.start('run:e2e');
    });

    gulp.task('webdriver-update', $.protractor.webdriver_update);

    gulp.task('run:e2e', ['webdriver-update'], function () {
        return $.globAsync('./node_modules/protractor/selenium/*.jar')
            .then(function (seleniumServerJar) {
                return gulp.src(config.paths.test.e2e)
                    .pipe($.protractor.protractor({
                        args: [
                            '--browser', 'firefox',
                            '--framework', 'mocha',
                            '--seleniumServerJar', seleniumServerJar
                        ],
                    }));
            });
    });

    function runKarma(watch, files, done) {
        return new $.karma({
            files: files,
            singleRun: watch,
            proxyValidateSSL: false,
            proxies: {
                '/': config.consts.proxy.url
            },
            urlRoot: '/_karma_/',
            browsers: ['Firefox'],
            frameworks: ['mocha'],
            reporters: ['progress', 'junit'],
            preprocessors: {
              '**/*.html': ['ng-html2js'],
              '**/*.coffee': ['coffee']
            },
            ngHtml2JsPreprocessor: {
                stripPrefix: 'src/'
            },
            junitReporter: {
                outputFile: config.paths.build.test,
                useBrowserName: false
            }
        }, done).start();
    }
};



