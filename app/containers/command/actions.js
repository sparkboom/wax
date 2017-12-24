import {INPUT_CHANGE, INPUT_SET, INPUT_INSERT, INPUT_REPLACE, MOVE_CARET, SET_CARET} from './constants';

export const inputChange = inputText => ({type: INPUT_CHANGE, inputText});
export const inputSet = inputText => ({type: INPUT_SET, inputText});
export const inputInsert = char => ({type: INPUT_INSERT, char});
export const inputReplace = (replaceStr, index, length) => ({type: INPUT_REPLACE, replaceStr, index, length});
export const moveCaret = direction => ({type: MOVE_CARET, direction});
export const setCaret = index => ({type: SET_CARET, index});
