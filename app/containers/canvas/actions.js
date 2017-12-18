import {INPUT_CHANGE} from './constants';

export const inputChange = inputText => ({type: INPUT_CHANGE, inputText});
export const inputSet = inputText => ({type: INPUT_SET, inputText});
