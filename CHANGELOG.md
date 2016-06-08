# Breaking Changes

## 1.0.0

Initial release

## 2.0.0

Paths are now arrays instead of strings

## 3.0.0

* Removed bluebird
* Removed linting for HTML and CSS
* Removed CoffeeScript support
* Removed API tests

## 4.0.0

* Removed E2E testing
* Substituted gulp-webserver for browsersync and httpProxy
* Removed uncss
* Rewrote testing
* Split linting in scripts and testing

## 5.0.0

Reduced test path and changed naming to plural to indicate array

## 6.0.0

**Testing: Partials**: Tests don't need to include separate partials for their directive tests anymore. However, partials have to be loaded globally once, e.g.

```
beforeEach(module(moduleName.templates));
```

It's reasonable to do this inside a setup file. The module name which must be equal to the name in the `config.js` has to be substituted of course.

**Testing: Reporter**: The standard progress reporter is replaced by mocha-reporter since it enables object diffs on the commandline.

**Style: Main Style**: Not every style file is preprocessed anymore but only the main style file. This enforces a modular approach to styles.

**Style: Less**: Sass was replaced by Less since it is more conservative in combination with Bootstrap.

**Utility: Latest Hash**: The latest git hash is now inserted into the main html file. It follows the same syntax as VERSION, i.e. HASH.

## 7.0.0 Rewrite

* Added basic error handling for required module parameters
* Added basic linting for the module
* Added Chrome- and IE-launchers for Karma
* Added engine information
* Added lots and lots of documentation.
* Added production flag for breaking pipes
* Added scripts for module development
* Executing DI before tests in order to mitigate invalid states
* Extracted many tasks to their own files
* Made almost all plugins to be configurable via `consts`
* Optimized many tasks regarding the reading of files
* Removed unused dependencies

### Removed everything bower

You will need to use node modules from now on. It is recommended to manually include your vendor dependencies.

### consts.js

* `partials` got removed since module name and prefix can be inferred by `config.moduleName` and `config.paths.app.base`

* `browsers` is an object separating between `development` and `production`

### paths.js

* Removed old `app.base`
* Renamed `app.root` to `app.base`
* Removed `app.htmls`
* Renamed `build.reports.test` to `build.reports.tests`
* `tests` are now specifically `*.spec.js`

### Removed `gitRev`

Therefore the `gitHash` and `writeHash` functions in the build file were also removed.

### Renamed all test related tasks to their plural form `tests`

### Substituted `gulp-htmlmin` for `gulp-minify-html`

Since the latter was deprecated.
