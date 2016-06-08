'use strict';

module.exports = {
    autoprefixer: {
        browsers: 'last 2 version'
    },
    injectScripts: {
        relative: true
    },
    injectStyles: {
        read: false,
        addRootSlash: false
    },
    injectPartials: {
        read: false,
        starttag: '<!-- inject:partials -->',
        addRootSlash: false,
        addPrefix: '..'
    },
    karma: {
        browsers: {
            production: ['Firefox'],
            development: ['Firefox']
        }
    },
    ngAnnotate: {
        single_quotes: true
    },
    templateSuffix: '.templates',
    productionFlag: 'PRODUCTION',
    versionFile: 'VERSION',
    webserver: {
        open: true
    }
};
