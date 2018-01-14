// @flow

export const SetTokens:'COMMAND:SET_TOKENS' = 'COMMAND:SET_TOKENS';
export const FilterTokens:'COMMAND:FILTER_TOKENS' = 'COMMAND:FILTER_TOKENS';
export const RegisterMethods:'COMMAND:REGISTER_METHODS' = 'COMMAND:REGISTER_METHODS';
export const DeregisterMethods:'COMMAND:DEREGISTER_METHODS' = 'COMMAND:DEREGISTER_METHODS';

export type Union =
  | typeof SetTokens
  | typeof FilterTokens
  | typeof RegisterMethods
  | typeof DeregisterMethods;
