// @flow
import {addShape} from '../actions';

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
  action: addShape('circle'),
},{
  command:'addsquare',
  action: addShape('square'),
},{
  command:'addtriangle',
  action: addShape('triangle'),
}];
