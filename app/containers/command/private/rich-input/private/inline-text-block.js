// @flow

import * as React from 'react';
import styled from 'styled-components';
import { getNodeCharIndex } from '../../../../../lib/text-width';
import type {ITheme} from './theme.type';

type TextBlockType =
  | 'NORMAL'
  | 'SELECTION';

type Props = {
  onTextSelect: (number => void),
  children: mixed,
  type: TextBlockType,
  theme: ITheme,
};

type MouseEvent = SyntheticMouseEvent<HTMLSpanElement>;

const InnerInlineTextBlock = styled.span`
  display: inline;
  cursor: text;
  color: ${(p: Props) => {
    return {
      'NORMAL' : p.theme.textColor,
      'SELECTION' : p.theme.selectedTextColor,
    }[p.type];
  }}
`;

export class InlineTextBlock extends React.Component<Props> {

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
      <InnerInlineTextBlock type={type || 'NORMAL'} onMouseDown={(e:MouseEvent) => this.onMouseDown(e)} >
        {children}
      </InnerInlineTextBlock>
    );
  }
}

export const SelectedInlineTextBlock = (props : Props) => <InlineTextBlock {...props} type="SELECTION" />

export const PredictionInlineTextBlock = styled.span`
  display: inline;
  cursor: text;
  color: #777777;
`;
