import { push } from 'react-router-redux';
import { history, navigateTo } from '../index';

jest.mock('history/createBrowserHistory', () => jest.fn(() => ({
  location: {
    pathname: '/some/path',
    query: {
      key: 'value',
    },
  }
})));
jest.mock('react-router-redux');

describe('History', () => {

  test('should export a new browser history object', () => {
    expect(history).toEqual({
      location: {
        pathname: '/some/path',
        query: {
          key: 'value',
        },
      }
    });
  });

  describe('when navigating to a new page', () => {

    beforeEach(() => {
      push.mockReturnValue('pushAction');
    });

    test('it returns a push action with the current and new location merged', () => {
      const res = navigateTo({
        location: {
          pathname: '/somewhere/only/we/know',
          query: {
            keane: 'Hopes and Fears',
            robbie: undefined,
          },
        }
      });

      expect(push).toHaveBeenCalledWith({
        pathname: '/somewhere/only/we/know',
        query: {
          keane: 'Hopes and Fears',
          key: 'value',
        },
      });
      expect(res).toBe('pushAction');
    });
  });
});
