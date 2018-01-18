// @flow

import type {CreateItemActionType} from '../../shared/types';

export const InputChange:'COMMAND:INPUT_CHANGE' = 'COMMAND:INPUT_CHANGE';
export const SetSuggestion:'COMMAND:SET_SUGGESTION' = 'COMMAND:SET_SUGGESTION';
export const SetTokens:'COMMAND:SET_TOKENS' = 'COMMAND:SET_TOKENS';
export const FilterTokens:'COMMAND:FILTER_TOKENS' = 'COMMAND:FILTER_TOKENS';
export const LoadApi:'COMMAND:LOAD_API' = 'COMMAND:LOAD_API';
export const UnloadApi:'COMMAND:UNLOAD_API' = 'COMMAND:UNLOAD_API';
export const CreateObject:CreateItemActionType = 'ALL:CREATE_ITEM';

export type Union =
  | typeof SetTokens
  | typeof FilterTokens
  | typeof LoadApi
  | typeof UnloadApi
  | typeof CreateObject
  | typeof InputChange
  | typeof SetSuggestion;
