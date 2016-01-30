'use strict';

module.exports = {
    base: 'src/',
	app: {
        base: 'src/app/',
        htmls: [
			'src/index.html',
			'src/app/**/*.html'
		],
        mainHtml: 'src/index.html',
        partials: ['src/app/*/**/*.html'],
        scripts: ['src/app/**/*.js'],
        styles: ['src/styles/**/*.scss'],
        fonts: ['src/fonts/**/*'],
        images: ['src/images/**/*']
	},
    build: {
        base: 'build/',
        reports: {
            coverage: 'build/reports/coverage/',
            test: 'build/reports/unit.xml'
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
	test: {
        e2e: ['test/e2e/**/*'],
        unit: ['test/unit/**/*'],
        protractor: 'protractor.conf.js'
	}
};
