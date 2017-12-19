import {INPUT_CHANGE} from './constants';

const initialState = {
  currentInput : ''
};

function inputTextReducer(state = initialState, action) {
  switch (action.type) {
    case INPUT_CHANGE:
      return {...state, currentInput: action.inputText}
    default:
      return state;
  }
}

export default inputTextReducer;
