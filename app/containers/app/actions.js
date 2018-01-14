// @flow

import * as ActionTypes from './action-types';
import type {Command} from './types';

// Types

type Commands = Array<Command>
export type ExecuteCommand = {+type:typeof ActionTypes.ExecuteCommand , +commands:Commands };
export type Init = {+type:typeof ActionTypes.Init};
export type GlobalError = {+type:typeof ActionTypes.GlobalError};
export type ThrowError = {+type:typeof ActionTypes.ThrowError, +error:Error};

export type Union =
  | ExecuteCommand
  | GlobalError
  | ThrowError
  | Init;

// Code

export const executeCommand:Commands=>ExecuteCommand = commands => Object.freeze({type:ActionTypes.ExecuteCommand, commands});
export const init:()=>Init = () => Object.freeze({type:ActionTypes.Init});
export const globalError:(()=>GlobalError) = () => Object.freeze({type:ActionTypes.GlobalError});
export const throwError:Error=>ThrowError = error => Object.freeze({type:ActionTypes.ThrowError, error});
