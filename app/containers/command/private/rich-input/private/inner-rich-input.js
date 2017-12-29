// @flow

import * as React from 'React';
import styled from 'styled-components';
import type {ITheme} from './theme.type';

type Props = {
  theme : ITheme,
  value : string,
};

const InnerRichInput = styled.pre`

  color: ${(p: Props) => p.theme.textColor};
  margin: 0;
  max-width: 100%;
  outline: 0;
  text-align: center;
  padding: 0.2em 0.2em;
  border-radius: 0.5em;

  white-space: pre-wrap;
  word-wrap: break-word;

  font-family: system-ui;
  font-size: 40px;
  font-weight: lighter;

  background: rgba(136, 51, 85, 0.05);
  overflow-y: scroll;

  &.focussed {
    background: rgba(136, 51, 85, 0.15);
  }

  ${ (p: Props) => p.value && p.value.length === 0 && 'display: none;' }
`;

export default (props : Props) => <InnerRichInput {...props} />;
