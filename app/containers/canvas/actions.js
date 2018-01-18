// @flow

import * as ActionTypes from './action-types';
import * as Types from './types';
import type {CreateItemAction} from '../../shared/types';

// Types

export type CreateNode = CreateItemAction;
export type SelectNode = {+type:typeof ActionTypes.SelectNode, +nodeItemKeys:Array<string>};

export type CreateNodeCreator = Types.Node=>CreateNode;
export type SelectNodeCreator = Array<string>=>SelectNode;

export type Union =
  | CreateNode
  | SelectNode
  | CreateItemAction;

// Code

export const selectNodes:SelectNodeCreator = nodeItemKeys => ({ type: ActionTypes.SelectNode, nodeItemKeys });
