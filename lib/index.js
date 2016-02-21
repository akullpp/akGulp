'use strict';

var _ = require('lodash');
var plugins = require('gulp-load-plugins')();
var tasks = require('require-dir')('./tasks');

var paths = require('./paths');
var consts = require('./consts');

var args = require('yargs')
    .options('skip-test', {
        alias: 'st'
    })
    .argv;

var errorHandler = function (err) {
    console.log(err);
    this.emit('end');
};

module.exports = function (gulp, config) {
    _.extend(config, {
        args: args
    });

    _.defaultsDeep(config, {
        paths: paths,
        consts: consts
    });

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

    gulp.task('default', ['dev']);

    gulp.task('dev', function (done) {
        plugins.runSequence(
            ['clean'],
            ['styles'],
            ['deps'],
            ['watch'],
            ['serve'],
            done
        );
    });
};
