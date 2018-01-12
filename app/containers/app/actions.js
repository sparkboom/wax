// @flow

import * as ActionTypes from './action-types';
import type {Command} from './types';

// Types

type Commands = Array<Command>
export type ExecuteCommand = {+type:typeof ActionTypes.ExecuteCommand , +commands:Commands };
export type GlobalError = {+type:typeof ActionTypes.GlobalError};
export type ThrowError = {+type:typeof ActionTypes.ThrowError, +error:Error};
export type Union =
  | ExecuteCommand
  | GlobalError
  | ThrowError;

// Code

export const executeCommand:Commands=>ExecuteCommand = commands => Object.freeze({type:ActionTypes.ExecuteCommand, commands});
export const globalError:(()=>GlobalError) = () => Object.freeze({type:ActionTypes.GlobalError});
export const throwError:Error=>ThrowError = error => Object.freeze({type:ActionTypes.ThrowError, error});
