// @flow

import * as ActionTypes from './action-types';
import * as Types from './types';

type Tokens = Array<Types.Token>;
export type SetTokens = {type:typeof ActionTypes.SetTokens , tokens:Tokens};
export const setTokens:Tokens=>SetTokens = tokens => ({type:ActionTypes.SetTokens, tokens});

type Match = {};
export type FilterTokens = {type:typeof ActionTypes.FilterTokens, match:Match};
export const filterTokens:Match=>FilterTokens = match => ({type:ActionTypes.FilterTokens, match});

export type LoadApi = {type:typeof ActionTypes.LoadApi, api:Types.Api};
export const loadApi:Types.Api=>LoadApi = api => ({type:ActionTypes.LoadApi, api});

export type UnloadApi = {type:typeof ActionTypes.UnloadApi, apiKey:string};
export const unloadApi:string=>UnloadApi = apiKey => ({type:ActionTypes.UnloadApi, apiKey});

export type Union =
  | SetTokens
  | FilterTokens
  | LoadApi
  | UnloadApi;
