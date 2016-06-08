# akGulp

Conservative and basic [Gulp](http://gulpjs.com/) module for enterprise Angular 1 projects.

* [Motivation](#motivation)
* [Stack](#stack)
* [Integration](#integration)
* [Tasks](#tasks)
* [Development](#development)

## Motivation

Why should you use this rather conservative module to power your Angular 1 build process?

You shouldn't in an ideal world were you could do everything as you please and move on to [webpack](https://webpack.github.io/) and so on. However in enterprise environments there are often restrictions (e.g. downloading binaries on your build server), other requirements (e.g. stability and documentation) or your colleagues are just not up to the churn.

If you look at other gulp modules, you will find them often to be convoluted and to be showcases of what you could do if you push the limits.

This module aims to be different: Basic, conservative and documented.

1. Basic: Only tasks which are necessary to produce a sensible distribution of the application are included.
2. Conservative: The plugins are known to work and don't do any funky stuff like downloading binaries.
3. Documented: Task have a concise documentation of what they do, how they should be used and what the requirements are. Further documentation can be found in the code.

This module is ideally customer-based, i.e. a customer agrees on a default stack for their common projects and the build tooling is adapted accordingly. Of course it could also be used as project-based module for one ore more Angular applications.

I used my initials as prefix in order to emphasize the high probability for you to customize the module based on your customer/company/project. So change it to your customer/project prefix and do the necessary adaptions.

A typical workflow for a fork would be to:

1. Identify the infrastructural situation, what does it (dis-)allow? Adapt.
2. Define the stack. Adapt.
3. Fork it as node module or integrate it as a folder.

## Stack

These are the assumptions about the stack if you just want to use the module out-of-the box.

### General

* [AngularJS 1.x](https://www.angularjs.org/)
* [ECMAScript 5.1](http://www.ecma-international.org/ecma-262/5.1/)
* [ESLint 1.x](http://eslint.org/)
* [Gulp 3.x](http://gulpjs.com/)
* [Less 2.x](http://lesscss.org/)
* [node 0.12.x](https://nodejs.org/en/)
* [npm 2.x](https://www.npmjs.com/)

### Testing

* [Karma 0.13.x](https://karma-runner.github.io/)
* [Mocha 2.x](http://mochajs.org/)

The assumption and best practice is to do consumer-driven API- and E2E-tests in a separate project.

### Dependencies

In alphabetical order.

* [del](https://github.com/sindresorhus/del): Deleting the build folder as a task
* [diff](https://github.com/kpdecker/jsdiff): Providing deep object diffs for the test reporter
* [gulp](http://gulpjs.com/): That's the point of this module
* [gulp-angular-filesort](https://github.com/klei/gulp-angular-filesort): Sort-order of scripts for Angular's DI
* [gulp-autoprefixer](https://github.com/sindresorhus/gulp-autoprefixer): Automatic vendor prefixing of CSS rules
* [gulp-concat](https://github.com/contra/gulp-concat): Concatenating partials
* [gulp-csso](https://github.com/ben-eb/gulp-csso): Optimizing CSS
* [gulp-eslint](https://github.com/adametry/gulp-eslint): Linting JS
* [gulp-filter](https://github.com/sindresorhus/gulp-filter): Filtering filestreams
* [gulp-flatten](https://github.com/armed/gulp-flatten): Flattening long paths
* [gulp-htmlmin](https://github.com/jonschlinkert/gulp-htmlmin): Minification of HTML
* [gulp-if](https://github.com/robrich/gulp-if): Conditionally run tasks
* [gulp-inject](https://github.com/klei/gulp-inject): Injecting assets into HTML
* [gulp-less](https://github.com/plus3network/gulp-less): CSS preprocessing
* [gulp-load-plugins](https://github.com/jackfranklin/gulp-load-plugins): Loading all gulp-prefixed plugins
* [gulp-ng-annotate](https://github.com/Kagami/gulp-ng-annotate): Annotating functions for Angular's DI
* [gulp-ng-html2js](https://github.com/marklagendijk/gulp-ng-html2js): Scriptifying HTML files and putting them into the $templateCache
* [gulp-plumber](https://github.com/floatdrop/gulp-plumber): Error handling without breaking pipes
* [gulp-replace](https://github.com/lazd/gulp-replace): Replacing strings in HTMLs
* [gulp-rev](https://github.com/sindresorhus/gulp-rev): Revisioning assets
* [gulp-rev-replace](https://github.com/jamesknelson/gulp-rev-replace): Replacing references of assets with their revisioned form
* [gulp-size](https://github.com/sindresorhus/gulp-size): Reporting the size of files in streams
* [gulp-sourcemaps](https://github.com/floridoo/gulp-sourcemaps): Creating sourcemaps for minified scripts
* [gulp-uglify](https://github.com/terinjokes/gulp-uglify): Minification of JS
* [gulp-useref](https://github.com/jonkemp/gulp-useref): Parsing build blocks in HTML to replace references
* [gulp-util](https://github.com/gulpjs/gulp-util): Logging
* [gulp-webserver](https://github.com/schickling/gulp-webserver): Serving files for development
* [karma](http://karma-runner.github.io/): Testrunner
* [karma-chrome-launcher](https://github.com/karma-runner/karma-chrome-launcher): Chrome as test browser
* [karma-coverage](https://github.com/karma-runner/karma-coverage): Generating reports for Sonar
* [karma-firefox-launcher](https://github.com/karma-runner/karma-firefox-launcher): Firefox as test browser
* [karma-ie-launcher](https://github.com/karma-runner/karma-ie-launcher): IE as test browser
* [karma-junit-reporter](https://github.com/karma-runner/karma-junit-reporter): Generating test reports for Jenkins to understand
* [karma-mocha](https://github.com/karma-runner/karma-mocha): Adapter for Karma and Mocha to work together
* [karma-mocha-reporter](https://github.com/litixsoft/karma-mocha-reporter): Reporter for tests
* [karma-ng-html2js-preprocessor](https://github.com/karma-runner/karma-ng-html2js-preprocessor): Same as gulp-ng-html2js but for karma tests
* [lodash](https://lodash.com/): The missing stdlib
* [mocha](https://mochajs.org/): Testing framework
* [require-dir](https://github.com/aseemk/requireDir): Importing all tasks at once
* [run-sequence](https://github.com/OverZealous/run-sequence): Sequentially running tasks
* [uglify](https://github.com/mishoo/UglifyJS): Minifying JS
* [uglify-save-license](https://github.com/shinnn/uglify-save-license): Saving the license during minification.
* [yargs](https://github.com/yargs/yargs): Commandline-arguments for skipping tests during build

#### Why I didn't you use...

* ... Sass instead of Less. Unfortunately, Less is more predominant in the enterprise world. Mainly, because of Bootstrap. I hope that this will change with Bootstrap 4.
* ... Browsersync instead of gulp-webserver. At the time of writing this library somewhere down the dependency chain of browsersync (socket.io, engine.io, and so on) there was a hardcoded URL which basically meant timeouts with a enterprise firewall. It might be fixed now, so if there's good reason, I might re-evaluate it.
* ... gulp-imagemin or another image optimization plugin. Downloads binaries for compression which is often prohibited.
* ... PhantomJS as a test browser. The popular headless browser has many pecularities but nevertheless it is complicated to use it without downloading the binaries. There are workarounds, you will need to choose one if you want to use it.
* Jasmine instead of Mocha. Mocha allows for your own assertion and mocking library, handles asynchronous tests better, allows to show deep diffs in reports and is more fluent for BDD.

## Integration

### As a node module

This has rather huge advantages and should be preferred to the integrated folder. There are three possibilities here:

1. In the very unlikely case you didn't need to make any adaptions and never plan to make any (beside basic ones via pull requests) you could have installed it via `npm i -D akGulp` which isn't recommended.
2. You've forked `akGulp` and now have an adapted version in own repository. In this case you will probably need to use the repository URL in the `devDependencies` of your `package.json`. This is not recommended since installations will take time, there will be no caching and no semver. Also you would probably need an SSH connection to the repository (and therefore the server) which is often an issue for the ops.
3. You've forked it and have a private npm registry (e.g. [Nexus](https://books.sonatype.com/nexus-book/reference/npm.html) in which you've published your fork. Now you have everything: caching, security and semver. Good job.

#### config.js

Here you can overwrite the paths if your folder structure differs or specify additional and different options for the gulp plugins.

The only required entry is the `moduleName` which is used for the partials as Angular module name:

```js
module.exports = {
    moduleName: 'my',
    paths: {
        app: {
            fonts: ['my/path/fonts']
        }
    },
    consts: {
        webserver: {
            port: '3000'
        }
    }
};
```

The `paths` properties overwrite the properties in `path.js` and the `consts` properties overwrite the properties in `consts.js`.

#### gulpfile.js

You can define you own tasks or overwrite existing ones but it must at least have the following:

```
'use strict';

var akGulp = require('ak-gulp');
var gulp = require('gulp');

var config = require('./config');
var karma = require('./karma');

config.karma = karma;

akGulp(gulp, config);
```

To overwrite or create a task you define it in this file on the gulp object before you pass it.

#### karma.js

This is the configuration for Karma and is required to be a valid module that exports an object. There are two major differences between this custom karma configuration and the default `kamra.conf.js` you might know. Dependencies and browsers have to specified with a special syntax. Everything else is like the default Karma configuration.

**Dependencies** which would normally just be the `files` property in Karma must be specified with the `deps` property since

* `config.paths.tests`
* `config.paths.app.scripts`
* `config.paths.app.partials`

are added automatically. Here's an example:

```
'use strict';

module.exports = {
    deps: [
        'node_modules/angular/angular.js',
        'node_modules/angular-mocks/angular-mocks.js',
        'test/setup.js'
    ]
};
```

**Browsers** which would normally just be an array of strings are separated into `production` for your CI and `development` for your local environment. Here an example:

```
browsers: {
    production: ['IE'],
    development: ['Chrome']
}
```

Possible values are `Chrome`, `Firefox` and `IE`.

#### Structure

The default minimal folder structure of the project is:

```
    src/
        app/
            index.html
        fonts/
            *.{eot,svg,ttf,woff,woff2,otf}
        images/
        styles/
            main.less
    test/
        **/*.spec.js
```

Have a look at `paths.js` if you want to overwrite it.

### As a folder

TBD.

## Tasks

This is a description of commonly used tasks during development. An extensive list and documentation can be found [at the respective website](http://akullpp.github.io/akGulp). The same documentation can also be generated by `npm run doc`.

* `gulp` (defaults to `gulp dev`): Launches a server hosting and watching the development files. The server reacts on changes on the development files and automatically does script injection if a new file is found or runs the preprocessor, tests and linter on changes.

* `gulp build`: After successfully running the tests it builds the distribution which produces following folder structure:

    ```
    build/
        dist/
            fonts/
            images/
            scripts/
                main-{rev}.js
                main-{rev}.js.map
                vendor-{rev}.js
                vendor-{rev}.js.map
            styles/
                main-{rev}.css
                vendor-{rev}.css
            index.html
            VERSION
        reports/
            coverage/
                ...
            unit.xml
    ```

There's also the temporary folder which is used for development and intermediary files:

```
    build/
        .tmp/
            styles/
                main.css
            index.html
            partials.min.js
```

### Production flag

The production flag is a environment variable which name is defined in `consts.productionFlag` (default: `PRODUCTION`) that makes pipes break on lint and plugin errors. It also enables the usage of different test browsers.

## Development

Local development is done with `npm link` in this projects folder and then linking it via `npm link ak-gulp` into the implementer's project folder.

### Scripts

There are three npm scripts:

1. `npm run clean`: Deletes `doc/`, `node_modules/` and `npm-debug.log`
2. `npm run lint`: Lints `lib/` with ESlint
3. `npm run doc`: Generates the documentation to `doc/`

### Structure

#### consts.js

Here are several constants like plugin options or the production flag.

#### index.js

This is the entry point of the module, everything gets set up here.

#### paths.js

The default path structure as shown above. Also there is an array which allows to specify unhandled assets via negative glob.

### Future Plans

* Generator for Less/Sass switching
* Tests
