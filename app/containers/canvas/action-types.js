// @flow

import type {CreateItemActionType} from '../../shared/types';

// Code

export const CreateNode:CreateItemActionType = 'ALL:CREATE_ITEM';
export const SelectNode:'CANVAS:SELECT_NODE' = 'CANVAS:SELECT_NODE';
export const SelectParent:'CANVAS:SELECT_PARENT' = 'CANVAS:SELECT_PARENT';
export const SelectRoot:'CANVAS:SELECT_ROOT' = 'CANVAS:SELECT_ROOT';
export const Deselect:'CANVAS:DESELECT' = 'CANVAS:DESELECT';
export const SelectChildren:'CANVAS:SELECT_CHILDREN' = 'CANVAS:SELECT_CHILDREN';
export const SelectAll:'CANVAS:SELECT_ALL' = 'CANVAS:SELECT_ALL';

// Types

export type Union =
 | typeof SelectNode
 | typeof CreateNode
 | typeof SelectParent
 | typeof SelectRoot
 | typeof SelectChildren
 | typeof SelectAll;
