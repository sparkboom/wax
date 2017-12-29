// @flow

import * as React from 'React';
import styled from 'styled-components';
import type {ITheme} from './theme.type';

type Props = {
  theme : ITheme,
  value : string,
};

const InnerRichInput = styled.div`

  color: ${(p: Props) => p.theme.textColor};
  margin: 0;
  max-width: 100%;
  flex: 1 0 auto;
  outline: 0;
  text-align: center;
  line-height: 1.2em;
  padding: .7em 1em;
  border-radius: 0.5em;
  box-shadow: none;

  font-family: system-ui;
  font-size: 40px;
  font-weight: lighter;

  &.focussed {
    background: rgba(136, 51, 85, 0.15);
  }

  ${ (p: Props) => p.value && p.value.length === 0 && 'display: none;' }
`;

export default (props : Props) => <InnerRichInput {...props} />;
