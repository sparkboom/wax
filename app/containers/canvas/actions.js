// @flow

import * as ActionTypes from './action-types';
import * as Types from './types';
import shortid from 'shortid';

// Types

export type CreateNode = {+type:typeof ActionTypes.CreateNode, +nodeItemKey:string, +name:string, +parentNodeKey:?string, +childNodeKeys:Array<string>};
export type SelectNode = {+type:typeof ActionTypes.SelectNode, +nodeItemKeys:Array<string>};

export type CreateNodeCreator = Types.Node=>CreateNode;
export type SelectNodeCreator = Array<string>=>SelectNode;

export type Union =
  | CreateNode
  | SelectNode;

// Code

export const createNode:CreateNodeCreator = ({nodeItemKey, name, parentNodeKey, childNodeKeys}) => ({ type:ActionTypes.CreateNode, nodeItemKey, name, parentNodeKey, childNodeKeys });
export const setSelection:SelectNodeCreator = nodeItemKeys => ({ type: ActionTypes.SelectNode, nodeItemKeys });
