// @flow

// Code

export const ExecuteInstructions:'APP:EXECUTE_INSTRUCTIONS' = 'APP:EXECUTE_INSTRUCTIONS';
export const Init:'APP:INIT' = 'APP:INIT';
export const CreateItem:'APP:CREATE_ITEM' = 'APP:CREATE_ITEM';
export const GlobalError:'APP:GLOBAL_ERROR' = 'APP:GLOBAL_ERROR';
export const ThrowError:'APP:THROW_ERROR' = 'APP:THROW_ERROR';

// Types

export type Union =
  | typeof ExecuteInstructions
  | typeof GlobalError
  | typeof ThrowError
  | typeof Init
  | typeof CreateItem;
