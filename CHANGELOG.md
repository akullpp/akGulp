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
