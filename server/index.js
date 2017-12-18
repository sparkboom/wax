import Hapi from 'hapi';
import config from '../appsettings.json';
import routes from './routes/routes';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const server = new Hapi.Server();

const serverConfig = {
  host: config.app.host,
  port: process.env.PORT || config.app.port,
  routes: {
    log: true,
    cors: true,
    files: {
      relativeTo: __dirname
    }
  }
};

server.register([
  require('inert'),
  require('vision'),
], (err) => {
  if (err) {
    throw err;
  }

  server.views({
    engines: {
      html: require('ejs'),
    },
    relativeTo: __dirname,
    path: 'templates'
  });
});

if (!IS_PRODUCTION) {
  serverConfig.tls = {
    key: require('fs').readFileSync('./mock-server/certs/key.pem'),
    cert: require('fs').readFileSync('./mock-server/certs/cert.pem'),
  };
}


server.connection(serverConfig);

//
routes(server);

server.start()
  .then(() => {
    console.log('Server running at:', server.info.uri);
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });
