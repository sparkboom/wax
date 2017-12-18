import path from 'path';

module.exports = (server) => {
  server.route({
    method: 'GET',
    path: '/static/{file*}',
    handler(request, reply) {
      return reply
        .file(request.params.file, {
          confine: path.resolve(__dirname, '../../static'),
          etagMethod: false
        })
        .header('Cache-Control', 'public, max-age=315360000');
    },
  });
};
