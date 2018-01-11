// @flow

export const SetTokens:'COMMAND:SET_TOKENS' = 'COMMAND:SET_TOKENS';
export const FilterTokens:'COMMAND:FILTER_TOKENS' = 'COMMAND:FILTER_TOKENS';

export type Union =
  | typeof SetTokens
  | typeof FilterTokens;
