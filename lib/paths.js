'use strict';

module.exports = {
    base: 'src/',
	app: {
        base: 'app/',
        mainHtml: 'src/index.html',
        mainStyle: 'src/styles/main.less',
        fonts: ['src/fonts/**/*.{eot,svg,ttf,woff,woff2,otf}'],
        images: ['src/images/**/*'],
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
            styles: 'build/.tmp/styles/'
        },
        dist: {
            base: 'build/dist/',
            fonts: 'build/dist/fonts/',
            images: 'build/dist/images/'
        }
    },
	tests: ['test/**/*.spec.js'],
    unhandledAssets: [
        '!**/*.js',
        '!**/*.html'
    ]
};
