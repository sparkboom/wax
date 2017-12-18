import jestConfig from '../.jest.json';

module.exports = (workflow, gulp, $, config) => {
  const reporter = config.ci ? 'jest-teamcity-reporter' : undefined;

  workflow.subtask('unit-tests', () =>
    gulp
      .src(config.dirs.root)
      .pipe($.jest.default({
        testResultsProcessor: reporter,
        silent: false,
        coverage: config.ci || !!config.args.coverage,
        watch: !!config.args.watch,
        ...jestConfig,
      }))
  );
};
