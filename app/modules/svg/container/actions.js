// @flow

import * as ActionTypes from './action-types';
import * as Types from './types';

// Types
export type AddShapeAction = {type:typeof ActionTypes.AddShape, shape:string, key:?string};
export type Union =
  | AddShapeAction;

// Code
export type AddShapeActionCreator = (string, ?string)=>AddShapeAction;
export const addShape:AddShapeActionCreator = (shape, key) => Object.freeze({type:ActionTypes.AddShape, shape, key});
