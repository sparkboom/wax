module.exports = (workflow, gulp, $, config) => {
  workflow.subtask('copy:config', () =>
    gulp
      .src(`${config.dirs.root}/appsettings.json`)
      .pipe(gulp.dest(config.dirs.dist.root))
  );

  workflow.subtask('copy:npmrc', () =>
    gulp
      .src(`${config.dirs.root}/.npmrc`)
      .pipe(gulp.dest(config.dirs.dist.root))
  );

  workflow.subtask('copy:templates', () =>
    gulp
      .src(`${config.dirs.server.templates}/**`)
      .pipe(gulp.dest(`${config.dirs.dist.server}/templates`))
  );

  workflow.subtask('copy:fonts', () =>
    gulp
      .src(`${config.dirs.app.assets}/**`)
      .pipe(gulp.dest(config.dirs.dist.static))
  );

  workflow.subtask('copy:package_json', () =>
    gulp
      .src(`${config.dirs.root}/package.json`)
      .pipe(gulp.dest(config.dirs.dist.root))
  );

  workflow.subtask('copy:images', () =>
    gulp
      .src([
        `${config.dirs.app.root}/images/**`,
        `${config.dirs.app.root}/iapl/**/images/**`
      ])
      .pipe(gulp.dest(`${config.dirs.dist.static}/images`))
  );

  workflow.subtask('copy:output', () =>
    gulp
      .src(`${config.dirs.dist.root}/**`)
      .pipe(gulp.dest('../../output/AdStudio.LeadAnalytics.Web'))
  );

  workflow.subtask('copy:iis', () =>
    gulp
      .src(`${config.dirs.iis.root}/**`)
      .pipe(gulp.dest(config.dirs.dist.root))
  );
};
