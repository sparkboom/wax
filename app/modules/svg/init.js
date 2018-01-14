// @flow

import {createNode} from '../../containers/canvas/actions';
import shortid from 'shortid';

// Code
export const className = 'SVG';
export const methods = [{
  className: 'SVG',
  methodName: 'addcircle',
  action: createNode({nodeClass: 'SVG:SHAPE', family: 'circle', args: {shape:'circle'}}),
  key: shortid.generate(),
},{
  className: 'SVG',
  methodName: 'addsquare',
  action: createNode({nodeClass: 'SVG:SHAPE', family: 'square', args: {shape:'square'}}),
  key: shortid.generate()
},{
  className: 'SVG',
  methodName: 'addtriangle',
  action: createNode({nodeClass: 'SVG:SHAPE', family: 'triangle', args: {shape:'triangle'}}),
  key: shortid.generate()
}];
