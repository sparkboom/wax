// @flow

import * as React from 'react';
import styled, {css} from 'styled-components';
import { getNodeCharIndex } from '../lib/text-width';
import type {Props} from './types';

type TextBlockProps = Props & {
  onTextSelect?: (number => void),
  isSelected?: boolean,
};
type MouseEvent = SyntheticMouseEvent<HTMLSpanElement>;

const SelectedStyle = css`
  color: black;
  background-color: ${props => props.theme.selectedTextColor};
  border-radius: 10px;
`;
const NormalStyle = css`
  color: ${props => props.theme.textColor};
  background-color: transparent;
`;
const InnerInlineTextBlock = styled.span`
  font-size: 30px;
  display: inline;
  cursor: text;
  ${ props => props.isSelected? SelectedStyle : NormalStyle }
`;

export class InlineTextBlock extends React.Component<TextBlockProps> {

  onMouseDown = (event: MouseEvent) => {
    let selectionInfo = getNodeCharIndex(event);
    if (!selectionInfo) {
      return;
    }
    let newIndex : number = selectionInfo.offset;
    this.props.onTextSelect && this.props.onTextSelect(newIndex);
  };

  render() {
    let {children, isSelected} = this.props;
    return (
      <InnerInlineTextBlock isSelected={isSelected} onMouseDown={(e:MouseEvent) => this.onMouseDown(e)} >
        {children}
      </InnerInlineTextBlock>
    );
  }
}

export const PredictionInlineTextBlock = styled.span`
  display: inline;
  cursor: text;
  color: #777777;
  font-size: 30px;
`;

export const TokenInlineTextBlock = styled.span`
  display: inline-block;
  font-size: 24px;
  border-radius: 10px;
  margin-left: 5px;
  margin-right: 5px;
  padding: 1px 7px;
  border: solid thin ${ props => props.isSelected?  props.theme.selectedTextColor : props.theme.textColor };
  ${ props => props.isSelected? SelectedStyle : NormalStyle }
`;
