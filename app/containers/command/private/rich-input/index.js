import React from 'react';
import styled, {keyframes, withTheme} from 'styled-components';
import { createSelector } from 'reselect';

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
  border-left: solid thin ${p => p.theme.textColor};
  min-width: 3px;
  animation: 1s ${blink} step-end infinite;
  position: relative;
  left: 0;
  top: 10px;
  padding: 0;
  margin: 0;
`;

const RichInput = styled.div`

  color: ${p => p.theme.textColor};
  margin: 0;
  max-width: 100%;
  flex: 1 0 auto;
  outline: 0;
  text-align: center;
  line-height: 1.2em;
  padding: .7em 1em;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 0.5em;
  box-shadow: none;

  font-family: system-ui;
  font-size: 40px;
  font-weight: lighter;
  border: solid thin blue;

  &:focus {
    border: solid thin red;
  }
`;

const getValue = ({value}) => value;
const getCaretIndex = ({caretIndex}) => caretIndex;
const getPreText = createSelector(getValue, getCaretIndex, (value, caretIndex) => value.substr(0, caretIndex));
const getPostText = createSelector(getValue, getCaretIndex, (value, caretIndex) => value.substring(caretIndex, value.length));

export default withTheme(props => (
  <RichInput
    tabIndex="0"
    onKeyPress={props.onKeyPress}
    innerRef={props.inputRef}
    >
      <span>{getPreText(props)}</span>
      <Caret></Caret>
      <span>{getPostText(props)}</span>
  </RichInput>));
