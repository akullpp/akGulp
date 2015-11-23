'use strict';

var _ = require('lodash');
var plugins = require('gulp-load-plugins')();
var tasks = require('require-dir')('./tasks');
var Promise = require('bluebird');

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

var errorHandler = function (err) {
    console.log(err);
    this.emit(end);
}

module.exports = function (gulp, config) {
    _.extend(config, {
        args: args
    });

	_.defaultsDeep(config, {
		paths: paths,
		consts: consts
	});

	_.extend(plugins, {
        browserSync: require('browser-sync'),
        del: require('del'),
        errorHandler: errorHandler,
        httpProxy: require('http-proxy'),
        path: require('path'),
        wiredep: require('wiredep'),
        argv: require('yargs').argv,
        globAsync: Promise.promisify(require('glob')),
        karma: require('karma').Server,
        Promise: Promise,
        protractor: require('gulp-protractor'),
        runSequence: require('run-sequence').use(gulp),
        uglifySaveLicense: require('uglify-save-license')
	});

	_.forEach(tasks, function (task) {
		task(gulp, plugins, config, _);
	});

    gulp.task('default', ['dev']);

    gulp.task('dev', function (done) {
        plugins.runSequence(
            ['clean'],
            ['styles'],
            ['deps'],
            ['watch'],
            ['serve'],
            done
        )
    });
};
