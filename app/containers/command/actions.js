// @flow
import {TEXT_CHANGE, SET_SELECTION} from './action-types';
import type {TextChangeActionType, SetSelectionActionType, TextChangeAction, SetSelectionAction} from './types';

export const textChange:(string => TextChangeAction) = text => ({type:TEXT_CHANGE, text});
export const selectionChange:((number, number) => SetSelectionAction) = (start, length) => ({type:SET_SELECTION, start, length});
