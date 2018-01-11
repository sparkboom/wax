// @flow
import {addAction} from '../actions';

// Types

export type WaxFunction = {
  command:string,
  action: {
    type:string,
  }
}

// Code

export const waxFunctions = [{
  command:'addcircle',
  action: addAction('circle'),
},{
  command:'addsquare',
  action: addAction('square'),
},{
  command:'addtriangle',
  action: addAction('triangle'),
}];
