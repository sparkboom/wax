// @flow

// Code

export const CreateNode:'CANVAS:CREATE_NODE' = 'CANVAS:CREATE_NODE';
export const SelectNode:'CANVAS:SELECT_NODE' = 'CANVAS:SELECT_NODE';

// Types

export type Union =
 | typeof CreateNode
 | typeof SelectNode;
