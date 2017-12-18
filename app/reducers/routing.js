import find from 'lodash/find';
import { handleActions } from 'redux-actions';
import { LOCATION_CHANGE } from 'react-router-redux';
import { createSelector } from 'reselect';
import { routes, getRoutePathname } from '../routes';
import { routing as REDUCER_KEY } from './';

const INITIAL_STATE = {
  location: {},
  route: routes.DEFAULT,
  routes,
};

export default handleActions({
  [LOCATION_CHANGE]: (state, action) => ({
    ...state,
    location: action.payload,
    route: find(routes, route => action.payload.pathname === getRoutePathname(route)),
  }),
}, INITIAL_STATE);

// this is a selector
const selectCurrentRoute = state => state[REDUCER_KEY].route;

// this is a selector
export const getCurrentRouteId = createSelector([selectCurrentRoute], (x = {}) => x.id);
