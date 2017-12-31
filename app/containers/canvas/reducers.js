import {EXECUTE_COMMAND} from '../app/action-types';
import type {CanvasState} from './types';

const initialState : CanvasState = {
  items: [],
}

const executeCommandReducer = (state = initialState, command) => {
  console.log('executeCommandReducer canvas action', command);
  switch (command.shape) {
    case 'square':
    case 'triangle':
    case 'circle':
      return {
        ...state,
        items: [...state.items, {shape:command.shape}],
      };
    case 'clear':
      return {
        ...state,
        items: [],
      };
    default:
      (command: empty);
      return state;
  }

};

export default (state = initialState, action) => {
  console.log('canvas action', action, EXECUTE_COMMAND);

  switch (action.type) {
    case EXECUTE_COMMAND:
      return executeCommandReducer(state, action.command);
    default:
      (action: empty);
      return state;
  }

};
