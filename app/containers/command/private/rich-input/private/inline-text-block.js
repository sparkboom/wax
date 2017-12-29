// @flow

import * as React from 'react';
import styled from 'styled-components';
import { getNodeCharIndex } from '../../../../../lib/text-width';
import type {ITheme} from './theme.type';

type Props = {
  onTextSelect: (number => void),
  children: mixed,
  isSelected: boolean,
  theme: ITheme,
};

type MouseEvent = SyntheticMouseEvent<HTMLSpanElement>;

const InnerInlineTextBlock = styled.span`
  display: inline-block;
  cursor: text;
  color: ${(p: Props) => p.isSelected? p.theme.selectedTextColor : p.theme.textColor};
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
    let {children, isSelected} = this.props;
    return (
      <InnerInlineTextBlock isSelected={isSelected} onMouseDown={(e: MouseEvent) => this.onMouseDown(e)} >
        {children}
      </InnerInlineTextBlock>
    );
  }
}

export const SelectedInlineTextBlock = (props : Props) => <InlineTextBlock {...props} isSelected={true} />
