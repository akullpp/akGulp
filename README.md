# akGulp

Fully functional Gulp module for your enterprise AngularJS build process.

It was developed under the assumption, that your build server is restricted in its communication with the internet.

I used my initials as the prefix in order to emphasize the necessity to customize it for your project. So change it to your project prefix and do the necessary adaptions.

## Stack

The usage of specific dependencies can be found in the task section where every task lists it's required dependencies.

### General

* ECMAScript 5.1
* [AngularJS 1.x](https://www.angularjs.org/)
* [Bootstrap 3.x](http://getbootstrap.com/)
* [Bower 1.x](http://bower.io/)
* [ESLint 1.x](http://eslint.org/)
* [Gulp 3.x](http://gulpjs.com/)
* [npm 2.x](https://www.npmjs.com/)
* [Less 2.x](http://sass-lang.com/)

### Testing

* [Karma 0.13.x](https://karma-runner.github.io/)
* [Mocha 2.x](http://mochajs.org/)

The assumption and best practice is to do consumer-driven API- and E2E-tests in another project.

## Usage

### Integration

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
        webserver: {
            port: '3000'
        }
    }
};
```

#### gulpfile.js

You can define you own tasks but must at least have the following:

```
'use strict';

var akGulp = require('ak-gulp');
var gulp = require('gulp');

var config = require('./config');

akGulp(gulp, config);
```

### Main Tasks

* `gulp dev` (default): Launches a server hosting and watching the development files.

* `gulp test`: Executes unit tests once.
    * `gulp test:watch`: Executes unit tests and keeps waiting.
    * `gulp test:build`: Executes unit tests, coverage and junit reporter.

* `gulp build`: Builds the distribution which produces following folder structure:

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
