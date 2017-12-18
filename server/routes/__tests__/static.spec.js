import path from 'path';
import staticRoute from '../static';

describe('Routes > Static', () => {
  let server = null;
  let routes = null;

  beforeEach(() => {
    routes = [];
    server = {
      route: (cfg) => {
        routes.push(cfg);
      }
    };
    staticRoute(server);
  });

  describe('GET /static/*', () => {

    describe('Config', () => {

      it('should only support GET', () => {
        expect(routes[0].method).toEqual('GET');
      });

      it('should register the path /static/{file*}', () => {
        expect(routes[0].path).toEqual('/static/{file*}');
      });
    });

    describe('Handler', () => {

      let reply, headerSpy;

      beforeEach(() => {
        headerSpy = jest.fn();
        reply = {
          file: jest.fn(() => ({
            header: headerSpy,
          })),
        };
      });

      it('should reply with the requested file with the etag method switched off', () => {
        routes[0].handler({
          params: {
            file: 'file-name',
          }
        }, reply);

        expect(reply.file).toHaveBeenCalledWith('file-name', {
          confine: path.resolve(__dirname, '../../../static'),
          etagMethod: false,
        });
      });

      it('should apply a Cache-Control header with an age of 1 year', () => {
        routes[0].handler({
          params: {
            file: 'file-name',
          }
        }, reply);

        expect(headerSpy).toHaveBeenCalledWith('Cache-Control', 'public, max-age=315360000');
      });
    });
  });
});
