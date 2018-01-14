// @flow

import * as ActionTypes from './action-types';
import type {Node} from './types';
import shortid from 'shortid';

// Types

export type CreateNode = {+type:typeof ActionTypes.CreateNode, +node:Node, +args:mixed};
//export type CreateNodeCreator = (Node, mixed)=>CreateNode;
export type Union =
  | CreateNode

// Code

const nameTally = {};

const getNameFromFamily = (family:string) => {
  if (nameTally[family]){
    nameTally[family] += 1;
  }else {
    nameTally[family] = 1;
  }
  return `${family}${nameTally[family]}`;
};

export const createNode:any = ({nodeClass, name, family, args}) => ({
  type:ActionTypes.CreateNode,
  node: {
    key:shortid.generate(),
    name: name || getNameFromFamily(family),
    nodeClass,
  },
  args
});
