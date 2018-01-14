// @flow

import * as ActionTypes from './action-types';
import type {Instruction} from './types';

// Types

type Instructions = Array<Instruction>
export type ExecuteInstructions = {+type:typeof ActionTypes.ExecuteInstructions , +instructions:Instructions };
export type Init = {+type:typeof ActionTypes.Init};
export type GlobalError = {+type:typeof ActionTypes.GlobalError};
export type ThrowError = {+type:typeof ActionTypes.ThrowError, +error:Error};

export type Union =
  | ExecuteInstructions
  | GlobalError
  | ThrowError
  | Init;

// Code

export const executeInstructions:Instructions=>ExecuteInstructions = instructions => ({type:ActionTypes.ExecuteInstructions, instructions});
export const init:()=>Init = () => ({type:ActionTypes.Init});
export const globalError:(()=>GlobalError) = () => ({type:ActionTypes.GlobalError});
export const throwError:Error=>ThrowError = error => ({type:ActionTypes.ThrowError, error});
