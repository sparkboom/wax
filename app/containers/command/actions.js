import {INPUT_CHANGE, INPUT_SET, INPUT_INSERT, INPUT_REPLACE, MOVE_CARET, SET_CARET} from './action-types';

export type CaretDirection = 'left' | 'right';
type InputChangeAction = {type: INPUT_CHANGE, inputText: string };
type InputSetAction = {type: INPUT_SET, inputText: string };
type InputInsertAction = {type: INPUT_SET, inputText: string };
type InputReplaceAction = {type: INPUT_REPLACE, replaceStr: string, index: number, length : number };
type MoveCaretAction = {type: MOVE_CARET, direction: CaretDirection };
type SetCaretAction = {type: SET_CARET, index: number };

export type CommandAction =
  | InputChangeAction
  | InputSetAction
  | InputInsertAction
  | InputReplaceAction
  | MoveCaretAction
  | SetCaretAction;

export function inputChange(inputText:string) : InputChangeAction {
  return {type: INPUT_CHANGE, inputText};
}
export const inputSet = (inputText: string) => ({type: INPUT_SET, inputText} : InputSetAction);
export const inputInsert = (char: string) => ({type: INPUT_INSERT, char} : InputInsertAction);
export const inputReplace = (replaceStr : string, index : number, length : number) => ({type: INPUT_REPLACE, replaceStr, index, length} : InputReplaceAction);
export const moveCaret = (direction : CaretDirection) => ({type: MOVE_CARET, direction} : MoveCaretAction);
export const setCaret = (index : number) => ({type: SET_CARET, index} : SetCaretAction);
