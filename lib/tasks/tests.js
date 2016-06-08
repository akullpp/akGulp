'use strict';

module.exports = function(gulp, $, config, _) {
    /**
     * Runs the tests once and exits.
     *
     * @public
     * @namespace tests
     */
    gulp.task('tests', function (done) {
        return runKarma(true, done);
    });

    /**
     * Runs the tests without exiting for continuous development.
     *
     * Used internally by {@link watch}.
     *
     * @private
     * @name tests:watch
     * @memberof tests
     */
    gulp.task('tests:watch', function (done) {
        return runKarma(false, done);
    });

    /**
     * Runs the tests once with additional reporting.
     *
     * Skippable with the `-st` switch.
     *
     * JUnit and coverage reporters are used to allow postprocessing by Jenkins and Sonar.
     *
     * HTML files are preprocessed to JavaScript in order to load them once and for all with `beforeEach(module(moduleName.templates));`.
     *
     * Used internally by {@link build}.
     *
     * @private
     * @name tests:build
     * @memberof tests
     */
    gulp.task('tests:build', function (done) {
        if (config.args.st) {
            $.util.log('Skipping \'tests:build\'');
            done();
        } else {
            return runKarma(true, done, true);
        }
    });


    function runKarma(once, done, build) {
        var options = {
            // Files required to run tests successfully, mind the order.
            files: _.union(
                config.paths.tests.deps,
                config.paths.tests.specs,
                config.paths.app.scripts,
                config.paths.app.partials
            ),
            singleRun: once,
            browsers: config.consts.karma.browsers,
            frameworks: ['mocha'],
            reporters: ['mocha'],
            // Preprocessing of HTML files to utilize $templateCache in tests.
            preprocessors: {
                '**/*.html': ['ng-html2js']
            },
            mochaReporter: {
                output: 'minimal',
                showDiff: true
            },
            ngHtml2JsPreprocessor: {
                stripPrefix: config.paths.base,
                // The partials are available as Angular module with the name of moduleName.templates.
                moduleName: config.moduleName + '.templates'
            }
        };

        if (build) {
            // JUnit reporter for postprocessing by Jenkins to fail build if tests fail.
            options.reporters.push('junit');
            // Coverage reporter for postprocessing by Sonar.
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
