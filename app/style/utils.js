import {css} from 'styled-components';

export function backGradient({spotlightColor = 'grey',backColor = 'black', shape='ellipse', fillType = 'cover', from = '0%', to = '100%', position = '50% 80%'}){
  return css`
    background: ${spotlightColor}; /* Old browsers */
    background: -moz-radial-gradient(${position}, ${shape} ${fillType}, ${spotlightColor} ${from}, ${backColor} ${to}); /* FF3.6-15 */
    background: -webkit-radial-gradient(${position}, ${shape} ${fillType}, ${spotlightColor} ${from},${backColor} ${to}); /* Chrome10-25,Safari5.1-6 */
    background: radial-gradient(${shape} at ${position}, ${spotlightColor} ${from},${backColor} ${to}); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='${spotlightColor}', endColorstr='${backColor}',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
  `;
};
