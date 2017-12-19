import { combineReducers } from 'redux';
import routingReducer from './routing';
import commandReducer from '../containers/command/reducer';

export const routing = 'routing';

export default {
  routing: routingReducer,
  command: commandReducer,
};
