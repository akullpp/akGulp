'use strict';

var _ = require('lodash');
var plugins = require('gulp-load-plugins')();
var tasks = require('require-dir')('./tasks');

var paths = require('./paths');
var consts = require('./consts');

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
        uglifySaveLicense: require('uglify-save-license'),
        wiredep: require('wiredep')
    });

    _.forEach(tasks, function (task) {
        task(gulp, plugins, config, _);
    });
};
