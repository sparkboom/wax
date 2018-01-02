import * as React from 'react';
import styled from 'styled-components';
import SVG from '../../modules/svg/container/';

const CanvasContainer = styled.div`
  height: 100%;
  width: 100%;
`;

export default props => <CanvasContainer {...props} ><SVG /></CanvasContainer>;
