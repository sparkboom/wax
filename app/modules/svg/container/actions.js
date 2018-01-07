// @flow

import {TOGGLE_SELECTION, REMOVE_SELECTION, ADD_SHAPE} from './action-types';
import type {ToggleSelectionAction, RemoveSelectionAction, AddShapeAction} from './types';

export const toggleSelection:((number, boolean) => ToggleSelectionAction) = (id, metaKey) => Object.freeze({type:TOGGLE_SELECTION, id, metaKey});
export const removeSelection:(() => RemoveSelectionAction) = () => Object.freeze({type:REMOVE_SELECTION});
export const addAction:string=>AddShapeAction = shape => Object.freeze({type:ADD_SHAPE, shape});
