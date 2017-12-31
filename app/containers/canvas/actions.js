// @flow
import {TOGGLE_SELECTION} from './action-types';
import type {ToggleSelectionAction} from './types';

export const toggleSelection:(number => ToggleSelectionAction) = id => ({type:TOGGLE_SELECTION, id});
