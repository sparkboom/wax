import {INPUT_CHANGE, INPUT_SET, INPUT_INSERT, MOVE_CARET} from './constants';

export const inputChange = inputText => ({type: INPUT_CHANGE, inputText});
export const inputSet = inputText => ({type: INPUT_SET, inputText});
export const inputInsert = char => ({type: INPUT_INSERT, char});
export const moveCaret = direction => ({type: MOVE_CARET, direction});
