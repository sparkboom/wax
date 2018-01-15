// @flow

import * as ActionTypes from './action-types';
import * as Types from './types';
import shortid from 'shortid';

// Types

export type CreateNode = {+type:typeof ActionTypes.CreateNode, +nodeKey:string, +name:string, +parentNodeKey:?string, +childNodeKeys:Array<string>};
export type SetSelection = {+type:typeof ActionTypes.SetSelection, +nodeKeys:Array<string>};

export type CreateNodeCreator = Types.Node=>CreateNode;
export type SetSelectionCreator = Array<string>=>SetSelection;

export type Union =
  | CreateNode
  | SetSelection;

// Code

export const createNode:CreateNodeCreator = ({nodeKey, name, parentNodeKey, childNodeKeys}) => ({ type:ActionTypes.CreateNode, nodeKey, name, parentNodeKey, childNodeKeys });
export const setSelection:SetSelectionCreator = nodeKeys => ({ type: ActionTypes.SetSelection, nodeKeys });
