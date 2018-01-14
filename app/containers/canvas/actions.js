// @flow

import * as ActionTypes from './action-types';
import type {Node} from './types';
import shortid from 'shortid';

// Types

export type CreateNode = {+type:typeof ActionTypes.CreateNode, +node:Node, +args:mixed};
export type CreateNodeCreator = any=>CreateNode;
export type SetSelection = {+type:typeof ActionTypes.SetSelection, +nodeKeys:Array<string>};
export type Union =
  | CreateNode
  | SetSelection;

// Code - Helpers

const nameTally = {};

const getNameFromFamily = (family:string) => {
  if (nameTally[family]){
    nameTally[family] += 1;
  }else {
    nameTally[family] = 1;
  }
  return `${family}${nameTally[family]}`;
};

// Code - Actions

export const createNode:CreateNodeCreator = ({nodeClass, name, family, args}) => ({
  type:ActionTypes.CreateNode,
  node: {
    key:shortid.generate(),
    name: name || getNameFromFamily(family),
    nodeClass,
  },
  args
});

export const setSelection:Array<string>=>SetSelection = nodeKeys => ({
  type: ActionTypes.SetSelection,
  nodeKeys,
});
