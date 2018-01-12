import { combineReducers } from 'redux';
import routingReducer from './routing';
import commandReducer from '../containers/command/reducers';
import svgReducer from '../modules/svg/container/reducers';
import appReducer from '../containers/app/reducers';

export const routing = 'routing';

export default {
  routing: routingReducer,
  command: commandReducer,
  app: appReducer,
  svg: svgReducer,
};
