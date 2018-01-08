import webpack from 'webpack';
import webpackConfig from '../webpack.config';

module.exports = (workflow, gulp, $, config) => {

  workflow.subtask('bundle:app', (done) =>
    webpack(webpackConfig, (err, stats) => {
      if (err) {
        throw new $.util.PluginError("webpack", err);
      }

      $.util.log("[webpack]", $.util.colors.white(stats.toString()));

      done();
    })
  );
};
