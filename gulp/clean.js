import del from 'del';

module.exports = (workflow, gulp, $, config) => {
    workflow.subtask('clean:dist', () => del([config.dirs.dist.root]));
    workflow.subtask('clean:report', () => del([config.dirs.report]));
};
