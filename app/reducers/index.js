import { combineReducers } from 'redux';
import routingReducer from './routing';
import canvasReducer from '../containers/canvas/reducer';

export const routing = 'routing';

export default {
  routing: routingReducer,
  canvas: canvasReducer,
};
