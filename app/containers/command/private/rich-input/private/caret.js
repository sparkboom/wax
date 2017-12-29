// @flow

import * as React from 'react';
import styled, {keyframes} from 'styled-components';
import type {ITheme} from './theme.type';

type Props = {
  theme : ITheme
};

const blink = keyframes`
  from, to {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
`;

const Caret = styled.div`
  display: inline-block;
  font-size: 1em;
  height: 1.2em;
  border-left: solid thin ${(props: Props) => props.theme.textColor};
  max-width: 0px;
  animation: 1s ${blink} step-end infinite;
  position: relative;
  left: 0;
  top: 10px;
  padding: 0;
  margin: 0;
`;

export default (props : Props) => <Caret {...props} />;
