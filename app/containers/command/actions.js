// @flow

import {INPUT_CHANGE, INPUT_SET, INPUT_INSERT, INPUT_REPLACE, MOVE_CARET, SET_CARET} from './action-types';
import type {InputChangeActionType, InputSetActionType, InputInsertActionType, InputReplaceActionType, MoveCaretActionType, SetCaretActionType} from './action-types';

export type CaretDirection = 'left' | 'right';
type InputChangeAction = {type: InputChangeActionType, inputText: string };
type InputSetAction = {type: InputSetActionType, inputText: string };
type InputInsertAction = {type: InputInsertActionType, char: string };
type InputReplaceAction = {type: InputReplaceActionType, replaceStr: string, index: number, length : number };
type MoveCaretAction = {type: MoveCaretActionType, direction: CaretDirection };
type SetCaretAction = {type: SetCaretActionType, index: number };

export type CommandAction =
  | InputChangeAction
  | InputSetAction
  | InputInsertAction
  | InputReplaceAction
  | MoveCaretAction
  | SetCaretAction;

export const inputChange = (inputText: string) => ({type: INPUT_CHANGE, inputText} : InputChangeAction);
export const inputSet = (inputText: string) => ({type: INPUT_SET, inputText} : InputSetAction);
export const inputInsert = (char: string) => ({type: INPUT_INSERT, char} : InputInsertAction);
export const inputReplace = (replaceStr : string, index : number, length : number) => ({type: INPUT_REPLACE, replaceStr, index, length} : InputReplaceAction);
export const moveCaret = (direction : CaretDirection) => ({type: MOVE_CARET, direction} : MoveCaretAction);
export const setCaret = (index : number) => ({type: SET_CARET, index} : SetCaretAction);
