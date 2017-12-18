module.exports = (workflow, gulp, $, config) => {
  workflow.subtask('dependencies',
    $.shell.task('yarn install --prod', {
      cwd: config.dirs.dist.root
    }));
};
