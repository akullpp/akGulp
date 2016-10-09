'use strict';

module.exports = function(gulp, $, config, _) {
    /**
     * Runs the tests once and exits.
     *
     * Possible browsers are Chrome, Firefox and IE and are specified via the karma configuration file.
     *
     * @public
     * @namespace tests
     */
    gulp.task('tests', function (done) {
        runKarma(true, done);
    });

    /**
     * Starts the test server without exiting for continuous development.
     *
     * Used internally by {@link watch}.
     *
     * @private
     * @name tests:watch
     * @memberof tests
     */
    gulp.task('tests:watch', function (done) {
        runKarma(false, done);
    });

    /**
     * Runs the tests on an existing server.
     *
     * Used internally by {@link watch}.
     *
     * @private
     * @name tests:run
     * @memberof tests
     */
    gulp.task('tests:run', function (done) {
        $.karma.runner.run(undefined, function () {
            done();
        });
    });

    /**
     * Runs the tests once with additional reporting.
     *
     * Skippable with the `-st` switch.
     *
     * JUnit and coverage reporters are used to allow postprocessing by Jenkins and Sonar.
     * The default format of the coverage report is LCOV.
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
        if (!config.karma.deps) {
            $.util.log('No Karma dependencies found, are you sure?');
        }

        // Basic defaults for karma
        var defaults = getDefaults(once, build)
        // Defaults overwritten by manually specified options in the project's karma file.
        var options = _.defaultsDeep(config.karma, defaults);
        // Allow for different browsers in production (CI) vs. development.
        options.browsers = config.isProduction ?
            _.get(config.karma.browsers, 'production', config.consts.karma.browsers.production) :
            _.get(config.karma.browsers, 'development', config.consts.karma.browsers.development);

        if (once) {
            new $.karma.Server(options, done).start();
        } else {
            // Start a new background server and wait for tests:run
            $.karmaBackground(options);
        }
    }

    function getDefaults(once, build) {
        var defaults = {
            // Files required to run tests successfully, mind the order.
            files: _.union(
                config.karma.deps,
                config.paths.tests,
                config.paths.app.scripts,
                config.paths.app.partials
            ),
            failOnEmptyTestSuite: false,
            singleRun: once,
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
                // The partials are available as Angular module with the name of moduleName.consts.templateSuffix.
                moduleName: config.moduleName + config.consts.templateSuffix
            }
        };

        if (build) {
            // JUnit reporter for postprocessing by Jenkins to fail build if tests fail.
            defaults.reporters.push('junit');
            // Coverage reporter for postprocessing by Sonar.
            defaults.reporters.push('coverage');

            defaults.junitReporter = {
                outputFile: config.paths.build.reports.tests,
                useBrowserName: false
            };
            defaults.coverageReporter = {
                type: 'lcov',
                dir: $.path.join(config.paths.build.reports.coverage),
                subdir: '.'
            };

            defaults.preprocessors[config.paths.app.scripts] = ['coverage'];
        }
        return defaults;
    }
};
