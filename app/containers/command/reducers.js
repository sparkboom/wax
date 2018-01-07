import {CHANGE_TEXT, SET_SELECTION, CREATE_TOKEN, REMOVE_TOKENS} from './action-types';
import {insert} from 'underscore.string';
import {CommandAction} from './actions';
import type {CommandState} from './types';
import includes from 'lodash/includes';
import filter from 'lodash/filter';

// Types
type ConfineType = (number, number, number) => number;

//
const initialState : CommandState = {
  text : '',
  selection : {
    start: 0,
    length: 0,
  },
  tokens: [],
};

const confine:ConfineType= (val, min, max) => Math.max(Math.min(val, max), min);

export default (state:CommandState = initialState, action:CommandAction) : CommandState => {
  switch (action.type) {
    case CHANGE_TEXT:
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
    case CREATE_TOKEN:
      return {
        ...state,
        text: '',
        selection: {
          start: 0,
          length: 0,
        },
        tokens: [
          ...state.tokens, {
            action: action.action,
            command: action.command,
          }
        ]
      }
    case REMOVE_TOKENS:
      let tokens = action.tokenIndexes? filter(state.tokens, (t,i) => !includes(action.tokenIndexes, i))  : [];
      return {
        ...state,
        tokens,
      }
    default:
      (action: empty);
      return state;
  }
};
