// @flow

// Code

export const CreateNode:'CANVAS:CREATE_NODE' = 'CANVAS:CREATE_NODE';
export const SetSelection:'CANVAS:SET_SELECTION' = 'CANVAS:SET_SELECTION';

// Types

export type Union =
 | typeof CreateNode
 | typeof SetSelection;
