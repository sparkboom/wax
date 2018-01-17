// @flow

export const SetTokens:'COMMAND:SET_TOKENS' = 'COMMAND:SET_TOKENS';
export const FilterTokens:'COMMAND:FILTER_TOKENS' = 'COMMAND:FILTER_TOKENS';
export const LoadApi:'COMMAND:LOAD_API' = 'COMMAND:LOAD_API';
export const UnloadApi:'COMMAND:UNLOAD_API' = 'COMMAND:UNLOAD_API';
export const CreateObject:'COMMAND:CREATE_OBJECT' = 'COMMAND:CREATE_OBJECT';
export const CreateMethod:'COMMAND:CREATE_METHOD' = 'COMMAND:CREATE_METHOD';

export type Union =
  | typeof SetTokens
  | typeof FilterTokens
  | typeof LoadApi
  | typeof UnloadApi
  | typeof CreateObject
  | typeof CreateMethod;
