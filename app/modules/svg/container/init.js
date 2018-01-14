// @flow

import {addShape} from './actions';
import shortid from 'shortid';

// Code
export const className = 'SVG';
export const methods = [{
  className: 'SVG',
  methodName: 'addcircle',
  action: addShape('circle', null),
  key: shortid.generate(),
},{
  className: 'SVG',
  methodName: 'addsquare',
  action: addShape('square', null),
  key: shortid.generate()
},{
  className: 'SVG',
  methodName: 'addtriangle',
  action: addShape('triangle', null),
  key: shortid.generate()
}];
