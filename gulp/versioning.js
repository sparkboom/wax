module.exports = (workflow, gulp, $, config) => {
  workflow.subtask('versioning:hash', () => {
    if (config.optimise) {
      return gulp
        .src(`${config.dirs.dist.root}/static/**/*`)
        .pipe($.if(config.optimise, $.rev()))
        .pipe(gulp.dest(`${config.dirs.dist.root}/static`))
        .pipe($.if(config.optimise, $.rev.manifest()))
        .pipe(gulp.dest(config.dirs.dist.root));
    }

    return true;
  });

  workflow.subtask('versioning:update', () => {
    if (config.optimise) {
      return gulp
        .src(`${config.dirs.dist.root}/**/*`)
        .pipe($.revReplace({
          manifest: gulp.src(`${config.dirs.dist.root}/rev-manifest.json`)
        }))
        .pipe(gulp.dest(config.dirs.dist.root));
    }

    return true;
  });
};
