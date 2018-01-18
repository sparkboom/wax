// @flow

import type {CreateItemActionType} from '../../shared/types';

// Code

export const CreateNode:CreateItemActionType = 'ALL:CREATE_ITEM';
export const SelectNode:'CANVAS:SELECT_NODE' = 'CANVAS:SELECT_NODE';

// Types

export type Union =
 | typeof SelectNode
 | typeof CreateNode;
