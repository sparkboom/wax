module.exports = (workflow, gulp, $, config) => {
  workflow.subtask('watch:app', () => {
    gulp.watch(`${config.dirs.app.root}/**/*.{js,jsx}`, ['build:app', 'babel:app']);
    gulp.watch(`${config.dirs.app.root}/**/*.scss`, ['build:app:css']);
  });

  workflow.subtask('watch:server', () => $.nodemon({
    restartable: 'rs',
    verbose: true,
    script: 'dist/server/index.js',
    watch: ['app/', 'config/', 'server/', 'static/'],
    ignore: ['**/*.spec.js'],
    ext: 'js json html json5',
    tasks: ['build:server'],
    delay: 1000,
    env: {
      NODE_ENV: 'development'
    }
  }));
};
