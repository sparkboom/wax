// @flow

import * as React from 'react';
import {Width, Height} from './constants';

type Props = {
  vertexCount: number,
  x: number,
  y: number,
  width: number,
  height: number,
}
export default ({vertexCount, x, y, width=Width, height=Height, ...props}:Props) => {

  let cx:number = x + (width/2.0)
  let cy:number = y + (height/2.0)
  let str:string = '';
  for(let v = 0; v < vertexCount; v++){
    let step = (v/vertexCount) * (2 * Math.PI);
    let vx = cx + ((width/2.0) * Math.sin(step));
    let vy = cy - ((height/2.0) * Math.cos(step));
    str+=`${vx} ${vy} `;
  }
  return (<polygon {...props} points={str} />);
};
