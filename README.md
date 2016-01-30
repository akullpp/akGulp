# akGulp

Fully functional Gulp module for your enterprise AngularJS build process.

I used my initials as the prefix in order to emphasize the necessity to customize it for your project. So change it to your project prefix and do the necessary adaptions.

## Stack

The usage of specific dependencies can be found in the task section where every task lists it's required dependencies.

### General

* [AngularJS](https://www.angularjs.org/)
* [Bootstrap](http://getbootstrap.com/)
* [Bower](http://bower.io/)
* [ESLint](http://eslint.org/)
* [Gulp](http://gulpjs.com/)
* [npm](https://www.npmjs.com/)
* [Sass](http://sass-lang.com/)

### Testing

* [Karma](https://karma-runner.github.io/)
* [Mocha](http://mochajs.org/)
* [Chai](http://chaijs.com/)
* [Sinon](http://sinonjs.org/)
* [Sinon-Chai](https://github.com/domenic/sinon-chai)

## Usage

### Implementation

A test project which integrates this module can be found at [akullpp/myDashboard](https://github.com/akullpp/myDashboard).

#### package.json

Add this module in `devDependencies`.

#### config.js

The folder structure defined in `lib/paths.js` has to followed or overwritten in the `config.js`. Please note, that plural in properties indicate an array.

If you need to, you can overwrite `lib/consts.js` in the same way.

The only required entry is the `moduleName`, here an example:

```js
module.exports = {
    moduleName: 'my',
    paths: {
        app: {
            fonts: ['my/path/fonts']
        }
    },
    consts: {
        proxy: {
            url: 'http://localhost:1234'
        }
    }
};
```

#### gulpfile.js

You can define you own tasks but must at least have the following:

```
'use strict';

var kwb2cGulp = require('kwb2c-gulp');
var gulp = require('gulp');

var config = require('./config');

kwb2cGulp(gulp, config);

```

#### protractor.conf.js

Has to exist and can be the most minimal form:

```
'use strict';

exports.config = {};
```

### Main Tasks

* `gulp dev` (default): Launches a server hosting and watching the development files.

* `gulp test`: Executed unit and E2E tests.
    * `gulp test:unit`: Executes unit tests.
    * `gulp test:e2e`: Executes E2E tests.

* `gulp build`: Builds the distribution which produces following folder structure:

    ```
    build/dist/
        images/
        fonts/
        scripts/
            main-{rev}.js
            vendor-{rev}.js
        styles/
            main-{rev}.css
            vendor-{rev}.css
        index.html
    ```

### Other Tasks

#### build

#### partials

Internal, should not be called directly.

#### compile

Internal, should not be called directly.

#### clean

Deletes the build folder.

Dependencies: del

#### deps

#### deps:partials

Internal, should not be called directly.

#### fonts

Copies `eot`, `svg`, `ttf`, `woff`, `woff2` and otf files from the development fonts folder to the distribution fonts folder.

Dependencies: gulp-filter, gulp-flatten, gulp-size

#### images

#### lint

Lints the JavaScript files in the development and test folder.

Dependencies: gulp-plumber, gulp-filter, gulp-eslint

#### serve

#### serve:dist

#### styles

Compiles the Sass files, removes unused rules by looking at the development HTML files and prefixes vendor-specific rules for the last two browser version. Finally it copies the styles to the temporary styles folder.

Dependencies: gulp-plumber, gulp-sass, gulp-uncss, gulp-autoprefixer, gulp-size

#### watch

Watches:
 * the development styles folder and executes `styles` on change.
 * the development and test folders and executes `lint` and `test:unit:watch` on change.
 * the main HTML file and all JavaScript files inside the development folder and the `bower.json` and executes `deps`.

Dependencies: path

#### test

Executes the unit and E2E-tests in sequence.

Dependencies: run-sequence

#### test:unit

Runs Karma with the JavaScript, HTML files and all bower dependencies injected.

Dependencies: wiredep, karma, karma-firefox-launcher, karma-mocha, karma-ng-html2js-preprocessor, karma-junit-reporter, karma-coffee-preprocessor, mocha, yargs, gulp-util

#### test:unit:watch

#### test:e2e
