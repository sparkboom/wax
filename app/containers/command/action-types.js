// @flow
import type {TextChangeActionType, SetSelectionActionType, CompletePredictionActionType, RemoveTokensActionType} from './types';

export const TEXT_CHANGE:TextChangeActionType = 'COMMAND:TEXT_CHANGE';
export const SET_SELECTION:SetSelectionActionType = 'COMMAND:SET_SELECTION';
export const COMPLETE_PREDICTION:CompletePredictionActionType = 'COMMAND:COMPLETE_PREDICTION';
export const REMOVE_TOKENS:RemoveTokensActionType = 'COMMAND:REMOVE_TOKENS';
