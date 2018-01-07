// @flow

import {TOGGLE_SELECTION, REMOVE_SELECTION} from './action-types';
import type {ToggleSelectionAction, RemoveSelectionAction} from './types';

export const toggleSelection:((number, boolean) => ToggleSelectionAction) = (id, metaKey) => Object.freeze({type:TOGGLE_SELECTION, id, metaKey});
export const removeSelection:(() => RemoveSelectionAction) = () => Object.freeze({type:REMOVE_SELECTION});
