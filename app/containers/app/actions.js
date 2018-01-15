// @flow

import * as ActionTypes from './action-types';
import * as Types from './types';
import shortid from 'shortid';

// Types

type Instructions = Array<Types.Instruction>

export type Init = {+type:typeof ActionTypes.Init};
export type CreateItem = {+type:typeof ActionTypes.CreateItem, +itemKey:string, +node:Types.NodeItem, +object:Types.ObjectItem, +item:Types.Item};
export type ExecuteInstructions = {+type:typeof ActionTypes.ExecuteInstructions , +instructions:Instructions };
export type GlobalError = {+type:typeof ActionTypes.GlobalError};
export type ThrowError = {+type:typeof ActionTypes.ThrowError, +error:Error};

type InitCreator = () => Init;
type CreateItemCreator = (Types.NodeItem, Types.ObjectItem, Types.Item) => CreateItem;
type ExecuteInstructionsCreator = Instructions=>ExecuteInstructions;
type GlobalErrorCreator = ()=>GlobalError;
type ThrowErrorCreator = Error=>ThrowError;

export type Union =
  | ExecuteInstructions
  | GlobalError
  | ThrowError
  | Init
  | CreateItem;

// Code

export const init:InitCreator = () => ({type:ActionTypes.Init});
export const createItem:CreateItemCreator = (node, object, item) => ({type:ActionTypes.CreateItem, itemKey: shortid.generate(), node, object, item});
export const executeInstructions:ExecuteInstructionsCreator = instructions => ({type:ActionTypes.ExecuteInstructions, instructions});
export const globalError:GlobalErrorCreator = () => ({type:ActionTypes.GlobalError});
export const throwError:ThrowErrorCreator = error => ({type:ActionTypes.ThrowError, error});
