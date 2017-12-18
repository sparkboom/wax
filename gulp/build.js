import webpack from 'webpack';
import webpackConfig from '../webpack.config';

module.exports = (workflow, gulp, $, config) => {
  workflow.subtask('build:app:css', () =>
    gulp
      .src(`${config.dirs.app.root}/index.scss`)
      .pipe($.sourcemaps.init())
      .pipe(
        $.sass({
          outputStyle: config.optimise ? 'compressed' : 'expanded'
        }).on('error', $.sass.logError)
      )
      .pipe($.sourcemaps.write('./'))
      .pipe(gulp.dest(`${config.dirs.dist.static}/bundles`)));

  workflow.subtask('bundle:app', ['build:app:css'], (done) =>
    webpack(webpackConfig, (err, stats) => {
      if (err) {
        throw new $.util.PluginError("webpack", err);
      }

      $.util.log("[webpack]", $.util.colors.white(stats.toString()));

      done();
    })
  );
};
