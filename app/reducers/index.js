import { combineReducers } from 'redux';
import routingReducer from './routing';
import commandReducer from '../containers/command/reducers';
import canvasReducer from '../containers/canvas/reducers';

export const routing = 'routing';

export default {
  routing: routingReducer,
  command: commandReducer,
  canvas: canvasReducer,
};
