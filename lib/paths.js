'use strict';

module.exports = {
    base: 'src/',
    app: {
        base: 'app/',
        mainHtml: 'src/index.html',
        mainStyle: 'src/styles/main.less',
        assets: 'src/assets/**/*',
        partials: ['src/app/*/**/*.html'],
        scripts: ['src/app/**/*.js'],
        styles: ['src/styles/**/*.less']
    },
    build: {
        base: 'build/',
        reports: {
            coverage: 'build/reports/coverage/',
            tests: 'build/reports/unit.xml'
        },
        tmp: {
            base: 'build/.tmp/',
            mainHtml: 'build/.tmp/index.html',
            mainPartials: 'build/.tmp/partials.min.js',
            mainStyle: 'build/.tmp/styles/main.css',
            styles: 'build/.tmp/styles/',
            assets: 'build/.tmp/assets/'
        },
        dist: {
            base: 'build/dist/',
            assets: 'build/dist/assets/'
        }
    },
    tests: ['test/**/*.spec.js'],
    unknown: [
        '!**/*.js',
        '!**/*.html'
    ]
};
