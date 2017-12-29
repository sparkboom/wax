// @flow

export type InputChangeActionType = 'COMMAND:INPUT_CHANGE';
export type InputSetActionType = 'COMMAND:INPUT_SET';
export type InputInsertActionType = 'COMMAND:INPUT_INSERT';
export type InputReplaceActionType = 'COMMAND:INPUT_REPLACE';
export type MoveCaretActionType = 'COMMAND:MOVE_CARET';
export type SetCaretActionType = 'COMMAND:SET_CARET';

export const INPUT_CHANGE : InputChangeActionType = 'COMMAND:INPUT_CHANGE';
export const INPUT_SET : InputSetActionType = 'COMMAND:INPUT_SET';
export const INPUT_INSERT : InputInsertActionType = 'COMMAND:INPUT_INSERT';
export const INPUT_REPLACE : InputReplaceActionType = 'COMMAND:INPUT_REPLACE';
export const MOVE_CARET : MoveCaretActionType = 'COMMAND:MOVE_CARET';
export const SET_CARET : SetCaretActionType = 'COMMAND:SET_CARET';

export type CommandActionType =
  | InputChangeActionType
  | InputSetActionType
  | InputInsertActionType
  | InputReplaceActionType
  | MoveCaretActionType
  | SetCaretActionType;
