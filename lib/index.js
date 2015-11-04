'use strict';

var _ = require('lodash');
var plugins = require('gulp-load-plugins')();
var tasks = require('require-dir')('./tasks');

var paths = require('./paths');
var consts = require('./consts');

var args = require('yargs')
    .options('skip-e2e', {
        alias: 'se'
    })
    .options('skip-api', {
        alias: 'sa'
    })
    .options('skip-unit', {
        alias: 'su'
    })
    .argv;

module.exports = function (gulp, config) {
    _.extend(config, {
        args: args
    });

	_.defaultsDeep(config, {
		paths: paths,
		consts: consts
	});

	_.extend(plugins, {
		del: require('del'),
		path: require('path'),
		httpProxy: require('http-proxy'),
		browserSync: require('browser-sync'),
		wiredep: require('wiredep'),
        mainBowerFiles: require('main-bower-files'),
        runSequence: require('run-sequence').use(gulp),
        uglifySaveLicense: require('uglify-save-license'),
        karma: require('karma').Server,
        protractor: require('gulp-protractor'),
        argv: require('yargs').argv
	});

	_.forEach(tasks, function (task) {
		task(gulp, plugins, config, _);
	});

    gulp.task('dev', function (done) {
        plugins.runSequence(
            ['clean'],
            ['deps'],
            ['watch'],
            ['serve'],
            done
        )
    });
};
