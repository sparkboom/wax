import * as React from 'react';
import {Width, Height, Radius} from './constants';
import RegularPolygon from './regular-polygon';
import styled from 'styled-components';

export const Square = ({layout, ...props}) => (<rect width={Width} height={Height} {...props} />);
export const Triangle = ({layout, ...props}) => (<RegularPolygon vertexCount="3" {...props} />);
export const Circle = ({layout, ...props}) => {
  return (<circle cx={Radius} cy={Radius} r={Radius-1} {...props} />)
};
const _Shape =({shape, ...props}) => {
  const map = {
    'square' : Square,
    'triangle' : Triangle,
    'circle' : Circle,
  };
  return map[shape](props) || null;
};


const StyledShape = styled(_Shape)`
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

const NameText = styled('text')`
  fill: #DDAABB;
  font-family: ${props => props.theme.fontFamily};
  font-weight: 100;
  font-size: 12px;
  alignment-baseline: middle;
  text-anchor: middle;
`;


export const Shape = ({layout, ...props}) => (
<svg {...layout.getNextCoords()} width={Width} height={Height+22} >
  <NameText x="50%" y={Height+10}>{props.shape}</NameText>
  <StyledShape {...props} />
</svg>);
