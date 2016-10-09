'use strict';

module.exports = {
    autoprefixer: {
        browsers: 'last 2 version'
    },
    injectScripts: {
        relative: true
    },
    injectStyles: {
        addRootSlash: false
    },
    injectPartials: {
        starttag: '<!-- inject:partials -->',
        addRootSlash: false,
        relative: true
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
