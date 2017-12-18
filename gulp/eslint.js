module.exports = (workflow, gulp, $, config) => {
  workflow.subtask('eslint', () =>
    gulp
      .src([
        `${config.dirs.root}/**/*.{js,jsx}`,
        `\!${config.dirs.dist.root}{,/**}`,
      ])
      .pipe($.eslint())
      .pipe($.eslint.format())
      .pipe($.eslint.failAfterError())
  );
};
