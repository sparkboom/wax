module.exports = (workflow, gulp, $, config) => {
  workflow.subtask('babel:app', () =>
    gulp
      .src([
        `${config.dirs.app.root}/**/*.{js,jsx}`,
        `!${config.dirs.app.root}/**/*.spec.*`,
      ])
      .pipe($.babel())
      .pipe(gulp.dest(config.dirs.dist.app))
  );

  workflow.subtask('babel:server', () =>
    gulp
      .src([
        `${config.dirs.server.root}/**/*.{js,jsx}`,
        `!${config.dirs.server.tests}`,
      ])
      .pipe($.babel())
      .pipe(gulp.dest(config.dirs.dist.server))
  );
};
