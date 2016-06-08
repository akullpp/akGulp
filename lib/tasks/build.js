'use strict';

module.exports = function(gulp, $, config, _) {
    var pjson = require($.path.join(process.cwd(), 'package.json'));

    /**
     * Builds the application.
     *
     * Runs sequentially:
     *
     * 1. {@link clean}
     * 2. {@link tests tests:build}
     * 3. {@link lint}
     * 4. {@link partials} and {@link styles}
     * 5. {@link inject}
     * 6. {@link inject inject:partials}
     * 7. {@link assets}
     * 8. {@link build build:compile}, {@link images}, {@link fonts}
     * 9. {@link version}
     *
     * @public
     * @namespace build
     */
    gulp.task('build', function (done) {
        $.runSequence(
            ['clean'],
            ['tests:build'],
            ['lint'],
            ['partials', 'styles'],
            ['inject'],
            ['inject:partials'],
            ['assets'],
            ['build:compile'],
            ['images', 'fonts', 'version'],
            done
        );
    });

    /**
     * Compiles the application.
     *
     * The sequence of compiling the application to a distribution is as follows:
     *
     * 1. Add `ngStrictDi` to the same element as the `ngApp` is attached to.
     * 2. Substitute the string `VERSION` in the `index.html` with the `package.json`'s version.
     * 3. Revision the static assets by appending the content hash to their filename.
     * 4. Automatically generate dependency annotations for Angular components with `ngAnnotate`.
     * 5. Minify the scripts and generate sourcemaps.
     * 6. Minify and optimize the styles with `csso`.
     * 7. Concatenate, minify and update the references in the `index.html`'s build blocks.
     * 8. Rename the references to their revisioned counterpart.
     * 9. Move everything to the `paths.build.dist.base` folder.
     *
     * Used internally by {@link build}. Relies on `paths.build.tmp.mainHtml` to be present.
     *
     * @private
     * @name build:compile
     * @memberof build
     */
    gulp.task('build:compile', function () {
        // Assets references statically in the index.html
        var assets = $.useref.assets({
            searchPath: [
                config.paths.build.tmp.base,
                config.paths.base,
                'node_modules'
            ]
        });
        // All JS files and subset of the assets
        var jsFilter = $.filter('**/*.js', {
            restore: true
        });
        // All CSS files and subset of the assets
        var cssFilter = $.filter('**/*.css', {
            restore: true
        });

        // Do everything on the basis of the temporary index.html which is created by previous build steps.
        return gulp.src(config.paths.build.tmp.mainHtml)
            // Add ngStrictDi directive
            .pipe(enableStrictDI())
            // Substitute VERSION with package.json's version once
            .pipe(writeVersion())
            // Get Assets
            .pipe(assets)
            // Revision them
            .pipe($.rev(config.consts.rev))
            // Get all JS files
            .pipe(jsFilter)
            // Annotate functions for Angular's DI
            .pipe($.ngAnnotate(config.consts.ngAnnotate))
            // Create sourcemaps for these files
            .pipe($.sourcemaps.init())
            // Minify JS files
            .pipe($.uglify(_.extend(config.consts.uglify, {
                preserveComments: $.uglifySaveLicense
            })))
            // Write sourcemaps to the same directory as the JS files
            .pipe($.sourcemaps.write('.'))
            // Restore filtered files
            .pipe(jsFilter.restore)
            // Get CSS files
            .pipe(cssFilter)
            // Optimize CSS files
            .pipe($.csso(config.consts.csso))
            // Restore filtered files
            .pipe(cssFilter.restore)
            // Restore all assets
            .pipe(assets.restore())
            // Handle build blocks
            .pipe($.useref(config.consts.useref))
            // Replace references by revisioned filenames
            .pipe($.revReplace(config.consts.revReplace))
            // Write to dist
            .pipe(gulp.dest(config.paths.build.dist.base))
            .pipe($.size({
                title: 'build'
            }));
    });

    // Adds the ngStrictDi to the same element as the ngApp is attached to.
    function enableStrictDI() {
        return $.replace(/ng\-app="[^"]*"/g, '$& ng-strict-di');
    }

    // Substitutes the string VERSION with the package.json's version once.
    function writeVersion() {
        return $.replace(/VERSION/, pjson.version);
    }
};
