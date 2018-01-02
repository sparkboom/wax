// @flow

import {TOGGLE_SELECTION, REMOVE_SELECTION} from './action-types';
import includes from 'lodash/includes';
import range from 'lodash/range';
import filter from 'lodash/filter';
import type {SVGState, Command, SVGAction} from './types';

const initialState:SVGState = {
  items: [],
  selection: [],
}

type CommandReducer = (SVGState, Command) => SVGState;
const executeCommandReducer:CommandReducer = (state = initialState, command) => {
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
        items: filter(state.items, (item:mixed, i:number) => !includes(state.selection, i)),
        selection: [],
      };
    case 'clearother':
      return {
        ...state,
        items: filter(state.items, (item:mixed, i:number) => includes(state.selection, i)),
        selection: [],
      };
    case 'selectall':
      return {
        ...state,
        selection: range(0, state.items.length),
      };
    case 'unselectall':
      return {
        ...state,
        selection: [],
      };
    default:
      return state;
  }

};

type SVGReducer = (SVGState, SVGAction) => SVGState;
const svgReducer:SVGReducer = (state = initialState, action:SVGAction) => {
  switch (action.type) {

    case 'APP:EXECUTE_COMMAND':
      return executeCommandReducer(state, action.command);

    case TOGGLE_SELECTION:
      let selection;
      if (action.metaKey){
        selection = includes(state.selection, action.id)? filter(state.selection, s => s!==action.id): [...state.selection, action.id];
      } else if (state.selection.length>1) {
        selection = [action.id];
      } else {
        selection = includes(state.selection, action.id)? []: [action.id];
      }

      return {
        ...state,
        selection,
      };
    case REMOVE_SELECTION:
      return {
        ...state,
        selection: [],
      };

    default:
      return state;
  }
};

export default svgReducer;
