// @flow

import * as ActionTypes from './action-types';
import * as Types from './types';

type Tokens = Array<Types.Token>;
export type SetTokens = {type:typeof ActionTypes.SetTokens , tokens:Tokens};
export const setTokens:Tokens=>SetTokens = tokens => Object.freeze({type:ActionTypes.SetTokens, tokens});

type Match = {};
export type FilterTokens = {type:typeof ActionTypes.FilterTokens, match:Match};
export const filterTokens:Match=>FilterTokens = match => Object.freeze({type:ActionTypes.FilterTokens, match});

export type Union =
  | SetTokens
  | FilterTokens;
