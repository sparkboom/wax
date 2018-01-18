// @flow

import type {CreateItemAction} from '../../shared/types';
import * as ActionTypes from './action-types';
import * as Types from './types';
import shortid from 'shortid';

// Types

type Tokens = Array<Types.Token>;
type Match = {};

export type SetSuggestion = {type:typeof ActionTypes.SetSuggestion, suggestion:?Types.Suggestion};
export type InputChange = {type:typeof ActionTypes.InputChange, keycode:?string, text:string, selectStart:number, selectEnd:number};
export type SetTokens = {type:typeof ActionTypes.SetTokens , tokens:Tokens};
export type FilterTokens = {type:typeof ActionTypes.FilterTokens, match:Match};
export type LoadApi = {type:typeof ActionTypes.LoadApi, api:Types.Package};
export type UnloadApi = {type:typeof ActionTypes.UnloadApi, apiKey:string};
export type CreateObject = CreateItemAction;
type InputChangeCreator = (?string, string, number, number)=>InputChange;

export type Union =
  | SetTokens
  | FilterTokens
  | LoadApi
  | UnloadApi
  | CreateObject
  | InputChange
  | SetSuggestion;

// Code

export const inputChange:InputChangeCreator = (keycode, text, selectStart, selectEnd) => ({type:ActionTypes.InputChange, keycode, text, selectStart, selectEnd});
export const setSuggestion:?Types.Suggestion=>SetSuggestion = suggestion => ({type:ActionTypes.SetSuggestion, suggestion});
export const setTokens:Tokens=>SetTokens = tokens => ({type:ActionTypes.SetTokens, tokens});
export const filterTokens:Match=>FilterTokens = match => ({type:ActionTypes.FilterTokens, match});
export const unloadApi:string=>UnloadApi = apiKey => ({type:ActionTypes.UnloadApi, apiKey});
export const loadApi:Types.Package=>LoadApi = api => ({type:ActionTypes.LoadApi, api});
