import { STRATEGY_NAME as AUTH_STRATEGY } from '@salesforce-adstudio/hapi-middleware';
import { isValidPathnameOfRoute } from '../../../app/routes';
import indexRoute from '../';

jest.mock('../../../appsettings.json', () => ({
  app: {
    baseUrl: 'http://localhost',
    csrfCookieName: 'csrfTokenName',
    private: false,
  },
  skylight: {
    baseUrl: 'http://skylight.com',
    private: true,
  }
}));
jest.mock('../../utils/userPreReq', () => ({
  assign: 'user',
}));
jest.mock('../../../app/routes');

describe('Routes > Index', () => {
  let server = null;
  let routes = null;

  beforeEach(() => {
    routes = [];
    server = {
      route(cfg) {
        routes.push(cfg);
      }
    };
    indexRoute(server);
  });

  describe('GET /{path*}', () => {

    describe('Config', () => {
      it('should only support GET', () => {
        expect(routes[0].method).toBe('GET');
      });

      it('should register the path /{path*}', () => {
        expect(routes[0].path).toBe('/{path*}');
      });

      it('should include the Skylight auth handler', () => {
        expect(routes[0].config.auth).toEqual(AUTH_STRATEGY);
      });
    });

    describe('Handler', () => {

      describe('when the route is not valid', () => {

        beforeEach(() => {
          isValidPathnameOfRoute.mockReturnValue(false);
        });

        it('should return a 404 not found page', (done) => {
          routes[0].config.handler({
            auth: {
              credentials: {
                user: { name: 'Chris Pace' }
              }
            },
            headers: {
              'AdStudio-CorrelationId': '1234567890',
            },
            params: {
              path: '/invalid-path',
            },
          }, {
            view(template, data) {
              expect(template).toBe('error');
              expect(data).toEqual({
                requestId: '1234567890',
              });

              return this;
            },
            code(code) {
              expect(code).toBe(404);
              done();
            }
          });
        });
      });

      describe('when the route is valid', () => {

        beforeEach(() => {
          isValidPathnameOfRoute.mockReturnValue(true);
        });

        it('should render a view with the app configuration', (done) => {
          routes[0].config.handler({
            auth: {
              credentials: {
                user: { name: 'Chris Pace' }
              }
            },
            plugins: {
              crumb: 'csrfTokenValue'
            },
            params: {
              path: '/valid-path',
            },
          }, {
            view(template, data) {
              expect(template).toBe('index');
              expect(data).toEqual({
                config: JSON.stringify({
                  config: {
                    app: {
                      baseUrl: 'http://localhost',
                      csrfCookieName: 'csrfTokenName',
                    }
                  },
                  csrfToken: 'csrfTokenValue',
                  user: {
                    name: 'Chris Pace'
                  }
                })
              });
              done();
            }
          });
        });
      });
    });
  });
});
