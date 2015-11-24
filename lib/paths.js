'use strict';

module.exports = {
    base: 'src/',
	app: {
        base: 'src/app/',
        mainHtml: 'src/index.html',
		partials: ['src/app/*/**/*.html'],
        htmls: [
			'src/index.html',
			'src/app/**/*.html'
		],
		styles: ['src/styles/**/*.scss'],
		scripts: ['src/app/**/*.js'],
        images: ['src/images/**/*'],
        fonts: ['src/fonts/**/*']
	},
    build: {
        base: 'build/',
        reports: {
            coverage: 'build/reports/coverage',
            test: 'build/reports/unit.xml'
        },
        tmp: {
            base: 'build/.tmp/',
            mainStyle: 'build/.tmp/styles/main.css',
            mainHtml: 'build/.tmp/index.html',
            styles: 'build/.tmp/styles/',
            partials: 'build/.tmp/partials/',
            mainPartials: 'build/.tmp/partials.min.js'
        },
        dist: {
            base: 'build/dist/',
            fonts: 'build/dist/fonts/',
            images: 'build/dist/images/',
        }
    },
	test: {
		unit: ['test/unit/**/*'],
		api: ['test/api/**/*'],
		e2e: ['test/e2e/**/*']
	}
}
