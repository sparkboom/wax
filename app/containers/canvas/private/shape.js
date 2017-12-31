import * as React from 'react';
import {Width, Height, Radius, Style} from '../constants';
import RegularPolygon from './regular-polygon';

export const Square = ({layout, ...props}) => (<rect {...layout.getNextCoords()} width={Width} height={Height} {...Style} {...props} />);
export const Triangle = ({layout, ...props}) => (<RegularPolygon vertexCount="3" {...layout.getNextCoords()}  {...Style} {...props} />);
export const Circle = ({layout, ...props}) => (<circle {...layout.getNextCCoords()} r={Radius} {...Style} {...props} />);
export const Shape = ({shape, ...props}) => {
  const map = {
    'square' : Square,
    'triangle' : Triangle,
    'circle' : Circle,
  };
  return map[shape](props);
};
