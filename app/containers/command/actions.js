// @flow
import {CHANGE_TEXT, SET_SELECTION, COMPLETE_PREDICTION, REMOVE_TOKENS} from './action-types';
import type {ChangeTextAction, SetSelectionAction, CompletePredictionAction, RemoveTokensAction} from './types';

export const textChange:(string => ChangeTextAction) = text => ({type:CHANGE_TEXT, text});
export const selectionChange:((number, number) => SetSelectionAction) = (start, length) => ({type:SET_SELECTION, start, length});
export const completePrediction:(string => CompletePredictionAction) = prediction => ({type:COMPLETE_PREDICTION, prediction});
export const removeTokens:(() => RemoveTokensAction) = () => ({type:REMOVE_TOKENS});
