// @flow
import {addAction} from '../actions';

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
