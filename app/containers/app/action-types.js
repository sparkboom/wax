// @flow

// Code

export const ExecuteCommand:'APP:EXECUTE_COMMAND' = 'APP:EXECUTE_COMMAND';
export const GlobalError:'APP:GLOBAL_ERROR' = 'APP:GLOBAL_ERROR';
export const ThrowError:'APP:THROW_ERROR' = 'APP:THROW_ERROR';

// Types

export type Union =
  | typeof ExecuteCommand
  | typeof GlobalError
  | typeof ThrowError;
