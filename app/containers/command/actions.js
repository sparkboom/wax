// @flow

import {TEXT_CHANGE, SET_SELECTION} from './action-types';
import type {TextChangeActionType, SetSelectionActionType} from './action-types';

type TextChangeAction = {type: TextChangeActionType, text: string };
type SetSelectionAction = {type: SetSelectionActionType, start: number, length: number };

export type CommandAction =
  | TextChangeAction
  | SetSelectionAction;

export const textChange = (text: string) => ({type: TEXT_CHANGE, text} : TextChangeAction);
export const selectionChange = (start : number, length: number) => ({type: SET_SELECTION, start, length} : SetSelectionAction);
