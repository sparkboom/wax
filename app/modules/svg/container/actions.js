// @flow

import * as ActionTypes from './action-types';
import * as Types from './types';

// Types
// export type ToggleSelectionAction = {type:ToggleSelectionActionType, id:number, metaKey: boolean};
// export type RemoveSelectionAction = {type:RemoveSelectionActionType};
export type AddShapeAction = {type:typeof ActionTypes.AddShape, shape:string};
export type SVGAction =
  | AddShapeAction;

// Code

// export const toggleSelection:((number, boolean) => ToggleSelectionAction) = (id, metaKey) => Object.freeze({type:TOGGLE_SELECTION, id, metaKey});
// export const removeSelection:(() => RemoveSelectionAction) = () => Object.freeze({type:REMOVE_SELECTION});
export const addAction:string=>AddShapeAction = shape => Object.freeze({type:ActionTypes.AddShape, shape});
