'use strict';

module.exports = function(gulp, $, config, _) {
    var dependencies = $.wiredep({
        devDependencies: true
    });

    var unitFiles = _.union(
        dependencies.js, [
        config.paths.test.unit,
        config.paths.app.scripts,
        config.paths.app.partials
    ]);

    var apiFiles = _.union(
        dependencies.js, [
        config.paths.test.api,
        config.paths.app.scripts
    ]);

    gulp.task('test', function (done) {
        $.runSequence(
            ['test:unit'],
            ['test:api'],
            ['test:e2e'],
            done);
    });

    gulp.task('test:unit:watch', function (done) {
        return runKarma(false, unitFiles, done);
    });

    gulp.task('test:unit', function (done) {
        return runKarma(true, unitFiles, done);
    });

    gulp.task('test:api', function (done) {
        return runKarma(true, apiFiles, done);
    });

    gulp.task('webdriver-update', $.protractor.webdriver_update);

    gulp.task('test:e2e', ['webdriver-update'], function () {
        return gulp.src(config.paths.test.e2e)
            .pipe($.protractor.protractor({
                args: [
                    '--browser', 'firefox',
                    '--framework', 'mocha',
                    '--seleniumServerJar', './node_modules/my-gulp/node_modules/protractor/selenium/selenium-server-standalone-2.47.1.jar'
                ],
            }));
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
              '**/*.html': ['ng-html2js']
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


