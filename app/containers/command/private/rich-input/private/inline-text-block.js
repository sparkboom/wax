// @flow

import * as React from 'react';
import styled from 'styled-components';
import { getNodeCharIndex } from '../../../../../lib/text-width';
import type {Props} from './types';

type TextBlockProps = Props & {
  onTextSelect?: (number => void),
  type?: 'NORMAL' | 'SELECTION',
};
type MouseEvent = SyntheticMouseEvent<HTMLSpanElement>;

const InnerInlineTextBlock = styled.span`
  display: inline;
  cursor: text;
  color: ${(p:TextBlockProps) => {
    return {
      'NORMAL' : p.theme.textColor,
      'SELECTION' : p.theme.selectedTextColor,
    }[p.type || 'NORMAL'];
  }}
`;

export class InlineTextBlock extends React.Component<TextBlockProps> {

  onMouseDown = (event: MouseEvent) => {
    let selectionInfo = getNodeCharIndex(event);
    console.log('selectionInfo', selectionInfo);
    if (!selectionInfo) {
      return;
    }
    let newIndex : number = selectionInfo.offset;
    this.props.onTextSelect && this.props.onTextSelect(newIndex);
  };

  render() {
    let {children, type} = this.props;
    return (
      <InnerInlineTextBlock type={type} onMouseDown={(e:MouseEvent) => this.onMouseDown(e)} >
        {children}
      </InnerInlineTextBlock>
    );
  }
}

export const SelectedInlineTextBlock = (props:Props) => <InlineTextBlock {...props} type="SELECTION" />

export const PredictionInlineTextBlock = styled.span`
  display: inline;
  cursor: text;
  color: #777777;
`;

export const TokenInlineTextBlock = styled.span`
  display: inline;
  color: #aaaaaa;
  border: solid thin #777777;
  font-size: 24px;
  border-radius: 6px;
  margin-right: 10px;
  padding: 1px 7px;
`;
