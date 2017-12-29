// @flow

export type TextChangeActionType = 'COMMAND:TEXT_CHANGE';
export type SetSelectionActionType = 'COMMAND:SET_SELECTION';

export const TEXT_CHANGE : TextChangeActionType = 'COMMAND:TEXT_CHANGE';
export const SET_SELECTION : SetSelectionActionType = 'COMMAND:SET_SELECTION';

export type CommandActionType =
  | TextChangeActionType
  | SetSelectionActionType;
