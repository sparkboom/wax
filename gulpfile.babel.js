import gulp from 'gulp';
import workflow from 'gulp-workflow';

workflow
  .load(gulp)
  .task('clean', 'Clean up generated files', ['clean:dist', 'clean:report'])
  .task('copy', 'Copy files ready for packaging', ['copy:config', 'copy:package_json', 'copy:npmrc', 'copy:templates', 'copy:fonts', 'copy:images', 'copy:iis'])
  .task('lint', 'Run linters', ['eslint'])
  .task('dev', 'Starts the server, builds the application and reloads the whole lot when changes are made', ['clean', 'build', 'dev:app', 'dev:server'])
  .task('dev:app', 'Watches for changes and compiles the app again', ['build:app', 'watch:app'])
  .task('dev:server', 'Starts the NodeJS server. Reloads when changes are detected.', ['build:server', 'watch:server'])
  .task('test:unit', 'Run unit tests', ['unit-tests'],
    {
      coverage: 'Produces a coverage report as well as result.',
      watch: 'Re-runs tests when changes are detected.'
    }
  )
  .task('test:smoke', 'Run smoke tests. See http://nightwatchjs.org/guide#command-line-options for more options.', ['nightwatch'],
    {
      env: 'Run the tests against an environment specified in the nightwatch.conf.js file.',
      tag: 'Run tests with a specific tag.',
      test: 'Runs only the specified test suite/module.',
    }
  )
  .task('test', 'Run linting and tests of all kind', ['lint', 'test:unit'])
  .task('build', 'Build the server and application', ['clean', 'build:app', 'build:server', 'copy', 'version'],
    { optimise: 'Optimises code for use in production.' }
  )
  .task('build:app', 'Build the application', ['bundle:app'],
    { optimise: 'Optimises code for use in production.' }
  )
  .task('build:server', 'Build the server', ['copy:config', 'babel:app', 'babel:server', 'copy:templates'])
  .task('version', 'Build the server', ['versioning:hash', 'versioning:update'],
    { optimise: 'This task will only run if this flag is set.' }
  )
  .task('ci', 'Lint, test, build and package', ['lint', 'test', 'build', 'dependencies', 'copy:output'],
    { optimise: 'Optimises code for use in production.' }
  )
;
