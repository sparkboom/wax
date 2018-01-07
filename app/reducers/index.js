import { combineReducers } from 'redux';
import routingReducer from './routing';
import commandReducer from '../containers/command/reducers';
import svgReducer from '../modules/svg/container/reducers';

console.log('svgReducer', svgReducer);

export const routing = 'routing';

export default {
  routing: routingReducer,
  command: commandReducer,
  svg: svgReducer,
};
