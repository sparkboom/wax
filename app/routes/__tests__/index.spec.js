import { getRoutePathname, isValidPathnameOfRoute, routes } from '../index';

describe('Application Routes', () => {

  it('should get the pathname of a route', () => {
    expect(getRoutePathname({
      location: {
        pathname: '/a/path'
      }
    })).toBe('/a/path');
  });

  [
    { value: routes.page_one.location.pathname, expected: true },
    { value: `/proxy/${routes.page_one.location.pathname}`, expected: false },
    { value: `${routes.page_one.location.pathname}/proxy`, expected: false },
  ].forEach(o => {
    it(`should check if the pathname '${o.value}' is ${o.expected ? 'a valid' : 'an invalid'} route`, () => {
      expect(isValidPathnameOfRoute(o.value)).toBe(o.expected);
    });
  });
});
