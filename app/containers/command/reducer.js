import {INPUT_CHANGE, INPUT_INSERT, MOVE_CARET} from './constants';
import {insert} from 'underscore.string';

const initialState = {
  currentInput : '',
  caretIndex : 0,
};

const confine = (val, min, max) => Math.max(Math.min(val, max), min);
const moveCaretDelta = d => ({left: -1, right:1}[d]);

export default(state = initialState, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {...state, currentInput: action.inputText, caretIndex: action.inputText.length}
    case INPUT_INSERT:
      return {...state, currentInput: insert(state.currentInput, action.char, state.caretIndex), caretIndex: state.caretIndex + 1}
    case MOVE_CARET:
      return {...state, caretIndex: confine( state.caretIndex + moveCaretDelta(action.direction), 0, state.currentInput.length)}
    default:
      return state;
  }
};
