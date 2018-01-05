// @flow
import type {ChangeTextActionType, SetSelectionActionType, CompletePredictionActionType, RemoveTokensActionType} from './types';

export const CHANGE_TEXT:ChangeTextActionType = 'COMMAND:CHANGE_TEXT';
export const SET_SELECTION:SetSelectionActionType = 'COMMAND:SET_SELECTION';
export const COMPLETE_PREDICTION:CompletePredictionActionType = 'COMMAND:COMPLETE_PREDICTION';
export const REMOVE_TOKENS:RemoveTokensActionType = 'COMMAND:REMOVE_TOKENS';
