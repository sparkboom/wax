// @flow

import * as React from 'react';
import styled, {keyframes} from 'styled-components';
import type {Props} from './types';

const blink = keyframes`
  from, to {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
`;

const Caret = styled.span`
  display: inline;
  font-size: 1em;
  height: 1em;
  border-left: solid thin ${(props: Props) => props.theme.textColor};
  max-width: 0px;
  animation: 1s ${blink} step-end infinite;
  position: relative;
  left: 0;
  padding: 0;
  margin: 0;
`;

export default (props : Props) => <Caret {...props} />;
