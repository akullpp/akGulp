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
    .options('skip-unit', {
        alias: 'su'
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
        browserSync: require('browser-sync'),
        del: require('del'),
        errorHandler: errorHandler,
        httpProxy: require('http-proxy'),
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
