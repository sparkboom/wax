import {TEXT_CHANGE, SET_SELECTION, COMPLETE_PREDICTION, EXECUTE_ACTIONS} from './action-types';
import {insert} from 'underscore.string';
import {CommandAction} from './actions';
import type {CommandState} from './types';

const initialState : CommandState = {
  text : '',
  selection : {
    start: 0,
    end: 0
  },
  knownCommands : [ 'clear', 'square', 'triangle', 'circle' ],
  tokens: [],
};

const confine : (number, number, number) => number = (val:number, min:number, max:number) => Math.max(Math.min(val, max), min);

export default (state:CommandState = initialState, action:CommandAction) : CommandState => {
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
    case COMPLETE_PREDICTION:
      return {
        ...state,
        text: '',
        selection: {
          start: 0,
          length: 0,
        },
        tokens: [
          ...state.tokens, {
            type: 'CREATE_SHAPE',
            args: {shape: action.prediction},
          }
        ]
      }
    case EXECUTE_ACTIONS:
      return {
        ...state,
        text: '',
        selection: {
          start: 0,
          length: 0,
        },
        tokens: []
      }
    default:
      (action: empty);
      return state;
  }
};
