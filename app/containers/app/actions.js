// @flow

import * as ActionTypes from './action-types';
import type {Command, Node} from './types';

// Types

type Commands = Array<Command>
export type ExecuteCommand = {+type:typeof ActionTypes.ExecuteCommand , +commands:Commands };
export type GlobalError = {+type:typeof ActionTypes.GlobalError};
export type ThrowError = {+type:typeof ActionTypes.ThrowError, +error:Error};
export type CreateNode = {+type:typeof ActionTypes.CreateNode, +node:Node};
export type Union =
  | ExecuteCommand
  | GlobalError
  | ThrowError
  | CreateNode

// Code

export const executeCommand:Commands=>ExecuteCommand = commands => Object.freeze({type:ActionTypes.ExecuteCommand, commands});
export const globalError:(()=>GlobalError) = () => Object.freeze({type:ActionTypes.GlobalError});
export const throwError:Error=>ThrowError = error => Object.freeze({type:ActionTypes.ThrowError, error});
export const createNode:Node=>CreateNode = node => Object.freeze({type:ActionTypes.CreateNode, node});
