import * as React from 'react';

export default ({vertexCount, x, y, width=Width, height=Height, ...props}) => {

  let cx = x + (width/2.0)
  let cy = y + (height/2.0)
  let str = '';
  for(let v = 0; v < vertexCount; v++){
    let step = (v/vertexCount) * (2 * Math.PI);
    let vx = cx + ((width/2.0) * Math.sin(step));
    let vy = cy - ((height/2.0) * Math.cos(step));
    str+=`${vx} ${vy} `;
  }
  return (<polygon {...props} points={str} />);
};
