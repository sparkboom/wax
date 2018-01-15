// @flow

import * as ActionTypes from './action-types';
import * as Types from './types';

// Types

type Tokens = Array<Types.Token>;
type Match = {};

export type SetTokens = {type:typeof ActionTypes.SetTokens , tokens:Tokens};
export type FilterTokens = {type:typeof ActionTypes.FilterTokens, match:Match};
export type LoadApi = {type:typeof ActionTypes.LoadApi, api:Types.Api};
export type UnloadApi = {type:typeof ActionTypes.UnloadApi, apiKey:string};
export type CreateObject = {type:typeof ActionTypes.LoadApi, objectKey:string, interfaceKeys:Array<string>};

export type Union =
  | SetTokens
  | FilterTokens
  | LoadApi
  | UnloadApi
  | CreateObject;

  // Code

  export const setTokens:Tokens=>SetTokens = tokens => ({type:ActionTypes.SetTokens, tokens});
  export const filterTokens:Match=>FilterTokens = match => ({type:ActionTypes.FilterTokens, match});
  export const unloadApi:string=>UnloadApi = apiKey => ({type:ActionTypes.UnloadApi, apiKey});
  export const loadApi:Types.Api=>LoadApi = api => ({type:ActionTypes.LoadApi, api});
  export const createObject:Types.Object=>CreateObject = ({objectKey, interfaceKeys}) => ({type:ActionTypes.LoadApi, objectKey, interfaceKeys});
