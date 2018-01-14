// @flow

import * as ActionTypes from './action-types';
import * as Types from './types';

type Tokens = Array<Types.Token>;
export type SetTokens = {type:typeof ActionTypes.SetTokens , tokens:Tokens};
export const setTokens:Tokens=>SetTokens = tokens => ({type:ActionTypes.SetTokens, tokens});

type Match = {};
export type FilterTokens = {type:typeof ActionTypes.FilterTokens, match:Match};
export const filterTokens:Match=>FilterTokens = match => ({type:ActionTypes.FilterTokens, match});

export type RegisterMethods = {type:typeof ActionTypes.RegisterMethods, className:string, methods:Array<Types.Method>};
export type RegisterMethodsCreator = (string, Array<Types.Method>)=>RegisterMethods;
export const registerMethods:RegisterMethodsCreator = (className, methods) => ({type:ActionTypes.RegisterMethods, className, methods});

export type DeregisterMethods = {type:typeof ActionTypes.DeregisterMethods, methodKeys:Array<string>};
export type DeregisterMethodsCreator = Array<string>=>DeregisterMethods;
export const deregisterMethods:DeregisterMethodsCreator = methodKeys => ({type:ActionTypes.DeregisterMethods, methodKeys});

export type Union =
  | SetTokens
  | FilterTokens
  | RegisterMethods
  | DeregisterMethods;
