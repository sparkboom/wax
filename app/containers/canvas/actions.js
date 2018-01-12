// @flow

import * as ActionTypes from './action-types';
import type {Node} from './types';

// Types

export type CreateNode = {+type:typeof ActionTypes.CreateNode, +node:Node};
export type Union =
  | CreateNode

// Code

export const createNode:Node=>CreateNode = node => Object.freeze({type:ActionTypes.CreateNode, node});
