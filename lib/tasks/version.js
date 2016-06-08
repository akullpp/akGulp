'use strict';

module.exports = function(gulp, $, config) {
    var pjson = require($.path.join(process.cwd(), 'package.json'));

    /**
     * Writes the application version to dist.
     *
     * The version is located in the `package.json` and written to `paths.build.dist.base/config.conts.versionFile`.
     *
     * Used internally by {@link build}. Requires for `paths.build.dist.base` to exist.
     *
     * @private
     * @namespace version
     */
    gulp.task('version', function (done) {
        $.fs.writeFile(
            $.path.join(config.paths.build.dist.base, config.consts.versionFile),
            pjson.version,
            done
        );
    });
};
