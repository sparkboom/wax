// @flow
import {TOGGLE_SELECTION} from './action-types';
import type {ToggleSelectionAction} from './types';

export const toggleSelection:((number, boolean) => ToggleSelectionAction) = (id, metaKey) => ({type:TOGGLE_SELECTION, id, metaKey});
