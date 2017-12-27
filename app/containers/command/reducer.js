import {INPUT_CHANGE, INPUT_INSERT, INPUT_REPLACE, MOVE_CARET, SET_CARET} from './action-types';
import {insert} from 'underscore.string';
import {CommandAction} from './actions';

type CommandState = {
  +currentInput : string,
  +caretIndex : number,
};

const initialState : CommandState = {
  currentInput : '',
  caretIndex : 0,
};

const confine : (number, number, number) => number = (val, min, max) => Math.max(Math.min(val, max), min);
const moveCaretDelta : CaretDirection => -1 | 1 = (d : 'left' | 'right') : number => ({left: -1, right:1}[d]);
const insertSplice : (string, string, number, number) => string = (string, replaceStr, index, length) => string.slice(0,index) + replaceStr + string.slice(index+length);

export default (state : CommandState = initialState, action : CommandAction) : CommandState => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {...state, currentInput: action.inputText, caretIndex: action.inputText.length}
    case INPUT_INSERT:
      return {...state, currentInput: insert(state.currentInput, state.caretIndex, action.char), caretIndex: state.caretIndex + 1}
    case INPUT_REPLACE:
      return {...state, currentInput: insertSplice(state.currentInput, action.replaceStr, action.index, action.length), caretIndex: state.caretIndex - action.length + action.replaceStr.length}
    case MOVE_CARET:
      return {...state, caretIndex: confine( state.caretIndex + moveCaretDelta(action.direction), 0, state.currentInput.length)}
    case SET_CARET:
      return {...state, caretIndex: confine( action.index, 0, state.currentInput.length)}
    default:
      return state;
  }
};
