'use strict';

module.exports = {
    base: 'src/',
	app: {
        root: 'app/',
        base: 'src/app/',
        mainStyle: 'src/styles/main.less',
        mainHtml: 'src/index.html',
        htmls: [
			'src/index.html',
			'src/app/**/*.html'
		],
        partials: ['src/app/*/**/*.html'],
        scripts: ['src/app/**/*.js'],
        styles: ['src/styles/**/*.less'],
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
	tests: ['test/**/*']
};
