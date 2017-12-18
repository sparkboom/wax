import routingReducer from './routing';
import { combineReducers } from 'redux';

export const routing = 'routing';

export default {
  routing: routingReducer,
};
