const _ = require('lodash');

module.exports = (workflow, gulp, $, config) => {
  const args = _.cloneDeep(config.args);
  const testType = args._[0].split(':')[1];
  const tags = _.compact(_.uniq((_.isArray(args.tag) ? args.tag : [args.tag]).concat([testType])));

  args.tag = tags;

  if (args.test) {
    args.test = `${config.dirs.browserTests[testType]}/${args.test}.js`;
  }

  if (config.ci) {
    args.reporter = require.resolve('nightwatch-teamcity');
  }

  delete args._;
  delete args['$0'];

  workflow.subtask('nightwatch', () =>
    gulp
      .src('')
      .pipe($.nightwatch({
        configFile: './browser-tests/nightwatch/nightwatch.conf.js',
        cliArgs: _.map(args, (v, k) => `--${k} ${v}`),
      }))
  );
};
