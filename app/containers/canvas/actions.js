// @flow

import {TOGGLE_SELECTION, REMOVE_SELECTION} from './action-types';
import type {ToggleSelectionAction, RemoveSelectionAction} from './types';

export const toggleSelection:((number, boolean) => ToggleSelectionAction) = (id, metaKey) => ({type:TOGGLE_SELECTION, id, metaKey});
export const removeSelection:(() => RemoveSelectionAction) = () => ({type:REMOVE_SELECTION});
