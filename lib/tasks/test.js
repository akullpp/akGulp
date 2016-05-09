'use strict';

module.exports = function(gulp, $, config, _) {
    gulp.task('test', function (done) {
        return runKarma(true, done);
    });

    gulp.task('test:watch', function (done) {
        return runKarma(false, done);
    });

    gulp.task('test:build', function (done) {
        if (config.args.st) {
            $.util.log('Skipping \'test:build\'');
            done();
        } else {
            return runKarma(true, done, true);
        }
    });

    function runKarma(once, done, build) {
        var dependencies = $.wiredep({
            devDependencies: true
        });

        var options = {
            files: _.union(
                config.consts.karma.dependencies || dependencies,
                config.paths.tests,
                config.paths.app.scripts,
                config.paths.app.partials
            ),
            singleRun: once,
            browsers: config.consts.karma.browsers,
            frameworks: ['mocha'],
            reporters: ['mocha'],
            preprocessors: {
                '**/*.html': ['ng-html2js']
            },
            mochaReporter: {
                output: 'minimal',
                showDiff: true
            },
            ngHtml2JsPreprocessor: {
                stripPrefix: config.paths.base,
                moduleName: config.moduleName + '.templates'
            }
        };

        if (build) {
            options.reporters.push('junit');
            options.reporters.push('coverage');
            options.junitReporter = {
                outputFile: config.paths.build.reports.test,
                useBrowserName: false
            };
            options.coverageReporter = {
                type: 'lcov',
                dir: $.path.join(config.paths.build.reports.coverage),
                subdir: '.'
            };
            options.preprocessors[config.paths.app.scripts] = ['coverage'];
        }
        return new $.karma(options, done).start();
    }
};
