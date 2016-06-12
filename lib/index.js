'use strict';

var _ = require('lodash');
var plugins = require('gulp-load-plugins')();
var tasks = require('require-dir')('./tasks');

var consts = require('./consts');
var paths = require('./paths');

// Allow skipping tests during {@link build} with the -st switch.
var args = require('yargs')
    .options('skip-test', {
        alias: 'st'
    })
    .argv;

// Panic in production, else continue until error is fixed.
var errorHandler = function (err) {
    console.log(err);

    if (process.env[consts.productionFlag]) {
        process.exit(1);
    } else {
        this.emit('end');
    }
};

module.exports = function (gulp, config) {
    if (!gulp) {
        throw new Error('gulp not passed to the module');
    }
    if (!config) {
        throw new Error('config not passed to the module');
    }
    if (!config.karma) {
        throw new Error('karma was not passed to the module');
    }
    if (!config.moduleName) {
        throw new Error('moduleName in config.js not specified');
    }

    _.extend(config, {
        args: args,
        isProduction: !!process.env[consts.productionFlag]
    });

    // Prefer user config but default to library paths and consts.
    _.defaultsDeep(config, {
        paths: paths,
        consts: consts
    });

    // Node modules not accessible via gulp-load-plugins are added manually.
    _.extend(plugins, {
        argv: require('yargs').argv,
        del: require('del'),
        errorHandler: errorHandler,
        fs: require('fs'),
        karma: require('karma').Server,
        path: require('path'),
        runSequence: require('run-sequence').use(gulp),
        uglifySaveLicense: require('uglify-save-license')
    });

    _.forEach(tasks, function (task) {
        task(gulp, plugins, config, _);
    });
};
