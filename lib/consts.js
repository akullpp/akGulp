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
        browsers: ['Firefox']
    },
    minifyHtml: {
        empty: true,
        spare: true,
        quotes: true,
        loose: true
    },
    ngHtml2js: {},
    productionFlag: 'PRODUCTION',
    versionFile: 'VERSION',
    webserver: {
        open: true
    }
};
