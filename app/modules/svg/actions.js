// @flow

import * as ActionTypes from './action-types';
import * as Types from './types';

// Types
export type CreateShapeAction = {type:typeof ActionTypes.CreateShape, shape:string, key:?string};
export type Union =
  | CreateShapeAction;

// Code
export type CreateShapeActionCreator = (string, ?string)=>CreateShapeAction;
export const createShape:CreateShapeActionCreator = (shape, key) => ({type:ActionTypes.CreateShape, shape, key});
