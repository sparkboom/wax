import * as React from 'react';
import {Width, Height, Radius} from '../constants';
import RegularPolygon from './regular-polygon';
import styled from 'styled-components';

export const Square = ({layout, ...props}) => (<rect {...layout.getNextCoords()} width={Width} height={Height} {...props} />);
export const Triangle = ({layout, ...props}) => (<RegularPolygon vertexCount="3" {...layout.getNextCoords()}  {...props} />);
export const Circle = ({layout, ...props}) => (<circle {...layout.getNextCCoords()} r={Radius} {...props} />);
const _Shape =({shape, ...props}) => {
  const map = {
    'square' : Square,
    'triangle' : Triangle,
    'circle' : Circle,
  };
  return map[shape](props);
};


export const Shape = styled(_Shape)`
  stroke: #996677;
  fill: transparent;
  stroke-width: 1;
  cursor: pointer;

  &:hover {
    stroke: #DDAABB;
  }

  &.selected {
    stroke: #EECCDD;
  }

  &.selected:hover {
    stroke: #EECCDD;
  }
`;
