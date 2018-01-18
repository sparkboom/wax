// @flow

import * as ActionTypes from './action-types';
import * as Types from './types';
import type {CreateItemAction} from '../../shared/types';

// Types

export type CreateNode = CreateItemAction;
export type SelectNode = {+type:typeof ActionTypes.SelectNode, +nodeItemKeys:Array<string>};
export type SelectParent = {+type:typeof ActionTypes.SelectParent};
export type SelectRoot = {+type:typeof ActionTypes.SelectRoot};
export type Deselect = {+type:typeof ActionTypes.Deselect};
export type SelectChildren = {+type:typeof ActionTypes.SelectChildren};

export type CreateNodeCreator = Types.Node=>CreateNode;
export type SelectNodeCreator = Array<string>=>SelectNode;

export type Union =
  | CreateNode
  | SelectNode
  | SelectParent
  | SelectRoot
  | Deselect
  | SelectChildren;

// Code

export const selectNodes:SelectNodeCreator = nodeItemKeys => ({ type: ActionTypes.SelectNode, nodeItemKeys });
