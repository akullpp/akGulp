'use strict';

module.exports = {
    webserver: {
        open: true
    },
    partials: {
        prefix: 'app/',
        out: 'partials.min.js'
    },
    autoprefixer: {
        browsers: 'last 2 version'
    },
    karma: {
        browsers: ['Firefox']
    }
};
