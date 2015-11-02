# myGulp

Fully functional Gulp module for your enterprise AngularJS build process. A test project which integrates this module can be found at [akullpp/myDashboard](https://github.com/akullpp/myDashboard).

## Expected Stack

## General

Gulp, Sass, AngularJS, Bootstrap, ESLint

### Testing

Karma, Mocha, Chai, Sinon, Sinon-Chai, ngMidwayTester

## Main

* `gulp dev`: Launches a server hosting and watching the development files.

* `gulp test`: Executed unit, API and E2E tests.
    * `gulp test:unit`: Executes unit tests.
    * `gulp test:api`: Executes API tests.
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
