import { LOCATION_CHANGE } from 'react-router-redux';
import { routes, getRoutePathname } from '../../routes';
import reducer, { getCurrentRouteId, INITIAL_STATE } from '../routing';
import { routing as REDUCER_KEY } from '../';

jest.mock('../../routes', () => ({
  DEFAULT: { pathname: '/a/path' },
  routes: {
    OLD_PATH: { id: 1, pathname: '/a/path' },
    NEW_PATH: { id: 2, pathname: '/b/path' },
  },
  getRoutePathname: jest.fn(),
}));

describe('Reducers > Routing', () => {

  test('it should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      location: {},
      route: routes.DEFAULT,
    });
  });

  describe('when the location changes', () => {

    let newState;

    beforeEach(() => {
      getRoutePathname.mockImplementation(k => k.pathname);

      newState = reducer(INITIAL_STATE, {
        type: LOCATION_CHANGE,
        payload: {
          pathname: '/b/path',
          search: '?query=string',
        }
      });
    });

    test('should update the location on the state', () => {
      expect(newState.location).toEqual({
        pathname: '/b/path',
        search: '?query=string',
      });
    });

    test('should set the current route based on the pathname', () => {
      expect(newState.route).toEqual(routes.NEW_PATH);
    });
  });

  it('should get the current route ID', () => {
    expect(getCurrentRouteId({
      [REDUCER_KEY]: {
        route: { id: 3, pathname: '/future/path' }
      }
    })).toBe(3);
  });
});
