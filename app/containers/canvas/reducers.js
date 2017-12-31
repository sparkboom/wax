import {EXECUTE_COMMAND} from '../app/action-types';
import {TOGGLE_SELECTION} from './action-types';
import type {CanvasState} from './types';
import includes from 'lodash/includes';

const initialState : CanvasState = {
  items: [],
  selection: [],
}

const executeCommandReducer = (state = initialState, command) => {
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
  switch (action.type) {
    case EXECUTE_COMMAND:
      return executeCommandReducer(state, action.command);
    case TOGGLE_SELECTION:
      let unsetId = includes(state.selection, action.id);
      return {
        ...state,
        selection: unsetId? [] : [action.id],
      };
    default:
      (action: empty);
      return state;
  }

};
