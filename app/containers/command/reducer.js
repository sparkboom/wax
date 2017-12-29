import {TEXT_CHANGE, SET_SELECTION} from './action-types';
import {insert} from 'underscore.string';
import {CommandAction} from './actions';
import type {CaretDirection} from './actions';

type CommandState = {
  +text : string,
  +selection : {
    start : number,
    length : number,
  },
};

const initialState : CommandState = {
  text : '',
  selection : {
    start: 0,
    end: 0
  }
};

const confine : (number, number, number) => number = (val, min, max) => Math.max(Math.min(val, max), min);

export default (state : CommandState = initialState, action : CommandAction) : CommandState => {
  switch (action.type) {
    case TEXT_CHANGE:
      return {
        ...state,
        text: action.text,
        selection : {
          start: action.text.length,
          length: 0
        }
      }
    case SET_SELECTION:
      return {
        ...state,
        selection : {
          start: confine( action.start, 0, state.text.length),
          length: confine( action.length, 0, state.text.length-action.start)
        }
      }
    default:
      (action: empty);
      return state;
  }
};
