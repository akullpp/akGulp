'use strict';

module.exports = {
	proxy: {
		url: 'http://localhost:1234/',
		prefixes: [
            /api/
        ]
	},
    partials: {
        prefix: 'app',
        out: 'partials.min.js'
    },
    autoprefixer: {
        browsers: 'last 2 version'
    }
}
