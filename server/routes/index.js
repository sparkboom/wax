import cloneDeep from 'lodash/cloneDeep';
import reduce from 'lodash/reduce';
import config from '../../appsettings.json';
import { isValidPathnameOfRoute } from '../../app/routes/index';

module.exports = (server) => {
  server.route({
    method: 'GET',
    path: '/{path*}', // catch-all path
    config: {
      handler: (req, reply) => {

        if(!isValidPathnameOfRoute(`/${req.params.path}`)) {
          return reply.view('error', {
            requestId: req.headers['AdStudio-CorrelationId'],
          }).code(404);
        }

        reply.view('index', {
          config: JSON.stringify({
            config: formatConfig(config),
            csrfToken: req.plugins.crumb
          })
        });
      }
    }
  });

  // server.route({
  //   method: 'GET',
  //   path: '/favicon.ico',
  //   config: {
  //     handler: (req, reply) => reply()
  //   }
  // });
};

function formatConfig(config) {
  return reduce(cloneDeep(config), (newConfig, obj, key) => {
    if (obj.private) {
      return newConfig;
    }

    delete obj.private;
    delete obj.secretKey;
    newConfig[key] = obj;

    return newConfig;
  }, {});
}
