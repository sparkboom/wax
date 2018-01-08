const argv = require('yargs').argv;

module.exports = {
  name: require('../../package.json').name,
  buildCounter: process.env.BUILD_COUNTER || '0',
  ci: !!process.env.TEAMCITY_VERSION,
  optimise: argv.optimise || !!process.env.TEAMCITY_VERSION,
  version: argv.version,
  dirs: {
    app: {
      root: './app',
      assets: './node_modules/@salesforce-ux/design-system/assets',
    },
    server: {
      root: './server',
      tests: './server/**/*.spec.js',
      templates: './server/templates',
    },
    iis: {
      root: './iis',
    },
    dist: {
      root: './dist',
      app: './dist/app',
      server: './dist/server',
      static: './dist/static',
      bundles: './dist/static/bundles',
    },
    nightwatch: {
      root: './browser-tests/nightwatch',
    },
    browserTests: {
      acceptance: './browser-tests/acceptance-tests',
      smoke: './browser-tests/smoke-tests',
    },
    report: './report',
    root: './',
  }
};
