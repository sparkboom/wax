import {INPUT_CHANGE, INPUT_SET} from './constants';

export const inputChange = inputText => ({type: INPUT_CHANGE, inputText});
export const inputSet = inputText => ({type: INPUT_SET, inputText});
