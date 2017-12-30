// @flow
import {TEXT_CHANGE, SET_SELECTION, COMPLETE_PREDICTION} from './action-types';
import type {TextChangeAction, SetSelectionAction, CompletePredictionAction} from './types';

export const textChange:(string => TextChangeAction) = text => ({type:TEXT_CHANGE, text});
export const selectionChange:((number, number) => SetSelectionAction) = (start, length) => ({type:SET_SELECTION, start, length});
export const completePrediction:(string => CompletePredictionAction) = prediction => ({type:COMPLETE_PREDICTION, prediction});
